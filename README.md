# BAKERZ BITE — Immersive Cinematic 3D Bakery Website

An award-winning caliber, scroll-driven culinary experience for **BAKERZ BITE**, an haute pâtisserie based in Karachi, Pakistan. Inspired by the cinematic pacing, camera choreography, and immersive 3D storytelling of *The Seed* (VOLM Studio), translated into a luxury artisan bakery universe.

---

## ✦ Live Preview & Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## ✦ Creative Vision & Art Direction

BAKERZ BITE treats pâtisserie as sculptural fine art. Rather than using static photography or generic bakery e-commerce templates, the experience invites patrons into a surreal, warmly lit culinary atelier where confections are presented with museum-grade elevation.

### Architectural Hallmarks:
- **Cinematic Contrast**: Transitions between deep espresso/mocha 3D scene atmospheres and bright, airy vanilla-cream editorial sections.
- **Micro-Typography**: Refined letter-spaced coordinates, chapter stamps, and editorial accents balancing expressive serif headlines.
- **Physical Depth**: Studio lighting with rim lights catching glossy mirror glazes, warm amber bounces, and floating golden flakes.

---

## ✦ Technology Stack

- **HTML5 & CSS3**: Semantic markup with bespoke CSS custom properties, grid systems, and glassmorphism.
- **Vanilla JavaScript (ES Modules)**: Modular, clean component-driven architecture without heavy framework overhead.
- **Three.js (v0.169)**: WebGL rendering, custom procedural geometry, PBR physical materials, and real-time lighting.
- **GSAP & ScrollTrigger (v3.12)**: Scroll-synchronized camera choreography, exploded layer separation, and typography reveals.
- **Vite 5**: Fast development server and optimized rollup production bundling.
- **Web Audio API**: Real-time synthesized harmonic ambient soundscape.

---

## ✦ Brand Palette & Typography

| Color Name | Hex Code | Visual Application |
|---|---|---|
| **Mocha Brown** | `#604638` | Dramatic bakery backgrounds, primary action buttons, hover states |
| **Deep Espresso** | `#30241F` | Deep studio canvas shadows, slate bases, night-time mood |
| **Platinum Silver** | `#D4D4D8` | Refined borders, fluted crystal tumbler accents, typography subtitles |
| **Pale Lavender** | `#E7DFF2` | Specular rim lights, satin ribbons, accent chips |
| **Vanilla Cream** | `#FAF6F0` | Elegant editorial light sections, Chantilly mousse highlights |
| **Rose Beige** | `#E9D7CE` | Warm undertones, pastry crumb flecks |
| **Muted Lavender**| `#A99BB8` | Editorial secondary copy, micro-meta tags |
| **Edible Gold** | `#D4AF37` | 24k gold leaf accents, ratings, interactive focus highlights |

### Typography:
- **Expressive Headlines**: `Cormorant Garamond` & `Playfair Display` (Classic European elegance, italicized ligatures)
- **Body & Controls**: `DM Sans` & `Manrope` (Clean, contemporary legibility)
- **Monospace Coordinates**: `Space Mono` (Coordinates, timestamps, placeholder tags)

---

## ✦ 3D Procedural Engine & Shaders

The 3D experience does not rely on broken external model downloads or heavy textures. All geometry, materials, and textures are generated procedurally in real-time:

### 1. The Central Hero Masterpiece: *L'Éclipse Noire Entremet*
A six-layered haute pâtisserie sculpture:
1. **Granite & Platinum Turntable**: Polished dark slate pedestal with a brushed platinum rim.
2. **Dacquoise & Hazelnut Praline Base**: Textured biscuit crumb with caramelized hazelnut flecks generated via procedural 2D canvas noise.
3. **Valrhona 72% Dark Chocolate Ganache Core**: Deep satin chocolate cylinder with subtle beveling.
4. **Wild French Raspberry Confit Core**: Translucent ruby gelée with physical transmission and interior gold leaf speckles.
5. **Madagascan Bourbon Vanilla Chantilly Mousse**: Fluted ivory cream ring.
6. **Obsidian Mirror Glaze Dome**: Ultra-glossy dome with clearcoat reflectivity (`clearcoat: 1.0`, `roughness: 0.08`) and procedural lavender swirl marbling.
7. **Haute Pâtisserie Crown**: Curled chocolate ribbon sail (`CatmullRomCurve3`), sculptural quenelle, cluster of glossy berries, and fluttering 24k gold flakes.

### 2. Four Category 3D Models
The 3D scene houses specialized models that switch focus and lighting when interacting with the Four Worlds:
- **Cakes**: *L'Éclipse Noire Entremet*
- **Pastries**: Golden 72-layer curved croissant with honeycomb lamination ribs and butter glaze.
- **Cookies**: Chunky triple chocolate sablé puck with molten Valrhona pools and faceted Maldon sea salt crystals.
- **Pies**: Fluted ceramic baking dish with hand-woven butter pastry lattice crust and caramel fill.

### 3. Atmospheric Particle & Ribbon Systems
- **420+ Floating Particles**: Caramel crumbs, cocoa shavings, and golden dust flakes with Brownian motion and scroll turbulence.
- **Flowing Parametric Ribbons**: Vanilla cream and lavender satin filaments that spiral around the dessert during scrolling.

---

## ✦ Scroll-Driven Cinematic Story

The `#cinematic-journey` section is pinned via GSAP ScrollTrigger across 400% scroll distance, smoothly transitioning through 4 orchestrated chapters:

- **Chapter 01: Reveal**: Camera glides from an elevated overview down to an intimate table-level approach.
- **Chapter 02: Exploded Anatomy**: The cake layers separate vertically in space (base stays grounded, ganache lifts, ruby confit floats, vanilla mousse ascends, mirror dome lifts, and gold crown floats) exposing the interior craft.
- **Chapter 03: Kinetics & Golden Dust**: Camera orbits dynamically while cream ribbons expand and particles swirl with heightened velocity.
- **Chapter 04: The Four Realms**: The layers snap back together with a gentle tactile bounce, camera pulls back to a panoramic vantage, transitioning directly to the Four Signature Worlds.

---

## ✦ The Four Signature Worlds

1. **Cakes**: Architectural entremets, mirror glazes, multi-tiered celebration gateaux.
   - Placeholder: `[CAKES 3D MODEL / IMAGE PLACEHOLDER]`
2. **Pastries**: 72-layer laminated croissants, caramel choux éclairs, cardamom kouign-amann.
   - Placeholder: `[PASTRIES 3D MODEL / IMAGE PLACEHOLDER]`
3. **Cookies**: Valrhona triple chocolate sablés, Piedmont hazelnut brown butter pucks, ceremonial Uji matcha.
   - Placeholder: `[COOKIES 3D MODEL / IMAGE PLACEHOLDER]`
4. **Pies**: Heritage salted caramel apple lattice pies, chocolate silk tarts, wild forest berry crisps.
   - Placeholder: `[PIES 3D MODEL / IMAGE PLACEHOLDER]`

*Clicking any world card updates the real-time 3D lighting, activates its corresponding 3D subject, and filters the catalogue below.*

---

## ✦ Product Catalogue & Detail Modal

- **Catalogue**: 16 artisan confections defined in a reusable JavaScript data structure (`src/data/products.js`).
- **Interactive Controls**: Category filter chips, real-time debounced search bar, and price/rating sorting.
- **Pricing**: Accurate sample prices in Pakistani Rupees (PKR 580 to PKR 6,850).
- **Product Details Modal**:
  - Accessible dialog (`role="dialog"`, `aria-modal="true"`)
  - Full keyboard trapping and Escape key dismissal
  - Detailed ingredients list, allergen disclosures, tasting note chips, and dietary certifications (Halal, gelatin-free)
  - Interactive quantity stepper (- / +)
  - Direct integration with the Demonstration Bag

---

## ✦ Boutique Lifestyle Merchandise

A boutique lifestyle collection designed for pastry connoisseurs:
- **Atelier Matte Ceramic Espresso Mug** (PKR 2,850)
- **Patisserie Organic Linen & Canvas Tote** (PKR 1,950)
- **Fluted Crystal Platinum Silver Tumbler** (PKR 3,200)
- **Solid Walnut & Brass Pastry Serving Board** (PKR 6,800)

Complete with category filtering, dimension specifications, care instructions, and Add to Bag functionality.

---

## ✦ Special Offers & Curated Suites

Curated gift packages and morning crates:
- **The Grand Celebration Suite** (PKR 9,400 — Save 16%)
- **The Morning Viennoiserie Crate** (PKR 3,600 — Save 18%)
- **The Artisan Cookie Treasury** (PKR 2,900 — Save 17%)
- **Weekend Heritage Hearth Pie Special** (PKR 4,200 — Save 17%)

Includes pulsing validity badges, itemized inclusion lists, and one-click bag reservation.

---

## ✦ Editorial Gallery & Accessible Lightbox

- **Masonry Layout**: 8 editorial items featuring chocolate tempering, morning deck oven bakes, interior architecture in Clifton, packaging ribbons, and tableware.
- **Full-Screen Lightbox**:
  - Previous and Next navigation arrows
  - Keyboard arrow key navigation (`ArrowLeft`, `ArrowRight`, `Escape`)
  - Dynamic image counter (`1 / 8`) and editorial caption metadata
  - Category filtering (Craftsmanship, Baking, Atelier, Packaging, Lifestyle)

---

## ✦ Patron Reviews & Local Persistence

- **Community Score**: Dynamic average rating (e.g. 4.98 / 5.0) and star distribution chart computed from active reviews.
- **Interactive Review Form**:
  - Patron name, location, category selection, headline, and comment
  - Interactive 5-star rating selector with hover preview
  - Client-side validation with instant feedback
- **Local Persistence Architecture**: Reviews are saved in the patron's browser `localStorage` (`bakerz_bite_reviews_v1`), prepended immediately to the review feed, and dynamically recalculate the community average.

---

## ✦ Live Karachi Ticker & Real-Time Clock

The header announcement ticker features:
- **Real-Time Clock**: Synchronized to `Asia/Karachi` timezone (`PKT, UTC+5`) updating every second via `Intl.DateTimeFormat`.
- **Karachi Coordinates**: `24.8607° N, 67.0011° E`.
- **Daily Baking Dispatch**: Fresh oven schedules.
- **Transparent Visitor Counter**: Session-based counter transparently labeled as a demonstration counter.

---

## ✦ Web Audio Ambient Soundscape

A synthesized warm harmonic soundscape (108Hz, 162Hz, 216Hz, 270Hz harmonics with low-pass 480Hz filtering) created via the Web Audio API.
- Activated voluntarily via the **ATMOSPHERE** button in the header.
- Pulsing animated equalizer sound bars indicate playing state.
- Zero external MP3/WAV files required.

---

## ✦ Brand Standards & Legal Note

**BAKERZ BITE** is an original creative digital experience engineered for visual excellence, scroll storytelling, and responsive culinary commerce. Confection prices, visitor counts, and reviews are demonstration models. No live financial payments are processed.
