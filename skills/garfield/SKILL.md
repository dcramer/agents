---
name: garfield
description: Coordinates bounded subagent review, intent-preserving fixes, and validation after a meaningful implementation slice; use only when the user explicitly asks to run Garfield or its review-fix-verify loop before handoff, not for standalone reviews, CI iteration, brainstorming, or skill authoring.
disable-model-invocation: true
spec_hash: 5a1560d5f494
---

# Garfield

Run a skeptical, concise implementation hardening loop after each meaningful code slice. Focus on concrete flaws caused by the current diff, avoid unnecessary work, and preserve the core user or PR intent.

Never activate Garfield unless the user explicitly invokes it. If review-only subagents or required capacity are unavailable, stop and report that Garfield cannot run as specified.

## Frame the slice

Before review, inspect:

- repository status, diff/base, and changed files
- applicable repository instructions
- the request, relevant specs and docs, tests, and known non-goals
- generated artifacts, schemas, migrations, lockfiles, manifests, and dependencies
- available validation commands and intentional tradeoffs
- source-app policies from sorted `policies/**/*.md`, excluding any `README.md` or `policy-template.md`

Snapshot the requested behavior, intended behavior changes, compatibility expectations, touched areas, and non-goals. Scope review to the current diff and directly related files. Preserve unrelated dirty-worktree changes.

## Build the effective review plan

Compare each bundled policy with discovered source-app policies by intent and scope before choosing reviewers. A repo-wide local policy supersedes a bundled policy governing substantially the same concern even when names differ. A narrower or adjacent local policy supplements it. Omit superseded bundled policies completely; never send one to a reviewer or use it for findings.

Classify every candidate below as `applicable` or `skipped` with a concrete diff-based reason. Confidence that the code looks safe is not a skip reason.

- behavior/spec — always
- repository instructions — always
- validation sufficiency — always
- specs/docs — behavior or documented contracts changed or should have changed
- dead code — paths were replaced, removed, or refactored
- delayering — wrappers, flags, adapters, abstractions, indirection, or ownership changed
- type boundaries — typed interfaces, casts, nullable values, `any`, `unknown`, or serialization changed
- generated/dependencies — an API/storage schema, migration, generated/reference output, manifest, lockfile, dependency, package artifact, CI dependency surface, or eval recording changed or should change
- code comments — comments/docstrings changed or new non-obvious code makes `references/code-comments.md` material
- implementation minimalism — guards, fallbacks, wrappers, configuration, edge cases, or supporting tests make `references/implementation-minimalism.md` material
- interface design — public/module interfaces, lifecycle, naming, ownership, or platform boundaries make `references/interface-design.md` material
- test quality — tests/fixtures changed or behavior creates a concrete obligation under `references/test-quality.md`
- each effective source-app policy — its scope governs the slice

Record an omitted bundled policy as `skipped — superseded by <source-policy-path>`.

For each applicable native task, read only its card in `references/review-lanes.md`. Use the card to define what that reviewer owns, excludes, and must prove; keep severity, causality, and output rules here.

## Delegate reviews

Assign exactly one no-edit subagent to every applicable task or effective policy. Give each reviewer the user goal, intent and non-goals, diff/base, changed and related files, relevant instructions/specs, validation evidence, and intentional tradeoffs. Give a native-task reviewer only its matching card plus slice context; give a policy reviewer only its one policy plus slice context.

Keep at most three Garfield review subagents open. Spawn to available capacity, wait, collect and close or release completed reviewers, then refill. Drain all review agents before independent verification. Never silently drop a task, rely on implicit queuing, repeatedly retry a capacity error, or allow a reviewer to edit.

Require findings in this form:

```text
[severity][evidence:<label[,label]> <locator>;cause:introduced|worsened|stale|missing-required] path:line - concern. impact: <impact>. fix: <smallest change>.
```

Use `direct`, `spec`, `policy`, `test`, `validation`, `missing`, or `inferred` evidence. Use a changed-code location when available; otherwise use a command, test, policy, spec, artifact, manifest, or lockfile locator. Never accept `inferred` alone as a blocker.

Tell reviewers to return only findings caused or made material by the current diff, including required omissions. They must not propose speculative hardening, compatibility changes, API or permission changes, normalization, precedence changes, new abstractions, or unrelated cleanup. If none exist, they return `none`.

## Coordinate and repair

Treat reviewer output as advice. Validate every finding yourself.

- Cluster reports by stable locator and normalized underlying cause before deciding severity or work. Assign one owning lane to each concern; treat other reports as corroborating evidence, a better locator, or an alternate remedy. A broad obsolete-workflow concern owns the members it already names.
- Decide whether the demonstrated defect is valid separately from whether the suggested remedy is proportionate. Accepting a concern never makes its proposed fix authoritative.
- `blocker`: fix before proceeding when the smallest fix preserves intent.
- `high`: fix when the smallest fix preserves intent or repairs a slice regression.
- `medium`: fix only when current-diff-caused and it removes introduced bloat, repairs stale local evidence, or is a one-hop edit to changed code.
- `low`: optional; never loop solely for it.

Reject vague, preference-only, or evidence-free findings. Defer valid pre-existing debt, adjacent hardening, unclear behavior changes, and anything whose smallest fix expands the patch or core intent.

Apply only the smallest accepted fixes. Before adding a validator, trigger, cache, compatibility layer, wrapper, state field, or elaborate test harness, compare a smaller boundary, type, transaction, assertion, deletion, or existing-test repair. Preserve permission, security, idempotency, lock-order, migration, and durable-integrity checks unless you can prove what establishes the invariant and how long it remains valid.

Never introduce behavior changes, speculative hardening, broad rewrites, unrelated cleanup, or duplicate fixes. Do not add comments, tests, wrappers, compatibility paths, persistent mechanisms, or test machinery solely to satisfy overlapping review suggestions without a distinct current-diff contract and proportionate need. Do not change accepted inputs, error behavior, permissions, parameter precedence, defaults, serialization, validation policy, or public API semantics unless explicitly requested or required to repair a regression introduced by the slice.

## Validate and repeat

After fixes, run the smallest relevant tests, type checks, linters, builds, schema checks, generated-artifact checks, or record an explicit blocker. Recompute applicability from the repair delta and rerun only affected concern owners and newly applicable lanes. Always rerun behavior/spec after a behavior-changing repair; do not restart the full review for a narrow comment, test, or artifact-only edit.

Stop successfully when no current-diff-caused blocker, high, or eligible medium concern remains and targeted validation passes. Stop blocked when:

- the same concern repeats twice
- three cycles pass without new material progress
- required subagents or capacity remain unavailable
- completion needs clarification, broad redesign, risky unrelated edits, or behavior outside core intent

## Verify independently

After draining review agents, use a separate no-edit verification advisor when validation is uncertain, the slice is risky, generated or dependency artifacts changed, or final readiness needs independent evidence. Ask it only whether the final diff preserves intent, validation matches the touched behavior and files, required checks ran or have explicit blockers, and deferrals have concrete evidence and valid reasons. Do not ask it to re-review the whole diff.

Address any material verification gap using the same intent and severity gates.

## Handoff

Report only:

- `garfield: pass` or `garfield: blocked`
- validation commands and results
- independent verification result when run, or when skipped for a non-obvious reason
- residual accepted or deferred blocker, high, or medium concerns
- deferred adjacent improvements or unclear behavior changes

Omit cycle logs and low-severity bookkeeping.
