# ast-grep Codification

Use this reference when a Garfield finding is a stable syntax-level pattern that general-purpose linters do not already cover well. Keep this file flat under `references/`; add new examples here until the examples become too large to scan quickly.

The example rule shapes in this file were smoke-tested against ast-grep 0.43.0 with `ast-grep test --skip-snapshot-tests`. Still confirm node kinds and fixtures in the target repo before CI gating.

## Good Fits

| Finding shape | Why ast-grep fits | Rollout default |
| --- | --- | --- |
| Banned call/import/API shape | The bad pattern has a concrete AST shape. | `must codify` when repeated or high impact. |
| Required wrapper/context | Relational rules can check `inside`, `has`, `follows`, or `precedes`. | `should codify` with valid/invalid fixtures. |
| Migration guard | The old syntax should disappear and stay gone. | `must codify` after baseline cleanup. |
| Comment/JSDoc presence near exported boundaries | The requirement is structural, not semantic. | `should` or `maybe codify` depending on false positives. |

## Poor Fits

| Finding shape | Reason |
| --- | --- |
| Comment is useful, current, or non-obvious | Requires human judgment. |
| Interface name is "good" domain language | Usually semantic and context-dependent. |
| Function should exist at a different abstraction level | Architecture judgment, not just syntax. |
| Policy applies only because of product intent | Garfield should keep reviewing it unless the intent has a stable code signal. |

## Rule Shape Checklist

- Prefer existing lint/type tools first; use ast-grep for repo-specific AST invariants.
- Write the rule against the smallest stable AST node.
- Scope rules with `files` and `ignores`; avoid broad repository-wide rules until baselined.
- Add `message`, `severity`, and `note` that explain the policy, not just the syntax.
- Require valid and invalid examples before recommending CI failure.
- Start as warning or changed-files-only when the baseline is unknown.
- Allow narrow suppressions with `ast-grep-ignore` only when the exception is documented in review.

## Project Shape

```yaml
# sgconfig.yml
ruleDirs:
  - ast-grep-rules
testConfigs:
  - testDir: ast-grep-rule-tests
```

Use flat, repo-local paths unless the repo already has a different convention. Wire ast-grep into the repo's existing generalized runner when possible, such as `lint` or `check`. If the repo already splits lint commands by tool, use one aggregate command such as `lint:ast-grep`; do not add finding-specific commands such as `lint:comments`, `lint:interfaces`, or `lint:policies`.

## Comment Policy Examples

These examples are starting points for codification plans, not universal rules. Confirm node kinds in the ast-grep playground or with local rule tests for the target language and parser version.

### Exported Function Lacks Nearby JSDoc

Use when Garfield repeatedly finds missing intent comments on exported TypeScript functions.

```yaml
id: require-jsdoc-exported-function
language: TypeScript
severity: warning
message: Exported functions need a brief JSDoc comment explaining intent.
note: Add a short comment that explains why this function exists at the module boundary.
rule:
  all:
    - pattern: export function $NAME($$$ARGS) { $$$BODY }
    - not:
        follows:
          regex: "/\\*\\*[\\s\\S]*\\*/"
          stopBy: neighbor
files:
  - "src/**/*.ts"
ignores:
  - "**/*.test.ts"
  - "**/*.spec.ts"
```

Rollout notes:
- Treat this as `should codify` when the repo has a public/internal boundary convention.
- Keep it warning-level until rule tests prove it does not flag generated code, overload signatures, re-export barrels, or obvious leaf helpers.
- Prefer an ESLint JSDoc rule instead when the repo already uses ESLint deeply and the existing plugin catches the exact boundary.

### Exported Interface Lacks Boundary Comment

Use only if the policy explicitly requires comments on exported interfaces or Garfield repeatedly flags undocumented interface boundaries.

```yaml
id: require-comment-exported-interface
language: TypeScript
severity: warning
message: Exported interfaces need a short boundary comment.
note: Explain ownership, lifecycle, security, or invariants when the interface is part of a public module contract.
rule:
  all:
    - pattern: export interface $NAME { $$$BODY }
    - not:
        follows:
          regex: "/\\*\\*[\\s\\S]*\\*/"
          stopBy: neighbor
files:
  - "src/**/*.ts"
ignores:
  - "**/*.test.ts"
  - "**/*.spec.ts"
```

Rollout notes:
- Classify as `maybe codify` unless the repo policy names exported interfaces directly.
- Do not apply to all interfaces by default; private type shapes often do not need comments.
- If the repo uses `type` aliases for object interfaces, add a separate tested rule rather than broadening this one blindly.

### Private Internal Interface Function Lacks JSDoc

Use when a repeated Garfield finding has a stable syntax or naming signal for internal interfaces, such as handlers, factories, signing helpers, storage-format functions, retry/session policy, or durable state transitions.

```yaml
id: require-jsdoc-private-policy-function
language: TypeScript
severity: warning
message: Internal interface functions need JSDoc when they define policy or boundary behavior.
note: Add a short comment explaining the invariant, ownership, or retry/session/storage policy.
rule:
  all:
    - any:
        - pattern: function $NAME($$$ARGS) { $$$BODY }
        - pattern: const $NAME = ($$$ARGS) => { $$$BODY }
    - has:
        field: name
        regex: "(Handler|Factory|Signer|Storage|Retry|Resume|Session|Compaction|Gate)$"
    - not:
        follows:
          regex: "/\\*\\*[\\s\\S]*\\*/"
          stopBy: neighbor
files:
  - "src/**/*.ts"
ignores:
  - "**/*.test.ts"
  - "**/*.spec.ts"
```

Rollout notes:
- Usually `maybe codify`; naming heuristics can be noisy.
- Prefer several narrow rules from actual Garfield examples over one broad suffix rule.
- Do not codify small obvious leaf helpers.

## Rule Test Template

```yaml
id: require-jsdoc-exported-function
valid:
  - |
    /** Starts durable work from an owned request boundary. */
    export function dispatch(request: Request) {
      return request.url
    }
invalid:
  - |
    export function dispatch(request: Request) {
      return request.url
    }
```

Run rule tests before recommending CI gating:

```bash
ast-grep test --skip-snapshot-tests
```

## Codify Output Hints

Use this wording in `garfield-codify` plans:

```text
- Missing boundary JSDoc on exported functions -> ast-grep require-jsdoc-exported-function [lint/CI]
  why: the finding is structural and repo-specific; ast-grep can test the exported function shape and nearby JSDoc without custom scripts.
  risk: medium false-positive risk until fixtures cover generated files, overloads, barrels, and test files.
  slice: add sgconfig, one warning-level rule, and valid/invalid rule tests; wire into existing `lint` or one aggregate `lint:ast-grep` command before CI gating.
```

Do not present ast-grep examples as drop-in final rules unless they were tested in the target repo.
