# Garfield

## Intent

Garfield is a user-invoked implementation hardening loop. After a meaningful code slice, it reviews only the current diff and directly related evidence, delegates focused review tasks to no-edit subagents, coordinates their findings, applies the smallest intent-preserving fixes, validates the result, and repeats until current-diff-caused material concerns are resolved or explicitly blocked.

The loop is skeptical of speculative work. It distinguishes regressions and required omissions from pre-existing debt, resolves bundled and source-app review policies by intent and scope, preserves unrelated user changes, and reports a concise readiness result.

## Triggers

- **SHOULD** run when the user explicitly asks to run Garfield during implementation, after a meaningful feature or fix slice, or asks for Garfield's review-fix-verify loop before handoff.
- **SHOULD** run when the user explicitly asks Garfield to check the slice against relevant specs, repository instructions, source-app policies, bundled policies, tests, types, generated artifacts, or dependencies.
- **SHOULD NOT** run automatically merely because an implementation slice is complete.
- **SHOULD NOT** run for a standalone review with no implementation authority, a PR CI/reviewer iteration loop, broad maintainability cleanup, non-code brainstorming, documentation-only explanation, or skill authoring.

## Behaviors

### Behavior: Slice framing

The agent SHALL inspect the current status and diff, repository instructions, relevant specs and documentation, tests, generated and dependency artifacts, available validation commands, and intentional tradeoffs, then snapshot the requested behavior, intended changes, compatibility expectations, touched areas, and non-goals before starting review.

#### Scenario: Frame a feature slice with unrelated work present

- **GIVEN** a repository with a completed CLI flag slice and an unrelated dirty file
- **WHEN** the user asks to run Garfield on the slice
- **THEN** the agent scopes the review to the slice and directly related files, records the core intent and non-goals, and preserves the unrelated change

### Behavior: Effective review plan

The agent SHALL build one effective review plan by discovering sorted source-app `policies/**/*.md` files except policy support documents, comparing their intent and scope with bundled policies, omitting superseded bundled policies, retaining supplemental policies, classifying every candidate review task as applicable or skipped from concrete diff evidence, and routing each applicable native task with its ownership and quality-brake guidance.

#### Scenario: Local testing policy supersedes a bundled policy

- **GIVEN** a test-changing slice and a repo-wide `policies/testing.md` that governs substantially the same concern as Garfield's bundled test-quality policy
- **WHEN** Garfield plans its reviewers
- **THEN** the plan marks behavior/spec, repository-instructions, and validation review applicable, omits the bundled test-quality policy as superseded, includes the local testing policy, routes each native reviewer with its concern boundaries, and records diff-based reasons for every remaining applicable or skipped candidate

### Behavior: Bounded review delegation

The agent SHALL assign one no-edit subagent to every applicable review task or effective policy, process the queue with at most three Garfield review subagents open at once, drain completed reviewers before refilling capacity, and stop with a blocker if required subagent capacity remains unavailable.

#### Scenario: More reviewers than available Garfield slots

- **GIVEN** five applicable review tasks and capacity for three concurrent Garfield subagents
- **WHEN** review begins
- **THEN** the agent runs a rolling spawn, wait, collect, and refill sequence without opening more than three reviewers, editing through reviewers, or silently dropping a task

### Behavior: Evidence-grounded triage

The agent SHALL independently judge reviewer output and accept a finding only when it is concrete, evidence-labeled, current-diff-caused or a required omission, materially severe, and fixable without expanding the requested behavior; it SHALL cluster reports with the same stable locator and underlying cause into one owned concern, distinguish acceptance of the demonstrated defect from acceptance of the suggested remedy, reject vague or preference-only findings, and defer valid pre-existing or out-of-intent concerns.

#### Scenario: Mixed actionable and expanding findings

- **GIVEN** behavior/spec and validation reviewers report the same changed-file contract mismatch with different remedies, alongside one vague refactor preference and one valid pre-existing hardening opportunity
- **WHEN** the agent coordinates the findings
- **THEN** it records one owned contract concern with both evidence sources, accepts only a proportionate remedy, rejects the vague preference, and defers the pre-existing hardening instead of implementing parallel fixes

### Behavior: Intent-preserving repair

The agent SHALL apply only the smallest accepted blocker, high, or eligible medium fixes that preserve the core intent and unrelated user work; before adding a validator, trigger, cache, compatibility layer, wrapper, state field, or elaborate test harness, it SHALL compare a smaller boundary, type, transaction, assertion, deletion, or existing-test repair, and it SHALL preserve permission, security, idempotency, lock-order, migration, and durable-integrity checks unless the establishing invariant and its lifetime are proved.

#### Scenario: Repair a local regression without broad hardening

- **GIVEN** a slice introduced a failing null path, one reviewer proposes a compatibility fallback, and another proposes removing a locked-row authorization recheck because current callers already checked permission
- **WHEN** the agent repairs accepted findings
- **THEN** it fixes the introduced null-path regression at the narrowest existing boundary, leaves unrelated changes untouched, defers the compatibility fallback, and preserves the authorization recheck absent proof that its invariant remains valid for the transaction lifetime

### Behavior: Targeted validation and stopping

The agent SHALL run the smallest relevant tests, type checks, linters, builds, schema checks, generated-artifact checks, or explicit blockers after repairs, recompute review applicability from each repair delta, and rerun only the affected concern owners and newly applicable lanes until no current-diff-caused blocker, high, or medium concerns remain, while always rerunning behavior/spec after behavior-changing repairs and stopping on repeated concerns, lack of progress, clarification needs, or out-of-intent redesign.

#### Scenario: Material repair requires another review cycle

- **GIVEN** Garfield accepted and repaired a high-severity generated-schema defect without changing comments, dependencies, or unrelated interfaces
- **WHEN** targeted validation passes after the repair
- **THEN** the agent reruns behavior/spec and generated/dependencies review, does not restart unaffected comment, dependency, or interface reviews, and stops only after material concerns are cleared, validation passes, or a defined blocker is reported

### Behavior: Independent verification

The agent SHALL drain review agents and use a separate no-edit verification advisor when validation is uncertain, the slice is risky, generated or dependency artifacts changed, or the final readiness pass needs independent evidence, limiting that advisor to checking intent preservation, validation sufficiency, required checks, and deferred-finding rationale.

#### Scenario: Generated artifact change needs verification

- **GIVEN** a slice changes a schema and generated client output
- **WHEN** review findings are resolved and targeted validation finishes
- **THEN** the agent drains review agents, asks a separate verification advisor to assess the evidence without re-reviewing or editing, and addresses any material verification gap

### Behavior: Concise handoff

The agent SHALL report only `garfield: pass` or `garfield: blocked`, validation commands and results, the independent verification result when run or non-obviously skipped, residual accepted or deferred blocker, high, or medium concerns, and deferred adjacent or unclear behavior changes.

#### Scenario: Passing slice

- **GIVEN** all material findings are resolved and targeted validation passes
- **WHEN** Garfield hands the slice back to the user
- **THEN** the final report says `garfield: pass`, lists the validation results and applicable verification result, and omits cycle logs and low-severity bookkeeping

## Constraints

### Constraint: Explicit invocation

The agent MUST NOT activate Garfield unless the user explicitly invokes it.

### Constraint: No unauthorized expansion

The agent MUST NOT introduce behavior changes, speculative hardening, broad rewrites, or unrelated cleanup outside the core user or PR intent.

### Constraint: No implicit reviewer authority

The agent MUST NOT let review subagents edit the workspace or accept their findings without coordinator validation.

### Constraint: No review-induced accretion

The agent MUST NOT implement duplicate fixes or add comments, tests, wrappers, compatibility paths, persistent mechanisms, or test harnesses solely to satisfy overlapping reviewer suggestions without a distinct current-diff contract or proportionate need.
