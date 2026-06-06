import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { collectIntentFeatureMap, emptyIntentFeatureMap } from "./lib/intent-feature-map.mjs";
import {
  collectProductFeatureArchitecture,
  emptyProductFeatureArchitecture,
  sanitizeProductFeatureArchitectureForCustomer
} from "./lib/product-feature-architecture.mjs";
import {
  collectReferencePlatformAdvantages,
  emptyReferencePlatformAdvantages,
  sanitizeReferencePlatformAdvantagesForCustomer
} from "./lib/reference-platform-advantages.mjs";
import {
  collectOpenSourceFeatureReferences,
  emptyOpenSourceFeatureReferences,
  sanitizeOpenSourceFeatureReferencesForCustomer
} from "./lib/open-source-feature-references.mjs";
import {
  collectHistoryInsightLoop,
  emptyHistoryInsightLoop,
  sanitizeHistoryInsightLoopForCustomer
} from "./lib/history-insight-loop.mjs";
import {
  collectFundamentalImprovementStructure,
  emptyFundamentalImprovementStructure,
  sanitizeFundamentalImprovementStructureForCustomer
} from "./lib/fundamental-improvement-structure.mjs";
import {
  collectToolUsageIntegration,
  emptyToolUsageIntegration,
  sanitizeToolUsageIntegrationForCustomer
} from "./lib/tool-usage-integration.mjs";
import { recommendedWorkerCount, runWorkerTasks } from "./lib/snapshot-worker-pool.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const defaultRepoRoot = path.resolve(projectRoot, "..", "..", "..");
const snapshotFileWorkerPath = path.join(__dirname, "lib", "snapshot-file-worker.mjs");
const snapshotPath = path.join(projectRoot, "src", "generated", "workspace-snapshot.json");
const customerFallbackSnapshotPath = path.join(projectRoot, "src", "generated", "customer-workspace-snapshot.json");
const publicSnapshotPath = path.join(projectRoot, "public", "workspace-snapshot.json");
const publicAdminHistoryIndexPath = path.join(projectRoot, "public", "admin-history-index.json");

const IGNORE_DIRS = new Set([".git", ".next", "node_modules", "out", "target", "__pycache__", ".pytest_cache", "_private", "outputs"]);
const MAX_DOCUMENTS = 650;
const MAX_INLINE_HISTORY_DOCUMENTS = 96;
const DEFAULT_DOCUMENT_HTML_CHARS = 5200;
const HISTORY_DOCUMENT_HTML_CHARS = 2200;
const HISTORY_ADMIN_EXCERPT_CHARS = 360;
const MAX_SOURCE_FILES = 260;
const MAX_SOURCE_PREVIEW_CHARS = 1200;
const MAX_SOURCE_FILE_BYTES = 180000;
const SOURCE_DIR_NAMES = ["src", "src-tauri", "tests", "app", "components", "lib", "scripts"];
const SOURCE_EXTENSIONS = new Set([
  ".py",
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".rs",
  ".css",
  ".html",
  ".json",
  ".toml",
  ".yaml",
  ".yml",
  ".sh"
]);
const SOURCE_EXCLUDED_SEGMENTS = [
  "/_private/",
  "/outputs/",
  "/src/generated/",
  "/src-tauri/gen/",
  "/public/",
  "/out/",
  "/target/",
  "/.next/",
  "/node_modules/"
];
const HISTORY_CATEGORIES = new Set([
  "daily-history",
  "evaluation",
  "intent-feature-map",
  "plan",
  "request-trace",
  "user-request",
  "web-search",
  "work-timing",
  "work-summary"
]);
const DOCUMENT_SOURCES = [
  { category: "workspace-doc", root: "_docs" },
  { category: "philosophy", root: "_philosophy" },
  { category: "work-summary", root: "_history/work-summaries" },
  { category: "user-request", root: "_history/user-requests" },
  { category: "intent-feature-map", root: "_history/intent-feature-maps" },
  { category: "request-trace", root: "_history/request-traces" },
  { category: "web-search", root: "_history/web-searches" },
  { category: "work-timing", root: "_history/work-timings" },
  { category: "plan", root: "_history/plans" },
  { category: "evaluation", root: "_history/evaluations" },
  { category: "daily-history", root: "_history/2026" },
  { category: "requirement", root: "_requirements" },
  { category: "shared-spec", root: "_specs" },
  { category: "coordination", root: "_ops/coordination" },
  { category: "security", root: "_ops/security" },
  { category: "runtime-adapter", root: "_ops/assistant-runtimes" },
  { category: "runtime-adapter", root: ".claude/rules" },
  { category: "runtime-adapter", root: ".cursor/rules" },
  { category: "runtime-adapter", root: ".agents/rules" },
  { category: "agent-config", root: "agent-platform/configs/agents" },
  { category: "agent-config", root: "agent-platform/configs/access" },
  { category: "security-config", root: "agent-platform/configs/security" },
  { category: "template", root: "_templates/assistant-operating-principles" },
  { category: "project-doc", root: "agent-platform/docs" },
  { category: "project-doc", root: "presentation-agent/docs" },
  { category: "project-doc", root: "platform-desktop-app/docs" },
  { category: "project-doc", root: "platform-desktop-app/renderer/workspace-monitor/docs" },
  { category: "project-config", root: "platform-desktop-app/configs" },
  { category: "project-spec", root: "agent-platform/specs" },
  { category: "project-spec", root: "presentation-agent/specs" },
  { category: "project-spec", root: "platform-desktop-app/specs" },
  { category: "project-spec", root: "platform-desktop-app/renderer/workspace-monitor/specs" }
];
const DOCUMENT_FILES = [
  { category: "runtime-adapter", file: "AGENTS.md" },
  { category: "runtime-adapter", file: "CLAUDE.md" }
];

export {
  collectFundamentalImprovementStructure,
  collectHistoryInsightLoop,
  collectIntentFeatureMap,
  collectOpenSourceFeatureReferences,
  collectProductFeatureArchitecture,
  collectReferencePlatformAdvantages,
  collectToolUsageIntegration
};

export async function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const repoRoot = path.resolve(options.repoRoot || process.env.MONITOR_REPO_ROOT || defaultRepoRoot);
  const canReadRepo = fs.existsSync(path.join(repoRoot, "_history")) && fs.existsSync(path.join(repoRoot, "_ops"));

  if (!canReadRepo && options.bestEffort && fs.existsSync(snapshotPath)) {
    console.warn(`[workspace-monitor] Repository root unavailable; keeping existing snapshot at ${snapshotPath}`);
    return;
  }
  if (!canReadRepo) {
    throw new Error(`Repository root is not readable: ${repoRoot}`);
  }

  const snapshot = await buildSnapshot(repoRoot);
  const adminHistoryIndex = buildAdminHistoryIndex(snapshot.adminHistorySourceDocuments || []);
  delete snapshot.adminHistorySourceDocuments;
  const publicSnapshot = options.snapshotMode === "customer" ? buildCustomerSnapshot(snapshot) : snapshot;
  const customerFallbackSnapshot = buildCustomerSnapshot(snapshot);
  const publicAdminHistoryIndex = options.snapshotMode === "customer" ? emptyAdminHistoryIndex() : adminHistoryIndex;
  writeJson(snapshotPath, snapshot);
  writeJson(customerFallbackSnapshotPath, customerFallbackSnapshot);
  writeJson(publicSnapshotPath, publicSnapshot);
  writeJson(publicAdminHistoryIndexPath, publicAdminHistoryIndex);
  console.log(
    `[workspace-monitor] Wrote ${snapshot.documents.length} inline documents and ${adminHistoryIndex.summary.documents} admin history records (${options.snapshotMode} public snapshot)`
  );
}

export async function buildSnapshot(repoRoot) {
  const projects = readJson(path.join(repoRoot, "_ops", "projects", "registry.json"), { projects: [] }).projects || [];
  const coordination = readJson(path.join(repoRoot, "_ops", "coordination", "status.json"), { agents: [], tasks: [] });
  const documentTasks = collectDocumentTasks(repoRoot);
  const allDocuments = await collectDocumentsParallel(repoRoot, documentTasks);
  const adminHistoryIndex = buildAdminHistoryIndex(allDocuments);
  const documents = compactDocumentsForSnapshot(allDocuments);
  const requirements = collectRequirements(repoRoot);
  const historyDays = buildHistoryDays(documents);
  const viewModeCatalog = collectViewModeCatalog(repoRoot);
  const languageModeCatalog = collectLanguageModeCatalog(repoRoot);
  const modeFunctionCatalog = collectModeFunctionCatalog(repoRoot, viewModeCatalog, languageModeCatalog);
  const claudeCodeDesignTransfer = collectClaudeCodeDesignTransfer(repoRoot);
  const philosophyFeatureExtraction = collectPhilosophyFeatureExtraction(repoRoot);
  const intentFeatureMap = collectIntentFeatureMap(repoRoot);
  const productFeatureArchitecture = collectProductFeatureArchitecture(repoRoot);
  const referencePlatformAdvantages = collectReferencePlatformAdvantages(repoRoot);
  const openSourceFeatureReferences = collectOpenSourceFeatureReferences(repoRoot);
  const historyInsightLoop = collectHistoryInsightLoop(allDocuments);
  const fundamentalImprovementStructure = collectFundamentalImprovementStructure(historyInsightLoop);
  const toolUsageIntegration = collectToolUsageIntegration(repoRoot);
  const sourceFileCandidates = collectSourceFileCandidates(repoRoot, projects);
  const sourceFiles = await collectSourceFilesParallel(repoRoot, sourceFileCandidates);
  const folderStructure = buildFolderStructure(repoRoot, projects, documents);
  const structureOverview = buildStructureOverview(repoRoot, projects, documents, folderStructure, sourceFiles);
  const categories = Array.from(new Set(documents.map((document) => document.category))).sort();
  const tasks = (coordination.tasks || []).map((task) => attachTaskTiming(repoRoot, task));
  const agentCatalog = collectAgentCatalog(repoRoot, coordination.agents || [], tasks);
  const collaborationBoard = buildAgentCollaborationBoard(coordination.agents || [], agentCatalog, tasks);
  const unifiedOps = buildUnifiedOps({
    documents,
    historyDays,
    tasks,
    collaborationBoard
  });
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const activeAgents = (coordination.agents || []).filter((agent) => agent.status !== "idle").length;

  return {
    schemaVersion: "2026-06-03",
    generatedAt: new Date().toISOString(),
    repoRootName: path.basename(repoRoot),
    stats: {
      projects: projects.length,
      agents: (coordination.agents || []).length,
      agentDefinitions: agentCatalog.length,
      activeAgents,
      activeCollaborationTasks: collaborationBoard.summary.activeTasks,
      blockedCollaborationTasks: collaborationBoard.summary.blockedTasks,
      tasks: (coordination.tasks || []).length,
      completedTasks,
      documents: documents.length,
      requirements: requirements.length,
      evaluations: documents.filter((document) => document.category === "evaluation").length,
      webSearches: documents.filter((document) => document.category === "web-search").length,
      timingRecords: documents.filter((document) => document.category === "work-timing").length,
      historyDays: historyDays.length,
      adminHistoryDocuments: adminHistoryIndex.summary.documents,
      adminHistoryDays: adminHistoryIndex.summary.days,
      unifiedOpsEvents: unifiedOps.summary.totalEvents,
      modeGroups: modeFunctionCatalog.summary.totalGroups,
      modeOptions: modeFunctionCatalog.summary.totalOptions,
      claudeCodeDesignPatterns: claudeCodeDesignTransfer.summary.totalPatterns,
      philosophyFeatureCandidates: philosophyFeatureExtraction.summary.totalCandidates,
      intentFeatureThemes: intentFeatureMap.summary.totalThemes,
      intentFeatureNow: intentFeatureMap.summary.now,
      intentFeatureNext: intentFeatureMap.summary.next,
      intentFeatureLater: intentFeatureMap.summary.later,
      productFeatures: productFeatureArchitecture.summary.totalFeatures,
      primaryProductFeatures: productFeatureArchitecture.summary.primaryFeatures,
      supportingProductFeatures: productFeatureArchitecture.summary.supportingFeatures,
      referencePlatforms: referencePlatformAdvantages.summary.platformGroups,
      referenceTransferPatterns: referencePlatformAdvantages.summary.totalPatterns,
      openSourceReferenceLayers: openSourceFeatureReferences.summary.totalLayers,
      openSourceReferenceRepos: openSourceFeatureReferences.summary.totalRepositories,
      historyInsightPatterns: historyInsightLoop.summary.totalPatterns,
      historyInsightRecommendations: historyInsightLoop.summary.activeRecommendations,
      fundamentalImprovementPrinciples: fundamentalImprovementStructure.summary.totalStructuralPrinciples,
      fundamentalImprovementPackages: fundamentalImprovementStructure.summary.totalImprovementPackages,
      fundamentalImprovementFitnessChecks: fundamentalImprovementStructure.summary.totalFitnessChecks,
      toolUsagePatterns: toolUsageIntegration.summary.totalPatterns,
      toolUsageValidationCommands: toolUsageIntegration.summary.validationCommands,
      snapshotDocumentWorkers: recommendedWorkerCount(documentTasks.length, { maxWorkers: 6, minTasksPerWorker: 80 }),
      snapshotSourceWorkers: recommendedWorkerCount(sourceFileCandidates.length, { maxWorkers: 4, minTasksPerWorker: 24 }),
      structurePressurePoints: structureOverview.summary.totalPressurePoints,
      sourceFiles: sourceFiles.length,
      rootFolders: folderStructure.rootFolders.length
    },
    projects: projects.map(normalizeProject),
    agents: coordination.agents || [],
    agentCatalog,
    collaborationBoard,
    tasks,
    requirements,
    documents,
    historyDays,
    adminHistory: {
      schemaVersion: adminHistoryIndex.schemaVersion,
      sourcePath: "admin-history-index.json",
      loadMode: "lazy-admin-surface",
      inlineHistoryDocuments: documents.filter((document) => HISTORY_CATEGORIES.has(document.category)).length,
      summary: adminHistoryIndex.summary,
      migration: adminHistoryIndex.migration
    },
    adminHistorySourceDocuments: adminHistoryIndex.documents,
    unifiedOps,
    sourceFiles,
    folderStructure,
    structureOverview,
    viewModeCatalog,
    languageModeCatalog,
    modeFunctionCatalog,
    claudeCodeDesignTransfer,
    philosophyFeatureExtraction,
    intentFeatureMap,
    productFeatureArchitecture,
    referencePlatformAdvantages,
    openSourceFeatureReferences,
    historyInsightLoop,
    fundamentalImprovementStructure,
    toolUsageIntegration,
    categories,
    publicReview: {
      status: "review_required_before_public_deploy",
      checklist: [
        "Review src/generated/workspace-snapshot.json before making the repository public.",
        "Remove sourceFiles payloads from public/customer bundles and load full source text through runtime commands.",
        "Run python3 _tools/privacy-audit/src/privacy_audit.py --check before public deploy.",
        "Remove or redact private notes, secrets, raw prompts, or local-only paths that should not be published.",
        "Regenerate the snapshot after any redaction and run pnpm run build again."
      ]
    }
  };
}

export function buildCustomerSnapshot(snapshot) {
  return {
    schemaVersion: snapshot.schemaVersion,
    generatedAt: new Date().toISOString(),
    repoRootName: "customer-workspace",
    stats: {
      projects: 0,
      agents: 0,
      agentDefinitions: 0,
      activeAgents: 0,
      activeCollaborationTasks: 0,
      blockedCollaborationTasks: 0,
      tasks: 0,
      completedTasks: 0,
      documents: 0,
      requirements: 0,
      evaluations: 0,
      webSearches: 0,
      timingRecords: 0,
      historyDays: 0,
      adminHistoryDocuments: 0,
      adminHistoryDays: 0,
      unifiedOpsEvents: 0,
      modeGroups: 0,
      modeOptions: 0,
      claudeCodeDesignPatterns: 0,
      philosophyFeatureCandidates: 0,
      intentFeatureThemes: 0,
      intentFeatureNow: 0,
      intentFeatureNext: 0,
      intentFeatureLater: 0,
      productFeatures: snapshot.productFeatureArchitecture?.summary.totalFeatures ?? 0,
      primaryProductFeatures: snapshot.productFeatureArchitecture?.summary.primaryFeatures ?? 0,
      supportingProductFeatures: snapshot.productFeatureArchitecture?.summary.supportingFeatures ?? 0,
      referencePlatforms: snapshot.referencePlatformAdvantages?.summary.platformGroups ?? 0,
      referenceTransferPatterns: snapshot.referencePlatformAdvantages?.summary.totalPatterns ?? 0,
      openSourceReferenceLayers: snapshot.openSourceFeatureReferences?.summary.totalLayers ?? 0,
      openSourceReferenceRepos: snapshot.openSourceFeatureReferences?.summary.totalRepositories ?? 0,
      historyInsightPatterns: 0,
      historyInsightRecommendations: 0,
      fundamentalImprovementPrinciples: 0,
      fundamentalImprovementPackages: 0,
      fundamentalImprovementFitnessChecks: 0,
      toolUsagePatterns: snapshot.toolUsageIntegration?.summary.totalPatterns ?? 0,
      toolUsageValidationCommands: snapshot.toolUsageIntegration?.summary.validationCommands ?? 0,
      snapshotDocumentWorkers: 0,
      snapshotSourceWorkers: 0,
      structurePressurePoints: 0,
      sourceFiles: 0,
      rootFolders: 0
    },
    projects: [],
    agents: [],
    agentCatalog: [],
    tasks: [],
    requirements: [],
    documents: [],
    historyDays: [],
    adminHistory: {
      schemaVersion: "2026-06-05.admin-history-index",
      sourcePath: "admin-history-index.json",
      loadMode: "disabled-customer-snapshot",
      inlineHistoryDocuments: 0,
      summary: {
        documents: 0,
        days: 0,
        categories: [],
        totalSourceBytes: 0,
        generatedFrom: []
      },
      migration: {
        status: "customer_snapshot_sanitized",
        rule: "Internal history records are not bundled into customer snapshots."
      }
    },
    sourceFiles: [],
    folderStructure: {
      rootFolders: [],
      docsCategories: [],
      projectHomes: [],
      historyRoots: []
    },
    structureOverview: {
      summary: {
        totalPlanes: 0,
        totalBoundaryRules: 0,
        totalPressurePoints: 0,
        topSourceHotspots: 0
      },
      planes: [],
      boundaryRules: [],
      pressurePoints: [],
      sourceHotspots: []
    },
    viewModeCatalog: {
      defaultMode: "user",
      modes: [
        {
          id: "user",
          label: "User View",
          intent: "Installed customer workbench for running, editing, creating, and improving agents.",
          allowedSections: ["overview", "agents", "tools", "desktop", "source", "intent"],
          visibilityRules: {},
          securityNotes: ["Platform source tree is excluded from the customer bundle snapshot."]
        }
      ]
    },
    languageModeCatalog: {
      defaultMode: "all",
      modes: [
        {
          id: "all",
          label: "All Languages",
          intent: "Show available customer-facing content.",
          includedLanguages: ["ko", "en"],
          includeUnknown: true,
          documentRule: "Customer-facing content only."
        }
      ]
    },
    philosophyFeatureExtraction: {
      sourcePath: "",
      defaultCommand: "",
      summary: {
        requiredPrinciples: 0,
        totalFlows: 0,
        totalStages: 0,
        totalCandidates: 0,
        implemented: 0,
        planned: 0,
        queued: 0,
        mediumRisk: 0,
        highRisk: 0
      },
      stages: [],
      flows: [],
      qualityGates: [],
      candidates: []
    },
    intentFeatureMap: emptyIntentFeatureMap(),
    productFeatureArchitecture: sanitizeProductFeatureArchitectureForCustomer(
      snapshot.productFeatureArchitecture || emptyProductFeatureArchitecture()
    ),
    referencePlatformAdvantages: sanitizeReferencePlatformAdvantagesForCustomer(
      snapshot.referencePlatformAdvantages || emptyReferencePlatformAdvantages()
    ),
    openSourceFeatureReferences: sanitizeOpenSourceFeatureReferencesForCustomer(
      snapshot.openSourceFeatureReferences || emptyOpenSourceFeatureReferences()
    ),
    historyInsightLoop: sanitizeHistoryInsightLoopForCustomer(snapshot.historyInsightLoop || emptyHistoryInsightLoop()),
    fundamentalImprovementStructure: sanitizeFundamentalImprovementStructureForCustomer(
      snapshot.fundamentalImprovementStructure || emptyFundamentalImprovementStructure()
    ),
    toolUsageIntegration: sanitizeToolUsageIntegrationForCustomer(
      snapshot.toolUsageIntegration || emptyToolUsageIntegration()
    ),
    categories: [],
    publicReview: {
      status: "customer_snapshot_sanitized",
      checklist: [
        "sourceFiles are removed from the installer bundle snapshot.",
        "Internal documents, history, specs, and requirements are removed from the installer bundle snapshot.",
        "Runtime data is loaded through Tauri commands after the installed app starts."
      ]
    }
  };
}

export function collectClaudeCodeDesignTransfer(repoRoot) {
  const sourcePath = "platform-desktop-app/configs/claude-code-design-transfer-registry.json";
  const registry = readJson(path.join(repoRoot, sourcePath), {
    source_boundary: {
      policy: "public_sources_only",
      excluded_sources: ["leaked_or_non_public_material"]
    },
    transfer_patterns: []
  });
  const patterns = Array.isArray(registry.transfer_patterns)
    ? registry.transfer_patterns
        .filter((pattern) => pattern && typeof pattern === "object")
        .map((pattern) => ({
          id: pattern.id || "",
          label: pattern.label || titleFromPath(pattern.id || "pattern"),
          claudeCodeSignal: pattern.claude_code_signal || "",
          transferPrinciple: pattern.transfer_principle || "",
          platformMapping: pattern.platform_mapping || "",
          currentPlatformAssets: Array.isArray(pattern.current_platform_assets) ? pattern.current_platform_assets : [],
          implementationTargets: Array.isArray(pattern.implementation_targets) ? pattern.implementation_targets : [],
          riskControls: Array.isArray(pattern.risk_controls) ? pattern.risk_controls : [],
          status: pattern.status || "candidate",
          priority: pattern.priority || "medium",
          sourceIds: Array.isArray(pattern.public_source_ids) ? pattern.public_source_ids : [],
          sourcePath
        }))
        .filter((pattern) => pattern.id)
    : [];

  const readyNow = patterns.filter((pattern) => ["implemented", "active", "ready_now"].includes(pattern.status)).length;
  const queued = patterns.filter((pattern) => ["queued", "candidate", "planned"].includes(pattern.status)).length;
  const highPriority = patterns.filter((pattern) => ["high", "must"].includes(pattern.priority)).length;

  return {
    sourcePath,
    sourceBoundary: registry.source_boundary || {},
    summary: {
      totalPatterns: patterns.length,
      readyNow,
      queued,
      highPriority
    },
    patterns
  };
}

export function collectPhilosophyFeatureExtraction(repoRoot) {
  const sourcePath = "agent-platform/configs/orchestration/philosophy-feature-extraction-registry.json";
  const registry = readJson(path.join(repoRoot, sourcePath), {
    required_principle_ids: [],
    feature_intake_stages: [],
    principle_feature_flows: [],
    quality_gates: [],
    seed_feature_candidates: [],
    default_command: ""
  });

  const stages = Array.isArray(registry.feature_intake_stages)
    ? registry.feature_intake_stages
        .filter((stage) => stage && typeof stage === "object")
        .map((stage) => ({
          id: stage.id || "",
          label: stage.label || titleFromPath(stage.id || "stage"),
          input: stage.input || "",
          output: stage.output || "",
          checks: Array.isArray(stage.checks) ? stage.checks : []
        }))
        .filter((stage) => stage.id)
    : [];

  const flows = Array.isArray(registry.principle_feature_flows)
    ? registry.principle_feature_flows
        .filter((flow) => flow && typeof flow === "object")
        .map((flow) => ({
          id: flow.id || "",
          label: flow.label || titleFromPath(flow.id || "flow"),
          principleIds: Array.isArray(flow.principle_ids) ? flow.principle_ids : [],
          featureQuestion: flow.feature_question || "",
          candidateRules: Array.isArray(flow.candidate_rules) ? flow.candidate_rules : [],
          outputTargets: Array.isArray(flow.output_targets) ? flow.output_targets : []
        }))
        .filter((flow) => flow.id)
    : [];

  const qualityGates = Array.isArray(registry.quality_gates)
    ? registry.quality_gates
        .filter((gate) => gate && typeof gate === "object")
        .map((gate) => ({
          id: gate.id || "",
          rule: gate.rule || "",
          failureAction: gate.failure_action || ""
        }))
        .filter((gate) => gate.id)
    : [];

  const candidates = Array.isArray(registry.seed_feature_candidates)
    ? registry.seed_feature_candidates
        .filter((candidate) => candidate && typeof candidate === "object")
        .map((candidate) => ({
          id: candidate.id || "",
          label: candidate.label || titleFromPath(candidate.id || "candidate"),
          sourcePrincipleIds: Array.isArray(candidate.source_principle_ids) ? candidate.source_principle_ids : [],
          humanProcessStep: candidate.human_process_step || "",
          featureHypothesis: candidate.feature_hypothesis || "",
          smallestAssetType: candidate.smallest_asset_type || "",
          status: candidate.status || "planned",
          riskTier: candidate.risk_tier || "medium",
          evidenceInputs: Array.isArray(candidate.evidence_inputs) ? candidate.evidence_inputs : [],
          targetPaths: Array.isArray(candidate.target_paths) ? candidate.target_paths : [],
          validationTargets: Array.isArray(candidate.validation_targets)
            ? candidate.validation_targets
                .filter((target) => target && typeof target === "object")
                .map((target) => ({
                  command: Array.isArray(target.command) ? target.command.join(" && ") : target.command || "",
                  validates: target.validates || ""
                }))
            : [],
          rollbackPlan: candidate.rollback_plan || ""
        }))
        .filter((candidate) => candidate.id)
    : [];

  return {
    sourcePath,
    defaultCommand: registry.default_command || "",
    summary: {
      requiredPrinciples: Array.isArray(registry.required_principle_ids) ? registry.required_principle_ids.length : 0,
      totalFlows: flows.length,
      totalStages: stages.length,
      totalCandidates: candidates.length,
      implemented: candidates.filter((candidate) => candidate.status === "implemented" || candidate.status === "active").length,
      planned: candidates.filter((candidate) => candidate.status === "planned").length,
      queued: candidates.filter((candidate) => candidate.status === "queued").length,
      mediumRisk: candidates.filter((candidate) => candidate.riskTier === "medium").length,
      highRisk: candidates.filter((candidate) => candidate.riskTier === "high").length
    },
    stages,
    flows,
    qualityGates,
    candidates
  };
}

export function buildAgentCollaborationBoard(runtimeAgents = [], agentCatalog = [], tasks = []) {
  const agentsByKey = new Map();
  for (const agent of agentCatalog || []) {
    agentsByKey.set(agent.name, {
      id: agent.id,
      name: agent.name,
      role: agent.description || agent.trigger || "",
      status: agent.runtimeStatus || agent.definitionStatus || "unknown",
      currentTask: agent.currentTask || "",
      taskCount: 0,
      activeTaskCount: 0,
      blockedTaskCount: 0,
      completedTaskCount: 0
    });
  }
  for (const agent of runtimeAgents || []) {
    const key = agent.name || agent.id;
    const existing = agentsByKey.get(key);
    agentsByKey.set(key, {
      id: existing?.id || slugify(key),
      name: key,
      role: agent.role || existing?.role || "",
      status: agent.status || existing?.status || "unknown",
      currentTask: agent.current_task || existing?.currentTask || "",
      taskCount: existing?.taskCount || 0,
      activeTaskCount: existing?.activeTaskCount || 0,
      blockedTaskCount: existing?.blockedTaskCount || 0,
      completedTaskCount: existing?.completedTaskCount || 0
    });
  }

  const laneSpecs = [
    { id: "active", label: "작업 중" },
    { id: "blocked", label: "대기/차단" },
    { id: "queued", label: "예정" },
    { id: "completed", label: "완료" },
    { id: "other", label: "기타" }
  ];
  const lanes = laneSpecs.map((lane) => ({ ...lane, tasks: [] }));
  const laneById = new Map(lanes.map((lane) => [lane.id, lane]));
  const flows = [];
  const blockers = [];
  const nextActions = [];

  for (const task of tasks || []) {
    const agentName = task.agent || "unassigned";
    if (!agentsByKey.has(agentName)) {
      agentsByKey.set(agentName, {
        id: slugify(agentName),
        name: agentName,
        role: "",
        status: "not_registered",
        currentTask: "",
        taskCount: 0,
        activeTaskCount: 0,
        blockedTaskCount: 0,
        completedTaskCount: 0
      });
    }

    const laneId = collaborationLaneForTask(task);
    const summary = {
      id: task.id || slugify(task.title || "task"),
      title: task.title || task.id || "Untitled task",
      project: task.project || "workspace",
      status: task.status || "unknown",
      priority: task.priority || "",
      agent: agentName,
      lane: laneId,
      nextAction: task.next_action || "",
      blockers: Array.isArray(task.blockers) ? task.blockers : [],
      references: Array.isArray(task.references) ? task.references.slice(0, 4) : [],
      timingTotal: task.timing_summary?.total || "",
      bottleneck: task.timing_summary?.bottleneck || "",
      evaluationReport: task.evaluation_report || ""
    };
    laneById.get(laneId)?.tasks.push(summary);
    flows.push({
      id: `${summary.id}-${slugify(agentName)}`,
      agent: agentName,
      task: summary.title,
      project: summary.project,
      status: summary.status,
      lane: laneId,
      priority: summary.priority,
      timingTotal: summary.timingTotal,
      bottleneck: summary.bottleneck
    });

    if (summary.blockers.length) {
      blockers.push({
        taskId: summary.id,
        title: summary.title,
        agent: agentName,
        blockers: summary.blockers
      });
    }
    if (summary.nextAction) {
      nextActions.push({
        taskId: summary.id,
        title: summary.title,
        agent: agentName,
        nextAction: summary.nextAction
      });
    }

    const agent = agentsByKey.get(agentName);
    agent.taskCount += 1;
    if (laneId === "active") {
      agent.activeTaskCount += 1;
    }
    if (laneId === "blocked") {
      agent.blockedTaskCount += 1;
    }
    if (laneId === "completed") {
      agent.completedTaskCount += 1;
    }
  }

  const agents = Array.from(agentsByKey.values()).sort(
    (left, right) =>
      right.activeTaskCount - left.activeTaskCount ||
      right.blockedTaskCount - left.blockedTaskCount ||
      right.taskCount - left.taskCount ||
      left.name.localeCompare(right.name)
  );
  const sortedLanes = lanes.map((lane) => ({
    ...lane,
    tasks: lane.tasks.sort(
      (left, right) => priorityRank(right.priority) - priorityRank(left.priority) || left.title.localeCompare(right.title)
    )
  }));

  return {
    summary: {
      agents: agents.length,
      activeAgents: agents.filter((agent) => agent.status !== "idle" && agent.status !== "not_running").length,
      activeTasks: sortedLanes.find((lane) => lane.id === "active")?.tasks.length || 0,
      blockedTasks: sortedLanes.find((lane) => lane.id === "blocked")?.tasks.length || 0,
      queuedTasks: sortedLanes.find((lane) => lane.id === "queued")?.tasks.length || 0,
      completedTasks: sortedLanes.find((lane) => lane.id === "completed")?.tasks.length || 0,
      handoffs: flows.length,
      blockers: blockers.length
    },
    agents,
    lanes: sortedLanes,
    flows: flows.slice(0, 40),
    blockers: blockers.slice(0, 20),
    nextActions: nextActions.slice(0, 20)
  };
}

export function buildUnifiedOps({ documents = [], historyDays = [], tasks = [], collaborationBoard = emptyCollaborationBoard() } = {}) {
  const events = [];

  for (const document of documents) {
    if (!HISTORY_CATEGORIES.has(document.category)) {
      continue;
    }
    const signalType = historySignalType(document.category);
    events.push({
      id: `history-${document.id}`,
      sourceType: "history",
      signalType,
      lane: historySignalLane(document.category),
      severity: historySignalSeverity(document),
      status: historySignalStatus(document),
      title: document.title,
      detail: document.excerpt,
      path: document.path,
      category: document.category,
      language: document.language,
      date: document.historyDate || document.updatedAt.slice(0, 10),
      timestamp: document.updatedAt
    });
  }

  for (const task of tasks) {
    const lane = collaborationLaneForTask(task);
    events.push({
      id: `monitor-task-${slugify(task.id || task.title || "task")}`,
      sourceType: "monitor",
      signalType: "task",
      lane,
      severity: taskSeverity(task, lane),
      status: task.status || "unknown",
      title: task.title || task.id || "Untitled task",
      detail: task.next_action || task.timing_summary?.bottleneck || task.evaluation_report || "No next action recorded.",
      path: task.evaluation_report || task.timing_report || "",
      category: "task-monitor",
      language: "unknown",
      date: "",
      timestamp: task.updated_at || task.created_at || ""
    });
  }

  for (const blocker of collaborationBoard.blockers || []) {
    events.push({
      id: `monitor-blocker-${slugify(blocker.taskId || blocker.title)}`,
      sourceType: "monitor",
      signalType: "blocker",
      lane: "blocked",
      severity: "critical",
      status: "blocked",
      title: blocker.title,
      detail: blocker.blockers.join(" / "),
      path: "",
      category: "blocker-monitor",
      language: "unknown",
      date: "",
      timestamp: ""
    });
  }

  for (const action of collaborationBoard.nextActions || []) {
    events.push({
      id: `monitor-next-${slugify(action.taskId || action.title)}`,
      sourceType: "monitor",
      signalType: "next-action",
      lane: "active",
      severity: "attention",
      status: "next",
      title: action.title,
      detail: action.nextAction,
      path: "",
      category: "next-action-monitor",
      language: "unknown",
      date: "",
      timestamp: ""
    });
  }

  const sortedEvents = events
    .sort((left, right) => {
      const rightTime = right.timestamp || right.date || "";
      const leftTime = left.timestamp || left.date || "";
      return rightTime.localeCompare(leftTime) || severityRank(right.severity) - severityRank(left.severity) || left.title.localeCompare(right.title);
    })
    .slice(0, 160);
  const byLane = summarizeOpsField(sortedEvents, "lane");
  const bySignalType = summarizeOpsField(sortedEvents, "signalType");
  const bySourceType = summarizeOpsField(sortedEvents, "sourceType");
  const openSignals = sortedEvents.filter((event) => ["critical", "attention", "warning"].includes(event.severity)).length;
  const criticalSignals = sortedEvents.filter((event) => event.severity === "critical").length;

  return {
    summary: {
      totalEvents: sortedEvents.length,
      historyEvents: sortedEvents.filter((event) => event.sourceType === "history").length,
      monitorEvents: sortedEvents.filter((event) => event.sourceType === "monitor").length,
      evidenceEvents: sortedEvents.filter((event) => ["evidence", "evaluation", "web-search"].includes(event.signalType)).length,
      decisionEvents: sortedEvents.filter((event) => ["decision", "blocker", "next-action"].includes(event.signalType)).length,
      openSignals,
      criticalSignals,
      latestEventAt: sortedEvents[0]?.timestamp || sortedEvents[0]?.date || "",
      historyDays: historyDays.length
    },
    lanes: byLane,
    signalTypes: bySignalType,
    sourceTypes: bySourceType,
    events: sortedEvents
  };
}

function emptyCollaborationBoard() {
  return {
    summary: { activeTasks: 0, blockedTasks: 0, queuedTasks: 0, completedTasks: 0 },
    blockers: [],
    nextActions: []
  };
}

function summarizeOpsField(events, field) {
  const counts = new Map();
  for (const event of events) {
    const key = event[field] || "unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([id, count]) => ({ id, label: id.replaceAll("-", " "), count }))
    .sort((left, right) => right.count - left.count || left.id.localeCompare(right.id));
}

function historySignalType(category) {
  const map = {
    "daily-history": "history",
    evaluation: "evaluation",
    "intent-feature-map": "roadmap",
    plan: "plan",
    "request-trace": "trace",
    "user-request": "intake",
    "web-search": "web-search",
    "work-timing": "timing",
    "work-summary": "summary"
  };
  return map[category] || "history";
}

function historySignalLane(category) {
  const map = {
    evaluation: "verification",
    "web-search": "evidence",
    "intent-feature-map": "planning",
    "work-timing": "monitoring",
    "request-trace": "traceability",
    "user-request": "intake",
    plan: "planning",
    "work-summary": "delivery",
    "daily-history": "history"
  };
  return map[category] || "history";
}

function historySignalSeverity(document) {
  const text = `${document.title} ${document.excerpt} ${document.path}`.toLowerCase();
  if (/rework_required|blocked|critical|fail|failed|unresolved|gap|warning|risk/.test(text)) {
    return "warning";
  }
  if (document.category === "evaluation" || document.category === "work-timing") {
    return "verified";
  }
  if (document.category === "web-search" || document.category === "request-trace") {
    return "evidence";
  }
  return "info";
}

function historySignalStatus(document) {
  const text = `${document.title} ${document.excerpt}`.toLowerCase();
  if (/ready_to_close|ready|passed|complete|completed|통과|완료/.test(text)) {
    return "ready";
  }
  if (/rework_required|failed|blocked|차단|실패/.test(text)) {
    return "needs_attention";
  }
  return document.category;
}

function taskSeverity(task, lane) {
  const text = `${task.status || ""} ${task.next_action || ""} ${task.evaluation_report || ""}`.toLowerCase();
  if (lane === "blocked" || /blocked|failed|failure|risk|decision|needs/.test(text)) {
    return "critical";
  }
  if (lane === "active" || lane === "queued") {
    return "attention";
  }
  if (lane === "completed") {
    return "verified";
  }
  return "info";
}

function severityRank(severity) {
  const ranks = {
    critical: 5,
    warning: 4,
    attention: 3,
    verified: 2,
    evidence: 1,
    info: 0
  };
  return ranks[severity] || 0;
}

export function collectSourceFiles(repoRoot, projects = []) {
  return collectSourceFileCandidates(repoRoot, projects).map((candidate) => readSourceFile(repoRoot, candidate.filePath, candidate.project));
}

export async function collectSourceFilesParallel(repoRoot, candidates = collectSourceFileCandidates(repoRoot, [])) {
  const tasks = candidates.map((candidate) => ({
    type: "source",
    repoRoot,
    filePath: candidate.filePath,
    project: candidate.project
  }));
  const fallback = () => tasks.map((task) => readSourceFile(task.repoRoot, task.filePath, task.project));
  const workerCount = recommendedWorkerCount(tasks.length, { maxWorkers: 4, minTasksPerWorker: 24 });
  try {
    return await runWorkerTasks({
      tasks,
      workerPath: snapshotFileWorkerPath,
      workerCount,
      fallback
    });
  } catch {
    return fallback();
  }
}

function collectSourceFileCandidates(repoRoot, projects = []) {
  const roots = sourceRoots(repoRoot, projects);
  const seen = new Set();
  const candidates = [];

  for (const root of roots) {
    for (const filePath of walkFiles(root.path)) {
      const relativePath = toPosix(path.relative(repoRoot, filePath));
      if (seen.has(relativePath) || !isSourceFile(relativePath)) {
        continue;
      }
      const stats = fs.statSync(filePath);
      if (stats.size > MAX_SOURCE_FILE_BYTES) {
        continue;
      }
      seen.add(relativePath);
      candidates.push({
        filePath,
        relativePath,
        project: root.project
      });
    }
  }

  return candidates
    .sort((left, right) => left.relativePath.localeCompare(right.relativePath))
    .slice(0, MAX_SOURCE_FILES);
}

export function collectViewModeCatalog(repoRoot) {
  const registry = readJson(path.join(repoRoot, "agent-platform", "configs", "access", "view-mode-registry.json"), {
    default_mode: "superadmin_developer",
    modes: []
  });
  const modes = Array.isArray(registry.modes)
    ? registry.modes
        .filter((mode) => mode && typeof mode === "object")
        .map((mode) => ({
          id: mode.id || "",
          label: mode.label || mode.id || "",
          intent: mode.intent || "",
          allowedSections: Array.isArray(mode.allowed_sections) ? mode.allowed_sections : [],
          visibilityRules: mode.visibility_rules || {},
          securityNotes: Array.isArray(mode.security_notes) ? mode.security_notes : []
        }))
        .filter((mode) => mode.id)
    : [];

  return {
    defaultMode: registry.default_mode || "superadmin_developer",
    modes
  };
}

export function collectLanguageModeCatalog(repoRoot) {
  const registry = readJson(path.join(repoRoot, "agent-platform", "configs", "access", "language-mode-registry.json"), {
    default_mode: "all",
    modes: [
      {
        id: "all",
        label: "All Languages",
        display_label: "전체",
        intent: "Show every collected document.",
        included_languages: ["ko", "en"],
        include_unknown: true,
        document_rule: "Show documents tagged ko, en, or unknown."
      },
      {
        id: "ko",
        label: "Korean Only",
        display_label: "한국어만",
        intent: "Show only Korean documents.",
        included_languages: ["ko"],
        include_unknown: false,
        document_rule: "Show only documents tagged ko."
      },
      {
        id: "en",
        label: "English Only",
        display_label: "English Only",
        intent: "Show only English documents.",
        included_languages: ["en"],
        include_unknown: false,
        document_rule: "Show only documents tagged en."
      }
    ]
  });
  const modes = Array.isArray(registry.modes)
    ? registry.modes
        .filter((mode) => mode && typeof mode === "object")
        .map((mode) => ({
          id: mode.id || "",
          label: mode.display_label || mode.label || mode.id || "",
          intent: mode.intent || "",
          includedLanguages: Array.isArray(mode.included_languages) ? mode.included_languages : [],
          includeUnknown: Boolean(mode.include_unknown),
          documentRule: mode.document_rule || ""
        }))
        .filter((mode) => mode.id)
    : [];

  return {
    defaultMode: registry.default_mode || "all",
    modes
  };
}

const MONITOR_SECTION_OPTIONS = [
  {
    id: "overview",
    label: "Overview",
    description: "Command center, unified operations stream, and the mode/function switchboard.",
    location: "Top section tabs / Overview"
  },
  {
    id: "desktop",
    label: "Desktop",
    description: "Platform-first desktop runtime, CLI adapter health, task pipes, terminal events, decision inbox, and source editor.",
    location: "Top section tabs / Desktop"
  },
  {
    id: "projects",
    label: "Projects",
    description: "Registered project boundaries and project-level purpose.",
    location: "Top section tabs / Projects"
  },
  {
    id: "history",
    label: "History",
    description: "Dated work history, unified ops events, and category density.",
    location: "Top section tabs / History"
  },
  {
    id: "intent",
    label: "Intent Map",
    description: "User-intent synthesis, implemented capability themes, and Now/Next/Later product candidates.",
    location: "Top section tabs / Intent Map"
  },
  {
    id: "structure",
    label: "Structure",
    description: "Root folder policy, project homes, document categories, and history roots.",
    location: "Top section tabs / Structure"
  },
  {
    id: "documents",
    label: "Documents",
    description: "Collected docs, requirements, specs, plans, traces, evaluations, and rendered markdown previews.",
    location: "Top section tabs / Documents"
  },
  {
    id: "source",
    label: "Source",
    description: "Collected source files and code browsing for developer/superadmin views.",
    location: "Top section tabs / Source"
  },
  {
    id: "requirements",
    label: "Requirements",
    description: "Requirement records extracted from baselines and project requirement docs.",
    location: "Top section tabs / Requirements"
  },
  {
    id: "agents",
    label: "Agents",
    description: "Agent inventory, runtime status, collaboration lanes, blockers, and next actions.",
    location: "Top section tabs / Agents"
  }
];

const DESKTOP_SESSION_MODE_OPTIONS = [
  {
    id: "user_task",
    label: "User Task",
    description: "Deliver the user's task and defer only blocked decisions when the user is absent.",
    location: "Desktop / Run Board / Mode"
  },
  {
    id: "platform_improvement",
    label: "Platform Improvement",
    description: "Improve the platform while preserving requirements, specs, history, and validation.",
    location: "Desktop / Run Board / Mode"
  },
  {
    id: "knowledge_accumulation",
    label: "Knowledge Accumulation",
    description: "Turn messy output, logs, questions, and evidence into durable structured knowledge.",
    location: "Desktop / Run Board / Mode"
  },
  {
    id: "review_verify",
    label: "Review & Verify",
    description: "Check bugs, missing tests, unsupported claims, resource risks, and release blockers.",
    location: "Desktop / Run Board / Mode"
  }
];

const TASK_PIPE_OPTIONS = [
  {
    id: "platform_improvement_pipe",
    label: "Platform Improvement Pipe",
    description: "Fan out implementation, review, research, and fallback lanes from one task intake.",
    location: "Desktop / Task Pipe Init / Pipe preset"
  },
  {
    id: "knowledge_accumulation_pipe",
    label: "Knowledge Accumulation Pipe",
    description: "Fan out structuring, skeptic, and durable-record lanes from messy output.",
    location: "Desktop / Task Pipe Init / Pipe preset"
  },
  {
    id: "review_verify_pipe",
    label: "Review & Verify Pipe",
    description: "Fan out bug review, validation, and contrary lanes before release.",
    location: "Desktop / Task Pipe Init / Pipe preset"
  }
];

export function collectModeFunctionCatalog(repoRoot, viewModeCatalog, languageModeCatalog) {
  const workModePath = path.join(repoRoot, "agent-platform", "configs", "workflows", "work-mode-registry.json");
  const installModePath = path.join(repoRoot, "agent-platform", "configs", "installations", "install-mode-registry.json");
  const cliAdapterPath = path.join(repoRoot, "agent-platform", "configs", "integrations", "cli-adapter-registry.json");
  const workModeRegistry = readJson(workModePath, { default_mode: "standard", modes: [] });
  const installModeRegistry = readJson(installModePath, { default_mode: "user", modes: [] });
  const cliAdapterRegistry = readJson(cliAdapterPath, { supported_ai_cli_adapters: [] });

  const groups = [
    makeModeFunctionGroup({
      id: "view_mode",
      label: "View Mode",
      purpose: "Controls which monitor sections are visible for user, developer, and superadmin contexts.",
      selectorLocation: "Top bar / View Mode segmented control",
      defaultMode: viewModeCatalog.defaultMode,
      sourcePath: "agent-platform/configs/access/view-mode-registry.json",
      options: (viewModeCatalog.modes || []).map((mode) => ({
        id: mode.id,
        label: mode.label,
        description: mode.intent,
        location: mode.allowedSections?.length
          ? `Shows: ${mode.allowedSections.join(", ")}`
          : "Top bar / View Mode segmented control",
        status: mode.id === viewModeCatalog.defaultMode ? "default" : "available"
      }))
    }),
    makeModeFunctionGroup({
      id: "language_mode",
      label: "Language Mode",
      purpose: "Filters collected docs by Korean, English, or all language scopes.",
      selectorLocation: "Toolbar / Document filters / Language select",
      defaultMode: languageModeCatalog.defaultMode,
      sourcePath: "agent-platform/configs/access/language-mode-registry.json",
      options: (languageModeCatalog.modes || []).map((mode) => ({
        id: mode.id,
        label: mode.label,
        description: mode.intent || mode.documentRule,
        location: mode.documentRule || "Toolbar / Document filters / Language select",
        status: mode.id === languageModeCatalog.defaultMode ? "default" : "available"
      }))
    }),
    makeModeFunctionGroup({
      id: "work_mode",
      label: "Work Mode",
      purpose: "Selects task execution strictness and close-out gates before implementation or research work.",
      selectorLocation: "Task intake / _ops/workflows/02-select-work-mode.md / mode selection record",
      defaultMode: workModeRegistry.default_mode || "standard",
      sourcePath: "agent-platform/configs/workflows/work-mode-registry.json",
      options: normalizeRegistryModes(workModeRegistry.modes, workModeRegistry.default_mode, {
        descriptionFields: ["intent"],
        locationField: "closeout_gate",
        statusFields: ["enforcement_level"]
      })
    }),
    makeModeFunctionGroup({
      id: "install_mode",
      label: "Install Mode",
      purpose: "Separates end-user setup from developer improvement setup.",
      selectorLocation: "Setup flow / _ops/workflows/62-select-install-mode.md / install profile",
      defaultMode: installModeRegistry.default_mode || "user",
      sourcePath: "agent-platform/configs/installations/install-mode-registry.json",
      options: normalizeRegistryModes(installModeRegistry.modes, installModeRegistry.default_mode, {
        descriptionFields: ["intent"],
        locationField: "dependency_policy",
        statusFields: ["setup_posture", "audience"]
      })
    }),
    makeModeFunctionGroup({
      id: "desktop_session_mode",
      label: "Desktop Session Mode",
      purpose: "Changes the prompt posture for a CLI session launched from the platform-first desktop shell.",
      selectorLocation: "Desktop / Run Board / Mode",
      defaultMode: "user_task",
      sourcePath: "platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx",
      desktopRuntime: true,
      options: DESKTOP_SESSION_MODE_OPTIONS
    }),
    makeModeFunctionGroup({
      id: "task_pipe",
      label: "Task Pipe Preset",
      purpose: "Initializes multi-CLI process lanes and merge gates from one task prompt.",
      selectorLocation: "Desktop / Task Pipe Init / Pipe preset",
      defaultMode: "platform_improvement_pipe",
      sourcePath: "platform-desktop-app/src-tauri/src/lib.rs",
      desktopRuntime: true,
      options: TASK_PIPE_OPTIONS
    }),
    makeModeFunctionGroup({
      id: "cli_adapter",
      label: "CLI Adapter",
      purpose: "Attaches Claude Code, Gemini CLI, Codex CLI, OpenCode, and Claw Code as optional guest capabilities.",
      selectorLocation: "Desktop / Capability Center and Run Board / Adapter",
      defaultMode: "",
      sourcePath: "agent-platform/configs/integrations/cli-adapter-registry.json",
      desktopRuntime: true,
      options: normalizeCliAdapters(cliAdapterRegistry.supported_ai_cli_adapters)
    }),
    makeModeFunctionGroup({
      id: "section_location",
      label: "Monitor Section",
      purpose: "Shows where core platform functions live inside the installable monitor surface.",
      selectorLocation: "Top section tabs",
      defaultMode: "overview",
      sourcePath: "platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx",
      options: MONITOR_SECTION_OPTIONS
    })
  ];

  return {
    summary: {
      totalGroups: groups.length,
      totalOptions: groups.reduce((total, group) => total + group.optionCount, 0),
      explicitSelectors: groups.filter((group) => group.selectorLocation).length,
      registryBackedGroups: groups.filter((group) => group.sourcePath.includes("configs/")).length,
      desktopGroups: groups.filter((group) => group.desktopRuntime).length
    },
    groups
  };
}

function makeModeFunctionGroup({
  id,
  label,
  purpose,
  selectorLocation,
  defaultMode = "",
  sourcePath = "",
  desktopRuntime = false,
  options = []
}) {
  const normalizedOptions = options
    .filter((option) => option && option.id)
    .map((option) => ({
      id: option.id,
      label: option.label || option.id,
      description: option.description || "",
      location: option.location || selectorLocation,
      status: option.status || (option.id === defaultMode ? "default" : "available"),
      sourcePath: option.sourcePath || sourcePath
    }));
  return {
    id,
    label,
    purpose,
    selectorLocation,
    defaultMode,
    sourcePath,
    desktopRuntime,
    optionCount: normalizedOptions.length,
    options: normalizedOptions
  };
}

function normalizeRegistryModes(modes, defaultMode, config = {}) {
  if (!Array.isArray(modes)) {
    return [];
  }
  return modes
    .filter((mode) => mode && typeof mode === "object")
    .map((mode) => {
      const id = mode.id || mode.mode_id || "";
      const description = firstPresent(mode, config.descriptionFields || ["intent", "purpose", "summary"]);
      return {
        id,
        label: mode.display_label || mode.label || titleFromPath(id),
        description: normalizeReadableValue(description),
        location: normalizeReadableValue(mode[config.locationField]) || "",
        status:
          normalizeReadableValue(firstPresent(mode, config.statusFields || ["status", "default_state", "enforcement_level"])) ||
          (id === defaultMode ? "default" : "available")
      };
    })
    .filter((mode) => mode.id);
}

function normalizeCliAdapters(adapters) {
  if (!Array.isArray(adapters)) {
    return [];
  }
  return adapters
    .filter((adapter) => adapter && typeof adapter === "object")
    .map((adapter) => ({
      id: adapter.adapter_id || adapter.id || "",
      label: adapter.display_name || adapter.label || adapter.adapter_id || "",
      description: `${adapter.capability_class || "cli_adapter"} / ${adapter.runtime_role || "guest_adapter"}`,
      location: Array.isArray(adapter.expected_command_candidates)
        ? `Command candidates: ${adapter.expected_command_candidates.join(", ")}`
        : "Desktop / Capability Center and Run Board / Adapter",
      status: adapter.default_state || adapter.setup_posture || "optional_supported"
    }))
    .filter((adapter) => adapter.id);
}

function firstPresent(source, fields) {
  for (const field of fields || []) {
    if (source?.[field]) {
      return source[field];
    }
  }
  return "";
}

function normalizeReadableValue(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(" / ");
  }
  if (value && typeof value === "object") {
    return Object.entries(value)
      .slice(0, 4)
      .map(([key, item]) => `${key}: ${normalizeReadableValue(item)}`)
      .join(" / ");
  }
  return value ? String(value) : "";
}

export function collectAgentCatalog(repoRoot, coordinationAgents = [], tasks = []) {
  const root = path.join(repoRoot, "agent-platform", "configs", "agents");
  return walkFiles(root)
    .filter((filePath) => filePath.endsWith(".json"))
    .map((filePath) => {
      const config = readJson(filePath, {});
      const name = config.name || titleFromPath(filePath);
      const runtimeAgent = coordinationAgents.find((agent) => agent.id === name || agent.name === name) || null;
      const ownedTasks = tasks.filter((task) => task.agent === name || (runtimeAgent && task.agent === runtimeAgent.id));
      const docPaths = ["ko", "en", ""]
        .map((language) =>
          language
            ? path.join(repoRoot, "agent-platform", "docs", `${name}.${language}.md`)
            : path.join(repoRoot, "agent-platform", "docs", `${name}.md`)
        )
        .filter((docPath) => fs.existsSync(docPath))
        .map((docPath) => toPosix(path.relative(repoRoot, docPath)));

      return {
        id: slugify(name),
        name,
        description: config.description || "",
        runtime: config.runtime || "unknown",
        definitionStatus: config.metadata?.status || "unknown",
        runtimeStatus: runtimeAgent?.status || "not_running",
        trigger: config.metadata?.trigger || "",
        currentTask: runtimeAgent?.current_task || "",
        tools: Array.isArray(config.tools) ? config.tools : [],
        skills: Array.isArray(config.skills) ? config.skills : [],
        taskCount: ownedTasks.length,
        completedTaskCount: ownedTasks.filter((task) => task.status === "completed").length,
        configPath: toPosix(path.relative(repoRoot, filePath)),
        docPaths
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
}

function attachTaskTiming(repoRoot, task) {
  if (!task || !task.timing_report) {
    return task;
  }
  const reportPath = path.join(repoRoot, task.timing_report);
  const timing = readJson(reportPath, null);
  if (!timing || !Array.isArray(timing.phases)) {
    return { ...task, timing_summary: { total: "missing", bottleneck: task.timing_report } };
  }
  const measured = timing.phases
    .map((phase) => ({ phase, duration: phaseDurationSeconds(phase) }))
    .filter((entry) => typeof entry.duration === "number" && Number.isFinite(entry.duration));
  if (!measured.length) {
    return { ...task, timing_summary: { total: "unmeasured", bottleneck: "not measured" } };
  }
  const totalSeconds = measured.reduce((sum, entry) => sum + entry.duration, 0);
  const slowest = measured.reduce((max, entry) => (entry.duration > max.duration ? entry : max), measured[0]);
  const label = slowest.phase.label || slowest.phase.phase_id || "phase";
  return {
    ...task,
    timing_summary: {
      total: formatDuration(totalSeconds),
      bottleneck: `${label} (${formatDuration(slowest.duration)})`
    }
  };
}

function phaseDurationSeconds(phase) {
  if (typeof phase.duration_seconds === "number") {
    return phase.duration_seconds;
  }
  if (typeof phase.duration_seconds === "string" && phase.duration_seconds.trim()) {
    const parsed = Number(phase.duration_seconds);
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (phase.started_at && phase.ended_at) {
    const start = Date.parse(phase.started_at);
    const end = Date.parse(phase.ended_at);
    if (Number.isFinite(start) && Number.isFinite(end)) {
      return Math.max(0, (end - start) / 1000);
    }
  }
  return null;
}

function formatDuration(seconds) {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

function collaborationLaneForTask(task) {
  const status = String(task?.status || "").toLowerCase();
  const blockers = Array.isArray(task?.blockers) ? task.blockers : [];
  if (blockers.length && !["completed", "done", "closed"].includes(status)) {
    return "blocked";
  }
  if (["in_progress", "running", "active", "working", "reviewing"].includes(status)) {
    return "active";
  }
  if (["blocked", "waiting", "paused"].includes(status)) {
    return "blocked";
  }
  if (["pending", "planned", "queued", "todo", "not_started"].includes(status)) {
    return "queued";
  }
  if (["completed", "complete", "done", "closed"].includes(status)) {
    return "completed";
  }
  return "other";
}

function priorityRank(priority = "") {
  const normalized = String(priority).toLowerCase();
  const ranks = {
    critical: 5,
    highest: 5,
    high: 4,
    must: 4,
    medium: 3,
    normal: 3,
    low: 2,
    optional: 1
  };
  return ranks[normalized] || 0;
}

export function collectDocuments(repoRoot) {
  return sortDocuments(collectDocumentTasks(repoRoot).map((task) => readDocument(repoRoot, task.filePath, task.category)));
}

export async function collectDocumentsParallel(repoRoot, tasks = collectDocumentTasks(repoRoot)) {
  const fallback = () => sortDocuments(tasks.map((task) => readDocument(repoRoot, task.filePath, task.category)));
  const workerCount = recommendedWorkerCount(tasks.length, { maxWorkers: 6, minTasksPerWorker: 80 });
  try {
    const documents = await runWorkerTasks({
      tasks: tasks.map((task) => ({
        type: "document",
        repoRoot,
        filePath: task.filePath,
        category: task.category
      })),
      workerPath: snapshotFileWorkerPath,
      workerCount,
      fallback: () => tasks.map((task) => readDocument(repoRoot, task.filePath, task.category))
    });
    return sortDocuments(documents);
  } catch {
    return fallback();
  }
}

function collectDocumentTasks(repoRoot) {
  const tasks = [];
  for (const source of DOCUMENT_FILES) {
    const filePath = path.join(repoRoot, source.file);
    if (!fs.existsSync(filePath)) {
      continue;
    }
    tasks.push({ filePath, category: source.category });
  }
  for (const source of DOCUMENT_SOURCES) {
    const sourceRoot = path.join(repoRoot, source.root);
    for (const filePath of walkFiles(sourceRoot)) {
      if (!/\.(md|json)$/i.test(filePath)) {
        continue;
      }
      tasks.push({ filePath, category: source.category });
    }
  }
  return tasks;
}

function sortDocuments(documents) {
  return documents.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.path.localeCompare(right.path));
}

export function compactDocumentsForSnapshot(documents) {
  const historyDocuments = documents.filter((document) => HISTORY_CATEGORIES.has(document.category));
  const nonHistoryBudget = Math.max(0, MAX_DOCUMENTS - MAX_INLINE_HISTORY_DOCUMENTS);
  const nonHistoryDocuments = documents
    .filter((document) => !HISTORY_CATEGORIES.has(document.category))
    .slice()
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.path.localeCompare(right.path))
    .slice(0, nonHistoryBudget);
  const inlineHistoryDocuments = historyDocuments
    .slice()
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.path.localeCompare(right.path))
    .slice(0, MAX_INLINE_HISTORY_DOCUMENTS);

  return [...nonHistoryDocuments, ...inlineHistoryDocuments].sort(
    (left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.path.localeCompare(right.path)
  );
}

export function buildAdminHistoryIndex(documents) {
  const historyDocuments = documents
    .filter((document) => HISTORY_CATEGORIES.has(document.category) && document.historyDate)
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt) || left.path.localeCompare(right.path));
  const historyDays = buildHistoryDays(historyDocuments);
  const historyDaySummaries = historyDays.map((day) => ({
    date: day.date,
    year: day.year,
    documentsCount: day.documentsCount,
    categories: day.categories,
    documents: []
  }));
  const categories = Object.entries(
    historyDocuments.reduce((counts, document) => {
      counts[document.category] = (counts[document.category] || 0) + 1;
      return counts;
    }, {})
  )
    .map(([category, count]) => ({ category, count }))
    .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category));

  return {
    schemaVersion: "2026-06-05.admin-history-index",
    generatedAt: new Date().toISOString(),
    summary: {
      documents: historyDocuments.length,
      days: historyDays.length,
      categories,
      totalSourceBytes: historyDocuments.reduce((total, document) => total + (document.sourceBytes || 0), 0),
      generatedFrom: Array.from(new Set(historyDocuments.map((document) => historyRootForPath(document.path)).filter(Boolean))).sort()
    },
    migration: {
      status: "migrated_to_lazy_admin_index",
      rule: "Keep durable _history files in place; load the generated index only for admin history and document surfaces.",
      inlineHistoryDocumentLimit: MAX_INLINE_HISTORY_DOCUMENTS,
      detailPolicy: "Generated entries contain bounded admin previews and file pointers; day groups avoid duplicating document lists."
    },
    documents: historyDocuments,
    historyDays: historyDaySummaries
  };
}

export function emptyAdminHistoryIndex() {
  return {
    schemaVersion: "2026-06-05.admin-history-index",
    generatedAt: new Date().toISOString(),
    summary: {
      documents: 0,
      days: 0,
      categories: [],
      totalSourceBytes: 0,
      generatedFrom: []
    },
    migration: {
      status: "empty",
      rule: "No internal history records are included in this generated index.",
      inlineHistoryDocumentLimit: 0,
      detailPolicy: "No internal history previews are bundled."
    },
    documents: [],
    historyDays: []
  };
}

export function readDocument(repoRoot, filePath, category) {
  const relativePath = toPosix(path.relative(repoRoot, filePath));
  const content = fs.readFileSync(filePath, "utf8");
  const stats = fs.statSync(filePath);
  const isMarkdown = filePath.endsWith(".md") || filePath.endsWith(".mdc");
  const isHistoryDocument = HISTORY_CATEGORIES.has(category);
  const maxHtmlChars = isHistoryDocument ? HISTORY_DOCUMENT_HTML_CHARS : DEFAULT_DOCUMENT_HTML_CHARS;
  const historyDate = extractHistoryDate(relativePath);
  return {
    id: slugify(relativePath),
    path: relativePath,
    category,
    language: detectLanguage(relativePath),
    title: isMarkdown ? extractTitle(content, relativePath) : titleFromPath(relativePath),
    excerpt: makeExcerpt(content),
    html: isHistoryDocument
      ? historyAdminPreviewToHtml(content)
      : isMarkdown
        ? markdownToHtml(content, maxHtmlChars)
        : jsonPreviewToHtml(content, maxHtmlChars),
    previewMode: isHistoryDocument ? "admin-summary" : "document-preview",
    htmlTruncated: isHistoryDocument ? content.length > HISTORY_ADMIN_EXCERPT_CHARS : content.length > maxHtmlChars,
    sourceBytes: stats.size,
    updatedAt: stats.mtime.toISOString(),
    historyDate,
    historyYear: historyDate ? historyDate.slice(0, 4) : "",
    workspaceArea: workspaceArea(relativePath)
  };
}

function historyRootForPath(relativePath) {
  const match = relativePath.match(/^(_history\/[^/]+)(?:\/|$)/);
  return match ? match[1] : "";
}

export function buildHistoryDays(documents) {
  const byDate = new Map();
  const historyDocuments = documents.filter((document) => HISTORY_CATEGORIES.has(document.category) && document.historyDate);

  for (const document of historyDocuments) {
    const date = document.historyDate;
    const record = byDate.get(date) || {
      date,
      year: date.slice(0, 4),
      documentsCount: 0,
      categories: {},
      documents: []
    };
    record.documentsCount += 1;
    record.categories[document.category] = (record.categories[document.category] || 0) + 1;
    record.documents.push(historyDocumentSummary(document));
    byDate.set(date, record);
  }

  return Array.from(byDate.values())
    .map((day) => ({
      ...day,
      categories: Object.entries(day.categories)
        .map(([category, count]) => ({ category, count }))
        .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category)),
      documents: day.documents.sort((left, right) => left.category.localeCompare(right.category) || left.path.localeCompare(right.path))
    }))
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function buildFolderStructure(repoRoot, projects, documents) {
  const rootPolicy = readJson(path.join(repoRoot, "_ops", "projects", "root-structure-policy.json"), {});
  const docsRegistry = readJson(path.join(repoRoot, "_docs", "registry.json"), { categories: [], required_documents: [] });
  const rootFolders = [
    ...(projects || []).map((project) => ({
      name: stripTrailingSlash(project.path || project.name || ""),
      path: project.path || `${project.name}/`,
      className: "registered_project",
      purpose: project.purpose || "",
      source: "_ops/projects/registry.json"
    })),
    ...(rootPolicy.reserved_operational_dirs || []).map((item) => ({
      name: item.name,
      path: `${item.name}/`,
      className: "reserved_operational",
      purpose: item.purpose || "",
      source: "_ops/projects/root-structure-policy.json"
    })),
    ...(rootPolicy.runtime_adapter_dirs || []).map((item) => ({
      name: item.name,
      path: `${item.name}/`,
      className: "runtime_adapter",
      purpose: item.purpose || "",
      source: "_ops/projects/root-structure-policy.json"
    })),
    ...(rootPolicy.local_only_dirs || []).map((item) => ({
      name: item.name,
      path: `${item.name}/`,
      className: "local_only",
      purpose: item.purpose || "",
      source: "_ops/projects/root-structure-policy.json"
    }))
  ].sort((left, right) => left.className.localeCompare(right.className) || left.name.localeCompare(right.name));

  const docsCategories = (docsRegistry.categories || []).map((category) => ({
    id: category.id,
    path: category.path,
    purpose: category.purpose || "",
    documentsCount: documents.filter((document) => document.path.startsWith(`${category.path}/`)).length,
    requiredDocumentsCount: (docsRegistry.required_documents || []).filter((requiredPath) =>
      requiredPath.startsWith(`${category.path}/`)
    ).length
  }));

  const projectHomes = (projects || []).map((project) => ({
    name: project.name,
    path: project.path,
    purpose: project.purpose || "",
    topLevelDirs: project.project_specific_home || [],
    sharedDependencies: project.shared_dependencies || [],
    boundaryNotes: project.boundary_notes || []
  }));

  const historyRoots = DOCUMENT_SOURCES.filter((source) => source.root.startsWith("_history/") || source.root === "_history/2026").map(
    (source) => ({
      category: source.category,
      root: source.root,
      documentsCount: documents.filter((document) => document.category === source.category && document.path.startsWith(source.root)).length
    })
  );

  return {
    rootFolders,
    docsCategories,
    projectHomes,
    historyRoots
  };
}

export function buildStructureOverview(repoRoot, projects, documents, folderStructure, sourceFiles) {
  const planes = [
    {
      id: "operating-memory",
      label: "Operating Memory",
      intent: "Rules, philosophy, requirements, specs, history, plans, and evidence that guide future work.",
      owner: "workspace-operations",
      primaryPaths: ["_ops/", "_docs/", "_philosophy/", "_requirements/", "_specs/", "_history/"],
      contains: ["durable rules", "workflows", "requirements", "specs", "evaluations", "request traces"],
      mustNotContain: ["project-specific source code", "raw secrets", "transient tool output"],
      uiEntry: "Overview, History, Documents, Requirements"
    },
    {
      id: "platform-core",
      label: "Platform Core",
      intent: "Reusable agent, config, evaluation, planning, and validation layer.",
      owner: "agent-platform",
      primaryPaths: ["agent-platform/src/", "agent-platform/configs/", "agent-platform/docs/", "agent-platform/tests/"],
      contains: ["agent specs", "validators", "research profiles", "workflow configs"],
      mustNotContain: ["desktop installer payloads", "domain-specific experiments by default"],
      uiEntry: "Agents, Requirements, Documents"
    },
    {
      id: "desktop-product",
      label: "Desktop Product",
      intent: "Installable host runtime, OS packaging boundary, runtime data separation, and CLI adapter bridge.",
      owner: "platform-desktop-app",
      primaryPaths: ["platform-desktop-app/src-tauri/", "platform-desktop-app/src/", "platform-desktop-app/configs/", "platform-desktop-app/docs/"],
      contains: ["Tauri shell", "runtime bridge", "distribution gates", "runtime-data policies"],
      mustNotContain: ["customer private data", "raw repository source as installed payload"],
      uiEntry: "Desktop, Structure"
    },
    {
      id: "monitor-ui",
      label: "Monitor UI",
      intent: "Generated snapshot, dashboard UI, source/document browser, and customer bundle sanitization.",
      owner: "platform-desktop-app",
      primaryPaths: [
        "platform-desktop-app/renderer/workspace-monitor/app/",
        "platform-desktop-app/renderer/workspace-monitor/components/",
        "platform-desktop-app/renderer/workspace-monitor/lib/",
        "platform-desktop-app/renderer/workspace-monitor/scripts/"
      ],
      contains: ["Next.js screens", "snapshot collector", "monitor tests", "generated public snapshot"],
      mustNotContain: ["runtime task stores", "secret-bearing source data in customer mode"],
      uiEntry: "Overview, Structure, Source"
    },
    {
      id: "domain-projects",
      label: "Domain Projects",
      intent: "Bounded project work that should not be hidden inside the core platform.",
      owner: "registered root projects",
      primaryPaths: projects
        .filter((project) => !["agent-platform", "platform-desktop-app"].includes(project.name))
        .map((project) => project.path || `${project.name}/`),
      contains: ["domain assets", "domain docs", "project-local configs", "project-local artifacts"],
      mustNotContain: ["cross-workspace governance rules unless promoted"],
      uiEntry: "Projects, Documents"
    },
    {
      id: "runtime-local",
      label: "Runtime & Local Data",
      intent: "Local-only scratch, protected private state, generated output, and installed-app runtime stores.",
      owner: "local runtime boundary",
      primaryPaths: ["_private/", "outputs/", "app data runtime roots"],
      contains: ["sensitive local files", "transient output", "runtime task/log/cache stores"],
      mustNotContain: ["durable repository knowledge", "public bundle payloads"],
      uiEntry: "Desktop runtime data, support diagnostics"
    }
  ].map((plane) => ({
    ...plane,
    documentCount: countDocumentsForPrefixes(documents, plane.primaryPaths),
    sourceFileCount: countSourceFilesForPrefixes(sourceFiles, plane.primaryPaths)
  }));

  const boundaryRules = [
    {
      id: "project-boundary-first",
      label: "Project boundary first",
      rule: "Place project-specific code, docs, tests, configs, and artifacts inside the owning root project before promoting shared assets.",
      sourcePath: "_ops/projects/registry.json",
      appliesTo: ["agent-platform/", "platform-desktop-app/", "presentation-agent/", "design-asset-library/"]
    },
    {
      id: "reserved-ops-meaning",
      label: "Reserved operations folders",
      rule: "Underscore-prefixed root folders are reserved for shared operations, governance, history, requirements, specs, tools, skills, templates, and research.",
      sourcePath: "_ops/projects/root-structure-policy.json",
      appliesTo: folderStructure.rootFolders
        .filter((folder) => folder.className === "reserved_operational")
        .map((folder) => folder.path)
    },
    {
      id: "private-and-output-boundary",
      label: "Private and transient data stay out",
      rule: "_private/ and outputs/ are local-only boundaries; durable artifacts move to project-owned artifacts/ folders.",
      sourcePath: "AGENTS.md",
      appliesTo: ["_private/", "outputs/"]
    },
    {
      id: "customer-source-separation",
      label: "Installed customer view is not source tree view",
      rule: "Customer bundles use sanitized snapshots and runtime data stores instead of exposing platform source internals.",
      sourcePath: "platform-desktop-app/configs/runtime-data-boundary-registry.json",
      appliesTo: [
        "platform-desktop-app/",
        "platform-desktop-app/renderer/workspace-monitor/public/",
        "platform-desktop-app/renderer/workspace-monitor/out/"
      ]
    }
  ];

  const sourceHotspots = collectSourceHotspots(repoRoot, projects)
    .filter((file) => file.lineCount >= 800)
    .sort((left, right) => right.lineCount - left.lineCount || left.path.localeCompare(right.path))
    .slice(0, 8)
    .map((file) => ({
      path: file.path,
      project: file.project,
      language: file.language,
      lineCount: file.lineCount,
      sizeBytes: file.sizeBytes,
      recommendation: sourceHotspotRecommendation(file)
    }));

  const pressurePoints = [
    ...sourceHotspots.slice(0, 4).map((file) => ({
      id: `source-hotspot-${slugify(file.path)}`,
      label: "Large source surface",
      signal: `${file.lineCount.toLocaleString("ko-KR")} lines in ${file.path}`,
      reason: "Large files make ownership and local reasoning harder even when behavior is correct.",
      nextAction: file.recommendation,
      priority: file.lineCount >= 3000 ? "high" : "medium",
      sourcePath: file.path
    })),
    {
      id: "many-history-records",
      label: "History record density",
      signal: `${documents.filter((document) => document.path.startsWith("_history/")).length.toLocaleString("ko-KR")} history documents`,
      reason: "History is useful, but without a first-read map it becomes hard to know which record matters now.",
      nextAction: "Keep Structure and Unified Ops as the first-read map before opening individual history files.",
      priority: "medium",
      sourcePath: "_history/"
    },
    {
      id: "generated-snapshot-size",
      label: "Generated snapshot weight",
      signal: fs.existsSync(path.join(repoRoot, "platform-desktop-app", "renderer", "workspace-monitor", "src", "generated", "workspace-snapshot.json"))
        ? "renderer/workspace-monitor generated snapshot exists"
        : "generated snapshot not found",
      reason: "Generated data must stay downstream of source maps and should not be treated as the design source of truth.",
      nextAction: "Use collector modules and source registries as the source of truth; regenerate snapshots after source changes.",
      priority: "medium",
      sourcePath: "platform-desktop-app/renderer/workspace-monitor/src/generated/workspace-snapshot.json"
    }
  ];

  return {
    summary: {
      totalPlanes: planes.length,
      totalBoundaryRules: boundaryRules.length,
      totalPressurePoints: pressurePoints.length,
      topSourceHotspots: sourceHotspots.length
    },
    planes,
    boundaryRules,
    pressurePoints,
    sourceHotspots
  };
}

function countDocumentsForPrefixes(documents, prefixes) {
  return documents.filter((document) => prefixes.some((prefix) => document.path.startsWith(prefix))).length;
}

function countSourceFilesForPrefixes(sourceFiles, prefixes) {
  return sourceFiles.filter((file) => prefixes.some((prefix) => file.path.startsWith(prefix))).length;
}

function sourceHotspotRecommendation(file) {
  if (file.path === "platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx") {
    return "Split by feature panels and keep shared view state/types in small monitor modules.";
  }
  if (file.path === "platform-desktop-app/src-tauri/src/lib.rs") {
    return "Move runtime bridge concerns into Rust modules for sessions, task runs, support bundles, and payload audits.";
  }
  if (file.path.includes("app/globals.css")) {
    return "Group CSS by surface and move repeated component patterns behind named UI classes.";
  }
  return "Keep as a tracked hotspot and split only when an adjacent change needs local reasoning.";
}

function collectSourceHotspots(repoRoot, projects) {
  const roots = sourceRoots(repoRoot, projects);
  const seen = new Set();
  const files = [];

  for (const root of roots) {
    for (const filePath of walkFiles(root.path)) {
      const relativePath = toPosix(path.relative(repoRoot, filePath));
      if (seen.has(relativePath) || !isSourceFile(relativePath)) {
        continue;
      }
      seen.add(relativePath);
      const stats = fs.statSync(filePath);
      const content = fs.readFileSync(filePath, "utf8");
      files.push({
        path: relativePath,
        project: root.project,
        language: sourceLanguage(relativePath),
        lineCount: content.split(/\r?\n/).length,
        sizeBytes: stats.size
      });
    }
  }

  return files;
}

export function extractHistoryDate(relativePath) {
  const datedFolderMatch = relativePath.match(/(?:^|\/)(20\d{2})\/(20\d{2}-\d{2}-\d{2})(?:[-./]|$)/);
  if (datedFolderMatch) {
    return datedFolderMatch[2];
  }
  const dateMatch = relativePath.match(/(?:^|\/)(20\d{2}-\d{2}-\d{2})(?:[-./]|$)/);
  return dateMatch ? dateMatch[1] : "";
}

export function collectRequirements(repoRoot) {
  const roots = [
    path.join(repoRoot, "_requirements"),
    path.join(repoRoot, "platform-desktop-app", "renderer", "workspace-monitor", "docs", "requirements"),
    path.join(repoRoot, "presentation-agent", "docs", "requirements"),
    path.join(repoRoot, "platform-desktop-app", "docs", "requirements")
  ];
  return roots.flatMap((root) =>
    walkFiles(root)
      .filter((filePath) => filePath.endsWith(".md"))
      .flatMap((filePath) => parseRequirementRows(fs.readFileSync(filePath, "utf8"), toPosix(path.relative(repoRoot, filePath))))
  );
}

export function parseRequirementRows(markdown, sourcePath = "") {
  return markdown
    .split(/\r?\n/)
    .filter((line) => /^\|\s*REQ-[A-Z]+-\d+/.test(line))
    .map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean))
    .filter((cells) => cells.length >= 2)
    .map((cells) => ({
      id: cells[0],
      requirement: stripMarkdown(cells[1]),
      priority: cells[2] || "unknown",
      sourcePath
    }));
}

export function markdownToHtml(markdown, maxLength = 18000) {
  const lines = markdown.slice(0, maxLength).split(/\r?\n/);
  const html = [];
  let inCode = false;
  let inList = false;
  let inTable = false;
  let tableRows = [];

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      html.push(renderTable(tableRows));
      tableRows = [];
      inTable = false;
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      closeList();
      closeTable();
      html.push(inCode ? "</code></pre>" : "<pre><code>");
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      html.push(escapeHtml(line));
      continue;
    }
    if (/^\s*\|.+\|\s*$/.test(line)) {
      closeList();
      inTable = true;
      tableRows.push(line);
      continue;
    }
    closeTable();
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      continue;
    }
    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length, 4);
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(bullet[1])}</li>`);
      continue;
    }
    closeList();
    html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
  }
  closeList();
  closeTable();
  if (inCode) {
    html.push("</code></pre>");
  }
  return html.join("\n");
}

function historyAdminPreviewToHtml(content) {
  const excerpt = makeExcerpt(content, HISTORY_ADMIN_EXCERPT_CHARS) || "No preview available.";
  return `<p>${escapeHtml(excerpt)}</p>`;
}

export function extractTitle(content, relativePath = "") {
  const heading = content.match(/^#\s+(.+)$/m);
  return heading ? stripMarkdown(heading[1]) : titleFromPath(relativePath);
}

function renderTable(rows) {
  const parsedRows = rows
    .filter((row) => !/^\|\s*-+/.test(row))
    .map((row) => row.split("|").slice(1, -1).map((cell) => inlineMarkdown(cell.trim())));
  if (parsedRows.length === 0) {
    return "";
  }
  const [head, ...body] = parsedRows;
  return [
    "<table>",
    `<thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>`,
    `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>`,
    "</table>"
  ].join("");
}

function historyDocumentSummary(document) {
  return {
    id: document.id,
    path: document.path,
    category: document.category,
    language: document.language,
    title: document.title,
    excerpt: document.excerpt,
    updatedAt: document.updatedAt,
    historyDate: document.historyDate
  };
}

function sourceRoots(repoRoot, projects = []) {
  const roots = [];
  for (const project of projects || []) {
    const projectPath = stripTrailingSlash(project.path || project.name || "");
    if (!projectPath || projectPath.startsWith("_")) {
      continue;
    }
    for (const dirName of SOURCE_DIR_NAMES) {
      const rootPath = path.join(repoRoot, projectPath, dirName);
      if (fs.existsSync(rootPath)) {
        roots.push({ project: project.name || projectPath, path: rootPath });
      }
    }
  }

  const toolsRoot = path.join(repoRoot, "_tools");
  if (fs.existsSync(toolsRoot)) {
    for (const entry of fs.readdirSync(toolsRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }
      for (const dirName of ["src", "tests", "scripts"]) {
        const rootPath = path.join(toolsRoot, entry.name, dirName);
        if (fs.existsSync(rootPath)) {
          roots.push({ project: `_tools/${entry.name}`, path: rootPath });
        }
      }
    }
  }

  return roots;
}

function isSourceFile(relativePath) {
  const normalized = `/${relativePath}`;
  if (SOURCE_EXCLUDED_SEGMENTS.some((segment) => normalized.includes(segment))) {
    return false;
  }
  if (/package-lock\.json$|pnpm-lock\.yaml$|tsconfig\.tsbuildinfo$/.test(relativePath)) {
    return false;
  }
  return SOURCE_EXTENSIONS.has(path.extname(relativePath).toLowerCase());
}

export function readSourceFile(repoRoot, filePath, project) {
  const relativePath = toPosix(path.relative(repoRoot, filePath));
  const content = fs.readFileSync(filePath, "utf8");
  const stats = fs.statSync(filePath);
  const truncated = content.length > MAX_SOURCE_PREVIEW_CHARS;
  const preview = truncated ? content.slice(0, MAX_SOURCE_PREVIEW_CHARS) : content;

  return {
    id: slugify(relativePath),
    path: relativePath,
    project,
    language: sourceLanguage(relativePath),
    extension: path.extname(relativePath).replace(/^\./, ""),
    sizeBytes: stats.size,
    lineCount: content.split(/\r?\n/).length,
    updatedAt: stats.mtime.toISOString(),
    truncated,
    preview,
    previewBytes: Buffer.byteLength(preview, "utf8")
  };
}

function sourceLanguage(relativePath) {
  const extension = path.extname(relativePath).toLowerCase();
  const languages = {
    ".py": "python",
    ".js": "javascript",
    ".mjs": "javascript",
    ".cjs": "javascript",
    ".ts": "typescript",
    ".tsx": "tsx",
    ".rs": "rust",
    ".css": "css",
    ".html": "html",
    ".json": "json",
    ".toml": "toml",
    ".yaml": "yaml",
    ".yml": "yaml",
    ".sh": "shell"
  };
  return languages[extension] || extension.replace(/^\./, "") || "unknown";
}

function workspaceArea(relativePath) {
  const parts = relativePath.split("/");
  if (parts[0].startsWith("_") && parts.length > 1) {
    return `${parts[0]}/${parts[1]}`;
  }
  return parts[0] || "";
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="doc-link">$1</span>');
}

function jsonPreviewToHtml(content, maxLength = DEFAULT_DOCUMENT_HTML_CHARS) {
  try {
    return `<pre><code>${escapeHtml(JSON.stringify(JSON.parse(content), null, 2).slice(0, maxLength))}</code></pre>`;
  } catch {
    return `<pre><code>${escapeHtml(content.slice(0, maxLength))}</code></pre>`;
  }
}

function walkFiles(root) {
  if (!fs.existsSync(root)) {
    return [];
  }
  const files = [];
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) {
        continue;
      }
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
      } else {
        files.push(entryPath);
      }
    }
  }
  return files;
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalizeProject(project) {
  return {
    name: project.name,
    path: project.path,
    status: project.status,
    type: project.type,
    purpose: project.purpose,
    scope: project.scope,
    boundaryNotes: project.boundary_notes || []
  };
}

function detectLanguage(relativePath) {
  if (/\.ko\.(md|json)$/.test(relativePath) || /\.ko\.md$/.test(relativePath)) {
    return "ko";
  }
  if (/\.en\.(md|json)$/.test(relativePath) || /\.en\.md$/.test(relativePath)) {
    return "en";
  }
  return "unknown";
}

function makeExcerpt(content, maxLength = 280) {
  return stripMarkdown(content).replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromPath(relativePath) {
  const base = path.basename(relativePath || "Document").replace(/\.(ko|en)?\.?md$|\.json$/g, "");
  return base
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "");
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseArgs(argv) {
  const options = { bestEffort: false, repoRoot: "", snapshotMode: "developer" };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--best-effort") {
      options.bestEffort = true;
    } else if (value === "--customer") {
      options.snapshotMode = "customer";
    } else if (value === "--snapshot-mode") {
      const mode = argv[index + 1] || "developer";
      if (!["developer", "customer"].includes(mode)) {
        throw new Error(`Unsupported snapshot mode: ${mode}`);
      }
      options.snapshotMode = mode;
      index += 1;
    } else if (value === "--repo-root") {
      options.repoRoot = argv[index + 1] || "";
      index += 1;
    }
  }
  return options;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
