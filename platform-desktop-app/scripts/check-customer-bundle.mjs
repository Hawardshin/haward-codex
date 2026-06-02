import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspaceRoot = path.resolve(root, "..");
const MAX_DIST_SCAN_FILES = 5000;

const EMPTY_CUSTOMER_ARRAYS = [
  "projects",
  "agents",
  "agentCatalog",
  "tasks",
  "requirements",
  "documents",
  "historyDays",
  "sourceFiles",
  "categories"
];

const ZERO_CUSTOMER_STATS = [
  "projects",
  "agents",
  "agentDefinitions",
  "activeAgents",
  "activeCollaborationTasks",
  "blockedCollaborationTasks",
  "tasks",
  "completedTasks",
  "documents",
  "requirements",
  "evaluations",
  "webSearches",
  "timingRecords",
  "historyDays",
  "unifiedOpsEvents",
  "modeGroups",
  "modeOptions",
  "claudeCodeDesignPatterns",
  "sourceFiles",
  "rootFolders"
];

const FORBIDDEN_DIST_SEGMENTS = new Set([
  "_private",
  "outputs",
  "src-tauri",
  "src",
  "components",
  "scripts",
  "agent-platform",
  "_history",
  "_requirements",
  "_specs"
]);

const FORBIDDEN_DIST_EXTENSIONS = new Set([".map", ".rs", ".ts", ".tsx", ".py", ".md", ".toml", ".yaml", ".yml"]);

export function auditCustomerSnapshot(snapshot, snapshotPath = "workspace-snapshot.json") {
  const failures = [];
  const warnings = [];

  if (snapshot.publicReview?.status !== "customer_snapshot_sanitized") {
    failures.push(`${snapshotPath}: publicReview.status must be customer_snapshot_sanitized`);
  }
  if (snapshot.repoRootName !== "customer-workspace") {
    failures.push(`${snapshotPath}: repoRootName must be customer-workspace`);
  }
  if (snapshot.viewModeCatalog?.defaultMode !== "user") {
    failures.push(`${snapshotPath}: default view mode must be user`);
  }

  for (const key of EMPTY_CUSTOMER_ARRAYS) {
    const value = snapshot[key];
    if (!Array.isArray(value)) {
      failures.push(`${snapshotPath}: ${key} must be an array`);
    } else if (value.length !== 0) {
      failures.push(`${snapshotPath}: ${key} must be empty for customer bundle, found ${value.length}`);
    }
  }

  const folderStructure = snapshot.folderStructure || {};
  for (const key of ["rootFolders", "docsCategories", "projectHomes", "historyRoots"]) {
    const value = folderStructure[key];
    if (!Array.isArray(value)) {
      failures.push(`${snapshotPath}: folderStructure.${key} must be an array`);
    } else if (value.length !== 0) {
      failures.push(`${snapshotPath}: folderStructure.${key} must be empty for customer bundle, found ${value.length}`);
    }
  }

  for (const key of ZERO_CUSTOMER_STATS) {
    const value = snapshot.stats?.[key];
    if (value !== 0) {
      failures.push(`${snapshotPath}: stats.${key} must be 0 for customer bundle, found ${String(value)}`);
    }
  }

  const serialized = JSON.stringify(snapshot);
  for (const forbidden of ["platform-desktop-app/src-tauri", "_private/", "agent-platform/src", "sourceFiles\":[{"]) {
    if (serialized.includes(forbidden)) {
      failures.push(`${snapshotPath}: forbidden internal marker found: ${forbidden}`);
    }
  }

  if (!snapshot.publicReview?.checklist?.some((item) => item.includes("sourceFiles"))) {
    warnings.push(`${snapshotPath}: publicReview checklist does not mention sourceFiles removal`);
  }

  return { failures, warnings };
}

export function scanCustomerDist(distRoot) {
  const failures = [];
  const warnings = [];
  const scannedFiles = [];

  if (!existsSync(distRoot)) {
    return {
      failures: [`frontendDist is missing: ${distRoot}`],
      warnings,
      scannedFiles
    };
  }

  function walk(currentPath) {
    if (scannedFiles.length >= MAX_DIST_SCAN_FILES) {
      warnings.push(`Stopped scanning after ${MAX_DIST_SCAN_FILES} files.`);
      return;
    }
    for (const entry of readdirSync(currentPath, { withFileTypes: true })) {
      const entryPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(distRoot, entryPath).split(path.sep).join("/");
      const segments = relativePath.split("/");
      const forbiddenSegment = segments.find((segment) => FORBIDDEN_DIST_SEGMENTS.has(segment));
      if (forbiddenSegment) {
        failures.push(`${relativePath}: forbidden customer bundle path segment ${forbiddenSegment}`);
        continue;
      }
      if (entry.isDirectory()) {
        walk(entryPath);
        continue;
      }
      if (!entry.isFile()) {
        continue;
      }
      scannedFiles.push(relativePath);
      const extension = path.extname(entry.name);
      if (FORBIDDEN_DIST_EXTENSIONS.has(extension)) {
        failures.push(`${relativePath}: forbidden source-like customer bundle extension ${extension}`);
      }
      const size = statSync(entryPath).size;
      if (size > 5_000_000) {
        warnings.push(`${relativePath}: unusually large static asset ${size} bytes`);
      }
    }
  }

  walk(distRoot);
  return { failures, warnings, scannedFiles };
}

export function runCustomerBundleAudit({ allowMissingDist = false } = {}) {
  const failures = [];
  const warnings = [];
  const tauriConfig = readJson(path.join(root, "src-tauri", "tauri.conf.json"));
  const frontendDist = path.resolve(root, "src-tauri", tauriConfig.build?.frontendDist || "");
  const publicSnapshotPath = path.join(workspaceRoot, "workspace-monitor", "public", "workspace-snapshot.json");
  const distSnapshotPath = path.join(frontendDist, "workspace-snapshot.json");
  const checkedSnapshots = [];

  for (const snapshotPath of [publicSnapshotPath, distSnapshotPath]) {
    if (!existsSync(snapshotPath)) {
      if (snapshotPath === distSnapshotPath && allowMissingDist) {
        warnings.push(`frontendDist snapshot missing but allowed before build: ${snapshotPath}`);
        continue;
      }
      failures.push(`missing customer snapshot: ${snapshotPath}`);
      continue;
    }
    const snapshot = readJson(snapshotPath);
    const result = auditCustomerSnapshot(snapshot, path.relative(workspaceRoot, snapshotPath));
    failures.push(...result.failures);
    warnings.push(...result.warnings);
    checkedSnapshots.push(path.relative(workspaceRoot, snapshotPath).split(path.sep).join("/"));
  }

  let distScan = { failures: [], warnings: [], scannedFiles: [] };
  if (existsSync(frontendDist)) {
    distScan = scanCustomerDist(frontendDist);
    failures.push(...distScan.failures);
    warnings.push(...distScan.warnings);
  } else if (allowMissingDist) {
    warnings.push(`frontendDist missing but allowed before build: ${frontendDist}`);
  } else {
    failures.push(`frontendDist is missing: ${frontendDist}`);
  }

  const report = {
    status: failures.length ? "customer_bundle_audit_failed" : "customer_bundle_ready",
    failures,
    warnings,
    checkedSnapshots,
    frontendDist: path.relative(workspaceRoot, frontendDist).split(path.sep).join("/"),
    scannedDistFiles: distScan.scannedFiles.length,
    maxDistScanFiles: MAX_DIST_SCAN_FILES,
    note: "Tauri recursively embeds frontendDist assets, so this audit checks the customer static output before it is embedded."
  };
  return report;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function parseArgs(argv) {
  return {
    allowMissingDist: argv.includes("--allow-missing-dist")
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = runCustomerBundleAudit(parseArgs(process.argv.slice(2)));
  console.log(JSON.stringify(report, null, 2));
  if (report.failures.length) {
    process.exitCode = 1;
  }
}
