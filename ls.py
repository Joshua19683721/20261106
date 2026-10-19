import os, sys
d = sys.argv[1] if len(sys.argv) > 1 else "."
for n in os.listdir(d):
    p = os.path.join(d, n)
    print(repr(n), "DIR" if os.path.isdir(p) else os.path.getsize(p))
