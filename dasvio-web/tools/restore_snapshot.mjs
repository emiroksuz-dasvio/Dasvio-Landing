import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "out");

await access(outputDir);

// The site now ships entirely from the React app — Next's static export in out/
// is the source of truth for every route (the recovered production snapshot has
// been retired). This step only writes redirect fallbacks for slugs that don't
// yet have a React route, so direct links and old inbound URLs keep resolving.
//
// Blog posts used to be listed here too; they now have a real route at
// app/[lang]/blog/[slug] and MUST NOT be re-added — a fallback written here
// would overwrite the generated page in out/.

const resourceSlugs = ["academy", "docs", "help", "stories", "templates"];

function redirectDocument(destination) {
  const encoded = JSON.stringify(destination);
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="${destination}"><title>Redirecting…</title></head><body><p><a href="${destination}">Continue</a></p><script>location.replace(${encoded})</script></body></html>`;
}

async function writeFallback(relativePath, destination) {
  const outputPath = path.join(outputDir, `${relativePath}.html`);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, redirectDocument(destination));
}

for (const locale of ["tr", "en"]) {
  for (const slug of resourceSlugs) {
    await writeFallback(`${locale}/${slug}`, `/${locale}/resources`);
  }
}

console.log("Wrote route redirect fallbacks into out/.");
