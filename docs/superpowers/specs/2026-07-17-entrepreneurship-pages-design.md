# Entrepreneurship Pages Design

## Goal

Add Entrepreneurship as a first-class portfolio area that presents Rosary Plant House and Arvenilo as ventures founded by Shibin Thomas. The feature must distinguish entrepreneurship from regular employment, technical projects, hobby projects, research, and achievements.

## Scope

The implementation will add:

- An Entrepreneurship item in the primary navigation, positioned after Projects.
- A bilingual Entrepreneurship overview page.
- A bilingual founder case-study page for Rosary Plant House.
- A bilingual founder case-study page for Arvenilo.
- Internal links from the overview to each case study.
- External calls to action from each case study to the corresponding venture website.
- Automated coverage for navigation, routes, localized content, error handling, and external-link safety.

The implementation will not add individual pages for every product sold or announced by either venture. Products and product families are sections within their venture's case study.

## Routes

The following routes will be supported for both `en` and `de`:

- `/:lang/entrepreneurship`
- `/:lang/entrepreneurship/rosary-plant-house`
- `/:lang/entrepreneurship/arvenilo`

An unknown venture slug under `/:lang/entrepreneurship/:slug` will render a portfolio-styled not-found state with a link back to the Entrepreneurship overview.

## Information Architecture

### Entrepreneurship Overview

The overview introduces Shibin's entrepreneurial work and displays two prominent venture cards. Each card contains:

- Venture name
- Founder role
- Founding year
- Industry or category
- Short mission statement
- Current status
- Representative brand image or website screenshot
- Internal `Explore Venture` action

The confirmed facts are:

| Venture | Role | Founded | Website |
| --- | --- | ---: | --- |
| Rosary Plant House | Founder | 2020 | `https://rosaryplanthouse.com` |
| Arvenilo | Founder | 2026 | `https://sshibinthomass.github.io/arvenilo-site/` |

### Venture Case Studies

Both detail pages use the same semantic structure so visitors can compare the founder's work across different domains:

1. Branded hero with name, founder role, founding year, category, status, and external website action
2. Company overview and mission
3. Problem or opportunity
4. Venture solution
5. Products or product families
6. Founder role and responsibilities
7. Journey and milestones
8. Business or technology highlights
9. Current status and direction
10. Image gallery
11. Closing website call to action

Sections without verified source material will be omitted rather than padded with speculative claims.

## Content Sources

The venture websites are the primary sources for company, product, service, and positioning content. Their material will be condensed and adapted into concise portfolio case studies rather than copied as complete website pages.

Rosary Plant House content may cover its Coonoor and Nilgiris roots, online nursery model, plant categories, plant-care guidance, shipping reach, and customer support where these claims remain present on its website.

Arvenilo content may cover its intelligent-reality vision, physical/immersive/intelligent layers, human-control principles, AnchorAR as its currently available product, and the product directions explicitly marked as forthcoming where these claims remain present on its website.

Founder-specific responsibilities must be written conservatively. The confirmed title is `Founder`; unverified revenue, customer, team, growth, or impact claims must not be introduced.

The English content will be based on the verified source material. German content will be a faithful translation with the same information hierarchy and claim strength.

## Data Model

A new bilingual venture data file will be the content source for the overview and detail pages. Each localized venture entry will use a stable slug and fields for:

- Identity: `slug`, `name`, `role`, `founded`, `category`, `status`
- Summary: `tagline`, `description`, `mission`
- Case-study sections: opportunity, solution, founder role, milestones, highlights, current direction
- Products: name, availability, description, and optional link
- Media: hero image, gallery images, alt text
- Links: official website and optional product links
- Visual theme: venture-specific accent identifier

Structural identifiers, URLs, and media paths remain identical between languages. Display strings are localized.

## Components

### `Entrepreneurship`

Loads the current language's venture collection, falls back to English if necessary, renders the overview introduction, and maps the entries into venture cards.

### `VentureCard`

Presents one venture summary and links to its internal case-study route. It does not navigate directly to the external website.

### `VentureDetail`

Resolves the route slug against the current language's data, falls back to the matching English entry for missing localized content or media, and renders only populated case-study sections.

### `VentureNotFound`

Provides an explicit error state for an unknown slug without redirecting visitors silently.

The components will be kept separate from the existing Projects components because ventures have different semantics and content depth.

## Visual Design

The feature retains the portfolio's typography, spacing, responsive behavior, animations, light/dark themes, and core card language.

- Rosary Plant House uses a botanical green accent, organic visual details, plant imagery, and an e-commerce/business emphasis.
- Arvenilo uses an indigo/cyan accent, sharper spatial details, and a technology/product-platform emphasis.
- The overview visually connects both cards as one Entrepreneurship area while preserving each venture's identity.
- Venture-specific colors must remain accessible in both portfolio themes and must not replace global text or background tokens where contrast would suffer.

Representative screenshots from the live websites may be used when dedicated brand assets are unavailable. Media paths and alt text must make those images easy to replace later.

## Navigation and Link Behavior

Entrepreneurship will appear after Projects in the main navigation. Language switching will preserve the current Entrepreneurship path using the portfolio's existing route conventions.

Overview cards use internal React Router links. Official website actions use standard anchors with `target="_blank"` and `rel="noopener noreferrer"`. The Rosary Plant House link uses the verified domain `rosaryplanthouse.com`, correcting the originally supplied `rosasyplanthouse.com` typo.

## Responsive and Accessible Behavior

- The two-column overview collapses to one column on narrow screens.
- Case-study sections and galleries avoid horizontal overflow.
- Headings follow a logical hierarchy.
- Images include meaningful localized alternative text.
- Interactive elements remain keyboard accessible and visibly focused.
- Animation respects existing portfolio motion conventions and does not hide content when motion is unavailable.

## Error Handling and Fallbacks

- Unsupported venture slugs render `VentureNotFound`.
- Missing German fields fall back to the matching English venture entry.
- Missing hero or gallery media uses a controlled local fallback without broken image icons.
- Empty optional arrays or sections are not rendered.
- External links are stored in data and validated before release.

## Testing

Automated tests will verify:

- The Entrepreneurship navigation item is present and correctly localized.
- English and German overview routes render both venture cards.
- Each venture card links to the correct internal detail route.
- Both English and German detail routes resolve by stable slug.
- Confirmed role and founding year values appear correctly.
- The official website links use the correct URL and safe new-tab attributes.
- Unknown slugs render the not-found state.
- Missing localized media or optional content does not break rendering.

The production build and the existing test suite must also pass before completion is claimed.

## Success Criteria

The feature is successful when a visitor can discover Entrepreneurship from the main navigation, understand that Shibin founded both ventures, explore a substantial bilingual case study for each, and continue to the official venture websites without confusing the ventures with ordinary portfolio projects.
