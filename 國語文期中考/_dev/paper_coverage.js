/* 檢查最終 19 張試卷的「課內字詞」涵蓋率 */
const fs = require("fs");
const path = require("path");
const V = require("./vocab.js");

global.window = {};
const dir = path.resolve(__dirname, "..", "papers");
fs.readdirSync(dir).filter(f => f.endsWith(".js")).sort().forEach(f => require(path.join(dir, f)));
const papers = (global.window.EXAM && global.window.EXAM.papers) || [];

const HAN = /\p{Script=Han}/u;
function charsOf(s) { const out = []; for (const ch of String(s == null ? "" : s)) if (HAN.test(ch)) out.push(ch); return out; }

let all = 0, inSet = 0, totalQ = 0, wordHit = 0;
const miss = {};
papers.forEach(p => p.q.forEach(it => {
  totalQ++;
  const text = [it.q, (it.o || []).join(""), it.e, (it.w || []).join("")].join("");
  const cs = charsOf(text);
  all += cs.length;
  cs.forEach(c => { if (V.charset.has(c)) inSet++; else miss[c] = (miss[c] || 0) + 1; });
  const opts = (it.o || []).slice().sort((a, b) => String(b).length - String(a).length);
  const key = opts[0] || "";
  if (V.wordset.has(key) || charsOf(key).every(c => V.charset.has(c))) wordHit++;
}));

const top = Object.keys(miss).sort((a, b) => miss[b] - miss[a]).slice(0, 20).map(c => c + "×" + miss[c]).join(" ");
console.log("試卷數：" + papers.length + "｜總題數：" + totalQ);
console.log("課內字元涵蓋率：" + (100 * inSet / all).toFixed(1) + "%（" + inSet + "/" + all + "）");
console.log("主要測試詞命中課內語詞的比例：" + (100 * wordHit / totalQ).toFixed(1) + "%（" + wordHit + "/" + totalQ + "）");
console.log("課外字（出現最多的）：" + (top || "無"));

// 每日涵蓋率
console.log("\n每日課內字元涵蓋率：");
papers.forEach(p => {
  let a = 0, b = 0;
  p.q.forEach(it => {
    const cs = charsOf([it.q, (it.o || []).join(""), it.e].join(""));
    a += cs.length; cs.forEach(c => { if (V.charset.has(c)) b++; });
  });
  console.log("  " + p.short + "  " + (100 * b / a).toFixed(1) + "%");
});
