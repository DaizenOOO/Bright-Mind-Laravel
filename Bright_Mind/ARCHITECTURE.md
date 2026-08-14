# Architecture

## Current architecture

Bright Mind currently uses a Laravel monolith with an Inertia React frontend.

```text
Browser
  -> Laravel routes / middleware / controllers
  -> Inertia responses
  -> React pages and reusable UI components
  -> Inertia requests back to Laravel
  -> Eloquent / database / queues / storage
```

There is no separate SPA backend or dedicated public API layer today. Preserve this model unless a concrete consumer requires an API.

## Backend

- Laravel 13
- PHP `^8.3` in `composer.json`
- Fortify for authentication flows
- Passkeys/WebAuthn support
- Eloquent ORM
- Database-backed sessions, cache, and queues in local configuration
- Local filesystem by default; Laravel disk configuration can support object storage later

## Frontend

- React 19 + TypeScript
- Inertia.js 3
- Vite 8
- Tailwind CSS 4
- Radix UI primitives / shadcn-style components
- Lucide icons
- Wayfinder-generated route/action helpers

Important frontend directories:

```text
resources/js/
├── actions/       # generated Wayfinder controller actions
├── components/    # reusable components, including UI primitives
├── hooks/
├── layouts/
├── lib/
├── pages/         # Inertia pages
├── routes/        # generated Wayfinder named routes
└── types/
```

## Existing application boundaries

- Laravel owns authentication, authorization/middleware, validation, persistence, and server-side business rules.
- React owns page rendering and browser interaction.
- Use Inertia for web workspace features by default.
- Use Wayfinder for Laravel route/controller references from TypeScript.
- Add APIs only for concrete external/mobile/integration needs.

## Bright Mind architecture principles

1. Preserve working Laravel/Inertia conventions.
2. Internationalization is a cross-cutting requirement from the first Bright Mind feature.
3. The partner administration/CMS is a first-class product surface, not an afterthought.
4. Domain models must support non-technical content creation, translation, preview, review, and publication.
5. Prefer reusable course blocks and activity contracts over course-specific hard-coded implementations.
6. Model permissions and organization scope explicitly.
7. Keep implementations proportionate to the approved feature while leaving clean extension points; do not create deliberate throwaway architecture.
8. Accessibility, security, GDPR/minor privacy, and auditability are architectural concerns.
9. Do not introduce distributed services, queues, caches, search engines, or AI systems before a concrete need exists.

## Planned domain areas

The following are product domains to design before implementation:

- Identity, roles, memberships, organizations, schools, classes
- Localization and translation workflow
- Course/content model and course builder
- Reusable learning activity engine
- Editorial workflow, revisions, review, approval, publishing
- Student workspace and learning progress
- Teacher workspace and classroom functions
- School workspace and organization analytics
- Partner administration/CMS
- Assessments and rule-based learning pathways
- Gamification
- Media/resources
- Notifications/calendar/live-learning integrations
- Search and discovery
- Credentials and external integrations

Their exact data models are intentionally not finalized yet.

## External integrations

Planned or possible integrations include DeepL, YouTube, social authentication providers, and European Digital Credentials for Learning. They are not currently implemented and should be added only when their workflows are defined.
