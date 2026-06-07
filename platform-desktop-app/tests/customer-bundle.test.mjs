import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";

import { auditCustomerSnapshot, auditCustomerSnapshotWithFallback, scanCustomerDist } from "../scripts/check-customer-bundle.mjs";
import { checkReleaseReadiness } from "../scripts/check-release-readiness.mjs";
import { buildPublicReleaseConfigReport } from "../scripts/public-release-config.mjs";
import { buildPublicReleaseDevEnvReport } from "../scripts/public-release-dev-env.mjs";

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
  assert.ok(
    publicReport.checks.some((check) =>
      check.label === "Bundled service-update-channel marker is checked at runtime" && check.status === "passed"
    )
  );
  assert.ok(!publicReport.blockers.includes("Bundled service-update-channel marker is checked at runtime"));
});

test("public release config accepts Tauri updater private key path env", () => {
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "public-release-config-"));
  const updaterKeyPath = path.join(tempRoot, "updater.key");
  const appleApiKeyPath = path.join(tempRoot, "AuthKey_TEST.p8");
  writeFileSync(updaterKeyPath, "dev-private-key");
  writeFileSync(appleApiKeyPath, "dev-apple-api-key");

  const report = buildPublicReleaseConfigReport({
    env: {
      APPLE_SIGNING_IDENTITY: "Developer ID Application: Example (TEAMID)",
      APPLE_API_KEY: "KEYID",
      APPLE_API_ISSUER: "ISSUERID",
      APPLE_API_KEY_PATH: appleApiKeyPath,
      TAURI_UPDATER_PUBLIC_KEY: "A".repeat(64),
      TAURI_SIGNING_PRIVATE_KEY_PATH: updaterKeyPath,
      TAURI_UPDATER_ENDPOINTS: "https://updates.example.com/agent/latest.json",
      TAURI_RELEASE_ASSET_BASE_URL: "https://updates.example.com/agent"
    }
  });

  assert.equal(report.status, "public_release_config_ready");
  assert.equal(report.blockers.length, 0);
  assert.equal(report.envSummary.updaterPrivateKeySource, "path");
  assert.equal(report.marker.updater.signing_private_key_source, "path");
});

test("public release dev env writes path-based shell exports without private key content", () => {
  const tempRoot = mkdtempSync(path.join(os.tmpdir(), "public-release-dev-env-"));
  const report = buildPublicReleaseDevEnvReport({
    writeFiles: true,
    devDir: tempRoot,
    generateKeyPair: ({ privateKeyPath, publicKeyPath }) => {
      writeFileSync(privateKeyPath, "PRIVATE-DEV-KEY-CONTENT");
      writeFileSync(publicKeyPath, "PUBLIC-DEV-KEY-CONTENT");
    }
  });

  assert.equal(report.status, "public_release_dev_env_ready");
  assert.equal(report.blockers.length, 0);
  assert.equal(report.envSummary.updaterPrivateKeyPathPresent, true);
  const envFile = readFileSync(report.paths.envFilePath, "utf8");
  assert.match(envFile, /TAURI_SIGNING_PRIVATE_KEY_PATH/);
  assert.doesNotMatch(envFile, /TAURI_SIGNING_PRIVATE_KEY=/);
  assert.doesNotMatch(envFile, /PRIVATE-DEV-KEY-CONTENT/);
  assert.match(envFile, /PUBLIC-DEV-KEY-CONTENT/);
});
