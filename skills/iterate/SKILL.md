---
name: iterate
description: Use while implementing code changes, after a meaningful slice, to coordinate mandatory subagent review/fix/verify loops with evidence-labeled findings and optional independent verification. Do not use for standalone reviews, brainstorming, or non-code iteration.
---

After each meaningful implementation slice, coordinate subagent review, validate accepted findings, fix what is valid, and repeat until the slice is ready.

## Contract

- Scope review to the current diff and directly related files.
- Preserve unrelated user changes. Do not revert unrelated dirty-worktree files.
- Use a no-edit subagent for every review task. If subagents are unavailable, stop and report that `iterate` cannot run as specified.
- Enumerate review tasks before spawning subagents.
- Spawn one subagent for each review task listed in the loop.
- Spawn one additional subagent per bundled review policy.
- Act as coordinator: judge subagent findings for validity, reject weak findings, decide accepted/deferred findings, and implement accepted fixes.
- Fix accepted `blocker`, `high`, and local intent-preserving `medium` concerns.
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
- `high`: fix unless impossible without changing intent.
- `medium`: fix when local and intent-preserving.
- `low`: optional; do not repeat solely for this.

Evidence labels:
- `direct`: changed code proves the concern.
- `spec`: request/spec/contract mismatch.
- `policy`: bundled policy reference or repo instruction mismatch.
- `test`: missing, weak, stale, or incorrect test/fixture/snapshot evidence.
- `validation`: command output, skipped command, or missing check.
- `missing`: expected docs, generated artifact, schema, migration, lockfile, or manifest change is absent.
- `inferred`: plausible risk from control flow; never use as `blocker` without another evidence label.

Use changed-code `path:line` when available. For missing artifacts or validation gaps, the locator may be a command, test name, policy/spec path, artifact path, or manifest/lockfile path.

## Loop

1. Snapshot intent, diff/base, changed files, repo instructions, relevant specs/docs, generated/lockfile/dependency changes, validation commands, and intentional tradeoffs.
2. Enumerate review tasks:
   - behavior/spec review: request/spec behavior, edge paths, failure paths, and user-visible contracts
   - specs/docs review: required specs, README, changelog, API docs, or generated docs changed with behavior
   - repo instructions review: repo instructions and local conventions are followed
   - dead code review: obsolete branches, unused helpers, compatibility leftovers, and deleted/replaced paths are cleaned up
   - delayering review: unnecessary wrappers, flags, adapters, broad abstractions, indirection, and ownership leaks are removed
   - type-boundary review: types, casts, nullable boundaries, `any`/`unknown`, and public/internal contracts are strong
   - tests/fixtures review: tests, fixtures, snapshots, and coverage match changed behavior
   - generated/dependency review: generated artifacts, schemas, migrations, lockfiles, package manifests, and dependency additions are necessary and consistent
   - validation review: available checks match the touched files and behavior
   - code-comments policy review: `references/code-comments.md`
   - interface-design policy review: `references/interface-design.md`
3. Spawn one no-edit subagent per review task. Give policy subagents only the relevant bundled policy reference plus the slice context.
4. Coordinate findings: accept valid material concerns, reject invalid concerns with evidence, defer only with a concrete blocker.
5. Fix accepted concerns that preserve intent.
6. Run the smallest relevant tests, type checks, linters, builds, schema checks, or generated-artifact checks.
7. Ask a separate subagent verification advisor only when it adds signal.
8. Repeat after material edits.

Stop when no `blocker`/`high`/`medium` concerns remain and targeted validation passes or has explicit blockers. Stop and report residuals if the same concern repeats twice, 3 cycles pass without new material progress, or fixing requires clarification, broad redesign, risky unrelated edits, or changed user intent.

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
Validation: <commands and results or not run>
Intentional tradeoffs: <notes or none>

Output:
- [severity][evidence:<label[,label]> <locator>] path:line - concern. impact: <impact>. fix: <smallest change>.

If no material concerns: none
```

## Policy Review Agent Prompt

```markdown
Review this implementation slice against exactly one bundled policy. Review only. Do not edit. Return findings only.

Policy reference: <references/code-comments.md or references/interface-design.md>
Policy text:
<policy text>

User goal: <request>
Intent: <goal>
Diff/base: <base or comparison>
Changed files: <paths>
Repo instructions checked: <paths>
Intentional tradeoffs: <notes or none>

Output:
- [severity][evidence:policy <policy-reference>] path:line - concern. impact: <impact>. fix: <smallest change>.

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
- validation commands match changed behavior and touched files
- required test/type/lint/build/schema/generated/doc/dependency checks ran or have explicit blockers
- deferred concerns have concrete evidence and a valid reason

Output:
- [severity][evidence:validation <command-or-missing-check>] <slice-or-path> - concern. impact: <impact>. fix: <smallest verification step>.

If sufficient: verified
```

## Handoff

Report only:

- `iterate: pass` or `iterate: blocked`
- validation commands/results
- independent verification result, only if run or skipped for a non-obvious reason
- residual accepted or deferred `blocker`/`high`/`medium` concerns, if any
