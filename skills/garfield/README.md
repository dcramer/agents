# Garfield

Runtime instructions live in `SKILL.md`. Maintenance contract lives in `SPEC.md`. Provenance and decisions live in `SOURCES.md`.

## Bundled Review Policies

| Policy | Source |
| --- | --- |
| `references/code-comments.md` | Adapted from `/Users/dcramer/src/junior/policies/code-comments.md`. |
| `references/implementation-minimalism.md` | Adapted from the 2026-06-15 user request to reduce speculative guardrails, fallbacks, edge-case handling, and tests unless required by intent. |
| `references/interface-design.md` | Adapted from `/Users/dcramer/src/junior/policies/interface-design.md`. |
| `references/test-quality.md` | Adapted from `getsentry/junior` PR #532 and testing architecture policy sources. |

`garfield` spawns one policy subagent per applicable bundled review policy. Applicability is determined from the current diff before agents are launched, and all reviewers share the skill's three-open-agent rolling limit.

## Source-App Policies

When a source application has local policy docs, `garfield` also spawns one policy subagent per discovered `policies/**/*.md` file whose scope or subject governs the touched slice, excluding any `README.md` or `policy-template.md` file under `policies/`.

These files are read from the repository under review at runtime. Do not vendor source-app policies into this skill.

## Maintenance References

| Reference | Use |
| --- | --- |
| `references/policy-template.md` | Use when adding or revising bundled policy references. |

Keep bundled policy references concise:
- short intent
- default rules
- real exceptions only
