#!/usr/bin/env python3
"""Normalize a Next.js static-export HTML page into a canonical DOM tree text.

Drops scripts and build-hashed asset references so two builds of the same
source produce identical output. Usage: normalize_html.py FILE
"""
import re
import sys
from html.parser import HTMLParser

VOID = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}

NEXT_ASSET_RE = re.compile(r"/_next/[^\s\"']*")
FONT_VAR_RE = re.compile(r"__variable_[0-9a-f]{4,8}")
FAVICON_RE = re.compile(r"favicon\.ico\?[0-9a-f]+")


def norm_attr(name, value):
    if value is None:
        return name, ""
    value = NEXT_ASSET_RE.sub("NEXT_ASSET", value)
    value = FONT_VAR_RE.sub("__VAR__", value)
    value = FAVICON_RE.sub("favicon.ico", value)
    return name, value


class Normalizer(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.lines = []
        self.depth = 0
        self.skip_depth = None  # inside <script>

    def _skip_link(self, attrs):
        d = dict(attrs)
        href = d.get("href", "")
        return "/_next/" in href

    def emit(self, text):
        self.lines.append("  " * self.depth + text)

    def handle_starttag(self, tag, attrs):
        if self.skip_depth is not None:
            if tag == "script":
                pass
            return
        if tag == "script":
            self.skip_depth = self.depth
            return
        if tag == "link" and self._skip_link(attrs):
            return
        rendered = " ".join(
            f'{k}="{v}"' for k, v in sorted(norm_attr(k, v) for k, v in attrs)
        )
        self.emit(f"<{tag}{' ' + rendered if rendered else ''}>")
        if tag not in VOID:
            self.depth += 1

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID and self.skip_depth is None and tag != "script":
            self.depth -= 1

    def handle_endtag(self, tag):
        if tag == "script":
            self.skip_depth = None
            return
        if self.skip_depth is not None:
            return
        if tag in VOID:
            return
        self.depth = max(0, self.depth - 1)

    def handle_data(self, data):
        if self.skip_depth is not None:
            return
        text = re.sub(r"\s+", " ", data).strip()
        if text:
            self.emit(f"#text {text}")


def normalize(path):
    with open(path, encoding="utf-8") as f:
        raw = f.read()
    p = Normalizer()
    p.feed(raw)
    return "\n".join(p.lines) + "\n"


if __name__ == "__main__":
    sys.stdout.write(normalize(sys.argv[1]))
