/* 嚴格模式：只從課本內容（課文＋生字＋語詞）建立字元集合，
   不含任何自訂虛詞／測驗用語清單。用來測量距離 100% 的缺口。 */
const fs = require("fs");
const path = require("path");
const V = require("./vocab.js");

const HAN = /\p{Script=Han}/u;
function charsOf(s) { const out = []; for (const ch of String(s == null ? "" : s)) if (HAN.test(ch)) out.push(ch); return out; }

// 嚴格字集：LESSONS 的 chars + words + lines + ACTIVITY_WORDS（課本活動頁用語）
const strict = new Set();
V.LESSONS.forEach(L => {
  charsOf(L.chars).forEach(c => strict.add(c));
  L.words.forEach(w => charsOf(w).forEach(c => strict.add(c)));
  L.lines.forEach(l => charsOf(l).forEach(c => strict.add(c)));
});
V.ACTIVITY_WORDS.forEach(w => charsOf(w).forEach(c => strict.add(c)));

// 自訂清單裡，哪些字「不在」嚴格字集
function auditList(name, list) {
  const missing = new Set();
  list.forEach(w => charsOf(w).forEach(c => { if (!strict.has(c)) missing.add(c); }));
  console.log("[" + name + "] 清單字數 " + list.length + "，其中不在課本嚴格字集的相異字 " + missing.size + "：");
  console.log("   " + [...missing].join("、"));
}
auditList("META_WORDS", V.META_WORDS);
auditList("FUNCTION_WORDS", V.FUNCTION_WORDS);
auditList("EXAM_WORDS", V.EXAM_WORDS);

// 用嚴格字集測量各題庫
const POOL = path.join(__dirname, "pool");
const files = fs.readdirSync(POOL).filter(f => f.endsWith(".js")).sort();
let gAll = 0, gIn = 0;
const miss = {};
files.forEach(f => {
  let mod; try { mod = require(path.join(POOL, f)); } catch (e) { return; }
  if (!Array.isArray(mod)) return;
  let all = 0, inSet = 0;
  const isP = mod.length && mod[0] && Array.isArray(mod[0].qs);
  const handle = (it) => {
    const cs = charsOf([it.q, (it.o || []).join(""), it.e, (it.w || []).join("")].join(""));
    all += cs.length;
    cs.forEach(c => { if (strict.has(c)) inSet++; else miss[c] = (miss[c] || 0) + 1; });
  };
  if (isP) mod.forEach(g => (g.qs || []).forEach(handle)); else mod.forEach(handle);
  gAll += all; gIn += inSet;
  console.log("[" + f + "] 嚴格涵蓋 " + (100 * inSet / all).toFixed(1) + "%（" + inSet + "/" + all + "）");
});
console.log("\n=== 嚴格模式總計 ===");
console.log("嚴格課內字元涵蓋率：" + (100 * gIn / gAll).toFixed(1) + "%（" + gIn + "/" + gAll + "）");
const top = Object.keys(miss).sort((a, b) => miss[b] - miss[a]).slice(0, 40).map(c => c + "×" + miss[c]).join(" ");
console.log("缺口字（前 40）：" + (top || "無"));
