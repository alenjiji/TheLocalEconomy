/**
 * Rasterises the hero's backdrop into two WebP cuts.
 *
 *   node scripts/make-hero-backdrop.mjs
 *
 * `bg-elements-static.svg` is 1.2MB — thirty paths carrying four decimal
 * places each — and it was the single heaviest thing on the page, 750KB over
 * the wire even after Brotli. It is a soft, out-of-focus graph behind the
 * headline: nothing about it needs to be vector.
 *
 * It is flattened onto the hero's own #282727 rather than kept transparent.
 * That halves the file again, and it is invisible: wherever the backdrop's
 * mask hides the image, what shows through is that same colour.
 *
 * Chromium does the rendering rather than a native SVG library, because the
 * file leans on clip paths and gradients and this is the renderer that has to
 * agree with it in the end anyway.
 *
 * The output is committed. Re-run only if the artwork changes.
 */
import { createRequire } from "node:module";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function load(name) {
  for (const c of [name, join(process.env.APPDATA ?? "", `npm/node_modules/${name}`)]) {
    try {
      return require(c);
    } catch {
      /* next */
    }
  }
  throw new Error(`${name} not found.`);
}

const { chromium } = load("playwright");
const sharp = load("sharp");

const SRC = join(root, "public/hero/bg-elements-static.svg");
const GROUND = "#282727";

/** The artboard, from the file's own viewBox. */
const VB_W = 1624.35;
const VB_H = 1689.2;

/*
 * Two cuts. The phone covers a tall, narrow box so it crops the sides hard and
 * never needs the full width. The desktop one is drawn at 3000 across because
 * the board reaches 1624 units at the 1920 scale cap, which is 2166 CSS pixels
 * and twice that on a retina screen — and the picture carries small tick
 * labels that go to mush if it is sampled under them. It still lands in tens
 * of kilobytes, so there is no reason to be mean with it.
 */
const CUTS = [
  { name: "bg-elements-mobile.webp", width: 1400, quality: 72 },
  { name: "bg-elements.webp", width: 3000, quality: 72 },
];

const svg = readFileSync(SRC, "utf8");
const scratch = join(root, "public/__backdrop.html");
writeFileSync(
  scratch,
  `<!doctype html><meta charset="utf-8">
   <style>html,body{margin:0;padding:0;background:${GROUND}}
   svg{display:block;width:100vw;height:100vh}</style>${svg}`,
);

const browser = await chromium.launch();
try {
  for (const cut of CUTS) {
    const height = Math.round((cut.width * VB_H) / VB_W);
    const page = await browser.newPage({
      viewport: { width: cut.width, height },
      deviceScaleFactor: 1,
    });
    await page.goto(pathToFileURL(scratch).href, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const png = await page.screenshot({ type: "png" });
    await page.close();

    const out = join(root, "public/hero", cut.name);
    const info = await sharp(png).webp({ quality: cut.quality, effort: 6 }).toFile(out);
    console.log(
      `wrote public/hero/${cut.name} — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB`,
    );
  }
} finally {
  await browser.close();
  unlinkSync(scratch);
}
