# Garfield Codify Sources

## Source Inventory

| Source | Trust | Contribution | Usage |
| --- | --- | --- | --- |
| User request in this thread | High | Requested a Garfield-related skill that analyzes Garfield results and identifies findings that can become deterministic checks. | Defines the skill intent, post-Garfield trigger, and codification focus. |
| User naming guidance | High | Preferred a name like `garfield-codify`. | Set the skill name and trigger language. |
| User tool-selection guidance | High | Requested discovering existing repo tooling but otherwise finding the best linters, with Oxlint as an example. | Added existing-tool discovery and best-in-class default matrix. |
| User ast-grep codification request | High | Asked whether ast-grep examples can help codify Garfield policies such as comment requirements and then requested implementation as a first pass. | Added ast-grep to tool discovery/defaults and created a flat reference with rule-shape guidance. |
| User skill-structure guidance | High | Requested thinking through skill structure and keeping `references/` flat. | Kept ast-grep material in one directly linked flat reference file and updated the maintenance contract. |
| User runner guidance | High | Preferred generalized runners over a different runner for every policy check. | Added guidance to wire ast-grep into existing `lint`/`check` or one aggregate `lint:ast-grep`, not finding-specific scripts. |
| Local `AGENTS.md` | High | Defines skill repo shape, concise docs, no deployment config, and validation reporting. | Drove `SKILL.md`, `SPEC.md`, `SOURCES.md`, and validation plan. |
| Local `skills/garfield/` | High | Provides the upstream workflow, finding vocabulary, validation context, and package shape. | Used as the companion-skill model and post-run evidence source. |
| Local `README.md` | High | Defines repo skill inventory and install examples. | Updated root skill list and install snippets. |
| System `skill-creator` skill | High | Provides skill creation process, frontmatter, initializer, validation, and resource guidance. | Used to initialize the skill and decide against v1 scripts/references/assets. |
| Oxlint official docs | High | Positions Oxlint as a high-performance JS/TS linter with ESLint migration support, type-aware linting, multi-file analysis, and broad rule/plugin coverage. | Set Oxlint as the preferred JS/TS lint default when no adequate repo standard exists. |
| Biome official docs | High | Documents integrated formatting, linting, organizing imports, and check workflows. | Set Biome as an integrated formatter/check candidate when no repo standard exists. |
| TypeScript compiler docs | High | Defines `--noEmit` and strictness-related type-checking options. | Set `tsc --noEmit` as the TS semantic-check baseline. |
| Knip official docs | High | Documents unused dependency, export, and file detection for JS/TS projects with framework/tool plugins. | Set Knip as the preferred JS/TS dead-code/dependency candidate. |
| Ruff official docs | High | Documents Ruff as a fast Python linter and formatter with broad rule coverage and replacements for common Python tools. | Set Ruff as the preferred Python lint/format default. |
| ty official docs | High | Documents ty as a fast Python type checker and language server. | Added ty as the modern Python type-check candidate when no existing checker is established. |
| Clippy official docs | High | Documents Rust lint categories and default behavior. | Set `cargo clippy` as the Rust lint default and warned against enabling strict groups wholesale. |
| golangci-lint official docs | High | Documents a fast Go linters runner with caching, IDE integration, and many linters. | Set golangci-lint as the Go multi-linter default. |
| ShellCheck official site | High | Documents ShellCheck as a shell script bug finder. | Set ShellCheck as the shell-script default. |
| actionlint README | High | Documents GitHub Actions workflow syntax, expression, action usage, reusable workflow, shellcheck, and security checks. | Set actionlint as the GitHub Actions default. |
| markdownlint-cli2 README | High | Documents a fast, configuration-based Markdown/CommonMark lint CLI. | Set markdownlint-cli2 as the Markdown default. |
| yamllint docs | High | Documents YAML syntax, duplicate-key, and style checks. | Set yamllint as the YAML default. |
| ast-grep official rule docs | High | Documents YAML rule objects, pattern/kind/regex matching, relational rules, project config, lint fields, `files`/`ignores`, and rule tests. | Added ast-grep as the preferred structural AST check option and shaped the example reference. |
| ast-grep CLI 0.43.0 smoke test | High | Verified the example exported-function, exported-interface, and private-policy-function rule shapes with valid/invalid fixtures. | Documented the tested version and kept target-repo fixture validation as a rollout requirement. |

## Adaptation Notes

| Decision | Result |
| --- | --- |
| Companion skill | Created `garfield-codify` instead of a generic `codify-checks` name so the Garfield relationship is explicit. |
| Runtime role | The skill plans deterministic checks; it does not implement them unless the user explicitly asks. |
| Evidence boundary | Garfield findings are the primary evidence; the final diff and repo tooling are supporting evidence. |
| Tooling order | Existing adequate repo tools beat preferred defaults; preferred defaults beat custom scripts. |
| Best linter policy | "Best" means high-signal, maintained, popular, repo-fit, low-noise, and able to catch the specific Garfield pattern. |
| JS/TS default | Oxlint is the default dedicated JS/TS linter candidate when no adequate repo standard exists. |
| Structural-search default | ast-grep is the default candidate for repo-specific AST invariants when existing linters cannot express the Garfield finding cleanly. |
| Flat references | Keep `references/` one level deep and directly linked from `SKILL.md`; add examples to a single topic file until it becomes too large to scan quickly. |
| Runner consolidation | Prefer adding checks to existing generalized runners; use at most one aggregate per-tool runner when the repo has split lint commands. |
| Python default | Ruff is the default Python lint/format candidate. |
| No v1 scripts | The work is judgment-heavy and repo-specific; no stable parsing helper is justified yet. |
| First reference | Added `references/ast-grep-codification.md` because concrete rule shapes would bloat runtime guidance and should be loaded only when structural-search checks are relevant. |
| Custom checks | Custom checks are last-resort recommendations for stable repo-specific invariants. |

## Coverage Matrix

| Dimension | Covered By | Status |
| --- | --- | --- |
| Post-Garfield trigger | Frontmatter and contract | covered |
| Existing-tool discovery | Tool Discovery section | covered |
| Best default tool choices | Tool Preference Matrix | covered |
| Structural AST checks | Tool Preference Matrix and `references/ast-grep-codification.md` | covered |
| Runner consolidation | Contract, `SPEC.md`, and `references/ast-grep-codification.md` | covered |
| Codifiability judgment | Codifiability section | covered |
| Custom-check-last policy | Contract, matrix, and workflow | covered |
| Non-implementation boundary | Contract and workflow | covered |
| Output format | Output section | covered |
| Maintenance contract | `SPEC.md` | covered |
| Validation | `SPEC.md` and structural validator | covered |

## Description Optimization

Should trigger:
- "run garfield-codify on the Garfield results"
- "which Garfield findings should become deterministic checks?"
- "turn those review findings into lint or CI checks"
- "what checks should we add so Garfield does not catch this again?"
- "codify repeated Garfield concerns with best linters"

Should not trigger:
- "run Garfield"
- "review this PR"
- "fix CI"
- "choose a linter for this new app"
- "implement the checks now" unless paired with an explicit post-Garfield codification plan

Final description:

> Use after a garfield run to analyze accepted, deferred, repeated, or validation-related findings and identify which should be codified into deterministic checks. Discover existing repo tooling first, then prefer best-in-class maintained tools such as Oxlint, Ruff, Knip, Clippy, golangci-lint, ShellCheck, actionlint, markdownlint-cli2, or yamllint over custom scripts. Do not use for general code review or implementation unless explicitly asked.

## Gaps

- No real Garfield transcript has been used to forward-test the skill yet.
- Garfield does not currently emit a structured codification-candidate handoff by default.
- The tool matrix will need periodic review as ecosystem defaults change.
- Python type-checker choice is intentionally contextual because ty is modern and fast while Pyright may be the conservative choice for some repos.
- No automated semantic validator exists for whether recommendations would have caught a finding with acceptable false positives.
- ast-grep comment/JSDoc examples were smoke-tested against ast-grep 0.43.0, but remain unverified against real target repos; agents must confirm parser node kinds and add target-repo rule tests before CI gating.

## Changelog

- 2026-06-16: Created `garfield-codify` with post-Garfield codification workflow, existing-tool discovery, best-in-class default tool matrix, and custom-check-last policy.
- 2026-06-16: Added ast-grep structural-check guidance, a flat ast-grep codification reference, runner consolidation guidance, and skill-structure notes for flat references.
