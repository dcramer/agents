# Odie Sources

## Source Inventory

| Source | Trust | Contribution | Usage |
| --- | --- | --- | --- |
| User request in this thread | High | Requested renaming `garfield-codify` to `odie` and changing course because the post-Garfield trigger was not working. | Defines the new name, broader trigger model, and material refactor direction. |
| GitHub issue `getsentry/junior#622` | High | Shows a successful codification task driven by Codex transcript review plus commit-history analysis, not a Garfield run. It clusters repeated command drift, schema drift, metadata drift, runtime boundary mistakes, config docs drift, auth/egress signal handling, SQL/conversation invariants, and behavior-vs-static-lint boundaries. | Added transcript, commit, GitHub, CI, and cross-source clustering as first-class evidence. Changed the skill from post-Garfield to evidence-led codification. |
| User tool-selection guidance | High | Requested discovering existing repo tooling but otherwise finding the best linters, with Oxlint as an example. | Added existing-tool discovery and best-in-class default tool choices. |
| User ast-grep codification request | High | Asked whether ast-grep examples can help codify Garfield policies such as comment requirements and then requested implementation as a first pass. | Added ast-grep to tool discovery/defaults and created a flat reference with rule-shape guidance. |
| User skill-structure guidance | High | Requested thinking through skill structure and keeping `references/` flat. | Kept ast-grep material in one directly linked flat reference file and updated the maintenance contract. |
| User runner guidance | High | Preferred generalized runners over a different runner for every policy check. | Added guidance to wire ast-grep into existing `lint`/`check` or one aggregate `lint:ast-grep`, not finding-specific scripts. |
| User stdout/ast-grep correction example | High | Showed Odie recommending a one-off stdout guard script for a concrete `console.log`/`console.info`/`console.debug` syntax pattern that should have been an ast-grep-style rule candidate. | Tightened runtime and contract language so custom scripts require explicit framework-fit proof and syntax/artifact signals default to maintained rule frameworks. |
| Local `AGENTS.md` | High | Defines skill repo shape, concise docs, no deployment config, and validation reporting. | Drove `SKILL.md`, `SPEC.md`, `SOURCES.md`, and validation plan. |
| Local `skills/garfield/` | High | Provides the upstream workflow, finding vocabulary, validation context, and package shape. | Used as the companion-skill model and post-run evidence source. |
| Local `README.md` | High | Defines repo skill inventory and install examples. | Updated root skill list and install snippets. |
| System `skill-writer` skill | High | Provides skill update process, source capture, precision passes, description optimization, and validation. | Used to refactor the skill and decide against v1 scripts/references/assets. |
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
| Rename | Renamed `garfield-codify` to `odie` so the skill is a companion to Garfield without being gated on a Garfield run. |
| Runtime role | The skill plans deterministic checks; it does not implement them unless the user explicitly asks. |
| Evidence boundary | Transcript, commit, Sentry, GitHub, CI, reviewer, and Garfield history can all seed the analysis. Garfield is useful evidence, not a precondition. |
| Cross-checking | Prefer clusters supported by multiple sources, such as transcript findings plus bugfix commits, before recommending durable checks. |
| Secondary verification | Added a required judgment pass that removes candidates when the proposed check would need human taste, product intent, or semantic quality judgment. |
| Hard-rule gate | Tightened runtime guidance so recommended checks require exact signals, exact enforcement surfaces, scoped exceptions, valid/invalid examples, and a non-interactive runner. |
| Tooling order | Existing adequate repo tools beat preferred defaults; preferred defaults beat custom scripts. |
| Best linter policy | "Best" means high-signal, maintained, popular, repo-fit, low-noise, and able to catch the exact evidenced signal. |
| JS/TS default | Oxlint is the default dedicated JS/TS linter candidate when no adequate repo standard exists. |
| Structural-search default | ast-grep is the default candidate for repo-specific AST invariants when existing linters cannot express the pattern cleanly. |
| Flat references | Keep `references/` one level deep and directly linked from `SKILL.md`; add examples to a single topic file until it becomes too large to scan quickly. |
| Runner consolidation | Prefer adding checks to existing generalized runners; use at most one aggregate per-tool runner when the repo has split lint commands. |
| Framework-fit gate | Before recommending a custom script, require checking whether an existing repo tool, maintained linter, structural-search rule, schema check, generated diff check, or deterministic test can express the signal. |
| Python default | Ruff is the default Python lint/format candidate. |
| No v1 scripts | The work is judgment-heavy and repo-specific; no stable parsing helper is justified yet. |
| First reference | Added `references/ast-grep-codification.md` because concrete rule shapes would bloat runtime guidance and should be loaded only when structural-search checks are relevant. |
| Custom checks | Custom checks are last-resort recommendations for stable repo-specific invariants. |
| Invocation control | Added `disable-model-invocation: true` for Claude Code and `policy.allow_implicit_invocation: false` in `agents/openai.yaml` for Codex so both runtimes keep Odie user-invoked only. |

## Coverage Matrix

| Dimension | Covered By | Status |
| --- | --- | --- |
| Evidence-led trigger | Frontmatter, contract, inputs, and evidence model | covered |
| Transcript/commit-history learning | Inputs, evidence model, workflow, and `SPEC.md` | covered |
| Sentry/GitHub/CI evidence | Inputs and evidence model | covered |
| Garfield compatibility | Inputs and evidence model | covered |
| Existing-tool discovery | Tool Selection section | covered |
| Best default tool choices | Tool Selection section | covered |
| Hard-rule proof | Hard-Rule Gate and output template | covered |
| Structural AST checks | Tool Selection section and `references/ast-grep-codification.md` | covered |
| Runner consolidation | Contract, `SPEC.md`, and `references/ast-grep-codification.md` | covered |
| Codifiability judgment | Hard-Rule Gate and Judgment Verification Pass | covered |
| Human-judgment filter | Judgment Verification Pass and output summary | covered |
| Custom-check-last policy | Contract, Tool Selection, and workflow | covered |
| Framework-fit before custom scripts | Contract, Hard-Rule Gate, Tool Selection, `SPEC.md`, and output template | covered |
| Non-implementation boundary | Contract and workflow | covered |
| Output format | Output section | covered |
| Maintenance contract | `SPEC.md` | covered |
| Validation | `SPEC.md` and structural validator | covered |

## Replay Notes

### `getsentry/junior#622`

Expected hard-rule survivors:
- eval command/documentation drift: exact forbidden command strings and docs/package scopes
- eval harness/schema drift: exact stale identifiers such as old result and transcript surfaces
- changed-spec metadata drift: changed `specs/**/*.md` requires `Last Edited` and changelog updates
- runtime singleton/test mutation: exact exported `set*ForTests`/`reset*ForTests` and singleton-cache shapes in runtime code
- production composition-root import boundary: exact forbidden import outside allowlisted roots
- public API barrel exports: exact `export *` from package roots outside allowlists
- env/config docs alignment: exact config/env schema names missing from docs
- SQL/conversation boundary checks: exact raw SQL/query shapes plus deterministic invariant tests

Expected rejected or non-static outcomes:
- Slack routing/message behavior: integration or eval coverage unless a narrow forbidden import/helper signal exists
- broad "no fallback": human review guidance unless scoped to a typed boundary such as auth/egress structured signals
- plugin/runtime schema ownership: hard rule only if the repo defines an exact schema adjacency or allowlist policy; otherwise needs more proof

## Description Optimization

Should trigger:
- "run odie on this GitHub issue"
- "what can we learn from these transcripts and commits?"
- "which checks would have prevented these Sentry issues?"
- "codify recurring commit-history findings"
- "turn this review history into lint or CI checks"
- "which recurring Garfield findings can become hard rules?"
- "turn those review findings into lint or CI checks"
- "what checks should we add so Garfield does not catch this again?"
- "codify repeated agent review concerns with best linters"

Should not trigger:
- "run Garfield"
- "review this PR"
- "fix CI"
- "choose a linter for this new app"
- "triage this Sentry issue" without a codification request
- "implement the checks now" unless paired with an explicit codification plan

Final description:

> Use when transcript, commit, Sentry, GitHub, CI, review, or Garfield history suggests recurring failure patterns that might become hard deterministic checks. Analyze the evidence, reject judgment-based ideas, and output only mechanically enforceable lint, schema, CI, workflow, or deterministic test rules. Do not use for general code review, broad tool selection, or implementation unless explicitly asked.

## Gaps

- The hard-rule gate has been replayed against `getsentry/junior#622`, but not yet against a second unrelated holdout issue.
- No automated transcript or commit-history parser is bundled; agents must use repo-appropriate tools and summarize evidence gaps.
- The tool defaults will need periodic review as ecosystem standards change.
- Python type-checker choice is intentionally contextual because ty is modern and fast while Pyright may be the conservative choice for some repos.
- No automated semantic validator exists for whether recommendations would have caught a finding with acceptable false positives.
- ast-grep comment/JSDoc examples were smoke-tested against ast-grep 0.43.0, but remain unverified against real target repos; agents must confirm parser node kinds and add target-repo rule tests before CI gating.

## Changelog

- 2026-06-16: Created `garfield-codify` with post-Garfield codification workflow, existing-tool discovery, best-in-class default tool choices, and custom-check-last policy.
- 2026-06-16: Added ast-grep structural-check guidance, a flat ast-grep codification reference, runner consolidation guidance, and skill-structure notes for flat references.
- 2026-06-19: Renamed `garfield-codify` to `odie` and refactored the skill from post-Garfield codification to evidence-led codification using transcript, commit, Sentry, GitHub, CI, review, and Garfield history.
- 2026-06-19: Added a required secondary judgment verification pass to remove candidates that should remain human review, eval, or integration-test concerns.
- 2026-06-19: Tightened the runtime around hard-rule proof and simplified output to enforceable hard rules plus rejected judgment calls.
- 2026-06-19: Tightened custom-script guidance so concrete syntax and artifact checks prefer maintained rule frameworks such as ast-grep before one-off scripts.
- 2026-07-11: Made Odie explicitly user-invoked in Claude Code and Codex with their respective invocation-policy metadata.
