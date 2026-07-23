# Garfield

Runtime instructions live in `SKILL.md`. The Skillet behavior contract lives in `spec.md`. Provenance and decisions live in `SOURCES.md`.

## Native Review Lanes

`references/review-lanes.md` defines the ownership boundary and quality brake
for each general Garfield reviewer. Pass a native reviewer only its matching
card. The coordinator clusters findings by locator and underlying cause so one
lane owns the concern and other reports supply corroborating evidence instead
of duplicate fixes.

## Bundled Review Policies

| Policy | Source |
| --- | --- |
| `references/code-comments.md` | Adapted from `/Users/dcramer/src/junior/policies/code-comments.md`. |
| `references/implementation-minimalism.md` | Adapted from the 2026-06-15 user request to reduce speculative guardrails, fallbacks, edge-case handling, and tests unless required by intent. |
| `references/interface-design.md` | Adapted from `/Users/dcramer/src/junior/policies/interface-design.md`. |
| `references/test-quality.md` | Adapted from `getsentry/junior` PR #532 and testing architecture policy sources. |

`garfield` compares bundled policies with source-app policies before applicability selection, then spawns one policy subagent per applicable policy in the effective set. All reviewers share the skill's three-open-agent rolling limit.

## Source-App Policies

When a source application has local policy docs, `garfield` discovers `policies/**/*.md` files whose scope or subject governs the touched slice, excluding any `README.md` or `policy-template.md` file under `policies/`.

The coordinator compares policy intent and scope without repo configuration. A source-app policy supersedes a bundled policy when it establishes repo-wide defaults for substantially the same concern, even when names or wording differ. Narrower or adjacent policies supplement the bundled policy. Superseded bundled policies are excluded from review; source-app policies remain authoritative.

These files are read from the repository under review at runtime. Do not vendor source-app policies into this skill or require supersession metadata in consuming repos.

## Maintenance References

| Reference | Use |
| --- | --- |
| `references/policy-template.md` | Use when adding or revising bundled policy references. |

Keep bundled policy references concise:
- short intent
- default rules
- real exceptions only
