import { useRef, useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { formatPKR } from "@/data/products";
import { useReveal } from "@/lib/motion";
import { Placeholder } from "./Placeholder";

type Kind = "Mugs" | "Bags" | "Glasses" | "Trays";
const MERCH: { id: string; name: string; kind: Kind; price: number; note: string }[] = [
  { id: "m1", name: "Espresso Ceramic Mug", kind: "Mugs", price: 1800, note: "Matte mocha glaze, platinum rim" },
  { id: "m2", name: "Lavender Latte Mug", kind: "Mugs", price: 1900, note: "Pale lavender, hand-dipped" },
  { id: "b1", name: "Vanilla Market Tote", kind: "Bags", price: 1500, note: "Heavy canvas, embroidered mark" },
  { id: "b2", name: "Mocha Pastry Bag", kind: "Bags", price: 1200, note: "Reusable, wipe-clean lining" },
  { id: "g1", name: "Ribbed Drinking Glass", kind: "Glasses", price: 1100, note: "Set of two, etched logo" },
  { id: "t1", name: "Platinum Serving Tray", kind: "Trays", price: 4200, note: "Brushed steel, oval" },
];

export function Merch() {
  const [kind, setKind] = useState<Kind | "All">("All");
  const [bag, setBag] = useState<string[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const list = MERCH.filter((m) => kind === "All" || m.kind === kind);
  const bagItems = bag.map((id) => MERCH.find((m) => m.id === id)!);
  const total = bagItems.reduce((s, m) => s + m.price, 0);

  return (
    <section ref={ref} id="merch" className="section-lavender relative scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="reveal eyebrow mb-5 text-mocha">The House Collection</p>
            <h2 className="reveal display-lg max-w-2xl">Objects for slow mornings.</h2>
          </div>
          <button onClick={() => setBagOpen(true)} className="btn-ink self-start md:self-auto" aria-label={`Open demo bag, ${bag.length} items`}>
            <ShoppingBag className="h-4 w-4" /> Bag ({bag.length})
          </button>
        </div>
        <div className="mt-10 flex flex-wrap gap-2">
          {(["All", "Mugs", "Bags", "Glasses", "Trays"] as const).map((k) => (
            <button key={k} className="chip border-espresso/20" data-active={kind === k} onClick={() => setKind(k)} aria-pressed={kind === k}>{k}</button>
          ))}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-6">
          {list.map((m, i) => (
            <article key={m.id} className={`group animate-in fade-in duration-700 ${i % 3 === 0 ? "md:col-span-3" : "md:col-span-3 lg:col-span-3"} ${i % 4 === 1 ? "lg:mt-20" : ""}`}>
              <Placeholder label={`${m.name.toUpperCase()} PLACEHOLDER`} tone={i % 2 ? "rose" : "dark"} className="aspect-[5/4]" />
              <div className="mt-5 flex items-end justify-between gap-4 border-b border-espresso/15 pb-5">
                <div>
                  <p className="eyebrow text-[0.6rem] text-mocha">{m.kind}</p>
                  <h3 className="mt-1 text-3xl">{m.name}</h3>
                  <p className="mt-1 text-sm opacity-70">{m.note}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm tabular-nums">{formatPKR(m.price)}</p>
                  <button className="nav-link eyebrow mt-2 text-[0.6rem]" onClick={() => setBag((b) => [...b, m.id])}>Add to bag +</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {bagOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label="Demo shopping bag" onKeyDown={(e) => e.key === "Escape" && setBagOpen(false)}>
          <button className="absolute inset-0 bg-espresso/60 animate-in fade-in" aria-label="Close bag" onClick={() => setBagOpen(false)} />
          <div className="section-light relative flex h-full w-full max-w-md flex-col p-8 animate-in slide-in-from-right duration-500">
            <div className="flex items-center justify-between">
              <h3 className="display-md">Your bag</h3>
              <button onClick={() => setBagOpen(false)} aria-label="Close" autoFocus><X /></button>
            </div>
            <ul className="mt-8 flex-1 space-y-4 overflow-y-auto">
              {bagItems.length === 0 && <li className="text-muted-foreground">Empty — for now.</li>}
              {bagItems.map((m, i) => (
                <li key={i} className="flex items-center justify-between border-b pb-4">
                  <span>{m.name}</span>
                  <span className="flex items-center gap-4 text-sm tabular-nums">{formatPKR(m.price)}
                    <button aria-label={`Remove ${m.name}`} onClick={() => setBag((b) => b.filter((_, j) => j !== i))}><X className="h-3 w-3" /></button>
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t pt-6">
              <div className="flex justify-between"><span className="eyebrow">Total</span><span className="font-display text-2xl">{formatPKR(total)}</span></div>
              <p className="mt-4 text-xs text-muted-foreground">Demonstration only — checkout and payments are not connected.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
