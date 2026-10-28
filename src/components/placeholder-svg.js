/**
 * BAKERZ BITE - High-Aesthetic Luxury Editorial Image Placeholders
 * Generates custom SVG illustrations styled with the brand palette:
 * Mocha (#604638), Deep Espresso (#30241F), Platinum (#D4D4D8),
 * Pale Lavender (#E7DFF2), Vanilla Cream (#FAF6F0), Rose Beige (#E9D7CE).
 *
 * Each placeholder contains the explicit label required by the brand guidelines.
 */

export function getProductPlaceholderSVG(theme, label, title, category) {
  // Color presets based on theme
  const themes = {
    'dark-chocolate': {
      bg: '#251B17',
      primary: '#604638',
      accent: '#D4AF37',
      light: '#FAF6F0',
      tint: '#E7DFF2',
      glow: 'rgba(212, 175, 55, 0.25)',
      shape: 'entremet'
    },
    'pistachio-green': {
      bg: '#222A20',
      primary: '#4D6144',
      accent: '#D4AF37',
      light: '#FAF6F0',
      tint: '#E9D7CE',
      glow: 'rgba(164, 196, 150, 0.25)',
      shape: 'opera'
    },
    'vanilla-cream': {
      bg: '#2C221D',
      primary: '#856A59',
      accent: '#E7DFF2',
      light: '#FAF6F0',
      tint: '#D4D4D8',
      glow: 'rgba(250, 246, 240, 0.2)',
      shape: 'crepe'
    },
    'rose-lavender': {
      bg: '#2B2026',
      primary: '#6A4A5A',
      accent: '#E9D7CE',
      light: '#FAF6F0',
      tint: '#E7DFF2',
      glow: 'rgba(231, 223, 242, 0.25)',
      shape: 'charlotte'
    },
    'golden-croissant': {
      bg: '#2E2218',
      primary: '#8C5D35',
      accent: '#F3C476',
      light: '#FAF6F0',
      tint: '#E7DFF2',
      glow: 'rgba(243, 196, 118, 0.3)',
      shape: 'croissant'
    },
    'chocolate-pastry': {
      bg: '#241A16',
      primary: '#5E3D2A',
      accent: '#E9D7CE',
      light: '#FAF6F0',
      tint: '#D4D4D8',
      glow: 'rgba(212, 175, 55, 0.2)',
      shape: 'pain-chocolat'
    },
    'caramel-eclair': {
      bg: '#2B211A',
      primary: '#7A4D2E',
      accent: '#D4AF37',
      light: '#FAF6F0',
      tint: '#E7DFF2',
      glow: 'rgba(212, 175, 55, 0.25)',
      shape: 'eclair'
    },
    'kouign-amann': {
      bg: '#2E2319',
      primary: '#8F582E',
      accent: '#F5C87A',
      light: '#FAF6F0',
      tint: '#E9D7CE',
      glow: 'rgba(245, 200, 122, 0.25)',
      shape: 'spiral'
    },
    'dark-cookie': {
      bg: '#1F1714',
      primary: '#4D3325',
      accent: '#D4AF37',
      light: '#FAF6F0',
      tint: '#E7DFF2',
      glow: 'rgba(212, 175, 55, 0.2)',
      shape: 'cookie-dark'
    },
    'hazelnut-cookie': {
      bg: '#281E18',
      primary: '#6E482F',
      accent: '#E9D7CE',
      light: '#FAF6F0',
      tint: '#D4D4D8',
      glow: 'rgba(233, 215, 206, 0.2)',
      shape: 'cookie-nut'
    },
    'matcha-cookie': {
      bg: '#20261D',
      primary: '#45593E',
      accent: '#FAF6F0',
      light: '#FAF6F0',
      tint: '#E7DFF2',
      glow: 'rgba(150, 185, 140, 0.25)',
      shape: 'cookie-matcha'
    },
    'oat-fig-cookie': {
      bg: '#261F1A',
      primary: '#6B4E38',
      accent: '#D4AF37',
      light: '#FAF6F0',
      tint: '#E9D7CE',
      glow: 'rgba(212, 175, 55, 0.2)',
      shape: 'cookie-fig'
    },
    'apple-lattice-pie': {
      bg: '#2C1E18',
      primary: '#854D2B',
      accent: '#F5BE75',
      light: '#FAF6F0',
      tint: '#E7DFF2',
      glow: 'rgba(245, 190, 117, 0.25)',
      shape: 'pie-lattice'
    },
    'chocolate-pie': {
      bg: '#1F1613',
      primary: '#4E3122',
      accent: '#D4AF37',
      light: '#FAF6F0',
      tint: '#E7DFF2',
      glow: 'rgba(212, 175, 55, 0.2)',
      shape: 'pie-chocolate'
    },
    'berry-pie': {
      bg: '#281920',
      primary: '#6A2E44',
      accent: '#E7DFF2',
      light: '#FAF6F0',
      tint: '#E9D7CE',
      glow: 'rgba(231, 223, 242, 0.25)',
      shape: 'pie-berry'
    },
    'lemon-meringue-pie': {
      bg: '#2E2718',
      primary: '#8F782D',
      accent: '#FAF6F0',
      light: '#FAF6F0',
      tint: '#E7DFF2',
      glow: 'rgba(245, 220, 115, 0.25)',
      shape: 'pie-lemon'
    }
  };

  const t = themes[theme] || themes['dark-chocolate'];

  return `
    <div class="editorial-placeholder-wrap">
      <svg class="editorial-placeholder-svg" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
        <defs>
          <radialGradient id="grad-${theme}" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stop-color="${t.primary}" stop-opacity="0.85" />
            <stop offset="60%" stop-color="${t.bg}" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#140E0C" stop-opacity="1" />
          </radialGradient>
          <filter id="grain-${theme}">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.07 0" />
            <feBlend mode="overlay" in="SourceGraphic" result="blend" />
          </filter>
          <filter id="glow-${theme}" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="14" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Background -->
        <rect width="600" height="450" fill="url(#grad-${theme})" />
        <rect width="600" height="450" fill="#000" opacity="0.05" filter="url(#grain-${theme})" />

        <!-- Luxury Framing Lines -->
        <rect x="24" y="24" width="552" height="402" fill="none" stroke="${t.tint}" stroke-opacity="0.2" stroke-width="1" />
        <rect x="28" y="28" width="544" height="394" fill="none" stroke="${t.accent}" stroke-opacity="0.12" stroke-width="0.75" />
        <circle cx="24" cy="24" r="3" fill="${t.accent}" fill-opacity="0.5" />
        <circle cx="576" cy="24" r="3" fill="${t.accent}" fill-opacity="0.5" />
        <circle cx="24" cy="426" r="3" fill="${t.accent}" fill-opacity="0.5" />
        <circle cx="576" cy="426" r="3" fill="${t.accent}" fill-opacity="0.5" />

        <!-- Background Atmospheric Radial Aura -->
        <circle cx="300" cy="220" r="140" fill="${t.glow}" filter="url(#glow-${theme})" />

        <!-- Artistic Pastry Silhouette & Vector Graphics -->
        ${renderArtisticShape(t.shape, t)}

        <!-- Top Micro Category / Coordinates -->
        <text x="44" y="56" fill="${t.light}" fill-opacity="0.55" font-family="'DM Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="3" text-transform="uppercase">BAKERZ BITE ATELIER • ${category || 'CONFECTION'}</text>
        <text x="556" y="56" text-anchor="end" fill="${t.accent}" fill-opacity="0.7" font-family="'DM Sans', sans-serif" font-size="9" font-weight="600" letter-spacing="2">KARACHI</text>

        <!-- Lower Editorial Title -->
        <text x="300" y="380" text-anchor="middle" fill="${t.light}" font-family="'Cormorant Garamond', serif" font-size="22" font-weight="500" font-style="italic" letter-spacing="0.5">${title}</text>
      </svg>
      <!-- Explicit Prompt Required Placeholder Label Tag -->
      <div class="placeholder-explicit-label">${label}</div>
    </div>
  `;
}

function renderArtisticShape(shape, t) {
  switch (shape) {
    case 'entremet':
      return `
        <!-- Entremet Layered Silhouette -->
        <g transform="translate(300, 215)">
          <!-- Base Pedestal -->
          <ellipse cx="0" cy="65" rx="130" ry="22" fill="#181210" stroke="${t.tint}" stroke-width="0.8" stroke-opacity="0.3" />
          <ellipse cx="0" cy="60" rx="120" ry="18" fill="#241B17" />
          <!-- Dacquoise Base -->
          <path d="M -95,45 Q 0,60 95,45 L 95,58 Q 0,72 -95,58 Z" fill="#4A3428" />
          <!-- Ganache Core -->
          <path d="M -90,20 Q 0,35 90,20 L 90,45 Q 0,60 -90,45 Z" fill="#36231B" />
          <!-- Ruby Confit Strip -->
          <path d="M -85,10 Q 0,22 85,10 L 85,20 Q 0,32 -85,20 Z" fill="#942B43" opacity="0.9" />
          <!-- Mirror Glaze Dome -->
          <path d="M -88,10 C -88,-65 88,-65 88,10 Q 0,26 -88,10 Z" fill="#2A1B16" stroke="${t.accent}" stroke-width="1.2" stroke-opacity="0.6" />
          <!-- Specular Glaze Highlight -->
          <path d="M -50,-40 C -15,-62 30,-55 55,-30" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" opacity="0.45" filter="blur(2px)" />
          <path d="M -40,-35 C -10,-55 25,-48 45,-25" fill="none" stroke="#FFF" stroke-width="1.5" stroke-linecap="round" opacity="0.8" />
          <!-- Golden Chocolate Sail Crown -->
          <path d="M 0,-45 C -30,-80 -10,-105 10,-115 C 5,-90 35,-75 0,-45 Z" fill="${t.accent}" opacity="0.9" />
          <circle cx="18" cy="-55" r="7" fill="${t.tint}" opacity="0.85" />
          <circle cx="30" cy="-48" r="5" fill="#942B43" />
          <!-- Edible Gold Flakes -->
          <polygon points="-25,-20 -23,-25 -20,-22 -22,-18" fill="${t.accent}" />
          <polygon points="35,-15 37,-18 40,-16 38,-13" fill="${t.accent}" />
        </g>
      `;
    case 'croissant':
      return `
        <!-- Croissant Artisanal Silhouette -->
        <g transform="translate(300, 215)">
          <ellipse cx="0" cy="55" rx="125" ry="18" fill="#181210" opacity="0.6" />
          <!-- Laminated Croissant Crescent -->
          <path d="M -115,25 C -75,60 75,60 115,25 C 100,5 60,-15 0,-25 C -60,-15 -100,5 -115,25 Z" fill="#A86D3B" stroke="${t.accent}" stroke-width="1" />
          <!-- Flaky Honeycomb Ridge Ribs -->
          <path d="M -70,28 C -55,-5 -30,-22 -10,-24" fill="none" stroke="#F5C47A" stroke-width="2.5" opacity="0.75" />
          <path d="M -40,38 C -20,5 0,-25 20,-24" fill="none" stroke="#F5C47A" stroke-width="3" opacity="0.9" />
          <path d="M 0,42 C 20,10 40,-15 55,-18" fill="none" stroke="#F5C47A" stroke-width="2.5" opacity="0.8" />
          <path d="M 40,35 C 60,15 80,-2 90,5" fill="none" stroke="#F5C47A" stroke-width="2" opacity="0.6" />
          <!-- Golden crust highlight -->
          <ellipse cx="0" cy="5" rx="55" ry="18" fill="#D89243" opacity="0.4" />
        </g>
      `;
    case 'cookie-dark':
    case 'cookie-nut':
    case 'cookie-matcha':
    case 'cookie-fig':
      return `
        <!-- Artisanal Cookie Puck -->
        <g transform="translate(300, 215)">
          <ellipse cx="0" cy="50" rx="110" ry="20" fill="#150E0C" opacity="0.7" />
          <!-- Craggy Cookie Body -->
          <ellipse cx="0" cy="5" rx="95" ry="60" fill="${t.primary}" stroke="${t.accent}" stroke-width="1" stroke-opacity="0.4" />
          <!-- Rough Textures and Chocolate Puddles -->
          <ellipse cx="-35" cy="-10" rx="24" ry="16" fill="#1C1411" />
          <ellipse cx="30" cy="12" rx="28" ry="18" fill="#1C1411" />
          <ellipse cx="5" cy="-25" rx="20" ry="14" fill="#241915" />
          <ellipse cx="-15" cy="20" rx="18" ry="12" fill="#1C1411" />
          <!-- Molten Gloss Center Highlight -->
          <ellipse cx="-32" cy="-12" rx="14" ry="8" fill="#3D281E" />
          <path d="M -36,-14 Q -30,-18 -26,-13" fill="none" stroke="#FFF" stroke-width="1.2" opacity="0.6" />
          <path d="M 26,8 Q 32,5 36,10" fill="none" stroke="#FFF" stroke-width="1.2" opacity="0.6" />
          <!-- Sea Salt Crystal Flakes -->
          <rect x="-10" y="-8" width="6" height="5" fill="#FAF6F0" opacity="0.9" transform="rotate(25 -10 -8)" />
          <rect x="15" y="-5" width="5" height="5" fill="#FAF6F0" opacity="0.85" transform="rotate(45 15 -5)" />
          <rect x="-45" y="15" width="6" height="4" fill="#FAF6F0" opacity="0.8" transform="rotate(15 -45 15)" />
          <rect x="42" y="25" width="5" height="4" fill="#FAF6F0" opacity="0.8" transform="rotate(30 42 25)" />
        </g>
      `;
    case 'pie-lattice':
    case 'pie-chocolate':
    case 'pie-berry':
    case 'pie-lemon':
      return `
        <!-- Artisanal Pie Ceramic Silhouette -->
        <g transform="translate(300, 215)">
          <ellipse cx="0" cy="55" rx="120" ry="22" fill="#140D0B" opacity="0.6" />
          <!-- Ceramic Baking Dish Fluted Edge -->
          <ellipse cx="0" cy="20" rx="110" ry="45" fill="#3D281E" stroke="${t.tint}" stroke-width="1" stroke-opacity="0.3" />
          <!-- Golden Crimped Crust Rim -->
          <ellipse cx="0" cy="12" rx="105" ry="42" fill="#B37841" />
          <ellipse cx="0" cy="12" rx="92" ry="36" fill="#6B3D1B" />
          <!-- Woven Lattice Strips or Torched Meringue -->
          <g opacity="0.85">
            <line x1="-70" y1="-5" x2="70" y2="25" stroke="#C98F4F" stroke-width="9" stroke-linecap="round" />
            <line x1="-50" y1="-20" x2="80" y2="10" stroke="#C98F4F" stroke-width="9" stroke-linecap="round" />
            <line x1="-80" y1="12" x2="50" y2="35" stroke="#C98F4F" stroke-width="9" stroke-linecap="round" />
            <line x1="-55" y1="30" x2="65" y2="-15" stroke="#DDA668" stroke-width="9" stroke-linecap="round" />
            <line x1="-30" y1="40" x2="75" y2="-5" stroke="#DDA668" stroke-width="9" stroke-linecap="round" />
            <line x1="-75" y1="15" x2="35" y2="-25" stroke="#DDA668" stroke-width="9" stroke-linecap="round" />
          </g>
          <!-- Glistening Salted Caramel Glaze -->
          <path d="M -40,10 Q 0,25 40,8 Q 15,35 -20,28 Z" fill="${t.accent}" opacity="0.45" />
        </g>
      `;
    default:
      return `
        <!-- Generic Elegant Confection Form -->
        <g transform="translate(300, 215)">
          <ellipse cx="0" cy="50" rx="110" ry="20" fill="#160F0C" opacity="0.5" />
          <ellipse cx="0" cy="0" rx="90" ry="45" fill="${t.primary}" stroke="${t.accent}" stroke-width="1.2" stroke-opacity="0.4" />
          <circle cx="0" cy="-30" r="28" fill="${t.accent}" opacity="0.75" />
          <ellipse cx="0" cy="-30" rx="40" ry="12" fill="none" stroke="${t.light}" stroke-width="1" opacity="0.5" />
        </g>
      `;
  }
}

export function getMerchandisePlaceholderSVG(theme, label, title, material) {
  return `
    <div class="editorial-placeholder-wrap">
      <svg class="editorial-placeholder-svg" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
        <defs>
          <radialGradient id="merch-grad-${theme}" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stop-color="#4A3428" stop-opacity="0.9" />
            <stop offset="70%" stop-color="#241B17" stop-opacity="0.95" />
            <stop offset="100%" stop-color="#150E0C" stop-opacity="1" />
          </radialGradient>
        </defs>
        <rect width="600" height="500" fill="url(#merch-grad-${theme})" />
        <rect x="24" y="24" width="552" height="452" fill="none" stroke="#D4D4D8" stroke-opacity="0.2" stroke-width="1" />
        <circle cx="300" cy="230" r="130" fill="rgba(231, 223, 242, 0.08)" />

        <!-- Stylized Vector Silhouette for Merch Item -->
        ${renderMerchShape(theme)}

        <!-- Top Micro Category / Coordinates -->
        <text x="44" y="56" fill="#FAF6F0" fill-opacity="0.5" font-family="'DM Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="3">BAKERZ BITE • LIFESTYLE ATELIER</text>
        <text x="556" y="56" text-anchor="end" fill="#D4AF37" fill-opacity="0.7" font-family="'DM Sans', sans-serif" font-size="9" font-weight="600" letter-spacing="2">EDITION 01</text>

        <!-- Lower Subtitle -->
        <text x="300" y="420" text-anchor="middle" fill="#FAF6F0" font-family="'Cormorant Garamond', serif" font-size="20" font-weight="500" font-style="italic">${title}</text>
        <text x="300" y="445" text-anchor="middle" fill="#A99BB8" font-family="'DM Sans', sans-serif" font-size="11" letter-spacing="1.5">${material}</text>
      </svg>
      <div class="placeholder-explicit-label">${label}</div>
    </div>
  `;
}

function renderMerchShape(theme) {
  switch (theme) {
    case 'ceramic-mug':
      return `
        <g transform="translate(300, 230)">
          <ellipse cx="0" cy="70" rx="75" ry="14" fill="#140D0B" opacity="0.6" />
          <!-- Mug Body -->
          <path d="M -55,-40 L -48,60 C -48,70 48,70 48,60 L 55,-40 Z" fill="#3D291F" stroke="#D4D4D8" stroke-width="1" stroke-opacity="0.3" />
          <!-- Dipped Vanilla Glaze Rim -->
          <path d="M -55,-40 C -35,-28 35,-28 55,-40 L 53,-15 C 20,-5 -20,-5 -53,-15 Z" fill="#FAF6F0" opacity="0.9" />
          <!-- Handle -->
          <path d="M 52,-15 C 85,-15 88,40 47,50" fill="none" stroke="#3D291F" stroke-width="14" stroke-linecap="round" />
          <path d="M 52,-15 C 85,-15 88,40 47,50" fill="none" stroke="#FAF6F0" stroke-width="2" opacity="0.4" stroke-linecap="round" />
          <!-- Embossed Crest -->
          <circle cx="0" cy="20" r="12" fill="none" stroke="#D4AF37" stroke-width="1" opacity="0.7" />
          <text x="0" y="24" text-anchor="middle" fill="#D4AF37" font-family="'Cormorant Garamond', serif" font-size="11" font-weight="bold">B</text>
        </g>
      `;
    case 'canvas-tote':
      return `
        <g transform="translate(300, 230)">
          <ellipse cx="0" cy="95" rx="85" ry="16" fill="#140D0B" opacity="0.6" />
          <!-- Tote Straps -->
          <path d="M -35,-75 C -35,-120 35,-120 35,-75" fill="none" stroke="#30241F" stroke-width="8" stroke-linecap="round" />
          <!-- Tote Body -->
          <polygon points="-75,-70 75,-70 85,85 -85,85" fill="#E8DEC8" stroke="#30241F" stroke-width="1.5" />
          <!-- Espresso Base Reinforcement -->
          <polygon points="-85,55 85,55 85,85 -85,85" fill="#30241F" />
          <!-- BAKERZ BITE Crest Print -->
          <text x="0" y="5" text-anchor="middle" fill="#30241F" font-family="'Cormorant Garamond', serif" font-size="16" font-weight="600" letter-spacing="3">BAKERZ BITE</text>
          <text x="0" y="22" text-anchor="middle" fill="#604638" font-family="'DM Sans', sans-serif" font-size="8" letter-spacing="2">KARACHI • ATELIER</text>
        </g>
      `;
    case 'crystal-glass':
      return `
        <g transform="translate(300, 230)">
          <ellipse cx="0" cy="80" rx="55" ry="12" fill="#140D0B" opacity="0.6" />
          <!-- Glass Body -->
          <polygon points="-42,-65 42,-65 35,75 -35,75" fill="rgba(231, 223, 242, 0.12)" stroke="#D4D4D8" stroke-width="1" stroke-opacity="0.6" />
          <!-- Platinum Silver Rim -->
          <ellipse cx="0" cy="-65" rx="42" ry="8" fill="none" stroke="#D4D4D8" stroke-width="3" />
          <!-- Vertical Flutes -->
          <line x1="-28" y1="-55" x2="-22" y2="65" stroke="#FAF6F0" stroke-width="1" opacity="0.4" />
          <line x1="-14" y1="-55" x2="-10" y2="68" stroke="#FAF6F0" stroke-width="1" opacity="0.5" />
          <line x1="0" y1="-55" x2="0" y2="70" stroke="#FAF6F0" stroke-width="1.2" opacity="0.6" />
          <line x1="14" y1="-55" x2="10" y2="68" stroke="#FAF6F0" stroke-width="1" opacity="0.5" />
          <line x1="28" y1="-55" x2="22" y2="65" stroke="#FAF6F0" stroke-width="1" opacity="0.4" />
        </g>
      `;
    case 'walnut-tray':
      return `
        <g transform="translate(300, 230)">
          <ellipse cx="0" cy="65" rx="130" ry="24" fill="#120D0A" opacity="0.6" />
          <!-- Walnut Board Base -->
          <ellipse cx="0" cy="15" rx="125" ry="32" fill="#3B261A" stroke="#523625" stroke-width="3" />
          <ellipse cx="0" cy="10" rx="120" ry="29" fill="#472F20" />
          <!-- Wood Grain Rings -->
          <ellipse cx="-15" cy="10" rx="95" ry="20" fill="none" stroke="#362216" stroke-width="1.2" />
          <ellipse cx="-15" cy="10" rx="65" ry="14" fill="none" stroke="#362216" stroke-width="1" />
          <!-- Brushed Brass Handles -->
          <rect x="-135" y="-5" width="16" height="30" rx="4" fill="#D4AF37" stroke="#9A7B1C" stroke-width="1" />
          <rect x="119" y="-5" width="16" height="30" rx="4" fill="#D4AF37" stroke="#9A7B1C" stroke-width="1" />
        </g>
      `;
    default:
      return '';
  }
}

export function getGalleryPlaceholderSVG(theme, label, title, tag) {
  return `
    <div class="editorial-placeholder-wrap">
      <svg class="editorial-placeholder-svg" viewBox="0 0 700 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}">
        <defs>
          <linearGradient id="gal-grad-${theme}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#3D291E" />
            <stop offset="50%" stop-color="#241B17" />
            <stop offset="100%" stop-color="#140E0C" />
          </linearGradient>
        </defs>
        <rect width="700" height="500" fill="url(#gal-grad-${theme})" />
        <rect x="20" y="20" width="660" height="460" fill="none" stroke="#D4D4D8" stroke-opacity="0.15" stroke-width="1" />
        
        <circle cx="350" cy="230" r="140" fill="rgba(231, 223, 242, 0.05)" />
        
        <!-- Center Aesthetic Motif -->
        <g transform="translate(350, 230)">
          <circle cx="0" cy="0" r="70" fill="none" stroke="#D4AF37" stroke-width="1" stroke-dasharray="4 6" opacity="0.6" />
          <circle cx="0" cy="0" r="45" fill="#30241F" stroke="#D4D4D8" stroke-width="0.8" opacity="0.8" />
          <text x="0" y="6" text-anchor="middle" fill="#FAF6F0" font-family="'Cormorant Garamond', serif" font-size="20" font-style="italic">B·B</text>
        </g>

        <!-- Upper Tag -->
        <text x="40" y="54" fill="#D4AF37" font-family="'DM Sans', sans-serif" font-size="10" font-weight="600" letter-spacing="2.5" text-transform="uppercase">${tag}</text>
        <text x="660" y="54" text-anchor="end" fill="#D4D4D8" fill-opacity="0.5" font-family="'DM Sans', sans-serif" font-size="9" letter-spacing="1.5">CLIFTON ATELIER</text>

        <!-- Lower Title -->
        <text x="350" y="420" text-anchor="middle" fill="#FAF6F0" font-family="'Cormorant Garamond', serif" font-size="22" font-weight="500">${title}</text>
      </svg>
      <div class="placeholder-explicit-label">${label}</div>
    </div>
  `;
}
