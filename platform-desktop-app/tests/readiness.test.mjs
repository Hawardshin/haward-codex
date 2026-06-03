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

  const config = readJson("src-tauri/tauri.conf.json");
  assert.equal(config.productName, "Agent Workspace Platform");
  assert.equal(config.identifier, "com.personalagentplatform.desktop");
  assert.equal(config.build.frontendDist, "../../workspace-monitor/out");
  assert.equal(config.app.withGlobalTauri, true);
  assert.equal(config.bundle.macOS.hardenedRuntime, true);
});

test("desktop registry points to macOS and Windows execution profiles", () => {
  const registry = readJson("configs/desktop-distribution-registry.json");
  const serialized = JSON.stringify(registry);

  assert.equal(registry.recommended_initial_path.id, "tauri_first_cross_platform_shell");
  assert.match(serialized, /configs\/macos-execution-profile\.json/);
  assert.match(serialized, /configs\/windows-execution-profile\.json/);
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

test("runtime data boundary separates customer app from platform source", () => {
  const registry = readJson("configs/runtime-data-boundary-registry.json");
  const serialized = JSON.stringify(registry);

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
  assert.match(serialized, /updater_is_a_release_gate/);
});

test("user flow exposes AI CLI orchestration and source editing surfaces", () => {
  const registry = readJson("configs/user-flow-registry.json");
  const serialized = JSON.stringify(registry);

  assert.ok(Array.isArray(registry.ai_cli_orchestration_flow));
  assert.match(serialized, /decision inbox/);
  assert.match(serialized, /terminal output/);
  assert.match(serialized, /source editor/);
});

test("shared CLI adapter registry defines concrete AI CLI targets", () => {
  const registry = JSON.parse(readFileSync(join(root, "../agent-platform/configs/integrations/cli-adapter-registry.json"), "utf8"));
  const ids = registry.supported_ai_cli_adapters.map((adapter) => adapter.adapter_id);

  for (const id of ["claude-code-cli", "gemini-cli", "codex-cli", "opencode-cli"]) {
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
  const monitorShell = readFileSync(join(root, "../workspace-monitor/components/MonitorShell.tsx"), "utf8");
  const monitorCollector = readFileSync(join(root, "../workspace-monitor/scripts/collect-workspace.mjs"), "utf8");
  const customerBundleCheck = readFileSync(join(root, "scripts/check-customer-bundle.mjs"), "utf8");
  const releaseReadinessCheck = readFileSync(join(root, "scripts/check-release-readiness.mjs"), "utf8");
  const platformPkg = readJson("package.json");
  const monitorPkg = readJson("../workspace-monitor/package.json");
  const viewModes = readJson("../agent-platform/configs/access/view-mode-registry.json");

  assert.match(platformPkg.scripts["monitor:build"], /build:customer/);
  assert.match(platformPkg.scripts["monitor:build"], /customer-bundle:audit/);
  assert.match(platformPkg.scripts.check, /check-customer-bundle\.mjs/);
  assert.match(platformPkg.scripts.check, /check-release-readiness\.mjs/);
  assert.ok(platformPkg.scripts["release:preflight:public"]);
  assert.ok(platformPkg.scripts["service:readiness"]);
  assert.ok(platformPkg.scripts["service:readiness:public:report"]);
  assert.match(monitorPkg.scripts["build:customer"], /--snapshot-mode customer/);
  for (const collectorToken of ["buildCustomerSnapshot", "customer_snapshot_sanitized", "--snapshot-mode", "sourceFiles: []"]) {
    assert.match(monitorCollector, new RegExp(collectorToken.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const scriptToken of ["auditCustomerSnapshot", "scanCustomerDist", "customer_bundle_ready", "MAX_DIST_SCAN_FILES"]) {
    assert.match(customerBundleCheck, new RegExp(scriptToken));
  }
  for (const scriptToken of ["checkReleaseReadiness", "public_release_blocked", "hardenedRuntime", "notarization"]) {
    assert.match(releaseReadinessCheck, new RegExp(scriptToken));
  }
  const serviceReadinessCheck = readFileSync(join(root, "scripts/check-service-readiness.mjs"), "utf8");
  for (const scriptToken of ["checkServiceReadiness", "service_internal_ready_public_blocked", "Signed updater channel", "Workspace Onboarding"]) {
    assert.match(serviceReadinessCheck, new RegExp(scriptToken));
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
    "run_installer_payload_audit",
    "create_support_diagnostic_bundle",
    "get_service_readiness_report",
    "start_cli_adapter_session",
    "start_cli_task_pipeline",
    "poll_cli_adapter_session",
    "list_cli_adapter_sessions",
    "write_cli_adapter_stdin",
    "send_cli_adapter_defer_message",
    "defer_all_cli_adapter_questions",
    "cancel_cli_adapter_session",
    "list_workspace_text_files",
    "read_workspace_text_file",
    "write_workspace_text_file",
    "list_human_decision_inbox",
    "answer_human_decision",
    "answer_and_resume_human_decision"
  ]) {
    assert.match(lib, new RegExp(commandName));
    assert.match(monitorShell, new RegExp(commandName));
  }
  assert.match(monitorShell, /DesktopRuntimePanel/);
  assert.match(lib, /human-decision-inbox\.json/);
  assert.match(monitorShell, /decisionInboxItems/);
  assert.match(monitorShell, /adapterSetupGuides/);
  assert.match(monitorShell, /sessionModePresets/);
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
    "Service Readiness",
    "서비스 출시 준비도",
    "Public blockers",
    "Update & Recovery",
    "Signed Distribution",
    "설치형 데이터 경계",
    "Installer Payload Audit",
    "Support Diagnostic Bundle",
    "Refresh task runs",
    "Open Logs",
    "Prune Old",
    "record JSON",
    "Init task pipe",
    "Init Pipe",
    "merge gate",
    "decision replay",
    "Auto-defer questions",
    "Defer detected questions",
    "auto-deferred",
    "Source Review",
    "Multi-file scoped editor",
    "Open Editors",
    "Refresh Files",
    "Editor Settings",
    "Diff Review",
    "Runtime files",
    "File Edit Queue",
    "Open Path",
    "Save Current",
    "Save All",
    "Revert Draft",
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
    "선택/위치 열기"
  ]) {
    assert.match(monitorShell, new RegExp(uiString));
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
    "runInstallerPayloadAudit",
    "createSupportDiagnosticBundle",
    "RuntimeDataBoundaryReport",
    "InstallerPayloadAuditReport",
    "SupportDiagnosticBundleReport",
    "runtime-data-panel",
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
    "claudeCodeDesignTransfer",
    "ClaudeCodeTransferPanel",
    "transfer-pattern-grid"
  ]) {
    assert.match(monitorShell, new RegExp(implementationToken));
  }
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
});
