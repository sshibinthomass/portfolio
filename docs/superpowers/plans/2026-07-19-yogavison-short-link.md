# YogaVision Short-Link Redirect Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `/yogavison` redirect to `/en/projects/3` using the portfolio's existing client-side short-link pattern.

**Architecture:** Add one declarative React Router route to the English short-URL block in `src/App.jsx`. Protect the exact alias, destination, and replacement-navigation behavior with a focused source-level Node regression test consistent with the repository's existing tests.

**Tech Stack:** React 19, React Router 7, Node built-in test runner, Vite 7.

## Global Constraints

- Preserve the spelling `/yogavison` exactly.
- Redirect only to `/en/projects/3`.
- Use `<Navigate replace />` to match existing short-link behavior.
- Do not add a German alias or modify unrelated routes.

---

### Task 1: Add the YogaVision short-link redirect

**Files:**
- Create: `tests/yogavison-redirect.test.mjs`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: React Router's existing `Navigate` component and the English short-URL route block.
- Produces: A `/yogavison` route whose element navigates to `/en/projects/3` with `replace` enabled.

- [x] **Step 1: Write the failing regression test**

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('the YogaVision short URL redirects to the English project page', async () => {
  const appSource = await readFile(new URL('../src/App.jsx', import.meta.url), 'utf8');

  assert.match(
    appSource,
    /<Route path="\/yogavison" element={<Navigate to="\/en\/projects\/3" replace \/>} \/>/,
  );
});
```

- [x] **Step 2: Run the focused test and confirm the RED state**

Run: `node --test tests/yogavison-redirect.test.mjs`

Expected: FAIL because `src/App.jsx` does not yet contain the `/yogavison` route.

- [x] **Step 3: Add the minimal route**

Add this route to the existing `Short URL redirects - English` block in `src/App.jsx`:

```jsx
<Route path="/yogavison" element={<Navigate to="/en/projects/3" replace />} />
```

- [x] **Step 4: Verify the GREEN state and repository health**

Run:

```powershell
node --test tests/yogavison-redirect.test.mjs
npm test
npm run lint
npm run build
```

Expected: The focused test and full test suite pass, ESLint exits successfully, and Vite completes the production build.

- [ ] **Step 5: Commit the implementation**

```powershell
git add -- src/App.jsx tests/yogavison-redirect.test.mjs docs/superpowers/plans/2026-07-19-yogavison-short-link.md
git commit -m "feat: add YogaVision short-link redirect"
```
