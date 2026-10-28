import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { CATEGORIES } from "@/data/products";

function useKarachiClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  if (!now) return { date: "—", time: "—" };
  const tz = "Asia/Karachi";
  return {
    date: now.toLocaleDateString("en-GB", { timeZone: tz, weekday: "long", day: "numeric", month: "long", year: "numeric" }),
    time: now.toLocaleTimeString("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit" }),
  };
}

/** Counts visits from THIS browser only (localStorage). Not a global total. */
function useDeviceVisits() {
  const [n, setN] = useState<number | null>(null);
  useEffect(() => {
    const key = "bb-visits";
    const session = sessionStorage.getItem("bb-session");
    let v = Number(localStorage.getItem(key) ?? 0);
    if (!session) {
      v += 1;
      localStorage.setItem(key, String(v));
      sessionStorage.setItem("bb-session", "1");
    }
    setN(v);
  }, []);
  return n;
}

export function Ticker() {
  const { date, time } = useKarachiClock();
  const item = (
    <span className="flex items-center gap-10 px-5">
      <span>{date}</span><span aria-hidden>✦</span>
      <span className="tabular-nums">{time} PKT</span><span aria-hidden>✦</span>
      <span>Karachi, Pakistan</span><span aria-hidden>✦</span>
      <span>Fresh from the oven every morning</span><span aria-hidden>✦</span>
    </span>
  );
  return (
    <div className="section-dark overflow-hidden border-b hairline py-2 text-[0.65rem] uppercase tracking-[0.28em]" aria-live="off">
      <div className="ticker-track">{item}{item}{item}{item}</div>
    </div>
  );
}

const NAV = [
  { to: "/", hash: "gallery", label: "Gallery" },
  { to: "/", hash: "merch", label: "Merchandise" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const visits = useDeviceVisits();

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 300 && y > last + 4);
      if (y < last - 4) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${hidden && !open ? "-translate-y-full" : ""} ${scrolled ? "bg-espresso/85 backdrop-blur-md" : ""}`}
    >
      <Ticker />
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 text-vanilla md:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Bakerz Bite home">
          <span className="flex h-9 w-9 items-center justify-center border border-platinum/50 text-[0.45rem] leading-tight tracking-widest" title="[BAKERZ BITE LOGO PLACEHOLDER]">LOGO</span>
          <span className="font-display text-xl tracking-[0.2em]">BAKERZ BITE</span>
        </Link>

        <nav className="hidden items-center gap-8 text-[0.68rem] uppercase tracking-[0.24em] lg:flex" aria-label="Main">
          <div className="group relative">
            <button className="nav-link flex items-center gap-1" aria-haspopup="true">
              Menu <ChevronDown className="h-3 w-3 transition-transform duration-500 group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all duration-500 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="section-dark min-w-56 border hairline p-2">
                {CATEGORIES.map((c) => (
                  <Link key={c} to="/" hash={c.toLowerCase()} className="block px-4 py-3 transition-colors hover:bg-mocha">{c}</Link>
                ))}
                <Link to="/" hash="catalogue" className="block border-t hairline px-4 py-3 text-lavender hover:bg-mocha">Full catalogue</Link>
              </div>
            </div>
          </div>
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} hash={"hash" in n ? n.hash : undefined} className="nav-link" activeOptions={{ exact: true, includeHash: true }}>{n.label}</Link>
          ))}
          <span className="border-l hairline pl-6 text-platinum/80" title="Counted in this browser only — not a global visitor total">
            Your visits: <span className="tabular-nums text-vanilla">{visits ?? "—"}</span>
          </span>
        </nav>

        <button className="lg:hidden" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <div className={`section-dark overflow-hidden transition-[max-height,opacity] duration-700 lg:hidden ${open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-1 px-6 pb-8 pt-2" aria-label="Mobile">
          {CATEGORIES.map((c) => (
            <Link key={c} to="/" hash={c.toLowerCase()} onClick={() => setOpen(false)} className="font-display py-2 text-3xl">{c}</Link>
          ))}
          <div className="my-3 border-t hairline" />
          {NAV.map((n) => (
            <Link key={n.label} to={n.to} hash={"hash" in n ? n.hash : undefined} onClick={() => setOpen(false)} className="eyebrow py-2">{n.label}</Link>
          ))}
          <Link to="/sitemap" onClick={() => setOpen(false)} className="eyebrow py-2">Sitemap</Link>
          <p className="eyebrow mt-4 text-platinum/70">Your visits on this device: {visits ?? "—"}</p>
        </nav>
      </div>
    </header>
  );
}
