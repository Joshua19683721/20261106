/* 產生「英語文四年級單字測驗」題庫
   來源：source/level4.json（由 tools/extract-level4.js 從口袋書第 4 級抽出）
   產出：papers/bank.js（window.EXAM.papers，格式與其他科目相同，小考系統可直接讀）

   題型（每個單字最多 3 題）：
     1. 英 → 中：看單字選中文意思
     2. 中 → 英：看中文選單字
     3. 例句填空：把例句裡的單字挖空（只有例句真的出現該字時才出）
   同一個中文意思對到兩個單字時（例如 do / does 都是「助動詞」）跳過「中→英」，
   避免一題有兩個正確答案。

   用法：node tools/build.js
*/
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "source", "level4.json");
const OUT = path.join(ROOT, "papers", "bank.js");

const words = JSON.parse(fs.readFileSync(SRC, "utf8"));

/* ---------------- 穩定亂數：同樣的輸入永遠產生同樣的題目 ---------------- */
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
  return h >>> 0;
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function rndFor(seed) { return mulberry32(hashStr(seed)); }
function shuffle(arr, rnd) {
  const x = arr.slice();
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = x[i]; x[i] = x[j]; x[j] = t;
  }
  return x;
}

/* ---------------- 文字小工具 ---------------- */
function escRe(s) { return String(s).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function ipaText(w) { return w.ipa ? " `/" + w.ipa + "/`" : ""; }
function enText(w) { return "*" + w.target + "*" + ipaText(w); }

function detail(w) {
  const parts = [enText(w) + "（" + w.gloss + "）"];
  if (w.phrase) parts.push("搭配：" + w.phrase.en + "（" + w.phrase.zh + "）");
  if (w.sentence) parts.push("例：" + w.sentence.en + "（" + w.sentence.zh + "）");
  return parts.join("\n");
}

function diff(w) {
  const n = w.target.replace(/[^A-Za-z]/g, "").length;
  return n <= 4 ? "易" : n <= 7 ? "中" : "難";
}

/* 同一個中文意思有幾個單字（>1 就不能出「中→英」） */
const glossCount = {};
words.forEach(function (w) { glossCount[w.gloss] = (glossCount[w.gloss] || 0) + 1; });

/* 挑 3 個干擾項：優先用同一生活場景的字，中文意思不重複 */
function pickDistractors(w, n, avoidText) {
  const rnd = rndFor("dist|" + w.scenId + "|" + w.target);
  const usedTarget = {}; usedTarget[w.target.toLowerCase()] = 1;
  const usedGloss = {}; usedGloss[w.gloss] = 1;
  const avoid = {};
  if (avoidText) avoidText.forEach(function (t) { avoid[t] = 1; });

  const pool = words.filter(function (x) {
    if (x.target.toLowerCase() === w.target.toLowerCase()) return false;
    if (usedGloss[x.gloss]) return false;
    if (avoid[x.target.toLowerCase()]) return false;
    return true;
  });

  const same = shuffle(pool.filter(function (x) { return x.scenId === w.scenId; }), rnd);
  const other = shuffle(pool.filter(function (x) { return x.scenId !== w.scenId; }), rnd);

  const out = [];
  const all = same.concat(other);
  for (let i = 0; i < all.length && out.length < n; i++) {
    const c = all[i];
    const k = c.target.toLowerCase();
    if (usedTarget[k] || usedGloss[c.gloss]) continue;
    usedTarget[k] = 1;
    usedGloss[c.gloss] = 1;
    out.push(c);
  }
  return out;
}

/* 把正確答案和干擾項打散；回傳選項文字陣列與正解 index */
function place(correct, wrongs, rnd) {
  const arr = [{ ok: true, item: correct }].concat(wrongs.map(function (x) { return { ok: false, item: x }; }));
  const sh = shuffle(arr, rnd);
  return {
    items: sh,
    a: sh.findIndex(function (x) { return x.ok; })
  };
}

/* ---------------- 三種題型 ---------------- */
function qEn2Zh(w) {
  const ds = pickDistractors(w, 3);
  if (ds.length < 3) return null;
  const rnd = rndFor("en2zh|" + w.scenId + "|" + w.target);
  const p = place(w.gloss, ds.map(function (d) { return d.gloss; }), rnd);
  return {
    g: 4,
    grp: w.target.toLowerCase(),
    u: w.scen,
    d: diff(w),
    q: enText(w) + " 的中文是什麼？",
    o: p.items.map(function (x) { return x.item; }),
    a: p.a,
    e: detail(w),
    w: p.items.map(function (x) {
      if (x.ok) return "";
      const d = ds.find(function (z) { return z.gloss === x.item; });
      return "「" + x.item + "」是 " + enText(d || { target: "?", ipa: "" }) + " 的意思。";
    })
  };
}

function qZh2En(w) {
  if (glossCount[w.gloss] > 1) return null; // 同中文有兩個字，題目會不唯一
  const ds = pickDistractors(w, 3);
  if (ds.length < 3) return null;
  const rnd = rndFor("zh2en|" + w.scenId + "|" + w.target);
  const p = place(enText(w), ds.map(function (d) { return enText(d); }), rnd);
  return {
    g: 4,
    grp: w.target.toLowerCase(),
    u: w.scen,
    d: diff(w),
    q: "「" + w.gloss + "」的英文是哪一個？",
    o: p.items.map(function (x) { return x.item; }),
    a: p.a,
    e: detail(w),
    w: p.items.map(function (x) {
      if (x.ok) return "";
      const d = ds.find(function (z) { return enText(z) === x.item; });
      return enText(d || { target: "?", ipa: "" }) + " 是「" + (d ? d.gloss : "?") + "」。";
    })
  };
}

function qCloze(w) {
  if (!w.sentence || !w.sentence.en) return null;
  const re = new RegExp("(^|[^A-Za-z])(" + escRe(w.target) + ")(?=[^A-Za-z]|$)", "i");
  if (!re.test(w.sentence.en)) return null;
  const blanked = w.sentence.en.replace(re, function (m, pre) { return pre + "______"; });

  const tokens = String(w.sentence.en).toLowerCase().match(/[a-z']+/g) || [];
  const ds = pickDistractors(w, 3, tokens);
  if (ds.length < 3) return null;

  const rnd = rndFor("cloze|" + w.scenId + "|" + w.target);
  const p = place(enText(w), ds.map(function (d) { return enText(d); }), rnd);
  return {
    g: 4,
    grp: w.target.toLowerCase(),
    u: w.scen,
    d: diff(w),
    q: blanked + "\n（中文：" + w.sentence.zh + "）",
    o: p.items.map(function (x) { return x.item; }),
    a: p.a,
    e: detail(w),
    w: p.items.map(function (x) {
      if (x.ok) return "";
      const d = ds.find(function (z) { return enText(z) === x.item; });
      return enText(d || { target: "?", ipa: "" }) + " 是「" + (d ? d.gloss : "?") + "」。";
    })
  };
}

/* ---------------- 依生活場景分卷 ---------------- */
const COLORS = ["#7a5c9e", "#0e7490", "#2f8f5b", "#c77700", "#b45309", "#8a4b8c", "#1f7a8c"];
const papers = [];
const byScen = new Map();

words.forEach(function (w) {
  let paper = byScen.get(w.scenId);
  if (!paper) {
    paper = {
      key: "eng4-" + w.scenId,
      name: "四年級單字・" + w.scen,
      short: w.scen,
      color: COLORS[byScen.size % COLORS.length],
      grades: "四年級",
      minutes: 10,
      note: "第 4 級（四年級）單字｜" + w.scen,
      q: []
    };
    byScen.set(w.scenId, paper);
    papers.push(paper);
  }
  [qEn2Zh(w), qZh2En(w), qCloze(w)].forEach(function (q) { if (q) paper.q.push(q); });
});

/* ---------------- 檢查 ---------------- */
const all = [];
papers.forEach(function (p) { p.q.forEach(function (q) { all.push(q); }); });

function normText(s) {
  return String(s == null ? "" : s)
    .replace(/\s+/g, "")
    .replace(/[「」『』〔〕（）()［］\[\]{}，,。．.、；;：:！!？?…·\-—–_～~\/]/g, "");
}
function qid(q) {
  const opts = (q.o || []).map(normText).slice().sort().join("|");
  const correct = normText(q.o[q.a]);
  return "q" + hashStr("eng4|" + normText(q.q) + "|" + opts + "|" + correct).toString(16);
}

const seen = {};
const problems = [];
all.forEach(function (q, i) {
  if (!q.q || !q.o || q.o.length !== 4) problems.push("選項數不是 4：" + i);
  if (q.a < 0 || q.a > 3) problems.push("正解 index 異常：" + i);
  if (new Set(q.o).size !== 4) problems.push("選項重複：" + q.q.slice(0, 30));
  if (!q.e) problems.push("缺詳解：" + i);
  if (!q.w || q.w.length !== q.o.length) problems.push("w 長度不符：" + i);
  if (q.w[q.a] !== "") problems.push("正解的 w 不是空字串：" + i);
  if (!q.o[q.a]) problems.push("正解文字為空：" + i);
  const id = qid(q);
  if (seen[id]) problems.push("題目 ID 重複：" + q.q.slice(0, 30));
  seen[id] = 1;
});

// 每個單字是否都有英→中
let missing = 0;
words.forEach(function (w) {
  const found = all.some(function (q) { return q.u === w.scen && q.q.indexOf("*" + w.target + "*") === 0; });
  if (!found) missing++;
});

console.log("words:", words.length);
console.log("papers:", papers.length, "questions:", all.length, "unique IDs:", Object.keys(seen).length);
console.log("papers detail:", papers.map(function (p) { return p.short + ":" + p.q.length; }).join("、"));
console.log("missing en2zh:", missing);
console.log("problems:", problems.length ? problems.slice(0, 20) : "none");
if (problems.length) process.exitCode = 1;

/* ---------------- 輸出 ---------------- */
const header = [
  "/* 由 tools/build.js 自動產生，請勿手改。",
  "   來源：英語單字口袋書（1–6級）第 4 級（四年級），共 " + words.length + " 個單字。",
  "   題型：英→中、中→英、例句填空；選項與正解位置由固定亂數產生，重建結果一致。",
  "   文字標記：*英文* → 粗體；`音標` → 音標字型 */",
  ""
].join("\n");

const body = "window.EXAM = window.EXAM || {};\nwindow.EXAM.papers = " +
  JSON.stringify(papers, null, 1) + ";\n";

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, header + body, "utf8");
console.log("wrote", OUT, "(" + Math.round((header + body).length / 1024) + " KB)");
