---
paths:
  - 'app/**'
  - 'routes/**'
  - 'database/**'
  - 'config/**'
  - 'tests/**'
---

# Backend

## Laravel owns server-side rules
Keep Laravel as the source of truth for authentication, authorization, validation, persistence, and business rules. Prefer Inertia web flows for Bright Mind workspaces; add API endpoints only for concrete consumers/integrations.

## Scoped identity model
Do not encode domain access as a simplistic single user type when users can hold multiple scoped roles.

## Content persistence requirements
Design educational content persistence around authoring, translation, review, preview, publication, revisions, and auditability. Keep learner state/progress separate from reusable content definitions when appropriate.

## Privacy-aware modeling
Treat minor privacy, consent, and data minimization as modeling requirements.
