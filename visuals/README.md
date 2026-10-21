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

## 數學：每一道題都有圖

數學是六科裡圖最多的一科：**950 題全都有附圖**（760 題選擇 ＋ 190 題素養），
共用到 **56 張** 圖。做法是寫了一套參數化製圖套件 `visuals/math_kit.py`
（位值表、數線、面積模型、除法直式、分數條、流程圖、三角形組、量角器、時鐘、長條圖、折線圖…），
再由 `visuals/math_figures.py` 為 39 個小節、10 個素養題組、19 題統整應用各配一張圖。

| 小節 | 附圖 | 小節 | 附圖 |
| --- | --- | --- | --- |
| 1-1 十萬以內的數 | `math-kv-place` 位值表 | 1-2 一億以內的數 | `math-kv-million` 八位位值表 |
| 1-3 比較大小 | `math-compare` 數字卡比較 | 1-4 大數的加減 | `math-add-sub` 兩張位值表 |
| 2-1 乘一位數 | `math-area-2x1` 面積模型 | 2-2／2-3 乘兩位數 | `math-area-3x2`／`math-area-carry` 拆位面積模型 |
| 3-1 量角器 | `math-protractor` 量角器與角 | 3-2 畫角 | `math-protractor-steps` 三步驟 |
| 3-3 旋轉角 | `math-rotation` 旋轉示意 | 3-4 角的合成 | `math-angle-sum` 兩角合成平角 |
| 4-1～4-4 除法 | `math-div-3by1`／`2by2`／`3by2`／`4by2` 除法直式 | 5-1／5-2 公里換算 | `math-km-ruler` 公尺尺規 |
| 5-3 公里加減 | `math-km-line` 公里數線 | 6-1 三角形 | `math-triangle-perimeter` 三邊標示 |
| 6-2 以邊分類 | `math-tri-side` 三種三角形 | 6-3 以角分類 | `math-tri-angle` 三種三角形 |
| 6-4 繪製三角形 | `math-tri-draw` 作圖步驟 | 6-5 全等圖形 | `math-congruent` 疊合示意 |
| 7-1 二位小數 | `math-frac-bar` 100 格 | 7-2 小數比較 | `math-dec-line` 小數數線 |
| 7-3 小數加減 | `math-dec-table` 小數位值表 | 8-1 兩步驟 | `math-flow-muldiv` 流程圖 |
| 8-2 乘除混合 | `math-flow-mix` 流程圖 | 8-3 乘法分配 | `math-distribute-mul` 拆開示意 |
| 8-4 除法分配 | `math-distribute-div` 括號示意 | 8-5 有括號 | `math-flow-paren` 流程圖 |
| 9-1 三種分數 | `math-frac-three` 分數條 | 9-2 互換 | `math-mixed-fraction` 帶分數拆解 |
| 9-3 同分母加減 | `math-frac-same` 分數條 | 9-4 分數乘整數 | `math-frac-times` 4 個 5/12 |
| 10-1 統計圖 | `math-charts-three` 長條＋折線 | 10-2 長條圖 | `math-bar-chart` 長條圖 |
| 10-3 折線圖 | `math-line-chart` 折線圖 | 10-4 複雜統計圖 | `math-stacked-bar` 堆疊長條 |

素養題組 10 組：人口長條圖、分組乘法、分裝除法、三塊磁磚、小數容量、四則運算順序、
分數比較、量角器、公里尺規、長條圖。統整應用 19 題用 10 張情境圖
（買東西、大數相減、平均分、兩段距離、角的比較、轉幾點、三角形內角、小數、分數、統計圖）。

## 選圖原則

1. **圖要是題目材料，不是答案提示**：例如「音標 `[kep]` 對應哪個單字」不附例字圖，
   只給 `a_e → /e/` 的規則；國語文字形結構圖刻意用其他例字。
2. 純文字就能講清楚的題目不附圖（依 Diagram Design 的原則）。
3. 幾何、光線、沙丘剖面這類題目，圖就是題目本身（課本也是這樣出題）。
4. 附圖一律離線可用：SVG 內嵌樣式、系統字型、單一檔案。

> 四年級上學期數學課本（第七冊）沒有「公因數／公倍數」獨立小節，因此沒有對應題目可配圖；
> 已改以公里換算、長條圖、折線圖三張補足數學的視覺化需求。
