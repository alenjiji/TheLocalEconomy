/**
 * Recompresses the page's photographs to the sizes they are actually drawn at.
 *
 *   node scripts/optimise-images.mjs
 *
 * Every `width` below is the widest that picture is ever displayed, in CSS
 * pixels, doubled for a retina screen. Several of these shipped at two or
 * three times that — the hero cutout was 2946 across for a slot 880 wide —
 * and the JPEGs were never WebP at all.
 *
 * Re-running is safe: each entry reads the committed source and overwrites
 * its own output. Where the output replaces a JPEG, the old file is removed
 * and the reference in the code is expected to point at the `.webp`.
 */
import { createRequire } from "node:module";
import { statSync, existsSync, unlinkSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

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
  throw new Error(`${name} not found. \`npm i -g ${name}\` and re-run.`);
}
const sharp = load("sharp");

/** `width: null` keeps the source size and only recompresses. */
const JOBS = [
  // Hero cutout, desktop. Slot is 660 board units — 880 CSS at the scale cap.
  { src: "public/hero/DSC_3834.webp", width: 1800, quality: 74, alpha: true },
  // Consultancy handshake. Widest draw is the programme page art, ~760 CSS.
  { src: "public/section_2/Img_2-cutout.webp", width: 1536, quality: 70, alpha: true },
  // Biz Fix portrait on the card, ~400 CSS.
  { src: "public/section_2/img_1.webp", width: 800, quality: 74, alpha: true },
  // The 360 framework photograph, ~740 CSS.
  { src: "public/section_2/Prasanth-B&W.webp", width: 1400, quality: 74 },
  // Posters. All three were JPEG; the frame they fill is ~490 CSS at most.
  { src: "public/course/Course_thumb.jpg", width: 608, quality: 76, to: "webp" },
  { src: "public/testimonials/video/auto_grade_thumb.jpg", width: 720, quality: 76, to: "webp" },
  { src: "public/testimonials/video/nirappil_thumb.jpg", width: 720, quality: 76, to: "webp" },
];

let before = 0;
let after = 0;

for (const job of JOBS) {
  const src = join(root, job.src);
  if (!existsSync(src)) {
    console.log(`skipped (missing): ${job.src}`);
    continue;
  }

  const was = statSync(src).size;
  const out = job.to ? src.replace(extname(src), `.${job.to}`) : src;

  /*
   * Read the bytes up front. sharp holds a handle on a file it is reading,
   * and on Windows that makes writing back over the same path fail.
   */
  const input = readFileSync(src);

  {
    let pipe = sharp(input);
    const meta = await pipe.metadata();
    if (job.width && meta.width > job.width) {
      pipe = pipe.resize({ width: job.width, withoutEnlargement: true });
    }
    const info = await pipe
      .webp({ quality: job.quality, alphaQuality: job.alpha ? 90 : 100, effort: 6 })
      .toFile(out);

    before += was;
    after += info.size;
    const pct = Math.round((1 - info.size / was) * 100);
    console.log(
      `${job.src}\n    ${meta.width}x${meta.height} ${(was / 1024).toFixed(0)}KB  ->  ` +
        `${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB  (-${pct}%)`,
    );

    // A JPEG that became a WebP leaves nothing behind.
    if (job.to && out !== src) unlinkSync(src);
  }
}

console.log(
  `\ntotal: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB ` +
    `(saved ${((before - after) / 1024).toFixed(0)}KB)`,
);
