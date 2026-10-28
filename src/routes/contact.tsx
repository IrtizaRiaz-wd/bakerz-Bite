import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHero } from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Bakerz Bite" },
      { name: "description", content: "Contact Bakerz Bite in Karachi for orders, celebration cakes and enquiries." },
      { property: "og:title", content: "Contact Bakerz Bite" },
      { property: "og:description", content: "Get in touch with our Karachi patisserie." },
    ],
  }),
  component: Contact,
});

// Editable placeholders — replace with real details.
const INFO = { email: "[hello@bakerzbite.example]", address: "[Street, Area], Karachi, Pakistan", phone: "[+92 XXX XXXXXXX]" };

function Contact() {
  const [f, setF] = useState({ name: "", email: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) er.email = "Please enter a valid email.";
    if (f.message.trim().length < 10) er.message = "Message should be at least 10 characters.";
    setErr(er);
    if (!Object.keys(er).length) { setSent(true); setF({ name: "", email: "", message: "" }); }
  };
  return (
    <main>
      <PageHero eyebrow="Contact Us" title="Say hello. Order something sweet." />
      <section className="section-light px-6 py-24 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-16 md:grid-cols-12">
          <dl className="space-y-8 md:col-span-4">
            {[["Email", INFO.email], ["Visit", INFO.address], ["Call", INFO.phone], ["Hours", "[Opening hours placeholder]"]].map(([k, v]) => (
              <div key={k} className="border-t pt-4"><dt className="eyebrow text-mocha">{k}</dt><dd className="font-display mt-2 text-2xl">{v}</dd></div>
            ))}
          </dl>
          <form onSubmit={submit} noValidate className="space-y-8 md:col-span-7 md:col-start-6">
            {(["name", "email"] as const).map((k) => (
              <label key={k} className="block">
                <span className="eyebrow text-[0.6rem] capitalize">{k}</span>
                <input type={k === "email" ? "email" : "text"} className="field" value={f[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} aria-invalid={!!err[k]} />
                {err[k] && <span className="mt-1 block text-xs text-destructive">{err[k]}</span>}
              </label>
            ))}
            <label className="block">
              <span className="eyebrow text-[0.6rem]">Message</span>
              <textarea rows={5} className="field resize-none" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} aria-invalid={!!err.message} />
              {err.message && <span className="mt-1 block text-xs text-destructive">{err.message}</span>}
            </label>
            <button className="btn-ink">Send message</button>
            {sent && <p role="status" className="text-sm text-mocha">Thanks — this demo form validated your message, but it isn't delivered anywhere yet.</p>}
          </form>
        </div>
      </section>
    </main>
  );
}
