# Inbox Triage Sources

## Source Inventory

| Source | Trust | Contribution | Usage |
| --- | --- | --- | --- |
| Owner triage session (2026-10-15) | High | Two weeks of inbox review: the owner confirmed cold vendor pitches, event blasts, unsolicited job applications and unwanted newsletters as spam, and corrected subscriptions that looked like marketing. | Defined the spam categories, the keep-over-spam precedence, borderline handling, and the corrections loop. |
| Owner instruction "get rid of the things that are clearly people spamming me" | High | Corporate subscriptions must survive even when they look like marketing. | Made the keep list override all spam signals and "when in doubt, keep" the default. |
| Owner scheduling request | High | Recurring runs at 7am, 1pm and 5pm on weekdays. | Added the window-since-previous-run behavior so digests do not repeat. |
| Owner privacy decision | High | This repo is public; sender lists stay in a private rules file. | Split generic method (skill) from personal lists (`~/.config/inbox-triage/rules.md`). |
| Gmail connector tool surface | High | Thread search, thread read, mark/unmark thread spam; no native filter creation. | Limited mailbox changes to reversible spam marks and excluded filter building from triggers. |
| Local `AGENTS.md` and `skills/testing-agents/` | High | Repo skill shape and Skillet conventions. | Drove `spec.md`, `SKILL.md`, `SOURCES.md`, and `agents/openai.yaml`. |

## Decisions

- Mark spam rather than trash: it is reversible and trains Gmail's filter.
- Keep the owner's sender lists out of the skill; ship only a template with placeholder domains.
- Exclude podcast, interview and speaking requests from spam even when unsolicited; the owner treats them as wanted.
- Report borderline mail instead of guessing so the owner's corrections can grow the rules file.

## Gaps

- No eval cases yet; triage quality depends on live inbox content.
- Native Gmail filters are out of scope until a connector can create them.

## Changelog

- 2026-10-15: Initial skill from the owner's inbox cleanup and scheduled triage routine.
