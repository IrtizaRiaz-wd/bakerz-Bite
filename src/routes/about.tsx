import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Footer";
import { Placeholder } from "@/components/site/Placeholder";
import { CATEGORIES } from "@/data/products";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Bakerz Bite" },
      { name: "description", content: "The story and philosophy behind Bakerz Bite, an artisan patisserie in Karachi." },
      { property: "og:title", content: "About Bakerz Bite" },
      { property: "og:description", content: "Patience, butter and craft — the Bakerz Bite philosophy." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main>
      <PageHero eyebrow="About Us" title="Desserts treated like small works of art." intro="[Placeholder story — replace with the bakery's real history.] Bakerz Bite is a Karachi patisserie built around slow methods and generous flavour." />
      <section className="section-light px-6 py-28 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-12">
          <Placeholder label="BAKERZ BITE CINEMATIC BAKERY BANNER PLACEHOLDER" tone="dark" className="aspect-[4/5] md:col-span-5" />
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-mocha">Philosophy</p>
            <h2 className="display-lg mt-5">Patience is the secret ingredient.</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2">
              {[
                ["Slow", "Doughs rest overnight; laminations take days, not hours."],
                ["Honest", "Real butter, real chocolate, seasonal fruit."],
                ["Beautiful", "Every piece is finished by hand, to be looked at before it's eaten."],
                ["Local", "Made fresh every morning in Karachi."],
              ].map(([t, d]) => (
                <div key={t} className="border-t pt-5"><h3 className="text-3xl">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section-rose px-6 py-24 md:px-10">
        <div className="mx-auto max-w-[1500px]">
          <h2 className="display-md">What we make</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link key={c} to="/" hash={c.toLowerCase()} className="group">
                <Placeholder label={`${c.toUpperCase()} PLACEHOLDER`} tone="dark" className="aspect-square" />
                <p className="font-display mt-4 text-3xl">{c} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
