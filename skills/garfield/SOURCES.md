# Garfield Sources

## Source Inventory

| Source | Trust | Contribution | Usage |
| --- | --- | --- | --- |
| User seed prompt in setup request | High | Defines repeat-after-each-slice behavior, subagent advisor requirement, precision preference, and concern categories. | Adapted into runtime loop, advisor prompts, and review checklist. |
| Local `AGENTS.md` | High | Defines repo shape, skill file expectations, no hosting config, concise docs, and validation expectations. | Drove `skills/garfield/` layout and concise docs. |
| Local `README.md` | High | Shows install entrypoint, example `agents.toml`, and skill inventory conventions. | Updated root skill inventory and example. |
| `/Users/dcramer/src/junior/policies/README.md` | High | Defines policy docs as short repo-wide defaults and says to keep intent, default rules, and exceptions small. | Adapted into `references/policy-template.md`. |
| `/Users/dcramer/src/junior/policies/policy-template.md` | High | Provides the concise policy file shape. | Adapted into `references/policy-template.md`. |
| `/Users/dcramer/src/junior/policies/code-comments.md` | High | Defines when comments/JSDoc are useful and when they are noise. | Vendored into `references/code-comments.md`. |
| `/Users/dcramer/src/junior/policies/interface-design.md` | High | Defines narrow interface, naming, lifecycle, ownership, and platform-boundary defaults. | Vendored into `references/interface-design.md`. |
| User test-quality policy request | High | Defines recurring bad agent-test patterns: over-mocking, weak unit defaults, duplication, and default telemetry/logging assertions. | Adapted into `references/test-quality.md` and used to replace the generic tests/fixtures review task. |
| User test-deduping and concision requests | High | Clarifies that when a higher-fidelity test encapsulates a lower-fidelity test, Garfield should prefer higher coverage and remove the lower-fidelity duplicate; later requested tightening because more words make misses likelier. | Tightened `references/test-quality.md` to make deletion of encapsulated lower-layer tests the default, then compressed repeated testing guidance into fewer decision-focused bullets. |
| User telemetry testing refinement | High | Clarifies that telemetry tests should be minimized rather than forbidden, and required instrumentation tests should rely on spies or capture sinks before mocks. | Tightened `references/test-quality.md` instrumentation guidance. |
| User implementation-minimalism policy request | High | Defines recurring agent overengineering patterns: excessive guardrails, speculative edge-case handling, fallbacks, and tests for unlikely scenarios. | Adapted into `references/implementation-minimalism.md` and added as a bundled policy subagent. |
| User defensive-code refinement request | High | Identifies excessive GPT-generated defensive code as a recurring failure mode and asks Garfield to combat it without bloating the skill. | Tightened implementation minimalism around silent fallback success, repeated invariant checks, and concise boundary-aware exceptions. |
| [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) and [Secure Cloud Architecture Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secure_Cloud_Architecture_Cheat_Sheet.html) | High | Defines early validation of untrusted external data and trust boundaries where components with different trust levels meet; also notes that trusted components need not repeat every check. | Preserved validation at real boundaries while discouraging duplicate downstream checks. |
| User source-app policies request | High | Requests discovering local `policies/` files in the source application and running each through a policy subagent similar to bundled Garfield policies. | Added runtime source-app policy discovery and one policy subagent per discovered policy file. |
| User overengineering feedback | High | Reports that Garfield should prevent bloat while preserving tight interface design and useful comments. | Tightened current-diff causality, medium severity, policy prompts, and policy references. |
| `getsentry/junior` PR #532 | High | Provides a concrete testing architecture cleanup, including test-layer selection, mock boundary hardening, duplication removal, and Bugbot findings around stale test scripts and unwired adapters. | Adapted into a repo-generic test-quality policy. |
| `/Users/dcramer/src/junior` branch `origin/codex/testing-architecture-cleanup` testing docs | High | Supplies source examples from `specs/testing.md`, `specs/integration-testing.md`, `specs/component-testing.md`, `specs/unit-testing.md`, `specs/eval-testing.md`, and `policies/test-adapters.md`. | Generalized into bundled policy guidance without carrying Junior-specific paths or commands into runtime. |
| Sidecar review of draft implementation-loop skill | High | Identified missing trigger boundaries, no-edit advisor contract, severity semantics, anti-loop rules, dirty-worktree handling, and generated/dependency checks. | Incorporated into runtime rules, loop contract, prompt schema, `SPEC.md`, and coverage notes. |
| [Google Engineering Practices: What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html) | High | Prior art for checking tests, documentation, style authority, maintainability, and avoiding blocking on personal style. | Reinforced test/docs/policy checks and low-severity handling. |
| [Gerrit Review Labels documentation](https://gerrit-review.googlesource.com/Documentation/config-labels.html) | High | Prior art separating `Code-Review` from `Verified`, where verification means compilation/tests passed. | Drove separate review advisor and verification advisor concepts. |
| [GitHub protected branches](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) and [pull request reviews](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews) | High | Prior art for required reviews, stale approvals after new commits, status checks, and most-recent-push approval by someone else. | Reinforced rerun-after-edit behavior and independent verification after material changes. |
| [Conventional Comments](https://conventionalcomments.org/) | Medium | Prior art for labeled review comments that improve intent clarity and machine readability. | Drove explicit evidence labels in concern output. |
| [OASIS SARIF 2.1.0](https://docs.oasis-open.org/sarif/sarif/v2.1.0/os/sarif-v2.1.0-os.html) | High | Prior art for structured analysis results with severity, message, locations, related locations, and rule identifiers. | Drove location/evidence requirements and concise diagnostic-style output. |
| [Kubernetes Pull Request Process](https://www.kubernetes.dev/docs/guide/pull-requests/) | Medium | Prior art for test/review/edit repeat loops, trusted reviewers, `/lgtm`, `/approve`, and test reruns. | Reinforced loop semantics, independent review signals, and not fixing every weak comment. |
| Local `skill-writer` skill instructions | High | Required workflow for skill creation, synthesis, authoring, description optimization, and validation. | Used for artifact layout, `SPEC.md`, `SOURCES.md`, and validation plan. |
| `skill-writer/references/mode-selection.md` | High | New skill requires synthesis, authoring, description optimization, and registration/validation. | Drove selected path. |
| `skill-writer/references/execution-shapes.md` | High | Choose simplest adequate shape; add advanced mechanics only when needed. | Drove inline runtime with a mandatory subagent advisor step and no extra references. |
| `skill-writer/references/layout-inline-skill.md` | High | Inline layout fits the universal loop. | Drove compact `SKILL.md`; bundled policies were later split into focused references. |
| `skill-writer/references/workflow-validation-loops.md` | High | Defines validate-fix-repeat contract and passing state. | Drove loop and stop rules. |
| `skill-writer/references/source-adaptation.md` | High | Converts user workflow prompt into reusable skill guidance. | Drove provenance and adaptation notes. |
| `skill-writer/references/authoring-path.md` | High | Defines frontmatter, runtime compactness, and precision pass. | Drove `SKILL.md` shape. |
| `skill-writer/references/reference-architecture.md` | High | Separates runtime, maintenance, provenance, and optional references. | Drove `SKILL.md`, `SPEC.md`, and `SOURCES.md` boundaries. |
| `skill-writer/references/spec-template.md` | High | Defines maintenance contract shape. | Drove `SPEC.md`. |
| `skill-writer/references/description-optimization.md` | High | Trigger wording and false-positive checks. | Drove final description. |
| `skill-writer/references/registration-validation.md` | High | Registration and structural validation expectations. | Drove root README update and validator command. |

## Adaptation Notes

| Decision | Result |
| --- | --- |
| Source intent | Make agents coordinate subagent review for each implementation slice, judge findings, fix valid concerns, and repeat until the code is ready. |
| Local target | A portable skill under `skills/garfield/` that works in consuming repos such as `~/src/junior`. |
| Fidelity boundary | Preserve mandatory subagent review, per-policy subagents, coordinator validity judgment, useful independent verification, review-fix-repeat behavior, precision/low-prose output, evidence-labeled findings, specs/docs, behavior, bundled policy, dead-code, delayering, type, generated/dependency, implementation-minimalism, test-quality, and verification checks. |
| Local replacement | Converted narrative instructions into a compact workflow, enumerated review tasks, advisor prompts, stopping rule, bundled policy references, minimal handoff contract, and dedicated implementation-minimalism and test-quality policies. |
| Omitted material | No provider-specific subagent API names, scripts, or references; runtimes vary and v1 behavior is short enough inline. |
| Rights and attribution | User-authored seed prompt and local repo sources; no external licensed text bundled. |

## Synthesis Decisions

| Decision | Status | Rationale |
| --- | --- | --- |
| Skill class: `workflow-process` | adopted | The skill is a repeatable implementation operation with preconditions, ordered flow, failure handling, safety boundaries, and validation. |
| Primary shape: inline workflow with routed policy references | adopted | The loop belongs in `SKILL.md`; exact policy text belongs in focused references for policy subagents. |
| Secondary shape: validation loop | adopted | The skill must fix concerns, validate, and repeat until a passing state. |
| Secondary shape: mandatory review subagents | adopted | The user explicitly requested a subagent for every review task; the main agent enumerates review tasks, spawns one subagent per task, and coordinates finding validity. |
| Bundled code-comments policy | adopted | User requested pulling this policy into the skill rather than relying on in-repo policies. |
| Bundled implementation-minimalism policy | adopted | User requested a policy that minimizes speculative guardrails, fallbacks, edge-case handling, and related tests unless they are part of the intent. |
| Bundled interface-design policy | adopted | User requested pulling this policy into the skill rather than relying on in-repo policies. |
| Bundled test-quality policy | adopted | User requested replacing the weak generic test reviewer with repo-generic policy that discourages over-mocking, weak unit-test defaults, duplication, and default telemetry/logging assertions. |
| Encapsulated lower-layer tests | adopted | User requested deduping tests when higher-fidelity coverage already proves the same behavior; preserve lower-layer tests only for distinct local invariants or meaningful failure diagnosis. |
| Telemetry test minimization | adopted | User clarified that instrumentation tests should be rare but valid when telemetry is the contract, and should observe the real delivery path with spies or capture sinks instead of broad telemetry mocks. |
| Dynamic source-app policy discovery | adopted | Consuming repos may have their own `policies/` docs; Garfield should review against them without vendoring app-specific rules into the portable skill. |
| Source-app policy file set | adopted | Discover sorted `policies/**/*.md` files and exclude any `README.md` or `policy-template.md` under `policies/` because they are support docs rather than review policies. |
| Generic tests/fixtures review task | replaced | Test quality needs policy-grade layer and mock analysis; the old task was too broad and encouraged "coverage match" rather than better test architecture. |
| Non-policy review task wording | narrowed | Policy reviews are listed in the loop, so spawn wording now prevents accidentally running bundled policy subagents twice. |
| Bundled policy template | adopted | User requested keeping policy references concise; template gives the maintenance shape. |
| Skill README for bundled references | adopted | User requested moving bundled-reference inventory and maintenance notes out of `SKILL.md`. |
| Independent verification advisor | adopted, conditional | Gerrit and GitHub prior art separate review judgment from verification/status checks; make this conditional so trivial slices do not pay boilerplate overhead. |
| Severity semantics | adopted | Fix behavior needs a clear threshold; `blocker/high/medium/low` prevents loops over low-value notes. |
| Evidence labels | adopted | Conventional Comments and SARIF prior art both favor structured labels plus locations; evidence labels make concerns reviewable without adding prose. |
| Anti-loop stop rule | adopted | Stop after repeated concerns or 3 cycles without material progress; do not stop merely because a fixed cycle count was reached. |
| Review-only advisor contract | adopted | Keeps the main agent accountable for applying or rejecting findings. |
| Discrete review tasks plus per-policy review | adopted | Behavior/spec, specs/docs, repo instructions, dead code, delayering, types, generated/dependencies, validation, and bundled policies each get their own subagent. |
| Coordinator role | adopted | The main agent must evaluate validity of subagent findings instead of treating advisor output as authoritative. |
| Cycle output | rejected | Per-cycle logs are mostly bookkeeping; the skill should track loops internally and report only validation plus residual material concerns. |
| Scripts | rejected | No deterministic parsing or automation is required for v1. |
| Runtime references | adopted | Bundled policy text belongs in `references/` so policy subagents receive exact policy content without relying on consuming repos. |
| Runtime minimalism | adopted | Removed the runtime H1, cross-skill routing, bundled-reference inventory, and maintenance notes from `SKILL.md`. |
| Provider-specific mechanics | rejected | The runtime requires subagents but avoids provider-specific API names; runtimes without subagents should report that the skill cannot run as specified. |
| `SPEC.md` | adopted | The skill has non-trivial trigger, loop, evidence, and validation contracts. |
| README registration | adopted | The repo maintains a root skill inventory and example install config. |

## Coverage Matrix

| Dimension | Covered By | Status |
| --- | --- | --- |
| Preconditions | Define slice: status, diff, repo instructions, specs/docs, tests, generated artifacts, lockfiles, dependencies, and bundled policies. | covered |
| Ordered flow | Loop and discrete review-task enumeration sections. | covered |
| Failure handling | Subagent-unavailable stop, validation blocker reporting, recurring-concern handling. | covered |
| Safety boundaries | Advisor-not-authority rule, review-only advisor, high-confidence/material concern filter, dirty-worktree preservation, product intent boundary. | covered |
| Output contract | Minimal handoff status and residual material concerns only. | covered |
| Evidence labels | Evidence section and reviewer output schema. | covered |
| Independent verification | Conditional verification advisor prompt and handoff status. | covered |
| Policy compliance | `references/code-comments.md`, `references/implementation-minimalism.md`, `references/interface-design.md`, `references/test-quality.md`, and policy subagent prompt. | covered |
| Source-app policy compliance | Runtime discovery of source-app `policies/**/*.md` and one policy subagent per discovered file. | covered |
| Specs/docs | Advisor checklist and slice definition. | covered |
| Dead code and delayering | Advisor checklist and fix categories. | covered |
| Implementation minimalism | `references/implementation-minimalism.md`, policy subagent prompt, and core-intent behavior gate. | covered |
| Type quality | Advisor checklist. | covered |
| Generated/dependency drift | Slice definition and advisor checklist. | covered |
| Test quality | `references/test-quality.md`, policy subagent prompt, and validation advisor. | covered |
| Verification | Validate step and final output. | covered |
| Portability | Skill-root-local files and no provider-specific tool names. | covered |

## Description Optimization

Should trigger:
- "run garfield on this feature slice"
- "after implementing this, use a subagent to review and fix concerns"
- "run an independent verification pass after fixing review concerns"
- "review/fix/repeat this code change until it is ready"
- "use garfield after each incremental code change"
- "check specs, policies, dead code, delayering, and types before final handoff"
- "review this slice with the bundled code-comments and interface-design policies"
- "run garfield and check whether the tests are over-mocked or duplicated"
- "run garfield and flag speculative guardrails, fallbacks, and edge-case tests"

Should not trigger:
- "review this branch for cleanup"
- "run a strict maintainability review"
- "fix CI failures on this PR"
- "explain this function"
- "create a new skill"
- "brainstorm product requirements"
- "iterate on the UX concept"

Final description:

> Use while implementing code changes, after a meaningful slice, to coordinate subagent review/fix/verify loops that preserve the core user or PR intent. Fix regressions, explicit requirement mismatches, validation gaps, and behavior-preserving cleanup; report unrelated improvements or out-of-intent behavior changes instead. Do not use for standalone reviews, brainstorming, or non-code iteration.

## Gaps

- No real positive or negative iteration examples have been captured yet.
- No automated semantic validator exists for advisor quality or concern materiality.
- Subagent behavior differs by consuming agent runtime; runtimes without subagents cannot run this skill as specified.
- Source-app policy discovery uses a simple Markdown glob and may need refinement if consuming repos store policy docs outside `policies/`.
- Evidence label taxonomy is intentionally small and may need revision after real use in `~/src/junior`.
- Implementation-minimalism policy still needs tuning against real accepted/rejected Garfield findings.
- Test-quality policy is generalized from one large PR and should be tuned against more repos after real use.

## Changelog

- 2026-06-08: Created initial inline implementation-loop skill, specification, source record, and root README inventory entry.
- 2026-06-08: Added evidence-labeled concerns and conditional independent verification advisor contract based on prior art review; rejected per-cycle reporting as low-signal bookkeeping.
- 2026-06-08: Tightened runtime wording around minimal handoff, conditional verification, evidence labels, and anti-loop behavior.
- 2026-06-08: Made subagent review mandatory for every review task and clarified the main agent's coordinator role for finding validity.
- 2026-06-08: Added bundled policy references for code comments and interface design, added a policy template reference, and changed review flow to discrete review tasks plus one subagent per bundled review policy.
- 2026-06-08: Split the broad general implementation review into separate subagent tasks for behavior/spec, specs/docs, repo instructions, dead code, delayering, type boundaries, tests/fixtures, generated/dependencies, and validation.
- 2026-06-08: Removed `SKILL.md` H1, cross-skill references, and bundled/maintenance inventory; added skill README for that context.
- 2026-06-08: Added bundled test-quality policy from Junior PR #532 lessons and replaced the generic tests/fixtures review task with a policy subagent.
- 2026-06-09: Tightened the test-quality policy to prohibit default assertions on logs, Sentry, tracing, metrics, analytics, or telemetry unless instrumentation output is the explicit contract under test.
- 2026-06-09: Added a core-intent behavior gate so subagent findings and fixes may clean up locally but must not introduce out-of-intent behavior changes, adjacent hardening, API policy changes, or unrelated cleanup.
- 2026-06-15: Added an implementation-minimalism policy to flag speculative guardrails, fallbacks, edge-case handling, and related tests unless required by explicit intent or real boundaries.
- 2026-06-15: Renamed the skill from `iterate` to `garfield` and added the Garfield the Cat review persona note without changing runtime behavior.
- 2026-06-15: Added source-app `policies/**/*.md` discovery and one policy subagent per discovered policy.
- 2026-06-16: Added `agents/openai.yaml` with OpenAI UI metadata; runtime behavior remains defined by `SKILL.md`.
- 2026-06-26: Tightened policy and medium finding gates so Garfield fixes only current-diff-caused concerns and defers pre-existing or patch-expanding advice.
- 2026-06-30: Tightened test-quality policy to prefer deleting lower-fidelity tests fully encapsulated by higher-fidelity coverage, while retaining distinct invariant or diagnostic tests; compressed repeated guidance into fewer decision-focused bullets.
- 2026-07-03: Refined test-quality policy to minimize telemetry assertions while preferring spies or capture sinks over mocks when instrumentation is the requested contract.
- 2026-07-10: Tightened implementation minimalism against excessive defensive code: silent fallback success, repeated invariant checks, and hypothetical guards, while preserving validation at real trust boundaries.
