import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(path, import.meta.url), 'utf8');

test('localized venture resolution merges missing nested fields by slug and preserves empty arrays', async () => {
  const resolver = await import('../src/utils/ventureData.js').catch(() => ({}));

  assert.equal(typeof resolver.resolveLocalizedVentures, 'function');

  const data = {
    en: [
      {
        slug: 'first',
        name: 'English first',
        mission: 'English mission',
        opportunity: { title: 'English title', body: 'English body' },
        gallery: [{ src: '/english.jpg', alt: 'English image' }],
      },
      { slug: 'second', name: 'English second', mission: 'Second mission' },
    ],
    de: [
      {
        slug: 'first',
        name: 'Deutsch eins',
        opportunity: { title: 'Deutscher Titel' },
        gallery: [],
      },
    ],
  };

  assert.deepEqual(resolver.resolveLocalizedVentures(data, 'de'), [
    {
      slug: 'first',
      name: 'Deutsch eins',
      mission: 'English mission',
      opportunity: { title: 'Deutscher Titel', body: 'English body' },
      gallery: [],
    },
    { slug: 'second', name: 'English second', mission: 'Second mission' },
  ]);
  assert.deepEqual(
    resolver.resolveLocalizedVenture(data, 'de', 'second'),
    { slug: 'second', name: 'English second', mission: 'Second mission' },
  );
});

test('optional-content helper rejects absent and empty sections without rejecting populated nested content', async () => {
  const resolver = await import('../src/utils/ventureData.js').catch(() => ({}));

  assert.equal(typeof resolver.hasContent, 'function');
  assert.equal(resolver.hasContent(undefined), false);
  assert.equal(resolver.hasContent({}), false);
  assert.equal(resolver.hasContent({ title: '  ', responsibilities: [] }), false);
  assert.equal(resolver.hasContent({ body: 'Useful copy' }), true);
  assert.equal(resolver.hasContent([{ description: 'Milestone copy' }]), true);
});

test('controlled media fallback covers missing sources and image load errors', async () => {
  const media = await import('../src/utils/media.js').catch(() => ({}));
  const safeImage = await read('../src/components/SafeImage/SafeImage.jsx').catch(() => '');

  assert.equal(media.FALLBACK_IMAGE, '/images/project.png');
  assert.equal(media.resolveImageSource(undefined), '/images/project.png');
  assert.equal(media.resolveImageSource(''), '/images/project.png');
  assert.equal(
    media.resolveImageSource('/images/entrepreneurship/brand.png'),
    '/images/entrepreneurship/brand.png',
  );
  assert.match(safeImage, /onError={handleImageError}/);
  assert.match(safeImage, /resolveImageSource\(src\)/);
  assert.match(safeImage, /currentTarget\.src = FALLBACK_IMAGE/);
});

test('overview and detail use field-level resolvers and guard optional case-study sections', async () => {
  const [overview, detail] = await Promise.all([
    read('../src/pages/Entrepreneurship.jsx'),
    read('../src/pages/VentureDetail.jsx'),
  ]);

  assert.match(overview, /resolveLocalizedVentures\(venturesData, currentLang\)/);
  assert.match(detail, /resolveLocalizedVenture\(venturesData, currentLang, slug\)/);
  assert.match(detail, /filter\(hasContent\)/);
  assert.match(detail, /hasContent\(venture\.founderRole\)/);
  assert.match(detail, /hasContent\(venture\.currentDirection\)/);
  assert.match(detail, /gallery\.length > 0/);
});

test('header announces menu state, moves focus into the opened menu, and localizes control names', async () => {
  const [header, headerCss, en, de] = await Promise.all([
    read('../src/components/Layout/Header.jsx'),
    read('../src/components/Layout/Header.css'),
    read('../src/locales/en.json').then(JSON.parse),
    read('../src/locales/de.json').then(JSON.parse),
  ]);

  assert.match(header, /aria-expanded={isMenuOpen}/);
  assert.match(header, /aria-controls="primary-navigation"/);
  assert.match(header, /id="primary-navigation"/);
  assert.match(header, /firstMenuLinkRef\.current\?\.focus\(\)/);
  assert.match(headerCss, /\.icon-button:focus-visible/);
  assert.match(headerCss, /\.hamburger:focus-visible/);

  for (const translations of [en, de]) {
    assert.ok(translations.header.switchLanguage);
    assert.ok(translations.header.switchTheme);
    assert.ok(translations.header.openMenu);
    assert.ok(translations.header.closeMenu);
  }
  assert.notEqual(en.header.openMenu, de.header.openMenu);
});

test('route language metadata, founder kicker, and reduced motion are synchronized and localized', async () => {
  const [app, overview, en, de] = await Promise.all([
    read('../src/App.jsx'),
    read('../src/pages/Entrepreneurship.jsx'),
    read('../src/locales/en.json').then(JSON.parse),
    read('../src/locales/de.json').then(JSON.parse),
  ]);

  assert.match(app, /document\.documentElement\.lang = validatedLang/);
  assert.match(app, /<MotionConfig reducedMotion="user">/);
  assert.match(overview, /t\('entrepreneurship\.kicker'\)/);
  assert.equal(en.entrepreneurship.kicker, 'Founder portfolio');
  assert.equal(de.entrepreneurship.kicker, 'Gr\u00fcnderportfolio');
  assert.equal(de.entrepreneurship.backToEntrepreneurship, 'Zur\u00fcck zum Unternehmertum');
});

test('Arvenilo media is contained on a light surface while Rosary retains cover treatment', async () => {
  const [cardCss, detailCss] = await Promise.all([
    read('../src/components/VentureCard/VentureCard.css'),
    read('../src/pages/VentureDetail.css'),
  ]);

  assert.match(
    cardCss,
    /\.venture-card--spatial \.venture-card__media[\s\S]*background: #f8fafc/,
  );
  assert.match(
    cardCss,
    /\.venture-card--spatial \.venture-card__media img[\s\S]*object-fit: contain[\s\S]*padding:/,
  );
  assert.match(
    detailCss,
    /\.venture-detail--spatial \.venture-hero__media[\s\S]*background: #f8fafc/,
  );
  assert.match(
    detailCss,
    /\.venture-detail--spatial \.venture-hero__media img[\s\S]*object-fit: contain[\s\S]*padding:/,
  );
  assert.match(cardCss, /\.venture-card__media img[\s\S]*object-fit: cover/);
  assert.match(detailCss, /\.venture-hero__media img[\s\S]*object-fit: cover/);
});

test('Rosary reach stays within verified regions and botanical CTA hover does not alter brightness', async () => {
  const [ventures, detailCss] = await Promise.all([
    read('../src/data/ventures.json').then(JSON.parse),
    read('../src/pages/VentureDetail.css'),
  ]);
  const rosary = ventures.en.find(({ slug }) => slug === 'rosary-plant-house');

  assert.doesNotMatch(rosary.description, /customers across India/i);
  assert.match(rosary.description, /South India and major (?:cities in )?North India/i);
  assert.doesNotMatch(detailCss, /\.venture-cta:hover\s*\{[^}]*filter:\s*brightness/s);
});
