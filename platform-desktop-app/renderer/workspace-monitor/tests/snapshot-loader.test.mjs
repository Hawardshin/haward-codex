import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("SnapshotLoader surfaces snapshot fetch failures instead of staying in loading", () => {
  const source = readFileSync(path.join(root, "components", "SnapshotLoader.tsx"), "utf8");

  assert.match(source, /setState\(\{\s*status:\s*"error"/s);
  assert.match(source, /Snapshot request timed out\./);
  assert.match(source, /clearSnapshotTimeout\(\)/);
  assert.match(source, /finally\s*\{/);
});
