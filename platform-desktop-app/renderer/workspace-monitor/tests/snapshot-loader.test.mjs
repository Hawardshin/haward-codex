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

test("SnapshotLoader keeps an intentional startup warmup window before showing the shell", () => {
  const source = readFileSync(path.join(root, "components", "SnapshotLoader.tsx"), "utf8");

  assert.match(source, /const STARTUP_PREWARM_MIN_MS = 850/);
  assert.match(source, /waitForStartupPrewarmWindow\(\)/);
  assert.match(source, /const \[snapshot\] = await Promise\.all\(\[[\s\S]*?snapshotPromise[\s\S]*?waitForStartupPrewarmWindow\(\)[\s\S]*?\]\)/);
  assert.match(source, /lazy\(\(\) =>[\s\S]*?import\("\.\/MonitorShellBoundary"\)/);
  assert.match(source, /<Suspense fallback=\{<SnapshotLoadingShell detail="Preparing warmed work surfaces" \/>\}>/);
  assert.doesNotMatch(source, /next\/dynamic/);
  assert.doesNotMatch(source, /import\("\.\/MonitorShell"\)/);
  assert.doesNotMatch(source, /@monaco-editor\/react/);
  assert.doesNotMatch(source, /AgentCollaborationScene/);
});

test("Monitor shell boundary owns the heavy dynamic monitor import", () => {
  const source = readFileSync(path.join(root, "components", "MonitorShellBoundary.tsx"), "utf8");

  assert.match(source, /import dynamic from "next\/dynamic"/);
  assert.match(source, /import\("\.\/MonitorShell"\)/);
  assert.match(source, /Preparing warmed work surfaces/);
});
