# Bright Mind Platform

Bright Mind is a multilingual e-learning platform for young learners, teachers, schools, and consortium partners, built on Laravel + Inertia + React.

## Start here

For any Codex task, read `AGENTS.md`, `.ai/rules/index.md`, `CURRENT_STATE.md`, and `NEXT_STEPS.md`, then load only the topic document relevant to the work (`ARCHITECTURE.md`, `I18N.md`, `DATABASE.md`, `UI_SYSTEM.md`, etc.). `CODEX.md` contains the token-efficient workflow and current landing integration prompt.

## Current stack

- Laravel 13 / PHP `^8.3`
- Inertia.js 3
- React 19 + TypeScript
- Tailwind CSS 4 + Radix/shadcn-style UI primitives
- Laravel Fortify + Passkeys
- Laravel Wayfinder
- Pest 5, Larastan, Pint, ESLint, Prettier
- SQLite for the current local development database

See `ARCHITECTURE.md` for details.

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
