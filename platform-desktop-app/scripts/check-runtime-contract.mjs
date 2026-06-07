import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const repoRoot = join(root, "..");
const contractPath = "runtime-contracts/installer-shell-runtime-contract.json";
const contract = readJson(contractPath);
const failures = [];
const warnings = [];

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8"));
}

function readRepoJson(relativePath) {
  return JSON.parse(readFileSync(join(repoRoot, relativePath), "utf8"));
}

function failIf(condition, message) {
  if (condition) {
    failures.push(message);
  }
}

function pathExists(relativePath) {
  return existsSync(join(repoRoot, relativePath));
}

function requireObject(field) {
  failIf(!contract[field] || typeof contract[field] !== "object", `contract must include ${field}`);
}

for (const field of ["reader_guide", "reference_links", "structure_rules", "field_guide"]) {
  requireObject(field);
}

for (const field of [
  "installer_shell_contract",
  "bundle_resource_targets",
  "required_read_targets",
  "denied_read_targets",
  "shell_boot_sequence",
  "enforcement_gates",
  "data_accumulation_targets",
  "runtime_command_surface",
  "validation"
]) {
  requireObject(field);
}

failIf(contract.installer_shell_contract?.launch_model !== "installed_app_owns_shell_runtime", "installer_shell_contract.launch_model must be installed_app_owns_shell_runtime");
failIf(contract.installer_shell_contract?.shell_role !== "primary_platform_host", "installer_shell_contract.shell_role must be primary_platform_host");
failIf(contract.installer_shell_contract?.external_cli_role !== "optional_guest_adapter_lane", "external CLI role must remain optional_guest_adapter_lane");
failIf(contract.installer_shell_contract?.missing_cli_behavior !== "capability_missing", "missing CLI behavior must be capability_missing");

const pkg = readJson("package.json");
failIf(!pkg.scripts?.["runtime:contract"]?.includes("check-runtime-contract.mjs"), "package.json must expose runtime:contract");
failIf(!pkg.scripts?.check?.includes("check-runtime-contract.mjs"), "package.json check must run check-runtime-contract.mjs");

const tauriConfig = readJson("src-tauri/tauri.conf.json");
const resources = tauriConfig.bundle?.resources ?? {};
for (const target of contract.bundle_resource_targets ?? []) {
  failIf(!target.source_path || !pathExists(target.source_path), `bundle resource source is missing: ${target.source_path}`);
  failIf(resources[`../${target.source_path.replace("platform-desktop-app/", "")}`] !== target.bundle_path, `tauri.conf resources must map ${target.source_path} to ${target.bundle_path}`);
}

for (const target of contract.required_read_targets ?? []) {
  failIf(!target.path || !pathExists(target.path), `required read target is missing: ${target.path}`);
  failIf(target.path.startsWith("_private/") || target.path.startsWith("outputs/"), `required read target must not be local-only: ${target.path}`);
}

for (const denied of contract.denied_read_targets ?? []) {
  failIf(!["_private/", "outputs/", ".git/"].includes(denied.path), `unexpected denied target must be reviewed explicitly: ${denied.path}`);
}

const bootStepIds = new Set((contract.shell_boot_sequence ?? []).map((step) => step.step_id));
for (const requiredStep of [
  "load_runtime_contract",
  "resolve_runtime_data_roots",
  "select_workspace_boundary",
  "load_enforcement_gates",
  "run_task_with_accumulation",
  "closeout_evaluation"
]) {
  failIf(!bootStepIds.has(requiredStep), `shell_boot_sequence must include ${requiredStep}`);
}

const gateIds = new Set((contract.enforcement_gates ?? []).map((gate) => gate.gate_id));
for (const requiredGate of [
  "web_first_intake",
  "memory_bootstrap",
  "work_mode_selection",
  "view_mode_selection",
  "install_mode_selection",
  "desktop_productization_gate",
  "runtime_data_boundary",
  "cli_adapter_boundary",
  "sensitive_file_boundary",
  "omission_check",
  "resource_check",
  "work_evaluation"
]) {
  failIf(!gateIds.has(requiredGate), `enforcement_gates must include ${requiredGate}`);
}

const accumulationIds = new Set((contract.data_accumulation_targets ?? []).map((target) => target.target_id));
for (const requiredTarget of [
  "user_request_summary",
  "request_trace",
  "decision_inbox",
  "task_run_store",
  "structured_evidence",
  "validation_and_evaluation",
  "work_timing",
  "support_diagnostic",
  "agent_factory_proposals",
  "learning_feedback_decisions",
  "accumulated_data_index"
]) {
  failIf(!accumulationIds.has(requiredTarget), `data_accumulation_targets must include ${requiredTarget}`);
}

for (const target of contract.data_accumulation_targets ?? []) {
  failIf(target.directory?.startsWith("_private/") || target.directory?.startsWith("outputs/"), `data accumulation target must not write to local-only path: ${target.target_id}`);
  failIf(target.provenance_required !== true, `data accumulation target must require provenance: ${target.target_id}`);
}

const runtimeBoundary = readJson("configs/runtime-data-boundary-registry.json");
failIf(!JSON.stringify(runtimeBoundary).includes("installer_shell_runtime_contract"), "runtime-data-boundary-registry must reference installer_shell_runtime_contract");

const cliAdapterRegistry = readRepoJson("agent-platform/configs/integrations/cli-adapter-registry.json");
failIf(cliAdapterRegistry.platform_principle?.host_runtime_model !== "platform_first", "CLI adapter registry must preserve platform_first host model");

const tauriLib = readFileSync(join(root, "src-tauri/src/lib.rs"), "utf8");
const tauriAppShell = readFileSync(join(root, "src-tauri/src/features/app_shell.rs"), "utf8");
const tauriRuntimeSource = `${tauriLib}\n${tauriAppShell}`;
for (const commandName of [
  "get_installer_shell_runtime_contract",
  "get_rust_runtime_feature_map",
  "resolve_installer_shell_runtime_contract_path",
  "InstallerShellRuntimeContractReport",
  "NativeRuntimeFeatureMapReport",
  "get_accumulated_data_overview",
  "AccumulatedDataOverviewReport",
  "get_desktop_preferences",
  "save_desktop_preferences",
  "DesktopPreferencesReport",
  "DESKTOP_PREFERENCES_SCHEMA_VERSION"
]) {
  failIf(!tauriRuntimeSource.includes(commandName), `src-tauri runtime source must include ${commandName}`);
}

failIf(
  contract.runtime_command_surface?.runtime_feature_map_command !== "get_rust_runtime_feature_map",
  "runtime_command_surface.runtime_feature_map_command must be get_rust_runtime_feature_map"
);
failIf(!tauriLib.includes("mod features"), "src-tauri/src/lib.rs must include the Rust feature module tree");
failIf(!tauriRuntimeSource.includes("get_rust_runtime_feature_map"), "src-tauri runtime source must expose get_rust_runtime_feature_map");

failIf(
  contract.runtime_command_surface?.accumulated_data_command !== "get_accumulated_data_overview",
  "runtime_command_surface.accumulated_data_command must be get_accumulated_data_overview"
);
for (const preferencesCommand of ["get_desktop_preferences", "save_desktop_preferences"]) {
  failIf(
    !(contract.runtime_command_surface?.preferences_commands ?? []).includes(preferencesCommand),
    `runtime_command_surface.preferences_commands must include ${preferencesCommand}`
  );
  failIf(!tauriLib.includes(preferencesCommand), `src-tauri/src/lib.rs must include ${preferencesCommand}`);
}
for (const appUpdateCommand of ["check_app_update", "install_app_update"]) {
  failIf(
    !(contract.runtime_command_surface?.app_update_commands ?? []).includes(appUpdateCommand),
    `runtime_command_surface.app_update_commands must include ${appUpdateCommand}`
  );
  failIf(!tauriLib.includes(appUpdateCommand), `src-tauri/src/lib.rs must include ${appUpdateCommand}`);
}
for (const agentFactoryCommand of ["create_agent_factory_proposal"]) {
  failIf(
    !(contract.runtime_command_surface?.agent_factory_commands ?? []).includes(agentFactoryCommand),
    `runtime_command_surface.agent_factory_commands must include ${agentFactoryCommand}`
  );
  failIf(!tauriLib.includes(agentFactoryCommand), `src-tauri/src/lib.rs must include ${agentFactoryCommand}`);
}
for (const learningFeedbackCommand of ["record_learning_improvement_decision"]) {
  failIf(
    !(contract.runtime_command_surface?.learning_feedback_commands ?? []).includes(learningFeedbackCommand),
    `runtime_command_surface.learning_feedback_commands must include ${learningFeedbackCommand}`
  );
  failIf(!tauriLib.includes(learningFeedbackCommand), `src-tauri/src/lib.rs must include ${learningFeedbackCommand}`);
}
for (const providerCredentialCommand of [
  "list_provider_credentials",
  "save_provider_credential",
  "clear_provider_credential",
  "open_provider_auth_url",
  "run_provider_agent_task"
]) {
  failIf(
    !(contract.runtime_command_surface?.provider_credential_commands ?? []).includes(providerCredentialCommand),
    `runtime_command_surface.provider_credential_commands must include ${providerCredentialCommand}`
  );
  failIf(!tauriLib.includes(providerCredentialCommand), `src-tauri/src/lib.rs must include ${providerCredentialCommand}`);
}
for (const nativePipeCommand of ["run_native_pipe_probe"]) {
  failIf(
    !(contract.runtime_command_surface?.native_pipe_commands ?? []).includes(nativePipeCommand),
    `runtime_command_surface.native_pipe_commands must include ${nativePipeCommand}`
  );
  failIf(!tauriLib.includes(nativePipeCommand), `src-tauri/src/lib.rs must include ${nativePipeCommand}`);
}
for (const nativeOsCommand of ["run_native_os_action"]) {
  failIf(
    !(contract.runtime_command_surface?.native_os_commands ?? []).includes(nativeOsCommand),
    `runtime_command_surface.native_os_commands must include ${nativeOsCommand}`
  );
  failIf(!tauriLib.includes(nativeOsCommand), `src-tauri/src/lib.rs must include ${nativeOsCommand}`);
}
for (const workspaceHostCommand of [
  "get_desktop_workspace_state",
  "set_desktop_workspace_path",
  "clone_desktop_workspace",
  "get_desktop_git_status",
  "run_desktop_git_action"
]) {
  failIf(
    !(contract.runtime_command_surface?.workspace_host_commands ?? []).includes(workspaceHostCommand),
    `runtime_command_surface.workspace_host_commands must include ${workspaceHostCommand}`
  );
  failIf(!tauriLib.includes(workspaceHostCommand), `src-tauri/src/lib.rs must include ${workspaceHostCommand}`);
}
for (const workspaceHostToken of [
  "DesktopWorkspaceStateReport",
  "DESKTOP_WORKSPACE_STATE_SCHEMA_VERSION",
  "desktop_workspace_state_path",
  "managed_desktop_workspaces_base_path",
  "workspace_root_for_app",
  "redact_repository_url",
  "redact_clone_output"
]) {
  failIf(!tauriLib.includes(workspaceHostToken), `src-tauri/src/lib.rs must include ${workspaceHostToken}`);
}
for (const sourceEditingCommand of [
  "warm_workspace_os_resources",
  "prepare_workspace_os_resources",
  "list_workspace_text_files",
  "read_workspace_text_file",
  "write_workspace_text_file"
]) {
  failIf(
    !(contract.runtime_command_surface?.source_editing_commands ?? []).includes(sourceEditingCommand),
    `runtime_command_surface.source_editing_commands must include ${sourceEditingCommand}`
  );
  failIf(!tauriLib.includes(sourceEditingCommand), `src-tauri/src/lib.rs must include ${sourceEditingCommand}`);
}
const accumulatedIndexTarget = (contract.data_accumulation_targets ?? []).find((target) => target.target_id === "accumulated_data_index");
failIf(
  accumulatedIndexTarget?.record_type !== "runtime_data_index_manifest",
  "accumulated_data_index must use runtime_data_index_manifest"
);
failIf(
  accumulatedIndexTarget?.directory !== "app_data/runtime-data/indexes",
  "accumulated_data_index must live under app_data/runtime-data/indexes"
);
failIf(
  !accumulatedIndexTarget?.runtime_store?.includes("accumulated-data-overview.v1.json"),
  "accumulated_data_index runtime_store must point to accumulated-data-overview.v1.json"
);
for (const accumulatedDataToken of [
  "ACCUMULATED_DATA_INDEX_SCHEMA_VERSION",
  "ACCUMULATED_DATA_STORAGE_FORMAT_VERSION",
  "accumulated_data_index_path",
  "accumulated-data-overview.v1.json",
  "format_migration_status"
]) {
  failIf(!tauriLib.includes(accumulatedDataToken), `src-tauri/src/lib.rs must include ${accumulatedDataToken}`);
}

const result = {
  status: failures.length === 0 ? "installer_shell_runtime_contract_ready" : "rework_required",
  failures,
  warnings,
  checked_contract: contractPath,
  checked_gates: gateIds.size,
  checked_accumulation_targets: accumulationIds.size
};

console.log(JSON.stringify(result, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
