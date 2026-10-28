import { useRef } from "react";
import { useReveal } from "@/lib/motion";
import { Placeholder } from "./Placeholder";

const WORLDS = [
  { id: "cakes", n: "01", title: "Cakes", sub: "Celebration, sculpted.", copy: "Layered sponges, mirror-glossed ganache and hand-piped detail — cakes designed to be the centre of the table.", cls: "section-dark", tone: "dark" as const, label: "CAKES 3D MODEL / IMAGE PLACEHOLDER", reverse: false },
  { id: "pastries", n: "02", title: "Pastries", sub: "Golden, laminated, light.", copy: "Croissants, éclairs and danishes, folded with cultured butter and baked to a shatter at dawn.", cls: "section-rose", tone: "rose" as const, label: "PASTRIES 3D MODEL / IMAGE PLACEHOLDER", reverse: true },
  { id: "cookies", n: "03", title: "Cookies", sub: "Warm mocha, molten centres.", copy: "Brown butter, dark chocolate puddles and a whisper of sea salt. Best eaten still warm.", cls: "section-mocha", tone: "dark" as const, label: "COOKIES 3D MODEL / IMAGE PLACEHOLDER", reverse: false },
  { id: "pies", n: "04", title: "Pies", sub: "Lattice, fruit, vanilla light.", copy: "Hand-woven crusts holding seasonal fruit and slow-cooked caramels, set for sharing.", cls: "section-light", tone: "lav" as const, label: "PIES 3D MODEL / IMAGE PLACEHOLDER", reverse: true },
];

export function Worlds() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  return (
    <div ref={ref}>
      {WORLDS.map((w) => (
        <section key={w.id} id={w.id} className={`${w.cls} relative scroll-mt-24 overflow-hidden px-6 py-28 md:px-10 md:py-40`}>
          <div className={`mx-auto grid max-w-[1500px] items-center gap-12 md:grid-cols-12 ${w.reverse ? "" : ""}`}>
            <div className={`md:col-span-5 ${w.reverse ? "md:order-2 md:col-start-8" : ""}`}>
              <p className="reveal eyebrow mb-6 opacity-70">{w.n} — World</p>
              <h2 className="reveal display-xl">{w.title}</h2>
              <p className="reveal display-md mt-4 italic opacity-80" data-delay="0.1">{w.sub}</p>
              <p className="reveal mt-8 max-w-sm opacity-80" data-delay="0.2">{w.copy}</p>
            </div>
            <div className={`reveal group md:col-span-7 ${w.reverse ? "md:order-1" : ""}`} data-delay="0.15">
              <div className="grid grid-cols-5 gap-4">
                <Placeholder label={w.label} tone={w.tone} className="col-span-3 aspect-[3/4]" />
                <div className="col-span-2 flex flex-col gap-4 pt-16">
                  <Placeholder label={`${w.title} detail`} tone={w.tone === "dark" ? "rose" : "dark"} className="aspect-square" />
                  <Placeholder label={`${w.title} texture`} tone={w.tone} className="aspect-[3/4]" />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
