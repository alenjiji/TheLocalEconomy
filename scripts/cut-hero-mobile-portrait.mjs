/**
 * Cuts `public/hero/portrait-mobile.webp` out of the full hero cutout.
 *
 *   node scripts/cut-hero-mobile-portrait.mjs
 *
 * The phone layout frames him from above the crown to where the hero's bottom
 * edge cuts him, so it wants a taller, tighter crop than the desktop file —
 * but the crop it had ran straight through both sleeves, and the arms were
 * sliced off at the canvas edges. Nothing in CSS can put an arm back, so the
 * file is cut here instead, keeping the whole figure across the full width.
 *
 * It is written from `DSC_3834.webp`, whose subject sits inside x 40..2906 and
 * starts at y 526 — so the full width is kept as it is, and only the sky above
 * his head is taken off. The output is committed; this only needs running if
 * the source photograph changes.
 */
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

/* Sharp is not a dependency of this project; it is only needed to re-cut the
   file. Install it with `npm i -g sharp` or run this with npx. */
function loadSharp() {
  for (const c of [
    "sharp",
    join(process.env.APPDATA ?? "", "npm/node_modules/sharp"),
    "/usr/local/lib/node_modules/sharp",
  ]) {
    try {
      return require(c);
    } catch {
      /* try the next one */
    }
  }
  throw new Error("sharp not found. `npm i -g sharp` and re-run.");
}

/** Headroom above the crown, in source pixels. The crown is at y 526. */
const TOP = 470;
/** Enough for a 412-wide phone at three times the pixel density. */
const OUT_WIDTH = 1150;

const sharp = loadSharp();
const src = join(root, "public/hero/DSC_3834.webp");
const out = join(root, "public/hero/portrait-mobile.webp");

const { width, height } = await sharp(src).metadata();
const info = await sharp(src)
  .extract({ left: 0, top: TOP, width, height: height - TOP })
  .resize({ width: OUT_WIDTH })
  .webp({ quality: 82, alphaQuality: 90, effort: 6 })
  .toFile(out);

console.log(
  `wrote public/hero/portrait-mobile.webp — ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)}KB`,
);
