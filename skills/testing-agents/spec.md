# Testing Agents

## Intent

This skill helps agents design trustworthy tests for systems whose behavior partly depends on an LLM. It separates fixed contracts from model-variable quality, chooses the narrowest test layer that exercises the real behavior, and avoids suites that are brittle, weak, or easy to overfit.

The resulting tests use deterministic assertions wherever the system exposes a stable oracle, reserve judges for genuinely semantic output, and evaluate realistic scenarios through production wiring.

## Triggers

- **SHOULD** apply when adding, fixing, reviewing, or organizing tests or evals for an agent, LLM-backed workflow, tool-using assistant, or model-based reviewer.
- **SHOULD** apply when a test mocks the model or application path, asserts exact model prose, uses a judge for fixed facts, flakes across model runs, or appears tailored to one eval fixture.
- **SHOULD NOT** apply to ordinary deterministic unit tests, browser tests with no model behavior, prompt experiments with no regression-test goal, or Skillet skill eval authoring.

## Behaviors

### Behavior: Choose the owning test layer

The agent SHALL inspect repository test rules and nearby coverage, identify the user-visible or system contract, and put the scenario at the narrowest existing layer that exercises that contract without duplicating equal- or higher-fidelity coverage.

#### Scenario: Tool implementation and tool choice

- **WHEN** a change affects both fixed tool transport and whether an agent chooses that tool
- **THEN** the agent tests transport at an ordinary deterministic layer and agent tool choice through an agent integration test or eval

### Behavior: Design representative scenarios

The agent SHALL give each case one primary behavior, realistic inputs, and observable pass and failure conditions, using representative product outcomes rather than mirroring every implementation branch.

#### Scenario: Conversation behavior

- **WHEN** an agent behavior needs regression coverage
- **THEN** the test name and fixture describe a plausible user scenario and expected outcome without prescribing internal tools, commands, or reasoning

### Behavior: Exercise production wiring

The agent SHALL run the production agent or application entry point with application-owned services, use a live LLM when model behavior is part of the contract, and use a repository-approved scripted model only when testing a fixed runtime contract, while replacing other approved external boundaries with realistic fixtures, replay, or HTTP fakes.

#### Scenario: Agent calls an external API and stores data

- **WHEN** the agent calls a third-party API and persists the result
- **THEN** the test uses the real agent and isolated application storage while faking or replaying the third-party boundary

### Behavior: Classify every oracle

The agent SHALL classify each expected outcome as a fixed invariant, bounded structural variation, or semantic quality judgment before choosing its assertion, and SHALL allow exactness only where exactness is part of the contract.

#### Scenario: Mixed deterministic and model-variable output

- **WHEN** an agent must call a specific mutation with exact arguments and then explain the result in its own words
- **THEN** the test asserts the mutation directly and judges only the meaning of the user-visible explanation

### Behavior: Assert fixed contracts directly

The agent SHALL use ordinary assertions on stable structured output, normalized tool calls, database rows, HTTP requests, artifacts, categorical decisions, and visible side effects, preferring partial or set matching when order or extra fields are not contractual.

#### Scenario: Variable execution path with a fixed effect

- **WHEN** the model may take different valid intermediate steps but must produce one fixed side effect
- **THEN** the test asserts that side effect without pinning incidental call counts, ordering, prompt text, logs, traces, or exact prose

### Behavior: Judge only semantic quality

The agent SHALL use an LLM judge only for nondeterministic semantic properties that lack a reliable deterministic oracle, give it a narrow behavior-level rubric, and limit its evidence to the output a user could evaluate unless hidden evidence is itself the contract.

#### Scenario: Helpful grounded answer

- **WHEN** many phrasings can correctly answer a request but completeness and grounding matter
- **THEN** the agent uses a focused semantic rubric for the answer and keeps tool, persistence, and delivery checks in direct assertions

### Behavior: Resist eval overfitting

The agent SHALL keep user prompts natural, keep eval-specific answers and distinctive phrases out of production prompts, fix failures at the general product-rule level, and use diverse representative cases plus held-out or refreshed cases when repeatedly optimizing behavior against a suite.

#### Scenario: One eval fails after a prompt change

- **WHEN** a developer could make the case pass by copying its wording or expected answer into the product prompt
- **THEN** the agent states the general behavior rule, makes a generalizable fix, and checks it against a materially different scenario or protected holdout

### Behavior: Manage stochastic evidence

The agent SHALL separate infrastructure errors from quality misses, use the repository's credential and timeout setup, record the exact run command, and calibrate repetitions or aggregate score thresholds from observed variance rather than hiding failures with retry-until-pass behavior.

#### Scenario: Behavioral eval varies across runs

- **WHEN** a qualitative case produces different valid scores across repeated executions
- **THEN** the agent preserves run evidence, measures the variance across cases or trials, and applies a documented aggregate policy instead of converting the response to an exact snapshot or silently rerunning failures

## Constraints

### Constraint: No secrets

The agent MUST NOT hard-code, print, record, or commit credentials or sensitive production data.

### Constraint: No fake confidence

The agent MUST NOT replace the production agent path or model behavior under test with mocked model output, mocked tool decisions, or a lower-fidelity test solely because live execution is slower, costs money, or needs credentials.

### Constraint: No default judge

The agent MUST NOT add an LLM judge, broad snapshot, exact-prose assertion, or model call-count assertion when a stable direct oracle can prove the contract.

### Constraint: No case-specific product patch

The agent MUST NOT make production prompts, tools, or routing depend on eval fixture names, copied expected answers, or distinctive scenario wording.

### Constraint: No green-by-retry

The agent MUST NOT use retries, permissive thresholds, skipped cases, or weakened criteria merely to make a flaky or failing suite pass.

<!-- skillet-version: 1.7.0 -->
