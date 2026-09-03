# Testing Agents

## Intent

This skill helps agents write integration tests for agent behavior. These tests use the real agent, LLM, and services we run. They mock outside HTTP services and use normal test assertions.

## Triggers

- **SHOULD** apply when adding, fixing, or reviewing an integration test for an agent that uses an LLM.
- **SHOULD** apply when mocks or unit tests replace the real agent path.
- **SHOULD NOT** apply to unit tests, browser tests, prompt experiments, or general eval work.

## Behaviors

### Behavior: Follow the repository

The agent SHALL inspect the repository's test rules, nearby agent integration tests, and test commands before writing the test.

#### Scenario: Existing test setup

- **WHEN** the repository has more than one test type
- **THEN** the agent uses the existing agent integration test setup

### Behavior: Define a real behavior scenario

The agent SHALL test a realistic user or system scenario with clear input and visible results.

#### Scenario: Agent behavior

- **WHEN** an agent behavior needs a test
- **THEN** the test name and data describe the behavior, not a prompt or mocked response

### Behavior: Keep our system real

The agent SHALL use the production agent entry point, a live LLM, and real services run by the application, including SQL databases, queries, queues, and storage.

#### Scenario: Agent uses SQL

- **WHEN** the agent reads or writes SQL data
- **THEN** the test uses the repository's isolated test database instead of a fake database

### Behavior: Mock outside HTTP services

The agent SHALL mock websites, APIs, and services outside the application's infrastructure at the HTTP boundary.

#### Scenario: Agent calls a website

- **WHEN** the agent calls a third-party website and stores the result in SQL
- **THEN** the test mocks the website request and uses the real test database and live LLM

### Behavior: Use normal assertions

The agent SHALL use normal test assertions on stable results such as structured output, tool calls, database rows, HTTP requests, and user-visible effects.

#### Scenario: Nondeterministic model wording

- **WHEN** model wording can vary
- **THEN** the test checks stable results instead of exact prose, prompt text, or model call counts

### Behavior: Handle live tests clearly

The agent SHALL use the repository's live-test setup, skip when credentials are missing, set a timeout, and report the test command.

#### Scenario: Developer lacks provider credentials

- **WHEN** the required LLM credential is missing
- **THEN** the test skips instead of using a fake model

## Constraints

### Constraint: No secret handling

The agent MUST NOT hard-code, print, or commit credentials.

### Constraint: No automatic unit fallback

The agent MUST NOT replace the integration test with unit tests because it is slower, costs money, or needs credentials.

### Constraint: No default model judge

The agent MUST NOT add an LLM judge, score, or broad snapshot when normal assertions can check the result.

<!-- skillet-version: 1.7.0 -->
