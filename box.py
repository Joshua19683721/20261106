import sys, os
from PIL import Image

src = sys.argv[1]
out = sys.argv[2]
x0, y0, x1, y1 = [int(v) for v in sys.argv[3:7]]
scale = float(sys.argv[7]) if len(sys.argv) > 7 else 3.0

im = Image.open(src)
c = im.crop((x0, y0, x1, y1))
c = c.resize((int(c.width*scale), int(c.height*scale)), Image.LANCZOS)
d = os.path.dirname(out)
if d:
    os.makedirs(d, exist_ok=True)
c.save(out)
print(out, c.size)
