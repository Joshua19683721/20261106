import sys, os
from PIL import Image

src = sys.argv[1]
outdir = sys.argv[2]
nx = int(sys.argv[3])
ny = int(sys.argv[4])
scale = float(sys.argv[5]) if len(sys.argv) > 5 else 2.0

os.makedirs(outdir, exist_ok=True)
im = Image.open(src)
w, h = im.size
print("size", w, h)
for i in range(nx):
    for j in range(ny):
        box = (int(w*i/nx), int(h*j/ny), int(w*(i+1)/nx), int(h*(j+1)/ny))
        c = im.crop(box)
        c = c.resize((int(c.width*scale), int(c.height*scale)), Image.LANCZOS)
        p = os.path.join(outdir, "r%d_%d.png" % (j, i))
        c.save(p)
        print(p, box)
