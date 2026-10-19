import sys, os
from PIL import Image, ImageOps, ImageFilter, ImageEnhance

src, out = sys.argv[1], sys.argv[2]
x0, y0, x1, y1 = [int(v) for v in sys.argv[3:7]]
scale = float(sys.argv[7]) if len(sys.argv) > 7 else 10.0

im = Image.open(src).convert("L").crop((x0, y0, x1, y1))
im = ImageOps.autocontrast(im, cutoff=1)
im = im.resize((int(im.width*scale), int(im.height*scale)), Image.LANCZOS)
im = im.filter(ImageFilter.UnsharpMask(radius=4, percent=180, threshold=2))
im = ImageEnhance.Contrast(im).enhance(2.0)
d = os.path.dirname(out)
if d:
    os.makedirs(d, exist_ok=True)
im.save(out)
print(out, im.size)
