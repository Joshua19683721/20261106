import numpy as np
from PIL import Image

im = Image.open("frames_v2/g_011.jpg").convert("RGB")
a = np.asarray(im).astype(np.int16)
R, G, B = a[:, :, 0], a[:, :, 1], a[:, :, 2]
mx = a.max(axis=2); mn = a.min(axis=2)
chroma = mx - mn
dark = mx < 170
colored = dark & (chroma > 35)
print("total dark px", dark.sum(), "colored dark px", colored.sum())
ys, xs = np.nonzero(colored)
if len(xs):
    print("x range", xs.min(), xs.max(), "y range", ys.min(), ys.max())
# print a coarse map: 20px cells
H, W = colored.shape
gh, gw = H // 20, W // 20
for gy in range(gh):
    row = ""
    for gx in range(gw):
        c = colored[gy*20:(gy+1)*20, gx*20:(gx+1)*20].sum()
        row += "#" if c > 60 else ("+" if c > 15 else ("." if c > 2 else " "))
    print(f"{gy*20:4d} {row}")
