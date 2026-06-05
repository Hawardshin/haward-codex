import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";

import {
  checkDesktopBuildPipeline,
  desktopBuildPipelineRequiredFiles
} from "./readiness/desktop-build-pipeline.mjs";

const root = new URL("..", import.meta.url).pathname;

const requiredFiles = [
  "README.md",
  "README.ko.md",
  "README.en.md",
  "package.json",
  "configs/desktop-distribution-registry.json",
  "configs/product-feature-registry.json",
  "configs/product-gap-registry.json",
  "configs/claude-code-design-transfer-registry.json",
  "configs/reference-platform-advantage-registry.json",
  "configs/runtime-data-boundary-registry.json",
  "configs/service-readiness-registry.json",
  "configs/macos-execution-profile.json",
  "configs/windows-execution-profile.json",
  "configs/user-flow-registry.json",
  "runtime-contracts/installer-shell-runtime-contract.json",
  "runtime-contracts/installer-shell-bootstrap.ko.md",
  "runtime-contracts/installer-shell-bootstrap.en.md",
  "renderer/workspace-monitor/components/workbench/CoreFeatureDrilldown.tsx",
  "renderer/workspace-monitor/components/workbench/AgentBuilderPanels.tsx",
  "renderer/workspace-monitor/components/workbench/AgentDetailPanels.tsx",
  "renderer/workspace-monitor/components/workbench/NativeGitWorkbench.tsx",
  "renderer/workspace-monitor/components/workbench/PathDisclosure.tsx",
  "renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx",
  "renderer/workspace-monitor/components/workbench/WorkspaceExplorerPane.tsx",
  "docs/architecture/cross-platform-installable-runtime-decision.ko.md",
  "docs/architecture/cross-platform-installable-runtime-decision.en.md",
  "docs/architecture/multi-cli-orchestration-runtime.ko.md",
  "docs/architecture/multi-cli-orchestration-runtime.en.md",
  "docs/architecture/claude-code-design-transfer.ko.md",
  "docs/architecture/claude-code-design-transfer.en.md",
  "docs/architecture/runtime-data-boundary.ko.md",
  "docs/architecture/runtime-data-boundary.en.md",
  "docs/architecture/installer-shell-runtime-contract.ko.md",
  "docs/architecture/installer-shell-runtime-contract.en.md",
  "docs/architecture/native-git-workbench.ko.md",
  "docs/architecture/native-git-workbench.en.md",
  "docs/architecture/pty-terminal-decision.ko.md",
  "docs/architecture/pty-terminal-decision.en.md",
  "docs/release-runbook.ko.md",
  "docs/release-runbook.en.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/spec.ko.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/plan.ko.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/tasks.ko.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/validation.ko.md",
  "specs/2026-06-02-multi-cli-orchestration-desktop/traceability.ko.md",
  "src-tauri/tauri.conf.json",
  "src-tauri/Cargo.toml",
  "src-tauri/build.rs",
  "src-tauri/Entitlements.plist",
  "src-tauri/src/main.rs",
  "src-tauri/src/lib.rs",
  "src-tauri/capabilities/default.json",
  "renderer/workspace-monitor/lib/clipboard.mjs",
  "tests/clipboard.test.mjs",
  "scripts/check-runtime-contract.mjs",
  "scripts/check-customer-bundle.mjs",
  "scripts/check-release-readiness.mjs",
  "scripts/check-service-readiness.mjs",
  "scripts/public-release-config.mjs",
  "scripts/public-release-build.mjs",
  "scripts/create-updater-manifest.mjs",
  "scripts/readiness/desktop-build-pipeline.mjs",
  "renderer/workspace-monitor/scripts/check-lazy-boundary-contract.mjs",
  ...desktopBuildPipelineRequiredFiles
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

failures.push(...checkDesktopBuildPipeline({ root, readJson }));

const tauriConfig = readJson("src-tauri/tauri.conf.json");
if (tauriConfig.identifier !== "com.personalagentplatform.desktop") {
  failures.push("src-tauri/tauri.conf.json must use the selected product identifier");
}
if (tauriConfig.build?.frontendDist !== "../renderer/workspace-monitor/out") {
  failures.push("Tauri frontendDist must point at renderer/workspace-monitor static output");
}
if (tauriConfig.app?.withGlobalTauri !== true) {
  failures.push("Tauri must expose window.__TAURI__ for the static workspace-monitor desktop bridge");
}
const mainWindow = tauriConfig.app?.windows?.find((windowConfig) => windowConfig.label === "main");
if (!mainWindow || mainWindow.width < 1440 || mainWindow.height < 900 || mainWindow.minWidth < 1280 || mainWindow.minHeight < 800) {
  failures.push("Tauri main window must use desktop-only dimensions: width>=1440, height>=900, minWidth>=1280, minHeight>=800");
}
if (!tauriConfig.bundle?.targets?.includes("dmg") || !tauriConfig.bundle?.targets?.includes("nsis")) {
  failures.push("Tauri bundle targets must include macOS and Windows installer candidates");
}
if (tauriConfig.bundle?.macOS?.hardenedRuntime !== true) {
  failures.push("Tauri macOS bundle must enable hardenedRuntime for release-path parity");
}
if (tauriConfig.bundle?.macOS?.entitlements !== "Entitlements.plist") {
  failures.push("Tauri macOS bundle must reference src-tauri/Entitlements.plist");
}
const resourceTargets = tauriConfig.bundle?.resources ?? {};
for (const [source, destination] of [
  ["../runtime-contracts/installer-shell-runtime-contract.json", "runtime-contracts/installer-shell-runtime-contract.json"],
  ["../runtime-contracts/installer-shell-bootstrap.ko.md", "runtime-contracts/installer-shell-bootstrap.ko.md"],
  ["../runtime-contracts/installer-shell-bootstrap.en.md", "runtime-contracts/installer-shell-bootstrap.en.md"]
]) {
  if (resourceTargets[source] !== destination) {
    failures.push(`Tauri bundle resources must map ${source} to ${destination}`);
  }
}

const tauriLib = readFileSync(join(root, "src-tauri/src/lib.rs"), "utf8");
const tauriCargo = readFileSync(join(root, "src-tauri/Cargo.toml"), "utf8");
const tauriDefaultCapability = readFileSync(join(root, "src-tauri/capabilities/default.json"), "utf8");
for (const commandName of [
  "get_installer_shell_runtime_contract",
  "list_cli_adapters",
  "run_cli_adapter_health",
  "run_all_cli_adapter_health",
  "list_cli_task_pipeline_presets",
  "list_cli_task_run_records",
  "read_cli_task_run_record",
  "prune_cli_task_run_records",
  "list_runtime_data_roots",
  "get_accumulated_data_overview",
  "run_installer_payload_audit",
  "create_support_diagnostic_bundle",
  "get_desktop_preferences",
  "save_desktop_preferences",
  "list_provider_credentials",
  "save_provider_credential",
  "clear_provider_credential",
  "open_provider_auth_url",
  "list_provider_models",
  "run_provider_agent_task",
  "get_desktop_workspace_state",
  "set_desktop_workspace_path",
  "choose_desktop_workspace_folder",
  "clone_desktop_workspace",
  "get_desktop_git_status",
  "run_desktop_git_action",
  "start_cli_adapter_session",
  "start_cli_task_pipeline",
  "poll_cli_adapter_session",
  "list_cli_adapter_sessions",
  "write_cli_adapter_stdin",
  "send_cli_adapter_defer_message",
  "defer_all_cli_adapter_questions",
  "cancel_cli_adapter_session",
  "get_desktop_resource_snapshot",
  "warm_workspace_os_resources",
  "prepare_workspace_os_resources",
  "list_workspace_text_files",
  "read_workspace_text_file",
  "write_workspace_text_file",
  "create_agent_factory_proposal",
  "record_learning_improvement_decision",
  "list_human_decision_inbox",
  "answer_human_decision",
  "answer_and_resume_human_decision"
]) {
  if (!tauriLib.includes(commandName)) {
    failures.push(`src-tauri/src/lib.rs must expose ${commandName}`);
  }
}
if (!tauriCargo.includes("tauri-plugin-dialog")) {
  failures.push("src-tauri/Cargo.toml must declare tauri-plugin-dialog for native folder selection");
}
if (!tauriCargo.includes("tauri-plugin-updater")) {
  failures.push("src-tauri/Cargo.toml must declare tauri-plugin-updater for signed update artifacts");
}
if (!tauriDefaultCapability.includes("dialog:default")) {
  failures.push("src-tauri/capabilities/default.json must allow dialog:default for native folder selection");
}
for (const requiredPhrase of ["DialogExt", "tauri_plugin_dialog::init", "blocking_pick_folder"]) {
  if (!tauriLib.includes(requiredPhrase)) {
    failures.push(`src-tauri/src/lib.rs must include native dialog token ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["tauri_plugin_updater::Builder", "service-update-channel.json", "Signed updater channel"]) {
  if (!tauriLib.includes(requiredPhrase)) {
    failures.push(`src-tauri/src/lib.rs must include updater runtime token ${requiredPhrase}`);
  }
}
if (!tauriLib.includes("_ops") || !tauriLib.includes("human-decision-inbox.json")) {
  failures.push("src-tauri/src/lib.rs must persist deferred CLI questions to the human decision inbox");
}
for (const requiredPhrase of [
  "MAX_DECISION_SCAN_BYTES",
  "recent_session_output",
  "tail_by_char_boundary",
  "WorkspaceResourceWarmupReport",
  "start_background_warmup",
  "workspace-resource-warmup",
  "MAX_WORKSPACE_PRELOAD_TEXT_FILES",
  "MAX_WORKSPACE_PRELOAD_TEXT_BYTES"
]) {
  if (!tauriLib.includes(requiredPhrase)) {
    failures.push(`src-tauri/src/lib.rs must include performance token ${requiredPhrase}`);
  }
}
for (const requiredPhrase of [
  "CliTaskRunRecordReport",
  "CliTaskRunDetailReport",
  "CliTaskRunPruneReport",
  "persist_session_task_run",
  "read_task_run_detail",
  "prune_task_run_records",
  "read_task_run_records_with_limit",
  "read_bounded_text_preview",
  "MAX_TASK_RUN_LOG_PREVIEW_BYTES",
  "task_run_persist_signature",
  "task_runs_base_path",
  "legacy_task_runs_base_path",
  "runtime_data_store_base_path",
  "support_bundles_base_path",
  "payload_audits_base_path",
  "resolve_installer_shell_runtime_contract_path",
  "InstallerShellRuntimeContractReport",
  "InstallerPayloadAuditReport",
  "SupportDiagnosticBundleReport",
  "RuntimeDataBoundaryReport",
  "AccumulatedDataStoreReport",
  "AccumulatedDataOverviewReport",
  "DesktopWorkspaceStateReport",
  "ProviderCredentialReport",
  "ProviderCredentialSummary",
  "ProviderModelCatalogReport",
  "ProviderModelSummary",
  "DESKTOP_WORKSPACE_STATE_SCHEMA_VERSION",
  "PROVIDER_CREDENTIALS_SCHEMA_VERSION",
  "provider_credentials_path",
  "provider_env_for_adapter",
  "open_provider_auth_url_report",
  "list_provider_models_report",
  "call_ollama_provider_api",
  "run_provider_agent_task_report",
  "provider-credentials.v1.json",
  "Ollama / Local",
  "OLLAMA_BASE_URL",
  "OPENAI_API_KEY",
  "ANTHROPIC_API_KEY",
  "GEMINI_API_KEY",
  "desktop_workspace_state_path",
  "managed_desktop_workspaces_base_path",
  "workspace_root_for_app",
  "redact_repository_url",
  "redact_clone_output",
  "ACCUMULATED_DATA_INDEX_SCHEMA_VERSION",
  "ACCUMULATED_DATA_STORAGE_FORMAT_VERSION",
  "accumulated_data_index_path",
  "accumulated-data-overview.v1.json",
  "format_migration_status",
  "accumulated_data_overview_report",
  "MAX_ACCUMULATED_DATA_SCAN_FILES",
  "MAX_PAYLOAD_SCAN_FILES",
  "platform_artifacts_base_path",
  "record.json",
  "stdout.log",
  "stderr.log"
]) {
  if (!tauriLib.includes(requiredPhrase)) {
    failures.push(`src-tauri/src/lib.rs must include task run store token ${requiredPhrase}`);
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
if (!companionPaths.includes("configs/product-feature-registry.json")) {
  failures.push("desktop-distribution-registry must reference the product feature registry");
}

const productFeatureRegistry = readJson("configs/product-feature-registry.json");
const productFeatureSerialized = JSON.stringify(productFeatureRegistry);
if (productFeatureRegistry.product_position?.primary_product !== "agent_capability_platform") {
  failures.push("product-feature-registry must keep agent_capability_platform as the primary product");
}
if (productFeatureRegistry.product_position?.monitoring_role !== "supporting_observability") {
  failures.push("product-feature-registry must keep monitoring as supporting_observability");
}
for (const requiredFeatureId of [
  "agent_orchestration",
  "agent_factory",
  "root_tool_management",
  "work_visibility",
  "agent_work_environment",
  "agent_development_environment",
  "learning_improvement_loop",
  "observability_monitoring"
]) {
  if (!productFeatureSerialized.includes(requiredFeatureId)) {
    failures.push(`product-feature-registry must include ${requiredFeatureId}`);
  }
}
for (const requiredPrimaryId of productFeatureRegistry.product_position?.primary_feature_ids ?? []) {
  const feature = productFeatureRegistry.feature_layers?.find((item) => item.id === requiredPrimaryId);
  if (feature?.role !== "primary") {
    failures.push(`product feature ${requiredPrimaryId} must be primary`);
  }
}
const observabilityFeature = productFeatureRegistry.feature_layers?.find((item) => item.id === "observability_monitoring");
if (observabilityFeature?.role !== "supporting") {
  failures.push("observability_monitoring must be a supporting feature");
}
for (const requiredSupportingId of [
  "root_tool_management",
  "work_visibility",
  "agent_work_environment",
  "agent_development_environment",
  "learning_improvement_loop"
]) {
  const feature = productFeatureRegistry.feature_layers?.find((item) => item.id === requiredSupportingId);
  if (feature?.role !== "supporting") {
    failures.push(`product feature ${requiredSupportingId} must be supporting`);
  }
}
if (!productFeatureSerialized.includes("operator_surfaces_are_separate")) {
  failures.push("product-feature-registry must require operator surfaces to stay separate");
}
if (!productFeatureSerialized.includes("two_core_features_are_first")) {
  failures.push("product-feature-registry must keep the two core features first");
}
for (const requiredPhrase of ["awslabs_agentcore_samples", "Production Agent Blueprints", "agentcore_blueprint_gate"]) {
  if (!productFeatureSerialized.includes(requiredPhrase)) {
    failures.push(`product-feature-registry must include AgentCore production blueprint token ${requiredPhrase}`);
  }
}
const expectedPrimaryNavigationSections = ["overview", "agents", "desktop", "source", "intent"];
const expectedOperatorCenterSections = ["projects", "history", "structure", "documents", "requirements"];
if (JSON.stringify(productFeatureRegistry.desktop_home_surface?.primary_navigation_sections) !== JSON.stringify(expectedPrimaryNavigationSections)) {
  failures.push("product-feature-registry desktop_home_surface must keep work-first primary navigation sections");
}
if (JSON.stringify(productFeatureRegistry.desktop_home_surface?.operator_center_sections) !== JSON.stringify(expectedOperatorCenterSections)) {
  failures.push("product-feature-registry desktop_home_surface must keep operator center sections separated");
}

const productGapRegistry = readJson("configs/product-gap-registry.json");
const productGapSerialized = JSON.stringify(productGapRegistry);
const installableRequirementsKo = readFileSync(join(root, "docs/requirements/2026-06-02-installable-desktop.ko.md"), "utf8");
const installableRequirementsEn = readFileSync(join(root, "docs/requirements/2026-06-02-installable-desktop.en.md"), "utf8");
if (!installableRequirementsKo.includes("PDA-REQ-037") || !installableRequirementsEn.includes("PDA-REQ-037")) {
  failures.push("installable desktop requirements must include PDA-REQ-037 for product gap coverage");
}
for (const requiredTopLevelField of [
  "reader_guide",
  "reference_links",
  "structure_rules",
  "field_guide",
  "audit_scope",
  "coverage_summary",
  "request_coverage",
  "gap_items"
]) {
  if (!(requiredTopLevelField in productGapRegistry)) {
    failures.push(`product-gap-registry must include ${requiredTopLevelField}`);
  }
}
for (const requiredRequestId of [
  "UR-2026-06-03-024",
  "UR-2026-06-03-025",
  "UR-2026-06-03-026",
  "UR-2026-06-03-027",
  "UR-2026-06-03-028",
  "UR-2026-06-03-029",
  "UR-2026-06-03-030",
  "UR-2026-06-03-031",
  "UR-2026-06-03-032",
  "UR-2026-06-03-033",
  "UR-2026-06-03-034",
  "UR-2026-06-03-035",
  "UR-2026-06-03-036",
  "UR-2026-06-04-001"
]) {
  if (!productGapRegistry.request_coverage?.some((item) => item.request_id === requiredRequestId)) {
    failures.push(`product-gap-registry must include request coverage for ${requiredRequestId}`);
  }
}
for (const requiredGapId of [
  "agent_factory_creation_wizard",
  "learning_feedback_automation_loop",
  "native_workspace_git_operations",
  "componentized_desktop_ui_architecture",
  "interactive_pty_terminal_surface",
  "clipboard_browser_qa",
  "public_distribution_gates"
]) {
  if (!productGapRegistry.gap_items?.some((item) => item.gap_id === requiredGapId)) {
    failures.push(`product-gap-registry must include gap ${requiredGapId}`);
  }
}
const agentFactoryGap = productGapRegistry.gap_items?.find((item) => item.gap_id === "agent_factory_creation_wizard");
if (agentFactoryGap?.status !== "implemented_product_slice" || agentFactoryGap?.priority !== "p0_product_gap") {
  failures.push("product-gap-registry must mark agent_factory_creation_wizard as an implemented p0 product slice");
}
const learningLoopGap = productGapRegistry.gap_items?.find((item) => item.gap_id === "learning_feedback_automation_loop");
if (learningLoopGap?.status !== "implemented_product_slice" || learningLoopGap?.priority !== "p0_product_gap") {
  failures.push("product-gap-registry must mark learning_feedback_automation_loop as an implemented p0 product slice");
}
const nativeGitGap = productGapRegistry.gap_items?.find((item) => item.gap_id === "native_workspace_git_operations");
if (nativeGitGap?.status !== "implemented_product_slice") {
  failures.push("product-gap-registry must mark native_workspace_git_operations as implemented");
}
const clipboardGap = productGapRegistry.gap_items?.find((item) => item.gap_id === "clipboard_browser_qa");
if (clipboardGap?.status !== "implemented_test_coverage") {
  failures.push("product-gap-registry must mark clipboard_browser_qa as implemented test coverage");
}
const ptyGap = productGapRegistry.gap_items?.find((item) => item.gap_id === "interactive_pty_terminal_surface");
if (ptyGap?.status !== "implemented_product_slice") {
  failures.push("product-gap-registry must mark interactive_pty_terminal_surface as implemented");
}
const agentFeatureCoverage = productGapRegistry.request_coverage?.find((item) => item.request_id === "UR-2026-06-03-035");
if (agentFeatureCoverage?.coverage !== "covered") {
  failures.push("UR-2026-06-03-035 coverage must be covered after Agent Core and learning loop implementation");
}
if (agentFeatureCoverage?.remaining_gap_ids?.includes("agent_factory_creation_wizard")) {
  failures.push("UR-2026-06-03-035 coverage must not keep the Agent Core creation wizard gap after implementation");
}
if (agentFeatureCoverage?.remaining_gap_ids?.includes("learning_feedback_automation_loop")) {
  failures.push("UR-2026-06-03-035 coverage must not keep the learning feedback automation gap after implementation");
}
const clipboardCoverage = productGapRegistry.request_coverage?.find((item) => item.request_id === "UR-2026-06-03-025");
if (clipboardCoverage?.coverage !== "covered" || clipboardCoverage?.remaining_gap_ids?.includes("clipboard_browser_qa")) {
  failures.push("UR-2026-06-03-025 coverage must be covered after clipboard QA implementation");
}
const ptyCoverage = productGapRegistry.request_coverage?.find((item) => item.request_id === "UR-2026-06-03-029");
if (ptyCoverage?.coverage !== "covered" || ptyCoverage?.remaining_gap_ids?.includes("interactive_pty_terminal_surface")) {
  failures.push("UR-2026-06-03-029 coverage must be covered after PTY product decision");
}
const nativeGitCoverage = productGapRegistry.request_coverage?.find((item) => item.request_id === "UR-2026-06-03-033");
if (nativeGitCoverage?.coverage !== "covered" || nativeGitCoverage?.remaining_gap_ids?.includes("native_workspace_git_operations")) {
  failures.push("UR-2026-06-03-033 coverage must be covered after native Git workbench implementation");
}
if (!productGapSerialized.includes("monitoring polish") || !productGapSerialized.includes("p0_product_gap")) {
  failures.push("product-gap-registry must explicitly prioritize p0 product gaps over monitoring or cosmetic work");
}

const userFlowRegistry = readJson("configs/user-flow-registry.json");
const userFlowSerialized = JSON.stringify(userFlowRegistry);
for (const requiredPhrase of [
  "ai_cli_orchestration_flow",
  "Claude Code",
  "Gemini CLI",
  "Codex CLI",
  "OpenCode",
  "Claw Code",
  "Codex app-style thread workbench",
  "Claude Desktop-style connector chips",
  "MCP servers",
  "desktop extensions"
]) {
  if (!userFlowSerialized.includes(requiredPhrase)) {
    failures.push(`user-flow-registry must include ${requiredPhrase}`);
  }
}

const designTransferRegistry = readJson("configs/claude-code-design-transfer-registry.json");
const designTransferSerialized = JSON.stringify(designTransferRegistry);
for (const requiredPhrase of [
  "public_sources_only",
  "leaked_or_non_public_material",
  "permissioned_tool_execution",
  "plan_before_edit",
  "subagent_context_isolation",
  "skill_on_demand_packaging",
  "Claude Code CLI"
]) {
  if (!designTransferSerialized.includes(requiredPhrase)) {
    failures.push(`claude-code-design-transfer-registry must include ${requiredPhrase}`);
  }
}

const referenceAdvantageRegistry = readJson("configs/reference-platform-advantage-registry.json");
const referenceAdvantageSerialized = JSON.stringify(referenceAdvantageRegistry);
for (const requiredPhrase of [
  "public_sources_only",
  "workbench-activity-rail-editor-terminal",
  "codex-style-thread-workbench",
  "claude-desktop-connector-first-chat",
  "background-agent-task-lifecycle",
  "permission-hooks-checkpoints",
  "native-install-runtime-boundary",
  "command-palette-extension-catalog",
  "agentcore-style-production-agent-blueprints",
  "security-first-agentic-boundaries",
  "Codex app",
  "Claude Desktop",
  "claude_desktop_local_mcp_extensions"
]) {
  if (!referenceAdvantageSerialized.includes(requiredPhrase)) {
    failures.push(`reference platform advantage transfer must include ${requiredPhrase}`);
  }
}
if ((referenceAdvantageRegistry.transfer_patterns || []).length < 10) {
  failures.push("reference-platform-advantage-registry must include at least 10 transfer patterns");
}

const runtimeBoundaryRegistry = readJson("configs/runtime-data-boundary-registry.json");
const runtimeBoundarySerialized = JSON.stringify(runtimeBoundaryRegistry);
for (const requiredPhrase of [
  "installed_app_only",
  "installer_shell_runtime_contract",
  "hidden_in_installed_product",
  "platform_data_store",
  "log_store",
  "agent_workspace",
  "support_diagnostic",
  "installer_payload_policy",
  "agent-platform/configs/agents/"
]) {
  if (!runtimeBoundarySerialized.includes(requiredPhrase)) {
    failures.push(`runtime-data-boundary-registry must include ${requiredPhrase}`);
  }
}

const serviceReadinessRegistry = readJson("configs/service-readiness-registry.json");
const serviceReadinessSerialized = JSON.stringify(serviceReadinessRegistry);
for (const requiredPhrase of [
  "service_levels",
  "public_release_blockers",
  "runtime_surface_contract",
  "get_service_readiness_report",
  "updater_is_a_release_gate",
  "Native Resource Telemetry",
  "native_resource_telemetry",
  "Signed Distribution",
  "Update & Recovery",
  "Workspace Onboarding"
]) {
  if (!serviceReadinessSerialized.includes(requiredPhrase)) {
    failures.push(`service-readiness-registry must include ${requiredPhrase}`);
  }
}

const viewModeRegistry = readJson("../agent-platform/configs/access/view-mode-registry.json");
if (!JSON.stringify(viewModeRegistry).includes("desktop")) {
  failures.push("view-mode-registry must expose the desktop runtime section");
}
const userViewMode = viewModeRegistry.modes?.find((mode) => mode.id === "user");
if (JSON.stringify(userViewMode?.allowed_sections) !== JSON.stringify(expectedPrimaryNavigationSections)) {
  failures.push("user view mode must expose work-first sections only");
}
for (const operatorSection of expectedOperatorCenterSections) {
  if (userViewMode?.allowed_sections?.includes(operatorSection)) {
    failures.push(`user view mode must not foreground operator section ${operatorSection}`);
  }
}

const monitorShell = readFileSync(join(root, "renderer/workspace-monitor/components/MonitorShell.tsx"), "utf8");
const coreFeatureDrilldown = readFileSync(
  join(root, "renderer/workspace-monitor/components/workbench/CoreFeatureDrilldown.tsx"),
  "utf8"
);
const nativeGitWorkbench = readFileSync(
  join(root, "renderer/workspace-monitor/components/workbench/NativeGitWorkbench.tsx"),
  "utf8"
);
const pathDisclosure = readFileSync(
  join(root, "renderer/workspace-monitor/components/workbench/PathDisclosure.tsx"),
  "utf8"
);
const runtimeTerminalDrawer = readFileSync(
  join(root, "renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx"),
  "utf8"
);
const workspaceExplorerPane = readFileSync(
  join(root, "renderer/workspace-monitor/components/workbench/WorkspaceExplorerPane.tsx"),
  "utf8"
);
const agentBuilderPanels = readFileSync(
  join(root, "renderer/workspace-monitor/components/workbench/AgentBuilderPanels.tsx"),
  "utf8"
);
const agentDetailPanels = readFileSync(
  join(root, "renderer/workspace-monitor/components/workbench/AgentDetailPanels.tsx"),
  "utf8"
);
const monitorWorkbenchSource = `${monitorShell}\n${coreFeatureDrilldown}\n${nativeGitWorkbench}\n${pathDisclosure}\n${runtimeTerminalDrawer}\n${workspaceExplorerPane}\n${agentBuilderPanels}\n${agentDetailPanels}`;
const monitorStyles = readFileSync(join(root, "renderer/workspace-monitor/app/globals.css"), "utf8");
const clipboardUtility = readFileSync(join(root, "renderer/workspace-monitor/lib/clipboard.mjs"), "utf8");
const clipboardTest = readFileSync(join(root, "tests/clipboard.test.mjs"), "utf8");
const nativeGitWorkbenchKo = readFileSync(join(root, "docs/architecture/native-git-workbench.ko.md"), "utf8");
const nativeGitWorkbenchEn = readFileSync(join(root, "docs/architecture/native-git-workbench.en.md"), "utf8");
const ptyDecisionKo = readFileSync(join(root, "docs/architecture/pty-terminal-decision.ko.md"), "utf8");
const ptyDecisionEn = readFileSync(join(root, "docs/architecture/pty-terminal-decision.en.md"), "utf8");
const productFeaturePanel = readFileSync(
  join(root, "renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx"),
  "utf8"
);
const monitorCollector = readFileSync(join(root, "renderer/workspace-monitor/scripts/collect-workspace.mjs"), "utf8");
const productFeatureCollector = readFileSync(
  join(root, "renderer/workspace-monitor/scripts/lib/product-feature-architecture.mjs"),
  "utf8"
);
const customerBundleCheck = readFileSync(join(root, "scripts/check-customer-bundle.mjs"), "utf8");
const releaseReadinessCheck = readFileSync(join(root, "scripts/check-release-readiness.mjs"), "utf8");
const serviceReadinessCheck = readFileSync(join(root, "scripts/check-service-readiness.mjs"), "utf8");
const publicReleaseConfig = readFileSync(join(root, "scripts/public-release-config.mjs"), "utf8");
const publicReleaseBuild = readFileSync(join(root, "scripts/public-release-build.mjs"), "utf8");
const updaterManifest = readFileSync(join(root, "scripts/create-updater-manifest.mjs"), "utf8");
const lazyBoundaryCheck = readFileSync(
  join(root, "renderer/workspace-monitor/scripts/check-lazy-boundary-contract.mjs"),
  "utf8"
);
for (const requiredPhrase of ["buildCustomerSnapshot", "customer_snapshot_sanitized", "--snapshot-mode", "sourceFiles: []"]) {
  if (!monitorCollector.includes(requiredPhrase)) {
    failures.push(`workspace-monitor collector must include customer snapshot token ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["referenceAdvantages", "reference-advantage-board", "레퍼런스 장점 적용 지도"]) {
  if (!productFeaturePanel.includes(requiredPhrase)) {
    failures.push(`product feature panel must include reference advantage UI token ${requiredPhrase}`);
  }
}
for (const requiredPhrase of [
  "collectProductFeatureArchitecture",
  "productFeatureArchitecture",
  "sanitizeProductFeatureArchitectureForCustomer"
]) {
  if (!monitorCollector.includes(requiredPhrase) && !productFeatureCollector.includes(requiredPhrase)) {
    failures.push(`workspace-monitor product feature collector must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of [
  "lazyBoundaryTargets",
  "lazy_boundary_contract_ok",
  "MonitorShell must type-only import",
  "MonitorShell must dynamic import",
  "MonitorShell must keep an explicit preload path"
]) {
  if (!lazyBoundaryCheck.includes(requiredPhrase)) {
    failures.push(`workspace-monitor lazy boundary contract must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of [
  "collectReferencePlatformAdvantages",
  "referencePlatformAdvantages",
  "sanitizeReferencePlatformAdvantagesForCustomer"
]) {
  if (!monitorCollector.includes(requiredPhrase)) {
    failures.push(`workspace-monitor reference advantage collector must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["auditCustomerSnapshot", "scanCustomerDist", "customer_bundle_ready", "MAX_DIST_SCAN_FILES", "frontendDist"]) {
  if (!customerBundleCheck.includes(requiredPhrase)) {
    failures.push(`check-customer-bundle.mjs must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["checkReleaseReadiness", "public_release_blocked", "hardenedRuntime", "Developer ID", "notarization", "TAURI_SIGNING_PRIVATE_KEY", "TAURI_UPDATER_PUBLIC_KEY"]) {
  if (!releaseReadinessCheck.includes(requiredPhrase)) {
    failures.push(`check-release-readiness.mjs must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of [
  "createUpdaterArtifacts",
  "TAURI_UPDATER_ENDPOINTS",
  "TAURI_RELEASE_ASSET_BASE_URL",
  "service-update-channel.json",
  "TAURI_SIGNING_PRIVATE_KEY",
  "TAURI_SIGNING_PRIVATE_KEY_PATH"
]) {
  if (!publicReleaseConfig.includes(requiredPhrase)) {
    failures.push(`public-release-config.mjs must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["tauri", "build", "--config", "create-updater-manifest.mjs"]) {
  if (!publicReleaseBuild.includes(requiredPhrase)) {
    failures.push(`public-release-build.mjs must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["latest.json", ".app.tar.gz", ".sig", "platforms", "signature"]) {
  if (!updaterManifest.includes(requiredPhrase)) {
    failures.push(`create-updater-manifest.mjs must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of [
  "checkServiceReadiness",
  "service_internal_ready_public_blocked",
  "Signed updater channel",
  "Workspace Onboarding",
  "Production Agent Blueprints",
  "Native Resource Telemetry",
  "desktop_resource_snapshot_command"
]) {
  if (!serviceReadinessCheck.includes(requiredPhrase)) {
    failures.push(`check-service-readiness.mjs must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["writeClipboardText", "clipboard.writeText", "textarea copy path", "execCommand", "setSelectionRange"]) {
  if (!clipboardUtility.includes(requiredPhrase)) {
    failures.push(`clipboard utility must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["falls back to textarea copy", "no write path is available", "navigator clipboard"]) {
  if (!clipboardTest.includes(requiredPhrase)) {
    failures.push(`clipboard test must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["Native Git Workbench", "get_desktop_git_status", "run_desktop_git_action", "Credential / SSH", "bounded command output"]) {
  if (!nativeGitWorkbenchKo.includes(requiredPhrase) || !nativeGitWorkbenchEn.includes(requiredPhrase)) {
    failures.push(`native Git workbench docs must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of ["pipe-first CLI supervisor", "xterm.js", "Rust PTY crate", "start_native_pty_terminal"]) {
  if (!ptyDecisionKo.includes(requiredPhrase) || !ptyDecisionEn.includes(requiredPhrase)) {
    failures.push(`PTY decision docs must include ${requiredPhrase}`);
  }
}
for (const requiredPhrase of [
  "DesktopRuntimePanel",
  "list_cli_adapters",
  "run_all_cli_adapter_health",
  "run_cli_adapter_health",
  "list_cli_task_pipeline_presets",
  "list_cli_task_run_records",
  "read_cli_task_run_record",
  "prune_cli_task_run_records",
  "list_runtime_data_roots",
  "run_installer_payload_audit",
  "create_support_diagnostic_bundle",
  "get_service_readiness_report",
  "start_cli_adapter_session",
  "start_cli_task_pipeline",
  "start_native_pty_terminal",
  "poll_native_pty_terminal_session",
  "list_native_pty_terminal_sessions",
  "write_native_pty_terminal_input",
  "resize_native_pty_terminal",
  "cancel_native_pty_terminal",
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
  "SearchAgentWorkChatPanel",
  "AgentCoreBlueprintPanel",
  "agentCoreBlueprints",
  "applyAgentCoreBlueprint",
  "createAgentCoreBlueprintProposal",
  "AgentCore Quick Builder",
  "바로 에이전트 제안 생성",
  "local_python_agent_runtime",
  "local_process_execution",
  "agentcore-blueprint-panel",
  "Production 에이전트 블루프린트",
  "에이전트 생성 입력 채우기",
  "배포 사전점검 작업 만들기",
  "SearchAgentChatMessage",
  "renderSearchAgentPrompt",
  "research-insight-planner-agent",
  "research_insight_agent_pipe",
  "Unified Ops",
  "visibleUnifiedEvents",
  "ops-event-rail",
  "Task Pipe Init",
  "Task Run Store",
  "저장된 실행 기록과 로그",
  "Refresh task runs",
  "Open Logs",
  "Prune Old",
  "record JSON",
  "Init task pipe",
  "merge gate",
  "검색 에이전트 작업 채팅",
  "작업 시작",
  "agent-chat-thread",
  "Search Agent Pipe",
  "Answer & Resume",
  "warm_workspace_os_resources",
  "prepare_workspace_os_resources",
  "get_desktop_resource_snapshot",
  "read_workspace_text_file",
  "write_workspace_text_file",
  "list_workspace_text_files",
  "OS 캐시",
  "메모리 예산",
  "앱 RAM/CPU",
  "DesktopResourceSnapshotReport",
  "desktopResourceSnapshot",
  "native warming",
  "native cache",
  "작업공간 Explorer",
  "파일시스템을 끌어와서 처리하기",
  "작업공간 접근 권한 요청",
  "permissionGranted",
  "permissionDetail",
  "workspace-permission-hint",
  "workspace-explorer-pane",
  "workspace-explorer-tree",
  "filesystem-workbench-shell",
  "현재 작업공간",
  "파일 목록 새로고침",
  "선택 파일 열기",
  "현재 파일 저장",
  "열린 변경 모두 저장",
  "내용 복사",
  "Refresh Files",
  "Editor Settings",
  "Diff Review",
  "MonacoDiffEditor",
  "Auto-defer questions",
  "하단 다중 CLI 터미널",
  "바로 쓰기",
  "핵심 기능",
  "지금 할 일 하나를 고릅니다",
  "에이전트 코어",
  "CLI 오케스트레이션",
  "루트 툴",
  "작업 가시성",
  "main-workbench-panel",
  "home-depth-menu",
  "main-feature-detail",
  "path-disclosure",
  "다크",
  "라이트",
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
  "TASK_RUN_REFRESH_THROTTLE_MS",
  "INBOX_REFRESH_THROTTLE_MS",
  "taskRunRecords",
  "taskRunDetail",
  "loadTaskRunDetail",
  "pruneTaskRunRecords",
  "refreshTaskRunRecords",
  "task-run-panel",
  "Runtime Data & Support",
  "Accumulated Data",
  "축적 데이터 인덱스",
  "get_accumulated_data_overview",
  "accumulated-data-panel",
  "accumulated-store-grid",
  "설치형 데이터 경계",
  "Installer Payload Audit",
  "Support Diagnostic Bundle",
  "Workspace Host",
  "앱 워크스페이스",
  "Import Workspace",
  "Clone Workspace",
  "get_desktop_workspace_state",
  "set_desktop_workspace_path",
  "choose_desktop_workspace_folder",
  "clone_desktop_workspace",
  "get_desktop_git_status",
  "run_desktop_git_action",
  "DesktopGitStatusReport",
  "Native Git Workbench",
  "native-git-panel",
  "native-git-layout",
  "native-git-diff-pane",
  "native-git-diff-preview",
  "native-git-change-meter",
  "native-git-view-tabs",
  "native-git-select-all",
  "native-git-history-list",
  "native-git-stash-list",
  "diffPreview",
  "changeKind",
  "additions",
  "deletions",
  "commit_selected",
  "discard_selected",
  "stash_selected",
  "apply_stash",
  "새로고침",
  "Git 작업대",
  "선택 커밋",
  "Pull",
  "writeClipboardText",
  "nativeWorkspaceCopy",
  "native-file-workspace-panel",
  "surface=\"files\"",
  "DESKTOP_PREFERENCES_SCHEMA_VERSION",
  "DesktopPreferencesReport",
  "get_desktop_preferences",
  "save_desktop_preferences",
  "desktopPreferencesPath",
  "앱 설정 저장소",
  "native-preferences-pane",
  "ProviderAccountsPanel",
  "제공자 계정 연결",
  "AI 로그인 설정",
  "provider-login-guide",
  "provider-filter-choice",
  "provider-model-strip",
  "ProviderActionFeedback",
  "provider-button-status",
  "provider-action-live-region",
  "has-provider-status",
  "계정 연결",
  "ProviderCredentialReport",
  "list_provider_credentials",
  "save_provider_credential",
  "clear_provider_credential",
  "open_provider_auth_url",
  "list_provider_models",
  "run_provider_agent_task",
  "ProviderAgentTaskReport",
  "ProviderModelCatalogReport",
  "agent-provider-run-controls",
  "agent-model-picker",
  "fallbackProviderCredentialReport",
  "providerIdsByAdapter",
  "OPENAI_API_KEY",
  "ANTHROPIC_API_KEY",
  "GEMINI_API_KEY",
  "화면 언어",
  "파일/코드",
  "현재 작업공간",
  "refreshRuntimeDataBoundary",
  "runInstallerPayloadAudit",
  "createSupportDiagnosticBundle",
  "RuntimeDataBoundaryReport",
  "InstallerPayloadAuditReport",
  "SupportDiagnosticBundleReport",
  "AccumulatedDataOverviewReport",
  "refreshAccumulatedDataOverview",
  "accumulatedDataOverview",
  "schemaVersion",
  "storageFormatVersion",
  "indexPath",
  "formatMigrationStatus",
  "AgentFactoryWizard",
  "Agent proposal 저장",
  "create_agent_factory_proposal",
  "agentFactoryPreviewSpec",
  "agent-factory-wizard-panel",
  "agent-factory-layout",
  "agent_factory_proposals",
  "LearningFeedbackLoopPanel",
  "Decision 저장",
  "record_learning_improvement_decision",
  "buildLearningImprovementCandidates",
  "learning-feedback-panel",
  "learning-feedback-layout",
  "learning_feedback_decisions",
  "runtime-data-panel",
  "Mode & Function Switchboard",
  "모드와 기능 선택 위치",
  "ModeFunctionSwitchboard",
  "modeFunctionCatalog",
  "mode-switchboard-panel",
  "openModeFunctionOption",
  "settings-tab-list",
  "settings-subsection-rail",
  "SettingsSubsectionId",
  "settings-controlled-summary",
  "terminal-drawer",
  "terminal-drawer-launcher",
  "terminal-drawer-backdrop",
  "terminal-drawer-workbench",
  "terminal-drawer-sidebar",
  "terminal-drawer-main",
  "terminal-view-switcher",
  "TerminalDrawerView",
  "source-workbench-switcher",
  "SourceWorkbenchView",
  "source-workbench-view-",
  "tabIndex={0}",
  "CLI 세션 목록",
  "선택한 CLI 출력",
  "터미널 이벤트 목록",
  "설정 본문",
  "소스 편집 스크롤 영역",
  "foldAll",
  "unfoldAll",
  "코드 접기",
  "코드 펼치기",
  "aria-expanded={expanded}",
  "workspace-tree-folder",
  "collapsed",
  "intellij-run-workbench-panel",
  "ide-run-toolbar",
  "ide-tool-window-layout",
  "ide-run-config-list",
  "ide-services-window",
  "ide-problems-strip",
  "Run Configuration",
  "Services",
  "Problems",
  "quick-start-flow",
  "desktop-app-root theme-",
  "desktop-app-shell sidebar-",
  "data-ui-foundation=\"gestalt-hierarchy-density\"",
  "ClaudeCodeTransferPanel",
  "claudeCodeDesignTransfer",
  "Claude Code Design Transfer",
  "Public sources only",
  "transfer-pattern-grid",
  "핵심 기능",
  "루트 툴",
  "Operator Center",
  "operatorSectionIds",
  "Open Operator Center"
]) {
  if (!monitorWorkbenchSource.includes(requiredPhrase)) {
    failures.push(`workspace-monitor workbench source must include ${requiredPhrase}`);
  }
}
if (monitorShell.includes("localStorage")) {
  failures.push("workspace-monitor settings must not persist desktop app preferences through browser localStorage");
}
for (const forbiddenBackground of ["background: #ffffff", "background: #fbfcfd", "background: white", "background: #fff9eb", "background: #fff4f4", "background: #f4f9ff"]) {
  if (monitorStyles.includes(forbiddenBackground)) {
    failures.push(`workspace-monitor CSS must not use light-only background token ${forbiddenBackground}`);
  }
}
for (const requiredScrollToken of [
  ".settings-tab-panel",
  ".settings-subsection-rail",
  ".filesystem-workbench-shell",
  ".workspace-explorer-tree",
  ".source-editor-frame",
  ".source-workbench-switcher",
  ".source-workbench-view-files",
  ".session-grid",
  ".terminal-view-switcher",
  ".terminal-view-panel",
  ".terminal-drawer-workbench",
  ".terminal-drawer-sidebar",
  ".terminal-drawer-main",
  ".session-list",
  ".session-terminal pre",
  "SF Pro Text",
  "Apple SD Gothic Neo",
  "transform: none",
  "overscroll-behavior: contain",
  "scrollbar-gutter: stable",
  "minmax(0, 1fr)"
]) {
  if (!monitorStyles.includes(requiredScrollToken)) {
    failures.push(`workspace-monitor CSS must preserve split scroll token ${requiredScrollToken}`);
  }
}
for (const requiredButtonToken of [
  "--control-hit-size",
  "--control-target-size",
  "--grid-unit: 4px",
  "--surface-depth-focus",
  "--state-hover-surface",
  "--focus-halo-size",
  "--text-natural-wrap",
  "--text-long-token-wrap",
  "touch-action: manipulation",
  "word-break: keep-all",
  "button:focus-visible",
  "button:not(:disabled):active",
  ".desktop-actions button",
  ".terminal-view-switcher button",
  ".source-workbench-switcher button",
  ".desktop-app-root :where(",
  "overflow-wrap: var(--text-long-token-wrap)"
]) {
  if (!monitorStyles.includes(requiredButtonToken)) {
    failures.push(`workspace-monitor CSS must preserve desktop button token ${requiredButtonToken}`);
  }
}
if (/button\s*{[^}]*overflow-wrap:\s*anywhere/s.test(monitorStyles)) {
  failures.push("workspace-monitor CSS must not use overflow-wrap:anywhere on the global button rule");
}
if (/\.desktop-app-root button > span[\s\S]*?{[^}]*overflow-wrap:\s*anywhere/s.test(monitorStyles)) {
  failures.push("workspace-monitor CSS must not use overflow-wrap:anywhere on generic button label children");
}
for (const requiredPhrase of [
  "ProductFeatureArchitecturePanel",
  "CLI Orchestration",
  "Agent Core",
  "Open CLI Orchestration",
  "Open Agent Core",
  "Observability is support",
  "Agent Capability Platform",
  "Operator tools are separate",
  "Open Operator Center"
]) {
  if (!monitorShell.includes(requiredPhrase) && !productFeaturePanel.includes(requiredPhrase)) {
    failures.push(`workspace-monitor product feature panel must include ${requiredPhrase}`);
  }
}

const adapterRegistry = readJson("../agent-platform/configs/integrations/cli-adapter-registry.json");
const adapterSerialized = JSON.stringify(adapterRegistry);
for (const requiredPhrase of ["supported_ai_cli_adapters", "interactive_cli_contract", "terminal_io_contract", "claude-code-cli", "gemini-cli", "codex-cli", "opencode-cli", "claw-code-cli"]) {
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
  failures.push("node is required for desktop product checks and workspace-monitor build orchestration");
}
if (!commandExists("npm")) {
  failures.push("npm is required for desktop product checks and Tauri CLI scripts");
}
if (!commandExists("rustc") || !commandExists("cargo")) {
  warnings.push("Rust toolchain is not installed; tauri:dev and tauri:build are blocked until a documented installation audit is completed");
}

const result = {
  status: failures.length === 0 ? "desktop_product_structure_ready_public_release_gated" : "rework_required",
  failures,
  warnings,
  checked_files: requiredFiles.length,
  release_claim: "The desktop product structure is ready for local/internal validation. Public release remains gated by OS signing, notarization where applicable, Windows signing, signed update/recovery, and clean-machine smoke tests."
};

console.log(JSON.stringify(result, null, 2));

if (failures.length > 0) {
  process.exit(1);
}
