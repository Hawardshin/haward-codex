import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { checkReleaseReadiness } from "./check-release-readiness.mjs";
import {
  joinSourceMap,
  readSourceMap,
  serviceReadinessMonitorSourceKeys,
  serviceReadinessSourcePaths,
  tauriRuntimeSourceKeys
} from "./readiness/source-structure.mjs";

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
  const sources = readSourceMap(root, serviceReadinessSourcePaths);
  const {
    tauriCargo,
    tauriAppUpdate,
    tauriProviders,
    monitorShell,
    agentBuilderPanels
  } = sources;
  const tauriLib = joinSourceMap(sources, tauriRuntimeSourceKeys);
  const tauriRuntimeSource = `${tauriLib}\n${tauriAppUpdate}\n${tauriProviders}`;
  const monitorWorkbenchSource = joinSourceMap(sources, serviceReadinessMonitorSourceKeys);
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
    group("native_resource_telemetry", "Native Resource Telemetry", [
      check(
        "desktop_resource_snapshot_command",
        "Desktop resource snapshot command exposed",
        tauriLib.includes("get_desktop_resource_snapshot") && tauriLib.includes("DesktopResourceSnapshotReport"),
        "Rust runtime reports process memory, process CPU, system memory, and workspace cache state."
      ),
      check(
        "desktop_resource_snapshot_uses_process_telemetry",
        "Snapshot uses process telemetry",
        tauriLib.includes("get_current_pid") && tauriLib.includes("ProcessRefreshKind") && tauriLib.includes("process_memory_bytes") && tauriLib.includes("process_cpu_usage"),
        "The native runtime samples the current app process through sysinfo."
      ),
      check(
        "desktop_resource_snapshot_ui_visible",
        "Resource telemetry visible in app",
        monitorWorkbenchSource.includes("DesktopResourceSnapshotReport") &&
          monitorWorkbenchSource.includes("앱 RAM/CPU") &&
          monitorWorkbenchSource.includes("desktopResourceSnapshot"),
        "Workspace source surface exposes app RAM/CPU and native cache telemetry."
      )
    ]),
    group("customer_payload", "Customer Payload", [
      check("customer_snapshot_build", "Customer snapshot build configured", pkg.scripts?.["renderer:build"]?.includes("build:customer"), "Tauri build path uses customer snapshot mode."),
      check("bundle_audit_gate", "Customer bundle audit gate configured", pkg.scripts?.["renderer:build"]?.includes("customer-bundle:audit"), "Customer bundle audit runs after renderer build."),
      check("source_payload_rules", "Source/private payload rules declared", serializedRuntimeBoundary.includes("_private/") && serializedRuntimeBoundary.includes("development repository source tree"), "Private and source-tree payloads are disallowed.")
    ]),
    group("support_diagnostics", "Support Diagnostics", [
      check("support_bundle_command", "Support diagnostic command exposed", tauriLib.includes("create_support_diagnostic_bundle"), "Runtime can create support diagnostic bundles."),
      check("redacted_support_export", "Support export is redacted", tauriLib.includes("redacted") && tauriLib.includes("task-run-summary.redacted.json"), "Support bundle uses redacted bounded summaries."),
      check("support_ui_surface", "Support controls visible in app", monitorWorkbenchSource.includes("Support Diagnostic Bundle"), "Desktop UI exposes support bundle controls.")
    ]),
    group("provider_accounts", "Provider Accounts", [
      check("provider_credentials_redacted", "Provider credential reports are redacted", tauriRuntimeSource.includes("secret_preview") && tauriRuntimeSource.includes("credential_secret_preview"), "Credential reports expose only preview/status metadata."),
      check("provider_direct_task_command", "Direct provider task command exposed", tauriRuntimeSource.includes("run_provider_agent_task") && tauriRuntimeSource.includes("ProviderAgentTaskReport"), "Connected provider accounts can run model tasks without a shell command."),
      check("local_model_catalog_command", "Local model catalog command exposed", tauriRuntimeSource.includes("list_provider_models") && tauriRuntimeSource.includes("ProviderModelCatalogReport") && tauriRuntimeSource.includes("Ollama / Local"), "The native runtime can list local Ollama models without an API key."),
      check("provider_direct_task_ui", "Direct provider task UI visible", monitorWorkbenchSource.includes("agent-provider-run-controls") && monitorWorkbenchSource.includes("agent-model-picker") && monitorWorkbenchSource.includes("list_provider_models") && monitorWorkbenchSource.includes("run_provider_agent_task"), "Search Agent Work Chat exposes provider account and model controls.")
    ]),
    group("production_agent_blueprints", "Production Agent Blueprints", [
      check("agentcore_blueprint_ui", "AgentCore-style blueprint UI visible", monitorWorkbenchSource.includes("AgentCoreBlueprintPanel") && monitorWorkbenchSource.includes("agentcore-blueprint-panel"), "Agents screen exposes production blueprints derived from public AgentCore references."),
      check("agentcore_blueprint_prefill", "Blueprints fill runnable inputs", monitorShell.includes("applyAgentCoreBlueprint") && monitorShell.includes("setAgentFactoryForm") && monitorShell.includes("setSearchAgentRunForm"), "Blueprint application fills Search Agent Work Chat and Agent Core inputs."),
      check("agentcore_quick_builder_proposal", "Blueprints create proposals directly", monitorWorkbenchSource.includes("AgentCore Quick Builder") && monitorWorkbenchSource.includes("createAgentCoreBlueprintProposal") && monitorWorkbenchSource.includes("create_agent_factory_proposal"), "AgentCore-style blueprint selection can call the native Agent Core proposal writer."),
      check("local_python_execution_boundary", "Agent execution stays local", monitorWorkbenchSource.includes("local_python_agent_runtime") && monitorWorkbenchSource.includes("local_process_execution") && serializedRegistry.includes("local Python execution"), "AgentCore-style proposals declare local Python/process execution as the host boundary."),
      check("agentcore_reference_recorded", "AgentCore reference recorded", serializedRegistry.includes("production_agent_blueprints") && serializedUserFlow.includes("awslabs_agentcore_samples"), "Service and user-flow registries record AgentCore-style production blueprint behavior.")
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
      check("public_signing_notarization", "Public signing and notarization configured", releasePublic.blockers.length === 0, summarizePublicReleaseBlockers(releasePublic.blockers), mode === "public" ? "blocked" : "warning")
    ]),
    group("update_recovery", "Update & Recovery", [
      check("updater_policy_registry", "Updater is a release gate", serializedRegistry.includes("updater_is_a_release_gate"), "Service readiness registry treats updater as a public release gate."),
      check(
        "updater_runtime_actions",
        "Updater runtime actions exposed",
        tauriRuntimeSource.includes("check_app_update") &&
          tauriRuntimeSource.includes("install_app_update") &&
          monitorWorkbenchSource.includes("check-app-update") &&
          monitorWorkbenchSource.includes("install-app-update"),
        "Desktop runtime must expose app update check and install actions."
      ),
      check("tauri_updater_configured", "Signed updater channel configured", updaterConfigured({ pkg, tauriConfig, tauriCargo, tauriLib, releasePublic }), "Tauri updater plugin, generated public config, endpoint, and signing key are not configured yet.", mode === "public" ? "blocked" : "warning"),
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

function updaterConfigured({ pkg, tauriConfig, tauriCargo, tauriLib, releasePublic }) {
  const hasJsDependency = Boolean(pkg.dependencies?.["@tauri-apps/plugin-updater"] || pkg.devDependencies?.["@tauri-apps/plugin-updater"]);
  const hasRustDependency = tauriCargo.includes("tauri-plugin-updater");
  const hasRustPluginInit = tauriLib.includes("tauri_plugin_updater::Builder");
  const endpoints = tauriConfig.plugins?.updater?.endpoints || tauriConfig.plugins?.updater?.pubkey || [];
  const baseConfigHasEndpoint = Array.isArray(endpoints) ? endpoints.length > 0 : Boolean(endpoints);
  const publicEnvHasUpdater = !releasePublic.blockers.some((blocker) => /TAURI_UPDATER|TAURI_SIGNING_PRIVATE_KEY|TAURI_SIGNING_PRIVATE_KEY_PATH|TAURI_RELEASE_ASSET_BASE_URL|updater/i.test(blocker));
  return (hasRustDependency || hasJsDependency) && hasRustPluginInit && (baseConfigHasEndpoint || publicEnvHasUpdater);
}

function summarizePublicReleaseBlockers(blockers) {
  if (!blockers.length) {
    return "Public release preflight has no blockers.";
  }
  const missing = [];
  if (blockers.some((blocker) => /Developer ID|APPLE_SIGNING_IDENTITY|APPLE_CERTIFICATE/i.test(blocker))) {
    missing.push("Developer ID signing identity or Apple certificate");
  }
  if (blockers.some((blocker) => /notarization|APPLE_ID|APPLE_API_KEY|APPLE_TEAM_ID/i.test(blocker))) {
    missing.push("Apple notarization credentials");
  }
  if (blockers.some((blocker) => /TAURI_SIGNING_PRIVATE_KEY|TAURI_SIGNING_PRIVATE_KEY_PATH/i.test(blocker))) {
    missing.push("Tauri updater signing private key or key path");
  }
  if (blockers.some((blocker) => /TAURI_UPDATER_PUBLIC_KEY/i.test(blocker))) {
    missing.push("Tauri updater public key");
  }
  if (blockers.some((blocker) => /TAURI_UPDATER_ENDPOINTS/i.test(blocker))) {
    missing.push("HTTPS updater endpoint");
  }
  if (blockers.some((blocker) => /TAURI_RELEASE_ASSET_BASE_URL/i.test(blocker))) {
    missing.push("release asset base URL for static latest.json");
  }
  return `Missing public release inputs: ${Array.from(new Set(missing)).join("; ")}.`;
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
