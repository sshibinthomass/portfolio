import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('the YogaVision short URL uses the correctly spelled project name', async () => {
  const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');

  assert.match(
    appSource,
    /<Route path="\/yogavision" element={<Navigate to="\/en\/projects\/3" replace \/>} \/>/,
  );
  assert.doesNotMatch(appSource, /path="\/yogavison"/);
});
