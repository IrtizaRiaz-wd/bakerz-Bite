import { useMemo, useRef, useState } from "react";
import { Search, Star } from "lucide-react";
import { CATEGORIES, PRODUCTS, formatPKR, type Category, type Product } from "@/data/products";
import { filterProducts, type SortKey } from "@/lib/catalogue";
import { useReveal } from "@/lib/motion";
import { Placeholder } from "./Placeholder";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function Stars({ value, className }: { value: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className ?? ""}`} aria-label={`${value.toFixed(1)} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-3 w-3 ${i <= Math.round(value) ? "fill-current" : "opacity-30"}`} />
      ))}
    </span>
  );
}

export function Catalogue() {
  const [cat, setCat] = useState<Category | "All">("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [active, setActive] = useState<Product | null>(null);
  const list = useMemo(() => filterProducts(PRODUCTS, { category: cat, query: q, sort }), [cat, q, sort]);
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section ref={ref} id="catalogue" className="section-light scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="reveal eyebrow mb-5 text-mocha">The Catalogue</p>
            <h2 className="reveal display-lg">Choose your little moment.</h2>
          </div>
          <p className="reveal text-muted-foreground md:col-span-4 md:col-start-9">
            Sample menu and prices in PKR. Filter by world, search by flavour, sort by price.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-y py-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            {(["All", ...CATEGORIES] as const).map((c) => (
              <button key={c} className="chip" data-active={cat === c} aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <label className="relative flex items-center">
              <Search className="absolute left-0 h-4 w-4 text-muted-foreground" />
              <input className="field pl-7 sm:w-64" placeholder="Search chocolate, mango…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search products" />
            </label>
            <select className="field sm:w-48" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Sort products">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>

        <p className="eyebrow mt-6 text-muted-foreground">{list.length} creations</p>

        <div className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p, i) => (
            <article key={p.id} className="group flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: `${(i % 8) * 50}ms` }}>
              <button onClick={() => setActive(p)} className="text-left" aria-label={`View ${p.name}`}>
                <Placeholder label={`${p.name} image`} tone={i % 3 === 0 ? "dark" : i % 3 === 1 ? "rose" : "lav"} className="aspect-[4/5]" />
              </button>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-[0.6rem] text-muted-foreground">{p.category}</p>
                  <h3 className="mt-1 text-2xl">{p.name}</h3>
                </div>
                <p className="whitespace-nowrap pt-5 text-sm tabular-nums">{formatPKR(p.price)}</p>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">{p.ingredients.join(" · ")}</p>
              <div className="mt-4 flex items-center justify-between">
                <Stars value={p.rating} className="text-mocha" />
                <button onClick={() => setActive(p)} className="nav-link eyebrow text-[0.62rem]">View details →</button>
              </div>
            </article>
          ))}
          {list.length === 0 && <p className="col-span-full py-20 text-center text-muted-foreground">Nothing matches that — try another flavour.</p>}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto rounded-none border-0 bg-vanilla p-0 sm:rounded-none">
          {active && (
            <div className="grid md:grid-cols-2">
              <Placeholder label={`${active.name} image`} tone="dark" className="aspect-square md:aspect-auto md:min-h-[480px]" />
              <div className="flex flex-col p-8 md:p-10">
                <p className="eyebrow text-mocha">{active.category}</p>
                <DialogTitle className="font-display mt-3 text-4xl font-normal">{active.name}</DialogTitle>
                <div className="mt-3 flex items-center gap-3 text-sm">
                  <Stars value={active.rating} className="text-mocha" /> {active.rating.toFixed(1)}
                </div>
                <DialogDescription className="mt-6 text-base text-foreground/80">{active.description}</DialogDescription>
                <p className="eyebrow mt-8 text-muted-foreground">Ingredients</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {active.ingredients.map((x) => <li key={x} className="border px-3 py-1 text-xs">{x}</li>)}
                </ul>
                <div className="mt-auto flex items-center justify-between border-t pt-6">
                  <span className="font-display text-3xl">{formatPKR(active.price)}</span>
                  <span className="text-xs text-muted-foreground">Sample price · ordering not active</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
