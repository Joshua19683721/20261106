# -*- coding: utf-8 -*-
"""visuals/math_attach.py — 數學題目的附圖對應表

SECTION_FIGS : 39 個小節 → 附圖
PASSAGE_FIGS : 10 個素養題組 → 附圖
MIX_RULES    : 統整應用題（文字關鍵字）→ 附圖
"""

SECTION_FIGS = {
    "1-1": ("math-kv-place", "位值表：數字放在哪一位"),
    "1-2": ("math-kv-million", "八位數的位值表"),
    "1-3": ("math-compare", "比較兩個數的大小"),
    "1-4": ("math-add-sub", "大數的加法與減法"),
    "2-1": ("math-area-2x1", "兩位數乘一位數的面積模型"),
    "2-2": ("math-area-3x2", "乘法的面積模型"),
    "2-3": ("math-area-carry", "進位乘法的面積模型"),
    "3-1": ("math-protractor", "量角器怎麼量角"),
    "3-2": ("math-protractor-steps", "量角器的三個步驟"),
    "3-3": ("math-rotation", "旋轉角"),
    "3-4": ("math-angle-sum", "角的合成"),
    "4-1": ("math-div-3by1", "除法直式"),
    "4-2": ("math-div-2by2", "除法直式"),
    "4-3": ("math-div-3by2", "除法直式"),
    "4-4": ("math-div-4by2", "除法直式"),
    "5-1": ("math-km-ruler", "公尺尺規"),
    "5-2": ("math-km-ruler", "公尺尺規"),
    "5-3": ("math-km-line", "公里數線"),
    "6-1": ("math-triangle-perimeter", "三角形的周長"),
    "6-2": ("math-tri-side", "以邊分類的三角形"),
    "6-3": ("math-tri-angle", "以角分類的三角形"),
    "6-4": ("math-tri-draw", "畫三角形的步驟"),
    "6-5": ("math-congruent", "全等三角形"),
    "7-1": ("math-frac-bar", "1 平均分成 100 份"),
    "7-2": ("math-dec-line", "小數的大小比較"),
    "7-3": ("math-dec-table", "小數的位值表"),
    "8-1": ("math-flow-muldiv", "兩步驟乘除的順序"),
    "8-2": ("math-flow-mix", "乘除混合運算的順序"),
    "8-3": ("math-distribute-mul", "乘法的分配性質"),
    "8-4": ("math-distribute-div", "除法的分配性質"),
    "8-5": ("math-flow-paren", "有括號的混合運算"),
    "9-1": ("math-frac-three", "真分數、假分數與帶分數"),
    "9-2": ("math-mixed-fraction", "帶分數換成假分數"),
    "9-3": ("math-frac-same", "同分母分數的加減"),
    "9-4": ("math-frac-times", "分數乘整數"),
    "10-1": ("math-charts-three", "長條圖與折線圖"),
    "10-2": ("math-bar-chart", "怎麼報讀長條圖"),
    "10-3": ("math-line-chart", "折線圖的線段在看什麼"),
    "10-4": ("math-stacked-bar", "堆疊長條圖怎麼看"),
}

PASSAGE_FIGS = {
    "素養題組・一億以內的數": ("math-pop-bars", "縣市人口比較"),
    "素養題組・整數的乘法": ("math-mul-arrays", "乘法情境：3 組每組 12 個"),
    "素養題組・角度": ("math-protractor", "量角器怎麼量角"),
    "素養題組・整數的除法": ("math-div-share", "除法情境：分裝與平均分"),
    "素養題組・公里": ("math-km-ruler", "公尺尺規"),
    "素養題組・三角形": ("math-tri-magnets", "三塊三角形磁磚"),
    "素養題組・小數": ("math-dec-money", "小數的容量加減"),
    "素養題組・整數四則計算": ("math-four-ops", "四則運算的順序"),
    "素養題組・分數": ("math-frac-compare", "分數的大小比較"),
    "素養題組・統計圖": ("math-bar-chart", "怎麼報讀長條圖"),
}

MIX_RULES = [
    ("平板電腦", "math-story-shop", "情境：買東西要算總價"),
    ("縣市人口", "math-story-population", "情境：大數相減"),
    ("每箱飲料", "math-story-share", "情境：先乘再平均分"),
    ("全校 720 人", "math-story-share", "情境：先乘再平均分"),
    ("甲地到乙地", "math-story-route", "情境：兩段距離相加"),
    ("另一個角比它大", "math-story-angle", "情境：角與角的比較"),
    ("從 3 點方向", "math-story-clock", "情境：從 3 點轉 120 度"),
    ("三角形有兩個角是 65 度", "math-story-triangle", "情境：三角形的內角和"),
    ("等腰三角形的兩腰各 9 公分", "math-story-triangle", "情境：三角形的內角和"),
    ("買 2.35 公升的果汁", "math-story-decimal", "情境：小數相加"),
    ("把 0.8、0.08、0.88", "math-story-decimal", "情境：小數相加"),
    ("一瓶果汁有 3/8 杯", "math-story-fraction", "情境：分數的加與乘"),
    ("1/6 杯的果汁", "math-story-fraction", "情境：分數的加與乘"),
    ("一枝筆 25 元", "math-story-shop", "情境：買東西要算總價"),
    ("36 人先平均分成 4 隊", "math-story-share", "情境：先乘再平均分"),
    ("長條圖中，甲 24 本", "math-story-chart", "情境：統計圖怎麼看"),
    ("一週借書量", "math-story-chart", "情境：統計圖怎麼看"),
    ("臺灣人口約 23,000,000", "math-story-population", "情境：大數相減"),
    ("一盒巧克力有 24 顆", "math-story-shop", "情境：買東西要算總價"),
]
