# agents

Personal agent assets managed with dotagents. The skill source repo is `dcramer/agents`; dotagents documentation lives at `https://dotagents.sentry.dev`.

## Use These Skills

### dotagents

From a repo where you want the skills installed:

```bash
npx @sentry/dotagents init
npx @sentry/dotagents add dcramer/agents iterate
npx @sentry/dotagents install
```

`dotagents init` creates `agents.toml` for the consuming repo. `dotagents add` records this repo as the skill source, and `dotagents install` installs declared skills into the local agent skill directory.

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
- `skills/iterate/` runs an incremental implementation review-fix-verify loop with evidence-labeled concerns and optional independent verification.

## Skill Format

Each skill lives in its own directory and starts with `SKILL.md`. New skills should include:

- `SKILL.md` for runtime instructions.
- `SPEC.md` for the maintenance contract when the skill intent or scope is non-trivial.
- `SOURCES.md` for provenance, decisions, gaps, and changelog entries.
