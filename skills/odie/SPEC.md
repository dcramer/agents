# Odie Specification

## Intent

`odie` is an evidence-led workflow for converting recurring failure knowledge into durable, deterministic checks. It analyzes transcript, commit, Sentry, GitHub, CI, review, and Garfield history; determines which patterns have hard mechanical signals; maps them to existing repo tooling or best-in-class maintained tools; rejects noisy or judgment-heavy checks; and produces a prioritized hard-rule plan.

## Scope

In scope:
- agent transcripts, review summaries, and validation logs
- commit-history clusters, fix chains, follow-up commits, and reverts
- Sentry issues, regressions, stack traces, tags, ownership signals, and fix links
- GitHub issues, PR comments, review threads, labels, CI failures, and task lists
- Garfield final handoffs and full Garfield transcripts
- accepted, deferred, repeated, rejected, or validation-related review findings when present
- current repo check discovery across manifests, configs, scripts, CI, and pre-commit
- mapping findings to linters, type checkers, formatters, schema checks, generated-artifact checks, dependency/dead-code tools, deterministic test assertions, CI jobs, and pre-commit hooks
- mapping stable syntax-level findings to structural search rules such as ast-grep when standard linters do not cover the pattern cleanly
- recommending modern maintained defaults when no adequate repo standard exists
- identifying when existing tooling should be tightened instead of replaced
- recommending custom scripts only as a last resort for stable repo-specific invariants
- producing a ranked plan and smallest implementation slices

Out of scope:
- general code review
- running Garfield
- broad transcript mining unrelated to a codification request
- Sentry triage or incident response beyond extracting recurring check candidates
- implementing check changes unless explicitly requested
- broad tooling migration unrelated to evidenced patterns
- security, dependency, or style audits that are not grounded in recurring evidence
- recommending checks for one-off, product-specific, subjective, or intentionally accepted tradeoffs

## Users And Trigger Context

- Primary users: agents and developers who have evidence that the same class of issue is recurring and want to prevent it with deterministic checks.
- Common requests: "what can we learn from these transcripts?", "codify this recurring issue", "which checks would have prevented these fix commits?", "turn Sentry/GitHub history into lint or CI checks", "what checks should we add so Garfield does not catch this again?"
- Should not trigger for: "review this PR", "run Garfield", "fix CI", "choose a linter for a fresh project" without recurrence or failure evidence.

## Runtime Contract

- Required first actions: gather the provided evidence source, identify the target repo, cluster recurring patterns, cross-check with other available history, then inspect repo instructions, manifests, existing tool configs, package scripts, CI, and pre-commit wiring.
- Required judgment: classify each pattern by exact signal, enforceability, source confidence, recurrence, impact, false-positive risk, available maintained tooling, repo fit, and rollout cost, then run a secondary verification pass to remove candidates that still require true human judgment.
- Required output: a compact hard-rule plan with existing tooling summary, ranked enforceable rules, rejected judgment calls, and first implementation slice.
- Non-negotiable constraints: discover existing tools first; prefer existing adequate tools; prefer maintained popular tools and rule frameworks over custom checks; prefer generalized runners over one-off finding-specific commands; require explicit framework-fit proof before recommending a custom script; do not implement unless asked; state evidence gaps; avoid migration recommendations that are not tied to concrete evidence.

## Tool Preference Model

Authoritative preference order:
1. Existing repo tool that already enforces or can cleanly enforce the pattern.
2. Existing repo tool plus a focused rule/config tightening.
3. Best-in-class maintained ecosystem tool when no adequate repo standard exists.
4. Maintained rule framework for repo-specific syntax, config, schema, generated-artifact, or request-shape invariants.
5. A narrow custom check only when the invariant is stable, valuable, and not cleanly covered by existing tools, maintained tools, structural-search rules, schema checks, diff checks, or deterministic tests.
6. No deterministic check when the finding requires human judgment or would be noisy.

Required hard-rule proof:
- exact code/config/command/schema/artifact/test-observable signal
- exact enforcement surface
- framework-fit proof before any custom script recommendation
- scope and allowlist shape
- invalid and valid examples
- non-interactive runner
- false-positive risk and rollout plan

Default best-in-class candidates:
- JavaScript/TypeScript lint: Oxlint
- Structural AST checks: ast-grep for repo-specific syntax invariants, required context, migration guards, and carefully tested policy-presence checks
- JavaScript/TypeScript integrated format/check: Biome when no formatter/checker standard exists
- TypeScript semantic checks: `tsc --noEmit`
- JavaScript/TypeScript unused files/exports/dependencies: Knip
- Python lint/format: Ruff
- Python type checking: existing checker, otherwise ty or Pyright based on repo risk tolerance
- Rust: `cargo fmt` and `cargo clippy`
- Go: `gofmt`, `go test`, and golangci-lint
- Shell: ShellCheck
- GitHub Actions: actionlint
- Markdown: markdownlint-cli2
- YAML: yamllint

## Source And Evidence Model

Authoritative sources:
- the user-provided evidence target, such as an issue, PR, Sentry group, transcript path, or commit range
- transcript findings and validation output from the implementation slice
- commit history showing fix clusters, follow-up fixes, reverts, or repeated drift
- Sentry/GitHub/CI evidence that connects runtime or workflow failures to code patterns
- Garfield runs when available
- local repo instructions and policies
- existing manifests, configs, scripts, and CI/pre-commit wiring
- official tool documentation when adding or comparing tools

Useful improvement sources:
- repeated Garfield findings over time
- CI failures or reviewer comments that show recurring mechanical misses
- transcript/commit-history methods that produce cross-checked clusters
- examples where a proposed check would or would not have caught the finding
- false-positive reports after a check is adopted
- rule fixtures for ast-grep or other structural-search checks, especially valid and invalid examples for policy-derived rules

Data that must not be stored:
- secrets
- customer data
- private repo URLs or identifiers not needed to reproduce the decision

## Reference Architecture

- `SKILL.md` contains runtime trigger, contract, discovery checklist, tool defaults, hard-rule gate, workflow, and output format.
- `SPEC.md` contains the maintenance contract and acceptance criteria.
- `SOURCES.md` contains provenance, decisions, gaps, and changelog entries.
- `references/` is flat. Add one directly linked reference per detailed tool or pattern family when examples would make `SKILL.md` too large.
- `references/ast-grep-codification.md` contains structural-search guidance and example rule shapes for AST-enforceable checks.
- `scripts/` is intentionally absent for v1; the skill plans checks and does not automate recurring parsing yet.

## Validation

Lightweight validation:
- run the structural validator on `skills/odie` when available
- manually inspect trigger wording, runtime compactness, evidence model, no-implementation boundary, tool preference order, and output shape

Deeper validation:
- run the skill on a real transcript/commit-history issue and check whether it identifies plausible deterministic checks without over-recommending custom scripts
- run it on an incomplete GitHub/Sentry/Garfield handoff and check whether it states evidence gaps instead of inventing certainty
- compare recommendations against actual repo tooling to ensure it prefers local standards before preferred defaults

Acceptance gates:
- valid frontmatter
- concise runtime body
- clear recurrence/history trigger and false-positive boundaries
- explicit evidence-source clustering and confidence handling
- explicit hard-rule proof for every recommended check
- explicit secondary judgment verification that removes judgment-based candidates before final output
- explicit existing-tool discovery
- modern default tool choices
- flat references directory with directly linked references only
- ast-grep examples framed as tested rule shapes, not universal drop-in policy
- runner recommendations consolidate checks under existing `lint`/`check`/`test` commands or one aggregate tool command
- custom-check-last policy with explicit framework-fit proof
- implementation only when explicitly requested
- no unsupported resource directories

## Known Limitations

- Tool quality changes over time; concrete install/config recommendations may need current official-doc verification.
- Transcript and commit-history analysis can overcount repeated symptoms; the skill works best when clusters are spot-checked against concrete examples.
- Sentry evidence may prove impact without proving a static check is possible.
- "Best" tooling is context-sensitive; existing repo constraints can override the default tool choices.
- Some high-value checks require baselining before they can fail CI without blocking unrelated work.
- Some important recurring issues should remain human review, eval, or integration-test guidance because a deterministic check would overmatch.

## Maintenance Notes

- Update `SKILL.md` when trigger boundaries, output format, codifiability categories, or default tool preferences change.
- Update `SOURCES.md` when adding provenance, external tool rationale, decisions, gaps, or changelog entries.
- Keep `references/` flat; split a reference only when a single file becomes too large to scan quickly, and link the new file directly from `SKILL.md`.
- Add scripts only after repeated use shows a stable parser or report-normalizer is being rewritten.
