---
name: odie
description: Use when transcript, commit, Sentry, GitHub, CI, review, or Garfield history suggests recurring failure patterns that might become hard deterministic checks. Analyze the evidence, reject judgment-based ideas, and output only mechanically enforceable lint, schema, CI, workflow, or deterministic test rules. Do not use for general code review, broad tool selection, or implementation unless explicitly asked.
disable-model-invocation: true
---

Analyze recurring failure evidence and produce a hard-rule plan: which patterns can be enforced mechanically, which existing tools should enforce them, where the checks should run, and which patterns must remain human judgment.

## Contract

- Run when there is recurring or high-signal evidence from transcripts, commit history, Sentry issues, GitHub issues or PRs, CI failures, reviewer feedback, Garfield findings, or an explicit request to codify a repeated failure pattern.
- Treat the source repository as the active repo being improved.
- Prefer evidence that is cross-checked across at least two sources, such as transcript findings plus bugfix commits, or Sentry events plus follow-up PRs.
- Discover existing tooling before recommending new tooling.
- Recommend only hard, mechanically enforceable rules with a clear pass/fail signal.
- Prefer strengthening existing adequate tools over adding duplicate tools; prefer repo-standard or maintained rule frameworks over one-off scripts.
- Prefer existing generalized runners such as `lint`, `check`, or `test`. If a separate command is justified, use one aggregate tool runner such as `lint:ast-grep`, not finding-specific runners such as `lint:comments`.
- Before recommending a custom script, first try to express the exact signal with an existing repo tool, maintained linter rule, structural-search rule, schema check, generated-artifact diff check, or deterministic test helper.
- Recommend custom scripts only for stable repo-specific invariants that cannot be expressed by those frameworks without overmatching and have small valid/invalid fixtures.
- Do not implement checks, install dependencies, edit CI, or change configs unless the user explicitly asks for implementation.
- Do not propose checks for one-off, judgment-heavy, product-requirement, or intentionally accepted tradeoff findings.
- Run a secondary verification pass before final output to remove candidates that still require true human judgment.
- If current tool capabilities, install commands, or migration paths matter and are not already present in the repo, verify them from official docs when possible and cite the source in the handoff.

## Inputs

Collect what is available:

- User-provided issue, PR, Sentry, transcript, commit, CI, or review links and summaries.
- Relevant transcript excerpts, local session logs, agent review summaries, Garfield handoffs, and validation output.
- Commit-history clusters, bugfix chains, revert or follow-up commits, and blame around repeated corrections.
- Sentry issue groups, stack traces, tags, fingerprints, affected modules, regressions, and fix commits.
- GitHub issues, PR comments, requested changes, review threads, labels, linked commits, and CI failures.
- Repo instructions, policies, manifests, lockfiles, package scripts, local check configs, and CI/pre-commit wiring.

If history is incomplete, state the missing evidence and infer only from available artifacts. Do not treat a single anecdote as recurrence unless impact is high and the signal is mechanically clear.

## Evidence Model

| Evidence | Use it for | Guardrail |
| --- | --- | --- |
| Transcripts and agent reviews | Repeated review misses, command drift, ignored policies, validation gaps | Filter to repo-relevant sessions and finding-like messages; spot-check excerpts before counting clusters. |
| Commit history | Fix clusters, repeated bug classes, churn around boundaries or workflows | Separate feature work from fix/revert/follow-up commits before ranking. |
| Sentry | Runtime failures, regression signatures, affected paths, impact | Connect events to code ownership and fix history before recommending static checks. |
| GitHub issues/PRs | Human-confirmed tasks, review threads, labels, CI state, implementation notes | Distinguish task lists from verified recurrence; preserve unresolved evidence gaps. |
| CI and local validation | Failing commands, missing runners, brittle workflow mistakes | Prefer fixing or wiring existing generalized checks before adding new commands. |
| Garfield | Accepted/deferred findings, verification notes, repeated review themes | Use as one evidence source, not a required precondition. |

## Hard-Rule Gate

Recommend a candidate only if all gates pass:

| Gate | Required proof |
| --- | --- |
| Exact signal | A concrete code, config, command, schema, artifact, or test-observable pattern that can be detected without understanding intent. |
| Exact enforcement | A named existing tool/rule, maintained tool, narrow custom script, or deterministic test with a non-interactive pass/fail result. |
| Framework fit | Custom scripts include proof that existing repo tools and maintained rule frameworks cannot express the signal cleanly. |
| Scope | File globs, package boundaries, generated-file exclusions, and allowlist shape are known or small enough to define. |
| Exceptions | Common valid cases are rare or can be allowlisted with a clear policy. |
| Examples | At least one invalid example that should fail and one valid example that should pass are available or easy to derive. |
| Runner | The check can fit an existing generalized runner such as `lint`, `check`, `test`, docs check, or CI job. |

Reject or defer candidates that fail any gate. Do not recommend "good design", "better comments", "clear naming", "proper abstraction", "reasonable fallback", "correct product behavior", or "appropriate UX" as deterministic checks unless there is a stable mechanical signal independent of judgment.

## Tool Selection

Inspect existing check surfaces first: manifests, lockfiles, package scripts, `Makefile`/`justfile`/`Taskfile*`, CI configs, pre-commit, lint/type/test configs, structural-search configs, docs checks, generated-artifact checks, and required status checks.

Use this preference order:

1. Existing repo check or config tightening.
2. Existing repo tool plus a focused rule.
3. Maintained ecosystem tool when no adequate repo standard exists.
4. Maintained rule framework for repo-specific syntax, config, schema, generated-artifact, or request-shape invariants.
5. Narrow custom script only for stable repo-specific invariants that no framework can express cleanly.
6. No deterministic check.

Common defaults when the repo has no adequate standard: Oxlint or existing ESLint for JS/TS lint, ast-grep for stable AST invariants, `tsc --noEmit` for TS semantics, Knip for JS/TS dead code and deps, Ruff for Python, `cargo clippy` for Rust, golangci-lint for Go, ShellCheck for shell, actionlint for GitHub Actions, markdownlint-cli2 for Markdown, and yamllint for YAML. For ast-grep policy examples, read `references/ast-grep-codification.md`.

Use framework-style checks for concrete syntax and artifact signals. Banned calls, imports, API shapes, required wrappers, migration guards, config schemas, and generated-file drift should normally be lint, ast-grep, schema, snapshot, or diff checks rather than one-off scripts. A custom script is appropriate only when the signal requires cross-artifact joins, call-graph/data-flow reasoning, custom parsing not covered by maintained tools, or repo-specific normalization that is already stable.

Do not recommend a migration just because a preferred default exists. Recommend migration only when it would directly codify an evidenced pattern, reduce duplicated tooling, improve signal, or materially lower CI/local runtime.

## Judgment Verification Pass

Before finalizing, make a second pass over every candidate and remove it from the hard-rule list when any of these are true:

- The check would need to understand whether a design, abstraction, naming, comment, UX, or product decision is "good".
- The evidence proves humans disliked an outcome but does not expose a stable code, config, command, schema, or artifact signal.
- The proposed rule would mostly encode taste, broad style, or local reviewer preference.
- Valid exceptions are common and cannot be allowlisted with a small, understandable policy.
- The rule would catch the example only by overmatching unrelated code.
- The candidate uses a custom script where a maintained rule framework can express the same signal with clearer fixtures and lower maintenance cost.
- The smallest safe implementation is actually human review guidance, not a deterministic check.

Record removed candidates under `rejected judgment calls`. If a rejected pattern is still important, name the right non-rule home: human review guidance, eval coverage, integration coverage, documentation process, or incident follow-up.

## Workflow

1. Resolve the evidence sources and target repo. If a link or issue is provided, inspect it before planning.
2. Snapshot evidence into clusters: recurring symptom, affected modules, observed fix, source count, and confidence.
3. Cross-check clusters against other available history.
4. Convert clusters into candidate rules with exact signals.
5. Apply the hard-rule gate. Reject candidates that lack deterministic proof.
6. Inspect existing tooling and choose the smallest enforcement surface for surviving rules.
7. Run the judgment verification pass and remove candidates that require true human judgment.
8. Rank surviving hard rules by impact, recurrence, false-positive risk, rollout cost, and how directly the check would have caught the evidenced pattern.
9. Produce a plan, not edits, unless the user asked for implementation.

## Output

Report only:

- `odie: plan` or `odie: blocked`
- Evidence gaps, if any
- Evidence clusters inspected, with source count and confidence
- Existing tooling summary: `reuse`, `tighten`, `add`, or `avoid`
- Hard rules to add
- Rejected judgment calls
- Custom-script justification, only if any custom script remains after framework-fit checks
- First recommended implementation slice
- Official-doc links for newly recommended tools when consulted

Use this compact row format for each hard rule:

```text
- <failure-pattern> -> <tool/check> [<runner>]
  signal: <exact code/config/command/schema/artifact/test-observable signal>
  examples: invalid=<what fails>; valid=<what must pass>
  why: <evidence link, repo-fit rationale, and for custom scripts why maintained rule frameworks do not fit>
  risk: <low|medium|high false-positive risk>
  slice: <smallest implementation step>
```
