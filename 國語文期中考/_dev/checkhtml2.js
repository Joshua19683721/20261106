/* 檢查 index.html 內殘留的舊字串 */
const fs = require("fs");
const path = require("path");
const t = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8").split(/\r?\n/);
const pat = /chi-1|chi-5|chi-daily|localStorage|STORE|storage|期中考|國語文/;
t.forEach((l, i) => { if (pat.test(l)) console.log((i + 1) + ": " + l.trim().slice(0, 160)); });
