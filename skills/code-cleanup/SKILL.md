---
name: code-cleanup
description: Use when reviewing branch changes for code cleanup, simplification, reliability, repo policy compliance, or pre-merge hardening; performs an adversarial review that reduces layers, removes unnecessary complexity, preserves intent, and surfaces actionable verification gaps.
---

# Code Cleanup

Perform an adversarial branch review focused on fewer moving parts, stronger reliability, and maintained repo policy. Default to review-only unless the user explicitly asks you to edit code.

## Workflow

1. Establish the review target.
   - Inspect branch status, changed files, and the likely base branch.
   - If the base branch is ambiguous and materially affects the review, ask one direct question.
   - Read repo instructions, nearby tests, and ownership or style conventions before judging the diff.
2. Preserve intent.
   - Infer the change's stated goal from the diff, commits, issue text, or user context.
   - Treat behavior-preserving simplification as valid; treat behavior-changing cleanup as a risk unless explicitly requested.
3. Review adversarially.
   - Look first for code that can be deleted, collapsed, or moved to an existing local abstraction.
   - Challenge new layers, flags, adapters, wrappers, caches, retries, async boundaries, and configuration.
   - Check reliability risks: error paths, partial failures, idempotency, ordering, concurrency, resource cleanup, security boundaries, and observability.
   - Check repo-wide policy drift: formatting, typing, tests, generated artifacts, dependency changes, public API compatibility, and documented conventions.
4. Verify.
   - Run targeted tests, type checks, linters, or build commands when practical.
   - Prefer the smallest command set that proves the changed behavior and repo policy.
   - If verification cannot run, state the command and the concrete blocker.
5. Report findings.
   - Lead with findings ordered by severity.
   - Ground each finding in a changed file and line.
   - Separate defects from cleanup opportunities and style preferences.
   - Include the smallest actionable fix that maintains the original intent.

## Review Rubric

| Area | Questions |
| --- | --- |
| Layers | Can a wrapper, helper, adapter, state object, option, or branch disappear? |
| Complexity | Did the change introduce abstraction before a second real use exists? |
| Reliability | What breaks under retries, partial failure, concurrent calls, stale data, or missing permissions? |
| Policy | Do tests, types, formatting, generated files, dependency rules, and repo instructions still hold? |
| Intent | Does the simpler path preserve the behavior the branch is trying to ship? |

## Output

Use this structure unless the user asks for a different format:

```markdown
Findings
- [severity] path:line - Issue, impact, and smallest intent-preserving fix.

Verification
- Command run: result.
- Not run: command and blocker.

Cleanup Opportunities
- path:line - Optional simplification with expected tradeoff.
```

If there are no high-confidence findings, say so directly, then list any residual verification gaps.
