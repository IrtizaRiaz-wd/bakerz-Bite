import type { Category, Product } from "@/data/products";

export type SortKey = "featured" | "price-asc" | "price-desc";

export function filterProducts(list: Product[], o: { category: Category | "All"; query: string; sort: SortKey }) {
  const q = o.query.trim().toLowerCase();
  const out = list.filter(
    (p) =>
      (o.category === "All" || p.category === o.category) &&
      (!q || [p.name, p.description, ...p.ingredients].join(" ").toLowerCase().includes(q)),
  );
  if (o.sort === "price-asc") out.sort((a, b) => a.price - b.price);
  if (o.sort === "price-desc") out.sort((a, b) => b.price - a.price);
  return out;
}

export function averageRating(ratings: number[]) {
  if (!ratings.length) return 0;
  return Math.round((ratings.reduce((s, r) => s + r, 0) / ratings.length) * 10) / 10;
}
