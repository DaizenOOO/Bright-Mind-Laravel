# Current State

Last reviewed: 2026-08-08.

## Implemented foundation

- Laravel 13 application
- Inertia.js 3 + React 19 + TypeScript
- Tailwind CSS 4 and reusable UI primitives
- Vite build tooling and Laravel Wayfinder
- Laravel Fortify authentication, 2FA, passkeys/WebAuthn, profile/security/appearance settings
- Authenticated application shell
- Pest, Larastan, Pint, ESLint, Prettier, GitHub Actions
- SQLite local database with database-backed sessions/cache/queue

## Connected Bright Mind platform foundation

- Scoped organizations and multi-role memberships support student, teacher, school admin, partner editor, translator, reviewer, approver and platform admin roles without a global `user_type`.
- Database-managed courses contain localized course records, ordered sections, reusable typed content blocks, localized block content, reusable media references and revision-ready editorial metadata.
- The publication service computes a six-part Content Readiness score and blocks publication until metadata, source content, structure, block translations, cover media and all six launch locales are approved.
- Graph-based learning pathways persist nodes, conditions-ready connections, recommendation rules and completion conditions.
- Enrolments and block progress are separate from reusable content. Completing a required block recalculates course progress transactionally and records idempotent XP ledger events.
- Achievement definitions and learner achievement records are persisted; first-course completion currently demonstrates automatic award behavior.
- Real role-aware Inertia surfaces now exist for the workspace switcher, partner course library/editor, student dashboard/course player, teacher dashboard and school dashboard.
- The partner course editor supports database-backed metadata/locales, readiness, publication, block addition, duplication, deletion and real student-component preview modes.
- `BrightMindDemoSeeder` creates a connected eight-role scenario, two organizations, classroom, published six-language course, media placeholder, course blocks, enrolment, achievement and pathway graph. Demo password: `password`.

## Bright Mind public landing

A previous static React prototype is preserved read-only at `reference/landing-prototype/`. Eight approved/current landing screenshots are preserved at `reference/visual/landing/`.

The canonical Inertia `welcome` page now directly adapts the approved prototype component tree under `resources/js/landing/`: its desktop/mobile navigation, four mega-menu panels, hero and animated framework stack, partner marquee, interactive learning cycle, dashboard showcase, four animated method sections, focus garden, network carousel, and footer are preserved. Laravel integration is limited to the Inertia page boundary, metadata, application styling compatibility, and Wayfinder-backed login/dashboard actions.

All public mega-menu entries now navigate to allowlisted Inertia pages under `/explore/{page}` rather than landing-page hash targets. The Framework panel contains Framework (Overview, Updates, User Guide), Learning framework (Student Corner, Teacher Toolkit, School Workspace), and the approved five Platform features.

The main desktop and mobile navbar includes an accessible animated six-language switcher. Locale selection is validated server-side, shared through Inertia, persisted by cookie/session for guests, and stored as `users.preferred_locale` for authenticated users.

Framer Motion 11 is installed because it is fundamental to the approved landing interaction design. The original CSS, content structures, motion definitions, local focus-session behavior, placeholder states, layout proportions, and reduced-motion adaptations are retained in the canonical frontend.

## Not implemented yet

- Invitations and fine-grained custom permission overrides beyond the current scoped role policy foundation
- Purpose-built editors and runtime renderers for every declared course/activity block type
- Upload/storage UI, localized media metadata editor and usage tracking for the Media Library
- DeepL jobs/provider integration and complete side-by-side translation workspace
- Full editorial transition/revision UI, teacher submissions and moderation queues
- Assignments, submissions/feedback, calendar, community and methodology-specific tools
- Full pathway recommendation/progress persistence and admin connection editing
- Streak/challenge evaluation, complete achievement rule evaluation and avatar customization persistence
- Remaining student, teacher, school and admin navigation areas listed in `FEATURES.md`
- Search/discovery, social login, external credentials

## Current database domain model

The first connected domain migration now owns organizations/memberships/classrooms, media, courses/translations/sections/blocks, pathways/nodes/connections, achievements, enrolments/block progress, XP events and revisions. Keep learner state separate from reusable definitions and extend these contracts rather than creating parallel feature tables.

## Known issues / decisions pending

1. Fortify email verification is enabled and verified middleware is used, while `App\\Models\\User` does not currently implement `MustVerifyEmail`; resolve deliberately during identity work.
2. `AGENTS.md` states PHP 8.4 runtime guidance, while `composer.json` supports PHP `^8.3` and CI uses PHP 8.3; deployment/runtime target remains open.
3. The landing prototype remains read-only evidence and its library versions/configuration must not overwrite the canonical application.
4. The landing copy remains prototype-authored English pending translation of its approved copy into the configured application locales.

## Verification note

The faithful landing migration passed TypeScript and the Vite production build on 2026-08-08. A broader verification pass is intentionally deferred until product-owner visual review.
