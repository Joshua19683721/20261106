/* ============================================================
   產生「題庫總表」用的 manifest.json
   ------------------------------------------------------------
   管理頁不需要把 7 科、六十幾個題庫檔全部載入，只要讀這一份
   小檔案，就能算出每一科、每一個單元：

     總題數 / 已測驗 / 未測驗 / 已檢討 / 再考

   題庫有更新時，在專案根目錄執行：

     node 小考/tools/build-manifest.js

   ============================================================ */
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..", "..");
const CORE = path.join(ROOT, "小考", "core.js");
const OUT = path.join(ROOT, "小考", "manifest.json");
const OUT_Q = path.join(ROOT, "小考", "questions.json");

function read(p) { return fs.readFileSync(p, "utf8"); }

/* ---- 先把 core.js 載進沙箱，取得科目表與 qid() ---- */
const coreCtx = { window: {}, console };
vm.createContext(coreCtx);
vm.runInContext(read(CORE), coreCtx, { filename: CORE });

const QCORE = coreCtx.window.QCORE;
if (!QCORE) throw new Error("core.js 載入失敗，找不到 window.QCORE");

const manifest = {
  generated_at: new Date().toISOString(),
  total: 0,
  subjects: [],
  questions: {}
};
const full = [];

for (const sub of QCORE.SUBJECTS) {
  const dir = path.join(ROOT, sub.dir, "papers");
  const files = sub.bank === "single"
    ? ["bank.js"]
    : Array.from({ length: QCORE.DAYS }, (_, i) =>
        "day-" + String(i + 1).padStart(2, "0") + ".js");

  const ctx = { window: { EXAM: { papers: [] } }, console };
  vm.createContext(ctx);

  for (const f of files) {
    const fp = path.join(dir, f);
    if (!fs.existsSync(fp)) throw new Error("缺少題庫檔：" + fp);
    vm.runInContext(read(fp), ctx, { filename: fp });
  }

  const papers = (ctx.window.EXAM && ctx.window.EXAM.papers) || [];
  const seen = new Set();
  const units = new Map();
  let count = 0;

  for (const p of papers) {
    for (const q of p.q || []) {
      if (!q || !q.q || !q.o || typeof q.a !== "number") continue;
      const id = QCORE.qid(sub.id, q);
      if (seen.has(id)) continue;
      seen.add(id);
      count++;

      const unit = q.u || "其他";
      units.set(unit, (units.get(unit) || 0) + 1);
      manifest.questions[id] = {
        s: sub.id,
        u: unit,
        t: QCORE.plain(q.q).slice(0, 48)
      };

      full.push({
        id: id,
        subject: sub.id,
        unit: unit,
        label: QCORE.plain(q.q).slice(0, 160),
        data: {
          q: q.q,
          o: q.o.slice(),
          a: q.a,
          e: q.e || "",
          w: q.w || [],
          p: q.p || "",
          d: q.d || "",
          g: q.g || 4,
          grp: q.grp || "",
          paper: p.key || "",
          paperName: p.short || p.name || ""
        }
      });
    }
  }

  manifest.subjects.push({
    id: sub.id,
    name: sub.name,
    short: sub.short,
    color: sub.color,
    total: count,
    units: Array.from(units.entries())
      .map(([u, n]) => ({ u, n }))
      .sort((a, b) => b.n - a.n || a.u.localeCompare(b.u, "zh-Hant"))
  });

  manifest.total += count;
  console.log(sub.short.padEnd(12, " "), String(count).padStart(4), "題", units.size, "個單元");
}

/* 讓輸出穩定，重跑不會產生無意義的 diff */
manifest.questions = Object.fromEntries(
  Object.keys(manifest.questions).sort().map((k) => [k, manifest.questions[k]])
);

fs.writeFileSync(OUT, JSON.stringify(manifest), "utf8");

/* 完整題目（含選項、答案、詳解）給「匯入資料庫題庫」用。
   排序固定，題庫沒改就不會產生無意義 diff。 */
full.sort(function (a, b) { return a.id.localeCompare(b.id); });
const qfile = {
  generated_at: manifest.generated_at,
  total: full.length,
  rows: full
};
fs.writeFileSync(OUT_Q, JSON.stringify(qfile), "utf8");

console.log("");
console.log("寫入", path.relative(ROOT, OUT));
console.log("寫入", path.relative(ROOT, OUT_Q));
console.log("總計", manifest.total, "題");
