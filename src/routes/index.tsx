import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/site/Experience";
import { Worlds } from "@/components/site/Worlds";
import { Catalogue } from "@/components/site/Catalogue";
import { Offers } from "@/components/site/Offers";
import { Merch } from "@/components/site/Merch";
import { Gallery } from "@/components/site/Gallery";
import { Reviews } from "@/components/site/Reviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bakerz Bite — Cinematic Artisan Bakery, Karachi" },
      { name: "description", content: "Life's better with a little sweetness. Artisan cakes, pastries, cookies and pies from Bakerz Bite, Karachi." },
      { property: "og:title", content: "Bakerz Bite — Cinematic Artisan Bakery" },
      { property: "og:description", content: "Artisan desserts, beautiful creations, and little moments worth savouring." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Experience />
      <Worlds />
      <Catalogue />
      <Offers />
      <Merch />
      <Gallery />
      <Reviews />
    </main>
  );
}
