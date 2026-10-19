/* 檢查各題庫的「課內字詞」涵蓋率（目標：≥80%）
   定義：
   - 字元涵蓋率：題目（題幹＋選項＋解析）中的所有漢字，落在 vocab.charset 的比例。
   - 題目涵蓋率：一題只要「主要測試詞」（選項中最長者）命中 vocab.wordset 即可。
*/
const fs = require("fs");
const path = require("path");
const V = require("./vocab.js");

const POOL = path.join(__dirname, "pool");
const files = fs.readdirSync(POOL).filter(f => f.endsWith(".js")).sort();

const HAN = /\p{Script=Han}/u;
function charsOf(s) { const out = []; for (const ch of String(s == null ? "" : s)) if (HAN.test(ch)) out.push(ch); return out; }

let gAll = 0, gIn = 0;
const worst = [];

files.forEach(f => {
  let mod; try { mod = require(path.join(POOL, f)); } catch (e) { console.log("[" + f + "] 載入失敗 " + e.message); return; }
  if (!Array.isArray(mod)) return;
  let all = 0, inSet = 0, items = 0, hitItems = 0;
  const missCount = {};
  const isPassage = mod.length && mod[0] && Array.isArray(mod[0].qs);

  const handle = (it) => {
    items++;
    const text = [it.q, (it.o || []).join(""), it.e, (it.w || []).join("")].join("");
    const cs = charsOf(text);
    all += cs.length;
    cs.forEach(c => { if (V.charset.has(c)) inSet++; else missCount[c] = (missCount[c] || 0) + 1; });
    // 測試詞命中：選項中最長的一個詞是否在 wordset（或全部字都在 charset）
    const opts = (it.o || []).slice().sort((a, b) => String(b).length - String(a).length);
    const key = opts[0] || "";
    const wordHit = V.wordset.has(key) || charsOf(key).every(c => V.charset.has(c));
    if (wordHit) hitItems++;
  };

  if (isPassage) mod.forEach(g => (g.qs || []).forEach(handle));
  else mod.forEach(handle);

  gAll += all; gIn += inSet;
  const pct = all ? (100 * inSet / all) : 100;
  const hpct = items ? (100 * hitItems / items) : 100;
  const top = Object.keys(missCount).sort((a, b) => missCount[b] - missCount[a]).slice(0, 12)
    .map(c => c + "×" + missCount[c]).join(" ");
  console.log("[" + f + "] 字元涵蓋 " + pct.toFixed(1) + "%（" + inSet + "/" + all + "）  題目涵蓋 " + hpct.toFixed(1) + "%（" + hitItems + "/" + items + "）");
  console.log("      課外字：" + (top || "無"));
  worst.push({ f, pct, hpct });
});

console.log("\n=== 總計 ===");
console.log("全題庫字元涵蓋率：" + (gAll ? (100 * gIn / gAll).toFixed(1) : "100") + "%（" + gIn + "/" + gAll + "）");
const pass = worst.filter(w => w.pct < 80).map(w => w.f + "(" + w.pct.toFixed(0) + "%)");
if (pass.length) console.log("未達 80% 的題庫：" + pass.join("、"));
else console.log("✓ 所有題庫字元涵蓋率均 ≥ 80%");
