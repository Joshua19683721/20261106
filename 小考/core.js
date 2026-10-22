/* ============================================================
   小考系統 —— 共用核心
   ------------------------------------------------------------
   責任：
     1. 登記六個科目與題庫檔位置
     2. 把 19 張試卷的題目攤平成單一題庫，並去重
     3. 產生「穩定題目 ID」——同一道題不管出現在第幾卷、
        選項怎麼打散，ID 都一樣，這樣「已檢討」才能跨卷生效
     4. 抽出不重複的題目組成 20／30／40 題的小考
     5. 介接 Supabase（交卷紀錄、已檢討清單）
     6. 介接 ntfy.sh（交卷即時推播給爸爸）

   設計原則：
     - 不修改任何既有科目的題庫檔案，只用 window.EXAM.papers
     - 全部用傳統 script 載入，不用 ES module，舊瀏覽器也能跑
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- 科目註冊表 ---------------- */
  var SUBJECTS = [
    { id: "chi",  dir: "國語文期中考",     short: "國語文",     name: "國語文期中考／期末考",     badge: "國", color: "#8a4b8c", bank: "days" },
    { id: "math", dir: "數學期中考",       short: "數學",       name: "數學期中考／期末考",       badge: "數", color: "#0e7490", bank: "single" },
    { id: "eng",  dir: "英語文期中考",     short: "英語文",     name: "英語文期中考／期末考",     badge: "英", color: "#7a5c9e", bank: "single" },
    { id: "sci",  dir: "自然期中考",       short: "自然",       name: "自然期中考／期末考",       badge: "自", color: "#2f8f5b", bank: "single" },
    { id: "soc",  dir: "社會期中考",       short: "社會",       name: "社會期中考／期末考",       badge: "社", color: "#1f7a8c", bank: "days" },
    { id: "hp",   dir: "健康與體育期中考", short: "健康與體育", name: "健康與體育期中考／期末考", badge: "健", color: "#0f8b6c", bank: "days" },
    { id: "eng4", dir: "英語文四年級單字測驗", short: "英語文四年級單字測驗", name: "英語文四年級單字測驗", badge: "單", color: "#b45309", bank: "single" }
  ];

  var DAYS = 19;

  /* ---------------- 設定 ---------------- */
  function cfg() { return window.QCFG || {}; }

  function configured() {
    var c = cfg();
    return !!(c.SUPABASE_URL && c.SUPABASE_ANON_KEY);
  }

  function getSubject(id) {
    for (var i = 0; i < SUBJECTS.length; i++) if (SUBJECTS[i].id === id) return SUBJECTS[i];
    return null;
  }

  /* ---------------- 小工具 ---------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  /* 去掉題庫標記，只留純文字（用在「已標記題目」清單的摘要） */
  function plain(s) {
    return String(s == null ? "" : s)
      .replace(/\[\[fig:[^\]]*\]\]/gi, "")
      .replace(/\*([^*\n]+)\*/g, "$1")
      .replace(/`([^`\n]+)`/g, "$1")
      .replace(/\s+/g, " ")
      .trim();
  }

  function fmtClock(sec) {
    sec = Math.max(0, Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  }

  function fmtDateTime(iso) {
    try {
      var d = new Date(iso);
      var p = function (n) { return (n < 10 ? "0" : "") + n; };
      return (d.getMonth() + 1) + "/" + d.getDate() + " " + p(d.getHours()) + ":" + p(d.getMinutes());
    } catch (e) { return iso || ""; }
  }

  function shuffle(a) {
    var x = a.slice();
    for (var i = x.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = x[i]; x[i] = x[j]; x[j] = t;
    }
    return x;
  }

  /* ---------------- 題目文字渲染 ----------------
     各科題庫共用兩種標記：
       [[fig:檔名|圖說]] → 讀該科 img/ 下的 SVG
       *英文*            → 粗體（原科目頁是點擊發音；小考不插互動，避免誤觸）
       `音標`            → 音標字型
     其餘一律轉義，不合併任何未經驗證的 HTML。 */
  function rich(subjectDir, s) {
    var str = String(s == null ? "" : s);
    var figs = [];

    str = str.replace(/\[\[fig:([a-z0-9\-]+)(?:\|([^\]]*))?\]\]/gi, function (_, slug, cap) {
      figs.push(
        '<figure class="qfig">' +
          '<img src="../' + encodeURI(subjectDir) + '/img/' + encodeURIComponent(slug) + '.svg"' +
            ' alt="' + esc(cap || "") + '"' +
            ' onerror="this.closest(\'figure\').style.display=\'none\'">' +
          (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : "") +
        '</figure>'
      );
      return "";
    });

    var out = "", last = 0, m;
    var re = /(\*[^*\n]+\*|`[^`\n]+`)/g;
    while ((m = re.exec(str)) !== null) {
      out += esc(str.slice(last, m.index));
      var tok = m[0];
      if (tok.charAt(0) === "*") {
        out += '<b class="en">' + esc(tok.slice(1, -1)) + "</b>";
      } else {
        out += '<span class="ph">' + esc(tok.slice(1, -1)) + "</span>";
      }
      last = m.index + tok.length;
    }
    out += esc(str.slice(last));

    return figs.join("") + out.replace(/\n/g, "<br>");
  }

  /* ---------------- 穩定題目 ID ----------------
     用「題幹 + 選項集合（排序後）+ 正確選項文字 + 短文」算雜湊。
     選項在出卷時會被打散，所以排序後再算，順序不影響 ID。
     兩個 32-bit FNV-1a 串成 16 碼十六進位，碰撞機率可忽略。 */
  function normText(s) {
    return String(s == null ? "" : s)
      .replace(/\s+/g, "")
      .replace(/[「」『』〔〕（）()［］\[\]{}，,。．.、；;：:！!？?…·\-—–_～~]/g, "");
  }

  function fnv(str, seed) {
    var h = seed >>> 0;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return ("00000000" + h.toString(16)).slice(-8);
  }

  function qid(subjectId, q) {
    var opts = (q.o || []).map(normText).slice().sort().join("|");
    var correct = normText((q.o || [])[q.a]);
    var a = fnv(subjectId + "|" + normText(q.q) + "|" + opts + "|" + correct, 2166136261);
    var b = fnv(subjectId + "|" + normText(q.p) + "|" + normText(q.q), 2166136261 ^ 2654435769);
    return "q" + a + b;
  }

  /* ---------------- 載入題庫 ---------------- */
  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = src;
      s.async = false;
      s.onload = function () { resolve(); };
      s.onerror = function () { reject(new Error("題庫載入失敗：" + src)); };
      document.head.appendChild(s);
    });
  }

  function bankFiles(sub) {
    if (sub.bank === "single") return ["bank.js"];
    var out = [];
    for (var i = 1; i <= DAYS; i++) out.push("day-" + (i < 10 ? "0" : "") + i + ".js");
    return out;
  }

  function loadPapers(sub) {
    /* 每次重新載入前先清空，避免同一頁重複載入時題目疊加 */
    window.EXAM = { papers: [] };
    var base = "../" + sub.dir + "/papers/";
    var files = bankFiles(sub);
    return Promise.all(files.map(function (f) { return loadScript(base + f); }))
      .then(function () { return (window.EXAM && window.EXAM.papers) || []; });
  }

  /* 把 19 卷攤平、去重，回傳單一題庫 */
  function buildPool(subjectId) {
    var sub = getSubject(subjectId);
    if (!sub) return Promise.reject(new Error("未知科目：" + subjectId));

    return loadPapers(sub).then(function (papers) {
      var seen = {};
      var list = [];

      papers.forEach(function (p) {
        (p.q || []).forEach(function (q) {
          if (!q || !q.q || !q.o || typeof q.a !== "number") return;
          var id = qid(subjectId, q);
          if (seen[id]) return;
          seen[id] = 1;
          list.push({
            id: id,
            subject: subjectId,
            paper: p.key || "",
            paperName: p.short || p.name || "",
            u: q.u || "",
            d: q.d || "",
            g: q.g || 4,
            grp: q.grp || "",
            q: q.q,
            o: q.o.slice(),
            a: q.a,
            e: q.e || "",
            w: q.w || [],
            p: q.p || ""
          });
        });
      });

      return list;
    });
  }

  /* ---------------- 抽題 ----------------
     規則：
       1. 先排除「爸爸已標記檢討過」的題目
       2. 優先抽「兒子沒做過」的題目
       3. 依單元輪流抽，讓一張小考涵蓋多個單元，不會全落在同一課
       4. 真的不夠才回頭抽做過的題目（但絕不抽已檢討的） */
  function stratifyByUnit(list, n) {
    if (!list.length) return [];
    var groups = {}, order = [];
    list.forEach(function (x) {
      var k = x.u || "其他";
      if (!groups[k]) { groups[k] = []; order.push(k); }
      groups[k].push(x);
    });
    order = shuffle(order);
    order.forEach(function (k) { groups[k] = shuffle(groups[k]); });

    var out = [], round = 0;
    while (out.length < n) {
      var added = false;
      for (var i = 0; i < order.length && out.length < n; i++) {
        var g = groups[order[i]];
        if (round < g.length) { out.push(g[round]); added = true; }
      }
      if (!added) break;
      round++;
    }
    return out;
  }

  function pickQuiz(pool, n, doneSet, seenSet, retrySet) {
    retrySet = retrySet || {};
    var avail = pool.filter(function (x) { return !doneSet[x.id] || retrySet[x.id]; });

    var chosen = [], have = {}, usedGrp = {};

    function take(list) {
      for (var i = 0; i < list.length && chosen.length < n; i++) {
        var x = list[i];
        if (have[x.id]) continue;
        if (x.grp && usedGrp[x.grp]) continue;
        if (x.grp) usedGrp[x.grp] = 1;
        have[x.id] = 1;
        chosen.push(x);
      }
    }

    /* 1. 爸爸按過「再考一次」的題目優先出 */
    take(shuffle(avail.filter(function (x) { return retrySet[x.id]; })));

    /* 2. 沒做過的題目，依單元輪流抽 */
    take(stratifyByUnit(avail.filter(function (x) {
      return !have[x.id] && !seenSet[x.id];
    }), n - chosen.length));

    /* 3. 真的不夠，才回頭抽做過的（但絕不抽已檢討的） */
    if (chosen.length < n) {
      var restFresh = shuffle(avail.filter(function (x) { return !have[x.id] && !seenSet[x.id]; }));
      var restSeen = shuffle(avail.filter(function (x) { return !have[x.id] && seenSet[x.id]; }));
      take(restFresh.concat(restSeen));
    }

    return shuffle(chosen).slice(0, n);
  }

  /* ---------------- Supabase ---------------- */
  function sbBase() {
    return String(cfg().SUPABASE_URL || "").replace(/\/+$/, "");
  }

  function sb(path, opts) {
    opts = opts || {};
    var key = cfg().SUPABASE_ANON_KEY;
    var headers = {
      "apikey": key,
      "Authorization": "Bearer " + key,
      "Content-Type": "application/json"
    };
    if (opts.headers) {
      for (var k in opts.headers) if (opts.headers.hasOwnProperty(k)) headers[k] = opts.headers[k];
    }
    return fetch(sbBase() + "/rest/v1/" + path, {
      method: opts.method || "GET",
      headers: headers,
      body: opts.body
    }).then(function (r) {
      if (!r.ok) {
        return r.text().then(function (t) {
          var raw = String(t);
          if (r.status === 404 || /PGRST205/.test(raw) || /Could not find the table/i.test(raw)) {
            throw new Error("資料表還沒建立：請到 Supabase → SQL Editor 執行「小考/supabase.sql」整份內容。");
          }
          if (r.status === 401 || r.status === 403) {
            throw new Error("沒有權限（" + r.status + "）：請確認 supabase.sql 的 grant 與 RLS 政策都執行成功。");
          }
          throw new Error("資料庫回應 " + r.status + "：" + raw.slice(0, 200));
        });
      }
      /* Supabase 在 return=minimal 或 204 時會回空 body，
         即使是 application/json 也不能直接 json()。 */
      if (r.status === 204) return null;
      var ct = r.headers.get("content-type") || "";
      if (ct.indexOf("json") >= 0) {
        return r.text().then(function (t) {
          if (!t) return null;
          try { return JSON.parse(t); } catch (e) { return null; }
        });
      }
      return r.text();
    });
  }

  function listSubmissions(opts) {
    opts = opts || {};
    var q = "submissions?select=id,created_at,student,subject,subject_name,requested,total,correct,elapsed_sec,reviewed" +
      "&order=created_at.desc&limit=" + (opts.limit || 60);
    if (opts.reviewed === false) q += "&reviewed=eq.false";
    return sb(q);
  }

  function getSubmission(id) {
    return sb("submissions?id=eq." + encodeURIComponent(id) + "&select=*").then(function (rows) {
      return (rows && rows[0]) || null;
    });
  }

  function createSubmission(row) {
    return sb("submissions", {
      method: "POST",
      headers: { "Prefer": "return=minimal" },
      body: JSON.stringify(row)
    });
  }

  function markSubmissionReviewed(id, reviewed) {
    return sb("submissions?id=eq." + encodeURIComponent(id), {
      method: "PATCH",
      headers: { "Prefer": "return=minimal" },
      body: JSON.stringify({ reviewed: reviewed !== false })
    });
  }

  function listDone(subjectId) {
    var q = "done_questions?select=id,subject,label,unit,created_at&order=created_at.desc";
    if (subjectId) q += "&subject=eq." + encodeURIComponent(subjectId);
    return sb(q);
  }

  function addDone(items, subjectId) {
    if (!items || !items.length) return Promise.resolve(true);
    var rows = items.map(function (x) {
      if (typeof x === "string") return { id: x, subject: subjectId, label: "", unit: "" };
      return {
        id: x.id,
        subject: subjectId,
        label: String(x.label || "").slice(0, 120),
        unit: String(x.unit || "").slice(0, 80)
      };
    });
    return sb("done_questions", {
      method: "POST",
      headers: { "Prefer": "resolution=ignore-duplicates,return=minimal" },
      body: JSON.stringify(rows)
    });
  }

  function removeDone(id) {
    return sb("done_questions?id=eq." + encodeURIComponent(id), { method: "DELETE" });
  }

  /* 一次移除多筆「已檢討」。id 太長時網址會爆掉，所以每 100 筆切成一次。 */
  function removeDoneMany(ids) {
    if (!ids || !ids.length) return Promise.resolve(true);
    var list = ids.filter(function (id) { return /^[A-Za-z0-9_]+$/.test(String(id)); });
    if (!list.length) return Promise.resolve(true);
    var chunks = [];
    for (var i = 0; i < list.length; i += 100) chunks.push(list.slice(i, i + 100));
    return chunks.reduce(function (p, chunk) {
      return p.then(function () {
        return sb("done_questions?id=in.(" + chunk.join(",") + ")", { method: "DELETE" });
      });
    }, Promise.resolve(true));
  }

  /* ---------------- 再考清單 ----------------
     爸爸討論過、想再考一次的題目。出卷時會優先抽這些題目，
     兒子作答後就自動從清單移除（沒作答的會留著）。 */
  function listRetry(subjectId) {
    var q = "retry_questions?select=id,subject,label,unit,created_at&order=created_at.desc";
    if (subjectId) q += "&subject=eq." + encodeURIComponent(subjectId);
    return sb(q);
  }

  /* 可以一次加入不同科目的題目（題庫總表勾選時用），
     每筆若有自己的 subject 就用它，否則才用第二個參數。 */
  function addRetry(items, subjectId) {
    if (!items || !items.length) return Promise.resolve(true);
    var rows = items.map(function (x) {
      if (typeof x === "string") return { id: x, subject: subjectId, label: "", unit: "" };
      return {
        id: x.id,
        subject: x.subject || subjectId,
        label: String(x.label || "").slice(0, 120),
        unit: String(x.unit || "").slice(0, 80)
      };
    });
    /* 題庫總表可能一次勾選上千題，切成小批比較穩 */
    var chunks = [];
    for (var i = 0; i < rows.length; i += 200) chunks.push(rows.slice(i, i + 200));
    return chunks.reduce(function (p, chunk) {
      return p.then(function () {
        return sb("retry_questions", {
          method: "POST",
          headers: { "Prefer": "resolution=ignore-duplicates,return=minimal" },
          body: JSON.stringify(chunk)
        });
      });
    }, Promise.resolve(true));
  }

  function removeRetry(id) {
    return sb("retry_questions?id=eq." + encodeURIComponent(id), { method: "DELETE" });
  }

  function removeRetryMany(ids) {
    if (!ids || !ids.length) return Promise.resolve(true);
    var list = ids.filter(function (id) { return /^[A-Za-z0-9_]+$/.test(String(id)); });
    if (!list.length) return Promise.resolve(true);
    return sb("retry_questions?id=in.(" + list.join(",") + ")", { method: "DELETE" });
  }

  /* 兒子做過的題目（只抓最近幾份，避免整張表拉下來） */
  function listSeenIds(limit) {
    return sb("submissions?select=ids&order=created_at.desc&limit=" + (limit || 40)).then(function (rows) {
      var set = {};
      (rows || []).forEach(function (r) {
        (r.ids || []).forEach(function (id) { set[id] = 1; });
      });
      return set;
    });
  }

  /* ---------------- 題庫（完整題目）----------------
     題庫檔還是出題的來源（載入快、可離線），資料庫這張表是完整備份
     與管理用。管理頁按「匯入／更新資料庫題庫」時，把 questions.json
     分批寫進來；已存在的同 id 題目會更新，不會重複。 */
  function importQuestions(rows, onProgress) {
    if (!rows || !rows.length) return Promise.resolve(0);
    var clean = rows.map(function (x) {
      return {
        id: x.id,
        subject: x.subject,
        unit: x.unit || "",
        label: String(x.label || "").slice(0, 160),
        data: x.data || {},
        updated_at: new Date().toISOString()
      };
    });
    var batches = [];
    for (var i = 0; i < clean.length; i += 150) batches.push(clean.slice(i, i + 150));

    var done = 0;
    return batches.reduce(function (p, batch) {
      return p.then(function () {
        return sb("questions?on_conflict=id", {
          method: "POST",
          headers: { "Prefer": "resolution=merge-duplicates,return=minimal" },
          body: JSON.stringify(batch)
        }).then(function () {
          done += batch.length;
          if (onProgress) onProgress(done, clean.length);
        });
      });
    }, Promise.resolve()).then(function () { return clean.length; });
  }

  /* 用 HEAD + count=exact 取得資料庫題庫筆數，不用把題目全部拉下來。
     回傳 null 代表表不存在或無法讀取。 */
  function countQuestions() {
    var key = cfg().SUPABASE_ANON_KEY;
    return fetch(sbBase() + "/rest/v1/questions?select=id", {
      method: "HEAD",
      headers: {
        "apikey": key,
        "Authorization": "Bearer " + key,
        "Prefer": "count=exact",
        "Range": "0-0"
      }
    }).then(function (r) {
      if (!r.ok) return null;
      var cr = r.headers.get("content-range") || "";
      var m = /\/(\d+)$/.exec(cr);
      return m ? parseInt(m[1], 10) : null;
    }).catch(function () { return null; });
  }

  /* ---------------- ntfy 推播 ---------------- */
  function notify(title, message, clickUrl) {
    var c = cfg();
    if (!c.NTFY_TOPIC) return Promise.resolve(false);

    var body = {
      topic: c.NTFY_TOPIC,
      title: title,
      message: message,
      priority: 4,
      tags: ["memo"]
    };
    if (clickUrl) body.click = clickUrl;

    return fetch("https://ntfy.sh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) { return r.ok; }).catch(function () { return false; });
  }

  /* ---------------- 英文發音 ----------------
     一律用 en-US；如果系統有 Microsoft Mark 就優先用它
     （Windows 內建、咬字清楚），沒有才退回其他 en-US / en 語音。 */
  var _voiceCache = null;

  function allVoices() {
    try {
      var sy = window.speechSynthesis;
      if (!sy) return [];
      var v = sy.getVoices() || [];
      if (v.length) _voiceCache = v;
      return _voiceCache || v;
    } catch (e) { return []; }
  }

  function pickVoice() {
    var vs = allVoices();
    var markUS = null, markAny = null, us = null, anyEn = null;
    for (var i = 0; i < vs.length; i++) {
      var v = vs[i];
      var nm = String(v.name || "");
      var lg = String(v.lang || "").replace("_", "-").toLowerCase();
      if (/mark/i.test(nm) && /^en-us/.test(lg) && !markUS) markUS = v;
      if (/mark/i.test(nm) && /^en/.test(lg) && !markAny) markAny = v;
      if (/^en-us/.test(lg) && !us) us = v;
      if (/^en/.test(lg) && !anyEn) anyEn = v;
    }
    return markUS || markAny || us || anyEn || null;
  }

  function speak(text, rate) {
    var sy = window.speechSynthesis;
    var s = String(text || "").trim();
    if (!sy || !s) return false;
    try {
      sy.cancel();
      var u = new SpeechSynthesisUtterance(s);
      var v = pickVoice();
      u.lang = "en-US";
      if (v) u.voice = v;
      u.rate = rate || 0.9;
      u.pitch = 1;
      u.volume = 1;
      sy.speak(u);
      return true;
    } catch (e) { return false; }
  }

  function stopSpeak() {
    try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (e) { }
  }

  /* 從題目文字（含 *粗體*、`音標` 標記）抽出可以唸的英文；
     沒有英文就回空字串。 */
  function englishText(s) {
    var t = String(s == null ? "" : s);
    t = t.replace(/\[\[fig:[^\]]*\]\]/gi, " ");
    t = t.replace(/`[^`]*`/g, " ");
    t = t.replace(/\*([^*\n]+)\*/g, " $1 ");
    t = t.replace(/_{2,}/g, " ");
    t = t.replace(/[^A-Za-z'’\-.,!?;:()\/\s]/g, " ");
    t = t.replace(/\s+/g, " ").replace(/\s+([.,!?;:])/g, "$1").trim();
    return /[A-Za-z]/.test(t) ? t : "";
  }

  /* ---------------- 對外 ---------------- */
  window.QCORE = {
    SUBJECTS: SUBJECTS,
    DAYS: DAYS,
    cfg: cfg,
    configured: configured,
    getSubject: getSubject,
    esc: esc,
    plain: plain,
    fmtClock: fmtClock,
    fmtDateTime: fmtDateTime,
    shuffle: shuffle,
    rich: rich,
    qid: qid,
    buildPool: buildPool,
    pickQuiz: pickQuiz,
    listSubmissions: listSubmissions,
    getSubmission: getSubmission,
    createSubmission: createSubmission,
    markSubmissionReviewed: markSubmissionReviewed,
    listDone: listDone,
    addDone: addDone,
    removeDone: removeDone,
    removeDoneMany: removeDoneMany,
    listRetry: listRetry,
    addRetry: addRetry,
    removeRetry: removeRetry,
    removeRetryMany: removeRetryMany,
    listSeenIds: listSeenIds,
    importQuestions: importQuestions,
    countQuestions: countQuestions,
    speak: speak,
    stopSpeak: stopSpeak,
    englishText: englishText,
    notify: notify
  };
})();
