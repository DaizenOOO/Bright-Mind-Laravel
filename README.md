# Bright Mind Platform

Bright Mind is a multilingual e-learning platform for young learners, teachers, schools, and consortium partners, built on Laravel + Inertia + React.

## Start here

For any Codex task, read `AGENTS.md` and `.ai/rules/index.md`, then activate the `bright-mind-project-context` skill from `.agents/skills/`. It routes agents to only the current-state, architecture, localization, database, UI, decision, or roadmap reference required for the task.

## Current stack

- Laravel 13 / PHP `^8.3`
- Inertia.js 3
- React 19 + TypeScript
- Tailwind CSS 4 + Radix/shadcn-style UI primitives
- Laravel Fortify + Passkeys
- Laravel Wayfinder
- Pest 5, Larastan, Pint, ESLint, Prettier
- SQLite for the current local development database

See `.agents/skills/bright-mind-project-context/references/architecture.md` for details.

## Design references

`reference/landing-prototype/` contains the source-only previous React landing prototype and `reference/visual/landing/` contains the current landing screenshots. Both are reference material only; the canonical production app remains Laravel + Inertia + React under `resources/**`.

## Local setup

```bash
composer setup
composer dev
```

Useful checks:

```bash
composer ci:check
npm run types:check
npm run format:check
npm run lint:check
```

Use Laravel Boost/version-aware documentation tools where required. Do not copy dependencies/configuration from reference prototypes into the canonical application.

## Documentation policy

Keep documentation concise and non-duplicative. Update the document that owns a decision instead of repeating the same information elsewhere. Reusable Bright Mind subsystems/components receive documentation under `docs/components/` when their contract is meaningful.
