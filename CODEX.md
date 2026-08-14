# Codex Workflow

This repository is designed for long-running AI-assisted development with minimal repeated context.

## Session startup

1. Read `AGENTS.md`.
2. Read `.ai/rules/index.md` plus rules matching the paths in scope.
3. Read `CURRENT_STATE.md` and `NEXT_STEPS.md`.
4. Read only topic documents relevant to the current task.
5. Inspect affected source/sibling files and installed versions before changing code.
6. Use Laravel Boost/version-aware docs when required by `AGENTS.md`.
7. Implement one coherent, reviewable slice at the production quality bar defined in project rules.
8. Run the narrowest meaningful tests/checks.
9. Update durable docs/rules only when project truth changed.

Do not broadly load every Markdown file, `vendor`, `node_modules`, generated builds, or unrelated source. Repository docs/rules are persistent project memory; prompts should carry only the new task and new references.

## Immediate landing integration prompt

Use this prompt from the repository root:

> Productionize the Bright Mind public landing page inside the canonical Laravel + Inertia + React application.
>
> Follow `AGENTS.md` and the matching `.ai/rules`. Use `reference/landing-prototype/` as read-only implementation/design evidence and `reference/visual/landing/` as the current visual baseline. Do not modify reference files, merge the prototype runtime, overwrite root configuration, copy its dependency versions, or add Framer Motion merely because the prototype uses it.
>
> Rebuild/port the useful landing experience into the canonical app while preserving working authentication, routing, application infrastructure, and current stack conventions. The target includes the public header/branding, accessible responsive mega navigation and mobile navigation, hero/framework stack, partner strip, learning-cycle/framework content, learning-method sections, network/community presentation, and other coherent landing sections from the reference that belong on the public page.
>
> Aim for the intended final production standard on the first implementation. Preserve the distinctive visual direction from the screenshots and proactively correct ordinary professional issues in UX, responsive behavior, translated-text resilience, accessibility/keyboard/focus behavior, reduced motion, semantics, media handling, performance, state design, and maintainability. Do not wait for me to enumerate predictable edge cases. Ask only if a decision genuinely changes product policy, educational meaning, legal/privacy requirements, governance, or business rules.
>
> Do not fake unimplemented backend features. Use the real existing sign-in/auth route. For search, courses, partners, events, or other domains that are not implemented, keep the visual structure truthful and integration-ready without pretending data/functionality exists. Do not introduce Bright Mind domain migrations as part of this landing task.
>
> Do not leave the page as one monolithic component. Extract meaningful reusable/complex components and centralize public-navigation/content structures where useful, while avoiding component fragmentation. Make user-facing UI strings compatible with the repository localization direction rather than multiplying scattered hard-coded English strings.
>
> Verify the result with the relevant TypeScript, lint/format, Laravel/Pest, responsive, keyboard-navigation, overflow, auth-link, and reduced-motion checks available in the environment. Self-review as a senior product designer, frontend architect, accessibility/localization specialist, and performance-conscious Laravel engineer; fix reasonable issues before reporting completion.
>
> Keep your final response short: what changed, important improvements beyond the prototype, checks run, any genuine product-owner decision, and the single best next task. Update `CURRENT_STATE.md`, `NEXT_STEPS.md`, and only other canonical docs whose truth actually changed.

## Later task prompts

After the operating rules are committed, prompts should be short. Example:

> Build the course-player screen from the attached/reference screenshots. Follow `AGENTS.md` and existing Bright Mind architecture/design system. Production quality from the first implementation. Proactively solve relevant responsive, accessibility, localization, state, performance, and maintainability concerns. Keep changes scoped and update durable docs only when project truth changes.
