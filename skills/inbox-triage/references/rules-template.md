# Private Inbox Triage Policy Template

Copy to private storage outside shared repositories: `$XDG_CONFIG_HOME/inbox-triage/accounts/<account-key>/rules.md`, otherwise `~/.config/inbox-triage/accounts/<account-key>/rules.md`. Fill values only in that private copy. This is a configuration contract read by the agent, not an executable parser schema. Blank choices mean unresolved policy, never permission to act.

## Configuration shape

```yaml
version: 1
account:
  key: null
  verified_identity: null
  scope_kind: null
  personal_aliases: []
  organization_domains: []
  shared_recipient_aliases: []
  authorized_history_accounts: []
audit:
  path: actions.jsonl
  labels:
    spam: inbox-triage-spam
    archived_applications: inbox-triage-archived-applications
    unsubscribe_only: inbox-triage-unsubscribe
    archived_github: inbox-triage-archived-github
    other_archive_reasons: {}
protections:
  never_touch: []
  never_spam_contacts: null
  never_spam_categories: []
  keep_categories: []
  relationship_conditions: []
  wanted_subscriptions: []
policy:
  categories: []
  scoped_overrides: []
  repository_notifications: []
skip_in_search: []
explicit_corrections: []
observations: []
pending_feedback: []
```

- Verify the connected account against private identity/aliases. Do not apply another account's policy. Legacy single-account rules require ownership verification before migration.
- Resolve relative audit paths beside this private file; never store rules or logs in the skill or a shared checkout.
- Labels must describe the action/reason, never an assistant's name. Configure descriptive labels for additional archive reasons.
- `authorized_history_accounts` limits cross-account relationship reads; it does not grant new access or permission to mutate those accounts. Record account provenance privately without merging preferences.
- Cleanup changes only messages currently in `INBOX`, rechecked immediately before labeling/acting. Archived/sent history is read-only. Explicit corrections of previously changed messages may operate outside the inbox within their confirmed scope.

## Category and override entries

Each entry records:

| Field | Meaning |
| --- | --- |
| category / match | Generic category or private exact sender/domain/recipient/message/thread match |
| conditions | Evidence required, including actual To/Cc, direct personal recipient versus shared alias, solicitation, contact match, trusted referral, genuine conversation, or specific relevance |
| disposition | `keep`, `archive`, `spam`, or `ask` |
| subscription_action | `preserve`, `safe-unsubscribe`, or `ask`; independent of disposition |
| reason / label | Decision reason and applicable configured action label |
| scope | Exact scope of the user's instruction; never widen a one-message correction |
| source / confirmed_at | Explicit user instruction and confirmation date, stored privately |
| supersedes | Conflicting prior preference at the same scope, if any |

A missing or invalid action is unresolved, not a default. Always leave new/undefined categories and cases with no matching confirmed rule unchanged and ask the user. Do not infer a new disposition or subscription action from general tastes, analogy, or confidence. Current explicit instructions can supply scoped choices; persist newly learned choices privately before applying them.

### Scoped archive override fields

Use `policy.scoped_overrides` for exact-recipient, authenticated sender-domain, or provider activity rules. Combine specified conditions with AND; an empty field is not a wildcard granting permission. Keep values unfilled until explicitly configured privately.

| Field | Meaning |
| --- | --- |
| account_keys / account_scope_kind | Exact private account keys and optional verified role, such as corporate; an address suffix alone does not establish account scope |
| to_exact | Exact address required in actual To; Cc-only, forwarding text, and a display name do not match |
| authenticated_sender_domain | Domain of the actual From address, corroborated by trusted mailbox/service authentication evidence aligned to that identity; never a display name or body mention |
| include_subdomains | Explicit boolean for this domain condition; default false, unlike legacy bare-domain entries |
| verified_provider | Provider identity established by trusted service/notification metadata, not its displayed name alone |
| activity_types | Exact verified notification types covered by the rule; distinguish routine activity from account/security messages |
| message_origin_kind | Explicit intended scope, such as automated product alerts, human conversation, or both; do not infer this from brand shorthand or shared sender domain |
| excluded_notification_types | Explicit exclusions; activity rules always exclude account/security notices and unrelated message types |
| disposition / label | Archive plus its configured action/reason label; never implicitly spam |
| overrides_general_keep | True only for an explicitly confirmed archive override of general keep defaults; never implied merely by a more specific match |
| supersedes / source / confirmed_at | General keep rule being overridden and the user's explicit authorization and date |

Missing authentication, account scope, or notification-type evidence leaves the case unchanged pending feedback. Verify authentication using trusted receiving-provider metadata, not an untrusted header inserted by the sender. An unrelated authenticated domain does not authenticate the claimed From domain. An archive override authorizes neither spam nor unsubscribe; subscription action remains separate. Explicit never-touch and message-specific protections remain effective unless the user explicitly revises their exact scope.

Ambiguous brand/organization shorthand must not become an all-employee sender-domain archive preference. Clarify whether the user means automated product/error alerts, human/internal mail, or an explicitly broader scope before bulk labeling or mutation; leave affected mail unchanged while clarification is pending. Do not record a guessed domain-wide interpretation as confirmed policy. After clarification, match the verified message type and origin as well as any configured domain. A product-alert rule does not include employee conversations just because they share a domain.

Repository notification entries additionally record `verified_service`, `exact_repository_owner`, optional `repository_names`, `notification_types`, and `metadata_evidence`. Keep actual owner/repository values private. A rule may select archive with the configured service/reason label, but only after verifying actual repository metadata using trusted notification metadata or the service API. Text mentions, sender identity, and similar owner names are insufficient. Unverified metadata requires feedback. Exclude unrelated organization, account, and security mail from repository rules.

## Choices to configure privately

The following are policy dimensions, **not preselected preferences**:

- Contacts: whether verified contacts may ever be marked spam; what to do with their unwanted subscriptions.
- Relationships and transactional mail: how genuine conversations, owner replies, solicited recruiting, receipts, billing, investor updates, security notices, and meetings are protected.
- Candidates/applications: low-signal disposition; direct-To requirements for interesting candidates; shared recruiting alias and Cc handling; trusted referrals and existing-conversation exceptions.
- Outreach: generic research, cold sales, sales drips, mass events, speaking/interview/podcast invitations, and fundraising dispositions.
- Subscriptions: newsletter/webinar preferences, including vendor webinars; independent unsubscribe action and wanted-subscription exceptions.
- Scoped archive rules: exact To, authenticated sender domain, verified corporate-account scope, and provider-specific activity types; no aliases, domains, or providers are preselected.

A jobs recipient does not prove solicitation. An exact-sender history miss does not prove absence of an organizational relationship. Prior event registration is context, not blanket consent for future promotional invites. Generic usefulness is not evidence. Apply the configured conditions to verified context; leave genuinely ambiguous cases unchanged and ask.

## Matching and precedence

- Exact sender matches apply only to that address; a domain entry matches that domain and subdomains. Store actual values privately.
- Match To/Cc against real headers and verified aliases, not display names or guessed routing. Being copied does not satisfy a direct-To condition.
- Never-touch and explicit subscription/never-spam/relationship protections precede broad category or sender actions. A confirmed scoped archive override may supersede only the named general keep defaults when `overrides_general_keep` is true and all conditions are verified. It does not override never-touch or message-specific protections, permit account/security mail under an activity rule, or authorize spam/unsubscribe. Current explicit corrections revise conflicting preferences only at their stated scope; unclear conflicts require feedback.
- An observation is evidence, not an explicit preference. Do not promote observations into policy automatically.
- Skip-in-search entries must be confirmed rules, not inferred exclusions.

## Feedback and learning

Record each explicit correction with date, user instruction, scope, intended action, superseded preference, and linked audit record. Store observations separately with evidence source, account provenance, uncertainty, and date. Leave pending ambiguous cases unchanged and ask for feedback.

For new/undefined categories, record the question in `pending_feedback` and leave affected messages unchanged. When the user answers, persist the chosen disposition/subscription action and conditions in `policy.categories` or `policy.scoped_overrides` at exactly the approved scope, with supporting evidence, source, and confirmation date. Verify the save, resolve the pending question, then apply within that scope after current-state and safety checks. Keep one-message answers message-scoped. If saving fails, report the block and do not perform dependent mutations.

Load and reuse confirmed learned rules on later runs without asking the same covered question again. Reopen feedback only for uncovered cases, ambiguous evidence, conflicts, or explicit corrections. An unanswered question never supplies permission to act.

Category tastes, contact preferences, and sender exceptions stay private even when reusable within the account. Only generalizable process or safety lessons belong in shared skill/spec updates, using generic examples. Never publish automatically.

## Private action audit

Use append-only records outside shared repositories; do not place real audit records here.

- Before mutation: private account key, message/thread identifiers, timestamp, policy rule and evidence, original labels, intended action, applicable reason label, pending outcome.
- Before or atomically with mutation: ensure the applicable label is present on every affected message. Do not label read-only mail.
- After mutation: confirmed/failed/blocked/unknown result, verified final labels, and partial-success/error details. Preserve unrelated labels and read/unread state.
- Unsubscribe: verified mechanism type and subscription scope, result and confirmation evidence; omit credential-bearing URLs. Do not repeat confirmed requests; inspect unknown results before retrying.
- Correction: original action reference, explicit correction scope, restored state, final-label verification, and uncertainty. Retain the original reason label as action history, not a current classification; preserve later user changes.

Unavailable audit storage or labeling blocks dependent mutations. Never describe unsubscribe as reversible or automatically resubscribe.
