"use client";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpenText,
  Bot,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Code2,
  FileSearch,
  FolderKanban,
  GitBranch,
  History,
  Inbox,
  Layers,
  Languages,
  ListFilter,
  Network,
  Search,
  ShieldCheck,
  SquareTerminal
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import { categoryLabel, formatDate, formatDay, type WorkspaceSnapshot, type WorkspaceSourceFile } from "@/lib/snapshot";

type SectionId =
  | "overview"
  | "desktop"
  | "projects"
  | "history"
  | "structure"
  | "documents"
  | "source"
  | "requirements"
  | "agents";

type Section = {
  id: SectionId;
  label: string;
  icon: LucideIcon;
};

const sections: Section[] = [
  { id: "overview", label: "Overview", icon: Activity },
  { id: "desktop", label: "Desktop", icon: Network },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "history", label: "History", icon: History },
  { id: "structure", label: "Structure", icon: Layers },
  { id: "documents", label: "Documents", icon: BookOpenText },
  { id: "source", label: "Source", icon: Code2 },
  { id: "requirements", label: "Requirements", icon: ClipboardCheck },
  { id: "agents", label: "Agents", icon: Bot }
];

type MonitorViewMode = NonNullable<WorkspaceSnapshot["viewModeCatalog"]>["modes"][number];
type MonitorLanguageMode = NonNullable<WorkspaceSnapshot["languageModeCatalog"]>["modes"][number];
type CollaborationBoard = NonNullable<WorkspaceSnapshot["collaborationBoard"]>;
type UnifiedOps = NonNullable<WorkspaceSnapshot["unifiedOps"]>;
type ModeFunctionCatalog = NonNullable<WorkspaceSnapshot["modeFunctionCatalog"]>;
type ClaudeCodeDesignTransfer = NonNullable<WorkspaceSnapshot["claudeCodeDesignTransfer"]>;
type PhilosophyFeatureExtraction = NonNullable<WorkspaceSnapshot["philosophyFeatureExtraction"]>;

const fallbackViewModes: MonitorViewMode[] = [
  {
    id: "user",
    label: "User View",
    intent: "Stable project, history, and documentation surfaces.",
    allowedSections: ["overview", "desktop", "projects", "history", "documents"],
    visibilityRules: {},
    securityNotes: []
  },
  {
    id: "developer",
    label: "Developer View",
    intent: "Implementation, requirements, specs, agents, and verification surfaces.",
    allowedSections: ["overview", "desktop", "projects", "history", "structure", "documents", "source", "requirements", "agents"],
    visibilityRules: {},
    securityNotes: []
  },
  {
    id: "superadmin_developer",
    label: "Super Admin Dev",
    intent: "Full owner/operator view for building the platform itself.",
    allowedSections: ["overview", "desktop", "projects", "history", "structure", "documents", "source", "requirements", "agents"],
    visibilityRules: {},
    securityNotes: []
  }
];

const fallbackLanguageModes: MonitorLanguageMode[] = [
  {
    id: "all",
    label: "전체",
    intent: "Show Korean, English, and language-neutral documents together.",
    includedLanguages: ["ko", "en"],
    includeUnknown: true,
    documentRule: "Show documents tagged ko, en, or unknown."
  },
  {
    id: "ko",
    label: "한국어만",
    intent: "Show only Korean documents.",
    includedLanguages: ["ko"],
    includeUnknown: false,
    documentRule: "Show only documents tagged ko."
  },
  {
    id: "en",
    label: "English Only",
    intent: "Show only English documents.",
    includedLanguages: ["en"],
    includeUnknown: false,
    documentRule: "Show only documents tagged en."
  }
];

const emptyCollaborationBoard: CollaborationBoard = {
  summary: {
    agents: 0,
    activeAgents: 0,
    activeTasks: 0,
    blockedTasks: 0,
    queuedTasks: 0,
    completedTasks: 0,
    handoffs: 0,
    blockers: 0
  },
  agents: [],
  lanes: [],
  flows: [],
  blockers: [],
  nextActions: []
};

const emptyUnifiedOps: UnifiedOps = {
  summary: {
    totalEvents: 0,
    historyEvents: 0,
    monitorEvents: 0,
    evidenceEvents: 0,
    decisionEvents: 0,
    openSignals: 0,
    criticalSignals: 0,
    latestEventAt: "",
    historyDays: 0
  },
  lanes: [],
  signalTypes: [],
  sourceTypes: [],
  events: []
};

const emptyModeFunctionCatalog: ModeFunctionCatalog = {
  summary: {
    totalGroups: 0,
    totalOptions: 0,
    explicitSelectors: 0,
    registryBackedGroups: 0,
    desktopGroups: 0
  },
  groups: []
};

const emptyClaudeCodeDesignTransfer: ClaudeCodeDesignTransfer = {
  sourcePath: "platform-desktop-app/configs/claude-code-design-transfer-registry.json",
  sourceBoundary: {
    policy: "public_sources_only",
    excluded_sources: ["leaked_or_non_public_material"]
  },
  summary: {
    totalPatterns: 0,
    readyNow: 0,
    queued: 0,
    highPriority: 0
  },
  patterns: []
};

const emptyPhilosophyFeatureExtraction: PhilosophyFeatureExtraction = {
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
};

const sectionIds = new Set<SectionId>(sections.map((section) => section.id));

type TauriInvoke = <T>(command: string, args?: Record<string, unknown>) => Promise<T>;

declare global {
  interface Window {
    __TAURI__?: {
      core?: {
        invoke?: TauriInvoke;
      };
    };
  }
}

type DesktopHealthStatus = {
  status: string;
  shell: string;
  uiSource: string;
};

type CliAdapterStatus = {
  adapterId: string;
  label: string;
  command: string;
  available: boolean;
  resolvedPath?: string | null;
  version?: string | null;
  lastError?: string | null;
};

type CliDecisionPrompt = {
  question: string;
  lane: string;
  impact: string;
  deferMessage: string;
  resumeAction: string;
};

type CliRunReport = {
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

type CliSessionReport = {
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

type CliTaskPipelinePresetReport = {
  taskKind: string;
  label: string;
  intent: string;
  laneCount: number;
  adapterIds: string[];
  mergeGate: string;
};

type CliTaskPipelineLaneReport = {
  laneId: string;
  adapterId: string;
  role: string;
  status: string;
  session?: CliSessionReport | null;
  error?: string | null;
};

type CliPipeEdgeReport = {
  pipeId: string;
  fromNode: string;
  toNode: string;
  stream: string;
  mode: string;
  status: string;
};

type CliTaskPipelineInitReport = {
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

type CliTaskRunRecordReport = {
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

type CliTaskRunDetailReport = {
  record: CliTaskRunRecordReport;
  recordJson: string;
  stdoutPreview: string;
  stderrPreview: string;
  stdoutTruncated: boolean;
  stderrTruncated: boolean;
  maxLogPreviewBytes: number;
};

type CliTaskRunPruneReport = {
  status: string;
  keepCount: number;
  beforeCount: number;
  afterCount: number;
  removedCount: number;
  removedTaskRunIds: string[];
  errors: string[];
};

type RuntimeDataRootReport = {
  id: string;
  label: string;
  plane: string;
  path: string;
  exists: boolean;
  created: boolean;
  visibility: string;
  purpose: string;
};

type RuntimeDataBoundaryReport = {
  status: string;
  roots: RuntimeDataRootReport[];
  taskRunStorePath: string;
  supportBundleStorePath: string;
  installerPayloadAuditPath: string;
};

type InstallerPayloadFinding = {
  ruleId: string;
  severity: string;
  path: string;
  reason: string;
};

type InstallerPayloadAuditReport = {
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

type SupportDiagnosticBundleReport = {
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

type ServiceReadinessCheck = {
  id: string;
  label: string;
  status: string;
  detail: string;
  requiredForPublic: boolean;
  requiredForInternal: boolean;
};

type ServiceReadinessGroup = {
  id: string;
  label: string;
  status: string;
  passedChecks: number;
  totalChecks: number;
  checks: ServiceReadinessCheck[];
};

type ServiceReadinessNextAction = {
  checkId: string;
  label: string;
  status: string;
  action: string;
};

type ServiceReadinessReport = {
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
  serviceClaim: string;
};

type WorkspaceTextFile = {
  relativePath: string;
  content: string;
  sizeBytes: number;
  maxSizeBytes: number;
};

type WorkspaceWriteReport = {
  relativePath: string;
  sizeBytes: number;
  backupPath: string;
  status: string;
};

type SourceDraftEntry = {
  relativePath: string;
  baseContent: string;
  content: string;
  sizeBytes: number;
  maxSizeBytes: number;
  loadedAt: string;
  lastSavedBackupPath?: string;
  status?: string;
};

type HumanDecisionItem = {
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

type HumanDecisionInboxReport = {
  status: string;
  totalCount: number;
  openCount: number;
  answeredCount: number;
  decisions: HumanDecisionItem[];
  updatedId?: string | null;
};

type DecisionResumeReport = {
  inbox: HumanDecisionInboxReport;
  session?: CliSessionReport | null;
  resumeStatus: string;
  resumeDetail: string;
};

type AdapterSetupGuide = {
  installHint: string;
  verifyCommand: string;
  sourceUrl: string;
  caution: string;
};

type OutputEvent = {
  id: string;
  type: "question" | "error" | "warning" | "test" | "file" | "info";
  lane: string;
  label: string;
  detail: string;
};

type DecisionGroup = {
  id: string;
  label: string;
  openCount: number;
  answeredCount: number;
  decisions: HumanDecisionItem[];
};

type SourceDiffSummary = {
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

type SessionModePreset = {
  id: string;
  label: string;
  intent: string;
  prompt: string;
};

const SESSION_POLL_INTERVAL_MS = 2000;
const SESSION_POLL_IDLE_UPDATE_BUCKET_MS = 5000;
const INBOX_REFRESH_THROTTLE_MS = 4000;
const SESSION_OUTPUT_SIGNATURE_CHARS = 2048;
const TASK_RUN_REFRESH_THROTTLE_MS = 5000;

const fallbackDesktopAdapters: CliAdapterStatus[] = [
  { adapterId: "claude-code-cli", label: "Claude Code CLI", command: "claude", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "gemini-cli", label: "Gemini CLI", command: "gemini", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "codex-cli", label: "Codex CLI", command: "codex", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "opencode-cli", label: "OpenCode", command: "opencode", available: false, lastError: "Desktop runtime unavailable." }
];

const adapterSetupGuides: Record<string, AdapterSetupGuide> = {
  "claude-code-cli": {
    installHint: "npm install -g @anthropic-ai/claude-code",
    verifyCommand: "claude --version",
    sourceUrl: "https://docs.claude.com/en/docs/claude-code/setup",
    caution: "Node.js and account auth are required."
  },
  "gemini-cli": {
    installHint: "npm install -g @google/gemini-cli",
    verifyCommand: "gemini --version",
    sourceUrl: "https://github.com/google-gemini/gemini-cli",
    caution: "Verify the package scope before install."
  },
  "codex-cli": {
    installHint: "npm install -g @openai/codex",
    verifyCommand: "codex --version",
    sourceUrl: "https://help.openai.com/en/articles/11096431",
    caution: "Use the official package and account auth."
  },
  "opencode-cli": {
    installHint: "npm install -g opencode-ai",
    verifyCommand: "opencode --version",
    sourceUrl: "https://opencode.ai/docs/cli/",
    caution: "Confirm PATH resolves the expected binary."
  }
};

const sessionModePresets: SessionModePreset[] = [
  {
    id: "user_task",
    label: "User Task",
    intent: "Deliver the requested task with concise questions only when blocked.",
    prompt:
      "현재 사용자의 요청을 기준으로 작업을 진행해줘. 소스에 영향을 주는 결정이 필요하면 질문을 명확히 남기고, 사용자가 없으면 해당 결정만 보류해줘."
  },
  {
    id: "platform_improvement",
    label: "Platform Improvement",
    intent: "Improve the platform while preserving requirements, specs, and validation.",
    prompt:
      "이 플랫폼 자체를 개선하는 관점으로 살펴보고, 요구사항/스펙/검증/히스토리와 충돌하지 않게 작은 개선 단위로 진행해줘."
  },
  {
    id: "knowledge_accumulation",
    label: "Knowledge Accumulation",
    intent: "Turn messy output into durable structured knowledge.",
    prompt:
      "이번 작업에서 나온 로그, 질문, 결정, 근거를 구조화해 재사용 가능한 지식으로 정리해줘. 출처와 불확실성을 분리해서 기록해줘."
  },
  {
    id: "review_verify",
    label: "Review & Verify",
    intent: "Check risks, missing tests, and unsupported claims before proceeding.",
    prompt:
      "현재 변경 또는 계획을 리뷰해줘. 버그, 누락된 검증, 리소스 누수, 사용자 결정이 필요한 지점을 우선순위로 정리해줘."
  }
];

const fallbackTaskPipePresets: CliTaskPipelinePresetReport[] = [
  {
    taskKind: "platform_improvement_pipe",
    label: "Platform Improvement Pipe",
    intent: "Implementation, review, research, and fallback lanes initialize from one task intake.",
    laneCount: 4,
    adapterIds: ["codex-cli", "claude-code-cli", "gemini-cli", "opencode-cli"],
    mergeGate: "platform_merge_gate"
  },
  {
    taskKind: "knowledge_accumulation_pipe",
    label: "Knowledge Accumulation Pipe",
    intent: "Structuring, skeptic, and durable record lanes initialize from messy output.",
    laneCount: 3,
    adapterIds: ["gemini-cli", "claude-code-cli", "codex-cli"],
    mergeGate: "knowledge_merge_gate"
  },
  {
    taskKind: "review_verify_pipe",
    label: "Review & Verify Pipe",
    intent: "Bug review, validation, and contrary lanes initialize before release.",
    laneCount: 3,
    adapterIds: ["claude-code-cli", "codex-cli", "gemini-cli"],
    mergeGate: "validation_merge_gate"
  }
];

export function MonitorShell({ snapshot }: { snapshot: WorkspaceSnapshot }) {
  const [section, setSection] = useState<SectionId>("overview");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [historyDate, setHistoryDate] = useState("all");
  const [historyCategory, setHistoryCategory] = useState("all");
  const [sourceProject, setSourceProject] = useState("all");
  const [sourceLanguage, setSourceLanguage] = useState("all");
  const [selectedSourceId, setSelectedSourceId] = useState("");
  const viewModes = snapshot.viewModeCatalog?.modes?.length ? snapshot.viewModeCatalog.modes : fallbackViewModes;
  const languageModes = snapshot.languageModeCatalog?.modes?.length ? snapshot.languageModeCatalog.modes : fallbackLanguageModes;
  const [viewMode, setViewMode] = useState(snapshot.viewModeCatalog?.defaultMode || "superadmin_developer");
  const [languageMode, setLanguageMode] = useState(snapshot.languageModeCatalog?.defaultMode || "all");
  const modeFunctionCatalog = snapshot.modeFunctionCatalog ?? emptyModeFunctionCatalog;
  const claudeCodeDesignTransfer = snapshot.claudeCodeDesignTransfer ?? emptyClaudeCodeDesignTransfer;
  const philosophyFeatureExtraction = snapshot.philosophyFeatureExtraction ?? emptyPhilosophyFeatureExtraction;
  const [selectedModeFunctionGroupId, setSelectedModeFunctionGroupId] = useState(
    modeFunctionCatalog.groups[0]?.id || "view_mode"
  );
  const currentViewMode = useMemo(() => {
    return viewModes.find((mode) => mode.id === viewMode) || viewModes[0] || fallbackViewModes[2];
  }, [viewMode, viewModes]);
  const currentLanguageMode = useMemo(() => {
    return languageModes.find((mode) => mode.id === languageMode) || languageModes[0] || fallbackLanguageModes[0];
  }, [languageMode, languageModes]);
  const visibleSections = useMemo(() => {
    const allowed = new Set(currentViewMode.allowedSections);
    return sections.filter((item) => allowed.has(item.id));
  }, [currentViewMode]);
  const selectViewMode = (modeId: string) => {
    const nextMode = viewModes.find((mode) => mode.id === modeId) || currentViewMode;
    setViewMode(nextMode.id);
    if (!nextMode.allowedSections.includes(section)) {
      setSection((nextMode.allowedSections[0] as SectionId | undefined) || "overview");
    }
  };
  const openModeFunctionOption = (groupId: string, optionId: string) => {
    if (groupId === "view_mode") {
      selectViewMode(optionId);
      return;
    }

    if (groupId === "language_mode") {
      setLanguageMode(optionId);
      setCategory("all");
      setHistoryCategory("all");
      return;
    }

    if (groupId === "section_location" && sectionIds.has(optionId as SectionId)) {
      const targetSection = optionId as SectionId;
      if (!currentViewMode.allowedSections.includes(targetSection)) {
        const modeWithSection =
          viewModes.find((mode) => mode.id === "superadmin_developer" && mode.allowedSections.includes(targetSection)) ||
          viewModes.find((mode) => mode.allowedSections.includes(targetSection));
        if (modeWithSection) {
          setViewMode(modeWithSection.id);
        }
      }
      setSection(targetSection);
      return;
    }

    if (["desktop_session_mode", "task_pipe", "cli_adapter"].includes(groupId)) {
      setSection("desktop");
      return;
    }

    const group = modeFunctionCatalog.groups.find((item) => item.id === groupId);
    const option = group?.options.find((item) => item.id === optionId);
    setSection("documents");
    setCategory("all");
    setQuery(option?.sourcePath || group?.sourcePath || option?.label || group?.label || "");
  };

  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const viewFilteredDocuments = useMemo(() => {
    return snapshot.documents.filter(
      (document) =>
        documentVisibleForMode(document, currentViewMode.id) && documentVisibleForLanguage(document, currentLanguageMode)
    );
  }, [currentLanguageMode, currentViewMode, snapshot.documents]);
  const viewCategories = useMemo(() => {
    return Array.from(new Set(viewFilteredDocuments.map((document) => document.category))).sort();
  }, [viewFilteredDocuments]);
  const filteredDocuments = useMemo(() => {
    return viewFilteredDocuments.filter((document) => {
      const categoryMatches = category === "all" || document.category === category;
      const queryMatches =
        !normalizedQuery ||
        `${document.title} ${document.path} ${document.excerpt}`.toLowerCase().includes(normalizedQuery);
      return categoryMatches && queryMatches;
    });
  }, [category, normalizedQuery, viewFilteredDocuments]);

  const recentHistory = viewFilteredDocuments
    .filter((document) => ["work-summary", "request-trace", "user-request", "evaluation"].includes(document.category))
    .slice(0, 8);
  const recentDocuments = filteredDocuments.slice(0, section === "documents" ? 30 : 10);
  const visibleHistoryDays = useMemo(() => {
    return snapshot.historyDays
      .map((day) => {
        const documents = day.documents.filter(
          (document) =>
            documentVisibleForMode(document, currentViewMode.id) && documentVisibleForLanguage(document, currentLanguageMode)
        );
        const categories = summarizeCategories(documents);
        return { ...day, documents, documentsCount: documents.length, categories };
      })
      .filter((day) => day.documents.length > 0);
  }, [currentLanguageMode, currentViewMode, snapshot.historyDays]);
  const historyCategories = useMemo(() => {
    return Array.from(new Set(visibleHistoryDays.flatMap((day) => day.categories.map((item) => item.category)))).sort();
  }, [visibleHistoryDays]);
  const filteredHistoryDays = useMemo(() => {
    return visibleHistoryDays
      .filter((day) => historyDate === "all" || day.date === historyDate)
      .map((day) => {
        const documents = day.documents.filter((document) => {
          const categoryMatches = historyCategory === "all" || document.category === historyCategory;
          const queryMatches =
            !normalizedQuery ||
            `${document.title} ${document.path} ${document.excerpt}`.toLowerCase().includes(normalizedQuery);
          return categoryMatches && queryMatches;
        });
        const categories = summarizeCategories(documents);
        return { ...day, documents, documentsCount: documents.length, categories };
      })
      .filter((day) => day.documents.length > 0);
  }, [historyCategory, historyDate, normalizedQuery, visibleHistoryDays]);
  const latestHistoryDate = visibleHistoryDays[0]?.date || "";
  const agentCatalog = snapshot.agentCatalog ?? [];
  const agentRuntimeCounts = useMemo(() => countBy(agentCatalog, (agent) => agent.runtime || "unknown"), [agentCatalog]);
  const agentStatusCounts = useMemo(
    () => countBy(agentCatalog, (agent) => agent.runtimeStatus || agent.definitionStatus || "unknown"),
    [agentCatalog]
  );
  const taskStatusCounts = useMemo(() => countBy(snapshot.tasks, (task) => task.status || "unknown"), [snapshot.tasks]);
  const collaborationBoard = snapshot.collaborationBoard ?? emptyCollaborationBoard;
  const unifiedOps = snapshot.unifiedOps ?? emptyUnifiedOps;
  const visibleUnifiedEvents = useMemo(() => {
    return unifiedOps.events.filter(
      (event) => opsEventVisibleForMode(event, currentViewMode.id) && opsEventVisibleForLanguage(event, currentLanguageMode)
    );
  }, [currentLanguageMode, currentViewMode, unifiedOps.events]);
  const visibleUnifiedSummary = useMemo(() => summarizeUnifiedOpsEvents(visibleUnifiedEvents, visibleHistoryDays.length), [
    visibleHistoryDays.length,
    visibleUnifiedEvents
  ]);
  const visibleUnifiedLanes = useMemo(() => countBy(visibleUnifiedEvents, (event) => event.lane || "unknown"), [visibleUnifiedEvents]);
  const visibleUnifiedSignalTypes = useMemo(
    () => countBy(visibleUnifiedEvents, (event) => event.signalType || "unknown"),
    [visibleUnifiedEvents]
  );
  const historyCategoryTotals = useMemo(() => {
    const totals = new Map<string, number>();
    for (const day of visibleHistoryDays) {
      for (const item of day.categories) {
        totals.set(item.category, (totals.get(item.category) || 0) + item.count);
      }
    }
    return Array.from(totals.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category));
  }, [visibleHistoryDays]);
  const visibleRequirements = currentViewMode.allowedSections.includes("requirements") ? snapshot.requirements : [];
  const visibleSourceFiles = currentViewMode.allowedSections.includes("source") ? snapshot.sourceFiles ?? [] : [];
  const sourceProjects = useMemo(() => {
    return Array.from(new Set(visibleSourceFiles.map((file) => file.project))).sort();
  }, [visibleSourceFiles]);
  const sourceLanguages = useMemo(() => {
    return Array.from(new Set(visibleSourceFiles.map((file) => file.language))).sort();
  }, [visibleSourceFiles]);
  const sourceQuery = section === "source" ? normalizedQuery : "";
  const filteredSourceFiles = useMemo(() => {
    return visibleSourceFiles.filter((file) => {
      const projectMatches = sourceProject === "all" || file.project === sourceProject;
      const languageMatches = sourceLanguage === "all" || file.language === sourceLanguage;
      const queryMatches =
        !sourceQuery || `${file.path} ${file.project} ${file.language} ${file.content}`.toLowerCase().includes(sourceQuery);
      return projectMatches && languageMatches && queryMatches;
    });
  }, [sourceLanguage, sourceProject, sourceQuery, visibleSourceFiles]);
  const selectedSource = filteredSourceFiles.find((file) => file.id === selectedSourceId) || filteredSourceFiles[0];
  const visibleEvaluations = viewFilteredDocuments.filter((document) => document.category === "evaluation").length;
  const visibleWebSearches = viewFilteredDocuments.filter((document) => document.category === "web-search").length;
  const latestEvaluation = viewFilteredDocuments.find((document) => document.category === "evaluation");
  const latestWebSearch = viewFilteredDocuments.find((document) => document.category === "web-search");
  const latestWorkSummary = viewFilteredDocuments.find((document) => document.category === "work-summary");
  const attentionState = useMemo(() => {
    const blockedTasks = collaborationBoard.summary.blockedTasks;
    const activeTasks = collaborationBoard.summary.activeTasks;
    const publicReviewRequired = snapshot.publicReview.status.includes("review_required");

    if (blockedTasks > 0) {
      return {
        tone: "red",
        icon: AlertTriangle,
        label: "Needs decision",
        title: `${blockedTasks.toLocaleString("ko-KR")}개 작업이 막혀 있습니다`,
        detail: "결정함 또는 blocker lane을 확인해야 합니다.",
        section: "agents" as SectionId,
        action: "막힘 보기"
      };
    }

    if (publicReviewRequired) {
      return {
        tone: "amber",
        icon: ShieldCheck,
        label: "Review required",
        title: "공개 전 점검이 필요합니다",
        detail: "snapshot, privacy, public readiness를 확인한 뒤 배포해야 합니다.",
        section: "overview" as SectionId,
        action: "점검 보기"
      };
    }

    if (activeTasks > 0) {
      return {
        tone: "green",
        icon: Activity,
        label: "In motion",
        title: `${activeTasks.toLocaleString("ko-KR")}개 작업이 진행 중입니다`,
        detail: "에이전트 협업판에서 진행 상태와 병목을 볼 수 있습니다.",
        section: "agents" as SectionId,
        action: "작업판 보기"
      };
    }

    return {
      tone: "blue",
      icon: CheckCircle2,
      label: "Ready",
      title: "즉시 주의할 막힘은 없습니다",
      detail: "최근 히스토리와 근거 trail을 확인하고 다음 작업을 시작할 수 있습니다.",
      section: "history" as SectionId,
      action: "히스토리 보기"
    };
  }, [
    collaborationBoard.summary.activeTasks,
    collaborationBoard.summary.blockedTasks,
    snapshot.publicReview.status
  ]);
  const commandSteps: Array<{
    label: string;
    title: string;
    detail: string;
    icon: LucideIcon;
    tone: string;
    section?: SectionId;
  }> = [
    {
      label: "Now",
      title: attentionState.label,
      detail: attentionState.title,
      icon: attentionState.icon,
      tone: attentionState.tone,
      section: attentionState.section
    },
    {
      label: "Next",
      title: collaborationBoard.nextActions[0]?.agent || "No handoff",
      detail: collaborationBoard.nextActions[0]?.nextAction || "대기 중인 다음 행동이 없습니다.",
      icon: Clock3,
      tone: "blue",
      section: "agents"
    },
    {
      label: "Evidence",
      title: `${visibleWebSearches.toLocaleString("ko-KR")} searches / ${visibleEvaluations.toLocaleString("ko-KR")} evals`,
      detail: latestEvaluation?.title || latestWebSearch?.title || "근거 기록을 모아 표시합니다.",
      icon: FileSearch,
      tone: "violet",
      section: "documents"
    },
    {
      label: "Control",
      title: currentViewMode.label,
      detail: `${currentLanguageMode.label} / ${visibleSections.length} sections visible`,
      icon: ShieldCheck,
      tone: "slate"
    }
  ];
  const attentionItems = [
    ...collaborationBoard.blockers.slice(0, 3).map((item) => ({
      id: `blocker-${item.taskId}`,
      label: "Blocked",
      title: item.title,
      detail: item.blockers.join(" / "),
      meta: item.agent
    })),
    ...collaborationBoard.nextActions.slice(0, 3).map((item) => ({
      id: `next-${item.taskId}`,
      label: "Next",
      title: item.title,
      detail: item.nextAction,
      meta: item.agent
    }))
  ].slice(0, 4);
  const sectionNavMeta: Record<SectionId, string> = {
    overview: attentionState.label,
    desktop: "Runtime",
    projects: snapshot.stats.projects.toLocaleString("ko-KR"),
    history: visibleHistoryDays.length.toLocaleString("ko-KR"),
    structure: snapshot.stats.rootFolders.toLocaleString("ko-KR"),
    documents: viewFilteredDocuments.length.toLocaleString("ko-KR"),
    source: visibleSourceFiles.length.toLocaleString("ko-KR"),
    requirements: visibleRequirements.length.toLocaleString("ko-KR"),
    agents: agentCatalog.length.toLocaleString("ko-KR")
  };
  const nextActionLabel = collaborationBoard.nextActions[0]?.nextAction || "No pending handoff";
  const currentSectionLabel = sections.find((item) => item.id === section)?.label || "Overview";

  return (
    <main>
      <header className="topbar">
        <div>
          <p className="eyebrow">Codex Repository</p>
          <h1>Workspace Monitor</h1>
          <p className="summary">
            저장소 문서 스냅샷을 기반으로 프로젝트, 히스토리, 에이전트 상태, 요구사항, 평가를 한 곳에서 탐색합니다.
          </p>
        </div>
        <div className="snapshot-meta">
          <span>Snapshot</span>
          <strong>{formatDate(snapshot.generatedAt)}</strong>
        </div>
      </header>

      <section className="view-mode-bar" aria-label="View mode selector">
        <div className="view-mode-current">
          <ShieldCheck size={16} aria-hidden="true" />
          <div>
            <span>View Mode</span>
            <strong>{currentViewMode.label}</strong>
          </div>
        </div>
        <div className="segmented-control">
          {viewModes.map((mode) => (
            <button
              key={mode.id}
              className={currentViewMode.id === mode.id ? "active" : ""}
              onClick={() => selectViewMode(mode.id)}
              type="button"
              title={mode.intent}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </section>

      <nav className="section-tabs" aria-label="Monitor sections">
        {visibleSections.map((item) => (
          <button
            key={item.id}
            className={section === item.id ? "active" : ""}
            onClick={() => setSection(item.id)}
            type="button"
            title={item.label}
          >
            <item.icon size={16} aria-hidden="true" />
            <span>{item.label}</span>
            <small>{sectionNavMeta[item.id]}</small>
          </button>
        ))}
      </nav>

      <section className={`operator-strip operator-${attentionState.tone}`} aria-label="Workspace status and actions">
        <div className="operator-strip-state">
          <attentionState.icon size={17} aria-hidden="true" />
          <div>
            <span>{currentSectionLabel}</span>
            <strong>{attentionState.title}</strong>
          </div>
        </div>
        <div className="operator-strip-actions">
          <button type="button" onClick={() => setSection(attentionState.section)}>
            <ArrowRight size={15} aria-hidden="true" />
            <span>{attentionState.action}</span>
          </button>
          <button type="button" onClick={() => setSection("agents")}>
            <Inbox size={15} aria-hidden="true" />
            <span>{truncateText(nextActionLabel, 34)}</span>
          </button>
          <button type="button" onClick={() => setSection("documents")}>
            <FileSearch size={15} aria-hidden="true" />
            <span>{visibleWebSearches.toLocaleString("ko-KR")} / {visibleEvaluations.toLocaleString("ko-KR")}</span>
          </button>
          <button type="button" onClick={() => setSection("desktop")}>
            <SquareTerminal size={15} aria-hidden="true" />
            <span>Runtime</span>
          </button>
        </div>
      </section>

      <section className="toolbar" aria-label="Document filters">
        <label className="search-box">
          <Search size={16} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={section === "source" ? "소스 경로, 언어, 코드 검색" : "문서, 경로, 요약 검색"}
          />
        </label>
        {section !== "source" && (
          <>
            <label className="select-box">
              <Languages size={16} aria-hidden="true" />
              <select
                value={languageMode}
                onChange={(event) => {
                  setLanguageMode(event.target.value);
                  setCategory("all");
                  setHistoryCategory("all");
                }}
                title={currentLanguageMode.intent}
              >
                {languageModes.map((mode) => (
                  <option key={mode.id} value={mode.id}>
                    {mode.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="select-box">
              <ListFilter size={16} aria-hidden="true" />
              <select value={category} onChange={(event) => setCategory(event.target.value)}>
                <option value="all">모든 문서</option>
                {viewCategories.map((item) => (
                  <option key={item} value={item}>
                    {categoryLabel(item)}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
      </section>

      {section === "overview" && (
        <div className="content-grid">
          <section className="command-center" aria-label="Workspace command center">
            <article className={`command-card command-${attentionState.tone}`}>
              <p className="eyebrow">Command Center</p>
              <div className="command-status">
                <attentionState.icon size={20} aria-hidden="true" />
                <span>{attentionState.label}</span>
              </div>
              <h2>{attentionState.title}</h2>
              <p>{attentionState.detail}</p>
              <div className="command-actions">
                <button type="button" onClick={() => setSection(attentionState.section)}>
                  <span>{attentionState.action}</span>
                  <ArrowRight size={15} aria-hidden="true" />
                </button>
              </div>
            </article>

            <div className="command-side">
              <article>
                <span>Workspace Lens</span>
                <strong>{currentViewMode.label}</strong>
                <p>{currentViewMode.intent}</p>
              </article>
              <article>
                <span>Latest Signal</span>
                <strong>{latestWorkSummary?.title || latestHistoryDate || "기록 없음"}</strong>
                <p>{latestWorkSummary?.path || "최근 작업 요약을 찾지 못했습니다."}</p>
              </article>
            </div>
          </section>

          <section className="ux-spine" aria-label="Operating spine">
            {commandSteps.map((step) => (
              <button
                key={step.label}
                className={`spine-step spine-${step.tone}`}
                onClick={() => step.section && setSection(step.section)}
                type="button"
                disabled={!step.section}
              >
                <step.icon size={17} aria-hidden="true" />
                <span>{step.label}</span>
                <strong>{step.title}</strong>
                <small>{step.detail}</small>
              </button>
            ))}
          </section>

          <UnifiedOpsPanel
            summary={visibleUnifiedSummary}
            lanes={visibleUnifiedLanes.slice(0, 8)}
            signalTypes={visibleUnifiedSignalTypes.slice(0, 8)}
            events={visibleUnifiedEvents.slice(0, 14)}
            onOpenHistory={() => setSection("history")}
            onOpenAgents={() => setSection("agents")}
          />

          <ModeFunctionSwitchboard
            catalog={modeFunctionCatalog}
            selectedGroupId={selectedModeFunctionGroupId}
            onSelectGroup={setSelectedModeFunctionGroupId}
            onOpenOption={openModeFunctionOption}
          />

          <ClaudeCodeTransferPanel
            transfer={claudeCodeDesignTransfer}
            onOpenDesktop={() => setSection("desktop")}
            onOpenDocuments={() => setSection("documents")}
          />

          <PhilosophyFeatureFactoryPanel
            extraction={philosophyFeatureExtraction}
            onOpenAgents={() => setSection("agents")}
            onOpenDocuments={() => setSection("documents")}
          />

          <section className="panel wide action-evidence-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Attention</p>
                <h2>다음 행동과 근거 trail</h2>
              </div>
              <button type="button" onClick={() => setSection(attentionItems.length ? "agents" : "documents")}>
                <Inbox size={16} aria-hidden="true" />
                <span>{attentionItems.length ? "결정함 보기" : "문서 보기"}</span>
              </button>
            </div>
            <div className="attention-layout">
              <div className="attention-list">
                {attentionItems.length ? (
                  attentionItems.map((item) => (
                    <article key={item.id}>
                      <span>{item.label}</span>
                      <div>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                        <small>{item.meta}</small>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="empty-state">현재 blocker나 handoff가 없습니다.</p>
                )}
              </div>
              <div className="evidence-trail">
                <article>
                  <span>Web Search</span>
                  <strong>{visibleWebSearches.toLocaleString("ko-KR")}</strong>
                  <p>{latestWebSearch?.title || "웹 검색 기록 없음"}</p>
                </article>
                <article>
                  <span>Evaluation</span>
                  <strong>{visibleEvaluations.toLocaleString("ko-KR")}</strong>
                  <p>{latestEvaluation?.title || "평가 기록 없음"}</p>
                </article>
                <article>
                  <span>Requirements</span>
                  <strong>{visibleRequirements.length.toLocaleString("ko-KR")}</strong>
                  <p>요구사항과 스펙을 기준으로 결과를 확인합니다.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="metrics-band">
            <Metric label="Projects" value={snapshot.stats.projects} icon={FolderKanban} tone="green" />
            <Metric label="Documents" value={viewFilteredDocuments.length} icon={BookOpenText} tone="blue" />
            <Metric label="Requirements" value={visibleRequirements.length} icon={ClipboardCheck} tone="amber" />
            <Metric label="Evaluations" value={visibleEvaluations} icon={ShieldCheck} tone="red" />
            <Metric label="Web Searches" value={visibleWebSearches} icon={FileSearch} tone="violet" />
            {currentViewMode.allowedSections.includes("source") ? (
              <Metric label="Source Files" value={visibleSourceFiles.length} icon={Code2} tone="slate" />
            ) : (
              <Metric label="History Days" value={visibleHistoryDays.length} icon={CalendarDays} tone="slate" />
            )}
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Agent Map</p>
                <h2>에이전트 인벤토리</h2>
              </div>
              <button type="button" onClick={() => setSection("agents")}>
                <Bot size={16} aria-hidden="true" />
                <span>에이전트 보기</span>
              </button>
            </div>
            <AgentRuntimeBars runtimeCounts={agentRuntimeCounts} statusCounts={agentStatusCounts} />
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">History Shape</p>
                <h2>히스토리 밀도</h2>
              </div>
              <History size={18} aria-hidden="true" />
            </div>
            <HistoryDensityChart days={visibleHistoryDays.slice(0, 16)} />
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Recent</p>
                <h2>최근 히스토리</h2>
              </div>
              <button type="button" onClick={() => setSection("history")}>
                <History size={16} aria-hidden="true" />
                <span>히스토리 보기</span>
              </button>
            </div>
            <DocumentList documents={recentHistory} compact />
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Public Readiness</p>
                <h2>공개 전 점검</h2>
              </div>
              <ShieldCheck size={18} aria-hidden="true" />
            </div>
            <p className="status-pill">{snapshot.publicReview.status}</p>
            <ul className="checklist">
              {snapshot.publicReview.checklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      )}

      {section === "desktop" && (
        <DesktopRuntimePanel
          agentCatalogCount={agentCatalog.length}
          blockedTaskCount={collaborationBoard.summary.blockedTasks}
          sourceFiles={visibleSourceFiles}
        />
      )}

      {section === "projects" && (
        <section className="records-grid">
          {snapshot.projects.map((project) => (
            <article className="record-card" key={project.name}>
              <div className="record-header">
                <FolderKanban size={18} aria-hidden="true" />
                <div>
                  <h2>{project.name}</h2>
                  <p>{project.path}</p>
                </div>
              </div>
              <p>{project.purpose}</p>
              <dl>
                <dt>Status</dt>
                <dd>{project.status}</dd>
                <dt>Type</dt>
                <dd>{project.type}</dd>
                <dt>Scope</dt>
                <dd>{project.scope}</dd>
              </dl>
            </article>
          ))}
        </section>
      )}

      {section === "history" && (
        <section className="history-board">
          <div className="history-summary-band">
            <Metric label="History Days" value={visibleHistoryDays.length} icon={CalendarDays} tone="green" />
            <Metric label="History Docs" value={visibleHistoryDays.reduce((total, day) => total + day.documentsCount, 0)} icon={History} tone="blue" />
            <Metric label="Unified Ops" value={visibleUnifiedSummary.totalEvents} icon={Activity} tone="violet" />
            <Metric label="Root Folders" value={snapshot.stats.rootFolders} icon={FolderKanban} tone="amber" />
            <article className="history-latest">
              <span>Latest History Date</span>
              <strong>{latestHistoryDate ? formatDay(latestHistoryDate) : "기록 없음"}</strong>
              <p>{latestHistoryDate || "No dated history records"}</p>
            </article>
          </div>

          <section className="panel wide unified-ops-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Unified Ops</p>
                <h2>히스토리와 모니터링 통합 stream</h2>
              </div>
              <Activity size={18} aria-hidden="true" />
            </div>
            <OpsEventRail events={visibleUnifiedEvents.slice(0, 24)} />
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">History</p>
                <h2>날짜별 작업 기록</h2>
              </div>
              <span className="result-count">{filteredHistoryDays.length} days</span>
            </div>
            <div className="history-filters">
              <label className="select-box">
                <CalendarDays size={16} aria-hidden="true" />
                <select value={historyDate} onChange={(event) => setHistoryDate(event.target.value)}>
                  <option value="all">모든 날짜</option>
                  {visibleHistoryDays.map((day) => (
                    <option key={day.date} value={day.date}>
                      {day.date} ({day.documentsCount})
                    </option>
                  ))}
                </select>
              </label>
              <label className="select-box">
                <ListFilter size={16} aria-hidden="true" />
                <select value={historyCategory} onChange={(event) => setHistoryCategory(event.target.value)}>
                  <option value="all">모든 히스토리 유형</option>
                  {historyCategories.map((item) => (
                    <option key={item} value={item}>
                      {categoryLabel(item)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="history-visual-grid">
              <HistoryDensityChart days={filteredHistoryDays.slice(0, 28)} />
              <HistoryCategoryBars categories={historyCategoryTotals.slice(0, 10)} />
            </div>
            <HistoryTimeline days={filteredHistoryDays.slice(0, 36)} />
          </section>
        </section>
      )}

      {section === "structure" && (
        <section className="structure-grid">
          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Structure</p>
                <h2>루트 폴더 구조</h2>
              </div>
              <span className="result-count">{snapshot.folderStructure.rootFolders.length} roots</span>
            </div>
            <div className="folder-table">
              {snapshot.folderStructure.rootFolders.map((folder) => (
                <article key={`${folder.className}-${folder.path}`}>
                  <span>{folder.className}</span>
                  <strong>{folder.path}</strong>
                  <p>{folder.purpose}</p>
                  <small>{folder.source}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Docs</p>
                <h2>문서 카테고리</h2>
              </div>
              <BookOpenText size={18} aria-hidden="true" />
            </div>
            <div className="stack-list">
              {snapshot.folderStructure.docsCategories.map((folder) => (
                <article key={folder.id}>
                  <strong>{folder.path}</strong>
                  <p>{folder.purpose}</p>
                  <div className="chip-row">
                    <span>{folder.documentsCount} docs</span>
                    <span>{folder.requiredDocumentsCount} required</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Projects</p>
                <h2>프로젝트 내부 홈</h2>
              </div>
              <FolderKanban size={18} aria-hidden="true" />
            </div>
            <div className="project-home-grid">
              {snapshot.folderStructure.projectHomes.map((project) => (
                <article key={project.name}>
                  <strong>{project.name}</strong>
                  <p>{project.purpose}</p>
                  <div className="path-list">
                    {project.topLevelDirs.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">History Sources</p>
                <h2>히스토리 수집 위치</h2>
              </div>
              <History size={18} aria-hidden="true" />
            </div>
            <div className="stack-list">
              {snapshot.folderStructure.historyRoots.map((source) => (
                <article key={`${source.category}-${source.root}`}>
                  <strong>{categoryLabel(source.category)}</strong>
                  <p>{source.root}</p>
                  <div className="chip-row">
                    <span>{source.documentsCount} docs</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      )}

      {section === "documents" && (
        <section className="document-browser">
          {recentDocuments.map((document) => (
            <article className="doc-preview" key={document.id}>
              <div className="doc-meta">
                <span>{categoryLabel(document.category)}</span>
                <span>{document.language}</span>
              </div>
              <h2>{document.title}</h2>
              <p className="path">{document.path}</p>
              <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: document.html }} />
            </article>
          ))}
        </section>
      )}

      {section === "source" && (
        <section className="source-browser">
          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Source</p>
                <h2>소스 코드 보기</h2>
              </div>
              <span className="result-count">{filteredSourceFiles.length} files</span>
            </div>
            <div className="source-filters">
              <label className="select-box">
                <FolderKanban size={16} aria-hidden="true" />
                <select value={sourceProject} onChange={(event) => setSourceProject(event.target.value)}>
                  <option value="all">모든 프로젝트</option>
                  {sourceProjects.map((project) => (
                    <option key={project} value={project}>
                      {project}
                    </option>
                  ))}
                </select>
              </label>
              <label className="select-box">
                <Code2 size={16} aria-hidden="true" />
                <select value={sourceLanguage} onChange={(event) => setSourceLanguage(event.target.value)}>
                  <option value="all">모든 언어</option>
                  {sourceLanguages.map((language) => (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {filteredSourceFiles.length === 0 ? (
              <p className="empty-state">검색 조건에 맞는 소스 파일이 없습니다.</p>
            ) : (
              <div className="source-layout">
                <div className="source-list" aria-label="Source files">
                  {filteredSourceFiles.slice(0, 120).map((file) => (
                    <button
                      key={file.id}
                      className={selectedSource?.id === file.id ? "active" : ""}
                      onClick={() => setSelectedSourceId(file.id)}
                      type="button"
                    >
                      <strong>{file.path}</strong>
                      <span>
                        {file.project} / {file.language} / {file.lineCount.toLocaleString("ko-KR")} lines
                      </span>
                    </button>
                  ))}
                </div>
                <article className="source-viewer">
                  {selectedSource ? (
                    <>
                      <header>
                        <div>
                          <span>{selectedSource.language}</span>
                          <h3>{selectedSource.path}</h3>
                          <p>
                            {selectedSource.project} / {selectedSource.sizeBytes.toLocaleString("ko-KR")} bytes /{" "}
                            {selectedSource.lineCount.toLocaleString("ko-KR")} lines
                          </p>
                        </div>
                        {selectedSource.truncated && <strong>truncated</strong>}
                      </header>
                      <pre>
                        <code>{selectedSource.content}</code>
                      </pre>
                    </>
                  ) : (
                    <p className="empty-state">왼쪽에서 소스 파일을 선택하세요.</p>
                  )}
                </article>
              </div>
            )}
          </section>
        </section>
      )}

      {section === "requirements" && (
        <section className="panel wide">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Requirements</p>
              <h2>요구사항 목록</h2>
            </div>
            <span className="result-count">{visibleRequirements.length} total</span>
          </div>
          <div className="requirements-table">
            {visibleRequirements.map((requirement) => (
              <article key={`${requirement.id}-${requirement.sourcePath}`}>
                <strong>{requirement.id}</strong>
                <span>{requirement.priority}</span>
                <p>{requirement.requirement}</p>
                <small>{requirement.sourcePath}</small>
              </article>
            ))}
          </div>
        </section>
      )}

      {section === "agents" && (
        <div className="content-grid">
          <section className="metrics-band">
            <Metric label="Agent Configs" value={snapshot.stats.agentDefinitions ?? agentCatalog.length} icon={Bot} tone="green" />
            <Metric label="Runtime Agents" value={snapshot.stats.agents} icon={Activity} tone="blue" />
            <Metric label="Active Agents" value={snapshot.stats.activeAgents} icon={GitBranch} tone="amber" />
            <Metric label="Working Tasks" value={collaborationBoard.summary.activeTasks} icon={Network} tone="red" />
            <Metric label="Handoffs" value={collaborationBoard.summary.handoffs} icon={Layers} tone="slate" />
            <Metric label="Blocked" value={collaborationBoard.summary.blockedTasks} icon={ShieldCheck} tone="violet" />
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Collaboration</p>
                <h2>에이전트 협업 작업판</h2>
              </div>
              <Network size={18} aria-hidden="true" />
            </div>
            <AgentCollaborationBoard board={collaborationBoard} />
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Flow</p>
                <h2>에이전트와 작업 연결</h2>
              </div>
              <GitBranch size={18} aria-hidden="true" />
            </div>
            <AgentFlowMap flows={collaborationBoard.flows} />
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Inventory</p>
                <h2>에이전트 구성 맵</h2>
              </div>
              <Bot size={18} aria-hidden="true" />
            </div>
            <AgentInventory agents={agentCatalog} />
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Runtime</p>
                <h2>상태와 작업 흐름</h2>
              </div>
              <Layers size={18} aria-hidden="true" />
            </div>
            <div className="agent-visual-grid">
              <AgentRuntimeBars runtimeCounts={agentRuntimeCounts} statusCounts={agentStatusCounts} />
              <TaskStatusLanes taskStatusCounts={taskStatusCounts} />
            </div>
            <div className="task-table">
              {snapshot.tasks.slice(0, 28).map((task) => (
                <article key={task.id}>
                  <strong>{task.title || task.id}</strong>
                  <span>{task.status}</span>
                  <p>
                    {task.timing_summary
                      ? `시간 ${task.timing_summary.total || "unknown"} / 병목 ${task.timing_summary.bottleneck || "unknown"}`
                      : task.next_action || task.evaluation_report || "No next action"}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function ModeFunctionSwitchboard({
  catalog,
  selectedGroupId,
  onSelectGroup,
  onOpenOption
}: {
  catalog: ModeFunctionCatalog;
  selectedGroupId: string;
  onSelectGroup: (groupId: string) => void;
  onOpenOption: (groupId: string, optionId: string) => void;
}) {
  const selectedGroup = catalog.groups.find((group) => group.id === selectedGroupId) || catalog.groups[0];
  const SelectedIcon = modeFunctionIcon(selectedGroup?.id || "section_location");

  return (
    <section className="panel wide mode-switchboard-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Mode & Function Switchboard</p>
          <h2>모드와 기능 선택 위치</h2>
        </div>
        <div className="mode-switchboard-summary">
          <span>{catalog.summary.totalGroups.toLocaleString("ko-KR")} groups</span>
          <span>{catalog.summary.totalOptions.toLocaleString("ko-KR")} options</span>
          <span>{catalog.summary.desktopGroups.toLocaleString("ko-KR")} desktop</span>
        </div>
      </div>

      {catalog.groups.length ? (
        <div className="mode-switchboard-layout">
          <div className="mode-group-list" aria-label="Mode and function groups">
            {catalog.groups.map((group) => {
              const Icon = modeFunctionIcon(group.id);
              return (
                <button
                  key={group.id}
                  type="button"
                  className={selectedGroup?.id === group.id ? "active" : ""}
                  onClick={() => onSelectGroup(group.id)}
                  title={group.selectorLocation}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{modeFunctionLabel(group.id, group.label)}</span>
                  <small>{group.optionCount.toLocaleString("ko-KR")}</small>
                </button>
              );
            })}
          </div>

          <article className="mode-location-card">
            <div>
              <SelectedIcon size={18} aria-hidden="true" />
              <span>{selectedGroup?.desktopRuntime ? "desktop runtime" : "platform catalog"}</span>
            </div>
            <h3>{selectedGroup?.label || "No group selected"}</h3>
            <p>{selectedGroup?.purpose || "선택 가능한 모드와 기능 위치를 찾지 못했습니다."}</p>
            {selectedGroup && (
              <dl>
                <dt>Selector</dt>
                <dd>{selectedGroup.selectorLocation}</dd>
                <dt>Default</dt>
                <dd>{selectedGroup.defaultMode || "manual choice"}</dd>
                <dt>Source</dt>
                <dd>{selectedGroup.sourcePath || "local UI"}</dd>
              </dl>
            )}
          </article>

          <div className="mode-option-grid" aria-label="Mode and function options">
            {selectedGroup?.options.map((option) => (
              <article key={`${selectedGroup.id}-${option.id}`}>
                <div className="mode-option-header">
                  <span>{option.status}</span>
                  <strong>{option.label}</strong>
                </div>
                <p>{option.description || selectedGroup.purpose}</p>
                <small>{option.location}</small>
                <button type="button" onClick={() => onOpenOption(selectedGroup.id, option.id)}>
                  <span>선택/위치 열기</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <p className="empty-state">modeFunctionCatalog 데이터가 아직 생성되지 않았습니다.</p>
      )}
    </section>
  );
}

function ClaudeCodeTransferPanel({
  transfer,
  onOpenDesktop,
  onOpenDocuments
}: {
  transfer: ClaudeCodeDesignTransfer;
  onOpenDesktop: () => void;
  onOpenDocuments: () => void;
}) {
  const visiblePatterns = transfer.patterns.slice(0, 8);
  const sourcePolicy = transfer.sourceBoundary.policy || "public_sources_only";
  const excludedSources = transfer.sourceBoundary.excluded_sources || [];

  return (
    <section className="panel wide claude-transfer-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Claude Code Design Transfer</p>
          <h2>공개 설계 패턴 전이 지도</h2>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onOpenDesktop}>
            <SquareTerminal size={16} aria-hidden="true" />
            <span>Desktop</span>
          </button>
          <button type="button" onClick={onOpenDocuments}>
            <BookOpenText size={16} aria-hidden="true" />
            <span>Docs</span>
          </button>
        </div>
      </div>

      <div className="claude-transfer-layout">
        <article className="claude-transfer-summary">
          <span>Public sources only</span>
          <strong>{sourcePolicy}</strong>
          <p>
            {excludedSources.length
              ? `Excluded: ${excludedSources.join(", ")}`
              : "비공개 또는 검증 불가능한 출처는 설계 근거로 쓰지 않습니다."}
          </p>
          <dl>
            <dt>Patterns</dt>
            <dd>{transfer.summary.totalPatterns.toLocaleString("ko-KR")}</dd>
            <dt>Ready</dt>
            <dd>{transfer.summary.readyNow.toLocaleString("ko-KR")}</dd>
            <dt>Queued</dt>
            <dd>{transfer.summary.queued.toLocaleString("ko-KR")}</dd>
            <dt>High</dt>
            <dd>{transfer.summary.highPriority.toLocaleString("ko-KR")}</dd>
          </dl>
          <small>{transfer.sourcePath}</small>
        </article>

        <div className="transfer-pattern-grid" aria-label="Claude Code transfer patterns">
          {visiblePatterns.length ? (
            visiblePatterns.map((pattern) => (
              <article key={pattern.id}>
                <header>
                  <span>{pattern.priority}</span>
                  <strong>{pattern.label}</strong>
                </header>
                <p>{pattern.transferPrinciple || pattern.claudeCodeSignal}</p>
                <small>{pattern.platformMapping}</small>
                <div className="transfer-pattern-meta">
                  <span>{pattern.status}</span>
                  <span>{pattern.riskControls.slice(0, 2).join(" / ") || "risk controls pending"}</span>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">Claude Code public design transfer registry가 아직 생성되지 않았습니다.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function PhilosophyFeatureFactoryPanel({
  extraction,
  onOpenAgents,
  onOpenDocuments
}: {
  extraction: PhilosophyFeatureExtraction;
  onOpenAgents: () => void;
  onOpenDocuments: () => void;
}) {
  const visibleFlows = extraction.flows.slice(0, 3);
  const visibleCandidates = extraction.candidates.slice(0, 6);

  return (
    <section className="panel wide philosophy-feature-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Philosophy Feature Factory</p>
          <h2>철학에서 기능 후보 뽑기</h2>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onOpenAgents}>
            <Bot size={16} aria-hidden="true" />
            <span>Agent</span>
          </button>
          <button type="button" onClick={onOpenDocuments}>
            <BookOpenText size={16} aria-hidden="true" />
            <span>Docs</span>
          </button>
        </div>
      </div>

      <div className="philosophy-feature-hero">
        <article>
          <span>source principles</span>
          <strong>{extraction.summary.requiredPrinciples.toLocaleString("ko-KR")}</strong>
          <p>{extraction.sourcePath || "customer snapshot hides internal registry paths"}</p>
        </article>
        <article>
          <span>feature flows</span>
          <strong>{extraction.summary.totalFlows.toLocaleString("ko-KR")}</strong>
          <p>{extraction.summary.totalStages.toLocaleString("ko-KR")} stage extraction loop</p>
        </article>
        <article>
          <span>candidates</span>
          <strong>{extraction.summary.totalCandidates.toLocaleString("ko-KR")}</strong>
          <p>
            {extraction.summary.implemented.toLocaleString("ko-KR")} implemented /{" "}
            {extraction.summary.queued.toLocaleString("ko-KR")} queued
          </p>
        </article>
        <article>
          <span>risk watch</span>
          <strong>{extraction.summary.highRisk.toLocaleString("ko-KR")}</strong>
          <p>{extraction.summary.mediumRisk.toLocaleString("ko-KR")} medium-risk candidates</p>
        </article>
      </div>

      <div className="philosophy-feature-layout">
        <div className="philosophy-flow-list" aria-label="Philosophy feature flows">
          {visibleFlows.length ? (
            visibleFlows.map((flow) => (
              <article key={flow.id}>
                <header>
                  <GitBranch size={16} aria-hidden="true" />
                  <strong>{flow.label}</strong>
                  <span>{flow.principleIds.length.toLocaleString("ko-KR")} principles</span>
                </header>
                <p>{flow.featureQuestion}</p>
                <small>{flow.outputTargets.slice(0, 2).join(" / ")}</small>
              </article>
            ))
          ) : (
            <p className="empty-state">철학 기반 기능 추출 registry가 아직 생성되지 않았습니다.</p>
          )}
        </div>

        <div className="philosophy-candidate-grid" aria-label="Philosophy feature candidates">
          {visibleCandidates.length ? (
            visibleCandidates.map((candidate) => (
              <article key={candidate.id}>
                <div className="philosophy-candidate-top">
                  <span className={`status-pill ${candidate.status}`}>{candidate.status}</span>
                  <span className={`risk-pill ${candidate.riskTier}`}>{candidate.riskTier}</span>
                </div>
                <h3>{candidate.label}</h3>
                <p>{candidate.featureHypothesis}</p>
                <div className="candidate-meta-row">
                  <span>{candidate.smallestAssetType}</span>
                  <span>{candidate.sourcePrincipleIds.slice(0, 3).join(" / ")}</span>
                </div>
                <small>{candidate.validationTargets[0]?.validates || candidate.rollbackPlan}</small>
              </article>
            ))
          ) : (
            <p className="empty-state">철학에서 도출된 기능 후보가 아직 없습니다.</p>
          )}
        </div>
      </div>

      {extraction.defaultCommand && (
        <div className="philosophy-command-strip">
          <FileSearch size={16} aria-hidden="true" />
          <span>{extraction.defaultCommand}</span>
        </div>
      )}
    </section>
  );
}

function modeFunctionIcon(groupId: string): LucideIcon {
  if (groupId === "view_mode" || groupId === "install_mode") {
    return ShieldCheck;
  }
  if (groupId === "language_mode") {
    return Languages;
  }
  if (groupId === "work_mode") {
    return ClipboardCheck;
  }
  if (groupId === "desktop_session_mode" || groupId === "cli_adapter") {
    return SquareTerminal;
  }
  if (groupId === "task_pipe") {
    return Network;
  }
  return Layers;
}

function modeFunctionLabel(groupId: string, fallback: string) {
  const labels: Record<string, string> = {
    desktop_session_mode: "Desktop Session Mode",
    task_pipe: "Task Pipe Preset",
    cli_adapter: "CLI Adapter",
    view_mode: "View Mode",
    language_mode: "Language Mode",
    work_mode: "Work Mode",
    install_mode: "Install Mode",
    section_location: "Monitor Section"
  };
  return labels[groupId] || fallback;
}

function UnifiedOpsPanel({
  summary,
  lanes,
  signalTypes,
  events,
  onOpenHistory,
  onOpenAgents
}: {
  summary: UnifiedOps["summary"];
  lanes: Array<{ key: string; count: number }>;
  signalTypes: Array<{ key: string; count: number }>;
  events: UnifiedOps["events"];
  onOpenHistory: () => void;
  onOpenAgents: () => void;
}) {
  return (
    <section className="panel wide unified-ops-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Unified Ops</p>
          <h2>히스토리와 모니터링 통합</h2>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onOpenHistory}>
            <History size={16} aria-hidden="true" />
            <span>History</span>
          </button>
          <button type="button" onClick={onOpenAgents}>
            <Network size={16} aria-hidden="true" />
            <span>Monitor</span>
          </button>
        </div>
      </div>

      <div className="ops-summary-strip">
        <article>
          <span>total events</span>
          <strong>{summary.totalEvents.toLocaleString("ko-KR")}</strong>
        </article>
        <article>
          <span>history</span>
          <strong>{summary.historyEvents.toLocaleString("ko-KR")}</strong>
        </article>
        <article>
          <span>monitor</span>
          <strong>{summary.monitorEvents.toLocaleString("ko-KR")}</strong>
        </article>
        <article>
          <span>open signals</span>
          <strong>{summary.openSignals.toLocaleString("ko-KR")}</strong>
        </article>
        <article>
          <span>latest</span>
          <strong>{summary.latestEventAt ? formatDate(summary.latestEventAt) : "기록 없음"}</strong>
        </article>
      </div>

      <div className="ops-unified-grid">
        <div className="ops-signal-column">
          <div>
            <span>lanes</span>
            {lanes.length ? (
              lanes.map((lane) => (
                <p key={lane.key}>
                  <strong>{lane.key}</strong>
                  <small>{lane.count}</small>
                </p>
              ))
            ) : (
              <p className="empty-state">lane signal 없음</p>
            )}
          </div>
          <div>
            <span>signals</span>
            {signalTypes.length ? (
              signalTypes.map((signal) => (
                <p key={signal.key}>
                  <strong>{signal.key}</strong>
                  <small>{signal.count}</small>
                </p>
              ))
            ) : (
              <p className="empty-state">signal 없음</p>
            )}
          </div>
        </div>
        <OpsEventRail events={events} />
      </div>
    </section>
  );
}

function OpsEventRail({ events }: { events: UnifiedOps["events"] }) {
  if (events.length === 0) {
    return <p className="empty-state">통합 운영 이벤트가 아직 없습니다.</p>;
  }

  return (
    <div className="ops-event-rail">
      {events.map((event) => (
        <article key={event.id} className={`ops-event severity-${event.severity}`}>
          <div>
            <span>{event.sourceType} / {event.signalType}</span>
            <strong>{event.title}</strong>
            <p>{event.detail || event.path || "No detail"}</p>
            {event.path && <small>{event.path}</small>}
          </div>
          <aside>
            <strong>{event.status}</strong>
            <span>{event.lane}</span>
            <small>{event.timestamp ? formatDate(event.timestamp) : event.date ? formatDay(event.date) : "no time"}</small>
          </aside>
        </article>
      ))}
    </div>
  );
}

function DesktopRuntimePanel({
  agentCatalogCount,
  blockedTaskCount,
  sourceFiles
}: {
  agentCatalogCount: number;
  blockedTaskCount: number;
  sourceFiles: WorkspaceSourceFile[];
}) {
  const [runtimeState, setRuntimeState] = useState<"checking" | "available" | "unavailable">("checking");
  const [health, setHealth] = useState<DesktopHealthStatus | null>(null);
  const [adapters, setAdapters] = useState<CliAdapterStatus[]>(fallbackDesktopAdapters);
  const [reports, setReports] = useState<CliRunReport[]>([]);
  const [sessions, setSessions] = useState<CliSessionReport[]>([]);
  const [taskPipePresets, setTaskPipePresets] = useState<CliTaskPipelinePresetReport[]>(fallbackTaskPipePresets);
  const [selectedTaskPipeKind, setSelectedTaskPipeKind] = useState(fallbackTaskPipePresets[0].taskKind);
  const [taskPipePrompt, setTaskPipePrompt] = useState(
    "이 작업을 pipe graph 기준으로 분해해서 각 CLI lane을 init해줘. source-affecting 결정은 merge gate 전까지 보류하고, 질문은 decision inbox로 보내줘."
  );
  const [pipelineReports, setPipelineReports] = useState<CliTaskPipelineInitReport[]>([]);
  const [taskRunRecords, setTaskRunRecords] = useState<CliTaskRunRecordReport[]>([]);
  const [selectedTaskRunId, setSelectedTaskRunId] = useState("");
  const [taskRunDetail, setTaskRunDetail] = useState<CliTaskRunDetailReport | null>(null);
  const [taskRunBusy, setTaskRunBusy] = useState(false);
  const [taskRunPruneNotice, setTaskRunPruneNotice] = useState("");
  const [runtimeDataBoundary, setRuntimeDataBoundary] = useState<RuntimeDataBoundaryReport | null>(null);
  const [payloadAudit, setPayloadAudit] = useState<InstallerPayloadAuditReport | null>(null);
  const [supportBundle, setSupportBundle] = useState<SupportDiagnosticBundleReport | null>(null);
  const [runtimeDataBusy, setRuntimeDataBusy] = useState("");
  const [runtimeDataNotice, setRuntimeDataNotice] = useState("");
  const [serviceReadiness, setServiceReadiness] = useState<ServiceReadinessReport | null>(null);
  const [serviceReadinessBusy, setServiceReadinessBusy] = useState(false);
  const [serviceReadinessNotice, setServiceReadinessNotice] = useState("");
  const [inboxReport, setInboxReport] = useState<HumanDecisionInboxReport | null>(null);
  const [error, setError] = useState("");
  const [runningAdapterId, setRunningAdapterId] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [selectedSessionModeId, setSelectedSessionModeId] = useState(sessionModePresets[0].id);
  const [selectedSessionAdapterId, setSelectedSessionAdapterId] = useState(fallbackDesktopAdapters[0].adapterId);
  const [workingDir, setWorkingDir] = useState("");
  const [sessionPrompt, setSessionPrompt] = useState(sessionModePresets[0].prompt);
  const [autoDeferQuestions, setAutoDeferQuestions] = useState(true);
  const [sessionInput, setSessionInput] = useState("");
  const [selectedDecisionId, setSelectedDecisionId] = useState("");
  const [decisionAnswerType, setDecisionAnswerType] = useState("instruction");
  const [decisionAnswer, setDecisionAnswer] = useState("");
  const [decisionBusy, setDecisionBusy] = useState(false);
  const [decisionResumeNotice, setDecisionResumeNotice] = useState("");
  const [selectedSourcePath, setSelectedSourcePath] = useState(sourceFiles[0]?.path || "");
  const [sourcePathInput, setSourcePathInput] = useState(sourceFiles[0]?.path || "");
  const [sourceFilter, setSourceFilter] = useState("");
  const [sourceFile, setSourceFile] = useState<WorkspaceTextFile | null>(null);
  const [sourceDraft, setSourceDraft] = useState("");
  const [sourceDrafts, setSourceDrafts] = useState<Record<string, SourceDraftEntry>>({});
  const [sourceSaveResults, setSourceSaveResults] = useState<WorkspaceWriteReport[]>([]);
  const [writeReport, setWriteReport] = useState<WorkspaceWriteReport | null>(null);
  const [editorBusy, setEditorBusy] = useState(false);
  const [saveAllBusy, setSaveAllBusy] = useState(false);
  const activeSessionPollInFlightRef = useRef(false);
  const lastInboxRefreshAtRef = useRef(0);
  const lastTaskRunRefreshAtRef = useRef(0);

  const invoke = getTauriInvoke();
  const availableCount = adapters.filter((adapter) => adapter.available).length;
  const sourceFileCount = sourceFiles.length;
  const editableSourceFiles = useMemo(() => sourceFiles.filter((file) => !file.truncated).slice(0, 240), [sourceFiles]);
  const filteredEditableSourceFiles = useMemo(() => {
    const normalizedFilter = sourceFilter.trim().toLowerCase();
    if (!normalizedFilter) {
      return editableSourceFiles.slice(0, 80);
    }
    return editableSourceFiles
      .filter((file) =>
        [file.path, file.project, file.language, file.extension]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(normalizedFilter))
      )
      .slice(0, 80);
  }, [editableSourceFiles, sourceFilter]);
  const openDraftEntries = useMemo(
    () => Object.values(sourceDrafts).sort((left, right) => left.relativePath.localeCompare(right.relativePath)),
    [sourceDrafts]
  );
  const dirtyDraftEntries = useMemo(
    () => openDraftEntries.filter((entry) => entry.content !== entry.baseContent),
    [openDraftEntries]
  );
  const currentDraftEntry = sourceFile ? sourceDrafts[sourceFile.relativePath] ?? null : null;
  const currentSourceDirty = currentDraftEntry
    ? currentDraftEntry.content !== currentDraftEntry.baseContent
    : sourceFile
      ? sourceDraft !== sourceFile.content
      : false;
  const openInboxDecisions = useMemo(
    () => (inboxReport?.decisions || []).filter((decision) => isOpenDecisionStatus(decision.status)),
    [inboxReport]
  );
  const decisionPrompts = useMemo(
    () => [
      ...reports.flatMap((report) => report.decisionPrompts || []),
      ...sessions.flatMap((session) => session.decisionPrompts || [])
    ],
    [reports, sessions]
  );
  const pendingQuestionCount = useMemo(
    () => sessions.reduce((total, session) => total + (session.pendingDecisionPrompts || 0), 0),
    [sessions]
  );
  const selectedSession = sessions.find((session) => session.sessionId === selectedSessionId) || sessions[0] || null;
  const selectedDecision = (inboxReport?.decisions || []).find((decision) => decision.id === selectedDecisionId) || openInboxDecisions[0] || null;
  const selectedDecisionSession = selectedDecision?.sessionId
    ? sessions.find((session) => session.sessionId === selectedDecision.sessionId) || null
    : null;
  const canResumeSelectedDecision =
    Boolean(selectedDecisionSession) &&
    selectedDecisionSession !== null &&
    ["running", "defer_message_sent"].includes(selectedDecisionSession.status) &&
    Boolean(selectedDecision?.sessionId);
  const selectedMode = sessionModePresets.find((mode) => mode.id === selectedSessionModeId) || sessionModePresets[0];
  const selectedTaskPipe = taskPipePresets.find((preset) => preset.taskKind === selectedTaskPipeKind) || taskPipePresets[0] || fallbackTaskPipePresets[0];
  const pipelineStats = useMemo(() => {
    const latest = pipelineReports[0] || null;
    const started = pipelineReports.reduce((total, report) => total + report.startedSessions, 0);
    const missing = pipelineReports.reduce((total, report) => total + report.missingLanes, 0);
    const edges = pipelineReports.reduce((total, report) => total + report.pipes.length, 0);
    return { latest, started, missing, edges };
  }, [pipelineReports]);
  const taskRunStats = useMemo(() => {
    const active = taskRunRecords.filter((record) => isActiveSessionStatus(record.status)).length;
    const outputBytes = taskRunRecords.reduce((total, record) => total + record.stdoutBytes + record.stderrBytes, 0);
    const decisions = taskRunRecords.reduce((total, record) => total + record.decisionInboxItems, 0);
    const truncated = taskRunRecords.filter((record) => record.outputTruncated).length;
    return { active, outputBytes, decisions, truncated };
  }, [taskRunRecords]);
  const runtimeDataStats = useMemo(() => {
    const roots = runtimeDataBoundary?.roots || [];
    const created = roots.filter((root) => root.created).length;
    const ready = roots.filter((root) => root.exists).length;
    const highFindings = (payloadAudit?.findings || []).filter((finding) => finding.severity === "high").length;
    return { roots: roots.length, created, ready, highFindings };
  }, [payloadAudit, runtimeDataBoundary]);
  const serviceReadinessStats = useMemo(() => {
    const groups = serviceReadiness?.groups || [];
    return {
      groups: groups.length,
      passedGroups: groups.filter((group) => group.status === "passed").length,
      warnings: serviceReadiness?.warnings.length || 0,
      publicBlockers: serviceReadiness?.publicBlockers.length || 0
    };
  }, [serviceReadiness]);
  const selectedTaskRunRecord =
    taskRunRecords.find((record) => record.taskRunId === selectedTaskRunId) || taskRunRecords[0] || null;
  const sessionStats = useMemo(() => {
    const active = sessions.filter((session) => isActiveSessionStatus(session.status)).length;
    const deferred = sessions.filter((session) => session.status === "defer_message_sent").length;
    const autoDeferred = sessions.filter((session) => session.autoDeferTriggered).length;
    const outputBytes = sessions.reduce((total, session) => total + session.stdout.length + session.stderr.length, 0);
    const inboxItems = sessions.reduce((total, session) => total + session.decisionInboxItems, 0);
    return { active, deferred, autoDeferred, outputBytes, inboxItems };
  }, [sessions]);
  const activeSessionPollKey = useMemo(
    () =>
      sessions
        .filter((session) => isActiveSessionStatus(session.status))
        .map((session) => `${session.sessionId}:${session.status}:${session.autoDeferQuestions ? "1" : "0"}`)
        .sort()
        .join("|"),
    [sessions]
  );
  const outputEvents = useMemo(() => {
    const sessionEvents = sessions.flatMap((session) =>
      detectOutputEvents(session.sessionId, session.adapterId, `${session.stdout}\n${session.stderr}`)
    );
    const reportEvents = reports.flatMap((report) =>
      detectOutputEvents(`health-${report.adapterId}`, report.adapterId, `${report.output}\n${report.stderr}`)
    );
    return [...sessionEvents, ...reportEvents].slice(0, 18);
  }, [reports, sessions]);
  const selectedOutputEvents = selectedSession ? outputEvents.filter((event) => event.id.startsWith(selectedSession.sessionId)) : outputEvents;
  const decisionGroups = useMemo(() => groupDecisions(inboxReport?.decisions || []), [inboxReport]);
  const sourceDiff = useMemo<SourceDiffSummary | null>(() => {
    if (!sourceFile) {
      return null;
    }
    return buildSourceDiffSummary(sourceFile.content, sourceDraft);
  }, [sourceDraft, sourceFile]);
  const evidenceItems = useMemo(() => {
    const items = [
      ...outputEvents.slice(0, 5).map((event) => ({
        id: `event-${event.id}`,
        label: event.type,
        title: event.label,
        detail: `${event.lane} / ${event.detail}`
      })),
      ...(selectedDecision
        ? [
            {
              id: `decision-${selectedDecision.id}`,
              label: selectedDecision.status,
              title: selectedDecision.question,
              detail: selectedDecision.resumeAction || selectedDecision.impact || "decision inbox"
            }
          ]
        : []),
      ...(sourceDiff?.dirty
        ? [
            {
              id: "source-diff",
              label: "source",
              title: sourceFile?.relativePath || "draft change",
              detail: `${sourceDiff.addedLines} added / ${sourceDiff.removedLines} removed / ${sourceDiff.changedLines} changed`
            }
          ]
        : []),
      ...(dirtyDraftEntries.length
        ? [
            {
              id: "source-draft-queue",
              label: "drafts",
              title: "File Edit Queue",
              detail: `${dirtyDraftEntries.length} dirty / ${openDraftEntries.length} open`
            }
          ]
        : []),
      ...(pipelineStats.latest
        ? [
            {
              id: `pipeline-${pipelineStats.latest.pipelineId}`,
              label: pipelineStats.latest.status,
              title: pipelineStats.latest.label,
              detail: `${pipelineStats.latest.startedSessions} lanes / ${pipelineStats.latest.pipes.length} pipe edges / ${pipelineStats.latest.mergeGate}`
            }
          ]
        : []),
      ...(taskRunRecords[0]
        ? [
            {
              id: `task-run-${taskRunRecords[0].taskRunId}`,
              label: taskRunRecords[0].status,
              title: taskRunRecords[0].taskKind,
              detail: `${taskRunRecords[0].adapterId} / ${formatBytes(taskRunRecords[0].stdoutBytes + taskRunRecords[0].stderrBytes)} / ${taskRunRecords[0].recordPath}`
            }
          ]
        : []),
      ...(runtimeDataBoundary
        ? [
            {
              id: "runtime-data-boundary",
              label: runtimeDataBoundary.status,
              title: "Runtime Data Roots",
              detail: `${runtimeDataBoundary.roots.length} roots / task runs ${runtimeDataBoundary.taskRunStorePath}`
            }
          ]
        : []),
      ...(payloadAudit
        ? [
            {
              id: "installer-payload-audit",
              label: payloadAudit.status,
              title: "Installer Payload Audit",
              detail: `${payloadAudit.flaggedCount} findings / ${payloadAudit.scannedFiles} files`
            }
          ]
        : []),
      ...(supportBundle
        ? [
            {
              id: "support-diagnostic-bundle",
              label: supportBundle.status,
              title: "Support Diagnostic Bundle",
              detail: `${supportBundle.bundleId} / redacted ${supportBundle.redacted ? "yes" : "no"}`
            }
          ]
        : []),
      ...(serviceReadiness
        ? [
            {
              id: "service-readiness",
              label: serviceReadiness.status,
              title: "Service Readiness",
              detail: `${serviceReadiness.score} score / ${serviceReadiness.publicBlockers.length} public blockers / ${serviceReadiness.releaseLane}`
            }
          ]
        : []),
      ...(writeReport
        ? [
            {
              id: "write-report",
              label: "artifact",
              title: writeReport.relativePath,
              detail: `backup ${writeReport.backupPath}`
            }
          ]
        : []),
      ...sourceSaveResults.slice(0, 2).map((report) => ({
        id: `save-${report.relativePath}`,
        label: report.status,
        title: report.relativePath,
        detail: `backup ${report.backupPath}`
      }))
    ];
    return items.slice(0, 8);
  }, [dirtyDraftEntries.length, openDraftEntries.length, outputEvents, payloadAudit, pipelineStats.latest, runtimeDataBoundary, selectedDecision, serviceReadiness, sourceDiff, sourceFile?.relativePath, sourceSaveResults, supportBundle, taskRunRecords, writeReport]);

  const replaceTaskRunRecords = (records: CliTaskRunRecordReport[]) => {
    setTaskRunRecords(records);
    setSelectedTaskRunId((current) => {
      if (current && records.some((record) => record.taskRunId === current)) {
        return current;
      }
      return records[0]?.taskRunId || "";
    });
    if (records.length === 0) {
      setTaskRunDetail(null);
    }
  };

  const refreshAdapters = async () => {
    setError("");
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setHealth(null);
      setAdapters(fallbackDesktopAdapters);
      return;
    }

    try {
      const [
        nextHealth,
        nextAdapters,
        nextSessions,
        nextInbox,
        nextTaskPipePresets,
        nextTaskRunRecords,
        nextRuntimeDataBoundary,
        nextServiceReadiness
      ] = await Promise.all([
        tauriInvoke<DesktopHealthStatus>("app_health"),
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions"),
        tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox"),
        tauriInvoke<CliTaskPipelinePresetReport[]>("list_cli_task_pipeline_presets"),
        tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records"),
        tauriInvoke<RuntimeDataBoundaryReport>("list_runtime_data_roots"),
        tauriInvoke<ServiceReadinessReport>("get_service_readiness_report")
      ]);
      setRuntimeState("available");
      setHealth(nextHealth);
      setAdapters(nextAdapters);
      setSessions((current) => mergeSessionReports(current, nextSessions, { replaceAll: true }));
      setInboxReport(nextInbox);
      setTaskPipePresets(nextTaskPipePresets.length ? nextTaskPipePresets : fallbackTaskPipePresets);
      replaceTaskRunRecords(nextTaskRunRecords);
      setRuntimeDataBoundary(nextRuntimeDataBoundary);
      setServiceReadiness(nextServiceReadiness);
      setServiceReadinessNotice("");
      setDecisionResumeNotice("");
      if (!selectedDecisionId && nextInbox.decisions[0]) {
        setSelectedDecisionId(nextInbox.decisions[0].id);
      }
      if (!nextAdapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId) && nextAdapters[0]) {
        setSelectedSessionAdapterId(nextAdapters[0].adapterId);
      }
      if (!nextTaskPipePresets.some((preset) => preset.taskKind === selectedTaskPipeKind) && nextTaskPipePresets[0]) {
        setSelectedTaskPipeKind(nextTaskPipePresets[0].taskKind);
      }
    } catch (caught) {
      setRuntimeState("unavailable");
      setHealth(null);
      setAdapters(fallbackDesktopAdapters);
      setSessions((current) => (current.length ? [] : current));
      setTaskPipePresets(fallbackTaskPipePresets);
      replaceTaskRunRecords([]);
      setRuntimeDataBoundary(null);
      setPayloadAudit(null);
      setSupportBundle(null);
      setServiceReadiness(null);
      setServiceReadinessNotice("");
      setInboxReport(null);
      setDecisionResumeNotice("");
      setError(errorMessage(caught));
    }
  };

  const runAllHealthChecks = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    setRunningAdapterId("all");
    setError("");
    try {
      const nextReports = await tauriInvoke<CliRunReport[]>("run_all_cli_adapter_health");
      setReports(nextReports);
      const [nextAdapters, nextSessions, nextInbox, nextTaskRunRecords] = await Promise.all([
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions"),
        tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox"),
        tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records")
      ]);
      setAdapters(nextAdapters);
      setSessions((current) => mergeSessionReports(current, nextSessions, { replaceAll: true }));
      setInboxReport(nextInbox);
      replaceTaskRunRecords(nextTaskRunRecords);
      setDecisionResumeNotice("");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRunningAdapterId("");
    }
  };

  const runSingleHealthCheck = async (adapterId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    setRunningAdapterId(adapterId);
    setError("");
    try {
      const report = await tauriInvoke<CliRunReport>("run_cli_adapter_health", { adapterId });
      setReports((current) => [report, ...current.filter((item) => item.adapterId !== report.adapterId)]);
      const nextAdapters = await tauriInvoke<CliAdapterStatus[]>("list_cli_adapters");
      setAdapters(nextAdapters);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRunningAdapterId("");
    }
  };

  const upsertSession = (report: CliSessionReport) => {
    setSessions((current) => mergeSessionReports(current, [report], { promote: true }));
    setSelectedSessionId(report.sessionId);
  };

  const applySessionMode = (modeId: string) => {
    const mode = sessionModePresets.find((item) => item.id === modeId) || sessionModePresets[0];
    setSelectedSessionModeId(mode.id);
    setSessionPrompt(mode.prompt);
  };

  const refreshDecisionInbox = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setInboxReport(null);
      return;
    }

    try {
      const report = await tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox");
      setInboxReport(report);
      setDecisionResumeNotice("");
      if (!selectedDecisionId && report.decisions[0]) {
        setSelectedDecisionId(report.decisions[0].id);
      }
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const refreshTaskRunRecords = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      replaceTaskRunRecords([]);
      return;
    }

    try {
      const records = await tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records");
      replaceTaskRunRecords(records);
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const loadTaskRunDetail = async (taskRunId?: string) => {
    const tauriInvoke = getTauriInvoke();
    const targetTaskRunId = taskRunId || selectedTaskRunRecord?.taskRunId || "";
    if (!tauriInvoke || !targetTaskRunId) {
      return;
    }

    setTaskRunBusy(true);
    setError("");
    try {
      const detail = await tauriInvoke<CliTaskRunDetailReport>("read_cli_task_run_record", {
        taskRunId: targetTaskRunId
      });
      setSelectedTaskRunId(detail.record.taskRunId);
      setTaskRunDetail(detail);
      setTaskRunPruneNotice("");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setTaskRunBusy(false);
    }
  };

  const pruneTaskRunRecords = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    setTaskRunBusy(true);
    setError("");
    try {
      const report = await tauriInvoke<CliTaskRunPruneReport>("prune_cli_task_run_records", {
        keepCount: 30
      });
      setTaskRunPruneNotice(
        `${report.status}: removed ${report.removedCount}, kept ${report.afterCount}/${report.beforeCount}`
      );
      const records = await tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records");
      replaceTaskRunRecords(records);
      if (taskRunDetail && !records.some((record) => record.taskRunId === taskRunDetail.record.taskRunId)) {
        setTaskRunDetail(null);
      }
      if (report.errors.length) {
        setError(report.errors.join("\n"));
      }
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setTaskRunBusy(false);
    }
  };

  const refreshRuntimeDataBoundary = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeDataBoundary(null);
      return;
    }

    setRuntimeDataBusy("roots");
    setError("");
    try {
      const report = await tauriInvoke<RuntimeDataBoundaryReport>("list_runtime_data_roots");
      setRuntimeDataBoundary(report);
      setRuntimeDataNotice(`${report.status}: ${report.roots.length} runtime roots ready`);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRuntimeDataBusy("");
    }
  };

  const runInstallerPayloadAudit = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    setRuntimeDataBusy("payload");
    setError("");
    try {
      const report = await tauriInvoke<InstallerPayloadAuditReport>("run_installer_payload_audit");
      setPayloadAudit(report);
      setRuntimeDataNotice(`${report.status}: ${report.flaggedCount} findings / ${report.scannedFiles} scanned files`);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRuntimeDataBusy("");
    }
  };

  const createSupportDiagnosticBundle = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    setRuntimeDataBusy("support");
    setError("");
    try {
      const report = await tauriInvoke<SupportDiagnosticBundleReport>("create_support_diagnostic_bundle");
      setSupportBundle(report);
      setRuntimeDataNotice(`${report.status}: ${report.bundleId}`);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRuntimeDataBusy("");
    }
  };

  const refreshServiceReadiness = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setServiceReadiness(null);
      return;
    }

    setServiceReadinessBusy(true);
    setError("");
    try {
      const report = await tauriInvoke<ServiceReadinessReport>("get_service_readiness_report");
      setServiceReadiness(report);
      setServiceReadinessNotice(
        `${report.status}: score ${report.score}, public blockers ${report.publicBlockers.length}`
      );
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setServiceReadinessBusy(false);
    }
  };

  const answerDecision = async (resumeSession = false) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || !selectedDecision) {
      return;
    }
    if (!decisionAnswer.trim()) {
      setError("Decision answer is required.");
      return;
    }

    setDecisionBusy(true);
    setError("");
    setDecisionResumeNotice("");
    try {
      const report = resumeSession
        ? await tauriInvoke<DecisionResumeReport>("answer_and_resume_human_decision", {
            decisionId: selectedDecision.id,
            answerType: decisionAnswerType,
            answerText: decisionAnswer
          })
        : await tauriInvoke<HumanDecisionInboxReport>("answer_human_decision", {
            decisionId: selectedDecision.id,
            answerType: decisionAnswerType,
            answerText: decisionAnswer
          });
      const nextInbox = resumeSession ? (report as DecisionResumeReport).inbox : (report as HumanDecisionInboxReport);
      const resumedSession = resumeSession ? (report as DecisionResumeReport).session : null;
      if (resumedSession) {
        upsertSession(resumedSession);
        await refreshTaskRunRecords();
      }
      if (resumeSession) {
        const resumeReport = report as DecisionResumeReport;
        setDecisionResumeNotice(`${resumeReport.resumeStatus}: ${resumeReport.resumeDetail}`);
      }
      setInboxReport(nextInbox);
      setDecisionAnswer("");
      const nextOpen = nextInbox.decisions.find((decision) => isOpenDecisionStatus(decision.status));
      setSelectedDecisionId(nextOpen?.id || nextInbox.updatedId || nextInbox.decisions[0]?.id || "");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setDecisionBusy(false);
    }
  };

  const startSession = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    setRunningAdapterId("session");
    setError("");
    const args: Record<string, unknown> = {
      adapterId: selectedSessionAdapterId,
      prompt: sessionPrompt,
      autoDeferQuestions
    };
    if (workingDir.trim()) {
      args.workingDir = workingDir.trim();
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("start_cli_adapter_session", args);
      upsertSession(report);
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRunningAdapterId("");
    }
  };

  const initTaskPipe = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }
    if (!taskPipePrompt.trim()) {
      setError("Task pipe prompt is required.");
      return;
    }

    setRunningAdapterId("task-pipe");
    setError("");
    const args: Record<string, unknown> = {
      taskKind: selectedTaskPipe.taskKind,
      prompt: taskPipePrompt,
      autoDeferQuestions
    };
    if (workingDir.trim()) {
      args.workingDir = workingDir.trim();
    }

    try {
      const report = await tauriInvoke<CliTaskPipelineInitReport>("start_cli_task_pipeline", args);
      setPipelineReports((current) => [report, ...current].slice(0, 8));
      const laneSessions = report.lanes
        .map((lane) => lane.session)
        .filter((session): session is CliSessionReport => Boolean(session));
      if (laneSessions.length) {
        setSessions((current) => mergeSessionReports(current, laneSessions, { promote: true }));
        setSelectedSessionId(laneSessions[0].sessionId);
      }
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setRunningAdapterId("");
    }
  };

  const pollSession = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("poll_cli_adapter_session", { sessionId });
      upsertSession(report);
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const writeSessionInput = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || !sessionInput.trim()) {
      return;
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("write_cli_adapter_stdin", {
        sessionId,
        input: sessionInput
      });
      upsertSession(report);
      setSessionInput("");
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const deferSession = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("send_cli_adapter_defer_message", { sessionId });
      upsertSession(report);
      await refreshDecisionInbox();
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const deferDetectedQuestions = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    setDecisionBusy(true);
    setError("");
    try {
      const reports = await tauriInvoke<CliSessionReport[]>("defer_all_cli_adapter_questions");
      setSessions((current) => mergeSessionReports(current, reports, { replaceAll: true }));
      const inbox = await tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox");
      setInboxReport(inbox);
      await refreshTaskRunRecords();
      const nextOpen = inbox.decisions.find((decision) => isOpenDecisionStatus(decision.status));
      setSelectedDecisionId(nextOpen?.id || inbox.decisions[0]?.id || "");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setDecisionBusy(false);
    }
  };

  const cancelSession = async (sessionId: string) => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      return;
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("cancel_cli_adapter_session", { sessionId });
      upsertSession(report);
      await refreshTaskRunRecords();
    } catch (caught) {
      setError(errorMessage(caught));
    }
  };

  const loadSourceFileByPath = async (relativePath: string) => {
    const tauriInvoke = getTauriInvoke();
    const targetPath = relativePath.trim();
    if (!tauriInvoke) {
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }
    if (!targetPath) {
      setError("Workspace-relative source path is required.");
      return;
    }

    setEditorBusy(true);
    setError("");
    setWriteReport(null);
    try {
      const nextFile = await tauriInvoke<WorkspaceTextFile>("read_workspace_text_file", {
        relativePath: targetPath
      });
      const nextEntry: SourceDraftEntry = {
        relativePath: nextFile.relativePath,
        baseContent: nextFile.content,
        content: nextFile.content,
        sizeBytes: nextFile.sizeBytes,
        maxSizeBytes: nextFile.maxSizeBytes,
        loadedAt: new Date().toISOString()
      };
      setSourceFile(nextFile);
      setSourceDraft(nextFile.content);
      setSelectedSourcePath(nextFile.relativePath);
      setSourcePathInput(nextFile.relativePath);
      setSourceDrafts((current) => ({ ...current, [nextFile.relativePath]: nextEntry }));
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setEditorBusy(false);
    }
  };

  const loadSourceFile = async () => {
    await loadSourceFileByPath(sourcePathInput || selectedSourcePath);
  };

  const selectDraftEntry = (relativePath: string) => {
    const entry = sourceDrafts[relativePath];
    if (!entry) {
      return;
    }
    setSelectedSourcePath(entry.relativePath);
    setSourcePathInput(entry.relativePath);
    setSourceFile({
      relativePath: entry.relativePath,
      content: entry.baseContent,
      sizeBytes: entry.sizeBytes,
      maxSizeBytes: entry.maxSizeBytes
    });
    setSourceDraft(entry.content);
    setWriteReport(
      entry.lastSavedBackupPath
        ? {
            relativePath: entry.relativePath,
            sizeBytes: entry.sizeBytes,
            backupPath: entry.lastSavedBackupPath,
            status: entry.status || "saved"
          }
        : null
    );
  };

  const openDraftOrLoad = async (relativePath: string) => {
    if (sourceDrafts[relativePath]) {
      selectDraftEntry(relativePath);
      return;
    }
    await loadSourceFileByPath(relativePath);
  };

  const updateSourceDraft = (nextContent: string) => {
    setSourceDraft(nextContent);
    if (!sourceFile) {
      return;
    }
    setSourceDrafts((current) => {
      const existing = current[sourceFile.relativePath] || {
        relativePath: sourceFile.relativePath,
        baseContent: sourceFile.content,
        content: sourceFile.content,
        sizeBytes: sourceFile.sizeBytes,
        maxSizeBytes: sourceFile.maxSizeBytes,
        loadedAt: new Date().toISOString()
      };
      return {
        ...current,
        [sourceFile.relativePath]: {
          ...existing,
          content: nextContent
        }
      };
    });
  };

  const saveSourceFile = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || !sourceFile) {
      return;
    }

    setEditorBusy(true);
    setError("");
    try {
      const report = await tauriInvoke<WorkspaceWriteReport>("write_workspace_text_file", {
        relativePath: sourceFile.relativePath,
        content: sourceDraft
      });
      setWriteReport(report);
      setSourceFile({ ...sourceFile, content: sourceDraft, sizeBytes: report.sizeBytes });
      setSourceDrafts((current) => {
        const existing = current[sourceFile.relativePath] || {
          relativePath: sourceFile.relativePath,
          baseContent: sourceFile.content,
          content: sourceDraft,
          sizeBytes: report.sizeBytes,
          maxSizeBytes: sourceFile.maxSizeBytes,
          loadedAt: new Date().toISOString()
        };
        return {
          ...current,
          [sourceFile.relativePath]: {
            ...existing,
            baseContent: sourceDraft,
            content: sourceDraft,
            sizeBytes: report.sizeBytes,
            lastSavedBackupPath: report.backupPath,
            status: report.status
          }
        };
      });
      setSourceSaveResults((current) => [
        report,
        ...current.filter((item) => item.relativePath !== report.relativePath)
      ].slice(0, 8));
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setEditorBusy(false);
    }
  };

  const saveAllSourceDrafts = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || dirtyDraftEntries.length === 0) {
      return;
    }

    setSaveAllBusy(true);
    setError("");
    try {
      const reportsToAdd: WorkspaceWriteReport[] = [];
      const nextDrafts: Record<string, SourceDraftEntry> = { ...sourceDrafts };
      for (const entry of dirtyDraftEntries) {
        const report = await tauriInvoke<WorkspaceWriteReport>("write_workspace_text_file", {
          relativePath: entry.relativePath,
          content: entry.content
        });
        reportsToAdd.push(report);
        nextDrafts[entry.relativePath] = {
          ...entry,
          baseContent: entry.content,
          content: entry.content,
          sizeBytes: report.sizeBytes,
          lastSavedBackupPath: report.backupPath,
          status: report.status
        };
      }
      setSourceDrafts(nextDrafts);
      setSourceSaveResults((current) => [
        ...reportsToAdd,
        ...current.filter((item) => !reportsToAdd.some((report) => report.relativePath === item.relativePath))
      ].slice(0, 8));
      if (sourceFile && nextDrafts[sourceFile.relativePath]) {
        const currentEntry = nextDrafts[sourceFile.relativePath];
        setSourceFile({
          relativePath: currentEntry.relativePath,
          content: currentEntry.baseContent,
          sizeBytes: currentEntry.sizeBytes,
          maxSizeBytes: currentEntry.maxSizeBytes
        });
        setSourceDraft(currentEntry.content);
      }
      if (reportsToAdd[0]) {
        setWriteReport(reportsToAdd[0]);
      }
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSaveAllBusy(false);
    }
  };

  const revertCurrentDraft = () => {
    if (!sourceFile || !currentDraftEntry) {
      return;
    }
    setSourceDraft(currentDraftEntry.baseContent);
    setSourceDrafts((current) => ({
      ...current,
      [sourceFile.relativePath]: {
        ...currentDraftEntry,
        content: currentDraftEntry.baseContent
      }
    }));
    setWriteReport(null);
  };

  const closeCurrentDraft = () => {
    if (!sourceFile) {
      return;
    }
    const currentPath = sourceFile.relativePath;
    const nextEntry = openDraftEntries.find((entry) => entry.relativePath !== currentPath) || null;
    setSourceDrafts((current) => {
      const next = { ...current };
      delete next[currentPath];
      return next;
    });
    if (nextEntry) {
      setSelectedSourcePath(nextEntry.relativePath);
      setSourcePathInput(nextEntry.relativePath);
      setSourceFile({
        relativePath: nextEntry.relativePath,
        content: nextEntry.baseContent,
        sizeBytes: nextEntry.sizeBytes,
        maxSizeBytes: nextEntry.maxSizeBytes
      });
      setSourceDraft(nextEntry.content);
    } else {
      setSourceFile(null);
      setSourceDraft("");
      setWriteReport(null);
    }
  };

  useEffect(() => {
    void refreshAdapters();
  }, []);

  useEffect(() => {
    const tauriInvoke = getTauriInvoke();
    const activeSessionIds = activeSessionPollKey
      .split("|")
      .filter(Boolean)
      .map((entry) => entry.split(":")[0])
      .filter(Boolean);
    if (!tauriInvoke || runtimeState !== "available" || activeSessionIds.length === 0) {
      return undefined;
    }

    let disposed = false;
    const pollActiveSessions = async () => {
      if (activeSessionPollInFlightRef.current) {
        return;
      }
      activeSessionPollInFlightRef.current = true;
      try {
        const reports = await Promise.all(
          activeSessionIds.map((sessionId) =>
            tauriInvoke<CliSessionReport>("poll_cli_adapter_session", { sessionId }).catch(() => null)
          )
        );
        const nextReports = reports.filter((report): report is CliSessionReport => Boolean(report));
        if (disposed || nextReports.length === 0) {
          return;
        }
        setSessions((current) => mergeSessionReports(current, nextReports));
        const shouldRefreshInbox = nextReports.some(
          (report) => report.autoDeferTriggered || report.decisionInboxItems > 0 || report.decisionCaptureError
        );
        const now = Date.now();
        if (shouldRefreshInbox && now - lastInboxRefreshAtRef.current >= INBOX_REFRESH_THROTTLE_MS) {
          lastInboxRefreshAtRef.current = now;
          const inbox = await tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox");
          if (disposed) {
            return;
          }
          setInboxReport(inbox);
          setSelectedDecisionId((current) => current || inbox.decisions[0]?.id || "");
        }
        if (now - lastTaskRunRefreshAtRef.current >= TASK_RUN_REFRESH_THROTTLE_MS) {
          lastTaskRunRefreshAtRef.current = now;
          const records = await tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records");
          if (disposed) {
            return;
          }
          replaceTaskRunRecords(records);
        }
      } catch (caught) {
        if (!disposed) {
          setError(errorMessage(caught));
        }
      } finally {
        activeSessionPollInFlightRef.current = false;
      }
    };

    void pollActiveSessions();
    const interval = window.setInterval(() => {
      void pollActiveSessions();
    }, SESSION_POLL_INTERVAL_MS);
    return () => {
      disposed = true;
      window.clearInterval(interval);
    };
  }, [activeSessionPollKey, runtimeState]);

  useEffect(() => {
    if (!selectedSourcePath && sourceFiles[0]) {
      setSelectedSourcePath(sourceFiles[0].path);
    }
  }, [selectedSourcePath, sourceFiles]);

  return (
    <div className="content-grid desktop-grid">
      <section className="desktop-hero">
        <div>
          <p className="eyebrow">Desktop Runtime</p>
          <h2>Platform-first host</h2>
          <p>
            플랫폼을 먼저 실행하고 그 위에 Codex, Gemini CLI, Claude Code CLI, OpenCode 같은 Guest adapters를 올립니다.
            플랫폼은 task state, decision inbox, artifacts, validation, source editing을 소유하고 CLI는 선택 lane으로만 실행됩니다.
          </p>
        </div>
        <div className={`desktop-runtime-state state-${runtimeState}`}>
          <span>{runtimeState}</span>
          <strong>{availableCount} / {adapters.length}</strong>
          <small>available guest adapters</small>
        </div>
      </section>

      <section className="metrics-band">
        <Metric label="Guest Adapters" value={adapters.length} icon={Network} tone="green" />
        <Metric label="Available" value={availableCount} icon={CheckCircle2} tone="blue" />
        <Metric label="Task Pipes" value={pipelineReports.length} icon={GitBranch} tone="rose" />
        <Metric label="Task Runs" value={taskRunRecords.length} icon={FileSearch} tone="blue" />
        <Metric label="Decision Items" value={decisionPrompts.length + blockedTaskCount + openInboxDecisions.length} icon={Inbox} tone="amber" />
        <Metric label="Agent Configs" value={agentCatalogCount} icon={Bot} tone="violet" />
        <Metric label="Auto Deferred" value={sessionStats.autoDeferred} icon={ShieldCheck} tone="slate" />
        <Metric label="Public Blockers" value={serviceReadinessStats.publicBlockers} icon={AlertTriangle} tone="amber" />
        <Metric label="Source Files" value={sourceFileCount} icon={Code2} tone="green" />
      </section>

      <section className="panel wide desktop-command-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Command Palette</p>
            <h2>빠른 실행</h2>
          </div>
          <Search size={18} aria-hidden="true" />
        </div>
        <div className="desktop-command-grid">
          <button type="button" onClick={runAllHealthChecks} disabled={!invoke || runningAdapterId !== ""}>
            <Network size={16} aria-hidden="true" />
            <span>Check CLI adapters</span>
            <small>{availableCount} available</small>
          </button>
          <button
            type="button"
            onClick={startSession}
            disabled={!invoke || runningAdapterId !== "" || !adapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId && adapter.available)}
          >
            <SquareTerminal size={16} aria-hidden="true" />
            <span>Start selected lane</span>
            <small>{selectedMode.label}</small>
          </button>
          <button type="button" onClick={initTaskPipe} disabled={!invoke || runningAdapterId !== ""}>
            <GitBranch size={16} aria-hidden="true" />
            <span>Init task pipe</span>
            <small>{selectedTaskPipe.label}</small>
          </button>
          <button type="button" onClick={refreshDecisionInbox} disabled={!invoke || decisionBusy}>
            <Inbox size={16} aria-hidden="true" />
            <span>Refresh decisions</span>
            <small>{openInboxDecisions.length} open</small>
          </button>
          <button type="button" onClick={refreshTaskRunRecords} disabled={!invoke || runningAdapterId !== ""}>
            <FileSearch size={16} aria-hidden="true" />
            <span>Refresh task runs</span>
            <small>{taskRunRecords.length} records</small>
          </button>
          <button type="button" onClick={refreshRuntimeDataBoundary} disabled={!invoke || runtimeDataBusy !== ""}>
            <Activity size={16} aria-hidden="true" />
            <span>Runtime roots</span>
            <small>{runtimeDataStats.ready}/{runtimeDataStats.roots || "?"} ready</small>
          </button>
          <button type="button" onClick={runInstallerPayloadAudit} disabled={!invoke || runtimeDataBusy !== ""}>
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Audit payload</span>
            <small>{payloadAudit ? `${payloadAudit.flaggedCount} findings` : "not scanned"}</small>
          </button>
          <button type="button" onClick={createSupportDiagnosticBundle} disabled={!invoke || runtimeDataBusy !== ""}>
            <FileSearch size={16} aria-hidden="true" />
            <span>Support bundle</span>
            <small>{supportBundle?.status || "redacted export"}</small>
          </button>
          <button type="button" onClick={refreshServiceReadiness} disabled={!invoke || serviceReadinessBusy}>
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Service readiness</span>
            <small>{serviceReadiness ? `${serviceReadiness.score} / ${serviceReadiness.publicBlockers.length} blockers` : "not checked"}</small>
          </button>
          <button type="button" onClick={deferDetectedQuestions} disabled={!invoke || decisionBusy || pendingQuestionCount === 0}>
            <ShieldCheck size={16} aria-hidden="true" />
            <span>Defer detected questions</span>
            <small>{pendingQuestionCount} pending</small>
          </button>
          <button type="button" onClick={loadSourceFile} disabled={!invoke || editorBusy || !selectedSourcePath}>
            <GitBranch size={16} aria-hidden="true" />
            <span>Open source review</span>
            <small>{sourceDiff?.dirty ? "draft changed" : "ready"}</small>
          </button>
        </div>
      </section>

      <section className="panel wide task-pipe-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Task Pipe Init</p>
            <h2>작업 기준 다중 CLI 초기화</h2>
          </div>
          <GitBranch size={18} aria-hidden="true" />
        </div>

        <div className="task-pipe-layout">
          <div className="task-pipe-controls">
            <label>
              <span>Pipe preset</span>
              <select value={selectedTaskPipeKind} onChange={(event) => setSelectedTaskPipeKind(event.target.value)}>
                {taskPipePresets.map((preset) => (
                  <option key={preset.taskKind} value={preset.taskKind}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="session-prompt-field">
              <span>Task intake</span>
              <textarea value={taskPipePrompt} onChange={(event) => setTaskPipePrompt(event.target.value)} rows={4} />
            </label>
            <label className="inline-toggle">
              <input
                type="checkbox"
                checked={autoDeferQuestions}
                onChange={(event) => setAutoDeferQuestions(event.target.checked)}
              />
              <span>Auto-defer questions</span>
            </label>
            <button type="button" onClick={initTaskPipe} disabled={!invoke || runningAdapterId !== "" || !taskPipePrompt.trim()}>
              <Network size={16} aria-hidden="true" />
              <span>{runningAdapterId === "task-pipe" ? "Initializing" : "Init Pipe"}</span>
            </button>
          </div>

          <div className="task-pipe-summary">
            <article>
              <span>preset</span>
              <strong>{selectedTaskPipe.label}</strong>
              <small>{selectedTaskPipe.intent}</small>
            </article>
            <article>
              <span>lanes</span>
              <strong>{selectedTaskPipe.laneCount}</strong>
              <small>{selectedTaskPipe.adapterIds.join(" / ")}</small>
            </article>
            <article>
              <span>merge gate</span>
              <strong>{selectedTaskPipe.mergeGate}</strong>
              <small>lane output waits for platform acceptance</small>
            </article>
          </div>
        </div>

        {pipelineReports.length === 0 ? (
          <p className="empty-state">아직 init된 task pipe가 없습니다. preset을 선택하고 pipe를 시작하세요.</p>
        ) : (
          <div className="task-pipe-report-grid">
            {pipelineReports.slice(0, 3).map((report) => (
              <article key={report.pipelineId} className={`task-pipe-report status-${report.status}`}>
                <header>
                  <div>
                    <span>{report.taskKind}</span>
                    <h3>{report.label}</h3>
                  </div>
                  <strong>{report.status}</strong>
                </header>
                <p>{report.workingDir}</p>
                <div className="adapter-report">
                  <span>{report.startedSessions} started</span>
                  <span>{report.missingLanes} missing</span>
                  <span>{report.pipes.length} pipes</span>
                </div>
                <div className="pipe-lane-grid">
                  {report.lanes.map((lane) => (
                    <div key={`${report.pipelineId}-${lane.laneId}`}>
                      <span>{lane.laneId}</span>
                      <strong>{lane.status}</strong>
                      <small>{lane.adapterId} / {lane.role}</small>
                    </div>
                  ))}
                </div>
                <div className="pipe-edge-list">
                  {report.pipes.slice(0, 8).map((pipe) => (
                    <span key={pipe.pipeId}>
                      {pipe.fromNode} → {pipe.toNode} / {pipe.mode}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="panel wide runtime-data-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Runtime Data & Support</p>
            <h2>설치형 데이터 경계</h2>
          </div>
          <div className="desktop-actions">
            <button type="button" onClick={refreshRuntimeDataBoundary} disabled={!invoke || runtimeDataBusy !== ""}>
              <Activity size={15} aria-hidden="true" />
              <span>{runtimeDataBusy === "roots" ? "Checking" : "Roots"}</span>
            </button>
            <button type="button" onClick={runInstallerPayloadAudit} disabled={!invoke || runtimeDataBusy !== ""}>
              <ShieldCheck size={15} aria-hidden="true" />
              <span>{runtimeDataBusy === "payload" ? "Auditing" : "Audit Payload"}</span>
            </button>
            <button type="button" onClick={createSupportDiagnosticBundle} disabled={!invoke || runtimeDataBusy !== ""}>
              <FileSearch size={15} aria-hidden="true" />
              <span>{runtimeDataBusy === "support" ? "Creating" : "Support Bundle"}</span>
            </button>
          </div>
        </div>
        {runtimeDataNotice && <p className="decision-resume-notice">{runtimeDataNotice}</p>}
        <div className="task-run-summary-strip">
          <article>
            <span>roots</span>
            <strong>{runtimeDataStats.roots}</strong>
          </article>
          <article>
            <span>ready</span>
            <strong>{runtimeDataStats.ready}</strong>
          </article>
          <article>
            <span>created</span>
            <strong>{runtimeDataStats.created}</strong>
          </article>
          <article>
            <span>payload findings</span>
            <strong>{payloadAudit?.flaggedCount ?? 0}</strong>
          </article>
          <article>
            <span>high</span>
            <strong>{runtimeDataStats.highFindings}</strong>
          </article>
        </div>

        <div className="runtime-data-layout">
          <div className="runtime-root-grid">
            {(runtimeDataBoundary?.roots || []).slice(0, 10).map((root) => (
              <article key={root.id} className={root.exists ? "ready" : "missing"}>
                <header>
                  <div>
                    <span>{root.plane}</span>
                    <h3>{root.label}</h3>
                  </div>
                  <strong>{root.created ? "created" : root.exists ? "ready" : "missing"}</strong>
                </header>
                <p>{root.purpose}</p>
                <code>{root.path}</code>
                <div className="adapter-report">
                  <span>{root.id}</span>
                  <span>{root.visibility}</span>
                </div>
              </article>
            ))}
            {!runtimeDataBoundary && (
              <p className="empty-state">Runtime root 상태가 아직 로드되지 않았습니다.</p>
            )}
          </div>

          <article className="runtime-audit-card">
            <header>
              <div>
                <span>{payloadAudit?.status || "not-scanned"}</span>
                <h3>Installer Payload Audit</h3>
              </div>
              <strong>{payloadAudit?.flaggedCount ?? 0}</strong>
            </header>
            <div className="task-run-detail-meta">
              <span>{payloadAudit ? `${payloadAudit.scannedFiles} files` : "0 files"}</span>
              <span>{payloadAudit ? formatBytes(payloadAudit.scannedBytes) : "0 B"}</span>
              <span>{payloadAudit?.maxScanFiles ?? 0} max</span>
            </div>
            <code>{payloadAudit?.auditPath || "No audit report yet"}</code>
            <div className="payload-finding-list">
              {(payloadAudit?.findings || []).slice(0, 6).map((finding) => (
                <div key={`${finding.ruleId}-${finding.path}`}>
                  <strong>{finding.severity}</strong>
                  <span>{finding.ruleId}</span>
                  <p>{finding.reason}</p>
                  <code>{finding.path}</code>
                </div>
              ))}
              {payloadAudit && payloadAudit.findings.length === 0 && <p className="empty-state">No payload findings.</p>}
            </div>
          </article>

          <article className="runtime-audit-card">
            <header>
              <div>
                <span>{supportBundle?.status || "not-created"}</span>
                <h3>Support Diagnostic Bundle</h3>
              </div>
              <strong>{supportBundle?.redacted ? "redacted" : "idle"}</strong>
            </header>
            <div className="support-bundle-grid">
              <code>{supportBundle?.manifestPath || "No manifest yet"}</code>
              <code>{supportBundle?.runtimeRootsPath || "No runtime roots export"}</code>
              <code>{supportBundle?.installerPayloadAuditPath || "No payload audit export"}</code>
              <code>{supportBundle?.taskRunSummaryPath || "No task-run summary"}</code>
              <code>{supportBundle?.recentEventsPath || "No recent events log"}</code>
            </div>
          </article>
        </div>
      </section>

      <section className="panel wide service-readiness-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Service Readiness</p>
            <h2>서비스 출시 준비도</h2>
          </div>
          <div className="desktop-actions">
            <button type="button" onClick={refreshServiceReadiness} disabled={!invoke || serviceReadinessBusy}>
              <ShieldCheck size={15} aria-hidden="true" />
              <span>{serviceReadinessBusy ? "Checking" : "Run Readiness"}</span>
            </button>
          </div>
        </div>
        {serviceReadinessNotice && <p className="decision-resume-notice">{serviceReadinessNotice}</p>}
        <div className="service-domain-row" aria-label="Service readiness domains">
          <span>Runtime Data</span>
          <span>Customer Payload</span>
          <span>Support Diagnostics</span>
          <span>Workspace Onboarding</span>
          <span>Privacy & Logging</span>
          <span>Signed Distribution</span>
          <span>Update & Recovery</span>
        </div>
        <div className={`service-readiness-hero status-${serviceReadiness?.status || "unknown"}`}>
          <div>
            <span>{serviceReadiness?.releaseLane || "local_internal"}</span>
            <strong>{serviceReadiness?.status || "not checked"}</strong>
            <p>{serviceReadiness?.serviceClaim || "서비스 준비도 report를 실행하면 공개 배포 blocker와 다음 조치가 표시됩니다."}</p>
          </div>
          <div className="service-score-ring">
            <span>{serviceReadiness?.score ?? 0}</span>
            <small>score</small>
          </div>
        </div>
        <div className="task-run-summary-strip">
          <article>
            <span>groups</span>
            <strong>{serviceReadinessStats.passedGroups}/{serviceReadinessStats.groups}</strong>
          </article>
          <article>
            <span>Public blockers</span>
            <strong>{serviceReadinessStats.publicBlockers}</strong>
          </article>
          <article>
            <span>warnings</span>
            <strong>{serviceReadinessStats.warnings}</strong>
          </article>
          <article>
            <span>payload findings</span>
            <strong>{serviceReadiness?.payloadFlaggedCount ?? 0}</strong>
          </article>
          <article>
            <span>generated</span>
            <strong>{serviceReadiness ? formatTimeLabel(serviceReadiness.generatedAt) : "idle"}</strong>
          </article>
        </div>

        <div className="service-readiness-layout">
          <div className="service-group-grid">
            {(serviceReadiness?.groups || []).map((group) => (
              <article key={group.id} className={`service-group-card status-${group.status}`}>
                <header>
                  <div>
                    <span>{group.id}</span>
                    <h3>{group.label}</h3>
                  </div>
                  <strong>{group.status}</strong>
                </header>
                <div className="adapter-report">
                  <span>{group.passedChecks}/{group.totalChecks} checks</span>
                  <span>{group.checks.filter((check) => check.requiredForPublic).length} public</span>
                </div>
                <div className="service-check-list">
                  {group.checks.map((check) => (
                    <div key={check.id} className={`status-${check.status}`}>
                      <strong>{check.status}</strong>
                      <span>{check.label}</span>
                      <p>{check.detail}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
            {!serviceReadiness && (
              <p className="empty-state">Run Readiness를 누르면 signed distribution, update/recovery, privacy/logging, onboarding gap을 점검합니다.</p>
            )}
          </div>

          <article className="service-next-actions">
            <header>
              <div>
                <span>{serviceReadiness?.publicBlockers.length || 0} blockers</span>
                <h3>Public blockers / next actions</h3>
              </div>
              <AlertTriangle size={18} aria-hidden="true" />
            </header>
            <div className="service-blocker-list">
              {(serviceReadiness?.nextActions || []).map((action) => (
                <div key={action.checkId} className={`status-${action.status}`}>
                  <strong>{action.status}</strong>
                  <span>{action.label}</span>
                  <p>{action.action}</p>
                </div>
              ))}
              {serviceReadiness && serviceReadiness.nextActions.length === 0 && (
                <p className="empty-state">No next actions. Public readiness still needs final clean release validation before release language.</p>
              )}
              {!serviceReadiness && (
                <p className="empty-state">공개 서비스 blocker는 readiness report 실행 후 표시됩니다.</p>
              )}
            </div>
            <code>{serviceReadiness?.payloadAuditPath || "payload audit path pending"}</code>
          </article>
        </div>
      </section>

      <section className="panel wide task-run-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Task Run Store</p>
            <h2>저장된 실행 기록과 로그</h2>
          </div>
          <div className="desktop-actions">
            <button type="button" onClick={refreshTaskRunRecords} disabled={!invoke || runningAdapterId !== ""}>
              <FileSearch size={15} aria-hidden="true" />
              <span>Refresh Records</span>
            </button>
            <button type="button" onClick={pruneTaskRunRecords} disabled={!invoke || taskRunBusy || taskRunRecords.length <= 30}>
              <ShieldCheck size={15} aria-hidden="true" />
              <span>Prune Old</span>
            </button>
          </div>
        </div>
        {taskRunPruneNotice && <p className="decision-resume-notice">{taskRunPruneNotice}</p>}
        <div className="task-run-summary-strip">
          <article>
            <span>records</span>
            <strong>{taskRunRecords.length}</strong>
          </article>
          <article>
            <span>active</span>
            <strong>{taskRunStats.active}</strong>
          </article>
          <article>
            <span>log bytes</span>
            <strong>{formatBytes(taskRunStats.outputBytes)}</strong>
          </article>
          <article>
            <span>decisions</span>
            <strong>{taskRunStats.decisions}</strong>
          </article>
          <article>
            <span>truncated</span>
            <strong>{taskRunStats.truncated}</strong>
          </article>
        </div>
        {taskRunRecords.length === 0 ? (
          <p className="empty-state">아직 저장된 task-run record가 없습니다. 세션이나 task pipe를 실행하면 record.json과 stdout/stderr 로그가 생성됩니다.</p>
        ) : (
          <div className="task-run-store-layout">
            <div className="task-run-grid">
              {taskRunRecords.slice(0, 8).map((record) => (
                <article
                  key={record.recordId}
                  className={`task-run-card status-${record.status} ${selectedTaskRunRecord?.taskRunId === record.taskRunId ? "active" : ""}`}
                >
                  <header>
                    <div>
                      <span>{record.taskKind}</span>
                      <h3>{record.label}</h3>
                    </div>
                    <strong>{record.status}</strong>
                  </header>
                  <div className="task-run-meta">
                    <span>{record.adapterId}</span>
                    <span>{record.laneId || record.pipelineId || "single lane"}</span>
                    <span>{formatDuration(record.elapsedMs)}</span>
                    <span>{record.exitCode ?? "no code"}</span>
                  </div>
                  <p>{record.recordPath}</p>
                  <div className="task-run-log-paths">
                    <code>{record.stdoutLogPath}</code>
                    <code>{record.stderrLogPath}</code>
                  </div>
                  <div className="adapter-report">
                    <span>{formatBytes(record.stdoutBytes + record.stderrBytes)}</span>
                    <span>{record.pendingDecisionPrompts} pending</span>
                    <span>{record.autoDeferTriggered ? "auto-deferred" : "captured"}</span>
                  </div>
                  <div className="desktop-actions">
                    <button type="button" onClick={() => loadTaskRunDetail(record.taskRunId)} disabled={!invoke || taskRunBusy}>
                      <FileSearch size={15} aria-hidden="true" />
                      <span>{taskRunBusy && selectedTaskRunRecord?.taskRunId === record.taskRunId ? "Opening" : "Open Logs"}</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <article className="task-run-detail">
              <header>
                <div>
                  <span>{taskRunDetail?.record.taskRunId || selectedTaskRunRecord?.taskRunId || "no-task-run"}</span>
                  <h3>{taskRunDetail?.record.taskKind || selectedTaskRunRecord?.taskKind || "Task run detail"}</h3>
                </div>
                <strong>{taskRunDetail?.record.status || selectedTaskRunRecord?.status || "idle"}</strong>
              </header>
              {!taskRunDetail ? (
                <p className="empty-state">기록을 선택하고 Open Logs를 누르면 bounded stdout/stderr preview와 record JSON이 표시됩니다.</p>
              ) : (
                <>
                  <div className="task-run-detail-meta">
                    <span>{taskRunDetail.record.adapterId}</span>
                    <span>{taskRunDetail.record.laneId || taskRunDetail.record.pipelineId || "single lane"}</span>
                    <span>{formatBytes(taskRunDetail.record.stdoutBytes + taskRunDetail.record.stderrBytes)}</span>
                    <span>{taskRunDetail.maxLogPreviewBytes.toLocaleString("ko-KR")} byte preview</span>
                  </div>
                  <div className="task-run-preview-tabs">
                    <article>
                      <span>stdout{taskRunDetail.stdoutTruncated ? " / truncated" : ""}</span>
                      <pre><code>{taskRunDetail.stdoutPreview || "No stdout log"}</code></pre>
                    </article>
                    <article>
                      <span>stderr{taskRunDetail.stderrTruncated ? " / truncated" : ""}</span>
                      <pre><code>{taskRunDetail.stderrPreview || "No stderr log"}</code></pre>
                    </article>
                    <article>
                      <span>record JSON</span>
                      <pre><code>{taskRunDetail.recordJson}</code></pre>
                    </article>
                  </div>
                </>
              )}
            </article>
          </div>
        )}
      </section>

      <section className="panel wide desktop-control-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Capability Center</p>
            <h2>CLI adapter 상태</h2>
          </div>
          <div className="desktop-actions">
            <button type="button" onClick={refreshAdapters} disabled={runningAdapterId !== ""}>
              <Activity size={16} aria-hidden="true" />
              <span>Refresh</span>
            </button>
            <button type="button" onClick={runAllHealthChecks} disabled={!invoke || runningAdapterId !== ""}>
              <CheckCircle2 size={16} aria-hidden="true" />
              <span>{runningAdapterId === "all" ? "Running" : "Run All Checks"}</span>
            </button>
          </div>
        </div>

        {error && <p className="desktop-error">{error}</p>}

        <div className="desktop-health-strip">
          <article>
            <span>Shell</span>
            <strong>{health?.shell || "not connected"}</strong>
          </article>
          <article>
            <span>UI Source</span>
            <strong>{health?.uiSource || "workspace-monitor"}</strong>
          </article>
          <article>
            <span>Execution Scope</span>
            <strong>bounded pipes and scoped files</strong>
          </article>
          <article>
            <span>Platform state owner</span>
            <strong>tasks, decisions, artifacts, validation</strong>
          </article>
        </div>

        <div className="adapter-grid">
          {adapters.map((adapter) => {
            const report = reports.find((item) => item.adapterId === adapter.adapterId);
            const running = runningAdapterId === adapter.adapterId;
            const setupGuide = adapterSetupGuides[adapter.adapterId];
            return (
              <article key={adapter.adapterId} className={adapter.available ? "adapter-card available" : "adapter-card missing"}>
                <header>
                  <div>
                    <span>{adapter.adapterId}</span>
                    <h3>{adapter.label}</h3>
                  </div>
                  <strong>{adapter.available ? "available" : "missing"}</strong>
                </header>
                <p>
                  <code>{adapter.command}</code>
                  {adapter.version ? ` / ${adapter.version}` : ""}
                </p>
                <small>{adapter.resolvedPath || adapter.lastError || "No status detail"}</small>
                {setupGuide && (
                  <div className="adapter-setup-guide">
                    <span>{adapter.available ? "Verify" : "Setup"}</span>
                    <code>{adapter.available ? setupGuide.verifyCommand : setupGuide.installHint}</code>
                    <small>{setupGuide.sourceUrl}</small>
                    <small>{setupGuide.caution}</small>
                  </div>
                )}
                <div className="capability-meta-grid">
                  <span>{adapter.available ? "ready" : "setup-later"}</span>
                  <span>{sessions.filter((session) => session.adapterId === adapter.adapterId).length} lanes</span>
                  <span>{reports.some((item) => item.adapterId === adapter.adapterId) ? "checked" : "unchecked"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => runSingleHealthCheck(adapter.adapterId)}
                  disabled={!invoke || runningAdapterId !== "" || !adapter.available}
                >
                  <Activity size={15} aria-hidden="true" />
                  <span>{running ? "Running" : "Health Check"}</span>
                </button>
                {report && (
                  <div className="adapter-report">
                    <span>{report.status}</span>
                    <span>{report.durationMs}ms</span>
                    <span>{report.exitCode ?? "no code"}</span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="panel wide cli-session-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Run Board</p>
            <h2>Lane / timeline / terminal</h2>
          </div>
          <span className="result-count">{sessions.length} sessions</span>
        </div>

        <div className="run-board-strip">
          <article>
            <span>active lanes</span>
            <strong>{sessionStats.active}</strong>
          </article>
          <article>
            <span>deferred lanes</span>
            <strong>{sessionStats.deferred}</strong>
          </article>
          <article>
            <span>auto deferred</span>
            <strong>{sessionStats.autoDeferred}</strong>
          </article>
          <article>
            <span>output</span>
            <strong>{formatBytes(sessionStats.outputBytes)}</strong>
          </article>
          <article>
            <span>events</span>
            <strong>{outputEvents.length}</strong>
          </article>
        </div>

        <div className="process-graph" aria-label="CLI process graph">
          <article className="process-node node-intake">
            <span>intake</span>
            <strong>{selectedMode.label}</strong>
          </article>
          {sessions.slice(0, 4).map((session) => (
            <article key={session.sessionId} className={`process-node node-${session.status}`}>
              <span>{session.adapterId}</span>
              <strong>{session.status}</strong>
              <small>{formatDuration(session.elapsedMs)}</small>
            </article>
          ))}
          <article className="process-node node-decision">
            <span>decision</span>
            <strong>{openInboxDecisions.length} open</strong>
          </article>
          <article className="process-node node-review">
            <span>review</span>
            <strong>{sourceDiff?.dirty ? "diff pending" : "clean"}</strong>
          </article>
        </div>

        <div className="session-launcher">
          <label>
            <span>Adapter</span>
            <select value={selectedSessionAdapterId} onChange={(event) => setSelectedSessionAdapterId(event.target.value)}>
              {adapters.map((adapter) => (
                <option key={adapter.adapterId} value={adapter.adapterId}>
                  {adapter.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Mode</span>
            <select value={selectedSessionModeId} onChange={(event) => applySessionMode(event.target.value)}>
              {sessionModePresets.map((mode) => (
                <option key={mode.id} value={mode.id}>
                  {mode.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Working dir</span>
            <input
              value={workingDir}
              onChange={(event) => setWorkingDir(event.target.value)}
              placeholder="workspace root"
            />
          </label>
          <label className="session-prompt-field">
            <span>Initial input</span>
            <textarea value={sessionPrompt} onChange={(event) => setSessionPrompt(event.target.value)} rows={4} />
          </label>
          <label className="inline-toggle">
            <input
              type="checkbox"
              checked={autoDeferQuestions}
              onChange={(event) => setAutoDeferQuestions(event.target.checked)}
            />
            <span>Auto-defer questions</span>
          </label>
          <button
            type="button"
            onClick={startSession}
            disabled={!invoke || runningAdapterId !== "" || !adapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId && adapter.available)}
          >
            <SquareTerminal size={16} aria-hidden="true" />
            <span>{runningAdapterId === "session" ? "Starting" : "Start Session"}</span>
          </button>
        </div>
        <p className="session-mode-note">{selectedMode.intent}</p>

        {sessions.length === 0 ? (
          <p className="empty-state">실행 세션이 없습니다. 설치된 adapter를 선택하고 session을 시작하세요.</p>
        ) : (
          <div className="session-grid">
            <div className="session-list">
              {sessions.map((session) => (
                <article key={session.sessionId} className={`session-card status-${session.status}`}>
                  <header>
                    <div>
                      <span>{session.adapterId}</span>
                      <h3>{session.label}</h3>
                    </div>
                    <strong>{session.status}</strong>
                  </header>
                  <p>{session.workingDir}</p>
                  <div className="adapter-report">
                    <span>{session.elapsedMs}ms</span>
                    <span>{session.exitCode ?? "no code"}</span>
                    <span>
                      {session.pendingDecisionPrompts
                        ? `${session.pendingDecisionPrompts} pending`
                        : session.decisionInboxItems
                          ? `${session.decisionInboxItems} inbox`
                          : session.outputTruncated
                            ? "truncated"
                            : "bounded"}
                    </span>
                  </div>
                  <div className="lane-mini-timeline">
                    <span>started</span>
                    <span>{session.deferMessageSent ? (session.autoDeferTriggered ? "auto-deferred" : "deferred") : "streaming"}</span>
                    <span>{session.autoDeferQuestions ? `${session.deferredPromptCount} held` : "manual hold"}</span>
                    <span>{isActiveSessionStatus(session.status) ? "open" : "finished"}</span>
                  </div>
                  {session.decisionCaptureError && <p className="desktop-error">{session.decisionCaptureError}</p>}
                  {session.persistenceError && <p className="desktop-error">{session.persistenceError}</p>}
                  <div className="session-record-link">
                    <span>{session.taskKind}</span>
                    <strong>{session.taskRecordPath || "record pending"}</strong>
                    <small>{session.stdoutLogPath || "stdout log pending"}</small>
                  </div>
                  <div className="desktop-actions">
                    <button type="button" onClick={() => setSelectedSessionId(session.sessionId)}>
                      <ListFilter size={15} aria-hidden="true" />
                      <span>Inspect</span>
                    </button>
                    <button type="button" onClick={() => pollSession(session.sessionId)} disabled={!invoke}>
                      <Activity size={15} aria-hidden="true" />
                      <span>Poll</span>
                    </button>
                    <button type="button" onClick={() => deferSession(session.sessionId)} disabled={!invoke || session.status !== "running"}>
                      <Inbox size={15} aria-hidden="true" />
                      <span>Defer</span>
                    </button>
                    <button type="button" onClick={() => cancelSession(session.sessionId)} disabled={!invoke || !["running", "defer_message_sent"].includes(session.status)}>
                      <ShieldCheck size={15} aria-hidden="true" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <article className="session-terminal">
              <header>
                <div>
                  <span>{selectedSession?.sessionId || "no-session"}</span>
                  <h3>{selectedSession?.label || "Session output"}</h3>
                </div>
                <strong>{selectedSession?.status || "idle"}</strong>
              </header>
              <pre>
                <code>{selectedSession ? selectedSession.stdout || selectedSession.stderr || "No output yet" : "No session selected"}</code>
              </pre>
              {selectedSession?.stderr && selectedSession.stdout && <small>{selectedSession.stderr}</small>}
              <div className="terminal-event-rail">
                {selectedOutputEvents.slice(0, 6).map((event) => (
                  <article key={event.id} className={`event-${event.type}`}>
                    <span>{event.type}</span>
                    <strong>{event.label}</strong>
                    <small>{event.detail}</small>
                  </article>
                ))}
                {selectedOutputEvents.length === 0 && <p className="empty-state">구조화된 terminal event가 아직 없습니다.</p>}
              </div>
              <div className="session-input-row">
                <input
                  value={sessionInput}
                  onChange={(event) => setSessionInput(event.target.value)}
                  placeholder="stdin input"
                  disabled={!selectedSession || !["running", "defer_message_sent"].includes(selectedSession.status)}
                />
                <button
                  type="button"
                  onClick={() => selectedSession && writeSessionInput(selectedSession.sessionId)}
                  disabled={!invoke || !selectedSession || !sessionInput.trim() || !["running", "defer_message_sent"].includes(selectedSession.status)}
                >
                  <ArrowRight size={15} aria-hidden="true" />
                  <span>Send</span>
                </button>
              </div>
            </article>
          </div>
        )}
      </section>

      <section className="panel wide terminal-output-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Terminal Output</p>
            <h2>최근 bounded 실행 결과</h2>
          </div>
          <span className="result-count">{reports.length} reports</span>
        </div>
        {reports.length === 0 ? (
          <p className="empty-state">아직 실행한 CLI health check가 없습니다.</p>
        ) : (
          <div className="terminal-report-list">
            {reports.map((report) => (
              <article key={`${report.adapterId}-${report.durationMs}`}>
                <header>
                  <div>
                    <span>{report.adapterId}</span>
                    <h3>{report.label}</h3>
                  </div>
                  <strong>{report.status}</strong>
                </header>
                <pre>
                  <code>{report.output || report.stderr || "No output"}</code>
                </pre>
                {report.stderr && report.output && <small>{report.stderr}</small>}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="panel wide desktop-decision-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Decision Inbox</p>
            <h2>보류된 사용자 결정</h2>
          </div>
          <div className="desktop-actions">
            <button type="button" onClick={refreshDecisionInbox} disabled={!invoke || decisionBusy}>
              <Activity size={15} aria-hidden="true" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="decision-summary-strip">
          <article>
            <span>open</span>
            <strong>{inboxReport?.openCount ?? 0}</strong>
          </article>
          <article>
            <span>answered</span>
            <strong>{inboxReport?.answeredCount ?? 0}</strong>
          </article>
          <article>
            <span>total</span>
            <strong>{inboxReport?.totalCount ?? 0}</strong>
          </article>
        </div>

        {!inboxReport || inboxReport.decisions.length === 0 ? (
          <p className="empty-state">보류된 decision inbox 항목이 없습니다.</p>
        ) : (
          <div className="decision-inbox-layout">
            <div className="decision-list">
              {decisionGroups.slice(0, 8).map((group) => (
                <div key={group.id} className="decision-group">
                  <header>
                    <strong>{group.label}</strong>
                    <span>{group.openCount} open / {group.answeredCount} answered</span>
                  </header>
                  {group.decisions.slice(0, 6).map((decision) => (
                    <button
                      key={decision.id}
                      className={selectedDecision?.id === decision.id ? "active" : ""}
                      type="button"
                      onClick={() => setSelectedDecisionId(decision.id)}
                    >
                      <span>{decision.status}</span>
                      <strong>{decision.question}</strong>
                      <small>{decision.sessionId ? `${decision.source} / ${decision.sessionId}` : decision.source}</small>
                    </button>
                  ))}
                </div>
              ))}
            </div>

            <article className="decision-answer-box">
              {selectedDecision ? (
                <>
                  <header>
                    <div>
                      <span>{selectedDecision.priority}</span>
                      <h3>{selectedDecision.question}</h3>
                    </div>
                    <strong>{selectedDecision.status}</strong>
                  </header>
                  <p>{selectedDecision.impact || "No impact note"}</p>
                  <small>{selectedDecision.resumeAction || "No resume action recorded"}</small>
                  {(selectedDecision.sessionId || selectedDecision.adapterId) && (
                    <div className="decision-resume-strip">
                      <span>{selectedDecision.adapterId || "linked session"}</span>
                      <strong>{selectedDecision.sessionId || "no session id"}</strong>
                      <small>{selectedDecisionSession?.status || "not loaded"}</small>
                    </div>
                  )}
                  {decisionResumeNotice && <p className="decision-resume-notice">{decisionResumeNotice}</p>}
                  {selectedDecision.answerText && (
                    <div className="decision-existing-answer">
                      <span>{selectedDecision.answerType || "answer"}</span>
                      <p>{selectedDecision.answerText}</p>
                    </div>
                  )}
                  <div className="decision-replay-strip" aria-label="decision replay">
                    <article>
                      <span>created</span>
                      <strong>{selectedDecision.createdAt || "unknown"}</strong>
                    </article>
                    <article>
                      <span>blocked</span>
                      <strong>{selectedDecision.blockedWorkCount}</strong>
                    </article>
                    <article>
                      <span>unblocked</span>
                      <strong>{selectedDecision.unblockedWorkCount}</strong>
                    </article>
                    <article>
                      <span>answered</span>
                      <strong>{selectedDecision.answeredAt || "pending"}</strong>
                    </article>
                  </div>
                  <div className="decision-answer-controls">
                    <select value={decisionAnswerType} onChange={(event) => setDecisionAnswerType(event.target.value)}>
                      <option value="instruction">Instruction</option>
                      <option value="approve">Approve</option>
                      <option value="edit">Edit</option>
                      <option value="reject">Reject</option>
                    </select>
                    <textarea
                      value={decisionAnswer}
                      onChange={(event) => setDecisionAnswer(event.target.value)}
                      rows={4}
                    />
                    <button
                      type="button"
                      onClick={() => answerDecision(false)}
                      disabled={!invoke || decisionBusy || !decisionAnswer.trim()}
                    >
                      <CheckCircle2 size={15} aria-hidden="true" />
                      <span>{decisionBusy ? "Saving" : "Answer"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => answerDecision(true)}
                      disabled={!invoke || decisionBusy || !decisionAnswer.trim() || !canResumeSelectedDecision}
                      title={canResumeSelectedDecision ? "Send this answer to the linked CLI session" : "Linked CLI session is not active"}
                    >
                      <ArrowRight size={15} aria-hidden="true" />
                      <span>{decisionBusy ? "Resuming" : "Answer & Resume"}</span>
                    </button>
                  </div>
                </>
              ) : (
                <p className="empty-state">선택된 decision이 없습니다.</p>
              )}
            </article>
          </div>
        )}

        <div className="decision-candidate-stack">
          <div className="panel-heading compact-heading">
            <div>
              <p className="eyebrow">Live Candidates</p>
              <h3>최근 CLI 질문 후보</h3>
            </div>
          </div>
          {decisionPrompts.length === 0 ? (
            <p className="empty-state">최근 실행에서 사용자 질문으로 보이는 출력은 감지되지 않았습니다.</p>
          ) : (
            <div className="stack-list">
              {decisionPrompts.map((prompt) => (
                <article key={`${prompt.lane}-${prompt.question}`}>
                  <strong>{prompt.question}</strong>
                  <p>{prompt.impact}</p>
                  <small>{prompt.resumeAction}</small>
                </article>
              ))}
            </div>
          )}
          </div>
      </section>

      <section className="panel wide evidence-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Evidence / Promotion</p>
            <h2>근거와 재사용 후보</h2>
          </div>
          <FileSearch size={18} aria-hidden="true" />
        </div>
        {evidenceItems.length === 0 ? (
          <p className="empty-state">아직 승격할 terminal event, decision, source diff, artifact가 없습니다.</p>
        ) : (
          <div className="evidence-grid">
            {evidenceItems.map((item) => (
              <article key={item.id}>
                <span>{item.label}</span>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="panel wide desktop-source-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Source Review</p>
            <h2>Multi-file scoped editor</h2>
          </div>
          <div className="source-panel-stats">
            <span>{openDraftEntries.length} open</span>
            <strong>{dirtyDraftEntries.length} dirty</strong>
          </div>
        </div>
        <div className="source-editor-controls">
          <label className="source-path-field">
            <span>Open Path</span>
            <input
              value={sourcePathInput}
              onChange={(event) => {
                setSourcePathInput(event.target.value);
                setSelectedSourcePath(event.target.value);
              }}
              placeholder="workspace-relative path"
            />
          </label>
          <label>
            <span>Indexed File</span>
            <select
              value={selectedSourcePath}
              onChange={(event) => {
                setSelectedSourcePath(event.target.value);
                setSourcePathInput(event.target.value);
              }}
            >
              {editableSourceFiles.map((file) => (
                <option key={file.id} value={file.path}>
                  {file.path}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={loadSourceFile} disabled={!invoke || editorBusy || !sourcePathInput.trim()}>
            <FileSearch size={15} aria-hidden="true" />
            <span>{editorBusy ? "Loading" : "Open Path"}</span>
          </button>
          <button type="button" onClick={saveSourceFile} disabled={!invoke || editorBusy || !sourceFile || !currentSourceDirty}>
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>Save Current</span>
          </button>
          <button type="button" onClick={saveAllSourceDrafts} disabled={!invoke || editorBusy || saveAllBusy || dirtyDraftEntries.length === 0}>
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>{saveAllBusy ? "Saving" : "Save All"}</span>
          </button>
          <button type="button" onClick={revertCurrentDraft} disabled={!sourceFile || !currentSourceDirty}>
            <History size={15} aria-hidden="true" />
            <span>Revert Draft</span>
          </button>
          <button type="button" onClick={closeCurrentDraft} disabled={!sourceFile}>
            <ShieldCheck size={15} aria-hidden="true" />
            <span>Close Draft</span>
          </button>
        </div>

        <div className="source-review-grid">
          <aside className="source-file-browser">
            <header>
              <div>
                <span>Indexed files</span>
                <strong>{filteredEditableSourceFiles.length} shown</strong>
              </div>
              <Code2 size={16} aria-hidden="true" />
            </header>
            <input
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
              placeholder="Filter by path, project, or language"
            />
            <div className="source-file-browser-list">
              {filteredEditableSourceFiles.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  className={sourceFile?.relativePath === file.path ? "active" : ""}
                  onClick={() => openDraftOrLoad(file.path)}
                  disabled={!invoke || editorBusy}
                >
                  <strong>{file.path}</strong>
                  <span>
                    {file.project} / {file.language || file.extension} / {formatBytes(file.sizeBytes)}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="source-edit-workbench">
            <div className="source-draft-queue" aria-label="File Edit Queue">
              <header>
                <div>
                  <span>File Edit Queue</span>
                  <strong>{dirtyDraftEntries.length} dirty / {openDraftEntries.length} open</strong>
                </div>
                <small>workspace-scoped backups on save</small>
              </header>
              {openDraftEntries.length === 0 ? (
                <p className="empty-state">열린 파일 드래프트가 없습니다.</p>
              ) : (
                <div className="source-draft-list">
                  {openDraftEntries.map((entry) => {
                    const dirty = entry.content !== entry.baseContent;
                    return (
                      <button
                        key={entry.relativePath}
                        type="button"
                        className={`${sourceFile?.relativePath === entry.relativePath ? "active" : ""} ${dirty ? "dirty" : "clean"}`}
                        onClick={() => selectDraftEntry(entry.relativePath)}
                      >
                        <span>{dirty ? "dirty" : entry.status || "clean"}</span>
                        <strong>{entry.relativePath}</strong>
                        <small>
                          {formatBytes(entry.content.length)} / loaded {entry.loadedAt.slice(11, 19)}
                        </small>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {sourceFile ? (
              <div className="source-editor-frame">
                <div className="source-editor-meta">
                  <span>{sourceFile.relativePath}</span>
                  <strong>
                    {formatBytes(sourceDraft.length)} / max {formatBytes(sourceFile.maxSizeBytes)}
                  </strong>
                </div>
                {sourceDiff && (
                  <div className={`source-diff-review ${sourceDiff.dirty ? "dirty" : "clean"}`}>
                    <header>
                      <div>
                        <span>{sourceDiff.dirty ? "diff pending" : "no changes"}</span>
                        <strong>
                          +{sourceDiff.addedLines} / -{sourceDiff.removedLines} / {sourceDiff.changedLines} changed
                        </strong>
                      </div>
                      <small>backup save gate</small>
                    </header>
                    {sourceDiff.preview.length > 0 && (
                      <div className="source-diff-preview">
                        {sourceDiff.preview.map((item) => (
                          <article key={item.line}>
                            <span>line {item.line}</span>
                            <code>- {item.before || "<empty>"}</code>
                            <code>+ {item.after || "<empty>"}</code>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <textarea value={sourceDraft} onChange={(event) => updateSourceDraft(event.target.value)} spellCheck={false} />
                {writeReport && (
                  <p className="desktop-success">
                    {writeReport.status} / backup: {writeReport.backupPath}
                  </p>
                )}
              </div>
            ) : (
              <p className="empty-state">소스 파일을 선택한 뒤 Tauri runtime에서 열면 scoped editor가 활성화됩니다.</p>
            )}

            {sourceSaveResults.length > 0 && (
              <div className="source-save-results">
                <header>
                  <div>
                    <span>Save Results</span>
                    <strong>{sourceSaveResults.length} recent backups</strong>
                  </div>
                  <small>latest first</small>
                </header>
                <div>
                  {sourceSaveResults.map((report) => (
                    <article key={`${report.relativePath}-${report.backupPath}`}>
                      <span>{report.status}</span>
                      <strong>{report.relativePath}</strong>
                      <small>
                        {formatBytes(report.sizeBytes)} / {report.backupPath}
                      </small>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

function mergeSessionReports(
  current: CliSessionReport[],
  reports: CliSessionReport[],
  options: { promote?: boolean; replaceAll?: boolean } = {}
) {
  if (reports.length === 0) {
    return current;
  }

  const currentById = new Map(current.map((session) => [session.sessionId, session]));
  const reportsById = new Map(reports.map((report) => [report.sessionId, report]));
  const reportIds = new Set(reports.map((report) => report.sessionId));

  if (options.replaceAll) {
    let changed = current.length !== reports.length;
    const next = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      if (existing && areSessionReportsRenderEqual(existing, report)) {
        return existing;
      }
      changed = true;
      return report;
    });
    return changed ? next : current;
  }

  let changed = false;
  const updated = current.map((session) => {
    const report = reportsById.get(session.sessionId);
    if (!report) {
      return session;
    }
    if (areSessionReportsRenderEqual(session, report)) {
      return session;
    }
    changed = true;
    return report;
  });
  const newReports = reports.filter((report) => !currentById.has(report.sessionId));
  if (newReports.length > 0) {
    changed = true;
  }
  if (!changed) {
    return current;
  }

  if (options.promote) {
    const promoted = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      return existing && areSessionReportsRenderEqual(existing, report) ? existing : report;
    });
    return [...promoted, ...updated.filter((session) => !reportIds.has(session.sessionId))];
  }

  return [...updated, ...newReports];
}

function areSessionReportsRenderEqual(left: CliSessionReport, right: CliSessionReport) {
  return sessionReportRenderSignature(left) === sessionReportRenderSignature(right);
}

function sessionReportRenderSignature(session: CliSessionReport) {
  return [
    session.sessionId,
    session.taskRunId,
    session.taskKind,
    session.pipelineId || "",
    session.laneId || "",
    session.status,
    session.exitCode ?? "",
    Math.floor(session.elapsedMs / SESSION_POLL_IDLE_UPDATE_BUCKET_MS),
    session.stdout.length,
    session.stdout.slice(-SESSION_OUTPUT_SIGNATURE_CHARS),
    session.stderr.length,
    session.stderr.slice(-SESSION_OUTPUT_SIGNATURE_CHARS),
    session.decisionPrompts
      .map((prompt) => `${prompt.lane}:${prompt.question}:${prompt.resumeAction}`)
      .join("\u001e"),
    session.outputTruncated ? "1" : "0",
    session.deferMessageSent ? "1" : "0",
    session.autoDeferQuestions ? "1" : "0",
    session.autoDeferTriggered ? "1" : "0",
    session.decisionInboxItems,
    session.pendingDecisionPrompts,
    session.deferredPromptCount,
    session.decisionCaptureError || "",
    session.taskRecordPath || "",
    session.stdoutLogPath || "",
    session.stderrLogPath || "",
    session.persistenceError || ""
  ].join("\u001f");
}

function getTauriInvoke(): TauriInvoke | null {
  if (typeof window === "undefined") {
    return null;
  }
  return window.__TAURI__?.core?.invoke ?? null;
}

function errorMessage(caught: unknown) {
  if (caught instanceof Error) {
    return caught.message;
  }
  return String(caught);
}

function isOpenDecisionStatus(status: string) {
  return ["open", "deferred", "resuming"].includes(status);
}

function isActiveSessionStatus(status: string) {
  return ["running", "defer_message_sent"].includes(status);
}

function formatDuration(ms: number) {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  if (ms < 60_000) {
    return `${Math.round(ms / 100) / 10}s`;
  }
  return `${Math.round(ms / 60_000)}m`;
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes}B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)}KB`;
  }
  return `${Math.round((bytes / (1024 * 1024)) * 10) / 10}MB`;
}

function detectOutputEvents(sourceId: string, lane: string, output: string): OutputEvent[] {
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const events: OutputEvent[] = [];

  for (const [index, line] of lines.entries()) {
    const lower = line.toLowerCase();
    const id = `${sourceId}-${index}`;
    if (events.length >= 8) {
      break;
    }
    if (/[?？]|\b(confirm|approve|continue|proceed|choose|select|y\/n|yes\/no)\b|선택|확인|승인|진행|질문/.test(lower)) {
      events.push({ id, type: "question", lane, label: "question candidate", detail: line.slice(0, 180) });
      continue;
    }
    if (/\b(error|failed|failure|panic|exception)\b|오류|실패/.test(lower)) {
      events.push({ id, type: "error", lane, label: "error signal", detail: line.slice(0, 180) });
      continue;
    }
    if (/\b(warn|warning|deprecated|caution)\b|경고|주의/.test(lower)) {
      events.push({ id, type: "warning", lane, label: "warning signal", detail: line.slice(0, 180) });
      continue;
    }
    if (/\b(pass|passed|fail|failed|test|tests|build|lint|typecheck)\b/.test(lower)) {
      events.push({ id, type: "test", lane, label: "validation signal", detail: line.slice(0, 180) });
      continue;
    }
    if (/[./\w-]+\.(ts|tsx|js|jsx|mjs|json|md|rs|py|css|html)(:\d+)?/.test(line)) {
      events.push({ id, type: "file", lane, label: "file reference", detail: line.slice(0, 180) });
    }
  }

  if (events.length === 0 && lines.length > 0) {
    events.push({
      id: `${sourceId}-summary`,
      type: "info",
      lane,
      label: "output captured",
      detail: lines[0].slice(0, 180)
    });
  }

  return events;
}

function groupDecisions(decisions: HumanDecisionItem[]): DecisionGroup[] {
  const groups = new Map<string, DecisionGroup>();
  for (const decision of decisions) {
    const id = decision.sessionId || decision.source || "unlinked";
    const group = groups.get(id) || {
      id,
      label: decision.sessionId ? `${decision.adapterId || "session"} / ${decision.sessionId}` : decision.source || "unlinked",
      openCount: 0,
      answeredCount: 0,
      decisions: []
    };
    if (isOpenDecisionStatus(decision.status)) {
      group.openCount += 1;
    }
    if (decision.status === "answered" || decision.answeredAt) {
      group.answeredCount += 1;
    }
    group.decisions.push(decision);
    groups.set(id, group);
  }
  return Array.from(groups.values()).sort((left, right) => right.openCount - left.openCount || left.label.localeCompare(right.label));
}

function buildSourceDiffSummary(original: string, draft: string): SourceDiffSummary {
  const before = original.split(/\r?\n/);
  const after = draft.split(/\r?\n/);
  const max = Math.max(before.length, after.length);
  const preview: SourceDiffSummary["preview"] = [];
  let addedLines = 0;
  let removedLines = 0;
  let changedLines = 0;

  for (let index = 0; index < max; index += 1) {
    const beforeLine = before[index];
    const afterLine = after[index];
    if (beforeLine === afterLine) {
      continue;
    }
    if (beforeLine === undefined) {
      addedLines += 1;
    } else if (afterLine === undefined) {
      removedLines += 1;
    } else {
      changedLines += 1;
    }
    if (preview.length < 8) {
      preview.push({
        line: index + 1,
        before: beforeLine ?? "",
        after: afterLine ?? ""
      });
    }
  }

  return {
    dirty: addedLines + removedLines + changedLines > 0,
    addedLines,
    removedLines,
    changedLines,
    preview
  };
}

function Metric({ label, value, icon: Icon, tone }: { label: string; value: number; icon: LucideIcon; tone: string }) {
  return (
    <article className={`metric metric-${tone}`}>
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value.toLocaleString("ko-KR")}</strong>
    </article>
  );
}

function AgentRuntimeBars({
  runtimeCounts,
  statusCounts
}: {
  runtimeCounts: Array<{ key: string; count: number }>;
  statusCounts: Array<{ key: string; count: number }>;
}) {
  return (
    <div className="agent-bars">
      <BarGroup title="Runtime" items={runtimeCounts} />
      <BarGroup title="Status" items={statusCounts} />
    </div>
  );
}

function AgentInventory({ agents }: { agents: NonNullable<WorkspaceSnapshot["agentCatalog"]> }) {
  if (!agents.length) {
    return <p className="empty-state">등록된 에이전트 설정을 찾지 못했습니다.</p>;
  }

  return (
    <div className="agent-map">
      {agents.map((agent) => (
        <article key={agent.id}>
          <header>
            <div>
              <span>{agent.runtime}</span>
              <h3>{agent.name}</h3>
            </div>
            <strong>{agent.definitionStatus}</strong>
          </header>
          <p>{agent.description}</p>
          <div className="agent-signal-row">
            <span>{agent.runtimeStatus}</span>
            <span>{agent.tools.length} tools</span>
            <span>{agent.skills.length} skills</span>
            <span>{agent.docPaths.length} docs</span>
          </div>
          {agent.trigger && <small>{agent.trigger}</small>}
        </article>
      ))}
    </div>
  );
}

function AgentCollaborationBoard({ board }: { board: CollaborationBoard }) {
  if (!board.lanes.length) {
    return <p className="empty-state">표시할 에이전트 협업 데이터가 없습니다.</p>;
  }

  return (
    <div className="collaboration-board">
      <div className="collaboration-summary">
        <article>
          <span>agents</span>
          <strong>{board.summary.agents}</strong>
        </article>
        <article>
          <span>active</span>
          <strong>{board.summary.activeTasks}</strong>
        </article>
        <article>
          <span>queued</span>
          <strong>{board.summary.queuedTasks}</strong>
        </article>
        <article>
          <span>blocked</span>
          <strong>{board.summary.blockedTasks}</strong>
        </article>
      </div>
      <div className="collaboration-lanes">
        {board.lanes.map((lane) => (
          <section key={lane.id} className={`collaboration-lane lane-${lane.id}`}>
            <header>
              <h3>{lane.label}</h3>
              <span>{lane.tasks.length}</span>
            </header>
            {lane.tasks.length === 0 ? (
              <p className="lane-empty">현재 항목 없음</p>
            ) : (
              lane.tasks.slice(0, 8).map((task) => (
                <article key={task.id}>
                  <div className="task-card-heading">
                    <strong>{task.title}</strong>
                    <span>{task.priority || task.status}</span>
                  </div>
                  <p>
                    {task.agent} / {task.project}
                  </p>
                  {(task.timingTotal || task.bottleneck) && (
                    <small>
                      {task.timingTotal || "unknown"} {task.bottleneck ? `/ ${task.bottleneck}` : ""}
                    </small>
                  )}
                  {task.nextAction && <small>{task.nextAction}</small>}
                  {task.blockers.length > 0 && (
                    <div className="blocker-list">
                      {task.blockers.slice(0, 2).map((blocker) => (
                        <span key={blocker}>{blocker}</span>
                      ))}
                    </div>
                  )}
                </article>
              ))
            )}
          </section>
        ))}
      </div>
      <div className="agent-workload-strip">
        {board.agents.slice(0, 10).map((agent) => (
          <article key={agent.id}>
            <div>
              <strong>{agent.name}</strong>
              <span>{agent.status}</span>
            </div>
            <p>
              active {agent.activeTaskCount} / blocked {agent.blockedTaskCount} / total {agent.taskCount}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function AgentFlowMap({ flows }: { flows: CollaborationBoard["flows"] }) {
  if (!flows.length) {
    return <p className="empty-state">표시할 에이전트 작업 흐름이 없습니다.</p>;
  }

  return (
    <div className="agent-flow-map">
      {flows.slice(0, 18).map((flow) => (
        <article key={flow.id} className={`flow-row flow-${flow.lane}`}>
          <div className="flow-node agent-node">
            <span>agent</span>
            <strong>{flow.agent}</strong>
          </div>
          <div className="flow-arrow" aria-hidden="true">
            →
          </div>
          <div className="flow-node task-node">
            <span>{flow.status}</span>
            <strong>{flow.task}</strong>
            {flow.timingTotal && <small>{flow.timingTotal}</small>}
          </div>
          <div className="flow-arrow" aria-hidden="true">
            →
          </div>
          <div className="flow-node project-node">
            <span>project</span>
            <strong>{flow.project}</strong>
          </div>
        </article>
      ))}
    </div>
  );
}

function TaskStatusLanes({ taskStatusCounts }: { taskStatusCounts: Array<{ key: string; count: number }> }) {
  return (
    <div className="task-lanes" aria-label="Task status visualization">
      <h3>작업 상태</h3>
      <div>
        {taskStatusCounts.map((item) => (
          <article key={item.key}>
            <span>{item.key}</span>
            <strong>{item.count}</strong>
          </article>
        ))}
      </div>
    </div>
  );
}

function HistoryDensityChart({ days }: { days: WorkspaceSnapshot["historyDays"] }) {
  if (!days.length) {
    return <p className="empty-state">시각화할 히스토리 기록이 없습니다.</p>;
  }
  const maxCount = Math.max(...days.map((day) => day.documentsCount), 1);

  return (
    <div className="density-chart" aria-label="History density chart">
      {days.map((day) => {
        const height = Math.max(10, Math.round((day.documentsCount / maxCount) * 100));
        return (
          <article key={day.date}>
            <div className="density-bar" style={{ height: `${height}%` }} title={`${day.date}: ${day.documentsCount}`} />
            <span>{day.date.slice(5)}</span>
          </article>
        );
      })}
    </div>
  );
}

function HistoryCategoryBars({ categories }: { categories: Array<{ category: string; count: number }> }) {
  return <BarGroup title="히스토리 유형" items={categories.map((item) => ({ key: categoryLabel(item.category), count: item.count }))} />;
}

function BarGroup({ title, items }: { title: string; items: Array<{ key: string; count: number }> }) {
  if (!items.length) {
    return <p className="empty-state">{title} 데이터가 없습니다.</p>;
  }
  const maxCount = Math.max(...items.map((item) => item.count), 1);

  return (
    <div className="bar-group">
      <h3>{title}</h3>
      {items.map((item) => (
        <article key={item.key}>
          <div>
            <span>{item.key}</span>
            <strong>{item.count}</strong>
          </div>
          <div className="bar-track">
            <span style={{ width: `${Math.max(8, Math.round((item.count / maxCount) * 100))}%` }} />
          </div>
        </article>
      ))}
    </div>
  );
}

function DocumentList({
  documents,
  compact = false
}: {
  documents: WorkspaceSnapshot["documents"];
  compact?: boolean;
}) {
  return (
    <div className={compact ? "document-list compact" : "document-list"}>
      {documents.map((document) => (
        <article key={document.id}>
          <div>
            <span>{categoryLabel(document.category)}</span>
            <h3>{document.title}</h3>
            <p>{document.excerpt || document.path}</p>
          </div>
          <small>{document.path}</small>
        </article>
      ))}
    </div>
  );
}

function HistoryTimeline({ days }: { days: WorkspaceSnapshot["historyDays"] }) {
  if (days.length === 0) {
    return <p className="empty-state">검색 조건에 맞는 날짜별 히스토리가 없습니다.</p>;
  }

  return (
    <div className="timeline-list">
      {days.map((day) => (
        <article className="history-day" key={day.date}>
          <header>
            <div>
              <span className="date-label">{day.date}</span>
              <h3>{formatDay(day.date)}</h3>
            </div>
            <strong>{day.documentsCount} docs</strong>
          </header>
          <div className="chip-row">
            {day.categories.map((item) => (
              <span key={item.category}>
                {categoryLabel(item.category)} {item.count}
              </span>
            ))}
          </div>
          <div className="timeline-docs">
            {day.documents.slice(0, 14).map((document) => (
              <article key={document.id}>
                <span>{categoryLabel(document.category)}</span>
                <div>
                  <strong>{document.title}</strong>
                  <p>{document.path}</p>
                </div>
              </article>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

function summarizeCategories(documents: WorkspaceSnapshot["historyDays"][number]["documents"]) {
  const counts = new Map<string, number>();
  for (const document of documents) {
    counts.set(document.category, (counts.get(document.category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category));
}

function documentVisibleForMode(
  document: WorkspaceSnapshot["documents"][number] | WorkspaceSnapshot["historyDays"][number]["documents"][number],
  modeId: string
) {
  if (modeId === "superadmin_developer" || modeId === "developer") {
    return true;
  }

  const userCategories = new Set(["workspace-doc", "project-doc", "work-summary", "daily-history", "philosophy"]);
  if (!userCategories.has(document.category)) {
    return false;
  }

  const hiddenPrefixes = [
    "_ops/",
    "_requirements/",
    "_specs/",
    "agent-platform/configs/",
    "agent-platform/src/",
    "agent-platform/tests/"
  ];
  return !hiddenPrefixes.some((prefix) => document.path.startsWith(prefix));
}

function documentVisibleForLanguage(
  document: WorkspaceSnapshot["documents"][number] | WorkspaceSnapshot["historyDays"][number]["documents"][number],
  mode: MonitorLanguageMode
) {
  if (document.language === "unknown") {
    return mode.includeUnknown;
  }
  return mode.includedLanguages.includes(document.language);
}

function opsEventVisibleForMode(event: UnifiedOps["events"][number], modeId: string) {
  if (modeId === "superadmin_developer" || modeId === "developer") {
    return true;
  }
  if (event.sourceType === "monitor") {
    return true;
  }
  const userCategories = new Set(["work-summary", "daily-history"]);
  return userCategories.has(event.category) && !event.path.startsWith("_ops/");
}

function opsEventVisibleForLanguage(event: UnifiedOps["events"][number], mode: MonitorLanguageMode) {
  if (event.sourceType === "monitor") {
    return true;
  }
  if (event.language === "unknown") {
    return mode.includeUnknown;
  }
  return mode.includedLanguages.includes(event.language);
}

function summarizeUnifiedOpsEvents(events: UnifiedOps["events"], historyDays: number): UnifiedOps["summary"] {
  return {
    totalEvents: events.length,
    historyEvents: events.filter((event) => event.sourceType === "history").length,
    monitorEvents: events.filter((event) => event.sourceType === "monitor").length,
    evidenceEvents: events.filter((event) => ["evidence", "evaluation", "web-search"].includes(event.signalType)).length,
    decisionEvents: events.filter((event) => ["decision", "blocker", "next-action"].includes(event.signalType)).length,
    openSignals: events.filter((event) => ["critical", "attention", "warning"].includes(event.severity)).length,
    criticalSignals: events.filter((event) => event.severity === "critical").length,
    latestEventAt: events[0]?.timestamp || events[0]?.date || "",
    historyDays
  };
}

function truncateText(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }
  const visibleLength = Math.max(0, maxLength - 3);
  return `${value.slice(0, visibleLength).trimEnd()}...`;
}

function formatTimeLabel(value: string) {
  const numericValue = Number(value);
  const date = Number.isFinite(numericValue) && value.trim() !== "" ? new Date(numericValue) : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}

function countBy<T>(items: T[], getKey: (item: T) => string) {
  const counts = new Map<string, number>();
  for (const item of items) {
    const key = getKey(item);
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([key, count]) => ({ key, count }))
    .sort((left, right) => right.count - left.count || left.key.localeCompare(right.key));
}
