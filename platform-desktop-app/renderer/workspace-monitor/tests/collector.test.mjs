import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildAgentCollaborationBoard,
  buildAdminHistoryIndex,
  buildCustomerSnapshot,
  buildSnapshot,
  buildUnifiedOps,
  compactDocumentsForSnapshot,
  collectAgentCatalog,
  collectClaudeCodeDesignTransfer,
  collectHistoryInsightLoop,
  collectIntentFeatureMap,
  collectPhilosophyFeatureExtraction,
  collectProductFeatureArchitecture,
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

test("admin history index keeps all history records outside the default snapshot", () => {
  const historyDocuments = Array.from({ length: 120 }, (_, index) => ({
    id: `history-${index}`,
    path: `_history/work-summaries/2026/2026-06-${String((index % 3) + 1).padStart(2, "0")}-item-${index}.ko.md`,
    category: "work-summary",
    language: "ko",
    title: `History ${index}`,
    excerpt: "요약",
    html: "<p>요약</p>",
    previewMode: "admin-summary",
    htmlTruncated: false,
    sourceBytes: 100 + index,
    updatedAt: `2026-06-05T00:${String(index).padStart(2, "0")}:00.000Z`,
    historyDate: `2026-06-${String((index % 3) + 1).padStart(2, "0")}`,
    historyYear: "2026",
    workspaceArea: "history"
  }));
  const baseDocument = {
    id: "project-doc",
    path: "platform-desktop-app/docs/readme.ko.md",
    category: "project-doc",
    language: "ko",
    title: "Project",
    excerpt: "설명",
    html: "<p>설명</p>",
    updatedAt: "2026-06-05T01:00:00.000Z",
    historyDate: "",
    historyYear: "",
    workspaceArea: "project"
  };

  const compacted = compactDocumentsForSnapshot([baseDocument, ...historyDocuments]);
  const adminIndex = buildAdminHistoryIndex([baseDocument, ...historyDocuments]);

  assert.equal(compacted.filter((document) => document.category === "work-summary").length, 96);
  assert.equal(compacted.some((document) => document.id === "project-doc"), true);
  assert.equal(adminIndex.summary.documents, 120);
  assert.equal(adminIndex.historyDays.length, 3);
  assert.equal(adminIndex.migration.status, "migrated_to_lazy_admin_index");
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
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "orchestration"), { recursive: true });
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
    path.join(root, "agent-platform", "configs", "orchestration", "philosophy-feature-extraction-registry.json"),
    JSON.stringify({
      required_principle_ids: ["P07-repetition-becomes-capability"],
      feature_intake_stages: [{ id: "philosophy_intake", label: "Intake", input: "in", output: "out", checks: ["ok"] }],
      principle_feature_flows: [
        {
          id: "capability-factory-loop",
          label: "Capability Factory Loop",
          principle_ids: ["P07-repetition-becomes-capability"],
          feature_question: "What repeated work becomes capability?",
          candidate_rules: ["Choose the smallest asset."],
          output_targets: ["agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json"]
        }
      ],
      quality_gates: [{ id: "source_principle_gate", rule: "Need source", failure_action: "Stop" }],
      seed_feature_candidates: [
        {
          id: "factory",
          label: "Factory",
          source_principle_ids: ["P07-repetition-becomes-capability"],
          human_process_step: "Review repetition",
          feature_hypothesis: "Registry exposes feature candidates",
          smallest_asset_type: "tool",
          status: "implemented",
          risk_tier: "medium",
          evidence_inputs: ["_philosophy/agent-operating-philosophy.ko.md"],
          target_paths: ["agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json"],
          validation_targets: [{ command: "echo ok", validates: "Smoke" }],
          rollback_plan: "Remove registry"
        }
      ],
      default_command: "check"
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
    "# 오늘 요약\n\n- desktop:package:internal build 검증 완료"
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
  assert.equal(snapshot.adminHistory.summary.documents, 1);
  assert.equal(snapshot.adminHistory.inlineHistoryDocuments, 1);
  assert.equal(snapshot.sourceFiles[0].language, "python");
  assert.equal(snapshot.sourceFiles[0].content, undefined);
  assert.match(snapshot.sourceFiles[0].preview, /hello/);
  assert.equal(snapshot.sourceFiles[0].previewBytes > 0, true);
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
  assert.equal(snapshot.stats.philosophyFeatureCandidates, 1);
  assert.equal(snapshot.philosophyFeatureExtraction.summary.requiredPrinciples, 1);
  assert.equal(snapshot.philosophyFeatureExtraction.candidates[0].smallestAssetType, "tool");
  assert.equal(snapshot.structureOverview.summary.totalPlanes, 6);
  assert.equal(snapshot.structureOverview.planes.some((plane) => plane.id === "monitor-ui"), true);
  assert.equal(snapshot.structureOverview.boundaryRules.some((rule) => rule.id === "project-boundary-first"), true);
  assert.equal(snapshot.stats.structurePressurePoints, snapshot.structureOverview.summary.totalPressurePoints);
  assert.equal(snapshot.productFeatureArchitecture.productPosition.primaryProduct, "agent_capability_platform");
  assert.equal(snapshot.productFeatureArchitecture.productPosition.monitoringRole, "supporting_observability");
  assert.equal(snapshot.stats.productFeatures, 8);
  assert.equal(snapshot.stats.primaryProductFeatures, 2);
  assert.equal(snapshot.stats.supportingProductFeatures, 6);
  assert.equal(snapshot.stats.historyInsightPatterns >= 1, true);
  assert.equal(snapshot.historyInsightLoop.signalGroups.some((group) => group.id === "build-closeout-gate"), true);
  assert.equal(snapshot.documents.some((document) => document.language === "ko"), true);
});

test("buildCustomerSnapshot strips internal source and documents", () => {
  const snapshot = {
    schemaVersion: "2026-06-03",
    generatedAt: "2026-06-03T00:00:00.000Z",
    repoRootName: "codex",
    stats: {
      projects: 1,
      agents: 1,
      agentDefinitions: 1,
      activeAgents: 1,
      activeCollaborationTasks: 1,
      blockedCollaborationTasks: 0,
      tasks: 1,
      completedTasks: 1,
      documents: 2,
      requirements: 1,
      evaluations: 1,
      webSearches: 1,
      timingRecords: 1,
      historyDays: 1,
      unifiedOpsEvents: 1,
      modeGroups: 1,
      modeOptions: 1,
      claudeCodeDesignPatterns: 1,
      philosophyFeatureCandidates: 1,
      intentFeatureThemes: 1,
      intentFeatureNow: 1,
      intentFeatureNext: 1,
      intentFeatureLater: 1,
      productFeatures: 6,
      primaryProductFeatures: 5,
      supportingProductFeatures: 1,
      historyInsightPatterns: 1,
      historyInsightRecommendations: 1,
      structurePressurePoints: 1,
      sourceFiles: 1,
      rootFolders: 1
    },
    projects: [{ name: "platform", path: "platform-desktop-app/", status: "active" }],
    agents: [{ id: "agent", status: "active" }],
    agentCatalog: [{ id: "agent" }],
    tasks: [{ id: "task", status: "completed" }],
    requirements: [{ id: "REQ", requirement: "internal", sourcePath: "_requirements/x.md" }],
    documents: [{ id: "doc", path: "_history/x.md", html: "<p>internal</p>" }],
    historyDays: [{ date: "2026-06-03", documents: [] }],
    sourceFiles: [{ path: "platform-desktop-app/src-tauri/src/lib.rs", content: "source" }],
    folderStructure: {
      rootFolders: [{ path: "platform-desktop-app/" }],
      docsCategories: [],
      projectHomes: [],
      historyRoots: []
    },
    structureOverview: {
      summary: {
        totalPlanes: 1,
        totalBoundaryRules: 1,
        totalPressurePoints: 1,
        topSourceHotspots: 1
      },
      planes: [{ id: "desktop-product", label: "Desktop Product" }],
      boundaryRules: [{ id: "customer-source-separation" }],
      pressurePoints: [{ id: "large-source" }],
      sourceHotspots: [{ path: "platform-desktop-app/src-tauri/src/lib.rs" }]
    },
    productFeatureArchitecture: {
      sourcePath: "platform-desktop-app/configs/product-feature-registry.json",
      productPosition: {
        primaryProduct: "agent_capability_platform",
        productClaim: "Agent platform",
        monitoringRole: "supporting_observability"
      },
      desktopHomeSurface: {
        firstViewPriority: ["agent_orchestration"],
        supportingSurfaces: ["observability_monitoring"],
        homeCopyRule: "features first",
        configurationRule: "settings surface"
      },
      summary: {
        totalFeatures: 2,
        primaryFeatures: 1,
        supportingFeatures: 1,
        automationLoops: 1
      },
      featureLayers: [
        {
          id: "agent_orchestration",
          label: "CLI Orchestration",
          role: "primary",
          status: "implemented",
          purpose: "Run lanes",
          userOutcome: "Coordinate work",
          primarySection: "desktop",
          primarySurfaces: ["Desktop Runtime"],
          currentAssets: ["platform-desktop-app/src-tauri/src/lib.rs"],
          automationTargets: ["pipe graph"],
          learningSignals: ["task-run records"],
          validationGates: ["internal gate"]
        },
        {
          id: "observability_monitoring",
          label: "Observability & Monitoring",
          role: "supporting",
          status: "implemented",
          purpose: "Observe",
          userOutcome: "Inspect state",
          primarySection: "structure",
          primarySurfaces: ["Structure"],
          currentAssets: ["internal"],
          automationTargets: ["snapshot"],
          learningSignals: ["service blockers"],
          validationGates: ["internal gate"]
        }
      ],
      promotionLoop: {
        stages: ["observe"],
        recordTargets: ["_history/evaluations/"],
        improvementRule: "promote smallest asset",
        assetOrder: ["prompt", "workflow"]
      },
      qualitySignals: ["feature first"],
      validationGates: [{ id: "gate", command: "internal", validates: "internal" }]
    },
    historyInsightLoop: {
      sourcePath: "_history/",
      summary: {
        sourceDocuments: 3,
        totalPatterns: 1,
        appliedPatterns: 1,
        queuedPatterns: 0,
        activeRecommendations: 1,
        totalEvidenceLinks: 1,
        latestInsightAt: "2026-06-06"
      },
      inferenceStages: [{ id: "observe", label: "Observe", input: "history", output: "signals", guards: ["internal"] }],
      signalGroups: [
        {
          id: "build-closeout-gate",
          label: "Build Gate",
          labelEn: "Build Gate",
          repeatedProcess: "internal",
          inference: "internal",
          platformApplication: "internal",
          targetSection: "desktop",
          assetType: "workflow",
          status: "applied",
          priority: "p0",
          signalStrength: "high",
          signalCount: 3,
          sourceCategories: [{ category: "work-summary", count: 3 }],
          evidencePaths: ["_history/work-summaries/2026/x.ko.md"],
          evidenceTitles: ["internal"],
          latestEvidenceAt: "2026-06-06"
        }
      ]
    },
    categories: ["project-doc"],
    publicReview: { status: "review_required_before_public_deploy", checklist: [] }
  };

  const customer = buildCustomerSnapshot(snapshot);

  assert.equal(customer.repoRootName, "customer-workspace");
  assert.equal(customer.stats.sourceFiles, 0);
  assert.equal(customer.stats.documents, 0);
  assert.equal(customer.stats.philosophyFeatureCandidates, 0);
  assert.equal(customer.stats.intentFeatureThemes, 0);
  assert.equal(customer.stats.productFeatures, 2);
  assert.equal(customer.stats.primaryProductFeatures, 1);
  assert.equal(customer.stats.supportingProductFeatures, 1);
  assert.equal(customer.stats.historyInsightPatterns, 0);
  assert.equal(customer.stats.historyInsightRecommendations, 0);
  assert.equal(customer.stats.structurePressurePoints, 0);
  assert.equal(customer.sourceFiles.length, 0);
  assert.equal(customer.documents.length, 0);
  assert.equal(customer.structureOverview.summary.totalPlanes, 0);
  assert.equal(customer.structureOverview.pressurePoints.length, 0);
  assert.equal(customer.philosophyFeatureExtraction.candidates.length, 0);
  assert.equal(customer.intentFeatureMap.themes.length, 0);
  assert.equal(customer.intentFeatureMap.roadmap.now.length, 0);
  assert.equal(customer.productFeatureArchitecture.featureLayers.length, 2);
  assert.equal(customer.productFeatureArchitecture.featureLayers[0].label, "CLI Orchestration");
  assert.equal(customer.productFeatureArchitecture.featureLayers[0].currentAssets.length, 0);
  assert.equal(customer.productFeatureArchitecture.featureLayers[0].validationGates.length, 0);
  assert.equal(customer.productFeatureArchitecture.promotionLoop.recordTargets.length, 0);
  assert.equal(customer.productFeatureArchitecture.validationGates.length, 0);
  assert.equal(customer.historyInsightLoop.signalGroups.length, 0);
  assert.equal(customer.historyInsightLoop.inferenceStages.length, 0);
  assert.equal(customer.historyDays.length, 0);
  assert.equal(customer.projects.length, 0);
  assert.equal(customer.publicReview.status, "customer_snapshot_sanitized");
  assert.equal(customer.viewModeCatalog.defaultMode, "user");
  assert.deepEqual(customer.viewModeCatalog.modes[0].allowedSections, [
    "overview",
    "agents",
    "tools",
    "desktop",
    "source",
    "intent"
  ]);
});

test("collectHistoryInsightLoop turns repeated history into platform applications", () => {
  const base = {
    id: "history",
    language: "ko",
    html: "",
    updatedAt: "2026-06-06T00:00:00.000Z",
    historyDate: "2026-06-06",
    historyYear: "2026",
    workspaceArea: "history"
  };
  const loop = collectHistoryInsightLoop([
    {
      ...base,
      path: "_history/work-summaries/2026/2026-06-06-build.ko.md",
      category: "work-summary",
      title: "자동 빌드 요약",
      excerpt: "desktop:package:internal build 검증 완료 .app .dmg 생성"
    },
    {
      ...base,
      path: "_history/web-searches/2026/2026-06-06-research.ko.md",
      category: "web-search",
      title: "웹 검색 기록",
      excerpt: "web search official source research 근거 스펙"
    },
    {
      ...base,
      path: "platform-desktop-app/specs/2026-06-06-native/spec.ko.md",
      category: "project-spec",
      title: "Rust native resource spec",
      excerpt: "rust cpu ram memory pty pipe process tauri native"
    },
    {
      ...base,
      path: "_history/evaluations/2026/2026-06-06-ui.ko.md",
      category: "evaluation",
      title: "UI 디자인 평가",
      excerpt: "ui 버튼 dropdown 탭 사이드바 직관 디자인 overflow 검증"
    }
  ]);

  assert.equal(loop.summary.totalPatterns >= 4, true);
  assert.equal(loop.inferenceStages.map((stage) => stage.id).join(","), "observe,cluster,infer,apply,verify");
  assert.equal(loop.signalGroups.some((group) => group.id === "desktop-native-resource-loop"), true);
  assert.equal(loop.signalGroups.every((group) => group.evidencePaths.length > 0), true);
});

test("collectProductFeatureArchitecture reads primary features and supporting observability", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-product-features-test-"));
  fs.mkdirSync(path.join(root, "platform-desktop-app", "configs"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "platform-desktop-app", "configs", "product-feature-registry.json"),
    JSON.stringify({
      product_position: {
        primary_product: "agent_capability_platform",
        primary_claim: "Agent platform",
        monitoring_role: "supporting_observability"
      },
      desktop_home_surface: {
        first_view_priority: ["agent_orchestration"],
        supporting_surfaces: ["observability_monitoring"],
        home_copy_rule: "features first",
        configuration_rule: "settings"
      },
      feature_layers: [
        {
          id: "agent_orchestration",
          label: "CLI Orchestration",
          role: "primary",
          status: "implemented",
          purpose: "Coordinate agents",
          user_outcome: "Run coordinated work",
          primary_section: "desktop",
          primary_surfaces: ["Desktop Runtime"],
          current_assets: ["platform-desktop-app/src-tauri/src/lib.rs"],
          automation_targets: ["process graph"],
          learning_signals: ["task-run records"],
          validation_gates: ["gate"]
        },
        {
          id: "observability_monitoring",
          label: "Observability & Monitoring",
          role: "supporting",
          status: "implemented",
          purpose: "Observe state",
          user_outcome: "Inspect state",
          primary_section: "structure",
          primary_surfaces: ["Structure"],
          current_assets: ["platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs"],
          automation_targets: ["snapshot"],
          learning_signals: ["service blockers"],
          validation_gates: ["support role gate"]
        }
      ],
      promotion_loop: {
        stages: ["observe_repetition_or_gap"],
        record_targets: ["_history/request-traces/"],
        improvement_rule: "promote smallest asset",
        asset_order: ["prompt", "workflow", "tool"]
      },
      quality_signals: ["feature first"],
      validation_gates: [{ id: "product_identity_gate", command: "test", validates: "identity" }]
    })
  );

  const architecture = collectProductFeatureArchitecture(root);

  assert.equal(architecture.productPosition.primaryProduct, "agent_capability_platform");
  assert.equal(architecture.productPosition.monitoringRole, "supporting_observability");
  assert.equal(architecture.summary.totalFeatures, 2);
  assert.equal(architecture.summary.primaryFeatures, 1);
  assert.equal(architecture.summary.supportingFeatures, 1);
  assert.equal(architecture.featureLayers[0].label, "CLI Orchestration");
  assert.equal(architecture.featureLayers[1].role, "supporting");
  assert.equal(architecture.promotionLoop.assetOrder[2], "tool");
});

test("collectIntentFeatureMap reads themes and roadmap from history synthesis", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-intent-map-test-"));
  fs.mkdirSync(path.join(root, "_history", "intent-feature-maps", "2026"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "_history", "intent-feature-maps", "2026", "2026-06-02-user-intent-feature-map.ko.md"),
    [
      "# 오래된 사용자 의도 기반 기능 지도",
      "",
      "- 총 구조화 의도: 1개",
      "",
      "## 요약 결론",
      "",
      "| 축 | 사용자 의도 | 이미 구현된 핵심 기능 | 다음 기능 후보 |",
      "| --- | --- | --- | --- |",
      "| 1. 오래된 축 | 오래된 의도 | 오래된 기능 | 오래된 후보 |",
      "",
      "### Now",
      "",
      "| 기능 후보 | 이유 | 의존성 |",
      "| --- | --- | --- |",
      "| Old UI | 오래된 후보다. | old |"
    ].join("\n")
  );
  fs.writeFileSync(
    path.join(root, "_history", "intent-feature-maps", "2026", "2026-06-03-user-intent-feature-map.ko.md"),
    [
      "# 사용자 의도 기반 기능 지도",
      "",
      "- 총 구조화 의도: 155개",
      "",
      "## 요약 결론",
      "",
      "| 축 | 사용자 의도 | 이미 구현된 핵심 기능 | 다음 기능 후보 |",
      "| --- | --- | --- | --- |",
      "| 1. 플랫폼 정체성과 운영 루프 | 의도에서 기능을 만든다. | 요구사항과 스펙 | Intent cockpit |",
      "",
      "## 제품 관점의 남은 큰 기능",
      "",
      "### Now",
      "",
      "| 기능 후보 | 이유 | 의존성 |",
      "| --- | --- | --- |",
      "| Intent Feature Map UI | 우선순위 판단이 쉬워진다. | Workspace Monitor snapshot 확장 |",
      "",
      "### Next",
      "",
      "| 기능 후보 | 이유 | 의존성 |",
      "| --- | --- | --- |",
      "| Data Quality Dashboard | 축적 품질을 측정한다. | history records |",
      "",
      "### Later",
      "",
      "| 기능 후보 | 이유 | 의존성 |",
      "| --- | --- | --- |",
      "| Signed Updater Channel | 배포 rollback이 필요하다. | signing key policy |",
      "",
      "## 출처와 한계",
      "",
      "- `_history/user-requests`를 기반으로 한 synthesis다."
    ].join("\n")
  );

  const intentMap = collectIntentFeatureMap(root);

  assert.equal(intentMap.summary.totalIntents, 155);
  assert.equal(intentMap.summary.totalThemes, 1);
  assert.equal(intentMap.summary.now, 1);
  assert.equal(intentMap.summary.availableMaps, 2);
  assert.equal(intentMap.summary.sourceDate, "2026-06-03");
  assert.equal(intentMap.sourcePath, "_history/intent-feature-maps/2026/2026-06-03-user-intent-feature-map.ko.md");
  assert.equal(intentMap.themes[0].label, "플랫폼 정체성과 운영 루프");
  assert.equal(intentMap.roadmap.now[0].feature, "Intent Feature Map UI");
  assert.equal(intentMap.sourceLimits.length, 1);
});

test("collectPhilosophyFeatureExtraction reads feature flows and candidates", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-philosophy-feature-test-"));
  fs.mkdirSync(path.join(root, "agent-platform", "configs", "orchestration"), { recursive: true });
  fs.writeFileSync(
    path.join(root, "agent-platform", "configs", "orchestration", "philosophy-feature-extraction-registry.json"),
    JSON.stringify({
      required_principle_ids: ["P08-model-human-process"],
      feature_intake_stages: [{ id: "human_process_model", label: "Human Process", input: "in", output: "out", checks: ["ok"] }],
      principle_feature_flows: [
        {
          id: "capability-factory-loop",
          label: "Capability Factory Loop",
          principle_ids: ["P08-model-human-process"],
          feature_question: "What human process should be modeled?",
          candidate_rules: ["Model first."],
          output_targets: ["_ops/workflows/79-philosophy-feature-extraction.md"]
        }
      ],
      quality_gates: [{ id: "human_process_gate", rule: "Model first", failure_action: "Rework" }],
      seed_feature_candidates: [
        {
          id: "human-process-canvas",
          label: "Human Process Canvas",
          source_principle_ids: ["P08-model-human-process"],
          human_process_step: "Map the direct work",
          feature_hypothesis: "A canvas makes automation safer",
          smallest_asset_type: "template",
          status: "planned",
          risk_tier: "low",
          evidence_inputs: ["source"],
          target_paths: ["_templates/human-process-canvas"],
          validation_targets: [{ command: "echo ok", validates: "Smoke" }],
          rollback_plan: "Do not create template"
        }
      ],
      default_command: "check-philosophy-features"
    })
  );

  const extraction = collectPhilosophyFeatureExtraction(root);

  assert.equal(extraction.summary.totalFlows, 1);
  assert.equal(extraction.summary.totalCandidates, 1);
  assert.equal(extraction.flows[0].principleIds[0], "P08-model-human-process");
  assert.equal(extraction.candidates[0].smallestAssetType, "template");
  assert.equal(extraction.qualityGates[0].id, "human_process_gate");
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
  assert.equal(catalog.groups.find((group) => group.id === "section_location").options.some((option) => option.id === "intent"), true);
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
  fs.mkdirSync(path.join(root, "app", "src-tauri", "src"), { recursive: true });
  fs.mkdirSync(path.join(root, "app", "src-tauri", "target", "debug"), { recursive: true });
  fs.writeFileSync(path.join(root, "app", "src", "core", "index.ts"), "export const value = 1;\n");
  fs.writeFileSync(path.join(root, "app", "src", "generated", "snapshot.json"), "{}\n");
  fs.writeFileSync(path.join(root, "app", "src-tauri", "src", "lib.rs"), "pub fn run() {}\n");
  fs.writeFileSync(path.join(root, "app", "src-tauri", "target", "debug", "build.rs"), "fn main() {}\n");

  const files = collectSourceFiles(root, [{ name: "app", path: "app/" }]);
  const tsFile = files.find((file) => file.path === "app/src/core/index.ts");
  const rustFile = files.find((file) => file.path === "app/src-tauri/src/lib.rs");

  assert.equal(files.length, 2);
  assert.equal(tsFile?.language, "typescript");
  assert.equal(rustFile?.language, "rust");
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
