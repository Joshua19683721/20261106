/* ============================================================
   社會期中考／期末考｜出卷程式（_dev/gen.js）
   由 _dev/pool/*.js 的題庫，產生 papers/day-01.js ～ day-19.js。
   執行：node _dev/gen.js
   ------------------------------------------------------------
   規則
   1. 每張試卷 50 題 = 40 題選擇 ＋ 10 題素養題組（2 組 × 5 題）。
   2. 15 個小節每個小節在每張試卷至少出現 1 題，另補 25 題，來源輪替。
   3. 同一張試卷內不出現重複題目；不同試卷以不同變體輪替。
   4. 選項以決定性亂數重排，並使正解平均分布在 A/B/C/D。
   5. 素養題組共 12 組，每張取 2 組（連續配對，循環使用）。
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
  const counts = [Math.ceil(n / 4), Math.ceil(n / 4), Math.floor(n / 4), Math.floor(n / 4)];
  for (let attempt = 0; attempt < 500; attempt++) {
    const rnd = rng(seed + attempt * 104729);
    const left = counts.slice();
    const out = [];
    let ok = true;
    while (out.length < n) {
      const avail = [0, 1, 2, 3].filter((l) =>
        left[l] > 0 &&
        !(out.length >= 2 && out[out.length - 1] === l && out[out.length - 2] === l)
      );
      if (!avail.length) { ok = false; break; }
      const l = avail[Math.floor(rnd() * avail.length)];
      out.push(l);
      left[l]--;
    }
    if (ok) return out;
  }
  const fallback = [];
  for (let i = 0; i < n; i++) fallback.push(i % 4);
  return fallback;
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
  const used = new Set();

  // 15 個小節各取 1 題，確保每卷 15/15 全涵蓋
  UNITS.forEach((u, k) => {
    const arr = byU[u];
    const it = arr[(d + k) % arr.length];
    picked.push(it);
    used.add(it);
  });

  // 再補 25 題：依單元輪流，避免同一張試卷出現重複題目
  let t = 0;
  while (picked.length < 40) {
    const k = (d * 5 + t) % UNITS.length;
    const arr = byU[UNITS[k]];
    let found = null;
    for (let s = 0; s < arr.length; s++) {
      const it = arr[(d + k + 1 + s) % arr.length];
      if (!used.has(it)) { found = it; break; }
    }
    if (found) { picked.push(found); used.add(found); }
    t++;
    if (t > 1000) break;
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

  const note = "第 " + (d + 1) + " 天（" + short + "，週" + wd + "）｜範圍：全 15 個小節（每個小節至少 1 題）＋2 個素養題組｜40 選擇＋10 素養";

  const head =
    "/* ============================================================\n" +
    "   2026年11月 社會期中考／期末考｜" + short + " 社會期中考／期末考\n" +
    "   日期：2026-" + pad2(mm) + "-" + pad2(dd) + "（週" + wd + "）\n" +
    "   命題依據：十二年國教課綱（108課綱）社會領域第二學習階段（四年級）\n" +
    "   範圍：家鄉的自然環境／家鄉的傳統住屋與器物／家鄉的傳統信仰與老街／\n" +
    "         家鄉的作息、節慶與節日／主題探究與實作（共 15 個小節）\n" +
    "   題型：50 題（40 選擇 ＋ 10 素養題組）｜四選一單選\n" +
    "   本題庫為自編練習題，非官方試題。\n" +
    "   ============================================================ */\n" +
    "window.EXAM = window.EXAM || { papers: [] };\n\n" +
    "window.EXAM.papers.push({\n" +
    "  key: \"soc-day-" + pad2(d + 1) + "\",\n" +
    "  name: \"" + short + " 社會期中考／期末考\",\n" +
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
