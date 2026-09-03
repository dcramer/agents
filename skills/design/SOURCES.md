# Design Sources

## Source Inventory

| Source | Contribution | Usage |
| --- | --- | --- |
| [Trystan-SA/claude-design-system-prompt](https://github.com/Trystan-SA/claude-design-system-prompt) at `3c3ddb07d7aa3fef051d83608596470c95cfd8fe` | Codex system prompt and 14 procedural design references | Used as the basis for the runtime skill, detailed standards, and specialist procedures; local delivery changes are recorded below |

## Local Changes

- Named the installable skill `design`.
- Migrated the runtime entry point to a Skillet-managed `spec.md` and concise `SKILL.md`; retained the upstream prompt's detailed standards in `references/design-standards.md`.
- Retained the upstream `skills/*.md` procedures; amended `make-a-deck.md` only to apply the rendered-delivery rule.
- Omitted the upstream `AGENTS.md` loader because `SKILL.md` is the runtime entry point.
- Retained the upstream MIT license as `LICENSE`.
- Added a rendered-delivery requirement: when compatible rendering and image-display tools are available, visual HTML is inspected and delivered with a representative inline preview as well as editable source. Updated the deck procedure to follow the same rule.

## Changelog

- 2026-09-03: Added `spec.md`, migrated the runtime guidance, and made rendered inline previews the default delivery path for visual HTML when supported.
