# Design Sources

## Source Inventory

| Source | Contribution | Usage |
| --- | --- | --- |
| [Trystan-SA/claude-design-system-prompt](https://github.com/Trystan-SA/claude-design-system-prompt) at `3c3ddb07d7aa3fef051d83608596470c95cfd8fe` | Codex system prompt and 14 procedural design references | Vendored the prompt body and procedure files without content changes |

## Local Changes

- Named the installable skill `design`.
- Added skill frontmatter directly to the upstream system prompt and saved the result as `SKILL.md`.
- Retained the upstream `skills/*.md` procedure files verbatim.
- Omitted the upstream `AGENTS.md` loader because `SKILL.md` is the runtime entry point.
- Retained the upstream MIT license as `LICENSE`.
