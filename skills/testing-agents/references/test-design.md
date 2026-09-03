# Agent Test Design Reference

Use this reference while authoring or reviewing an agent test. Adapt APIs and commands to the repository instead of introducing a second harness.

## Choose the owning layer

| Contract | Primary layer | Model setup | Oracle |
|---|---|---|---|
| Pure parsing, scoring, retry math, schema conversion | Unit | None | Exact values or properties |
| Tool implementation, transport payload, persistence | Component or integration | None or a scripted model if the runtime must be composed | Requests, rows, artifacts, side effects |
| Fixed runtime lifecycle after a known model response | Integration | Repository-approved scripted model | Lifecycle state and visible effects |
| Tool choice, routing, continuity, grounded response, reply strategy | Agent integration or behavioral eval | Live production model path | Direct boundary assertions plus an optional semantic judge |
| Exact categorical model contract, such as `allow | ask | deny` | Focused model eval | Live model or model reviewer | Exact category assertion |
| Browser interaction that includes an agent | Browser E2E plus lower agent coverage | Use the repository's established boundary | User journey; do not duplicate lower-level agent semantics |

Give a behavior one primary owning layer. Cross-layer coverage is justified only by a different contract or failure edge.

## Match the oracle to the claim

Classify each expected outcome before writing the assertion.

| Expected outcome | Assertion style | Common mistake |
|---|---|---|
| Exact enum, schema, ID, amount, persisted row | Direct exact or partial match | Asking a judge whether it looks correct |
| Required tool and contractual arguments | `toolCalls(...)` plus partial matching | Matching raw provider events or incidental call count |
| Set of effects where order is irrelevant | Set or `arrayContaining` match | Requiring the model's execution order |
| One required identifier in otherwise variable prose | Direct containment or pattern assertion | Judging an objectively searchable token |
| Meaning, completeness, tone, or grounded explanation | Narrow semantic rubric or factuality judge | Exact prose snapshots or substring soup |
| Logs, spans, token counts, timing | Assert only for an instrumentation or budget contract | Treating diagnostics as product behavior |

Bounded structural variation often needs a partial matcher, not a judge. A tool call may be deterministic while its position among exploratory calls is not.

## Vitest Evals: mixed assertions

This example uses one run and assigns each claim to the right oracle. The refund status and tool arguments are fixed contracts. The explanation can vary in wording, so factuality is judged separately.

```ts
import { expect } from "vitest";
import { aiSdkJudgeHarness } from "@vitest-evals/harness-ai-sdk";
import {
  describeEval,
  FactualityJudge,
  toolCalls,
} from "vitest-evals";
import { model } from "./models";
import { refundHarness } from "./refund-harness";

const factualityJudge = FactualityJudge({
  judgeHarness: aiSdkJudgeHarness({ model, temperature: 0 }),
});

describeEval(
  "refund agent",
  {
    harness: refundHarness,
    skipIf: () => !process.env.AI_PROVIDER_KEY,
  },
  (it) => {
    it("when an invoice is refundable, approve the full refund", async ({ run }) => {
      const result = await run("Please refund invoice inv_123.");

      expect(result.output).toMatchObject({
        invoiceId: "inv_123",
        status: "approved",
        amountCents: 4200,
      });
      expect(toolCalls(result)).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: "createRefund",
            arguments: expect.objectContaining({
              invoiceId: "inv_123",
              amountCents: 4200,
            }),
          }),
        ]),
      );
      await expect(result).toSatisfyJudge(factualityJudge, {
        expected: "The response says invoice inv_123 was refunded for $42.",
        threshold: 0.6,
      });
    });
  },
);
```

Use `toolCalls(result)`, `assistantMessages(result)`, and other normalized projections. Do not walk provider-specific payloads when the harness already normalizes them. Do not call the app harness again from a judge unless the second execution is intentional.

For deterministic-only cases, omit the judge entirely:

```ts
it("when asked for a reaction only, react without posting", async ({ run }) => {
  const result = await run("Add a heart reaction; do not reply.");

  expect(toolCalls(result)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name: "addReaction" }),
    ]),
  );
  expect(result.output.posts).toEqual([]);
  expect(result.output.reactions).toContain("heart");
});
```

Exact tool order is appropriate only when ordering is the behavior, such as requiring authorization before a mutation.

## Write useful semantic rubrics

Judge only a property that a deterministic assertion cannot establish reliably. Prefer a few independent, observable bullets.

```ts
const criteria = {
  pass: [
    "The answer identifies the current incident status.",
    "The answer distinguishes confirmed facts from unresolved questions.",
  ],
  fail: [
    "The answer invents an owner or resolution time.",
  ],
};
```

Avoid broad criteria such as “The answer is good,” copied expected prose, requirements about hidden reasoning, or rubric bullets for tool calls and rows the test can inspect directly. Feed the judge only the user-visible output needed for its decision; keep tools, storage, logs, and traces out unless that evidence is explicitly being evaluated.

## Prevent overfitting

- Write natural user inputs. Do not tell the agent which internal tool, command, or reasoning path to use unless that choice is the contract.
- Never copy a failing fixture's message, proper noun, expected answer, or distinctive phrase into a production prompt.
- State the general product rule exposed by a failure before changing prompts or tools. Make the smallest rule-level fix.
- Check the fix against a materially different example. A paraphrase with the same rare nouns is not a meaningful holdout.
- Prefer representative outcomes: a normal success, a realistic failure, and a safety or irreversible edge when each represents a distinct contract. Do not mirror implementation branches.
- When repeatedly tuning prompts or routing, separate development cases from protected holdouts. Run holdouts less often, refresh them with new real-world failures, and do not optimize case by case against their contents.
- Version or record the scenario set, model configuration, product prompt, harness, and judge configuration so score comparisons remain interpretable.

## Treat nondeterminism as evidence

- Pin the evaluation configuration needed for comparison, but test the production sampling behavior when that behavior matters. Temperature zero reduces variance; it does not make a served LLM a deterministic function.
- Keep hard invariants hard. A mutation safety failure or wrong categorical policy decision should not disappear into an average quality score.
- For qualitative suites, calibrate any aggregate pass-rate or score floor from baseline runs and observed variance. Report case distributions and important slices, not only one mean.
- Use repeated trials when the decision depends on run-to-run variance, not as an automatic tax on every case. Never rerun until one attempt passes.
- Report provider, timeout, credential, replay, or harness failures separately from product-quality misses.
- Preserve the normalized session and report artifact needed to diagnose failures. Set a bounded timeout and report the exact repository command.

## Review checklist

- Does the test name one user-visible or system contract?
- Would the test fail for the regression it claims to prevent?
- Is the production entry point exercised at the right layer?
- Is each deterministic fact asserted directly?
- Is each semantic criterion impossible or misleading to assert deterministically?
- Are order, counts, exact prose, and internal names asserted only when contractual?
- Could the product pass because the fixture leaked into its prompt or tools?
- Does the scenario add a distinct outcome rather than duplicate nearby coverage?
- Are external fakes realistic and placed only at repository-approved boundaries?
- Are timeouts, credentials, replay, thresholds, and run commands explicit?
