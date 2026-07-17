import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

test('hero subtitle keeps only the daily-building message in each locale', async () => {
    const [en, de] = await Promise.all([
        readJson(new URL('../src/locales/en.json', import.meta.url)),
        readJson(new URL('../src/locales/de.json', import.meta.url)),
    ]);

    assert.equal(en.home.subtitle, 'Building new things every day');
    assert.equal(de.home.subtitle, 'Baue jeden Tag neue Dinge');
});

test('hero no longer renders the AGI Enthusiast floating badge', async () => {
    const homeSource = await readFile(
        new URL('../src/pages/Home.jsx', import.meta.url),
        'utf8',
    );

    assert.doesNotMatch(homeSource, /badge-bottom-right/);
    assert.doesNotMatch(homeSource, /AGI Enthusiast/);
});
