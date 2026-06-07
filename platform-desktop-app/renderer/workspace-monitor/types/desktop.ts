import type { LucideIcon } from "lucide-react";
import type { WorkspaceSourceFile } from "@/lib/snapshot";

export type UiLanguage = "ko" | "en";
export type AppThemeMode = "system" | "light" | "dark";
export type SidebarMode = "expanded" | "collapsed";

export type SectionId =
  | "overview"
  | "desktop"
  | "eval"
  | "projects"
  | "history"
  | "intent"
  | "structure"
  | "documents"
  | "source"
  | "tools"
  | "requirements"
  | "agents";

export type ProviderActionKind =
  | "refresh"
  | "setup"
  | "login"
  | "docs"
  | "save"
  | "clear"
  | "models"
  | "use"
  | "verifySubscription";

export type ProviderActionFeedback = {
  providerId: string;
  action: ProviderActionKind;
  tone: "error" | "success" | "info";
  message: string;
};

export type ProviderCredentialSummary = {
  providerId: string;
  label: string;
  authMethod: string;
  envVar: string;
  defaultModel: string;
  configured: boolean;
  environmentAvailable: boolean;
  status: string;
  accountHint: string;
  secretPreview: string;
  lastUpdatedAt: string;
  storage: string;
  credentialSource: string;
  setupUrl: string;
  loginUrl: string;
  docsUrl: string;
  caution: string;
  requiresSubscriptionVerification: boolean;
  subscriptionState: string;
  subscriptionCheckedAt: string;
  subscriptionMessage: string;
};

export type ProviderCredentialReport = {
  schemaVersion: string;
  status: string;
  source: string;
  credentialFilePath: string;
  storageWarning: string;
  configuredCount: number;
  providers: ProviderCredentialSummary[];
};

export type ProviderModelSummary = {
  providerId: string;
  id: string;
  label: string;
  size?: number | null;
  modifiedAt: string;
};

export type ProviderModelCatalogReport = {
  providerId: string;
  providerLabel: string;
  status: string;
  source: string;
  defaultModel: string;
  models: ProviderModelSummary[];
  error?: string | null;
};

export type ProviderCredentialInputState = {
  accountHint: string;
  secret: string;
};

export type NativePtyQuickCommand = {
  id: string;
  label: string;
  detail: string;
  input: string;
};

export type RuntimeProviderOverride = {
  providerId: string;
  defaultModel: string;
  baseUrl: string;
};

export type RuntimeTerminalCustomization = {
  shellCommand: string;
  startupCommand: string;
  quickCommands: NativePtyQuickCommand[];
};

export type RuntimePromptCustomization = {
  sessionPrompts: Record<string, string>;
  taskPipePrompts: Record<string, string>;
};

export type RuntimeCustomization = {
  providerOverrides: RuntimeProviderOverride[];
  prompts: RuntimePromptCustomization;
  terminal: RuntimeTerminalCustomization;
};

export type RuntimeLaunchRequest = {
  id: string;
  label: string;
  adapterId: string;
  modeId: string;
  taskKind: string;
  prompt: string;
  openTerminal: boolean;
  autoStart: boolean;
};

export type RuntimeInitDefaults = {
  adapterId: string;
  sessionModeId: string;
  taskPipeKind: string;
  autoDeferQuestions: boolean;
};

export type ServiceReadinessCheck = {
  id: string;
  label: string;
  status: string;
  detail: string;
  requiredForPublic: boolean;
  requiredForInternal: boolean;
};

export type ServiceReadinessGroup = {
  id: string;
  label: string;
  status: string;
  passedChecks: number;
  totalChecks: number;
  checks: ServiceReadinessCheck[];
};

export type ServiceReadinessNextAction = {
  checkId: string;
  label: string;
  status: string;
  action: string;
};

export type ServiceUpdateChannelReport = {
  status: string;
  configured: boolean;
  markerFileName: string;
  markerPath: string;
  channel: string;
  endpointCount: number;
  publicKeySha256_16: string;
  signingPrivateKeySource: string;
  staticManifestEnabled: boolean;
  releaseAssetBaseUrlPresent: boolean;
  generatedAt: string;
  detail: string;
};

export type ServiceReadinessReport = {
  status: string;
  releaseLane: string;
  score: number;
  generatedAt: string;
  groups: ServiceReadinessGroup[];
  blockers: string[];
  publicBlockers: string[];
  warnings: string[];
  nextActions: ServiceReadinessNextAction[];
  payloadAuditPath: string;
  payloadFlaggedCount: number;
  updateChannel: ServiceUpdateChannelReport;
  serviceClaim: string;
};

export type AppUpdateCheckReport = {
  status: string;
  updateAvailable: boolean;
  currentVersion: string;
  version: string;
  date: string;
  body: string;
  target: string;
  downloadUrl: string;
  signaturePresent: boolean;
  rawJson: unknown;
  detail: string;
};

export type AppUpdateInstallReport = {
  status: string;
  installed: boolean;
  restarted: boolean;
  downloadedBytes: number;
  contentLength?: number | null;
  detail: string;
};

export type TauriInvoke = <T>(command: string, args?: Record<string, unknown>) => Promise<T>;

declare global {
  interface Window {
    __TAURI__?: {
      core?: {
        invoke?: TauriInvoke;
      };
    };
  }
}

export type DesktopHealthStatus = {
  status: string;
  shell: string;
  uiSource: string;
};

export type CliAdapterStatus = {
  adapterId: string;
  label: string;
  command: string;
  available: boolean;
  resolvedPath?: string | null;
  version?: string | null;
  lastError?: string | null;
};

export type CliDecisionPrompt = {
  question: string;
  lane: string;
  impact: string;
  deferMessage: string;
  resumeAction: string;
};

export type CliRunReport = {
  adapterId: string;
  label: string;
  command: string;
  status: string;
  exitCode?: number | null;
  durationMs: number;
  output: string;
  stderr: string;
  decisionPrompts: CliDecisionPrompt[];
  bounded: boolean;
  maxOutputBytes: number;
};

export type RuntimeTerminalSetupCheckReport = {
  status: string;
  command: string;
  commandSource: string;
  resolvedPath?: string | null;
  workingDir: string;
  error?: string | null;
};

export type NativeOsActionReport = {
  status: string;
  action: string;
  operatingSystem: string;
  method: string;
  targetPath: string;
  workingDir: string;
  command?: string | null;
  args: string[];
  exitCode?: number | null;
  stdout: string;
  stderr: string;
  durationMs: number;
  bounded: boolean;
  error?: string | null;
};

export type CliSessionReport = {
  sessionId: string;
  taskRunId: string;
  taskKind: string;
  pipelineId?: string | null;
  laneId?: string | null;
  laneRole?: string | null;
  adapterId: string;
  label: string;
  command: string;
  status: string;
  exitCode?: number | null;
  elapsedMs: number;
  stdout: string;
  stderr: string;
  decisionPrompts: CliDecisionPrompt[];
  bounded: boolean;
  maxOutputBytes: number;
  outputTruncated: boolean;
  workingDir: string;
  deferMessageSent: boolean;
  autoDeferQuestions: boolean;
  autoDeferTriggered: boolean;
  decisionInboxItems: number;
  pendingDecisionPrompts: number;
  deferredPromptCount: number;
  decisionCaptureError?: string | null;
  taskRecordPath?: string | null;
  stdoutLogPath?: string | null;
  stderrLogPath?: string | null;
  persistenceError?: string | null;
};

export type CliTaskPipelinePresetReport = {
  taskKind: string;
  label: string;
  intent: string;
  laneCount: number;
  adapterIds: string[];
  mergeGate: string;
};

export type CliTaskPipelineLaneReport = {
  laneId: string;
  adapterId: string;
  role: string;
  status: string;
  session?: CliSessionReport | null;
  error?: string | null;
};

export type CliPipeEdgeReport = {
  pipeId: string;
  fromNode: string;
  toNode: string;
  stream: string;
  mode: string;
  status: string;
};

export type CliTaskPipelineInitReport = {
  pipelineId: string;
  taskKind: string;
  label: string;
  status: string;
  intent: string;
  workingDir: string;
  promptBytes: number;
  startedSessions: number;
  missingLanes: number;
  mergeGate: string;
  bounded: boolean;
  maxOutputBytes: number;
  lanes: CliTaskPipelineLaneReport[];
  pipes: CliPipeEdgeReport[];
};

export type CliTaskRunRecordReport = {
  recordId: string;
  sessionId: string;
  taskRunId: string;
  taskKind: string;
  pipelineId?: string | null;
  laneId?: string | null;
  laneRole?: string | null;
  adapterId: string;
  label: string;
  command: string;
  status: string;
  exitCode?: number | null;
  startedAt: string;
  updatedAt: string;
  elapsedMs: number;
  workingDir: string;
  stdoutBytes: number;
  stderrBytes: number;
  outputTruncated: boolean;
  decisionInboxItems: number;
  pendingDecisionPrompts: number;
  deferredPromptCount: number;
  autoDeferQuestions: boolean;
  autoDeferTriggered: boolean;
  recordPath: string;
  stdoutLogPath: string;
  stderrLogPath: string;
};

export type CliTaskRunDetailReport = {
  record: CliTaskRunRecordReport;
  recordJson: string;
  stdoutPreview: string;
  stderrPreview: string;
  stdoutTruncated: boolean;
  stderrTruncated: boolean;
  maxLogPreviewBytes: number;
};

export type CliTaskRunPruneReport = {
  status: string;
  keepCount: number;
  beforeCount: number;
  afterCount: number;
  removedCount: number;
  removedTaskRunIds: string[];
  errors: string[];
};

export type SubagentToolSummary = {
  toolName: string;
  agentName: string;
  allowedTools: string[];
  outputContract: string;
};

export type SubagentToolPlanReport = {
  taskRunId: string;
  requestId: string;
  status: string;
  planStatus: string;
  command: string;
  exitCode?: number | null;
  durationMs: number;
  workingDir: string;
  subagentToolCount: number;
  subagentTools: SubagentToolSummary[];
  output: string;
  stderr: string;
  outputTruncated: boolean;
  taskRecordPath?: string | null;
  stdoutLogPath?: string | null;
  stderrLogPath?: string | null;
  persistenceError?: string | null;
};

export type SubagentToolFanoutReport = {
  pipelineId: string;
  planTaskRunId: string;
  taskKind: string;
  label: string;
  status: string;
  intent: string;
  adapterId: string;
  workingDir: string;
  promptBytes: number;
  selectedToolCount: number;
  startedSessions: number;
  missingLanes: number;
  skippedTools: string[];
  processCap: number;
  mergeGate: string;
  bounded: boolean;
  maxOutputBytes: number;
  lanes: CliTaskPipelineLaneReport[];
  pipes: CliPipeEdgeReport[];
};

export type RuntimeDataRootReport = {
  id: string;
  label: string;
  plane: string;
  path: string;
  exists: boolean;
  created: boolean;
  visibility: string;
  purpose: string;
};

export type RuntimeDataBoundaryReport = {
  status: string;
  roots: RuntimeDataRootReport[];
  taskRunStorePath: string;
  supportBundleStorePath: string;
  installerPayloadAuditPath: string;
};

export type AccumulatedDataStoreReport = {
  id: string;
  label: string;
  recordType: string;
  plane: string;
  path: string;
  status: string;
  count: number;
  sizeBytes: number;
  latestUpdatedAt: string;
  visibility: string;
  purpose: string;
  actionLabel: string;
};

export type AccumulatedDataOverviewReport = {
  schemaVersion: string;
  storageFormatVersion: string;
  status: string;
  generatedAt: string;
  indexPath: string;
  formatMigrationStatus: string;
  totalRecords: number;
  totalBytes: number;
  boundedScanMaxFiles: number;
  stores: AccumulatedDataStoreReport[];
  summary: string[];
};

export type InstallerPayloadFinding = {
  ruleId: string;
  severity: string;
  path: string;
  reason: string;
};

export type InstallerPayloadAuditReport = {
  status: string;
  scannedPaths: string[];
  scannedFiles: number;
  scannedBytes: number;
  flaggedCount: number;
  findings: InstallerPayloadFinding[];
  skippedDirs: string[];
  maxScanFiles: number;
  auditPath: string;
  createdAt: string;
};

export type SupportDiagnosticBundleReport = {
  status: string;
  bundleId: string;
  bundleDir: string;
  manifestPath: string;
  runtimeRootsPath: string;
  installerPayloadAuditPath: string;
  taskRunSummaryPath: string;
  recentEventsPath: string;
  includedFiles: string[];
  redacted: boolean;
  createdAt: string;
};

export type WorkspaceTextFile = {
  relativePath: string;
  content: string;
  sizeBytes: number;
  maxSizeBytes: number;
};

export type WorkspaceWriteReport = {
  relativePath: string;
  sizeBytes: number;
  backupPath: string;
  status: string;
};

export type WorkspaceTextFileListReport = {
  status: string;
  source: string;
  totalCount: number;
  returnedCount: number;
  truncated: boolean;
  files: WorkspaceSourceFile[];
};

export type WorkspaceResourcePrepareReport = {
  status: string;
  source: string;
  schemaVersion: string;
  rootPath: string;
  generatedAt: string;
  scannedEntries: number;
  totalCount: number;
  returnedCount: number;
  cachedTextFiles: number;
  cachedBytes: number;
  preloadFileLimit: number;
  preloadByteLimit: number;
  memoryBudgetBytes: number;
  cpuThreads: number;
  availableParallelism: number;
  parallelWorkers: number;
  totalMemoryBytes: number;
  availableMemoryBytes: number;
  usedMemoryBytes: number;
  scanDurationMs: number;
  entryBuildDurationMs: number;
  preloadDurationMs: number;
  preloadStrategy: string;
  systemSupported: boolean;
  warmupStatus: string;
  truncated: boolean;
  catalog: WorkspaceTextFileListReport;
};

export type WorkspaceResourceWarmupReport = {
  schemaVersion: string;
  status: string;
  source: string;
  rootPath: string;
  startedAt: string;
  finishedAt: string;
  cachedTextFiles: number;
  cachedBytes: number;
  memoryBudgetBytes: number;
  cpuThreads: number;
  availableParallelism: number;
  parallelWorkers: number;
  totalMemoryBytes: number;
  availableMemoryBytes: number;
  usedMemoryBytes: number;
  scanDurationMs: number;
  entryBuildDurationMs: number;
  preloadDurationMs: number;
  preloadStrategy: string;
  systemSupported: boolean;
  error: string;
};

export type SharedWorkspacePrepareResult = {
  prepareReport: WorkspaceResourcePrepareReport | null;
  fallbackReport: WorkspaceTextFileListReport | null;
};

export type SharedWorkspaceRequestCache<T> = {
  key: string;
  result: T;
  storedAtMs: number;
};

export type SharedWorkspaceRequestInFlight<T> = {
  key: string;
  promise: Promise<T>;
};

export type WorkspaceResourceSnapshotCache = {
  cacheStatus: string;
  rootPath: string;
  generatedAt: string;
  scannedEntries: number;
  totalCount: number;
  cachedTextFiles: number;
  cachedBytes: number;
  scanDurationMs: number;
  entryBuildDurationMs: number;
  preloadDurationMs: number;
};

export type DesktopResourceSnapshotReport = {
  status: string;
  schemaVersion: string;
  sampledAt: string;
  systemSupported: boolean;
  appPid: number;
  processName: string;
  processMemoryBytes: number;
  processVirtualMemoryBytes: number;
  processCpuUsage: number;
  processRunTimeSeconds: number;
  processTaskCount: number;
  cpuThreads: number;
  availableParallelism: number;
  parallelWorkers: number;
  globalCpuUsage: number;
  totalMemoryBytes: number;
  availableMemoryBytes: number;
  usedMemoryBytes: number;
  memoryBudgetBytes: number;
  preloadByteLimit: number;
  preloadFileLimit: number;
  preloadStrategy: string;
  workspaceCache: WorkspaceResourceSnapshotCache;
  semanticMetrics: Array<{
    name: string;
    value: number;
    unit: string;
    source: string;
  }>;
  warmupStatus: string;
  warmupSource: string;
  warmupError: string;
};

export type RustRuntimeFeatureMapReport = {
  status: string;
  schemaVersion: string;
  sourceLayout: {
    rootModule: string;
    featureRoot: string;
    groupingPolicy: string;
    commandRegistration: string;
  };
  groups: Array<{
    groupId: string;
    label: string;
    sourceModule: string;
    role: string;
    commands: Array<{
      command: string;
      capability: string;
      riskBoundary: string;
    }>;
    followUp: string[];
  }>;
  totalGroups: number;
  totalCommands: number;
  migrationNotes: string[];
};

export type DesktopWorkspaceStateReport = {
  schemaVersion: string;
  status: string;
  activeWorkspacePath: string;
  activeWorkspaceSource: string;
  statePath: string;
  managedWorkspaceRoot: string;
  fallbackWorkspacePath: string;
  gitAvailable: boolean;
  gitVersion: string;
  repositoryUrl: string;
  lastOperation: string;
  lastStatus: string;
  updatedAt: string;
  summary: string[];
};

export type SourceDraftEntry = {
  relativePath: string;
  baseContent: string;
  content: string;
  sizeBytes: number;
  maxSizeBytes: number;
  loadedAt: string;
  lastSavedBackupPath?: string;
  status?: string;
};

export type HumanDecisionItem = {
  id: string;
  status: string;
  priority: string;
  source: string;
  createdAt: string;
  question: string;
  impact: string;
  resumeAction: string;
  sessionId?: string | null;
  adapterId?: string | null;
  answerType?: string | null;
  answerText?: string | null;
  answeredAt?: string | null;
  blockedWorkCount: number;
  unblockedWorkCount: number;
};

export type HumanDecisionInboxReport = {
  status: string;
  totalCount: number;
  openCount: number;
  answeredCount: number;
  decisions: HumanDecisionItem[];
  updatedId?: string | null;
};

export type DecisionResumeReport = {
  inbox: HumanDecisionInboxReport;
  session?: CliSessionReport | null;
  resumeStatus: string;
  resumeDetail: string;
};

export type LocalizedText = {
  ko: string;
  en: string;
};

export type AdapterSetupGuide = {
  installHint: LocalizedText;
  authHint: LocalizedText;
  verifyCommand: LocalizedText;
  firstRunCommand: LocalizedText;
  expectedResult: LocalizedText;
  sourceUrl: string;
  caution: LocalizedText;
};

export type OutputEvent = {
  id: string;
  type: "question" | "error" | "warning" | "test" | "file" | "info";
  lane: string;
  label: string;
  detail: string;
};

export type RuntimeRunTimelineItem = {
  id: string;
  title: string;
  detail: string;
  meta: string;
  status: string;
  tone: "green" | "blue" | "amber" | "red" | "slate" | "violet";
  icon: LucideIcon;
  priority: number;
  timeMs: number;
  actionLabel?: string;
  onAction?: () => void;
};

export type DecisionGroup = {
  id: string;
  label: string;
  openCount: number;
  answeredCount: number;
  decisions: HumanDecisionItem[];
};

export type SourceDiffSummary = {
  dirty: boolean;
  addedLines: number;
  removedLines: number;
  changedLines: number;
  preview: Array<{
    line: number;
    before: string;
    after: string;
  }>;
};

export type SessionModePreset = {
  id: string;
  label: string;
  intent: string;
  prompt: string;
};

export type DesktopPreferences = {
  schemaVersion: string;
  uiLanguage: UiLanguage;
  themeMode: AppThemeMode;
  sidebarMode: SidebarMode;
  terminalDrawerOpen: boolean;
  runtimeInitDefaults: RuntimeInitDefaults;
  runtimeCustomization: RuntimeCustomization;
  pinnedSections: SectionId[];
};

export type DesktopPreferencesReport = {
  schemaVersion: string;
  status: string;
  source: string;
  preferencesPath: string;
  preferences: DesktopPreferences;
};
