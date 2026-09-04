"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./Roadmap.module.css";
import { STEPS } from "@/lib/results";

/**
 * The flow line and its markers.
 *
 * The line is `public/flow_section/snake.svg` verbatim. Each marker is placed
 * by asking the path itself where a given fraction of its length falls — so a
 * marker can never sit off the line, and moving a step is a matter of nudging
 * one number in `lib/results.ts` rather than re-measuring coordinates.
 *
 * The stroke is drawn on with `pathLength="1"`, which normalises the dash
 * arithmetic: the reveal runs 1 → 0 whatever the path's real length is, and the
 * markers pop as the line reaches them because each one's delay is its own
 * fraction of the same clock.
 */
const PATH =
  "M0,556.16h152.85c77.59,0,140.73-62.44,141.59-140.02l.09-7.91c.68-61.03,50.35-110.14,111.38-110.14h43.31c57.83,0,104.7-46.88,104.7-104.7v-37.96c0-83.73,68.16-151.46,151.89-150.93h0c82.98.53,149.97,67.95,149.97,150.93v228.28c0,79.98,65.12,144.67,145.1,144.13h0c79.23-.53,143.18-64.9,143.18-144.13v-50.24c0-51.67,41.89-93.56,93.56-93.56h203.83";

/** The marker, from `public/flow_section/point_cursor.svg`. */
function Marker({ x, y, side, delay }: { x: number; y: number; side: string; delay: number }) {
  // The stem points from the marker toward its copy.
  const turn = side === "above" ? 180 : side === "right" ? -90 : 0;
  /*
   * Two groups, and the split matters.
   *
   * An SVG `transform` attribute IS the CSS transform property, so it obeys
   * `transform-origin` — and `.node` sets `fill-box` centring for its pop. That
   * origin sits below the circle, because the group's box includes the stem, so
   * every marker whose stem was not pointing straight down came out displaced
   * from the line: 25 units for a 180° turn, 12.5 in each axis for 90°. Which
   * is precisely why 01, 02, 05 and 06 sat off the stroke and 03, 04, 07 and 08
   * did not.
   *
   * The outer group carries the placement against the viewBox origin; the inner
   * one carries the animation against its own box.
   */
  return (
    <g className={styles.nodeAnchor} transform={`translate(${x} ${y}) rotate(${turn})`}>
      <g className={styles.node} style={{ "--at": `${delay}` } as React.CSSProperties}>
        <g className={styles.nodeStem}>
          <rect x="-0.93" y="8.15" width="1.86" height="29.49" fill="#00adee" />
          <polygon points="-7.6,31.48 -6.24,30.21 0,36.92 6.24,30.21 7.6,31.48 0,39.65" fill="#00adee" />
        </g>
        <circle r="15.27" fill="#00adee" />
        <circle r="7.5" fill="#282727" />
      </g>
    </g>
  );
}

export default function RoadmapTrack({ className }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [nodes, setNodes] = useState<{ x: number; y: number; side: string; at: number }[]>([]);

  // The browser resolves the geometry; nothing here has to know the curve.
  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;
    const len = el.getTotalLength();
    setNodes(
      STEPS.map((s) => {
        const p = el.getPointAtLength(s.at * len);
        return { x: p.x, y: p.y, side: s.side, at: s.at };
      }),
    );
  }, []);

  return (
    <svg className={className} viewBox="0 0 1441.44 560.66" fill="none" aria-hidden="true">
      <path
        className={styles.line}
        ref={pathRef}
        d={PATH}
        pathLength="1"
        stroke="#00adee"
        strokeWidth="9"
        strokeLinecap="round"
        strokeMiterlimit="10"
      />
      {nodes.map((n, i) => (
        <Marker key={i} x={n.x} y={n.y} side={n.side} delay={n.at} />
      ))}
    </svg>
  );
}
