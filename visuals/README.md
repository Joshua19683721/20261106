# 題目附圖（Diagram Design）

六科題目中「本來就該看圖」的題目，附上以 **Diagram Design** 產生的示意圖，
讓四年級學生不用想像就能看懂題意。

- 工具：[cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design)（agent skill）
- 安裝位置：
  - 專案：`.opencode/skills/diagram-design/`
  - 全域：`~/.config/opencode/skills/diagram-design/`
- 樣式：沿用網站配色（paper `#f6f8fc`、ink `#1f2933`、accent `#1f51c9`）＋**系統字型**
  （網站要能離線開啟，圖片不得連 Google Fonts）。樣式定義在 skill 的
  `references/style-guide.md`（本專案已客製）。

## 產生流程

```bash
python visuals/build_figures.py
```

1. 產生自帶 HTML（inline SVG）到 `visuals/src/*.html`（這是原始檔，會進版控）。
2. 跑 skill 內附的 `scripts/self_check.py --offline` 做可及性／離線檢查。
3. 用 `scripts/export_svg.py --system-fonts` 匯出成獨立 SVG，
   放到各科的 `img/<檔名>.svg`。
4. 各科題目用 `[[fig:檔名|圖說]]` 引用，引擎會轉成：

```html
<figure class="qfig">
  <img src="img/xxx.svg" alt="圖說">
  <figcaption>圖說</figcaption>
</figure>
```

## 目前 22 張附圖

| 科目 | 檔名 | 用在哪一題 | 說明 |
| --- | --- | --- | --- |
| 數學 | `math-triangle-right` | 6-3 以角分類三角形 | 標出 90 度的直角 |
| 數學 | `math-frac-bar` | 7-1 認識二位小數 | 1 平均分成 100 份 |
| 數學 | `math-km-ruler` | 5-2 公里、公尺換算 | 公尺尺規：1 大段＝1 公里＝1000 公尺 |
| 數學 | `math-bar-chart` | 10-1 報讀生活中的統計圖 | 縱軸每格 5 人的長條圖 |
| 數學 | `math-line-chart` | 10-3 報讀折線圖 | 相鄰兩點連起來的線段 |
| 自然 | `sci-dune` | 素養・風與地表（短文） | 沙丘剖面：風搬運、堆積砂粒 |
| 自然 | `sci-mirror-light` | 素養・光的反射 | 入射角與反射角示意 |
| 自然 | `sci-circuit` | 4-11 燈泡的串聯與並聯 | 串聯／並聯電路接法 |
| 自然 | `sci-sound-vacuum` | 3-4 聲音傳播需要介質 | 真空罩與空氣中的鬧鐘 |
| 國語文 | `chi-char-structure` | 字形結構 | 六種字形結構速查（例字不與考題重複） |
| 國語文 | `chi-stroke-rules` | 筆順 | 筆順三原則＋「三」「他」示範 |
| 社會 | `soc-terrain` | 家鄉的地形 | 山地／丘陵／台地／平原／盆地剖面 |
| 社會 | `soc-hill-tea` | 素養・丘陵的茶園（短文） | 階梯茶園剖面 |
| 社會 | `soc-map-types` | 家鄉在哪裡 | 行政區／交通／地形／衛星四種地圖對照 |
| 社會 | `soc-stilt-house` | 傳統住屋與生活 | 架高屋剖面：石板、竹木、茅草 |
| 英語文 | `eng-phonics-ae` | Get Ready Phonics a_e | 母音組合 → 母音（不含例字，不會洩漏答案） |
| 英語文 | `eng-clock` | Unit 2 時間句型 | 4:50 的圓形時鐘 |
| 健康與體育 | `hp-plate` | 營養要均衡 | 健康餐盤六類食物與份量 |
| 健康與體育 | `hp-burn` | 素養・小心灼燙傷（短文） | 沖、脫、蓋、送四步 |
| 健康與體育 | `hp-baseball-field` | 壘上攻防 | 壘球場四個壘包與守備位置 |
| 健康與體育 | `hp-fitness-tests` | 健康體適能 | 六項體適能檢測項目（不標能力） |
| 健康與體育 | `hp-diabolo-steps` | 轉動扯鈴（新增題） | 扯鈴五步驟，附圖即為題目材料 |

## 選圖原則

1. **圖要是題目材料，不是答案提示**：例如「音標 `[kep]` 對應哪個單字」不附例字圖，
   只給 `a_e → /e/` 的規則；國語文字形結構圖刻意用其他例字。
2. 純文字就能講清楚的題目不附圖（依 Diagram Design 的原則）。
3. 幾何、光線、沙丘剖面這類題目，圖就是題目本身（課本也是這樣出題）。
4. 附圖一律離線可用：SVG 內嵌樣式、系統字型、單一檔案。

> 四年級上學期數學課本（第七冊）沒有「公因數／公倍數」獨立小節，因此沒有對應題目可配圖；
> 已改以公里換算、長條圖、折線圖三張補足數學的視覺化需求。
