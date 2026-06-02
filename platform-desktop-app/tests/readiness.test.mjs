import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const root = new URL("..", import.meta.url).pathname;

function readJson(relativePath) {
  return JSON.parse(readFileSync(join(root, relativePath), "utf8"));
}

test("desktop scaffold has the selected Tauri entry points", () => {
  assert.equal(existsSync(join(root, "src-tauri/tauri.conf.json")), true);
  assert.equal(existsSync(join(root, "src-tauri/src/lib.rs")), true);

  const config = readJson("src-tauri/tauri.conf.json");
  assert.equal(config.productName, "Agent Workspace Platform");
  assert.equal(config.identifier, "com.personalagentplatform.desktop");
  assert.equal(config.build.frontendDist, "../../workspace-monitor/out");
  assert.equal(config.app.withGlobalTauri, true);
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
  const viewModes = readJson("../agent-platform/configs/access/view-mode-registry.json");

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
    assert.match(lib, new RegExp(commandName));
    assert.match(monitorShell, new RegExp(commandName));
  }
  assert.match(monitorShell, /DesktopRuntimePanel/);
  assert.match(lib, /human-decision-inbox\.json/);
  assert.match(monitorShell, /decisionInboxItems/);
  assert.match(monitorShell, /adapterSetupGuides/);
  assert.match(monitorShell, /sessionModePresets/);
  assert.match(monitorShell, /Answer & Resume/);
  for (const uiString of [
    "Command Palette",
    "Unified Ops",
    "히스토리와 모니터링 통합",
    "Capability Center",
    "Run Board",
    "process graph",
    "terminal event",
    "Task Pipe Init",
    "Init task pipe",
    "Init Pipe",
    "merge gate",
    "decision replay",
    "Auto-defer questions",
    "Defer detected questions",
    "auto-deferred",
    "Source Review",
    "Multi-file scoped editor",
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
    "sourceDrafts",
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
    "deferDetectedQuestions",
    "defer_all_cli_adapter_questions",
    "task-pipe-panel",
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
    "openModeFunctionOption"
  ]) {
    assert.match(monitorShell, new RegExp(implementationToken));
  }
  assert.ok(viewModes.modes.every((mode) => mode.allowed_sections.includes("desktop")));
});
