/**
 * Renders public/og.jpg — the picture that shows when the site is shared.
 *
 *   node scripts/make-og-image.mjs
 *
 * 1200x630 is the size every platform crops from, and a JPEG under about
 * 300KB is what WhatsApp will render as a full-width card rather than the
 * little square thumbnail it falls back to.
 *
 * The card is the hero, recomposed for a landscape frame: same ground, same
 * backdrop, same headline, same portrait. It is drawn here rather than
 * screenshotting the real hero because the hero is a 1440-wide stage with the
 * headline down its left third — cropped to 1200x630 it loses the portrait and
 * half the words.
 *
 * Output is committed, so nobody needs this to build the site. Playwright is
 * not a project dependency; install it globally (`npm i -g playwright`).
 */
import { createRequire } from "node:module";
import { writeFileSync, rmSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadPlaywright() {
  for (const c of [
    "playwright",
    join(process.env.APPDATA ?? "", "npm/node_modules/playwright"),
    "/usr/local/lib/node_modules/playwright",
  ]) {
    try {
      return require(c);
    } catch {
      /* try the next one */
    }
  }
  throw new Error("Playwright not found. `npm i -g playwright` and re-run.");
}

/*
 * The template is written into public/ and opened from there rather than
 * handed to `setContent`.
 *
 * A page set with `setContent` has no URL of its own — it is about:blank — and
 * Chromium will not let such a document pull in file:// subresources. The
 * logo, the backdrop and the portrait all came back empty and the card
 * rendered as type on a flat ground. Opened as a file, its own origin is
 * file:// and the relative paths below simply resolve.
 */
const scratch = join(root, "public/__og-template.html");

const html = `<!doctype html>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=block" rel="stylesheet">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background: #282727;
    font-family: Inter, system-ui, sans-serif;
    position: relative;
  }

  /* The hero's graph backdrop, placed so the curves cross the right half and
     fade out before they reach the words. */
  .backdrop {
    position: absolute; inset: 0;
    -webkit-mask-image: linear-gradient(to right, transparent 60px, #000 620px);
    mask-image: linear-gradient(to right, transparent 60px, #000 620px);
  }
  .backdrop img {
    position: absolute; left: -210px; top: -470px;
    width: 1760px; height: auto; max-width: none;
    opacity: 0.92;
  }

  /* Him, cut by the foot of the card exactly as the hero cuts him. */
  .portrait {
    position: absolute; right: 8px; bottom: 0;
    height: 566px; width: auto;
  }
  /* Settles the right edge of the frame into the ground so he is lit rather
     than pasted on. */
  .vignette {
    position: absolute; inset: 0;
    background:
      linear-gradient(90deg, #282727 4%, rgba(40,39,39,0.86) 34%, rgba(40,39,39,0) 62%),
      linear-gradient(0deg, rgba(40,39,39,0.55) 0%, transparent 26%);
  }

  .plate { position: absolute; left: 72px; top: 66px; width: 660px; }
  .logo { width: 258px; height: auto; display: block; }

  h1 {
    margin-top: 74px;
    font-size: 62px; line-height: 1.13; letter-spacing: -0.015em;
    font-weight: 300; color: #ffffff;
  }
  h1 b { font-weight: 700; }
  h1 .amber { color: #f5a623; font-weight: 400; }

  .rule { margin-top: 38px; width: 88px; height: 5px; background: #f5a623; }

  .who {
    margin-top: 26px;
    font-size: 25px; line-height: 1.3; font-weight: 600; color: #00adee;
  }
  .who span { display: block; font-size: 19px; font-weight: 300; font-style: italic; color: #a8a4a2; }
</style>

<div class="backdrop"><img src="hero/bg-elements-static.svg" alt=""></div>
<img class="portrait" src="hero/DSC_3834.webp" alt="">
<div class="vignette"></div>

<div class="plate">
  <img class="logo" src="hero/logo.svg" alt="">
  <h1>Total <b>transformation</b><br>of <b>your business</b><br><b>with our</b> <span class="amber">one-month<br>programme.</span></h1>
  <div class="rule"></div>
  <div class="who">Prasanth Sukumaran<span>ACE Business Coaching.</span></div>
</div>`;

const { chromium } = loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
writeFileSync(scratch, html);
try {
  await page.goto(pathToFileURL(scratch).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  var jpg = await page.screenshot({ type: "jpeg", quality: 88 });
} finally {
  await browser.close();
  rmSync(scratch, { force: true });
}

writeFileSync(join(root, "public/og.jpg"), jpg);
console.log(`wrote public/og.jpg — ${(jpg.length / 1024).toFixed(0)}KB`);
