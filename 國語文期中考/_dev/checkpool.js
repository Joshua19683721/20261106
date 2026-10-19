/* 檢查 _dev/pool/ 內各題庫檔的格式與標籤分布（產生考卷前的品管） */
const fs = require("fs");
const path = require("path");
const POOL = path.join(__dirname, "pool");

if (!fs.existsSync(POOL)) { console.log("pool 資料夾不存在"); process.exit(0); }

const files = fs.readdirSync(POOL).filter(f => f.endsWith(".js")).sort();
let bad = 0;

function checkItem(tag, it, needP) {
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

files.forEach(f => {
  let mod;
  try { mod = require(path.join(POOL, f)); }
  catch (err) { console.log("[" + f + "] 載入失敗：" + err.message); bad++; return; }

  if (!Array.isArray(mod)) { console.log("[" + f + "] 不是陣列"); bad++; return; }

  const isPassage = mod.length && mod[0] && mod[0].p !== undefined && Array.isArray(mod[0].qs);
  const labels = {};
  let items = 0;

  mod.forEach((g, gi) => {
    if (isPassage) {
      if (typeof g.p !== "string" || g.p.trim().length < 40) { console.log("  ✗ 題組 " + (g.id || gi) + " 短文過短"); bad++; }
      if (!Array.isArray(g.qs) || g.qs.length !== 5) { console.log("  ✗ 題組 " + (g.id || gi) + " 題數不是 5（" + (g.qs ? g.qs.length : 0) + "）"); bad++; }
      labels["閱讀素養"] = (labels["閱讀素養"] || 0) + 1;
      (g.qs || []).forEach((q, qi) => { items++; checkItem((g.id || gi) + "-" + (qi + 1), q, true); });
    } else {
      items++;
      labels[g.u] = (labels[g.u] || 0) + 1;
      checkItem((f + "#" + (gi + 1)), g, false);
    }
  });

  const dist = [0, 0, 0, 0];
  if (isPassage) mod.forEach(g => (g.qs || []).forEach(q => { if (Number.isInteger(q.a) && q.a >= 0 && q.a < 4) dist[q.a]++; }));
  else mod.forEach(q => { if (Number.isInteger(q.a) && q.a >= 0 && q.a < 4) dist[q.a]++; });

  console.log("[" + f + "] " + (isPassage ? mod.length + " 題組 / " : "") + items + " 題  答案分布 " + dist.join("/"));
  if (!isPassage) console.log("    標籤：" + Object.keys(labels).map(k => k + " " + labels[k]).join("、"));
});

console.log(bad === 0 ? "\n✓ 題庫格式檢查通過" : "\n✗ 共 " + bad + " 項問題");
