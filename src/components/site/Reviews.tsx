import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { averageRating } from "@/lib/catalogue";
import { useReveal } from "@/lib/motion";
import { Stars } from "./Catalogue";

type Review = { name: string; rating: number; text: string; sample?: boolean };
// Clearly-labelled sample testimonials (not real customers).
const SAMPLE: Review[] = [
  { name: "Sample reviewer A", rating: 5, text: "The ganache cake was the quiet star of our dinner.", sample: true },
  { name: "Sample reviewer B", rating: 4, text: "Croissants that actually shatter. Worth the early trip.", sample: true },
  { name: "Sample reviewer C", rating: 5, text: "Beautifully packed cookie tin — a perfect gift.", sample: true },
];
const KEY = "bb-reviews"; // stored in this browser's localStorage only

export function Reviews() {
  const [mine, setMine] = useState<Review[]>([]);
  const [form, setForm] = useState({ name: "", rating: 0, text: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [ok, setOk] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  useEffect(() => {
    try { setMine(JSON.parse(localStorage.getItem(KEY) ?? "[]")); } catch { /* ignore */ }
  }, []);

  const all = [...mine, ...SAMPLE];
  const avg = averageRating(all.map((r) => r.rating));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    const name = form.name.trim(), text = form.text.trim();
    if (name.length < 2 || name.length > 60) er.name = "Please enter your name (2–60 characters).";
    if (form.rating < 1) er.rating = "Choose a rating.";
    if (text.length < 10 || text.length > 500) er.text = "Review should be 10–500 characters.";
    setErrors(er);
    if (Object.keys(er).length) return;
    const next = [{ name, rating: form.rating, text }, ...mine];
    setMine(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    setForm({ name: "", rating: 0, text: "" });
    setOk(true);
  };

  return (
    <section ref={ref} id="reviews" className="section-mocha scroll-mt-24 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1500px] gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="reveal eyebrow mb-5 text-lavender">Kind Words</p>
          <div className="reveal flex items-end gap-6">
            <span className="display-xl">{avg.toFixed(1)}</span>
            <div className="pb-4"><Stars value={avg} className="text-rose" /><p className="mt-2 text-xs text-platinum/70">Average of {all.length} reviews (incl. samples)</p></div>
          </div>
          <ul className="mt-12 space-y-8">
            {all.map((r, i) => (
              <li key={i} className="border-t hairline pt-6 animate-in fade-in duration-700">
                <p className="font-display text-2xl italic">“{r.text}”</p>
                <div className="mt-3 flex items-center gap-4 text-xs uppercase tracking-[0.2em] text-platinum/75">
                  <Stars value={r.rating} className="text-rose" /> {r.name}{r.sample && " · sample"}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={submit} noValidate className="reveal self-start border hairline p-8 lg:col-span-5 lg:sticky lg:top-32">
          <h3 className="display-md">Leave a review</h3>
          <p className="mt-2 text-xs text-platinum/70">Saved in this browser only — not shared with other visitors.</p>
          <label className="mt-8 block">
            <span className="eyebrow text-[0.6rem]">Name</span>
            <input className="field field-dark" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} />
            {errors.name && <span className="mt-1 block text-xs text-rose">{errors.name}</span>}
          </label>
          <fieldset className="mt-6">
            <legend className="eyebrow text-[0.6rem]">Rating</legend>
            <div className="mt-3 flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button type="button" key={n} onClick={() => setForm({ ...form, rating: n })} aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={form.rating === n}>
                  <Star className={`h-6 w-6 transition-transform hover:scale-110 ${n <= form.rating ? "fill-rose text-rose" : "text-platinum/50"}`} />
                </button>
              ))}
            </div>
            {errors.rating && <span className="mt-1 block text-xs text-rose">{errors.rating}</span>}
          </fieldset>
          <label className="mt-6 block">
            <span className="eyebrow text-[0.6rem]">Review</span>
            <textarea rows={4} className="field field-dark resize-none" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} aria-invalid={!!errors.text} />
            {errors.text && <span className="mt-1 block text-xs text-rose">{errors.text}</span>}
          </label>
          <button className="btn-cine mt-8">Submit review</button>
          {ok && <p className="mt-4 text-sm text-lavender" role="status">Thank you — your review is now shown.</p>}
        </form>
      </div>
    </section>
  );
}
