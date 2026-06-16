---
name: garfield-codify
description: Use after a garfield run to analyze accepted, deferred, repeated, or validation-related findings and identify which should be codified into deterministic checks. Discover existing repo tooling first, then prefer best-in-class maintained tools such as Oxlint, ast-grep, Ruff, Knip, Clippy, golangci-lint, ShellCheck, actionlint, markdownlint-cli2, or yamllint over custom scripts. Do not use for general code review or implementation unless explicitly asked.
---

Analyze Garfield review results and produce a codification plan: which review findings should become deterministic checks, which tools should enforce them, where the checks should run, and which findings should stay human judgment.

## Contract

- Run only after a Garfield run, review-fix-verify loop, repeated review theme, or explicit request to codify review findings.
- Treat the source repository as the active repo being improved.
- Discover existing tooling before recommending new tooling.
- Prefer strengthening existing adequate tools over adding duplicate tools.
- Prefer well-maintained, popular, low-noise tools over custom scripts.
- Prefer existing generalized runners such as `lint`, `check`, or `test` over one-off commands. When a separate command is justified, prefer one aggregate tool runner such as `lint:ast-grep`, not finding-specific runners such as `lint:comments`.
- Recommend custom scripts only for stable repo-specific invariants that cannot be expressed by maintained tools.
- Do not implement checks, install dependencies, edit CI, or change configs unless the user explicitly asks for implementation.
- Do not re-review the original code slice except to understand whether a finding is mechanically detectable.
- Do not propose checks for one-off, judgment-heavy, product-requirement, or intentionally accepted tradeoff findings.
- If current tool capabilities, install commands, or migration paths matter and are not already present in the repo, verify them from official docs when possible and cite the source in the handoff.

## Inputs

Collect what is available:

- Garfield final status, accepted findings, deferred findings, rejected finding themes, validation output, and independent verification notes.
- The final diff or changed-file list from the Garfield run.
- Repo instructions, policies, manifests, lockfiles, package scripts, local check configs, and CI/pre-commit wiring.
- Any repeated user, reviewer, CI, or policy feedback that motivated codification.

If the Garfield transcript is incomplete, state the missing evidence and infer only from available artifacts.

## Tool Discovery

Inspect likely check surfaces before recommending tools:

- JavaScript/TypeScript: `package.json`, lockfiles, `eslint.config.*`, `.eslintrc*`, `oxlint.*`, `biome.json*`, `tsconfig*.json`, `knip.*`.
- Python: `pyproject.toml`, `ruff.toml`, `.ruff.toml`, `mypy.ini`, `.mypy.ini`, `pyrightconfig.json`, `uv.lock`, `requirements*.txt`.
- Rust: `Cargo.toml`, `Cargo.lock`, `rustfmt.toml`, clippy config or workspace settings.
- Go: `go.mod`, `go.sum`, `.golangci.*`, `Makefile`, `Taskfile*`.
- Shell/config/docs: `.shellcheckrc`, `.github/workflows/*`, `.markdownlint*`, `.yamllint*`, `.pre-commit-config.yaml`.
- Structural search: `sgconfig.yml`, `ast-grep.yml`, `ast-grep.*`, `rules/**/*.yml`, `rule-tests/**/*.yml`, and package scripts that call `ast-grep` or `sg`.
- Shared runners: `Makefile`, `justfile`, `Taskfile*`, `package.json` scripts, `pyproject.toml` scripts, CI configs, required status checks when visible.

Summarize existing tools as `keep`, `tighten`, `add`, `replace-consider`, or `avoid`.

## Tool Preference Matrix

Use these as defaults when the repo has no adequate established standard:

| Area | Preferred default | Use when |
| --- | --- | --- |
| JS/TS lint | `oxlint` | Dedicated JavaScript/TypeScript linting, especially correctness, CI speed, ESLint migration, and type-aware rules. Keep ESLint only for unsupported plugin behavior or existing deep integration. |
| Structural AST checks | `ast-grep` | Repo-specific syntax invariants, migration guards, banned patterns, required surrounding constructs, or policy checks that are easier as AST patterns than general lint rules. For comment/JSDoc policy examples, read `references/ast-grep-codification.md`. |
| JS/TS format/imports | existing formatter, otherwise `biome` | The repo needs an integrated formatter/checker and has no established Prettier/Biome/Oxfmt standard. |
| TS semantic checks | `tsc --noEmit` | TypeScript correctness, public contracts, strictness, unchecked access, unused locals, or build-independent type checking. |
| JS/TS dead code/deps | `knip` | Unused files, exports, dependencies, dev dependencies, or stale entrypoints. |
| Python lint/format | `ruff` | Python linting, import sorting, formatting, pyupgrade, common Flake8-plugin checks, or fast pre-commit/CI checks. |
| Python type check | existing checker, otherwise `ty` or `pyright` | Use `ty` for modern fast adoption; use Pyright when conservative ecosystem maturity or editor parity is more important. |
| Rust | `cargo fmt` and `cargo clippy` | Rust formatting, correctness, suspicious code, complexity, perf, and idiom checks. Enable strict Clippy groups case by case. |
| Go | `gofmt`, `go test`, and `golangci-lint` | Go formatting, tests, vet/staticcheck-style checks, and multi-linter CI. |
| Shell | `shellcheck` | Shell quoting, portability, run-script, and semantic shell errors. |
| GitHub Actions | `actionlint` | Workflow syntax, expressions, reusable workflows, action inputs/outputs, `run:` scripts, and workflow security checks. |
| Markdown | `markdownlint-cli2` | Markdown/CommonMark structure and style checks. |
| YAML | `yamllint` | YAML syntax, duplicate keys, indentation, truthy values, and formatting weirdness. |

Do not recommend a migration just because a preferred default exists. Recommend migration only when it would directly codify a Garfield finding, reduce duplicated tooling, improve signal, or materially lower CI/local runtime.

## Codifiability

Classify each finding:

- `must codify`: repeated or high-impact, mechanically detectable, low false-positive risk, and supported by a maintained tool.
- `should codify`: useful and detectable, but needs moderate config, rollout, or baseline work.
- `maybe codify`: detectable only with custom logic, noisy defaults, or incomplete evidence.
- `do not codify`: one-off, human judgment, product/design decision, repo policy ambiguity, or accepted tradeoff.

For each candidate, identify:

- root cause and stable signal
- preferred tool and exact rule/check family when known
- whether existing tooling can enforce it
- run location: editor/local, pre-commit, CI, release, generated-artifact check
- false-positive risk and expected maintenance cost
- smallest implementation slice

Use `ast-grep` only for stable syntax-level signals. Require rule tests or representative valid/invalid examples for subjective policy checks, especially comments, interfaces, naming, ownership, and boundary rules. Keep semantic quality judgments in Garfield when a rule cannot distinguish missing policy intent from acceptable local style.

## Workflow

1. Snapshot Garfield findings and validation evidence.
2. Inspect repo tooling and existing check commands.
3. Normalize findings into stable failure patterns.
4. Classify codifiability and reject noisy or judgment-heavy checks.
5. Map codifiable patterns to existing tools first, preferred defaults second, custom checks last.
6. Rank by impact, recurrence, false-positive risk, rollout cost, and how directly the check would have caught the Garfield finding.
7. Produce a plan, not edits, unless the user asked for implementation.

## Output

Report only:

- `garfield-codify: plan` or `garfield-codify: blocked`
- Evidence gaps, if any
- Existing tooling summary: `keep`, `tighten`, `add`, `replace-consider`, `avoid`
- `must codify`, `should codify`, `maybe codify`, and `do not codify` sections
- For each proposed check: finding, tool/check, why this tool, where it runs, false-positive risk, rollout notes, and smallest implementation slice
- First recommended implementation slice
- Official-doc links for newly recommended tools when consulted

Use this compact row format for proposed checks:

```text
- <finding-pattern> -> <tool/check> [<run-location>]
  why: <repo-fit and tool rationale>
  risk: <low|medium|high false-positive risk>
  slice: <smallest implementation step>
```
