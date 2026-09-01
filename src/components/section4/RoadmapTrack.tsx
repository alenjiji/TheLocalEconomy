import type { CSSProperties } from "react";

import { ROADMAP_TIMELINE } from "@/lib/roadmapTimeline";
import styles from "./Roadmap.module.css";

/**
 * `el_5.svg` inlined.
 *
 * The export is only 4KB and already separates the serpentine track from its
 * eight node markers, so inlining it costs almost nothing and lets the line
 * draw itself while each marker pops as its step starts typing.
 *
 * The path runs right-to-left, so the reveal animates `stroke-dashoffset` from
 * -1 to 0 rather than 1 to 0 — that grows it from the path's end, which is the
 * left edge, matching the order the steps are numbered in.
 */
export default function RoadmapTrack({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1503.1 344.82"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="roadmap-linear-gradient" x1="0" y1="171.87" x2="1503.1" y2="171.87" gradientTransform="translate(0)" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#00adee" />
          <stop offset="1" stopColor="#f5a623" />
        </linearGradient>
      </defs>
      <g>
        <path d="M1503.1,39.01h-37.5c-53.65,0-97.15,41.69-97.15,93.12v79.47c0,51.43-43.5,93.12-97.15,93.12h-114.35c-53.65,0-97.15-41.69-97.15-93.12v-79.47c0-51.43-43.5-93.12-97.15-93.12h-114.35c-53.65,0-97.15,41.69-97.15,93.12v79.47c0,51.43-43.5,93.12-97.15,93.12h-114.35c-53.65,0-97.15-41.69-97.15-93.12v-79.47c0-51.43-43.5-93.12-97.15-93.12h-114.35c-53.65,0-97.15,41.69-97.15,93.12v79.47c0,51.43-43.5,93.12-97.15,93.12H0" fill="none" stroke="url(#roadmap-linear-gradient)" strokeMiterlimit="10" strokeWidth="15.57" className={styles.line} pathLength="1" />
        <g className={styles.node} style={{ "--node-at": `${Math.round(ROADMAP_TIMELINE.steps[5].node)}ms` } as CSSProperties}>
          <g>
            <rect x="906.71" y="2.02" width="1.86" height="29.49" fill="#8fa977" />
            <polygon points="915.24 8.18 913.88 9.44 907.64 2.73 901.4 9.44 900.04 8.18 907.64 0 915.24 8.18" fill="#8fa977" />
          </g>
          <circle cx="907.64" cy="39.65" r="15.27" fill="#8fa977" />
          <circle cx="907.64" cy="39.65" r="7.5" fill="#282727" />
        </g>
        <g className={styles.node} style={{ "--node-at": `${Math.round(ROADMAP_TIMELINE.steps[1].node)}ms` } as CSSProperties}>
          <g>
            <rect x="292.1" y="2.02" width="1.86" height="29.49" fill="#27acce" />
            <polygon points="300.63 8.18 299.27 9.44 293.03 2.73 286.79 9.44 285.42 8.18 293.03 0 300.63 8.18" fill="#27acce" />
          </g>
          <circle cx="293.03" cy="39.65" r="15.27" fill="#27acce" />
          <circle cx="293.03" cy="39.65" r="7.5" fill="#231f20" />
        </g>
        <g className={styles.node} style={{ "--node-at": `${Math.round(ROADMAP_TIMELINE.steps[7].node)}ms` } as CSSProperties}>
          <g>
            <rect x="1220.96" y="313.31" width="1.86" height="29.49" fill="#c3a74c" />
            <polygon points="1214.29 336.64 1215.65 335.37 1221.89 342.09 1228.13 335.37 1229.49 336.64 1221.89 344.82 1214.29 336.64" fill="#c3a74c" />
          </g>
          <circle cx="1221.89" cy="305.17" r="15.27" fill="#c3a74c" />
          <circle cx="1221.89" cy="305.17" r="7.5" fill="#282727" />
        </g>
        <g className={styles.node} style={{ "--node-at": `${Math.round(ROADMAP_TIMELINE.steps[3].node)}ms` } as CSSProperties}>
          <g>
            <rect x="598.73" y="313.31" width="1.86" height="29.49" fill="#5baaa2" />
            <polygon points="592.06 336.64 593.42 335.37 599.66 342.09 605.9 335.37 607.26 336.64 599.66 344.82 592.06 336.64" fill="#5baaa2" />
          </g>
          <circle cx="599.66" cy="305.17" r="15.27" fill="#5baaa2" />
          <circle cx="599.66" cy="305.17" r="7.5" fill="#282727" />
        </g>
        <g className={styles.node} style={{ "--node-at": `${Math.round(ROADMAP_TIMELINE.steps[2].node)}ms` } as CSSProperties}>
          <g>
            <g>
              <rect x="450.41" y="170.18" width="29.49" height="1.86" fill="#48abb2" />
              <polygon points="473.74 178.71 472.47 177.35 479.19 171.11 472.47 164.87 473.74 163.5 481.91 171.11 473.74 178.71" fill="#48abb2" />
            </g>
            <circle cx="442.27" cy="171.11" r="15.27" fill="#48abb2" />
          </g>
          <circle cx="442.27" cy="171.11" r="7.5" fill="#282727" />
        </g>
        <g className={styles.node} style={{ "--node-at": `${Math.round(ROADMAP_TIMELINE.steps[4].node)}ms` } as CSSProperties}>
          <g>
            <g>
              <rect x="758.8" y="170.18" width="29.49" height="1.86" fill="#7aa988" />
              <polygon points="782.13 178.71 780.86 177.35 787.57 171.11 780.86 164.87 782.13 163.5 790.3 171.11 782.13 178.71" fill="#7aa988" />
            </g>
            <circle cx="750.66" cy="171.11" r="15.27" fill="#7aa988" />
          </g>
          <circle cx="750.66" cy="171.11" r="7.5" fill="#282727" />
        </g>
        <g className={styles.node} style={{ "--node-at": `${Math.round(ROADMAP_TIMELINE.steps[6].node)}ms` } as CSSProperties}>
          <g>
            <g>
              <rect x="1067.19" y="170.18" width="29.49" height="1.86" fill="#aca860" />
              <polygon points="1090.52 178.71 1089.25 177.35 1095.96 171.11 1089.25 164.87 1090.52 163.5 1098.69 171.11 1090.52 178.71" fill="#aca860" />
            </g>
            <circle cx="1059.04" cy="171.11" r="15.27" fill="#aca860" />
          </g>
          <circle cx="1059.04" cy="171.11" r="7.5" fill="#282727" />
        </g>
        <g className={styles.node} style={{ "--node-at": `${Math.round(ROADMAP_TIMELINE.steps[0].node)}ms` } as CSSProperties}>
          <g>
            <g>
              <rect x="141.02" y="170.18" width="29.49" height="1.86" fill="#15acdc" />
              <polygon points="164.35 178.71 163.08 177.35 169.79 171.11 163.08 164.87 164.35 163.5 172.52 171.11 164.35 178.71" fill="#15acdc" />
            </g>
            <circle cx="132.88" cy="171.11" r="15.27" fill="#15acdc" />
          </g>
          <circle cx="132.88" cy="171.11" r="7.5" fill="#282727" />
        </g>
      </g>
    </svg>
  );
}
