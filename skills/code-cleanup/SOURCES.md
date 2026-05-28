# Code Cleanup Sources

## Source Inventory

| Source | Trust | Contribution | Usage |
| --- | --- | --- | --- |
| User seed prompt in setup request | High | Defines adversarial cleanup intent, original-intent constraint, policy maintenance, and verification requirement. | Adapted into runtime workflow and rubric. |
| Local `skill-writer` skill instructions | High | Required workflow for creating and validating skills. | Used for artifact layout, synthesis, authoring, description, and validation steps. |
| `skill-writer/references/mode-selection.md` | High | New skill requires synthesis, authoring, description optimization, and validation. | Drove selected path. |
| `skill-writer/references/execution-shapes.md` | High | Prefer simplest adequate inline guidance shape. | Drove no references or scripts for v1. |
| `skill-writer/references/layout-inline-skill.md` | High | Inline layout fits one coherent checklist. | Drove `SKILL.md`-only runtime design. |
| `skill-writer/references/authoring-path.md` | High | Frontmatter, compact runtime guidance, and `SPEC.md` expectations. | Drove file contents. |
| `skill-writer/references/reference-architecture.md` | High | Separates runtime, maintenance, provenance, and optional references. | Drove `SKILL.md`, `SPEC.md`, and `SOURCES.md` boundaries. |
| `skill-writer/references/spec-template.md` | High | Defines maintenance contract shape. | Drove `SPEC.md`. |
| `skill-writer/references/description-optimization.md` | High | Trigger wording and false-positive checks. | Drove final description. |
| `skill-writer/references/registration-validation.md` | High | Registration and validation expectations. | Drove selected `skills/code-cleanup` root and validation. |
| Local repo inspection | High | Repo had no prior skill layout and user explicitly requested `skills/`. | Drove canonical root. |

## Adaptation Notes

| Decision | Result |
| --- | --- |
| Source intent | Cause an adversarial review that removes complexity, increases reliability, maintains policies, verifies changes, and preserves original intent. |
| Local target | A portable skill for branch or diff review in this repo's `skills/` tree. |
| Fidelity boundary | Keep adversarial review, simplification, reliability, repo policy, verification, and intent preservation. |
| Local replacement | Converted a single prompt into a compact ordered workflow, rubric, and output contract. |
| Omitted material | No provider-specific mechanics, scripts, or references; the behavior is short enough for inline guidance. |
| Rights and attribution | User-authored seed prompt; no external licensed text bundled. |

## Synthesis Decisions

| Decision | Status | Rationale |
| --- | --- | --- |
| Skill class: `workflow-process` | adopted | The skill is a repeatable branch review operation with ordered flow, failure handling, and verification. |
| Primary shape: `inline-guidance` | adopted | One coherent runtime checklist is enough; optional deep references would add ceremony. |
| Secondary shape: fixed ordered steps | adopted | Review quality depends on establishing target, preserving intent, reviewing, verifying, then reporting. |
| Scripts or validators inside skill | rejected | No repeatable parsing or automation is required beyond repo-local test commands. |
| Provider-specific mechanics | rejected | The skill should work across agent runtimes. |
| `SPEC.md` | adopted | New skill has non-trivial scope, trigger, evidence, and validation expectations. |
| Runtime references | deferred | Add only after real examples show a branch-specific lookup need. |

## Coverage Matrix

| Dimension | Covered By | Status |
| --- | --- | --- |
| Preconditions | Establish review target and read repo instructions. | covered |
| Ordered flow | Workflow section. | covered |
| Failure handling | Ask on ambiguous base; report blocked verification. | covered |
| Safety boundaries | Review-only default and intent preservation constraints. | covered |
| Output contract | Findings, verification, cleanup opportunities. | covered |
| Policy maintenance | Repo-wide policy drift checklist. | covered |
| Portability | No provider-specific mechanics or absolute runtime paths. | covered |

## Description Optimization

Should trigger:
- "review this branch for code cleanup"
- "do an adversarial cleanup pass on my PR"
- "find unnecessary complexity in these changes"
- "check this branch for reliability and verification gaps before merge"

Should not trigger:
- "create a new skill"
- "write a feature implementation"
- "explain this function"
- "format this file"

Final description:

> Use when reviewing branch changes for code cleanup, simplification, reliability, repo policy compliance, or pre-merge hardening; performs an adversarial review that reduces layers, removes unnecessary complexity, preserves intent, and surfaces actionable verification gaps.

## Gaps

- No real positive or negative review examples have been captured yet.
- No repository-specific skill registry exists yet.
- No automated website or marketplace index exists yet.

## Changelog

- 2026-05-28: Created initial inline `code-cleanup` skill, specification, and source record.
