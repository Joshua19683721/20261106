/* ============================================================
   2026年11月 國語文期中考／期末考｜每日 50 題  —  出卷產生器
   輸出：papers/day-01.js ～ day-19.js（每張 50 題 = 40 選擇 ＋ 10 素養題組）
   題庫來源：_dev/pool/ 下的各題庫檔
   本題庫為自編練習題，非官方試題。
   ============================================================ */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUTDIR = path.join(ROOT, "papers");
const POOL = path.join(__dirname, "pool");

function loadPool(file) {
  const p = path.join(POOL, file);
  if (!fs.existsSync(p)) { console.warn("⚠ 缺少題庫檔：" + file); return []; }
  try {
    const m = require(p);
    if (!Array.isArray(m)) { console.warn("⚠ " + file + " 不是陣列"); return []; }
    console.log("  " + file + "：" + m.length + " 筆");
    return m;
  } catch (e) {
    console.warn("⚠ " + file + " 載入失敗：" + e.message);
    return [];
  }
}

const A = loadPool("a-yin.js");
const B = loadPool("b-yi.js");
const C = loadPool("c-yufa.js");
const D = loadPool("d-biaodian.js");
const H = loadPool("h-bihua.js");
const E = loadPool("e-read.js");
const F = loadPool("f-kewen.js");
const G = loadPool("g-pianzhang.js");

/* ---------- 題庫整理 ---------- */
function validItem(x) {
  return x && typeof x.q === "string" && Array.isArray(x.o) && x.o.length === 4 &&
    Array.isArray(x.w) && x.w.length === 4 &&
    Number.isInteger(x.a) && x.a >= 0 && x.a < 4 &&
    x.w[x.a] === "" && x.o.every(o => typeof o === "string" && o.trim() !== "") &&
    new Set(x.o).size === 4 &&
    typeof x.e === "string" && x.e.length >= 8;
}

/* 題組的小題不一定有 d，這裡補上穩定的難度標籤 */
const DEF_D = ["中", "易", "中", "難", "中"];
function pickD(it, i) {
  return ["易", "中", "難"].includes(it.d) ? it.d : DEF_D[i % DEF_D.length];
}

const seenStem = new Set();
const SELECT = [].concat(A, B, C, D, H).filter(validItem).filter(x => {
  const k = x.q.trim();
  if (seenStem.has(k)) return false;
  seenStem.add(k);
  return true;
});

const okPass = x => x && typeof x.p === "string" && x.p.trim().length >= 40 &&
  Array.isArray(x.qs) && x.qs.length === 5 && x.qs.every(validItem);

/* 交錯排列各來源題組，讓課文題組平均分散到不同天，再取 38 組（19 天 × 2 組） */
const Fv = F.filter(okPass), Ev = E.filter(okPass), Gv = G.filter(okPass);
Fv.forEach(x => { x._tag = "課文理解"; });
Ev.forEach(x => { x._tag = "閱讀理解"; });
Gv.forEach(x => { x._tag = "篇章結構"; });
const interleaved = [];
for (let i = 0; i < Math.max(Fv.length, Ev.length, Gv.length); i++) {
  if (Ev[i]) interleaved.push(Ev[i]);
  if (Fv[i]) interleaved.push(Fv[i]);
  if (Gv[i]) interleaved.push(Gv[i]);
}
let PASS5 = interleaved;
if (PASS5.length > 38) PASS5 = PASS5.slice(0, 38);

console.log("\n可用選擇題：" + SELECT.length + " 題");
console.log("可用題組：" + PASS5.length + " 組（每組 5 題）");

if (SELECT.length < 40) console.warn("⚠ 選擇題不足 40 題，當日可能出現重複題。");
if (PASS5.length < 2) console.warn("⚠ 題組不足 2 組。");

/* ---------- 日期 ---------- */
const WEEK = ["日", "一", "二", "三", "四", "五", "六"];
const START = new Date(2026, 9, 19); /* 2026-10-19 */
const NDAYS = 19;

const COLORS = [
  "#8a4b8c", "#2f6fed", "#2f8f5b", "#c46a1f", "#b5563f",
  "#3a7ca5", "#7a5c9e", "#a2506b", "#4a7c59", "#0f766e",
  "#9a6a1f", "#5b6cc4", "#c05a86", "#2b7a78", "#8c5a2b",
  "#3f6f9f", "#8a3f6f", "#567a2f", "#6f4a8a"
];

function dayLabel(d) {
  const dt = new Date(START.getTime());
  dt.setDate(dt.getDate() + d);
  const m = dt.getMonth() + 1;
  const dd = dt.getDate();
  return {
    md: m + "/" + dd,
    week: WEEK[dt.getDay()],
    iso: dt.getFullYear() + "-" + String(m).padStart(2, "0") + "-" + String(dd).padStart(2, "0")
  };
}

/* ---------- 答案位置打散 ---------- */
function lcg(seed) {
  let s = seed >>> 0;
  return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}
function makeSeq(seed, len, n) {
  const rnd = lcg(seed);
  const base = Math.floor(len / n), rem = len % n;
  const counts = [];
  for (let i = 0; i < n; i++) counts.push(base);
  for (let i = 0; i < rem; i++) counts[i]++;
  const pool = [];
  counts.forEach((c, k) => { for (let i = 0; i < c; i++) pool.push(k); });
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = pool[i]; pool[i] = pool[j]; pool[j] = t;
  }
  return pool;
}
function okSeq(seq) {
  const c = [0, 0, 0, 0];
  seq.forEach(v => c[v]++);
  if (Math.max.apply(null, c) - Math.min.apply(null, c) > 1) return false;
  for (let i = 0; i + 2 < seq.length; i++) if (seq[i] === seq[i + 1] && seq[i] === seq[i + 2]) return false;
  return true;
}
function findSeq(seed, len) {
  for (let s = seed; s < seed + 400000; s++) {
    const seq = makeSeq(s, len, 4);
    if (okSeq(seq)) return seq;
  }
  return makeSeq(seed, len, 4);
}

/* 把「正解」搬到指定位置，其餘選項維持順序；解析跟著選項一起搬 */
function placeTo(item, target) {
  const correct = item.o[item.a];
  const pairs = [];
  item.o.forEach((opt, k) => { if (k !== item.a) pairs.push({ opt: opt, exp: item.w[k] }); });
  const o = [], w = [];
  for (let k = 0; k < 4; k++) {
    if (k === target) { o.push(correct); w.push(""); }
    else { const pr = pairs.shift(); o.push(pr.opt); w.push(pr.exp); }
  }
  return { o: o, w: w, a: target };
}

/* ---------- 題材：出卷 ---------- */
fs.mkdirSync(OUTDIR, { recursive: true });

const report = [];
let totalQ = 0;

for (let d = 0; d < NDAYS; d++) {
  const lab = dayLabel(d);
  const key = "chi-day-" + String(d + 1).padStart(2, "0");
  const name = lab.md + " 國語文期中考／期末考";

  /* 40 選擇：以輪替窗格取出，確保同一天不重複、跨天平均複習 */
  const start = (d * 40) % SELECT.length;
  const picks = [];
  for (let k = 0; k < 40; k++) picks.push(SELECT[(start + k) % SELECT.length]);

  /* 10 素養題組：每天 2 組，每組 5 題 */
  const p1 = PASS5[((d * 2) % PASS5.length)];
  let p2 = PASS5[((d * 2 + 1) % PASS5.length)];
  if (p2 === p1) p2 = PASS5[((d * 2 + 2) % PASS5.length)];

  const blocks = [
    { seed: d * 977 + 31, items: picks },
    { seed: d * 1451 + 89, items: p1.qs, passage: p1.p, tag: p1._tag || "閱讀素養" },
    { seed: d * 1831 + 47, items: p2.qs, passage: p2.p, tag: p2._tag || "閱讀素養" }
  ];

  const out = [];
  const units = {};
  for (const blk of blocks) {
    const seq = findSeq(blk.seed, blk.items.length);
    blk.items.forEach((it, i) => {
      const put = placeTo(it, seq[i]);
      const q = {
        g: 4,
        u: blk.passage ? (blk.tag || "閱讀素養") : it.u,
        d: blk.passage ? pickD(it, i) : it.d,
        q: it.q,
        o: put.o,
        a: put.a,
        e: it.e,
        w: put.w
      };
      if (blk.passage) q.p = blk.passage;
      out.push(q);
      units[q.u] = (units[q.u] || 0) + 1;
      totalQ++;
    });
  }

  if (out.length !== 50) throw new Error(key + " 題數為 " + out.length + "，應為 50");

  const note = "第 " + (d + 1) + " 天（" + lab.md + "，週" + lab.week + "）｜" +
    Object.keys(units).map(u => u + " " + units[u]).join("、");

  const head = "/* ============================================================\n" +
    "   2026年11月 國語文期中考／期末考｜" + name + "\n" +
    "   日期：" + lab.iso + "（週" + lab.week + "）\n" +
    "   命題依據：十二年國教課綱（108課綱）國語文領域第二學習階段（四年級）\n" +
    "   範圍：康軒四上第一～六課（水陸小高手／溜直排輪、放學後、我的籃球夢、\n" +
    "         永遠的馬偕、假如給我三天光明、攀登生命的高峰）\n" +
    "   題型：50 題（40 選擇 ＋ 10 素養題組）｜四選一單選\n" +
    "   本題庫為自編練習題，非官方試題。\n" +
    "   ============================================================ */\n" +
    "window.EXAM = window.EXAM || { papers: [] };\n\n" +
    "window.EXAM.papers.push({\n" +
    '  key: "' + key + '",\n' +
    '  name: "' + name + '",\n' +
    '  short: "' + lab.md + '",\n' +
    '  color: "' + COLORS[d % COLORS.length] + '",\n' +
    '  grades: "四年級",\n' +
    "  minutes: 50,\n" +
    '  note: "' + note + '",\n' +
    "  q: [\n";

  const esc = s => String(s == null ? "" : s)
    .replace(/\\/g, "\\\\").replace(/"/g, '\\"')
    .replace(/\r\n?/g, "\n").replace(/\n/g, "\\n");

  const body = out.map(q => {
    const lines = [];
    lines.push('  { g: 4, u: "' + esc(q.u) + '", d: "' + esc(q.d) + '",');
    if (q.p) lines.push('    p: "' + esc(q.p) + '",');
    lines.push('    q: "' + esc(q.q) + '",');
    lines.push("    o: [" + q.o.map(o => '"' + esc(o) + '"').join(", ") + "],");
    lines.push("    a: " + q.a + ",");
    lines.push('    e: "' + esc(q.e) + '",');
    lines.push("    w: [" + q.w.map(o => '"' + esc(o) + '"').join(", ") + "] },");
    return lines.join("\n");
  }).join("\n\n");

  const file = path.join(OUTDIR, "day-" + String(d + 1).padStart(2, "0") + ".js");
  fs.writeFileSync(file, head + body + "\n  ]\n});\n", "utf8");

  const dist = [0, 0, 0, 0];
  out.forEach(q => dist[q.a]++);
  report.push(lab.md + "（週" + lab.week + "）  " + key + "  50 題  A/B/C/D=" + dist.join("/") + "  題組：" + p1.id + "、" + p2.id);
}

fs.writeFileSync(path.join(__dirname, "report.txt"),
  "每日出卷結果\n" + "=".repeat(60) + "\n" + report.join("\n") +
  "\n" + "=".repeat(60) + "\n總題數：" + totalQ + "（19 天 × 50 題）\n" +
  "選擇題庫：" + SELECT.length + " 題；題組：" + PASS5.length + " 組（共 " + (PASS5.length * 5) + " 題）\n" +
  "輪替方式：每天取 40 題窗格，跨天平均複習；題組每天 2 組。\n", "utf8");

console.log("\n" + report.join("\n"));
console.log("\n總題數：" + totalQ + "（19 天 × 50 題）");
console.log("已寫出 papers/day-01.js ～ day-19.js");
