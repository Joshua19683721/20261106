import numpy as np
from PIL import Image

im = Image.open("frames_v2/g_011.jpg").convert("RGB")
a = np.asarray(im).astype(np.float32)
R, G, B = a[:, :, 0], a[:, :, 1], a[:, :, 2]
lum = (R + G + B) / 3
dark = lum < 140
blue = dark & ((B - R) > 12)
black = dark & ((B - R) <= 12)
print("dark", dark.sum(), "blue", blue.sum(), "black", black.sum())
print("mean color dark:", R[dark].mean(), G[dark].mean(), B[dark].mean())
print("mean color blue:", R[blue].mean(), G[blue].mean(), B[blue].mean(), blue.sum())
print("mean color black:", R[black].mean(), G[black].mean(), B[black].mean(), black.sum())
H, W = blue.shape
for gy in range(80, 660, 20):
    row = ""
    for gx in range(0, W, 20):
        cb = blue[gy:gy+20, gx:gx+20].sum()
        cd = black[gy:gy+20, gx:gx+20].sum()
        if cd > 40:
            row += "#" if cb > cd * 0.7 else "+" if cb > cd * 0.3 else "."
        else:
            row += " " if cd < 8 else "-"
    print(f"{gy:4d} {row}")
