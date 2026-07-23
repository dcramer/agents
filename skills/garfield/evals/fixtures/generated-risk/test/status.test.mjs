import assert from "node:assert/strict";
import test from "node:test";

import { acceptsStatus } from "../src/status.mjs";

test("accepts generated statuses", () => {
  assert.equal(acceptsStatus("open"), true);
  assert.equal(acceptsStatus("closed"), true);
  assert.equal(acceptsStatus("paused"), false);
});
