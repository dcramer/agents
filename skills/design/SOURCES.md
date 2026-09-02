# Design Sources

## Source Inventory

| Source | Contribution | Usage |
| --- | --- | --- |
| [Trystan-SA/claude-design-system-prompt](https://github.com/Trystan-SA/claude-design-system-prompt) at `3c3ddb07d7aa3fef051d83608596470c95cfd8fe` | Codex system prompt and 14 procedural design references | Vendored from the upstream `codex/` directory without content changes |
| Upstream `codex/AGENTS.md` | Loading, routing, and verification entry point | Adapted minimally into `SKILL.md` frontmatter and runtime instructions |

## Local Changes

- Named the installable skill `design`.
- Added `SKILL.md` so skill-aware agents can discover the upstream Codex bundle.
- Retained the upstream `AGENTS.md`, `system-prompt.md`, and `skills/*.md` files verbatim.
- Retained the upstream MIT license as `LICENSE`.
