# Design source

Reference material for the build, kept out of `public/` on purpose.

`public/` is copied verbatim into the static export, so anything left in there
ships to every visitor whether or not a page loads it. These three files —
the 25MB comp and two 14MB background plates — were doing exactly that: 38MB
of the deploy that no code has ever requested.

- `web_tle.png` — the comp every section is measured against. The design-unit
  offsets throughout `src/lib` are read off this file.
- `BG copy.jpg`, `BG 2 copy.jpg` — unused background plates.
- `bg_grains_overlay.png` — the growth carousel's original grain, at 822KB. The
  dark sections now share one tiled 31KB grain declared on `:root`, which is
  what removed the visible seams between them.
