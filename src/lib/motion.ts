import { useEffect, type RefObject } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fades/raises every `.reveal` element inside `root` as it scrolls into view. */
export function useReveal(root: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const items = el.querySelectorAll<HTMLElement>(".reveal");
      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }
      ctx = gsap.context(() => {
        items.forEach((item) => {
          gsap.to(item, {
            opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
            delay: Number(item.dataset.delay ?? 0),
            scrollTrigger: { trigger: item, start: "top 88%" },
          });
        });
      }, el);
    })();
    return () => { cancelled = true; ctx?.revert(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
