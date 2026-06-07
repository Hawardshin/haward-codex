import { readFileSync } from "node:fs";
import { basename, join } from "node:path";

// Rust feature module 목록은 실제 파일 존재 검사와 runtime source aggregate의 기준이다.
export const tauriFeatureModuleFiles = [
  "src-tauri/src/features/mod.rs",
  "src-tauri/src/features/app_shell.rs",
  "src-tauri/src/features/cli.rs",
  "src-tauri/src/features/native.rs",
  "src-tauri/src/features/workspace.rs",
  "src-tauri/src/features/providers.rs",
  "src-tauri/src/features/app_update.rs",
  "src-tauri/src/features/diagnostics.rs",
  "src-tauri/src/features/service_readiness.rs",
  "src-tauri/src/features/agent_factory.rs",
  "src-tauri/src/features/decisions.rs"
];

export const tauriFeatureModuleNames = tauriFeatureModuleFiles.map((file) => basename(file));

export const tauriLibPartFiles = [
  "src-tauri/src/lib_parts/01_imports_and_core_types.rs",
  "src-tauri/src/lib_parts/02_native_reports_and_preferences.rs",
  "src-tauri/src/lib_parts/03_provider_and_git_types.rs",
  "src-tauri/src/lib_parts/04_decision_types_and_constants.rs",
  "src-tauri/src/lib_parts/05_adapter_catalog_and_probe_commands.rs",
  "src-tauri/src/lib_parts/06_task_records_and_front_commands.rs",
  "src-tauri/src/lib_parts/07_cli_session_runtime.rs",
  "src-tauri/src/lib_parts/08_session_io_and_workspace_commands.rs",
  "src-tauri/src/lib_parts/09_workspace_resource_cache.rs",
  "src-tauri/src/lib_parts/10_decision_commands_and_app_run.rs",
  "src-tauri/src/lib_parts/11_adapter_health_and_processes.rs",
  "src-tauri/src/lib_parts/12_native_process_actions.rs",
  "src-tauri/src/lib_parts/13_pty_runtime_and_output.rs",
  "src-tauri/src/lib_parts/14_task_run_persistence.rs",
  "src-tauri/src/lib_parts/15_runtime_data_overview.rs",
  "src-tauri/src/lib_parts/16_data_stats_and_factory.rs",
  "src-tauri/src/lib_parts/17_payload_support_and_utilities.rs",
  "src-tauri/src/lib_parts/18_source_and_decision_detection.rs",
  "src-tauri/src/lib_parts/19_decision_inbox_helpers.rs",
  "src-tauri/src/lib_parts/20_preferences_and_clipboard_helpers.rs",
  "src-tauri/src/lib_parts/21_subagent_plan_runtime.rs",
  "src-tauri/src/lib_parts/22_subagent_fanout_runtime.rs",
  "src-tauri/src/lib_parts/23_workspace_state_and_git_status.rs",
  "src-tauri/src/lib_parts/24_git_actions_and_workspace_state.rs",
  "src-tauri/src/lib_parts/25_git_reports_and_paths.rs",
  "src-tauri/src/lib_parts/26_git_mutation_helpers.rs",
  "src-tauri/src/lib_parts/27_workspace_paths_and_command_resolution.rs",
  "src-tauri/src/lib_parts/28_tests.rs"
];

export const tauriLibPartSourcePaths = Object.fromEntries(
  tauriLibPartFiles.map((file, index) => [`tauriLibPart${String(index + 1).padStart(2, "0")}`, file])
);

// command 구현이 lib.rs 밖으로 이동해도 readiness 검사가 같은 런타임 표면을 보게 묶는다.
export const tauriRuntimeSourcePaths = {
  tauriLib: "src-tauri/src/lib.rs",
  ...tauriLibPartSourcePaths,
  tauriAppShell: "src-tauri/src/features/app_shell.rs",
  tauriAppUpdate: "src-tauri/src/features/app_update.rs",
  tauriServiceReadiness: "src-tauri/src/features/service_readiness.rs",
  tauriProviders: "src-tauri/src/features/providers.rs"
};

export const tauriRuntimeSourceKeys = [
  "tauriLib",
  ...Object.keys(tauriLibPartSourcePaths),
  "tauriAppShell",
  "tauriAppUpdate",
  "tauriServiceReadiness",
  "tauriProviders"
];

export const monitorWorkbenchSourcePaths = {
  monitorShell: "renderer/workspace-monitor/components/MonitorShell.tsx",
  runtimeDisplay: "renderer/workspace-monitor/lib/runtimeDisplay.ts",
  desktopActivityRail: "renderer/workspace-monitor/components/shell/DesktopActivityRail.tsx",
  coreFeatureDrilldown: "renderer/workspace-monitor/components/workbench/CoreFeatureDrilldown.tsx",
  nativeGitWorkbench: "renderer/workspace-monitor/components/workbench/NativeGitWorkbench.tsx",
  pathDisclosure: "renderer/workspace-monitor/components/workbench/PathDisclosure.tsx",
  runtimeTerminalDrawer: "renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx",
  runtimeNativePtySurface: "renderer/workspace-monitor/components/workbench/runtime-terminal/RuntimeNativePtyTerminalSurface.tsx",
  runtimeTerminalStartPanel: "renderer/workspace-monitor/components/workbench/runtime-terminal/RuntimeTerminalStartPanel.tsx",
  runtimeTerminalCopy: "renderer/workspace-monitor/components/workbench/runtime-terminal/runtimeTerminalCopy.ts",
  runtimeTerminalTypes: "renderer/workspace-monitor/components/workbench/runtime-terminal/runtimeTerminalTypes.ts",
  runtimeTerminalUtils: "renderer/workspace-monitor/components/workbench/runtime-terminal/runtimeTerminalUtils.ts",
  sourceEditorCatalog: "renderer/workspace-monitor/components/workbench/source-editor/sourceCatalog.ts",
  sourceEditorDraftActions: "renderer/workspace-monitor/components/workbench/source-editor/sourceDraftActions.ts",
  sourceEditorDocuments: "renderer/workspace-monitor/components/workbench/source-editor/sourceDocuments.ts",
  sourceEditorDrafts: "renderer/workspace-monitor/components/workbench/source-editor/sourceDrafts.ts",
  sourceEditorDiff: "renderer/workspace-monitor/components/workbench/source-editor/sourceDiff.ts",
  sourceEditorLanguage: "renderer/workspace-monitor/components/workbench/source-editor/sourceLanguage.ts",
  sourceWorkbenchPanel: "renderer/workspace-monitor/components/workbench/source-editor/SourceWorkbenchPanel.tsx",
  sourceCommandToolbar: "renderer/workspace-monitor/components/workbench/source-editor/SourceCommandToolbar.tsx",
  sourceEditorFrame: "renderer/workspace-monitor/components/workbench/source-editor/SourceEditorFrame.tsx",
  sourceEditorTabs: "renderer/workspace-monitor/components/workbench/source-editor/SourceEditorTabs.tsx",
  sourceFileBrowser: "renderer/workspace-monitor/components/workbench/source-editor/SourceFileBrowser.tsx",
  sourceFileControls: "renderer/workspace-monitor/components/workbench/source-editor/SourceFileControls.tsx",
  sourceSaveResultsPanel: "renderer/workspace-monitor/components/workbench/source-editor/SourceSaveResultsPanel.tsx",
  sourceWorkbenchHeader: "renderer/workspace-monitor/components/workbench/source-editor/SourceWorkbenchHeader.tsx",
  sourceWorkbenchSwitcher: "renderer/workspace-monitor/components/workbench/source-editor/SourceWorkbenchSwitcher.tsx",
  sourceWorkspaceStatusStrip: "renderer/workspace-monitor/components/workbench/source-editor/SourceWorkspaceStatusStrip.tsx",
  sourceWorkbenchTypes: "renderer/workspace-monitor/components/workbench/source-editor/sourceWorkbenchTypes.ts",
  sourceEditorSession: "renderer/workspace-monitor/components/workbench/source-editor/useSourceEditorSession.ts",
  sourceWorkbenchController: "renderer/workspace-monitor/components/workbench/source-editor/useSourceWorkbenchController.ts",
  sourceEditorLoadRequests: "renderer/workspace-monitor/components/workbench/source-editor/useSourceLoadRequestGate.ts",
  sourceEditorMonacoConfig: "renderer/workspace-monitor/components/workbench/source-editor/monacoConfig.ts",
  sourceEditorTemplates: "renderer/workspace-monitor/components/workbench/source-editor/sourceTemplates.ts",
  workspaceExplorerPane: "renderer/workspace-monitor/components/workbench/WorkspaceExplorerPane.tsx",
  agentBuilderPanels: "renderer/workspace-monitor/components/workbench/AgentBuilderPanels.tsx",
  agentDetailPanels: "renderer/workspace-monitor/components/workbench/AgentDetailPanels.tsx",
  accumulatedDataPanel: "renderer/workspace-monitor/components/features/AccumulatedDataPanel.tsx",
  desktopActionFeedbackCard: "renderer/workspace-monitor/components/features/DesktopActionFeedbackCard.tsx",
  agentFirstRunGuideCard: "renderer/workspace-monitor/components/features/AgentFirstRunGuideCard.tsx",
  desktopControlPanel: "renderer/workspace-monitor/components/features/DesktopControlPanel.tsx",
  providerAccountsPanel: "renderer/workspace-monitor/components/features/ProviderAccountsPanel.tsx",
  providerAccountSettingsHook: "renderer/workspace-monitor/components/features/useProviderAccountSettings.ts",
  runtimeSessionPresets: "renderer/workspace-monitor/components/features/runtimeSessionPresets.ts",
  runtimeWorkspaceCopy: "renderer/workspace-monitor/components/features/runtimeWorkspaceCopy.ts",
  runtimeCustomizationPanel: "renderer/workspace-monitor/components/features/RuntimeCustomizationPanel.tsx",
  searchAgentWorkChatPanel: "renderer/workspace-monitor/components/features/SearchAgentWorkChatPanel.tsx",
  runtimeDataSupportPanel: "renderer/workspace-monitor/components/features/RuntimeDataSupportPanel.tsx",
  runtimeInitStatusCard: "renderer/workspace-monitor/components/features/RuntimeInitStatusCard.tsx",
  serviceReadinessPanel: "renderer/workspace-monitor/components/features/ServiceReadinessPanel.tsx",
  taskRunStorePanel: "renderer/workspace-monitor/components/features/TaskRunStorePanel.tsx",
  workspaceHostPanel: "renderer/workspace-monitor/components/features/WorkspaceHostPanel.tsx",
  projectManagementPanel: "renderer/workspace-monitor/components/features/ProjectManagementPanel.tsx",
  workspaceProductSplitPanel: "renderer/workspace-monitor/components/features/WorkspaceProductSplitPanel.tsx",
  monitorSummaryWidgets: "renderer/workspace-monitor/components/features/MonitorSummaryWidgets.tsx",
  runtimeCatalog: "renderer/workspace-monitor/components/features/runtimeCatalog.ts",
  runtimeEnvironmentRefreshHook: "renderer/workspace-monitor/components/features/useRuntimeEnvironmentRefresh.ts",
  settingsRuntimeSyncHook: "renderer/workspace-monitor/components/features/useSettingsRuntimeSync.ts",
  evaluationReportPanel: "renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx",
  evaluationReportModel: "renderer/workspace-monitor/components/features/evaluationReportModel.ts",
  evaluationReportCatalog: "renderer/workspace-monitor/components/features/evaluationReportCatalog.ts",
  evaluationRuntimeTelemetry: "renderer/workspace-monitor/components/features/evaluationRuntimeTelemetry.ts"
};

// 큰 테스트 파일에서 readFileSync 중복을 만들지 않도록 source map key를 한 곳에서 관리한다.
export const monitorWorkbenchSourceKeys = [
  "monitorShell",
  "runtimeDisplay",
  "desktopActivityRail",
  "coreFeatureDrilldown",
  "nativeGitWorkbench",
  "pathDisclosure",
  "runtimeTerminalDrawer",
  "runtimeNativePtySurface",
  "runtimeTerminalStartPanel",
  "runtimeTerminalCopy",
  "runtimeTerminalTypes",
  "runtimeTerminalUtils",
  "sourceEditorCatalog",
  "sourceEditorDraftActions",
  "sourceEditorDocuments",
  "sourceEditorDrafts",
  "sourceEditorDiff",
  "sourceEditorLanguage",
  "sourceWorkbenchPanel",
  "sourceCommandToolbar",
  "sourceEditorFrame",
  "sourceEditorTabs",
  "sourceFileBrowser",
  "sourceFileControls",
  "sourceSaveResultsPanel",
  "sourceWorkbenchHeader",
  "sourceWorkbenchSwitcher",
  "sourceWorkspaceStatusStrip",
  "sourceWorkbenchTypes",
  "sourceEditorSession",
  "sourceWorkbenchController",
  "sourceEditorLoadRequests",
  "sourceEditorMonacoConfig",
  "sourceEditorTemplates",
  "workspaceExplorerPane",
  "agentBuilderPanels",
  "agentDetailPanels",
  "accumulatedDataPanel",
  "desktopActionFeedbackCard",
  "agentFirstRunGuideCard",
  "desktopControlPanel",
  "providerAccountsPanel",
  "providerAccountSettingsHook",
  "runtimeSessionPresets",
  "runtimeWorkspaceCopy",
  "runtimeCustomizationPanel",
  "searchAgentWorkChatPanel",
  "runtimeDataSupportPanel",
  "runtimeInitStatusCard",
  "serviceReadinessPanel",
  "taskRunStorePanel",
  "workspaceHostPanel",
  "projectManagementPanel",
  "workspaceProductSplitPanel",
  "monitorSummaryWidgets",
  "runtimeCatalog",
  "runtimeEnvironmentRefreshHook",
  "settingsRuntimeSyncHook"
];

export const serviceReadinessMonitorSourceKeys = [
  "monitorShell",
  "runtimeDisplay",
  "sourceWorkbenchPanel",
  "sourceCommandToolbar",
  "sourceEditorFrame",
  "sourceEditorTabs",
  "sourceFileBrowser",
  "sourceFileControls",
  "sourceSaveResultsPanel",
  "sourceWorkbenchHeader",
  "sourceWorkbenchSwitcher",
  "sourceWorkspaceStatusStrip",
  "agentBuilderPanels",
  "accumulatedDataPanel",
  "desktopControlPanel",
  "providerAccountSettingsHook",
  "runtimeSessionPresets",
  "runtimeWorkspaceCopy",
  "searchAgentWorkChatPanel",
  "runtimeDataSupportPanel",
  "serviceReadinessPanel",
  "workspaceHostPanel",
  "projectManagementPanel",
  "workspaceProductSplitPanel",
  "monitorSummaryWidgets"
];

export const readinessSupportSourcePaths = {
  monitorStyles: "renderer/workspace-monitor/app/globals.css",
  clipboardUtility: "renderer/workspace-monitor/lib/clipboard.mjs",
  clipboardTest: "tests/clipboard.test.mjs",
  nativeGitWorkbenchKo: "docs/architecture/native-git-workbench.ko.md",
  nativeGitWorkbenchEn: "docs/architecture/native-git-workbench.en.md",
  ptyDecisionKo: "docs/architecture/pty-terminal-decision.ko.md",
  ptyDecisionEn: "docs/architecture/pty-terminal-decision.en.md",
  productFeaturePanel: "renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx",
  monitorCollector: "renderer/workspace-monitor/scripts/collect-workspace.mjs",
  productFeatureCollector: "renderer/workspace-monitor/scripts/lib/product-feature-architecture.mjs",
  historyInsightCollector: "renderer/workspace-monitor/scripts/lib/history-insight-loop.mjs",
  fundamentalImprovementCollector: "renderer/workspace-monitor/scripts/lib/fundamental-improvement-structure.mjs",
  customerBundleCheck: "scripts/check-customer-bundle.mjs",
  releaseReadinessCheck: "scripts/check-release-readiness.mjs",
  serviceReadinessCheck: "scripts/check-service-readiness.mjs",
  publicReleaseConfig: "scripts/public-release-config.mjs",
  publicReleaseDevEnv: "scripts/public-release-dev-env.mjs",
  publicReleaseBuild: "scripts/public-release-build.mjs",
  updaterManifest: "scripts/create-updater-manifest.mjs",
  lazyBoundaryCheck: "renderer/workspace-monitor/scripts/check-lazy-boundary-contract.mjs"
};

export const desktopReadinessSourcePaths = {
  ...tauriRuntimeSourcePaths,
  tauriCargo: "src-tauri/Cargo.toml",
  tauriDefaultCapability: "src-tauri/capabilities/default.json",
  ...monitorWorkbenchSourcePaths,
  ...readinessSupportSourcePaths
};

// required file 목록은 source path registry에서 생성해 구조 변경 때 누락과 중복을 줄인다.
export const desktopReadinessRequiredSourceFiles = Array.from(
  new Set([
    ...tauriFeatureModuleFiles,
    ...Object.values(desktopReadinessSourcePaths)
  ])
);

export const serviceReadinessSourcePaths = {
  tauriCargo: "src-tauri/Cargo.toml",
  ...tauriRuntimeSourcePaths,
  monitorShell: monitorWorkbenchSourcePaths.monitorShell,
  runtimeDisplay: monitorWorkbenchSourcePaths.runtimeDisplay,
  sourceWorkbenchPanel: monitorWorkbenchSourcePaths.sourceWorkbenchPanel,
  sourceCommandToolbar: monitorWorkbenchSourcePaths.sourceCommandToolbar,
  sourceEditorFrame: monitorWorkbenchSourcePaths.sourceEditorFrame,
  sourceEditorTabs: monitorWorkbenchSourcePaths.sourceEditorTabs,
  sourceFileBrowser: monitorWorkbenchSourcePaths.sourceFileBrowser,
  sourceFileControls: monitorWorkbenchSourcePaths.sourceFileControls,
  sourceSaveResultsPanel: monitorWorkbenchSourcePaths.sourceSaveResultsPanel,
  sourceWorkbenchHeader: monitorWorkbenchSourcePaths.sourceWorkbenchHeader,
  sourceWorkbenchSwitcher: monitorWorkbenchSourcePaths.sourceWorkbenchSwitcher,
  sourceWorkspaceStatusStrip: monitorWorkbenchSourcePaths.sourceWorkspaceStatusStrip,
  agentBuilderPanels: monitorWorkbenchSourcePaths.agentBuilderPanels,
  accumulatedDataPanel: monitorWorkbenchSourcePaths.accumulatedDataPanel,
  desktopControlPanel: monitorWorkbenchSourcePaths.desktopControlPanel,
  providerAccountSettingsHook: monitorWorkbenchSourcePaths.providerAccountSettingsHook,
  runtimeSessionPresets: monitorWorkbenchSourcePaths.runtimeSessionPresets,
  runtimeWorkspaceCopy: monitorWorkbenchSourcePaths.runtimeWorkspaceCopy,
  searchAgentWorkChatPanel: monitorWorkbenchSourcePaths.searchAgentWorkChatPanel,
  runtimeDataSupportPanel: monitorWorkbenchSourcePaths.runtimeDataSupportPanel,
  serviceReadinessPanel: monitorWorkbenchSourcePaths.serviceReadinessPanel,
  workspaceHostPanel: monitorWorkbenchSourcePaths.workspaceHostPanel,
  projectManagementPanel: monitorWorkbenchSourcePaths.projectManagementPanel,
  workspaceProductSplitPanel: monitorWorkbenchSourcePaths.workspaceProductSplitPanel,
  monitorSummaryWidgets: monitorWorkbenchSourcePaths.monitorSummaryWidgets
};

export function readSourceMap(root, sourcePaths) {
  // 테스트와 readiness script가 동일한 파일 별칭을 쓰도록 key-value map으로 읽는다.
  return Object.fromEntries(
    Object.entries(sourcePaths).map(([key, relativePath]) => [
      key,
      readFileSync(join(root, relativePath), "utf8")
    ])
  );
}

export function joinSourceMap(sourceMap, keys) {
  // 모듈 분리 후에도 command 문자열 검사는 하나의 런타임 소스처럼 수행한다.
  return keys.map((key) => sourceMap[key]).join("\n");
}
