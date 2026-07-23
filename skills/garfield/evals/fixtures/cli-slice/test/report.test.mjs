import assert from "node:assert/strict";
import test from "node:test";

import { renderReport } from "../src/report.mjs";

test("renders every record as text in input order", () => {
  const records = [
    { id: 2, title: "Second", active: false },
    { id: 1, title: "First", active: true },
  ];

  assert.equal(renderReport([], records), "2: Second\n1: First");
});
