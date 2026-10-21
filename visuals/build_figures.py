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
