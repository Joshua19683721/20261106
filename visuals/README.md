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

## 目前 33 張附圖

| 科目 | 檔名 | 用在哪一題 | 說明 |
| --- | --- | --- | --- |
| 數學 | `math-triangle-right` | 6-3 以角分類三角形 | 標出 90 度的直角 |
| 數學 | `math-frac-bar` | 7-1 認識二位小數 | 1 平均分成 100 份 |
| 數學 | `math-km-ruler` | 5-2 公里、公尺換算 | 公尺尺規：1 大段＝1 公里＝1000 公尺 |
| 數學 | `math-bar-chart` | 10-1 報讀生活中的統計圖 | 縱軸每格 5 人的長條圖 |
| 數學 | `math-line-chart` | 10-3 報讀折線圖 | 相鄰兩點連起來的線段 |
| 數學 | `math-triangle-perimeter` | 6-1 三角形 | 三邊標 5／6／7 公分，繞一圈求周長 |
| 數學 | `math-mixed-fraction` | 9-2 假分數與帶分數 | 3 個整數 ＋ 2/7 個整數 |
| 數學 | `math-stacked-bar` | 10-4 報讀複雜的統計圖 | 堆疊長條：下層男生 6 人、上層女生 4 人 |
| 自然 | `sci-dune` | 素養・風與地表（短文） | 沙丘剖面：風搬運、堆積砂粒 |
| 自然 | `sci-mirror-light` | 素養・光的反射 | 入射角與反射角示意 |
| 自然 | `sci-circuit` | 4-11 燈泡的串聯與並聯 | 串聯／並聯電路接法 |
| 自然 | `sci-sound-vacuum` | 3-4 聲音傳播需要介質 | 真空罩與空氣中的鬧鐘 |
| 自然 | `sci-water-plant` | 2-1 漂浮性水生植物 | 睡蓮／布袋蓮／水蘊草在水中��位置 |
| 自然 | `sci-animal-sound` | 3-3 動物用聲音溝通 | 狗、貓、鳥、蛙各發出不同聲音 |
| 國語文 | `chi-char-structure` | 字形結構 | 六種字形結構速查（例字不與考題重複） |
| 國語文 | `chi-stroke-rules` | 筆順 | 筆順三原則＋「三」「他」示範 |
| 國語文 | `chi-radical-card` | 查字典（部首） | 「湯」字左邊部件標示 |
| 社會 | `soc-terrain` | 家鄉的地形 | 山地／丘陵／台地／平原／盆地剖面 |
| 社會 | `soc-hill-tea` | 素養・丘陵的茶園（短文） | 階梯茶園剖面 |
| 社會 | `soc-map-types` | 家鄉在哪裡 | 行政區／交通／地形／衛星四種地圖對照 |
| 社會 | `soc-stilt-house` | 傳統住屋與生活 | 架高屋剖面：石板、竹木、茅草 |
| 社會 | `soc-map-elements` | 家鄉在哪裡 | 地圖的比例尺、指北針、圖例 |
| 社會 | `soc-festival` | 傳統的節慶 | 過年／端午／中秋／清明的習俗 |
| 英語文 | `eng-phonics-ae` | Get Ready Phonics a_e | 母音組合 → 母音（不含例字，不會洩漏答案） |
| 英語文 | `eng-clock` | Unit 2 時間句型 | 4:50 的圓形時鐘 |
| 健康與體育 | `hp-plate` | 營養要均衡 | 健康餐盤六類食物與份量 |
| 健康與體育 | `hp-burn` | 素養・小心灼燙傷（短文） | 沖、脫、蓋、送四步 |
| 健康與體育 | `hp-baseball-field` | 壘上攻防 | 壘球場四個壘包與守備位置 |
| 健康與體育 | `hp-fitness-tests` | 健康體適能 | 六項體適能檢測項目（不標能力） |
| 健康與體育 | `hp-diabolo-steps` | 轉動扯鈴（新增題） | 扯鈴五步驟，附圖即為題目材料 |
| 健康與體育 | `hp-football-kick` | 足球玩家 | 球、支撐腳與踢球腳的位置 |
| 健康與體育 | `hp-swim-strokes` | 打水遊戲 | 扶牆／浮板／蹬牆／蹬地四種前進方式 |
| 健康與體育 | `hp-fire-escape` | 素養・火場應變（短文） | 教室平面圖與逃生三不要 |

## 數學：圖由題目動態產生，並自動驗證「題圖一致」

數學是六科裡圖最多的一科。做法不是「一節配一張圖」，而是**每一道題配一張專屬的圖**：

- `visuals/math_kit.py`：參數化製圖套件（位值表、數線、面積模型、除法直式、
  分數條、運算流程圖、三角形組、量角器、時鐘、長條圖、折線圖、數字比較卡…）
- `visuals/math_rules.py`：依小節規則，從**題幹文字**取出數字再畫圖
  （例：「4568 ÷ 4」→ 除法直式就寫 4568、4；「3/8 和 5/8 哪個大」→ 兩條分數條）
- `visuals/math_dynamic_run.py`：統整應用的 19 題情境圖 ＋ 20 組短文圖
  （短文圖的每個數字都直接從短文裡抽出）
- `visuals/math_run_main.py`：產生 HTML → self_check → export_svg → 寫回題庫
- `visuals/math_consistency.py`：**一致性自動驗證**

### 一致性規則

> 附圖上出現的每一個數字，都必須能在題幹（或該圖的允許清單：推導值、圖表刻度）找到；
> 找不到就代表圖與題不一致，必須修圖或**不放這張圖**。

### 成果

- 選擇題 218 題（950 題次）：**208 題有專屬圖**，10 題（4 個題幹）不放圖
- 素養題組 20 組：**全部有圖**
- 不同附圖 208 張，數學科合計 250 張圖
- 沒有圖的 4 題都是「畫了等於直接給答案」：
  - 「下列哪一個數最大？」「下列哪一個小數最大？」（數字在選項裡，畫出來就洩漏答案）
  - 「1 公里等於多少公尺？」「2 公里等於多少公尺？」（任何換算圖都等於答案）

## 選圖原則

1. **圖要是題目材料，不是答案提示**：例如「音標 `[kep]` 對應哪個單字」不附例字圖，
   只給 `a_e → /e/` 的規則；國語文字形結構圖刻意用其他例字。
2. 純文字就能講清楚的題目不附圖（依 Diagram Design 的原則）。
3. 幾何、光線、沙丘剖面這類題目，圖就是題目本身（課本也是這樣出題）。
4. 附圖一律離線可用：SVG 內嵌樣式、系統字型、單一檔案。

> 四年級上學期數學課本（第七冊）沒有「公因數／公倍數」獨立小節，因此沒有對應題目可配圖；
> 已改以公里換算、長條圖、折線圖三張補足數學的視覺化需求。
