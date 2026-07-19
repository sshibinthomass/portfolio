# YogaVision Short-Link Redirect Design

## Goal

Visiting `/yogavision` redirects to the English YogaVision project page at `/en/projects/3`.

## Approach

Add an explicit React Router route to the existing English short-URL redirect block in `src/App.jsx`. The route uses `<Navigate to="/en/projects/3" replace />`, matching the established behavior of the other project aliases.

This remains a client-side redirect because the portfolio is a Vite single-page application deployed to GitHub Pages, and its existing short URLs use React Router rather than server-side HTTP redirects.

## Scope

- Add only the `/yogavision` English short URL requested.
- Use the correct project spelling `yogavision`.
- Do not retain the misspelled `/yogavison` alias.
- Do not add an unrequested German alias or change other routes.
- Replace the history entry so the browser Back button does not return to the alias.

## Verification

Add a focused Node test that reads `src/App.jsx`, asserts that `/yogavision` maps exactly to `/en/projects/3` with replacement navigation, and rejects the misspelled `/yogavison` alias. Run the test first to confirm it fails before changing the route, then run the complete test, lint, and production build checks.
