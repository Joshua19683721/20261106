/* 產生每日考卷資料夾的 index.html
   作法是複製參考版「2026-11-期中考試必考區/index.html」，再替換標題與載入的題庫檔。
   這樣可以完整保留原本的作答引擎（計分、錯題本、逐題檢視、即時訂正…）。 */
const fs = require("fs");
const path = require("path");

const REF = "C:\\Users\\joshu\\WorkBuddy AI\\2026-10-16-10-02-30\\2026-11-期中考試必考區\\index.html";
const ROOT = path.resolve(__dirname, "..");

let html = fs.readFileSync(REF, "utf8");

const DAYS = 19;

function dayFile(n) {
  return "day-" + String(n).padStart(2, "0") + ".js";
}

/* 1) 標題 */
html = html.replace(
  "<title>2026年11月 期中考試必考區｜國語文</title>",
  "<title>2026年11月 國語文期中考｜每日50題</title>"
);

/* 2) 載入題庫：chi-1.js ~ chi-5.js -> day-01.js ~ day-19.js */
const scriptTags = [];
for (let i = 1; i <= DAYS; i++) {
  scriptTags.push('<script src="papers/' + dayFile(i) + '"></script>');
}
const chiBlock = [
  '<script src="chi-1.js"></script>',
  '<script src="chi-2.js"></script>',
  '<script src="chi-3.js"></script>',
  '<script src="chi-4.js"></script>',
  '<script src="chi-5.js"></script>'
].join("\n");
if (html.indexOf(chiBlock) < 0) throw new Error("找不到 chi-1.js~chi-5.js 的載入區塊");
html = html.replace(chiBlock, scriptTags.join("\n"));

/* 3) 首頁文字 */
html = html.replace(
  "'<h1>期中考試必考區</h1>'",
  "'<h1>國語文期中考</h1>'"
);
html = html.replace(
  "'<p>依 108 課綱第二學習階段命題 ｜ 會考風格單選題</p>'",
  "'<p>依 108 課綱第二學習階段命題 ｜ 每日 50 題（40 選擇＋10 素養題組）</p>'"
);

/* 4) 作答紀錄的儲存鍵（避免與舊版題庫互相蓋掉） */
html = html.replace(
  '"midterm-2026-11-chi"',
  '"midterm-2026-11-chi-daily"'
);

/* 5) 題庫載入失敗的提示文字 */
html = html.replace(
  "'請確認 chi-1.js ～ chi-5.js 與 index.html 放在同一個資料夾。'",
  "'請確認 papers 資料夾（day-01.js ～ day-19.js）與 index.html 放在同一個資料夾。'"
);

fs.mkdirSync(ROOT, { recursive: true });
fs.writeFileSync(path.join(ROOT, "index.html"), html, "utf8");

console.log("已寫出 index.html：" + path.join(ROOT, "index.html"));
console.log("載入題庫：" + scriptTags.length + " 個檔案");
