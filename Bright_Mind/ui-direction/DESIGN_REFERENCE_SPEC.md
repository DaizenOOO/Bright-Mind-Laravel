# Bright Mind UI Direction Specification

## Purpose

These references define the intended application-side design language for Bright Mind. They are inspiration and structural guidance for new platform UI. The existing approved Bright Mind landing-page implementation remains the source of truth for the public landing page and should not be redesigned from these references.

The application should feel polished, modern, youthful, educational and European. It should be approachable for students while remaining credible for teachers, schools and consortium partners. Avoid generic SaaS styling, childish gamification, visual clutter and marketplace/store aesthetics that do not fit the product.

## Global visual direction

Carry these characteristics across the platform:

- Bright Mind navy for primary text and structure, vivid blue for primary actions and active states, with restrained teal/green/pastel supporting accents.
- Very light cool-gray page backgrounds with white content surfaces.
- Large rounded containers and cards, generally soft rather than sharp.
- Subtle borders and shadows; cards should feel elevated without looking glossy or heavy.
- Strong, friendly typography with clear hierarchy and generous line-height.
- Spacious composition and breathing room, while dashboards may be denser when information requires it.
- Rounded icon tiles, avatars and compact metadata.
- Clear status colors for progress, success, warning, translation/review states and achievements.
- High-quality micro-interactions using Motion for React. Motion should support comprehension and polish rather than constant movement.
- Use existing Radix/shadcn primitives for accessible interaction patterns and Lucide for interface icons.
- Use Recharts for standard dashboard analytics; reserve D3 for genuinely bespoke data visualizations later.
- All reusable geometry must tolerate multilingual text expansion.

## Placeholder rule for the design system

When real media is unavailable, use simple neutral-gray placeholder surfaces. Do not place explanatory text, dimensions, filenames, or fake artwork inside placeholders. The shape alone should communicate the media slot. An interaction icon such as a play button may overlay a video placeholder when needed to demonstrate behavior.

## Reference hierarchy

1. Approved Bright Mind landing code and its original motion behavior: authoritative for the landing page.
2. `15-course-player.png`: strongest structural reference for the learner course experience.
3. Dashboard/course/community references: source for application patterns and component language.
4. Commercial details such as prices, store, balance, bundles-as-products and "Become Instructor" are reference-only and should be adapted or omitted unless Bright Mind requirements explicitly need them.

---

## 01 — Landing hero

File: `screenshots/01-landing-hero.png`

Preserve these qualities in the wider product identity:

- Editorial scale and confidence of the typography.
- Large amounts of intentional white space.
- Strong navy/blue Bright Mind branding.
- Thin structural borders and restrained technical details.
- Sophisticated educational/institutional feeling rather than a conventional LMS template.
- Diagrammatic stacked visual language that can inspire learning-path, progress and methodology visualizations.

Do not reuse this exact landing composition inside dashboards; carry its visual discipline into application UI.

## 02 — Landing mega menu

File: `screenshots/02-landing-mega-menu.png`

The approved navigation should feel intentionally composed rather than like a generic dropdown:

- Large menu canvas with clear columns and section headings.
- Different menu sections may have different content structures.
- Icon + title + supporting description patterns are useful for complex navigation.
- Strong alignment, generous spacing and subtle dividers.
- Preview/promo areas may be used when they communicate product structure.
- Active navigation state is clear but restrained.

For the existing landing page, preserve the original prototype behavior/layout exactly rather than redesigning it.

## 03 — Authentication / login

File: `screenshots/03-auth-login.png`

Use this as inspiration for Bright Mind authentication and onboarding:

- A centered, large rounded white authentication surface on a very light background.
- Two-column desktop composition: focused form + supportive visual/educational panel.
- Strong primary blue action, restrained secondary text and minimal form chrome.
- Clear tab/segmented patterns when multiple auth methods genuinely exist.
- Friendly onboarding tone without overwhelming the user.
- On smaller screens the supportive visual can collapse below or disappear while the form remains first-class.

Bright Mind's real authentication capabilities and routes remain authoritative; do not invent phone login or other methods solely because they appear in the reference.

## 04 — Student dashboard

File: `screenshots/04-student-dashboard.png`

This is a strong reference for the eventual student workspace:

- Persistent application navigation/side rail with clearly grouped destinations.
- A prominent personalized welcome/continue-learning panel.
- Modular cards rather than one monolithic dashboard.
- Right-side utility rail for calendar/events/quick information when desktop space allows.
- Progress and learning statistics visible immediately.
- Multiple card sizes establish visual rhythm and priority.
- Friendly illustration/media can make the dashboard feel motivating; use gray placeholders in the design-system preview.

Bright Mind adaptations should emphasize learning pathway, current course, assignments, progress, XP/streaks/badges, teacher feedback, calendar and recommendations. Remove wallet/commerce concepts unless later approved.

## 05 — Course catalogue overview

File: `screenshots/05-course-catalog-overview.png`

Use these patterns for the course library:

- Strong page header/intro surface.
- Search/filter/sort/view controls grouped into a dedicated control bar.
- Clear distinction between filtering and content results.
- Grid/list view affordances where useful.
- Course cards arranged with consistent dimensions and generous gaps.
- Sidebar filtering works well on desktop and should become a drawer/sheet on smaller screens.

Replace commercial filters such as price/discount with Bright Mind-relevant filters: methodology, topic, pathway, difficulty, duration, learner group, language, status, teacher recommendation and completion state.

## 06 — Course cards and filters

File: `screenshots/06-course-catalog-cards-filters.png`

The useful card language is:

- Large visual/media area above a clean white content area.
- Strong title, small supporting metadata, instructor/creator identity and duration/progress information.
- Consistent card heights even when titles wrap.
- Rounded corners and subtle separation from the page background.
- Lightweight filter groups with clear labels and comfortable touch targets.

Bright Mind course cards should support states such as recommended, new, in progress, completed, locked/prerequisite, assigned by teacher, pathway-relevant and saved. Price should normally become progress/XP/duration/status metadata.

## 07 — Community hero

File: `screenshots/07-community-hero.png`

Use this for the community/forum entry experience:

- Large human, welcoming headline.
- Short explanatory copy with one obvious search action.
- Split layout with content and a large media/community visual.
- Small floating social/communication indicators add life without becoming clutter.
- Rounded image geometry and generous space.

Bright Mind should emphasize safe peer learning, questions, study groups and teacher-supported discussion. Use neutral placeholders in the design-system page.

## 08 — Community discussion list

File: `screenshots/08-community-discussion-list.png`

This is a strong list pattern:

- Each discussion is a large rounded white row/card.
- Colored icon tile gives quick visual category recognition.
- Title is dominant, preview text secondary, author/avatar metadata tertiary.
- Rows have enough height to scan comfortably.
- Multiple authors/participants can be represented with compact avatar groups.

Bright Mind should later add safe-community metadata such as group/class scope, teacher-moderated state, replies, last activity, tags and moderation status where appropriate.

## 09 — Featured course

File: `screenshots/09-featured-course.png`

Use the composition, not the commercial content:

- Large full-width media panel.
- White information panel overlaps or sits prominently over the media.
- Strong title, creator identity, short overview and key benefits.
- High visual impact suitable for a featured/recommended learning opportunity.
- Useful for homepage/dashboard recommendations or pathway highlights.

In the design system, use a gray media placeholder and Bright Mind course metadata instead of price/store details.

## 10 — Course collections / bundles

File: `screenshots/10-course-collections.png`

Adapt this pattern into Bright Mind learning collections/pathways rather than commerce bundles:

- Introductory copy and CTA on one side.
- Grid of compact collection cards on the other.
- Layered media + white information panel creates depth and distinctiveness.
- Collection cards can show number of courses, expected duration, methodology mix, completion or pathway relevance.

Potential Bright Mind uses: learning pathways, teacher-curated course sets, methodology collections, exam-prep collections and school programmes.

## 11 — Course detail hero

File: `screenshots/11-course-detail-hero.png`

This is a key course-detail reference:

- Large immersive hero/media area with readable overlay content.
- Breadcrumb/context at the top.
- Course title and concise description dominate.
- Metadata and instructor identity are available without clutter.
- Preview/video panel integrated with the hero.
- Strong action area aligned with the course.
- Tabs directly below establish navigation between course information sections.

For Bright Mind, adapt metadata to methodology, difficulty, duration, language availability, learning objectives, pathway relationship, XP/badge outcome and assignment context. Do not copy price/free/store concepts unless approved.

## 12 — Course detail content + sidebar

File: `screenshots/12-course-detail-content-sidebar.png`

Useful structure:

- Main content column for learning objectives and long-form description.
- Scannable checklist for what the learner will gain.
- Secondary sidebar for concise metadata, teacher profile and actions.
- Large white surfaces on a cool-gray background.
- Long text remains readable through width constraints and spacing.

Bright Mind should keep the sidebar useful rather than overloaded. Potential items: duration, level, methodology, prerequisites, languages, pathway, badge, teacher, assignment due date and accessibility/media availability.

## 13 — Course FAQ / accordion

File: `screenshots/13-course-faq.png`

Use this as the standard accordion language:

- Clean white surface with generous row height.
- Minimal border, restrained icon, clear disclosure affordance.
- Easy scanning and large click/touch target.
- Suitable for FAQ, curriculum sections, lesson groups, admin advanced settings and help content.

Do not reproduce the trusted-company strip unless there is a real Bright Mind partner use case.

## 14 — Instructor + reviews

File: `screenshots/14-instructor-reviews.png`

Use these patterns for teacher identity and social proof:

- Large teacher profile block combining biography and human presence.
- Compact metadata chips for course/student/activity counts where relevant.
- One strong teacher-related CTA when appropriate.
- Review/testimonial cards below use avatar, name, date and concise text.
- Friendly, human-centered presentation builds trust.

Bright Mind can adapt this for teacher profile, accredited-teacher status, availability, school/partner affiliation and learner feedback. Do not assume meeting booking or public ratings are required until product rules approve them.

## 15 — Course player / learning page

File: `screenshots/15-course-player.png`

This is the strongest reference for how Bright Mind's actual course experience should be structured.

### Overall layout

- Large learning canvas on the left.
- Persistent course-navigation rail on the right for desktop.
- Course title/breadcrumb context in a restrained top bar.
- Learner/progress summary visible at the top of the rail.
- Content, quizzes/activities and credentials/progress can be organized with clear tabs or modes.
- Curriculum is grouped into collapsible sections with lesson counts and active lesson highlighting.

### Main learning canvas

The canvas must support reusable block types rather than only video:

- YouTube/video with language-aware variants, captions and transcript.
- Rich text.
- Key concept/callout.
- Image/infographic.
- Downloadable resource.
- Multiple choice / multiple answer.
- Matching.
- Sorting/sequencing.
- Drag-and-drop.
- Flashcards/active recall.
- Reflection prompt.
- Scenario/decision activity.
- Design-thinking activity.
- Peer-learning task.
- Metacognition/self-assessment block.
- Final knowledge check/completion state.

The design system should show representative placeholders and controls for these blocks without implementing the backend engine yet.

### Course rail

The rail should communicate:

- course progress;
- current lesson;
- completed lessons;
- locked/prerequisite lessons;
- lesson/activity type;
- expandable sections;
- quizzes/activities;
- achievements/certificates where relevant;
- next/previous progression.

On smaller screens, the rail should become an intentional drawer/sheet or collapsible course navigator while keeping the learning canvas primary.

### Interaction quality

- Active lesson must be obvious.
- Progress updates should feel rewarding but restrained.
- Motion should be subtle and use Motion for React.
- Course navigation should feel fast and app-like.
- Avoid unnecessary page reloads within the learning flow where Inertia/React state can preserve continuity.
- The eventual course editor/admin model must be able to create everything displayed here without writing code.

---

# Required `/design-system` coverage

The design-system page should use real reusable production React components and mock state. It should include the following families so future screens can be assembled rather than independently restyled.

## Foundations

Typography, colors, spacing, radii, shadows, borders, icon scale, layout/container rules, responsive density and focus states.

## Navigation

Application header, side navigation, mobile navigation, breadcrumbs, tabs, segmented controls, pagination, dropdowns, command/search patterns and contextual navigation.

## Buttons and controls

Primary, secondary, tertiary, subtle, destructive, icon-only, Start/Continue Learning, save, submit/review/publish, disabled/loading variants; inputs, textareas, search, selects, radios, checkboxes, switches, sliders, date/time controls and file/media inputs.

## Cards

Course, compact course, featured course, pathway/collection, lesson, assignment, learning activity, badge, achievement, progress, student, teacher, school, class/group, discussion, event, notification, stat/metric, media/resource and admin/content cards.

## Student workspace patterns

Dashboard, continue learning, recommended courses, pathway, assignments, progress, XP, levels, streaks, achievements, badges, calendar/events, teacher feedback, notifications, recent activity and saved resources.

## Course library and detail

Catalogue, filters, sort/view controls, search, course detail hero, metadata, course tabs, teacher block, learning objectives, curriculum, reviews/FAQ where relevant, prerequisites, related courses and completion/locked states.

## Course player

Large learning canvas, video placeholder, block/content examples, curriculum rail, progress, next/previous controls, lesson/activity states, mobile course navigator and completion feedback.

## Teacher workspace

Dashboard summary, classes/groups, student list/progress, assignments, calendar, recommendations, learning analytics, content/course creation entry points and teacher resources.

## School workspace

School dashboard, teacher/student management, groups/classes, invitations, adoption/completion metrics, events, credentials overview and administrator controls.

## Community

Community hero/search, discussion cards/list, study-group patterns, comments/replies, avatar groups, moderation/report states and safe empty states.

## Gamification

XP, levels, streaks, badges, achievements, pathway milestones, progress bars/rings and celebration/earned states. Keep rewards meaningful and visually restrained.

## Partner/admin CMS

Admin dashboard, content status cards, course/content tables, filters, bulk actions, draft/translation/review/approved/published/outdated states, translation indicators, content editor sections, course-builder blocks, activity-editor patterns, media picker/library, preview controls, revision/history pattern, approval actions, modal/dialog/drawer and destructive confirmation.

## Feedback/system states

Toast, alert, inline validation, loading/skeleton, empty, success, warning, error, disabled, permissions/forbidden, offline/network failure and destructive confirmation.

## Analytics

Use Recharts for normal line/bar/area/pie/progress analytics with Bright Mind styling. Use D3 later only where a bespoke educational/network visualization genuinely requires it.

# Interaction stack

- Motion for React (`motion/react`): standard animation/micro-interaction/layout/scroll system.
- Existing Radix/shadcn primitives: accessible dialogs, dropdowns, popovers, tabs, tooltip, accordion, sheet/drawer and other controls.
- Lucide: interface icon system.
- Recharts: normal dashboard analytics.
- D3: only for specialized bespoke visualizations.
- TanStack Table may be added when robust admin tables require sorting/filtering/selection/pagination beyond simple tables.

# Final quality rule

The design system is intended to become the reusable frontend foundation of the actual platform. Create final-quality components with sensible APIs/variants and mock data. Do not build disposable visual examples that will be rewritten later. Product-owner visual feedback should lead to adjusting these shared components so the whole platform inherits the approved system.
