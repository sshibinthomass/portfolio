# WebXRify Project Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bilingual WebXRify project card and research-rich detail page that explains the complete camera-to-WebXR pipeline, fine-tuning evidence, delivery architecture, and limitations.

**Architecture:** Extend the existing localized `projects.json` records and shared React project-detail renderer rather than introducing a second page system. Add optional structured highlight, metric, pipeline, and external-link fields that older projects can omit, with one focused stylesheet for research-case-study presentation. Copy selected source screenshots into the portfolio and add stable short redirects.

**Tech Stack:** React 19, React Router 7, i18next, Framer Motion, Vite 7, Node built-in test runner, CSS.

## Global Constraints

- Use the project title `WebXRify` and subtitle `Bridging Single-Image 3D Generation and Browser-Based AR`.
- Foreground single-image 3D generation; image-target AR is supporting context only.
- Include the full mobile-camera-to-WebXR flow, DETR and SAM2 fine-tuning, quality routing, asynchronous generation, GLB processing, persistence, and evidence boundaries.
- Preserve all existing project cards and detail routes.
- Provide complete English and German records with shared media/link fallback.
- Do not expose private URLs or claim unmeasured end-to-end improvements.

---

### Task 1: Lock the WebXRify data and route contract

**Files:**
- Create: `tests/webxrify-project.test.mjs`
- Modify: `package.json`
- Modify: `src/App.jsx`
- Modify: `src/data/projects.json`

**Interfaces:**
- Consumes: the existing `{ en: Project[], de: Project[] }` JSON shape and numeric project routing.
- Produces: project ID `4`, optional `subtitle`, `pipeline`, `metrics`, `highlights`, and `externalLinks` fields; `/webxrify` and `/de/webxrify` redirects.

- [ ] **Step 1: Write the failing contract test**

Create a Node test that reads `projects.json` and `App.jsx`, locates ID 4 in both languages, and asserts the exact title, subtitle, minimum narrative headings, identical image paths, required technology names, metric values, external repository URLs, and both redirects. Use `node:test` and `node:assert/strict`; also assert that all image paths resolve under `public/`.

- [ ] **Step 2: Add the test command and confirm failure**

Add `"test": "node --test tests/*.test.mjs"` to `package.json` and run `npm test`. Expected: FAIL because WebXRify ID 4 and its redirects do not exist.

- [ ] **Step 3: Add the localized data records and redirects**

Add ID 4 to both language arrays. Each record must include the approved subtitle, a concise listing description, the same four portfolio-owned image paths, technology tags, metadata, GitHub URLs for Web-AR and Mark-AR, a complete localized `detailedDescription`, six pipeline stages, four verified metric cards, and evidence-boundary highlights. Add redirects to `/:lang/projects/4` using the existing `Navigate` pattern.

- [ ] **Step 4: Run the contract test**

Run `npm test`. Expected: PASS for bilingual records, routes, media references, metrics, and links.

- [ ] **Step 5: Commit the data contract**

Run:

```powershell
git add -- package.json tests/webxrify-project.test.mjs src/App.jsx src/data/projects.json
git commit -m "feat: add WebXRify project content"
```

### Task 2: Add research-case-study presentation

**Files:**
- Modify: `src/pages/ProjectDetail.jsx`
- Create: `src/pages/ProjectDetail.css`
- Modify: `tests/webxrify-project.test.mjs`

**Interfaces:**
- Consumes: optional `subtitle: string`, `pipeline: Array<{ stage, title, description }>`, `metrics: Array<{ label, before, after, note }>`, `highlights: Array<{ title, text, tone? }>`, and `externalLinks: Array<{ label, url, kind }>`.
- Produces: accessible optional detail sections that render only when their corresponding arrays contain data.

- [ ] **Step 1: Extend the failing test for renderer hooks**

Assert that `ProjectDetail.jsx` contains headings/translation-independent class hooks for `project-subtitle`, `project-pipeline`, `project-metrics`, `project-highlights`, and `project-external-links`, and that all outbound links use `target="_blank"` with `rel="noopener noreferrer"`.

- [ ] **Step 2: Confirm the renderer assertions fail**

Run `npm test`. Expected: FAIL because the optional research sections are not rendered yet.

- [ ] **Step 3: Implement optional structured sections**

Import `ProjectDetail.css`. After the title, render the optional subtitle and pipeline stage list. Before the technology tags, render metric cards and evidence highlights. Replace the fixed link block with a backward-compatible normalized link list: prefer `externalLinks` when present; otherwise derive entries from `appLink` and `github`. Retain the existing YouTube behavior and English fallback.

- [ ] **Step 4: Style the case study**

Create responsive styles for a horizontal pipeline on wide screens and stacked stages on narrow screens, a two-column metric grid, restrained evidence callouts, readable HTML tables, and consistent external-link buttons. Use existing CSS variables; add no dependency and no global reset.

- [ ] **Step 5: Run tests, lint, and build**

Run `npm test`, `npm run lint`, and `npm run build`. Expected: all commands exit 0 and `dist/404.html` exists.

- [ ] **Step 6: Commit the renderer**

Run:

```powershell
git add -- src/pages/ProjectDetail.jsx src/pages/ProjectDetail.css tests/webxrify-project.test.mjs
git commit -m "feat: present WebXRify research case study"
```

### Task 3: Add and verify WebXRify media

**Files:**
- Create: `public/images/project/WebXRify1.png`
- Create: `public/images/project/WebXRify2.png`
- Create: `public/images/project/WebXRify3.png`
- Create: `public/images/project/WebXRify4.png`

**Interfaces:**
- Consumes: reviewed screenshots from `D:\Github-Projects\Web-AR\artifacts` and, if needed, a rendered research architecture figure.
- Produces: stable portfolio media referenced by both localized records.

- [ ] **Step 1: Select source media by visual inspection**

Use the strongest current screenshots that show the application shell, model readiness/preview, manipulation controls, and WebXR entry state. Reject tunnel warning pages, blank camera frames, and duplicate states.

- [ ] **Step 2: Copy media with stable names**

Copy the selected files to the four exact portfolio paths. Preserve aspect ratio and source pixels; do not overwrite unrelated media.

- [ ] **Step 3: Run the media contract test**

Run `npm test`. Expected: PASS, including existence and non-zero size of every referenced image.

- [ ] **Step 4: Commit media**

Run:

```powershell
git add -- public/images/project/WebXRify1.png public/images/project/WebXRify2.png public/images/project/WebXRify3.png public/images/project/WebXRify4.png
git commit -m "assets: add WebXRify project media"
```

### Task 4: Browser and regression verification

**Files:**
- Modify only if verification exposes an implementation defect in the files above.

**Interfaces:**
- Consumes: the completed production build and local Vite application.
- Produces: verified English/German listing and detail routes at desktop and mobile widths.

- [ ] **Step 1: Run the full automated verification**

Run `npm test`, `npm run lint`, `npm run build`, and `git diff --check`. Expected: all exit 0.

- [ ] **Step 2: Start the local app and inspect English routes**

Open `/en/projects`, confirm the WebXRify card and thumbnail, follow it to `/en/projects/4`, and confirm the title, subtitle, carousel, pipeline, technical narrative, metrics, evidence notes, tags, and both repository links.

- [ ] **Step 3: Inspect German and short routes**

Open `/de/projects`, `/de/projects/4`, `/webxrify`, and `/de/webxrify`. Confirm localization, correct redirects, and shared media/link fallback.

- [ ] **Step 4: Check responsive and console behavior**

Inspect `/en/projects/4` at approximately 1440x900 and 390x844. Confirm no horizontal overflow, clipped table content, overlapping pipeline stages, missing images, or new console errors.

- [ ] **Step 5: Fix only observed defects and rerun verification**

Apply focused fixes, then rerun `npm test`, `npm run lint`, `npm run build`, and the affected browser checks. Expected: all checks pass.

- [ ] **Step 6: Commit any verification fixes**

If files changed, commit them with `git commit -m "fix: polish WebXRify project page"`. If no files changed, do not create an empty commit.
