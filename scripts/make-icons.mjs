/**
 * Rasterises public/favicon.svg into the icon set the layout declares.
 *
 * Writes favicon-96.png, apple-touch-icon.png and favicon.ico. Run it after
 * editing favicon.svg; the outputs are committed, so nobody needs this to
 * build the site.
 *
 *   node scripts/make-icons.mjs
 *
 * It drives Chromium through Playwright, which is not a dependency of this
 * project — install it globally (`npm i -g playwright`) or run it with npx.
 * The script looks in the global location first and falls back to a local one.
 */
import { createRequire } from "node:module";
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadPlaywright() {
  const candidates = [
    "playwright",
    join(process.env.APPDATA ?? "", "npm/node_modules/playwright"),
    "/usr/local/lib/node_modules/playwright",
  ];
  for (const c of candidates) {
    try {
      return require(c);
    } catch {
      /* try the next one */
    }
  }
  throw new Error("Playwright not found. `npm i -g playwright` and re-run.");
}

/**
 * An .ico is a six-byte header, then one sixteen-byte directory entry per
 * image, then the images themselves. Since Vista the images may be PNGs
 * stored whole, which is what this does — no BMP masks to build.
 */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + pngs.length * 16;
  const entries = [];
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // 0 means 256
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); // palette colours
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    entries.push(e);
    offset += data.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const { chromium } = loadPlaywright();
const svg = readFileSync(join(root, "public/favicon.svg"), "utf8");

const browser = await chromium.launch();

/** Renders the icon at one edge length and returns the PNG bytes. */
async function render(size) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent}
     svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
  );
  await page.waitForTimeout(60);
  const buf = await page.screenshot({ omitBackground: true });
  await page.close();
  return buf;
}

const sizes = [16, 32, 48, 96, 180];
const made = new Map();
for (const s of sizes) made.set(s, await render(s));
await browser.close();

writeFileSync(join(root, "public/favicon-96.png"), made.get(96));
writeFileSync(join(root, "public/apple-touch-icon.png"), made.get(180));
writeFileSync(
  join(root, "public/favicon.ico"),
  buildIco([16, 32, 48].map((size) => ({ size, data: made.get(size) }))),
);

for (const f of ["favicon-96.png", "apple-touch-icon.png", "favicon.ico"]) {
  console.log("wrote public/" + f);
}
