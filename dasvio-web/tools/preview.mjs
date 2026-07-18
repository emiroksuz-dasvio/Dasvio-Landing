// Minimal static-file server for previewing the production export in `out/`.
// `next start` does not support `output: "export"`, so use this to experience
// real production navigation speed locally:  npm run build  →  npm run preview
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "out");
const port = Number(process.env.PORT) || 8080;

const types = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

async function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  const candidates = clean === "" ? ["index.html"] : [clean, `${clean}.html`, path.join(clean, "index.html")];
  for (const rel of candidates) {
    const abs = path.join(root, rel);
    if (!abs.startsWith(root)) continue; // path traversal guard
    try {
      if ((await stat(abs)).isFile()) return abs;
    } catch {}
  }
  return null;
}

createServer(async (req, res) => {
  const file = (await resolve(req.url)) ?? path.join(root, "404.html");
  try {
    const body = await readFile(file);
    res.writeHead(file.endsWith("404.html") ? 404 : 200, {
      "Content-Type": types[path.extname(file)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(500).end("Server error");
  }
}).listen(port, () => {
  console.log(`Preview of out/ → http://localhost:${port}/tr`);
});
