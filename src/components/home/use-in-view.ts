"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Whether the element is on screen (at least `threshold` of it), whether it has ever been, and whether the browser
 * has measured it yet. Before the first measurement nothing should be hidden, so the page works without scripts.
 */
export function useInView<T extends Element>(threshold = 0.35) {
  const ref = useRef<T>(null);
  const [state, setState] = useState({ inView: false, seen: false, measured: false });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setState((s) => ({ inView: entry.isIntersecting, seen: s.seen || entry.isIntersecting, measured: true })),
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, state] as const;
}

/** True when the visitor asked the system for less motion. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    const first = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(first);
      query.removeEventListener("change", update);
    };
  }, []);
  return reduced;
}
