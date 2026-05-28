# Code Cleanup Specification

## Intent

`code-cleanup` is a reusable review skill for adversarially inspecting branch changes before merge. It should help agents reduce unnecessary layers, remove incidental complexity, increase reliability, maintain repo-wide policy, and preserve the branch's original intent.

## Scope

In scope:
- branch, PR, or diff review
- simplification and reliability findings
- repo policy and verification checks
- review-only output by default

Out of scope:
- broad rewrites without explicit user request
- aesthetic-only style preferences
- changing product intent under the label of cleanup
- replacing repo-specific instructions with generic advice

## Users And Trigger Context

- Primary users: engineers asking for adversarial code review or cleanup review.
- Common user requests: "review this branch for cleanup", "find complexity we can remove", "do an adversarial cleanup pass", "pre-merge hardening review".
- Should not trigger for: general programming help, unrelated documentation edits, product brainstorming, or requests to create a new skill.

## Runtime Contract

- Required first actions: inspect branch status, changed files, likely base branch, repo instructions, and relevant tests or conventions.
- Required outputs: findings first, verification results, optional cleanup opportunities, and explicit residual risk when no findings are found.
- Non-negotiable constraints: preserve original intent, do not mutate code unless requested, ground findings in changed files and lines, and separate defects from preferences.
- Expected bundled files loaded at runtime: `SKILL.md` only.

## Source And Evidence Model

Authoritative sources:
- the user's seed prompt
- local repo instructions and changed code
- test, type, lint, and build results

Useful improvement sources:
- positive examples: reviews that removed real complexity without behavior drift
- negative examples: reviews that confused preference with defects or changed intent
- commit logs/changelogs: regressions caused by over-abstraction or insufficient verification
- issue or PR feedback: recurring review comments about reliability or repo policy
- validation results: validator output and review format checks

Data that must not be stored:
- secrets
- customer data
- private URLs or identifiers not needed for reproduction

## Reference Architecture

- `SKILL.md` contains: all runtime instructions and the output contract.
- `references/` contains: nothing yet.
- `references/evidence/` contains: future anonymized positive and negative examples when iteration evidence exists.
- `scripts/` contains: nothing yet.
- `assets/` contains: nothing yet.

## Validation

- Lightweight validation: run the skill structural validator and manually inspect trigger wording, output contract, and portability.
- Deeper validation: test against real branch review examples and verify findings are actionable, line-grounded, and intent-preserving.
- Holdout examples: add only after enough real review outcomes exist.
- Acceptance gates: valid frontmatter, concise runtime body, clear review-only default, no hidden runtime references.

## Known Limitations

- The skill cannot infer unavailable product requirements; ambiguous intent should be called out.
- Verification quality depends on the local repo exposing reliable tests, type checks, or build commands.

## Maintenance Notes

- Update `SKILL.md` when review behavior, output format, or trigger scope changes.
- Update `SOURCES.md` when adding provenance, decisions, gaps, or changelog entries.
- Update `references/evidence/` only with redacted examples that materially improve future reviews.
