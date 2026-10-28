import { describe, expect, it } from "vitest";
import { PRODUCTS } from "@/data/products";
import { averageRating, filterProducts } from "@/lib/catalogue";

describe("catalogue", () => {
  it("filters by category", () => {
    const r = filterProducts(PRODUCTS, { category: "Pies", query: "", sort: "featured" });
    expect(r.every((p) => p.category === "Pies")).toBe(true);
    expect(r.length).toBe(4);
  });
  it("searches ingredients", () => {
    const r = filterProducts(PRODUCTS, { category: "All", query: "mango", sort: "featured" });
    expect(r.map((p) => p.id)).toEqual(["i3"]);
  });
  it("sorts by price ascending", () => {
    const r = filterProducts(PRODUCTS, { category: "All", query: "", sort: "price-asc" });
    expect(r[0].price).toBe(260);
  });
  it("averages ratings to one decimal", () => {
    expect(averageRating([5, 4, 5])).toBe(4.7);
  });
});
