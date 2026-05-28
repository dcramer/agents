# Agent Instructions

## Repository Shape
- `skills/` contains reusable agent skills.
- Each skill lives at `skills/<name>/`.
- `SKILL.md` contains runtime instructions and must start with skill frontmatter.
- `SPEC.md` contains the maintenance contract for non-trivial skills.
- `SOURCES.md` contains provenance, decisions, gaps, and changelog entries.

## External References
| Need | File |
|------|------|
| Repo purpose and installation entrypoint | `README.md` |
| Code cleanup skill contract | `skills/code-cleanup/SPEC.md` |

## Conventions
- Keep runtime skill guidance portable; use skill-root-relative paths.
- Add `references/`, `scripts/`, or `assets/` under a skill only when they have a concrete runtime purpose.
- Do not add hosting or deployment config, including `CNAME`, unless explicitly requested.
- Keep docs concise and actionable; prefer checklists and tables over prose.

## Validation
- No repo package manager or standard test command is defined yet.
- For skill changes, run the relevant structural validator when available and report the exact command and result.
