import { readFileSync } from "node:fs";
import { basename, join } from "node:path";

export const tauriFeatureModuleFiles = [
  "src-tauri/src/features/mod.rs",
  "src-tauri/src/features/app_shell.rs",
  "src-tauri/src/features/cli.rs",
  "src-tauri/src/features/native.rs",
  "src-tauri/src/features/workspace.rs",
  "src-tauri/src/features/providers.rs",
  "src-tauri/src/features/diagnostics.rs",
  "src-tauri/src/features/service_readiness.rs",
  "src-tauri/src/features/agent_factory.rs",
  "src-tauri/src/features/decisions.rs"
];

export const tauriFeatureModuleNames = tauriFeatureModuleFiles.map((file) => basename(file));

export const tauriRuntimeSourcePaths = {
  tauriLib: "src-tauri/src/lib.rs",
  tauriServiceReadiness: "src-tauri/src/features/service_readiness.rs",
  tauriProviders: "src-tauri/src/features/providers.rs"
};

export const tauriRuntimeSourceKeys = [
  "tauriLib",
  "tauriServiceReadiness",
  "tauriProviders"
];

export const monitorWorkbenchSourcePaths = {
  monitorShell: "renderer/workspace-monitor/components/MonitorShell.tsx",
  desktopActivityRail: "renderer/workspace-monitor/components/shell/DesktopActivityRail.tsx",
  coreFeatureDrilldown: "renderer/workspace-monitor/components/workbench/CoreFeatureDrilldown.tsx",
  nativeGitWorkbench: "renderer/workspace-monitor/components/workbench/NativeGitWorkbench.tsx",
  pathDisclosure: "renderer/workspace-monitor/components/workbench/PathDisclosure.tsx",
  runtimeTerminalDrawer: "renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx",
  workspaceExplorerPane: "renderer/workspace-monitor/components/workbench/WorkspaceExplorerPane.tsx",
  agentBuilderPanels: "renderer/workspace-monitor/components/workbench/AgentBuilderPanels.tsx",
  agentDetailPanels: "renderer/workspace-monitor/components/workbench/AgentDetailPanels.tsx",
  accumulatedDataPanel: "renderer/workspace-monitor/components/features/AccumulatedDataPanel.tsx",
  desktopActionFeedbackCard: "renderer/workspace-monitor/components/features/DesktopActionFeedbackCard.tsx",
  agentFirstRunGuideCard: "renderer/workspace-monitor/components/features/AgentFirstRunGuideCard.tsx",
  desktopControlPanel: "renderer/workspace-monitor/components/features/DesktopControlPanel.tsx",
  providerAccountsPanel: "renderer/workspace-monitor/components/features/ProviderAccountsPanel.tsx",
  providerAccountSettingsHook: "renderer/workspace-monitor/components/features/useProviderAccountSettings.ts",
  runtimeCustomizationPanel: "renderer/workspace-monitor/components/features/RuntimeCustomizationPanel.tsx",
  searchAgentWorkChatPanel: "renderer/workspace-monitor/components/features/SearchAgentWorkChatPanel.tsx",
  runtimeDataSupportPanel: "renderer/workspace-monitor/components/features/RuntimeDataSupportPanel.tsx",
  runtimeInitStatusCard: "renderer/workspace-monitor/components/features/RuntimeInitStatusCard.tsx",
  serviceReadinessPanel: "renderer/workspace-monitor/components/features/ServiceReadinessPanel.tsx",
  taskRunStorePanel: "renderer/workspace-monitor/components/features/TaskRunStorePanel.tsx",
  workspaceHostPanel: "renderer/workspace-monitor/components/features/WorkspaceHostPanel.tsx",
  runtimeCatalog: "renderer/workspace-monitor/components/features/runtimeCatalog.ts",
  runtimeEnvironmentRefreshHook: "renderer/workspace-monitor/components/features/useRuntimeEnvironmentRefresh.ts",
  settingsRuntimeSyncHook: "renderer/workspace-monitor/components/features/useSettingsRuntimeSync.ts",
  evaluationReportPanel: "renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx",
  evaluationReportModel: "renderer/workspace-monitor/components/features/evaluationReportModel.ts",
  evaluationReportCatalog: "renderer/workspace-monitor/components/features/evaluationReportCatalog.ts",
  evaluationRuntimeTelemetry: "renderer/workspace-monitor/components/features/evaluationRuntimeTelemetry.ts"
};

export const monitorWorkbenchSourceKeys = [
  "monitorShell",
  "desktopActivityRail",
  "coreFeatureDrilldown",
  "nativeGitWorkbench",
  "pathDisclosure",
  "runtimeTerminalDrawer",
  "workspaceExplorerPane",
  "agentBuilderPanels",
  "agentDetailPanels",
  "accumulatedDataPanel",
  "desktopActionFeedbackCard",
  "agentFirstRunGuideCard",
  "desktopControlPanel",
  "providerAccountsPanel",
  "providerAccountSettingsHook",
  "runtimeCustomizationPanel",
  "searchAgentWorkChatPanel",
  "runtimeDataSupportPanel",
  "runtimeInitStatusCard",
  "serviceReadinessPanel",
  "taskRunStorePanel",
  "workspaceHostPanel",
  "runtimeCatalog",
  "runtimeEnvironmentRefreshHook",
  "settingsRuntimeSyncHook"
];

export const serviceReadinessMonitorSourceKeys = [
  "monitorShell",
  "agentBuilderPanels",
  "accumulatedDataPanel",
  "desktopControlPanel",
  "providerAccountSettingsHook",
  "searchAgentWorkChatPanel",
  "runtimeDataSupportPanel",
  "serviceReadinessPanel",
  "workspaceHostPanel"
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

export const serviceReadinessSourcePaths = {
  tauriCargo: "src-tauri/Cargo.toml",
  tauriLib: "src-tauri/src/lib.rs",
  tauriProviders: "src-tauri/src/features/providers.rs",
  monitorShell: monitorWorkbenchSourcePaths.monitorShell,
  agentBuilderPanels: monitorWorkbenchSourcePaths.agentBuilderPanels,
  accumulatedDataPanel: monitorWorkbenchSourcePaths.accumulatedDataPanel,
  desktopControlPanel: monitorWorkbenchSourcePaths.desktopControlPanel,
  providerAccountSettingsHook: monitorWorkbenchSourcePaths.providerAccountSettingsHook,
  searchAgentWorkChatPanel: monitorWorkbenchSourcePaths.searchAgentWorkChatPanel,
  runtimeDataSupportPanel: monitorWorkbenchSourcePaths.runtimeDataSupportPanel,
  serviceReadinessPanel: monitorWorkbenchSourcePaths.serviceReadinessPanel,
  workspaceHostPanel: monitorWorkbenchSourcePaths.workspaceHostPanel
};

export function readSourceMap(root, sourcePaths) {
  return Object.fromEntries(
    Object.entries(sourcePaths).map(([key, relativePath]) => [
      key,
      readFileSync(join(root, relativePath), "utf8")
    ])
  );
}

export function joinSourceMap(sourceMap, keys) {
  return keys.map((key) => sourceMap[key]).join("\n");
}
