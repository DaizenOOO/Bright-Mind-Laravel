# Database

## Current state

Local development uses SQLite. Laravel infrastructure covers users, authentication, sessions, passkeys, cache, queues, and migrations.

The connected Bright Mind foundation also persists organizations and memberships, reusable localized courses/sections/content blocks, media assets, learning pathways, enrolments, block progress, achievements, and an idempotent XP event ledger. Extend these contracts rather than creating parallel feature tables.

## Modeling guardrails

When extending Bright Mind domain tables:

1. Resolve identity, roles, memberships, organizations, schools, and classes as one coherent model.
2. Resolve the multilingual content/translation strategy before creating course/activity schemas.
3. Design course and activity data around admin authoring, translation, review, preview, reuse, and publication.
4. Avoid a single `user_type` field if one human may hold multiple roles/scopes.
5. Separate reusable definitions from learner-specific state/progress where appropriate.
6. Keep publication/revision/audit needs visible from the first content schema.
7. Store timestamps and ownership/editor metadata needed for moderation and accountability.
8. Treat privacy and data minimization as schema concerns, especially for minors.

## Planned conceptual domains

These are planning domains, not approved table names:

- users and identities
- organizations / consortium partners / schools
- memberships and scoped roles/permissions
- classes/groups and invitations
- courses, lessons/sections, content blocks
- activities and activity-type configuration
- translations/localized content
- revisions/editorial workflow/publication
- media/resources
- enrollments/progress/completions
- assessments/responses/recommendations
- pathways/pathway assignments
- XP/badges/achievements/streaks
- assignments/submissions/feedback
- notifications/events
- credentials
- audit/moderation records

## Production database

The production database remains an open deployment decision. Evaluate PostgreSQL against multilingual queries, reporting, search, operations, and hosting constraints before production rollout.
