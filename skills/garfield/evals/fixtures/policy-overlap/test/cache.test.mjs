import assert from "node:assert/strict";
import test from "node:test";

import { createCache } from "../src/cache.mjs";

test("loads values by key", async () => {
  const cache = createCache({ load: async (key) => `value:${key}` });
  assert.equal(await cache.get("one"), "value:one");
});
