# Garfield Codify Specification

## Intent

`garfield-codify` is a post-Garfield workflow for converting review knowledge into durable, deterministic checks. It analyzes accepted, deferred, repeated, and validation-related Garfield findings; determines which findings are mechanically detectable; maps them to existing repo tooling or best-in-class maintained tools; rejects noisy or judgment-heavy checks; and produces a prioritized codification plan.

## Scope

In scope:
- Garfield final handoffs and full Garfield transcripts
- accepted, deferred, repeated, rejected, or validation-related review findings
- current repo check discovery across manifests, configs, scripts, CI, and pre-commit
- mapping findings to linters, type checkers, formatters, schema checks, generated-artifact checks, dependency/dead-code tools, test rules, CI jobs, and pre-commit hooks
- mapping stable syntax-level findings to structural search rules such as ast-grep when standard linters do not cover the pattern cleanly
- recommending modern maintained defaults when no adequate repo standard exists
- identifying when existing tooling should be tightened instead of replaced
- recommending custom scripts only as a last resort for stable repo-specific invariants
- producing a ranked plan and smallest implementation slices

Out of scope:
- general code review
- running Garfield
- implementing check changes unless explicitly requested
- broad tooling migration unrelated to Garfield evidence
- security, dependency, or style audits that are not grounded in Garfield findings
- recommending checks for one-off, product-specific, subjective, or intentionally accepted tradeoffs

## Users And Trigger Context

- Primary users: agents and developers who just ran Garfield and want to prevent the same class of review concern from recurring.
- Common requests: "codify these Garfield findings", "what checks should we add from that review?", "turn Garfield output into lint/CI checks", "add a Garfield follow-up skill for deterministic checks".
- Should not trigger for: "review this PR", "run Garfield", "fix CI", "choose a linter for a fresh project" without Garfield or repeated review evidence.

## Runtime Contract

- Required first actions: gather Garfield findings, validation output, final diff context, repo instructions, manifests, existing tool configs, package scripts, CI, and pre-commit wiring.
- Required judgment: classify each finding by mechanical detectability, recurrence, impact, false-positive risk, available maintained tooling, repo fit, and rollout cost.
- Required output: a compact codification plan with existing tooling summary, ranked check candidates, rejected non-candidates, and first implementation slice.
- Non-negotiable constraints: discover existing tools first; prefer existing adequate tools; prefer maintained popular tools over custom checks; prefer generalized runners over one-off finding-specific commands; do not implement unless asked; state evidence gaps; avoid migration recommendations that are not tied to Garfield evidence.

## Tool Preference Model

Authoritative preference order:
1. Existing repo tool that already enforces or can cleanly enforce the pattern.
2. Existing repo tool plus a focused rule/config tightening.
3. Best-in-class maintained ecosystem tool when no adequate repo standard exists.
4. A narrow custom check only when the invariant is stable, valuable, and not well covered by maintained tools.
5. No deterministic check when the finding requires human judgment or would be noisy.

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
- the Garfield run being analyzed
- final diff and validation output from the implementation slice
- local repo instructions and policies
- existing manifests, configs, scripts, and CI/pre-commit wiring
- official tool documentation when adding or comparing tools

Useful improvement sources:
- repeated Garfield findings over time
- CI failures or reviewer comments that show recurring mechanical misses
- examples where a proposed check would or would not have caught the finding
- false-positive reports after a check is adopted
- rule fixtures for ast-grep or other structural-search checks, especially valid and invalid examples for policy-derived rules

Data that must not be stored:
- secrets
- customer data
- private repo URLs or identifiers not needed to reproduce the decision

## Reference Architecture

- `SKILL.md` contains runtime trigger, contract, discovery checklist, tool matrix, codifiability rubric, workflow, and output format.
- `SPEC.md` contains the maintenance contract and acceptance criteria.
- `SOURCES.md` contains provenance, decisions, gaps, and changelog entries.
- `references/` is flat. Add one directly linked reference per detailed tool or pattern family when examples would make `SKILL.md` too large.
- `references/ast-grep-codification.md` contains structural-search guidance and example rule shapes for comment-policy-style checks.
- `scripts/` is intentionally absent for v1; the skill plans checks and does not automate recurring parsing yet.

## Validation

Lightweight validation:
- run the structural validator on `skills/garfield-codify`
- manually inspect trigger wording, runtime compactness, no-implementation boundary, tool preference order, and output shape

Deeper validation:
- run the skill on a real Garfield transcript and check whether it identifies plausible deterministic checks without over-recommending custom scripts
- run it on an incomplete Garfield handoff and check whether it states evidence gaps instead of inventing certainty
- compare recommendations against actual repo tooling to ensure it prefers local standards before preferred defaults

Acceptance gates:
- valid frontmatter
- concise runtime body
- clear post-Garfield trigger and false-positive boundaries
- explicit existing-tool discovery
- modern default tool matrix
- flat references directory with directly linked references only
- ast-grep examples framed as tested rule shapes, not universal drop-in policy
- runner recommendations consolidate checks under existing `lint`/`check`/`test` commands or one aggregate tool command
- custom-check-last policy
- implementation only when explicitly requested
- no unsupported resource directories

## Known Limitations

- Tool quality changes over time; concrete install/config recommendations may need current official-doc verification.
- Garfield's default handoff is terse, so the skill works best when full findings or coordinator notes are available.
- "Best" tooling is context-sensitive; existing repo constraints can override the default matrix.
- Some high-value checks require baselining before they can fail CI without blocking unrelated work.

## Maintenance Notes

- Update `SKILL.md` when trigger boundaries, output format, codifiability categories, or default tool preferences change.
- Update `SOURCES.md` when adding provenance, external tool rationale, decisions, gaps, or changelog entries.
- Keep `references/` flat; split a reference only when a single file becomes too large to scan quickly, and link the new file directly from `SKILL.md`.
- Add scripts only after repeated use shows a stable parser or report-normalizer is being rewritten.
