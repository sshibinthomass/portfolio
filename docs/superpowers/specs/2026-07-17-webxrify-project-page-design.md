# WebXRify Portfolio Project Page Design

## Objective

Add WebXRify to the portfolio as one bilingual project whose detail page presents the complete research and engineering path from a mobile camera capture to a reusable 3D asset placed through WebXR. The page should emphasize single-image 3D generation and the surrounding quality, delivery, and evidence pipeline. Image-target AR is supporting context, not the main product story.

## Positioning

- **Project title:** WebXRify
- **Subtitle:** Bridging Single-Image 3D Generation and Browser-Based AR
- **Primary story:** An ordinary mobile photograph becomes a prepared reference, a generated 3D model, a durable GLB, and a browser-placed AR object.
- **Project type:** Research-led engineering system and portfolio case study.
- **Scope boundary:** The page describes the combined work represented by `D:\Github-Projects\Web-AR`, `D:\Github-Projects\Mark-AR`, and `D:\Research-Papers\2d to 3d`, but it foregrounds the WebXRify camera-to-WebXR pipeline.

## Portfolio Integration

The existing portfolio is data-driven: `src/data/projects.json` supplies localized project cards and the shared `ProjectDetail` page renders metadata, media, technical narrative, technology tags, and external links. WebXRify will be added as the next stable numeric project ID in both English and German arrays.

The project will appear as one card at `/:lang/projects` and open at `/:lang/projects/:id`. Short redirects at `/webxrify` and `/de/webxrify` will lead directly to the corresponding project detail page.

Existing project behavior and styling will remain unchanged. Shared English media and links will continue to serve as the German fallback where appropriate.

## Content Architecture

The detail page will retain the portfolio's existing visual language and use a structured research-case-study narrative with the following sections:

1. **Research motivation and problem** - explain why single-image 3D is a systems problem involving capture quality, identity preservation, generation, conversion, persistence, and browser delivery.
2. **Camera-to-WebXR architecture** - summarize the distributed artifact flow and its explicit contracts.
3. **Mobile capture** - describe rear-camera capture, 1536-pixel size bounding, dimensions aligned to multiples of 16, PNG preparation, and target-phrase input.
4. **Object localization** - describe Grounding DINO as the open-vocabulary path and the household-adapted DETR model as a specialized candidate path.
5. **Segmentation and fine-tuning** - explain box-prompted SAM2 candidate masks and report the held-out adaptation results with their precision/recall trade-offs.
6. **Quality-routed preparation** - explain the source-derived Preserve route and disclosed generative Recover route, including deterministic quality checks and provenance fields.
7. **Image-to-3D generation** - describe the fixed, asynchronous generation boundary without claiming an unidentified generator architecture.
8. **GLB preparation** - explain fidelity-conscious Blender conversion, non-destructive defaults, optional front-surface projection, and asset-survival metadata.
9. **Durable storage** - describe Cloudflare Worker job handling, R2 persistence, recoverable status, and reusable GLB URLs.
10. **WebXR delivery** - describe Three.js loading, normalization, retained animations, immersive WebXR activation, hit testing, and surface placement.
11. **Verified results** - report DETR and SAM2 results in a readable summary while preserving the research paper's evidence boundaries.
12. **Limitations and next evaluation** - distinguish component evidence from unmeasured end-to-end fidelity, latency, reliability, device, and usability claims.

The narrative will use semantic headings, paragraphs, lists, and a compact results table. It will avoid unsupported marketing claims and will explicitly state when results apply only to an evaluated component artifact.

## Evidence and Metrics

The page may report these reviewed research results:

- DETR test set: 603 images and 1,605 annotated boxes.
- DETR mAP: 0.239901 to 0.248998.
- DETR mAP@0.50: 0.411604 to 0.424373.
- DETR mAR@100: 0.409370 to 0.431269.
- SAM2 evaluation: 895 held-out object instances.
- SAM2 selected-mask IoU: 0.749078 to 0.800603.
- SAM2 Dice: 0.755608 to 0.880453.
- SAM2 recall: 0.640026 to 0.942619.
- SAM2 precision: 0.922136 to 0.825981.

The interpretation must remain bounded: DETR gains are modest; SAM2 masks become more complete but less precise; and these component results do not prove higher-quality generated meshes or better end-to-end AR experiences.

## Media

Portfolio-owned copies of selected screenshots will be added under `public/images/project/` with stable WebXRify names. Media selection should prioritize:

- the mobile WebXR application shell;
- image capture or model-generation state;
- model preview or library state;
- active WebXR placement state;
- a clear system or research visual if it remains legible in the carousel.

The first image must work as the project-card thumbnail. Files will be copied from existing repository artifacts without modifying the source repositories.

## External Links

The implementation will inspect repository remotes and deployment configuration before selecting public URLs. Because the existing detail schema supports only one GitHub and one app link, WebXRify may extend the shared project data and renderer with a backward-compatible `links` collection if two repository or live-product destinations are useful. Existing `github` and `appLink` fields must continue to work unchanged for older projects.

No private, local-only, credential-bearing, or unavailable URL will be exposed.

## Localization

The English entry will contain the canonical technical narrative. The German entry will provide a complete German title, summary, metadata, section narrative, results interpretation, and limitations. Technical model names, route labels, formats, and numeric values remain unchanged.

Shared translation keys will be added only where the renderer needs reusable labels, such as a research-paper or repository link. Project-specific prose remains in project data.

## Error and Fallback Behavior

- Missing localized images, technologies, or external links fall back to the English project record using the existing behavior.
- Missing project IDs retain the current project-not-found view.
- Broken or unavailable optional external destinations are omitted rather than rendered as dead buttons.
- Media paths are verified during the production build and local route check.
- The new narrative must remain readable if JavaScript animation is reduced or the viewport is narrow.

## Verification

Implementation is complete only after:

1. `projects.json` parses and contains matching WebXRify IDs in both languages.
2. The project card appears in both English and German project listings.
3. Both project detail routes render the intended title, media, narrative, tags, metrics, and links.
4. `/webxrify` and `/de/webxrify` redirect correctly.
5. Existing project routes continue to render.
6. `npm run lint` passes, except for any clearly documented pre-existing failure.
7. `npm run build` passes and produces the SPA fallback.
8. A local browser check confirms desktop and mobile-width layouts without overflow, missing media, or console errors attributable to the change.

## Non-Goals

- Redesigning the entire portfolio or all existing project pages.
- Embedding the full research paper or reproducing every experiment table.
- Claiming that the end-to-end pipeline improves 3D fidelity or WebXR usability before those studies are completed.
- Deploying, publishing, or changing either AR source repository.
- Adding a native mobile AR application or iOS Quick Look/USDZ path.
