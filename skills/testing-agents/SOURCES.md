# Sources

## Local evidence

| Source | Evidence used |
|---|---|
| `/Users/dcramer/src/junior/policies/testing.md` | Test real behavior with real application code. Mock only allowed outside services. Check results instead of internal details. |
| `/Users/dcramer/src/junior/policies/evals.md` | Use realistic scenarios and direct assertions for tool calls, saved data, and side effects. |
| `/Users/dcramer/src/junior/packages/junior-evals/README.md` | Live model tests use the production setup, fixed timeouts, and clear test commands. |
| `/Users/dcramer/src/junior/packages/junior-evals/evals/integration/conversation/actions.eval.ts` | A real model run is checked with ordinary assertions on tool calls, reactions, and replies. |
| `/Users/dcramer/src/junior/packages/junior-evals/evals/conversation/routing.eval.ts` | Combines direct assertions for stable visible facts with a behavior-level rubric for model-variable response quality. |
| `/Users/dcramer/src/junior/packages/junior-evals/evals/agent/providers.eval.ts` | Uses normalized tool calls for deterministic provider evidence and a rubric for the user-visible answer. |
| `/Users/dcramer/src/junior/packages/junior-evals/evals/guardian/action-review.eval.ts` | Treats the model-produced `allow`, `ask`, or `deny` category as an exact contract and uses diverse safety scenarios. |
| `/Users/dcramer/src/peated/apps/server/src/scraper/configured/suggestion.eval.test.ts` | The test uses real database and worker wiring plus a live model, replaces only the fixture website at `fetch`, and asserts persisted rules and parsed results. |
| `/Users/dcramer/src/peated/apps/server/src/scraper/configured/suggestion.price.eval.test.ts` | A realistic model-backed workflow uses exact contract assertions on generated selectors, database state, preview results, and outbound website requests. |
| `/Users/dcramer/src/peated/packages/bottle-classifier/src/imageExtraction.eval.test.ts` | The test skips without credentials, uses the real model and parser, and checks stable fields. |
| `/Users/dcramer/src/peated/packages/bottle-classifier/src/classifier.eval.scenarios.ts` | Cases are grouped by product outcomes such as new bottle, existing match, correction, and rejection. |
| `/Users/dcramer/src/peated/packages/bottle-classifier/vitest.evals.config.mts` | Live model tests have their own file pattern, environment setup, and timeout. |
| `/Users/dcramer/src/warden/packages/evals/src/e2e.eval.ts` | Live-provider execution is skipped explicitly when credentials are absent and uses a bounded per-case timeout. |
| [Vitest Evals package README](https://github.com/getsentry/vitest-evals/blob/main/packages/vitest-evals/README.md) | Defines the harness-first `describeEval` API, normalized session and projection helpers, direct Vitest assertions, optional judges, and one-run judge lifecycle. |
| [Vitest Evals architecture](https://github.com/getsentry/vitest-evals/blob/main/docs/architecture.md) | Documents normalized run/session boundaries, deterministic judge helpers, separate judge harnesses, reporting artifacts, replay, and guidance to avoid raw event internals. |

## Decisions

- Cover agent integration tests and behavioral evals while routing fixed local logic and transport contracts to their narrower ordinary test layers.
- Classify every expected result as a fixed invariant, bounded structural variation, or semantic quality judgment before selecting an oracle.
- Use normal assertions for stable results. Reserve LLM judges for semantic user-visible quality that lacks a reliable direct oracle.
- Use a live LLM when model behavior is the contract. A repository-approved scripted model is valid for fixed runtime behavior after a known response.
- Keep application-owned databases, queries, queues, storage, and services real at the integration layer; fake or replay only repository-approved external boundaries.
- Prevent eval overfitting by using natural scenarios, general rule-level fixes, materially different checks, and protected or refreshed holdouts during repeated optimization.
- Keep hard invariants per-case and calibrate qualitative aggregate policies from observed variance. Never retry until pass.
- Follow each repository's credential, model, timeout, replay, and test-command setup.

## Gaps

- The repositories use different filenames, commands, credentials, and models. The skill tells the agent to inspect the repository first.
- Some source tests use `eval` filenames even though they test a live integration. The test behavior matters more than the filename.
- Holdout storage, access policy, trial count, and aggregate thresholds are repository-specific and must be calibrated rather than prescribed globally.
- A live model can vary even with low temperature. The skill treats pinned configuration as comparability, not proof of determinism.

## Changelog

- 2026-09-03: Created as `testing-agents` from live-provider integration patterns in Junior, Peated, and Warden.
- 2026-09-03: Expanded test-layer selection, oracle classification, Vitest Evals examples, semantic rubric guidance, overfitting controls, and stochastic-suite policy using current Vitest Evals and Junior patterns.
