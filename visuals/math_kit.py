# -*- coding: utf-8 -*-
"""
visuals/math_figures.py — 數學題附圖的參數化製圖套件

沿用 Diagram Design 的設計系統（見 visuals/README.md）：
paper #f6f8fc／ink #1f2933／accent #1f51c9、系統字型、4px 網格、幾何先畫再畫方塊。
所有函式回傳 SVG 片段字串，供 build_figures.py 組裝成 HTML 再匯出成 SVG。
"""


def T(x, y, s, cls='t', anchor='start', extra=''):
    return '<text x="%d" y="%d" class="%s" text-anchor="%s"%s>%s</text>' % (
        x, y, cls, anchor, extra, s)


def L(x1, y1, x2, y2, cls='ln', extra=''):
    return '<line x1="%d" y1="%d" x2="%d" y2="%d" class="%s"%s/>' % (x1, y1, x2, y2, cls, extra)


def R(x, y, w, h, cls='n', rx=6, fill=None, extra=''):
    f = ' fill="%s"' % fill if fill else ''
    return '<rect x="%d" y="%d" width="%d" height="%d" rx="%d" class="%s"%s%s/>' % (
        x, y, w, h, rx, cls, f, extra)


def C(cx, cy, r, cls='n', fill=None, extra=''):
    f = ' fill="%s"' % fill if fill else ''
    return '<circle cx="%d" cy="%d" r="%d" class="%s"%s%s/>' % (cx, cy, r, cls, f, extra)


def P(d, cls='ln', extra=''):
    return '<path d="%s" class="%s"%s/>' % (d, cls, extra)


def head(text, x=32, y=58, cls='h'):
    return T(x, y, text, cls)


def note(text, y=372, x=60, cls='sb'):
    return T(x, y, text, cls)


# ----------------------------------------------------------------------
#  幾何圖元
# ----------------------------------------------------------------------

def kv_table(cols, digits, hi=None, x0=70, y0=140, cw=64, rh=52):
    """位值表：上列位值名稱，下列數字。hi = 要標示的欄位索引。"""
    b = []
    n = len(cols)
    w = cw * n
    b.append(R(x0, y0, w, rh, 'n', 0))
    b.append(R(x0, y0 + rh, w, rh, 'n', 0))
    for i, c in enumerate(cols):
        cx = x0 + i * cw
        b.append(L(cx, y0, cx, y0 + rh * 2, 'lm'))
        b.append(T(cx + cw / 2, y0 + 32, c, 's', 'middle'))
        d = digits[i] if i < len(digits) else ''
        cls = 'a' if (hi is not None and i == hi) else 'sb'
        b.append(T(cx + cw / 2, y0 + rh + 36, d, cls, 'middle'))
    b.append(L(x0, y0 + rh, x0 + w, y0 + rh, 'lm'))
    if hi is not None:
        b.append(R(x0 + hi * cw, y0 + rh, cw, rh, 'na', 0))
    return b, x0, y0, w


def num_line(lo, hi, step, pts, unit='', x0=70, x1=570, y=230):
    """數線：刻度與標示點。pts = [(值, 文字, 是否重點)]"""
    b = []
    b.append(L(x0, y, x1, y, 'ln'))
    span = float(hi - lo)
    n = int(round(span / step))
    for i in range(n + 1):
        v = lo + i * step
        x = x0 + (x1 - x0) * (v - lo) / span
        b.append(L(x, y - 8, x, y + 8, 'lm'))
        b.append(T(x, y + 30, ('%g' % v) + unit, 's', 'middle'))
    for p in pts:
        v, label = p[0], p[1]
        hot = len(p) > 2 and p[2]
        x = x0 + (x1 - x0) * (v - lo) / span
        b.append(C(x, y, 8, 'na' if hot else 'ns', '#1f51c9' if hot else '#ffffff'))
        b.append(T(x, y - 20, label, 'a' if hot else 's', 'middle'))
    return b


def area_model(rows, cols, rlabel='', clabel='', x0=150, y0=140, cell=26):
    """面積模型（十格）：rows 列 × cols 欄。"""
    b = []
    for r in range(rows):
        for c in range(cols):
            b.append(R(x0 + c * cell, y0 + r * cell, cell - 3, cell - 3, 'ns', 2))
    b.append(R(x0 - 6, y0 - 6, cols * cell, rows * cell, 'n', 4, 'none', ' opacity="0"'))
    b.append(T(x0 + cols * cell / 2, y0 + rows * cell + 28, clabel, 's', 'middle'))
    b.append(T(x0 - 14, y0 + rows * cell / 2, rlabel, 's', 'end'))
    return b


def long_div(a, b, x=110, y=120):
    """除法直式示意。"""
    b = []
    sa, sb = str(a), str(b)
    b.append(T(x, y, sb, 'ts'))
    b.append(L(x, y + 12, x + 60, y + 12, 'ln'))
    b.append(T(x + 8, y - 16, sa, 'ts'))
    b.append(T(x + 74, y + 44, '…… 商寫在這裡', 's'))
    b.append(T(x + 74, y + 74, '每份 ' + sb + '，看看可以分幾份', 's'))
    return b


def long_mul(a, b, x=110, y=120):
    """乘法直式示意。"""
    b = []
    sa, sb = str(a), str(b)
    b.append(T(x + 6, y, sb, 'ts'))
    b.append(L(x, y + 12, x + 60, y + 12, 'ln'))
    b.append(T(x + 8, y - 16, sa, 'ts'))
    b.append(T(x + 74, y + 20, '＝ 用乘法把每組的數量乘起來', 's'))
    b.append(T(x + 74, y + 48, '相同的一份，先算成一組', 's'))
    return b


def frac_strip(den, shaded, label='', x=90, y=170, w=420, h=54, seg=None):
    """分數條：平均分成 den 份，shaded 份塗色。"""
    b = []
    seg = seg or w / float(den)
    b.append(R(x, y, w, h, 'n', 4))
    for i in range(1, den):
        b.append(L(x + i * seg, y, x + i * seg, y + h, 'lm'))
    for i in range(shaded):
        b.append(R(x + i * seg + 1.5, y + 1.5, seg - 3, h - 3, 'na', 3))
    if label:
        b.append(T(x + w / 2, y + h + 30, label, 'sb', 'middle'))
    return b


def flow(steps, x=90, y=130, bw=200, bh=56, gap=30):
    """運算流程圖：方塊＋箭頭。"""
    b = []
    for i, s in enumerate(steps):
        yy = y + i * (bh + gap)
        b.append(R(x, yy, bw, bh, 'n'))
        b.append(T(x + bw / 2, yy + 34, s, 'ts', 'middle'))
        if i < len(steps) - 1:
            b.append(L(x + bw / 2, yy + bh, x + bw / 2, yy + bh + gap - 6, 'la', ' marker-end="url(#arrow-accent)"'))
    return b


def tri_row(kind, x0=60, y0=150, w=100, h=110, gap=14):
    """三角形組：kind = 'side'（依邊分類）或 'angle'（依角分類）。"""
    b = []
    if kind == 'side':
        specs = [([(x0 + w / 2, y0), (x0 + 6, y0 + h), (x0 + w - 6, y0 + h)], '三邊都一樣長'),
                 ([(x0 + w / 2, y0), (x0 + 18, y0 + h), (x0 + w - 18, y0 + h)], '兩邊一樣長'),
                 ([(x0 + 6, y0 + h), (x0 + w - 6, y0 + h), (x0 + w / 2, y0 + 30)], '三邊都不一樣長')]
    else:
        specs = [([(x0 + 10, y0 + h), (x0 + w - 10, y0 + h), (x0 + w - 10, y0 + 8)], '有一個角是 90 度'),
                 ([(x0 + 10, y0 + h), (x0 + w - 10, y0 + h), (x0 + w / 2, y0 + 26)], '三個角都小於 90 度'),
                 ([(x0 + 10, y0 + h), (x0 + w - 10, y0 + h), (x0 + 26, y0 + 6)], '有一個角大於 90 度')]
    for pts, cap in specs:
        d = 'M ' + ' L '.join('%d %d' % p for p in pts) + ' Z'
        b.append(P(d))
        b.append(T(x0 + w / 2, y0 + h + 28, cap, 's', 'middle'))
    return b


def protractor(deg=60, x=250, y=250, r=130):
    """量角器與角：半圓量角器 + 一條射線。"""
    import math
    b = []
    b.append(P('M %d %d A %d %d 0 0 1 %d %d' % (x - r, y, r, r, x + r, y), 'lm'))
    for a in range(0, 181, 10):
        rad = math.radians(180 - a)
        x1 = x + math.cos(rad) * (r - 14)
        y1 = y - math.sin(rad) * (r - 14)
        x2 = x + math.cos(rad) * r
        y2 = y - math.sin(rad) * r
        cls = 'ln' if a % 30 == 0 else 'lm'
        b.append(L(x1, y1, x2, y2, cls))
    b.append(L(x - r, y, x + r, y, 'lm'))
    b.append(L(x, y, x, y - r, 'la', ' marker-end="url(#arrow-accent)"'))
    rad = math.radians(180 - deg)
    b.append(L(x, y, x + math.cos(rad) * r, y - math.sin(rad) * r, 'la', ' stroke-width="2"'))
    b.append(T(x + 14, y - r + 26, '0 度線', 's'))
    b.append(T(x + 60, y - 60, '中心', 's'))
    return b


def clock_face(h=3, m=0, cx=320, cy=220, r=118):
    """時鐘。"""
    import math
    b = [C(cx, cy, r, 'n')]
    for i in range(12):
        a = math.radians(i * 30)
        x1 = cx + math.sin(a) * (r - 16); y1 = cy - math.cos(a) * (r - 16)
        x2 = cx + math.sin(a) * (r - 4); y2 = cy - math.cos(a) * (r - 4)
        b.append(L(x1, y1, x2, y2, 'ln' if i % 3 == 0 else 'lm'))
    for hh, lab in [(12, '12'), (3, '3'), (6, '6'), (9, '9')]:
        a = math.radians(hh * 30)
        b.append(T(cx + math.sin(a) * (r - 34), cy - math.cos(a) * (r - 34) + 5, lab, 's', 'middle'))
    ah = math.radians((h % 12 + m / 60.0) * 30)
    am = math.radians(m * 6)
    b.append(L(cx, cy, cx + math.sin(ah) * 66, cy - math.cos(ah) * 66, 'ln', ' stroke-width="3"'))
    b.append(L(cx, cy, cx + math.sin(am) * 96, cy - math.cos(am) * 96, 'la', ' stroke-width="2.4"'))
    b.append(C(cx, cy, 5, 'la', '#1f51c9'))
    return b


def bar_chart(data, labels, unit='人', vmax=None, step=None, x0=140, base=300, bh=22, gap=64, h=250):
    """長條圖：data = [數值]、labels = [項目]。"""
    b = []
    vmax = vmax or max(data) * 1.2
    step = step or (vmax / 4.0)
    ppu = h / float(vmax)          # 每個單位多少像素
    b.append(L(x0, base, x0, base - h, 'ln'))
    b.append(L(x0, base, 560, base, 'ln'))
    k = 0
    while k * step <= vmax + 0.001:
        y = base - k * step * ppu
        b.append(L(x0, y, 560, y, 'lm dash'))
        b.append(T(x0 - 12, y + 5, ('%g' % (k * step)), 's', 'end'))
        k += 1
    for i, v in enumerate(data):
        x = x0 + 40 + i * gap
        hh = v * ppu
        b.append(R(x, base - hh, bh, hh, 'n'))
        b.append(R(x, base - hh, bh, hh, 'na'))
        b.append(T(x + bh / 2, base + 26, labels[i], 'ts', 'middle'))
    b.append(T(x0 - 40, base - h - 8, unit, 's', 'end'))
    return b


def line_chart(data, labels, unit='', x0=140, base=300, w=420, h=240, vmax=None):
    """折線圖。"""
    b = []
    vmax = vmax or max(data) * 1.25
    b.append(L(x0, base, x0, base - h, 'ln'))
    b.append(L(x0, base, x0 + w, base, 'ln'))
    n = len(data)
    pts = []
    for i, v in enumerate(data):
        x = x0 + 40 + i * (w - 60) / max(1, n - 1)
        y = base - v * (h / vmax)
        pts.append((x, y))
    for i in range(len(pts) - 1):
        b.append(L(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], 'la', ' stroke-width="2.4"'))
    for i, (x, y) in enumerate(pts):
        b.append(C(x, y, 7, 'na', '#ffffff'))
        b.append(T(x, base + 26, labels[i], 's', 'middle'))
    if unit:
        b.append(T(x0 - 12, base - h - 8, unit, 's', 'end'))
    return b


def num_cards(a, b, x0=150, y0=150, cw=150, ch=90, extra=None):
    """數字比較卡：2～3 張數字卡 + 中間的符號框（不超出 640 寬）。"""
    items = [a, b]
    if extra:
        items.append(extra)
    n = len(items)
    gap = 24
    total = n * cw + (n - 1) * gap
    start = max(20, (640 - total) / 2)
    out = []
    for i, v in enumerate(items):
        x = start + i * (cw + gap)
        out.append(R(x, y0, cw, ch, 'n'))
        out.append(T(x + cw / 2, y0 + 58, v, 'ts', 'middle'))
        if i < n - 1:
            out.append(R(x + cw + 4, y0 + 20, 16, 50, 'n'))
            out.append(T(x + cw + 12, y0 + 54, '?', 'a', 'middle'))
    return out


def story(title, lines, icon=None, x=90, y=130):
    """情境卡：左邊圖示、右邊說明。"""
    b = []
    if icon:
        b += icon
    b.append(T(x + 150, y + 6, title, 'ts'))
    for i, ln in enumerate(lines):
        b.append(T(x + 150, y + 40 + i * 26, ln, 's'))
    return b


def scale_allow(step, vmax):
    """圖表刻度（由題目數字推導）：回傳刻度上的所有數值。"""
    out = set()
    k = 1
    while k * step <= vmax + 0.001:
        out.add(int(k * step))
        k += 1
    return out
