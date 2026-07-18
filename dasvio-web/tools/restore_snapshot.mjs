import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(projectRoot, "out");

await access(outputDir);

// The site now ships entirely from the React app — Next's static export in out/
// is the source of truth for every route (the recovered production snapshot has
// been retired). This step only writes redirect fallbacks for slugs that don't
// yet have a React route: blog post pages and resource sub-pages redirect to
// their hub so direct links and old inbound URLs keep resolving.

const blogSlugs = [
  "12-second-checkout",
  "ai-translation-qr-menu-turkey-2026",
  "anatolia-kebap-50-branches-90-days",
  "cloud-kitchens-software-problem",
  "hotel-fb-revenue-math",
  "hourly-heatmaps-primer",
  "master-menu-branch-reality",
  "platform-integrations-engineering",
  "pos-built-for-cashiers",
  "q3-2026-product-update",
  "receipt-printers-2026",
  "revenue-center-engine",
];
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
  for (const slug of blogSlugs) {
    await writeFallback(`${locale}/blog/${slug}`, `/${locale}/blog`);
  }
  for (const slug of resourceSlugs) {
    await writeFallback(`${locale}/${slug}`, `/${locale}/resources`);
  }
}

console.log("Wrote route redirect fallbacks into out/.");
