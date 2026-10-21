# -*- coding: utf-8 -*-
"""
visuals/math_consistency.py — 驗證「題圖一致」

規則：附圖上出現的每一個數字，都必須能在題幹找到，或在該圖的允許清單內
      （允許清單＝推導值，例如 1 公里＝1000 公尺、統計圖刻度 1～10）。
      不符合 → 視為不一致，該圖必須修正或移除。
"""
import io, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
BANK = os.path.join(ROOT, '數學期中考', 'papers', 'bank.js')
IMG = os.path.join(ROOT, '數學期中考', 'img')
sys.path.insert(0, HERE)

from math_rules import build
from math_dynamic_run import mix_figure, passage_figure

UNIVERSAL = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 20, 30, 36, 45, 50, 60, 90, 100, 180, 360, 1000}
FIG_RE = re.compile(r'\[\[fig:([a-z0-9\-]+)(?:\|[^\]]*)?\]\]')


REPORT = []


def out(msg):
    REPORT.append(msg)
    try:
        print(msg)
    except UnicodeEncodeError:
        print(msg.encode('ascii', 'replace').decode('ascii'))


def field(obj, key):
    m = re.search(r'"%s":\s*"((?:[^"\\]|\\.)*)"' % key, obj)
    return m.group(1) if m else None


def stem_nums(text):
    s = set()
    for x in re.findall(r'\d[\d,]*(?:\.\d+)?', text or ''):
        s.add(x.replace(',', ''))
    for a, b in re.findall(r'(\d+)\s*/\s*(\d+)', text or ''):
        s.add(a)
        s.add(b)
    return s


def figure_numbers(body):
    s = set()
    for t in re.findall(r'<text[^>]*>(.*?)</text>', body, re.S):
        t = re.sub(r'<[^>]+>', '', t)
        for x in re.findall(r'\d[\d,]*(?:\.\d+)?', t):
            s.add(x.replace(',', ''))
        for a, b in re.findall(r'(\d+)\s*/\s*(\d+)', t):
            s.add(a)
            s.add(b)
    return s


def split_objects(text, start_idx):
    objs, depth, i, obj_start, in_str, esc = [], 0, start_idx, None, False, False
    while i < len(text):
        c = text[i]
        if in_str:
            if esc:
                esc = False
            elif c == '\\':
                esc = True
            elif c == '"':
                in_str = False
        else:
            if c == '"':
                in_str = True
            elif c == '{':
                if depth == 0:
                    obj_start = i
                depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0:
                    objs.append((obj_start, i + 1))
        i += 1
    return objs


def main():
    t = io.open(BANK, encoding='utf-8').read()
    total = withfig = nofig = 0
    bad = []
    missing_file = []
    seen = set()

    s = t.index('var SELECT = [')
    for (a, b) in split_objects(t, t.index('[', s) + 1):
        obj = t[a:b]
        u = field(obj, 'u')
        q = field(obj, 'q')
        o_txt = field(obj, 'o')
        opts = re.findall(r'"((?:[^"\\]|\\.)*)"', o_txt or '')
        if not (u and q):
            continue
        total += 1
        stem = re.sub(r'\[\[fig:[^\]]*\]\]', '', q)
        m = FIG_RE.search(q)
        if not m:
            nofig += 1
            continue
        slug = m.group(1)
        withfig += 1
        if slug in seen:
            continue
        seen.add(slug)
        if not os.path.exists(os.path.join(IMG, slug + '.svg')):
            missing_file.append(slug)
        if u.startswith('統整應用'):
            r = mix_figure(stem)
        else:
            r = build(u.split(' ')[0], stem, opts)
        if not r:
            bad.append((u.split(' ')[0], stem[:28], '規則找不到圖'))
            continue
        body, allow = r
        body = '\n'.join(body)
        allowed = set(stem_nums(stem)) | {str(x) for x in (allow or set())} | {str(x) for x in UNIVERSAL}
        for num in sorted(figure_numbers(body)):
            if num not in allowed:
                bad.append((u.split(' ')[0], stem[:28], '圖上出現題目沒有的數字 ' + num))

    ptotal = pwith = 0
    s2 = t.index('var PASSAGE = [')
    for (a, b) in split_objects(t, t.index('[', s2) + 1):
        obj = t[a:b]
        tag = field(obj, 'tag')
        p = field(obj, 'p')
        if not (tag and p):
            continue
        ptotal += 1
        stem = re.sub(r'\[\[fig:[^\]]*\]\]', '', p)
        m = FIG_RE.search(p)
        if not m:
            continue
        pwith += 1
        slug = m.group(1)
        if not os.path.exists(os.path.join(IMG, slug + '.svg')):
            missing_file.append(slug)
        r = passage_figure(tag, stem)
        if not r:
            bad.append((tag, stem[:24], '找不到短文圖'))
            continue
        body, allow = r
        body = '\n'.join(body)
        allowed = set(stem_nums(stem)) | {str(x) for x in (allow or set())} | {str(x) for x in UNIVERSAL}
        for num in sorted(figure_numbers(body)):
            if num not in allowed:
                bad.append((tag, stem[:24], '圖上出現短文沒有的數字 ' + num))

    out('選擇題：%d 題（配圖 %d、不放圖 %d）' % (total, withfig, nofig))
    out('素養題組：%d 組（配圖 %d）' % (ptotal, pwith))
    out('不同附圖：%d 張' % len(seen))
    if missing_file:
        out('缺少圖檔：' + ', '.join(sorted(set(missing_file))))
    if bad:
        out('不一致問題 %d 個：' % len(bad))
        for x in bad[:40]:
            out('   X  ' + ' | '.join(str(v) for v in x))
    else:
        out('一致性檢查：全部通過（圖上的數字都能在題目中找到）')


if __name__ == '__main__':
    main()
    io.open(r'C:\\Users\\joshu\\AppData\\Local\\Temp\\opencode\\consist_report.txt', 'w',
            encoding='utf-8').write('\n'.join(REPORT))
