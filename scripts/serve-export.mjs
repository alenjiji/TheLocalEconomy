/**
 * Serves the static export in `out/`.
 *
 * `next start` cannot run this project: `output: "export"` produces plain
 * files rather than a server, and Next refuses to start against them. This is
 * the local equivalent of what Netlify publishes.
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

// `fileURLToPath` rather than `.pathname`: on Windows the latter yields
// "/C:/..." which every path join then mangles.
const ROOT = resolve(fileURLToPath(new URL("../out", import.meta.url)));
const PORT = Number(process.env.PORT ?? 3000);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

if (!existsSync(ROOT)) {
  console.error("No export found. Run `npm run build` first.");
  process.exit(1);
}

createServer((req, res) => {
  let path = decodeURIComponent((req.url ?? "/").split("?")[0]);
  if (path.endsWith("/")) path += "index.html";

  let file = resolve(join(ROOT, normalize(path)));
  // Guard against traversal out of the export directory.
  if (file !== ROOT && !file.startsWith(ROOT + sep)) {
    res.writeHead(403).end("forbidden");
    return;
  }
  if (!existsSync(file) || statSync(file).isDirectory()) {
    file = resolve(join(ROOT, normalize(path + ".html")));
  }
  if (!existsSync(file)) {
    const notFound = join(ROOT, "404.html");
    res.writeHead(404, { "content-type": TYPES[".html"] });
    if (existsSync(notFound)) createReadStream(notFound).pipe(res);
    else res.end("not found");
    return;
  }

  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(PORT, () => {
  console.log(`Serving the export on http://localhost:${PORT}`);
});
