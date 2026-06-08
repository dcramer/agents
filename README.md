# agents

Personal agent assets managed with dotagents. The skill source repo is `dcramer/agents`; dotagents documentation lives at `https://dotagents.sentry.dev`.

## Use These Skills

From a repo where you want the skills installed:

```bash
npx @sentry/dotagents init
npx @sentry/dotagents add dcramer/agents code-cleanup
npx @sentry/dotagents install
```

`dotagents init` creates `agents.toml` for the consuming repo. `dotagents add` records this repo as the skill source, and `dotagents install` installs declared skills into the local agent skill directory.

Example `agents.toml` entry:

```toml
version = 1
agents = ["codex", "claude", "cursor"]

[[skills]]
name = "code-cleanup"
source = "dcramer/agents"

[[skills]]
name = "thermo-nuclear-code-quality-review"
source = "dcramer/agents"

[[skills]]
name = "iterate"
source = "dcramer/agents"
```

Refresh installed skills after changes:

```bash
npx @sentry/dotagents install
```

List installed skills:

```bash
npx @sentry/dotagents list
```

## Structure

- `skills/` contains reusable agent skills.
- `skills/code-cleanup/` reviews branch changes for simplification, reliability, policy compliance, and verification.
- `skills/thermo-nuclear-code-quality-review/` runs an unusually strict maintainability review for abstraction quality, giant files, and spaghetti-condition growth.
- `skills/iterate/` runs an incremental implementation review-fix-verify loop with evidence-labeled concerns and optional independent verification.

## Skill Format

Each skill lives in its own directory and starts with `SKILL.md`. New skills should include:

- `SKILL.md` for runtime instructions.
- `SPEC.md` for the maintenance contract when the skill intent or scope is non-trivial.
- `SOURCES.md` for provenance, decisions, gaps, and changelog entries.

## Attribution

| Skill | Source | License |
| --- | --- | --- |
| `thermo-nuclear-code-quality-review` | Vendored from Cursor Team Kit's [`thermo-nuclear-code-quality-review`](https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/thermo-nuclear-code-quality-review) by Cursor. | MIT, Copyright (c) 2026 Cursor. See `skills/thermo-nuclear-code-quality-review/README.md` and `skills/thermo-nuclear-code-quality-review/SOURCES.md` for attribution, provenance, and the upstream license notice. |
