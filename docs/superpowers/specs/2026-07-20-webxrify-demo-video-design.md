# WebXRify Demo Video Design

## Goal

Add the supplied YouTube Short to the end of the WebXRify project detail page so visitors can play it inline without leaving the portfolio.

## Data

Set `youtubeLink` for project ID 4 in both the English and German project records to:

`https://youtube.com/shorts/GReSt-9uSL0?feature=share`

Keeping the same URL in both localized records ensures that the video appears on both `/en/projects/4` and `/de/projects/4` without relying on the English fallback.

## Rendering

Continue using the shared optional video section in `ProjectDetail.jsx`. It already renders after the project links, making it the final content section on the page, and embeds YouTube in a responsive iframe.

Extend the shared YouTube ID extraction logic to recognize `/shorts/<video-id>` URLs as well as the formats it already accepts. The resulting iframe source will be `https://www.youtube.com/embed/GReSt-9uSL0`.

Keep the existing responsive 16:9 presentation, localized heading, fullscreen support, and iframe permissions. Do not autoplay the video or open it in a separate page.

## Failure Behavior

Render the video section only when a non-empty link yields a valid 11-character YouTube ID. Invalid or missing links remain hidden, preserving the current behavior for other projects.

## Verification

Add focused automated coverage confirming that:

- Both localized WebXRify records contain the supplied Shorts URL.
- The shared detail renderer recognizes Shorts URLs and produces a YouTube embed URL.
- The video section remains after the external-links section.

Run the project test suite, lint, and production build after implementation.
