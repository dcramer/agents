# Testing policy

This policy governs all tests in this repository.

- Exercise exported behavior with `node:test`.
- Use an injected clock for time-sensitive behavior.
- Avoid assertions about private helpers or call sequences.
- Extend an existing contract test when it can express the regression clearly.
