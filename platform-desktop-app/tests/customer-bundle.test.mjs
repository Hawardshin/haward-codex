import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { auditCustomerSnapshot, auditCustomerSnapshotWithFallback, scanCustomerDist } from "../scripts/check-customer-bundle.mjs";
import { checkReleaseReadiness } from "../scripts/check-release-readiness.mjs";

function customerSnapshot(overrides = {}) {
  return {
    schemaVersion: "2026-06-03",
    generatedAt: "2026-06-03T00:00:00.000Z",
    repoRootName: "customer-workspace",
    stats: {
      projects: 0,
      agents: 0,
      agentDefinitions: 0,
      activeAgents: 0,
      activeCollaborationTasks: 0,
      blockedCollaborationTasks: 0,
      tasks: 0,
      completedTasks: 0,
      documents: 0,
      requirements: 0,
      evaluations: 0,
      webSearches: 0,
      timingRecords: 0,
      historyDays: 0,
      unifiedOpsEvents: 0,
      modeGroups: 0,
      modeOptions: 0,
      claudeCodeDesignPatterns: 0,
      sourceFiles: 0,
      rootFolders: 0
    },
    projects: [],
    agents: [],
    agentCatalog: [],
    tasks: [],
    requirements: [],
    documents: [],
    historyDays: [],
    sourceFiles: [],
    folderStructure: {
      rootFolders: [],
      docsCategories: [],
      projectHomes: [],
      historyRoots: []
    },
    viewModeCatalog: {
      defaultMode: "user",
      modes: []
    },
    categories: [],
    publicReview: {
      status: "customer_snapshot_sanitized",
      checklist: ["sourceFiles are removed from the installer bundle snapshot."]
    },
    ...overrides
  };
}

test("customer bundle audit accepts sanitized snapshots and rejects source content", () => {
  const clean = auditCustomerSnapshot(customerSnapshot(), "workspace-snapshot.json");
  assert.equal(clean.failures.length, 0);

  const dirty = auditCustomerSnapshot(
    customerSnapshot({
      stats: { ...customerSnapshot().stats, sourceFiles: 1 },
      sourceFiles: [{ path: "platform-desktop-app/src-tauri/src/lib.rs", content: "source" }]
    }),
    "workspace-snapshot.json"
  );
  assert.ok(dirty.failures.some((failure) => failure.includes("sourceFiles")));
  assert.ok(dirty.failures.some((failure) => failure.includes("forbidden internal marker")));
});

test("customer bundle audit can downgrade stale generated snapshots before rebuild", () => {
  const stalePublicSnapshot = customerSnapshot({
    repoRootName: "codex",
    stats: { ...customerSnapshot().stats, sourceFiles: 1 },
    sourceFiles: [{ path: "platform-desktop-app/src-tauri/src/lib.rs", content: "source" }],
    publicReview: {
      status: "review_required_before_public_deploy",
      checklist: []
    }
  });

  const allowed = auditCustomerSnapshotWithFallback(stalePublicSnapshot, customerSnapshot(), "public/workspace-snapshot.json");
  assert.equal(allowed.failures.length, 0);
  assert.equal(allowed.usedFallback, true);
  assert.ok(allowed.warnings.some((warning) => warning.includes("generated output is stale")));

  const strict = auditCustomerSnapshot(stalePublicSnapshot, "public/workspace-snapshot.json");
  assert.ok(strict.failures.some((failure) => failure.includes("publicReview.status")));
});

test("customer dist scan rejects source-like files and internal path segments", () => {
  const distRoot = mkdtempSync(path.join(os.tmpdir(), "customer-dist-"));
  mkdirSync(path.join(distRoot, "_next"), { recursive: true });
  writeFileSync(path.join(distRoot, "index.html"), "<html></html>");
  writeFileSync(path.join(distRoot, "_next", "app.js"), "console.log('ok');");

  const clean = scanCustomerDist(distRoot);
  assert.equal(clean.failures.length, 0);

  mkdirSync(path.join(distRoot, "src-tauri"), { recursive: true });
  writeFileSync(path.join(distRoot, "src-tauri", "lib.rs"), "fn main() {}");
  const dirty = scanCustomerDist(distRoot);
  assert.ok(dirty.failures.some((failure) => failure.includes("src-tauri")));
});

test("release preflight distinguishes internal and public gates", () => {
  const internal = checkReleaseReadiness({ mode: "internal", reportOnly: true });
  assert.equal(internal.status, "internal_release_preflight_ready");
  assert.ok(internal.checks.some((check) => check.label.includes("hardenedRuntime") && check.status === "passed"));

  const publicReport = checkReleaseReadiness({ mode: "public", reportOnly: true });
  assert.equal(publicReport.mode, "public");
  assert.ok(publicReport.checks.some((check) => check.label.includes("public release enables hardenedRuntime")));
});
