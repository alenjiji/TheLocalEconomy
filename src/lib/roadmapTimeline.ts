import { STEPS } from "./results";
import { typeOut, type TypedChar } from "./motion";

/**
 * When every character of the roadmap gets typed, in milliseconds from the
 * moment the section scrolls into view.
 *
 * Computed once at module load from a seeded generator, so the server and the
 * client agree on every delay and React has nothing to complain about.
 *
 * Steps run strictly 01 → 08. Each one types its number, then its label, then
 * its sub-head, then its body; the next step starts while the current body is
 * still going, which keeps the whole run under seven seconds without making
 * any single line feel rushed.
 */
const NUMBER_PER_CHAR = 34;
const LABEL_PER_CHAR = 20;
const HEAD_PER_CHAR = 12;
const BODY_PER_CHAR = 5;
const AFTER_LABEL = 80;
const AFTER_HEAD = 90;
/** Fraction of a body that must be typed before the next step may begin. */
const OVERLAP = 0.25;

export type StepTimeline = {
  /** When this step's node marker pops on the track. */
  node: number;
  number: TypedChar[];
  label: TypedChar[];
  heading: TypedChar[];
  body: TypedChar[];
};

function build() {
  const steps: StepTimeline[] = [];
  let cursor = 0;

  STEPS.forEach((step, i) => {
    const seed = 1013 + i * 7919;
    const node = cursor;

    const number = typeOut(step.number, { start: cursor, perChar: NUMBER_PER_CHAR, seed });
    const label = typeOut(step.label, { start: number.end, perChar: LABEL_PER_CHAR, seed: seed + 1 });
    const heading = typeOut(step.heading, {
      start: label.end + AFTER_LABEL,
      perChar: HEAD_PER_CHAR,
      seed: seed + 2,
    });
    const body = typeOut(step.body, {
      start: heading.end + AFTER_HEAD,
      perChar: BODY_PER_CHAR,
      seed: seed + 3,
    });

    steps.push({ node, number: number.chars, label: label.chars, heading: heading.chars, body: body.chars });
    cursor = body.chars[0].at + (body.end - body.chars[0].at) * OVERLAP;
  });

  const last = steps[steps.length - 1];
  const total = last.body[last.body.length - 1].at + BODY_PER_CHAR * 4;
  return { steps, total, trackDuration: steps[steps.length - 1].node };
}

export const ROADMAP_TIMELINE = build();
