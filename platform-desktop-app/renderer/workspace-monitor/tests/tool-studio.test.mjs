import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const monitorShell = fs.readFileSync(path.join(projectRoot, "components", "MonitorShell.tsx"), "utf8");
const desktopTypes = fs.readFileSync(path.join(projectRoot, "types", "desktop.ts"), "utf8");
const desktopActivityRail = fs.readFileSync(
  path.join(projectRoot, "components", "shell", "DesktopActivityRail.tsx"),
  "utf8"
);
const providerPanelSource = fs.readFileSync(
  path.join(projectRoot, "components", "features", "ProviderAccountsPanel.tsx"),
  "utf8"
);
const providerAccountSettingsHook = fs.readFileSync(
  path.join(projectRoot, "components", "features", "useProviderAccountSettings.ts"),
  "utf8"
);
const runtimeCustomizationPanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "RuntimeCustomizationPanel.tsx"),
  "utf8"
);
const runtimeCatalog = fs.readFileSync(
  path.join(projectRoot, "components", "features", "runtimeCatalog.ts"),
  "utf8"
);
const runtimeSessionPresets = fs.readFileSync(
  path.join(projectRoot, "components", "features", "runtimeSessionPresets.ts"),
  "utf8"
);
const runtimeWorkspaceCopy = fs.readFileSync(
  path.join(projectRoot, "components", "features", "runtimeWorkspaceCopy.ts"),
  "utf8"
);
const runtimeDisplay = fs.readFileSync(path.join(projectRoot, "lib", "runtimeDisplay.ts"), "utf8");
const settingsRuntimeSyncHook = fs.readFileSync(
  path.join(projectRoot, "components", "features", "useSettingsRuntimeSync.ts"),
  "utf8"
);
const searchAgentWorkChatPanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "SearchAgentWorkChatPanel.tsx"),
  "utf8"
);
const desktopActionFeedbackCard = fs.readFileSync(
  path.join(projectRoot, "components", "features", "DesktopActionFeedbackCard.tsx"),
  "utf8"
);
const agentFirstRunGuideCard = fs.readFileSync(
  path.join(projectRoot, "components", "features", "AgentFirstRunGuideCard.tsx"),
  "utf8"
);
const runtimeInitStatusCard = fs.readFileSync(
  path.join(projectRoot, "components", "features", "RuntimeInitStatusCard.tsx"),
  "utf8"
);
const accumulatedDataPanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "AccumulatedDataPanel.tsx"),
  "utf8"
);
const desktopControlPanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "DesktopControlPanel.tsx"),
  "utf8"
);
const taskRunStorePanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "TaskRunStorePanel.tsx"),
  "utf8"
);
const workspaceHostPanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "WorkspaceHostPanel.tsx"),
  "utf8"
);
const runtimeDataSupportPanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "RuntimeDataSupportPanel.tsx"),
  "utf8"
);
const monitorSummaryWidgets = fs.readFileSync(
  path.join(projectRoot, "components", "features", "MonitorSummaryWidgets.tsx"),
  "utf8"
);
const sourceEditorMonacoConfig = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "source-editor", "monacoConfig.ts"),
  "utf8"
);
const sourceEditorIndex = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "source-editor", "index.ts"),
  "utf8"
);
const sourceEditorCatalog = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "source-editor", "sourceCatalog.ts"),
  "utf8"
);
const sourceEditorDrafts = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "source-editor", "sourceDrafts.ts"),
  "utf8"
);
const sourceEditorDraftActions = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "source-editor", "sourceDraftActions.ts"),
  "utf8"
);
const sourceEditorSession = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "source-editor", "useSourceEditorSession.ts"),
  "utf8"
);
const sourceWorkbenchController = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "source-editor", "useSourceWorkbenchController.ts"),
  "utf8"
);
const sourceWorkbenchPanel = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "source-editor", "SourceWorkbenchPanel.tsx"),
  "utf8"
);
const sourceWorkbenchVisualComponentNames = [
  "SourceCommandToolbar.tsx",
  "SourceEditorFrame.tsx",
  "SourceEditorTabs.tsx",
  "SourceFileBrowser.tsx",
  "SourceFileControls.tsx",
  "SourceSaveResultsPanel.tsx",
  "SourceWorkbenchHeader.tsx",
  "SourceWorkbenchSwitcher.tsx",
  "SourceWorkspaceStatusStrip.tsx"
];
const sourceWorkbenchVisualSource = [
  sourceWorkbenchPanel,
  ...sourceWorkbenchVisualComponentNames.map((fileName) =>
    fs.readFileSync(path.join(projectRoot, "components", "workbench", "source-editor", fileName), "utf8")
  )
].join("\n");
const desktopRuntimeCopySource = `${monitorShell}\n${runtimeDisplay}\n${accumulatedDataPanel}\n${desktopControlPanel}\n${runtimeInitStatusCard}\n${taskRunStorePanel}\n${workspaceHostPanel}\n${settingsRuntimeSyncHook}\n${providerAccountSettingsHook}`;
const motionHelpers = fs.readFileSync(path.join(projectRoot, "lib", "motion.ts"), "utf8");
const operatorCenterDialog = fs.readFileSync(
  path.join(projectRoot, "components", "features", "OperatorCenterDialog.tsx"),
  "utf8"
);
const productFeatureArchitecturePanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "ProductFeatureArchitecturePanel.tsx"),
  "utf8"
);
const projectManagementPanel = readProjectManagementPanelSource();
const evaluationReportPanel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "EvaluationReportPanel.tsx"),
  "utf8"
);
const evaluationReportModel = fs.readFileSync(
  path.join(projectRoot, "components", "features", "evaluationReportModel.ts"),
  "utf8"
);
const evaluationReportCatalog = fs.readFileSync(
  path.join(projectRoot, "components", "features", "evaluationReportCatalog.ts"),
  "utf8"
);
const evaluationRuntimeTelemetry = fs.readFileSync(
  path.join(projectRoot, "components", "features", "evaluationRuntimeTelemetry.ts"),
  "utf8"
);
const toolStudio = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "ToolStudioPanel.tsx"),
  "utf8"
);
const workspaceExplorerPane = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "WorkspaceExplorerPane.tsx"),
  "utf8"
);
const runtimeTerminalDrawer = readRuntimeTerminalDrawerSource();
const nativeGitWorkbench = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "NativeGitWorkbench.tsx"),
  "utf8"
);
const snapshotModel = fs.readFileSync(path.join(projectRoot, "lib", "snapshot.ts"), "utf8");
const toolStudioData = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "tool-studio", "data.ts"),
  "utf8"
);
const toolStudioTypes = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "tool-studio", "types.ts"),
  "utf8"
);
const agentCollaborationScene = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "AgentCollaborationScene.tsx"),
  "utf8"
);
const agentBuilderPanels = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "AgentBuilderPanels.tsx"),
  "utf8"
);
const agentDetailPanels = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "AgentDetailPanels.tsx"),
  "utf8"
);
const coreDrilldown = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "CoreFeatureDrilldown.tsx"),
  "utf8"
);
const buttonComponent = fs.readFileSync(path.join(projectRoot, "components", "ui", "Button.tsx"), "utf8");
const actionGroupComponent = fs.readFileSync(path.join(projectRoot, "components", "ui", "ActionGroup.tsx"), "utf8");
const overlayFocusHook = fs.readFileSync(path.join(projectRoot, "components", "ui", "useOverlayFocus.ts"), "utf8");
const collector = fs.readFileSync(path.join(projectRoot, "scripts", "collect-workspace.mjs"), "utf8");
const snapshotWorkerPool = fs.readFileSync(path.join(projectRoot, "scripts", "lib", "snapshot-worker-pool.mjs"), "utf8");
const snapshotFileWorker = fs.readFileSync(path.join(projectRoot, "scripts", "lib", "snapshot-file-worker.mjs"), "utf8");
const scrollCheck = fs.readFileSync(path.join(projectRoot, "scripts", "check-scroll-containers.mjs"), "utf8");
const surfaceAudit = fs.readFileSync(path.join(projectRoot, "scripts", "audit-monitor-surfaces.mjs"), "utf8");
const sourceControlsSmoke = fs.readFileSync(
  path.join(projectRoot, "scripts", "check-source-controls-playwright.mjs"),
  "utf8"
);
const buttonResponseAudit = fs.readFileSync(
  path.join(projectRoot, "scripts", "audit-button-response.mjs"),
  "utf8"
);
const sectionSwitchAudit = fs.readFileSync(
  path.join(projectRoot, "scripts", "audit-section-switch-latency.mjs"),
  "utf8"
);
const lazyBoundaryCheck = fs.readFileSync(
  path.join(projectRoot, "scripts", "check-lazy-boundary-contract.mjs"),
  "utf8"
);
const historyPayloadCheck = fs.readFileSync(path.join(projectRoot, "scripts", "check-history-payload.mjs"), "utf8");
const adminHistoryHook = fs.readFileSync(path.join(projectRoot, "components", "history", "useAdminHistoryIndex.ts"), "utf8");
const tauriSrcRoot = path.resolve(projectRoot, "..", "..", "src-tauri", "src");
const tauriLib = readTauriRuntimeSource();
const tauriAppShell = fs.readFileSync(
  path.resolve(projectRoot, "..", "..", "src-tauri", "src", "features", "app_shell.rs"),
  "utf8"
);
const tauriProviders = fs.readFileSync(
  path.resolve(projectRoot, "..", "..", "src-tauri", "src", "features", "providers.rs"),
  "utf8"
);
const tauriRuntimeSource = `${tauriLib}\n${tauriAppShell}\n${tauriProviders}`;
const tauriCargo = fs.readFileSync(path.resolve(projectRoot, "..", "..", "src-tauri", "Cargo.toml"), "utf8");
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"));
const toolUsageRegistry = JSON.parse(
  fs.readFileSync(path.resolve(projectRoot, "..", "..", "configs", "tool-usage-integration-registry.json"), "utf8")
);
const toolUsageRegistryText = JSON.stringify(toolUsageRegistry);

function readTauriRuntimeSource() {
  const lib = fs.readFileSync(path.join(tauriSrcRoot, "lib.rs"), "utf8");
  const partsRoot = path.join(tauriSrcRoot, "lib_parts");
  const parts = fs.existsSync(partsRoot)
    ? fs.readdirSync(partsRoot)
      .filter((file) => file.endsWith(".rs"))
      .sort()
      .map((file) => fs.readFileSync(path.join(partsRoot, file), "utf8"))
    : [];
  return [lib, ...parts].join("\n");
}

function readRuntimeTerminalDrawerSource() {
  const drawerRoot = path.join(projectRoot, "components", "workbench");
  const splitRoot = path.join(drawerRoot, "runtime-terminal");
  const splitSources = fs.existsSync(splitRoot)
    ? fs.readdirSync(splitRoot)
      .filter((file) => /\.(ts|tsx)$/.test(file))
      .sort()
      .map((file) => fs.readFileSync(path.join(splitRoot, file), "utf8"))
    : [];
  return [
    fs.readFileSync(path.join(drawerRoot, "RuntimeTerminalDrawer.tsx"), "utf8"),
    ...splitSources
  ].join("\n");
}

function readProjectManagementPanelSource() {
  const panelRoot = path.join(projectRoot, "components", "features");
  const splitRoot = path.join(panelRoot, "project-management");
  const splitSources = fs.existsSync(splitRoot)
    ? fs.readdirSync(splitRoot)
      .filter((file) => /\.(ts|tsx)$/.test(file))
      .sort()
      .map((file) => fs.readFileSync(path.join(splitRoot, file), "utf8"))
    : [];
  return [
    fs.readFileSync(path.join(panelRoot, "ProjectManagementPanel.tsx"), "utf8"),
    ...splitSources
  ].join("\n");
}

function readCssRule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`${escaped} \\{([\\s\\S]*?)\\n\\}`));
  assert.ok(match, `Missing CSS rule: ${selector}`);
  return match[1];
}

test("Tool Studio remains available as a separated advanced section", () => {
  assert.match(desktopTypes, /\|\s*"tools"/);
  assert.match(monitorShell, /id:\s*"tools"[\s\S]*?label:\s*"분리된 툴 플랫폼"/);
  assert.match(monitorShell, /allowedSections:\s*\["overview", "source", "desktop", "eval", "projects", "history", "documents", "requirements"\]/);
  assert.match(monitorShell, /defaultPinnedSections:\s*SectionId\[\]\s*=\s*\["overview", "source", "desktop", "eval"\]/);
  assert.doesNotMatch(monitorShell, /hasLegacyDefault && !next\.includes\("tools"\)/);
  assert.doesNotMatch(monitorShell, /next\.splice\(insertAt, 0, "tools"\)/);
  assert.match(monitorShell, /tools:\s*"Separate"/);
  assert.match(monitorShell, /section === "tools"[\s\S]*?<MemoizedToolStudioPanel/);
  assert.match(monitorShell, /toolUsageIntegration=\{snapshot\.toolUsageIntegration\}/);
  assert.match(monitorShell, /import type \{ ToolStudioMode, ToolStudioModeRequest, ToolStudioPanelProps \} from "@\/components\/workbench\/ToolStudioPanel"/);
  assert.match(monitorShell, /const ToolStudioPanel = dynamic<ToolStudioPanelProps>/);
  assert.match(monitorShell, /\(\) => import\("@\/components\/workbench\/ToolStudioPanel"\)\.then\(\(module\) => module\.ToolStudioPanel\)/);
  assert.match(monitorShell, /const MemoizedToolStudioPanel = memo\(ToolStudioPanel\)/);
  assert.match(toolStudio, /export type ToolStudioPanelProps = \{/);
  assert.match(toolStudio, /toolUsageIntegration\?: WorkspaceToolUsageIntegration/);
  assert.match(coreDrilldown, /"workspace" \| "run" \| "timeline" \| "eval" \| "projects"/);
});

test("Tool Studio exposes source-backed agent tool usage playbooks", () => {
  assert.match(snapshotModel, /export type WorkspaceToolUsageIntegration = \{/);
  assert.match(snapshotModel, /toolUsageIntegration\?: WorkspaceToolUsageIntegration/);
  assert.match(toolStudio, /import type \{ WorkspaceToolUsageIntegration \} from "@\/lib\/snapshot"/);
  assert.match(toolStudio, /const toolUsagePatterns = toolUsageIntegration\?\.patterns \|\| \[\]/);
  assert.match(toolStudio, /data-tool-playbook-list/);
  assert.match(toolStudio, /data-tool-playbook-pattern=\{pattern\.id\}/);
  assert.match(toolStudio, /data-tool-usage-playbook/);
  assert.match(toolStudio, /data-tool-playbook-action="copy"/);
  assert.match(toolStudio, /copyToolUsagePlaybook/);
  assert.match(css, /\.tool-playbook-list \{/);
  assert.match(css, /\.tool-playbook-list button \{/);
  assert.match(css, /\.tool-usage-playbook \{/);
  assert.match(css, /\.tool-usage-playbook-grid \{/);
  assert.match(css, /\.tool-usage-command-list code \{/);
  assert.match(toolUsageRegistryText, /subagent-delegation-loop/);
  assert.match(toolUsageRegistryText, /multi_agent_v1\.spawn_agent/);
  assert.match(toolUsageRegistryText, /multi_agent_v1\.wait_agent/);
  assert.match(toolUsageRegistryText, /multi_agent_v1\.close_agent/);
  assert.match(toolUsageRegistryText, /agent-platform:plan-agent-orchestration/);
  assert.match(toolUsageRegistryText, /subagent-delegation-ladder/);
});

test("Workspace snapshot collection uses bounded worker-thread parallelism", () => {
  assert.match(collector, /import \{ recommendedWorkerCount, runWorkerTasks \} from "\.\/lib\/snapshot-worker-pool\.mjs"/);
  assert.match(collector, /const snapshotFileWorkerPath = path\.join\(__dirname, "lib", "snapshot-file-worker\.mjs"\)/);
  assert.match(collector, /export async function buildSnapshot/);
  assert.match(collector, /collectDocumentsParallel\(repoRoot, documentTasks\)/);
  assert.match(collector, /collectSourceFilesParallel\(repoRoot, sourceFileCandidates\)/);
  assert.match(collector, /snapshotDocumentWorkers/);
  assert.match(collector, /snapshotSourceWorkers/);
  assert.match(snapshotWorkerPool, /from "node:worker_threads"/);
  assert.match(snapshotWorkerPool, /recommendedWorkerCount/);
  assert.match(snapshotWorkerPool, /WORKSPACE_MONITOR_PARALLEL === "0"/);
  assert.match(snapshotWorkerPool, /new Worker\(workerPath/);
  assert.match(snapshotFileWorker, /readDocument/);
  assert.match(snapshotFileWorker, /readSourceFile/);
});

test("AI Eval is a first-class resident workbench section", () => {
  assert.match(desktopTypes, /\|\s*"eval"/);
  assert.match(monitorShell, /id:\s*"eval"[\s\S]*?label:\s*"보고서\/근거"/);
  assert.match(monitorShell, /const maxResidentSectionPanels = 12/);
  assert.match(monitorShell, /retainedResidentSections: SectionId\[\] = \["overview", "source", "desktop", "eval"\]/);
  assert.match(monitorShell, /startupResidentPreloadSections: SectionId\[\] = \[[\s\S]*?"source"[\s\S]*?"requirements"[\s\S]*?"structure"[\s\S]*?\]/);
  assert.match(monitorShell, /const EvaluationReportPanel = dynamic<EvaluationReportPanelProps>/);
  assert.match(monitorShell, /import\("@\/components\/features\/EvaluationReportPanel"\)/);
  assert.match(monitorShell, /void import\("@\/components\/features\/EvaluationReportPanel"\)/);
  assert.match(monitorShell, /eval:\s*`\$\{visibleEvaluations\.toLocaleString\("ko-KR"\)\} reports`/);
  assert.match(monitorShell, /section === "source" \|\| section === "desktop" \|\| section === "eval"/);
  assert.match(monitorShell, /id:\s*"evaluate-work"[\s\S]*?targetSection:\s*"eval"/);
  assert.match(monitorShell, /id:\s*"eval"[\s\S]*?cta:\s*uiLanguage === "ko" \? "보고서 열기" : "Open Reports"/);
  assert.match(monitorShell, /section === "eval"[\s\S]*?<EvaluationReportPanel/);
  assert.match(monitorShell, /const \[sharedDesktopResourceSnapshot, setSharedDesktopResourceSnapshot\] = useState<DesktopResourceSnapshotReport \| null>\(null\)/);
  assert.match(monitorShell, /handleDesktopResourceSnapshotChange/);
  assert.match(monitorShell, /onDesktopResourceSnapshotChange=\{handleDesktopResourceSnapshotChange\}/);
  assert.match(monitorShell, /runtimeTelemetry=\{sharedDesktopResourceSnapshot\}/);
  assert.match(desktopTypes, /semanticMetrics: Array<\{/);
  assert.match(evaluationReportPanel, /data-eval-workbench="open-source-eval-cockpit"/);
  assert.match(evaluationReportPanel, /data-eval-comprehensive-improvement="all-signal-cockpit"/);
  assert.match(evaluationReportPanel, /data-eval-runtime-telemetry/);
  assert.match(evaluationReportPanel, /buildEvaluationReportModel/);
  assert.match(evaluationReportPanel, /evaluationReportCatalog/);
  assert.match(evaluationReportPanel, /formatEvalPercent/);
  assert.match(evaluationReportPanel, /EvalRuntimeTelemetrySignal/);
  assert.match(evaluationReportPanel, /runtimeTelemetryAvailable/);
  assert.match(evaluationReportModel, /export function buildEvaluationReportModel/);
  assert.match(evaluationReportModel, /export function formatEvalPercent/);
  assert.match(evaluationReportModel, /evaluationReportCatalog/);
  assert.match(evaluationReportModel, /mergeEvalRepos/);
  assert.match(evaluationReportModel, /toolSignals/);
  assert.match(evaluationReportModel, /buildRuntimeTelemetryModel/);
  assert.match(evaluationReportModel, /nativeRuntimeScore/);
  assert.match(evaluationRuntimeTelemetry, /export type EvalRuntimeTelemetrySignal/);
  assert.match(evaluationRuntimeTelemetry, /export function buildRuntimeTelemetryModel/);
  assert.match(evaluationRuntimeTelemetry, /formatRuntimeBytes/);
  assert.match(evaluationRuntimeTelemetry, /process\.memory\.usage/);
  assert.match(evaluationRuntimeTelemetry, /process\.cpu\.utilization/);
  assert.match(evaluationRuntimeTelemetry, /process\.thread\.count/);
  assert.match(evaluationReportPanel, /Current work evaluation report/);
  assert.match(evaluationReportPanel, /Composite Improvement Cockpit/);
  assert.match(evaluationReportModel, /desktop-performance/);
  assert.match(evaluationReportModel, /ux-control-clarity/);
  assert.match(evaluationReportModel, /native-resource-lifecycle/);
  assert.match(evaluationReportModel, /eval-evidence/);
  assert.match(evaluationReportModel, /release-packaging/);
  assert.match(evaluationReportModel, /open-source-leverage/);
  assert.match(evaluationReportModel, /automation-continuity/);
  assert.match(evaluationReportCatalog, /export const evalScenarios/);
  assert.match(evaluationReportCatalog, /export const toolSignals/);
  assert.match(evaluationReportCatalog, /export const fallbackEvalRepos/);
  assert.match(evaluationReportCatalog, /export function mergeEvalRepos/);
  assert.match(evaluationReportCatalog, /Token and Cost Tracking/);
  assert.match(evaluationReportCatalog, /OpenAI Evals/);
  assert.match(evaluationReportCatalog, /Inspect AI/);
  assert.match(evaluationReportCatalog, /promptfoo/);
  assert.match(evaluationReportCatalog, /DeepEval/);
  assert.match(evaluationReportCatalog, /Arize Phoenix/);
  assert.match(evaluationReportCatalog, /Opik/);
  assert.match(evaluationReportCatalog, /Langfuse/);
  assert.match(css, /\.eval-workbench \{/);
  assert.match(css, /\.eval-score-strip \{/);
  assert.match(css, /\.eval-comprehensive-panel \{/);
  assert.match(css, /\.eval-comprehensive-grid \{/);
  assert.match(css, /\.eval-dimension-meter \{/);
  assert.match(css, /\.eval-runtime-telemetry-strip \{/);
  assert.match(css, /\.eval-tool-grid \{/);
  assert.match(css, /\.eval-open-source-grid \{/);
  assert.match(packageJson.scripts.check, /check-comprehensive-improvement-contract\.mjs/);
  assert.equal(packageJson.scripts["check:comprehensive-improvement"], "node scripts/check-comprehensive-improvement-contract.mjs");
});

test("Default user view exposes a simple workspace-tracker start surface", () => {
  assert.match(monitorShell, /const defaultPinnedSections:\s*SectionId\[\]\s*=\s*\["overview", "source", "desktop", "eval"\]/);
  assert.match(monitorShell, /allowedSections:\s*\["overview", "source", "desktop", "eval", "projects", "history", "documents", "requirements"\]/);
  assert.match(monitorShell, /const \[viewMode, setViewMode\] = useState\(snapshot\.viewModeCatalog\?\.defaultMode \|\| "user"\)/);
  assert.match(monitorShell, /data-simple-user-start/);
  assert.match(monitorShell, /<WorkspaceProductSplitPanel/);
  assert.match(monitorShell, /<ProjectManagementPanel/);
  assert.match(monitorShell, /const openProjectManagementTarget = useCallback/);
  assert.match(monitorShell, /targetSection === "desktop"[\s\S]*?openTerminalDrawer\(\)/);
  assert.match(monitorShell, /intentId: "import-workspace", flowStepId: "workspace"/);
  assert.match(monitorShell, /onOpenSection=\{openProjectManagementTarget\}/);
  assert.match(projectManagementPanel, /Project Management Platform/);
  assert.match(projectManagementPanel, /프로젝트 관리 플랫폼/);
  assert.match(projectManagementPanel, /data-project-management-panel/);
  assert.match(projectManagementPanel, /data-project-management-primary-action="import-workspace"/);
  assert.match(projectManagementPanel, /data-project-workflow-lanes/);
  assert.match(projectManagementPanel, /data-project-portfolio-list/);
  assert.match(projectManagementPanel, /data-project-detail-panel/);
  assert.match(projectManagementPanel, /data-project-action-queue/);
  assert.match(projectManagementPanel, /data-project-report-bundle/);
  assert.match(projectManagementPanel, /data-project-resource-link/);
  assert.match(projectManagementPanel, /projectReadinessCopy/);
  assert.match(projectManagementPanel, /projectReportReadinessCopy/);
  assert.match(css, /\.workspace-product-split-panel \{/);
  assert.match(css, /\.project-management-panel \{/);
  assert.match(css, /\.project-workflow-lanes \{/);
  assert.match(css, /\.project-portfolio-card \{/);
  assert.match(css, /\.project-detail-panel,/);
  assert.match(css, /\.project-action-queue \{/);
  assert.match(css, /\.project-report-bundle \{/);
  assert.match(monitorShell, /startSimpleUserTask/);
  assert.match(monitorShell, /showOperatorCenter=\{currentViewMode\.id !== "user"\}/);
  assert.match(css, /\.simple-user-start-panel \{/);
  assert.match(css, /\.simple-user-actions button\.primary \{/);
});

test("Tool Studio uses open-source menu primitives and exact dependencies", () => {
  assert.equal(packageJson.dependencies.three, "0.184.0");
  assert.equal(packageJson.dependencies["@radix-ui/react-dropdown-menu"], "2.1.16");
  assert.equal(packageJson.dependencies["@radix-ui/react-context-menu"], "2.2.16");
  assert.equal(packageJson.devDependencies["@types/three"], "0.184.1");
  assert.match(toolStudio, /from "@radix-ui\/react-dropdown-menu"/);
  assert.match(toolStudio, /from "@radix-ui\/react-context-menu"/);
  assert.match(toolStudio, /<DropdownMenu\.Root>/);
  assert.match(toolStudio, /<ContextMenu\.Root/);
});

test("Monitor uses library-backed button variants for primary controls", () => {
  assert.equal(packageJson.dependencies["@radix-ui/react-slot"], "1.2.4");
  assert.equal(packageJson.dependencies["class-variance-authority"], "0.7.1");
  assert.match(buttonComponent, /from "@radix-ui\/react-slot"/);
  assert.match(buttonComponent, /from "class-variance-authority"/);
  assert.match(buttonComponent, /export const buttonVariants = cva\("ui-button"/);
  assert.match(buttonComponent, /variant:\s*\{[\s\S]*?primary:[\s\S]*?secondary:[\s\S]*?ghost:/);
  assert.match(buttonComponent, /size:\s*\{[\s\S]*?sm:[\s\S]*?md:[\s\S]*?icon:/);
  assert.match(buttonComponent, /asChild \? Slot : "button"/);
  assert.match(monitorShell, /import \{ Button \} from "@\/components\/ui\/Button"/);
  assert.match(monitorShell, /<Button variant="secondary" onClick=\{openTerminalDrawer\}/);
  assert.match(monitorShell, /<Button variant="ghost" size="icon" onClick=\{\(\) => setCommandPaletteOpen\(true\)\}/);
  assert.match(toolStudio, /import \{ Button \} from "@\/components\/ui\/Button"/);
  assert.match(toolStudio, /<Button[\s\S]*?variant="primary"[\s\S]*?data-tool-primary-menu/);
  assert.match(css, /\.ui-button \{[\s\S]*?min-height: var\(--control-target-size\);/);
  assert.match(css, /\.ui-button-primary \{[\s\S]*?background: var\(--action-primary-bg\);/);
  assert.match(css, /\.ui-button-icon \{[\s\S]*?aspect-ratio: 1;/);
});

test("Action button labels stay single-line and truncate instead of stretching controls", () => {
  const cliCopyButtonLabelRule = readCssRule(".cli-command-copy-row button span");
  const providerModelChipLabelRule = readCssRule(".provider-model-chip-list button span");
  const commandPaletteTextRule = readCssRule(".command-palette-results strong,\n.command-palette-results em");
  const sourceCommandButtonRule = readCssRule(".source-command-toolbar button,\n.source-settings-dialog button");
  const agentCliCommandLabelRule = readCssRule(".agent-cli-command-stack button span");

  assert.match(css, /--button-label-max-inline-size: 24ch;/);
  assert.match(css, /--button-compact-label-max-inline-size: 18ch;/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.cli-command-copy-row button,[\s\S]*?\.provider-model-chip-list button,[\s\S]*?\.source-command-toolbar button,[\s\S]*?\.source-editor-primary-actions button[\s\S]*?\) \{[\s\S]*?overflow: hidden;[\s\S]*?text-overflow: ellipsis;[\s\S]*?white-space: nowrap;/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.desktop-actions button,[\s\S]*?\.adapter-card button,[\s\S]*?\.agent-chat-connection-actions button,[\s\S]*?\.agent-chat-actions button[\s\S]*?\) \{[\s\S]*?overflow: hidden;[\s\S]*?text-overflow: ellipsis;[\s\S]*?white-space: nowrap;/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.cli-command-copy-row button,[\s\S]*?\.provider-model-chip-list button,[\s\S]*?\.source-command-toolbar button[\s\S]*?\) > :where\(span, strong, small, em, kbd\) \{[\s\S]*?max-inline-size: min\(100%, var\(--button-label-max-inline-size\)\);[\s\S]*?overflow: hidden;[\s\S]*?text-overflow: ellipsis;[\s\S]*?white-space: nowrap;[\s\S]*?overflow-wrap: normal;/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.runtime-quick-command-row > button,[\s\S]*?\.cli-command-copy-row button,[\s\S]*?\.desktop-actions button,[\s\S]*?\.agent-chat-connection-actions button,[\s\S]*?\.source-command-toolbar button,[\s\S]*?\.agent-cli-command-stack button[\s\S]*?\) > :where\(span, strong, small, em, kbd\) \{[\s\S]*?max-inline-size: min\(100%, var\(--button-compact-label-max-inline-size\)\);/);
  assert.match(css, /\.command-palette-results \{[\s\S]*?\}\n\n\.command-palette-results button \{[\s\S]*?display: grid;[\s\S]*?overflow: hidden;[\s\S]*?text-overflow: ellipsis;[\s\S]*?white-space: nowrap;/);
  assert.match(css, /\.desktop-actions button \{[\s\S]*?max-inline-size: 16ch;[\s\S]*?white-space: nowrap;/);
  assert.match(css, /\.agent-chat-connection-actions button \{[\s\S]*?max-inline-size: 13ch;[\s\S]*?white-space: nowrap;/);
  assert.match(css, /\.agent-first-run-actions button \{[\s\S]*?max-inline-size: 13ch;[\s\S]*?justify-content: center;/);
  assert.match(css, /\.runtime-init-status-actions button \{[\s\S]*?max-inline-size: 12ch;/);

  for (const rule of [
    cliCopyButtonLabelRule,
    providerModelChipLabelRule,
    commandPaletteTextRule,
    sourceCommandButtonRule,
    agentCliCommandLabelRule
  ]) {
    assert.match(rule, /overflow: hidden;/);
    assert.match(rule, /text-overflow: ellipsis;/);
    assert.match(rule, /white-space: nowrap;/);
    assert.doesNotMatch(rule, /white-space: normal;/);
    assert.doesNotMatch(rule, /overflow-wrap: anywhere;/);
  }
});

test("Runtime setup UI hides noisy guidance and keeps visible actions short", () => {
  assert.match(providerPanelSource, /const \[guideOpen, setGuideOpen\] = useState/);
  assert.match(providerPanelSource, /open=\{guideOpen\}/);
  assert.match(providerPanelSource, /onToggle=\{\(event\) => setGuideOpen\(event\.currentTarget\.open\)\}/);
  assert.match(providerPanelSource, /loginSetup: "키 발급"/);
  assert.match(providerPanelSource, /refreshModels: "모델"/);
  assert.match(providerPanelSource, /verifySubscription: "구독"/);
  assert.match(workspaceHostPanel, /permission: "권한"/);
  assert.match(workspaceHostPanel, /import: "가져오기"/);
  assert.match(workspaceHostPanel, /clone: "복제"/);
  assert.match(desktopControlPanel, /title: "실행 연결"/);
  assert.match(desktopControlPanel, /runAll: "점검"/);
  assert.match(searchAgentWorkChatPanel, /title: "작업 에이전트"/);
  assert.match(searchAgentWorkChatPanel, /connection: "연결"/);
  assert.match(searchAgentWorkChatPanel, /account: "계정"/);
  assert.match(searchAgentWorkChatPanel, /models: "모델"/);
  assert.match(css, /\.provider-guide-body \{[\s\S]*?grid-template-columns: minmax\(220px, 0\.8fr\) minmax\(320px, 1\.2fr\);/);
  assert.match(css, /@media \(max-width: 1080px\)[\s\S]*?\.provider-guide-body,[\s\S]*?\.provider-guide-steps,[\s\S]*?\{[\s\S]*?grid-template-columns: 1fr;/);
});

test("Runtime data support limits dense root lists before showing support details", () => {
  assert.match(runtimeDataSupportPanel, /const visibleRoots = roots\.slice\(0, 6\);/);
  assert.match(runtimeDataSupportPanel, /const hiddenRootCount = Math\.max\(0, roots\.length - visibleRoots\.length\);/);
  assert.match(runtimeDataSupportPanel, /\{hiddenRootCount > 0 && \(/);
  assert.match(runtimeDataSupportPanel, /moreRoots: \(count: number\) => `루트 \$\{count\}개 더 있음`/);
});

test("Monitor groups repeated actions with shared action primitives", () => {
  assert.match(actionGroupComponent, /export const actionGroupVariants = cva\("ui-action-group"/);
  assert.match(actionGroupComponent, /align:\s*\{[\s\S]*?start:[\s\S]*?end:[\s\S]*?stretch:/);
  assert.match(actionGroupComponent, /density:\s*\{[\s\S]*?compact:[\s\S]*?spacious:/);
  assert.match(actionGroupComponent, /role=\{role \|\| \(asToolbar \? "toolbar" : "group"\)\}/);
  assert.match(monitorShell, /import \{ ActionGroup \} from "@\/components\/ui\/ActionGroup"/);
  assert.match(monitorShell, /<ActionGroup className="titlebar-actions"[\s\S]*?density="compact"[\s\S]*?>/);
  assert.match(monitorShell, /className="titlebar-breadcrumb" aria-label=\{uiLanguage === "ko" \? "현재 위치" : "Current location"\}/);
  assert.match(monitorShell, /data-current-location-trail/);
  assert.match(monitorShell, /data-titlebar-breadcrumb="home"/);
  assert.match(monitorShell, /data-titlebar-breadcrumb="group"/);
  assert.match(monitorShell, /data-titlebar-breadcrumb="section"[\s\S]*?aria-current="page"/);
  assert.match(css, /\.titlebar-breadcrumb \{/);
  assert.match(css, /\.titlebar-breadcrumb ol \{/);
  assert.match(css, /\.titlebar-current-label \{/);
  assert.match(monitorShell, /<ActionGroup className="task-handoff-actions"[\s\S]*?align="end" density="compact">/);
  assert.match(monitorShell, /<Button variant="secondary" size="sm" onClick=\{\(\) => setCommandPaletteOpen\(false\)\}>/);
  assert.match(monitorShell, /<Button key=\{item\.id\} variant="ghost" className="command-palette-result" onClick=\{\(\) => runCommandItem\(item\)\}>/);
  assert.match(monitorShell, /const recommendedCommandItems = useMemo/);
  assert.match(monitorShell, /"intent-import-workspace", "terminal-drawer-open", "action-evidence", "settings-execution"/);
  assert.match(monitorShell, /const commandResultStatusText =/);
  assert.match(monitorShell, /role="status" aria-live="polite" className="command-palette-live-status"/);
  assert.match(monitorShell, /data-command-palette-recommendation=\{item\.id\}/);
  assert.match(monitorShell, /data-command-palette-empty-state="true"/);
  assert.match(css, /\.command-palette-live-status,/);
  assert.match(css, /\.command-palette-recommendations \{/);
  assert.match(css, /\.command-palette-empty-state \{/);
  assert.match(toolStudio, /import \{ ActionGroup \} from "@\/components\/ui\/ActionGroup"/);
  assert.match(toolStudio, /<ActionGroup className="tool-studio-actions"[\s\S]*?align="end" density="compact">/);
  assert.match(css, /\.ui-action-group \{[\s\S]*?display: inline-flex;/);
  assert.match(css, /\.ui-action-group-compact \{[\s\S]*?gap: 6px;/);
  assert.match(css, /\.task-handoff-strip \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-actions \{[\s\S]*?width: 100%;/);
});

test("Runtime display and monitor summary logic are shared modules", () => {
  assert.match(monitorShell, /from "@\/lib\/runtimeDisplay"/);
  assert.match(runtimeTerminalDrawer, /from "@\/lib\/runtimeDisplay"/);
  assert.match(workspaceExplorerPane, /from "@\/lib\/runtimeDisplay"/);
  assert.match(monitorShell, /from "\.\/features\/MonitorSummaryWidgets"/);
  assert.match(runtimeDisplay, /export function formatBytes/);
  assert.match(runtimeDisplay, /export function formatDuration/);
  assert.match(runtimeDisplay, /export function mergeSessionReports/);
  assert.match(runtimeDisplay, /export function mergeNativePtyReports/);
  assert.match(runtimeDisplay, /export function detectOutputEvents/);
  assert.match(monitorSummaryWidgets, /export function Metric/);
  assert.match(monitorSummaryWidgets, /export function HistoryTimeline/);
  assert.doesNotMatch(monitorShell, /function formatBytes/);
  assert.doesNotMatch(monitorShell, /function mergeSessionReports/);
  assert.doesNotMatch(runtimeTerminalDrawer, /function formatDuration/);
  assert.doesNotMatch(workspaceExplorerPane, /function formatBytes/);
});

test("Runtime text defaults expose selectable choices", () => {
  assert.match(runtimeTerminalDrawer, /export type RuntimeTextChoice/);
  assert.match(runtimeTerminalDrawer, /promptKey\?: string/);
  assert.match(runtimeTerminalDrawer, /defaultValue\?: string/);
  assert.match(runtimeTerminalDrawer, /customized\?: boolean/);
  assert.match(runtimeTerminalDrawer, /sessionPromptChoiceKey\?: string/);
  assert.match(runtimeTerminalDrawer, /sessionPromptChoices\?: RuntimeTextChoice\[\]/);
  assert.match(runtimeTerminalDrawer, /onSelectSessionPromptChoice\?: \(choice: RuntimeTextChoice\) => void/);
  assert.match(runtimeTerminalDrawer, /onSaveSessionPromptChoice\?: \(\) => void \| Promise<void>/);
  assert.match(runtimeTerminalDrawer, /onResetSessionPromptChoice\?: \(\) => void \| Promise<void>/);
  assert.match(runtimeTerminalDrawer, /workingDirOptions\?: RuntimeTextChoice\[\]/);
  assert.match(runtimeTerminalDrawer, /runtime-text-choice-grid/);
  assert.match(runtimeTerminalDrawer, /className=\{`\$\{\(choice\.promptKey \|\| choice\.id\) === sessionPromptChoiceKey/);
  assert.match(runtimeTerminalDrawer, /choice\.customized \? "customized" : ""/);
  assert.match(runtimeTerminalDrawer, /onSelectSessionPromptChoice\(choice\)/);
  assert.match(runtimeTerminalDrawer, /onSessionPromptChange\(choice\.value\)/);
  assert.match(runtimeTerminalDrawer, /data-session-prompt-editor/);
  assert.match(runtimeTerminalDrawer, /copy\.savePrompt/);
  assert.match(runtimeTerminalDrawer, /copy\.resetPrompt/);
  assert.match(runtimeTerminalDrawer, /onWorkingDirChange\(choice\.value\)/);
  assert.match(monitorShell, /RuntimeTextChoice/);
  assert.match(desktopTypes, /export type RuntimePromptCustomization = \{/);
  assert.match(desktopTypes, /prompts: RuntimePromptCustomization/);
  assert.match(runtimeSessionPresets, /export function taskPipePromptKeyForPreset\(taskKind: string\)/);
  assert.match(runtimeSessionPresets, /export const sessionModePresets/);
  assert.match(runtimeSessionPresets, /export const fallbackTaskPipePresets/);
  assert.match(runtimeSessionPresets, /export const defaultRuntimeInitDefaults/);
  assert.match(runtimeWorkspaceCopy, /export const nativeWorkspaceCopy/);
  assert.match(monitorShell, /from "\.\/features\/runtimeSessionPresets"/);
  assert.match(monitorShell, /from "\.\/features\/runtimeWorkspaceCopy"/);
  assert.doesNotMatch(monitorShell, /const nativeWorkspaceCopy =/);
  assert.match(monitorShell, /function normalizeRuntimePromptCustomization/);
  assert.match(monitorShell, /const sessionPromptOverrides = runtimeCustomization\.prompts\.sessionPrompts/);
  assert.match(monitorShell, /const taskPipePromptOverrides = runtimeCustomization\.prompts\.taskPipePrompts/);
  assert.match(monitorShell, /const sessionPromptChoices = useMemo<RuntimeTextChoice\[\]>/);
  assert.match(monitorShell, /promptKey: mode\.id/);
  assert.match(monitorShell, /defaultValue: mode\.prompt/);
  assert.match(monitorShell, /customized: Boolean\(override\)/);
  assert.match(monitorShell, /const updateRuntimePromptOverride = useCallback/);
  assert.match(monitorShell, /const selectSessionPromptChoice = useCallback/);
  assert.match(monitorShell, /const saveSessionPromptChoice = useCallback/);
  assert.match(monitorShell, /const resetSessionPromptChoice = useCallback/);
  assert.match(monitorShell, /const workingDirOptions = useMemo<RuntimeTextChoice\[\]>/);
  assert.match(monitorShell, /const taskPipePromptChoices = useMemo<RuntimeTextChoice\[\]>/);
  assert.match(monitorShell, /promptKey: "implementation-pipe"/);
  assert.match(monitorShell, /promptKey: "research-pipe"/);
  assert.match(monitorShell, /promptKey: "review-pipe"/);
  assert.match(monitorShell, /const selectTaskPipePromptChoice = useCallback/);
  assert.match(monitorShell, /const saveTaskPipePromptChoice = useCallback/);
  assert.match(monitorShell, /const resetTaskPipePromptChoice = useCallback/);
  assert.match(monitorShell, /sessionPromptChoices=\{sessionPromptChoices\}/);
  assert.match(monitorShell, /sessionPromptChoiceKey=\{activeSessionPromptKey\}/);
  assert.match(monitorShell, /onSaveSessionPromptChoice=\{saveSessionPromptChoice\}/);
  assert.match(monitorShell, /onResetSessionPromptChoice=\{resetSessionPromptChoice\}/);
  assert.match(monitorShell, /workingDirOptions=\{workingDirOptions\}/);
  assert.match(monitorShell, /setTaskPipePrompt\(choice\.value\)/);
  assert.match(monitorShell, /data-task-pipe-prompt-editor/);
  assert.match(css, /\.runtime-text-choice-grid \{/);
  assert.match(css, /\.runtime-text-choice-grid button\.customized \{/);
  assert.match(css, /\.prompt-edit-actions \{/);
  assert.match(css, /--choice-bg:/);
  assert.match(css, /--choice-shadow:/);
  assert.match(css, /--choice-active-shadow:/);
  assert.match(css, /\.runtime-text-choice-grid\.compact button \{[\s\S]*?min-height: 44px;/);
  assert.match(css, /\.task-pipe-controls \.task-prompt-choice-field/);
});

test("Native PTY terminal exposes search, clipboard, and quick command controls", () => {
  assert.equal(packageJson.dependencies["@xterm/addon-search"], "0.16.0");
  assert.match(runtimeTerminalDrawer, /import \{ readClipboardText, writeClipboardText \} from "@\/lib\/clipboard\.mjs"/);
  assert.match(runtimeTerminalDrawer, /import\("@xterm\/addon-search"\)/);
  assert.match(runtimeTerminalDrawer, /new SearchAddon\(\)/);
  assert.match(runtimeTerminalDrawer, /searchAddonRef\.current\.findNext/);
  assert.match(runtimeTerminalDrawer, /searchAddonRef\.current\.findPrevious/);
  assert.match(runtimeTerminalDrawer, /data-terminal-command-center/);
  assert.match(runtimeTerminalDrawer, /data-terminal-readiness/);
  assert.match(runtimeTerminalDrawer, /data-terminal-start-command-center/);
  assert.match(runtimeTerminalDrawer, /data-terminal-primary-action="start-session"/);
  assert.match(runtimeTerminalDrawer, /data-terminal-primary-action="open-native-pty"/);
  assert.match(runtimeTerminalDrawer, /data-terminal-primary-action="run-cli-setup"/);
  assert.match(runtimeTerminalDrawer, /terminal-advanced-start/);
  assert.match(runtimeTerminalDrawer, /data-terminal-usage-guide/);
  assert.match(runtimeTerminalDrawer, /terminalGuidePty/);
  assert.match(runtimeTerminalDrawer, /terminalGuideAccount/);
  assert.match(runtimeTerminalDrawer, /data-terminal-search-input/);
  assert.match(runtimeTerminalDrawer, /data-terminal-action="copy-selection"/);
  assert.match(runtimeTerminalDrawer, /data-terminal-action="paste"/);
  assert.match(runtimeTerminalDrawer, /data-terminal-action="clear"/);
  assert.match(runtimeTerminalDrawer, /data-terminal-action="fit"/);
  assert.match(runtimeTerminalDrawer, /data-terminal-quick-commands/);
  assert.match(runtimeTerminalDrawer, /nativePtyQuickActions/);
  assert.match(runtimeTerminalDrawer, /terminal\.attachCustomKeyEventHandler/);
  assert.match(runtimeTerminalDrawer, /readClipboardText\(\)/);
  assert.match(runtimeTerminalDrawer, /terminal\?\.clear\(\)/);
  assert.match(runtimeTerminalDrawer, /terminalCopySelection|copyTerminalSelection/);
  assert.match(css, /\.native-pty-command-center \{/);
  assert.match(css, /\.terminal-readiness-strip \{/);
  assert.match(css, /\.terminal-start-command-center \{/);
  assert.match(css, /\.terminal-start-action-grid \{/);
  assert.match(css, /\.terminal-advanced-start \{/);
  assert.match(css, /\.terminal-usage-guide \{/);
  assert.match(css, /\.native-pty-search-control \{/);
  assert.match(css, /\.native-pty-toolbar \{/);
  assert.match(css, /\.native-pty-quick-commands \{/);
  assert.match(css, /\.native-pty-terminal-stage \{/);
});

test("Desktop Runtime exposes an open-source-informed Agent CLI cockpit", () => {
  assert.match(monitorShell, /"start-terminal-agent-bridge"/);
  assert.match(monitorShell, /"plan-subagent-tools"/);
  assert.match(monitorShell, /createCliAdapterSession/);
  assert.match(monitorShell, /createNativePtySession/);
  assert.match(monitorShell, /startSelectedLaneAction/);
  assert.match(monitorShell, /startTerminalAgentBridge/);
  assert.match(monitorShell, /planSubagentTools/);
  assert.match(monitorShell, /executeSubagentTools/);
  assert.match(monitorShell, /fanoutSubagentTools/);
  assert.match(monitorShell, /selectedSubagentToolNames/);
  assert.match(monitorShell, /maxSubagentFanoutSelections = 3/);
  assert.match(monitorShell, /defaultSubagentFanoutSelections = 2/);
  assert.match(monitorShell, /toggleSubagentToolSelection/);
  assert.match(monitorShell, /selectedSubagentFanoutToolNames/);
  assert.match(monitorShell, /run_subagent_tool_plan/);
  assert.match(monitorShell, /start_subagent_tool_execution/);
  assert.match(monitorShell, /start_subagent_tool_fanout/);
  assert.match(monitorShell, /toolNames: selectedSubagentFanoutToolNames/);
  assert.match(monitorShell, /maxSessions: selectedSubagentFanoutToolNames\.length/);
  assert.match(monitorShell, /data-terminal-agent-bridge="pty-to-agent"/);
  assert.match(monitorShell, /data-terminal-agent-step=\{step\.id\}/);
  assert.match(monitorShell, /data-terminal-agent-action="connect-start"/);
  assert.match(monitorShell, /data-terminal-agent-action="open-terminal"/);
  assert.match(monitorShell, /data-terminal-agent-action="plan-subagents"/);
  assert.match(monitorShell, /data-terminal-agent-action="execute-subagent"/);
  assert.match(monitorShell, /data-terminal-agent-action="fanout-subagents"/);
  assert.match(monitorShell, /data-subagent-tool-plan-result/);
  assert.match(monitorShell, /data-subagent-tool-selector/);
  assert.match(monitorShell, /data-subagent-tool-selected-count/);
  assert.match(monitorShell, /data-subagent-tool-option=\{tool\.toolName\}/);
  assert.match(monitorShell, /data-subagent-tool-checkbox=\{tool\.toolName\}/);
  assert.match(monitorShell, /data-subagent-tool-execution-result/);
  assert.match(monitorShell, /data-subagent-tool-fanout-result/);
  assert.match(monitorShell, /data-desktop-action-feedback="start-terminal-agent-bridge"/);
  assert.match(monitorShell, /data-desktop-action-feedback="plan-subagent-tools"/);
  assert.match(monitorShell, /data-desktop-action-feedback="execute-subagent-tools"/);
  assert.match(monitorShell, /data-desktop-action-feedback="fanout-subagent-tools"/);
  assert.match(monitorShell, /setPipelineReports\(\(current\) => \[report, \.\.\.current\]\.slice\(0, 8\)\)/);
  assert.match(monitorShell, /isActiveSessionStatus\(activePty\.status\)/);
  assert.match(monitorShell, /data-agent-cli-cockpit="open-source-control-plane"/);
  assert.match(monitorShell, /Agent CLI Cockpit/);
  assert.match(monitorShell, /openSourceControlPlanePatterns/);
  assert.match(monitorShell, /CAO/);
  assert.match(monitorShell, /Agentify/);
  assert.match(monitorShell, /ClawX \/ OpenLoaf/);
  assert.match(monitorShell, /agentCliCockpitRows = adapters\.map/);
  assert.match(monitorShell, /providerAuthStatusForAdapter\(adapter\.adapterId, providerCredentialReport, uiLanguage\)/);
  assert.match(monitorShell, /startAdapterFromCockpit/);
  assert.match(monitorShell, /agent-cli-cockpit-tally/);
  assert.match(monitorShell, /agent-cli-cockpit-grid/);
  assert.match(monitorShell, /agent-cli-cockpit-signals/);
  assert.match(monitorShell, /row\.activeAdapterSessions\.length/);
  assert.match(monitorShell, /row\.adapterTaskRuns\.length/);
  assert.match(monitorShell, /row\.adapterDecisionItems/);
  assert.match(tauriCargo, /os_pipe = "1\.2\.3"/);
  assert.match(tauriLib, /use os_pipe::pipe/);
  assert.match(tauriLib, /struct NativePipeProbeRequest/);
  assert.match(tauriLib, /fn run_native_pipe_probe/);
  assert.match(css, /\.subagent-tool-selector \{/);
  assert.match(css, /\.subagent-tool-option \{/);
  assert.match(css, /\.subagent-tool-option\.selected \{/);
  assert.match(tauriLib, /run_native_pipe_probe,/);
  assert.match(tauriLib, /pipe_kind: "os_pipe_stdout_to_stdin"/);
  assert.match(tauriLib, /fn run_subagent_tool_plan/);
  assert.match(tauriLib, /run_subagent_tool_plan,/);
  assert.match(tauriLib, /fn start_subagent_tool_execution/);
  assert.match(tauriLib, /start_subagent_tool_execution,/);
  assert.match(tauriLib, /fn start_subagent_tool_fanout/);
  assert.match(tauriLib, /start_subagent_tool_fanout,/);
  assert.match(tauriLib, /subagent_tool_from_plan_record/);
  assert.match(tauriLib, /select_subagent_fanout_tools/);
  assert.match(tauriLib, /create_cli_session\([\s\S]*"subagent_tool_execution"/);
  assert.match(tauriLib, /create_cli_session\([\s\S]*"subagent_tool_fanout"/);
  assert.match(tauriLib, /MAX_SUBAGENT_FANOUT_SESSIONS: usize = 3/);
  assert.match(tauriLib, /DEFAULT_SUBAGENT_FANOUT_SESSIONS: usize = 2/);
  assert.match(tauriLib, /Some\(&input\.plan_task_run_id\)/);
  assert.match(tauriLib, /plan-agent-orchestration/);
  assert.match(css, /\.terminal-agent-bridge \{/);
  assert.match(css, /\.terminal-agent-bridge-steps \{/);
  assert.match(css, /\.terminal-agent-bridge-steps article\.state-ready/);
  assert.match(css, /\.terminal-agent-bridge-actions button\.desktop-action-current\.status-failed/);
  assert.match(css, /\.terminal-agent-plan-result \{/);
  assert.match(css, /\.terminal-agent-plan-result\.execution \{/);
  assert.match(css, /\.terminal-agent-plan-result\.fanout \{/);
  assert.match(css, /\.agent-cli-cockpit \{/);
  assert.match(css, /\.agent-cli-pattern-strip \{/);
  assert.match(css, /\.agent-cli-cockpit-grid \{/);
  assert.match(css, /\.agent-cli-cockpit-card\.selected/);
  assert.match(css, /\.agent-cli-command-stack \{[\s\S]*?grid-template-columns: repeat\(auto-fit, minmax\(112px, 1fr\)\);/);
  assert.match(css, /\.agent-cli-cockpit-actions button:disabled/);
});

test("Desktop Runtime exposes bounded native OS workspace actions", () => {
  assert.match(tauriLib, /struct NativeOsActionRequest/);
  assert.match(tauriLib, /fn run_native_os_action/);
  assert.match(tauriLib, /run_native_os_action,/);
  assert.match(tauriLib, /open_external_terminal/);
  assert.match(tauriLib, /reveal_item_in_dir/);
  assert.match(monitorShell, /runNativeWorkspaceOsAction/);
  assert.match(monitorShell, /data-desktop-action-feedback="reveal-workspace"/);
  assert.match(monitorShell, /data-desktop-action-feedback="open-workspace-path"/);
  assert.match(monitorShell, /data-desktop-action-feedback="open-external-terminal"/);
});

test("Desktop Runtime exposes feature-split Rust runtime map", () => {
  const tauriSrcRoot = path.resolve(projectRoot, "..", "..", "src-tauri", "src");
  for (const featureModule of [
    "mod.rs",
    "app_shell.rs",
    "cli.rs",
    "native.rs",
    "workspace.rs",
    "providers.rs",
    "diagnostics.rs",
    "agent_factory.rs",
    "decisions.rs"
  ]) {
    assert.equal(fs.existsSync(path.join(tauriSrcRoot, "features", featureModule)), true);
  }
  const featureMap = fs.readFileSync(path.join(tauriSrcRoot, "features", "mod.rs"), "utf8");
  assert.match(tauriLib, /mod features/);
  assert.match(tauriRuntimeSource, /fn get_rust_runtime_feature_map/);
  assert.match(tauriRuntimeSource, /get_rust_runtime_feature_map/);
  assert.match(featureMap, /NativeRuntimeFeatureMapReport/);
  assert.match(featureMap, /rust-runtime-feature-map\.v1/);
  assert.match(monitorShell, /RustRuntimeFeatureMapReport/);
  assert.match(monitorShell, /"get_rust_runtime_feature_map"/);
  assert.match(monitorShell, /Rust 모듈/);
  assert.match(monitorShell, /Rust 명령/);
});

test("CLI setup keeps settings scroll ownership isolated", () => {
  const cliSetupGuideRule = readCssRule(".cli-adapter-setup-guide");
  const cliCommandCopyRowRule = readCssRule(".cli-command-copy-row");
  const agentCliCommandStackRule = readCssRule(".agent-cli-command-stack");

  assert.match(monitorShell, /className="settings-dialog-backdrop"/);
  assert.match(monitorShell, /className="settings-tab-panel" tabIndex=\{0\}/);
  assert.match(monitorShell, /className="settings-pane wide cli-adapter-setup-guide"/);
  assert.match(monitorShell, /className="cli-setup-stepper"/);
  assert.match(monitorShell, /className="cli-command-copy-row"/);
  assert.match(monitorShell, /className="agent-cli-command-stack"/);
  assert.match(css, /\.settings-dialog-backdrop \{[\s\S]*?overflow: hidden;[\s\S]*?overscroll-behavior: none;/);
  assert.match(css, /\.settings-dialog \{[\s\S]*?height: min\(820px, calc\(100dvh - \(var\(--space-4\) \* 2\)\)\);[\s\S]*?overflow: hidden;/);
  assert.match(css, /\.settings-dialog-body \{[\s\S]*?overflow: hidden;/);
  assert.match(css, /\.settings-tab-panel \{[\s\S]*?overflow-x: hidden;[\s\S]*?overflow-y: auto;[\s\S]*?overscroll-behavior: contain;/);
  assert.match(css, /\.settings-subsection-rail \{[\s\S]*?overflow-x: auto;[\s\S]*?overflow-y: hidden;/);
  assert.match(css, /\.cli-adapter-setup-guide \{[\s\S]*?overflow: visible;/);
  assert.match(css, /\.cli-setup-stepper \{[\s\S]*?grid-template-columns: repeat\(auto-fit, minmax\(220px, 1fr\)\);[\s\S]*?overflow: visible;/);
  assert.match(css, /\.cli-command-copy-row \{[\s\S]*?display: grid;[\s\S]*?grid-template-columns: repeat\(auto-fit, minmax\(170px, 1fr\)\);[\s\S]*?overflow: visible;/);
  assert.match(css, /\.agent-cli-command-stack \{[\s\S]*?grid-template-columns: repeat\(auto-fit, minmax\(112px, 1fr\)\);[\s\S]*?overflow: visible;/);
  assert.doesNotMatch(cliSetupGuideRule, /overflow-y: auto;/);
  assert.doesNotMatch(cliCommandCopyRowRule, /overflow-x: auto;/);
  assert.doesNotMatch(agentCliCommandStackRule, /overflow-x: auto;/);
});

test("Search agent provider and model settings use explicit choices", () => {
  assert.match(searchAgentWorkChatPanel, /const modelChoiceOptions = useMemo/);
  assert.match(searchAgentWorkChatPanel, /const chatbotConnectionItems = useMemo/);
  assert.match(monitorShell, /id: "connect-chatbot"/);
  assert.match(monitorShell, /label: uiLanguage === "ko" \? "고급 에이전트 채팅" : "Advanced Agent Chat"/);
  assert.match(searchAgentWorkChatPanel, /agent-provider-choice-grid/);
  assert.match(searchAgentWorkChatPanel, /agent-model-choice-grid/);
  assert.match(searchAgentWorkChatPanel, /data-chatbot-connection="search-agent"/);
  assert.match(searchAgentWorkChatPanel, /data-chatbot-connection-item=\{item\.id\}/);
  assert.match(monitorShell, /onOpenProviderSettings=\{openProviderSettings\}/);
  assert.match(searchAgentWorkChatPanel, /onClick=\{\(\) => onChange\("providerId", provider\.providerId\)\}/);
  assert.match(searchAgentWorkChatPanel, /onClick=\{\(\) => onChange\("model", choice\.value\)\}/);
  assert.doesNotMatch(searchAgentWorkChatPanel, /<datalist id="search-agent-model-options">/);
  assert.doesNotMatch(searchAgentWorkChatPanel, /list="search-agent-model-options"/);
  assert.match(css, /\.agent-provider-choice-grid,/);
  assert.match(css, /\.agent-model-choice-grid button\.active/);
  assert.match(css, /\.agent-chat-connection-strip \{/);
  assert.match(css, /\.agent-chat-connection-grid \{/);
  assert.match(css, /\.agent-chat-connection-actions button \{/);
  assert.match(css, /\.agent-provider-choice-grid button,[\s\S]*?box-shadow: var\(--control-shadow\);/);
});

test("Provider account settings expose guided login and model setup controls", () => {
  assert.match(providerPanelSource, /AI 로그인 설정/);
  assert.match(providerPanelSource, /provider-login-guide/);
  assert.match(providerPanelSource, /loginSetup: "키 발급"/);
  assert.match(providerPanelSource, /open=\{guideOpen\}/);
  assert.match(runtimeCatalog, /https:\/\/platform\.openai\.com\/api-keys/);
  assert.match(runtimeCatalog, /https:\/\/aistudio\.google\.com\/api-keys/);
  assert.match(providerPanelSource, /onOpenUrl\(provider, "setup"\)/);
  assert.match(providerPanelSource, /provider-filter-choice/);
  assert.match(providerAccountSettingsHook, /export function useProviderAccountSettings/);
  assert.match(providerAccountSettingsHook, /ProviderActionFeedback/);
  assert.match(providerAccountSettingsHook, /list_provider_credentials/);
  assert.match(providerAccountSettingsHook, /providerModelRequestSeqRef/);
  assert.match(providerAccountSettingsHook, /const isCurrentModelRequest = \(\) => providerModelRequestSeqRef\.current === requestSeq/);
  assert.match(providerAccountSettingsHook, /if \(!isCurrentModelRequest\(\)\) \{\s*return;\s*\}/);
  assert.match(providerAccountSettingsHook, /if \(isCurrentModelRequest\(\)\) \{[\s\S]*?setProviderModelBusy\(false\)/);
  assert.match(providerAccountSettingsHook, /requestRuntimeSettingsSync\("provider-save"\)/);
  assert.match(providerPanelSource, /providerPanelFeedbackId/);
  assert.match(monitorShell, /useProviderAccountSettings/);
  assert.match(monitorShell, /actionFeedback=\{providerActionFeedback\}/);
  assert.doesNotMatch(monitorShell, /const \[providerCredentials, setProviderCredentials\]/);
  assert.doesNotMatch(monitorShell, /async function refreshProviderModels/);
  assert.match(providerPanelSource, /feedbackBadge/);
  assert.match(providerPanelSource, /provider-button-status/);
  assert.match(providerPanelSource, /provider-action-live-region/);
  assert.match(providerPanelSource, /has-provider-status/);
  assert.match(providerPanelSource, /onRefreshModels\(provider\.providerId\)/);
  assert.match(providerPanelSource, /onUseProvider\(provider, model\.id\)/);
  assert.match(css, /\.provider-login-guide \{/);
  assert.match(css, /\.provider-filter-choice button\.active,/);
  assert.match(css, /\.provider-model-strip \{/);
  assert.match(css, /\.provider-model-choice/);
  assert.match(css, /\.provider-button-status \{[\s\S]*?position: absolute;/);
  assert.match(css, /\.provider-action-live-region \{[\s\S]*?position: absolute;[\s\S]*?width: 1px;/);
  assert.doesNotMatch(providerPanelSource, /\{error && <p className="desktop-error">\{error\}<\/p>\}/);
  assert.doesNotMatch(providerPanelSource, /\{notice && <p className="decision-resume-notice">\{notice\}<\/p>\}/);
});

test("Runtime customization settings persist and drive native execution", () => {
  assert.match(desktopTypes, /export type RuntimeCustomization = \{/);
  assert.match(monitorShell, /runtimeCustomization: RuntimeCustomization/);
  assert.match(runtimeCatalog, /export const defaultRuntimeCustomization: RuntimeCustomization = \{/);
  assert.match(runtimeCatalog, /prompts:\s*\{[\s\S]*?sessionPrompts: \{\},[\s\S]*?taskPipePrompts: \{\}/);
  assert.match(runtimeCatalog, /runtimeProviderDefaultBaseUrls/);
  assert.match(monitorShell, /function normalizeRuntimeCustomization/);
  assert.match(monitorShell, /prompts: normalizeRuntimePromptCustomization\(customization\?\.prompts\)/);
  assert.match(monitorShell, /setRuntimeCustomization\(preferences\.runtimeCustomization\)/);
  assert.match(monitorShell, /runtimeCustomization,\n\s+pinnedSections/);
  assert.match(monitorShell, /id: "customization"/);
  assert.match(runtimeCustomizationPanel, /data-runtime-customization-panel/);
  assert.match(runtimeCustomizationPanel, /data-runtime-provider-model=\{provider\.providerId\}/);
  assert.match(runtimeCustomizationPanel, /data-runtime-provider-base-url=\{provider\.providerId\}/);
  assert.match(runtimeCustomizationPanel, /data-runtime-terminal-shell/);
  assert.match(runtimeCustomizationPanel, /data-runtime-terminal-startup-command/);
  assert.match(runtimeCustomizationPanel, /data-runtime-quick-command-input=\{index\}/);
  assert.match(monitorShell, /effectiveDefaultModelForProvider=\{effectiveProviderModelFor\}/);
  assert.match(monitorShell, /model: modelId \|\| effectiveProviderModelFor\(provider\)/);
  assert.match(monitorShell, /args\.command = shellCommand/);
  assert.match(monitorShell, /write_native_pty_terminal_input"[\s\S]*?startupInput/);
  assert.match(monitorShell, /nativePtyQuickCommands=\{runtimeQuickCommands\}/);
  assert.match(runtimeTerminalDrawer, /export type NativePtyQuickCommand = \{/);
  assert.match(runtimeTerminalDrawer, /nativePtyQuickCommands\?: NativePtyQuickCommand\[\]/);
  assert.match(runtimeTerminalDrawer, /quickCommands=\{nativePtyQuickCommands\?\.length \? nativePtyQuickCommands : nativePtyQuickActions\[uiLanguage\]\}/);
  assert.match(css, /\.runtime-customization-grid \{/);
  assert.match(css, /\.runtime-provider-custom-card,\n\.runtime-quick-command-row \{/);
  assert.match(css, /\.runtime-shell-preset-row button\.active/);
  assert.match(css, /\.runtime-custom-fields textarea \{/);
  assert.match(tauriLib, /struct DesktopRuntimeCustomization/);
  assert.match(tauriLib, /struct DesktopPromptCustomization/);
  assert.match(tauriLib, /MAX_RUNTIME_PROMPT_CHARS: usize = 4_000/);
  assert.match(tauriLib, /runtime_customization: DesktopRuntimeCustomization/);
  assert.match(tauriLib, /fn normalize_runtime_customization/);
  assert.match(tauriLib, /fn normalize_prompt_customization/);
  assert.match(tauriLib, /fn desktop_prompt_customization_keeps_only_allowed_prompt_keys/);
  assert.match(tauriRuntimeSource, /provider_base_url_is_valid/);
  assert.match(tauriRuntimeSource, /provider_default_base_url/);
  assert.match(tauriRuntimeSource, /list_provider_models_report\(&app, &provider_id\)/);
  assert.match(tauriRuntimeSource, /call_provider_api\([\s\S]*?definition,[\s\S]*?&secret,[\s\S]*?&model,[\s\S]*?&base_url/);
  assert.match(tauriRuntimeSource, /fn provider_endpoint\(base_url: &str, endpoint_path: &str\)/);
  assert.match(tauriRuntimeSource, /\.post\(provider_endpoint\(base_url, "\/responses"\)\)/);
});

test("CLI adapter settings expose beginner setup steps and copyable commands", () => {
  assert.match(desktopTypes, /authHint: LocalizedText;/);
  assert.match(desktopTypes, /firstRunCommand: LocalizedText;/);
  assert.match(desktopTypes, /expectedResult: LocalizedText;/);
  assert.match(desktopTypes, /export type RuntimeTerminalSetupCheckReport = \{/);
  assert.match(monitorShell, /const runRuntimeSetupCheck = async \(\) => \{/);
  assert.match(monitorShell, /check_runtime_terminal_setup/);
  assert.match(monitorShell, /data-runtime-setup-check-action="settings"/);
  assert.match(monitorShell, /data-runtime-setup-check="settings"/);
  assert.match(monitorShell, /data-runtime-setup-check-terminal=\{selectedRuntimeTerminalCheck\?\.status \|\| "not-checked"\}/);
  assert.match(monitorShell, /data-runtime-setup-check-cli=\{selectedRuntimeSetupCliCheck\?\.status \|\| "not-checked"\}/);
  assert.match(monitorShell, /function adapterAuthReadyForAdapter/);
  assert.match(monitorShell, /const runtimeAdapterSetupSteps = \[/);
  assert.match(monitorShell, /data-cli-adapter-setup-guide="settings"/);
  assert.match(monitorShell, /className="cli-adapter-picker-grid"/);
  assert.match(monitorShell, /data-cli-setup-step=\{step\.id\}/);
  assert.match(monitorShell, /data-cli-command-copy=\{step\.id\}/);
  assert.match(monitorShell, /className="cli-command-copy-row"/);
  assert.match(monitorShell, /className="cli-adapter-setup-outcome"/);
  assert.match(monitorShell, /data-agent-cli-setup-ladder=\{row\.adapter\.adapterId\}/);
  assert.match(monitorShell, /data-cli-command-copy=\{`\$\{row\.adapter\.adapterId\}:\$\{step\.id\}`\}/);
  assert.match(monitorShell, /className="agent-cli-command-stack"/);
  assert.match(css, /\.cli-adapter-setup-guide \{/);
  assert.match(css, /\.cli-adapter-picker-grid \{/);
  assert.match(css, /\.cli-setup-stepper article\.ready \{/);
  assert.match(css, /\.cli-command-copy-row button \{/);
  assert.match(css, /\.runtime-setup-check-panel \{/);
  assert.match(css, /\.runtime-setup-check-grid article\.ready \{/);
  assert.match(css, /\.runtime-setup-check-grid article\.failed \{/);
  assert.match(css, /\.agent-cli-setup-ladder \{/);
  assert.match(css, /\.agent-cli-command-stack button \{/);
  assert.match(tauriLib, /struct RuntimeTerminalSetupCheckReport/);
  assert.match(tauriLib, /fn check_runtime_terminal_setup/);
  assert.match(tauriLib, /check_runtime_terminal_setup,/);
});

test("Choice and search controls have compact tonal hierarchy", () => {
  assert.match(css, /\.settings-segment-list \{[\s\S]*?display: flex;/);
  assert.match(css, /\.settings-segment-list button \{[\s\S]*?min-width: 104px;[\s\S]*?min-height: var\(--control-compact-target-size\);/);
  assert.match(css, /\.settings-option-list button,[\s\S]*?background: var\(--choice-bg\);[\s\S]*?box-shadow: var\(--choice-shadow\);/);
  assert.match(css, /\.settings-option-list button\.active,[\s\S]*?background: var\(--choice-selected-bg\);[\s\S]*?box-shadow: var\(--choice-active-shadow\);/);
  assert.match(css, /\.command-palette-results button \{[\s\S]*?min-height: 52px;/);
  assert.match(css, /\.search-box,[\s\S]*?box-shadow: var\(--search-shadow\);/);
  assert.match(css, /\.quick-start-flow button,[\s\S]*?min-height: 64px;/);
  assert.match(css, /\.desktop-command-grid button \{[\s\S]*?min-height: 66px;/);
});

test("Workspace monitor encodes theory-backed desktop visual hierarchy tokens", () => {
  assert.match(monitorShell, /data-ui-foundation="gestalt-hierarchy-density"/);
  assert.match(css, /--grid-unit: 4px;/);
  assert.match(css, /--space-4: 16px;/);
  assert.match(css, /--surface-depth-focus:/);
  assert.match(css, /--surface-depth-selected:/);
  assert.match(css, /--hierarchy-border:/);
  assert.match(css, /--state-hover-surface:/);
  assert.match(css, /--focus-halo-size: 4px;/);
  assert.match(css, /--font-size-lg: 1\.0625rem;/);
  assert.match(css, /\.desktop-app-root :where\(button, a, input, textarea, \[role="button"\], \[role="tab"\], \[tabindex\]\):focus-visible \{[\s\S]*?box-shadow: 0 0 0 var\(--focus-halo-size\) var\(--focus-halo\);/);
  assert.match(css, /\.ui-button:hover:not\(:disabled\) \{[\s\S]*?background: var\(--state-hover-surface\);/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.settings-dialog,[\s\S]*?\.adapter-card,[\s\S]*?\.home-navigation-dock[\s\S]*?\) \{[\s\S]*?box-shadow: var\(--surface-shadow-low\), var\(--hairline-shadow\);/);
  assert.match(css, /\.settings-tab-list button:hover:not\(:disabled\):not\(\.active\) \{[\s\S]*?background: var\(--state-hover-surface\);/);
  assert.match(css, /\.task-flow-rail button:hover:not\(:disabled\) \{[\s\S]*?border-color: var\(--state-hover-border\);/);
  assert.match(css, /@media \(hover: hover\) \{[\s\S]*?\.desktop-app-root button:not\(:disabled\):hover \{[\s\S]*?border-color: var\(--state-hover-border\);/);
});

test("Desktop titlebar uses native Tauri drag regions without stealing controls", () => {
  assert.match(monitorShell, /<header className="desktop-titlebar" data-tauri-drag-region="deep">/);
  assert.match(monitorShell, /className="titlebar-section" data-tauri-drag-region="deep"/);
  assert.match(monitorShell, /<ActionGroup className="titlebar-actions"[\s\S]*?data-tauri-drag-region="false"/);
  assert.match(monitorShell, /className="titlebar-search" data-tauri-drag-region="false"/);
  assert.match(css, /\.desktop-titlebar \{[\s\S]*?-webkit-app-region: drag;/);
  assert.match(css, /\.titlebar-actions,[\s\S]*?\.titlebar-search,[\s\S]*?-webkit-app-region: no-drag;/);
});

test("Tabs expose clear visual selected states and ARIA selection", () => {
  assert.match(monitorShell, /<nav className="settings-tab-list" role="tablist"/);
  assert.match(monitorShell, /role="tab"[\s\S]*?aria-selected=\{settingsTab === item\.id\}/);
  assert.match(sourceWorkbenchVisualSource, /<div className="source-editor-tabs" role="tablist"/);
  assert.match(sourceWorkbenchVisualSource, /className=\{`source-editor-tab \$\{activeDraft \? "active" : ""\}/);
  assert.match(sourceWorkbenchVisualSource, /role="tab"[\s\S]*?aria-selected=\{activeDraft\}/);
  assert.match(css, /--tab-selected-indicator:/);
  assert.match(css, /--tab-selected-border:/);
  assert.match(css, /--tab-selected-shadow:/);
  assert.match(css, /\.settings-tab-list button::before,[\s\S]*?\.tool-studio-mode-rail button::before \{[\s\S]*?background: var\(--tab-selected-indicator\);/);
  assert.match(css, /\.settings-tab-list button\.active::before,[\s\S]*?\.tool-studio-mode-rail button\.active::before \{[\s\S]*?opacity: 1;[\s\S]*?transform: scaleX\(1\);/);
  assert.match(css, /\.section-tabs button\.active \{[\s\S]*?border-color: var\(--tab-selected-border\);[\s\S]*?box-shadow: var\(--tab-selected-shadow\);/);
  assert.match(css, /\.source-editor-tab::before \{[\s\S]*?width: 4px;[\s\S]*?background: var\(--tab-selected-indicator\);/);
  assert.match(css, /\.source-editor-tab\.active::before \{[\s\S]*?transform: scaleY\(1\);/);
  assert.match(css, /\.tool-studio-depth-rail button\.active,[\s\S]*?\.tool-studio-mode-rail button\.active \{[\s\S]*?box-shadow: var\(--tab-selected-shadow\);/);
});

test("Desktop shell separates IntelliJ-style tool window stripe and editor plane", () => {
  assert.match(monitorShell, /data-layout-model="intellij-tool-window-editor"/);
  assert.match(desktopActivityRail, /data-intellij-zone="tool-window-stripe"/);
  assert.match(monitorShell, /data-intellij-zone="editor-plane"/);
  assert.match(css, /--ide-tool-window-bg:/);
  assert.match(css, /--ide-tool-window-border:/);
  assert.match(css, /--ide-editor-bg:/);
  assert.match(css, /--ide-editor-separator:/);
  assert.match(css, /--ide-titlebar-bg:/);
  assert.match(css, /\.desktop-app-shell \{[\s\S]*?isolation: isolate;[\s\S]*?background: var\(--ide-editor-bg\);/);
  assert.match(css, /\.activity-rail \{[\s\S]*?isolation: isolate;[\s\S]*?border-right: 1px solid var\(--ide-tool-window-border\);[\s\S]*?var\(--ide-tool-window-bg\);/);
  assert.match(css, /\.activity-rail::after \{[\s\S]*?background: var\(--ide-editor-separator\);/);
  assert.match(css, /\.desktop-viewport \{[\s\S]*?--viewport-inline-padding: clamp\(18px, 2\.2vw, 30px\);[\s\S]*?background: var\(--ide-editor-bg\);[\s\S]*?box-shadow: inset 1px 0 0 var\(--ide-editor-separator\)/);
  assert.match(css, /\.desktop-titlebar \{[\s\S]*?margin-inline: calc\(var\(--viewport-inline-padding\) \* -1\);[\s\S]*?background: var\(--ide-titlebar-bg\);[\s\S]*?padding: var\(--space-3\) var\(--viewport-inline-padding\) var\(--space-3\);/);
});

test("Workspace monitor replaces native select dropdowns with styled app choices", () => {
  assert.doesNotMatch(monitorShell, /<select\b/);
  assert.match(monitorShell, /function AppChoiceMenu/);
  assert.match(monitorShell, /function AppChoiceButtonGroup/);
  assert.match(monitorShell, /document-filter-choice/);
  assert.match(monitorShell, /history-date-choice/);
  assert.match(agentBuilderPanels, /learning-action-choice-grid/);
  assert.match(monitorShell, /decision-answer-type-choices/);
  assert.match(css, /\.app-choice-menu-trigger \{/);
  assert.match(css, /\.app-choice-button-group button\.active \{/);
  assert.match(css, /\.decision-answer-controls > button \{/);
});

test("Popup menus escape scroll panes and keep their own bounded scroll", () => {
  const appChoiceMenuRule = readCssRule(".app-choice-menu");
  const sourceFilePickerMenuRule = readCssRule(".source-file-picker-menu");

  assert.match(css, /--popup-layer-z: 160;/);
  assert.match(css, /--popup-max-block-size: min\(420px, calc\(100dvh - \(var\(--popup-viewport-gap\) \* 2\)\)\);/);
  assert.match(monitorShell, /<DropdownMenu\.Portal>[\s\S]*?<DropdownMenu\.Content className="app-choice-menu"[\s\S]*?collisionPadding=\{16\}/);
  assert.match(sourceWorkbenchVisualSource, /<DropdownMenu\.Portal>[\s\S]*?<DropdownMenu\.Content className="source-file-picker-menu"[\s\S]*?collisionPadding=\{16\}/);
  assert.match(toolStudio, /<DropdownMenu\.Content className="tool-menu-content" sideOffset=\{8\} align="end" collisionPadding=\{16\}/);
  assert.match(toolStudio, /<ContextMenu\.Content className="tool-context-content" collisionPadding=\{16\}/);
  assert.match(appChoiceMenuRule, /--popup-available-block-size: var\(--radix-dropdown-menu-content-available-height, var\(--popup-max-block-size\)\);/);
  assert.match(appChoiceMenuRule, /max-height: min\(var\(--popup-max-block-size\), var\(--popup-available-block-size\)\);/);
  assert.match(appChoiceMenuRule, /overflow: auto;/);
  assert.match(appChoiceMenuRule, /overscroll-behavior: contain;/);
  assert.match(sourceFilePickerMenuRule, /--popup-available-block-size: var\(--radix-dropdown-menu-content-available-height, var\(--popup-max-block-size\)\);/);
  assert.match(sourceFilePickerMenuRule, /max-height: min\(var\(--popup-max-block-size\), var\(--popup-available-block-size\)\);/);
  assert.match(css, /\.tool-menu-content,[\s\S]*?\.tool-context-content \{[\s\S]*?max-height: min\(var\(--popup-max-block-size\), var\(--popup-available-block-size\)\);[\s\S]*?overscroll-behavior: contain;/);
  assert.match(css, /\.tool-context-content \{[\s\S]*?--popup-available-block-size: var\(--radix-context-menu-content-available-height, var\(--popup-max-block-size\)\);/);
});

test("Overlay surfaces share focus containment and explicit layer ordering", () => {
  const commandPaletteBackdropRule = readCssRule(".command-palette-backdrop");
  const commandPaletteRule = readCssRule(".command-palette");
  const settingsDialogBackdropRule = readCssRule(".settings-dialog-backdrop");
  const terminalDrawerBackdropRule = readCssRule(".terminal-drawer-backdrop");
  const terminalDrawerRule = readCssRule(".terminal-drawer");
  const terminalDrawerClosedRule = readCssRule(".terminal-drawer.closed");

  assert.match(css, /--overlay-dialog-z: 90;/);
  assert.match(css, /--overlay-drawer-backdrop-z: 100;/);
  assert.match(css, /--overlay-drawer-z: 110;/);
  assert.match(css, /--overlay-command-palette-z: 150;/);
  assert.match(commandPaletteBackdropRule, /z-index: var\(--overlay-command-palette-z\);/);
  assert.match(commandPaletteBackdropRule, /overscroll-behavior: none;/);
  assert.match(commandPaletteRule, /max-height: calc\(100dvh - 96px\);/);
  assert.match(commandPaletteRule, /overflow: hidden;/);
  assert.match(settingsDialogBackdropRule, /z-index: var\(--overlay-dialog-z\);/);
  assert.match(terminalDrawerBackdropRule, /z-index: var\(--overlay-drawer-backdrop-z\);/);
  assert.match(terminalDrawerBackdropRule, /overscroll-behavior: none;/);
  assert.match(terminalDrawerRule, /z-index: var\(--overlay-drawer-z\);/);
  assert.match(terminalDrawerClosedRule, /visibility: hidden;/);
  assert.match(overlayFocusHook, /export function useOverlayFocus/);
  assert.match(overlayFocusHook, /event\.key === "Escape"/);
  assert.match(overlayFocusHook, /event\.key !== "Tab"/);
  assert.match(overlayFocusHook, /event\.stopPropagation\(\);/);
  assert.match(overlayFocusHook, /readyKey\?: unknown/);
  assert.match(overlayFocusHook, /\[containerRef, initialFocusRef, open, readyKey\]/);
  assert.match(overlayFocusHook, /restoreTarget\.focus\(\{ preventScroll: true \}\)/);
  assert.match(monitorShell, /import \{ createPortal \} from "react-dom";/);
  assert.match(monitorShell, /function ViewportOverlayPortal/);
  assert.match(monitorShell, /return createPortal\(children, target\);/);
  assert.match(monitorShell, /document\.querySelector<HTMLElement>\("\.desktop-app-root"\) \|\| document\.body/);
  assert.match(
    monitorShell,
    /useOverlayFocus\(\{[\s\S]*?open: commandPaletteOpen,[\s\S]*?containerRef: commandPaletteDialogRef,[\s\S]*?initialFocusRef: commandInputRef,[\s\S]*?readyKey: overlayPortalTarget/
  );
  assert.match(
    monitorShell,
    /useOverlayFocus\(\{[\s\S]*?open: settingsOpen,[\s\S]*?containerRef: settingsDialogRef,[\s\S]*?initialFocusRef: settingsCloseButtonRef,[\s\S]*?readyKey: overlayPortalTarget/
  );
  assert.match(monitorShell, /setTerminalDrawerOpen\(false\);/);
  assert.match(monitorShell, /\{commandPaletteOpen && \([\s\S]*?<ViewportOverlayPortal target=\{overlayPortalTarget\}>[\s\S]*?className="command-palette-backdrop"/);
  assert.match(monitorShell, /\{settingsOpen && \([\s\S]*?<ViewportOverlayPortal target=\{overlayPortalTarget\}>[\s\S]*?className="settings-dialog-backdrop"/);
  assert.match(monitorShell, /\{operatorCenterOpen && \([\s\S]*?<ViewportOverlayPortal target=\{overlayPortalTarget\}>[\s\S]*?<OperatorCenterDialog/);
  assert.match(
    monitorShell,
    /ref=\{commandPaletteDialogRef\} className="command-palette" role="dialog" aria-modal="true"[\s\S]*?tabIndex=\{-1\}/
  );
  assert.match(
    monitorShell,
    /ref=\{settingsDialogRef\} className="settings-dialog" role="dialog" aria-modal="true"[\s\S]*?tabIndex=\{-1\}/
  );
  assert.match(
    operatorCenterDialog,
    /useOverlayFocus\(\{[\s\S]*?open: true,[\s\S]*?containerRef: dialogRef,[\s\S]*?initialFocusRef: closeButtonRef/
  );
  assert.match(
    runtimeTerminalDrawer,
    /useOverlayFocus\(\{[\s\S]*?open,[\s\S]*?containerRef: drawerRef,[\s\S]*?initialFocusRef: collapseButtonRef,[\s\S]*?readyKey: portalTarget/
  );
  assert.match(runtimeTerminalDrawer, /import \{ createPortal \} from "react-dom";/);
  assert.match(runtimeTerminalDrawer, /document\.querySelector<HTMLElement>\("\.desktop-app-root"\) \|\| document\.body/);
  assert.match(runtimeTerminalDrawer, /const drawerOverlay = \(/);
  assert.match(runtimeTerminalDrawer, /return portalTarget \? createPortal\(drawerOverlay, portalTarget\) : drawerOverlay;/);
  assert.match(
    runtimeTerminalDrawer,
    /role="dialog"[\s\S]*?aria-modal=\{open \? true : undefined\}[\s\S]*?aria-hidden=\{!open\}[\s\S]*?style=\{open \? \{ opacity: 1, transform: "translateY\(0\)", transition: "none", visibility: "visible" \} : undefined\}[\s\S]*?tabIndex=\{-1\}/
  );
});

test("Agents collaboration uses lazy open-source 3D seal character scene", () => {
  assert.equal(packageJson.dependencies["@react-three/fiber"], "9.6.1");
  assert.equal(packageJson.dependencies["@react-three/drei"], "10.7.7");
  assert.match(monitorShell, /const AgentCollaborationScene = dynamic\(/);
  assert.match(monitorShell, /import\("@\/components\/workbench\/AgentCollaborationScene"\)/);
  assert.match(monitorShell, /ssr:\s*false/);
  assert.match(monitorShell, /data-agent-collaboration-theater/);
  assert.match(monitorShell, /<AgentCollaborationScene board=\{collaborationBoard\} language=\{uiLanguage\} \/>/);
  assert.match(agentCollaborationScene, /from "@react-three\/fiber"/);
  assert.match(agentCollaborationScene, /import \{ Float, Html, Line \} from "@react-three\/drei"/);
  assert.match(agentCollaborationScene, /import \{ getConsoleFunction, setConsoleFunction \} from "three"/);
  assert.match(agentCollaborationScene, /suppressedThreeWarnings/);
  assert.match(agentCollaborationScene, /THREE\.Clock: This module has been deprecated\. Please use THREE\.Timer instead\./);
  assert.match(agentCollaborationScene, /suppressedThreeWarnings\.has\(message\)/);
  assert.match(agentCollaborationScene, /console\[type\]\(message, \.\.\.params\)/);
  assert.match(agentCollaborationScene, /useFrame/);
  assert.match(agentCollaborationScene, /useFrame\(\(_, delta\) =>/);
  assert.match(agentCollaborationScene, /elapsedRef\.current \+= Math\.min\(delta, 0\.08\)/);
  assert.doesNotMatch(agentCollaborationScene, /useFrame\(\(\{ clock \}\) =>/);
  assert.doesNotMatch(agentCollaborationScene, /clock\.getElapsedTime/);
  assert.match(agentCollaborationScene, /preserveDrawingBuffer: false/);
  assert.match(agentCollaborationScene, /powerPreference: "high-performance"/);
  assert.match(agentCollaborationScene, /data-agent-collaboration-3d-ready/);
  assert.match(agentCollaborationScene, /function AgentCharacter/);
  assert.match(agentCollaborationScene, /function TaskLaneNode/);
  assert.match(agentCollaborationScene, /sealBodyPalette/);
  assert.match(agentCollaborationScene, /sealBellyPalette/);
  assert.match(agentCollaborationScene, /sealAccentPalette/);
  assert.match(agentCollaborationScene, /agent-seal-body/);
  assert.match(agentCollaborationScene, /agent-seal-belly/);
  assert.match(agentCollaborationScene, /agent-seal-head/);
  assert.match(agentCollaborationScene, /agent-seal-flipper-front-left/);
  assert.match(agentCollaborationScene, /agent-seal-flipper-rear-left/);
  assert.match(agentCollaborationScene, /agent-seal-whisker-left-top/);
  assert.match(agentCollaborationScene, /agent-seal-eye-left/);
  assert.match(agentCollaborationScene, /agent-seal-muzzle/);
  assert.match(agentCollaborationScene, /agent-seal-nose/);
  assert.match(agentCollaborationScene, /agent-seal-cheek-left/);
  assert.match(agentCollaborationScene, /agent-seal-tail/);
  assert.match(agentCollaborationScene, /agent-seal-collar-tag/);
  assert.match(agentCollaborationScene, /agent-seal-status-light/);
  assert.match(agentCollaborationScene, /agent-seal-role-halo/);
  assert.doesNotMatch(agentCollaborationScene, /agent-character-visor/);
  assert.doesNotMatch(agentCollaborationScene, /agent-character-chest-panel/);
  assert.doesNotMatch(agentCollaborationScene, /agent-character-ear-left/);
  assert.doesNotMatch(agentCollaborationScene, /agent-character-foot-left/);
  assert.doesNotMatch(agentCollaborationScene, /agent-character-left-hand/);
  assert.match(agentCollaborationScene, /3D 물개형 에이전트 협업 작업면/);
  assert.match(agentCollaborationScene, /const compactAgentName/);
  assert.match(agentCollaborationScene, /data-agent-character-identity/);
  assert.match(agentCollaborationScene, /agent-collaboration-identity-strip/);
  assert.match(agentCollaborationScene, /const scale = node\.agent\.activeTaskCount > 0 \? 0\.92 : 0\.84/);
  assert.match(css, /\.agent-collaboration-theater \{/);
  assert.match(css, /\.agent-collaboration-scene-shell,[\s\S]*?min-height: clamp\(280px, 42vh, 520px\);/);
  assert.match(css, /\.agent-collaboration-scene-hud \{/);
  assert.match(css, /\.agent-character-identity \{/);
  assert.match(css, /\.agent-collaboration-identity-strip \{/);
  assert.match(css, /width: 112px;/);
  assert.match(css, /width: 28px;/);
});

test("Agents details use one active workspace instead of stacking every feature", () => {
  assert.match(monitorShell, /type AgentDetailViewId = "collaboration" \| "blueprint" \| "builder" \| "learning" \| "flow" \| "inventory" \| "runtime"/);
  assert.match(monitorShell, /const agentDetailViews: Array/);
  assert.match(monitorShell, /useState<AgentDetailViewId>\("collaboration"\)/);
  assert.match(monitorShell, /const \[agentDetailRenderView, setAgentDetailRenderView\] = useState<AgentDetailViewId>\("collaboration"\)/);
  assert.match(monitorShell, /const pendingAgentDetailCommitRef = useRef<\(\(\) => void\) \| null>\(null\)/);
  assert.match(monitorShell, /const selectAgentDetailView = useCallback\(\(view: AgentDetailViewId\) => \{/);
  assert.match(monitorShell, /pendingAgentDetailCommitRef\.current = scheduleAfterFirstPaint\(\(\) => \{[\s\S]*?setAgentDetailRenderView\(view\)/);
  assert.match(monitorShell, /data-agent-detail-workspace/);
  assert.match(monitorShell, /data-agent-detail-render-view=\{agentDetailRenderView\}/);
  assert.match(monitorShell, /data-agent-detail-pending=\{agentDetailView === agentDetailRenderView \? "false" : "true"\}/);
  assert.match(monitorShell, /role="tablist"/);
  assert.match(monitorShell, /data-agent-detail-tab=\{item\.id\}/);
  assert.match(monitorShell, /aria-selected=\{selected\}/);
  assert.match(monitorShell, /onClick=\{\(\) => selectAgentDetailView\(item\.id\)\}/);
  assert.match(monitorShell, /aria-busy=\{agentDetailView !== agentDetailRenderView\}/);
  assert.match(monitorShell, /data-agent-detail-active-surface/);
  assert.match(monitorShell, /agentDetailRenderView === "collaboration"/);
  assert.match(monitorShell, /agentDetailRenderView === "blueprint"/);
  assert.match(monitorShell, /agentDetailRenderView === "builder"/);
  assert.match(monitorShell, /agentDetailRenderView === "learning"/);
  assert.match(monitorShell, /agentDetailRenderView === "flow"/);
  assert.match(monitorShell, /agentDetailRenderView === "inventory"/);
  assert.match(monitorShell, /agentDetailRenderView === "runtime"/);
  assert.match(css, /\.agent-detail-workspace\[data-agent-detail-pending="true"\] \.agent-detail-active-surface \{/);
  assert.match(css, /\.agent-detail-switcher \{[\s\S]*?grid-template-columns: repeat\(7, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.agent-detail-switcher button\[aria-selected="true"\]/);
});

test("Three.js scene is lazy-loaded and cleans up WebGL resources", () => {
  assert.doesNotMatch(toolStudio, /^import\s+.*from "three";/m);
  assert.match(toolStudio, /await import\("three"\)/);
  assert.match(toolStudio, /preserveDrawingBuffer: false/);
  assert.match(toolStudio, /renderer\.setClearColor\(0x101923, 1\)/);
  assert.match(toolStudio, /scene\.background = new THREE\.Color\(0x101923\)/);
  assert.match(toolStudio, /camera\.lookAt\(0, -0\.2, 0\)/);
  assert.match(toolStudio, /const bodyGeometry = new THREE\.SphereGeometry\(0\.5, 32, 22\)/);
  assert.match(toolStudio, /const bellyGeometry = new THREE\.SphereGeometry\(0\.42, 24, 14\)/);
  assert.match(toolStudio, /const flipperGeometry = new THREE\.SphereGeometry\(0\.16, 18, 10\)/);
  assert.match(toolStudio, /const whiskerGeometry = new THREE\.BoxGeometry\(0\.18, 0\.008, 0\.008\)/);
  assert.match(toolStudio, /const eyeGeometry = new THREE\.SphereGeometry\(0\.024, 12, 8\)/);
  assert.match(toolStudio, /const noseGeometry = new THREE\.SphereGeometry\(0\.018, 10, 8\)/);
  assert.match(toolStudio, /const muzzleGeometry = new THREE\.SphereGeometry\(0\.115, 16, 10\)/);
  assert.match(toolStudio, /const collarTagGeometry = new THREE\.BoxGeometry\(0\.12, 0\.08, 0\.04\)/);
  assert.match(toolStudio, /const roleHaloGeometry = new THREE\.TorusGeometry\(0\.42, 0\.016, 8, 48\)/);
  assert.match(toolStudio, /tool-agent-seal-belly/);
  assert.match(toolStudio, /tool-agent-seal-collar-tag/);
  assert.match(toolStudio, /tool-agent-seal-status-light/);
  assert.match(toolStudio, /tool-agent-seal-role-halo/);
  assert.match(toolStudio, /tool-agent-seal-flipper-front-left/);
  assert.match(toolStudio, /tool-agent-seal-flipper-rear-left/);
  assert.match(toolStudio, /tool-agent-seal-whisker-left-top/);
  assert.match(toolStudio, /tool-agent-seal-eye-left/);
  assert.match(toolStudio, /tool-agent-seal-muzzle/);
  assert.match(toolStudio, /tool-agent-seal-nose/);
  assert.match(toolStudio, /tool-agent-seal-cheek-left/);
  assert.match(toolStudio, /tool-agent-seal-tail/);
  assert.doesNotMatch(toolStudio, /tool-agent-character-ear-left/);
  assert.doesNotMatch(toolStudio, /leftFoot/);
  assert.doesNotMatch(toolStudio, /leftHand/);
  assert.doesNotMatch(toolStudio, /tool-agent-seal-visor/);
  assert.doesNotMatch(toolStudio, /tool-agent-seal-chest-panel/);
  assert.match(toolStudio, /toolModeSceneColors/);
  assert.match(toolStudio, /character\.scale\.setScalar\(0\.82\)/);
  assert.match(toolStudio, /물개형 협업 캐릭터 맵/);
  assert.match(toolStudio, /Seal agent collaboration 3D scene/);
  assert.match(toolStudio, /className="tool-agent-legend"/);
  assert.match(css, /\.tool-agent-legend \{/);
  assert.match(toolStudio, /canvas\.setAttribute\("data-agent-3d-ready", "true"\)/);
  assert.match(toolStudio, /canvas\.removeAttribute\("data-agent-3d-ready"\)/);
  assert.match(toolStudio, /window\.cancelAnimationFrame\(animationFrame\)/);
  assert.match(toolStudio, /document\.hidden/);
  assert.match(toolStudio, /Boolean\(entry\?\.isIntersecting\) && isCanvasInViewport\(\)/);
  assert.match(toolStudio, /document\.addEventListener\("visibilitychange", handleDocumentVisibilityChange\)/);
  assert.match(toolStudio, /document\.removeEventListener\("visibilitychange", handleDocumentVisibilityChange\)/);
  assert.match(toolStudio, /resizeObserver\.disconnect\(\)/);
  assert.match(toolStudio, /renderer\.dispose\(\)/);
  assert.match(toolStudio, /geometry\?\.dispose\(\)/);
  assert.match(toolStudio, /material\.dispose\(\)/);
});

test("Tool Studio exposes shortcut and interaction contracts", () => {
  assert.match(toolStudio, /from "\.\/tool-studio\/data"/);
  assert.match(toolStudio, /from "\.\/tool-studio\/types"/);
  assert.match(toolStudio, /export type \{ ToolStudioMode, ToolStudioModeRequest \} from "\.\/tool-studio\/types"/);
  assert.match(toolStudio, /data-tool-primary-menu/);
  assert.match(toolStudio, /className="tool-studio-primary-action tool-dropdown-trigger"/);
  assert.match(toolStudio, /aria-haspopup="menu"/);
  assert.match(toolStudio, /className="tool-dropdown-trigger-icon"/);
  assert.match(toolStudio, /className="tool-dropdown-trigger-copy"/);
  assert.match(toolStudio, /className="tool-dropdown-trigger-label"/);
  assert.match(toolStudio, /className="tool-dropdown-trigger-caret"/);
  assert.match(toolStudio, /activeStage\.labelKo/);
  assert.match(toolStudio, /const \[actionMenuOpen, setActionMenuOpen\] = useState\(false\)/);
  assert.match(toolStudio, /data-tool-action-menu-trigger/);
  assert.match(toolStudio, /<DropdownMenu\.Root open=\{actionMenuOpen\} onOpenChange=\{setActionMenuOpen\}>/);
  assert.match(toolStudio, /data-tool-action-menu/);
  assert.match(toolStudio, /data-tool-action-menu-item="previous-mode"/);
  assert.match(toolStudio, /data-tool-action-menu-item="next-mode"/);
  assert.match(toolStudio, /data-tool-action-stage=\{item\.id\}/);
  assert.match(toolStudio, /data-tool-context-menu/);
  assert.match(toolStudio, /data-tool-stage-context-menu=\{item\.id\}/);
  assert.match(toolStudio, /data-tool-mode-context-menu=\{item\.id\}/);
  assert.match(toolStudioTypes, /export type ToolStudioStage = "create" \| "ship"/);
  assert.match(toolStudio, /const \[stage, setStage\] = useState<ToolStudioStage>\("create"\)/);
  assert.match(toolStudioData, /export const toolStudioStages: ToolStage\[\] = \[/);
  assert.match(toolStudioData, /stage: "create"/);
  assert.match(toolStudioData, /stage: "ship"/);
  assert.match(toolStudio, /const currentStageModes = toolModes\.filter\(\(item\) => item\.stage === activeStage\.id\)/);
  assert.match(toolStudio, /const selectStage = useCallback\(/);
  assert.match(toolStudio, /data-tool-stage-rail/);
  assert.match(toolStudio, /data-tool-stage-button=\{item\.id\}/);
  assert.match(toolStudio, /data-tool-mode-depth=\{stage\}/);
  assert.match(toolStudio, /data-tool-mode-button=\{item\.id\}/);
  assert.match(toolStudio, /data-agent-3d-canvas/);
  assert.match(toolStudioTypes, /export type ToolStudioMode = "build" \| "environment" \| "deploy" \| "registry"/);
  assert.match(toolStudioTypes, /export type ToolStudioModeRequest = \{[\s\S]*?mode: ToolStudioMode;[\s\S]*?requestId: number;/);
  assert.match(toolStudio, /requestedMode\?: ToolStudioModeRequest \| null/);
  assert.match(toolStudio, /if \(requestedMode\) \{[\s\S]*?selectMode\(requestedMode\.mode\);/);
  assert.match(toolStudio, /const selectAdjacentMode = useCallback/);
  assert.match(toolStudio, /const copyActionMap = useCallback/);
  assert.match(toolStudio, /event\.altKey && event\.key === "Enter"/);
  assert.match(toolStudio, /event\.altKey && key === "1"/);
  assert.match(toolStudio, /event\.altKey && key === "2"/);
  assert.match(toolStudio, /event\.altKey && event\.key === "ArrowLeft"/);
  assert.match(toolStudio, /event\.altKey && event\.key === "ArrowRight"/);
  assert.match(toolStudio, /key === "b"/);
  assert.match(toolStudio, /event\.key === "Enter"/);
  assert.match(toolStudio, /event\.altKey && key === "t"/);
  assert.match(toolStudio, /event\.shiftKey && key === "e"/);
});

test("Tool Studio CSS keeps split scroll and stable controls", () => {
  assert.match(css, /\.tool-studio-shell \{/);
  assert.match(css, /\.tool-studio-depth-rail \{[\s\S]*?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-studio-depth-rail button \{[\s\S]*?min-height: 58px;/);
  assert.match(css, /\.tool-studio-depth-rail button\.active,[\s\S]*?\.tool-studio-mode-rail button\.active \{/);
  assert.match(css, /\.tool-studio-workbench \{[\s\S]*?grid-template-columns:/);
  assert.match(css, /\.tool-card-scroll,\n\.tool-detail-scroll,\n\.tool-env-scroll \{[\s\S]*?overflow: auto;/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.tool-card-scroll,[\s\S]*?\.tool-env-scroll[\s\S]*?\) \{[\s\S]*?overscroll-behavior: contain;[\s\S]*?scrollbar-color: var\(--scrollbar-thumb\) var\(--scrollbar-track\);/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.workspace-explorer-tree,[\s\S]*?\.source-editor-frame,[\s\S]*?\.tool-card-scroll,[\s\S]*?\.tool-env-scroll[\s\S]*?\) \{[\s\S]*?contain: layout paint style;/);
  assert.match(css, /\.tool-studio-workbench \{[\s\S]*?background: var\(--scroll-scope-bg\);[\s\S]*?border: 1px solid var\(--scroll-scope-border\);/);
  assert.match(css, /\.tool-studio-actions button,[\s\S]*?min-height: var\(--control-target-size\);/);
  assert.match(css, /\.tool-studio-actions \.tool-dropdown-trigger \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto;/);
  assert.match(css, /\.tool-action-menu-trigger kbd \{[\s\S]*?font-family: var\(--font-family-mono\);/);
  assert.match(css, /\.tool-menu-separator \{[\s\S]*?background: var\(--line\);/);
  assert.match(css, /\.tool-dropdown-trigger-label,[\s\S]*?\.tool-dropdown-trigger-copy small \{[\s\S]*?text-overflow: ellipsis;/);
  assert.match(css, /\.tool-dropdown-trigger\[data-state="open"\] \.tool-dropdown-trigger-caret \{[\s\S]*?transform: rotate\(180deg\);/);
  assert.match(css, /\.tool-agent-canvas \{[\s\S]*?height: clamp\(220px, 27vh, 320px\);/);
  assert.match(css, /\.tool-agent-canvas \{[\s\S]*?max-height: 320px;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-shell \{[\s\S]*?overflow: visible;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-actions \.tool-dropdown-trigger \{[\s\S]*?width: 100%;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-depth-rail,[\s\S]*?\.tool-studio-workbench,/);
});

test("Tool Studio 3D scene pauses when offscreen or motion should be reduced", () => {
  assert.match(toolStudio, /const reducedMotionQuery = window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
  assert.match(toolStudio, /const isCanvasInViewport = \(\) => \{[\s\S]*?canvas\.getBoundingClientRect\(\)/);
  assert.match(toolStudio, /const visibilityObserver = new IntersectionObserver/);
  assert.match(toolStudio, /window\.addEventListener\("scroll", requestViewportCheck, \{ passive: true \}\)/);
  assert.match(toolStudio, /window\.removeEventListener\("scroll", requestViewportCheck\)/);
  assert.match(toolStudio, /viewportCheckInterval = window\.setInterval\(requestViewportCheck, 400\)/);
  assert.match(toolStudio, /window\.clearInterval\(viewportCheckInterval\)/);
  assert.match(toolStudio, /sceneVisible = Boolean\(entry\?\.isIntersecting\)/);
  assert.match(toolStudio, /canvas\.setAttribute\("data-agent-3d-paused", "true"\)/);
  assert.match(toolStudio, /canvas\.setAttribute\("data-agent-3d-paused", "false"\)/);
  assert.match(toolStudio, /visibilityObserver\.disconnect\(\)/);
  assert.match(toolStudio, /reducedMotionQuery\.removeEventListener\("change", handleReducedMotionChange\)/);
});

test("Monitor section switches prewarm heavy surfaces and preserve source editor state", () => {
  assert.doesNotMatch(monitorShell, /const \[readySection, setReadySection\] = useState<SectionId>/);
  assert.match(monitorShell, /const titlebarSectionLabelRef = useRef<HTMLElement>\(null\)/);
  assert.doesNotMatch(monitorShell, /const pendingSectionCommitRef = useRef<\(\(\) => void\) \| null>\(null\)/);
  assert.match(monitorShell, /const prewarmWorkSurfaces = \(\) => \{/);
  assert.match(monitorShell, /void import\("@monaco-editor\/react"\)/);
  assert.match(monitorShell, /void import\("@\/components\/workbench\/AgentCollaborationScene"\)/);
  assert.match(monitorShell, /preloadToolStudioPanel\(\)/);
  assert.match(monitorShell, /preloadDesktopRuntimePanels\(\)/);
  assert.match(monitorShell, /preloadHomeFeaturePanels\(\)/);
  assert.match(monitorShell, /preloadAgentDetailPanels\(\)/);
  assert.match(monitorShell, /preloadAgentBuilderPanels\(\)/);
  assert.match(monitorShell, /void preloadAdminHistoryIndex\(\)/);
  assert.match(monitorShell, /const primeSectionActivation = useCallback\(\(targetSection: SectionId\) => \{/);
  assert.match(monitorShell, /viewport\?\.setAttribute\("data-active-section", targetSection\)/);
  assert.match(monitorShell, /viewport\?\.setAttribute\("data-section-content-ready", "true"\)/);
  assert.match(monitorShell, /element\.classList\.toggle\("active", isTarget\)/);
  assert.match(monitorShell, /titlebarSectionLabelRef\.current\.textContent = target\.label/);
  assert.match(monitorShell, /<DesktopActivityRail/);
  assert.match(desktopActivityRail, /export function DesktopActivityRail/);
  assert.match(desktopActivityRail, /className="activity-rail"/);
  assert.match(desktopActivityRail, /onPointerDown=\{\(\) => onPrimeSection\(item\.id\)\}/);
  assert.match(desktopActivityRail, /aria-current=\{activeSectionId === item\.id \? "page" : undefined\}/);
  assert.doesNotMatch(monitorShell, /pendingSectionCommitRef\.current\?\.\(\)/);
  assert.doesNotMatch(monitorShell, /pendingSectionCommitRef\.current = scheduleAfterFirstPaint\(\(\) => \{/);
  assert.doesNotMatch(monitorShell, /scheduleAfterFirstPaint\(\(\) => setReadySection\(section\)\)/);
  assert.match(monitorShell, /const \[buttonFeedbackReady, setButtonFeedbackReady\] = useState\(false\)/);
  assert.match(monitorShell, /const \[startupSurfaceReady, setStartupSurfaceReady\] = useState\(false\)/);
  assert.match(monitorShell, /setButtonFeedbackReady\(true\)/);
  assert.match(monitorShell, /const startupSurfaceReadyMinMs = 2600/);
  assert.match(monitorShell, /window\.setTimeout\(\(\) => setStartupSurfaceReady\(true\), startupSurfaceReadyMinMs\)/);
  assert.match(monitorShell, /const sectionPanelsMounted = buttonFeedbackReady/);
  assert.match(monitorShell, /const sectionContentReady = sectionPanelsMounted && startupSurfaceReady/);
  assert.match(monitorShell, /targetSection: SectionId\) => sectionPanelsMounted && residentSectionSet\.has\(targetSection\)/);
  assert.match(monitorShell, /<SnapshotLoadingShell detail="Warming resident tabs" \/>/);
  assert.match(monitorShell, /data-section-content-ready=\{sectionContentReady \? "true" : "false"\}/);
  assert.match(monitorShell, /const maxResidentSectionPanels = 12/);
  assert.match(monitorShell, /const retainedResidentSections: SectionId\[\] = \["overview", "source", "desktop", "eval"\]/);
  assert.match(monitorShell, /const nonRetainedResidentSections: SectionId\[\] = \[\]/);
  assert.match(monitorShell, /const startupResidentPreloadSections: SectionId\[\] = \[[\s\S]*?"source"[\s\S]*?"requirements"[\s\S]*?"structure"[\s\S]*?\]/);
  assert.match(monitorShell, /function normalizeResidentSectionIds\(candidates: SectionId\[\], activeSection: SectionId\)/);
  assert.match(monitorShell, /candidate !== activeSection && nonRetained\.has\(candidate\)/);
  assert.match(monitorShell, /const residentStartupPreloadDoneRef = useRef\(false\)/);
  assert.match(monitorShell, /const \[residentSectionIds, setResidentSectionIds\] = useState<SectionId\[\]>/);
  assert.match(monitorShell, /normalizeResidentSectionIds\(\[initialResidentSection, \.\.\.startupResidentPreloadSections\], initialResidentSection\)/);
  assert.match(monitorShell, /normalizeResidentSectionIds\(\[targetSection, \.\.\.current\], targetSection\)/);
  assert.match(monitorShell, /const preloadResidentPanels = \(\) => \{/);
  assert.match(monitorShell, /normalizeResidentSectionIds\(\[\.\.\.preloadSections, \.\.\.current\], section\)/);
  assert.match(monitorShell, /idleWindow\.requestIdleCallback\(preloadResidentPanels, \{ timeout: 900 \}\)/);
  assert.doesNotMatch(monitorShell, /const residentSectionMountPlan = useMemo\(\(\) => \{/);
  assert.doesNotMatch(monitorShell, /mountNextResidentSection/);
  assert.doesNotMatch(monitorShell, /requestIdleCallback\(mountNextResidentSection/);
  assert.match(monitorShell, /data-resident-section-count=\{residentSectionIds\.length\}/);
  assert.match(monitorShell, /data-resident-section-limit=\{maxResidentSectionPanels\}/);
  assert.doesNotMatch(monitorShell, /data-section-transition-shell/);
  assert.match(monitorShell, /const sourceQuery = section === "source" \? normalizedQuery : ""/);
  assert.match(monitorShell, /function MountedSectionPanel/);
  assert.match(monitorShell, /hidden=\{!active\}/);
  assert.match(monitorShell, /<MountedSectionPanel id="overview" active=\{section === "overview"\}>/);
  assert.match(monitorShell, /<MountedSectionPanel id="desktop" active=\{section === "desktop"\}>/);
  assert.match(monitorShell, /<MountedSectionPanel id="tools" active=\{section === "tools"\}>/);
  assert.match(monitorShell, /<MountedSectionPanel id="source" active=\{section === "source"\}>/);
  assert.match(monitorShell, /<MountedSectionPanel id="agents" active=\{section === "agents"\}>/);
  assert.match(monitorShell, /const MemoizedToolStudioPanel = memo\(ToolStudioPanel\)/);
  assert.match(monitorShell, /function preloadToolStudioPanel\(\) \{/);
  assert.match(monitorShell, /const WorkspaceExplorerPane = dynamic<WorkspaceExplorerPaneProps>/);
  assert.match(monitorShell, /const NativeGitWorkbench = dynamic<NativeGitWorkbenchProps>/);
  assert.match(monitorShell, /const RuntimeTerminalDrawer = dynamic<RuntimeTerminalDrawerProps>/);
  assert.match(monitorShell, /function preloadDesktopRuntimePanels\(\) \{[\s\S]*?WorkspaceExplorerPane[\s\S]*?NativeGitWorkbench[\s\S]*?RuntimeTerminalDrawer/);
  assert.match(monitorShell, /const OperatorCenterDialog = dynamic<OperatorCenterDialogProps>/);
  assert.match(monitorShell, /const ProductFeatureArchitecturePanel = dynamic<ProductFeatureArchitecturePanelProps>/);
  assert.match(monitorShell, /const CoreFeatureDrilldown = dynamic<CoreFeatureDrilldownProps>/);
  assert.match(monitorShell, /function preloadHomeFeaturePanels\(\) \{[\s\S]*?OperatorCenterDialog[\s\S]*?ProductFeatureArchitecturePanel[\s\S]*?CoreFeatureDrilldown/);
  assert.match(monitorShell, /const AgentCollaborationBoardPanel = dynamic<AgentCollaborationBoardPanelProps>/);
  assert.match(monitorShell, /const AgentInventoryPanel = dynamic<AgentInventoryPanelProps>/);
  assert.match(monitorShell, /const AgentRuntimeOverviewPanel = dynamic<AgentRuntimeOverviewPanelProps>/);
  assert.match(monitorShell, /const AgentCoreBlueprintPanel = dynamic<AgentCoreBlueprintPanelProps>/);
  assert.match(monitorShell, /const AgentFactoryWizard = dynamic<AgentFactoryWizardProps>/);
  assert.match(monitorShell, /const LearningFeedbackLoopPanel = dynamic<LearningFeedbackLoopPanelProps>/);
  assert.match(monitorShell, /function preloadAgentDetailPanels\(\) \{[\s\S]*?AgentDetailPanels/);
  assert.match(monitorShell, /function preloadAgentBuilderPanels\(\) \{[\s\S]*?AgentBuilderPanels/);
  assert.match(agentDetailPanels, /export function AgentCollaborationBoardPanel/);
  assert.match(agentDetailPanels, /export function AgentInventoryPanel/);
  assert.match(agentDetailPanels, /export function AgentRuntimeOverviewPanel/);
  assert.match(agentBuilderPanels, /export function AgentCoreBlueprintPanel/);
  assert.match(agentBuilderPanels, /export function AgentFactoryWizard/);
  assert.match(agentBuilderPanels, /export function LearningFeedbackLoopPanel/);
  assert.doesNotMatch(monitorShell, /function AgentCollaborationBoard\(/);
  assert.doesNotMatch(monitorShell, /function AgentInventory\(/);
  assert.doesNotMatch(monitorShell, /function AgentCoreBlueprintPanel\(/);
  assert.doesNotMatch(monitorShell, /function AgentFactoryWizard\(/);
  assert.doesNotMatch(monitorShell, /function LearningFeedbackLoopPanel\(/);
  assert.match(monitorShell, /<MemoizedToolStudioPanel/);
  assert.match(monitorShell, /const openAgentsSection = useCallback\(\(\) => \{/);
  assert.match(monitorShell, /const openSourceSection = useCallback\(\(\) => \{/);
  assert.match(monitorShell, /const openProviderSettings = useCallback\(\(\) => \{/);
  assert.match(monitorShell, /onOpenAgents=\{openAgentsSection\}/);
  assert.match(monitorShell, /onOpenSource=\{openSourceSection\}/);
  assert.match(monitorShell, /onOpenProviderSettings=\{openProviderSettings\}/);
  assert.match(monitorShell, /const MemoizedDesktopRuntimePanel = memo\(DesktopRuntimePanel\)/);
  assert.match(monitorShell, /<MemoizedDesktopRuntimePanel/);
  assert.match(monitorShell, /const consumeRuntimeLaunchRequest = useCallback\(\(\) => \{/);
  assert.match(monitorShell, /const openExecutionSettings = useCallback/);
  assert.match(monitorShell, /launchRequest=\{section === "desktop" \? runtimeLaunchRequest : null\}/);
  assert.match(monitorShell, /onLaunchRequestConsumed=\{consumeRuntimeLaunchRequest\}/);
  assert.match(monitorShell, /onOpenSettings=\{openExecutionSettings\}/);
  assert.match(monitorShell, /settingsSyncRequestConsumer=\{true\}/);
  assert.match(monitorShell, /settingsSyncRequestConsumer=\{false\}/);
  assert.match(monitorShell, /surfaceActive=\{section === "source"\}/);
  assert.match(monitorShell, /if \(!surfaceActive \|\| !launchRequest/);
  assert.match(monitorShell, /SharedWorkspaceRequestInFlight/);
  assert.match(monitorShell, /sharedWorkspacePrepareInFlight/);
  assert.match(monitorShell, /sharedWorkspaceWarmupInFlight/);
  assert.match(monitorShell, /SHARED_WORKSPACE_PREPARE_CACHE_TTL_MS/);
  assert.match(monitorShell, /prepareWorkspaceOsResourcesShared\(tauriInvoke/);
  assert.match(monitorShell, /warmWorkspaceOsResourcesShared\(tauriInvoke/);
  assert.doesNotMatch(monitorShell, /\{sectionContentReady && section === "desktop" && \(/);
  assert.doesNotMatch(monitorShell, /\{sectionContentReady && section === "tools" && \(/);
  assert.doesNotMatch(monitorShell, /\{sectionContentReady && section === "agents" && \(/);
  assert.match(css, /\.mounted-section-panel \{\s+contain: layout paint style;/);
  assert.match(css, /\.mounted-section-panel\[hidden\]/);
  assert.match(css, /\.section-transition-shell \{/);
});

test("Monitor enforces lazy workbench boundaries and long-task performance telemetry", () => {
  assert.match(packageJson.scripts.check, /check-lazy-boundary-contract\.mjs/);
  assert.equal(packageJson.scripts["check:lazy-boundaries"], "node scripts/check-lazy-boundary-contract.mjs");
  assert.equal(packageJson.scripts["perf:sections:repeat"], "node scripts/audit-section-switch-latency.mjs --runs=3");
  assert.match(lazyBoundaryCheck, /lazyBoundaryTargets/);
  assert.match(lazyBoundaryCheck, /MonitorShell must type-only import/);
  assert.match(lazyBoundaryCheck, /MonitorShell must dynamic import/);
  assert.match(lazyBoundaryCheck, /MonitorShell must keep an explicit preload path/);
  assert.match(lazyBoundaryCheck, /void\\\\s\+import/);
  for (const modulePath of [
    "@/components/features/OperatorCenterDialog",
    "@/components/features/ProductFeatureArchitecturePanel",
    "@/components/workbench/CoreFeatureDrilldown",
    "@/components/workbench/WorkspaceExplorerPane",
    "@/components/workbench/NativeGitWorkbench",
    "@/components/workbench/RuntimeTerminalDrawer",
    "@/components/workbench/ToolStudioPanel",
    "@/components/workbench/AgentDetailPanels",
    "@/components/workbench/AgentBuilderPanels"
  ]) {
    assert.match(lazyBoundaryCheck, new RegExp(modulePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(sectionSwitchAudit, /parsePositiveIntegerArg\("--runs", 1\)/);
  assert.match(sectionSwitchAudit, /PerformanceObserver/);
  assert.match(sectionSwitchAudit, /supportedEntryTypes\?\.includes\("longtask"\)/);
  assert.match(sectionSwitchAudit, /__workspaceMonitorLongTasks/);
  assert.match(sectionSwitchAudit, /longTaskMaxMs/);
  assert.match(sectionSwitchAudit, /longTaskTotalP95Ms/);
  assert.match(sectionSwitchAudit, /sectionStats/);
});

test("Product feature surface exposes open-source feature radar and install policy", () => {
  assert.match(collector, /collectOpenSourceFeatureReferences/);
  assert.match(collector, /sanitizeOpenSourceFeatureReferencesForCustomer/);
  assert.match(monitorShell, /type OpenSourceFeatureReferences = NonNullable<WorkspaceSnapshot\["openSourceFeatureReferences"\]>/);
  assert.match(monitorShell, /const emptyOpenSourceFeatureReferences: OpenSourceFeatureReferences =/);
  assert.match(monitorShell, /const openSourceFeatureReferences = snapshot\.openSourceFeatureReferences \?\? emptyOpenSourceFeatureReferences/);
  assert.match(monitorShell, /openSourceFeatureReferences=\{openSourceFeatureReferences\}/);
  assert.match(productFeatureArchitecturePanel, /WorkspaceOpenSourceFeatureReferences/);
  assert.match(productFeatureArchitecturePanel, /openSourceFeatureReferences\?: WorkspaceOpenSourceFeatureReferences/);
  assert.match(productFeatureArchitecturePanel, /data-open-source-feature-radar="feature-reference-install-policy"/);
  assert.match(productFeatureArchitecturePanel, /installNeededNow/);
  assert.match(productFeatureArchitecturePanel, /installPolicy\.replaceAll\("_", " "\)/);
  assert.match(productFeatureArchitecturePanel, /\| "tools"/);
  assert.match(productFeatureArchitecturePanel, /"tools",\s+"agents"/);
  assert.match(css, /\.open-source-feature-board \{/);
  assert.match(css, /\.open-source-feature-summary span,[\s\S]*?\.open-source-install-policy \{/);
  assert.match(css, /\.open-source-feature-grid \{[\s\S]*?grid-template-columns: repeat\(auto-fit, minmax\(260px, 1fr\)\);/);
  assert.match(css, /\.open-source-feature-card \{[\s\S]*?box-shadow:/);
  assert.match(css, /\.open-source-feature-card:hover \{/);
  assert.match(css, /\.open-source-repo-row em \{/);
});

test("Desktop source workbench prepares native OS workspace resources", () => {
  assert.match(desktopTypes, /export type WorkspaceResourcePrepareReport = \{/);
  assert.match(desktopTypes, /export type WorkspaceResourceWarmupReport = \{/);
  assert.match(desktopTypes, /export type DesktopResourceSnapshotReport = \{/);
  assert.match(monitorShell, /const \[workspaceResourceReport, setWorkspaceResourceReport\] = useState<WorkspaceResourcePrepareReport \| null>\(null\)/);
  assert.match(monitorShell, /const \[workspaceWarmupReport, setWorkspaceWarmupReport\] = useState<WorkspaceResourceWarmupReport \| null>\(null\)/);
  assert.match(monitorShell, /const \[desktopResourceSnapshot, setDesktopResourceSnapshot\] = useState<DesktopResourceSnapshotReport \| null>\(null\)/);
  assert.match(monitorShell, /const workspaceWarmupPollRef = useRef<number \| null>\(null\)/);
  assert.match(sourceEditorSession, /const defaultSourceDraftUiSyncMs = 180/);
  assert.match(sourceEditorSession, /const sourceDraftRef = useRef\(""\)/);
  assert.match(sourceEditorSession, /const sourceDraftSyncTimerRef = useRef<number \| null>\(null\)/);
  assert.match(monitorShell, /const \[workspaceResourceBusy, setWorkspaceResourceBusy\] = useState\(false\)/);
  assert.match(monitorShell, /const warmWorkspaceOsResources = async/);
  assert.match(monitorShell, /"warm_workspace_os_resources"/);
  assert.match(monitorShell, /scheduleWorkspaceWarmupPoll/);
  assert.match(monitorShell, /const prepareWorkspaceOsResources = async/);
  assert.match(monitorShell, /"prepare_workspace_os_resources"/);
  assert.match(monitorShell, /const refreshDesktopResourceSnapshot = async/);
  assert.match(monitorShell, /"get_desktop_resource_snapshot"/);
  assert.match(monitorShell, /preloadContents: true/);
  assert.match(monitorShell, /forceRefresh: Boolean\(options\.forceRefresh\)/);
  assert.match(monitorShell, /setWorkspaceResourceReport\(report\)/);
  assert.match(monitorShell, /setRuntimeSourceFiles\(report\.catalog\.files\)/);
  assert.match(monitorShell, /setSourceCatalogReport\(report\.catalog\)/);
  assert.match(monitorShell, /sourceCatalogLabelFor\(Boolean\(workspaceResourceReport\), runtimeSourceFiles\.length > 0\)/);
  assert.match(sourceEditorCatalog, /return "native cache"/);
  assert.match(sourceWorkbenchVisualSource, /OS 캐시/);
  assert.match(sourceWorkbenchVisualSource, /메모리 예산/);
  assert.match(sourceWorkbenchVisualSource, /앱 RAM\/CPU/);
  assert.match(sourceWorkbenchVisualSource, /appResourceSnapshot\.processMemoryBytes/);
  assert.match(sourceWorkbenchVisualSource, /appResourceSnapshot\.processCpuUsage\.toFixed\(1\)/);
  assert.match(sourceWorkbenchVisualSource, /native warming/);
  assert.match(sourceWorkbenchVisualSource, /formatBytes\(workspaceResourceReport\.cachedBytes\)/);
  assert.match(sourceWorkbenchVisualSource, /workspaceWarmupReport\.cachedBytes/);
  assert.match(monitorShell, /await prepareWorkspaceOsResources\(\{ forceRefresh: true \}\)/);
  assert.match(monitorShell, /void warmWorkspaceOsResources\(\{ forceRefresh: true \}\)/);
  assert.match(desktopTypes, /memoryBudgetBytes: number/);
  assert.match(desktopTypes, /parallelWorkers: number/);
  assert.match(sourceWorkbenchVisualSource, /CPU 병렬/);
  assert.match(sourceWorkbenchVisualSource, /preloadStrategy/);
  assert.match(sourceWorkbenchVisualSource, /scanDurationMs \+ workspaceResourceReport\.preloadDurationMs/);
  assert.match(tauriCargo, /rayon = "1\.12\.0"/);
  assert.match(tauriCargo, /sysinfo = \{ version = "0\.39\.3", default-features = false, features = \["system"\] \}/);
  assert.match(tauriLib, /use rayon::prelude::\*/);
  assert.match(tauriLib, /use sysinfo::\{get_current_pid, ProcessRefreshKind, ProcessesToUpdate, System\}/);
  assert.match(tauriLib, /DesktopResourceSnapshotReport/);
  assert.match(tauriLib, /get_desktop_resource_snapshot/);
  assert.match(tauriLib, /process_memory_bytes/);
  assert.match(tauriLib, /process_cpu_usage/);
  assert.match(tauriLib, /WorkspaceResourceSnapshotCache/);
  assert.match(tauriLib, /WorkspaceResourceProfile/);
  assert.match(tauriLib, /rayon_parallel_cpu_ram_budget/);
  assert.match(tauriLib, /MAX_WORKSPACE_PRELOAD_WORKERS/);
  assert.match(tauriLib, /build_workspace_thread_pool/);
  assert.match(tauriLib, /selected[\s\S]*?par_iter\(\)[\s\S]*?filter_map\(read_workspace_preload_candidate\)/);
  assert.match(sourceWorkbenchVisualSource, /onChange=\{\(value\) => onUpdateSourceDraft\(value \?\? ""\)\}/);
  assert.match(monitorShell, /onUpdateSourceDraft=\{\(nextContent\) => updateSourceDraft\(nextContent, \{ immediate: false \}\)\}/);
  assert.match(sourceWorkbenchController, /currentEditorDraftContent\(\)/);
  assert.match(sourceWorkbenchController, /effectiveSourceDrafts\(\)/);
  assert.match(collector, /MAX_SOURCE_PREVIEW_CHARS = 1200/);
  assert.match(collector, /previewBytes: Buffer\.byteLength\(preview, "utf8"\)/);
  assert.doesNotMatch(collector, /content: preview/);
});

test("Workspace monitor sidebar and source editor defaults avoid clipped editing controls", () => {
  assert.match(sourceEditorMonacoConfig, /fontSize: 13/);
  assert.match(sourceEditorMonacoConfig, /minimap: \{ enabled: false \}/);
  assert.match(sourceEditorMonacoConfig, /wordWrap: "on"/);
  assert.match(monitorShell, /const \[sourceWordWrap, setSourceWordWrap\] = useState\(true\)/);
  assert.match(monitorShell, /const \[sourceMinimapEnabled, setSourceMinimapEnabled\] = useState\(false\)/);
  assert.match(sourceWorkbenchVisualSource, /className="source-editor-primary-actions"/);
  assert.match(css, /\.desktop-app-shell\.sidebar-expanded \{[\s\S]*?grid-template-columns: 148px minmax\(0, 1fr\);/);
  assert.match(css, /\.desktop-app-shell\.sidebar-expanded \.activity-rail button \{[\s\S]*?width: 132px;/);
  assert.match(css, /\.source-editor-primary-actions \{/);
  assert.match(css, /\.filesystem-workbench \.native-source-controls \{[\s\S]*?minmax\(420px, 1\.45fr\);/);
  assert.match(css, /\.filesystem-workbench \.native-source-controls \.source-editor-action-group \{[\s\S]*?grid-column: auto;/);
  assert.match(css, /\.monaco-editor-shell \{[\s\S]*?height: clamp\(420px, 64dvh, 720px\);/);
});

test("Source workbench replaces native select and command buttons with app primitives", () => {
  assert.equal(packageJson.scripts["smoke:source-controls"], "node scripts/check-source-controls-playwright.mjs");
  assert.match(sourceWorkbenchVisualSource, /from "@radix-ui\/react-dropdown-menu"/);
  assert.match(sourceWorkbenchVisualSource, /ChevronDown/);
  assert.match(sourceWorkbenchVisualSource, /<DropdownMenu\.Root>/);
  assert.match(sourceWorkbenchVisualSource, /className="source-file-picker-trigger"/);
  assert.match(sourceWorkbenchVisualSource, /className="source-file-picker-menu"/);
  assert.doesNotMatch(monitorShell, /<select[\s\S]*?value=\{selectedSourcePath\}/);
  assert.match(sourceWorkbenchVisualSource, /<ActionGroup className="source-editor-action-group"[\s\S]*?density="compact">/);
  assert.match(sourceWorkbenchVisualSource, /<Button[\s\S]*?variant="primary"[\s\S]*?className="source-action-button primary"/);
  assert.match(sourceWorkbenchVisualSource, /<ActionGroup className="source-command-toolbar"[\s\S]*?asToolbar/);
  assert.match(sourceWorkbenchVisualSource, /className=\{`source-tool-button toggle \$\{sourceWordWrap \? "active" : ""\}`\}/);
  assert.match(sourceWorkbenchVisualSource, /<Button[\s\S]*?role="tab"[\s\S]*?aria-selected=\{sourceWorkbenchView === "editor"\}/);
  assert.match(workspaceExplorerPane, /import \{ ActionGroup \} from "@\/components\/ui\/ActionGroup"/);
  assert.match(workspaceExplorerPane, /import \{ Button \} from "@\/components\/ui\/Button"/);
  assert.match(workspaceExplorerPane, /<Button[\s\S]*?variant="outline"[\s\S]*?className="workspace-dropzone"/);
  assert.match(workspaceExplorerPane, /<ActionGroup className="workspace-explorer-actions"[\s\S]*?direction="column"/);
  assert.match(css, /\.source-file-picker-menu \{/);
  assert.match(css, /\.source-file-picker-item\[data-highlighted\]/);
  assert.match(css, /\.source-editor-action-group \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(104px, 1fr\)\);/);
  assert.match(sourceControlsSmoke, /workspace-monitor-source-controls-/);
  assert.match(sourceControlsSmoke, /sourceSelectCount,\s*0/);
  assert.match(sourceControlsSmoke, /data-section-content-ready="true"/);
  assert.match(sourceControlsSmoke, /await trigger\.click\(\)/);
  assert.match(sourceControlsSmoke, /source_controls_playwright_ok/);
});

test("Source workbench ignores stale async file load results", () => {
  assert.match(sourceEditorIndex, /export \* from "\.\/useSourceLoadRequestGate"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/useSourceWorkbenchController"/);
  assert.match(monitorShell, /useSourceLoadRequestGate\(\)/);
  assert.match(monitorShell, /useSourceWorkbenchController\(\{/);
  assert.match(sourceWorkbenchController, /const isCurrentSourceLoad = beginSourceLoadRequest\(\)/);
  assert.match(sourceWorkbenchController, /const targetPath = relativePath\.trim\(\);[\s\S]*?if \(!targetPath\) \{[\s\S]*?const isCurrentSourceLoad = beginSourceLoadRequest\(\);/);
  assert.match(sourceWorkbenchController, /if \(!isCurrentSourceLoad\(\)\) \{\s*return;\s*\}/);
  assert.match(sourceWorkbenchController, /if \(isCurrentSourceLoad\(\)\) \{\s*setError\(sourceControllerErrorMessage\(caught\)\);/);
  assert.match(sourceWorkbenchController, /if \(isCurrentSourceLoad\(\)\) \{\s*setEditorBusy\(false\);/);
  assert.match(sourceWorkbenchController, /const selectDraftEntry = useCallback\([\s\S]*?cancelPendingSourceLoad\(\)/);
  assert.match(sourceWorkbenchController, /const closeResult = buildCloseSourceDraftResult\(\{/);
  assert.match(sourceWorkbenchController, /if \(closeResult\.closingActiveDraft\) \{[\s\S]*?cancelPendingSourceLoad\(\)/);
  assert.match(sourceWorkbenchVisualSource, /className="source-editor-tab-main"[\s\S]*?disabled=\{sourceEditorLocked\}/);
  assert.match(sourceWorkbenchVisualSource, /className="source-editor-tab-close"[\s\S]*?disabled=\{sourceEditorLocked\}/);
});

test("Source editor locks save-time mutations without discarding newer draft content", () => {
  assert.match(monitorShell, /const sourceEditorLocked = editorBusy \|\| saveAllBusy/);
  assert.match(monitorShell, /domReadOnly: sourceEditorLocked/);
  assert.match(monitorShell, /readOnly: sourceEditorLocked/);
  assert.match(monitorShell, /\[sourceEditorLocked, sourceMinimapEnabled, sourceWordWrap\]/);
  assert.match(sourceWorkbenchController, /if \(sourceEditorLocked\) \{[\s\S]*?Editing commands are locked while saving\./);
  assert.match(sourceWorkbenchController, /const fileToSave = sourceFile/);
  assert.match(sourceWorkbenchController, /const savedContent = currentEditorDraftContent\(\)/);
  assert.match(sourceWorkbenchController, /const activePathAfterSave = getActiveSourcePath\(\)/);
  assert.match(sourceWorkbenchController, /const activeFileStillVisible = activePathAfterSave === fileToSave\.relativePath/);
  assert.match(sourceWorkbenchController, /const nextDraftContent = activeFileStillVisible \? currentEditorDraftContent\(\) : savedContent/);
  assert.match(sourceWorkbenchController, /const saveResult = buildSourceFileSaveResult\(\{/);
  assert.match(sourceWorkbenchController, /buildSourceFileSaveDrafts\(current, \{/);
  assert.match(sourceEditorDraftActions, /upsertSavedSourceDraft\(/);
  assert.match(sourceEditorDraftActions, /args\.activeFileStillVisible \? args\.nextDraftContent : undefined/);
  assert.match(sourceEditorDrafts, /baseContent: savedContent/);
  assert.match(sourceEditorDrafts, /content: contentAfterSave \?\? existing\.content/);
  assert.match(sourceEditorDraftActions, /if \(args\.activePathAfterSave && nextDrafts\[args\.activePathAfterSave\]\) \{[\s\S]*?content: args\.activeVisibleContent/);
  assert.match(sourceWorkbenchVisualSource, /onClick=\{\(\) => onRunSourceEditorCommand\("format"\)\} disabled=\{!sourceFile \|\| sourceEditorLocked \|\| sourceEditorViewMode === "diff"\}/);
  assert.match(sourceWorkbenchVisualSource, /className="source-action-button save-all"[\s\S]*?disabled=\{!invokeAvailable \|\| sourceEditorLocked \|\| dirtyDraftEntries\.length === 0\}/);
});

test("Monitor uses a shared motion system for smooth tab, dialog, and menu transitions", () => {
  assert.match(css, /--motion-duration-fast: 140ms;/);
  assert.match(css, /--motion-duration-standard: 190ms;/);
  assert.match(css, /@keyframes workspace-panel-enter/);
  assert.match(css, /@keyframes workspace-menu-enter/);
  assert.match(css, /\.desktop-viewport\[data-section-content-ready="true"\] :where\(/);
  assert.match(css, /\.settings-dialog-backdrop \{[\s\S]*?animation: workspace-fade-in/);
  assert.match(css, /\.settings-dialog \{[\s\S]*?animation: workspace-menu-enter/);
  assert.match(css, /\.command-palette \{[\s\S]*?animation: workspace-menu-enter/);
  assert.match(css, /\.tool-menu-content,[\s\S]*?\.tool-context-content \{[\s\S]*?animation: workspace-menu-enter/);
  assert.match(css, /\.agent-detail-active-surface \{[\s\S]*?transition:[\s\S]*?transform var\(--motion-duration-fast\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{/);
});

test("Monitor buttons expose instant press feedback before heavy click work", () => {
  assert.equal(packageJson.scripts["perf:buttons"], "node scripts/audit-button-response.mjs");
  assert.match(monitorShell, /from "@\/lib\/motion"/);
  assert.match(monitorShell, /installInstantButtonFeedback\(root\)/);
  assert.match(motionHelpers, /export function installInstantButtonFeedback\(root: HTMLElement\)/);
  assert.match(motionHelpers, /export function scheduleAfterFirstPaint\(callback: \(\) => void, delayMs = 0\)/);
  assert.match(motionHelpers, /root\.addEventListener\("pointerdown", handlePointerDown, true\)/);
  assert.match(motionHelpers, /root\.addEventListener\("keydown", handleKeyDown, true\)/);
  assert.match(motionHelpers, /const activeCleanups = new Set<\(\) => void>\(\)/);
  assert.match(motionHelpers, /activeCleanups\.forEach\(\(cleanup\) => cleanup\(\)\)/);
  assert.match(motionHelpers, /data-instant-button-feedback", "active"/);
  assert.match(motionHelpers, /data-instant-button-painted", "true"/);
  assert.match(motionHelpers, /data-button-response-active", "true"/);
  assert.match(motionHelpers, /data-button-feedback-ready", "true"/);
  assert.match(buttonResponseAudit, /data-button-feedback-ready/);
  assert.match(css, /\[data-instant-button-feedback="active"\]/);
});

test("Desktop runtime buttons expose contextual action feedback", () => {
  assert.match(desktopActionFeedbackCard, /export type DesktopActionFeedbackStatus = "running" \| "done" \| "failed"/);
  assert.match(desktopActionFeedbackCard, /export type DesktopActionFeedbackId =[\s\S]*?"check-adapters"[\s\S]*?"create-support-bundle"[\s\S]*?"open-source-review"/);
  assert.match(monitorShell, /DesktopActionFeedbackCard/);
  assert.match(monitorShell, /const \[desktopActionFeedback, setDesktopActionFeedback\] = useState<DesktopActionFeedback \| null>\(null\)/);
  assert.match(monitorShell, /const \[runtimeInitStatus, setRuntimeInitStatus\] = useState<RuntimeInitStatusReport \| null>\(null\)/);
  assert.match(monitorShell, /const runDesktopAction = async \(id: DesktopActionFeedbackId/);
  assert.match(monitorShell, /data-desktop-action-feedback="check-adapters"/);
  assert.match(monitorShell, /data-desktop-action-feedback="create-support-bundle"/);
  assert.match(monitorShell, /AgentFirstRunGuideCard/);
  assert.match(agentFirstRunGuideCard, /data-agent-first-run-guide="true"/);
  assert.match(agentFirstRunGuideCard, /에이전트는 이렇게 시작합니다/);
  assert.match(agentFirstRunGuideCard, /AGENTS\.md 지시 확인/);
  assert.match(agentFirstRunGuideCard, /aria-label=\{ko \? "AGENTS\.md 만들기 또는 열기"/);
  assert.match(agentFirstRunGuideCard, /ko \? "동기화" : "Sync"/);
  assert.match(agentFirstRunGuideCard, /const firstRunActionLabel = ko \? "첫 작업 시작" : "Start the first task"/);
  assert.doesNotMatch(agentFirstRunGuideCard, /<span>\{ko \? "검색 에이전트 시작"/);
  assert.match(desktopActionFeedbackCard, /"sync-settings"/);
  assert.match(desktopActionFeedbackCard, /"prepare-agents-md"/);
  assert.match(settingsRuntimeSyncHook, /export function useSettingsRuntimeSync/);
  assert.match(settingsRuntimeSyncHook, /export function createSettingsRuntimeSyncRequest/);
  assert.match(settingsRuntimeSyncHook, /const runManualSettingsSync = useCallback/);
  assert.match(settingsRuntimeSyncHook, /const runQueuedSettingsSync = useCallback/);
  assert.match(settingsRuntimeSyncHook, /syncSettingsAndRuntimeState\(syncOptions\)\.catch\(\(\) => undefined\)/);
  assert.match(monitorShell, /useSettingsRuntimeSync/);
  assert.match(monitorShell, /syncSettingsAndRuntimeState/);
  assert.match(monitorShell, /queueSettingsSync/);
  assert.match(monitorShell, /settingsSyncRequestConsumer = surfaceActive/);
  assert.match(monitorShell, /if \(!settingsSyncRequest \|\| !settingsSyncRequestConsumer\)/);
  assert.doesNotMatch(monitorShell, /settingsSyncInFlightRef/);
  assert.doesNotMatch(monitorShell, /syncSettingsAndRuntimeState\(\{ reason: "manual"/);
  assert.match(monitorShell, /data-desktop-action-feedback="sync-settings"/);
  assert.match(sourceWorkbenchController, /renderAgentsMdStarter/);
  assert.match(monitorShell, /prepareAgentsInstructions/);
  assert.match(monitorShell, /runDesktopAction\("prepare-agents-md", prepareAgentsInstructions\)/);
  assert.match(runtimeInitStatusCard, /export type RuntimeInitStatusReport/);
  assert.match(runtimeInitStatusCard, /data-runtime-init-status=\{status\}/);
  assert.match(runtimeInitStatusCard, /"init 전"/);
  assert.match(runtimeInitStatusCard, /완료, 실패, 실행 기록이 여기 표시됩니다/);
  assert.match(runtimeInitStatusCard, /초기화 완료/);
  assert.match(css, /\.agent-first-run-guide-card \{/);
  assert.match(css, /\.agent-first-run-step-grid \{/);
  assert.match(desktopActionFeedbackCard, /data-desktop-action-feedback-card=\{placement\}/);
  assert.match(desktopActionFeedbackCard, /role="status"[\s\S]*?aria-live="polite"/);
  assert.match(css, /\.runtime-init-status-card \{/);
  assert.match(css, /\.runtime-init-status-card\.status-ready \{/);
  assert.match(css, /\.runtime-init-status-card\.status-failed \{/);
  assert.match(css, /\.desktop-action-feedback-card \{/);
  assert.match(css, /\.desktop-action-feedback-card\.status-running \{/);
  assert.match(css, /\.desktop-action-feedback-card\.status-failed \{/);
  assert.match(css, /\.desktop-command-grid button\.desktop-action-current/);
  assert.match(css, /\.terminal-drawer-launcher strong \{[\s\S]*?background: var\(--control-selected-bg\);[\s\S]*?color: var\(--control-selected-fg\);/);
});

test("History documents use bounded admin previews instead of loading full records into the UI snapshot", () => {
  assert.equal(packageJson.scripts["check:history-payload"], "node scripts/check-history-payload.mjs");
  assert.match(packageJson.scripts.check, /check-history-payload/);
  assert.match(collector, /const generatedAdminHistoryIndexPath = path\.join\(projectRoot, "src", "generated", "admin-history-index\.json"\)/);
  assert.match(collector, /const publicAdminHistoryIndexPath = path\.join\(projectRoot, "public", "admin-history-index\.json"\)/);
  assert.match(collector, /const MAX_INLINE_HISTORY_DOCUMENTS = 96;/);
  assert.match(collector, /const HISTORY_DOCUMENT_HTML_CHARS = 2200;/);
  assert.match(collector, /function historyAdminPreviewToHtml\(content\)/);
  assert.match(collector, /export function buildAdminHistoryIndex\(documents\)/);
  assert.match(collector, /export function compactDocumentsForSnapshot\(documents\)/);
  assert.match(collector, /migrated_to_lazy_admin_index/);
  assert.match(collector, /writeJson\(generatedAdminHistoryIndexPath, adminHistoryIndex\)/);
  assert.match(collector, /isHistoryDocument[\s\S]*?\? historyAdminPreviewToHtml\(content\)/);
  assert.match(collector, /previewMode: isHistoryDocument \? "admin-summary" : "document-preview"/);
  assert.match(collector, /htmlTruncated: isHistoryDocument \? content\.length > HISTORY_ADMIN_EXCERPT_CHARS : content\.length > maxHtmlChars/);
  assert.match(collector, /sourceBytes: stats\.size/);
  assert.match(historyPayloadCheck, /const generatedAdminHistoryIndexPath = path\.join\(projectRoot, "src", "generated", "admin-history-index\.json"\)/);
  assert.match(historyPayloadCheck, /const publicAdminHistoryIndexPath = path\.join\(projectRoot, "public", "admin-history-index\.json"\)/);
  assert.match(historyPayloadCheck, /const maxDocumentJsonBytes = 1_900_000;/);
  assert.match(historyPayloadCheck, /Inline history documents must stay at or below/);
  assert.match(historyPayloadCheck, /Admin history index day groups must not duplicate document lists/);
  assert.match(historyPayloadCheck, /Snapshot adminHistory summary must match generated admin-history-index\.json/);
  assert.match(historyPayloadCheck, /disabled-customer-snapshot/);
  assert.match(historyPayloadCheck, /Public admin history index must be either the developer migrated index or the empty customer index/);
  assert.match(monitorShell, /from "@\/components\/history\/useAdminHistoryIndex"/);
  assert.match(monitorShell, /useAdminHistoryIndex\(snapshot, section\)/);
  assert.doesNotMatch(monitorShell, /function mergeDocuments\(/);
  assert.doesNotMatch(monitorShell, /function fetchAdminHistoryIndex\(/);
  assert.match(adminHistoryHook, /let cachedAdminHistoryIndex: WorkspaceAdminHistoryIndex \| null = null;/);
  assert.match(adminHistoryHook, /let adminHistoryIndexPromise: Promise<WorkspaceAdminHistoryIndex> \| null = null;/);
  assert.match(adminHistoryHook, /adminHistoryIndexPromise = null;/);
  assert.match(adminHistoryHook, /throw error;/);
  assert.match(adminHistoryHook, /window\.requestIdleCallback\(load, \{ timeout: 5000 \}\)/);
  assert.match(adminHistoryHook, /new URL\("admin-history-index\.json", window\.location\.href\)/);
  assert.match(adminHistoryHook, /관리자용 기록/);
});

test("History admin loading is split into a local cached hook", () => {
  assert.match(adminHistoryHook, /export function useAdminHistoryIndex\(snapshot: WorkspaceSnapshot, section: string\)/);
  assert.match(adminHistoryHook, /function loadAdminHistoryIndex\(controller: AbortController \| null\)/);
  assert.match(adminHistoryHook, /function buildHistoryDaysFromDocuments/);
  assert.match(adminHistoryHook, /function adminHistoryStatusText/);
  assert.match(monitorShell, /const \{ documents: monitorDocuments, historyDays: monitorHistoryDays, statusText: adminHistoryStatusText \}/);
});

test("Operator Center and task run copy localize high-visibility Korean UI", () => {
  assert.match(monitorShell, /<OperatorCenterDialog[\s\S]*?language=\{uiLanguage\}/);
  assert.match(operatorCenterDialog, /aria-label=\{ko \? "운영 센터" : "Operator Center"\}/);
  assert.match(operatorCenterDialog, /운영 도구는 주 작업면과 분리됩니다/);
  assert.match(operatorCenterDialog, /\$\{section\.shortLabel\} 열기/);
  assert.match(monitorShell, /질문 자동 보류는 초기화 설정에서만 바꿉니다/);
  assert.match(desktopRuntimeCopySource, /로그 열기/);
  assert.match(desktopRuntimeCopySource, /제한된 표준 출력\/오류 미리보기와 실행 기록 JSON/);
  assert.match(monitorShell, /label="기록 날짜"/);
  assert.match(monitorShell, /label="기록 문서"/);
  assert.match(monitorShell, /작업 기록과 모니터링 신호/);
  assert.match(monitorShell, /모든 기록 유형/);
  assert.match(desktopRuntimeCopySource, /작업 실행 저장소/);
  assert.match(monitorShell, /CLI 실행 경로/);
  assert.match(monitorShell, /공개 배포 차단 요소/);
  assert.match(toolStudioData, /표준 출력\/오류와 작업 실행 기록/);
  assert.match(toolStudio, /빠른 작업 메뉴/);
  assert.match(toolStudio, /가상 환경 생성/);
  assert.match(nativeGitWorkbench, /보관 항목을 선택하세요/);
  assert.match(runtimeTerminalDrawer, /구조화된 터미널 이벤트/);
  assert.doesNotMatch(monitorShell, /히스토리와 모니터링 통합 stream/);
  assert.doesNotMatch(monitorShell, /task-run store에/);
  assert.doesNotMatch(monitorShell, /decision inbox로/);
  assert.doesNotMatch(monitorShell, /CLI lane으로|CLI lane,|CLI lane 실행|CLI lane을/);
  assert.doesNotMatch(monitorShell, /blocker나|배포 blocker/);
  assert.doesNotMatch(monitorShell, /Tauri runtime이|native 런타임|필터와 snapshot/);
  assert.doesNotMatch(toolStudio, /빠른 액션 메뉴|Smoke 실행|workflow 복사|Registry 반영/);
  assert.doesNotMatch(nativeGitWorkbench, /Stash를 선택하세요|선택 Stash|전체 Stash|pathspec/);
});

test("Operator history surfaces keep timeline documents in bounded scroll panes", () => {
  assert.equal(packageJson.scripts["audit:surfaces"], "node scripts/audit-monitor-surfaces.mjs");
  assert.match(surfaceAudit, /const operatorSections = \[/);
  assert.match(surfaceAudit, /desktop:\$\{section\}/);
  assert.doesNotMatch(surfaceAudit, /mobile:history/);
  assert.match(surfaceAudit, /viewport: "1280x800"/);
  assert.match(surfaceAudit, /timeline docs must be a bounded scroll pane/);
  assert.match(css, /\.timeline-docs \{[\s\S]*?max-height: clamp\(260px, 34dvh, 420px\);[\s\S]*?overflow: auto;/);
  assert.match(css, /\.timeline-docs \{[\s\S]*?background: var\(--scroll-scope-bg\);/);
  assert.match(scrollCheck, /selector: "\.timeline-docs"/);
  assert.match(scrollCheck, /max-height: clamp\(260px, 34dvh, 420px\);/);
  assert.match(css, /\.agent-chat-details summary \{[\s\S]*?min-height: var\(--control-target-size\);/);
  assert.match(css, /\.agent-chat-details summary::-webkit-details-marker \{[\s\S]*?display: none;/);
});

test("Tool Studio build mode exposes a dedicated tool builder workbench", () => {
  assert.match(toolStudioTypes, /export type ToolBuilderBlueprint = \{/);
  assert.match(toolStudioTypes, /packageName: string;/);
  assert.match(toolStudioTypes, /moduleName: string;/);
  assert.match(toolStudioTypes, /entrypoint: string;/);
  assert.match(toolStudioTypes, /pyprojectPath: string;/);
  assert.match(toolStudioTypes, /testPath: string;/);
  assert.match(toolStudioTypes, /initCommand: string;/);
  assert.match(toolStudioTypes, /editTargets: string\[\];/);
  assert.match(toolStudioTypes, /sourceChecklistKo: string\[\];/);
  assert.match(toolStudioTypes, /sourceChecklistEn: string\[\];/);
  assert.match(toolStudioData, /export const toolBuilderBlueprints: ToolBuilderBlueprint\[\] = \[/);
  assert.match(toolStudioData, /id:\s*"python-cli-tool"[\s\S]*?id:\s*"mcp-wrapper-tool"[\s\S]*?id:\s*"automation-tool"/);
  assert.match(toolStudio, /const \[selectedBlueprintId, setSelectedBlueprintId\] = useState/);
  assert.match(toolStudio, /const \[selectedSourceTarget, setSelectedSourceTarget\] = useState/);
  assert.match(toolStudio, /const selectedSourceChecklist = ko \? selectedBlueprint\.sourceChecklistKo : selectedBlueprint\.sourceChecklistEn/);
  assert.match(toolStudio, /className="tool-builder-workbench"/);
  assert.match(toolStudio, /data-tool-builder-blueprint=\{blueprint\.id\}/);
  assert.match(toolStudio, /data-tool-builder-manifest/);
  assert.match(toolStudio, /data-tool-builder-command="run"/);
  assert.match(toolStudio, /data-tool-builder-command="package"/);
  assert.match(toolStudio, /data-tool-builder-action="source"/);
  assert.match(toolStudio, /data-tool-builder-action="smoke"/);
  assert.match(toolStudio, /data-tool-builder-action="package"/);
  assert.match(toolStudio, /data-tool-builder-action="copy"/);
  assert.match(toolStudio, /className="tool-python-source-manager"/);
  assert.match(toolStudio, /data-tool-python-source-manager/);
  assert.match(toolStudio, /data-tool-python-source-files/);
  assert.match(toolStudio, /data-tool-python-source-target=\{target\}/);
  assert.match(toolStudio, /data-tool-python-source-pyproject/);
  assert.match(toolStudio, /data-tool-python-source-entrypoint/);
  assert.match(toolStudio, /data-tool-python-source-checklist/);
  assert.match(toolStudio, /data-tool-python-source-command/);
  assert.match(toolStudio, /data-tool-python-source-action="open"/);
  assert.match(toolStudio, /data-tool-python-source-action="terminal"/);
  assert.match(toolStudio, /data-tool-python-source-action="copy"/);
  assert.match(toolStudio, /copyPythonSourcePlan/);
  assert.match(toolStudio, /writeClipboardText\(JSON\.stringify/);
  assert.match(css, /\.tool-builder-blueprints \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-builder-canvas \{[\s\S]*?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-builder-actions \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-python-source-manager \{/);
  assert.match(css, /\.tool-python-source-layout \{[\s\S]*?grid-template-columns: minmax\(210px, 1\.05fr\) minmax\(0, 0\.95fr\);/);
  assert.match(css, /\.tool-python-source-checklist ul \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(css, /\.tool-python-source-actions \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-builder-blueprints,[\s\S]*?\.tool-builder-canvas,[\s\S]*?\.tool-builder-actions,/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-python-source-layout,[\s\S]*?\.tool-python-source-actions,[\s\S]*?\.tool-python-source-checklist ul,/);
});

test("Tool Studio environment mode exposes a Python execution workbench", () => {
  assert.match(toolStudioTypes, /export type PythonEnvironmentProfile = \{/);
  assert.match(toolStudioTypes, /export type VirtualEnvironmentLifecycleStep = \{/);
  assert.match(toolStudioData, /export const pythonEnvironmentProfiles: PythonEnvironmentProfile\[\] = \[/);
  assert.match(toolStudioData, /export const virtualEnvironmentLifecycleSteps: VirtualEnvironmentLifecycleStep\[\] = \[/);
  assert.match(toolStudioData, /id:\s*"local-venv"[\s\S]*?id:\s*"isolated-runner"[\s\S]*?id:\s*"agent-sandbox"/);
  assert.match(toolStudioData, /id:\s*"create"[\s\S]*?id:\s*"activate"[\s\S]*?id:\s*"install"[\s\S]*?id:\s*"freeze"[\s\S]*?id:\s*"rebuild"/);
  assert.match(toolStudio, /const \[selectedEnvironmentId, setSelectedEnvironmentId\] = useState/);
  assert.match(toolStudio, /const \[selectedVenvStepId, setSelectedVenvStepId\] = useState/);
  assert.match(toolStudio, /const selectedEnvironment = pythonEnvironmentProfiles\.find/);
  assert.match(toolStudio, /const selectedVenvStep = virtualEnvironmentLifecycleSteps\.find/);
  assert.match(toolStudio, /className="tool-environment-workbench"/);
  assert.match(toolStudio, /data-tool-environment-profile=\{profile\.id\}/);
  assert.match(toolStudio, /data-tool-environment-runtime/);
  assert.match(toolStudio, /data-tool-environment-install/);
  assert.match(toolStudio, /data-tool-environment-run/);
  assert.match(toolStudio, /data-tool-environment-sandbox/);
  assert.match(toolStudio, /data-tool-environment-health/);
  assert.match(toolStudio, /data-tool-venv-manager/);
  assert.match(toolStudio, /data-tool-venv-step=\{step\.id\}/);
  assert.match(toolStudio, /data-tool-venv-command=\{selectedVenvStep\.id\}/);
  assert.match(toolStudio, /data-tool-venv-action="terminal"/);
  assert.match(toolStudio, /data-tool-venv-action="copy-command"/);
  assert.match(toolStudio, /data-tool-venv-action="copy-workflow"/);
  assert.match(toolStudio, /data-tool-environment-action="create"/);
  assert.match(toolStudio, /data-tool-environment-action="install"/);
  assert.match(toolStudio, /data-tool-environment-action="smoke"/);
  assert.match(toolStudio, /data-tool-environment-action="copy"/);
  assert.match(toolStudio, /copyEnvironmentPlan/);
  assert.match(toolStudio, /copyVirtualEnvironmentCommand/);
  assert.match(toolStudio, /copyVirtualEnvironmentWorkflow/);
  assert.match(css, /\.tool-environment-profiles \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-environment-canvas \{[\s\S]*?grid-template-columns: minmax\(0, 1\.05fr\) minmax\(0, 0\.95fr\);/);
  assert.match(css, /\.tool-environment-actions \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-venv-steps \{[\s\S]*?grid-template-columns: repeat\(5, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-venv-actions \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-environment-profiles,[\s\S]*?\.tool-environment-canvas,[\s\S]*?\.tool-environment-actions,/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-venv-heading,[\s\S]*?\.tool-venv-steps,[\s\S]*?\.tool-venv-actions,/);
});

test("Tool Studio deploy mode exposes a deployment workbench", () => {
  assert.match(toolStudioTypes, /export type ToolDeployTarget = \{/);
  assert.match(toolStudioData, /export const toolDeployTargets: ToolDeployTarget\[\] = \[/);
  assert.match(toolStudioData, /id:\s*"local-registry"[\s\S]*?id:\s*"agentcore-gateway"[\s\S]*?id:\s*"desktop-bundle"/);
  assert.match(toolStudio, /const \[selectedDeployTargetId, setSelectedDeployTargetId\] = useState/);
  assert.match(toolStudio, /className="tool-deploy-workbench"/);
  assert.match(toolStudio, /data-tool-deploy-target=\{target\.id\}/);
  assert.match(toolStudio, /data-tool-deploy-release/);
  assert.match(toolStudio, /data-tool-deploy-preflight/);
  assert.match(toolStudio, /data-tool-deploy-guardrails/);
  assert.match(toolStudio, /data-tool-deploy-rollback/);
  assert.match(toolStudio, /data-tool-deploy-action="preflight"/);
  assert.match(toolStudio, /data-tool-deploy-action="package"/);
  assert.match(toolStudio, /data-tool-deploy-action="registry"/);
  assert.match(toolStudio, /data-tool-deploy-action="copy"/);
  assert.match(toolStudio, /copyDeployPlan/);
  assert.match(css, /\.tool-deploy-targets \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-deploy-canvas \{[\s\S]*?grid-template-columns: minmax\(0, 1\.15fr\) minmax\(0, 0\.85fr\);/);
  assert.match(css, /\.tool-deploy-actions \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-deploy-targets,[\s\S]*?\.tool-deploy-canvas,[\s\S]*?\.tool-deploy-actions,/);
});

test("AgentCore builder supports multi-capability bundles", () => {
  assert.match(agentBuilderPanels, /type AgentCoreCapabilityOption = \{/);
  assert.match(agentBuilderPanels, /const agentCoreCapabilityOptions: AgentCoreCapabilityOption\[\] = \[/);
  assert.match(agentBuilderPanels, /id:\s*"runtime"[\s\S]*?id:\s*"memory"[\s\S]*?id:\s*"gateway"[\s\S]*?id:\s*"browser"[\s\S]*?id:\s*"code_interpreter"[\s\S]*?id:\s*"identity"[\s\S]*?id:\s*"policy"[\s\S]*?id:\s*"observability"[\s\S]*?id:\s*"evaluation"/);
  assert.match(agentBuilderPanels, /resourceKo:\s*"런타임"[\s\S]*?resourceKo:\s*"메모리"[\s\S]*?resourceKo:\s*"게이트웨이"[\s\S]*?resourceKo:\s*"기본 제공 도구"/);
  assert.match(agentBuilderPanels, /const agentCoreResourceLifecycleSteps = \[/);
  assert.match(monitorShell, /selectedCapabilityIds: string\[\] = blueprint\.capabilities/);
  assert.match(monitorShell, /selectedCapabilities\.map\(\(item\) => item\.localCapability\)/);
  assert.match(agentBuilderPanels, /const \[selectedCapabilityIds, setSelectedCapabilityIds\] = useState<string\[\]>\(defaultCapabilityIds\)/);
  assert.match(agentBuilderPanels, /data-agentcore-capability=\{option\.id\}/);
  assert.match(agentBuilderPanels, /aria-pressed=\{selected\}/);
  assert.match(agentBuilderPanels, /data-agentcore-select-all/);
  assert.match(agentBuilderPanels, /className="agentcore-resource-topology"/);
  assert.match(agentBuilderPanels, /data-agentcore-resource=\{option\.id\}/);
  assert.match(agentBuilderPanels, /option\.localCapability/);
  assert.match(agentBuilderPanels, /onApplyBlueprint\(selectedBlueprint\.id, selectedCapabilityIds\)/);
  assert.match(agentBuilderPanels, /onStartPreflight\(selectedBlueprint\.id, selectedCapabilityIds\)/);
  assert.match(agentBuilderPanels, /onCreateProposal\(selectedBlueprint\.id, selectedCapabilityIds\)/);
  assert.match(css, /\.agentcore-capability-grid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.agentcore-resource-grid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.agentcore-resource-lifecycle \{[\s\S]*?grid-template-columns: repeat\(5, minmax\(0, 1fr\)\);/);
});

test("Monitor home exposes task-intent routes before section names", () => {
  const focusCommandIndex = monitorShell.indexOf("home-focus-command");
  const taskIntentIndex = monitorShell.indexOf("workspace-home-actions task-intent-grid");
  const statusRowIndex = monitorShell.indexOf("core-home-status-row");

  assert.match(monitorShell, /type TaskIntentItem = \{/);
  assert.match(monitorShell, /type HomeStartFlowStep = \{/);
  assert.match(monitorShell, /const \[activeTaskIntentId, setActiveTaskIntentId\] = useState\(""\)/);
  assert.match(monitorShell, /const \[activeTaskFlowStepId, setActiveTaskFlowStepId\] = useState\(""\)/);
  assert.match(monitorShell, /const \[requestedToolMode, setRequestedToolMode\] = useState<ToolStudioModeRequest \| null>\(null\)/);
  assert.match(monitorShell, /const taskIntentItems = useMemo<TaskIntentItem\[\]>/);
  assert.match(monitorShell, /id:\s*"import-workspace"[\s\S]*?targetSection:\s*"source"/);
  assert.match(monitorShell, /nextStep:\s*uiLanguage === "ko" \? "작업할 Git 레포를 선택하고 현재 작업 파일과 상태를 엽니다\."/);
  assert.match(monitorShell, /id: "open", label: "기존 Git 레포 열기", actionLabel: "가져오기", run: selectIntentStep\("import-workspace", "source", "open"\)/);
  assert.match(monitorShell, /id: "clone", label: "원격 레포 clone", actionLabel: "Clone", run: selectIntentStep\("import-workspace", "source", "clone"\)/);
  assert.match(monitorShell, /setRequestedToolMode\(\(previous\) => \(\{ mode, requestId: \(previous\?\.requestId \|\| 0\) \+ 1 \}\)\)/);
  assert.match(monitorShell, /openSection\("tools", \{ intentId: "build-tool", flowStepId \}\)/);
  assert.match(monitorShell, /const selectIntentStep = useCallback/);
  assert.match(monitorShell, /const selectToolStep = useCallback/);
  assert.doesNotMatch(monitorShell, /id:\s*"build-tool"[\s\S]*?targetSection:\s*"tools"/);
  assert.doesNotMatch(monitorShell, /run: selectIntentStep\("create-agent", "agents", "role"\)/);
  assert.doesNotMatch(monitorShell, /run: selectToolStep\("build", "source"\)/);
  assert.match(monitorShell, /run: selectIntentStep\("run-work", "desktop", "lane"\)/);
  assert.match(monitorShell, /run: selectIntentStep\("evaluate-work", "eval", "current"\)/);
  assert.match(monitorShell, /run: selectIntentStep\("open-files", "source", "file"\)/);
  assert.match(monitorShell, /id: "timeline-summary"/);
  assert.match(monitorShell, /id: "workspace-open"/);
  assert.match(monitorShell, /id: "run-lane"/);
  assert.match(monitorShell, /id: "eval-current"/);
  assert.match(monitorShell, /id: "project-registry"/);
  assert.match(monitorShell, /id: "questions", label: "보류 질문 확인", actionLabel: "결정함", run: selectIntentStep\("resolve-decisions", "eval", "questions"\)/);
  assert.match(coreDrilldown, /connections\?: Array/);
  assert.match(coreDrilldown, /data-core-feature-connections=\{feature\.id\}/);
  assert.match(coreDrilldown, /data-core-feature-action=\{connection\.id\}/);
  assert.match(monitorShell, /requestedMode=\{requestedToolMode\}/);
  assert.match(monitorShell, /data-task-intent=\{item\.id\}/);
  assert.match(monitorShell, /data-task-handoff=\{activeTaskIntent\.id\}/);
  assert.match(monitorShell, /data-task-flow-step=\{step\.id\}/);
  assert.match(monitorShell, /aria-current=\{step\.id === activeTaskFlowStep\?\.id \? "step" : undefined\}/);
  assert.match(monitorShell, /className="task-flow-rail"/);
  assert.match(monitorShell, /const primaryHomeIntent = useMemo/);
  assert.match(monitorShell, /taskIntentItems\.find\(\(item\) => item\.id === "import-workspace"\)/);
  assert.match(monitorShell, /const primaryHomeFlowStep = useMemo/);
  assert.match(monitorShell, /const homeStartFlow = useMemo<HomeStartFlowStep\[\]>/);
  assert.match(monitorShell, /id: "prepare"[\s\S]*?id: "choose"[\s\S]*?id: "run"[\s\S]*?id: "evaluate"/);
  assert.match(monitorShell, /data-home-start-flow/);
  assert.match(monitorShell, /data-home-flow-step=\{step\.id\}/);
  assert.match(monitorShell, /primaryHomeIntent\.label/);
  assert.match(monitorShell, /primaryHomeIntent\.detail/);
  assert.doesNotMatch(monitorShell, /한 화면은 하나의 결정을 크게 보여줍니다/);
  assert.match(monitorShell, /className="home-focus-command"/);
  assert.match(monitorShell, /data-home-focus-command/);
  assert.match(monitorShell, /className="home-focus-card"/);
  assert.match(monitorShell, /data-home-focus-card=\{primaryHomeIntent\.id\}/);
  assert.match(monitorShell, /className="home-focus-flow"/);
  assert.match(monitorShell, /data-home-focus-primary/);
  assert.match(monitorShell, /className="home-navigation-dock"/);
  assert.match(monitorShell, /data-home-navigation-dock/);
  assert.match(monitorShell, /className="task-intent-icon"/);
  assert.match(monitorShell, /className="task-intent-action-cue"/);
  assert.match(monitorShell, /data-active-section=\{section\}/);
  assert.match(monitorShell, /!isPrimaryWorkSurface && section !== "overview" && \(/);
  assert.match(monitorShell, /taskIntentItems\.map\(\(item\) => \(\{/);
  assert.ok(focusCommandIndex > -1);
  assert.ok(taskIntentIndex > -1);
  assert.ok(statusRowIndex > -1);
  assert.ok(focusCommandIndex < taskIntentIndex);
  assert.ok(taskIntentIndex < statusRowIndex);
  assert.match(monitorShell, /group:\s*uiLanguage === "ko" \? "하고 싶은 일" : "Goal"/);
  assert.match(monitorShell, /placeholder=\{uiLanguage === "ko" \? "하고 싶은 일 검색: 작업공간, 실행, 보고서, 파일, 설정"/);
  assert.match(css, /\.core-home-panel \{[\s\S]*?background: transparent;/);
  assert.match(css, /--surface-panel:/);
  assert.match(css, /--font-size-work-title:/);
  assert.match(css, /--line-height-tight:/);
  assert.match(css, /--line-accent:/);
  assert.match(css, /--focus-shadow:/);
  assert.match(css, /--font-weight-strong:/);
  assert.match(css, /\.home-focus-command \{[\s\S]*?grid-template-columns: minmax\(0, 0\.9fr\) minmax\(320px, 1\.1fr\);/);
  assert.match(css, /\.home-focus-command \{[\s\S]*?min-height: 252px;/);
  assert.match(css, /\.home-focus-command::before \{[\s\S]*?height: 3px;/);
  assert.match(css, /\.home-focus-copy h2 \{[\s\S]*?font-size: var\(--font-size-work-title\);/);
  assert.match(css, /\.home-focus-card \{[\s\S]*?background: var\(--surface-depth-focus\);[\s\S]*?box-shadow: var\(--surface-shadow-medium\), var\(--hairline-shadow\);/);
  assert.match(css, /\.home-focus-flow \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.main-feature-connections \{/);
  assert.match(css, /\.main-feature-connections button \{/);
  assert.match(css, /@media \(max-width: 1080px\) \{[\s\S]*?\.main-feature-connections,/);
  assert.match(css, /\.home-focus-card button \{[\s\S]*?min-height: 48px;/);
  assert.match(css, /\.home-start-flow \{[\s\S]*?background: color-mix\(in srgb, var\(--surface-depth-1\) 86%, var\(--surface-muted\) 14%\);/);
  assert.match(css, /\.home-start-flow ol \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.home-start-flow button \{[\s\S]*?grid-template-columns: 26px 28px minmax\(0, 1fr\) minmax\(44px, auto\) 22px;/);
  assert.match(css, /\.home-navigation-dock \{/);
  assert.match(css, /\.home-navigation-dock \.task-intent-grid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.home-navigation-dock \.workspace-home-actions\.task-intent-grid button \{[\s\S]*?min-height: 88px;/);
  assert.match(css, /\.task-intent-grid \{[\s\S]*?grid-template-columns: repeat\(auto-fit, minmax\(300px, 1fr\)\);/);
  assert.match(css, /\.workspace-home-actions\.task-intent-grid button \{[\s\S]*?grid-template-columns: 28px 30px minmax\(0, 1fr\) minmax\(34px, auto\) 28px;/);
  assert.match(css, /\.task-intent-icon,[\s\S]*?\.task-intent-action-cue \{/);
  assert.match(css, /\.workspace-home-actions\.task-intent-grid button:not\(:disabled\):active \{[\s\S]*?inset 0 2px 8px/);
  assert.match(css, /\.task-handoff-strip \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto;/);
  assert.match(css, /\.task-flow-rail \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.task-flow-rail button \{[\s\S]*?min-height: 44px;/);
  assert.match(css, /@media \(max-width: 960px\) \{[\s\S]*?\.home-focus-command,[\s\S]*?\.home-focus-flow,[\s\S]*?\.home-start-flow header,[\s\S]*?\.home-start-flow ol,[\s\S]*?\.workspace-home-actions,/);
});

test("Activity rail exposes readable destination labels in the desktop shell", () => {
  assert.match(desktopActivityRail, /<span>\{item\.shortLabel\}<\/span>/);
  assert.match(desktopActivityRail, /aria-current=\{activeSectionId === item\.id \? "page" : undefined\}/);
  assert.match(desktopActivityRail, /const homeLabel = language === "ko" \? "작업공간 홈" : "Workspace Home"/);
  assert.match(desktopActivityRail, /const operatorLabel = language === "ko" \? "운영 센터 열기" : "Open Operator Center"/);
  assert.match(desktopActivityRail, /const settingsLabel = language === "ko" \? "설정" : "Settings"/);
  assert.match(css, /--desktop-app-min-width: 1280px;/);
  assert.match(css, /--desktop-app-min-height: 800px;/);
  assert.match(css, /\.desktop-app-shell \{[\s\S]*?grid-template-columns: 76px minmax\(0, 1fr\);/);
  assert.match(css, /\.desktop-app-shell \{[\s\S]*?min-width: var\(--desktop-app-min-width\);/);
  assert.match(css, /@media \(max-width: 960px\) \{[\s\S]*?main,\s*\n\s*\.desktop-app-root,\s*\n\s*\.desktop-app-shell \{[\s\S]*?min-width: 0;/);
  assert.match(css, /\.activity-rail nav \{[\s\S]*?width: 100%;[\s\S]*?overflow-x: hidden;[\s\S]*?overflow-y: auto;[\s\S]*?scrollbar-gutter: auto;/);
  assert.match(css, /\.activity-rail nav button \{[\s\S]*?display: grid;[\s\S]*?grid-template-rows: auto auto;[\s\S]*?min-height: 56px;/);
  assert.match(css, /\.activity-rail nav button \{[\s\S]*?box-sizing: border-box;[\s\S]*?width: min\(100%, 58px\);/);
  assert.match(css, /\.desktop-app-shell\.sidebar-expanded \.activity-rail nav button \{[\s\S]*?width: 100%;/);
  assert.match(css, /\.activity-rail nav button span \{[\s\S]*?position: static;[\s\S]*?text-overflow: ellipsis;[\s\S]*?white-space: nowrap;/);
  assert.doesNotMatch(css, /@media \(pointer: coarse\)/);
  assert.doesNotMatch(css, /@media \(max-width: 720px\)/);
  assert.doesNotMatch(css, /@media \(max-width: 420px\)/);
});

test("Desktop chrome uses elevated navigation and tab states", () => {
  assert.match(css, /--chrome-shadow:/);
  assert.match(css, /--rail-shadow:/);
  assert.match(css, /--control-press-shadow:/);
  assert.match(css, /--section-tab-shadow:/);
  assert.match(css, /--section-tab-active-shadow:/);
  assert.match(css, /--surface-edge-highlight:/);
  assert.match(css, /\.desktop-titlebar \{[\s\S]*?box-shadow: var\(--chrome-shadow\);/);
  assert.match(css, /\.activity-rail \{[\s\S]*?box-shadow: var\(--rail-shadow\), inset -1px 0 0 var\(--ide-tool-window-highlight\);/);
  assert.match(css, /\.activity-rail nav button::before \{/);
  assert.match(css, /\.activity-rail button\[aria-current="page"\]/);
  assert.match(css, /\.section-tab-group\.active::before \{/);
  assert.match(css, /\.section-tabs button,[\s\S]*?\.panel-heading button \{[\s\S]*?background: var\(--choice-bg\);[\s\S]*?box-shadow: var\(--section-tab-shadow\), var\(--surface-edge-highlight\);/);
  assert.match(css, /\.section-tabs button\.active \{[\s\S]*?background: var\(--choice-selected-bg\);[\s\S]*?box-shadow: var\(--tab-selected-shadow\);/);
  assert.match(css, /\.panel \{[\s\S]*?background: var\(--surface-depth-0\);[\s\S]*?box-shadow: var\(--surface-shadow-low\), var\(--surface-edge-highlight\);/);
  assert.match(css, /\.tool-studio-actions button,[\s\S]*?\.tool-studio-mode-rail button \{[\s\S]*?background: var\(--choice-bg\);[\s\S]*?box-shadow: var\(--section-tab-shadow\), var\(--surface-edge-highlight\);/);
  assert.match(css, /\.tool-studio-depth-rail button\.active,[\s\S]*?\.tool-studio-mode-rail button\.active \{[\s\S]*?background: var\(--choice-selected-bg\);[\s\S]*?box-shadow: var\(--tab-selected-shadow\);/);
});
