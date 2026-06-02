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
import { useDeferredValue, useEffect, useMemo, useState } from "react";

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
  decisionInboxItems: number;
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
          </button>
        ))}
      </nav>

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
            <Metric label="Root Folders" value={snapshot.stats.rootFolders} icon={FolderKanban} tone="amber" />
            <article className="history-latest">
              <span>Latest History Date</span>
              <strong>{latestHistoryDate ? formatDay(latestHistoryDate) : "기록 없음"}</strong>
              <p>{latestHistoryDate || "No dated history records"}</p>
            </article>
          </div>

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
  const [inboxReport, setInboxReport] = useState<HumanDecisionInboxReport | null>(null);
  const [error, setError] = useState("");
  const [runningAdapterId, setRunningAdapterId] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [selectedSessionModeId, setSelectedSessionModeId] = useState(sessionModePresets[0].id);
  const [selectedSessionAdapterId, setSelectedSessionAdapterId] = useState(fallbackDesktopAdapters[0].adapterId);
  const [workingDir, setWorkingDir] = useState("");
  const [sessionPrompt, setSessionPrompt] = useState(sessionModePresets[0].prompt);
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

  const invoke = getTauriInvoke();
  const availableCount = adapters.filter((adapter) => adapter.available).length;
  const sourceFileCount = sourceFiles.length;
  const editableSourceFiles = sourceFiles.filter((file) => !file.truncated).slice(0, 240);
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
  const openInboxDecisions = (inboxReport?.decisions || []).filter((decision) => isOpenDecisionStatus(decision.status));
  const decisionPrompts = [
    ...reports.flatMap((report) => report.decisionPrompts || []),
    ...sessions.flatMap((session) => session.decisionPrompts || [])
  ];
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
  const sessionStats = useMemo(() => {
    const active = sessions.filter((session) => isActiveSessionStatus(session.status)).length;
    const deferred = sessions.filter((session) => session.status === "defer_message_sent").length;
    const outputBytes = sessions.reduce((total, session) => total + session.stdout.length + session.stderr.length, 0);
    const inboxItems = sessions.reduce((total, session) => total + session.decisionInboxItems, 0);
    return { active, deferred, outputBytes, inboxItems };
  }, [sessions]);
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
  }, [dirtyDraftEntries.length, openDraftEntries.length, outputEvents, selectedDecision, sourceDiff, sourceFile?.relativePath, sourceSaveResults, writeReport]);

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
      const [nextHealth, nextAdapters, nextSessions, nextInbox] = await Promise.all([
        tauriInvoke<DesktopHealthStatus>("app_health"),
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions"),
        tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox")
      ]);
      setRuntimeState("available");
      setHealth(nextHealth);
      setAdapters(nextAdapters);
      setSessions(nextSessions);
      setInboxReport(nextInbox);
      setDecisionResumeNotice("");
      if (!selectedDecisionId && nextInbox.decisions[0]) {
        setSelectedDecisionId(nextInbox.decisions[0].id);
      }
      if (!nextAdapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId) && nextAdapters[0]) {
        setSelectedSessionAdapterId(nextAdapters[0].adapterId);
      }
    } catch (caught) {
      setRuntimeState("unavailable");
      setHealth(null);
      setAdapters(fallbackDesktopAdapters);
      setSessions([]);
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
      const [nextAdapters, nextSessions, nextInbox] = await Promise.all([
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions"),
        tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox")
      ]);
      setAdapters(nextAdapters);
      setSessions(nextSessions);
      setInboxReport(nextInbox);
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
    setSessions((current) => [report, ...current.filter((item) => item.sessionId !== report.sessionId)]);
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
      prompt: sessionPrompt
    };
    if (workingDir.trim()) {
      args.workingDir = workingDir.trim();
    }

    try {
      const report = await tauriInvoke<CliSessionReport>("start_cli_adapter_session", args);
      upsertSession(report);
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
    } catch (caught) {
      setError(errorMessage(caught));
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
        <Metric label="Decision Items" value={decisionPrompts.length + blockedTaskCount + openInboxDecisions.length} icon={Inbox} tone="amber" />
        <Metric label="Agent Configs" value={agentCatalogCount} icon={Bot} tone="violet" />
        <Metric label="Source Files" value={sourceFileCount} icon={Code2} tone="slate" />
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
          <button type="button" onClick={refreshDecisionInbox} disabled={!invoke || decisionBusy}>
            <Inbox size={16} aria-hidden="true" />
            <span>Refresh decisions</span>
            <small>{openInboxDecisions.length} open</small>
          </button>
          <button type="button" onClick={loadSourceFile} disabled={!invoke || editorBusy || !selectedSourcePath}>
            <GitBranch size={16} aria-hidden="true" />
            <span>Open source review</span>
            <small>{sourceDiff?.dirty ? "draft changed" : "ready"}</small>
          </button>
        </div>
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
                    <span>{session.decisionInboxItems ? `${session.decisionInboxItems} inbox` : session.outputTruncated ? "truncated" : "bounded"}</span>
                  </div>
                  <div className="lane-mini-timeline">
                    <span>started</span>
                    <span>{session.deferMessageSent ? "deferred" : "streaming"}</span>
                    <span>{isActiveSessionStatus(session.status) ? "open" : "finished"}</span>
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
