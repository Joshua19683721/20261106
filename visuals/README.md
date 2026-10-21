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

## 目前 11 張附圖

| 科目 | 檔名 | 用在哪一題 | 說明 |
| --- | --- | --- | --- |
| 數學 | `math-triangle-right` | 6-3 以角分類三角形 | 標出 90 度的直角 |
| 數學 | `math-frac-bar` | 7-1 認識二位小數 | 1 平均分成 100 份 |
| 自然 | `sci-dune` | 素養・風與地表（短文） | 沙丘剖面：風搬運、堆積砂粒 |
| 自然 | `sci-mirror-light` | 素養・光的反射 | 入射角與反射角示意 |
| 國語文 | `chi-char-structure` | 字形結構 | 六種字形結構速查（例字不與考題重複） |
| 社會 | `soc-terrain` | 家鄉的地形 | 山地／丘陵／台地／平原／盆地剖面 |
| 社會 | `soc-hill-tea` | 素養・丘陵的茶園（短文） | 階梯茶園剖面 |
| 英語文 | `eng-phonics-ae` | Get Ready Phonics a_e | 母音組合 → 母音（不含例字，不會洩漏答案） |
| 英語文 | `eng-clock` | Unit 2 時間句型 | 4:50 的圓形時鐘 |
| 健康與體育 | `hp-plate` | 營養要均衡 | 健康餐盤六類食物與份量 |
| 健康與體育 | `hp-burn` | 素養・小心灼燙傷（短文） | 沖、脫、蓋、送四步 |

## 選圖原則

1. **圖要是題目材料，不是答案提示**：例如「音標 `[kep]` 對應哪個單字」不附例字圖，
   只給 `a_e → /e/` 的規則；國語文字形結構圖刻意用其他例字。
2. 純文字就能講清楚的題目不附圖（依 Diagram Design 的原則）。
3. 幾何、光線、沙丘剖面這類題目，圖就是題目本身（課本也是這樣出題）。
4. 附圖一律離線可用：SVG 內嵌樣式、系統字型、單一檔案。
