/* 檢查單一題庫檔格式：node checkone.js <檔名>
   例：node checkone.js a-yin.js
*/
const fs = require("fs");
const path = require("path");
const POOL = path.join(__dirname, "pool");
const file = process.argv[2];
if (!file) { console.log("用法：node checkone.js <檔名>"); process.exit(1); }
let mod;
try { mod = require(path.join(POOL, file)); }
catch (e) { console.log("✗ 載入失敗：" + e.message); process.exit(1); }
if (!Array.isArray(mod)) { console.log("✗ 不是陣列"); process.exit(1); }

let bad = 0;
function checkItem(tag, it) {
  const e = m => { console.log("  ✗ " + tag + " " + m); bad++; };
  if (!it || typeof it.q !== "string") return e("缺 q");
  if (it.d !== undefined && !["易", "中", "難"].includes(it.d)) e("d 錯誤：" + it.d);
  if (!Array.isArray(it.o) || it.o.length !== 4) e("選項數不是 4");
  else {
    if (new Set(it.o.map(String)).size !== 4) e("選項重複：" + JSON.stringify(it.o));
    if (it.o.some(o => !o || String(o).trim() === "")) e("有空選項");
    if (/[A-Za-z]/.test(it.o.join(""))) e("選項含英文字母");
  }
  if (!Number.isInteger(it.a) || it.a < 0 || it.a > 3) e("答案索引錯誤");
  if (!Array.isArray(it.w) || it.w.length !== 4) e("w 長度不是 4");
  else if (it.w[it.a] !== "") e("w[a] 不是空字串");
  if (typeof it.e !== "string" || it.e.length < 8) e("e 太短");
  if (/[A-Za-z]/.test(it.q)) e("題幹含英文字母");
}
const isPassage = mod.length && mod[0] && Array.isArray(mod[0].qs);
let items = 0;
if (isPassage) {
  mod.forEach((g, gi) => {
    if (typeof g.p !== "string" || g.p.trim().length < 40) { console.log("  ✗ 題組 " + (g.id || gi) + " 短文過短"); bad++; }
    if (!Array.isArray(g.qs) || g.qs.length !== 5) { console.log("  ✗ 題組 " + (g.id || gi) + " 題數不是 5"); bad++; }
    (g.qs || []).forEach((q, qi) => { items++; checkItem((g.id || gi) + "-" + (qi + 1), q); });
  });
} else {
  mod.forEach((g, gi) => { items++; checkItem("#" + (gi + 1), g); });
}

const dist = [0, 0, 0, 0];
if (isPassage) mod.forEach(g => (g.qs || []).forEach(q => { if (Number.isInteger(q.a) && q.a >= 0 && q.a < 4) dist[q.a]++; }));
else mod.forEach(q => { if (Number.isInteger(q.a) && q.a >= 0 && q.a < 4) dist[q.a]++; });

console.log("[" + file + "] " + (isPassage ? mod.length + " 題組 / " : "") + items + " 題  答案分布 " + dist.join("/"));
console.log(bad === 0 ? "✓ " + file + " 格式通過" : "✗ " + file + " 共 " + bad + " 項問題");
