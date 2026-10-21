# -*- coding: utf-8 -*-
"""（接續 math_dynamic_run.py）產生、匯出、驗證並更新數學題庫。"""
import io, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SKILL = os.path.join(ROOT, '.opencode', 'skills', 'diagram-design')
SRC = os.path.join(HERE, 'src')
IMG = os.path.join(ROOT, '數學期中考', 'img')
BANK = os.path.join(ROOT, '數學期中考', 'papers', 'bank.js')
sys.path.insert(0, HERE)

import build_figures as BF
from math_rules import build
from math_dynamic_run import mix_figure, passage_figure

UNIVERSAL = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 20, 30, 36, 45, 50, 60, 90, 100, 180, 360, 1000}


def split_objects(text, start_idx):
    objs = []
    depth = 0
    i = start_idx
    obj_start = None
    in_str = False
    esc = False
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


def field(obj, key):
    m = re.search(r'"%s":\s*"((?:[^"\\]|\\.)*)"' % key, obj)
    return m.group(1) if m else None


def stem_nums(text):
    out = set()
    for x in re.findall(r'\d[\d,]*(?:\.\d+)?', text or ''):
        out.add(x.replace(',', ''))
    for a, b in re.findall(r'(\d+)\s*/\s*(\d+)', text or ''):
        out.add(a)
        out.add(b)
    return out


def figure_numbers(body):
    out = set()
    for t in re.findall(r'<text[^>]*>(.*?)</text>', body, re.S):
        t = re.sub(r'<[^>]+>', '', t)
        for x in re.findall(r'\d[\d,]*(?:\.\d+)?', t):
            out.add(x.replace(',', ''))
        for a, b in re.findall(r'(\d+)\s*/\s*(\d+)', t):
            out.add(a)
            out.add(b)
    return out


def export_figure(slug, title, desc, eyebrow, body, subject='數學期中考'):
    html = BF.doc(slug, title, desc, body, eyebrow)
    hp = os.path.join(SRC, slug + '.html')
    io.open(hp, 'w', encoding='utf-8', newline='\n').write(html)
    r = subprocess.run([sys.executable, os.path.join(SKILL, 'scripts', 'self_check.py'), '--offline', hp],
                       capture_output=True, text=True)
    if r.returncode != 0:
        print('  !! self_check 失敗', slug, r.stdout.strip()[:120])
        return False
    out = os.path.join(IMG, slug + '.svg')
    r = subprocess.run([sys.executable, os.path.join(SKILL, 'scripts', 'export_svg.py'), hp, out, '--system-fonts'],
                       capture_output=True, text=True)
    if r.returncode != 0:
        print('  !! export 失敗', slug, r.stdout.strip()[:120])
        return False
    return True


def main():
    if not os.path.isdir(IMG):
        os.makedirs(IMG)
    t = io.open(BANK, encoding='utf-8').read()

    # ---------------- SELECT ----------------
    s = t.index('var SELECT = [')
    objs = split_objects(t, t.index('[', s) + 1)
    out = []
    last = 0
    made = {}
    nofig = 0
    counter = {}
    problems = []
    for (a, b) in objs:
        obj = t[a:b]
        u = field(obj, 'u')
        q = field(obj, 'q')
        o_txt = field(obj, 'o')
        opts = re.findall(r'"((?:[^"\\]|\\.)*)"', o_txt or '')
        if u and q:
            stem = re.sub(r'\[\[fig:[^\]]*\]\]', '', q)
            if u.startswith('統整應用'):
                r = mix_figure(stem)
            else:
                sec = u.split(' ')[0]
                r = build(sec, stem, opts)
            if r:
                body, allow = r
                body = '\n'.join(body)
                key = stem
                if key not in made:
                    counter[u.split(' ')[0]] = counter.get(u.split(' ')[0], 0) + 1
                    if u.startswith('統整應用'):
                        counter['mix'] = counter.get('mix', 0) + 1
                        slug = 'mq-mix-%02d' % counter['mix']
                    else:
                        slug = 'mq-%s-%02d' % (u.split(' ')[0].replace('-', ''), counter[u.split(' ')[0]])
                    ok = export_figure(slug, u.split(' ', 1)[-1][:20], stem[:40], u.split(' ')[0] + ' ' + u.split(' ', 1)[-1][:14], body)
                    if ok:
                        made[key] = (slug, allow)
                    else:
                        made[key] = (None, allow)
                if made[key][0]:
                    obj = re.sub(r'\[\[fig:[^\]]*\]\]', '', obj)
                    m = re.search(r'("q":\s*")', obj)
                    obj = obj[:m.end()] + '[[fig:%s|%s]] ' % (made[key][0], u.split(' ')[-1][:12]) + obj[m.end():]
                else:
                    obj = re.sub(r'\[\[fig:[^\]]*\]\]', '', obj)
                    nofig += 1
                    # 一致性驗證
                    allowed = set(stem_nums(stem)) | {str(x) for x in (made[key][1] or set())} | {str(x) for x in UNIVERSAL}
                    for num in figure_numbers(body):
                        if num not in allowed:
                            problems.append((u.split(' ')[0], stem[:30], num))
            else:
                obj = re.sub(r'\[\[fig:[^\]]*\]\]', '', obj)
                nofig += 1
        out.append(t[last:a])
        out.append(obj)
        last = b
    out.append(t[last:])
    t2 = ''.join(out)
    print('SELECT：配圖 %d 題、不放圖 %d 題' % (len(made) - nofig if False else len([k for k, v in made.items() if v[0]]), nofig))

    # ---------------- PASSAGE ----------------
    s = t2.index('var PASSAGE = [')
    objs = split_objects(t2, t2.index('[', s) + 1)
    out = []
    last = 0
    pmade = 0
    pprob = []
    for (a, b) in objs:
        obj = t2[a:b]
        tag = field(obj, 'tag')
        p = field(obj, 'p')
        if tag and p:
            stem = re.sub(r'\[\[fig:[^\]]*\]\]', '', p)
            r = passage_figure(tag, stem)
            if r:
                body, allow = r
                body = '\n'.join(body)
                slug = 'mp-%02d' % (pmade + 1)
                ok = export_figure(slug, tag, stem[:40], tag, body)
                if ok:
                    obj = re.sub(r'\[\[fig:[^\]]*\]\]', '', obj)
                    m = re.search(r'("p":\s*")', obj)
                    obj = obj[:m.end()] + '[[fig:%s|%s]] ' % (slug, tag.replace('素養題組・', '')) + obj[m.end():]
                    pmade += 1
                    allowed = set(stem_nums(stem)) | {str(x) for x in allow} | {str(x) for x in UNIVERSAL}
                    for num in figure_numbers(body):
                        if num not in allowed:
                            pprob.append((tag, num))
                else:
                    obj = re.sub(r'\[\[fig:[^\]]*\]\]', '', obj)
            else:
                obj = re.sub(r'\[\[fig:[^\]]*\]\]', '', obj)
        out.append(t2[last:a])
        out.append(obj)
        last = b
    out.append(t2[last:])
    t3 = ''.join(out)
    print('PASSAGE：配圖 %d 組' % pmade)

    io.open(BANK, 'w', encoding='utf-8', newline='').write(t3)
    print('一致性問題：', problems + pprob if (problems or pprob) else '無')
    if problems or pprob:
        for x in problems[:20]:
            print('   ✗', x)
        for x in pprob[:20]:
            print('   ✗', x)


if __name__ == '__main__':
    main()
