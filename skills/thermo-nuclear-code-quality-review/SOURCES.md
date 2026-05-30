# Thermo-Nuclear Code Quality Review Sources

## Source Inventory

| Source | Trust | Contribution | Usage |
| --- | --- | --- | --- |
| Cursor Team Kit upstream skill | High | Provides the full runtime review rubric, trigger description, tone, approval bar, and `disable-model-invocation` frontmatter. | Vendored into `SKILL.md` with no content changes. |
| Cursor Team Kit plugin metadata | High | Identifies author, repository, plugin license, and plugin version context. | Used for attribution and license notes. |
| Cursor Team Kit license | High | Provides upstream MIT license notice. | Retained below and referenced from README attribution. |
| Local `skill-writer` skill instructions | High | Required workflow for source adaptation, artifact layout, authoring, description optimization, and validation. | Used to add `SPEC.md`, provenance notes, and validation expectations. |
| Local repo inspection | High | Establishes `skills/<name>/` as the canonical skill root and `SPEC.md`/`SOURCES.md` as expected files for non-trivial skills. | Drove local file layout. |

## Upstream Provenance

| Field | Value |
| --- | --- |
| Source URL | https://github.com/cursor/plugins/tree/main/cursor-team-kit/skills/thermo-nuclear-code-quality-review |
| Runtime file | https://raw.githubusercontent.com/cursor/plugins/main/cursor-team-kit/skills/thermo-nuclear-code-quality-review/SKILL.md |
| Upstream file blob SHA | `ac76a2bc88bb2d895e83ab1788aa584a82346cfc` |
| Latest path commit checked | `6e3d2ea56d7d446b955eaae6ac4c8eef8bf504cf` |
| Path commit date | 2026-05-28 |
| Access date | 2026-05-30 |
| Upstream author | Cursor |
| Upstream license | MIT |
| Local status | Vendored verbatim into `SKILL.md`; local `README.md`, `SPEC.md`, and `SOURCES.md` added. |

## Adaptation Notes

| Decision | Result |
| --- | --- |
| Source intent | Drive an unusually strict maintainability review that prioritizes structural simplification, code-judo reframing, decomposition, and boundary quality. |
| Local target | A portable repo-managed skill under `skills/thermo-nuclear-code-quality-review/`. |
| Fidelity boundary | Preserve the upstream runtime rubric, prompt, review tone, output priority, and approval bar. |
| Local replacement | Add repo-local `README.md`, `SPEC.md`, and `SOURCES.md`; update root README attribution and skill list. |
| Omitted material | No upstream agent wrapper or Cursor plugin manifest was vendored because the requested artifact was the skill directory and this repo manages skills directly. |
| Provider-specific mechanics | Retained `disable-model-invocation: true` for upstream fidelity; consumers that do not support it may ignore it. |
| Rights and attribution | Root README and skill README name Cursor, link upstream, and point here for the MIT notice. |

## Synthesis Decisions

| Decision | Status | Rationale |
| --- | --- | --- |
| Skill class: `workflow-process` | adopted | The skill is a repeatable review procedure with review priorities and an approval bar. |
| Primary shape: `inline-guidance` | adopted | Upstream ships one self-contained `SKILL.md`; no runtime lookup branch is needed. |
| Secondary shape: fixed review rubric | adopted | Review quality depends on applying the standards in priority order. |
| Runtime references | rejected | The upstream skill is self-contained and this repo has no evidence requiring split references. |
| Scripts or assets | rejected | No deterministic automation is part of the upstream skill. |
| `SPEC.md` | adopted | The imported skill has non-trivial scope, trigger, evidence, validation, and maintenance expectations. |
| Verbatim vendoring | adopted | The user asked to vendor the Cursor skill, and the source is already concise enough for one runtime file. |

## Coverage Matrix

| Dimension | Covered By | Status |
| --- | --- | --- |
| Preconditions | `SPEC.md` runtime contract and upstream review framing. | covered |
| Ordered priorities | `SKILL.md` output expectations. | covered |
| Safety boundaries | Behavior-preserving review framing and review-only scope in `SPEC.md`. | covered |
| Failure handling | `SPEC.md` known limitations and validation notes. | covered |
| Source provenance | Upstream provenance table. | covered |
| Legal attribution | Root README attribution, skill README attribution, and MIT notice below. | covered |
| Portability | Provider-specific frontmatter caveat in `SPEC.md` and adaptation notes. | covered |

## Description Optimization

Should trigger:
- "run a thermo-nuclear code quality review"
- "do a thermonuclear review of this PR"
- "perform an especially harsh maintainability review"
- "audit this branch for spaghetti and abstraction problems"

Should not trigger:
- "review this typo fix"
- "implement the feature"
- "explain this function"
- "create a new skill"

Final description:

> Run an extremely strict maintainability review for abstraction quality, giant files, and spaghetti-condition growth. Use for a thermo-nuclear code quality review, thermonuclear review, deep code quality audit, or especially harsh maintainability review.

## MIT License Notice For Vendored Cursor Material

MIT License

Copyright (c) 2026 Cursor

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Gaps

- No local review examples have been captured yet.
- No automated semantic validator exists for whether the skill is too aggressive in a given repo context.
- Upstream updates are not tracked automatically.

## Changelog

- 2026-05-30: Vendored Cursor Team Kit `thermo-nuclear-code-quality-review` skill, added local README attribution, maintenance contract, provenance, and upstream MIT notice.
