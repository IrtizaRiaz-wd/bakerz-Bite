import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Footer";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap — Bakerz Bite" },
      { name: "description", content: "Every page and section of the Bakerz Bite website." },
      { property: "og:title", content: "Bakerz Bite Sitemap" },
      { property: "og:description", content: "Find your way around Bakerz Bite." },
    ],
  }),
  component: Sitemap,
});

const HOME = ["catalogue", "cakes", "pastries", "cookies", "pies", "offers", "merch", "gallery", "reviews"];

function Sitemap() {
  return (
    <main>
      <PageHero eyebrow="Sitemap" title="Everything, in one place." />
      <section className="section-light px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-14 md:grid-cols-2">
          <div>
            <h2 className="display-md">Home</h2>
            <ul className="mt-6 space-y-3">
              <li><Link to="/" className="nav-link">Opening story</Link></li>
              {HOME.map((h) => <li key={h}><Link to="/" hash={h} className="nav-link capitalize">{h === "merch" ? "Merchandise" : h}</Link></li>)}
            </ul>
          </div>
          <div>
            <h2 className="display-md">Pages</h2>
            <ul className="mt-6 space-y-3">
              <li><Link to="/about" className="nav-link">About Us</Link></li>
              <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
              <li><Link to="/faq" className="nav-link">FAQ</Link></li>
              <li><Link to="/sitemap" className="nav-link">Sitemap</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
