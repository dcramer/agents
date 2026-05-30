# Thermo-Nuclear Code Quality Review Specification

## Intent

`thermo-nuclear-code-quality-review` is a vendored review skill for unusually strict maintainability audits. It should push agents to find structural simplifications, challenge sprawling files, and block spaghetti growth that makes a branch harder to reason about.

## Scope

In scope:
- branch, PR, or diff review
- maintainability and abstraction-quality findings
- structural simplification opportunities
- file-size, decomposition, boundary, type-contract, orchestration, and canonical-helper concerns
- direct review feedback that preserves behavior

Out of scope:
- broad product or requirements changes
- cosmetic-only nits when larger structural issues exist
- security-only or correctness-only review that ignores maintainability
- editing code unless the user explicitly asks for implementation changes
- replacing repo-specific instructions or review formats

## Users And Trigger Context

- Primary users: engineers asking for a harsh maintainability review or deep code-quality audit.
- Common user requests: "run a thermo-nuclear code quality review", "do a thermonuclear review", "be especially harsh about maintainability", "audit this PR for spaghetti and bad abstractions".
- Should not trigger for: ordinary implementation work, light cleanup, general explanations, non-code documentation review, or requests to create/update skills.

## Runtime Contract

- Required first actions: establish the review target, inspect the current branch or diff, and read nearby repo instructions before judging architecture.
- Required outputs: high-conviction findings ordered by structural severity, with explicit calls for decomposition or reframing when warranted.
- Non-negotiable constraints: preserve behavior, avoid low-value nits when structural problems exist, do not approve just because behavior appears correct, and treat major maintainability regressions as presumptive blockers.
- Expected bundled files loaded at runtime: `SKILL.md` only.

## Source And Evidence Model

Authoritative sources:
- upstream Cursor Team Kit `thermo-nuclear-code-quality-review` skill
- local repo instructions and code under review
- relevant tests, build output, type checks, and branch diffs

Useful improvement sources:
- review examples where structural feedback led to materially simpler code
- negative examples where the skill overreached into preference or product behavior
- recurring PR feedback about file sprawl, branching complexity, abstractions, or layer violations
- upstream Cursor skill revisions

Data that must not be stored:
- secrets
- customer data
- private URLs or identifiers not needed for reproduction

## Reference Architecture

- `SKILL.md` contains: vendored runtime instructions.
- `README.md` contains: concise attribution for the vendored skill.
- `references/` contains: nothing yet.
- `scripts/` contains: nothing yet.
- `assets/` contains: nothing yet.
- `SOURCES.md` contains: upstream provenance, adaptation decisions, attribution, license notice, and changelog.

## Validation

- Lightweight validation: run the skill structural validator and manually inspect that frontmatter, trigger wording, and bundled file references remain valid.
- Deeper validation: compare outputs against real PR reviews and verify the skill surfaces structural issues without inventing behavior changes.
- Acceptance gates: valid frontmatter, clear trigger scope, no missing runtime references, source attribution retained, and upstream license notice retained.

## Known Limitations

- The vendored `disable-model-invocation: true` frontmatter is retained from Cursor. Consumers that do not support it may ignore it.
- The skill is intentionally severe and can be too aggressive for light review requests.
- The 1000-line file threshold is a heuristic, not a universal architecture law.

## Maintenance Notes

- When updating from upstream, record the upstream URL, blob SHA, commit SHA, license status, and adaptation notes in `SOURCES.md`.
- Keep runtime changes separate from provenance changes.
- If modifying the vendored `SKILL.md`, add a clear modification note in `SOURCES.md`.
