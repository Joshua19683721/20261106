/* ============================================================
   社會期中考｜出卷程式（_dev/gen.js）
   由 _dev/pool/*.js 的題庫，產生 papers/day-01.js ～ day-19.js。
   執行：node _dev/gen.js
   ------------------------------------------------------------
   規則
   1. 每張試卷 50 題 = 40 題選擇 ＋ 10 題素養題組（2 組 × 5 題）。
   2. 33 個子題每個子題在每張試卷至少出現 1 題，另補 7 題，來源輪替。
   3. 同一張試卷內不出現重複題目；不同試卷以不同變體輪替。
   4. 選項以決定性亂數重排，並使正解平均分布在 A/B/C/D。
   5. 素養題組共 20 組，每張取 2 組（連續配對，循環使用）。
   ============================================================ */
"use strict";

const fs = require("fs");
const path = require("path");

const DEV = __dirname;
const OUT = path.join(DEV, "..", "papers");
const meta = require(path.join(DEV, "units.js"));

const selA = require(path.join(DEV, "pool", "sel-a.js"));
const selB = require(path.join(DEV, "pool", "sel-b.js"));
const selC = require(path.join(DEV, "pool", "sel-c.js"));
const selD = require(path.join(DEV, "pool", "sel-d.js"));
const pasA = require(path.join(DEV, "pool", "pas-a.js"));
const pasB = require(path.join(DEV, "pool", "pas-b.js"));

const SELECT = selA.concat(selB, selC, selD);
const PASSAGE = pasA.concat(pasB);
const UNITS = meta.units.map((x) => x.u);

const NDAYS = 19;
const START = new Date(2026, 9, 19); // 2026-10-19（週一）

/* ---------------- 決定性亂數 ---------------- */
function rng(seed) {
  let s = (seed >>> 0) || 1;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
function shuffle(arr, rnd) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

/* ---------------- 題庫索引 ---------------- */
const byU = {};
SELECT.forEach((it) => { (byU[it.u] = byU[it.u] || []).push(it); });

/* ---------------- 檢核題庫 ---------------- */
(function checkPool() {
  const problems = [];
  UNITS.forEach((u) => {
    const n = (byU[u] || []).length;
    if (n < 5) problems.push("子題「" + u + "」題數不足（" + n + "）");
  });
  Object.keys(byU).forEach((u) => {
    if (UNITS.indexOf(u) < 0) problems.push("題庫出現未列出的子題「" + u + "」");
  });
  SELECT.forEach((it, i) => {
    if (!it.q || !Array.isArray(it.o) || it.o.length !== 4) problems.push("選擇題 " + i + " 格式錯誤");
    if (!Array.isArray(it.w) || it.w.length !== 4 || it.w[0] !== "") problems.push("選擇題 " + i + " 錯項解析格式錯誤");
  });
  PASSAGE.forEach((g, gi) => {
    if (!g.p) problems.push("素養題組 " + gi + " 缺少短文");
    if (!Array.isArray(g.qs) || g.qs.length !== 5) problems.push("素養題組 " + gi + " 題數不是 5");
    (g.qs || []).forEach((q, qi) => {
      if (!Array.isArray(q.o) || q.o.length !== 4) problems.push("素養 " + gi + "-" + qi + " 選項格式錯誤");
      if (!Array.isArray(q.w) || q.w.length !== 4 || q.w[0] !== "") problems.push("素養 " + gi + "-" + qi + " 錯項解析格式錯誤");
    });
  });
  if (problems.length) {
    console.error("題庫檢核失敗：");
    problems.forEach((p) => console.error("  - " + p));
    process.exit(1);
  }
})();

/* ---------------- 正解字母分布 ---------------- */
function lettersFor(n, seed) {
  const base = [];
  const counts = [Math.ceil(n / 4), Math.ceil(n / 4), Math.floor(n / 4), Math.floor(n / 4)];
  for (let li = 0; li < 4; li++) for (let c = 0; c < counts[li]; c++) base.push(li);
  while (base.length > n) base.pop();
  while (base.length < n) base.push(3);
  const rnd = rng(seed);
  shuffle(base, rnd);
  for (let i = 2; i < n; i++) {
    if (base[i] === base[i - 1] && base[i] === base[i - 2]) {
      for (let j = i + 1; j < n; j++) {
        if (base[j] !== base[i]) { const t = base[i]; base[i] = base[j]; base[j] = t; break; }
      }
    }
  }
  return base;
}

/* ---------------- 選項重排 ---------------- */
function reorder(item, target, rnd) {
  const others = [1, 2, 3];
  shuffle(others, rnd);
  const rem = [0, 1, 2, 3].filter((x) => x !== target);
  const o = new Array(4);
  const w = new Array(4);
  o[target] = item.o[0];
  w[target] = "";
  rem.forEach((pos, k) => { o[pos] = item.o[others[k]]; w[pos] = item.w[others[k]]; });
  return { o: o, w: w, a: target };
}

/* ---------------- 出卷 ---------------- */
function pickSelect(d) {
  const picked = [];
  UNITS.forEach((u, k) => {
    const arr = byU[u];
    picked.push(arr[(d + k) % arr.length]);
  });
  for (let t = 0; t < 7; t++) {
    const k = (d * 7 + t * 5) % UNITS.length;
    const u = UNITS[k];
    const arr = byU[u];
    const core = (d + k) % arr.length;
    const want = (d + k + 2) % arr.length;
    picked.push(arr[want === core ? (core + 1) % arr.length : want]);
  }
  return picked;
}

function buildQuestions(d) {
  const rnd = rng(1000 + d * 97);
  const items = pickSelect(d);
  shuffle(items, rnd);
  const letters = lettersFor(50, 5000 + d * 131);

  const qs = [];
  items.forEach((it, i) => {
    const r = reorder(it, letters[i], rnd);
    qs.push({ g: 4, u: it.u, d: it.d, q: it.q, o: r.o, a: r.a, e: it.e, w: r.w });
  });

  const g1 = (d * 2) % PASSAGE.length;
  const g2 = (d * 2 + 1) % PASSAGE.length;
  [g1, g2].forEach((gi) => {
    const grp = PASSAGE[gi];
    grp.qs.forEach((q, k) => {
      const r = reorder(q, letters[40 + (gi % 2) * 5 + k], rnd);
      qs.push({ g: 4, u: grp.tag, d: q.d || "中", p: grp.p, q: q.q, o: r.o, a: r.a, e: q.e, w: r.w });
    });
  });
  return qs;
}

/* ---------------- 檔案輸出 ---------------- */
function pad2(n) { return (n < 10 ? "0" : "") + n; }
const WD = ["日", "一", "二", "三", "四", "五", "六"];

function jstr(s) { return JSON.stringify(String(s)); }

function renderQuestion(q, indent) {
  const L = [];
  const pad = indent;
  L.push(pad + "{ g: 4, u: " + jstr(q.u) + ", d: " + jstr(q.d) + ",");
  if (q.p) L.push(pad + "  p: " + jstr(q.p) + ",");
  L.push(pad + "  q: " + jstr(q.q) + ",");
  L.push(pad + "  o: [" + q.o.map(jstr).join(", ") + "],");
  L.push(pad + "  a: " + q.a + ",");
  L.push(pad + "  e: " + jstr(q.e) + ",");
  L.push(pad + "  w: [" + q.w.map(jstr).join(", ") + "] },");
  return L.join("\n");
}

function renderDay(d, qs) {
  const day = new Date(START.getTime());
  day.setDate(START.getDate() + d);
  const mm = day.getMonth() + 1;
  const dd = day.getDate();
  const wd = WD[day.getDay()];
  const short = mm + "/" + dd;

  const note = "第 " + (d + 1) + " 天（" + short + "，週" + wd + "）｜範圍：全 33 個子題（每個子題至少 1 題）＋2 個素養題組｜40 選擇＋10 素養";

  const head =
    "/* ============================================================\n" +
    "   2026年11月 社會期中考｜" + short + " 社會期中考\n" +
    "   日期：2026-" + pad2(mm) + "-" + pad2(dd) + "（週" + wd + "）\n" +
    "   命題依據：十二年國教課綱（108課綱）社會領域第二學習階段（四年級）\n" +
    "   範圍：家鄉的自然環境／家鄉的地形與氣候／家鄉的節慶與禮俗／\n" +
    "         互動與關聯（個人與群體、人與環境、權力與人權、生產與消費、科技與社會、全球關連）／\n" +
    "         差異與多元／變遷與因果（環境、歷史、社會的變遷）／選擇與責任\n" +
    "   題型：50 題（40 選擇 ＋ 10 素養題組）｜四選一單選\n" +
    "   本題庫為自編練習題，非官方試題。\n" +
    "   ============================================================ */\n" +
    "window.EXAM = window.EXAM || { papers: [] };\n\n" +
    "window.EXAM.papers.push({\n" +
    "  key: \"soc-day-" + pad2(d + 1) + "\",\n" +
    "  name: \"" + short + " 社會期中考\",\n" +
    "  short: \"" + short + "\",\n" +
    "  color: \"" + meta.color + "\",\n" +
    "  grades: \"四年級\",\n" +
    "  minutes: 50,\n" +
    "  note: " + jstr(note) + ",\n" +
    "  q: [\n";

  const body = qs.map((q) => renderQuestion(q, "  ")).join("\n\n");
  const tail = "\n  ]\n});\n";
  return head + body + tail;
}

function main() {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
  for (let d = 0; d < NDAYS; d++) {
    const qs = buildQuestions(d);
    if (qs.length !== 50) throw new Error("第 " + (d + 1) + " 天題數不是 50：" + qs.length);
    const text = renderDay(d, qs);
    const file = path.join(OUT, "day-" + pad2(d + 1) + ".js");
    fs.writeFileSync(file, text, "utf8");
  }
  console.log("完成：已產生 " + NDAYS + " 張試卷於 " + OUT);
  console.log("選擇題庫 " + SELECT.length + " 題｜素養題組 " + PASSAGE.length + " 組（" + (PASSAGE.length * 5) + " 題）");
}

main();
