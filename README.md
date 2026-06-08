# agents

Personal agent assets managed with dotagents. The skill source repo is `dcramer/agents`; dotagents documentation lives at [dotagents.sentry.dev](https://dotagents.sentry.dev).

## Use These Skills

### dotagents

Install skills into your user-level agent configuration:

```bash
npx @sentry/dotagents init --user
npx @sentry/dotagents add --user dcramer/agents iterate
npx @sentry/dotagents install --user
```

`dotagents init --user` creates a user-level `agents.toml`. `dotagents add --user` records this repo as the skill source, and `dotagents install --user` installs declared skills into the user agent skill directory.

Example `agents.toml` entry:

```toml
version = 1
agents = ["codex", "claude", "cursor"]

[[skills]]
name = "iterate"
source = "dcramer/agents"
```

### skills

You can also install this repo's skills with the `skills` CLI:

```bash
npx skills add dcramer/agents --skill iterate
```

Install every skill in this repo:

```bash
npx skills add dcramer/agents --all
```

## Structure

- `skills/` contains reusable agent skills.
- `skills/iterate/` runs an incremental implementation review-fix-verify loop with evidence-labeled concerns and optional independent verification.

## Skill Format

Each skill lives in its own directory and starts with `SKILL.md`. New skills should include:

- `SKILL.md` for runtime instructions.
- `SPEC.md` for the maintenance contract when the skill intent or scope is non-trivial.
- `SOURCES.md` for provenance, decisions, gaps, and changelog entries.
