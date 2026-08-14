# UI System

## Current foundation

The frontend uses React 19, TypeScript, Tailwind CSS 4, Radix UI primitives/shadcn-style components, Lucide icons, Inertia layouts, and dark/light/system appearance support.

Reuse existing primitives before creating new base components. Reference implementations may use older/different libraries; adapt them to the canonical stack rather than copying runtime/configuration wholesale.

## Bright Mind visual direction

The approved landing-page references live under `reference/visual/landing/`, with source prototype material under `reference/landing-prototype/`.

The visual language should feel editorial, precise, contemporary, European/institutional, youth-accessible, and intentionally designed. Core characteristics include:

- expressive large typography and strong hierarchy
- generous whitespace and disciplined grids
- Bright Mind navy/blue/teal with restrained supporting accents
- thin borders and subtle technical/dotted structures
- layered information and meaningful visual connections
- sophisticated interaction and motion used with restraint
- educational warmth without childish styling

Avoid generic SaaS-dashboard/template aesthetics, excessive cards, decorative animation without purpose, or default component-library appearance.

## Public landing implementation

The approved public landing component tree is adapted under `resources/js/landing/`, with its CSS in `resources/css/landing-reference.css`. Its proportions, rounded panel/card treatment, large editorial type, exact color values, technical graphics, hover behavior, and Framer Motion choreography are canonical for the public landing. Do not restyle or replace these components unless the product owner explicitly requests a redesign.

Framework compatibility and accessibility changes should be visually neutral. The public experience is intentionally isolated from the authenticated application's stored dark-mode variables so it retains the approved light appearance.

## Production-quality first pass

For approved UI work, target the intended final production standard from the first real implementation. The implementation agent should proactively resolve routine professional concerns: hierarchy, typography, spacing, interaction, responsive behavior, localization resilience, accessibility, states, performance, and content/media edge cases.

Screenshots are visual/product references. Reproduce their intent faithfully while correcting issues required for a robust production implementation.

## Workspace principle

Student, teacher, school, and partner/admin experiences may have different navigation and workflows, while sharing one coherent visual system and reusable primitives.

## Partner/admin UX requirements

The administration surface is designed for non-technical consortium partners. Prioritize clear navigation/breadcrumbs, guided flows, understandable terminology, sensible defaults, progressive disclosure, autosave where appropriate, obvious editorial/translation status, inline validation/contextual help, close-to-editor preview, safe destructive actions, and consistent editors.

Do not expose raw JSON or database-shaped forms for ordinary course/activity creation.

## Accessibility baseline

Design toward WCAG expectations from the beginning: semantic HTML, complete keyboard operation, visible focus states, sufficient contrast, screen-reader labels, reduced-motion support, captions/transcripts where available, localized alternative text, accessible validation/error feedback, and keyboard alternatives for drag/drop learning interactions.

## Reusable component documentation

When a reusable Bright Mind component/subsystem is introduced, create or update the corresponding file under `docs/components/`. Document purpose, public interface/props, states, accessibility, localization, dependencies, and non-obvious usage constraints. Do not document trivial wrappers.
