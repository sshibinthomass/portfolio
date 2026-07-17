import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homeSource = await readFile(new URL('../src/pages/Home.jsx', import.meta.url), 'utf8');
const hobbiesSource = await readFile(new URL('../src/pages/Hobbies/HobbiesMain.jsx', import.meta.url), 'utf8');

test('home and hobbies pages use the shared monochrome hobby icon set', () => {
    for (const source of [homeSource, hobbiesSource]) {
        assert.match(source, /import HobbyIcon from/);
        assert.doesNotMatch(source, /🪙|📮|📚|🌱|✈️/u);
    }
});
