import os, sys
from PIL import Image

f = sys.argv[1]
x0, y0, x1, y1, s = (int(a) for a in sys.argv[2:7])
name = sys.argv[7]
os.makedirs("tmp_crop", exist_ok=True)
im = Image.open(f).crop((x0, y0, x1, y1))
im = im.resize((im.width*s, im.height*s), Image.LANCZOS)
im.save(os.path.join("tmp_crop", name + ".png"))
print("saved", name, im.size)
