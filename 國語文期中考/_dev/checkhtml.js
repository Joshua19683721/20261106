/* 檢查 index.html 是否正確載入 19 張試卷 */
const fs = require("fs");
const path = require("path");
const t = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const m = t.match(/papers\/day-[0-9]+\.js/g) || [];
console.log("script 標籤數：" + m.length);
console.log(m.join("  "));
const keys = t.match(/chi-day-[0-9]+|chi-[a-z0-9-]+/g) || [];
console.log("出現的 key 片段：" + [...new Set(keys)].join(", "));
