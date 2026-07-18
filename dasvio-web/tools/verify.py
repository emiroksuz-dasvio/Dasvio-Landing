#!/usr/bin/env python3
"""Compare every deploy HTML page against the freshly built out/ directory.

Usage: verify.py [--deploy DIR] [--out DIR] [--report DIR] [--page REL ...]
Exit code 0 = all pages match (normalized), 1 = any diff/missing page.
"""
import argparse
import difflib
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from normalize_html import normalize  # noqa: E402

DEPLOY = "/Users/cly/Downloads/deploy-6a3948a3f08bda27c00b9a4b"


def html_pages(root):
    for dirpath, dirnames, filenames in os.walk(root):
        if "_next" in dirnames:
            dirnames.remove("_next")
        for fn in filenames:
            if fn.endswith(".html"):
                yield os.path.relpath(os.path.join(dirpath, fn), root)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--deploy", default=DEPLOY)
    ap.add_argument("--out", default=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "out"))
    ap.add_argument("--report", default=None)
    ap.add_argument("--page", action="append", default=None,
                    help="limit to specific relative page path(s)")
    args = ap.parse_args()

    pages = sorted(args.page if args.page else html_pages(args.deploy))
    if args.report:
        os.makedirs(args.report, exist_ok=True)

    passed, failed = [], []
    for rel in pages:
        dep = os.path.join(args.deploy, rel)
        out = os.path.join(args.out, rel)
        if not os.path.exists(out):
            failed.append((rel, "MISSING in out/"))
            continue
        a, b = normalize(dep), normalize(out)
        if a == b:
            passed.append(rel)
            continue
        diff = list(difflib.unified_diff(
            a.splitlines(True), b.splitlines(True),
            fromfile=f"deploy/{rel}", tofile=f"out/{rel}", n=2))
        failed.append((rel, f"{sum(1 for l in diff if l[0] in '+-' and l[:3] not in ('+++', '---'))} diff lines"))
        if args.report:
            safe = rel.replace("/", "__")
            with open(os.path.join(args.report, safe + ".diff"), "w") as f:
                f.writelines(diff)

    print(f"PASS {len(passed)}/{len(pages)}")
    for rel, why in failed:
        print(f"FAIL {rel}: {why}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
