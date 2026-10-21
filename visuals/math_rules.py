# -*- coding: utf-8 -*-
"""
visuals/math_rules.py — 依題目內容產生「題圖一致」的數學附圖

build(section, stem, opts) → (body_lines, allow_numbers) 或 None
  body_lines     : SVG 片段（字串 list）
  allow_numbers  : 允許出現在圖上、但題幹沒出現的數字（推導值／圖表刻度等）

規則：圖上出現的每一個數字都必須能追溯到題幹（stem）或允許清單，
      做不到就回傳 None → 該題不放附圖。
"""
import re
from math_kit import (T, L, R, C, P, note, kv_table, num_line, area_model, long_div,
                      long_mul, frac_strip, flow, tri_row, protractor, clock_face,
                      bar_chart, line_chart, num_cards, story, scale_allow)
from math_dynamic import cn2num, nums, cn_numbers, uniq_ints, FRAC_RE

CLOCK_NUMS = {12, 3, 6, 9}
KILOMETER = 1000
DECIMAL_GRID = 100


def _n(text):
    out = []
    for x in nums(text):
        try:
            out.append(int(x.replace(',', '')))
        except ValueError:
            pass
    return out


def _first_num(text):
    v = _n(text)
    return v[0] if v else None


def _expr(text):
    """取出算式裡的數字：a × b / a ÷ b / a ＋ b。"""
    m = re.search(r'(\d[\d,]*)\s*([×÷＋＋\-－])\s*(\d[\d,]*)', text)
    if not m:
        return None
    a = int(m.group(1).replace(',', ''))
    b = int(m.group(3).replace(',', ''))
    op = m.group(2)
    if op == '×':
        return (a, '×', b)
    if op == '÷':
        return (a, '÷', b)
    if op in ('＋', '+'):
        return (a, '＋', b)
    return (a, op, b)


def _mixed(text):
    """帶分數：1又3/5 → (1, 3, 5)"""
    m = re.search(r'(\d+)\s*又\s*(\d+)\s*/\s*(\d+)', text)
    if m:
        return (int(m.group(1)), int(m.group(2)), int(m.group(3)))
    return None


def _frac(text):
    m = FRAC_RE.search(text)
    if m:
        return (int(m.group(1)), int(m.group(2)))
    return None


def _decimals(text):
    out = []
    for m in re.finditer(r'\d+\.\d+', text):
        out.append(m.group(0))
    return out


def _place_value(n, hi=None):
    cols = ['千萬', '百萬', '十萬', '萬', '千', '百', '十', '一']
    s = str(n)
    if len(s) > 8:
        return None
    digits = list(s)
    while len(digits) < 8:
        digits.insert(0, '0')
    b, x0, y0, w = kv_table(cols, digits, hi=hi, cw=60)
    return b, set()


def build(section, stem, opts=None):
    opts = opts or []
    allow = set()

    # ---------------- 1-1 / 1-2 位值 ----------------
    if section in ('1-1', '1-2'):
        m = re.search(r'「([\d,]+)」中的「(\d)」', stem)
        if m:
            n = int(m.group(1).replace(',', ''))
            d = m.group(2)
            hi = list(str(n)).index(d) if d in str(n) else None
            r = _place_value(n, hi)
            if r:
                b, a = r
                b.append(note('數字放在哪一個位，位值就是多少。', 330))
                return b, a
            return None
        m2 = re.search(r'「(\d[\d,]*)」讀作', stem)
        if m2:
            n = int(m2.group(1).replace(',', ''))
            r = _place_value(n)
            if r:
                b, a = r
                b.append(note('照著位值表，一個位一個位讀出來。', 330))
                return b, a
            return None
        m = re.search(r'「([零一二兩三四五六七八九十百千萬億]+)」', stem)
        if m and ('寫成數字' in stem or '讀作' in stem):
            v = cn2num(m.group(1))
            if v > 0:
                r = _place_value(v)
                if r:
                    b, a = r
                    b.append(note('先看「萬」前面的部分，再看後面。', 330))
                    return b, a | {v}
            return None
        m = re.search(r'千萬位是\s*(\d)[、，]萬位是\s*(\d)[、，]百位是\s*(\d)', stem)
        if m:
            a, bb, c = int(m.group(1)), int(m.group(2)), int(m.group(3))
            n = a * 10000000 + bb * 10000 + c * 100
            r = _place_value(n)
            if r:
                b, al = r
                b.append(note('其他沒說到的位都是 0。', 330))
                return b, al | {n}
            return None
        return None

    # ---------------- 1-3 比較 ----------------
    if section == '1-3':
        # 題幹沒給數字（數字在選項）→ 畫出來等於洩漏答案，不放圖
        return None

    # ---------------- 1-4 大數加減 ----------------
    if section == '1-4':
        vs = _n(stem)
        if len(vs) >= 2:
            b = []
            b.append(T(90, 140, '加（或減）法：兩數對齊位值', 'ts'))
            for i, v in enumerate(vs[:2]):
                r = _place_value(v)
                if not r:
                    return None
                bb, _ = r
                b += bb
                b.append(T(90, 250 + i * 120, '', 's'))
            b.append(note('相同位上的數字一起算，滿十要往左一位進 1。', 350))
            return b, set()
        return None

    # ---------------- 2-x 乘法：面積模型 ----------------
    if section in ('2-1', '2-2', '2-3'):
        e = _expr(stem)
        if not e or e[1] != '×':
            return None
        a, _, b = e
        if a > 9999 or b > 99:
            return None
        body = []
        if len(str(a)) <= 2 and len(str(b)) <= 2:
            rows = len(str(b))
            cols = len(str(a))
            rlabel = '、'.join(str(b))
            clabel = '、'.join(str(a))
        else:
            rows = min(b, 4)
            cols = min(len(str(a)), 4)
            rlabel = str(b)
            clabel = '每一位'
        body.append(T(70, 120, '把 ' + str(a) + ' 拆成 ' + '、'.join(str(a)) + '，和 ' + str(b) + ' 組配對', 'sb'))
        body += area_model(rows, cols, rlabel, clabel, x0=170, y0=160, cell=30)
        body.append(T(80, 300, '每一格代表一個 10，', 's'))
        body.append(T(80, 324, '再乘上組數。', 's'))
        return body, set()

    # ---------------- 3-x 角 ----------------
    if section == '3-1':
        b = protractor(0)
        b.append(T(70, 120, '每一小格代表 1 度', 's'))
        b.append(note('先對好中心與 0 度線，再讀另一邊的刻度。', 330))
        return b, set()
    if section == '3-2':
        m = re.search(r'(\d+)\s*度', stem)
        if m and '畫' in stem:
            b = protractor(int(m.group(1)))
            b.append(T(70, 120, '中心對頂點、0 度線對一邊', 's'))
            b.append(note('再沿著 0 度線數到另一邊，就畫出這個角。', 330))
            return b, set()
        if '直角' in stem:
            b = [P('M 150 270 L 150 150 L 270 270', 'ln')]
            b.append(T(200, 300, '直角', 's', 'middle'))
            b.append(note('這個角有幾度？用量角器量一量。', 330))
            return b, set()
        if '比直角小' in stem:
            b = [P('M 150 270 L 210 170 L 270 270', 'ln')]
            b.append(T(210, 300, '？度', 'a', 'middle'))
            b.append(note('比直角小、比 0 度大的角。', 330))
            return b, set()
        if '比直角大' in stem:
            b = [P('M 150 270 L 260 150 L 300 270', 'ln')]
            b.append(T(225, 300, '？度', 'a', 'middle'))
            b.append(note('比直角大、比平角小的角。', 330))
            return b, set()
        b = protractor(0)
        b.append(T(70, 120, '內圈、外圈刻度', 's'))
        b.append(note('看角的兩邊打開時，量角器上會不會超過半圈。', 330))
        return b, set()
    if section == '3-3':
        if '平角' in stem:
            b = [L(140, 240, 500, 240, 'ln'), T(320, 270, '？度', 'a', 'middle')]
            b.append(note('兩條邊剛好在同一直線上。', 320))
            return b, set()
        if '周角' in stem:
            b = [C(320, 230, 90, 'ln'), T(320, 238, '？度', 'a', 'middle')]
            b.append(note('一條邊轉了整整一圈回到原來的位置。', 320))
            return b, set()
        if '12 點' in stem and '3 點' in stem:
            b = clock_face(12, 0)
            b.append(T(320, 360, '從 12 點逆時針到 3 點', 'sb', 'middle'))
            return b, CLOCK_NUMS
        b = clock_face(12, 0)
        b.append(T(320, 360, '順時針／逆時針', 'sb', 'middle'))
        return b, CLOCK_NUMS
    if section == '3-4':
        vs = [v for v in _n(stem) if v in (180, 90, 360)]
        degs = re.findall(r'(\d+)\s*度', stem)
        if len(degs) >= 2:
            a, c = int(degs[0]), int(degs[1])
            b = []
            b.append(P('M 150 260 L 150 150 L 300 260', 'ln'))
            b.append(T(196, 214, str(a) + '°', 'a', 'middle'))
            b.append(P('M 300 260 L 300 150 L 150 260', 'ln'))
            b.append(T(258, 214, str(c) + '°', 'a', 'middle'))
            b.append(note('兩個角合起來就是圖上的這個大角。', 330))
            return b, set()
        if degs and int(degs[0]) == 180:
            b = [L(140, 240, 500, 240, 'ln'), T(320, 274, '？度', 'a', 'middle')]
            b.append(note('平角是 180 度，減掉其中一個角就是另一個。', 320))
            return b, set()
        if degs:
            d0 = int(degs[0])
            b = [P('M 150 260 L 150 150 L 300 260', 'ln')]
            b.append(T(196, 214, str(d0) + '°', 'a', 'middle'))
            b.append(T(320, 300, '？度', 'a', 'middle'))
            b.append(note('從直角裡拿掉一部分，剩下多少度？', 330))
            return b, set()
        return None

    # ---------------- 4-x 除法直式 ----------------
    if section in ('4-1', '4-2', '4-3', '4-4'):
        e = _expr(stem)
        if not e or e[1] != '÷':
            return None
        a, _, b = e
        body = long_div(a, b, x=120, y=140)
        body.append(note('從最高位開始分，每次看商能不能放下。', 330))
        return body, set()

    # ---------------- 5-x 公里 ----------------
    if section == '5-1':
        m = re.search(r'(\d+)\s*公里', stem)
        if m and ('跑' in stem or '計程車' in stem):
            b = []
            b.append(L(100, 250, 520, 250, 'ln'))
            b.append(R(100, 210, 40, 40, 'n'))
            b.append(C(520, 190, 16, 'na', '#1f51c9'))
            b.append(T(300, 190, m.group(1) + ' 公里', 'a', 'middle'))
            b.append(note('公尺和公里怎麼換算？先把換算關係記清楚。', 320))
            return b, set()
        m = re.search(r'(\d[\d,]*)\s*公尺', stem)
        if m:
            b = []
            b.append(L(100, 250, 520, 250, 'ln'))
            b.append(R(100, 210, 40, 40, 'n'))
            b.append(C(320, 190, 16, 'na', '#1f51c9'))
            b.append(T(320, 160, m.group(1) + ' 公尺', 'a', 'middle'))
            b.append(note('從起點走到這個位置，是幾公里？', 320))
            return b, set()
        return None   # 「1 公里等於多少公尺？」這類題，畫出換算關係等於直接給答案
    if section == '5-2':
        m = re.search(r'(\d+)\s*公里\s*(\d+)\s*公尺', stem)
        if m:
            b = num_line(0, 10, 1, [(int(m.group(1)) + int(m.group(2)) / 1000.0,
                                     m.group(1) + ' 公里 ' + m.group(2) + ' 公尺', True)], unit=' 公里')
            b.append(note('每一大段是 1 公里。', 330))
            return b, set()
        m = re.search(r'(\d[\d,]*)\s*公尺', stem)
        if m:
            v = int(m.group(1).replace(',', ''))
            b = []
            b.append(L(90, 250, 570, 250, 'ln'))
            for k in range(0, 11):
                x = 90 + k * 48
                b.append(L(x, 244, x, 256, 'lm'))
                b.append(T(x, 278, str(k), 's', 'middle'))
            x = 90 + min(v // 1000, 10) * 48
            b.append(C(x, 250, 10, 'na', '#1f51c9'))
            b.append(T(x, 220, m.group(1) + ' 公尺', 'a', 'middle'))
            b.append(note('尺規上每一大格是 1 公里。', 320))
            return b, set()
        m = re.search(r'(\d+)\s*公里', stem)
        if m:
            b = []
            b.append(L(90, 250, 570, 250, 'ln'))
            for k in range(0, int(m.group(1)) + 1):
                x = 90 + k * (480 / max(1, int(m.group(1))))
                b.append(L(x, 244, x, 256, 'lm'))
                b.append(T(x, 278, (str(k) if k < int(m.group(1)) else '') , 's', 'middle'))
            b.append(T(90, 210, m.group(1) + ' 公里', 'a'))
            b.append(note('每一大段是 1 公里，換成公尺要一段一段數。', 320))
            return b, set()
        return None
    if section == '5-3':
        m = re.search(r'(\d+)\s*公里\s*(\d+)\s*公尺', stem)
        e = re.search(r'(\d+)\s*公里\s*(－|－|-)\s*(\d+)\s*公里\s*(\d+)\s*公尺', stem)
        if m and e:
            a = int(m.group(1)) + int(m.group(2)) / 1000.0
            c = int(e.group(3)) + int(e.group(4)) / 1000.0
            b = num_line(0, 12, 1, [(a, '起點', True), (c, '終點', True)], unit=' 公里')
            b.append(note('從起點走到終點，是多少公里？', 330))
            return b, {11, 12}
        m2 = re.search(r'(\d+)\s*公里\s*(\d+)\s*公尺\s*(＋|\+)\s*(\d+)\s*公里\s*(\d+)\s*公尺', stem)
        if m2:
            a = int(m2.group(1)) + int(m2.group(2)) / 1000.0
            c = int(m2.group(4)) + int(m2.group(5)) / 1000.0
            b = num_line(0, 12, 1, [(a, '第一段', True), (c, '第二段', True)], unit=' 公里')
            b.append(note('把兩段加起來，就是答案。', 330))
            return b, {11, 12}
        return None

    # ---------------- 6-x 三角形 ----------------
    if section == '6-1':
        m = re.search(r'三條邊分別是\s*(\d+)\s*公分、\s*(\d+)\s*公分、\s*(\d+)\s*公分', stem)
        if m:
            a, bb, c = (int(m.group(1)), int(m.group(2)), int(m.group(3)))
            b = [P('M 200 270 L 250 140 L 400 270 Z', 'ln')]
            b.append(T(225, 210, str(a) + ' 公分', 'a'))
            b.append(T(330, 175, str(bb) + ' 公分', 'a'))
            b.append(T(300, 300, str(c) + ' 公分', 'a'))
            b.append(note('繞三角形一圈，就是它的周長。', 330))
            return b, set()
        m2 = re.search(r'兩個角是\s*(\d+)\s*度和\s*(\d+)\s*度', stem)
        if m2:
            a, bb = int(m2.group(1)), int(m2.group(2))
            b = [P('M 200 270 L 250 140 L 400 270 Z', 'ln')]
            b.append(T(228, 230, str(a) + '°', 'a'))
            b.append(T(330, 196, str(bb) + '°', 'a'))
            b.append(T(300, 300, '？度', 'a'))
            b.append(note('三角形三個角合起來是 180 度。', 330))
            return b, set()
        if '幾個頂點' in stem:
            b = [P('M 200 270 L 250 140 L 400 270 Z', 'ln')]
            b.append(T(225, 240, '頂點', 's', 'middle'))
            b.append(T(300, 175, '角', 's', 'middle'))
            b.append(T(300, 300, '邊', 's', 'middle'))
            b.append(note('數一數：幾個頂點、幾條邊、幾個角？', 330))
            return b, set()
        return None
    if section == '6-2':
        b = tri_row('side')
        b = [x for x in b if '三邊' not in x and '兩邊' not in x]  # 移除等答案的說明
        b.append(note('看三條邊是不是一樣長。', 330))
        return b, set()
    if section == '6-3':
        b = tri_row('angle')
        b = [x for x in b if '90 度' not in x and '小於' not in x and '大於' not in x]
        b.append(note('看最大的角是什麼角。', 330))
        return b, set()
    if section == '6-4':
        m = re.search(r'([\d]+)\s*公分、\s*([\d]+)\s*公分、\s*([\d]+)\s*公分', stem)
        if m:
            a, bb, c = int(m.group(1)), int(m.group(2)), int(m.group(3))
            b = [P('M 200 260 L 240 140 L 380 260 Z', 'ln')]
            b.append(T(200, 288, str(c) + ' 公分', 's', 'middle'))
            b.append(T(300, 190, str(bb) + ' 公分', 's', 'middle'))
            b.append(T(400, 288, str(a) + ' 公分', 's', 'middle'))
            b.append(note('三條邊的長度已知，圍起來是哪一種三角形？', 330))
            return b, set()
        b = []
        b.append(T(90, 140, '畫三角形的步驟', 'ts'))
        for i, s in enumerate(['① 用尺規畫出底邊', '② 量出需要的邊或角', '③ 連成三角形', '④ 用量角器檢查']):
            b.append(T(90, 180 + i * 34, s, 'sb'))
        b.append(note('照著步驟畫，邊和角才會正確。', 330))
        return b, set()
    if section == '6-5':
        m = re.search(r'一條邊是\s*(\d+)\s*公分', stem)
        b = []
        b.append(P('M 120 250 L 190 140 L 260 250 Z'))
        b.append(P('M 380 250 L 450 140 L 520 250 Z', 'la', ' stroke-dasharray="5,4"'))
        b.append(L(190, 140, 450, 140, 'lm dash'))
        b.append(L(260, 250, 520, 250, 'lm dash'))
        if m:
            b.append(T(190, 278, m.group(1) + ' 公分', 'a', 'middle'))
            b.append(T(440, 278, '？公分', 'a', 'middle'))
        else:
            b.append(T(190, 278, '邊 A', 'sb', 'middle'))
            b.append(T(440, 278, '邊 A', 'sb', 'middle'))
        b.append(note('兩個圖形疊合後完全重合，重合的邊和角都一樣長。', 330))
        return b, set()

    # ---------------- 7-x 小數 ----------------
    if section == '7-1':
        if '100' in stem and '份' in stem:
            b = []
            x0, y0, cell, gap = 196, 96, 22, 2
            b.append(R(x0 - 4, y0 - 4, cell * 10 + gap * 9 + 8, cell * 10 + gap * 9 + 8, 'n', 0))
            for r in range(10):
                for c in range(10):
                    x = x0 + c * (cell + gap)
                    y = y0 + r * (cell + gap)
                    if (r == 9 and c == 0) or ('0.1' in stem and r == 8):
                        b.append(R(x, y, cell, cell, 'na'))
                    else:
                        b.append(R(x, y, cell, cell, 'ns'))
            b.append(T(96, 120, '1', 'mid', 'middle'))
            b.append(T(96, 150, '平均分成', 's', 'middle'))
            b.append(T(96, 172, '100 份', 'a', 'middle'))
            b.append(note('每一小格就是 1 份。', 330))
            return b, set()
        ds = _decimals(stem)
        if ds:
            d0 = ds[0]
            b = []
            b.append(T(90, 140, '小數點', 'ts'))
            b.append(L(90, 150, 560, 150, 'lm dash'))
            ip, fp = (d0.split('.') + [''])[:2]
            cols = ['個位'] + ['十分位', '百分位', '千分位'][:len(fp)]
            digits = list(ip) + list(fp)
            for i, c in enumerate(cols):
                x = 150 + i * 100
                b.append(L(x, 160, x, 220, 'lm'))
                b.append(T(x + 50, 182, c, 's', 'middle'))
                b.append(T(x + 50, 214, digits[i], 'sb', 'middle'))
            b.append(note('小數點右邊的位，每往右一位就再小十倍。', 300))
            return b, set()
        if '1/100' in stem:
            b = []
            x0, y0, cell, gap = 196, 96, 22, 2
            b.append(R(x0 - 4, y0 - 4, cell * 10 + gap * 9 + 8, cell * 10 + gap * 9 + 8, 'n', 0))
            for r in range(10):
                for c in range(10):
                    x = x0 + c * (cell + gap)
                    y = y0 + r * (cell + gap)
                    b.append(R(x, y, cell, cell, 'na' if (r == 9 and c == 0) else 'ns'))
            b.append(T(96, 150, '1/100', 'a', 'middle'))
            b.append(note('用分數表示就是其中 1 小格。', 330))
            return b, set()
        return None
    if section == '7-2':
        ds = _decimals(stem)
        if len(ds) >= 2:
            b = num_cards(ds[0], ds[1], x0=120)
            if len(ds) >= 3:
                b.append(R(390, 170, 150, 90, 'n'))
                b.append(T(465, 228, ds[2], 'ts', 'middle'))
            b.append(note('先比整數部分，再比小數部分。', 330))
            return b, set()
        if '公尺' in stem and '公分' in stem:
            b = []
            b.append(L(90, 250, 570, 250, 'ln'))
            for k in range(0, 11):
                x = 90 + k * 48
                b.append(L(x, 244, x, 256, 'lm'))
                b.append(T(x, 278, str(k), 's', 'middle'))
            b.append(T(90, 210, '公尺', 's'))
            b.append(T(570, 210, '公分', 's', 'end'))
            b.append(note('1 公尺＝100 公分，每 1 公尺再分成 100 份。', 320))
            return b, {100}
        return None
    if section == '7-3':
        ds = _decimals(stem)
        if len(ds) == 1:
            ints = [x for x in _n(stem) if isinstance(x, int)]
            if ints:
                d0 = ds[0]
                ip0, fp0 = (d0.split('.') + [''])[:2]
                ip1 = list(str(ints[0]))
                digits0 = ip1 + list(fp0)
                digits1 = list(ip0) + list(fp0)
                b = []
                b.append(T(90, 140, '小數點', 'ts'))
                b.append(L(90, 150, 560, 150, 'lm dash'))
                for i, dg in enumerate([digits0, digits1]):
                    x0 = 150 + i * 260
                    b.append(T(x0, 176, (str(ints[0]) if i == 0 else d0), 'ts'))
                    for k, ch in enumerate(dg):
                        x = x0 + k * 46
                        b.append(L(x, 190, x, 240, 'lm'))
                        b.append(T(x + 23, 224, ch, 'sb', 'middle'))
                b.append(note('整數和小數相加，小數點要對齊。', 320))
                return b, set()
        if len(ds) >= 2:
            b = []
            b.append(T(90, 140, '小數點', 'ts'))
            b.append(L(90, 150, 560, 150, 'lm dash'))
            for i, d0 in enumerate(ds[:2]):
                ip, fp = (d0.split('.') + [''])[:2]
                digits = list(ip) + list(fp)
                x0 = 150 + i * 320
                b.append(T(x0, 176, d0, 'ts'))
                for k, ch in enumerate(digits):
                    x = x0 + k * 52
                    b.append(L(x, 190, x, 240, 'lm'))
                    b.append(T(x + 26, 224, ch, 'sb', 'middle'))
            b.append(note('小數點要對齊，再一位一位算。', 320))
            return b, set()
        return None

    # ---------------- 8-x 運算 ----------------
    if section in ('8-1', '8-2', '8-3', '8-4', '8-5'):
        b = []
        m = re.search(r'([\d][\d,\.]*\s*[×÷＋＋\-－]\s*[\d][\d,\.]*\s*(?:[×÷＋＋\-－]\s*[\d][\d,\.]*)?)', stem)
        expr = m.group(1).strip() if m else None
        if expr is None:
            m2 = re.findall(r'(\d+)\s*(?:顆|個|本|人|袋|包|元|班|組|盒|條|小袋|大袋)', stem)
            if len(m2) >= 2:
                expr = '、'.join(m2[:3]) + ' 的分配'
        if expr is None:
            return None
        b.append(T(90, 130, '這題的算式：', 'ts'))
        b.append(R(90, 150, 300, 64, 'n'))
        b.append(T(240, 192, expr, 'a', 'middle'))
        b.append(T(90, 250, '先算哪一步？照著順序想。', 's'))
        b.append(T(90, 280, '括號 → 乘除 → 加減', 'sb'))
        b.append(note('把每一步寫下來，就不容易算錯。', 330))
        return b, set()

    # ---------------- 9-x 分數 ----------------
    if section == '9-1':
        mx = _mixed(stem)
        if mx:
            w, n, d = mx
            b = frac_strip(d, n, '', x=110, y=140, w=300)
            b.append(T(120, 230, str(w) + ' 個整數', 'sb'))
            b.append(T(430, 160, str(n) + '/' + str(d), 'a', 'middle'))
            b.append(note('整數加上不到 1 的分數。', 320))
            return b, set()
        fr = _frac(stem)
        if fr:
            n, d = fr
            whole, rest = n // d, n % d
            b = []
            b.append(T(90, 130, str(n) + '/' + str(d), 'ts'))
            for k in range(whole):
                x = 90 + k * 120
                b.append(R(x, 160, 110, 60, 'n', 4))
                b.append(T(x + 55, 198, '1', 'mid', 'middle'))
            if rest:
                b += frac_strip(d, rest, '', x=90 + whole * 120, y=160, w=110 * d / 4.0 if d else 110)
            b.append(note('分子比分母大，就會超過 1。', 320))
            return b, set()
        b = frac_strip(4, 2, '', x=140, y=150, w=320)
        b.append(T(300, 250, '？', 'a', 'middle'))
        b.append(note('看分子和分母誰比較大。', 320))
        return b, set()
    if section == '9-2':
        mx = _mixed(stem)
        if mx:
            w, n, d = mx
            b = []
            for k in range(w):
                x = 90 + k * 120
                b.append(R(x, 150, 110, 60, 'n', 4))
                b.append(T(x + 55, 188, '1', 'mid', 'middle'))
            b += frac_strip(d, n, '', x=90 + w * 120, y=150, w=110.0)
            b.append(T(90, 250, str(w) + ' 又 ' + str(n) + '/' + str(d), 'a'))
            b.append(note('帶分數和假分數，換成同一個分母來比較。', 320))
            return b, set()
        frs = FRAC_RE.findall(stem)
        if len(frs) >= 2:
            b = []
            for i, (n, d) in enumerate(frs[:2]):
                b += frac_strip(int(d), int(n), str(n) + '/' + str(d), x=90 + i * 260, y=150, w=220)
            b.append(note('分母相同，分子大的那一個就比較大。', 320))
            return b, set()
        fr = _frac(stem)
        if fr:
            n, d = fr
            b = []
            whole, rest = n // d, n % d
            for k in range(whole):
                x = 90 + k * 120
                b.append(R(x, 160, 110, 60, 'n', 4))
                b.append(T(x + 55, 198, '1', 'mid', 'middle'))
            b += frac_strip(d, rest, '', x=90 + whole * 120, y=160, w=110.0)
            b.append(T(90, 250, str(n) + '/' + str(d) + ' ＝ 整數＋分數', 'a'))
            return b, set()
        return None
    if section == '9-3':
        frs = FRAC_RE.findall(stem)
        if len(frs) == 1 and re.search(r'1\s*[－\-]', stem):
            n, d = int(frs[0][0]), int(frs[0][1])
            b = frac_strip(d, 0, '1 個整數', x=110, y=140, w=300)
            b += frac_strip(d, n, str(n) + '/' + str(d), x=110, y=220, w=300)
            b.append(note('整數減分數，先把整數看成同分母的分數。', 320))
            return b, set()
        if len(frs) >= 2:
            b = []
            for i, (n, d) in enumerate(frs[:2]):
                b += frac_strip(int(d), int(n), str(n) + '/' + str(d), x=90 + i * 260, y=150, w=220)
            b.append(note('同分母分數相加，分母不變、分子相加。', 320))
            return b, set()
        return None
    if section == '9-4':
        fr = _frac(stem)
        m = re.search(r'×\s*(\d+)', stem)
        if fr and m:
            n, d = fr
            k = int(m.group(1))
            b = frac_strip(d, n, str(n) + '/' + str(d), x=90, y=140, w=300)
            for i in range(min(k, 4)):
                b.append(R(110 + i * 100, 220, 90, 48, 'ns', 4))
                b.append(T(155 + i * 100, 250, str(n) + '/' + str(d), 's', 'middle'))
            b.append(T(90, 300, '乘 ' + str(k) + '，就是 ' + str(k) + ' 個 ' + str(n) + '/' + str(d), 'sb'))
            return b, set()
        return None

    # ---------------- 10-x 統計圖 ----------------
    if section == '10-1':
        m = re.search(r'每一格代表\s*(\d+)\s*人', stem)
        h = re.search(r'長條高\s*(\d+)\s*格', stem)
        if m and h:
            step = int(m.group(1))
            bars = bar_chart([int(h.group(1)) * step], ['某一項'], '人', vmax=step * 5, step=step,
                              x0=140, base=300, gap=80)
            bars.append(note('縱軸每一格代表 ' + str(step) + ' 人，數一數有幾格。', 350))
            return bars, scale_allow(step, step * 5)
        b = bar_chart([3, 2, 1], ['甲', '乙', '丙'], '數量', vmax=4, step=1, x0=140, base=300, gap=80)
        b.append(T(120, 130, '縱軸：數量多少', 's'))
        b.append(T(120, 150, '橫軸：項目名稱', 's'))
        b.append(note('看長條圖，先看清楚標題和每一格代表多少。', 350))
        return b, set()
    if section == '10-2':
        m = re.search(r'籃球\s*(\d+)\s*人、躲避球\s*(\d+)\s*人、羽球\s*(\d+)\s*人、桌球\s*(\d+)\s*人', stem)
        if m:
            data = [int(x) for x in m.groups()]
            b = bar_chart(data, ['籃球', '躲避球', '羽球', '桌球'], '人', vmax=max(data) * 2 // 2 + 2,
                          step=2, x0=140, base=300, gap=90)
            b.append(note('每一格代表 2 人，數一數每根長條有幾格。', 350))
            return b, scale_allow(2, max(data) + 4)
        m2 = re.search(r'故事書\s*(\d+)\s*本、科學書\s*(\d+)\s*本、漫畫書\s*(\d+)\s*本', stem)
        if m2:
            data = [int(x) for x in m2.groups()]
            b = bar_chart(data, ['故事書', '科學書', '漫畫書'], '本', vmax=max(data) + 4, step=2,
                          x0=140, base=300, gap=90)
            b.append(note('每一格代表 2 本。', 350))
            return b, scale_allow(2, max(data) + 4)
        b = []
        b.append(T(90, 140, '直長條圖', 'ts'))
        b.append(R(90, 160, 70, 130, 'n'))
        b.append(T(125, 310, '長條直立', 's', 'middle'))
        b.append(T(260, 140, '橫長條圖', 'ts'))
        b.append(R(260, 180, 220, 60, 'n'))
        b.append(T(370, 310, '長條橫放', 's', 'middle'))
        b.append(note('直立和橫放，讀法一樣。', 340))
        return b, set()
    if section == '10-3':
        m = re.search(r'每一格代表\s*(\d+)\s*度', stem)
        h = re.search(r'在\s*(\d+)\s*格的高度', stem)
        if m and h:
            step = int(m.group(1))
            v = int(h.group(1)) * step
            b = line_chart([v], ['某日'], '度', x0=140, base=300, w=420, h=240, vmax=step * 6)
            b.append(note('縱軸每一格代表 ' + str(step) + ' 度，數一數點在第幾格。', 350))
            return b, scale_allow(step, step * 6)
        m2 = re.search(r'週一\s*(\d+)\s*度、週二\s*(\d+)\s*度、週三\s*(\d+)\s*度、週四\s*(\d+)\s*度', stem)
        if m2:
            data = [int(x) for x in m2.groups()]
            b = line_chart(data, ['週一', '週二', '週三', '週四'], '度', x0=140, base=300, w=420, h=240,
                           vmax=max(data) + 6)
            b.append(note('點越高表示越熱。', 350))
            return b, scale_allow(10, max(data) + 10)
        b = line_chart([3, 5, 4, 6], ['一', '二', '三', '四'], '數量', x0=140, base=300, w=420, h=240, vmax=8)
        b.append(note('折線圖用來看數量的變化。', 350))
        return b, set()
    if section == '10-4':
        m = re.search(r'下層是男生\s*(\d+)\s*人、上層是女生\s*(\d+)\s*人', stem)
        if m:
            boy, girl = int(m.group(1)), int(m.group(2))
            b = []
            b.append(L(140, 300, 140, 120, 'ln'))
            b.append(L(140, 300, 520, 300, 'ln'))
            b.append(R(220, 300 - 30 * boy, 70, 30 * boy, 'n'))
            b.append(R(220, 300 - 30 * (boy + girl), 70, 30 * girl, 'na'))
            b.append(T(255, 300 - 30 * boy + 20, '男生 ' + str(boy) + ' 人', 'sb', 'middle'))
            b.append(T(255, 300 - 30 * (boy + girl) + 20, '女生 ' + str(girl) + ' 人', 'sb', 'middle'))
            b.append(note('下層加上上層，就是這一根長條的總人數。', 350))
            return b, set()
        m2 = re.search(r'甲組\s*(\d+)\s*人、乙組\s*(\d+)\s*人', stem)
        if m2:
            a, c = int(m2.group(1)), int(m2.group(2))
            b = bar_chart([a, c], ['甲組', '乙組'], '人', vmax=max(a, c) + 4, step=2, x0=140, base=300, gap=100)
            b.append(note('雙長條圖：同一個項目的兩組資料並排。', 350))
            return b, scale_allow(2, max(a, c) + 4)
        b = []
        b.append(T(90, 140, '雙長條圖', 'ts'))
        b.append(R(90, 165, 60, 110, 'n'))
        b.append(R(165, 165, 60, 80, 'na'))
        b.append(T(90, 300, '甲組', 's', 'middle'))
        b.append(T(165, 300, '乙組', 's', 'middle'))
        b.append(T(280, 160, '堆疊長條圖', 'ts'))
        b.append(R(280, 200, 60, 70, 'n'))
        b.append(R(280, 165, 60, 35, 'na'))
        b.append(T(310, 300, '上層／下層', 's', 'middle'))
        b.append(note('並排的是雙長條，疊起來的是堆疊長條。', 340))
        return b, set()

    return None
