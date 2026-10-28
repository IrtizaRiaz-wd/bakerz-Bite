import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Story beats: shown when scroll progress is inside [from, to]. */
const BEATS = [
  { from: 0.12, to: 0.3, eyebrow: "Chapter I — The Approach", title: "Every creation begins with patience.", side: "left" },
  { from: 0.32, to: 0.5, eyebrow: "Chapter II — The Layers", title: "Sponge, cream, ganache. Built by hand, one tier at a time.", side: "right" },
  { from: 0.52, to: 0.7, eyebrow: "Chapter III — The Craft", title: "Ribbons of cream. Drifts of cocoa. Nothing rushed.", side: "left" },
  { from: 0.76, to: 1.01, eyebrow: "Chapter IV — The Collection", title: "Cakes, pastries, cookies & pies.", side: "center" },
] as const;

export function Experience() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const reduced = prefersReducedMotion();
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      gsap.registerPlugin(ScrollTrigger);
      if (disposed) return;

      let scene: import("@/experience/scene").BakeryScene | null = null;
      try {
        const test = document.createElement("canvas");
        if (!test.getContext("webgl2") && !test.getContext("webgl")) throw new Error("no webgl");
        const { createBakeryScene } = await import("@/experience/scene");
        if (disposed) return;
        scene = createBakeryScene(canvasRef.current!, { mobile: window.innerWidth < 768, reducedMotion: reduced });
      } catch {
        setWebgl(false);
      }

      const ctx = gsap.context(() => {
        // Hero typography entrance
        ScrollTrigger.create({
          trigger: wrap.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (st) => {
            const p = st.progress;
            scene?.setProgress(p);
            if (heroRef.current) {
              const h = Math.min(1, p / 0.1);
              heroRef.current.style.opacity = String(1 - h);
              heroRef.current.style.transform = `translateY(${-h * 60}px)`;
              heroRef.current.style.pointerEvents = h > 0.5 ? "none" : "auto";
            }
            BEATS.forEach((b, i) => {
              const el = beatRefs.current[i];
              if (!el) return;
              const span = b.to - b.from;
              const local = (p - b.from) / span;
              const o = local < 0 || local > 1 ? 0 : Math.min(1, local * 5, (1 - local) * 5 + (b.to > 1 ? 5 : 0));
              el.style.opacity = String(o);
              el.style.transform = `translateY(${(1 - Math.min(1, local * 4)) * 30}px)`;
              el.style.pointerEvents = o > 0.5 ? "auto" : "none";
            });
            if (barRef.current) barRef.current.style.transform = `scaleY(${p})`;
          },
        });
      }, wrap);

      const onMove = (e: PointerEvent) => {
        if (reduced) return;
        scene?.setPointer((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
      };
      window.addEventListener("pointermove", onMove);
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        ctx.revert();
        scene?.dispose();
      };
    })();
    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <section ref={wrap} className="section-dark relative h-[600vh]" aria-label="The Bakerz Bite story">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />
        {!webgl && (
          <div className="ph ph-dark absolute inset-0"><span className="ph-label">[BAKERZ BITE CINEMATIC BAKERY BANNER PLACEHOLDER — 3D unavailable on this device]</span></div>
        )}
        <div className="vignette pointer-events-none absolute inset-0" />
        <div className="grain pointer-events-none absolute inset-0" />

        {/* Hero */}
        <div ref={heroRef} className="absolute inset-0 flex flex-col justify-end px-6 pb-16 md:px-10 md:pb-20">
          <div className="mx-auto w-full max-w-[1500px]">
            <p className="hero-fade eyebrow mb-6 text-lavender">Bakerz Bite — Karachi Patisserie</p>
            <h1 className="display-xl max-w-5xl">
              <span className="hero-line block overflow-hidden"><span className="hero-rise block">Life's Better With</span></span>
              <span className="hero-line block overflow-hidden"><span className="hero-rise block italic [animation-delay:0.55s] text-rose">A Little Sweetness.</span></span>
            </h1>
            <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="hero-fade max-w-md text-platinum/85">
                Artisan desserts, beautiful creations, and little moments worth savouring.
              </p>
              <div className="hero-fade flex flex-wrap gap-3">
                <Link to="/" hash="catalogue" className="btn-cine">Explore our creations</Link>
                <Link to="/about" className="btn-ghost-cine">Our story</Link>
              </div>
            </div>
          </div>
          <div className="hero-fade absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
            <span className="eyebrow text-[0.55rem] text-platinum/70">Scroll</span>
            <span className="scroll-cue block h-10 w-px bg-platinum/70" />
          </div>
        </div>

        {/* Story beats */}
        {BEATS.map((b, i) => (
          <div
            key={b.eyebrow}
            ref={(el) => { beatRefs.current[i] = el; }}
            className={`pointer-events-none absolute inset-0 flex px-6 opacity-0 md:px-16 ${
              b.side === "left" ? "items-center justify-start" : b.side === "right" ? "items-center justify-end text-right" : "items-end justify-center pb-24 text-center"
            }`}
          >
            <div className="max-w-md">
              <p className="eyebrow mb-5 text-lavender-muted">{b.eyebrow}</p>
              <h2 className="display-md">{b.title}</h2>
              {b.side === "center" && (
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {["cakes", "pastries", "cookies", "pies"].map((c) => (
                    <Link key={c} to="/" hash={c} className="btn-ghost-cine capitalize">{c}</Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Progress rail */}
        <div className="absolute right-5 top-1/2 hidden h-40 w-px -translate-y-1/2 bg-platinum/20 md:block">
          <div ref={barRef} className="h-full w-full origin-top scale-y-0 bg-lavender" />
        </div>
      </div>
    </section>
  );
}
