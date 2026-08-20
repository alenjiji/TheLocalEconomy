# The Local Economy — site build

Next.js 15 (App Router) + TypeScript. Every section is rebuilt 1:1 from
`public/design/web_tle.png` using the exports that ship beside it in `public/`.

| Section | Comp rows | Assets |
| --- | --- | --- |
| Hero | 0 – 956 | `public/hero/` |
| Comprehensive Brand Programmes | 956 – 1780 | `public/section_2/` |
| Growth carousel | 1780 – 2272 | `public/section2_extend/`, `public/bg_grains_overlay.png` |
| What Changes When You Work With TLE? | 2272 – 4308 | `public/section_3/` |
| Footer | 5183 – 5613 | `public/footer/` |

The testimonials block (comp rows 4308 – 5183) is deliberately skipped, so the
footer follows the results section directly.

```bash
npm run dev
```

## How the layout scales

The comp is drawn on a **1440-wide** artboard (confirmed by `navbar_bg.svg`,
which is exactly 1440 × 144.56). Every offset is written in those design units
and multiplied by a single custom property:

```css
--u: calc(min(100vw, 1600px) / 1440);
```

So `left: calc(78.24 * var(--u))` puts the headline exactly where the comp puts
it. There are two modes:

**Comp mode, 1280px and up.** Pixel-faithful. The scale is capped at 1600px, so
past that every section centres its content on the same axis — the hero stage
and the card row are both centred, not offset from the left edge — while the
full-bleed backgrounds carry on to both edges. Body copy runs 13.3px at 1280 up
to 16.7px at 1600+.

**Fluid mode, below 1280px.** Scaling the comp down any further drops the card
body copy under 12px, so the layout re-flows instead of shrinking:

- The hero headline becomes a centred column. Inside it every element is sized
  as a **percentage of the headline width**, using the ratios the comp uses at
  1440 — the sub-heads and flourish keep their exact relationship to the
  headline at any column width. Percentage margins resolve against that width,
  which carries the vertical rhythm along with it.
- The programme cards become a centred flex row of as many cards as fit, each
  capped at 440px. Every card is a **container**, deriving its own `--u` from
  its own width via `100cqw`, so all the comp's internal offsets hold without a
  second set of numbers. A row that cannot hold all three centres the remainder
  rather than stranding it in the first column.
- `--m` (one unit of a 390-wide phone artboard, capped at 520px) drives the nav
  and the section chrome.

Body copy holds at 16px from 1279px down to about 600px, then tracks the card
width down to 12.8px on a 390px phone. There is no horizontal overflow at any
width from 320px to 2560px.

**The fluid arrangement is an interpretation, not a spec** — the comp only
covers desktop. Replace it when narrower comps arrive.

## Typography

Most of the hero ships as outlined SVG; the nav links, CTA label and all of
section two's copy are live text. The face is **Inter**, identified by
rasterising the outlines in `navbar_Button.svg` and pixel-comparing them against
every plausible Google font — Inter Medium matched at 0.85 IoU against 0.63 for
the runner-up, and the same method settled each weight in section two.

| Where | Face |
| --- | --- |
| Nav links | Inter 400 / 19.57px |
| Nav CTA | Inter 500 / 27.01px |
| Section heading | Inter 600 / 36.96px |
| Card body copy | Inter 300 / 15px, 18px leading |
| "Consultancy" | Inter 600 / 42.41px |
| Card 1 name / role | Inter 500 and Inter 300 / ~20px |
| Carousel icon label | Inter 600 / 17.9px, 20.88px leading |
| Carousel headline | Inter 700 / 19.61px |
| Carousel body | Inter 300 / 14.35px, 17.4px leading |
| Stat value | Inter 500 / 60.48px |
| Stat caption | Inter 300 / 20.15px, 23.76px leading |
| Section eyebrow | Inter 600 / 36.9px |
| Lede | Inter 300 / 28px, 34.08px leading |
| Step number / label | Inter 500 / 31.81px and Inter 600 / 23.76px |
| Step head / body | Inter 600 and Inter 300 / 17.98px |
| Footer column heading | Inter 600 / 15px |
| Footer links, contact, tagline | Inter 300 / 15px |
| Footer legal | Inter 300 / 13.02px |

**Manrope** appears only inside the two programme lockups. Those exports left
their wordmarks as live `<text>` rather than outlines, and an SVG loaded through
`<img>` cannot reach the page's webfonts — so `total_biz_fix.svg` and
`360_degree.svg` are inlined as components (`TotalBizFixLockup`,
`BusinessCheckupLockup`) where the loaded Manrope applies. The heart in the
second lockup was a base64 PNG inside that file; it now sits beside it as
`checkup-heart.png`.

## Section two notes

- **Grain.** The comp lays a fine noise over the near-black ground and, at about
  a third of the strength, over the dark cards. `section_2/grain.png` is a 180px
  tile of white at low alpha; the cards dilute it with a flat wash on top. It is
  deliberately not scaled by `--u` — film grain belongs to the device, not the
  layout.
- **Consultancy photo.** `Img_2.webp` was exported flattened onto white. An SVG
  filter turns luminance into alpha and inverts it with a steep ramp, so only
  near-white drops out and the (much darker) table and furniture survive. The
  result is composited back against the source's own alpha, or the transparent
  edge of the filter region renders as opaque black.
- **Card CTAs are rebuilt as live buttons.** They shipped as flat SVG art with
  the label baked in, which cannot be recoloured, localised or animated. They
  are now `PillButton`s — Inter 500 / 19.95px on the comp's pill geometry,
  verified back to within a pixel of the export — which is what lets the liquid
  hover work on them.

## Growth carousel notes

- **Background.** `bg_grains_overlay.png` is the comp's own grain, exported at
  design scale with a 1px artboard border baked into its top and bottom rows.
  It is drawn as an `<img>` with `object-fit: cover`, which crops those rows
  away and keeps the noise at 1:1. (Section two still uses its procedural tile;
  the two match closely enough that the seam between them is invisible, but this
  asset could replace it.)
- **Column grid is normalised.** The comp's three columns are not evenly spaced:
  the two inner divider rules sit ~14px right of exact thirds and the middle
  slide's content ~11px right of its column. The outer rules and the first and
  third slides land on a regular 1280 / 3 grid exactly, so the build uses that
  grid — a carousel needs even slides. The visible effect is the middle slide
  moving ~11px left of the comp.
- **Per-slide icon inset.** The comp optically aligns each mark rather than
  flushing it — 0, 10.1 and 9.9 units in from the content edge — so that offset
  is carried per slide.
- **Vertical anchoring.** The icon sits against a fixed line at the top, the CTA
  against a fixed line at the bottom, and the headline + body group hangs from
  the body's last line. That is why the middle slide's three-line body pushes
  its headline higher without moving anything else.
- **Button exports are not in slide order**: `button_1.svg` carries "See What We
  Do" and `button_3.svg` carries "Join for Business Success".
- **Arrows and dots are inert.** The comp advertises seven slides and only three
  have copy. They render as real, labelled buttons ready to wire up.

## Results section notes

- **Four bands on one canvas.** The light stat strip, the cyan promise card that
  straddles its lower edge, the dark roadmap and the amber closing band all sit
  on a single absolutely-positioned canvas. Each band's wrapper is
  `display: contents` in comp mode, so its children keep positioning against the
  section; below 1280px the wrappers become real blocks and the section flows.
- **The headline is two exports.** `text_3.svg` carries "What Changes / When You"
  in white and `text_1.svg` carries "Work With TLE?" in cyan. They share one box
  sized to their union (772.7 x 138.47) with the halves placed as percentages,
  so the pair scales together.
- **The step paragraphs are not uniform.** The comp justifies five of the eight
  and leaves the three narrowest ragged-right — forcing justify on those
  stretches two-word lines across the measure. It also varies the gap between
  sub-head and body from step to step. Both are carried per step in
  `src/lib/results.ts` rather than smoothed away.
- **The serpentine track is desktop-only.** `el_5.svg` is 1503 units wide and
  bleeds off both edges of the 1440 canvas. It cannot survive a narrow column,
  so below 1280px it is dropped and the eight steps become an ordinary numbered
  grid.
- The closing band paints from a real element rather than a pseudo: `::after`
  paints after the content and would cover the band's own copy.

## Footer notes

- **The CTA button is shared.** The comp draws the same 326.2 x 53.59 amber
  button in the nav bar and in the footer's call to action, down to the arrow,
  so it lives in `src/components/ui/ConsultationButton.tsx`. Position comes from
  the caller; the fluid layout turns it into a container that scales from its own
  width.
- **Two exports carry outlined text**: `text_1.svg` is the two-line call to
  action and `text_2.svg` the copyright line. The four contact marks are
  `icon_1`–`icon_4`.
- **The contact rows are pitched evenly at 38 units but the icons are not** —
  each mark is a different height and sits on its own baseline, so icon and text
  offsets are carried separately per row.

## Motion

Everything animates `opacity`, `transform`/`translate`, `clip-path` or
`stroke-dashoffset` — no layout, no repaint of the heavy raster layers. Every
keyframe set ends on the comp's resting composition, so each section still
measures against the design once it settles.

- **Scroll-in reveals.** `InView` (`src/components/motion/`) flags a subtree
  with `data-inview` via IntersectionObserver; the `u-rise` / `u-pop` utilities
  in `globals.css` key off that, staggered with `--d`. They use the `translate`
  property rather than `transform`, because most of this layout already
  positions with transforms and a reveal must not overwrite them. The hidden
  state is scoped to `html.js`, set by an inline script before first paint — so
  with scripting unavailable nothing is ever stuck invisible.
- **Liquid buttons.** Hover floods a pill with its opposite brand colour from
  wherever the pointer crossed the edge: amber fills blue, blue fills amber,
  and the label swaps with it. The circle is only repositioned while it is
  scaled to nothing, so a second hover never shows it jump (`useLiquid`).
- **The roadmap types itself.** See below.

## The roadmap timeline

Section four's eight steps type in numbered order when the band scrolls into
view, the serpentine track draws left to right in step, and each node marker
grows out of the line as its step begins.

The whole thing is one declarative clock: `src/lib/roadmapTimeline.ts` computes
every character's delay at module load from a seeded generator (so the server
and client agree and React sees no mismatch), and the animations sit
`paused` until `data-inview` releases them. The cadence is jittered per
character, with extra rest after spaces and punctuation, so it reads like
typing rather than a metronome. End to end it runs about 7.5 seconds.

Two consequences of splitting text into per-character spans, both handled:

- **Automatic hyphenation stops working** — a browser will not hyphenate across
  element boundaries. The three bodies the comp hyphenates carry soft hyphens
  (U+00AD) at those exact points instead, with `hyphens: manual`.
- **Kerning is lost between letters**, so the same words take marginally more
  room. Seven of the eight measures were unaffected; step 05's is widened by
  five units to hold the comp's five-line break.

Spaces stay plain text nodes rather than spans — wrapping them, or swapping in
non-breaking spaces, removes the browser's soft-wrap opportunities and the
paragraphs run straight past their measure.

## Hero backdrop motion

`bg-elements.svg` is 1.2MB, and 1.14MB of that is sixteen embedded rasters — the
perspective grid, the glows and the large labels. So it is split in two,
complementary halves that reproduce the original exactly when stacked:

- `public/hero/bg-elements-static.svg` — the original minus the animated vectors.
  Still an `<img>`, so the rasters stay out of the JS bundle. It drifts as one
  plane on a 46s cycle, which reads as depth rather than movement.
- `src/components/hero/HeroBackdropMotion.tsx` — the ~19KB of vector that was
  inside it, inlined so each piece can be driven on its own: two data curves
  that draw in left-to-right on load then breathe, nine tick marks that pulse
  off their own beats, and six numeric readouts that blink the way a live feed
  re-samples.

The split is generated from the export by classifying leaves on `fill`; re-run
it if the comp's backdrop changes. Everything animates `opacity`, `transform`
or `clip-path` only, and every keyframe set *ends* on the resting state, so the
reduced-motion path lands on the comp's static composition — verified at a 5.54
mean difference against the comp, the same as the un-animated baseline.

## Known deviation: the portrait

`DSC_3834.webp` matches the comp on the head, collar and torso at a uniform
0.2715 scale, but the arms and hands sit ~10px apart from the comp — the comp
was composed from a different frame of the same shoot. The portrait is placed to
match the head and torso and keeps its true aspect ratio rather than being
stretched to chase the arms. Swapping in the exact frame used for the comp would
close the gap.

## Structure

```
src/app/layout.tsx           Inter via next/font, page shell
src/app/globals.css          reset + the --u / --m scale units
src/app/page.tsx
src/components/hero/Hero.tsx            artwork layers, headline, slide dots
src/components/hero/NavBar.tsx          logo, links, CTA
src/components/section2/Programmes.tsx  heading + the three programme cards
src/components/section2/*Lockup.tsx     the two inlined Manrope lockups
src/lib/design.ts            hero constants measured off the comp
src/lib/programmes.ts        section-two copy and card constants
```
