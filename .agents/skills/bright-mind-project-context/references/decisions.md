# Decisions

This file records durable architecture/product decisions and high-value open decisions. Keep entries concise. Add a date and rationale when a decision becomes settled.

## Settled

| Date | Decision | Rationale |
|---|---|---|
| 2026-08-08 | Preserve Laravel + Inertia + React as the primary web architecture. | It is already implemented, modern, and suitable for the planned workspaces and CMS. |
| 2026-08-08 | Treat multilingual support as a foundation requirement for all new Bright Mind user-facing/domain content. | The platform must support partner countries and should not accumulate English-only content debt. |
| 2026-08-08 | Treat partner administration/content management as a first-class architecture concern. | Consortium partners must maintain educational content independently. |
| 2026-08-08 | Prefer reusable course blocks and activity types over one-off course implementations. | Enables scalable authoring, translation, preview, analytics, and reuse. |
| 2026-08-08 | Keep project documentation concise and optimized for fresh Codex sessions. | Reduces conversational context/token requirements. |
| 2026-08-08 | Build approved implementation slices to production quality from their first real implementation. | Avoids deliberate throwaway MVP UX/architecture while keeping changes reviewable and scoped. |
| 2026-08-08 | Preserve the previous static React landing implementation under `reference/` as read-only design/behavior evidence. | Allows faithful reuse of prior work without creating a second runtime or overwriting the canonical Laravel/Inertia stack. |
| 2026-08-08 | Treat the supplied landing screenshots as the current visual baseline. | They capture the intended Bright Mind visual identity and interaction direction for productionization. |

## Open decisions to resolve during architecture planning

| Priority | Decision |
|---|---|
| P0 | Identity/RBAC/organization model: multi-role users, partner scope, schools, classes, memberships. |
| P0 | Localization storage model and source-language/translation lifecycle. |
| P0 | Course/lesson/block hierarchy and authoring contract. |
| P0 | Activity engine schema and activity runtime/editor contract. |
| P0 | Editorial states, revisions, translation review, approval, publishing, audit trail. |
| P0 | Initial launch/delivery scope across student, teacher, school, partner/admin surfaces. |
| P1 | Production database choice and deployment baseline. |
| P1 | Minor/guardian/consent model and data-minimization requirements. |
| P1 | Media storage and processing strategy. |
| P1 | Social authentication provider scope. |
| P2 | Search infrastructure once content volume/use cases are known. |
| P2 | Realtime/live-learning architecture once workflows are defined. |
| Future | Europass/European Digital Credentials integration. |
## Connected domain foundation

- Roles are scoped membership records on organizations; users may hold several roles across several organizations. No global `user_type` is introduced.
- Managed translations use per-entity locale rows with status/provenance/source timestamps. Learner-visible block content is localized separately from structural block configuration.
- Course blocks are typed reusable definitions. Their `configuration` contains non-translatable behavior/answer structure; learner copy lives in `content_block_translations`.
- Media is referenced through reusable `media_assets`; neutral placeholders represent missing CMS-managed assets and are not hard-coded final artwork.
- Publication is a Laravel service rule requiring 100% readiness. UI controls display the rule but do not own or bypass it.
- Learner progress is enrollment/block based. XP is an append-only, idempotency-keyed event ledger rather than a mutable total field.
- Pathways are stored as graphs with nodes and conditional connections. Rule-based recommendation metadata is provider-neutral so future recommenders can rank the same contracts.
