import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

const projects = JSON.parse(await readFile(new URL('../src/data/projects.json', import.meta.url), 'utf8'));
const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');
const projectDetailSource = await readFile(new URL('../src/pages/ProjectDetail.jsx', import.meta.url), 'utf8');

const getWebXRify = (language) => projects[language].find((project) => project.id === 4);

test('WebXRify has complete matching bilingual project records', () => {
  const english = getWebXRify('en');
  const german = getWebXRify('de');

  assert.ok(english, 'English WebXRify project is missing');
  assert.ok(german, 'German WebXRify project is missing');
  assert.equal(english.title, 'WebXRify');
  assert.equal(german.title, 'WebXRify');
  assert.equal(english.subtitle, 'Bridging Single-Image 3D Generation and Browser-Based AR');
  assert.match(german.subtitle, /Einzelbild-3D-Generierung/);
  assert.deepEqual(german.images, english.images);
  assert.equal(english.images.length, 4);
  assert.ok(english.images.every((path) => path.startsWith('/images/project/WebXRify')));
  assert.ok(english.technologies.includes('WebXR'));
  assert.ok(english.technologies.includes('SAM2'));
  assert.ok(english.technologies.includes('Grounding DINO'));
  assert.ok(english.technologies.includes('Blender'));
  assert.ok(english.technologies.includes('Cloudflare R2'));
});

test('WebXRify documents the full camera-to-WebXR evidence path', () => {
  const english = getWebXRify('en');

  assert.ok(english.detailedDescription.includes('Research Motivation'));
  assert.ok(english.detailedDescription.includes('Mobile Capture'));
  assert.ok(english.detailedDescription.includes('Object Localization'));
  assert.ok(english.detailedDescription.includes('Segmentation and Fine-Tuning'));
  assert.ok(english.detailedDescription.includes('Image-to-3D Generation'));
  assert.ok(english.detailedDescription.includes('GLB'));
  assert.ok(english.detailedDescription.includes('WebXR'));
  assert.ok(english.detailedDescription.includes('Limitations'));
  assert.equal(english.pipeline.length, 6);
  assert.equal(english.metrics.length, 4);
  assert.deepEqual(
    english.metrics.map(({ label, before, after }) => ({ label, before, after })),
    [
      { label: 'DETR mAP', before: '0.2399', after: '0.2490' },
      { label: 'DETR mAR@100', before: '0.4094', after: '0.4313' },
      { label: 'SAM2 selected IoU', before: '0.7491', after: '0.8006' },
      { label: 'SAM2 Dice', before: '0.7556', after: '0.8805' },
    ],
  );
  assert.ok(english.highlights.some(({ tone }) => tone === 'caution'));
});

test('WebXRify exposes both public source repositories and stable short routes', () => {
  const english = getWebXRify('en');

  assert.deepEqual(
    english.externalLinks.map(({ url }) => url),
    [
      'https://github.com/sshibinthomass/Web-AR',
      'https://github.com/sshibinthomass/Mark-AR',
    ],
  );
  assert.match(appSource, /path="\/webxrify"[^\n]+\/en\/projects\/4/);
  assert.match(appSource, /path="\/de\/webxrify"[^\n]+\/de\/projects\/4/);
});

test('the shared detail renderer supports optional research case-study sections', () => {
  assert.match(projectDetailSource, /className="project-subtitle"/);
  assert.match(projectDetailSource, /className="project-pipeline"/);
  assert.match(projectDetailSource, /className="project-metrics"/);
  assert.match(projectDetailSource, /className={`project-highlight/);
  assert.match(projectDetailSource, /className="project-external-links"/);
  assert.match(projectDetailSource, /target="_blank"/);
  assert.match(projectDetailSource, /rel="noopener noreferrer"/);
});

test('every WebXRify carousel image is a non-empty portfolio-owned asset', async () => {
  const english = getWebXRify('en');

  for (const imagePath of english.images) {
    const image = await stat(new URL(`../public${imagePath}`, import.meta.url));
    assert.ok(image.isFile());
    assert.ok(image.size > 1_000, `${imagePath} is unexpectedly small`);
  }
});
