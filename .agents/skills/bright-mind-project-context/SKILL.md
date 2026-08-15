---
name: bright-mind-project-context
description: Load Bright Mind-specific architecture, domain, localization, UI-system, product-state, roadmap, and engineering constraints. Use whenever planning, implementing, reviewing, debugging, or documenting Bright Mind application functionality beyond generic framework work.
---

# Bright Mind project context

## Start every Bright Mind task

1. Read the repository `AGENTS.md` and matching `.ai/rules` first.
2. Read [current-state.md](references/current-state.md) and [next-steps.md](references/next-steps.md).
3. Load only the references relevant to the task:
   - Architecture or subsystem boundaries: [architecture.md](references/architecture.md)
   - Persistence and schema work: [database.md](references/database.md)
   - Product scope or workspace capabilities: [features.md](references/features.md)
   - Localization or translated authored content: [i18n.md](references/i18n.md)
   - UI, responsive behavior, accessibility, or design fidelity: [ui-system.md](references/ui-system.md)
   - Durable settled and open decisions: [decisions.md](references/decisions.md)
   - Delivery sequencing: [roadmap.md](references/roadmap.md)
4. Inspect affected source and sibling files; do not infer current behavior from documentation alone.
5. Implement one coherent production-quality slice and run the narrowest meaningful checks.

## Maintain project memory

- Update `references/current-state.md` only when implemented project truth changes.
- Update `references/decisions.md` only for durable product or architecture decisions.
- Update `references/next-steps.md` only when the immediate implementation sequence changes.
- Keep detailed reusable component contracts under repository `docs/components/`.
- Avoid copying the same fact into several references.
- Keep references concise enough for a fresh Codex session and remove stale planning statements when implementation supersedes them.

## Guardrails

- Preserve Laravel + Inertia + React and existing working infrastructure.
- Keep Laravel persistence/business rules, Inertia prop boundaries, typed frontend data, reusable UI components, and page composition separate.
- Treat localization, partner administration, accessibility, privacy, and reusable course/activity contracts as first-class concerns.
- Treat supplied Figma screens, screenshots, and approved implementations as visual evidence, not application architecture.
- Keep reference prototypes read-only and never merge their runtime or dependency configuration into the canonical app.
- Do not create speculative subsystems or parallel domain models.
