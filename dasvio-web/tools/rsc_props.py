#!/usr/bin/env python3
"""Extract client-component props from a Next.js flight (RSC) payload .txt file.

The payload is line-oriented: `<id>:<data>`. Module refs look like
`id:I[moduleId,[chunks...],"ComponentName"]`; element trees are JSON arrays
of the form ["$","$L<id>",key,{...props...}].

Usage: rsc_props.py FILE [ComponentName]
Prints JSON: {component: [props, ...]}
"""
import json
import re
import sys

REF_RE = re.compile(r'^([0-9a-f]+):I\[(\d+),\[[^\]]*\],"([^"]+)"')
LINE_RE = re.compile(r"^([0-9a-f]+):(.*)$", re.S)


def parse_lines(raw):
    # Split on line starts that look like `hex:`; payload values may span lines.
    parts = re.split(r"\n(?=[0-9a-f]+:)", raw)
    for part in parts:
        m = LINE_RE.match(part)
        if m:
            yield m.group(1), m.group(2)


def walk(node, refs, hits):
    if isinstance(node, list):
        if (len(node) == 4 and node[0] == "$" and isinstance(node[1], str)
                and isinstance(node[3], dict)):
            tag = node[1]
            if tag.startswith("$L"):
                name = refs.get(tag[2:])
                if name:
                    hits.setdefault(name, []).append(node[3])
            walk(node[3], refs, hits)
            return
        for item in node:
            walk(item, refs, hits)
    elif isinstance(node, dict):
        for v in node.values():
            walk(v, refs, hits)


def strip_elements(obj):
    """Replace nested React elements in props with a compact placeholder."""
    if isinstance(obj, list):
        if len(obj) == 4 and obj[0] == "$" and isinstance(obj[1], str):
            return {"$element": obj[1]}
        return [strip_elements(x) for x in obj]
    if isinstance(obj, dict):
        return {k: strip_elements(v) for k, v in obj.items()}
    return obj


def extract(path):
    raw = open(path, encoding="utf-8").read()
    refs, hits = {}, {}
    payloads = []
    for lid, data in parse_lines(raw):
        m = REF_RE.match(f"{lid}:{data}")
        if m:
            refs[m.group(1)] = m.group(3)
            continue
        data = data.strip()
        if data.startswith("[") or data.startswith("{"):
            try:
                payloads.append(json.loads(data))
            except json.JSONDecodeError:
                pass
    for p in payloads:
        walk(p, refs, hits)
    return {k: [strip_elements(p) for p in v] for k, v in hits.items()}


if __name__ == "__main__":
    result = extract(sys.argv[1])
    if len(sys.argv) > 2:
        result = {k: v for k, v in result.items() if k == sys.argv[2]}
    json.dump(result, sys.stdout, ensure_ascii=False, indent=2)
    print()
