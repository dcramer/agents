import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { statuses } from "../generated/statuses.mjs";

const schema = JSON.parse(
  await readFile(new URL("../schema/status.json", import.meta.url), "utf8"),
);

assert.deepEqual(statuses, schema.statuses);
