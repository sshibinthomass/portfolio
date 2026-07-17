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
