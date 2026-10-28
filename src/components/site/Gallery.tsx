import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useReveal } from "@/lib/motion";
import { Placeholder } from "./Placeholder";

const ITEMS = [
  { label: "CAKES GALLERY PLACEHOLDER", cls: "md:col-span-2 md:row-span-2", tone: "dark" as const },
  { label: "BAKING PLACEHOLDER", cls: "", tone: "rose" as const },
  { label: "PASTRY PREPARATION PLACEHOLDER", cls: "", tone: "lav" as const },
  { label: "PACKAGING PLACEHOLDER", cls: "md:row-span-2", tone: "rose" as const },
  { label: "BAKERY INTERIOR PLACEHOLDER", cls: "md:col-span-2", tone: "dark" as const },
  { label: "MERCHANDISE PLACEHOLDER", cls: "", tone: "lav" as const },
];

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const go = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + ITEMS.length) % ITEMS.length)), []);

  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [idx, go]);

  return (
    <section ref={ref} id="gallery" className="section-light scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-14 flex items-end justify-between">
          <h2 className="reveal display-lg">Inside the <em>oven light.</em></h2>
          <p className="reveal eyebrow hidden text-muted-foreground md:block">Gallery — {ITEMS.length} frames</p>
        </div>
        <div className="grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {ITEMS.map((it, i) => (
            <button key={it.label} onClick={() => setIdx(i)} className={`reveal group overflow-hidden ${it.cls}`} aria-label={`Open ${it.label.toLowerCase()}`} data-delay={String(i * 0.05)}>
              <Placeholder label={it.label} tone={it.tone} className="h-full w-full" />
            </button>
          ))}
        </div>
      </div>

      {idx !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/95 p-4 animate-in fade-in duration-500" role="dialog" aria-modal="true" aria-label="Gallery lightbox" onClick={() => setIdx(null)}>
          <div key={idx} className="w-full max-w-4xl animate-in zoom-in-95 fade-in duration-500" onClick={(e) => e.stopPropagation()}>
            <Placeholder label={ITEMS[idx].label} tone={ITEMS[idx].tone} className="aspect-[16/10] w-full" />
            <p className="eyebrow mt-4 text-center text-platinum">{idx + 1} / {ITEMS.length}</p>
          </div>
          <button className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-vanilla md:left-8" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous image"><ChevronLeft className="h-8 w-8" /></button>
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-vanilla md:right-8" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next image"><ChevronRight className="h-8 w-8" /></button>
          <button className="absolute right-4 top-4 p-3 text-vanilla" onClick={() => setIdx(null)} aria-label="Close lightbox" autoFocus><X className="h-6 w-6" /></button>
        </div>
      )}
    </section>
  );
}
