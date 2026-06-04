import assert from "node:assert/strict";
import { test } from "node:test";

import { readInitialSectionFromParts } from "../lib/section-location.mjs";

test("readInitialSectionFromParts normalizes hash and query section values", () => {
  assert.equal(readInitialSectionFromParts("", "#section-agents"), "agents");
  assert.equal(readInitialSectionFromParts("?section=desktop", "#section-agents"), "desktop");
  assert.equal(readInitialSectionFromParts("?section=section-source", ""), "source");
  assert.equal(readInitialSectionFromParts("", "#section-agent%20core"), "agent core");
});

test("readInitialSectionFromParts does not throw on malformed percent encoding", () => {
  assert.doesNotThrow(() => readInitialSectionFromParts("", "#section-%"));
  assert.equal(readInitialSectionFromParts("", "#section-%"), "%");
});
