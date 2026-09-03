/**
 * Bakes the alpha channel into the consultancy photo.
 *
 * `Img_2.webp` was exported flattened onto a white studio backdrop. That used
 * to be knocked out at runtime by an SVG filter, which had two problems: a CSS
 * filter runs on the element as rendered, so the browser downsampled the photo
 * 1:3 before the keyer ever saw it and left a rim of white-to-subject blends
 * behind, and `filter: url(#...)` is simply not applied at all in some mobile
 * browsers, leaving the white box on screen. Doing it once, here, at full
 * resolution removes both failure modes.
 *
 * Run with `node scripts/cut-consultancy-photo.mjs` from the project root; it
 * only needs re-running if the source photo is replaced.
 */
import sharp from "sharp";

const SRC = "public/section_2/Img_2.webp";
const OUT = "public/section_2/Img_2-cutout.webp";

/**
 * Luminance above which a pixel counts as backdrop. Deliberately high: only
 * pixels this bright seed the fill, and the edge itself is handled below by a
 * model that does not need a threshold at all.
 */
const BACKDROP = 0.96;

/** How many pixels in from the backdrop are treated as edge. */
const RINGS = 2;

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: w, height: h, channels: ch } = info;

const lum = new Float32Array(w * h);
for (let i = 0, p = 0; i < w * h; i++, p += ch) {
  lum[i] = (0.2126 * data[p] + 0.7152 * data[p + 1] + 0.0722 * data[p + 2]) / 255;
}

/*
 * Only backdrop CONNECTED to the border is knocked out, so a bright highlight
 * inside the subject — the table top, a shirt collar — can never be punched
 * into a hole.
 */
const outside = new Uint8Array(w * h);
const stack = [];
for (let x = 0; x < w; x++) stack.push(x, (h - 1) * w + x);
for (let y = 0; y < h; y++) stack.push(y * w, y * w + w - 1);
while (stack.length) {
  const i = stack.pop();
  if (outside[i] || lum[i] < BACKDROP) continue;
  outside[i] = 1;
  const x = i % w;
  const y = (i / w) | 0;
  if (x > 0) stack.push(i - 1);
  if (x < w - 1) stack.push(i + 1);
  if (y > 0) stack.push(i - w);
  if (y < h - 1) stack.push(i + w);
}

/* Rings of subject pixels working inward from the backdrop — the transition. */
const ring = new Int8Array(w * h).fill(-1);
let front = [];
for (let i = 0; i < w * h; i++) if (outside[i]) front.push(i);
for (let r = 0; r < RINGS; r++) {
  const next = [];
  for (const i of front) {
    const x = i % w;
    const y = (i / w) | 0;
    for (let dy = -1; dy <= 1; dy++)
      for (let dx = -1; dx <= 1; dx++) {
        const xx = x + dx;
        const yy = y + dy;
        if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
        const j = yy * w + xx;
        if (outside[j] || ring[j] !== -1) continue;
        ring[j] = r;
        next.push(j);
      }
  }
  front = next;
}

/*
 * The edge model.
 *
 * The source crosses from backdrop to subject in a pixel or two, and those
 * pixels are a blend: P = a*C + (1-a)*1, where C is the subject colour behind
 * them. Keying on a fixed luminance leaves them opaque and light, which is
 * what read as a white stroke around the cut-out. Solving for `a` against the
 * subject luminance actually adjacent to each one recovers both the coverage
 * and the colour, so the edge carries no trace of the backdrop it came from.
 */
const solidNeighbourLum = (i) => {
  const x = i % w;
  const y = (i / w) | 0;
  let best = -1;
  for (let dy = -1; dy <= 1; dy++)
    for (let dx = -1; dx <= 1; dx++) {
      const xx = x + dx;
      const yy = y + dy;
      if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
      const j = yy * w + xx;
      if (outside[j] || ring[j] !== -1) continue;
      if (best < 0 || lum[j] < best) best = lum[j];
    }
  return best;
};

const out = Buffer.alloc(w * h * 4);
let cut = 0;
let soft = 0;
for (let i = 0; i < w * h; i++) {
  const s = i * ch;
  const d = i * 4;
  let a = 1;
  if (outside[i]) {
    a = 0;
    cut++;
  } else if (ring[i] !== -1) {
    const C = solidNeighbourLum(i);
    // No solid pixel in reach: a lone speck of backdrop noise, so drop it.
    a = C < 0 ? 0 : Math.max(0, Math.min(1, (1 - lum[i]) / Math.max(1e-3, 1 - C)));
    if (a > 0 && a < 1) soft++;
  }
  if (a >= 1) {
    out[d] = data[s];
    out[d + 1] = data[s + 1];
    out[d + 2] = data[s + 2];
  } else if (a <= 0) {
    out[d] = out[d + 1] = out[d + 2] = 0;
  } else {
    for (let c = 0; c < 3; c++) {
      out[d + c] = Math.max(0, Math.min(255, Math.round((data[s + c] - 255 * (1 - a)) / a)));
    }
  }
  out[d + 3] = Math.round(a * 255);
}

await sharp(out, { raw: { width: w, height: h, channels: 4 } })
  .webp({ quality: 82, alphaQuality: 100, effort: 6 })
  .toFile(OUT);

console.log({ w, h, knockedOut: cut, softEdge: soft, pctCut: ((100 * cut) / (w * h)).toFixed(1) + "%" });
