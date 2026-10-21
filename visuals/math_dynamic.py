# -*- coding: utf-8 -*-
"""
visuals/math_dynamic.py — 依「題目內容」動態產生數學附圖

重點：圖上的每一個數字都必須能在題幹（stem）找到，或屬於該題允許的常數
（allow 清單）。產生後由 math_consistency.py 自動驗證，確保題圖一致。
若某題無法畫出相符的圖，回傳 None → 該題不放附圖。
"""
import re

DIG = {'零': 0, '一': 1, '二': 2, '兩': 2, '三': 3, '四': 4, '五': 5,
       '六': 6, '七': 7, '八': 8, '九': 9}


def cn2num(s):
    """中文數字 → 阿拉伯數字（支援 億／萬／千／百／十）。"""
    total = 0
    section = 0
    number = 0
    for ch in s:
        if ch in DIG:
            number = DIG[ch]
        elif ch == '十':
            section += (number or 1) * 10
            number = 0
        elif ch == '百':
            section += (number or 1) * 100
            number = 0
        elif ch == '千':
            section += (number or 1) * 1000
            number = 0
        elif ch == '萬':
            total += (section + number) * 10000
            section = 0
            number = 0
        elif ch == '億':
            total = (total + section + number) * 100000000
            section = 0
            number = 0
    return total + section + number


NUM_RE = re.compile(r'\d[\d,]*(?:\.\d+)?')
FRAC_RE = re.compile(r'(\d+)\s*/\s*(\d+)')


def nums(text):
    """取出題幹中的所有數字（去掉千分位逗號）。"""
    out = []
    for m in NUM_RE.finditer(text):
        out.append(m.group(0).replace(',', ''))
    return out


def has_cn_number(text):
    return bool(re.search(r'[零一二兩三四五六七八九十百千萬億]', text)) and \
        bool(re.search(r'[萬億千百十零一二兩三四五六七八九]', text))


def cn_numbers(text):
    """取出題幹中的中文數字片段。"""
    out = []
    for m in re.finditer(r'[零一二兩三四五六七八九十百千萬億]+', text):
        s = m.group(0)
        if len(s) >= 1 and any(c in s for c in '零一二兩三四五六七八九'):
            if not re.fullmatch(r'[零一二三四五六七八九十百千萬億]*', s):
                continue
            v = cn2num(s)
            if v > 0:
                out.append((s, v))
    return out


def uniq_ints(values):
    out = []
    for v in values:
        try:
            n = int(str(v).replace(',', ''))
        except ValueError:
            continue
        if n not in out:
            out.append(n)
    return out


def digits_of(n):
    return list(str(int(n)))
