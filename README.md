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

## Skill Format

Each skill lives in its own directory and starts with `SKILL.md`. New skills should include:

- `SKILL.md` for runtime instructions.
- `SPEC.md` for the maintenance contract when the skill intent or scope is non-trivial.
- `SOURCES.md` for provenance, decisions, gaps, and changelog entries.
