/**
 * Where each step's marker falls on the flow curve.
 *
 * Solved off `public/flow_section/snake.svg` by asking the path where the
 * fraction in `STEPS[n].at` lands, in that file's own 1441.44 x 560.66 viewBox.
 * They are written out rather than computed at runtime so the copy is in the
 * right place in the very first frame, before any script has run.
 *
 * To regenerate after changing a fraction — or the curve — run this against the
 * path in the browser console:
 *
 *   const L = path.getTotalLength();
 *   STEPS.map(s => path.getPointAtLength(s.at * L));
 */
export const ROADMAP_NODES = [
  { x: 93.1, y: 556.2 },
  { x: 329.8, y: 328.2 },
  { x: 492.8, y: 288.6 },
  { x: 693.3, y: 4.9 },
  { x: 852.5, y: 123.9 },
  { x: 855.8, y: 295.8 },
  { x: 986.2, y: 527.2 },
  { x: 1265.8, y: 239.9 },
];
