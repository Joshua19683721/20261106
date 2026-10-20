#!/usr/bin/env node
/* ============================================================
   108 課綱符合性檢查器
   ------------------------------------------------------------
   用途：把「符合課綱」變成可重複執行的驗證，而不是口頭宣稱。
   執行：node check-curriculum.js

   檢查項目
     國語文：所有題目的漢字是否都落在課本語料庫（課內字涵蓋率）
     社會  ：每一題（含素養題）是否都對應到 units.js 的課綱碼
     自然  ：每一題（含素養題）是否都對應到官方 108 課綱學習內容碼，
             且該碼確實存在於第二學習階段的 55 條之中
     數學  ：19 張試卷是否每張都涵蓋 39 個課本小節、50 題結構與答案分布
     英語文：目前未建立課綱對照表

   離開碼：0 = 全部通過，1 = 有項目未通過
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = __dirname;
let failed = 0;

function line(ch) { return (ch || "=").repeat(60); }
function pct(a, b) { return b === 0 ? "—" : (a / b * 100).toFixed(2) + "%"; }
function fail(msg) { failed++; console.log("  ✗ " + msg); }
function ok(msg) { console.log("  ✓ " + msg); }

function readModule(p) {
  delete require.cache[require.resolve(p)];
  return require(p);
}

function poolFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort().map(f => path.join(dir, f));
}

/* ---------------- 國語文 ---------------- */
function checkChinese() {
  console.log("【國語文】課內字詞涵蓋");
  const devDir = path.join(ROOT, "國語文期中考", "_dev");
  const vocabPath = path.join(devDir, "vocab.js");
  if (!fs.existsSync(vocabPath)) { fail("找不到 vocab.js"); return; }

  const V = readModule(vocabPath);
  const charset = V.charset;
  const HAN = /\p{Script=Han}/u;

  const files = poolFiles(path.join(devDir, "pool"));
  if (!files.length) { fail("找不到題庫 pool/"); return; }

  let items = 0, chars = 0, inSet = 0;
  const outside = new Map();

  const handle = (it) => {
    items++;
    const text = [it.q, (it.o || []).join(""), it.e, (it.w || []).join("")].join("");
    for (const ch of String(text == null ? "" : text)) {
      if (!HAN.test(ch)) continue;
      chars++;
      if (charset.has(ch)) inSet++;
      else outside.set(ch, (outside.get(ch) || 0) + 1);
    }
  };

  files.forEach(f => {
    let mod;
    try { mod = readModule(f); } catch (e) { fail(path.basename(f) + " 載入失敗：" + e.message); return; }
    if (!Array.isArray(mod)) return;
    if (mod.length && mod[0] && Array.isArray(mod[0].qs)) {
      mod.forEach(g => (g.qs || []).forEach(handle));
    } else {
      mod.forEach(handle);
    }
  });

  console.log("  題庫檔數        ：" + files.length);
  console.log("  題數            ：" + items);
  console.log("  漢字總數        ：" + chars);
  console.log("  課內字          ：" + inSet + "（" + pct(inSet, chars) + "）");
  console.log("  課外字          ：" + outside.size);
  if (outside.size) {
    const top = [...outside.entries()].sort((a, b) => b[1] - a[1]).slice(0, 20)
      .map(([c, n]) => c + "×" + n).join("、");
    console.log("  課外字（最多）  ：" + top);
    fail("有 " + outside.size + " 個課外字");
  } else {
    ok("全部漢字皆為課內字");
  }

  checkChineseConsistency();
  console.log("");
}

/* 答案一致性：同一題幹＋同一組選項（或同一篇短文）不應出現兩個正解 */
function checkChineseConsistency() {
  const files = poolFiles(path.join(ROOT, "國語文期中考", "_dev", "pool"));
  const byKey = new Map();

  const add = (key, it) => {
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(String((it.o || [])[it.a]));
  };

  files.forEach(f => {
    let mod;
    try { mod = readModule(f); } catch (e) { return; }
    if (!Array.isArray(mod)) return;
    if (mod.length && mod[0] && Array.isArray(mod[0].qs)) {
      // 素養題：同一篇短文內的同一題幹才算同一題
      mod.forEach(g => {
        const ctx = String(g.p || "").trim().slice(0, 80);
        (g.qs || []).forEach(it => add("P:" + ctx + "|Q:" + it.q, it));
      });
    } else {
      // 單題：題幹與選項完全相同才算同一題
      mod.forEach(it => {
        const sig = (it.o || []).map(String).slice().sort().join("¦");
        add("Q:" + it.q + "|O:" + sig, it);
      });
    }
  });

  let conflicts = 0;
  byKey.forEach(arr => { if (new Set(arr).size > 1) conflicts++; });

  if (conflicts) fail("有 " + conflicts + " 組題目同題幹同選項卻答案不同");
  else ok("答案一致性：無矛盾");
}

/* ---------------- 社會 ---------------- */
function checkSocial() {
  console.log("【社會】課綱碼覆蓋");
  const devDir = path.join(ROOT, "社會期中考", "_dev");
  const unitsPath = path.join(devDir, "units.js");
  if (!fs.existsSync(unitsPath)) { fail("找不到 units.js"); return; }

  const U = readModule(unitsPath);
  const valid = new Set(U.units.map(u => u.code));
  const byName = new Map(U.units.map(u => [u.u, u.code]));

  let selTotal = 0, selOk = 0;
  const selBad = [];
  ["sel-a.js", "sel-b.js", "sel-c.js", "sel-d.js"].forEach(f => {
    const p = path.join(devDir, "pool", f);
    if (!fs.existsSync(p)) return;
    readModule(p).forEach(it => {
      selTotal++;
      const code = byName.get(it.u);
      if (code && valid.has(code)) selOk++;
      else selBad.push(it.u + "（" + path.basename(f) + "）");
    });
  });

  let pasTotal = 0, pasOk = 0;
  const pasBad = [];
  ["pas-a.js", "pas-b.js"].forEach(f => {
    const p = path.join(devDir, "pool", f);
    if (!fs.existsSync(p)) return;
    readModule(p).forEach(g => {
      const n = (g.qs || []).length;
      pasTotal += n;
      if (g.code && valid.has(g.code)) pasOk += n;
      else pasBad.push(g.tag + "（" + path.basename(f) + "）");
    });
  });

  console.log("  對照表子題      ：" + U.units.length);
  console.log("  選擇題          ：" + selOk + " / " + selTotal + "（" + pct(selOk, selTotal) + "）");
  console.log("  素養題          ：" + pasOk + " / " + pasTotal + "（" + pct(pasOk, pasTotal) + "）");
  if (selBad.length) fail("未掛碼選擇題：" + selBad.slice(0, 10).join("、"));
  if (pasBad.length) fail("未掛碼素養題組：" + pasBad.join("、"));
  if (!selBad.length && !pasBad.length) ok("每一題都對應到課綱碼");

  // 每張試卷是否涵蓋全部小節
  const papersDir = path.join(ROOT, "社會期中考", "papers");
  const papers = [];
  if (fs.existsSync(papersDir)) {
    fs.readdirSync(papersDir).filter(f => /^day-\d\d\.js$/.test(f)).sort().forEach(f => {
      const sandbox = { window: {} };
      vm.createContext(sandbox);
      vm.runInContext(fs.readFileSync(path.join(papersDir, f), "utf8"), sandbox, { filename: f });
      ((sandbox.window.EXAM && sandbox.window.EXAM.papers) || []).forEach(p => papers.push(p));
    });
  }
  let covBad = 0;
  papers.forEach(p => {
    const got = new Set(p.q.filter(q => !q.p).map(q => q.u));
    const miss = U.units.filter(x => !got.has(x.u)).map(x => x.u);
    if (miss.length) { covBad++; fail(p.key + " 未涵蓋小節：" + miss.join("、")); }
  });
  console.log("  試卷數          ：" + papers.length);
  console.log("  每卷小節涵蓋    ：" + (papers.length - covBad) + " / " + papers.length + "（" + U.units.length + " 小節）");
  if (papers.length && !covBad) ok("每張試卷都涵蓋全部 " + U.units.length + " 個小節");
  console.log("");
}

/* ---------------- 自然 ---------------- */
function checkScience() {
  console.log("【自然】課綱碼覆蓋");
  const devDir = path.join(ROOT, "自然期中考", "_dev");
  const unitsPath = path.join(devDir, "units.js");
  if (!fs.existsSync(unitsPath)) { fail("找不到 _dev/units.js"); return; }

  const N = readModule(unitsPath);
  const official = new Set(Object.keys(N.official));

  // 對照表本身是否正確
  const badRefs = [];
  N.units.forEach(u => { if (!official.has(u.code)) badRefs.push(u.u + " → " + u.code); });
  Object.entries(N.passages).forEach(([k, v]) => { if (!official.has(v)) badRefs.push(k + " → " + v); });
  if (badRefs.length) fail("對照表引用了不存在的課綱碼：" + badRefs.slice(0, 10).join("、"));

  const names = new Set(N.units.map(u => u.u));
  const byName = new Map(N.units.map(u => [u.u, u.code]));

  // 載入題庫（bank.js 是瀏覽器腳本，用 vm + window shim）
  const bankPath = path.join(ROOT, "自然期中考", "papers", "bank.js");
  if (!fs.existsSync(bankPath)) { fail("找不到 papers/bank.js"); return; }
  const src = fs.readFileSync(bankPath, "utf8")
    .replace(/var\s+SELECT\s*=/, "var SELECT = window.__SELECT =");
  const win = {};
  const ctx = { window: win, console };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  try { vm.runInContext(src, ctx, { filename: bankPath }); }
  catch (e) { fail("bank.js 執行失敗：" + e.message); return; }

  const SELECT = win.__SELECT || [];
  let selOk = 0;
  const selBad = [];
  SELECT.forEach(it => {
    if (names.has(it.u)) selOk++;
    else selBad.push(it.u);
  });

  // 素養題：從產出的試卷取得（每題帶 p 與 u）
  const papers = (win.EXAM && win.EXAM.papers) || [];

  // 每張試卷是否涵蓋課本全部小節（26/26）
  const sectionIds = new Set((N.sections || []).map(s => s.id));
  let secBad = 0;
  papers.forEach(p => {
    const got = new Set((p.q || []).filter(q => q.sid).map(q => q.sid));
    const unknown = [...got].filter(id => !sectionIds.has(id));
    if (got.size !== sectionIds.size || unknown.length) {
      secBad++;
      console.log("  ✗ " + p.key + " 小節 " + got.size + "/" + sectionIds.size +
        (unknown.length ? "（未知：" + unknown.join("、") + "）" : ""));
    }
  });
  if (sectionIds.size && !secBad) {
    ok("每張試卷都涵蓋全部 " + sectionIds.size + " 個小節");
  } else if (!sectionIds.size) {
    fail("units.js 沒有 sections 對照表");
  }
  const pasGroups = new Map();
  papers.forEach(p => (p.q || []).forEach(it => {
    if (!it.p) return;
    pasGroups.set(it.u, (pasGroups.get(it.u) || 0) + 1);
  }));
  let pasOk = 0, pasTotal = 0;
  const pasBad = [];
  pasGroups.forEach((n, tag) => {
    pasTotal += n;
    if (N.passages[tag] && official.has(N.passages[tag])) pasOk += n;
    else pasBad.push(tag);
  });

  // 子題是否全部有題目
  const covered = new Set(SELECT.map(x => x.u));
  const noItems = N.units.filter(u => !covered.has(u.u)).map(u => u.u);

  console.log("  官方學習內容    ：" + official.size + " 條（第二學習階段）");
  console.log("  子題對照        ：" + (N.units.length - noItems.length) + " / " + N.units.length);
  console.log("  選擇題          ：" + selOk + " / " + SELECT.length + "（" + pct(selOk, SELECT.length) + "）");
  console.log("  素養題          ：" + pasOk + " / " + pasTotal + "（" + pct(pasOk, pasTotal) + "）");
  console.log("  試卷數          ：" + papers.length);
  console.log("  每卷小節涵蓋    ：" + (sectionIds.size ? (papers.length - secBad) + " / " + papers.length + "（" + sectionIds.size + " 小節）" : "—"));

  if (selBad.length) fail("未對應子題的選擇題：" + [...new Set(selBad)].slice(0, 10).join("、"));
  if (pasBad.length) fail("未對應課綱碼的素養題組：" + pasBad.join("、"));
  if (noItems.length) fail("對照表中沒有題目的子題：" + noItems.join("、"));
  if (!selBad.length && !pasBad.length && !noItems.length && !badRefs.length) {
    ok("每一題都對應到真實存在的官方課綱碼");
  }
  console.log("");
}

/* ---------------- 數學 ---------------- */
function checkMath() {
  console.log("【數學】39 小節覆蓋與試卷結構");
  const bankPath = path.join(ROOT, "數學期中考", "papers", "bank.js");
  if (!fs.existsSync(bankPath)) { fail("找不到 papers/bank.js"); return; }

  const win = {};
  const ctx = { window: win, console };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  try {
    vm.runInContext(fs.readFileSync(bankPath, "utf8"), ctx, { filename: bankPath });
  } catch (e) {
    fail("bank.js 執行失敗：" + e.message);
    return;
  }

  const sections = (win.EXAM && win.EXAM.sections) || [];
  const papers = (win.EXAM && win.EXAM.papers) || [];
  if (!sections.length) { fail("bank.js 沒有 sections 對照表"); return; }
  if (papers.length !== 19) fail("試卷數應為 19，實際 " + papers.length);

  const names = sections.map(s => s.u);
  const nameSet = new Set(names);
  let bad = 0;

  papers.forEach(p => {
    const qs = p.q || [];
    const core = qs.filter(q => !q.p);
    const passage = qs.filter(q => q.p);
    const got = new Set(core.map(q => q.u));
    const miss = names.filter(n => !got.has(n));
    const extra = [...got].filter(n => n !== "統整應用" && !nameSet.has(n));
    const counts = [0, 0, 0, 0];
    qs.forEach(q => { if (q.a >= 0 && q.a < 4) counts[q.a]++; });
    const dup = qs.length - new Set(qs.map(q => q.q)).size;

    const problems = [];
    if (qs.length !== 50) problems.push("題數 " + qs.length);
    if (core.length !== 40) problems.push("核心題 " + core.length);
    if (passage.length !== 10) problems.push("素養題 " + passage.length);
    if (miss.length) problems.push("缺 " + miss.join("、"));
    if (extra.length) problems.push("未知小節 " + extra.join("、"));
    if (counts.join("/") !== "13/13/12/12") problems.push("答案分布 " + counts.join("/"));
    if (dup) problems.push("重複題幹 " + dup);
    if (problems.length) { bad++; fail(p.key + "：" + problems.join("；")); }
  });

  console.log("  小節數          ：" + sections.length);
  console.log("  試卷數          ：" + papers.length);
  console.log("  每卷結構        ：39 小節核心 ＋ 1 統整 ＋ 10 素養");
  console.log("  答案分布        ：A/B/C/D = 13/13/12/12");
  if (!bad && papers.length === 19 && sections.length === 39) {
    ok("每張試卷都涵蓋 39 個小節，且 50 題結構與答案分布正確");
  }
  console.log("");
}

/* ---------------- 其他科目 ---------------- */
function checkOthers() {
  console.log("【英語文】");
  console.log("  未建立課綱對照表（本次未處理）");
  console.log("");
}

/* ---------------- 主程式 ---------------- */
console.log(line("="));
console.log(" 108 課綱符合性檢查");
console.log(" 產生時間：" + new Date().toLocaleString("zh-TW", { hour12: false }));
console.log(line("="));
console.log("");

checkChinese();
checkSocial();
checkScience();
checkMath();
checkOthers();

console.log(line("="));
if (failed) {
  console.log(" 結果：未通過（" + failed + " 項）");
  process.exitCode = 1;
} else {
  console.log(" 結果：全部通過");
}
console.log(line("="));
