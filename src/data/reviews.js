/**
 * BAKERZ BITE - Customer Reviews & Demonstration Storage
 * 
 * PERSISTENCE ARCHITECTURE:
 * Demonstrates local-first state persistence using browser localStorage ('bakerz_bite_reviews').
 * Any review submitted via the live form is validated, prepended, and stored locally,
 * dynamically recalculating the live average rating and distribution across the interface.
 * When reset or on a fresh browser profile, it seeds from the initial curated demonstration reviews.
 */

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    author: 'Ayesha Raza-Khan',
    location: 'Clifton Block 4, Karachi',
    rating: 5,
    category: 'Cakes',
    date: '2026-10-18',
    title: "The L'Éclipse Noire was the highlight of our 10th anniversary",
    comment: "The mirror glaze looked like molten obsidian—it caught the candlelight so dramatically that our guests hesitated to cut into it! Once we did, the balance of tart raspberry gelée against the 72% Valrhona mousse was perfection. Truly Paris-caliber pastry right here in Karachi.",
    verified: true,
    helpfulCount: 29
  },
  {
    id: 'rev-02',
    author: 'Dr. Taimoor Farooq',
    location: 'DHA Phase 6, Karachi',
    rating: 5,
    category: 'Pastries',
    date: '2026-10-21',
    title: 'The laminated honeycomb inside the croissants is unmatched',
    comment: "I have lived in Lyon for four years and have searched high and low for a croissant in Pakistan that shatters properly without feeling greasy. Bakerz Bite's 72-layer lamination with Normandy butter is world class. Picking up a warm crate at 8 AM has become my Sunday ritual.",
    verified: true,
    helpfulCount: 41
  },
  {
    id: 'rev-03',
    author: 'Zainab & Bilal Merchant',
    location: 'KDA Scheme 1, Karachi',
    rating: 5,
    category: 'Pies',
    date: '2026-10-24',
    title: 'Heritage Apple Lattice Pie with salted caramel — pure comfort',
    comment: "We warmed the pie according to their oven instructions and served it with homemade vanilla ice cream. The crust is astonishingly flaky and the hint of Ceylon cinnamon with spiced tart apples was extraordinary. The ceramic tray presentation also made it feel like a luxury gift.",
    verified: true,
    helpfulCount: 18
  },
  {
    id: 'rev-04',
    author: 'Hamza Sheikh',
    location: 'PECHS, Karachi',
    rating: 5,
    category: 'Cookies',
    date: '2026-10-25',
    title: 'Triple Chocolate Noir Sablé is dangerous for chocolate lovers',
    comment: "Ten seconds in the microwave creates the most divine molten puddle of dark chocolate. The flakes of Maldon sea salt prevent it from being overly sweet. Easily the best cookies in the city.",
    verified: true,
    helpfulCount: 22
  },
  {
    id: 'rev-05',
    author: 'Mahnoor Alvi',
    location: 'Bath Island, Karachi',
    rating: 5,
    category: 'Merchandise',
    date: '2026-10-26',
    title: 'The matte ceramic mug and linen tote feel so thoughtfully designed',
    comment: "The ceramic mug has such a satisfying ergonomic thumb rest and the deep mocha glaze is gorgeous on my work desk. The linen tote is heavy duty with a flat base that actually keeps cake boxes level on the car ride home.",
    verified: true,
    helpfulCount: 15
  }
];

const STORAGE_KEY = 'bakerz_bite_reviews_v1';

/**
 * Loads reviews from localStorage or seeds with INITIAL_REVIEWS
 */
export function getStoredReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('[BakerzBite] Failed reading reviews from localStorage, using seed:', e);
  }
  return [...INITIAL_REVIEWS];
}

/**
 * Saves reviews array to localStorage
 */
export function saveReviews(reviews) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
  } catch (e) {
    console.warn('[BakerzBite] Failed saving reviews to localStorage:', e);
  }
}

/**
 * Calculates average rating, star distribution, and total reviews count
 */
export function calculateReviewStats(reviews) {
  if (!reviews || reviews.length === 0) {
    return { average: 5.0, total: 0, distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
  }
  const total = reviews.length;
  const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
  const average = Number((sum / total).toFixed(2));

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    distribution[star] = (distribution[star] || 0) + 1;
  });

  return { average, total, distribution };
}
