---
paths:
  - '**/*.md'
  - '.ai/rules/**'
---

# Documentation

## Keep documentation operational
Keep documentation concise and useful to a fresh Codex session. Avoid duplicating the same fact across files; update the document that owns it.

## Reusable component documentation
Document actual reusable Bright Mind components/subsystems under `docs/components/` when introduced. Do not create separate Markdown files for trivial wrappers or obvious primitives.

## State versus decisions
Record product/architecture decisions in `DECISIONS.md` and current implementation state in `CURRENT_STATE.md`. Mark proposals and open decisions clearly so they are not mistaken for implemented behavior.
