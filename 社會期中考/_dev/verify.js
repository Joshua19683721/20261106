/* ============================================================
   社會期中考｜試卷檢核（_dev/verify.js）
   執行：node _dev/verify.js
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");

const OUT = path.join(__dirname, "..", "papers");
global.window = {};
const files = fs.readdirSync(OUT).filter((f) => /^day-\d\d\.js$/.test(f)).sort();
files.forEach((f) => require(path.join(OUT, f)));
const P = (global.window.EXAM && global.window.EXAM.papers) || [];
const meta = require(path.join(__dirname, "units.js"));
const UNITS = meta.units.map((x) => x.u);
const CODE = {};
meta.units.forEach((x) => { CODE[x.u] = x.code; });

const SELECT_POOL = ["sel-a.js", "sel-b.js", "sel-c.js", "sel-d.js"]
  .reduce((a, f) => a.concat(require(path.join(__dirname, "pool", f))), []);
const PASSAGE_POOL = ["pas-a.js", "pas-b.js"]
  .reduce((a, f) => a.concat(require(path.join(__dirname, "pool", f))), []);

let bad = 0;
function fail(msg) { bad++; console.log("  ✗ " + msg); }

console.log("試卷數：" + P.length + "（預期 19）");
if (P.length !== 19) fail("試卷數不是 19");

const allStems = {};
let totalQ = 0;
const unitCount = {};
UNITS.forEach((u) => { unitCount[u] = 0; });
const letterTotal = [0, 0, 0, 0];
let covBad = 0;

P.forEach((p, pi) => {
  const n = p.q.length;
  totalQ += n;
  if (n !== 50) fail(p.key + " 題數 " + n + "（預期 50）");
  const sel = p.q.filter((q) => !q.p);
  const pas = p.q.filter((q) => q.p);
  if (sel.length !== 40) fail(p.key + " 選擇題 " + sel.length + "（預期 40）");
  if (pas.length !== 10) fail(p.key + " 素養題 " + pas.length + "（預期 10）");

  const gotUnits = new Set(sel.map((q) => q.u));
  const missingUnits = UNITS.filter((u) => !gotUnits.has(u));
  const unknownUnits = [...gotUnits].filter((u) => UNITS.indexOf(u) < 0);
  if (missingUnits.length) { covBad++; fail(p.key + " 未涵蓋小節：" + missingUnits.join("、")); }
  if (unknownUnits.length) fail(p.key + " 出現未列出的小節：" + unknownUnits.join("、"));

  const seen = {};
  const wantG = {};
  p.q.forEach((q, i) => {
    if (!q.q) fail(p.key + " 第 " + (i + 1) + " 題缺少題幹");
    if (!Array.isArray(q.o) || q.o.length !== 4) fail(p.key + " 第 " + (i + 1) + " 題選項數錯誤");
    if (q.a < 0 || q.a > 3) fail(p.key + " 第 " + (i + 1) + " 題答案索引錯誤");
    if (!Array.isArray(q.w) || q.w.length !== 4) fail(p.key + " 第 " + (i + 1) + " 題錯項解析數錯誤");
    else if (q.w[q.a] !== "") fail(p.key + " 第 " + (i + 1) + " 題正解位置的錯項解析不是空字串");
    if (!q.e) fail(p.key + " 第 " + (i + 1) + " 題缺少解析");
    if (q.o.indexOf("") >= 0) fail(p.key + " 第 " + (i + 1) + " 題有空選項");
    const key = q.q;
    if (seen[key]) fail(p.key + " 題幹重複：" + key.slice(0, 20));
    seen[key] = 1;
    allStems[key] = (allStems[key] || 0) + 1;
    letterTotal[q.a]++;
    if (q.p) {
      wantG[q.u] = 1;
    } else {
      if (UNITCHECK(q.u)) unitCount[q.u]++;
    }
  });
  const grp = Object.keys(wantG).length;
  if (grp !== 2) fail(p.key + " 素養題組數 " + grp + "（預期 2）");
  const min = Math.min.apply(null, letterTotal.slice(0, 4));
});

function UNITCHECK(u) { return UNITS.indexOf(u) >= 0; }

Object.keys(unitCount).forEach((u) => {
  if (unitCount[u] === 0) fail("子題「" + u + "（" + CODE[u] + "）」在所有試卷中從未出現");
});

console.log("總題數：" + totalQ + "（預期 950）");
console.log("每卷小節涵蓋：" + (P.length - covBad) + " / " + P.length + "（" + UNITS.length + " 小節）");
console.log("不重複題幹：" + Object.keys(allStems).length);
console.log("答案分布 A/B/C/D：" + letterTotal.join(" / "));
const distinctSelect = SELECT_POOL.length;
const distinctPas = PASSAGE_POOL.reduce((a, g) => a + g.qs.length, 0);
console.log("選擇題庫 " + distinctSelect + " 題｜素養題庫 " + distinctPas + " 題");

// 每張試卷的正解字母分布
P.forEach((p) => {
  const c = [0, 0, 0, 0];
  p.q.forEach((q) => c[q.a]++);
  const spread = Math.max.apply(null, c) - Math.min.apply(null, c);
  if (spread > 4) fail(p.key + " 答案分布不均：" + c.join("/"));
});
console.log("答案分布最大極差檢查完成。");

// 選項重複檢查
P.forEach((p) => {
  p.q.forEach((q, i) => {
    const set = {};
    q.o.forEach((o) => { set[o] = (set[o] || 0) + 1; });
    if (Object.keys(set).length !== 4) fail(p.key + " 第 " + (i + 1) + " 題選項有重複");
  });
});
console.log("選項重複檢查完成。");

if (bad) { console.log("\n合計 " + bad + " 個問題。"); process.exit(1); }
console.log("\n全部檢核通過。");
