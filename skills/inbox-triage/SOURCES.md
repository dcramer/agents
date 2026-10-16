# Inbox Triage Sources

## Source Inventory

| Source | Trust | Contribution | Usage |
| --- | --- | --- | --- |
| Explicit workflow and architecture requirements | High | Separate reusable mechanics from private configurable policy. | Shared evidence checks, inbox scope, audit, safe unsubscribe, verification, and feedback; category/contact/sender choices remain private. |
| Explicit event-execution optimization requirements | High | Avoid per-event full-inbox scans and repeated context while retaining every protection. | Account/message routing, verified private cache reuse, bounded coalescing, separate cursor recovery, and conditional reference loading. |
| Explicit authorization and safety requirements | High | Permit verified unsubscribe, retain reversible action evidence, and correct mistakes. | Bounded mechanisms and accurate blocked/unknown outcome reporting. |
| General relationship-checking lesson | High | Exact-sender search can miss an organization relationship under another address. | Relevant organization/domain history checks across authorized accounts, preserving private provenance. |
| Local repository instructions | High | Runtime/spec/source/UI conventions and structural validation; no default eval runs. | Consistent artifacts and generic policy-conditioned behavior scenarios. |

## Decisions

- Default to supplied account/message events; bounded cleanup/recovery is a separate mode. Share fresh targeted context within account-partitioned batches, never policies or unverified decisions across accounts.
- Require unchanged policy/message/thread/evidence dependencies before decision reuse; stale or unverifiable facts require targeted reads. Missing contact/history freshness never becomes permission to act.
- Use private compact indexes and durable claims/checkpoints, preserving pending work and reversible audits. Do not infer gap coverage from the newest event or replay unknown external outcomes.
- Move detailed rule/correction guidance to a conditional reference; keep mutation invariants and the mandatory no-match feedback loop in the runtime entrypoint.
- Keep category preferences, contact never-spam choices, recipient-specific recruiting choices, and sender exceptions in private per-account policy. Ship configurable dimensions without preselecting personal tastes.
- Support private exact-owner repository notification rules using verified service/repository metadata; protect unrelated organization, account, and security mail. Treat prior event registration as context rather than blanket consent for future promotions.
- Support explicitly confirmed archive overrides for exact To, authenticated From domain, verified account role, and provider activity type. Allow named general keep defaults to be superseded for archive only; preserve never-touch/message-specific protections and exclude account/security mail from activity rules.
- Resolve ambiguous organization shorthand before bulk changes; distinguish automated product/error alerts from human/internal conversations and never infer an all-employee sender-domain policy from a brand reference.
- Separate mailbox disposition from subscription action so a configured spam protection need not prohibit an authorized opt-out.
- Restrict cleanup to current inbox messages, rechecking before labeling/mutations; archived/sent history is context only. Explicit corrections to previously changed messages are the exception.
- Use descriptive action/reason labels and private original/final-state audits. Verify actual outcomes and preserve unrelated state during corrections.
- Leave genuinely ambiguous cases unchanged and ask for feedback. Generalize only safety/process lessons into shared guidance.
- Treat every new/undefined category or no-match case as mandatory feedback: leave unchanged, persist the explicit scoped answer privately, verify the save, then apply. Reuse confirmed rules on later runs; general tastes or confidence never replace a missing rule.
- Keep shared scenarios generic and explicitly conditioned on hypothetical policies; include no addresses, real domains, subject lines, message identifiers, account identities, or private anecdotes.

## Gaps

- Connector capabilities vary: recipient/history/contact inspection, audit labels, message-level changes, and verified unsubscribe may be unavailable. Report affected operations as blocked rather than assuming success.
- The Markdown policy template is an agent-readable configuration contract, not an executable schema or classifier.
- Behavior scenarios define the contract; no live inbox or eval suite is exercised by this documentation update.
- This repository supplies instruction contracts, not a deployed event adapter/cache implementation. Actual connector call counts, model token savings, concurrency behavior, and live classification remain unbenchmarked; structural validation is not a behavioral execution test.
- Native mailbox filter creation remains out of scope.

## Changelog

- Added event-scoped routing, compact verified reuse, batched targeted reads, pending-action reconciliation, and separate cursor recovery without weakening safety or confidence requirements.
- Separated configurable private classification policy from shared workflow, evidence checks, inbox-only mutations, reason labels, safe unsubscribe, verification, and feedback.
- Added recipient/contact/organization-history checks, private audit/correction fields, and generic policy-conditioned scenarios.
- Removed obsolete blanket archive/unsubscribe prohibitions and private examples.
