# Iterate

Runtime instructions live in `SKILL.md`. Maintenance contract lives in `SPEC.md`. Provenance and decisions live in `SOURCES.md`.

## Bundled Review Policies

| Policy | Source |
| --- | --- |
| `references/code-comments.md` | Adapted from `/Users/dcramer/src/junior/policies/code-comments.md`. |
| `references/implementation-minimalism.md` | Adapted from the 2026-06-15 user request to reduce speculative guardrails, fallbacks, edge-case handling, and tests unless required by intent. |
| `references/interface-design.md` | Adapted from `/Users/dcramer/src/junior/policies/interface-design.md`. |
| `references/test-quality.md` | Adapted from `getsentry/junior` PR #532 and testing architecture policy sources. |

`iterate` spawns one policy subagent per bundled review policy.

## Maintenance References

| Reference | Use |
| --- | --- |
| `references/policy-template.md` | Use when adding or revising bundled policy references. |

Keep bundled policy references concise:
- short intent
- default rules
- real exceptions only
