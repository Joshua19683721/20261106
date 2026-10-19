import os, sys
for d in os.listdir("."):
    if os.path.isdir(d) and not d.startswith("."):
        try:
            print(d, "->", os.listdir(d)[:10])
        except Exception as e:
            print(d, "ERR", e)
