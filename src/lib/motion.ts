/**
 * Shared motion helpers.
 *
 * Anything random here must be *deterministic* — the same values have to come
 * out on the server and on the client, or React will flag a hydration
 * mismatch. So every "random" figure is drawn from a seeded generator rather
 * than `Math.random`.
 */

/** Mulberry32 — small, fast, and stable across runtimes. */
export function seededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type TypedChar = { char: string; at: number };

/**
 * Lay out one string as characters with cumulative, uneven delays.
 *
 * A constant interval reads like a machine. Real typing bunches up inside
 * words and pauses at the joins, so each step is jittered and punctuation and
 * spaces get a little extra rest.
 */
export function typeOut(
  text: string,
  opts: { start: number; perChar: number; jitter?: number; seed: number },
): { chars: TypedChar[]; end: number } {
  const { start, perChar, jitter = 0.85, seed } = opts;
  const rand = seededRandom(seed);
  let at = start;
  const chars = Array.from(text).map((char) => {
    const here = at;
    // 1 ± jitter, so a run of characters speeds up and drags unevenly.
    let step = perChar * (1 + (rand() - 0.5) * 2 * jitter);
    if (char === " ") step += perChar * 0.5;
    if (",.:;!?".includes(char)) step += perChar * 2.4;
    at += Math.max(perChar * 0.15, step);
    return { char, at: here };
  });
  return { chars, end: at };
}
