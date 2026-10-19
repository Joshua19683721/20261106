import numpy as np
from PIL import Image

im = Image.open("frames_v2/g_011.jpg").convert("RGB")
a = np.asarray(im).astype(np.float32)
lum = a.mean(axis=2)

# limit to text band
band = lum[110:640, :]
prof = (band < 150).sum(axis=0)
# find gaps
runs = []
inrun = False
for x, v in enumerate(prof):
    if v > 1 and not inrun:
        start = x; inrun = True
    elif v <= 1 and inrun:
        runs.append((start, x)); inrun = False
if inrun:
    runs.append((start, len(prof)))
runs = [r for r in runs if r[1]-r[0] > 12]
print("col runs:", runs)
