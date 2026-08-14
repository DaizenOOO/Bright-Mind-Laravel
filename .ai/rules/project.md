---
paths:
  - '**/*'
---

# Project

## Preserve the application foundation
Preserve the existing Laravel + Inertia + React architecture unless an approved requirement proves a change is necessary.

## Preserve approved references faithfully
When the product owner supplies approved existing code or a visual reference and asks for it to be implemented, treat that implementation as the source of truth. Adapt it faithfully rather than redesigning, simplifying, or reinterpreting successful components. Design autonomy applies only to genuinely unspecified areas or explicit new-design requests; compatibility, accessibility, responsiveness, and framework adaptations should preserve the approved appearance and behavior.

Aim directly for the final polished result. Do not intentionally ship temporary, rough, or MVP-quality substitutions for approved work.

## Planning-stage scope
The project is in product/architecture planning. Do not implement speculative long-term features.

## First-class cross-cutting requirements
Treat partner administration/CMS and multilingual authoring as first-class architecture requirements. Consider student, teacher, school, partner/admin, reviewer/translator, and platform scopes in permissions design.

## Domain foundation order
Before Bright Mind domain migrations, resolve P0 identity/RBAC, localization, course/block, activity, and editorial workflow decisions together. Prefer reusable course/activity/content contracts over course-specific implementations.

## Persistent project context
Update `CURRENT_STATE.md` after meaningful implementation changes and `DECISIONS.md` after durable decisions.
