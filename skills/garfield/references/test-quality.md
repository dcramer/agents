# Test Quality Policy

## Intent

Tests should prove real product contracts with the least brittle machinery. Agents should prefer moving, narrowing, or deleting weak tests over adding more low-fidelity coverage.

## Policy

- Classify the contract before judging coverage. Use repo-native layers when available; otherwise map to: end-to-end/user-facing behavior, integration for real wiring and external boundaries, component for deterministic cross-module contracts, and unit for local deterministic invariants.
- Do not default to unit tests for product behavior because they are easy to write. Use the highest-fidelity layer that still gives deterministic, maintainable feedback.
- Prefer one strong contract test over repeated branch or permutation tests. Flag lower-fidelity duplicates when a higher-fidelity test already proves the same user-visible or external contract.
- Default to real modules, shared fixtures, in-memory adapters, test clients/servers, and protocol-level HTTP interception such as MSW before using module or global function mocks.
- Mock one explicit boundary only. Broad module mocks, global `fetch` mocks, mutable singleton seams, and generic dependency bags usually indicate the test is in the wrong layer.
- Use explicit harness ports named for real boundaries such as model reply generation, queue wakeups, state storage, HTTP, sandbox execution, or external delivery.
- Do not add production dependency parameters merely to replace `fs`, `path`, clocks, environment access, instrumentation, or ordinary local helpers in tests.
- Assert outcomes, durable state, external payload contracts, or user-visible behavior, not internal calls, call counts, prompt prose, implementation identifiers, logs, spans, Sentry events, metrics, analytics, tracing, or telemetry unless that instrumentation output is the explicitly requested contract.
- Centralize recurring setup in shared fixtures with narrow read-only inspection such as outboxes or captured deliveries; avoid fixtures that expose broad mutable internals.
- When test files, fixtures, package scripts, or boundary checks change, verify renamed commands, coverage scripts, and generated test artifacts still point at the new names.
- Prefer deleting, moving, or narrowing weak tests before adding tests. Add tests only for requested behavior, existing contracts, real regressions, or realistic boundaries touched by the slice.

## Exceptions

- Local fakes or module mocks are acceptable for one explicit boundary in a pure unit or component invariant when no shared adapter expresses the case clearly.
- Third-party SDK clients and nondeterministic system boundaries may be mocked when a protocol-level interceptor or shared test adapter is impractical.
