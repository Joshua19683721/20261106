/* 將 vocab.js 輸出成給寫題用的純文字語料（corpus.txt） */
const fs = require("fs");
const path = require("path");
const V = require("./vocab.js");

let out = "康軒國語四上 第一～六課＋閱讀階梯一｜課內字詞語料\n" + "=".repeat(60) + "\n\n";
V.LESSONS.forEach(L => {
  out += "【" + L.name + "】\n";
  out += "生字：" + L.chars.split("").join("、") + "\n";
  out += "語詞：" + L.words.join("、") + "\n";
  out += "課文佳句：\n";
  L.lines.forEach(s => { out += "  ‧" + s + "\n"; });
  out += "\n";
});
out += "【語文知識／學習地圖用語】\n" + V.META_WORDS.join("、") + "\n";

fs.writeFileSync(path.join(__dirname, "corpus.txt"), out, "utf8");
console.log("corpus.txt 已產生，" + out.length + " 字");
