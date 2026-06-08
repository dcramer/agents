# Iterate Specification

## Intent

`iterate` is a reusable implementation hardening loop. It runs while actively implementing, after each meaningful code slice, enumerates review tasks, delegates each task to a no-edit subagent, coordinates validity of the subagents' findings, fixes accepted material concerns, validates the result, asks a separate verification advisor only when it adds signal, and repeats until blocker/high/medium concerns are gone.

## Scope

In scope:
- incremental feature or fix implementation slices
- current-diff review and directly related files
- mandatory subagent-backed advisory review for every enumerated review task
- bundled policy review for code comments, interface design, and test quality
- independent verification advice for risky slices, ambiguous validation, or final readiness checks
- fixing material concerns found by the review
- targeted tests, type checks, linters, builds, and explicit validation blockers
- specs/docs, bundled policy compliance, dead code, delayering, type contracts, generated artifacts, dependency drift, and test quality

Out of scope:
- review-only branch audits with no implementation authority
- full PR CI iteration or external reviewer response loops
- broad rewrites unrelated to the current slice
- aesthetic-only style feedback unless required by a bundled policy
- product requirement changes without user approval
- non-code brainstorming or generic iteration

## Users And Trigger Context

- Primary users: agents implementing code who need a tight subagent-backed hardening loop before handoff.
- Common user requests: "run iterate on this feature slice", "iterate after each code slice", "review/fix/repeat this implementation", "use a subagent to find concerns before you finish".
- Should not trigger for: standalone code review requests, PR CI failure loops, harsh maintainability audits, general brainstorming, documentation-only explanation, non-code iteration, or requests to create/update skills.

## Runtime Contract

- Required first actions: inspect status, diff/base, repo instructions, relevant specs/docs, relevant tests, generated artifacts, lockfiles, and bundled policy references.
- Required outputs: no cycle log; final status with validation run, independent verification result when used, and residual material concerns only.
- Non-negotiable constraints: enumerate review tasks across behavior/spec, specs/docs, repo instructions, dead code, delayering, type boundaries, generated/dependencies, validation, and bundled policies; use one review-only subagent per non-policy review task and one policy subagent per bundled policy; stop if subagents are unavailable; coordinate validity instead of accepting findings automatically; use a separate verification advisor only when it adds signal; require evidence labels and concrete locators for concerns; apply only high-confidence accepted material concerns; preserve unrelated user changes; repeat after material edits; avoid unbounded loops; and do not stop with unresolved blocker/high/medium concerns unless blocked or explicitly deferred.
- Expected bundled files loaded at runtime: `SKILL.md`, `references/code-comments.md`, `references/interface-design.md`, and `references/test-quality.md`.

## Source And Evidence Model

Authoritative sources:
- the user's seed prompt
- local repo instructions
- bundled policy references, including test-quality policy
- changed code, related specs/docs, and tests
- generated artifacts, lockfiles, schemas, and dependency manifests
- validation command output
- independent verification advisor output when used

Useful improvement sources:
- positive examples: loops that caught real spec, policy, type, or dead-code issues before handoff
- negative examples: loops that accepted vague advice, over-refactored, or stopped before material concerns were resolved
- commit logs/changelogs: regressions caused by missing docs, weak types, or stale layers
- issue or PR feedback: recurring reviewer comments about the loop missing concerns
- validation results: commands that caught or failed to catch slice regressions

Data that must not be stored:
- secrets
- customer data
- private URLs or identifiers not needed for reproduction

## Reference Architecture

- `SKILL.md` contains: runtime intent, workflow, advisor prompts, concern rubric, review-task enumeration, loop rules, and output contract.
- `README.md` contains: bundled policy inventory and maintenance reference notes.
- `references/` contains: bundled policy references and the policy template.
- `references/evidence/` contains: future redacted examples if recurring loop failures justify persistent evidence.
- `scripts/` contains: nothing yet.
- `assets/` contains: nothing yet.

## Validation

- Lightweight validation: run the skill structural validator and manually inspect trigger wording, runtime compactness, anti-loop rules, severity semantics, evidence labels, independent verification, and portability.
- Deeper validation: run the skill against real implementation slices and check whether it finds actionable, line-grounded concerns without drifting into broad prose.
- Holdout examples: add only after enough real positive and negative loop outcomes exist.
- Acceptance gates: valid frontmatter, concise runtime body, runtime policy references routed from `SKILL.md`, clear loop stopping rule, severity semantics, evidence-labeled findings, mandatory no-edit review subagent contract, coordinator validity role, useful-but-not-mandatory independent verification contract, and no missing runtime references.

## Known Limitations

- Subagent availability and isolation semantics vary by agent runtime; without subagents, this skill cannot run as specified.
- Review quality depends on giving each advisor enough diff, spec, bundled policy, and validation context.
- Independent verification can confirm evidence coverage, not prove correctness beyond available commands and inspected artifacts.
- The skill can over-loop on subjective concerns unless the main agent rejects weak advice explicitly.

## Maintenance Notes

- Update `SKILL.md` when loop behavior, advisor prompts, evidence labels, stopping rules, concern categories, or output contract changes.
- Update `references/` when bundled policies change; keep policy references short using `references/policy-template.md`.
- Update `SOURCES.md` when adding provenance, decisions, gaps, or changelog entries.
- Update `references/evidence/` only with redacted examples that materially improve future loop behavior.
