import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkReleaseReadiness } from "./check-release-readiness.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function checkServiceReadiness({ mode = "internal", reportOnly = false } = {}) {
  const registry = readJson("configs/service-readiness-registry.json");
  const tauriConfig = readJson("src-tauri/tauri.conf.json");
  const pkg = readJson("package.json");
  const runtimeBoundary = readJson("configs/runtime-data-boundary-registry.json");
  const userFlow = readJson("configs/user-flow-registry.json");
  const releaseInternal = checkReleaseReadiness({ mode: "internal", reportOnly: true });
  const releasePublic = checkReleaseReadiness({ mode: "public", reportOnly: true });
  const serializedRuntimeBoundary = JSON.stringify(runtimeBoundary);
  const serializedUserFlow = JSON.stringify(userFlow);
  const serializedRegistry = JSON.stringify(registry);
  const tauriLib = readText("src-tauri/src/lib.rs");
  const monitorShell = readText("../workspace-monitor/components/MonitorShell.tsx");
  const workspacePersistenceReady = [
    "get_desktop_workspace_state",
    "set_desktop_workspace_path",
    "clone_desktop_workspace",
    "DesktopWorkspaceStateReport",
    "desktop_workspace_state_path"
  ].every((token) => tauriLib.includes(token)) && monitorShell.includes("Workspace Host");

  const groups = [
    group("runtime_data", "Runtime Data Boundary", [
      check("runtime_roots_command", "Runtime root command exposed", tauriLib.includes("list_runtime_data_roots"), "list_runtime_data_roots command exists."),
      check("task_runs_outside_source", "Task-run store outside source", tauriLib.includes("runtime_data_store_base_path") && tauriLib.includes("task_runs_base_path"), "Task-run records are stored under app data runtime roots."),
      check("agent_workspace_plane", "Agent workspace plane declared", serializedRuntimeBoundary.includes("agent_workspace"), "Agent runtime work has a plane separate from reusable definitions.")
    ]),
    group("customer_payload", "Customer Payload", [
      check("customer_snapshot_build", "Customer snapshot build configured", pkg.scripts?.["monitor:build"]?.includes("build:customer"), "Tauri build path uses customer snapshot mode."),
      check("bundle_audit_gate", "Customer bundle audit gate configured", pkg.scripts?.["monitor:build"]?.includes("customer-bundle:audit"), "Customer bundle audit runs after monitor build."),
      check("source_payload_rules", "Source/private payload rules declared", serializedRuntimeBoundary.includes("_private/") && serializedRuntimeBoundary.includes("development repository source tree"), "Private and source-tree payloads are disallowed.")
    ]),
    group("support_diagnostics", "Support Diagnostics", [
      check("support_bundle_command", "Support diagnostic command exposed", tauriLib.includes("create_support_diagnostic_bundle"), "Runtime can create support diagnostic bundles."),
      check("redacted_support_export", "Support export is redacted", tauriLib.includes("redacted") && tauriLib.includes("task-run-summary.redacted.json"), "Support bundle uses redacted bounded summaries."),
      check("support_ui_surface", "Support controls visible in app", monitorShell.includes("Support Diagnostic Bundle"), "Desktop UI exposes support bundle controls.")
    ]),
    group("workspace_onboarding", "Workspace Onboarding", [
      check("first_run_docs", "First-run onboarding documented", existsSync(path.join(root, "docs/first-run-onboarding.ko.md")), "First-run onboarding document exists."),
      check("workspace_flow_registry", "Workspace flow registered", serializedUserFlow.includes("workspace") && serializedUserFlow.includes("first-run"), "User flow registry includes workspace and first-run language."),
      check("runtime_workspace_persistence", "Runtime workspace chooser enforced", workspacePersistenceReady, "Workspace host commands persist app-owned import/clone/active workspace state.", "warning")
    ]),
    group("privacy_logging", "Privacy & Logging", [
      check("privacy_controls_declared", "Privacy controls declared", serializedRuntimeBoundary.includes("privacy_controls"), "Runtime boundary registry declares privacy controls."),
      check("support_redaction_policy", "Support redaction policy declared", serializedRuntimeBoundary.includes("support_diagnostic"), "Support diagnostic behavior is part of the runtime boundary."),
      check("raw_private_content_not_exported", "Raw private content excluded", serializedRuntimeBoundary.includes("Store real sensitive local files under _private/sensitive/") || serializedRuntimeBoundary.includes("_private/"), "Private vault content is not part of support/customer payload.")
    ]),
    group("signed_distribution", "Signed Distribution", [
      check("internal_release_preflight", "Internal release preflight passes", releaseInternal.blockers.length === 0, releaseInternal.releaseClaim),
      check("hardened_runtime", "Hardened runtime enabled", tauriConfig.bundle?.macOS?.hardenedRuntime === true, "macOS hardened runtime is enabled."),
      check("public_signing_notarization", "Public signing and notarization configured", releasePublic.blockers.length === 0, releasePublic.blockers.join("; ") || "Public release preflight has no blockers.", mode === "public" ? "blocked" : "warning")
    ]),
    group("update_recovery", "Update & Recovery", [
      check("updater_policy_registry", "Updater is a release gate", serializedRegistry.includes("updater_is_a_release_gate"), "Service readiness registry treats updater as a public release gate."),
      check("tauri_updater_configured", "Signed updater channel configured", updaterConfigured(pkg, tauriConfig), "Tauri updater plugin and endpoint are not configured yet.", mode === "public" ? "blocked" : "warning"),
      check("clean_machine_smoke_recorded", "Clean-machine smoke recorded", false, "Clean-machine install/open/update smoke is still pending.", mode === "public" ? "blocked" : "warning")
    ])
  ];

  const allChecks = groups.flatMap((item) => item.checks);
  const internalBlockers = allChecks.filter((item) => item.status === "blocked" && item.requiredForInternal).map((item) => item.label);
  const publicBlockers = allChecks
    .filter((item) => ["blocked", "warning"].includes(item.status) && item.requiredForPublic)
    .map((item) => item.label);
  const warnings = allChecks.filter((item) => item.status === "warning").map((item) => item.label);
  const score = readinessScore(allChecks);
  const status = internalBlockers.length
    ? "service_internal_blocked"
    : publicBlockers.length
      ? "service_internal_ready_public_blocked"
      : "service_public_release_ready_pending_signoff";

  return {
    status,
    mode,
    reportOnly,
    score,
    generatedAt: new Date().toISOString(),
    groups,
    blockers: mode === "public" ? publicBlockers : internalBlockers,
    publicBlockers,
    warnings,
    nextActions: nextActionsFromChecks(allChecks),
    releaseInternal,
    releasePublic,
    serviceClaim: publicBlockers.length
      ? "Internal service readiness is visible, but public service release remains blocked until signing, notarization, updater, and clean-machine smoke are complete."
      : "Public service readiness checks have no known blockers; still run clean release validation before final release language."
  };
}

function group(id, label, checks) {
  const blocked = checks.some((item) => item.status === "blocked");
  const warning = checks.some((item) => item.status === "warning");
  return {
    id,
    label,
    status: blocked ? "blocked" : warning ? "warning" : "passed",
    passedChecks: checks.filter((item) => item.status === "passed").length,
    totalChecks: checks.length,
    checks
  };
}

function check(id, label, passed, detail, fallbackStatus = "blocked") {
  return {
    id,
    label,
    status: passed ? "passed" : fallbackStatus,
    detail,
    requiredForInternal: fallbackStatus === "blocked" && !["public_signing_notarization", "tauri_updater_configured", "clean_machine_smoke_recorded", "runtime_workspace_persistence"].includes(id),
    requiredForPublic: true
  };
}

function updaterConfigured(pkg, tauriConfig) {
  const hasDependency = Boolean(pkg.dependencies?.["@tauri-apps/plugin-updater"] || pkg.devDependencies?.["@tauri-apps/plugin-updater"]);
  const endpoints = tauriConfig.plugins?.updater?.endpoints || tauriConfig.plugins?.updater?.pubkey || [];
  return hasDependency && (Array.isArray(endpoints) ? endpoints.length > 0 : Boolean(endpoints));
}

function readinessScore(checks) {
  if (!checks.length) {
    return 0;
  }
  const total = checks.reduce((sum, item) => {
    if (item.status === "passed") {
      return sum + 100;
    }
    if (item.status === "warning") {
      return sum + 60;
    }
    return sum;
  }, 0);
  return Math.round(total / checks.length);
}

function nextActionsFromChecks(checks) {
  return checks
    .filter((item) => item.status !== "passed")
    .map((item) => ({
      checkId: item.id,
      label: item.label,
      status: item.status,
      action: item.detail
    }))
    .slice(0, 8);
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function readText(relativePath) {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function parseArgs(argv) {
  const modeIndex = argv.indexOf("--mode");
  const mode = modeIndex >= 0 ? argv[modeIndex + 1] || "internal" : "internal";
  if (!["internal", "public"].includes(mode)) {
    throw new Error(`Unsupported service readiness mode: ${mode}`);
  }
  return {
    mode,
    reportOnly: argv.includes("--report-only")
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = checkServiceReadiness(parseArgs(process.argv.slice(2)));
  console.log(JSON.stringify(report, null, 2));
  if (report.mode === "public" && report.publicBlockers.length && !report.reportOnly) {
    process.exitCode = 1;
  }
  if (report.mode === "internal" && report.blockers.length && !report.reportOnly) {
    process.exitCode = 1;
  }
}
