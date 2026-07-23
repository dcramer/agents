import assert from "node:assert/strict";
import test from "node:test";

import { toMessage } from "../src/adapter.mjs";

test("normalizes a provider message", () => {
  assert.deepEqual(toMessage({ id: 12, text: "hello" }), {
    id: "12",
    text: "hello",
  });
});
