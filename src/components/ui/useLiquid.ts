"use client";

import { useCallback, useState, type CSSProperties, type PointerEvent } from "react";

/**
 * Drives the liquid hover fill.
 *
 * Returns the props a pill needs to flood with its opposite brand colour from
 * wherever the pointer crossed its edge. The origin is only rewritten while
 * the circle is scaled to nothing, so it is never seen jumping between hovers.
 */
export function useLiquid<T extends HTMLElement>() {
  const [liquid, setLiquid] = useState<"in" | "out">("out");
  const [origin, setOrigin] = useState<CSSProperties>({});

  const onPointerEnter = useCallback((e: PointerEvent<T>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setOrigin({
      "--lx": `${e.clientX - r.left}px`,
      "--ly": `${e.clientY - r.top}px`,
    } as CSSProperties);
    setLiquid("in");
  }, []);

  return {
    liquidStyle: origin,
    liquidProps: {
      "data-liquid": liquid,
      onPointerEnter,
      onPointerLeave: () => setLiquid("out"),
      onFocus: () => setLiquid("in"),
      onBlur: () => setLiquid("out"),
    },
  };
}
