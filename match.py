import os
from PIL import Image, ImageChops
import numpy as np

def sig(p, n=32):
    im = Image.open(p).convert("L").resize((n, n))
    a = np.asarray(im, dtype=np.float32)
    a = (a - a.mean()) / (a.std() + 1e-6)
    return a

gdir, fdir = "frames_v2", "frames_v1"
fs = sorted(os.listdir(fdir))
fsig = {f: sig(os.path.join(fdir, f)) for f in fs}
for g in sorted(os.listdir(gdir)):
    gs = sig(os.path.join(gdir, g))
    d = sorted(((float(((gs - v) ** 2).mean()), f) for f, v in fsig.items()))
    print(g, "->", [(f, round(s, 3)) for s, f in d[:5]])
