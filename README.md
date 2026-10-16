# agents

Personal agent assets managed with dotagents. The skill source repo is `dcramer/agents`; dotagents documentation lives at [dotagents.sentry.dev](https://dotagents.sentry.dev).

## Use These Skills

### dotagents

Install skills into your user-level agent configuration:

```bash
npx @sentry/dotagents init --user
npx @sentry/dotagents add --user dcramer/agents garfield
npx @sentry/dotagents add --user dcramer/agents odie
npx @sentry/dotagents add --user dcramer/agents design
npx @sentry/dotagents add --user dcramer/agents testing-agents
npx @sentry/dotagents add --user dcramer/agents inbox-triage
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

[[skills]]
name = "design"
source = "dcramer/agents"

[[skills]]
name = "testing-agents"
source = "dcramer/agents"

[[skills]]
name = "inbox-triage"
source = "dcramer/agents"
```

### skills

You can also install this repo's skills with the `skills` CLI:

```bash
npx skills add dcramer/agents --skill garfield
npx skills add dcramer/agents --skill odie
npx skills add dcramer/agents --skill design
npx skills add dcramer/agents --skill testing-agents
npx skills add dcramer/agents --skill inbox-triage
```

Install every skill in this repo:

```bash
npx skills add dcramer/agents --all
```

## Structure

- `skills/` contains reusable agent skills.
- `skills/garfield/` runs an incremental implementation review-fix-verify loop with evidence-labeled concerns and optional independent verification.
- `skills/odie/` analyzes recurring transcript, commit, Sentry, GitHub, CI, review, or Garfield evidence and plans hard deterministic lint, type, CI, schema, generated-artifact, or pre-commit rules.
- `skills/design/` provides an opinionated, accessibility-aware design workflow with procedures for production, extraction, and review.
- `skills/testing-agents/` designs trustworthy agent tests and evals by separating fixed contracts from model-variable quality, selecting the right test layer, and resisting fixture overfitting.
- `skills/inbox-triage/` processes account-scoped email events with compact private rules, verified decision reuse, and targeted recipient/contact/relationship evidence. It preserves inbox-only actions, safe unsubscribe, reason labels, readback, and feedback for undefined categories. Coalesced events share fresh context; cursor-based gap recovery and explicit cleanup are separate from normal event processing. See `references/rules-template.md` and `references/event-state.md` for private policy/state contracts; no per-email all-inbox sweep is required.

The implementation loop is named `garfield` instead of a generic name like `iterate` so it stays unique across personal and shared skill registries and avoids conflicts with similarly named workflow skills.

## Skill Format

Each skill lives in its own directory and starts with `SKILL.md`. This repository uses [Skillet](https://skillet.sentry.dev) for spec-driven skill authoring and structural validation. New skills should include:

- `SKILL.md` for runtime instructions.
- `spec.md` for the Skillet behavior contract. Legacy skills may retain `SPEC.md` until migrated.
- `SOURCES.md` for provenance, decisions, gaps, and changelog entries.
- `agents/openai.yaml` for optional OpenAI UI metadata, such as display name, short description, and default prompt.
