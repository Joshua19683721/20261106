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
    "5. 不要重複貼出題目全文，直接回答重點。"
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

  /* 把模型輸出的純文字做最小格式化（先轉義，再做標記，避免注入） */
  function fmtModelText(s) {
    var t = esc(s);
    t = t.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    t = t.replace(/\n/g, "<br>");
    return t;
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
      ".qv-gear{position:fixed;right:16px;bottom:16px;z-index:9998;display:flex;align-items:center;gap:6px;",
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
      ".qv-badge{display:inline-block;font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;",
      "  background:#eef3ff;color:#2f6fed;margin-right:6px}",
      ".qv-kicker{font-size:11.5px;font-weight:800;color:#9aa5b1;letter-spacing:.08em;margin-bottom:8px}",
      "@media (max-width:600px){",
      "  .qv-gear{right:12px;bottom:12px;padding:10px 13px;font-size:12.5px}",
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
    /* gpt-oss 預設會先產生 reasoning，佔用 token 額度；
       關掉回傳、降低推理量，避免正文被吃光或延遲過久。
       qwen3.8 預設 reasoning 為 none，不用傳。 */
    if (/^openai\/gpt-oss/.test(model)) {
      payload.reasoning_effort = "low";
      payload.include_reasoning = false;
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

    var out = el("div", "qv-pre");
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
        if (b0) b0.textContent = verifyButtonLabel();
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
    var obs = new MutationObserver(function () {
      /* 直接同步處理：背景分頁不會觸發 requestAnimationFrame，
         用 rAF 去抖會讓按鈕永遠不出現。
         已處理過的 .explain 有 data-qv 標記，重複掃描是 no-op，
         不會造成無限迴圈。 */
      syncVerifyButtons();
    });
    obs.observe(target, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
