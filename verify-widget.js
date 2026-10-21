/* ============================================================
   AI 驗證小工具（五科共用）
   ------------------------------------------------------------
   功能
     1. 右下角「⚙ 設定」：填入 Groq API Key、選擇模型
     2. 每一題的解析區塊下方多一顆按鈕：
        「再次用 <模型> 驗證一次並提供問答的詳解」
     3. 按下去彈出可拖曳的浮動窗，即時串流顯示 AI 的驗證與詳解

   設計
     - 不修改各科引擎，改用 MutationObserver 監看 #app：
       每次重新渲染後，替尚未加過的 .explain 補上按鈕。
     - 作答頁版面是 .qcard + .opt + .mark，
       成績頁版面是 .reviewq + .rv-o + .ok/.bad，
       兩種都要能讀出「題目／選項／學生選項／正確答案」。
     - API Key 只存在這台瀏覽器的 localStorage，只會送到 Groq，
       不會寫進程式碼、不會進 git。

   隱私
     - 這是靜態網站，Key 存在使用者自己的瀏覽器。
     - 共用電腦請記得用完清除。
   ============================================================ */
(function () {
  "use strict";

  if (window.__QV_LOADED__) return;
  window.__QV_LOADED__ = true;

  /* ---------------- 設定與常數 ---------------- */
  var KEY_LS = "qverify.groq.apiKey";
  var MODEL_LS = "qverify.groq.model";
  var PANEL_POS_LS = "qverify.panel.pos";

  var MODELS = [
    { id: "openai/gpt-oss-120b", label: "openai/gpt-oss-120b（預設）" },
    { id: "qwen/qwen3.8-27b", label: "qwen/qwen3.8-27b" }
  ];
  var DEFAULT_MODEL = MODELS[0].id;
  var ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
  var KEYS_URL = "https://console.groq.com/keys";

  var SYSTEM_PROMPT = [
    "你是台灣國小教師與命題審查專家，熟悉十二年國教 108 課綱與國小教材用語。",
    "你的任務是驗證一道選擇題的答案是否正確，並提供學生看得懂的詳解。",
    "",
    "重要要求：",
    "1. 學生選的答案與系統標示的正確答案可能互相矛盾。請精確判斷誰對誰錯，不要為了附和而含糊。",
    "2. 如果系統標示的正確答案其實有誤，請直接說「系統答案有誤」，並指出正確應該是哪一個。",
    "3. 如果題目本身敘述不清、有兩個選項都說得通、或超出國小四年級範圍，請明確指出，不要硬給答案。",
    "4. 用繁體中文、台灣用語。語氣像老師對四年級學生說明，清楚但不幼稚。",
    "5. 不要重複貼出題目全文，直接回答重點。",
    "6. 請固定用下列小節標題開頭、每個小節一段，方便系統用顏色標示：",
    "   1. 結論：系統答案是否正確？（正確／有誤／題目有瑕疵）",
    "   2. 學生選項：為什麼學生選的那個對或不對",
    "   3. 正確答案：為什麼正確答案是那一個",
    "   4. 觀念補充：用四年級聽得懂的話說明這個概念",
    "   5. 題目瑕疵：若題目或選項有問題要具體指出，沒有就寫「無」"
  ].join("\n");

  /* ---------------- 小工具 ---------------- */
  function lsGet(k) { try { return localStorage.getItem(k) || ""; } catch (e) { return ""; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { } }

  function getKey() { return lsGet(KEY_LS).trim(); }
  function setKey(v) { if (v) lsSet(KEY_LS, v); else lsDel(KEY_LS); }
  function getModel() {
    var m = lsGet(MODEL_LS);
    for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === m) return m;
    return DEFAULT_MODEL;
  }
  function setModel(v) {
    for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === v) { lsSet(MODEL_LS, v); return; }
    lsSet(MODEL_LS, DEFAULT_MODEL);
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* ---------------- AI 輸出排版：分區 + 顏色 ----------------
     模型固定用五個小節回答（結論／學生選項／正確答案／觀念補充／題目瑕疵），
     這裡把每個小節做成不同顏色的卡片，並對「正確／錯誤／注意／重點」等
     關鍵字加色，讓四年級學生一眼看出重點、也更容易複習記憶。 */
  var AI_SECTIONS = [
    { key: "verdict", label: "結論", ic: "✔" },
    { key: "pick", label: "學生選項", ic: "✎" },
    { key: "right", label: "正確答案", ic: "✔" },
    { key: "idea", label: "觀念補充", ic: "💡" },
    { key: "issue", label: "題目瑕疵", ic: "⚠" },
    { key: "more", label: "其他補充", ic: "📌" }
  ];
  var SEC_RE = /^\s*(?:\d{1,2}\s*[.、)）]|[①②③④⑤]|\(\d{1,2}\))?\s*(結論|學生選擇|學生選項|正確答案|觀念補充|題目瑕疵|其他補充|建議|補充)\s*[:：]\s*(.*)$/;
  var HL_RE = /(系統答案有誤|答案有誤|有誤|錯誤|不正確|答錯|正確|注意|小心|不可以|不可|不要|危險|避免|重點|應該|必須|一定要|建議)/g;

  function hlClass(tok) {
    if (/有誤|錯誤|不正確|答錯/.test(tok)) return "qv-hl-bad";
    if (/正確/.test(tok)) return "qv-hl-ok";
    if (/注意|小心|不可以|不可|不要|危險|避免/.test(tok)) return "qv-hl-warn";
    return "qv-hl-info";
  }
  function fmtLine(s) {
    var t = esc(s);
    t = t.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    return t.replace(HL_RE, function (m) {
      return '<span class="' + hlClass(m) + '">' + m + "</span>";
    });
  }
  function sectionOf(label) {
    for (var i = 0; i < AI_SECTIONS.length; i++) {
      var s = AI_SECTIONS[i];
      if (label === s.label) return s;
      if (label === "學生選擇" && s.key === "pick") return s;
      if ((label === "建議" || label === "補充") && s.key === "more") return s;
    }
    return null;
  }
  function sectionTone(sec, text) {
    if (sec.key === "verdict") {
      if (/有誤|錯誤|不正確|答錯|不對/.test(text)) return "bad";
      if (/瑕疵|有問題|不完整|不清楚/.test(text)) return "warn";
      if (/正確/.test(text)) return "ok";
      return "info";
    }
    if (sec.key === "right") return "ok";
    if (sec.key === "pick") return "pick";
    if (sec.key === "idea") return "info";
    if (sec.key === "issue") {
      if (/^\s*(無|沒有|沒問題|無誤)/.test(text) || /沒有問題/.test(text)) return "ok";
      return "warn";
    }
    return "info";
  }
  function verdictPill(text) {
    if (/有誤|錯誤|不正確|答錯/.test(text)) return "答案有誤";
    if (/瑕疵|有問題|不完整|不清楚/.test(text)) return "題目有瑕疵";
    if (/正確/.test(text)) return "答案正確";
    return "";
  }
  /* 把模型輸出的純文字做最小格式化（先轉義，再做標記，避免注入） */
  function fmtModelText(s) {
    var raw = String(s == null ? "" : s);
    var lines = raw.split(/\r?\n/);
    var groups = [];
    var lead = [];
    var cur = null;
    function push() { if (cur) { groups.push(cur); cur = null; } }

    for (var i = 0; i < lines.length; i++) {
      var ln = lines[i];
      var m = ln.match(SEC_RE);
      var sec = m ? sectionOf(m[1]) : null;
      if (sec) {
        push();
        cur = { sec: sec, lines: [m[2]] };
      } else if (cur) {
        cur.lines.push(ln);
      } else {
        lead.push(ln);
      }
    }
    push();

    var html = "";
    var leadText = lead.join("\n").trim();
    if (leadText) {
      html += '<div class="qv-lead">' + fmtLine(leadText).replace(/\n/g, "<br>") + "</div>";
    }
    groups.forEach(function (g) {
      var text = g.lines.join("\n").trim();
      var tone = sectionTone(g.sec, text);
      var pill = g.sec.key === "verdict" ? verdictPill(text) : "";
      html += '<div class="qv-sec qv-sec--' + tone + '">' +
        '<div class="qv-sec-h"><span class="qv-sec-ic">' + g.sec.ic + "</span>" +
        '<span class="qv-sec-lb">' + esc(g.sec.label) + "</span>" +
        (pill ? '<span class="qv-pill">' + esc(pill) + "</span>" : "") + "</div>" +
        '<div class="qv-sec-b">' + fmtLine(text).replace(/\n/g, "<br>") + "</div></div>";
    });
    if (!groups.length) {
      html = '<div class="qv-sec qv-sec--info"><div class="qv-sec-b">' +
        fmtLine(raw).replace(/\n/g, "<br>") + "</div></div>";
    }
    return html;
  }

  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  }

  /* ---------------- 樣式 ---------------- */
  function injectCSS() {
    if (document.getElementById("qv-style")) return;
    var css = [
      ".qv-gear{position:fixed;left:16px;bottom:16px;z-index:9998;display:flex;align-items:center;gap:6px;",
      "  font:700 13px/1 'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif;",
      "  color:#fff;background:#2f6fed;border:0;border-radius:999px;padding:11px 16px;cursor:pointer;",
      "  box-shadow:0 6px 20px rgba(47,111,237,.35);transition:transform .15s,box-shadow .15s}",
      ".qv-gear:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(47,111,237,.45)}",
      ".qv-gear:active{transform:translateY(0)}",
      ".qv-gear .dot{width:7px;height:7px;border-radius:50%;background:#8ef0b0}",
      ".qv-gear.nokey .dot{background:#ffd166}",

      ".qv-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.35);z-index:9998}",
      ".qv-panel{position:fixed;z-index:9999;background:#fff;border-radius:14px;",
      "  box-shadow:0 18px 60px rgba(15,23,42,.28);border:1px solid #e3e9f2;",
      "  display:flex;flex-direction:column;overflow:hidden;",
      "  font:400 14px/1.75 'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif;color:#1f2933;",
      "  max-height:min(78vh,720px)}",
      ".qv-head{display:flex;align-items:center;gap:8px;padding:11px 12px 11px 14px;",
      "  background:#f4f7fd;border-bottom:1px solid #e3e9f2;cursor:grab;user-select:none;touch-action:none;flex:0 0 auto}",
      ".qv-head.dragging{cursor:grabbing}",
      ".qv-title{flex:1;font-weight:800;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
      ".qv-sub{font-weight:600;font-size:11.5px;color:#9aa5b1;margin-left:6px}",
      ".qv-x{flex:0 0 auto;width:30px;height:30px;border-radius:8px;border:0;background:transparent;",
      "  font-size:18px;line-height:1;color:#52606d;cursor:pointer}",
      ".qv-x:hover{background:#e6ecf8}",
      ".qv-body{padding:14px 16px;overflow:auto;flex:1 1 auto;min-height:60px}",
      ".qv-body p{margin:0 0 10px}",
      ".qv-foot{flex:0 0 auto;display:flex;align-items:center;gap:8px;padding:9px 12px;",
      "  border-top:1px solid #eef2f8;background:#fbfcfe;font-size:12px;color:#7b8794}",
      ".qv-foot .sp{flex:1}",

      ".qv-btn{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;margin-top:10px;",
      "  font:700 13.5px/1.45 'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif;",
      "  color:#2f6fed;background:#eef3ff;border:1.5px solid #c9d9ff;border-radius:10px;",
      "  padding:10px 12px;cursor:pointer;text-align:center;transition:background .15s,border-color .15s}",
      ".qv-btn:hover{background:#e2ebff;border-color:#a9c1ff}",
      ".qv-btn:active{background:#d7e3ff}",
      ".qv-btn[disabled]{opacity:.55;cursor:default}",

      ".qv-field{margin:0 0 14px}",
      ".qv-label{display:block;font-weight:700;font-size:12.5px;color:#52606d;margin-bottom:5px}",
      ".qv-input,.qv-select{width:100%;box-sizing:border-box;font:600 14px/1.5 'Noto Sans TC',monospace;",
      "  padding:9px 11px;border:1.5px solid #d6dfec;border-radius:9px;background:#fff;color:#1f2933}",
      ".qv-input:focus,.qv-select:focus{outline:0;border-color:#2f6fed;box-shadow:0 0 0 3px rgba(47,111,237,.14)}",
      ".qv-row{display:flex;gap:8px;align-items:center}",
      ".qv-hint{font-size:11.5px;line-height:1.6;color:#7b8794;margin-top:6px}",
      ".qv-hint a{color:#2f6fed;text-decoration:none;font-weight:700}",
      ".qv-hint a:hover{text-decoration:underline}",
      ".qv-actions{display:flex;gap:8px;margin-top:4px}",
      ".qv-primary,.qv-secondary{flex:1;font:700 13.5px/1 'Noto Sans TC','PingFang TC','Microsoft JhengHei',sans-serif;",
      "  padding:11px 12px;border-radius:10px;cursor:pointer;border:1.5px solid transparent}",
      ".qv-primary{background:#2f6fed;color:#fff}",
      ".qv-primary:hover{background:#2a63d4}",
      ".qv-secondary{background:#fff;color:#52606d;border-color:#d6dfec}",
      ".qv-secondary:hover{background:#f4f7fd}",

      ".qv-status{display:flex;align-items:center;gap:9px;color:#52606d;font-weight:600;font-size:13px}",
      ".qv-spin{width:15px;height:15px;border-radius:50%;border:2.5px solid #d6dfec;border-top-color:#2f6fed;",
      "  animation:qvspin .8s linear infinite;flex:0 0 auto}",
      "@keyframes qvspin{to{transform:rotate(360deg)}}",
      ".qv-err{color:#c0392b;font-weight:700}",
      ".qv-pre{white-space:pre-wrap;word-break:break-word;font-size:14px;line-height:1.8}",
      /* ---- AI 答題框：分區配色 + 關鍵字標色 ---- */
      ".qv-legend{display:flex;flex-wrap:wrap;gap:12px;margin:0 0 12px;padding:8px 11px;background:#f7f9fd;",
      "  border:1px solid #e3e9f2;border-radius:10px;font-size:12px;color:#52606d;font-weight:700}",
      ".qv-legend span{display:inline-flex;align-items:center;gap:5px}",
      ".qv-legend i{width:10px;height:10px;border-radius:3px;display:inline-block;flex:0 0 auto}",
      ".qv-lg-ok i{background:#1f8a4c}.qv-lg-bad i{background:#c0392b}.qv-lg-warn i{background:#d98a00}",
      ".qv-lg-info i{background:#2f6fed}.qv-lg-pick i{background:#b4457a}",
      ".qv-out{font-size:14px;line-height:1.85;word-break:break-word}",
      ".qv-lead{font-size:13.5px;color:#52606d;line-height:1.8;margin:0 0 10px;padding:8px 10px;background:#f7f9fd;border-radius:9px}",
      ".qv-sec{border:1px solid #e3e9f2;border-left-width:4px;border-radius:11px;margin:0 0 10px;overflow:hidden;background:#fff}",
      ".qv-sec-h{display:flex;align-items:center;gap:7px;padding:6px 10px;font-size:12.5px;font-weight:800;",
      "  background:#f4f7fd;color:#3a5fa8;border-bottom:1px solid #e3e9f2}",
      ".qv-sec-ic{font-size:13px;line-height:1}",
      ".qv-sec-lb{letter-spacing:.02em}",
      ".qv-sec-b{padding:9px 11px;font-size:14px;line-height:1.85}",
      ".qv-sec--ok{border-color:#cde9d9;border-left-color:#1f8a4c}",
      ".qv-sec--ok .qv-sec-h{background:#eaf7ee;color:#12833f;border-bottom-color:#cde9d9}",
      ".qv-sec--bad{border-color:#f6d7d4;border-left-color:#c0392b}",
      ".qv-sec--bad .qv-sec-h{background:#fdeeed;color:#c0392b;border-bottom-color:#f6d7d4}",
      ".qv-sec--warn{border-color:#f8e6bd;border-left-color:#d98a00}",
      ".qv-sec--warn .qv-sec-h{background:#fff7e6;color:#a86a00;border-bottom-color:#f8e6bd}",
      ".qv-sec--info{border-color:#dbe6ff;border-left-color:#2f6fed}",
      ".qv-sec--info .qv-sec-h{background:#eef3ff;color:#2f6fed;border-bottom-color:#dbe6ff}",
      ".qv-sec--pick{border-color:#f3d5e4;border-left-color:#b4457a}",
      ".qv-sec--pick .qv-sec-h{background:#fdf0f6;color:#a73a6b;border-bottom-color:#f3d5e4}",
      ".qv-pill{margin-left:auto;font-size:11.5px;font-weight:800;padding:2px 9px;border-radius:999px;background:#fff;border:1px solid currentColor}",
      ".qv-hl-ok{color:#12833f;font-weight:800}",
      ".qv-hl-bad{color:#c0392b;font-weight:800}",
      ".qv-hl-warn{color:#a86a00;font-weight:800}",
      ".qv-hl-info{color:#2f6fed;font-weight:800}",
      ".qv-badge{display:inline-block;font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;",
      "  background:#eef3ff;color:#2f6fed;margin-right:6px}",
      ".qv-kicker{font-size:11.5px;font-weight:800;color:#9aa5b1;letter-spacing:.08em;margin-bottom:8px}",
      "@media (max-width:600px){",
      "  .qv-gear{left:12px;bottom:12px;padding:10px 13px;font-size:12.5px}",
      "}"
    ].join("");
    var st = document.createElement("style");
    st.id = "qv-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  /* ---------------- 可拖曳 ---------------- */
  function makeDraggable(panel, head) {
    var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0;

    head.addEventListener("pointerdown", function (e) {
      if (e.target.closest("button")) return;
      if (e.button != null && e.button !== 0) return;
      var r = panel.getBoundingClientRect();
      panel.style.left = r.left + "px";
      panel.style.top = r.top + "px";
      panel.style.right = "auto";
      panel.style.bottom = "auto";
      panel.style.transform = "none";
      sx = e.clientX; sy = e.clientY; ox = r.left; oy = r.top;
      dragging = true;
      head.classList.add("dragging");
      try { head.setPointerCapture(e.pointerId); } catch (err) { }
      e.preventDefault();
    });

    head.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var w = panel.offsetWidth, h = panel.offsetHeight;
      var nx = ox + (e.clientX - sx);
      var ny = oy + (e.clientY - sy);
      var maxX = Math.max(0, window.innerWidth - 60);
      var maxY = Math.max(0, window.innerHeight - 44);
      nx = Math.min(Math.max(nx, -(w - 60)), maxX);
      ny = Math.min(Math.max(ny, 0), maxY);
      panel.style.left = nx + "px";
      panel.style.top = ny + "px";
    });

    function stop() {
      if (!dragging) return;
      dragging = false;
      head.classList.remove("dragging");
      lsSet(PANEL_POS_LS, JSON.stringify({ l: panel.style.left, t: panel.style.top }));
    }
    head.addEventListener("pointerup", stop);
    head.addEventListener("pointercancel", stop);
  }

  function placePanel(panel, width) {
    var saved = null;
    try { saved = JSON.parse(lsGet(PANEL_POS_LS) || "null"); } catch (e) { }
    var w = Math.min(width, Math.max(260, window.innerWidth - 24));
    panel.style.width = w + "px";
    if (saved && saved.l && saved.t) {
      panel.style.left = saved.l;
      panel.style.top = saved.t;
    } else {
      panel.style.left = Math.max(12, (window.innerWidth - w) / 2) + "px";
      panel.style.top = Math.max(16, Math.min(90, window.innerHeight * 0.08)) + "px";
    }
  }

  function makePanel(opts) {
    var panel = el("div", "qv-panel");
    var head = el("div", "qv-head");
    head.innerHTML = '<span class="qv-title">' + esc(opts.title) +
      '</span><span class="qv-sub">' + esc(opts.sub || "") + "</span>";
    var x = el("button", "qv-x", "&times;");
    x.type = "button";
    x.title = "關閉";
    head.appendChild(x);
    panel.appendChild(head);

    var body = el("div", "qv-body");
    panel.appendChild(body);

    var foot = null;
    if (opts.foot !== false) {
      foot = el("div", "qv-foot");
      foot.innerHTML = '<span class="fg">可拖曳標題列移動視窗</span><span class="sp"></span>';
      panel.appendChild(foot);
    }

    placePanel(panel, opts.width || 520);
    document.body.appendChild(panel);
    makeDraggable(panel, head);

    function close() {
      panel.remove();
      if (opts.onClose) opts.onClose();
    }
    x.onclick = close;

    return { panel: panel, head: head, body: body, foot: foot, close: close };
  }

  /* ---------------- 題目內容擷取 ---------------- */
  function textOf(node) { return node ? (node.textContent || "").replace(/\s+/g, " ").trim() : ""; }

  /* 找出解析區塊所屬的題目容器。
     作答頁：.qcard 與 .explain 是「兄弟」，不是父子。
     成績／錯題頁：.explain 在 .reviewq 裡面。 */
  function scopeOf(explainEl) {
    var rv = explainEl.closest(".reviewq");
    if (rv) return rv;

    var prev = explainEl.previousElementSibling;
    if (prev && prev.classList && prev.classList.contains("qcard")) return prev;

    var par = explainEl.parentElement;
    if (par) {
      var qc = par.querySelector(".qcard");
      if (qc) return qc;
    }
    return par;
  }

  function readQuestion(explainEl) {
    var box = scopeOf(explainEl);
    if (!box) return null;

    var passage = box.querySelector(".passage");
    var stem = box.querySelector(".stem");
    var unit = box.querySelector(".tag.u");
    var grade = box.querySelector(".tag.g");

    var opts = [];
    var correct = -1, picked = -1;

    // 作答頁：button.opt，內含 .k / .txt / .mark
    box.querySelectorAll(".opt").forEach(function (o) {
      var k = o.querySelector(".k");
      var t = o.querySelector(".txt");
      var m = o.querySelector(".mark");
      var idx = opts.length;
      opts.push({ letter: textOf(k), text: textOf(t) });
      var mk = textOf(m);
      if (mk.indexOf("正確") >= 0) correct = idx;
      if (mk.indexOf("你的") >= 0) picked = idx;
    });

    // 成績頁：div.rv-o，帶 ok / bad
    if (!opts.length) {
      box.querySelectorAll(".rv-o").forEach(function (o) {
        var k = o.querySelector(".k");
        var idx = opts.length;
        var clone = o.cloneNode(true);
        var kc = clone.querySelector(".k");
        if (kc) kc.remove();
        opts.push({ letter: textOf(k), text: textOf(clone) });
        if (o.classList.contains("ok")) correct = idx;
        if (o.classList.contains("bad")) picked = idx;
      });
    }

    // 全部展開面板：span 形式，沒有標記；仍可送驗，但需人工指定
    if (!opts.length) return null;

    // 學生答對時不會有「你的選擇」標記，此時學生選項 = 正確答案
    if (picked < 0 && correct >= 0) picked = correct;

    return {
      passage: textOf(passage),
      stem: textOf(stem),
      unit: textOf(unit),
      grade: textOf(grade),
      opts: opts,
      correct: correct,
      picked: picked,
      explain: textOf(explainEl),
      subject: (document.title || "").replace(/\s*[|｜].*$/, "").trim()
    };
  }

  function buildPrompt(q) {
    var lines = [];
    lines.push("【科目】" + (q.subject || "（未標示）"));
    if (q.grade) lines.push("【年級】" + q.grade);
    if (q.unit) lines.push("【單元／考點】" + q.unit);
    lines.push("");
    if (q.passage) {
      lines.push("【短文】");
      lines.push(q.passage);
      lines.push("");
    }
    lines.push("【題目】");
    lines.push(q.stem);
    lines.push("");
    lines.push("【選項】");
    q.opts.forEach(function (o, i) { lines.push(o.letter + ". " + o.text); });
    lines.push("");
    lines.push("【學生選擇】" + (q.picked >= 0 ? q.opts[q.picked].letter + ". " + q.opts[q.picked].text : "未作答"));
    lines.push("【系統標示的正確答案】" + (q.correct >= 0 ? q.opts[q.correct].letter + ". " + q.opts[q.correct].text : "（未標示）"));
    lines.push("");
    lines.push("【系統原本的解析】");
    lines.push(q.explain || "（無）");
    lines.push("");
    lines.push("請依照下列格式回答：");
    lines.push("1. 結論：系統答案是否正確？（正確／有誤／題目有瑕疵）");
    lines.push("2. 學生選項：為什麼 " + (q.picked >= 0 ? q.opts[q.picked].letter : "該選項") + " 對或不對");
    lines.push("3. 正確答案：為什麼 " + (q.correct >= 0 ? q.opts[q.correct].letter : "該選項") + " 對");
    lines.push("4. 觀念補充：用國小四年級聽得懂的話說明這個概念");
    lines.push("5. 題目瑕疵：若敘述或選項有問題，具體指出並建議怎麼改；沒有就寫「無」");
    return lines.join("\n");
  }

  /* ---------------- Groq 呼叫（串流） ---------------- */
  function errText(status, body) {
    var detail = "";
    try {
      var j = JSON.parse(body);
      detail = (j.error && (j.error.message || j.error.type)) || "";
    } catch (e) { detail = String(body || "").slice(0, 200); }
    if (status === 401 || status === 403) return "API Key 無效或沒有權限，請到「⚙ 設定」重新填入。";
    if (status === 404) return "找不到這個模型，請到「⚙ 設定」換一個模型。" + (detail ? "（" + detail + "）" : "");
    if (status === 429) return "請求太頻繁或額度用完，請稍後再試。";
    if (status >= 500) return "Groq 伺服器暫時有問題，請稍後再試。";
    return "呼叫失敗（HTTP " + status + "）" + (detail ? "：" + detail : "");
  }

  function callGroq(key, model, prompt, onDelta, signal) {
    var payload = {
      model: model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.2,
      max_tokens: 2500,
      stream: true
    };
    /* gpt-oss 預設會先產生 reasoning，佔用 token 額度；降低推理量，
       避免正文被吃光或延遲過久。串流只讀 delta.content，
       不需要 include_reasoning，少一個參數就少一種被 400 拒絕的可能。
       qwen3.8 預設 reasoning 為 none，不用傳。 */
    if (/^openai\/gpt-oss/.test(model)) {
      payload.reasoning_effort = "low";
    }

    return fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + key
      },
      body: JSON.stringify(payload),
      signal: signal
    }).then(function (res) {
      if (!res.ok) {
        return res.text().then(function (t) { throw new Error(errText(res.status, t)); });
      }
      if (!res.body || !res.body.getReader) {
        return res.json().then(function (j) {
          var full = (j.choices && j.choices[0] && j.choices[0].message && j.choices[0].message.content) || "";
          if (full) onDelta(full);
          return full;
        });
      }

      var reader = res.body.getReader();
      var decoder = new TextDecoder("utf-8");
      var buf = "";
      var full = "";

      function pump() {
        return reader.read().then(function (r) {
          if (r.done) return full;
          buf += decoder.decode(r.value, { stream: true });
          var parts = buf.split("\n");
          buf = parts.pop();
          parts.forEach(function (line) {
            line = line.trim();
            if (!line || line.charAt(0) === ":") return;
            if (line.indexOf("data:") !== 0) return;
            var data = line.slice(5).trim();
            if (data === "[DONE]") return;
            try {
              var j = JSON.parse(data);
              var d = j.choices && j.choices[0] && j.choices[0].delta;
              var piece = (d && d.content) || "";
              if (piece) { full += piece; onDelta(piece); }
            } catch (e) { }
          });
          return pump();
        });
      }
      return pump();
    });
  }

  /* ---------------- 設定視窗 ---------------- */
  var settingsOpen = false;

  function openSettings() {
    if (settingsOpen) return;
    settingsOpen = true;

    var backdrop = el("div", "qv-backdrop");
    document.body.appendChild(backdrop);

    var ui = makePanel({
      title: "設定",
      sub: "Groq API",
      width: 520,
      foot: false,
      onClose: function () { backdrop.remove(); settingsOpen = false; }
    });

    var curKey = getKey();
    var curModel = getModel();

    ui.body.innerHTML =
      '<div class="qv-field">' +
      '  <label class="qv-label" for="qv-key">Groq API Key</label>' +
      '  <div class="qv-row">' +
      '    <input class="qv-input" id="qv-key" type="password" autocomplete="off" spellcheck="false" placeholder="gsk_..." value="' + esc(curKey) + '">' +
      '    <button class="qv-secondary" id="qv-eye" type="button" style="flex:0 0 auto;padding:9px 12px">顯示</button>' +
      '  </div>' +
      '  <div class="qv-hint">只存在這台瀏覽器的 localStorage，只會送到 Groq，不會上傳到其他地方。' +
      '    還沒有 Key 的話，到 <a href="' + KEYS_URL + '" target="_blank" rel="noopener">console.groq.com/keys</a> 免費申請。</div>' +
      '</div>' +
      '<div class="qv-field">' +
      '  <label class="qv-label" for="qv-model">驗證用模型</label>' +
      '  <select class="qv-select" id="qv-model">' +
      MODELS.map(function (m) {
        return '<option value="' + esc(m.id) + '"' + (m.id === curModel ? " selected" : "") + ">" + esc(m.label) + "</option>";
      }).join("") +
      '  </select>' +
      '  <div class="qv-hint">預設是 openai/gpt-oss-120b。若模型名稱已被 Groq 下架，呼叫時會提示找不到模型。</div>' +
      '</div>' +
      '<div class="qv-actions">' +
      '  <button class="qv-secondary" id="qv-cancel" type="button">取消</button>' +
      '  <button class="qv-primary" id="qv-save" type="button">儲存</button>' +
      '</div>';

    var keyInput = ui.body.querySelector("#qv-key");
    var eye = ui.body.querySelector("#qv-eye");

    eye.onclick = function () {
      var show = keyInput.type === "password";
      keyInput.type = show ? "text" : "password";
      eye.textContent = show ? "隱藏" : "顯示";
    };

    ui.body.querySelector("#qv-cancel").onclick = ui.close;
    ui.body.querySelector("#qv-save").onclick = function () {
      setKey(keyInput.value.trim());
      setModel(ui.body.querySelector("#qv-model").value);
      ui.close();
      updateGear();
      syncVerifyButtons();
    };

    keyInput.focus();
    keyInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") ui.body.querySelector("#qv-save").click();
    });
  }

  /* ---------------- 驗證視窗 ---------------- */
  function openVerify(q) {
    var key = getKey();
    if (!key) {
      openSettings();
      return;
    }
    var model = getModel();

    var ui = makePanel({
      title: "AI 驗證與詳解",
      sub: model,
      width: 560
    });

    var status = el("div", "qv-status",
      '<span class="qv-spin"></span><span>正在呼叫 ' + esc(model) + " …</span>");
    ui.body.appendChild(status);

    var legend = el("div", "qv-legend");
    legend.innerHTML =
      '<span><i class="qv-lg-ok"></i>正確</span>' +
      '<span><i class="qv-lg-bad"></i>錯誤／有誤</span>' +
      '<span><i class="qv-lg-warn"></i>注意／瑕疵</span>' +
      '<span><i class="qv-lg-info"></i>重點補充</span>' +
      '<span><i class="qv-lg-pick"></i>學生選項</span>';
    ui.body.appendChild(legend);

    var out = el("div", "qv-out");
    out.style.display = "none";
    ui.body.appendChild(out);

    var ctrl = new AbortController();
    var started = false;

    ui.foot.innerHTML =
      '<span class="fg">' + esc(model) + '</span><span class="sp"></span>' +
      '<button class="qv-secondary" id="qv-abort" type="button" style="flex:0 0 auto;padding:6px 10px;font-size:12px">停止</button>';
    ui.foot.querySelector("#qv-abort").onclick = function () {
      try { ctrl.abort(); } catch (e) { }
      status.innerHTML = '<span class="qv-err">已停止</span>';
      if (!started) out.style.display = "none";
    };

    var raw = "";

    callGroq(key, model, buildPrompt(q), function (piece) {
      if (!started) {
        started = true;
        status.remove();
        out.style.display = "";
      }
      raw += piece;
      out.innerHTML = fmtModelText(raw);
      ui.body.scrollTop = ui.body.scrollHeight;
    }, ctrl.signal).then(function () {
      if (!started) {
        status.innerHTML = '<span class="qv-err">模型沒有回傳內容，請再試一次。</span>';
      } else {
        out.innerHTML = fmtModelText(raw);
      }
    }).catch(function (err) {
      if (err && err.name === "AbortError") return;
      status.innerHTML = '<span class="qv-err">' + esc(err && err.message ? err.message : "無法連線，請檢查網路。") + "</span>";
      var retry = el("button", "qv-secondary", "重試");
      retry.type = "button";
      retry.style.marginTop = "10px";
      retry.onclick = function () { ui.close(); openVerify(q); };
      status.appendChild(retry);
    });
  }

  /* ---------------- 掛載按鈕 ---------------- */
  function verifyButtonLabel() {
    return "🔍 再次用 " + getModel() + " 驗證一次並提供問答的詳解";
  }

  function syncVerifyButtons() {
    var explains = document.querySelectorAll(".explain");
    for (var i = 0; i < explains.length; i++) {
      var ex = explains[i];
      if (ex.getAttribute("data-qv") === "1") {
        var b0 = ex.querySelector(".qv-btn");
        if (b0) {
          var lb = verifyButtonLabel();
          /* 只有真的不同才寫入。textContent 即使設成相同字串，
             也會替換文字節點而觸發 MutationObserver，
             造成「觀察→改字→觀察」的無限迴圈把頁面卡死。 */
          if (b0.textContent !== lb) b0.textContent = lb;
        }
        continue;
      }

      var q = readQuestion(ex);
      if (!q) continue;
      ex.setAttribute("data-qv", "1");

      var btn = el("button", "qv-btn", esc(verifyButtonLabel()));
      btn.type = "button";
      btn.onclick = function (qq) {
        return function () { openVerify(qq); };
      }(q);
      ex.appendChild(btn);
    }
  }

  /* ---------------- 齒輪 ---------------- */
  var gear = null;
  function updateGear() {
    if (!gear) return;
    var has = !!getKey();
    gear.classList.toggle("nokey", !has);
    gear.querySelector(".lbl").textContent = has ? "設定" : "設定 Key";
    gear.title = has ? "設定（已填入 API Key）" : "尚未填入 Groq API Key";
  }

  function ensureGear() {
    if (gear) return;
    gear = el("button", "qv-gear");
    gear.type = "button";
    gear.innerHTML = '<span class="dot"></span><span class="lbl">設定</span>';
    gear.onclick = openSettings;
    document.body.appendChild(gear);
    updateGear();
  }

  /* ---------------- 啟動 ---------------- */
  function boot() {
    injectCSS();
    ensureGear();
    syncVerifyButtons();

    var target = document.getElementById("app") || document.body;
    var suppress = false;
    var obs = new MutationObserver(function () {
      /* 直接同步處理：背景分頁不會觸發 requestAnimationFrame，
         用 rAF 去抖會讓按鈕永遠不出現。
         自己改 DOM 時先上鎖，避免「觀察→改 DOM→觀察」的迴圈。 */
      if (suppress) return;
      suppress = true;
      try {
        syncVerifyButtons();
      } finally {
        suppress = false;
      }
    });
    obs.observe(target, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
