/* 驗證 papers/day-01.js ～ day-19.js */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIR = path.join(ROOT, "papers");

global.window = {};
const files = fs.readdirSync(DIR).filter(f => /^day-\d+\.js$/.test(f)).sort();
files.forEach(f => {
  eval(fs.readFileSync(path.join(DIR, f), "utf8"));
});

const papers = global.window.EXAM.papers;
let fail = 0;
const err = m => { console.log("FAIL: " + m); fail++; };

console.log("試卷數: " + papers.length);
if (papers.length !== 19) err("應為 19 張試卷");

const allStems = new Map();
const labelCount = {};

papers.forEach((p, pi) => {
  if (p.q.length !== 50) err(p.key + " 題數應為 50，實際 " + p.q.length);
  const dist = [0, 0, 0, 0];
  const local = new Set();
  let reading = 0;

  p.q.forEach((q, i) => {
    const tag = p.key + "#" + (i + 1);
    ["g", "u", "d", "q", "o", "a", "e", "w"].forEach(k => {
      if (q[k] === undefined) err(tag + " 缺欄位 " + k);
    });
    if (!Array.isArray(q.o) || q.o.length !== 4) err(tag + " 選項數應為 4");
    if (new Set((q.o || []).map(String)).size !== 4) err(tag + " 選項重複: " + JSON.stringify(q.o));
    if ((q.o || []).some(o => !o || String(o).trim() === "")) err(tag + " 有空選項");
    if (!Number.isInteger(q.a) || q.a < 0 || q.a > 3) err(tag + " 答案索引錯誤");
    if (!["易", "中", "難"].includes(q.d)) err(tag + " 難度錯誤: " + q.d);
    if (typeof q.e !== "string" || q.e.length < 8) err(tag + " 解析過短");
    if (!Array.isArray(q.w) || q.w.length !== 4) err(tag + " w 長度不為 4");
    else {
      if (q.w[q.a] !== "") err(tag + " 正解解析應為空字串");
      q.w.forEach((w, k) => { if (k !== q.a && (typeof w !== "string" || w.length < 5)) err(tag + " 選項 " + k + " 錯項解析過短"); });
    }
    if (String(q.q).length < 6) err(tag + " 題幹過短");
    if (q.p) {
      reading++;
      if (typeof q.p !== "string" || q.p.length < 30) err(tag + " 素養題組短文過短");
      if (i < 40) err(tag + " 素養題組應排在最後 10 題");
    } else if (["閱讀理解", "課文理解", "篇章結構"].includes(q.u)) {
      err(tag + " 標為 " + q.u + " 卻沒有短文");
    }
    if (local.has(q.q)) err(tag + " 同卷題幹重複");
    local.add(q.q);
    if (allStems.has(q.q)) { /* 跨卷重複允許（輪替複習），僅統計 */ } else allStems.set(q.q, tag);
    labelCount[q.u] = (labelCount[q.u] || 0) + 1;
    dist[q.a]++;
  });

  const pct = dist.map(c => Math.round(c / 50 * 100));
  if (Math.max.apply(null, pct) - Math.min.apply(null, pct) > 12) err(p.key + " 答案分布偏差過大 A/B/C/D=" + dist.join("/"));
  if (reading !== 10) err(p.key + " 素養題組應為 10 題，實際 " + reading);
});

console.log("\n題型（u）總題數分布：");
Object.keys(labelCount).sort((a, b) => labelCount[b] - labelCount[a])
  .forEach(u => console.log("  " + u + "：" + labelCount[u]));

console.log("\n不重複題幹總數：" + allStems.size + "（19 天共 " + papers.reduce((s, p) => s + p.q.length, 0) + " 題）");
console.log(fail === 0 ? "\n✓ 全部檢核通過" : "\n✗ 有 " + fail + " 項問題");
process.exit(fail === 0 ? 0 : 1);
