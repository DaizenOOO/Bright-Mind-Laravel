# Public Landing Components

## Purpose

`resources/js/landing/` is the canonical adaptation of the approved Bright Mind prototype used by `pages/welcome.tsx`.

## Structure

- `components/Navigation/`: original desktop/mobile navigation and animated mega-panel variants.
- `components/landing/`: original hero, framework stack, dashboard, learning methods, visuals, and network carousel.
- `components/focus/`: original interactive focus garden and local session state.
- `landing.data.ts`, `landing.assets.ts`, and motion/constants modules: approved content and behavior contracts.

## Behavior

Preserve the original motion choreography, hover states, animated panel sizing/switching, framework-stack pointer response, interactive dashboard tabs, learning-method visuals, focus-session behavior, and network carousel. Wayfinder-backed authentication is the only current application-route integration.

## Accessibility and localization

Maintain keyboard dismissal/focus behavior and reduced-motion support without changing the approved visual design. Prototype-authored interface copy should be migrated as a coherent unit when the application UI translation runtime is selected; database-managed educational content remains a separate translation domain.
