/* 從《英語單字口袋書（1–6級）》的 banks.js 抽出「第 4 級（四年級）」
   用法：
     node tools/extract-level4.js ["來源 banks.js 路徑"]
   預設來源：C:\Users\joshu\Downloads\mkes1-6-allgrade\data\banks.js
   產出：source/level4.json（只留小考命題需要的欄位）
*/
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SRC = process.argv[2] || "C:\\Users\\joshu\\Downloads\\mkes1-6-allgrade\\data\\banks.js";

const sandbox = { window: {}, console };
sandbox.globalThis = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(SRC, "utf8"), sandbox, { filename: path.basename(SRC) });

const B = sandbox.window.BANKS;
if (!B || !Array.isArray(B.scenarios)) throw new Error("banks.js 裡找不到 window.BANKS.scenarios");

const out = [];
B.scenarios.forEach(function (sc) {
  (sc.units || []).forEach(function (u) {
    if (u.level !== 4) return;
    const phrase = (u.steps || []).filter(function (s) { return s.kind === "phrase"; })[0] || null;
    const sent = (u.steps || []).filter(function (s) { return s.kind === "sentence"; })[0] || null;
    out.push({
      scen: sc.title,
      scenId: sc.id,
      id: u.id,
      target: u.target,
      gloss: u.gloss,
      ipa: u.ipa,
      phrase: phrase ? { en: phrase.en, zh: phrase.zh, ipa: phrase.ipa || "" } : null,
      sentence: sent ? { en: sent.en, zh: sent.zh } : null
    });
  });
});

const dest = path.join(ROOT, "source", "level4.json");
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.writeFileSync(dest, JSON.stringify(out, null, 1) + "\n", "utf8");

console.log("level 4 words:", out.length);
console.log("scenarios:", new Set(out.map(function (x) { return x.scen; })).size);
console.log("wrote", dest);
