import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildAgentCollaborationBoard,
  buildSnapshot,
  buildUnifiedOps,
  collectAgentCatalog,
  collectClaudeCodeDesignTransfer,
  collectLanguageModeCatalog,
  collectModeFunctionCatalog,
  collectSourceFiles,
  collectViewModeCatalog,
  extractHistoryDate,
  extractTitle,
  markdownToHtml,
  parseRequirementRows
} from "../scripts/collect-workspace.mjs";

test("extractTitle falls back to the first markdown heading", () => {
  assert.equal(extractTitle("# 작업 요약\n\n내용", "_history/work-summaries/2026/example.ko.md"), "작업 요약");
});

test("markdownToHtml escapes raw HTML and renders common blocks", () => {
  const html = markdownToHtml("# Title\n\n<script>alert(1)</script>\n\n- item\n\n| A | B |\n| --- | --- |\n| 1 | 2 |");

  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /<li>item<\/li>/);
  assert.match(html, /<table>/);
});

test("parseRequirementRows extracts requirement IDs", () => {
  const rows = parseRequirementRows("| REQ-WM-001 | Build Next.js app | must | test |", "requirements.md");

  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, "REQ-WM-001");
  assert.equal(rows[0].priority, "must");
});

test("extractHistoryDate reads dated history file paths", () => {
  assert.equal(
    extractHistoryDate("_history/work-summaries/2026/2026-06-01-workspace-monitor.ko.md"),
    "2026-06-01"
  );
  assert.equal(extractHistoryDate("_docs/policies/source-collection-policy.ko.md"), "");
});

test("buildSnapshot reads minimal repository shape", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-test-"));
  fs.mkdirSync(path.join(root, "_ops", "projects"), { recursive: true });
  fs.mkdirSync(path.join(root, "_ops", "coordination"), { recursive: true });
  fs.mkdirSync(path.join(root, "_history", "work-summaries", "2026"), { recursive: true });
  fs.mkdirSync(path.join(root, "_docs"), { recursive: true });
  fs.mkdirSync(path.join(root, "_requirements", "baselines"), { recursive: true });
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "access"), { recursive: true });
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "agents"), { recursive: true });
  fs.mkdirSync(path.join(root, "agent-platform", "docs"), { recursive: true });
  fs.mkdirSync(path.join(root, "demo", "src"), { recursive: true });

  fs.writeFileSync(
    path.join(root, "_ops", "projects", "registry.json"),
    JSON.stringify({ projects: [{ name: "demo", path: "demo/", status: "active", type: "demo", purpose: "Demo", scope: "Demo scope" }] })
  );
  fs.writeFileSync(
    path.join(root, "_ops", "projects", "root-structure-policy.json"),
    JSON.stringify({
      reserved_operational_dirs: [{ name: "_history", purpose: "History" }],
      runtime_adapter_dirs: [],
      local_only_dirs: []
    })
  );
  fs.writeFileSync(
    path.join(root, "_ops", "coordination", "status.json"),
    JSON.stringify({ agents: [{ id: "agent", status: "idle" }], tasks: [{ id: "task", status: "completed" }] })
  );
  fs.writeFileSync(
    path.join(root, "agent-platform", "configs", "agents", "demo-agent.json"),
    JSON.stringify({
      name: "demo-agent",
      description: "Demo agent",
      runtime: "python",
      tools: ["demo:run"],
      skills: [],
      metadata: { status: "active", trigger: "demo trigger" }
    })
  );
  fs.writeFileSync(
    path.join(root, "agent-platform", "configs", "access", "language-mode-registry.json"),
    JSON.stringify({
      default_mode: "all",
      modes: [
        {
          id: "all",
          label: "All Languages",
          display_label: "전체",
          intent: "All docs",
          included_languages: ["ko", "en"],
          include_unknown: true,
          document_rule: "All docs"
        },
        {
          id: "ko",
          label: "Korean Only",
          display_label: "한국어만",
          intent: "Korean docs",
          included_languages: ["ko"],
          include_unknown: false,
          document_rule: "Korean docs"
        }
      ]
    })
  );
  fs.writeFileSync(path.join(root, "agent-platform", "docs", "demo-agent.ko.md"), "# Demo Agent\n\n설명");
  fs.writeFileSync(
    path.join(root, "_docs", "registry.json"),
    JSON.stringify({
      categories: [{ id: "instructions", path: "_docs/instructions", purpose: "Instructions" }],
      required_documents: []
    })
  );
  fs.writeFileSync(
    path.join(root, "_history", "work-summaries", "2026", "2026-06-01-today.ko.md"),
    "# 오늘 요약\n\n- 완료"
  );
  fs.writeFileSync(
    path.join(root, "_requirements", "baselines", "requirements.ko.md"),
    "| ID | 요구사항 | 우선순위 |\n| --- | --- | --- |\n| REQ-WM-001 | Build monitor | must |"
  );
  fs.writeFileSync(path.join(root, "demo", "src", "main.py"), "print('hello')\n");

  const snapshot = buildSnapshot(root);

  assert.equal(snapshot.stats.projects, 1);
  assert.equal(snapshot.stats.agentDefinitions, 1);
  assert.equal(snapshot.stats.completedTasks, 1);
  assert.equal(snapshot.collaborationBoard.summary.completedTasks, 1);
  assert.equal(snapshot.collaborationBoard.flows.length, 1);
  assert.equal(snapshot.documents.length, 7);
  assert.equal(snapshot.stats.sourceFiles, 1);
  assert.equal(snapshot.sourceFiles[0].language, "python");
  assert.match(snapshot.sourceFiles[0].content, /hello/);
  assert.equal(snapshot.agentCatalog[0].name, "demo-agent");
  assert.equal(snapshot.agentCatalog[0].tools.length, 1);
  assert.equal(snapshot.agentCatalog[0].docPaths[0], "agent-platform/docs/demo-agent.ko.md");
  assert.equal(snapshot.historyDays[0].date, "2026-06-01");
  assert.equal(snapshot.stats.unifiedOpsEvents, snapshot.unifiedOps.summary.totalEvents);
  assert.equal(snapshot.unifiedOps.summary.historyEvents > 0, true);
  assert.equal(snapshot.unifiedOps.summary.monitorEvents > 0, true);
  assert.equal(snapshot.unifiedOps.events.some((event) => event.sourceType === "history"), true);
  assert.equal(snapshot.unifiedOps.events.some((event) => event.sourceType === "monitor"), true);
  assert.equal(snapshot.folderStructure.rootFolders.some((folder) => folder.path === "demo/"), true);
  assert.equal(snapshot.folderStructure.docsCategories[0].path, "_docs/instructions");
  assert.equal(snapshot.requirements[0].id, "REQ-WM-001");
  assert.equal(snapshot.viewModeCatalog.defaultMode, "superadmin_developer");
  assert.equal(snapshot.languageModeCatalog.defaultMode, "all");
  assert.equal(snapshot.languageModeCatalog.modes[1].id, "ko");
  assert.equal(snapshot.modeFunctionCatalog.summary.totalGroups >= 8, true);
  assert.equal(snapshot.modeFunctionCatalog.groups.some((group) => group.id === "view_mode"), true);
  assert.equal(snapshot.modeFunctionCatalog.groups.some((group) => group.id === "section_location"), true);
  assert.equal(snapshot.stats.modeOptions, snapshot.modeFunctionCatalog.summary.totalOptions);
  assert.equal(snapshot.documents.some((document) => document.language === "ko"), true);
});

test("collectModeFunctionCatalog exposes explicit selectors and desktop mode locations", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-mode-test-"));
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "workflows"), { recursive: true });
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "installations"), { recursive: true });
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "integrations"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "agent-platform", "configs", "workflows", "work-mode-registry.json"),
    JSON.stringify({
      default_mode: "standard",
      modes: [{ id: "standard", label: "Standard", intent: "Default meaningful work", enforcement_level: "blocking" }]
    })
  );
  fs.writeFileSync(
    path.join(root, "agent-platform", "configs", "installations", "install-mode-registry.json"),
    JSON.stringify({
      default_mode: "user",
      modes: [{ id: "user", label: "User Install", intent: "Use the platform" }]
    })
  );
  fs.writeFileSync(
    path.join(root, "agent-platform", "configs", "integrations", "cli-adapter-registry.json"),
    JSON.stringify({
      supported_ai_cli_adapters: [
        {
          adapter_id: "codex-cli",
          display_name: "Codex CLI",
          default_state: "optional_supported",
          expected_command_candidates: ["codex"],
          capability_class: "ai_assistant_cli",
          runtime_role: "guest_adapter_on_platform"
        }
      ]
    })
  );

  const catalog = collectModeFunctionCatalog(
    root,
    {
      defaultMode: "superadmin_developer",
      modes: [{ id: "superadmin_developer", label: "Super Admin Dev", intent: "Full view", allowedSections: ["overview", "desktop"] }]
    },
    {
      defaultMode: "all",
      modes: [{ id: "all", label: "전체", intent: "All docs", documentRule: "Show all documents" }]
    }
  );

  assert.equal(catalog.summary.totalGroups, 8);
  assert.equal(catalog.groups.find((group) => group.id === "work_mode").defaultMode, "standard");
  assert.equal(catalog.groups.find((group) => group.id === "cli_adapter").options[0].id, "codex-cli");
  assert.equal(catalog.groups.find((group) => group.id === "desktop_session_mode").selectorLocation, "Desktop / Run Board / Mode");
  assert.equal(catalog.groups.find((group) => group.id === "task_pipe").options.some((option) => option.id === "review_verify_pipe"), true);
});

test("collectClaudeCodeDesignTransfer reads public-source transfer patterns", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-claude-transfer-test-"));
  fs.mkdirSync(path.join(root, "platform-desktop-app", "configs"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "platform-desktop-app", "configs", "claude-code-design-transfer-registry.json"),
    JSON.stringify({
      source_boundary: {
        policy: "public_sources_only",
        excluded_sources: ["leaked_or_non_public_material"]
      },
      transfer_patterns: [
        {
          id: "permissioned_tool_execution",
          label: "Permissioned Tool Execution",
          public_source_ids: ["claude_code_settings"],
          claude_code_signal: "Settings and permissions are scoped.",
          transfer_principle: "Separate guidance from enforcement.",
          platform_mapping: "Use decision inbox and allowlisted commands.",
          current_platform_assets: ["platform-desktop-app/src-tauri/src/lib.rs"],
          implementation_targets: ["Show permission summary"],
          risk_controls: ["no secrets"],
          status: "implemented",
          priority: "high"
        }
      ]
    })
  );

  const transfer = collectClaudeCodeDesignTransfer(root);

  assert.equal(transfer.sourceBoundary.policy, "public_sources_only");
  assert.equal(transfer.summary.totalPatterns, 1);
  assert.equal(transfer.summary.readyNow, 1);
  assert.equal(transfer.summary.highPriority, 1);
  assert.equal(transfer.patterns[0].label, "Permissioned Tool Execution");
  assert.equal(transfer.patterns[0].platformMapping, "Use decision inbox and allowlisted commands.");
});

test("buildUnifiedOps merges history records and monitoring tasks", () => {
  const ops = buildUnifiedOps({
    documents: [
      {
        id: "work-summary",
        path: "_history/work-summaries/2026/2026-06-01-demo.ko.md",
        category: "work-summary",
        language: "ko",
        title: "작업 요약",
        excerpt: "완료",
        updatedAt: "2026-06-01T09:00:00.000Z",
        historyDate: "2026-06-01"
      },
      {
        id: "eval",
        path: "_history/evaluations/2026/2026-06-01-demo.json",
        category: "evaluation",
        language: "unknown",
        title: "evaluation",
        excerpt: "ready_to_close",
        updatedAt: "2026-06-01T10:00:00.000Z",
        historyDate: "2026-06-01"
      }
    ],
    historyDays: [{ date: "2026-06-01" }],
    tasks: [
      {
        id: "task-blocked",
        title: "Blocked task",
        status: "blocked",
        next_action: "Ask user"
      }
    ],
    collaborationBoard: {
      blockers: [{ taskId: "task-blocked", title: "Blocked task", blockers: ["needs decision"] }],
      nextActions: []
    }
  });

  assert.equal(ops.summary.historyEvents, 2);
  assert.equal(ops.summary.monitorEvents, 2);
  assert.equal(ops.summary.criticalSignals, 2);
  assert.equal(ops.events.some((event) => event.signalType === "evaluation"), true);
  assert.equal(ops.events.some((event) => event.signalType === "blocker"), true);
});

test("buildAgentCollaborationBoard groups agent work by lane", () => {
  const board = buildAgentCollaborationBoard(
    [{ id: "runner-agent", status: "running", current_task: "ship work" }],
    [{ id: "runner-agent", name: "runner-agent", description: "Runner", runtimeStatus: "running", definitionStatus: "active" }],
    [
      { id: "task-active", title: "Active work", status: "in_progress", agent: "runner-agent", project: "demo", priority: "high" },
      {
        id: "task-blocked",
        title: "Blocked work",
        status: "pending",
        agent: "runner-agent",
        project: "demo",
        blockers: ["needs decision"]
      },
      { id: "task-done", title: "Done work", status: "completed", agent: "runner-agent", project: "demo" }
    ]
  );

  assert.equal(board.summary.activeTasks, 1);
  assert.equal(board.summary.blockedTasks, 1);
  assert.equal(board.summary.completedTasks, 1);
  assert.equal(board.summary.handoffs, 3);
  assert.equal(board.agents[0].activeTaskCount, 1);
  assert.equal(board.blockers[0].blockers[0], "needs decision");
  assert.equal(board.lanes.find((lane) => lane.id === "active").tasks[0].title, "Active work");
});

test("collectSourceFiles skips generated snapshots and reads source roots", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-source-test-"));
  fs.mkdirSync(path.join(root, "app", "src", "generated"), { recursive: true });
  fs.mkdirSync(path.join(root, "app", "src", "core"), { recursive: true });
  fs.writeFileSync(path.join(root, "app", "src", "core", "index.ts"), "export const value = 1;\n");
  fs.writeFileSync(path.join(root, "app", "src", "generated", "snapshot.json"), "{}\n");

  const files = collectSourceFiles(root, [{ name: "app", path: "app/" }]);

  assert.equal(files.length, 1);
  assert.equal(files[0].path, "app/src/core/index.ts");
  assert.equal(files[0].language, "typescript");
});

test("collectViewModeCatalog reads platform access modes", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-view-mode-test-"));
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "access"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "agent-platform", "configs", "access", "view-mode-registry.json"),
    JSON.stringify({
      default_mode: "superadmin_developer",
      modes: [
        {
          id: "superadmin_developer",
          label: "Super Admin Dev",
          intent: "Full view",
          allowed_sections: ["overview", "agents"],
          visibility_rules: { foreground: ["all"] },
          security_notes: ["Design only"]
        }
      ]
    })
  );

  const catalog = collectViewModeCatalog(root);

  assert.equal(catalog.defaultMode, "superadmin_developer");
  assert.equal(catalog.modes.length, 1);
  assert.deepEqual(catalog.modes[0].allowedSections, ["overview", "agents"]);
});

test("collectLanguageModeCatalog reads document language modes", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-language-mode-test-"));
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "access"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "agent-platform", "configs", "access", "language-mode-registry.json"),
    JSON.stringify({
      default_mode: "ko",
      modes: [
        {
          id: "ko",
          label: "Korean Only",
          display_label: "한국어만",
          intent: "Korean docs only",
          included_languages: ["ko"],
          include_unknown: false,
          document_rule: "Show ko"
        },
        {
          id: "en",
          label: "English Only",
          display_label: "English Only",
          intent: "English docs only",
          included_languages: ["en"],
          include_unknown: false,
          document_rule: "Show en"
        }
      ]
    })
  );

  const catalog = collectLanguageModeCatalog(root);

  assert.equal(catalog.defaultMode, "ko");
  assert.equal(catalog.modes.length, 2);
  assert.deepEqual(catalog.modes[0].includedLanguages, ["ko"]);
  assert.equal(catalog.modes[0].includeUnknown, false);
  assert.equal(catalog.modes[0].label, "한국어만");
});

test("collectAgentCatalog merges definitions with runtime status", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-agent-test-"));
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "agents"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "agent-platform", "configs", "agents", "runner-agent.json"),
    JSON.stringify({ name: "runner-agent", runtime: "python", metadata: { status: "active" } })
  );

  const catalog = collectAgentCatalog(
    root,
    [{ id: "runner-agent", status: "running", current_task: "work" }],
    [{ id: "task-1", agent: "runner-agent", status: "completed" }]
  );

  assert.equal(catalog.length, 1);
  assert.equal(catalog[0].runtimeStatus, "running");
  assert.equal(catalog[0].taskCount, 1);
  assert.equal(catalog[0].completedTaskCount, 1);
});
