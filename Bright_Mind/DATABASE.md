# Database

## Current state

Local development uses SQLite. Current persistence is mostly Laravel infrastructure:

- users
- password reset tokens
- sessions
- passkeys
- cache / cache locks
- jobs / job batches / failed jobs
- migrations

`User` is currently the only product/domain model.

## Modeling guardrails

Before adding Bright Mind domain tables:

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

No production database change is approved yet. PostgreSQL should be evaluated during architecture planning against the current Laravel setup, multilingual/query requirements, JSON usage, search/reporting expectations, operations, and hosting constraints.
