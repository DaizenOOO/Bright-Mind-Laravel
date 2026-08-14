# Project Rules Index

Before planning or editing, find every row whose globs match the file's path and read that rule file. Also search `.ai/rules` for task keywords because some rules are cross-cutting.

| Applies to | Rule file |
| --- | --- |
| **/* | .ai/rules/project.md |
| **/*.md, .ai/rules/** | .ai/rules/documentation.md |
| app/**, routes/**, database/**, config/**, tests/** | .ai/rules/backend.md |
| resources/js/**, resources/css/**, vite.config.ts, package.json | .ai/rules/frontend.md |
| app/**, database/**, resources/**, routes/** | .ai/rules/i18n.md |

Laravel/package-specific Boost guidance remains in `AGENTS.md` and the installed agent skills.
