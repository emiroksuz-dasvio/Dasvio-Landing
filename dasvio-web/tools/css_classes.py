#!/usr/bin/env python3
"""Extract the sorted set of selectors (and class tokens) from a CSS file.

Usage: css_classes.py FILE [--classes]
  default : prints unique selectors, one per line
  --classes: prints unique .class tokens found anywhere in selectors
"""
import re
import sys


def strip_comments(css):
    return re.sub(r"/\*.*?\*/", "", css, flags=re.S)


def selectors(css):
    css = strip_comments(css)
    out = set()
    depth = 0
    buf = []
    i = 0
    while i < len(css):
        c = css[i]
        if c == "{":
            sel = "".join(buf).strip()
            if sel and not sel.startswith("@"):
                for part in sel.split(","):
                    out.add(re.sub(r"\s+", " ", part.strip()))
            buf = []
            depth += 1
        elif c == "}":
            depth = max(0, depth - 1)
            buf = []
        elif c == ";" and depth >= 0:
            buf = []
        else:
            buf.append(c)
        i += 1
    return out


def main():
    css = open(sys.argv[1], encoding="utf-8").read()
    sels = selectors(css)
    if "--classes" in sys.argv:
        classes = set()
        for s in sels:
            classes.update(re.findall(r"\.((?:[\w-]|\\.)+)", s))
        for c in sorted(classes):
            print(c)
    else:
        for s in sorted(sels):
            print(s)


if __name__ == "__main__":
    main()
