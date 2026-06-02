import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

const root = new URL("..", import.meta.url).pathname;

const requiredFiles = [
  "README.md",
  "package.json",
  "configs/desktop-distribution-registry.json",
  "configs/macos-execution-profile.json",
  "configs/windows-execution-profile.json",
  "configs/user-flow-registry.json",
  "docs/architecture/cross-platform-installable-runtime-decision.ko.md",
  "docs/architecture/cross-platform-installable-runtime-decision.en.md",
  "docs/architecture/multi-cli-orchestration-runtime.ko.md",
  "docs/architecture/multi-cli-orchestration-runtime.en.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/spec.ko.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/plan.ko.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/tasks.ko.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/validation.ko.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/traceability.ko.md",
  "src-tauri/tauri.conf.json",
  "src-tauri/Cargo.toml",
  "src-tauri/build.rs",
  "src-tauri/src/main.rs",
  "src-tauri/src/lib.rs",
  "src-tauri/capabilities/default.json"
];

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8"));
}

function commandExists(command) {
  try {
    execFileSync(command, ["--version"], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

const failures = [];
const warnings = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) {
    failures.push(`missing required file: ${file}`);
  }
}

const pkg = readJson("package.json");
if (!pkg.scripts?.check || !pkg.scripts?.test || !pkg.scripts?.["tauri:dev"] || !pkg.scripts?.["tauri:build"]) {
  failures.push("package.json must expose check, test, tauri:dev, and tauri:build scripts");
}
if (!pkg.devDependencies?.["@tauri-apps/cli"]) {
  failures.push("package.json must declare @tauri-apps/cli as a project-local devDependency");
}

const tauriConfig = readJson("src-tauri/tauri.conf.json");
if (tauriConfig.identifier !== "com.personalagentplatform.desktop") {
  failures.push("src-tauri/tauri.conf.json must use the selected product identifier");
}
if (tauriConfig.build?.frontendDist !== "../../workspace-monitor/out") {
  failures.push("Tauri frontendDist must point at workspace-monitor static output");
}
if (tauriConfig.app?.withGlobalTauri !== true) {
  failures.push("Tauri must expose window.__TAURI__ for the static workspace-monitor desktop bridge");
}
if (!tauriConfig.bundle?.targets?.includes("dmg") || !tauriConfig.bundle?.targets?.includes("nsis")) {
  failures.push("Tauri bundle targets must include macOS and Windows installer candidates");
}

const tauriLib = readFileSync(join(root, "src-tauri/src/lib.rs"), "utf8");
for (const commandName of [
  "list_cli_adapters",
  "run_cli_adapter_health",
  "run_all_cli_adapter_health",
  "list_cli_task_pipeline_presets",
  "start_cli_adapter_session",
  "start_cli_task_pipeline",
  "poll_cli_adapter_session",
  "list_cli_adapter_sessions",
  "write_cli_adapter_stdin",
  "send_cli_adapter_defer_message",
  "defer_all_cli_adapter_questions",
  "cancel_cli_adapter_session",
  "read_workspace_text_file",
  "write_workspace_text_file",
  "list_human_decision_inbox",
  "answer_human_decision",
  "answer_and_resume_human_decision"
]) {
  if (!tauriLib.includes(commandName)) {
    failures.push(`src-tauri/src/lib.rs must expose ${commandName}`);
  }
}
if (!tauriLib.includes("_ops") || !tauriLib.includes("human-decision-inbox.json")) {
  failures.push("src-tauri/src/lib.rs must persist deferred CLI questions to the human decision inbox");
}
for (const requiredPhrase of ["MAX_DECISION_SCAN_BYTES", "recent_session_output", "tail_by_char_boundary"]) {
  if (!tauriLib.includes(requiredPhrase)) {
    failures.push(`src-tauri/src/lib.rs must include performance token ${requiredPhrase}`);
  }
}

const desktopRegistry = readJson("configs/desktop-distribution-registry.json");
const companionPaths = JSON.stringify(desktopRegistry);
if (!companionPaths.includes("configs/windows-execution-profile.json")) {
  failures.push("desktop-distribution-registry must reference the Windows execution profile");
}
if (desktopRegistry.recommended_initial_path?.id !== "tauri_first_cross_platform_shell") {
  failures.push("desktop-distribution-registry must record the selected Tauri-first cross-platform path");
}
if (!JSON.stringify(desktopRegistry.selected_platform_architecture ?? {}).includes("multi_cli_supervisor")) {
  failures.push("desktop-distribution-registry must record the multi-CLI supervisor contract");
}

const userFlowRegistry = readJson("configs/user-flow-registry.json");
const userFlowSerialized = JSON.stringify(userFlowRegistry);
for (const requiredPhrase of ["ai_cli_orchestration_flow", "Claude Code", "Gemini CLI", "Codex CLI", "OpenCode"]) {
  if (!userFlowSerialized.includes(requiredPhrase)) {
    failures.push(`user-flow-registry must include ${requiredPhrase}`);
  }
}

const viewModeRegistry = readJson("../agent-platform/configs/access/view-mode-registry.json");
if (!JSON.stringify(viewModeRegistry).includes("desktop")) {
  failures.push("view-mode-registry must expose the desktop runtime section");
}

const monitorShell = readFileSync(join(root, "../workspace-monitor/components/MonitorShell.tsx"), "utf8");
for (const requiredPhrase of [
  "DesktopRuntimePanel",
  "list_cli_adapters",
  "run_all_cli_adapter_health",
  "run_cli_adapter_health",
  "list_cli_task_pipeline_presets",
  "start_cli_adapter_session",
  "start_cli_task_pipeline",
  "write_cli_adapter_stdin",
  "send_cli_adapter_defer_message",
  "defer_all_cli_adapter_questions",
  "cancel_cli_adapter_session",
  "decisionInboxItems",
  "list_human_decision_inbox",
  "answer_human_decision",
  "answer_and_resume_human_decision",
  "adapterSetupGuides",
  "sessionModePresets",
  "Unified Ops",
  "visibleUnifiedEvents",
  "ops-event-rail",
  "Task Pipe Init",
  "Init task pipe",
  "merge gate",
  "Answer & Resume",
  "read_workspace_text_file",
  "write_workspace_text_file",
  "Auto-defer questions",
  "Defer detected questions",
  "auto-deferred",
  "pendingDecisionPrompts",
  "autoDeferQuestions",
  "autoDeferTriggered",
  "pollActiveSessions",
  "activeSessionPollInFlightRef",
  "mergeSessionReports",
  "SESSION_POLL_INTERVAL_MS",
  "SESSION_POLL_IDLE_UPDATE_BUCKET_MS",
  "SESSION_OUTPUT_SIGNATURE_CHARS",
  "INBOX_REFRESH_THROTTLE_MS",
  "Mode & Function Switchboard",
  "모드와 기능 선택 위치",
  "ModeFunctionSwitchboard",
  "modeFunctionCatalog",
  "mode-switchboard-panel",
  "openModeFunctionOption"
]) {
  if (!monitorShell.includes(requiredPhrase)) {
    failures.push(`workspace-monitor MonitorShell must include ${requiredPhrase}`);
  }
}

const adapterRegistry = readJson("../agent-platform/configs/integrations/cli-adapter-registry.json");
const adapterSerialized = JSON.stringify(adapterRegistry);
for (const requiredPhrase of ["supported_ai_cli_adapters", "interactive_cli_contract", "terminal_io_contract", "claude-code-cli", "gemini-cli", "codex-cli", "opencode-cli"]) {
  if (!adapterSerialized.includes(requiredPhrase)) {
    failures.push(`cli-adapter-registry must include ${requiredPhrase}`);
  }
}

for (const profilePath of ["configs/macos-execution-profile.json", "configs/windows-execution-profile.json"]) {
  const profile = readJson(profilePath);
  for (const field of ["reader_guide", "reference_links", "structure_rules", "field_guide", "execution_levels", "process_model", "runtime_boundaries", "smoke_tests"]) {
    if (!profile[field]) {
      failures.push(`${profilePath} must include ${field}`);
    }
  }
}

if (!commandExists("node")) {
  failures.push("node is required for desktop scaffold checks and workspace-monitor build orchestration");
}
if (!commandExists("npm")) {
  failures.push("npm is required for desktop scaffold checks and Tauri CLI scripts");
}
if (!commandExists("rustc") || !commandExists("cargo")) {
  warnings.push("Rust toolchain is not installed; tauri:dev and tauri:build are blocked until a documented installation audit is completed");
}

const result = {
  status: failures.length === 0 ? "ready_for_dependency_install_audit" : "rework_required",
  failures,
  warnings,
  checked_files: requiredFiles.length,
  release_claim: "This scaffold is not a signed public installer. Public readiness requires OS signing, notarization where applicable, Windows signing, and smoke tests."
};

console.log(JSON.stringify(result, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
