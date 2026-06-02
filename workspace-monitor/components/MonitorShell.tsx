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
import { useEffect, useMemo, useState } from "react";

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

const fallbackDesktopAdapters: CliAdapterStatus[] = [
  { adapterId: "claude-code-cli", label: "Claude Code CLI", command: "claude", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "gemini-cli", label: "Gemini CLI", command: "gemini", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "codex-cli", label: "Codex CLI", command: "codex", available: false, lastError: "Desktop runtime unavailable." },
  { adapterId: "opencode-cli", label: "OpenCode", command: "opencode", available: false, lastError: "Desktop runtime unavailable." }
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

  const normalizedQuery = query.trim().toLowerCase();
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
  const filteredSourceFiles = useMemo(() => {
    return visibleSourceFiles.filter((file) => {
      const projectMatches = sourceProject === "all" || file.project === sourceProject;
      const languageMatches = sourceLanguage === "all" || file.language === sourceLanguage;
      const queryMatches =
        !normalizedQuery || `${file.path} ${file.project} ${file.language} ${file.content}`.toLowerCase().includes(normalizedQuery);
      return projectMatches && languageMatches && queryMatches;
    });
  }, [normalizedQuery, sourceLanguage, sourceProject, visibleSourceFiles]);
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
  const [error, setError] = useState("");
  const [runningAdapterId, setRunningAdapterId] = useState("");
  const [selectedSessionAdapterId, setSelectedSessionAdapterId] = useState(fallbackDesktopAdapters[0].adapterId);
  const [workingDir, setWorkingDir] = useState("");
  const [sessionPrompt, setSessionPrompt] = useState("현재 작업을 분석하고 다음에 필요한 결정을 짧게 알려줘.");
  const [sessionInput, setSessionInput] = useState("");
  const [selectedSourcePath, setSelectedSourcePath] = useState(sourceFiles[0]?.path || "");
  const [sourceFile, setSourceFile] = useState<WorkspaceTextFile | null>(null);
  const [sourceDraft, setSourceDraft] = useState("");
  const [writeReport, setWriteReport] = useState<WorkspaceWriteReport | null>(null);
  const [editorBusy, setEditorBusy] = useState(false);

  const invoke = getTauriInvoke();
  const availableCount = adapters.filter((adapter) => adapter.available).length;
  const sourceFileCount = sourceFiles.length;
  const editableSourceFiles = sourceFiles.filter((file) => !file.truncated).slice(0, 240);
  const decisionPrompts = [
    ...reports.flatMap((report) => report.decisionPrompts || []),
    ...sessions.flatMap((session) => session.decisionPrompts || [])
  ];
  const selectedSession = sessions[0] || null;

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
      const [nextHealth, nextAdapters, nextSessions] = await Promise.all([
        tauriInvoke<DesktopHealthStatus>("app_health"),
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions")
      ]);
      setRuntimeState("available");
      setHealth(nextHealth);
      setAdapters(nextAdapters);
      setSessions(nextSessions);
      if (!nextAdapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId) && nextAdapters[0]) {
        setSelectedSessionAdapterId(nextAdapters[0].adapterId);
      }
    } catch (caught) {
      setRuntimeState("unavailable");
      setHealth(null);
      setAdapters(fallbackDesktopAdapters);
      setSessions([]);
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
      const [nextAdapters, nextSessions] = await Promise.all([
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions")
      ]);
      setAdapters(nextAdapters);
      setSessions(nextSessions);
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

  const loadSourceFile = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke || !selectedSourcePath) {
      setError("Tauri desktop runtime is not available in this browser view.");
      return;
    }

    setEditorBusy(true);
    setError("");
    setWriteReport(null);
    try {
      const nextFile = await tauriInvoke<WorkspaceTextFile>("read_workspace_text_file", {
        relativePath: selectedSourcePath
      });
      setSourceFile(nextFile);
      setSourceDraft(nextFile.content);
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setEditorBusy(false);
    }
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
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setEditorBusy(false);
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
          <h2>다중 CLI 오케스트레이션</h2>
          <p>
            설치형 앱 안에서 선택형 AI CLI를 탐지하고 bounded health check와 pipe 기반 실행 세션을 관리합니다. PTY는 아직
            후속이지만 stdout/stderr polling, stdin 입력, defer message, cancel은 Tauri command로 연결되어 있습니다.
          </p>
        </div>
        <div className={`desktop-runtime-state state-${runtimeState}`}>
          <span>{runtimeState}</span>
          <strong>{availableCount} / {adapters.length}</strong>
          <small>available adapters</small>
        </div>
      </section>

      <section className="metrics-band">
        <Metric label="CLI Adapters" value={adapters.length} icon={Network} tone="green" />
        <Metric label="Available" value={availableCount} icon={CheckCircle2} tone="blue" />
        <Metric label="Decision Items" value={decisionPrompts.length + blockedTaskCount} icon={Inbox} tone="amber" />
        <Metric label="Agent Configs" value={agentCatalogCount} icon={Bot} tone="violet" />
        <Metric label="Source Files" value={sourceFileCount} icon={Code2} tone="slate" />
      </section>

      <section className="panel wide desktop-control-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Supervisor</p>
            <h2>CLI lane preflight</h2>
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
        </div>

        <div className="adapter-grid">
          {adapters.map((adapter) => {
            const report = reports.find((item) => item.adapterId === adapter.adapterId);
            const running = runningAdapterId === adapter.adapterId;
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
            <p className="eyebrow">CLI Session</p>
            <h2>Pipe 기반 실행 콘솔</h2>
          </div>
          <span className="result-count">{sessions.length} sessions</span>
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
                  <div className="desktop-actions">
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

      <section className="panel desktop-decision-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Decision Inbox</p>
            <h2>CLI 질문 감지</h2>
          </div>
          <Inbox size={18} aria-hidden="true" />
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
      </section>

      <section className="panel desktop-source-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Source Editing</p>
            <h2>Scoped file editor</h2>
          </div>
          <Code2 size={18} aria-hidden="true" />
        </div>
        <div className="source-editor-controls">
          <select value={selectedSourcePath} onChange={(event) => setSelectedSourcePath(event.target.value)}>
            {editableSourceFiles.map((file) => (
              <option key={file.id} value={file.path}>
                {file.path}
              </option>
            ))}
          </select>
          <button type="button" onClick={loadSourceFile} disabled={!invoke || editorBusy || !selectedSourcePath}>
            <FileSearch size={15} aria-hidden="true" />
            <span>{editorBusy ? "Loading" : "Open"}</span>
          </button>
          <button type="button" onClick={saveSourceFile} disabled={!invoke || editorBusy || !sourceFile || sourceDraft === sourceFile.content}>
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>Save Backup</span>
          </button>
        </div>
        {sourceFile ? (
          <div className="source-editor-frame">
            <div className="source-editor-meta">
              <span>{sourceFile.relativePath}</span>
              <strong>{sourceDraft.length.toLocaleString("ko-KR")} bytes</strong>
            </div>
            <textarea value={sourceDraft} onChange={(event) => setSourceDraft(event.target.value)} spellCheck={false} />
            {writeReport && (
              <p className="desktop-success">
                {writeReport.status} / backup: {writeReport.backupPath}
              </p>
            )}
          </div>
        ) : (
          <p className="empty-state">소스 파일을 선택한 뒤 Tauri runtime에서 열면 scoped editor가 활성화됩니다.</p>
        )}
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
