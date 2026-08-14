# Final Codex Prompt

Build/finish the Bright Mind `/design-system` page as the reusable frontend foundation for the whole platform.

First read `AGENTS.md` and `reference/ui-direction/DESIGN_REFERENCE_SPEC.md`, then inspect the screenshots in `reference/ui-direction/screenshots/`.

Treat the existing approved Bright Mind landing page as untouchable in this task. The screenshots define the application-side UI direction; adapt their best patterns to Bright Mind rather than copying marketplace/commerce features literally. `15-course-player.png` is the strongest reference for the course learning experience.

Create final-quality reusable React components and demonstrate them with mock state on one `/design-system` page: foundations, navigation, buttons/forms, cards, student dashboard, course catalogue/detail/player, teacher, school, community, gamification, admin/CMS, system states and analytics. Include the obvious reusable states/variants needed by the real product even when a screenshot does not explicitly show them.

Use plain neutral-gray placeholders for all missing images/media/avatars/illustrations, with no text inside the placeholders.

Make the showcase interactive where useful. Use Motion for React for polished motion, existing Radix/shadcn primitives for accessible UI, Lucide for icons, and Recharts for standard analytics. Keep animation refined and purposeful.

Design for multilingual text expansion, desktop/tablet/mobile and future backend data. Do not build backend/domain functionality in this task.

Aim directly for the final polished result. Take ownership of normal product-design decisions and improve weak/underspecified areas yourself while staying consistent with the references and Bright Mind identity.

Do not spend time on a large test pass yet; I want to visually review the result first.

When finished, give me only the `/design-system` URL and its section anchor links. After my approval/change requests, update the design-system documentation so future screens reuse the approved components instead of inventing new styles.
