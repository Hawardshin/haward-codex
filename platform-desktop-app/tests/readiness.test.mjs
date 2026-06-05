import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url).pathname;

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8"));
}

test("desktop product shell has the selected Tauri entry points", () => {
  assert.equal(existsSync(join(root, "src-tauri/tauri.conf.json")), true);
  assert.equal(existsSync(join(root, "src-tauri/src/lib.rs")), true);
  assert.equal(existsSync(join(root, "README.ko.md")), true);
  assert.equal(existsSync(join(root, "README.en.md")), true);
  assert.equal(existsSync(join(root, "docs/release-runbook.ko.md")), true);
  assert.equal(existsSync(join(root, "docs/release-runbook.en.md")), true);
  assert.equal(existsSync(join(root, "scripts/desktop-pipeline.mjs")), true);
  assert.equal(existsSync(join(root, "scripts/desktop-pipeline/paths.mjs")), true);
  assert.equal(existsSync(join(root, "scripts/desktop-pipeline/definitions.mjs")), true);
  assert.equal(existsSync(join(root, "scripts/desktop-pipeline/runner.mjs")), true);
  assert.equal(existsSync(join(root, "scripts/readiness/desktop-build-pipeline.mjs")), true);
  assert.equal(existsSync(join(root, "scripts/desktop-doctor.mjs")), true);
  assert.equal(existsSync(join(root, "configs/reference-platform-advantage-registry.json")), true);

  const config = readJson("src-tauri/tauri.conf.json");
  assert.equal(config.productName, "Agent Workspace Platform");
  assert.equal(config.identifier, "com.personalagentplatform.desktop");
  assert.equal(config.build.frontendDist, "../renderer/workspace-monitor/out");
  assert.equal(config.app.withGlobalTauri, true);
  assert.equal(config.bundle.macOS.hardenedRuntime, true);
  assert.equal(config.bundle.macOS.entitlements, "Entitlements.plist");
  assert.equal(existsSync(join(root, "src-tauri/Entitlements.plist")), true);
  assert.equal(config.bundle.resources["../runtime-contracts/installer-shell-runtime-contract.json"], "runtime-contracts/installer-shell-runtime-contract.json");
});

test("desktop docs expose bilingual one-command build and release paths", () => {
  const rootPkg = readJson("../package.json");
  const pkg = readJson("package.json");
  const readme = readFileSync(join(root, "README.md"), "utf8");
  const readmeKo = readFileSync(join(root, "README.ko.md"), "utf8");
  const readmeEn = readFileSync(join(root, "README.en.md"), "utf8");
  const releaseKo = readFileSync(join(root, "docs/release-runbook.ko.md"), "utf8");
  const releaseEn = readFileSync(join(root, "docs/release-runbook.en.md"), "utf8");
  const pipelineEntrypoint = readFileSync(join(root, "scripts/desktop-pipeline.mjs"), "utf8");
  const pipelineDefinitions = readFileSync(join(root, "scripts/desktop-pipeline/definitions.mjs"), "utf8");
  const pipelineRunner = readFileSync(join(root, "scripts/desktop-pipeline/runner.mjs"), "utf8");
  const buildPipelineReadiness = readFileSync(join(root, "scripts/readiness/desktop-build-pipeline.mjs"), "utf8");
  const pipelineStructure = `${pipelineEntrypoint}\n${pipelineDefinitions}\n${pipelineRunner}`;
  const requirementsKo = readFileSync(join(root, "docs/requirements/2026-06-02-installable-desktop.ko.md"), "utf8");
  const requirementsEn = readFileSync(join(root, "docs/requirements/2026-06-02-installable-desktop.en.md"), "utf8");

  assert.match(requirementsKo, /PDA-REQ-038/);
  assert.match(requirementsEn, /PDA-REQ-038/);
  assert.match(requirementsKo, /PDA-REQ-039/);
  assert.match(requirementsEn, /PDA-REQ-039/);
  for (const scriptName of [
    "desktop:setup",
    "desktop:setup:verify",
    "desktop:verify:quick",
    "desktop:verify",
    "desktop:renderer:build",
    "desktop:package:internal",
    "desktop:package:public",
    "desktop:release:report",
    "desktop:doctor"
  ]) {
    assert.ok(rootPkg.scripts[scriptName]);
  }
  for (const scriptName of ["doctor", "setup", "verify:quick", "verify", "package:internal", "package:public", "deploy:public:report", "pipeline:dry-run"]) {
    assert.ok(pkg.scripts[scriptName]);
  }
  for (const command of [
    "corepack pnpm run desktop:setup:verify",
    "corepack pnpm run desktop:verify",
    "corepack pnpm run desktop:package:internal",
    "corepack pnpm run desktop:package:public",
    "corepack pnpm run desktop:release:report",
    "corepack pnpm run desktop:doctor"
  ]) {
    const pattern = new RegExp(command.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    assert.match(readme, pattern);
    assert.match(readmeKo, pattern);
    assert.match(readmeEn, pattern);
    assert.match(releaseKo, pattern);
    assert.match(releaseEn, pattern);
  }
  assert.match(pipelineEntrypoint, /desktop-pipeline\/runner\.mjs/);
  assert.match(buildPipelineReadiness, /checkDesktopBuildPipeline/);
  assert.match(buildPipelineReadiness, /desktopBuildPipelineRequiredFiles/);
  assert.match(buildPipelineReadiness, /desktop:doctor/);
  for (const token of ["package-internal", "package-public", "public-report", "commonVerifySteps", "Public release preflight", "Tauri internal package build", "Tauri public package build", "create-updater-manifest", "codesign", "hdiutil"]) {
    assert.match(pipelineStructure, new RegExp(token));
  }
  const packagePublicDefinition = pipelineDefinitions.slice(pipelineDefinitions.indexOf('"package-public"'));
  const packagePublicPreflightIndex = packagePublicDefinition.indexOf("Public release preflight");
  const packagePublicVerifyIndex = packagePublicDefinition.indexOf("...commonVerifySteps");
  assert.notEqual(packagePublicPreflightIndex, -1);
  assert.notEqual(packagePublicVerifyIndex, -1);
  assert.ok(
    packagePublicPreflightIndex < packagePublicVerifyIndex,
    "package-public must fail fast on missing public signing/updater/notarization env before expensive verification"
  );
  assert.match(releaseKo, /Developer ID/);
  assert.match(releaseKo, /notarization/);
  assert.match(releaseEn, /Developer ID/);
  assert.match(releaseEn, /notarization/);
});

test("desktop registry points to macOS and Windows execution profiles", () => {
  const registry = readJson("configs/desktop-distribution-registry.json");
  const serialized = JSON.stringify(registry);

  assert.equal(registry.recommended_initial_path.id, "tauri_first_cross_platform_shell");
  assert.match(serialized, /configs\/macos-execution-profile\.json/);
  assert.match(serialized, /configs\/windows-execution-profile\.json/);
  assert.match(serialized, /configs\/product-feature-registry\.json/);
});

test("product feature registry makes agent platform primary", () => {
  const registry = readJson("configs/product-feature-registry.json");
  const serialized = JSON.stringify(registry);

  assert.equal(registry.product_position.primary_product, "agent_capability_platform");
  assert.equal(registry.product_position.monitoring_role, "supporting_observability");
  for (const featureId of [
    "agent_orchestration",
    "agent_factory"
  ]) {
    assert.ok(registry.product_position.primary_feature_ids.includes(featureId));
    assert.equal(registry.feature_layers.find((feature) => feature.id === featureId)?.role, "primary");
  }
  for (const featureId of [
    "root_tool_management",
    "work_visibility",
    "agent_work_environment",
    "agent_development_environment",
    "learning_improvement_loop"
  ]) {
    assert.ok(registry.product_position.supporting_feature_ids.includes(featureId));
    assert.equal(registry.feature_layers.find((feature) => feature.id === featureId)?.role, "supporting");
  }
  assert.equal(registry.feature_layers.find((feature) => feature.id === "observability_monitoring")?.role, "supporting");
  assert.match(serialized, /CLI Orchestration/);
  assert.match(serialized, /Agent Core/);
  assert.match(serialized, /Root Tool Management/);
  assert.match(serialized, /Work Visibility/);
  assert.match(serialized, /Search Agent Work Chat/);
  assert.match(serialized, /Learning & Evaluation Loop/);
  assert.match(serialized, /Production Agent Blueprints/);
  assert.match(serialized, /awslabs_agentcore_samples/);
  assert.match(serialized, /agentcore_blueprint_gate/);
  assert.match(serialized, /supporting observability/);
  assert.match(serialized, /operator_surfaces_are_separate/);
  assert.deepEqual(registry.desktop_home_surface.primary_navigation_sections, ["overview", "agents", "desktop", "source", "intent"]);
  assert.deepEqual(registry.desktop_home_surface.operator_center_sections, [
    "projects",
    "history",
    "structure",
    "documents",
    "requirements"
  ]);
});

test("product gap registry keeps unresolved user-request gaps visible", () => {
  const registry = readJson("configs/product-gap-registry.json");
  const serialized = JSON.stringify(registry);
  const requirementsKo = readFileSync(join(root, "docs/requirements/2026-06-02-installable-desktop.ko.md"), "utf8");
  const requirementsEn = readFileSync(join(root, "docs/requirements/2026-06-02-installable-desktop.en.md"), "utf8");

  assert.equal(registry.name, "product-gap-registry");
  assert.match(requirementsKo, /PDA-REQ-037/);
  assert.match(requirementsEn, /PDA-REQ-037/);
  assert.equal(registry.coverage_summary.audited_request_count, 14);
  for (const requestId of [
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
    assert.ok(registry.request_coverage.some((item) => item.request_id === requestId));
  }

  const agentFactoryGap = registry.gap_items.find((item) => item.gap_id === "agent_factory_creation_wizard");
  assert.equal(agentFactoryGap.status, "implemented_product_slice");
  assert.equal(agentFactoryGap.priority, "p0_product_gap");
  assert.match(JSON.stringify(agentFactoryGap.acceptance_to_close), /Desktop Agent Core view/);
  assert.match(JSON.stringify(agentFactoryGap.current_evidence), /create_agent_factory_proposal/);

  const learningGap = registry.gap_items.find((item) => item.gap_id === "learning_feedback_automation_loop");
  assert.equal(learningGap.status, "implemented_product_slice");
  assert.equal(learningGap.priority, "p0_product_gap");
  assert.match(JSON.stringify(learningGap.acceptance_to_close), /improvement candidates/);
  assert.match(JSON.stringify(learningGap.current_evidence), /record_learning_improvement_decision/);

  const nativeGitGap = registry.gap_items.find((item) => item.gap_id === "native_workspace_git_operations");
  assert.equal(nativeGitGap.status, "implemented_product_slice");
  assert.match(JSON.stringify(nativeGitGap.current_evidence), /run_desktop_git_action/);

  const clipboardGap = registry.gap_items.find((item) => item.gap_id === "clipboard_browser_qa");
  assert.equal(clipboardGap.status, "implemented_test_coverage");
  assert.match(JSON.stringify(clipboardGap.current_evidence), /clipboard\.test\.mjs/);

  const ptyGap = registry.gap_items.find((item) => item.gap_id === "interactive_pty_terminal_surface");
  assert.equal(ptyGap.status, "implemented_product_slice");
  assert.match(JSON.stringify(ptyGap.current_evidence), /start_native_pty_terminal/);

  const request35 = registry.request_coverage.find((item) => item.request_id === "UR-2026-06-03-035");
  assert.equal(request35.coverage, "covered");
  assert.deepEqual(request35.remaining_gap_ids, []);
  const request25 = registry.request_coverage.find((item) => item.request_id === "UR-2026-06-03-025");
  assert.equal(request25.coverage, "covered");
  assert.deepEqual(request25.remaining_gap_ids, []);
  const request29 = registry.request_coverage.find((item) => item.request_id === "UR-2026-06-03-029");
  assert.equal(request29.coverage, "covered");
  assert.deepEqual(request29.remaining_gap_ids, []);
  const request33 = registry.request_coverage.find((item) => item.request_id === "UR-2026-06-03-033");
  assert.equal(request33.coverage, "covered");
  assert.deepEqual(request33.remaining_gap_ids, []);
  assert.match(serialized, /componentized_desktop_ui_architecture/);
  assert.match(serialized, /public_distribution_gates/);
  assert.match(serialized, /monitoring polish/);
});

test("execution profiles keep optional CLI adapters non-blocking", () => {
  for (const profilePath of ["configs/macos-execution-profile.json", "configs/windows-execution-profile.json"]) {
    const profile = readJson(profilePath);
    const serialized = JSON.stringify(profile);

    assert.match(serialized, /capability_missing/);
    assert.match(serialized, /workspace/);
    assert.ok(profile.smoke_tests.length >= 5);
  }
});

test("desktop registry records multi-CLI supervisor contract", () => {
  const registry = readJson("configs/desktop-distribution-registry.json");
  const serialized = JSON.stringify(registry);

  assert.match(serialized, /platform-first host runtime/);
  assert.match(serialized, /optional guest adapters/);
  assert.match(serialized, /multi_cli_supervisor/);
  assert.match(serialized, /Claude Code CLI/);
  assert.match(serialized, /Gemini CLI/);
  assert.match(serialized, /Codex CLI/);
  assert.match(serialized, /OpenCode/);
  assert.match(serialized, /Claw Code/);
});

test("Claude Code design transfer registry uses public-source boundary", () => {
  const registry = readJson("configs/claude-code-design-transfer-registry.json");
  const serialized = JSON.stringify(registry);

  assert.equal(registry.source_boundary.policy, "public_sources_only");
  assert.match(serialized, /leaked_or_non_public_material/);
  assert.match(serialized, /Permissioned Tool Execution/);
  assert.match(serialized, /Plan Before Edit/);
  assert.match(serialized, /Subagent Context Isolation/);
  assert.match(serialized, /Skill On-Demand Packaging/);
  assert.ok(registry.transfer_patterns.length >= 8);
});

test("reference platform advantage registry transfers researched strengths into product patterns", () => {
  const registry = readJson("configs/reference-platform-advantage-registry.json");
  const serialized = JSON.stringify(registry);

  assert.equal(registry.source_boundary.policy, "public_sources_only");
  assert.match(serialized, /workbench-activity-rail-editor-terminal/);
  assert.match(serialized, /codex-style-thread-workbench/);
  assert.match(serialized, /claude-desktop-connector-first-chat/);
  assert.match(serialized, /background-agent-task-lifecycle/);
  assert.match(serialized, /permission-hooks-checkpoints/);
  assert.match(serialized, /native-install-runtime-boundary/);
  assert.match(serialized, /command-palette-extension-catalog/);
  assert.match(serialized, /agentcore-style-production-agent-blueprints/);
  assert.match(serialized, /claw-style-command-orchestration/);
  assert.match(serialized, /manifest-parity-gap-audits/);
  assert.match(serialized, /security-first-agentic-boundaries/);
  assert.match(serialized, /VS Code/);
  assert.match(serialized, /Codex app/);
  assert.match(serialized, /Claude Desktop/);
  assert.match(serialized, /claude_desktop_local_mcp_extensions/);
  assert.match(serialized, /GitHub Copilot cloud agent/);
  assert.match(serialized, /OpenHands/);
  assert.match(serialized, /Claw Code/);
  assert.ok(registry.transfer_patterns.length >= 10);
});

test("runtime data boundary separates customer app from platform source", () => {
  const registry = readJson("configs/runtime-data-boundary-registry.json");
  const serialized = JSON.stringify(registry);

  assert.match(serialized, /installer_shell_runtime_contract/);
  assert.equal(registry.customer_visibility_policy.default_customer_visibility, "installed_app_only");
  assert.match(serialized, /platform source repository/);
  assert.match(serialized, /hidden_in_installed_product/);
  assert.match(serialized, /platform_data_store/);
  assert.match(serialized, /log_store/);
  assert.match(serialized, /agent_workspace/);
  assert.match(serialized, /support_diagnostic/);
  assert.equal(registry.agent_workspace_policy.definition_home, "agent-platform/configs/agents/");
  assert.ok(registry.log_taxonomy.length >= 5);
  assert.ok(registry.installer_payload_policy.disallowed.some((item) => item.includes("development repository source tree")));
  assert.ok(registry.installer_payload_policy.disallowed.some((item) => item.includes("_private/")));
});

test("installer shell runtime contract is bundled and enforceable", () => {
  const contract = readJson("runtime-contracts/installer-shell-runtime-contract.json");
  const serialized = JSON.stringify(contract);
  const pkg = readJson("package.json");
  const lib = readFileSync(join(root, "src-tauri/src/lib.rs"), "utf8");
  const cargoToml = readFileSync(join(root, "src-tauri/Cargo.toml"), "utf8");
  const defaultCapability = readFileSync(join(root, "src-tauri/capabilities/default.json"), "utf8");

  assert.equal(contract.installer_shell_contract.launch_model, "installed_app_owns_shell_runtime");
  assert.equal(contract.installer_shell_contract.shell_role, "primary_platform_host");
  assert.equal(contract.installer_shell_contract.external_cli_role, "optional_guest_adapter_lane");
  assert.match(pkg.scripts.check, /check-runtime-contract\.mjs/);
  assert.match(pkg.scripts["runtime:contract"], /check-runtime-contract\.mjs/);
  for (const requiredGate of [
    "web_first_intake",
    "memory_bootstrap",
    "work_mode_selection",
    "runtime_data_boundary",
    "cli_adapter_boundary",
    "sensitive_file_boundary",
    "omission_check",
    "resource_check",
    "work_evaluation"
  ]) {
    assert.match(serialized, new RegExp(requiredGate));
  }
  for (const target of [
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
    "provider_credential_state",
    "accumulated_data_index"
  ]) {
    assert.match(serialized, new RegExp(target));
  }
  assert.match(lib, /get_installer_shell_runtime_contract/);
  assert.match(lib, /get_accumulated_data_overview/);
  assert.equal(contract.runtime_command_surface.accumulated_data_command, "get_accumulated_data_overview");
  assert.ok(contract.runtime_command_surface.agent_run_presets.some((preset) => preset.preset_id === "research_insight_agent"));
  assert.match(JSON.stringify(contract.runtime_command_surface.agent_run_presets), /research-insight-planner-agent/);
  const agentFactoryTarget = contract.data_accumulation_targets.find((target) => target.target_id === "agent_factory_proposals");
  assert.equal(agentFactoryTarget.record_type, "agent_factory_proposal");
  assert.equal(agentFactoryTarget.directory, "app_data/runtime-data/agent-factory/proposals");
  const learningFeedbackTarget = contract.data_accumulation_targets.find((target) => target.target_id === "learning_feedback_decisions");
  assert.equal(learningFeedbackTarget.record_type, "learning_feedback_decision");
  assert.equal(learningFeedbackTarget.directory, "app_data/runtime-data/learning-feedback/decisions");
  assert.ok(contract.runtime_command_surface.agent_factory_commands.includes("create_agent_factory_proposal"));
  assert.ok(contract.runtime_command_surface.learning_feedback_commands.includes("record_learning_improvement_decision"));
  for (const preferencesCommand of ["get_desktop_preferences", "save_desktop_preferences"]) {
    assert.match(lib, new RegExp(preferencesCommand));
    assert.ok(contract.runtime_command_surface.preferences_commands.includes(preferencesCommand));
  }
  for (const providerCredentialCommand of [
    "list_provider_credentials",
    "save_provider_credential",
    "clear_provider_credential",
    "open_provider_auth_url",
    "run_provider_agent_task"
  ]) {
    assert.match(lib, new RegExp(providerCredentialCommand));
    assert.ok(contract.runtime_command_surface.provider_credential_commands.includes(providerCredentialCommand));
  }
  const providerCredentialTarget = contract.data_accumulation_targets.find((target) => target.target_id === "provider_credential_state");
  assert.equal(providerCredentialTarget.record_type, "local_secret_config");
  assert.equal(providerCredentialTarget.directory, "app_config/provider-credentials");
  assert.equal(providerCredentialTarget.support_export_policy, "excluded_and_redacted");
  assert.match(lib, /DesktopPreferencesReport/);
  assert.match(lib, /DESKTOP_PREFERENCES_SCHEMA_VERSION/);
  assert.match(lib, /desktop-preferences\.v1\.json/);
  for (const workspaceHostCommand of [
    "get_desktop_workspace_state",
    "set_desktop_workspace_path",
    "choose_desktop_workspace_folder",
    "clone_desktop_workspace",
    "get_desktop_git_status",
    "run_desktop_git_action"
  ]) {
    assert.match(lib, new RegExp(workspaceHostCommand));
    assert.ok(contract.runtime_command_surface.workspace_host_commands.includes(workspaceHostCommand));
  }
  assert.match(cargoToml, /tauri-plugin-dialog/);
  assert.match(cargoToml, /tauri-plugin-updater/);
  assert.match(defaultCapability, /dialog:default/);
  assert.match(lib, /DialogExt/);
  assert.match(lib, /tauri_plugin_dialog::init/);
  assert.match(lib, /tauri_plugin_updater::Builder/);
  assert.match(lib, /service-update-channel\.json/);
  assert.match(lib, /blocking_pick_folder/);
  assert.match(lib, /WorkspaceResourceWarmupReport/);
  assert.match(lib, /start_background_warmup/);
  assert.match(lib, /workspace-resource-warmup/);
  assert.match(cargoToml, /rayon = "1\.12\.0"/);
  assert.match(cargoToml, /sysinfo = \{ version = "0\.39\.3", default-features = false, features = \["system"\] \}/);
  assert.match(lib, /WorkspaceResourceProfile/);
  assert.match(lib, /MAX_WORKSPACE_PRELOAD_TEXT_FILES: usize = 2_048/);
  assert.match(lib, /MAX_WORKSPACE_PRELOAD_TEXT_BYTES: usize = 512_000_000/);
  assert.match(lib, /MAX_WORKSPACE_PRELOAD_WORKERS: usize = 16/);
  assert.match(lib, /workspace_resource_profile/);
  assert.match(lib, /rayon_parallel_cpu_ram_budget/);
  assert.match(lib, /build_workspace_thread_pool/);
  assert.match(lib, /parallel_workers/);
  assert.match(lib, /memory_budget_bytes/);
  const accumulatedIndexTarget = contract.data_accumulation_targets.find((target) => target.target_id === "accumulated_data_index");
  assert.equal(accumulatedIndexTarget.record_type, "runtime_data_index_manifest");
  assert.equal(accumulatedIndexTarget.directory, "app_data/runtime-data/indexes");
  assert.match(accumulatedIndexTarget.runtime_store, /accumulated-data-overview\.v1\.json/);
  assert.match(lib, /resolve_installer_shell_runtime_contract_path/);
  assert.match(lib, /InstallerShellRuntimeContractReport/);
});

test("service readiness registry records production service blockers", () => {
  const registry = readJson("configs/service-readiness-registry.json");
  const serialized = JSON.stringify(registry);

  assert.match(serialized, /service_levels/);
  assert.match(serialized, /public_release_blockers/);
  assert.match(serialized, /runtime_surface_contract/);
  assert.match(serialized, /get_service_readiness_report/);
  assert.match(serialized, /Signed Distribution/);
  assert.match(serialized, /Update & Recovery/);
  assert.match(serialized, /Workspace Onboarding/);
  assert.match(serialized, /Native Resource Telemetry/);
  assert.match(serialized, /native_resource_telemetry/);
  assert.match(serialized, /Provider Accounts/);
  assert.match(serialized, /Production Agent Blueprints/);
  assert.match(serialized, /production_agent_blueprints/);
  assert.match(serialized, /direct model-task execution readiness/);
  assert.match(serialized, /updater_is_a_release_gate/);
});

test("user flow exposes AI CLI orchestration and source editing surfaces", () => {
  const registry = readJson("configs/user-flow-registry.json");
  const serialized = JSON.stringify(registry);

  assert.ok(Array.isArray(registry.ai_cli_orchestration_flow));
  assert.match(serialized, /decision inbox/);
  assert.match(serialized, /terminal output/);
  assert.match(serialized, /source editor/);
  assert.match(serialized, /research-insight-planner-agent/);
  assert.match(serialized, /existing_search_agent_run/);
  assert.match(serialized, /Codex app-style thread workbench/);
  assert.match(serialized, /Claude Desktop-style connector chips/);
  assert.match(serialized, /production_agent_blueprints/);
  assert.match(serialized, /AgentCore-style production blueprints/);
  assert.match(serialized, /MCP servers/);
  assert.match(serialized, /desktop extensions/);
});

test("shared CLI adapter registry defines concrete AI CLI targets", () => {
  const registry = JSON.parse(readFileSync(join(root, "../agent-platform/configs/integrations/cli-adapter-registry.json"), "utf8"));
  const ids = registry.supported_ai_cli_adapters.map((adapter) => adapter.adapter_id);

  for (const id of ["claude-code-cli", "gemini-cli", "codex-cli", "opencode-cli", "claw-code-cli"]) {
    assert.ok(ids.includes(id));
  }
  assert.equal(registry.platform_principle.host_runtime_model, "platform_first");
  assert.match(JSON.stringify(registry), /platform_is_primary_host_runtime/);
  assert.ok(registry.supported_ai_cli_adapters.every((adapter) => adapter.runtime_role === "guest_adapter_on_platform"));
  assert.ok(registry.interactive_cli_contract);
  assert.ok(registry.terminal_io_contract);
  assert.ok(registry.data_accumulation_contract);
});

test("desktop runtime bridge exposes CLI adapter commands and monitor tab", () => {
  const lib = readFileSync(join(root, "src-tauri/src/lib.rs"), "utf8");
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
  const lazyBoundaryCheck = readFileSync(
    join(root, "renderer/workspace-monitor/scripts/check-lazy-boundary-contract.mjs"),
    "utf8"
  );
  const platformPkg = readJson("package.json");
  const monitorPkg = readJson("renderer/workspace-monitor/package.json");
  const viewModes = readJson("../agent-platform/configs/access/view-mode-registry.json");

  assert.match(platformPkg.scripts["renderer:build"], /build:customer/);
  assert.match(platformPkg.scripts["renderer:build"], /customer-bundle:audit/);
  assert.match(platformPkg.scripts["monitor:build"], /renderer:build/);
  assert.match(platformPkg.scripts["tauri:build:prepared"], /tauri-build-prepared/);
  assert.ok(platformPkg.scripts.setup);
  assert.ok(platformPkg.scripts["verify:quick"]);
  assert.match(platformPkg.scripts.check, /check-customer-bundle\.mjs/);
  assert.match(platformPkg.scripts.check, /check-release-readiness\.mjs/);
  assert.ok(platformPkg.scripts["release:preflight:public"]);
  assert.ok(platformPkg.scripts["service:readiness"]);
  assert.ok(platformPkg.scripts["service:readiness:public:report"]);
  assert.match(monitorPkg.scripts["build:customer"], /--snapshot-mode customer/);
  assert.match(monitorPkg.scripts.check, /check-lazy-boundary-contract\.mjs/);
  assert.equal(monitorPkg.scripts["check:lazy-boundaries"], "node scripts/check-lazy-boundary-contract.mjs");
  for (const scriptToken of ["lazyBoundaryTargets", "lazy_boundary_contract_ok", "MonitorShell must type-only import", "MonitorShell must dynamic import"]) {
    assert.match(lazyBoundaryCheck, new RegExp(scriptToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const collectorToken of ["buildCustomerSnapshot", "customer_snapshot_sanitized", "--snapshot-mode", "sourceFiles: []"]) {
    assert.match(monitorCollector, new RegExp(collectorToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const collectorToken of [
    "collectProductFeatureArchitecture",
    "productFeatureArchitecture",
    "sanitizeProductFeatureArchitectureForCustomer",
    "collectReferencePlatformAdvantages",
    "referencePlatformAdvantages",
    "sanitizeReferencePlatformAdvantagesForCustomer",
    "agent_capability_platform",
    "supporting_observability"
  ]) {
    assert.match(`${monitorCollector}\n${productFeatureCollector}`, new RegExp(collectorToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const uiToken of ["referenceAdvantages", "reference-advantage-board", "레퍼런스 장점 적용 지도"]) {
    assert.match(productFeaturePanel, new RegExp(uiToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const scriptToken of ["auditCustomerSnapshot", "scanCustomerDist", "customer_bundle_ready", "MAX_DIST_SCAN_FILES"]) {
    assert.match(customerBundleCheck, new RegExp(scriptToken));
  }
  for (const scriptToken of ["checkReleaseReadiness", "public_release_blocked", "hardenedRuntime", "notarization", "TAURI_SIGNING_PRIVATE_KEY", "TAURI_UPDATER_PUBLIC_KEY"]) {
    assert.match(releaseReadinessCheck, new RegExp(scriptToken));
  }
  const publicReleaseConfig = readFileSync(join(root, "scripts/public-release-config.mjs"), "utf8");
  const publicReleaseBuild = readFileSync(join(root, "scripts/public-release-build.mjs"), "utf8");
  const updaterManifest = readFileSync(join(root, "scripts/create-updater-manifest.mjs"), "utf8");
  for (const scriptToken of ["createUpdaterArtifacts", "TAURI_UPDATER_ENDPOINTS", "TAURI_RELEASE_ASSET_BASE_URL", "service-update-channel.json", "TAURI_SIGNING_PRIVATE_KEY"]) {
    assert.match(publicReleaseConfig, new RegExp(scriptToken));
  }
  for (const scriptToken of ["tauri", "build", "--config", "create-updater-manifest.mjs"]) {
    assert.match(publicReleaseBuild, new RegExp(scriptToken));
  }
  for (const scriptToken of ["latest.json", ".app.tar.gz", ".sig", "platforms", "signature"]) {
    assert.match(updaterManifest, new RegExp(scriptToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  const serviceReadinessCheck = readFileSync(join(root, "scripts/check-service-readiness.mjs"), "utf8");
  for (const scriptToken of [
    "checkServiceReadiness",
    "service_internal_ready_public_blocked",
    "Signed updater channel",
    "Workspace Onboarding",
    "Direct provider task command exposed",
    "Native Resource Telemetry",
    "desktop_resource_snapshot_command"
  ]) {
    assert.match(serviceReadinessCheck, new RegExp(scriptToken));
  }
  for (const token of ["writeClipboardText", "clipboard.writeText", "textarea copy path", "execCommand", "setSelectionRange"]) {
    assert.match(clipboardUtility, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const token of ["falls back to textarea copy", "no write path is available", "navigator clipboard"]) {
    assert.match(clipboardTest, new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const token of ["Native Git Workbench", "get_desktop_git_status", "run_desktop_git_action", "Credential / SSH", "bounded command output"]) {
    const pattern = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    assert.match(nativeGitWorkbenchKo, pattern);
    assert.match(nativeGitWorkbenchEn, pattern);
  }
  for (const token of ["pipe-first CLI supervisor", "xterm.js", "Rust PTY crate", "start_native_pty_terminal"]) {
    const pattern = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    assert.match(ptyDecisionKo, pattern);
    assert.match(ptyDecisionEn, pattern);
  }

  for (const commandName of [
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
    "get_service_readiness_report",
    "get_desktop_preferences",
    "save_desktop_preferences",
    "list_provider_credentials",
    "save_provider_credential",
    "clear_provider_credential",
    "open_provider_auth_url",
    "run_provider_agent_task",
    "start_cli_adapter_session",
    "start_cli_task_pipeline",
    "poll_cli_adapter_session",
    "list_cli_adapter_sessions",
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
    "get_desktop_resource_snapshot",
    "warm_workspace_os_resources",
    "prepare_workspace_os_resources",
    "list_workspace_text_files",
    "read_workspace_text_file",
    "write_workspace_text_file",
    "choose_desktop_workspace_folder",
    "get_desktop_git_status",
    "run_desktop_git_action",
    "create_agent_factory_proposal",
    "record_learning_improvement_decision",
    "list_human_decision_inbox",
    "answer_human_decision",
    "answer_and_resume_human_decision"
  ]) {
    assert.match(lib, new RegExp(commandName));
    assert.match(monitorShell, new RegExp(commandName));
  }
  assert.match(monitorShell, /DesktopRuntimePanel/);
  assert.match(monitorShell, /CoreFeatureDrilldown/);
  assert.match(monitorShell, /NativeGitWorkbench/);
  assert.match(nativeGitWorkbench, /NativeGitWorkbench/);
  assert.match(monitorShell, /PathDisclosure/);
  assert.match(monitorShell, /RuntimeTerminalDrawer/);
  assert.match(monitorShell, /WorkspaceExplorerPane/);
  assert.match(agentBuilderPanels, /AgentCoreBlueprintPanel/);
  assert.match(agentBuilderPanels, /AgentFactoryWizard/);
  assert.match(agentBuilderPanels, /LearningFeedbackLoopPanel/);
  assert.match(agentDetailPanels, /AgentRuntimeOverviewPanel/);
  assert.match(coreFeatureDrilldown, /CoreFeatureDrilldownId/);
  assert.match(runtimeTerminalDrawer, /RuntimeTerminalDrawer/);
  assert.match(workspaceExplorerPane, /buildWorkspaceExplorerTree/);
  assert.match(lib, /human-decision-inbox\.json/);
  assert.match(monitorShell, /decisionInboxItems/);
  assert.match(monitorShell, /adapterSetupGuides/);
  assert.match(monitorShell, /sessionModePresets/);
  assert.match(monitorShell, /SearchAgentWorkChatPanel/);
  assert.match(monitorShell, /SearchAgentChatMessage/);
  assert.match(monitorShell, /renderSearchAgentPrompt/);
  assert.match(monitorShell, /research-insight-planner-agent/);
  assert.match(lib, /research_insight_agent_pipe/);
  assert.match(lib, /normalize_task_kind/);
  assert.match(monitorShell, /Answer & Resume/);
  for (const performanceToken of [
    "MAX_DECISION_SCAN_BYTES",
    "recent_session_output",
    "tail_by_char_boundary"
  ]) {
    assert.match(lib, new RegExp(performanceToken));
  }
  for (const uiString of [
    "Command Palette",
    "Unified Ops",
    "히스토리와 모니터링 통합",
    "Capability Center",
    "Run Board",
    "process graph",
    "terminal event",
    "Task Pipe Init",
    "Task Run Store",
    "저장된 실행 기록과 로그",
    "Runtime Data & Support",
    "Accumulated Data",
    "축적 데이터 인덱스",
    "Service Readiness",
    "서비스 출시 준비도",
    "Public blockers",
    "Update & Recovery",
    "Signed Distribution",
    "설치형 데이터 경계",
    "Installer Payload Audit",
    "Support Diagnostic Bundle",
    "Workspace Host",
    "앱 워크스페이스",
    "Import Workspace",
    "Clone Workspace",
    "Refresh task runs",
    "Open Logs",
    "Prune Old",
    "record JSON",
    "Init task pipe",
    "Init Pipe",
    "merge gate",
    "검색 에이전트 작업 채팅",
    "작업 시작",
    "agent-chat-thread",
    "Search Agent Pipe",
    "decision replay",
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
    "작업공간 Explorer",
    "파일시스템을 끌어와서 처리하기",
    "작업공간 접근 권한 요청",
    "workspace-explorer-pane",
    "workspace-explorer-tree",
    "filesystem-workbench-shell",
    "현재 작업공간",
    "파일 목록 새로고침",
    "선택 파일 열기",
    "현재 파일 저장",
    "열린 변경 모두 저장",
    "내용 복사",
    "Workspace Explorer",
    "Refresh Files",
    "Editor Settings",
    "Diff Review",
    "Save Current",
    "Save All",
    "Platform-first host",
    "Guest adapters",
    "Platform state owner",
    "Evidence / Promotion",
    "Mode & Function Switchboard",
    "모드와 기능 선택 위치",
    "Desktop Session Mode",
    "Task Pipe Preset",
    "Claude Code Design Transfer",
    "Public sources only",
    "공개 설계 패턴 전이 지도",
    "선택/위치 열기",
    "ProductFeatureArchitecturePanel",
    "핵심 기능",
    "루트 툴",
    "Operator Center",
    "operatorSectionIds",
    "Open Operator Center"
  ]) {
    assert.match(monitorWorkbenchSource, new RegExp(uiString));
  }
  assert.doesNotMatch(monitorShell, /localStorage/);
  for (const uiString of [
    "CLI Orchestration",
    "Agent Core",
    "Open CLI Orchestration",
    "Open Agent Core",
    "Observability is support",
    "Agent Capability Platform",
    "Operator tools are separate",
    "Open Operator Center"
  ]) {
    assert.match(productFeaturePanel, new RegExp(uiString));
  }
  for (const implementationToken of [
    "detectOutputEvents",
    "visibleUnifiedEvents",
    "summarizeUnifiedOpsEvents",
    "ops-event-rail",
    "groupDecisions",
    "buildSourceDiffSummary",
    "SourceDraftEntry",
    "WorkspaceTextFileListReport",
    "sourceDrafts",
    "runtimeSourceFiles",
    "refreshRuntimeSourceFiles",
    "runSourceEditorCommand",
    "MonacoDiffEditor",
    "saveAllSourceDrafts",
    "revertCurrentDraft",
    "openDraftOrLoad",
    "desktop-command-grid",
    "process-graph",
    "terminal-event-rail",
    "decision-replay-strip",
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
    "deferDetectedQuestions",
    "defer_all_cli_adapter_questions",
    "task-pipe-panel",
    "task-run-panel",
    "taskRunRecords",
    "taskRunDetail",
    "loadTaskRunDetail",
    "pruneTaskRunRecords",
    "refreshTaskRunRecords",
    "refreshRuntimeDataBoundary",
    "refreshAccumulatedDataOverview",
    "accumulatedDataOverview",
    "accumulated-data-panel",
    "accumulated-store-grid",
    "runInstallerPayloadAudit",
    "createSupportDiagnosticBundle",
    "RuntimeDataBoundaryReport",
    "InstallerPayloadAuditReport",
    "SupportDiagnosticBundleReport",
    "AccumulatedDataOverviewReport",
    "runtime-data-panel",
    "DesktopWorkspaceStateReport",
    "get_desktop_workspace_state",
    "set_desktop_workspace_path",
    "choose_desktop_workspace_folder",
    "clone_desktop_workspace",
    "warm_workspace_os_resources",
    "prepare_workspace_os_resources",
    "get_desktop_resource_snapshot",
    "OS 캐시",
    "메모리 예산",
    "앱 RAM/CPU",
    "DesktopResourceSnapshotReport",
    "desktopResourceSnapshot",
    "native warming",
    "native cache",
    "nativeWorkspaceCopy",
    "native-file-workspace-panel",
    "작업공간 접근 권한 요청",
    "permissionGranted",
    "permissionDetail",
    "workspace-permission-hint",
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
    "계정 연결",
    "ProviderCredentialReport",
    "list_provider_credentials",
    "save_provider_credential",
    "clear_provider_credential",
    "open_provider_auth_url",
    "run_provider_agent_task",
    "ProviderAgentTaskReport",
    "agent-provider-run-controls",
    "fallbackProviderCredentialReport",
    "providerIdsByAdapter",
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GEMINI_API_KEY",
    "화면 언어",
    "파일/코드",
    "현재 작업공간",
    "schemaVersion",
    "storageFormatVersion",
    "indexPath",
    "formatMigrationStatus",
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
    "list_cli_task_run_records",
    "taskPipePresets",
    "start_cli_task_pipeline",
    "platform_improvement_pipe",
    "knowledge_accumulation_pipe",
    "review_verify_pipe",
    "source-diff-review",
    "source-draft-queue",
    "source-file-browser",
    "Guest Adapters",
    "evidence-grid",
    "modeFunctionCatalog",
    "ModeFunctionSwitchboard",
    "mode-switchboard-panel",
    "mode-option-grid",
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
    "quick-start-flow",
    "desktop-app-root theme-",
    "desktop-app-shell sidebar-",
    "claudeCodeDesignTransfer",
    "ClaudeCodeTransferPanel",
    "transfer-pattern-grid",
    "productFeatureArchitecture",
    "emptyProductFeatureArchitecture"
  ]) {
    assert.match(monitorWorkbenchSource, new RegExp(implementationToken));
  }
  for (const forbiddenBackground of [/background:\s*#ffffff/, /background:\s*#fbfcfd/, /background:\s*white/, /background:\s*#fff9eb/, /background:\s*#fff4f4/, /background:\s*#f4f9ff/]) {
    assert.doesNotMatch(monitorStyles, forbiddenBackground);
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
    assert.match(monitorStyles, new RegExp(requiredScrollToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const requiredButtonToken of [
    "--control-hit-size",
    "--control-target-size",
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
    assert.match(monitorStyles, new RegExp(requiredButtonToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(monitorStyles, /button\s*{[^}]*overflow-wrap:\s*anywhere/s);
  assert.doesNotMatch(monitorStyles, /\.desktop-app-root button > span[\s\S]*?{[^}]*overflow-wrap:\s*anywhere/s);
  for (const taskRunStoreToken of [
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
    "InstallerPayloadAuditReport",
    "SupportDiagnosticBundleReport",
    "RuntimeDataBoundaryReport",
    "AccumulatedDataStoreReport",
    "AccumulatedDataOverviewReport",
    "DesktopWorkspaceStateReport",
    "ProviderCredentialReport",
    "ProviderCredentialSummary",
    "DESKTOP_WORKSPACE_STATE_SCHEMA_VERSION",
    "PROVIDER_CREDENTIALS_SCHEMA_VERSION",
    "provider_credentials_path",
    "provider_env_for_adapter",
    "open_provider_auth_url_report",
    "run_provider_agent_task_report",
    "provider-credentials.v1.json",
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GEMINI_API_KEY",
    "desktop_workspace_state_path",
    "managed_desktop_workspaces_base_path",
    "workspace_root_for_app",
    "ACCUMULATED_DATA_INDEX_SCHEMA_VERSION",
    "ACCUMULATED_DATA_STORAGE_FORMAT_VERSION",
    "accumulated_data_index_path",
    "accumulated-data-overview.v1.json",
    "format_migration_status",
    "accumulated_data_overview_report",
    "MAX_ACCUMULATED_DATA_SCAN_FILES",
    "MAX_PAYLOAD_SCAN_FILES",
    "platform_artifacts_base_path",
    "task-runs",
    "stdout.log",
    "stderr.log",
    "record.json"
  ]) {
    assert.match(lib, new RegExp(taskRunStoreToken));
  }
  assert.ok(viewModes.modes.every((mode) => mode.allowed_sections.includes("desktop")));
  const userMode = viewModes.modes.find((mode) => mode.id === "user");
  assert.deepEqual(userMode.allowed_sections, ["overview", "agents", "desktop", "source", "intent"]);
  for (const operatorSection of ["projects", "history", "structure", "documents", "requirements"]) {
    assert.ok(!userMode.allowed_sections.includes(operatorSection));
  }
});
