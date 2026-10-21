# -*- coding: utf-8 -*-
"""
visuals/math_dynamic_run.py — 依題目內容產生數學附圖並更新題庫

流程
 1. 讀數學題庫（SELECT 247 題 ＋ 統整應用 ＋ PASSAGE 題組）
 2. 每一題用 math_rules.build() 產生「題圖一致」的圖；畫不出來 → 該題不放圖
 3. 產生 HTML → self_check → export_svg → 數學期中考/img/
 4. 把題庫裡原本「一節一張」的圖，換成「一題一張」
 5. 一致性驗證：圖上出現的每個數字都必須能在題幹（或允許清單）找到
"""
import io, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SKILL = os.path.join(ROOT, '.opencode', 'skills', 'diagram-design')
SRC = os.path.join(HERE, 'src')
BANK = os.path.join(ROOT, '數學期中考', 'papers', 'bank.js')
IMG = os.path.join(ROOT, '數學期中考', 'img')
sys.path.insert(0, HERE)

from math_kit import T, L, R, C, P, note, frac_strip, clock_face, bar_chart, line_chart, kv_table, scale_allow
from math_rules import build
from math_dynamic import nums, uniq_ints
import build_figures as BF

# ---------------------------------------------------------------- MIX 情境
MIX = [
    ('平板電腦', '買 8 臺平板電腦', ['3,250', '8 臺'], 'card'),
    ('縣市人口', '縣市人口', ['1,250,000', '680,000'], 'pop'),
    ('每箱飲料', '飲料分裝', ['24 瓶', '15 箱', '9 班'], 'share'),
    ('全校 720 人', '全校每 8 人一桌', ['720 人', '8 人', '75 桌'], 'table'),
    ('甲地到乙地', '兩段距離', ['3 公里 500 公尺', '2 公里 800 公尺'], 'route'),
    ('另一個角比它大', '角與角的比較', ['35 度', '40 度'], 'angle'),
    ('從 3 點方向', '從 3 點轉 120 度', ['3 點', '120 度'], 'clock'),
    ('三角形有兩個角是 65 度', '三角形內角和', ['65 度', '45 度'], 'tri65'),
    ('等腰三角形的兩腰各 9 公分', '等腰三角形周長', ['9 公分', '6 公分'], 'tri99'),
    ('買 2.35 公升的果汁', '小數容量相加', ['2.35 公升', '1.8 公升'], 'dec'),
    ('把 0.8、0.08、0.88', '小數由大到小', ['0.8', '0.08', '0.88'], 'dec3'),
    ('一瓶果汁有 3/8 杯', '分數相加', ['3/8', '5/8'], 'frac38'),
    ('1/6 杯的果汁', '分數乘整數', ['1/6', '5 杯'], 'frac16'),
    ('一枝筆 25 元', '買筆與找零', ['25 元', '3 枝', '100 元'], 'pen'),
    ('36 人先平均分成 4 隊', '先分隊再分組', ['36 人', '4 隊', '3 組'], 'team'),
    ('長條圖中，甲 24 本', '長條圖比較', ['24 本', '18 本', '12 本'], 'bar3'),
    ('一週借書量', '一週借書折線圖', ['20 本', '30 本', '25 本', '35 本'], 'line4'),
    ('臺灣人口約 23,000,000', '兩國人口比較', ['23,000,000', '125,000,000'], 'pop2'),
    ('一盒巧克力有 24 顆', '巧克力總數與剩下', ['24 顆', '15 盒', '60 顆'], 'choco'),
]


def mix_figure(stem):
    allow = set()
    for kw, title, vals, kind in MIX:
        if kw in stem:
            b = []
            b.append(T(60, 120, title, 'ts'))
            if kind == 'card':
                b.append(R(60, 150, 220, 90, 'n'))
                b.append(T(170, 200, vals[0], 'a', 'middle'))
                b.append(T(170, 226, '（每 ' + vals[1].split()[0] + ' 一個）', 's', 'middle'))
                b.append(T(360, 200, '× ' + vals[1].split()[0], 'ts', 'middle'))
            elif kind == 'pop':
                b.append(R(60, 150, 420, 60, 'n'))
                b.append(R(60, 150, 420 * 0.54, 60, 'na'))
                b.append(T(270, 132, vals[0] + ' 人', 'sb', 'middle'))
                b.append(T(270, 190, '市區 ' + vals[1] + ' 人', 'sb', 'middle'))
                b.append(T(270, 246, '郊區 ？人', 'a', 'middle'))
            elif kind == 'share':
                b.append(R(60, 150, 200, 70, 'n'))
                b.append(T(160, 182, vals[0], 'sb', 'middle'))
                b.append(T(160, 206, '× ' + vals[1].split()[0] + ' ' + vals[1].split()[1], 's', 'middle'))
                b.append(T(360, 182, '÷ ' + vals[2].split()[0], 'ts', 'middle'))
            elif kind == 'table':
                b.append(R(60, 150, 200, 70, 'n'))
                b.append(T(160, 182, vals[0], 'sb', 'middle'))
                b.append(T(160, 206, '每 ' + vals[1].split()[0] + ' ' + vals[1].split()[1], 's', 'middle'))
                b.append(T(360, 182, '已坐 ' + vals[2].split()[0] + ' ' + vals[2].split()[1], 'ts', 'middle'))
            elif kind == 'route':
                b.append(L(90, 230, 540, 230, 'ln'))
                b.append(C(120, 230, 12, 'na', '#1f51c9'))
                b.append(C(330, 230, 12, 'ns'))
                b.append(C(540, 230, 12, 'ns'))
                b.append(T(225, 200, vals[0], 'sb', 'middle'))
                b.append(T(435, 200, vals[1], 'sb', 'middle'))
            elif kind == 'angle':
                b.append(P('M 120 260 L 120 160 L 210 260', 'ln'))
                b.append(T(160, 200, '35°', 'a', 'middle'))
                b.append(P('M 300 260 L 300 120 L 420 260', 'ln'))
                b.append(T(345, 200, '？度', 'a', 'middle'))
                b.append(T(400, 300, '比 35 度再大 40 度', 's', 'middle'))
            elif kind == 'clock':
                b = clock_face(3, 0) + b
                b.append(T(320, 360, '從 3 點方向順時針轉 120 度', 'sb', 'middle'))
                return b, {3, 12, 6, 9}
            elif kind == 'tri65':
                b.append(P('M 120 260 L 190 140 L 380 260 Z', 'ln'))
                b.append(T(200, 240, '65°', 'a', 'middle'))
                b.append(T(320, 240, '45°', 'a', 'middle'))
                b.append(T(250, 300, '？度', 'a', 'middle'))
            elif kind == 'tri99':
                b.append(P('M 180 270 L 250 150 L 360 270 Z', 'ln'))
                b.append(T(255, 300, '9 公分', 'a', 'middle'))
                b.append(T(195, 210, '9 公分', 'a', 'middle'))
                b.append(T(400, 300, '6 公分', 'a', 'middle'))
            elif kind == 'dec':
                b.append(R(60, 150, 200, 80, 'n'))
                b.append(T(160, 190, vals[0], 'sb', 'middle'))
                b.append(T(160, 216, '果汁', 's', 'middle'))
                b.append(R(320, 150, 200, 80, 'n'))
                b.append(T(420, 190, vals[1], 'sb', 'middle'))
                b.append(T(420, 216, '牛奶', 's', 'middle'))
            elif kind == 'dec3':
                for i, v in enumerate(vals):
                    b.append(R(60 + i * 180, 150, 150, 80, 'n'))
                    b.append(T(135 + i * 180, 200, v, 'a', 'middle'))
            elif kind == 'frac38':
                b += frac_strip(8, 3, '3/8', x=80, y=150, w=200)
                b += frac_strip(8, 5, '5/8', x=340, y=150, w=200)
            elif kind == 'frac16':
                b += frac_strip(6, 1, '1/6', x=80, y=150, w=200)
                for i in range(5):
                    b.append(R(340 + i * 56, 150, 50, 54, 'ns', 3))
                b.append(T(470, 224, '× 5', 'a', 'middle'))
            elif kind == 'pen':
                b.append(R(60, 150, 180, 80, 'n'))
                b.append(T(150, 192, vals[0], 'sb', 'middle'))
                b.append(T(150, 218, '× ' + vals[1].split()[0] + ' ' + vals[1].split()[1], 's', 'middle'))
                b.append(T(340, 192, '付 ' + vals[2], 'ts', 'middle'))
            elif kind == 'team':
                b.append(R(60, 150, 160, 60, 'n'))
                b.append(T(140, 186, vals[0], 'sb', 'middle'))
                b.append(T(300, 186, '÷ ' + vals[1].split()[0], 'ts', 'middle'))
                b.append(T(440, 186, '÷ ' + vals[2].split()[0], 'ts', 'middle'))
            elif kind == 'bar3':
                b += bar_chart([24, 18, 12], ['甲', '乙', '丙'], '本', vmax=30, step=2,
                               x0=140, base=300, gap=90)
                allow = scale_allow(2, 30)
            elif kind == 'line4':
                b += line_chart([20, 30, 25, 35], ['一', '二', '三', '四'], '本', x0=140, base=300,
                                w=420, h=240, vmax=40)
            elif kind == 'pop2':
                b.append(R(60, 150, 60, 220, 'n'))
                b.append(R(140, 150, 60, 60, 'n'))
                b.append(T(90, 200, '23,000,000', 's', 'middle'))
                b.append(T(170, 186, '125,000,000', 's', 'middle'))
                b.append(T(90, 400, '（人）', 's', 'middle'))
            elif kind == 'choco':
                b.append(R(60, 150, 200, 80, 'n'))
                b.append(T(160, 192, vals[0], 'sb', 'middle'))
                b.append(T(160, 218, '× ' + vals[1].split()[0] + ' ' + vals[1].split()[1], 's', 'middle'))
                b.append(T(400, 192, '－ ' + vals[2], 'ts', 'middle'))
            b.append(note('題目裡的數字，都可以在圖上找到。', 340))
            return b, allow if 'allow' in dir() else set()
    return None


# ---------------------------------------------------------------- PASSAGE
NUMUNIT = re.compile(r'(\d[\d,]*(?:\.\d+)?)\s*([\u4e00-\u9fff]{1,3})')
LABEL_BEFORE = re.compile(r'([\u4e00-\u9fff]{1,4})\s*$')
DROP = ('約', '每', '有', '共', '又', '先', '再', '其中', '這樣', '把', '用', '一', '二', '三', '四',
        '五', '六', '七', '八', '九', '十', '共進', '平分', '平均', '分成', '買了', '賣出')


def _pairs(text):
    flat = text.replace('\\n', '\n')
    out = []
    for m in NUMUNIT.finditer(flat):
        v = m.group(1).replace(',', '')
        u = m.group(2)
        pre = flat[max(0, m.start() - 8):m.start()]
        lm = LABEL_BEFORE.search(pre)
        lbl = lm.group(1) if lm else ''
        for d in DROP:
            lbl = lbl.replace(d, '')
        if not lbl:
            lbl = ''
        out.append((lbl, v, u))
    return out


def passage_figure(tag, text):
    """短文附圖：所有數字都取自短文本身，因此永遠一致。"""
    flat_all = text.replace('\\n', '\n')
    label_pairs = []
    for m in re.finditer(r'([\u4e00-\u9fff]{1,4})\s*(\d[\d,]*)(?:\s*([\u4e00-\u9fff]{1,3}))?', flat_all):
        lbl, v = m.group(1), m.group(2).replace(',', '')
        u = m.group(3) or ''
        if re.fullmatch(r'[一二三四五六七八九十百千萬億零約共每有]+', lbl):
            continue
        label_pairs.append((lbl, v, u))

    # 三角形（七巧板）：兩塊全等三角形拼成大正方形
    if '三角形' in tag:
        b = []
        b.append(P('M 120 260 L 260 120 L 260 260 Z', 'ln'))
        b.append(P('M 260 120 L 400 260 L 260 260 Z', 'la', ' stroke-dasharray="5,4"'))
        b.append(T(190, 200, '甲', 'ts', 'middle'))
        b.append(T(330, 200, '乙', 'ts', 'middle'))
        b.append(T(190, 240, '？公分', 's', 'middle'))
        b.append(T(330, 240, '？公分', 's', 'middle'))
        b.append(T(260, 300, '拼成大正方形', 'sb', 'middle'))
        b.append(note('疊合後完全重合，就是全等。', 350))
        return b, set()

    items = _pairs(text)
    if not items and not label_pairs:
        return None
    # 合併重複的（分類,數值,單位）
    seen = set()
    uniq = []
    for it in items:
        if it in seen:
            continue
        seen.add(it)
        uniq.append(it)

    def num(it):
        try:
            return float(it[1])
        except ValueError:
            return None

    # 統計圖類：畫成長條圖
    if ('統計圖' in tag) or ('一億以內的數' in tag):
        vals = []
        labels = []
        unit = ''
        pairs = list(label_pairs)
        if len(pairs) < 2:
            pairs = [(l, v, u) for (l, v, u) in uniq]
        for lbl, v, u in pairs:
            n = num((lbl, v, u))
            if n is None:
                continue
            if n >= 10000:
                n = n / 10000.0
                unit = '萬人' if not unit else unit
            vals.append(n)
            labels.append(lbl if lbl else '項目')
        if len(vals) < 2:
            return None
        vmax = max(vals) * 1.25
        step = 5 if vmax <= 60 else 50
        b = bar_chart(vals, labels, unit or '數量', vmax=vmax, step=step, x0=140, base=300, gap=90)
        b.append(note('數字都來自短文，數一數每根長條有幾格。', 350))
        allow = set()
        for it in pairs:
            allow.add(it[1])
            n = num(it)
            if n is not None and n >= 10000:
                allow.add(str(int(n / 10000)))
        k = 1
        while k * step <= vmax + 0.001:
            allow.add(str(int(k * step)))
            k += 1
        return b, allow

    # 其他短文：重點數據卡
    b = []
    b.append(T(60, 120, '短文裡的數據', 'ts'))
    x0, y0, cw, ch, gx, gy = 60, 140, 168, 64, 16, 12
    for i, (lbl, v, u) in enumerate(uniq[:6]):
        cx = x0 + (i % 3) * (cw + gx)
        cy = y0 + (i // 3) * (ch + gy)
        b.append(R(cx, cy, cw, ch, 'n'))
        b.append(T(cx + 12, cy + 26, (lbl + ' ' if lbl else ''), 's'))
        b.append(T(cx + 12, cy + 52, v + (' ' + u if u else ''), 'a'))
    b.append(note('把短文的數字和題目對起來，計算就會更清楚。', 350))
    allow = set()
    for it in uniq:
        allow.add(it[1])
    return b, allow
