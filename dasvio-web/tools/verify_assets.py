#!/usr/bin/env python3
"""Check that local links and assets referenced by exported HTML exist."""

import argparse
import os
import re
import sys
from urllib.parse import unquote

REFERENCE_RE = re.compile(r'(?:src|href)="(/[^"?#]*)')


def resolves(root: str, url_path: str) -> bool:
    relative = unquote(url_path).lstrip("/")
    target = os.path.join(root, relative)
    candidates = (
        target,
        f"{target}.html",
        os.path.join(target, "index.html"),
    )
    return any(os.path.exists(candidate) for candidate in candidates)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("root", nargs="?", default="out")
    args = parser.parse_args()
    root = os.path.abspath(args.root)

    pages = 0
    missing: set[tuple[str, str]] = set()
    for dirpath, _, filenames in os.walk(root):
        for filename in filenames:
            if not filename.endswith(".html"):
                continue
            pages += 1
            page_path = os.path.join(dirpath, filename)
            with open(page_path, encoding="utf-8") as handle:
                html = handle.read()
            for reference in REFERENCE_RE.findall(html):
                if reference.startswith("/_next/image"):
                    continue
                if not resolves(root, reference):
                    missing.add((os.path.relpath(page_path, root), reference))

    print(f"HTML pages: {pages}")
    print(f"Missing local references: {len(missing)}")
    for page, reference in sorted(missing):
        print(f"MISSING {page}: {reference}")
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
