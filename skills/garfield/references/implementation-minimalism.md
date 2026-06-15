# Implementation Minimalism Policy

## Intent

Implementation slices should solve the requested problem without accumulating speculative guardrails, fallbacks, abstractions, or tests for unlikely states. Extra handling is useful only when it protects an explicit contract, a real boundary, or a failure mode introduced by the slice.

## Policy

- Implement the smallest clear behavior that satisfies the user goal, existing contract, and validation evidence.
- Do not add defensive checks, fallback branches, retries, compatibility shims, feature flags, broad abstractions, dependency injection, or normalization for hypothetical states unless the intent requires them.
- Prefer existing invariants and ownership boundaries over rechecking impossible or already-validated conditions.
- Treat speculative edge-case handling as deferred/advisory when it would add code, tests, fixtures, or documentation beyond the requested behavior.
- Remove local guardrails, fallbacks, or adapters introduced by the slice when they are unused, unreachable, duplicative, or only support unlikely scenarios.
- Do not add tests solely to justify speculative guardrails. Tests should prove requested behavior, existing contracts, real regressions, or realistic boundary failures.

## Exceptions

- Guardrails are appropriate when required by the explicit user goal, product spec, public API contract, security or permission boundary, data integrity boundary, external system boundary, migration compatibility, or a concrete regression introduced by the slice.
- Cheap local validation is acceptable when it materially clarifies a nearby invariant without changing behavior or spreading extra test burden.
