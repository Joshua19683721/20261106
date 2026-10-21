# -*- coding: utf-8 -*-
"""
visuals/build_figures.py — 產生六科題目附圖（Diagram Design 設計系統）

流程
  1. 產生自帶 HTML（inline SVG）到 visuals/src/
  2. 用 Diagram Design 內附的 scripts/export_svg.py 匯出成獨立 SVG
  3. 放到各科的 img/ 資料夾，題目用 [[fig:檔名|圖說]] 引用

樣式沿用 visuals/README.md 與 skill 的 style-guide.md（本專案已客製為網站配色 + 系統字型）。
"""
import io
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SKILL = os.path.join(ROOT, '.opencode', 'skills', 'diagram-design')
SRC = os.path.join(HERE, 'src')
EXPORT = os.path.join(SKILL, 'scripts', 'export_svg.py')
CHECK = os.path.join(SKILL, 'scripts', 'self_check.py')

W, H = 640, 400

CSS = """
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --paper:#f6f8fc;--paper2:#eef2f8;--ink:#1f2933;--muted:#52606d;--soft:#7b8794;
    --rule:#c3ccd8;--accent:#1f51c9;--accent-tint:rgba(31,81,201,0.08);
    --sans:'Noto Sans TC','PingFang TC','Microsoft JhengHei',system-ui,sans-serif;
    --serif:'Noto Serif TC','Songti TC',serif;
  }
  body{font-family:var(--sans);background:var(--paper);color:var(--ink);padding:24px}
  .frame{max-width:720px;margin:0 auto}
  .eyebrow{font:500 12px var(--sans);color:var(--muted);margin-bottom:6px}
  h1{font:400 22px var(--serif);color:var(--ink);margin-bottom:12px}
  .diagram-container{width:100%;overflow-x:auto}
  svg{width:100%;min-width:640px;display:block}
  svg text{font-family:var(--sans)}
  .h{font:400 22px var(--serif);fill:var(--ink)}
  .e{font:500 12px var(--sans);fill:var(--muted)}
  .t{font:600 16px var(--sans);fill:var(--ink)}
  .ts{font:600 15px var(--sans);fill:var(--ink)}
  .s{font:500 13px var(--sans);fill:var(--soft)}
  .sb{font:500 13px var(--sans);fill:var(--ink)}
  .a{font:600 15px var(--sans);fill:var(--accent)}
  .big{font:400 44px var(--serif);fill:var(--ink)}
  .mid{font:400 34px var(--serif);fill:var(--ink)}
  .n{fill:#ffffff;stroke:var(--ink);stroke-width:1}
  .na{fill:var(--accent-tint);stroke:var(--accent);stroke-width:1.2}
  .ns{fill:rgba(31,41,51,0.05);stroke:var(--muted);stroke-width:1}
  .ln{stroke:var(--ink);stroke-width:1.2;fill:none}
  .lm{stroke:var(--muted);stroke-width:1;fill:none}
  .la{stroke:var(--accent);stroke-width:1.4;fill:none}
  .dash{stroke-dasharray:5 4}
"""


def esc(s):
    return (str(s).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))


def txt(x, y, s, cls='t', anchor='start', extra=''):
    return '<text x="%d" y="%d" class="%s" text-anchor="%s"%s>%s</text>' % (
        x, y, cls, anchor, extra, esc(s))


def lines(x, y, rows, cls='s', lh=19, anchor='start'):
    out = []
    for i, r in enumerate(rows):
        out.append(txt(x, y + i * lh, r, cls, anchor))
    return '\n'.join(out)


def box(x, y, w, h, rows, kind='n', title=None, sub=None, title_cls='ts', sub_cls='s'):
    """節點方框：先畫遮罩再畫本體（§6 rule 6）。"""
    out = ['<rect x="%d" y="%d" width="%d" height="%d" rx="6" fill="#f6f8fc"/>' % (x, y, w, h),
           '<rect x="%d" y="%d" width="%d" height="%d" rx="6" class="%s"/>' % (x, y, w, h, kind)]
    if title:
        out.append(txt(x + w / 2, y + 28, title, title_cls, 'middle'))
    if rows:
        out.append(lines(x + w / 2, y + (52 if title else 30), rows, sub_cls, 19, 'middle'))
    return '\n'.join(out)


def arrow_h(x1, x2, y, kind='lm', marker='arrow', label=None):
    """水平箭頭（同一 y，直線）。"""
    out = ['<line x1="%d" y1="%d" x2="%d" y2="%d" class="%s" marker-end="url(#%s)"/>' % (x1, y, x2, y, kind, marker)]
    if label:
        out.append('<rect x="%d" y="%d" width="%d" height="%d" fill="#f6f8fc"/>' % (x1 - 26, y - 30, 52, 18))
        out.append(txt((x1 + x2) / 2, y - 17, label, 's', 'middle'))
    return '\n'.join(out)


def doc(slug, title, desc, body, eyebrow='Diagram Design'):
    defs = ('<defs>'
            '<marker id="arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">'
            '<polygon points="0 0, 8 3, 0 6" fill="#52606d"/></marker>'
            '<marker id="arrow-accent" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">'
            '<polygon points="0 0, 8 3, 0 6" fill="#1f51c9"/></marker>'
            '</defs>')
    head = ('<text x="32" y="30" class="e">%s</text>\n'
            '<text x="32" y="58" class="h">%s</text>' % (esc(eyebrow), esc(title)))
    svg = ('<svg viewBox="0 0 %d %d" xmlns="http://www.w3.org/2000/svg" role="img" '
           'aria-labelledby="%s-title %s-desc">\n'
           '  <title id="%s-title">%s</title>\n'
           '  <desc id="%s-desc">%s</desc>\n'
           '  %s\n'
           '  <rect width="100%%" height="100%%" fill="#f6f8fc"/>\n'
           '  %s\n'
           '  %s\n'
           '</svg>') % (W, H, slug, slug, slug, esc(title), slug, esc(desc), defs, head, body)
    return ('<!DOCTYPE html>\n<html lang="zh-Hant">\n<head>\n<meta charset="UTF-8">\n'
            '<meta name="viewport" content="width=device-width,initial-scale=1.0">\n'
            '<title>%s</title>\n<style>%s</style>\n</head>\n<body>\n<div class="frame">\n'
            '<p class="eyebrow">%s</p>\n<h1>%s</h1>\n<div class="diagram-container">\n%s\n</div>\n</div>\n'
            '</body>\n</html>\n') % (esc(title), CSS, esc(eyebrow), esc(title), svg)


# ======================================================================
#  各科附圖
# ======================================================================

def fig_math_triangle_right():
    b = []
    b.append('<path d="M 180 300 L 180 140 L 400 300 Z" class="ln"/>')
    b.append('<path d="M 180 272 L 208 272 L 208 300" class="la"/>')
    b.append(txt(224, 288, '90°', 'a'))
    b.append(txt(180, 326, '直角', 's', 'middle'))
    b.append('<line x1="120" y1="300" x2="460" y2="300" class="lm"/>')
    b.append(txt(120, 356, '三個角合起來是 180 度；其中一個角是 90 度。', 's'))
    return '\n'.join(b)


def fig_math_frac_bar():
    b = []
    x0, y0, cell, gap = 196, 96, 22, 2
    b.append('<rect x="%d" y="%d" width="%d" height="%d" fill="#ffffff" class="n"/>' %
             (x0 - 4, y0 - 4, cell * 10 + gap * 9 + 8, cell * 10 + gap * 9 + 8))
    for r in range(10):
        for c in range(10):
            x = x0 + c * (cell + gap)
            y = y0 + r * (cell + gap)
            if r == 9 and c == 0:
                b.append('<rect x="%d" y="%d" width="%d" height="%d" class="na"/>' % (x, y, cell, cell))
            else:
                b.append('<rect x="%d" y="%d" width="%d" height="%d" class="ns"/>' % (x, y, cell, cell))
    b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="la"/>' % (x0 + cell / 2, y0 + 10 * (cell + gap) + 14, x0 + cell / 2, y0 + 10 * (cell + gap) + 44))
    b.append(txt(x0 + cell / 2 + 10, y0 + 10 * (cell + gap) + 40, '其中的 1 份', 'a'))
    b.append(txt(96, 120, '1', 'mid', 'middle'))
    b.append(txt(96, 150, '平均分成', 's', 'middle'))
    b.append(txt(96, 172, '100 份', 'a', 'middle'))
    b.append(txt(96, 200, '每份都是', 's', 'middle'))
    b.append(txt(96, 222, '一樣大', 's', 'middle'))
    b.append(txt(96, 262, '取其中 1 份，', 's', 'middle'))
    b.append(txt(96, 282, '用分數表示是？', 'sb', 'middle'))
    return '\n'.join(b)


def fig_sci_dune():
    b = []
    b.append('<line x1="60" y1="300" x2="580" y2="300" class="lm"/>')
    b.append('<path d="M 150 300 C 230 292, 268 236, 330 168 C 356 196, 386 258, 424 300" '
             'class="ln"/>')
    b.append('<path d="M 150 300 C 230 292, 268 236, 330 168" class="la dash"/>')
    for i, (gx, gy) in enumerate([(196, 288), (232, 276), (266, 250), (296, 214)]):
        b.append('<circle cx="%d" cy="%d" r="3" class="la" fill="none"/>' % (gx, gy))
    b.append(arrow_h(64, 132, 120, 'lm', 'arrow', '風'))
    b.append(txt(196, 116, '風把砂粒吹起、搬運', 's'))
    b.append(txt(214, 336, '迎風坡（坡緩）', 's', 'middle'))
    b.append(txt(400, 336, '背風坡（坡陡）', 's', 'middle'))
    b.append(txt(470, 200, '沙丘', 'ts'))
    b.append(txt(470, 224, '砂粒堆積處', 's'))
    b.append(txt(64, 372, '風持續吹，砂粒被搬運到別處堆積，沙丘就會慢慢移動位置。', 's'))
    return '\n'.join(b)


def fig_sci_mirror_light():
    import math
    b = []
    b.append('<circle cx="104" cy="128" r="30" class="na"/>')
    b.append(txt(104, 134, '陽光', 'sb', 'middle'))
    b.append('<line x1="134" y1="128" x2="292" y2="256" class="la" marker-end="url(#arrow-accent)"/>')
    b.append('<line x1="256" y1="292" x2="344" y2="204" class="ln"/>')
    b.append('<line x1="524" y1="80" x2="524" y2="320" class="ln"/>')
    b.append('<line x1="308" y1="248" x2="524" y2="120" class="la" marker-end="url(#arrow-accent)"/>')
    b.append('<circle cx="524" cy="120" r="9" class="na" fill="#1f51c9"/>')
    b.append(txt(548, 112, '牆上的光點', 'ts'))
    b.append(txt(548, 134, '反射後才出現', 's'))
    b.append('<path d="M 262 232 A 46 46 0 0 1 286 214" class="lm"/>')
    b.append(txt(224, 214, '入射角', 's'))
    b.append('<path d="M 330 214 A 46 46 0 0 1 350 232" class="lm"/>')
    b.append(txt(356, 214, '反射角', 's'))
    b.append(txt(256, 316, '鏡子', 'ts', 'middle'))
    b.append(txt(64, 372, '光線照到鏡子會彈開，方向改變——這就是「反射」。', 's'))
    return '\n'.join(b)


def fig_chi_char_structure():
    b = []
    items = [('山', '獨體字'), ('好', '左右結構'), ('花', '上下結構'),
             ('同', '上包下'), ('國', '外包內'), ('巡', '左下包右上')]
    x0, y0, w, h, gx, gy = 28, 92, 184, 116, 16, 16
    for i, (ch, name) in enumerate(items):
        cx = x0 + (i % 3) * (w + gx)
        cy = y0 + (i // 3) * (h + gy)
        b.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" fill="#f6f8fc"/>' % (cx, cy, w, h))
        b.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" class="n"/>' % (cx, cy, w, h))
        b.append(txt(cx + w / 2, cy + 62, ch, 'big', 'middle'))
        b.append(txt(cx + w / 2, cy + 94, name, 's', 'middle'))
    b.append(txt(28, 356, '看字時先想：它是怎麼組成的？再判斷屬於哪一種結構。', 's'))
    return '\n'.join(b)


def fig_soc_terrain():
    b = []
    x0, y0, w, h, gx = 28, 92, 104, 176, 16
    base = y0 + 132
    shapes = [
        ('山地', 'M 12 132 L 34 52 L 52 92 L 70 34 L 92 132'),
        ('丘陵', 'M 12 132 C 28 86, 44 86, 52 112 C 62 84, 78 86, 92 132'),
        ('台地', 'M 12 132 L 26 132 L 34 60 L 74 60 L 84 132 L 92 132'),
        ('平原', 'M 12 132 L 92 132'),
        ('盆地', 'M 12 132 L 26 48 L 40 104 L 64 104 L 78 48 L 92 132'),
    ]
    for i, (name, d) in enumerate(shapes):
        cx = x0 + i * (w + gx)
        b.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" fill="#f6f8fc"/>' % (cx, y0, w, h))
        b.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" class="n"/>' % (cx, y0, w, h))
        b.append('<g transform="translate(%d %d)"><path d="%s" class="ln"/></g>' % (cx + 6, base, d))
        b.append(txt(cx + w / 2, y0 + 160, name, 'ts', 'middle'))
    b.append(txt(28, 304, '由左而右：山勢高低與起伏不同，就分成不同的地形。', 's'))
    b.append(txt(28, 336, '台地＝頂部平坦、邊緣較陡；盆地＝四周較高、中間低平。', 's'))
    return '\n'.join(b)


def fig_soc_hill_tea():
    b = []
    b.append('<line x1="48" y1="300" x2="592" y2="300" class="lm"/>')
    b.append('<path d="M 48 300 L 168 232 L 288 164 L 408 108 L 528 72" class="ln"/>')
    steps = [(168, 232, 232), (288, 164, 164), (408, 108, 108), (528, 72, 72)]
    for (sx, sy, y2) in steps:
        b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (sx - 56, sy, sx, sy))
        b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="la dash"/>' % (sx - 56, y2 + 26, sx, sy + 26))
        for k in range(3):
            b.append('<circle cx="%d" cy="%d" r="7" class="na"/>' % (sx - 40 + k * 18, sy - 6))
    b.append(txt(200, 344, '階梯茶園：沿著等高線一階一階種茶', 's', 'middle'))
    b.append(txt(88, 196, '丘陵', 'ts'))
    b.append(txt(88, 220, '坡度較緩', 's'))
    b.append(txt(556, 132, '山頂', 's'))
    b.append(txt(64, 372, '一階一階的茶樹排成階梯，方便耕作也減少土壤流失。', 's'))
    return '\n'.join(b)


def fig_eng_phonics_ae():
    b = []
    b.append(box(56, 104, 176, 72, [], 'n', 'a + e', None))
    b.append(arrow_h(244, 320, 140, 'lm', 'arrow'))
    b.append(box(332, 104, 152, 72, [], 'na', '/e/', None))
    b.append(txt(244, 112, '母音字母', 's', 'middle'))
    b.append(txt(408, 96, '長母音', 'a', 'middle'))
    b.append(box(56, 208, 176, 72, [], 'ns', 'a', None))
    b.append(arrow_h(244, 320, 244, 'lm', 'arrow'))
    b.append(box(332, 208, 152, 72, [], 'ns', '/æ/', None))
    b.append(txt(244, 216, '母音字母', 's', 'middle'))
    b.append(txt(408, 200, '短母音', 's', 'middle'))
    b.append(txt(56, 320, '規則：母音字母後面加一個不發音的 e，', 'sb'))
    b.append(txt(56, 342, '母音字母就會念自己的名字，變成長母音。', 'sb'))
    return '\n'.join(b)


def fig_eng_clock():
    import math
    b = []
    cx, cy, r = 320, 218, 118
    b.append('<circle cx="%d" cy="%d" r="%d" fill="#ffffff" class="n"/>' % (cx, cy, r))
    for h in range(12):
        a = math.radians(h * 30)
        x1 = cx + math.sin(a) * (r - 16)
        y1 = cy - math.cos(a) * (r - 16)
        x2 = cx + math.sin(a) * (r - 4)
        y2 = cy - math.cos(a) * (r - 4)
        cls = 'ln' if h % 3 == 0 else 'lm'
        b.append('<line x1="%.1f" y1="%.1f" x2="%.1f" y2="%.1f" class="%s"/>' % (x1, y1, x2, y2, cls))
    for h, label in [(12, '12'), (3, '3'), (6, '6'), (9, '9')]:
        a = math.radians(h * 30)
        b.append(txt(cx + math.sin(a) * (r - 34), cy - math.cos(a) * (r - 34) + 5, label, 's', 'middle'))
    th = math.radians((4 + 50 / 60) * 30)
    tm = math.radians(50 * 6)
    b.append('<line x1="%d" y1="%d" x2="%.1f" y2="%.1f" class="ln" stroke-width="3"/>' %
             (cx, cy, cx + math.sin(th) * 66, cy - math.cos(th) * 66))
    b.append('<line x1="%d" y1="%d" x2="%.1f" y2="%.1f" class="la" stroke-width="2.4"/>' %
             (cx, cy, cx + math.sin(tm) * 96, cy - math.cos(tm) * 96))
    b.append('<circle cx="%d" cy="%d" r="5" class="la" fill="#1f51c9"/>' % (cx, cy))
    b.append(txt(320, 372, '短針指向 4 和 5 之間，長針指向 10，就是 4:50。', 's', 'middle'))
    return '\n'.join(b)


def fig_hp_plate():
    b = []
    b.append('<rect x="72" y="92" width="496" height="252" rx="12" fill="#eef2f8"/>')
    b.append('<rect x="72" y="92" width="496" height="252" rx="12" class="n"/>')
    cells = [
        ('蔬菜類', '1.5 個拳頭大', 'na'),
        ('穀類（飯麵）', '1 個拳頭大', 'n'),
        ('水果類', '1 個拳頭大', 'n'),
        ('豆魚蛋肉類', '1 個掌心大', 'n'),
        ('奶類', '1 杯', 'n'),
        ('堅果種子類', '1 茶匙', 'n'),
    ]
    cw, ch, g = 224, 72, 16
    for i, (name, amt, kind) in enumerate(cells):
        cx = 88 + (i % 2) * (cw + g)
        cy = 108 + (i // 2) * (ch + g)
        b.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" fill="#f6f8fc"/>' % (cx, cy, cw, ch))
        b.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" class="%s"/>' % (cx, cy, cw, ch, kind))
        b.append(txt(cx + 16, cy + 30, name, 'ts'))
        b.append(txt(cx + 16, cy + 54, amt, 'a' if kind == 'na' else 's'))
    b.append(txt(72, 368, '每一餐照著餐盤吃，營養才會均衡；蔬菜最多，穀類、水果、豆魚蛋肉、奶、堅果依序。', 's'))
    return '\n'.join(b)


def fig_hp_burn():
    b = []
    steps = [
        ('①', '沖', ['用流動的冷水', '沖 10～15 分鐘']),
        ('②', '脫', ['小心脫下衣物', '黏住不要硬撕']),
        ('③', '蓋', ['用乾淨的布', '或紗布覆蓋傷口']),
        ('④', '送', ['送醫治療', '並告知受傷原因']),
    ]
    x0, y0, w, h, g = 20, 116, 130, 108, 20
    for i, (num, name, rows) in enumerate(steps):
        cx = x0 + i * (w + g)
        b.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" fill="#f6f8fc"/>' % (cx, y0, w, h))
        b.append('<rect x="%d" y="%d" width="%d" height="%d" rx="6" class="n"/>' % (cx, y0, w, h))
        b.append(txt(cx + 16, y0 + 32, num, 'a'))
        b.append(txt(cx + 52, y0 + 32, name, 'ts'))
        b.append(lines(cx + 16, y0 + 62, rows, 's', 20))
        if i < 3:
            b.append(arrow_h(cx + w + 2, cx + w + g - 2, y0 + h / 2, 'lm', 'arrow'))
    b.append(txt(20, 268, '順序：沖 → 脫 → 蓋 → 送，一步一步做，傷口才不會更嚴重。', 'sb'))
    b.append(txt(20, 316, '不要塗牙膏、醬油或撒鹽巴，也不要自己戳破水泡。', 's'))
    b.append(txt(20, 344, '燙傷後先用流動冷水沖洗，是最重要的第一步。', 's'))
    return '\n'.join(b)


# ======================================================================
#  第二批附圖
# ======================================================================

def fig_math_km_ruler():
    b = []
    x0, x1, seg = 60, 580, 130
    b.append('<rect x="%d" y="176" width="%d" height="30" fill="#ffffff" class="n"/>' % (x0, x1 - x0))
    for i in range(3):
        x = x0 + i * seg
        b.append('<line x1="%d" y1="176" x2="%d" y2="206" class="ln"/>' % (x, x))
        b.append('<line x1="%d" y1="194" x2="%d" y2="194" class="lm"/>' % (x + seg // 2, x + seg // 2))
        b.append(txt(x, 160, '0' if i == 0 else '%d 公里' % i, 'ts', 'middle'))
        b.append(txt(x + seg // 2, 230, '500 公尺', 's', 'middle'))
    b.append(txt(x1, 160, '2 公里', 'ts', 'middle'))
    b.append(txt(x0 + seg, 262, '1 公里 ＝ 1000 公尺', 'a', 'middle'))
    b.append(txt(60, 300, '照著尺規算：10 公里 ＝ 幾個 1000 公尺？', 'sb'))
    b.append(txt(60, 328, '1 段是 1 公里（1000 公尺），10 段就是 10 個 1000 公尺。', 's'))
    return '\n'.join(b)


def fig_math_bar_chart():
    b = []
    bx, by, gh = 140, 300, 44
    b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (bx, by, bx, by - 4 * gh))
    b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (bx, by, 560, by))
    for k in range(1, 5):
        y = by - k * gh
        b.append('<line x1="%d" y1="%d" x2="560" y2="%d" class="lm dash"/>' % (bx, y, y))
        b.append(txt(bx - 12, y + 5, str(k * 5), 's', 'end'))
    b.append(txt(bx - 12, by + 5, '0', 's', 'end'))
    b.append(txt(bx - 46, by - 4 * gh - 8, '人', 's', 'end'))
    bars = [('甲', 4), ('乙', 2), ('丙', 3)]
    for i, (name, n) in enumerate(bars):
        x = 190 + i * 120
        h = n * gh
        b.append('<rect x="%d" y="%d" width="64" height="%d" fill="#ffffff" class="n"/>' % (x, by - h, h))
        b.append('<rect x="%d" y="%d" width="64" height="%d" class="na"/>' % (x, by - h, h))
        b.append(txt(x + 32, by + 26, name, 'ts', 'middle'))
    b.append(txt(60, 356, '縱軸每一格代表 5 人。甲的長條高 4 格，所以是 4 個 5 人。', 's'))
    return '\n'.join(b)


def fig_math_line_chart():
    b = []
    ox, oy = 140, 300
    b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (ox, oy, ox, oy - 170))
    b.append('<line x1="%d" y1="%d" x2="560" y2="%d" class="ln"/>' % (ox, oy, oy))
    b.append(txt(ox - 40, oy - 178, '數量', 's', 'end'))
    pts = [(180, 250), (300, 150), (420, 210), (540, 110)]
    for i in range(len(pts) - 1):
        b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="la" stroke-width="2.4"/>' %
                 (pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]))
    for i, (x, y) in enumerate(pts):
        b.append('<circle cx="%d" cy="%d" r="7" fill="#ffffff" class="la"/>' % (x, y))
        b.append(txt(x, oy + 26, '%d 月' % (i + 1), 's', 'middle'))
    b.append(txt(60, 356, '把相鄰兩點連起來的線段，就是這一張折線圖要看的部分。', 's'))
    return '\n'.join(b)


def fig_sci_circuit():
    b = []

    def bulb(x, y):
        return ('<circle cx="%d" cy="%d" r="11" fill="#ffffff" class="ln"/>'
                '<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>'
                '<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>') % (
            x, y, x - 7, y - 7, x + 7, y + 7, x - 7, y + 7, x + 7, y - 7)

    def battery(x, y):
        return ('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>'
                '<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>') % (
            x, y, x, y - 22, x + 14, y - 14, x + 14, y + 22)

    # 串聯
    b.append(txt(170, 128, '串聯', 'ts', 'middle'))
    b.append(battery(70, 230))
    b.append('<path d="M 70 208 L 150 208 L 150 150" class="lm"/>')
    b.append(bulb(150, 150))
    b.append('<path d="M 150 139 L 150 118 L 230 118" class="lm"/>')
    b.append(bulb(230, 118))
    b.append('<path d="M 230 107 L 230 230 L 84 230" class="lm"/>')
    b.append('<path d="M 84 230 L 84 208" class="lm"/>')
    b.append(txt(170, 272, '電路只有一條路', 's', 'middle'))

    # 並聯
    b.append(txt(470, 128, '並聯', 'ts', 'middle'))
    b.append(battery(370, 230))
    b.append('<path d="M 370 208 L 430 208 L 430 150" class="lm"/>')
    b.append(bulb(430, 150))
    b.append('<path d="M 430 139 L 430 118 L 510 118" class="lm"/>')
    b.append(bulb(510, 118))
    b.append('<path d="M 510 107 L 510 230 L 384 230" class="lm"/>')
    b.append('<path d="M 430 139 L 430 230" class="lm"/>')
    b.append('<path d="M 384 230 L 384 208" class="lm"/>')
    b.append(txt(470, 272, '電路分成幾條路', 's', 'middle'))

    b.append(txt(60, 330, '接法不同，電流通過的路徑就不同。', 'sb'))
    b.append(txt(60, 358, '照著線路數一數：燈泡一個接一個經過，還是分成好幾條路？', 's'))
    return '\n'.join(b)


def fig_sci_sound_vacuum():
    b = []
    # 左：真空罩
    b.append('<rect x="90" y="140" width="180" height="160" rx="10" fill="#ffffff" class="n"/>')
    b.append('<path d="M 150 236 L 150 208 M 150 208 L 142 196 L 158 196 L 150 208" class="ln"/>')
    b.append('<circle cx="150" cy="234" r="5" class="ln"/>')
    b.append('<line x1="270" y1="220" x2="330" y2="220" class="lm"/>')
    b.append('<rect x="330" y="200" width="40" height="40" rx="6" class="ns"/>')
    b.append(txt(350, 226, '抽氣', 's', 'middle'))
    b.append(txt(180, 330, '抽掉空氣（真空）', 'ts', 'middle'))
    b.append(txt(180, 352, '裡面幾乎沒有空氣', 's', 'middle'))
    # 右：空氣中
    b.append('<path d="M 470 236 L 470 208 M 470 208 L 462 196 L 478 196 L 470 208" class="ln"/>')
    b.append('<circle cx="470" cy="234" r="5" class="ln"/>')
    for r in (26, 40, 54):
        b.append('<path d="M %d 200 A %d %d 0 0 1 %d 236" class="la" fill="none"/>' % (486 + r, r, r, 486 + r))
    b.append(txt(520, 330, '在空氣中', 'ts', 'middle'))
    b.append(txt(520, 352, '空氣把振動傳到耳朵', 's', 'middle'))
    b.append(txt(60, 100, '同一個鬧鐘，換了環境，聲音還聽得到嗎？', 'sb'))
    return '\n'.join(b)


def fig_soc_map_types():
    b = []
    cards = [
        ('行政區圖', '看各鄉、鎮、市、區的界線', 'admin'),
        ('交通路線圖', '看道路、鐵路與車站', 'traffic'),
        ('地形圖', '看地勢高低（等高線）與河川', 'terrain'),
        ('衛星圖', '看真實的房屋、道路與山林', 'satellite'),
    ]
    for i, (name, desc, kind) in enumerate(cards):
        cx = 40 + (i % 2) * 288
        cy = 116 + (i // 2) * 140
        b.append('<rect x="%d" y="%d" width="272" height="124" rx="6" fill="#f6f8fc"/>' % (cx, cy))
        b.append('<rect x="%d" y="%d" width="272" height="124" rx="6" class="n"/>' % (cx, cy))
        b.append(txt(cx + 16, cy + 30, name, 'ts'))
        b.append(txt(cx + 16, cy + 52, desc, 's'))
        gx, gy = cx + 16, cy + 66
        if kind == 'admin':
            b.append('<rect x="%d" y="%d" width="96" height="44" fill="#ffffff" class="lm"/>' % (gx, gy))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="lm dash"/>' % (gx + 32, gy, gx + 32, gy + 44))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="lm dash"/>' % (gx, gy + 22, gx + 96, gy + 22))
        elif kind == 'traffic':
            b.append('<path d="M %d %d L %d %d L %d %d" class="la" fill="none"/>' % (gx, gy + 34, gx + 44, gy + 4, gx + 96, gy + 40))
            for px, py in [(gx + 44, gy + 4), (gx + 96, gy + 40)]:
                b.append('<circle cx="%d" cy="%d" r="5" class="la" fill="#1f51c9"/>' % (px, py))
        elif kind == 'terrain':
            b.append('<path d="M %d %d C %d %d %d %d %d %d" class="la" fill="none"/>' % (gx, gy + 36, gx + 20, gy + 6, gx + 60, gy + 6, gx + 96, gy + 36))
            b.append('<path d="M %d %d C %d %d %d %d %d %d" class="la" fill="none"/>' % (gx, gy + 44, gx + 26, gy + 20, gx + 62, gy + 20, gx + 96, gy + 44))
            b.append('<path d="M %d %d C %d %d %d %d %d %d" class="ln" fill="none"/>' % (gx + 40, gy, gx + 52, gy + 18, gx + 60, gy + 24, gx + 70, gy + 44))
        else:
            b.append('<rect x="%d" y="%d" width="96" height="44" fill="#e7efe6" class="lm"/>' % (gx, gy))
            b.append('<rect x="%d" y="%d" width="28" height="18" fill="#ffffff" class="lm"/>' % (gx + 10, gy + 8))
            b.append('<rect x="%d" y="%d" width="22" height="14" fill="#ffffff" class="lm"/>' % (gx + 56, gy + 22))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (gx, gy + 34, gx + 96, gy + 16))
    b.append(txt(40, 100, '同一個家鄉，用不同的地圖可以看見不同的資訊。', 'sb'))
    return '\n'.join(b)


def fig_soc_stilt_house():
    b = []
    b.append('<line x1="60" y1="300" x2="580" y2="300" class="ln"/>')
    for i in range(7):
        b.append('<rect x="%d" y="300" width="44" height="12" rx="3" class="ns"/>' % (80 + i * 64))
    b.append(txt(120, 330, '石板地面', 's'))
    for x in (170, 250, 330, 410):
        b.append('<line x1="%d" y1="300" x2="%d" y2="222" class="ln"/>' % (x, x))
    b.append('<rect x="150" y="206" width="280" height="16" rx="3" fill="#ffffff" class="ln"/>')
    b.append(txt(290, 194, '架高的地板（防潮、防蟲）', 's', 'middle'))
    b.append('<rect x="182" y="146" width="216" height="60" fill="#ffffff" class="ln"/>')
    b.append('<path d="M 156 146 L 290 96 L 424 146" class="ln"/>')
    b.append('<path d="M 172 146 L 290 104 L 408 146" class="lm"/>')
    b.append(txt(290, 132, '茅草屋頂', 's', 'middle'))
    b.append(txt(290, 180, '竹木牆面', 's', 'middle'))
    b.append(txt(470, 180, '就地取材：', 's'))
    b.append(txt(470, 202, '石板・竹・木', 's'))
    b.append(txt(470, 224, '・茅草', 's'))
    b.append(txt(60, 366, '用當地就有的材料蓋房子，就是傳統住屋最大的特色。', 'sb'))
    return '\n'.join(b)


def fig_chi_stroke_rules():
    b = []
    rules = [('①', '從上到下', '先寫上面的部分'),
             ('②', '從左到右', '先寫左邊的部分'),
             ('③', '先橫後豎', '先寫橫的，再寫豎的')]
    for i, (num, name, desc) in enumerate(rules):
        y = 116 + i * 76
        b.append('<rect x="56" y="%d" width="300" height="60" rx="6" fill="#f6f8fc"/>' % y)
        b.append('<rect x="56" y="%d" width="300" height="60" rx="6" class="n"/>' % y)
        b.append(txt(76, y + 38, num, 'a'))
        b.append(txt(112, y + 30, name, 'ts'))
        b.append(txt(112, y + 50, desc, 's'))
    b.append(txt(390, 118, '例如「三」：', 'ts'))
    for k in range(3):
        y = 140 + k * 34
        b.append('<line x1="400" y1="%d" x2="470" y2="%d" class="ln"/>' % (y, y))
        b.append(txt(486, y + 5, str(k + 1), 'a'))
    b.append(txt(390, 268, '例如「他」：', 'ts'))
    b.append('<line x1="404" y1="280" x2="404" y2="320" class="ln"/>')
    b.append('<line x1="404" y1="292" x2="396" y2="306" class="ln"/>')
    b.append('<line x1="404" y1="306" x2="412" y2="316" class="ln"/>')
    b.append(txt(424, 306, '1', 'a'))
    b.append('<path d="M 440 280 L 440 318 M 452 288 L 452 312 M 464 282 L 464 316" class="ln"/>')
    b.append(txt(482, 306, '2', 'a'))
    b.append(txt(56, 372, '遇到不確定的字，可以先想想這三條原則，再看課本上的筆順圖。', 'sb'))
    return '\n'.join(b)


def fig_hp_baseball_field():
    b = []
    home = (320, 300)
    bases = {'一壘': (470, 232), '二壘': (320, 164), '三壘': (170, 232)}
    b.append('<path d="M %d %d L %d %d L %d %d L %d %d Z" class="lm" fill="none"/>' % (
        home[0], home[1], bases['一壘'][0], bases['一壘'][1], bases['二壘'][0], bases['二壘'][1],
        bases['三壘'][0], bases['三壘'][1]))
    for name, (x, y) in bases.items():
        b.append('<rect x="%d" y="%d" width="18" height="18" rx="2" class="na"/>' % (x - 9, y - 9))
        b.append(txt(x, y - 18, name, 's', 'middle'))
    b.append('<path d="M %d %d L %d %d" class="ln"/>' % (home[0], home[1], home[0], home[1] + 18))
    b.append(txt(home[0], home[1] + 42, '本壘', 's', 'middle'))
    spots = [('投手', 392, 268), ('捕手', 320, 338), ('一壘手', 482, 250),
             ('二壘手', 320, 186), ('三壘手', 158, 250), ('游擊手', 372, 208)]
    for name, x, y in spots:
        b.append('<circle cx="%d" cy="%d" r="9" fill="#ffffff" class="lm"/>' % (x, y))
        b.append(txt(x, y + 26, name, 's', 'middle'))
    b.append(txt(60, 120, '壘球場地：四個壘包與守備員的位置', 'sb'))
    b.append(txt(60, 366, '守備方把球傳到壘上，隊友就能用球碰到跑者。', 'sb'))
    return '\n'.join(b)


def fig_hp_fitness_tests():
    b = []
    items = [('立定跳遠', 'jump'), ('坐姿體前彎', 'bend'), ('800 公尺跑', 'run'),
             ('30 秒仰臥起坐', 'situp'), ('引向上', 'pull'), ('一分鐘跳繩', 'rope')]
    for i, (name, kind) in enumerate(items):
        cx = 40 + (i % 3) * 190
        cy = 116 + (i // 3) * 128
        b.append('<rect x="%d" y="%d" width="176" height="112" rx="6" fill="#f6f8fc"/>' % (cx, cy))
        b.append('<rect x="%d" y="%d" width="176" height="112" rx="6" class="n"/>' % (cx, cy))
        gx, gy = cx + 58, cy + 26
        if kind == 'jump':
            b.append('<path d="M %d %d Q %d %d %d %d" class="la" fill="none"/>' % (gx - 30, gy + 20, gx, gy - 22, gx + 30, gy + 20))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="lm"/>' % (gx - 34, gy + 20, gx + 34, gy + 20))
        elif kind == 'bend':
            b.append('<circle cx="%d" cy="%d" r="9" class="ln"/>' % (gx - 22, gy - 14))
            b.append('<path d="M %d %d L %d %d L %d %d" class="ln"/>' % (gx - 22, gy - 4, gx - 6, gy + 18, gx + 30, gy + 18))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="lm dash"/>' % (gx - 40, gy + 26, gx + 40, gy + 26))
        elif kind == 'run':
            b.append('<circle cx="%d" cy="%d" r="9" class="ln"/>' % (gx - 18, gy - 18))
            b.append('<path d="M %d %d L %d %d L %d %d" class="la" fill="none"/>' % (gx - 18, gy - 8, gx + 6, gy + 4, gx + 26, gy - 10))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="lm"/>' % (gx - 40, gy + 26, gx + 40, gy + 26))
        elif kind == 'situp':
            b.append('<circle cx="%d" cy="%d" r="9" class="ln"/>' % (gx - 26, gy + 8))
            b.append('<path d="M %d %d L %d %d" class="ln"/>' % (gx - 16, gy + 8, gx + 16, gy + 6))
            b.append('<path d="M %d %d L %d %d" class="ln"/>' % (gx + 16, gy + 6, gx + 30, gy + 18))
        elif kind == 'pull':
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (gx - 34, gy - 20, gx + 34, gy - 20))
            b.append('<circle cx="%d" cy="%d" r="8" class="ln"/>' % (gx - 10, gy + 2))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (gx - 10, gy - 10, gx - 10, gy - 20))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (gx + 10, gy - 10, gx + 10, gy - 20))
        else:
            b.append('<path d="M %d %d A 30 30 0 1 1 %d %d" class="la" fill="none"/>' % (gx - 10, gy, gx + 10, gy))
            b.append('<circle cx="%d" cy="%d" r="6" class="ln"/>' % (gx, gy + 14))
        b.append(txt(cx + 88, cy + 92, name, 'ts', 'middle'))
    b.append(txt(40, 100, '體適能檢測常用的項目：每一項都有它要測的能力。', 'sb'))
    return '\n'.join(b)


def fig_hp_diabolo_steps():
    b = []
    steps = [('①', '握棍', 'stick'), ('②', '起鈴', 'up'), ('③', '運鈴', 'side'),
             ('④', '使鈴平衡', 'spin'), ('⑤', '開線亮相', 'show')]
    for i, (num, name, kind) in enumerate(steps):
        cx = 24 + i * 120
        cy = 112
        b.append('<rect x="%d" y="%d" width="108" height="150" rx="6" fill="#f6f8fc"/>' % (cx, cy))
        b.append('<rect x="%d" y="%d" width="108" height="150" rx="6" class="n"/>' % (cx, cy))
        b.append(txt(cx + 16, cy + 30, num, 'a'))
        gx, gy = cx + 54, cy + 78
        if kind == 'stick':
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (gx - 26, gy, gx + 26, gy))
            b.append('<circle cx="%d" cy="%d" r="9" class="na"/>' % (gx - 30, gy))
            b.append('<circle cx="%d" cy="%d" r="9" class="na"/>' % (gx + 30, gy))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (gx - 30, gy + 14, gx + 30, gy + 14))
        elif kind == 'up':
            b.append('<circle cx="%d" cy="%d" r="13" class="na"/>' % (gx, gy - 8))
            b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="la" marker-end="url(#arrow-accent)"/>' % (gx, gy + 34, gx, gy - 30))
            b.append('<path d="M %d %d A 26 26 0 1 1 %d %d" class="lm" fill="none"/>' % (gx + 16, gy - 18, gx + 16, gy + 18))
        elif kind == 'side':
            b.append('<circle cx="%d" cy="%d" r="13" class="na"/>' % (gx, gy - 6))
            b.append('<path d="M %d %d Q %d %d %d %d" class="la" fill="none" marker-end="url(#arrow-accent)"/>' % (gx - 34, gy + 12, gx, gy + 40, gx + 34, gy + 12))
            b.append('<path d="M %d %d Q %d %d %d %d" class="lm" fill="none" marker-end="url(#arrow)"/>' % (gx + 34, gy - 6, gx, gy - 34, gx - 34, gy - 6))
        elif kind == 'spin':
            b.append('<ellipse cx="%d" cy="%d" rx="34" ry="12" class="la" fill="none"/>' % (gx, gy))
            b.append('<circle cx="%d" cy="%d" r="12" class="na"/>' % (gx, gy))
            b.append('<path d="M %d %d A 30 14 0 1 1 %d %d" class="lm" fill="none" marker-end="url(#arrow)"/>' % (gx - 30, gy - 6, gx + 30, gy - 6))
        else:
            b.append('<circle cx="%d" cy="%d" r="12" class="na"/>' % (gx, gy - 6))
            b.append('<path d="M %d %d q 20 18 40 0 q 20 -18 40 0" class="lm" fill="none"/>' % (gx - 40, gy + 10))
            b.append('<path d="M %d %d l 10 10 l -20 4 z" class="la" fill="none"/>' % (gx + 26, gy + 26))
        b.append(txt(cx + 54, cy + 132, name, 'ts', 'middle'))
    b.append(txt(24, 100, '扯鈴表演的五個步驟（照著圖看順序）：', 'sb'))
    b.append(txt(24, 300, '先握好棍子，再把鈴拋起來，之後左右手交替，最後讓鈴水平旋轉並收線亮相。', 's'))
    return '\n'.join(b)


# ======================================================================
#  第三批附圖
# ======================================================================

def fig_math_triangle_perimeter():
    b = []
    b.append('<path d="M 150 280 L 320 120 L 480 280 Z" class="ln"/>')
    b.append('<line x1="150" y1="280" x2="320" y2="120" class="la" stroke-width="2"/>')
    b.append('<line x1="320" y1="120" x2="480" y2="280" class="la" stroke-width="2"/>')
    b.append('<line x1="150" y1="280" x2="480" y2="280" class="la" stroke-width="2"/>')
    b.append(txt(228, 186, '5 公分', 'a', 'middle'))
    b.append(txt(408, 186, '6 公分', 'a', 'middle'))
    b.append(txt(316, 310, '7 公分', 'a', 'middle'))
    b.append('<path d="M 150 250 L 150 200" class="lm"/>')
    b.append(txt(120, 120, '繞一圈', 's', 'middle'))
    b.append('<path d="M 126 190 A 90 90 0 0 1 320 100" class="la" fill="none" marker-end="url(#arrow-accent)"/>')
    b.append(txt(60, 356, '周長就是把三條邊的長度加起來。', 'sb'))
    return '\n'.join(b)


def fig_math_mixed_fraction():
    b = []
    x0, y0, w, h = 90, 140, 200, 60
    for k in range(3):
        b.append('<rect x="%d" y="%d" width="%d" height="%d" fill="#ffffff" class="n"/>' % (x0, y0 + k * (h + 8), w, h))
        b.append(txt(x0 + w / 2, y0 + k * (h + 8) + 38, '1', 'mid', 'middle'))
    b.append(txt(x0 - 24, y0 + 3 * (h + 8) - 8, '3 個整數', 's', 'end'))
    fx = x0 + w + 28
    for k in range(7):
        filled = k < 2
        cls = 'na' if filled else 'ns'
        b.append('<rect x="%d" y="%d" width="28" height="%d" rx="2" class="%s"/>' % (fx + k * 28, y0, h, cls))
    b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (fx, y0, fx + 7 * 28, y0))
    b.append(txt(fx + 98, y0 - 12, '把 1 個整數平均分成 7 份', 's', 'middle'))
    b.append(txt(fx + 28, y0 + 38, '2/7', 'a', 'middle'))
    b.append(txt(90, 360, '3 又 2/7 ＝ 幾個 1/7？把 3 個整數換成 21 份，再加上 2 份。', 'sb'))
    return '\n'.join(b)


def fig_math_stacked_bar():
    b = []
    bx, by, unit = 150, 300, 24
    b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="ln"/>' % (bx, by, bx, by - 8 * unit))
    b.append('<line x1="%d" y1="%d" x2="500" y2="%d" class="ln"/>' % (bx, by, by))
    for k in range(1, 9):
        y = by - k * unit
        b.append('<line x1="%d" y1="%d" x2="500" y2="%d" class="lm dash"/>' % (bx, y, y))
        b.append(txt(bx - 12, y + 5, str(k * 2), 's', 'end'))
    b.append('<rect x="220" y="%d" width="70" height="%d" fill="#ffffff" class="n"/>' % (by - 6 * unit, 6 * unit))
    b.append('<rect x="220" y="%d" width="70" height="%d" class="ns"/>' % (by - 6 * unit, 6 * unit))
    b.append('<rect x="220" y="%d" width="70" height="%d" fill="#ffffff" class="n"/>' % (by - 10 * unit, 4 * unit))
    b.append('<rect x="220" y="%d" width="70" height="%d" class="na"/>' % (by - 10 * unit, 4 * unit))
    b.append(txt(255, by - 6 * unit + 34, '男生 6 人', 'sb', 'middle'))
    b.append(txt(255, by - 10 * unit + 30, '女生 4 人', 'sb', 'middle'))
    b.append(txt(255, by + 28, '某一項', 'ts', 'middle'))
    b.append(txt(60, 360, '堆疊長條圖：下層與上層的長條要一起算。', 'sb'))
    return '\n'.join(b)


def fig_sci_water_plant():
    b = []
    b.append('<rect x="40" y="200" width="560" height="120" fill="#e6eff7"/>')
    b.append('<line x1="40" y1="200" x2="600" y2="200" class="ln"/>')
    b.append(txt(600, 196, '水面', 's', 'end'))
    # 睡蓮（浮葉）
    b.append('<ellipse cx="150" cy="196" rx="40" ry="10" class="la" fill="none"/>')
    b.append('<line x1="150" y1="196" x2="150" y2="290" class="lm"/>')
    b.append('<path d="M 150 290 q -14 -8 0 -16" class="lm" fill="none"/>')
    b.append(txt(150, 348, '葉子浮在水面', 's', 'middle'))
    # 布袋蓮（漂浮）
    b.append('<path d="M 320 120 L 320 190" class="la"/>')
    b.append('<ellipse cx="320" cy="112" rx="42" ry="14" class="la" fill="none"/>')
    b.append('<ellipse cx="320" cy="172" rx="13" ry="9" class="ns"/>')
    b.append('<line x1="320" y1="190" x2="320" y2="290" class="lm"/>')
    b.append(txt(320, 348, '整株浮在水面', 's', 'middle'))
    # 水蘊草（沉水）
    b.append('<path d="M 470 230 q -14 24 4 44 q 18 20 30 -6" class="la" fill="none"/>')
    b.append('<path d="M 492 250 q 16 16 6 36" class="la" fill="none"/>')
    b.append(txt(478, 348, '整株沉在水中', 's', 'middle'))
    b.append(txt(60, 100, '同一個池塘裡，水生植物的樣子卻很不一樣。', 'sb'))
    return '\n'.join(b)


def fig_sci_animal_sound():
    b = []
    animals = [('狗', '汪！'), ('貓', '喵？'), ('鳥', '啾啾♪'), ('蛙', '呱呱')]
    for i, (name, snd) in enumerate(animals):
        cx = 70 + i * 140
        b.append('<circle cx="%d" cy="150" r="38" fill="#ffffff" class="n"/>' % cx)
        b.append(txt(cx, 158, name, 'ts', 'middle'))
        b.append(txt(cx, 232, snd, 'a', 'middle'))
        for k in range(2):
            b.append('<path d="M %d 268 A %d %d 0 0 1 %d 292" class="la" fill="none"/>' % (cx + 24 + k * 16, 20 + k * 8, 12 + k * 6, cx + 24 + k * 16))
    b.append(txt(60, 100, '每種動物都有自己特有的聲音。', 'sb'))
    b.append(txt(60, 330, '聲音可以傳達很多訊息：叫同伴、找食物、警戒、找配偶。', 's'))
    b.append(txt(60, 358, '想想看：不同動物為什麼要發出不同的聲音？', 's'))
    return '\n'.join(b)


def fig_soc_map_elements():
    b = []
    b.append('<rect x="60" y="110" width="520" height="240" rx="6" fill="#ffffff" class="n"/>')
    b.append('<path d="M 100 190 C 180 150, 250 230, 330 190" class="la" fill="none"/>')
    b.append('<path d="M 100 300 C 190 260, 240 320, 330 290" class="la" fill="none"/>')
    b.append('<rect x="380" y="140" width="90" height="60" class="ns"/>')
    b.append(txt(425, 178, '聚落', 's', 'middle'))
    b.append('<circle cx="220" cy="250" r="8" class="na" fill="#1f51c9"/>')
    b.append(txt(240, 256, '學校', 's'))
    # 比例尺
    b.append('<rect x="90" y="372" width="120" height="12" fill="#ffffff" class="n"/>')
    b.append('<rect x="90" y="372" width="60" height="12" class="ns"/>')
    b.append(txt(90, 362, '0', 's', 'middle'))
    b.append(txt(150, 362, '1', 's', 'middle'))
    b.append(txt(210, 362, '2 公里', 's', 'middle'))
    b.append(txt(224, 384, '1 : 5000', 's'))
    # 指北針
    b.append('<circle cx="520" cy="150" r="22" class="n"/>')
    b.append('<path d="M 520 134 L 528 160 L 520 152 L 512 160 Z" class="la" fill="#1f51c9"/>')
    b.append(txt(520, 190, 'N', 's', 'middle'))
    # 圖例
    b.append('<rect x="380" y="300" width="170" height="44" rx="4" fill="#ffffff" class="n"/>')
    b.append('<rect x="392" y="312" width="18" height="18" class="ns"/>')
    b.append(txt(418, 326, '學校', 's'))
    return '\n'.join(b)


def fig_soc_festival():
    b = []
    items = [('過年', '貼春聯・發紅包'), ('端午節', '包粽子・划龍舟'),
             ('中秋節', '賞月・吃月餅'), ('清明節', '掃墓・祭祖')]
    for i, (name, habit) in enumerate(items):
        cx = 40 + (i % 2) * 288
        cy = 110 + (i // 2) * 132
        b.append('<rect x="%d" y="%d" width="272" height="116" rx="6" fill="#f6f8fc"/>' % (cx, cy))
        b.append('<rect x="%d" y="%d" width="272" height="116" rx="6" class="n"/>' % (cx, cy))
        b.append(txt(cx + 20, cy + 36, name, 'ts'))
        b.append(txt(cx + 20, cy + 66, habit, 's'))
        b.append(txt(cx + 20, cy + 94, '→', 'a'))
    b.append(txt(40, 100, '台灣的節慶與大家一起過，習俗也各不相同。', 'sb'))
    return '\n'.join(b)


def fig_chi_radical_card():
    b = []
    b.append('<rect x="180" y="130" width="280" height="180" rx="10" fill="#ffffff" class="n"/>')
    b.append(txt(320, 250, '湯', 'big', 'middle'))
    b.append('<rect x="196" y="150" width="56" height="140" rx="6" class="na"/>')
    b.append(txt(224, 128, '？', 'a', 'middle'))
    b.append('<path d="M 224 150 L 224 290" class="la" stroke-width="2"/>')
    b.append(txt(340, 350, '先寫左邊的部件，再寫右邊。', 's', 'middle'))
    b.append(txt(60, 100, '用部首查字法查字典時，先看字的哪一部分？', 'sb'))
    b.append(txt(60, 380, '把字拆開來看：左邊這個部件，就是查字典要用的部首。', 's'))
    return '\n'.join(b)


def fig_hp_football_kick():
    b = []
    b.append('<line x1="60" y1="300" x2="580" y2="300" class="ln"/>')
    b.append('<circle cx="300" cy="250" r="24" fill="#ffffff" class="ln"/>')
    b.append('<path d="M 300 226 L 300 274 M 276 250 L 324 250" class="lm"/>')
    b.append('<path d="M 180 300 L 420 300" class="la" stroke-width="2" marker-end="url(#arrow-accent)"/>')
    b.append(txt(300, 336, '球的行進方向', 'a', 'middle'))
    b.append('<path d="M 196 300 L 196 232" class="ln"/>')
    b.append('<path d="M 196 300 L 232 300" class="ln"/>')
    b.append(txt(180, 220, '支撐腳', 's', 'middle'))
    b.append('<path d="M 380 300 L 380 226" class="ln"/>')
    b.append('<path d="M 380 226 L 344 262" class="ln"/>')
    b.append(txt(400, 220, '踢球腳', 's', 'middle'))
    b.append('<path d="M 300 250 L 300 200" class="la" stroke-width="2" marker-end="url(#arrow-accent)"/>')
    b.append(txt(312, 196, '踢球的力量往這裡', 's'))
    b.append(txt(60, 100, '踢球時，支撐腳要站在球的旁邊，還要考慮球要走的方向。', 'sb'))
    return '\n'.join(b)


def fig_hp_swim_strokes():
    b = []
    ways = [('扶牆打水', 'wall'), ('持浮板前進', 'board'), ('蹬牆漂浮前進', 'wallpush'), ('蹬地漂浮前進', 'push')]
    for i, (name, kind) in enumerate(ways):
        cx = 40 + (i % 2) * 288
        cy = 116 + (i // 2) * 132
        b.append('<rect x="%d" y="%d" width="272" height="116" rx="6" fill="#f6f8fc"/>' % (cx, cy))
        b.append('<rect x="%d" y="%d" width="272" height="116" rx="6" class="n"/>' % (cx, cy))
        gx, gy = cx + 60, cy + 58
        b.append('<rect x="%d" y="%d" width="150" height="46" fill="#e6eff7"/>' % (gx - 10, gy - 30))
        b.append('<line x1="%d" y1="%d" x2="%d" y2="%d" class="lm"/>' % (gx - 10, gy - 30, gx - 10, gy + 16))
        if kind == 'wall':
            b.append('<circle cx="%d" cy="%d" r="12" class="na"/>' % (gx + 26, gy - 4))
        elif kind == 'board':
            b.append('<rect x="%d" y="%d" width="52" height="12" rx="4" class="na"/>' % (gx + 16, gy - 12))
            b.append('<circle cx="%d" cy="%d" r="10" class="na"/>' % (gx + 30, gy - 4))
        elif kind == 'wallpush':
            b.append('<circle cx="%d" cy="%d" r="11" class="na"/>' % (gx + 30, gy - 4))
            b.append('<path d="M %d %d L %d %d" class="la" marker-end="url(#arrow-accent)"/>' % (gx - 4, gy + 4, gx + 26, gy - 6))
        else:
            b.append('<circle cx="%d" cy="%d" r="11" class="na"/>' % (gx + 30, gy - 4))
            b.append('<path d="M %d %d L %d %d" class="la" marker-end="url(#arrow-accent)"/>' % (gx + 26, gy - 2, gx + 70, gy - 2))
        b.append(txt(cx + 150, cy + 46, name, 'ts', 'middle'))
    b.append(txt(40, 100, '打水前進有四種練習方式，哪一種最適合剛開始學的人？', 'sb'))
    return '\n'.join(b)


def fig_hp_fire_escape():
    b = []
    b.append('<rect x="60" y="110" width="300" height="200" rx="6" fill="#ffffff" class="n"/>')
    b.append('<line x1="60" y1="180" x2="360" y2="180" class="lm"/>')
    b.append('<line x1="220" y1="180" x2="220" y2="310" class="lm"/>')
    b.append('<rect x="300" y="130" width="60" height="60" class="ns"/>')
    b.append(txt(330, 165, '房間', 's', 'middle'))
    b.append('<rect x="90" y="200" width="80" height="60" class="ns"/>')
    b.append(txt(130, 235, '教室', 's', 'middle'))
    b.append('<path d="M 220 290 L 220 250 L 340 250" class="la" stroke-width="2" marker-end="url(#arrow-accent)"/>')
    b.append(txt(250, 236, '往安全出口', 'a'))
    b.append('<rect x="330" y="210" width="30" height="120" class="ns"/>')
    b.append(txt(345, 352, '樓梯（安全出口）', 's', 'middle'))
    b.append(txt(420, 150, '逃生三不要：', 'ts'))
    b.append(txt(420, 182, '不要搭電梯', 'sb'))
    b.append(txt(420, 212, '不要直著跑（要低姿）', 'sb'))
    b.append(txt(420, 242, '不要回頭拿東西', 'sb'))
    b.append(txt(420, 282, '用濕毛巾捂住口鼻', 'sb'))
    b.append(txt(420, 312, '到集合點點名', 'sb'))
    return '\n'.join(b)


FIGURES = [
    ('math-triangle-right', '數學期中考', '以角分類三角形', '有一個角是 90 度的三角形，圖中標出 90 度的直角位置。', fig_math_triangle_right, '數學・6-3 三角形'),
    ('math-frac-bar', '數學期中考', '把 1 平分成 100 份', '一個大正方形平均分成 100 個小方塊，其中 1 個用深色標出。', fig_math_frac_bar, '數學・7-1 認識二位小數'),
    ('sci-dune', '自然期中考', '沙丘是怎麼形成的', '風把砂粒吹起搬運，在背風坡堆積成沙丘的剖面示意。', fig_sci_dune, '自然・風與地表'),
    ('sci-mirror-light', '自然期中考', '光線遇到鏡子會怎樣', '陽光射到平面鏡後反射到牆上形成光點，並標出入射角與反射角。', fig_sci_mirror_light, '自然・光的反射'),
    ('chi-char-structure', '國語文期中考', '常見的字形結構', '六種常見字形結構與例字：獨體、左右、上下、上包下、外包內、左下包右上。', fig_chi_char_structure, '國語文・字形結構'),
    ('soc-terrain', '社會期中考', '臺灣常見的五種地形', '山地、丘陵、台地、平原、盆地五種地形的剖面小圖。', fig_soc_terrain, '社會・家鄉的地形'),
    ('soc-hill-tea', '社會期中考', '山坡上的階梯茶園', '丘陵坡地沿等高線做成階梯種植茶樹的剖面示意。', fig_soc_hill_tea, '社會・丘陵的茶園'),
    ('eng-phonics-ae', '英語文期中考', 'a_e 的母音怎麼變', '母音組合 a_e 念長母音 /e/，單獨的 a 念短母音 /æ/。', fig_eng_phonics_ae, '英語文・Get Ready Phonics'),
    ('eng-clock', '英語文期中考', "It's four fifty.", '指著 4:50 的圓形時鐘，說明短針與長針各指在哪裡。', fig_eng_clock, '英語文・Unit 2 Time'),
    ('hp-plate', '健康與體育期中考', '健康餐盤：每餐吃多少？', '健康餐盤分成六類食物，標出每一餐建議吃的份量。', fig_hp_plate, '健康與體育・食在有營養'),
    ('hp-burn', '健康與體育期中考', '灼燙傷急救：沖、脫、蓋、送', '灼燙傷急救四個步驟依序排列，並提醒不可塗牙膏或戳破水泡。', fig_hp_burn, '健康與體育・小心灼燙傷'),
('math-km-ruler', '數學期中考', '公尺和公里怎麼換算', '公尺尺規：每一大段是 1 公里，等於 1000 公尺。', fig_math_km_ruler, '數學・5-2 公里換算'),
    ('math-bar-chart', '數學期中考', '怎麼報讀長條圖', '縱軸每一格代表 5 人的長條圖，三根長條分別高 4、2、3 格。', fig_math_bar_chart, '數學・10-1 報讀統計圖'),
    ('math-line-chart', '數學期中考', '折線圖的線段在看什麼', '折線圖上有四個點與相鄰兩點連起來的線段。', fig_math_line_chart, '數學・10-3 報讀折線圖'),
    ('sci-circuit', '自然期中考', '燈泡的串聯與並聯', '左邊是串聯、右邊是並聯的電路接法與燈泡位置。', fig_sci_circuit, '自然・4-11 串聯與並聯'),
    ('sci-sound-vacuum', '自然期中考', '鬧鐘放進真空罩會怎樣', '左邊是抽掉空氣的真空罩，右邊是在空氣中的鬧鐘與聲波。', fig_sci_sound_vacuum, '自然・3-4 聲音需要介質'),
    ('soc-map-types', '社會期中考', '四種地圖看不同的資訊', '行政區圖、交通路線圖、地形圖與衛星圖的外觀對照。', fig_soc_map_types, '社會・家鄉在哪裡'),
    ('soc-stilt-house', '社會期中考', '原住民族的傳統住屋', '架高屋的剖面示意：石板地面、竹木柱子與茅草屋頂。', fig_soc_stilt_house, '社會・傳統住屋與生活'),
    ('chi-stroke-rules', '國語文期中考', '筆順的三個原則', '筆順三原則：從上到下、從左到右、先橫後豎，並以「三」「他」示範。', fig_chi_stroke_rules, '國語文・筆順'),
    ('hp-baseball-field', '健康與體育期中考', '壘球場地與守備位置', '壘球場的四個壘包與六個守備位置示意。', fig_hp_baseball_field, '健康與體育・壘上攻防'),
    ('hp-fitness-tests', '健康與體育期中考', '體適能檢測的常見項目', '立定跳遠、坐姿體前彎、800 公尺跑、仰臥起坐、引向上與跳繩六項。', fig_hp_fitness_tests, '健康與體育・健康體適能'),
    ('hp-diabolo-steps', '健康與體育期中考', '扯鈴的五個步驟', '握棍、起鈴、運鈴、使鈴平衡、開線亮相五個步驟的示意圖。', fig_hp_diabolo_steps, '健康與體育・轉動扯鈴'),
('math-triangle-perimeter', '數學期中考', '三角形的周長', '三角形三條邊分別標示 5 公分、6 公分、7 公分。', fig_math_triangle_perimeter, '數學・6-1 三角形'),
    ('math-mixed-fraction', '數學期中考', '帶分數換成假分數', '3 個整數加上 2/7 個整數，7 份中的其中 2 份以深色標出。', fig_math_mixed_fraction, '數學・9-2 假分數與帶分數'),
    ('math-stacked-bar', '數學期中考', '堆疊長條圖怎麼看', '堆疊長條圖的一根長條：下層男生 6 人、上層女生 4 人。', fig_math_stacked_bar, '數學・10-4 報讀複雜的統計圖'),
    ('sci-water-plant', '自然期中考', '水生植物的樣子', '同一池塘裡的睡蓮、布袋蓮與水蘊草，分別浮在水面或沉在水中。', fig_sci_water_plant, '自然・2-1 漂浮性水生植物'),
    ('sci-animal-sound', '自然期中考', '動物用聲音溝通', '狗、貓、鳥、蛙各發出不同的聲音。', fig_sci_animal_sound, '自然・3-3 動物用聲音溝通'),
    ('soc-map-elements', '社會期中考', '地圖上的要素', '示意地圖上有比例尺、指北針、圖例與聚落。', fig_soc_map_elements, '社會・家鄉在哪裡'),
    ('soc-festival', '社會期中考', '節慶與習俗', '過年、端午節、中秋節與清明節各自搭配的習俗。', fig_soc_festival, '社會・傳統的節慶'),
    ('chi-radical-card', '國語文期中考', '用部首查字典', '「湯」字拆開來，左邊的部件以深色標出。', fig_chi_radical_card, '國語文・查字典'),
    ('hp-football-kick', '健康與體育期中考', '踢球時的支撐腳', '球、支撐腳與踢球腳的位置，以及球的行進方向。', fig_hp_football_kick, '健康與體育・足球玩家'),
    ('hp-swim-strokes', '健康與體育期中考', '打水前進的四種方式', '扶牆打水、持浮板前進、蹬牆漂浮前進與蹬地漂浮前進。', fig_hp_swim_strokes, '健康與體育・打水遊戲'),
    ('hp-fire-escape', '健康與體育期中考', '火場怎麼逃', '教室平面圖與逃生方向，以及逃生三不要。', fig_hp_fire_escape, '健康與體育・火場應變'),
]


def main():
    if not os.path.isdir(SRC):
        os.makedirs(SRC)
    for slug, subj, title, desc, fn, eyebrow in FIGURES:
        html = doc(slug, title, desc, fn(), eyebrow)
        hp = os.path.join(SRC, slug + '.html')
        io.open(hp, 'w', encoding='utf-8', newline='\n').write(html)
        # self check
        r = subprocess.run([sys.executable, CHECK, '--offline', hp], capture_output=True, text=True)
        if r.returncode != 0:
            print('!! self_check 失敗：', slug)
            print(r.stdout[-800:], r.stderr[-800:])
            continue
        outdir = os.path.join(ROOT, subj, 'img')
        if not os.path.isdir(outdir):
            os.makedirs(outdir)
        out = os.path.join(outdir, slug + '.svg')
        r = subprocess.run([sys.executable, EXPORT, hp, out, '--system-fonts'], capture_output=True, text=True)
        if r.returncode != 0:
            print('!! export 失敗：', slug)
            print(r.stdout[-800:], r.stderr[-800:])
            continue
        print('OK  %-22s → %s' % (slug, os.path.relpath(out, ROOT)))
    print('完成：%d 張附圖' % len(FIGURES))


if __name__ == '__main__':
    main()
