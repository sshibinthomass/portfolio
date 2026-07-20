# WebXRify Demo Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Embed the supplied YouTube Short as a playable 16:9 video at the end of both localized WebXRify project pages.

**Architecture:** Add the video URL to both localized project records and move YouTube ID extraction into the existing media utility so it can be tested directly. The shared project detail renderer will consume that utility and retain its existing optional, responsive iframe section.

**Tech Stack:** React 19, React Router, JavaScript ES modules, JSON project data, Node.js test runner, CSS

## Global Constraints

- Use `https://youtube.com/shorts/GReSt-9uSL0?feature=share` for project ID 4 in both languages.
- Render `https://www.youtube.com/embed/GReSt-9uSL0` in the existing final video section.
- Keep the existing responsive 16:9 layout, localized heading, fullscreen support, and iframe permissions.
- Do not autoplay the video and do not open it on a separate page.
- Invalid or missing YouTube links must keep the video section hidden.
- Do not change the presentation of other project pages.

---

### Task 1: WebXRify Inline Demo Video

**Files:**
- Modify: `tests/webxrify-project.test.mjs`
- Modify: `src/utils/media.js`
- Modify: `src/pages/ProjectDetail.jsx:1-70, 206-239`
- Modify: `src/data/projects.json:103, 247`

**Interfaces:**
- Consumes: localized project records with an optional `youtubeLink: string` property.
- Produces: `getYoutubeId(url: string): string | null` from `src/utils/media.js`.
- Produces: an iframe source in the form `https://www.youtube.com/embed/<video-id>` when the URL is valid.

- [ ] **Step 1: Write the failing tests**

Add the media import near the top of `tests/webxrify-project.test.mjs`:

```js
import { getYoutubeId } from '../src/utils/media.js';
```

Extend `WebXRify exposes both public source repositories and stable short routes` with bilingual URL assertions:

```js
  assert.equal(english.youtubeLink, 'https://youtube.com/shorts/GReSt-9uSL0?feature=share');
  assert.equal(getWebXRify('de').youtubeLink, english.youtubeLink);
```

Add this focused test after it:

```js
test('WebXRify YouTube Short renders through the final inline video section', () => {
  const youtubeId = getYoutubeId(getWebXRify('en').youtubeLink);

  assert.equal(youtubeId, 'GReSt-9uSL0');
  assert.match(projectDetailSource, /https:\/\/www\.youtube\.com\/embed\/\$\{getYoutubeId\(projectYoutubeLink\)\}/);
  assert.ok(
    projectDetailSource.indexOf('className="project-video"')
      > projectDetailSource.indexOf('className="project-link-section"'),
    'the inline demo must remain after the project links',
  );
});
```

- [ ] **Step 2: Run the focused test file and verify it fails**

Run:

```powershell
node --test tests/webxrify-project.test.mjs
```

Expected: FAIL because `src/utils/media.js` does not yet export `getYoutubeId` (and the WebXRify `youtubeLink` values are still empty).

- [ ] **Step 3: Implement reusable Shorts URL parsing**

Append this export to `src/utils/media.js`:

```js
export const getYoutubeId = (url) => {
  if (!url) return null;

  const match = String(url).match(
    /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|&v=)([^#&?]*).*/,
  );

  return match?.[1]?.length === 11 ? match[1] : null;
};
```

This preserves all URL shapes accepted by the current project renderer and adds `/shorts/` support.

- [ ] **Step 4: Connect the shared project renderer to the utility**

Add this import to `src/pages/ProjectDetail.jsx`:

```js
import { getYoutubeId } from '../utils/media';
```

Delete the component-local `getYoutubeId` function. Leave both existing calls unchanged:

```jsx
{projectYoutubeLink && getYoutubeId(projectYoutubeLink) && (
```

```jsx
src={`https://www.youtube.com/embed/${getYoutubeId(projectYoutubeLink)}`}
```

Because the video section already follows `project-link-section`, no JSX reordering or CSS change is required.

- [ ] **Step 5: Add the bilingual WebXRify video data**

In both project ID 4 records in `src/data/projects.json`, replace:

```json
"youtubeLink": ""
```

with:

```json
"youtubeLink": "https://youtube.com/shorts/GReSt-9uSL0?feature=share"
```

- [ ] **Step 6: Run the focused test and verify it passes**

Run:

```powershell
node --test tests/webxrify-project.test.mjs
```

Expected: PASS, 6 tests passed and 0 failed.

- [ ] **Step 7: Run full verification**

Run:

```powershell
npm test
npm run lint
npm run build
```

Expected: all tests pass, ESLint exits with code 0, and Vite completes a production build without errors.

- [ ] **Step 8: Commit the implementation**

```powershell
git add -- tests/webxrify-project.test.mjs src/utils/media.js src/pages/ProjectDetail.jsx src/data/projects.json
git commit -m "feat: embed WebXRify demo video"
```
