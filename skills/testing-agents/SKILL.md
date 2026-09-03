---
name: testing-agents
description: Writes integration tests for agents that use a live LLM. Use when adding or reviewing an agent integration test, especially when mocks or unit tests replace the real agent path.
spec_hash: 6eb91d983b79
---

# Testing Agents

Write an integration test for a real agent scenario.

1. Read the repository's test rules and nearby agent integration tests.
2. Use the production agent entry point and a live LLM. Do not mock model output, tool calls, prompts, or application code.
3. Keep services we run real. Use the real test database, SQL queries, queues, and storage.
4. Mock outside services at HTTP. Third-party websites and APIs should use realistic HTTP fixtures. Do not mock the LLM used by the agent.
5. Use normal assertions on stable results: structured output, tool calls, database rows, HTTP requests, and visible effects. Do not assert exact model prose, prompts, or mock call counts.
6. Use the repository's live-test setup. Skip when credentials are missing, set a timeout, and report the exact test command.

Do not replace this test with unit tests. Do not add an LLM judge or scoring system when normal assertions are enough.
