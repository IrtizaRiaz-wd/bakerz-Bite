import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="section-dark relative overflow-hidden px-6 pb-10 pt-24 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <p className="display-xl text-rose/90">Bakerz Bite</p>
        <div className="mt-16 grid gap-10 border-t hairline pt-10 text-sm md:grid-cols-4">
          <div>
            <p className="eyebrow mb-4 text-lavender-muted">Visit</p>
            <p>[Street address], Karachi, Pakistan</p>
          </div>
          <div>
            <p className="eyebrow mb-4 text-lavender-muted">Explore</p>
            <ul className="space-y-2">
              <li><Link to="/" hash="catalogue" className="nav-link">Catalogue</Link></li>
              <li><Link to="/" hash="offers" className="nav-link">Offers</Link></li>
              <li><Link to="/" hash="merch" className="nav-link">Merchandise</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-4 text-lavender-muted">House</p>
            <ul className="space-y-2">
              <li><Link to="/about" className="nav-link">About Us</Link></li>
              <li><Link to="/contact" className="nav-link">Contact Us</Link></li>
              <li><Link to="/faq" className="nav-link">FAQ</Link></li>
              <li><Link to="/sitemap" className="nav-link">Sitemap</Link></li>
            </ul>
          </div>
          <p className="text-xs text-platinum/60 md:text-right">
            Demonstration website. Prices are samples; online ordering and payments are not active.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="section-dark grain relative px-6 pb-20 pt-48 md:px-10">
      <div className="mx-auto max-w-[1500px]">
        <p className="eyebrow mb-6 text-lavender-muted">{eyebrow}</p>
        <h1 className="display-xl max-w-5xl">{title}</h1>
        {intro && <p className="mt-8 max-w-xl text-platinum/80">{intro}</p>}
      </div>
    </section>
  );
}
