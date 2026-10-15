# Inbox Triage Rules

Private sender lists for the inbox-triage skill. Keep this file outside any shared repository (default: `~/.config/inbox-triage/rules.md`).

Match entries against the sender address. A bare domain (`example.com`) matches that domain and its subdomains; a full address matches only that sender. Add a short note after `—` so later corrections stay explainable.

## Owner

- Address: you@example.com
- Organization domains: example.com

## Skip in search

Senders excluded from the search query because they are never spam (high-volume internal and tooling mail).

- github.com — code review notifications

## Always keep

Subscriptions and senders that look like marketing but are wanted. These override every spam signal.

- mentions.example.com — brand-mention digest the team pays for

## Always spam

Senders the owner has confirmed as spam. Mark without further judgment.

- news.example.com — unwanted newsletter

## Notes

Owner preferences that refine the built-in categories, for example "unsolicited job applications are spam" or "podcast requests are never spam".
