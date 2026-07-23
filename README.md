# agents

Personal agent assets managed with dotagents. The skill source repo is `dcramer/agents`; dotagents documentation lives at [dotagents.sentry.dev](https://dotagents.sentry.dev).

## Use These Skills

### dotagents

Install skills into your user-level agent configuration:

```bash
npx @sentry/dotagents init --user
npx @sentry/dotagents add --user dcramer/agents garfield
npx @sentry/dotagents add --user dcramer/agents odie
npx @sentry/dotagents install --user
```

`dotagents init --user` creates a user-level `agents.toml`. `dotagents add --user` records this repo as the skill source, and `dotagents install --user` installs declared skills into the user agent skill directory.

Example `agents.toml` entry:

```toml
version = 1
agents = ["codex", "claude", "cursor"]

[[skills]]
name = "garfield"
source = "dcramer/agents"

[[skills]]
name = "odie"
source = "dcramer/agents"
```

### skills

You can also install this repo's skills with the `skills` CLI:

```bash
npx skills add dcramer/agents --skill garfield
npx skills add dcramer/agents --skill odie
```

Install every skill in this repo:

```bash
npx skills add dcramer/agents --all
```

## Structure

- `skills/` contains reusable agent skills.
- `skills/garfield/` runs an incremental implementation review-fix-verify loop with evidence-labeled concerns and optional independent verification.
- `skills/odie/` analyzes recurring transcript, commit, Sentry, GitHub, CI, review, or Garfield evidence and plans hard deterministic lint, type, CI, schema, generated-artifact, or pre-commit rules.

The implementation loop is named `garfield` instead of a generic name like `iterate` so it stays unique across personal and shared skill registries and avoids conflicts with similarly named workflow skills.

## Skill Format

Each skill lives in its own directory and starts with `SKILL.md`. This repository uses [Skillet](https://skillet.sentry.dev) for spec-driven skill authoring and structural validation. New skills should include:

- `SKILL.md` for runtime instructions.
- `spec.md` for the Skillet behavior contract. Legacy skills may retain `SPEC.md` until migrated.
- `SOURCES.md` for provenance, decisions, gaps, and changelog entries.
- `agents/openai.yaml` for optional OpenAI UI metadata, such as display name, short description, and default prompt.
