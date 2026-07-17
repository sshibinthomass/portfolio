import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');
const ventures = JSON.parse(await read('../src/data/ventures.json'));

const bySlug = (language, slug) =>
  ventures[language].find((venture) => venture.slug === slug);

const relativeLuminance = (hex) => {
  const channels = hex.match(/[0-9a-f]{2}/gi).map((channel) => {
    const value = Number.parseInt(channel, 16) / 255;
    return value <= 0.03928
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });

  return (0.2126 * channels[0]) + (0.7152 * channels[1]) + (0.0722 * channels[2]);
};

const contrastRatio = (foreground, background) => {
  const foregroundLuminance = relativeLuminance(foreground);
  const backgroundLuminance = relativeLuminance(background);

  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
    / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
};

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
  assert.equal(
    de.entrepreneurship.description,
    'Von mir gegründete Unternehmen, die Fachwissen und neue Technologien in nützliche Produkte und Erlebnisse übersetzen.',
  );
  assert.equal(de.entrepreneurship.founder, 'Gründer');
  assert.ok(en.entrepreneurship.notFoundTitle);
  assert.ok(de.entrepreneurship.notFoundTitle);
});

test('overview loads localized venture data and renders shared cards', async () => {
  const overview = await read('../src/pages/Entrepreneurship.jsx');
  assert.match(overview, /import venturesData from '\.\.\/data\/ventures\.json'/);
  assert.match(
    overview,
    /resolveLocalizedVentures\(venturesData, currentLang\)/,
  );
  assert.match(overview, /<VentureCard/);
  assert.match(overview, /t\('entrepreneurship\.description'\)/);
});

test('venture pages rely on the shared layout main landmark', async () => {
  const [layout, overview, detail] = await Promise.all([
    read('../src/components/Layout/Layout.jsx'),
    read('../src/pages/Entrepreneurship.jsx'),
    read('../src/pages/VentureDetail.jsx'),
  ]);

  assert.match(layout, /<main\b[\s\S]*<\/main>/);
  assert.doesNotMatch(overview, /<\/?main\b/);
  assert.doesNotMatch(detail, /<\/?main\b/);
});

test('venture accent tokens retain at least 4.5 to 1 text contrast', async () => {
  const [overviewCss, cardCss, detailCss] = await Promise.all([
    read('../src/pages/Entrepreneurship.css'),
    read('../src/components/VentureCard/VentureCard.css'),
    read('../src/pages/VentureDetail.css'),
  ]);

  assert.match(overviewCss, /--entrepreneurship-kicker: #0e7490/);
  assert.match(cardCss, /--venture-accent-text: #4ade80/);
  assert.match(detailCss, /--venture-on-accent: #111827/);
  assert.match(detailCss, /color: var\(--venture-on-accent\)/);

  for (const [name, foreground, background] of [
    ['light overview kicker', '#0e7490', '#fcfdfe'],
    ['dark Arvenilo CTA', '#111827', '#818cf8'],
    ['dark botanical accent text', '#4ade80', '#070c1a'],
  ]) {
    assert.ok(
      contrastRatio(foreground, background) >= 4.5,
      `${name} does not meet 4.5:1 contrast`,
    );
  }
});

test('closed mobile navigation is removed from sequential focus', async () => {
  const headerCss = await read('../src/components/Layout/Header.css');

  assert.match(
    headerCss,
    /@media \(max-width: 968px\)[\s\S]*?\.nav \{[\s\S]*?visibility: hidden;[\s\S]*?transition:[^;]*visibility 0s linear 0\.3s;/,
  );
  assert.match(
    headerCss,
    /\.nav-open \{[\s\S]*?visibility: visible;[\s\S]*?transition-delay: 0s;/,
  );
});

test('venture cards link internally and expose founder metadata', async () => {
  const card = await read('../src/components/VentureCard/VentureCard.jsx');
  assert.match(card, /to={`\/\$\{lang\}\/entrepreneurship\/\$\{venture\.slug\}`}/);
  assert.match(card, /venture\.role/);
  assert.match(card, /venture\.founded/);
  assert.match(card, /venture\.status/);
  assert.match(card, /venture\.heroAlt/);
});

test('detail renderer resolves the slug with English fallback', async () => {
  const detail = await read('../src/pages/VentureDetail.jsx');
  assert.match(
    detail,
    /resolveLocalizedVenture\(venturesData, currentLang, slug\)/,
  );
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
