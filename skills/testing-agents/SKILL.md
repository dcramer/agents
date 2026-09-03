---
name: testing-agents
description: Designs and reviews tests for agents and LLM-backed workflows. Use when coverage involves model behavior, tool choice, semantic output, flaky evals, mocked agent paths, brittle assertions, or fixture overfitting; do not use for ordinary deterministic tests or general prompt experiments.
spec_hash: 2695d37f6d8d
---

# Testing Agents

Design the test from the contract outward. A trustworthy agent test is exact about fixed outcomes and flexible only where the product is genuinely variable.

## Workflow

1. Read the repository's test rules, commands, harnesses, and nearby coverage. State the user-visible or system contract and the regression the test should catch.
2. Choose one primary owning layer:
   - Use a unit test for pure fixed logic such as parsing, normalization, retry math, or scoring.
   - Use a component or integration test for tool implementations, transport payloads, persistence, and fixed runtime lifecycle.
   - Use an agent integration test or behavioral eval for model-dependent choices such as tool selection, routing, continuity, grounding, and reply strategy.
   - Use an exact categorical eval when the model contract itself is a fixed enum such as `allow | ask | deny`.
   Do not duplicate equal- or higher-fidelity coverage unless the new case owns a different contract or failure edge.
3. Design one representative scenario per case. Use a plausible user input, one primary behavior, and observable pass or failure conditions. Name the trigger and expected outcome. Do not mirror every implementation branch or prescribe internal tools, commands, or reasoning in the input.
4. Exercise production wiring. Run the production agent or application entry point with application-owned services. Use a live LLM when model behavior is under test. A repository-approved scripted model is appropriate only when the contract is fixed runtime behavior after a known response. Fake or replay only boundaries the repository permits, using realistic data.
5. Classify every expected outcome before asserting it:
   - **Fixed invariant:** exact enum, schema, required argument, row, request, artifact, or visible side effect. Assert it directly.
   - **Bounded structure:** required subset or unordered effect where extra fields, steps, or order may vary. Use partial, set, or range matching.
   - **Semantic quality:** meaning, completeness, tone, or grounding with multiple valid phrasings. Use a narrow judge only when no reliable direct oracle exists.
6. Keep mixed cases mixed. If an agent must perform an exact mutation and then explain it naturally, directly assert the mutation and judge only the explanation. Use normalized harness projections for sessions, tool calls, messages, and artifacts instead of raw provider payloads or repo-local transcript schemas.
7. Run the repository's focused command. Use its live-test credential behavior, bounded timeout, model configuration, and replay setup. Skip cleanly when credentials are absent only if that is repository policy. Report the exact command.
8. Diagnose failures at the owning layer. Separate infrastructure failures from quality misses. Preserve useful run evidence. Do not weaken a deterministic oracle, broaden a rubric, or add retries before identifying whether the product, fixture, harness, judge, or threshold is wrong.

Read [references/test-design.md](references/test-design.md) when authoring or reviewing an actual test; it contains the layer/oracle decision tables, Vitest Evals examples, rubric patterns, overfitting controls, and a review checklist.

## Assertion rules

- Assert structured output, tool arguments, database state, HTTP requests, artifacts, categorical decisions, and observable effects with ordinary test assertions.
- Prefer partial or set matching unless ordering, count, or the full object shape is the contract.
- Assert required IDs or facts inside variable prose directly; a judge is unnecessary for something the test runner can search exactly.
- Judge only nondeterministic user-visible semantics. Use short, independent pass conditions and focused failure conditions in product language.
- Keep deterministic tools, persistence, delivery, logs, traces, and metadata out of semantic judge prompts unless that hidden evidence is the explicit subject of the test.
- Do not assert exact model prose, prompt text, incidental tool sequence, internal call counts, logs, spans, or timing unless that exact surface is the behavior under test.
- Do not run the application a second time from a judge unless the second run is intentional.

## Overfitting and stochastic runs

- Keep eval inputs natural and product prompts free of fixture names, copied expected answers, and distinctive scenario phrases.
- When one case fails, state the general product rule first, make a generalizable fix, and check a materially different scenario.
- When repeatedly optimizing prompts or routing, keep development cases separate from protected or refreshed holdouts. Add representative real failures and compare meaningful slices, not just one aggregate number.
- Pin and record the model, scenario set, prompt, harness, and judge configuration needed for comparisons.
- Keep strict invariants hard pass/fail. For qualitative behavior, calibrate trials and aggregate thresholds from observed variance; never silently rerun until a case passes.

## Never

- Never hard-code, print, record, or commit credentials or sensitive production data.
- Never replace the production path or model behavior under test with mocked outputs or a lower-fidelity test merely for speed, cost, or credential convenience.
- Never add a judge, broad snapshot, exact-prose assertion, or model call-count assertion when a stable direct oracle proves the contract.
- Never patch production prompts, tools, or routing with eval-specific answers or wording.
- Never skip cases, loosen criteria or thresholds, or add retry-until-pass behavior merely to get green.
