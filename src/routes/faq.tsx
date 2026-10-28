import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Bakerz Bite" },
      { name: "description", content: "Answers about ordering, custom cakes, ingredients and delivery at Bakerz Bite." },
      { property: "og:title", content: "Bakerz Bite FAQ" },
      { property: "og:description", content: "Common questions about our Karachi bakery." },
    ],
  }),
  component: Faq,
});

const QA = [
  ["How far ahead should I order a celebration cake?", "We suggest at least 48 hours for tiered cakes. [Confirm real lead time.]"],
  ["Can I order online?", "Not yet — this website is a demonstration and online ordering is not active. Please contact us directly."],
  ["Do you offer eggless or nut-free options?", "[Placeholder — add your real dietary options.] Ingredients are listed on every product."],
  ["Do you deliver in Karachi?", "[Placeholder — add delivery areas and fees.]"],
  ["How should I store pastries?", "Pastries are best the day they're baked. Cakes keep refrigerated for 2–3 days."],
];

function Faq() {
  return (
    <main>
      <PageHero eyebrow="FAQ" title="Questions, answered sweetly." />
      <section className="section-light px-6 py-24 md:px-10">
        <Accordion type="single" collapsible className="mx-auto max-w-3xl">
          {QA.map(([q, a], i) => (
            <AccordionItem key={i} value={String(i)}>
              <AccordionTrigger className="font-display py-6 text-left text-2xl font-normal hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}
