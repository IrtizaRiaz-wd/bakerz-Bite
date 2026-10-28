import { useRef } from "react";
import { useReveal } from "@/lib/motion";
import { Placeholder } from "./Placeholder";

const OFFERS = [
  { t: "Celebration Cake Package", d: "Any two-tier cake, a dozen macarons and a hand-lettered plaque.", price: "Rs 8,900", tag: "Save 15%", valid: "Valid on orders placed 48h ahead · sample offer" },
  { t: "The Pastry Box", d: "Six morning pastries chosen by the bakers.", price: "Rs 2,700", tag: "6 for 5", valid: "Daily until 11am · sample offer" },
  { t: "Cookie Gift Bundle", d: "Twelve cookies in a ribbon-tied keepsake tin.", price: "Rs 3,200", tag: "Free tin", valid: "While tins last · sample offer" },
  { t: "Weekend Pie Special", d: "Any whole pie with a pint of vanilla cream.", price: "Rs 2,400", tag: "Sat — Sun", valid: "Weekends only · sample offer" },
];

export function Offers() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section ref={ref} id="offers" className="section-dark grain relative scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <p className="reveal eyebrow mb-5 text-lavender-muted">Special Offers</p>
        <h2 className="reveal display-lg max-w-3xl">Sweeter, <em className="text-rose">together.</em></h2>
        <div className="mt-16 divide-y divide-platinum/15 border-y hairline">
          {OFFERS.map((o, i) => (
            <article key={o.t} className="reveal group grid items-center gap-6 py-10 md:grid-cols-12" data-delay={String(i * 0.05)}>
              <span className="font-display text-5xl text-lavender-muted md:col-span-1">0{i + 1}</span>
              <div className="md:col-span-5">
                <h3 className="text-4xl transition-transform duration-700 group-hover:translate-x-3">{o.t}</h3>
                <p className="mt-3 text-platinum/75">{o.d}</p>
                <p className="mt-2 text-xs text-platinum/50">{o.valid}</p>
              </div>
              <div className="md:col-span-2">
                <span className="eyebrow border border-lavender/40 px-3 py-1.5 text-lavender">{o.tag}</span>
                <p className="font-display mt-4 text-3xl">{o.price}</p>
              </div>
              <Placeholder label={`${o.t} image`} tone={i % 2 ? "lav" : "rose"} className="aspect-[16/9] md:col-span-4" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
