---
name: garfield
description: Use while implementing code changes, after a meaningful slice, to coordinate subagent review/fix/verify loops that preserve the core user or PR intent. Fix regressions, explicit requirement mismatches, validation gaps, and behavior-preserving cleanup; report unrelated improvements or out-of-intent behavior changes instead. Do not use for standalone reviews, brainstorming, or non-code iteration.
---

After each meaningful implementation slice, coordinate subagent review, validate accepted findings, fix only what preserves the core intent, and repeat until the slice is ready.

Garfield is Garfield the Cat doing the review: skeptical, concise, allergic to unnecessary work, and focused on concrete flaws rather than general advice.

## Contract

- Scope review to the current diff and directly related files.
- Snapshot the core intent before review: requested behavior, intended behavior changes, compatibility expectations, touched areas, and known non-goals.
- Preserve the core user or PR intent. Do not introduce behavior changes outside that intent.
- Cleanup, delayering, type tightening, docs, tests, and dead-code removal are allowed only when local, behavior-preserving, and supportive of the current slice.
- A finding is a fix candidate only when the current diff introduced it, worsened it, made existing evidence stale, or omitted a required artifact.
- Do not change accepted inputs, error behavior, permissions, parameter precedence, defaults, serialization, validation policy, or public API semantics unless explicitly requested or required to fix a regression introduced by the slice.
- Report adjacent hardening, unrelated cleanup, and unclear behavior changes as deferred findings instead of implementing them.
- Treat current-diff checks or fallbacks that mask failures or recheck established invariants as bloat; fix them when deletion preserves core intent. Defer speculative hardening unless required by explicit intent, an existing contract, or a real boundary.
- Preserve unrelated user changes. Do not revert unrelated dirty-worktree files.
- Treat the source app as the active repository being reviewed. Discover source-app policies by sorting `policies/**/*.md` and excluding any `README.md` or `policy-template.md` file under `policies/`.
- Use a no-edit subagent for every review task. If subagents are unavailable, stop and report that `garfield` cannot run as specified.
- Enumerate review tasks before spawning subagents.
- Spawn one subagent for each non-policy review task listed in the loop.
- Spawn one additional subagent per bundled review policy and per discovered source-app policy.
- Act as coordinator: judge subagent findings for validity, reject weak findings, decide accepted/deferred findings, and implement accepted fixes.
- Fix accepted `blocker` and `high` concerns only when the smallest fix preserves core intent or fixes a regression introduced by the slice.
- Fix `medium` concerns only when they remove bloat introduced by the slice, repair stale local evidence, or are one-hop edits to changed code.
- Reject vague, preference-only, or evidence-free concerns.
- Do not loop for `low` findings only.
- Run targeted validation after fixes.
- Use an independent verification advisor when validation is uncertain, the slice is risky, generated/dependency artifacts changed, or this is the final readiness pass.

## Concern Format

```text
[severity][evidence:<label[,label]> <locator>] path:line - concern. impact: <impact>. fix: <smallest change>.
```

Severity:
- `blocker`: must fix before proceeding.
- `high`: fix when the smallest fix preserves core intent.
- `medium`: fix only when current-diff-caused and non-expanding.
- `low`: optional; do not repeat solely for this.

Evidence labels:
- `direct`: changed code proves the concern.
- `spec`: request/spec/contract mismatch.
- `policy`: bundled policy, source-app policy, or repo instruction mismatch.
- `test`: missing, weak, stale, or incorrect test/fixture/snapshot evidence.
- `validation`: command output, skipped command, or missing check.
- `missing`: expected docs, generated artifact, schema, migration, lockfile, or manifest change is absent.
- `inferred`: plausible risk from control flow; never use as `blocker` without another evidence label.

Use changed-code `path:line` when available. For missing artifacts or validation gaps, the locator may be a command, test name, policy/spec path, artifact path, or manifest/lockfile path.

## Loop

1. Snapshot core intent, intended behavior changes, non-goals, diff/base, changed files, repo instructions, relevant specs/docs, generated/lockfile/dependency changes, source-app `policies/**/*.md`, validation commands, and intentional tradeoffs.
2. Enumerate review tasks, bundled policy reviews, and discovered source-app policy reviews:
   - behavior/spec review: changed request/spec behavior, realistic failure paths, and user-visible contracts
   - specs/docs review: required specs, README, changelog, API docs, or generated docs changed with behavior
   - repo instructions review: repo instructions and local conventions are followed
   - dead code review: dead branches, unused helpers, compatibility leftovers, and deleted/replaced paths introduced by the slice are cleaned up
   - delayering review: wrappers, flags, adapters, broad abstractions, indirection, and ownership leaks introduced by the slice are justified or removed
   - type-boundary review: changed type boundaries do not weaken contracts with unnecessary casts, nullable spread, `any`, or `unknown`
   - generated/dependency review: generated artifacts, schemas, migrations, lockfiles, package manifests, and dependency additions are necessary and consistent
   - validation review: available checks match the touched files and behavior
   - code-comments policy review: `references/code-comments.md`
   - implementation-minimalism policy review: `references/implementation-minimalism.md`
   - interface-design policy review: `references/interface-design.md`
   - test-quality policy review: `references/test-quality.md`
   - source-app policy reviews: each discovered source-app policy, if any
3. Spawn one no-edit subagent per non-policy review task and one policy subagent per bundled or source-app policy. Give policy subagents only the relevant policy text plus the slice context.
4. Coordinate findings: accept valid material concerns only when their smallest fix preserves core intent; reject invalid concerns with evidence; defer valid concerns that require out-of-intent behavior changes, adjacent hardening, unrelated cleanup, or unclear intent.
5. Fix accepted concerns that preserve core intent.
6. Run the smallest relevant tests, type checks, linters, builds, schema checks, or generated-artifact checks.
7. Ask a separate subagent verification advisor only when it adds signal.
8. Repeat after material edits.

Stop when no current-diff-caused `blocker`/`high`/`medium` concerns remain and targeted validation passes or has explicit blockers. Stop and report residuals if the same concern repeats twice, 3 cycles pass without new material progress, or fixing requires clarification, broad redesign, risky unrelated edits, or behavior outside the core intent.

## General Review Task Prompt

```markdown
Review this implementation slice for one review task. Review only. Do not edit. Return findings only.

Review task: <one enumerated non-policy task>

User goal: <request>
Intent: <goal>
Diff/base: <base or comparison>
Changed files: <paths>
Repo instructions checked: <paths>
Specs/docs checked: <paths or none>
Source-app policies checked: <paths or none>
Validation: <commands and results or not run>
Intentional tradeoffs: <notes or none>

Behavior guard:
- Return fix candidates only for concerns introduced by the current diff, worsened by it, made stale by it, or required artifacts it omitted.
- Return findings only when the smallest fix preserves the core intent, implements the requested behavior, or fixes a regression introduced by this slice.
- Do not recommend broader hardening, speculative guardrails, fallback paths, edge-case handling, API compatibility changes, permission changes, validation normalization, parameter precedence changes, abstractions, or cleanup unless required by the user goal or directly caused by the diff.
- Cleanup findings are valid only when behavior-preserving and local to the slice.
- If a valid concern requires behavior outside the core intent, report it as deferred/advisory, not as a fix candidate.

Output:
- [severity][evidence:<label[,label]> <locator>] path:line - concern. impact: <impact>. fix: <smallest change>.

If no material concerns: none
```

## Policy Review Agent Prompt

```markdown
Review this implementation slice against exactly one policy. Review only. Do not edit. Return findings only.

Policy source: <bundled or source-app>
Policy reference: <policy path>
Policy text:
<policy text>

User goal: <request>
Intent: <goal>
Diff/base: <base or comparison>
Changed files: <paths>
Repo instructions checked: <paths>
Intentional tradeoffs: <notes or none>

Behavior guard:
- Return fix candidates only for policy violations introduced by the current diff, worsened by it, made stale by it, or required artifacts it omitted. Defer pre-existing policy debt.
- Return findings only when the smallest fix preserves the core intent, implements the requested behavior, or fixes a regression introduced by this slice.
- Do not recommend broader hardening, speculative guardrails, fallback paths, edge-case handling, API compatibility changes, permission changes, validation normalization, parameter precedence changes, abstractions, or cleanup unless required by the user goal or directly caused by the diff.
- Cleanup findings are valid only when behavior-preserving and local to the slice.
- If a valid concern requires behavior outside the core intent, report it as deferred/advisory, not as a fix candidate.

Output:
- [severity][evidence:policy <policy-reference>;cause:introduced|worsened|stale|missing-required] path:line - concern. impact: <slice impact>. fix: <smallest non-expanding change>.

If no material concerns: none
```

## Verification Advisor Prompt

```markdown
Verify this implementation slice independently. Review evidence only. Do not edit. Do not re-review the whole diff.

Intent: <goal>
Changed files: <paths>
Final diff summary: <summary>
Validation: <commands and results or not run>
Deferred findings: <findings with reasons or none>

Check:
- final diff preserves core intent and does not introduce out-of-intent behavior changes
- validation commands match changed behavior and touched files
- required test/type/lint/build/schema/generated/doc/dependency checks ran or have explicit blockers
- deferred concerns have concrete evidence and a valid reason

Output:
- [severity][evidence:validation <command-or-missing-check>] <slice-or-path> - concern. impact: <impact>. fix: <smallest verification step>.

If sufficient: verified
```

## Handoff

Report only:

- `garfield: pass` or `garfield: blocked`
- validation commands/results
- independent verification result, only if run or skipped for a non-obvious reason
- residual accepted or deferred `blocker`/`high`/`medium` concerns, if any
- deferred adjacent improvements or unclear behavior changes, if any
