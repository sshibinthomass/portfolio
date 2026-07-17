# Entrepreneurship Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual Entrepreneurship navigation area with an overview and substantial founder case studies for Rosary Plant House and Arvenilo.

**Architecture:** Store both localized venture records in one JSON source, render them through a focused overview component and a shared detail renderer, and resolve venture pages by stable slugs. Keep venture presentation separate from Projects while reusing the portfolio's routing, translation, theme, and animation conventions.

**Tech Stack:** React 19, React Router, react-i18next, Framer Motion, CSS, Vite, Node test runner

## Global Constraints

- The heading and navigation label are `Entrepreneurship` in English and `Unternehmertum` in German.
- The confirmed role is `Founder` for both ventures.
- Rosary Plant House was founded in 2020 and links to `https://rosaryplanthouse.com`.
- Arvenilo was founded in 2026 and links to `https://sshibinthomass.github.io/arvenilo-site/`.
- Product availability claims must match the venture websites: AnchorAR is available; Arvenilo Agents, Arvenilo Spatial, and Arvenilo Network are coming soon.
- Do not introduce unverified revenue, customer, team, growth, or impact claims.
- External links open with `target="_blank"` and `rel="noopener noreferrer"`.
- Unsupported venture slugs render an explicit localized not-found state.
- Missing localized content or media falls back to the matching English record.
- Preserve all pre-existing uncommitted changes. `src/locales/en.json` and `src/locales/de.json` are already modified; stage only Entrepreneurship hunks from those files.
- Do not modify the already-dirty `src/pages/Home.jsx` or `src/pages/Home.css`; a homepage Entrepreneurship section is outside this feature's approved scope.

---

## File Structure

- Create `src/data/ventures.json`: bilingual venture facts and case-study content.
- Create `src/components/VentureCard/VentureCard.jsx`: accessible internal-link summary card.
- Create `src/components/VentureCard/VentureCard.css`: venture card layout and theme accents.
- Create `src/pages/Entrepreneurship.jsx`: bilingual overview route.
- Create `src/pages/Entrepreneurship.css`: overview layout and responsive behavior.
- Create `src/pages/VentureDetail.jsx`: shared case-study renderer and not-found state.
- Create `src/pages/VentureDetail.css`: hero, sections, product grid, timeline, gallery, and CTA styling.
- Create `tests/entrepreneurship.test.mjs`: static data, routing, localization, asset, and link-safety tests.
- Create `public/images/entrepreneurship/rosary-plant-house-hero.jpg`: portfolio-owned copy of the official site hero.
- Create `public/images/entrepreneurship/arvenilo-hero.png`: portfolio-owned copy of the official site brand image.
- Modify `src/App.jsx`: register overview and slug routes.
- Modify `src/components/Layout/Header.jsx`: insert Entrepreneurship after Projects.
- Modify `src/locales/en.json`: add English UI labels.
- Modify `src/locales/de.json`: add German UI labels.

---

### Task 1: Venture Content and Media

**Files:**
- Create: `src/data/ventures.json`
- Create: `public/images/entrepreneurship/rosary-plant-house-hero.jpg`
- Create: `public/images/entrepreneurship/arvenilo-hero.png`
- Create: `tests/entrepreneurship.test.mjs`

**Interfaces:**
- Consumes: The confirmed venture facts and official website content.
- Produces: `ventures.en` and `ventures.de`, arrays of records keyed by `slug`; local hero images referenced by `heroImage`.

- [ ] **Step 1: Write the failing data-contract test**

Create `tests/entrepreneurship.test.mjs` with:

```js
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const ventures = JSON.parse(await read('../src/data/ventures.json'));

const bySlug = (language, slug) =>
  ventures[language].find((venture) => venture.slug === slug);

test('venture data has matching bilingual records and confirmed founder facts', () => {
  assert.deepEqual(
    ventures.en.map(({ slug }) => slug),
    ['rosary-plant-house', 'arvenilo'],
  );
  assert.deepEqual(
    ventures.de.map(({ slug }) => slug),
    ['rosary-plant-house', 'arvenilo'],
  );

  const rosary = bySlug('en', 'rosary-plant-house');
  const arvenilo = bySlug('en', 'arvenilo');

  assert.equal(rosary.role, 'Founder');
  assert.equal(rosary.founded, 2020);
  assert.equal(rosary.website, 'https://rosaryplanthouse.com');
  assert.equal(arvenilo.role, 'Founder');
  assert.equal(arvenilo.founded, 2026);
  assert.equal(
    arvenilo.website,
    'https://sshibinthomass.github.io/arvenilo-site/',
  );
});

test('case-study records contain complete renderable sections', () => {
  for (const language of ['en', 'de']) {
    for (const venture of ventures[language]) {
      assert.ok(venture.name);
      assert.ok(venture.category);
      assert.ok(venture.status);
      assert.ok(venture.tagline);
      assert.ok(venture.description);
      assert.ok(venture.mission);
      assert.ok(venture.opportunity.title);
      assert.ok(venture.opportunity.body);
      assert.ok(venture.solution.title);
      assert.ok(venture.solution.body);
      assert.ok(venture.founderRole.body);
      assert.ok(venture.founderRole.responsibilities.length >= 3);
      assert.ok(venture.products.length >= 3);
      assert.ok(venture.milestones.length >= 2);
      assert.ok(venture.highlights.length >= 3);
      assert.ok(venture.currentDirection.body);
      assert.ok(venture.heroAlt);
    }
  }
});

test('Arvenilo availability language stays evidence-based', () => {
  const arvenilo = bySlug('en', 'arvenilo');
  assert.deepEqual(
    arvenilo.products.map(({ name, availability }) => ({ name, availability })),
    [
      { name: 'AnchorAR', availability: 'Available now' },
      { name: 'Arvenilo Agents', availability: 'Coming soon' },
      { name: 'Arvenilo Spatial', availability: 'Coming soon' },
      { name: 'Arvenilo Network', availability: 'Coming soon' },
    ],
  );
});

test('venture hero media is local and non-empty', async () => {
  for (const venture of ventures.en) {
    assert.match(venture.heroImage, /^\/images\/entrepreneurship\//);
    const image = await stat(new URL(`../public${venture.heroImage}`, import.meta.url));
    assert.ok(image.isFile());
    assert.ok(image.size > 1_000, `${venture.heroImage} is unexpectedly small`);
  }
});
```

- [ ] **Step 2: Run the test and confirm the missing data failure**

Run:

```powershell
node --test --test-name-pattern="venture data|case-study|Arvenilo availability|venture hero" tests/*.test.mjs
```

Expected: FAIL with `ENOENT` for `src/data/ventures.json`.

- [ ] **Step 3: Download official representative media**

Run:

```powershell
New-Item -ItemType Directory -Force -Path public/images/entrepreneurship
Invoke-WebRequest -Uri 'https://rosaryplanthouse.com/home/hero-natural-nursery.jpg' -OutFile 'public/images/entrepreneurship/rosary-plant-house-hero.jpg'
Invoke-WebRequest -Uri 'https://sshibinthomass.github.io/arvenilo-site/brand/arvenilo-master.png' -OutFile 'public/images/entrepreneurship/arvenilo-hero.png'
```

Expected: both commands complete and both files exceed 1,000 bytes.

- [ ] **Step 4: Add the complete bilingual venture data**

Create `src/data/ventures.json`. Use this exact record shape for both locales:

```json
{
  "en": [
    {
      "slug": "rosary-plant-house",
      "name": "Rosary Plant House",
      "role": "Founder",
      "founded": 2020,
      "category": "Horticulture & E-commerce",
      "status": "Active",
      "tagline": "Growing specialist plants and practical knowledge from the Nilgiris.",
      "description": "An online plant nursery in Coonoor offering succulents, cacti, foliage plants, and balcony plants for customers across India.",
      "mission": "Make distinctive, carefully grown plants easier to discover while giving customers useful guidance for keeping them healthy at home.",
      "website": "https://rosaryplanthouse.com",
      "accent": "botanical",
      "heroImage": "/images/entrepreneurship/rosary-plant-house-hero.jpg",
      "heroAlt": "A collection of nursery-grown plants at Rosary Plant House",
      "opportunity": {
        "title": "The opportunity",
        "body": "Plant enthusiasts often need more than a catalogue. They need access to suitable varieties, clear care information, and dependable support that reflects Indian homes, balconies, and seasonal conditions."
      },
      "solution": {
        "title": "A nursery with a digital front door",
        "body": "Rosary Plant House combines nursery-grown plants from Coonoor with an online storefront, discoverable plant categories, practical care guides, shipping information, reviews, and accessible customer support."
      },
      "founderRole": {
        "title": "Founder role",
        "body": "As founder, I shape the venture's direction across the nursery offering, customer experience, digital presence, and the practical knowledge that supports each purchase.",
        "responsibilities": [
          "Set the business and brand direction for an online-first plant nursery",
          "Develop the product catalogue and customer-facing plant categories",
          "Connect commerce, care guidance, shipping information, and customer support",
          "Maintain a digital experience that reflects the nursery's specialist knowledge"
        ]
      },
      "products": [
        {
          "name": "Succulents & Echeveria",
          "availability": "Available",
          "description": "Low-water plants selected for collectors, balconies, and indoor growing conditions."
        },
        {
          "name": "Cacti & Aloe",
          "availability": "Available",
          "description": "Architectural, resilient plants supported by beginner-friendly care information."
        },
        {
          "name": "Foliage & Balcony Plants",
          "availability": "Available",
          "description": "Greenery for apartments, balconies, and everyday indoor spaces."
        },
        {
          "name": "Plant Care Guides",
          "availability": "Available",
          "description": "Guidance for monsoons, root rot, indoor care, cactus care, and low-water balconies in India."
        }
      ],
      "milestones": [
        {
          "year": "2020",
          "title": "Venture founded",
          "description": "Rosary Plant House began in Coonoor with a focus on specialist plants and informed care."
        },
        {
          "year": "Today",
          "title": "Online nursery and knowledge hub",
          "description": "The venture connects its plant catalogue with care guides, shipping details, reviews, and direct support."
        }
      ],
      "highlights": [
        "Nursery base in Coonoor, The Nilgiris",
        "Rare succulents, cacti, foliage, and balcony plants",
        "Shipping across South India and major North Indian cities",
        "Plant-care content designed for Indian conditions"
      ],
      "currentDirection": {
        "title": "Growing the trusted plant-buying experience",
        "body": "Rosary Plant House continues to bring together specialist inventory, practical education, transparent support, and a straightforward online path from discovery to plant care."
      },
      "gallery": []
    },
    {
      "slug": "arvenilo",
      "name": "Arvenilo",
      "role": "Founder",
      "founded": 2026,
      "category": "Intelligent Reality Products",
      "status": "Building",
      "tagline": "The intelligent layer between physical and digital reality.",
      "description": "A technology venture building accessible products that connect useful intelligence, spatial interaction, and trusted digital systems.",
      "mission": "Build intelligence into the world around people while keeping capability, status, and control understandable to the person using it.",
      "website": "https://sshibinthomass.github.io/arvenilo-site/",
      "accent": "spatial",
      "heroImage": "/images/entrepreneurship/arvenilo-hero.png",
      "heroAlt": "Arvenilo intelligent reality brand artwork",
      "opportunity": {
        "title": "The opportunity",
        "body": "Physical objects, immersive media, and intelligent assistance are usually delivered as separate experiences. Arvenilo explores how those layers can work together without making the technology opaque or taking control away from the user."
      },
      "solution": {
        "title": "One brand across three legible layers",
        "body": "Arvenilo connects a familiar physical touchpoint, an interactive spatial layer, and a context-aware intelligent outcome. Each layer remains visible and understandable as capability grows."
      },
      "founderRole": {
        "title": "Founder role",
        "body": "As founder, I define the intelligent-reality product vision and translate it into focused product families, interaction principles, technical direction, and an accessible public product experience.",
        "responsibilities": [
          "Define the brand, product strategy, and human-control principles",
          "Develop AnchorAR as the first available product",
          "Shape future directions across agents, spatial computing, and trusted infrastructure",
          "Connect product design, software architecture, and public communication"
        ]
      },
      "products": [
        {
          "name": "AnchorAR",
          "availability": "Available now",
          "description": "Build, publish, share, and open interactive web-based augmented-reality experiences with less installation friction."
        },
        {
          "name": "Arvenilo Agents",
          "availability": "Coming soon",
          "description": "Exploring intelligent assistance, goal-based orchestration, contextual action, and visible user control."
        },
        {
          "name": "Arvenilo Spatial",
          "availability": "Coming soon",
          "description": "Exploring richer spatial environments, place-aware layers, and continuity between physical and digital context."
        },
        {
          "name": "Arvenilo Network",
          "availability": "Coming soon",
          "description": "Exploring portable trust, connected identity and access, interoperability, and supporting infrastructure."
        }
      ],
      "milestones": [
        {
          "year": "2026",
          "title": "Arvenilo founded",
          "description": "The venture launched around a unified intelligent-reality product direction."
        },
        {
          "year": "2026",
          "title": "AnchorAR available",
          "description": "The first product provides a web-based path for building and opening interactive AR experiences."
        }
      ],
      "highlights": [
        "Physical, immersive, and intelligent layers remain legible",
        "Human control is treated as a product requirement",
        "Web-based delivery reduces installation friction for AnchorAR",
        "Future directions are clearly separated from currently available capability"
      ],
      "currentDirection": {
        "title": "From AnchorAR to a broader intelligent-reality platform",
        "body": "AnchorAR is available now. The Agents, Spatial, and Network families communicate Arvenilo's next product directions while remaining clearly marked as forthcoming."
      },
      "gallery": []
    }
  ],
  "de": [
    {
      "slug": "rosary-plant-house",
      "name": "Rosary Plant House",
      "role": "Gründer",
      "founded": 2020,
      "category": "Gartenbau & E-Commerce",
      "status": "Aktiv",
      "tagline": "Spezialpflanzen und praxisnahes Wissen aus den Nilgiris.",
      "description": "Eine Online-Pflanzengärtnerei in Coonoor mit Sukkulenten, Kakteen, Blattpflanzen und Balkonpflanzen für Kundinnen und Kunden in Indien.",
      "mission": "Besondere, sorgfältig gezogene Pflanzen leichter zugänglich machen und zugleich nützliche Hinweise für ihre erfolgreiche Pflege zu Hause geben.",
      "website": "https://rosaryplanthouse.com",
      "accent": "botanical",
      "heroImage": "/images/entrepreneurship/rosary-plant-house-hero.jpg",
      "heroAlt": "Eine Auswahl von in der Gärtnerei gezogenen Pflanzen bei Rosary Plant House",
      "opportunity": {
        "title": "Die Chance",
        "body": "Pflanzenbegeisterte brauchen oft mehr als einen Katalog: geeignete Sorten, klare Pflegeinformationen und verlässliche Unterstützung für indische Wohnungen, Balkone und Jahreszeiten."
      },
      "solution": {
        "title": "Eine Gärtnerei mit digitalem Eingang",
        "body": "Rosary Plant House verbindet in Coonoor gezogene Pflanzen mit einem Online-Shop, klaren Kategorien, praxisnahen Pflegeanleitungen, Versandinformationen, Bewertungen und erreichbarem Kundensupport."
      },
      "founderRole": {
        "title": "Rolle als Gründer",
        "body": "Als Gründer gestalte ich die Ausrichtung des Unternehmens – vom Gärtnereisortiment über das Kundenerlebnis und den digitalen Auftritt bis zum Praxiswissen, das jeden Kauf begleitet.",
        "responsibilities": [
          "Geschäfts- und Markenrichtung einer online ausgerichteten Pflanzengärtnerei festlegen",
          "Produktsortiment und kundenorientierte Pflanzenkategorien entwickeln",
          "Handel, Pflegewissen, Versandinformationen und Kundensupport verbinden",
          "Ein digitales Erlebnis pflegen, das die Fachkenntnis der Gärtnerei widerspiegelt"
        ]
      },
      "products": [
        {
          "name": "Sukkulenten & Echeverien",
          "availability": "Verfügbar",
          "description": "Wassersparende Pflanzen für Sammler, Balkone und Innenräume."
        },
        {
          "name": "Kakteen & Aloe",
          "availability": "Verfügbar",
          "description": "Ausdrucksstarke, robuste Pflanzen mit einsteigerfreundlichen Pflegeinformationen."
        },
        {
          "name": "Blatt- & Balkonpflanzen",
          "availability": "Verfügbar",
          "description": "Grünpflanzen für Wohnungen, Balkone und alltägliche Innenräume."
        },
        {
          "name": "Pflanzenratgeber",
          "availability": "Verfügbar",
          "description": "Hinweise zu Monsun, Wurzelfäule, Zimmerpflege, Kakteen und wassersparenden Balkonen in Indien."
        }
      ],
      "milestones": [
        {
          "year": "2020",
          "title": "Unternehmen gegründet",
          "description": "Rosary Plant House startete in Coonoor mit dem Schwerpunkt auf Spezialpflanzen und fundierter Pflege."
        },
        {
          "year": "Heute",
          "title": "Online-Gärtnerei und Wissensplattform",
          "description": "Das Unternehmen verbindet seinen Pflanzenkatalog mit Pflegeratgebern, Versanddetails, Bewertungen und direkter Unterstützung."
        }
      ],
      "highlights": [
        "Gärtnereistandort in Coonoor, The Nilgiris",
        "Seltene Sukkulenten, Kakteen, Blatt- und Balkonpflanzen",
        "Versand in Südindien und wichtige Städte Nordindiens",
        "Pflanzenpflegewissen für indische Bedingungen"
      ],
      "currentDirection": {
        "title": "Ein vertrauenswürdiges Kauferlebnis für Pflanzen ausbauen",
        "body": "Rosary Plant House verbindet weiterhin spezialisiertes Sortiment, praktische Bildung, transparenten Support und einen einfachen digitalen Weg von der Entdeckung bis zur Pflanzenpflege."
      },
      "gallery": []
    },
    {
      "slug": "arvenilo",
      "name": "Arvenilo",
      "role": "Gründer",
      "founded": 2026,
      "category": "Intelligent-Reality-Produkte",
      "status": "Im Aufbau",
      "tagline": "Die intelligente Ebene zwischen physischer und digitaler Realität.",
      "description": "Ein Technologieunternehmen für zugängliche Produkte, die nützliche Intelligenz, räumliche Interaktion und vertrauenswürdige digitale Systeme verbinden.",
      "mission": "Intelligenz in die Welt um Menschen integrieren und dabei Fähigkeiten, Status und Kontrolle für die nutzende Person verständlich halten.",
      "website": "https://sshibinthomass.github.io/arvenilo-site/",
      "accent": "spatial",
      "heroImage": "/images/entrepreneurship/arvenilo-hero.png",
      "heroAlt": "Arvenilo Markenmotiv für Intelligent Reality",
      "opportunity": {
        "title": "Die Chance",
        "body": "Physische Objekte, immersive Medien und intelligente Assistenz werden meist getrennt angeboten. Arvenilo untersucht, wie diese Ebenen zusammenwirken können, ohne die Technologie undurchsichtig zu machen oder Menschen die Kontrolle zu nehmen."
      },
      "solution": {
        "title": "Eine Marke über drei verständliche Ebenen",
        "body": "Arvenilo verbindet einen vertrauten physischen Berührungspunkt, eine interaktive räumliche Ebene und ein kontextbezogenes intelligentes Ergebnis. Jede Ebene bleibt mit wachsender Leistungsfähigkeit sichtbar und verständlich."
      },
      "founderRole": {
        "title": "Rolle als Gründer",
        "body": "Als Gründer definiere ich die Produktvision für Intelligent Reality und übersetze sie in fokussierte Produktfamilien, Interaktionsprinzipien, technische Ausrichtung und ein zugängliches öffentliches Produkterlebnis.",
        "responsibilities": [
          "Marke, Produktstrategie und Prinzipien menschlicher Kontrolle definieren",
          "AnchorAR als erstes verfügbares Produkt entwickeln",
          "Künftige Richtungen für Agenten, Spatial Computing und vertrauenswürdige Infrastruktur gestalten",
          "Produktdesign, Softwarearchitektur und öffentliche Kommunikation verbinden"
        ]
      },
      "products": [
        {
          "name": "AnchorAR",
          "availability": "Jetzt verfügbar",
          "description": "Interaktive webbasierte Augmented-Reality-Erlebnisse mit weniger Installationshürden erstellen, veröffentlichen, teilen und öffnen."
        },
        {
          "name": "Arvenilo Agents",
          "availability": "Demnächst",
          "description": "Erkundung intelligenter Assistenz, zielbasierter Orchestrierung, kontextbezogener Aktionen und sichtbarer Nutzerkontrolle."
        },
        {
          "name": "Arvenilo Spatial",
          "availability": "Demnächst",
          "description": "Erkundung reichhaltiger räumlicher Umgebungen, ortsbezogener Ebenen und Kontinuität zwischen physischem und digitalem Kontext."
        },
        {
          "name": "Arvenilo Network",
          "availability": "Demnächst",
          "description": "Erkundung portablen Vertrauens, vernetzter Identität und Zugänge, Interoperabilität und unterstützender Infrastruktur."
        }
      ],
      "milestones": [
        {
          "year": "2026",
          "title": "Arvenilo gegründet",
          "description": "Das Unternehmen startete mit einer einheitlichen Produktrichtung für Intelligent Reality."
        },
        {
          "year": "2026",
          "title": "AnchorAR verfügbar",
          "description": "Das erste Produkt bietet einen webbasierten Weg zum Erstellen und Öffnen interaktiver AR-Erlebnisse."
        }
      ],
      "highlights": [
        "Physische, immersive und intelligente Ebenen bleiben verständlich",
        "Menschliche Kontrolle ist eine Produktanforderung",
        "Webbasierte Bereitstellung reduziert Installationshürden für AnchorAR",
        "Zukünftige Richtungen sind klar von verfügbaren Funktionen getrennt"
      ],
      "currentDirection": {
        "title": "Von AnchorAR zu einer breiteren Intelligent-Reality-Plattform",
        "body": "AnchorAR ist jetzt verfügbar. Die Familien Agents, Spatial und Network zeigen Arvenilos nächste Produktrichtungen und bleiben klar als zukünftig gekennzeichnet."
      },
      "gallery": []
    }
  ]
}
```

- [ ] **Step 5: Run the data tests**

Run:

```powershell
node --test --test-name-pattern="venture data|case-study|Arvenilo availability|venture hero" tests/*.test.mjs
```

Expected: 4 matching tests PASS.

- [ ] **Step 6: Commit the content foundation**

Run:

```powershell
git add src/data/ventures.json tests/entrepreneurship.test.mjs public/images/entrepreneurship/rosary-plant-house-hero.jpg public/images/entrepreneurship/arvenilo-hero.png
git commit -m "feat: add bilingual entrepreneurship content"
```

Expected: one commit containing only the data, test, and two media files.

---

### Task 2: Navigation, Routes, and Interface Translations

**Files:**
- Modify: `tests/entrepreneurship.test.mjs`
- Modify: `src/App.jsx`
- Modify: `src/components/Layout/Header.jsx`
- Modify: `src/locales/en.json`
- Modify: `src/locales/de.json`
- Create: `src/pages/Entrepreneurship.jsx`
- Create: `src/pages/VentureDetail.jsx`

**Interfaces:**
- Consumes: Stable venture slugs from `src/data/ventures.json`.
- Produces: `/:lang/entrepreneurship` and `/:lang/entrepreneurship/:slug`; `t('nav.entrepreneurship')` and `t('entrepreneurship.*')` labels.

- [ ] **Step 1: Add failing source-contract tests for navigation, routing, and translations**

Append to `tests/entrepreneurship.test.mjs`:

```js
test('Entrepreneurship is registered after Projects in navigation', async () => {
  const header = await read('../src/components/Layout/Header.jsx');
  assert.match(
    header,
    /key: 'projects'[\s\S]*key: 'entrepreneurship'[\s\S]*key: 'hobbyProjects'/,
  );
});

test('overview and stable venture slug routes are registered', async () => {
  const app = await read('../src/App.jsx');
  assert.match(app, /path="\/:lang\/entrepreneurship"/);
  assert.match(app, /path="\/:lang\/entrepreneurship\/:slug"/);
  assert.match(app, /import Entrepreneurship from '\.\/pages\/Entrepreneurship'/);
  assert.match(app, /import VentureDetail from '\.\/pages\/VentureDetail'/);
});

test('Entrepreneurship interface copy is bilingual', async () => {
  const [en, de] = await Promise.all([
    read('../src/locales/en.json').then(JSON.parse),
    read('../src/locales/de.json').then(JSON.parse),
  ]);

  assert.equal(en.nav.entrepreneurship, 'Entrepreneurship');
  assert.equal(de.nav.entrepreneurship, 'Unternehmertum');
  assert.equal(en.entrepreneurship.exploreVenture, 'Explore venture');
  assert.equal(de.entrepreneurship.exploreVenture, 'Unternehmen entdecken');
  assert.ok(en.entrepreneurship.notFoundTitle);
  assert.ok(de.entrepreneurship.notFoundTitle);
});
```

- [ ] **Step 2: Run the new contract tests and confirm failure**

Run:

```powershell
node --test --test-name-pattern="Entrepreneurship is registered|overview and stable|interface copy" tests/*.test.mjs
```

Expected: 3 tests FAIL because the nav item, routes, imports, and translation keys do not exist.

- [ ] **Step 3: Add the navigation item and routes**

In `src/components/Layout/Header.jsx`, insert this entry immediately after Projects:

```jsx
{ key: 'entrepreneurship', path: '/entrepreneurship' },
```

In `src/App.jsx`, add imports:

```jsx
import Entrepreneurship from './pages/Entrepreneurship';
import VentureDetail from './pages/VentureDetail';
```

Register these routes after the Projects routes and before Hobby Projects:

```jsx
<Route path="/:lang/entrepreneurship" element={
  <LanguageWrapper>
    <Layout>
      <Entrepreneurship />
    </Layout>
  </LanguageWrapper>
} />

<Route path="/:lang/entrepreneurship/:slug" element={
  <LanguageWrapper>
    <Layout>
      <VentureDetail />
    </Layout>
  </LanguageWrapper>
} />
```

- [ ] **Step 4: Add the bilingual interface labels**

Add to `src/locales/en.json`:

```json
"entrepreneurship": {
  "title": "Entrepreneurship",
  "description": "Ventures I founded to turn specialist knowledge and emerging technology into useful products and experiences.",
  "exploreVenture": "Explore venture",
  "founder": "Founder",
  "founded": "Founded",
  "status": "Status",
  "products": "Products and directions",
  "highlights": "Highlights",
  "milestones": "Journey and milestones",
  "visitWebsite": "Visit official website",
  "backToEntrepreneurship": "Back to Entrepreneurship",
  "notFoundTitle": "Venture not found",
  "notFoundDescription": "The requested venture does not exist in this portfolio."
}
```

Add to `src/locales/de.json`:

```json
"entrepreneurship": {
  "title": "Unternehmertum",
  "description": "Von mir gegründete Unternehmen, die Fachwissen und neue Technologien in nützliche Produkte und Erlebnisse übersetzen.",
  "exploreVenture": "Unternehmen entdecken",
  "founder": "Gründer",
  "founded": "Gegründet",
  "status": "Status",
  "products": "Produkte und Richtungen",
  "highlights": "Höhepunkte",
  "milestones": "Entwicklung und Meilensteine",
  "visitWebsite": "Offizielle Website besuchen",
  "backToEntrepreneurship": "Zurück zu Unternehmertum",
  "notFoundTitle": "Unternehmen nicht gefunden",
  "notFoundDescription": "Das angeforderte Unternehmen ist in diesem Portfolio nicht vorhanden."
}
```

Also add `"entrepreneurship": "Entrepreneurship"` to the English `nav` object and `"entrepreneurship": "Unternehmertum"` to the German `nav` object.

- [ ] **Step 5: Add temporary route components so the build is valid**

Create `src/pages/Entrepreneurship.jsx`:

```jsx
import React from 'react';

const Entrepreneurship = () => <main className="section" />;

export default Entrepreneurship;
```

Create `src/pages/VentureDetail.jsx`:

```jsx
import React from 'react';

const VentureDetail = () => <main className="section" />;

export default VentureDetail;
```

- [ ] **Step 6: Run the focused tests and build**

Run:

```powershell
node --test --test-name-pattern="Entrepreneurship is registered|overview and stable|interface copy" tests/*.test.mjs
npm run build
```

Expected: 3 focused tests PASS; Vite build succeeds.

- [ ] **Step 7: Commit only the route and translation work**

Run:

```powershell
git add src/App.jsx src/components/Layout/Header.jsx src/pages/Entrepreneurship.jsx src/pages/VentureDetail.jsx tests/entrepreneurship.test.mjs
git add -p src/locales/en.json src/locales/de.json
git diff --cached --stat
git commit -m "feat: add entrepreneurship routes and navigation"
```

Expected: the staged diff contains only Entrepreneurship changes and excludes earlier user edits in the locale files.

---

### Task 3: Entrepreneurship Overview and Venture Cards

**Files:**
- Modify: `tests/entrepreneurship.test.mjs`
- Modify: `src/pages/Entrepreneurship.jsx`
- Create: `src/pages/Entrepreneurship.css`
- Create: `src/components/VentureCard/VentureCard.jsx`
- Create: `src/components/VentureCard/VentureCard.css`

**Interfaces:**
- Consumes: `ventures[language]` records and `/:lang/entrepreneurship/:slug` routes.
- Produces: `VentureCard({ venture, lang, exploreLabel })` and a complete overview page.

- [ ] **Step 1: Add failing overview renderer tests**

Append to `tests/entrepreneurship.test.mjs`:

```js
test('overview loads localized venture data and renders shared cards', async () => {
  const overview = await read('../src/pages/Entrepreneurship.jsx');
  assert.match(overview, /import venturesData from '\.\.\/data\/ventures\.json'/);
  assert.match(overview, /venturesData\[currentLang\] \|\| venturesData\.en/);
  assert.match(overview, /<VentureCard/);
  assert.match(overview, /t\('entrepreneurship\.description'\)/);
});

test('venture cards link internally and expose founder metadata', async () => {
  const card = await read('../src/components/VentureCard/VentureCard.jsx');
  assert.match(card, /to={`\/\$\{lang\}\/entrepreneurship\/\$\{venture\.slug\}`}/);
  assert.match(card, /venture\.role/);
  assert.match(card, /venture\.founded/);
  assert.match(card, /venture\.status/);
  assert.match(card, /venture\.heroAlt/);
});
```

- [ ] **Step 2: Run the overview tests and confirm failure**

Run:

```powershell
node --test --test-name-pattern="overview loads|venture cards" tests/*.test.mjs
```

Expected: FAIL because `VentureCard.jsx` and the complete overview do not exist.

- [ ] **Step 3: Implement the reusable venture card**

Create `src/components/VentureCard/VentureCard.jsx`:

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './VentureCard.css';

const VentureCard = ({ venture, lang, exploreLabel, index }) => (
  <motion.article
    className={`venture-card venture-card--${venture.accent}`}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="venture-card__media">
      <img src={venture.heroImage} alt={venture.heroAlt} />
      <span className="venture-card__status">{venture.status}</span>
    </div>
    <div className="venture-card__body">
      <div className="venture-card__eyebrow">
        <span>{venture.role}</span>
        <span aria-hidden="true">•</span>
        <span>{venture.founded}</span>
      </div>
      <h2>{venture.name}</h2>
      <p className="venture-card__category">{venture.category}</p>
      <p>{venture.description}</p>
      <Link
        className="venture-card__link"
        to={`/${lang}/entrepreneurship/${venture.slug}`}
      >
        {exploreLabel} <span aria-hidden="true">→</span>
      </Link>
    </div>
  </motion.article>
);

export default VentureCard;
```

Create `src/components/VentureCard/VentureCard.css`:

```css
.venture-card--botanical {
  --venture-accent: #15803d;
  --venture-accent-soft: rgba(21, 128, 61, 0.12);
}

.venture-card--spatial {
  --venture-accent: var(--accent-primary);
  --venture-accent-soft: rgba(79, 70, 229, 0.12);
}

.venture-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.venture-card:hover {
  border-color: var(--venture-accent);
  box-shadow: var(--card-hover-shadow);
  transform: translateY(-6px);
}

.venture-card__media {
  background: var(--venture-accent-soft);
  position: relative;
}

.venture-card__media img {
  aspect-ratio: 16 / 9;
  object-fit: cover;
  width: 100%;
}

.venture-card__status {
  background: var(--card-bg);
  border: 1px solid var(--venture-accent);
  border-radius: 999px;
  bottom: 1rem;
  color: var(--venture-accent);
  font-size: 0.78rem;
  font-weight: 700;
  padding: 0.35rem 0.7rem;
  position: absolute;
  right: 1rem;
}

.venture-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem;
}

.venture-card__body h2 {
  font-size: 1.65rem;
  margin-bottom: 0.35rem;
}

.venture-card__eyebrow {
  align-items: center;
  color: var(--venture-accent);
  display: flex;
  flex-wrap: wrap;
  font-family: 'Fira Code', monospace;
  font-size: 0.8rem;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
  text-transform: uppercase;
}

.venture-card__category {
  color: var(--text-secondary);
  font-weight: 600;
}

.venture-card__link {
  align-items: center;
  align-self: flex-start;
  color: var(--venture-accent);
  display: inline-flex;
  font-weight: 700;
  gap: 0.4rem;
  margin-top: auto;
  padding: 0.5rem 0;
}

.venture-card__link:focus-visible {
  border-radius: 4px;
  outline: 3px solid var(--venture-accent);
  outline-offset: 4px;
}
```

- [ ] **Step 4: Implement the overview page**

Replace `src/pages/Entrepreneurship.jsx` with:

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import VentureCard from '../components/VentureCard/VentureCard';
import venturesData from '../data/ventures.json';
import './Entrepreneurship.css';

const Entrepreneurship = () => {
  const { t, i18n } = useTranslation();
  const { lang } = useParams();
  const currentLang = i18n.language;
  const ventures = venturesData[currentLang] || venturesData.en;

  return (
    <main className="entrepreneurship section">
      <div className="container">
        <motion.header
          className="entrepreneurship__header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="entrepreneurship__kicker">Founder portfolio</p>
          <h1 className="section-title">{t('entrepreneurship.title')}</h1>
          <p className="entrepreneurship__intro">
            {t('entrepreneurship.description')}
          </p>
        </motion.header>

        <div className="entrepreneurship__grid">
          {ventures.map((venture, index) => (
            <VentureCard
              key={venture.slug}
              venture={venture}
              lang={lang}
              exploreLabel={t('entrepreneurship.exploreVenture')}
              index={index}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Entrepreneurship;
```

Create `src/pages/Entrepreneurship.css`:

```css
.entrepreneurship {
  min-height: 70vh;
}

.entrepreneurship__header {
  max-width: 760px;
  margin: 0 auto 3rem;
  text-align: center;
}

.entrepreneurship__kicker {
  color: var(--accent-secondary);
  font-family: 'Fira Code', monospace;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.entrepreneurship__intro {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.entrepreneurship__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
}

@media (max-width: 760px) {
  .entrepreneurship__grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 5: Run focused tests and build**

Run:

```powershell
node --test --test-name-pattern="overview loads|venture cards" tests/*.test.mjs
npm run build
```

Expected: 2 focused tests PASS; build succeeds.

- [ ] **Step 6: Commit the overview**

Run:

```powershell
git add src/pages/Entrepreneurship.jsx src/pages/Entrepreneurship.css src/components/VentureCard/VentureCard.jsx src/components/VentureCard/VentureCard.css tests/entrepreneurship.test.mjs
git commit -m "feat: build entrepreneurship overview"
```

---

### Task 4: Shared Founder Case-Study Pages

**Files:**
- Modify: `tests/entrepreneurship.test.mjs`
- Modify: `src/pages/VentureDetail.jsx`
- Create: `src/pages/VentureDetail.css`

**Interfaces:**
- Consumes: `venturesData`, route parameters `{ lang, slug }`, and `entrepreneurship.*` translations.
- Produces: localized case studies for both stable slugs plus an explicit not-found state.

- [ ] **Step 1: Add failing detail-renderer and safety tests**

Append to `tests/entrepreneurship.test.mjs`:

```js
test('detail renderer resolves the slug with English fallback', async () => {
  const detail = await read('../src/pages/VentureDetail.jsx');
  assert.match(detail, /const localizedVenture = venturesData\[currentLang\]/);
  assert.match(detail, /venture\.slug === slug/);
  assert.match(detail, /const englishVenture = venturesData\.en/);
  assert.match(detail, /const venture = localizedVenture \|\| englishVenture/);
});

test('detail renderer covers every approved case-study section', async () => {
  const detail = await read('../src/pages/VentureDetail.jsx');
  for (const field of [
    'mission',
    'opportunity',
    'solution',
    'founderRole',
    'products',
    'milestones',
    'highlights',
    'currentDirection',
    'gallery',
  ]) {
    assert.match(detail, new RegExp(`venture\\.${field}`));
  }
});

test('official venture links use safe new-tab attributes', async () => {
  const detail = await read('../src/pages/VentureDetail.jsx');
  assert.match(detail, /href={venture\.website}/);
  assert.match(detail, /target="_blank"/);
  assert.match(detail, /rel="noopener noreferrer"/);
});

test('unknown venture slugs render a localized explicit error state', async () => {
  const detail = await read('../src/pages/VentureDetail.jsx');
  assert.match(detail, /entrepreneurship\.notFoundTitle/);
  assert.match(detail, /entrepreneurship\.notFoundDescription/);
  assert.match(detail, /entrepreneurship\.backToEntrepreneurship/);
});
```

- [ ] **Step 2: Run the detail tests and confirm failure**

Run:

```powershell
node --test --test-name-pattern="detail renderer|official venture|unknown venture" tests/*.test.mjs
```

Expected: 4 tests FAIL against the temporary empty component.

- [ ] **Step 3: Implement slug resolution and the not-found state**

Replace `src/pages/VentureDetail.jsx` with a component that starts with these exact resolution rules:

```jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import venturesData from '../data/ventures.json';
import './VentureDetail.css';

const VentureDetail = () => {
  const { t, i18n } = useTranslation();
  const { lang, slug } = useParams();
  const currentLang = i18n.language;
  const localizedVenture = venturesData[currentLang]?.find(
    (venture) => venture.slug === slug,
  );
  const englishVenture = venturesData.en.find(
    (venture) => venture.slug === slug,
  );
  const venture = localizedVenture || englishVenture;

  if (!venture) {
    return (
      <main className="venture-not-found section">
        <div className="container">
          <h1>{t('entrepreneurship.notFoundTitle')}</h1>
          <p>{t('entrepreneurship.notFoundDescription')}</p>
          <Link to={`/${lang}/entrepreneurship`}>
            ← {t('entrepreneurship.backToEntrepreneurship')}
          </Link>
        </div>
      </main>
    );
  }
```

- [ ] **Step 4: Render the complete case study**

Continue `src/pages/VentureDetail.jsx` after the not-found block with:

```jsx
  return (
    <main className={`venture-detail venture-detail--${venture.accent}`}>
      <section className="venture-hero section">
        <div className="container venture-hero__grid">
          <motion.div
            className="venture-hero__content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link className="venture-back-link" to={`/${lang}/entrepreneurship`}>
              ← {t('entrepreneurship.backToEntrepreneurship')}
            </Link>
            <p className="venture-hero__category">{venture.category}</p>
            <h1>{venture.name}</h1>
            <p className="venture-hero__tagline">{venture.tagline}</p>
            <div className="venture-hero__meta">
              <span>{venture.role}</span>
              <span>{t('entrepreneurship.founded')} {venture.founded}</span>
              <span>{venture.status}</span>
            </div>
            <p className="venture-hero__mission">{venture.mission}</p>
            <a
              className="venture-cta"
              href={venture.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('entrepreneurship.visitWebsite')} ↗
            </a>
          </motion.div>
          <motion.div
            className="venture-hero__media"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <img src={venture.heroImage} alt={venture.heroAlt} />
          </motion.div>
        </div>
      </section>

      <section className="venture-section section">
        <div className="container venture-narrative-grid">
          {[venture.opportunity, venture.solution].map((section) => (
            <article className="venture-panel" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="venture-section venture-section--tinted section">
        <div className="container venture-founder-grid">
          <div>
            <p className="venture-section__label">{venture.role}</p>
            <h2>{venture.founderRole.title}</h2>
            <p>{venture.founderRole.body}</p>
          </div>
          <ul className="venture-responsibilities">
            {venture.founderRole.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="venture-section section">
        <div className="container">
          <h2 className="venture-section__title">{t('entrepreneurship.products')}</h2>
          <div className="venture-product-grid">
            {venture.products.map((product) => (
              <article className="venture-product" key={product.name}>
                <span className="venture-product__availability">
                  {product.availability}
                </span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="venture-section venture-section--tinted section">
        <div className="container venture-evidence-grid">
          <div>
            <h2>{t('entrepreneurship.milestones')}</h2>
            <ol className="venture-timeline">
              {venture.milestones.map((milestone) => (
                <li key={`${milestone.year}-${milestone.title}`}>
                  <span>{milestone.year}</span>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2>{t('entrepreneurship.highlights')}</h2>
            <ul className="venture-highlights">
              {venture.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="venture-section section">
        <div className="container venture-direction">
          <h2>{venture.currentDirection.title}</h2>
          <p>{venture.currentDirection.body}</p>
        </div>
      </section>

      {venture.gallery?.length > 0 && (
        <section className="venture-section section">
          <div className="container venture-gallery">
            {venture.gallery.map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} />
            ))}
          </div>
        </section>
      )}

      <section className="venture-closing section">
        <div className="container">
          <h2>{venture.name}</h2>
          <p>{venture.tagline}</p>
          <a
            className="venture-cta"
            href={venture.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('entrepreneurship.visitWebsite')} ↗
          </a>
        </div>
      </section>
    </main>
  );
};

export default VentureDetail;
```

- [ ] **Step 5: Add complete responsive styling**

Create `src/pages/VentureDetail.css`:

```css
.venture-detail--botanical {
  --venture-accent: #15803d;
  --venture-surface: rgba(21, 128, 61, 0.08);
}

.venture-detail--spatial {
  --venture-accent: var(--accent-primary);
  --venture-surface: rgba(79, 70, 229, 0.08);
}

.venture-hero {
  background: linear-gradient(135deg, var(--venture-surface), transparent);
}

.venture-hero__grid {
  align-items: center;
  display: grid;
  gap: 3rem;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
}

.venture-hero__content,
.venture-hero__media {
  min-width: 0;
}

.venture-back-link {
  display: inline-flex;
  margin-bottom: 2rem;
}

.venture-hero__category,
.venture-section__label {
  color: var(--venture-accent);
  font-family: 'Fira Code', monospace;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.venture-hero h1 {
  font-size: clamp(2.5rem, 6vw, 5rem);
  margin-bottom: 1rem;
}

.venture-hero__tagline {
  font-size: 1.3rem;
}

.venture-hero__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin: 1.5rem 0;
}

.venture-hero__meta span,
.venture-product__availability {
  background: var(--venture-surface);
  border: 1px solid var(--venture-accent);
  border-radius: 999px;
  color: var(--venture-accent);
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.4rem 0.75rem;
}

.venture-hero__mission {
  font-size: 1.05rem;
  max-width: 62ch;
}

.venture-hero__media {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}

.venture-hero__media img {
  aspect-ratio: 16 / 10;
  object-fit: cover;
  width: 100%;
}

.venture-cta {
  background: var(--venture-accent);
  border-radius: 10px;
  color: #fff;
  display: inline-flex;
  font-weight: 700;
  overflow-wrap: anywhere;
  padding: 0.8rem 1.1rem;
}

.venture-cta:hover {
  color: #fff;
  filter: brightness(1.08);
}

.venture-cta:focus-visible,
.venture-back-link:focus-visible {
  border-radius: 4px;
  outline: 3px solid var(--venture-accent);
  outline-offset: 4px;
}

.venture-section--tinted {
  background: var(--venture-surface);
}

.venture-narrative-grid,
.venture-product-grid,
.venture-founder-grid,
.venture-evidence-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.venture-panel,
.venture-product {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 18px;
  box-shadow: var(--shadow-md);
  padding: 1.5rem;
}

.venture-section__title {
  margin-bottom: 2rem;
  text-align: center;
}

.venture-product h3 {
  margin: 1.2rem 0 0.7rem;
}

.venture-responsibilities,
.venture-highlights {
  list-style: none;
}

.venture-responsibilities li,
.venture-highlights li {
  border-bottom: 1px solid var(--border-color);
  padding: 0.8rem 0 0.8rem 1.5rem;
  position: relative;
}

.venture-responsibilities li::before,
.venture-highlights li::before {
  color: var(--venture-accent);
  content: '◆';
  left: 0;
  position: absolute;
}

.venture-timeline {
  border-left: 2px solid var(--venture-accent);
  list-style: none;
  margin: 1.5rem 0 0 0.45rem;
  padding-left: 1.5rem;
}

.venture-timeline li {
  padding-bottom: 1.5rem;
  position: relative;
}

.venture-timeline li::before {
  background: var(--venture-accent);
  border-radius: 50%;
  content: '';
  height: 0.75rem;
  left: -1.94rem;
  position: absolute;
  top: 0.35rem;
  width: 0.75rem;
}

.venture-timeline span {
  color: var(--venture-accent);
  font-family: 'Fira Code', monospace;
  font-weight: 700;
}

.venture-direction,
.venture-closing .container {
  max-width: 760px;
  text-align: center;
}

.venture-gallery {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.venture-gallery img {
  aspect-ratio: 16 / 10;
  border-radius: 16px;
  object-fit: cover;
  width: 100%;
}

.venture-closing {
  background: var(--venture-surface);
  text-align: center;
}

.venture-not-found {
  align-items: center;
  display: flex;
  min-height: 60vh;
  text-align: center;
}

@media (max-width: 760px) {
  .venture-hero__grid,
  .venture-narrative-grid,
  .venture-product-grid,
  .venture-founder-grid,
  .venture-evidence-grid,
  .venture-gallery {
    grid-template-columns: 1fr;
  }

  .venture-hero__grid {
    gap: 2rem;
  }

  .venture-hero__media {
    order: -1;
  }
}
```

- [ ] **Step 6: Run focused tests and build**

Run:

```powershell
node --test --test-name-pattern="detail renderer|official venture|unknown venture" tests/*.test.mjs
npm run build
```

Expected: 4 focused tests PASS; build succeeds.

- [ ] **Step 7: Commit the detail pages**

Run:

```powershell
git add src/pages/VentureDetail.jsx src/pages/VentureDetail.css tests/entrepreneurship.test.mjs
git commit -m "feat: add founder venture case studies"
```

---

### Task 5: Accessibility, Responsive Verification, and Regression Checks

**Files:**
- Modify if verification exposes an issue: only Entrepreneurship files created or modified in Tasks 1-4.
- Test: `tests/entrepreneurship.test.mjs`

**Interfaces:**
- Consumes: The complete feature.
- Produces: A verified production-ready Entrepreneurship area without unrelated workspace changes.

- [ ] **Step 1: Run all automated checks**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all Node tests PASS, ESLint reports no errors, and the Vite production build succeeds.

- [ ] **Step 2: Start the site for browser verification**

Run:

```powershell
npm run dev -- --host 127.0.0.1
```

Expected: Vite reports a local URL without compilation errors. Keep the process running only during verification.

- [ ] **Step 3: Verify every route and interaction in both themes**

Open and inspect:

```text
http://127.0.0.1:5173/en/entrepreneurship
http://127.0.0.1:5173/de/entrepreneurship
http://127.0.0.1:5173/en/entrepreneurship/rosary-plant-house
http://127.0.0.1:5173/de/entrepreneurship/rosary-plant-house
http://127.0.0.1:5173/en/entrepreneurship/arvenilo
http://127.0.0.1:5173/de/entrepreneurship/arvenilo
http://127.0.0.1:5173/en/entrepreneurship/unknown
```

Verify at 1440px, 768px, and 390px widths:

- Entrepreneurship appears after Projects in desktop and mobile navigation.
- Language switching preserves the overview or detail path.
- Both cards display without image distortion or equal-height gaps.
- Every section appears in English and German.
- Keyboard focus is visible on nav, internal links, and external CTAs.
- Light and dark themes maintain readable contrast.
- The unknown slug shows the explicit error state and working back link.
- External website actions open the correct official site in a new tab.

- [ ] **Step 4: Confirm the final diff excludes unrelated work**

Run:

```powershell
git status --short
git diff --name-only HEAD~4..HEAD
```

Expected: feature commits include only the files listed in this plan. The pre-existing modifications to `src/pages/Home.jsx`, `src/pages/Home.css`, and unrelated assets remain outside the feature commits.

- [ ] **Step 5: Commit verification fixes only if required**

If verification required a scoped correction, run:

```powershell
git add src/pages/Entrepreneurship.jsx src/pages/Entrepreneurship.css src/pages/VentureDetail.jsx src/pages/VentureDetail.css src/components/VentureCard/VentureCard.jsx src/components/VentureCard/VentureCard.css tests/entrepreneurship.test.mjs
git commit -m "fix: polish entrepreneurship pages"
```

If no correction was required, do not create an empty commit.
