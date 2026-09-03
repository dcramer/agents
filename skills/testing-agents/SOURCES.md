# Sources

## Local evidence

| Source | Evidence used |
|---|---|
| `/Users/dcramer/src/junior/policies/testing.md` | Test real behavior with real application code. Mock only allowed outside services. Check results instead of internal details. |
| `/Users/dcramer/src/junior/policies/evals.md` | Use realistic scenarios and direct assertions for tool calls, saved data, and side effects. |
| `/Users/dcramer/src/junior/packages/junior-evals/README.md` | Live model tests use the production setup, fixed timeouts, and clear test commands. |
| `/Users/dcramer/src/junior/packages/junior-evals/evals/integration/conversation/actions.eval.ts` | A real model run is checked with ordinary assertions on tool calls, reactions, and replies. |
| `/Users/dcramer/src/peated/apps/server/src/scraper/configured/suggestion.eval.test.ts` | The test uses real database and worker wiring plus a live model, replaces only the fixture website at `fetch`, and asserts persisted rules and parsed results. |
| `/Users/dcramer/src/peated/apps/server/src/scraper/configured/suggestion.price.eval.test.ts` | A realistic model-backed workflow uses exact contract assertions on generated selectors, database state, preview results, and outbound website requests. |
| `/Users/dcramer/src/peated/packages/bottle-classifier/src/imageExtraction.eval.test.ts` | The test skips without credentials, uses the real model and parser, and checks stable fields. |
| `/Users/dcramer/src/peated/packages/bottle-classifier/src/classifier.eval.scenarios.ts` | Cases are grouped by product outcomes such as new bottle, existing match, correction, and rejection. |
| `/Users/dcramer/src/peated/packages/bottle-classifier/vitest.evals.config.mts` | Live model tests have their own file pattern, environment setup, and timeout. |
| `/Users/dcramer/src/warden/packages/evals/src/e2e.eval.ts` | Live-provider execution is skipped explicitly when credentials are absent and uses a bounded per-case timeout. |

## Decisions

- Use the skill for agent integration tests, not browser tests or model helpers.
- Use normal assertions. Do not add an LLM judge when stable results can be checked directly.
- Mock outside websites and APIs at HTTP. Keep the LLM live.
- Keep our SQL database, queries, queues, storage, and services real. Use isolated test instances.
- Follow each repository's credential, model, and test setup.

## Gaps

- The repositories use different filenames, commands, credentials, and models. The skill tells the agent to inspect the repository first.
- Some source tests use `eval` filenames even though they test a live integration. The test behavior matters more than the filename.

## Changelog

- 2026-09-03: Created as `testing-agents` from live-provider integration patterns in Junior, Peated, and Warden.
