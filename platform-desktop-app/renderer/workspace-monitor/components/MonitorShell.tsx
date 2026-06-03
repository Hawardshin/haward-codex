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
  Copy,
  Database,
  FileSearch,
  FolderOpen,
  FolderKanban,
  GitBranch,
  History,
  Inbox,
  Layers,
  Languages,
  LayoutDashboard,
  ListFilter,
  Network,
  PlayCircle,
  Search,
  Settings,
  ShieldCheck,
  SquareTerminal,
  X
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";

import { ProductFeatureArchitecturePanel } from "@/components/features/ProductFeatureArchitecturePanel";
import { OperatorCenterDialog } from "@/components/features/OperatorCenterDialog";
import { CoreFeatureTabs, type CoreFeatureTab, type CoreFeatureTabId } from "@/components/workbench/CoreFeatureTabs";
import { PathDisclosure } from "@/components/workbench/PathDisclosure";
import { categoryLabel, formatDate, formatDay, type WorkspaceSnapshot, type WorkspaceSourceFile } from "@/lib/snapshot";

type SectionId =
  | "overview"
  | "desktop"
  | "projects"
  | "history"
  | "intent"
  | "structure"
  | "documents"
  | "source"
  | "requirements"
  | "agents";

type FeatureGroupId = "core" | "workspace" | "knowledge" | "governance";
type SidebarMode = "expanded" | "collapsed";
type SettingsTabId = "appearance" | "navigation" | "execution" | "data";
type AppThemeMode = "system" | "light" | "dark";

type Section = {
  id: SectionId;
  label: string;
  labelEn: string;
  shortLabel: string;
  shortLabelEn: string;
  icon: LucideIcon;
  group: FeatureGroupId;
  purpose: string;
  purposeEn: string;
};

type CommandItem = {
  id: string;
  label: string;
  detail: string;
  group: string;
  icon: LucideIcon;
  badge?: string;
  keywords: string[];
  run: () => void;
};

type RuntimeInitDefaults = {
  adapterId: string;
  sessionModeId: string;
  taskPipeKind: string;
  autoDeferQuestions: boolean;
};

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((module) => module.default), {
  ssr: false,
  loading: () => <div className="monaco-editor-loading">Loading Monaco editor</div>
});

const MonacoDiffEditor = dynamic(() => import("@monaco-editor/react").then((module) => module.DiffEditor), {
  ssr: false,
  loading: () => <div className="monaco-editor-loading">Loading Monaco diff</div>
});

const monacoEditorOptions: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  bracketPairColorization: { enabled: true },
  copyWithSyntaxHighlighting: true,
  cursorBlinking: "smooth",
  fontFamily: "\"SFMono-Regular\", Consolas, \"Liberation Mono\", monospace",
  fontSize: 12,
  glyphMargin: true,
  guides: { bracketPairs: true, indentation: true },
  lineHeight: 20,
  minimap: { enabled: true },
  padding: { bottom: 10, top: 10 },
  renderLineHighlight: "all",
  renderWhitespace: "selection",
  rulers: [100, 120],
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  stickyScroll: { enabled: true },
  tabSize: 2,
  wordWrap: "off"
};

const monacoReadOnlyOptions: editor.IStandaloneEditorConstructionOptions = {
  ...monacoEditorOptions,
  domReadOnly: true,
  minimap: { enabled: false },
  readOnly: true
};

const monacoDiffEditorOptions: editor.IStandaloneDiffEditorConstructionOptions = {
  automaticLayout: true,
  diffAlgorithm: "advanced",
  enableSplitViewResizing: true,
  originalEditable: false,
  readOnly: true,
  renderSideBySide: true,
  scrollBeyondLastLine: false
};

const platformMonacoTheme = "agent-platform-workbench";

const definePlatformMonacoTheme = (monaco: typeof import("monaco-editor")) => {
  monaco.editor.defineTheme(platformMonacoTheme, {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "8ea6b8" },
      { token: "keyword", foreground: "7dd3fc" },
      { token: "string", foreground: "b7e4c7" },
      { token: "number", foreground: "f4a261" }
    ],
    colors: {
      "editor.background": "#101923",
      "editor.foreground": "#d7e0ea",
      "editor.lineHighlightBackground": "#172435",
      "editorLineNumber.foreground": "#637386",
      "editorLineNumber.activeForeground": "#d7e0ea",
      "editorCursor.foreground": "#9bd5ff",
      "editor.selectionBackground": "#245173",
      "editorIndentGuide.background1": "#263546",
      "editorIndentGuide.activeBackground1": "#55677a",
      "minimap.background": "#101923"
    }
  });
};

type SourceTemplateId =
  | "requirement-row"
  | "spec-section"
  | "validation-record"
  | "tauri-command"
  | "agent-config"
  | "decision-inbox-item";

type SourceTemplate = {
  id: SourceTemplateId;
  label: string;
  detail: string;
  body: string;
};

type SourceEditorProfile = {
  label: string;
  detail: string;
  accent: "governance" | "spec" | "runtime" | "config" | "source";
  templateId: SourceTemplateId;
};

const sourceTemplates: SourceTemplate[] = [
  {
    id: "requirement-row",
    label: "Requirement Row",
    detail: "Baselined requirement table row",
    body:
      "| REQ-PLATFORM-000 | {{date}} | {{path}} | The platform shall ... | must | planned | spec: TBD | validation: TBD |\n"
  },
  {
    id: "spec-section",
    label: "Spec Section",
    detail: "Scope, acceptance, trace",
    body:
      "## Goal\n\n- User outcome:\n- Owner surface:\n\n## Scope\n\n- Included:\n- Excluded:\n\n## Acceptance\n\n- [ ] Requirement linked\n- [ ] Implementation path named\n- [ ] Validation command recorded\n- [ ] Rollback or backup path clear\n"
  },
  {
    id: "validation-record",
    label: "Validation Record",
    detail: "Command and browser evidence",
    body:
      "## Validation\n\n- Static check:\n- Build check:\n- Runtime smoke:\n- Browser viewport check:\n- Regression risk:\n- Evidence path:\n"
  },
  {
    id: "tauri-command",
    label: "Tauri Command",
    detail: "Workspace-scoped command stub",
    body:
      "#[tauri::command]\nfn command_name() -> Result<(), String> {\n    Ok(())\n}\n"
  },
  {
    id: "agent-config",
    label: "Agent Config",
    detail: "Bounded capability config",
    body:
      "{\n  \"id\": \"agent-id\",\n  \"label\": \"Agent Label\",\n  \"role\": \"bounded_capability\",\n  \"inputs\": [],\n  \"outputs\": [],\n  \"validation\": {\n    \"required_evidence\": [],\n    \"rollback\": \"\"\n  }\n}\n"
  },
  {
    id: "decision-inbox-item",
    label: "Decision Item",
    detail: "Human arbitration packet",
    body:
      "{\n  \"id\": \"decision-id\",\n  \"status\": \"open\",\n  \"priority\": \"normal\",\n  \"question\": \"\",\n  \"impact\": \"\",\n  \"options\": [],\n  \"resume_action\": \"\"\n}\n"
  }
];

const sourceTemplateById = sourceTemplates.reduce(
  (lookup, template) => ({ ...lookup, [template.id]: template }),
  {} as Record<SourceTemplateId, SourceTemplate>
);

function sourceEditorProfileForPath(relativePath: string): SourceEditorProfile {
  const normalized = relativePath.toLowerCase();
  if (normalized.includes("/docs/requirements/") || normalized.includes("_requirements/")) {
    return {
      label: "Requirements",
      detail: "baseline, status, trace",
      accent: "governance",
      templateId: "requirement-row"
    };
  }
  if (normalized.includes("/specs/") || normalized.includes("_specs/")) {
    return {
      label: "Spec Work",
      detail: "scope, acceptance, validation",
      accent: "spec",
      templateId: "spec-section"
    };
  }
  if (normalized.includes("src-tauri") || normalized.endsWith(".rs")) {
    return {
      label: "Runtime Command",
      detail: "Tauri boundary, Result contract",
      accent: "runtime",
      templateId: "tauri-command"
    };
  }
  if (normalized.includes("/configs/") || normalized.endsWith(".json")) {
    return {
      label: "Platform Config",
      detail: "schema, validation, rollback",
      accent: "config",
      templateId: "agent-config"
    };
  }
  if (normalized.includes("/validation") || normalized.includes("_history/evaluations/")) {
    return {
      label: "Validation",
      detail: "commands, evidence, risk",
      accent: "governance",
      templateId: "validation-record"
    };
  }
  return {
    label: "Source Patch",
    detail: "draft, diff, handoff",
    accent: "source",
    templateId: "spec-section"
  };
}

function renderSourceTemplate(template: SourceTemplate, relativePath: string) {
  return template.body
    .split("{{date}}")
    .join(new Date().toISOString().slice(0, 10))
    .split("{{path}}")
    .join(relativePath || "workspace-relative-path");
}

function appendSourceTemplate(content: string, templateBody: string) {
  const separator = content.length === 0 ? "" : content.endsWith("\n") ? "\n" : "\n\n";
  return `${content}${separator}${templateBody}`;
}

const PINNED_SECTIONS_STORAGE_KEY = "workspace-monitor:pinned-sections";
const UI_LANGUAGE_STORAGE_KEY = "workspace-monitor:ui-language";
const SIDEBAR_MODE_STORAGE_KEY = "workspace-monitor:sidebar-mode";
const RUNTIME_INIT_STORAGE_KEY = "workspace-monitor:runtime-init";
const THEME_MODE_STORAGE_KEY = "workspace-monitor:theme-mode";
const TERMINAL_DRAWER_STORAGE_KEY = "workspace-monitor:terminal-drawer";
const defaultPinnedSections: SectionId[] = ["overview", "desktop", "agents", "source", "intent"];
const operatorSectionIds = new Set<SectionId>(["projects", "history", "structure", "documents", "requirements"]);
type UiLanguage = "ko" | "en";

const featureGroups: Array<{
  id: FeatureGroupId;
  label: string;
  labelEn: string;
  purpose: string;
  purposeEn: string;
}> = [
  {
    id: "core",
    label: "작업 콘솔",
    labelEn: "Work Console",
    purpose: "작업 시작, 실행, 결정",
    purposeEn: "Start work, run agents, and handle decisions."
  },
  {
    id: "workspace",
    label: "파일과 코드",
    labelEn: "Files and Code",
    purpose: "작업공간 파일 보기와 코드 편집",
    purposeEn: "Browse workspace files and edit code."
  },
  {
    id: "knowledge",
    label: "에이전트 성장",
    labelEn: "Agent Growth",
    purpose: "에이전트 생성과 학습",
    purposeEn: "Create agents and improve them from evidence."
  },
  {
    id: "governance",
    label: "운영 도구",
    labelEn: "Operator Tools",
    purpose: "모니터링, 문서, 배포 점검",
    purposeEn: "Monitoring, documents, and release readiness."
  }
];

const sections: Section[] = [
  {
    id: "overview",
    label: "홈",
    labelEn: "Platform",
    shortLabel: "홈",
    shortLabelEn: "Platform",
    icon: Activity,
    group: "core",
    purpose: "지금 할 일과 제품 기능 구조를 봅니다.",
    purposeEn: "See what to do now and how the product is structured."
  },
  {
    id: "desktop",
    label: "작업 실행",
    labelEn: "Orchestration",
    shortLabel: "실행",
    shortLabelEn: "Run",
    icon: Network,
    group: "core",
    purpose: "에이전트와 선택형 CLI lane을 조율합니다.",
    purposeEn: "Coordinate agents and optional CLI lanes."
  },
  {
    id: "agents",
    label: "에이전트 만들기",
    labelEn: "Agent Factory",
    shortLabel: "생성",
    shortLabelEn: "Factory",
    icon: Bot,
    group: "knowledge",
    purpose: "에이전트, 기능 후보, 작업 lane, handoff를 관리합니다.",
    purposeEn: "Manage agents, capability candidates, lanes, and handoffs."
  },
  {
    id: "source",
    label: "파일/코드",
    labelEn: "Files / Code",
    shortLabel: "파일",
    shortLabelEn: "Files",
    icon: Code2,
    group: "workspace",
    purpose: "작업공간 폴더를 고르고 파일을 열어 편집합니다.",
    purposeEn: "Choose a workspace folder, open files, and edit code."
  },
  {
    id: "intent",
    label: "학습/개선",
    labelEn: "Learning Map",
    shortLabel: "학습",
    shortLabelEn: "Learn",
    icon: GitBranch,
    group: "knowledge",
    purpose: "사용자 의도에서 기능 후보와 개선 루프를 뽑습니다.",
    purposeEn: "Extract feature candidates and improvement loops from user intent."
  },
  {
    id: "projects",
    label: "프로젝트",
    labelEn: "Projects",
    shortLabel: "프로젝트",
    shortLabelEn: "Projects",
    icon: FolderKanban,
    group: "governance",
    purpose: "등록된 root project와 소유 경계를 확인합니다.",
    purposeEn: "Inspect registered root projects and ownership boundaries."
  },
  {
    id: "structure",
    label: "구조",
    labelEn: "Structure",
    shortLabel: "구조",
    shortLabelEn: "Structure",
    icon: Layers,
    group: "governance",
    purpose: "플랫폼 계층, 경계 규칙, 복잡도 압력을 관측합니다.",
    purposeEn: "Inspect platform layers, boundary rules, and complexity pressure."
  },
  {
    id: "history",
    label: "작업 기록",
    labelEn: "Learning History",
    shortLabel: "기록",
    shortLabelEn: "History",
    icon: History,
    group: "governance",
    purpose: "날짜별 작업 기록과 개선 evidence를 추적합니다.",
    purposeEn: "Track dated work history and improvement evidence."
  },
  {
    id: "documents",
    label: "문서",
    labelEn: "Documents",
    shortLabel: "문서",
    shortLabelEn: "Docs",
    icon: BookOpenText,
    group: "governance",
    purpose: "문서, 검색 기록, 평가 근거를 탐색합니다.",
    purposeEn: "Browse docs, web searches, and evaluation evidence."
  },
  {
    id: "requirements",
    label: "요구사항",
    labelEn: "Requirements",
    shortLabel: "요구",
    shortLabelEn: "Reqs",
    icon: ClipboardCheck,
    group: "governance",
    purpose: "요구사항과 스펙 기준의 이행 상태를 봅니다.",
    purposeEn: "Inspect requirements and spec-driven delivery status."
  }
];

function sectionForLanguage(section: Section, uiLanguage: UiLanguage): Section {
  if (uiLanguage === "ko") {
    return section;
  }
  return {
    ...section,
    label: section.labelEn,
    shortLabel: section.shortLabelEn,
    purpose: section.purposeEn
  };
}

function featureGroupForLanguage(group: (typeof featureGroups)[number], uiLanguage: UiLanguage) {
  if (uiLanguage === "ko") {
    return group;
  }
  return {
    ...group,
    label: group.labelEn,
    purpose: group.purposeEn
  };
}

type MonitorViewMode = NonNullable<WorkspaceSnapshot["viewModeCatalog"]>["modes"][number];
type MonitorLanguageMode = NonNullable<WorkspaceSnapshot["languageModeCatalog"]>["modes"][number];
type CollaborationBoard = NonNullable<WorkspaceSnapshot["collaborationBoard"]>;
type UnifiedOps = NonNullable<WorkspaceSnapshot["unifiedOps"]>;
type ModeFunctionCatalog = NonNullable<WorkspaceSnapshot["modeFunctionCatalog"]>;
type ClaudeCodeDesignTransfer = NonNullable<WorkspaceSnapshot["claudeCodeDesignTransfer"]>;
type PhilosophyFeatureExtraction = NonNullable<WorkspaceSnapshot["philosophyFeatureExtraction"]>;
type IntentFeatureMap = NonNullable<WorkspaceSnapshot["intentFeatureMap"]>;
type StructureOverview = NonNullable<WorkspaceSnapshot["structureOverview"]>;
type ProductFeatureArchitecture = NonNullable<WorkspaceSnapshot["productFeatureArchitecture"]>;

const fallbackViewModes: MonitorViewMode[] = [
  {
    id: "user",
    label: "User View",
    intent: "Work-first desktop view for running, editing, creating, and improving agents.",
    allowedSections: ["overview", "desktop", "agents", "source", "intent"],
    visibilityRules: {},
    securityNotes: []
  },
  {
    id: "developer",
    label: "Developer View",
    intent: "Implementation, requirements, specs, agents, and verification surfaces.",
    allowedSections: [
      "overview",
      "desktop",
      "projects",
      "history",
      "intent",
      "structure",
      "documents",
      "source",
      "requirements",
      "agents"
    ],
    visibilityRules: {},
    securityNotes: []
  },
  {
    id: "superadmin_developer",
    label: "Super Admin Dev",
    intent: "Full owner/operator view for building the platform itself.",
    allowedSections: [
      "overview",
      "desktop",
      "projects",
      "history",
      "intent",
      "structure",
      "documents",
      "source",
      "requirements",
      "agents"
    ],
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
  },
  {
    id: "unknown",
    label: "미분류",
    intent: "Show language-neutral or not-yet-tagged records.",
    includedLanguages: [],
    includeUnknown: true,
    documentRule: "Show documents tagged unknown."
  }
];

const nativeWorkspaceCopy = {
  ko: {
    eyebrow: "작업공간 Explorer",
    title: "파일시스템을 끌어와서 처리하기",
    description:
      "VS Code처럼 왼쪽 Explorer가 실제 작업공간 파일시스템을 잡고, 오른쪽 편집기에서 파일을 열어 수정하고 저장합니다.",
    chooseFolder: "폴더 선택",
    choosingFolder: "폴더 여는 중",
    refreshWorkspace: "작업공간 새로고침",
    refreshFiles: "파일 목록 새로고침",
    openSelected: "선택 파일 열기",
    saveCurrent: "현재 파일 저장",
    saveAll: "열린 변경 모두 저장",
    copyFile: "내용 복사",
    activeWorkspace: "현재 작업공간",
    workspaceState: "작업공간 상태",
    folderSource: "선택 방식",
    fileSearch: "파일명, 폴더, 언어 검색",
    fileList: "파일 목록",
    fileTree: "파일 트리",
    uploadDropzone: "파일을 이 플랫폼으로 올리기",
    uploadDropzoneDetail: "작업 폴더를 선택한 뒤 파일을 클릭해 열거나, 추후 파일 업로드/처리 queue를 이 영역에서 시작합니다.",
    explorerHint: "Explorer에서 파일을 누르면 오른쪽 편집기에 열립니다.",
    openedDrafts: "열린 파일",
    editorSettings: "편집 설정",
    wordWrap: "줄바꿈",
    minimap: "미니맵",
    diffMode: "변경 비교",
    editMode: "편집",
    noRuntime: "Tauri 런타임이 없어서 저장은 비활성화됩니다. 지금은 snapshot 파일만 볼 수 있습니다.",
    noFiles: "표시할 파일이 없습니다. 작업공간 폴더를 선택하거나 검색어를 바꿔보세요.",
    noFileOpen: "왼쪽 파일 목록에서 파일을 클릭하세요.",
    savedWithBackup: "저장 완료. 백업 파일을 만들었습니다.",
    chooseCanceled: "폴더 선택을 취소했습니다.",
    fallbackSource: "snapshot fallback",
    runtimeSource: "실제 작업공간",
    dirty: "수정됨",
    clean: "변경 없음",
    loading: "불러오는 중",
    saving: "저장 중"
  },
  en: {
    eyebrow: "Workspace Explorer",
    title: "Bring the filesystem into the platform",
    description:
      "Like VS Code, the left Explorer owns the real workspace filesystem and the editor on the right opens files for processing and saving.",
    chooseFolder: "Choose Folder",
    choosingFolder: "Choosing",
    refreshWorkspace: "Refresh Workspace",
    refreshFiles: "Refresh Files",
    openSelected: "Open Selected",
    saveCurrent: "Save Current",
    saveAll: "Save All Open Changes",
    copyFile: "Copy Content",
    activeWorkspace: "Active Workspace",
    workspaceState: "Workspace State",
    folderSource: "Source",
    fileSearch: "Search file, folder, or language",
    fileList: "File List",
    fileTree: "File Tree",
    uploadDropzone: "Add files to this platform",
    uploadDropzoneDetail: "Choose a workspace folder, then open files from the Explorer. File upload and processing queues start from this area.",
    explorerHint: "Click a file in Explorer to open it in the editor.",
    openedDrafts: "Open Files",
    editorSettings: "Editor Settings",
    wordWrap: "Word Wrap",
    minimap: "Minimap",
    diffMode: "Diff",
    editMode: "Edit",
    noRuntime: "Tauri runtime is unavailable. Saving is disabled and snapshot files are shown as fallback.",
    noFiles: "No files to show. Choose a workspace folder or change the search text.",
    noFileOpen: "Click a file from the list on the left.",
    savedWithBackup: "Saved with a backup file.",
    chooseCanceled: "Folder selection was canceled.",
    fallbackSource: "snapshot fallback",
    runtimeSource: "real workspace",
    dirty: "dirty",
    clean: "clean",
    loading: "loading",
    saving: "saving"
  }
} satisfies Record<UiLanguage, Record<string, string>>;

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

const emptyIntentFeatureMap: IntentFeatureMap = {
  sourcePath: "",
  summary: {
    totalIntents: 0,
    totalThemes: 0,
    now: 0,
    next: 0,
    later: 0,
    sourceDate: "",
    updatedAt: "",
    availableMaps: 0
  },
  themes: [],
  roadmap: {
    now: [],
    next: [],
    later: []
  },
  sourceLimits: []
};

const emptyStructureOverview: StructureOverview = {
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
};

const emptyProductFeatureArchitecture: ProductFeatureArchitecture = {
  sourcePath: "",
  productPosition: {
    primaryProduct: "agent_capability_platform",
    productClaim:
      "Agent orchestration, work environment, development environment, factory, and learning loop are primary. Monitoring is supporting observability.",
    monitoringRole: "supporting_observability"
  },
  desktopHomeSurface: {
    firstViewPriority: [
      "agent_orchestration",
      "agent_work_environment",
      "agent_development_environment",
      "agent_factory",
      "learning_improvement_loop"
    ],
    supportingSurfaces: ["observability_monitoring"],
    homeCopyRule: "Show what agents can do, create, and improve before monitoring details.",
    configurationRule: "Move setup and configuration into dedicated settings or capability surfaces."
  },
  summary: {
    totalFeatures: 6,
    primaryFeatures: 5,
    supportingFeatures: 1,
    automationLoops: 1
  },
  featureLayers: [
    {
      id: "agent_orchestration",
      label: "Agent Orchestration",
      role: "primary",
      status: "fallback",
      purpose: "Coordinate agents and optional CLI lanes as supervised work.",
      userOutcome: "Start one task and let the platform coordinate specialist lanes.",
      primarySection: "desktop",
      primarySurfaces: ["Desktop Runtime", "Task Pipe", "Decision Inbox"],
      currentAssets: [],
      automationTargets: ["multi-lane task intake", "decision routing", "merge gates"],
      learningSignals: ["task-run records"],
      validationGates: []
    },
    {
      id: "agent_work_environment",
      label: "Agent Work Environment",
      role: "primary",
      status: "fallback",
      purpose: "Host selected workspaces, runtime data, decisions, task runs, and support diagnostics.",
      userOutcome: "Use an app-owned workspace and accumulated data plane instead of a terminal-first clone.",
      primarySection: "desktop",
      primarySurfaces: ["Workspace Host", "Accumulated Data", "Runtime Data"],
      currentAssets: [],
      automationTargets: ["workspace import", "runtime data indexing"],
      learningSignals: ["task-run count"],
      validationGates: []
    },
    {
      id: "agent_development_environment",
      label: "Agent Development Environment",
      role: "primary",
      status: "fallback",
      purpose: "Provide a workbench for source, diffs, templates, requirements, specs, and validation.",
      userOutcome: "Shape agent platform behavior inside one development workbench.",
      primarySection: "source",
      primarySurfaces: ["Source Review", "Diff Review", "Requirements"],
      currentAssets: [],
      automationTargets: ["file index", "draft queue", "save with backup"],
      learningSignals: ["diff summary"],
      validationGates: []
    },
    {
      id: "agent_factory",
      label: "Agent Factory",
      role: "primary",
      status: "fallback",
      purpose: "Promote repeated work into prompts, workflows, templates, tools, skills, agents, and features.",
      userOutcome: "Create reusable agents and capabilities without repeating the same instructions.",
      primarySection: "agents",
      primarySurfaces: ["Agents", "Capability Center", "Evidence / Promotion"],
      currentAssets: [],
      automationTargets: ["candidate intake", "smallest asset selection", "agent definition creation"],
      learningSignals: ["candidate backlog"],
      validationGates: []
    },
    {
      id: "learning_improvement_loop",
      label: "Learning & Evaluation Loop",
      role: "primary",
      status: "fallback",
      purpose: "Accumulate requests, evidence, timings, evaluations, and intent maps into improvement loops.",
      userOutcome: "See why the platform improved and what should improve next.",
      primarySection: "intent",
      primarySurfaces: ["Intent Map", "Evaluations", "Work Timings"],
      currentAssets: [],
      automationTargets: ["intent structuring", "evaluation capture", "bottleneck detection"],
      learningSignals: ["intent themes"],
      validationGates: []
    },
    {
      id: "observability_monitoring",
      label: "Observability & Monitoring",
      role: "supporting",
      status: "fallback",
      purpose: "Expose structure, documents, source inventory, service readiness, and status as supporting observability.",
      userOutcome: "Inspect platform state without treating the monitoring layer as the product.",
      primarySection: "structure",
      primarySurfaces: ["Structure", "Documents", "History", "Service Readiness"],
      currentAssets: [],
      automationTargets: ["snapshot collection", "customer snapshot sanitization"],
      learningSignals: ["service blockers"],
      validationGates: []
    }
  ],
  promotionLoop: {
    stages: ["observe_repetition_or_gap", "select_smallest_useful_asset", "implement_with_validation"],
    recordTargets: [],
    improvementRule: "Promote repeated work into the smallest useful durable asset first.",
    assetOrder: ["prompt", "workflow", "template", "tool", "skill", "agent", "project_feature"]
  },
  qualitySignals: [],
  validationGates: []
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

type AccumulatedDataStoreReport = {
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

type AccumulatedDataOverviewReport = {
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

type WorkspaceTextFileListReport = {
  status: string;
  source: string;
  totalCount: number;
  returnedCount: number;
  truncated: boolean;
  files: WorkspaceSourceFile[];
};

type DesktopWorkspaceStateReport = {
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

type WorkspaceExplorerDirectory = {
  name: string;
  path: string;
  files: WorkspaceSourceFile[];
  children: WorkspaceExplorerDirectory[];
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

const defaultRuntimeInitDefaults: RuntimeInitDefaults = {
  adapterId: "codex-cli",
  sessionModeId: sessionModePresets[0].id,
  taskPipeKind: fallbackTaskPipePresets[0].taskKind,
  autoDeferQuestions: true
};

export function MonitorShell({ snapshot }: { snapshot: WorkspaceSnapshot }) {
  const [section, setSection] = useState<SectionId>("overview");
  const [uiLanguage, setUiLanguage] = useState<UiLanguage>("ko");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [historyDate, setHistoryDate] = useState("all");
  const [historyCategory, setHistoryCategory] = useState("all");
  const [sourceProject, setSourceProject] = useState("all");
  const [sourceLanguage, setSourceLanguage] = useState("all");
  const [selectedSourceId, setSelectedSourceId] = useState("");
  const [sourceCopyNotice, setSourceCopyNotice] = useState("");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState<SettingsTabId>("appearance");
  const [themeMode, setThemeMode] = useState<AppThemeMode>("system");
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>("collapsed");
  const [terminalDrawerOpen, setTerminalDrawerOpen] = useState(false);
  const [runtimeInitDefaults, setRuntimeInitDefaults] = useState<RuntimeInitDefaults>(defaultRuntimeInitDefaults);
  const [operatorCenterOpen, setOperatorCenterOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState("");
  const [activeHomeTab, setActiveHomeTab] = useState<CoreFeatureTabId>("files");
  const commandInputRef = useRef<HTMLInputElement>(null);
  const [pinnedSections, setPinnedSections] = useState<SectionId[]>(defaultPinnedSections);
  const [recentSections, setRecentSections] = useState<SectionId[]>(["overview"]);
  const viewModes = snapshot.viewModeCatalog?.modes?.length ? snapshot.viewModeCatalog.modes : fallbackViewModes;
  const languageModes = useMemo(() => {
    const merged = new Map<string, MonitorLanguageMode>();
    for (const mode of fallbackLanguageModes) {
      merged.set(mode.id, mode);
    }
    for (const mode of snapshot.languageModeCatalog?.modes || []) {
      merged.set(mode.id, mode);
    }
    return Array.from(merged.values());
  }, [snapshot.languageModeCatalog?.modes]);
  const [viewMode, setViewMode] = useState(snapshot.viewModeCatalog?.defaultMode || "superadmin_developer");
  const [languageMode, setLanguageMode] = useState(snapshot.languageModeCatalog?.defaultMode || "all");
  const modeFunctionCatalog = snapshot.modeFunctionCatalog ?? emptyModeFunctionCatalog;
  const claudeCodeDesignTransfer = snapshot.claudeCodeDesignTransfer ?? emptyClaudeCodeDesignTransfer;
  const philosophyFeatureExtraction = snapshot.philosophyFeatureExtraction ?? emptyPhilosophyFeatureExtraction;
  const intentFeatureMap = snapshot.intentFeatureMap ?? emptyIntentFeatureMap;
  const structureOverview = snapshot.structureOverview ?? emptyStructureOverview;
  const productFeatureArchitecture = snapshot.productFeatureArchitecture ?? emptyProductFeatureArchitecture;
  const [selectedModeFunctionGroupId, setSelectedModeFunctionGroupId] = useState(
    modeFunctionCatalog.groups[0]?.id || "view_mode"
  );
  const localizedSections = useMemo(() => sections.map((item) => sectionForLanguage(item, uiLanguage)), [uiLanguage]);
  const localizedFeatureGroups = useMemo(
    () => featureGroups.map((group) => featureGroupForLanguage(group, uiLanguage)),
    [uiLanguage]
  );
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(UI_LANGUAGE_STORAGE_KEY);
      if (stored === "ko" || stored === "en") {
        setUiLanguage(stored);
      }
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, uiLanguage);
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, [uiLanguage]);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(THEME_MODE_STORAGE_KEY);
      if (stored === "system" || stored === "light" || stored === "dark") {
        setThemeMode(stored);
      }
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_MODE_STORAGE_KEY, themeMode);
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, [themeMode]);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(SIDEBAR_MODE_STORAGE_KEY);
      if (stored === "expanded" || stored === "collapsed") {
        setSidebarMode(stored);
      }
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(SIDEBAR_MODE_STORAGE_KEY, sidebarMode);
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, [sidebarMode]);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(TERMINAL_DRAWER_STORAGE_KEY);
      if (stored === "open" || stored === "closed") {
        setTerminalDrawerOpen(stored === "open");
      }
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(TERMINAL_DRAWER_STORAGE_KEY, terminalDrawerOpen ? "open" : "closed");
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, [terminalDrawerOpen]);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(RUNTIME_INIT_STORAGE_KEY);
      if (!stored) {
        return;
      }
      const parsed = JSON.parse(stored) as Partial<RuntimeInitDefaults>;
      setRuntimeInitDefaults({
        adapterId:
          typeof parsed.adapterId === "string" && fallbackDesktopAdapters.some((adapter) => adapter.adapterId === parsed.adapterId)
            ? parsed.adapterId
            : defaultRuntimeInitDefaults.adapterId,
        sessionModeId:
          typeof parsed.sessionModeId === "string" && sessionModePresets.some((mode) => mode.id === parsed.sessionModeId)
            ? parsed.sessionModeId
            : defaultRuntimeInitDefaults.sessionModeId,
        taskPipeKind:
          typeof parsed.taskPipeKind === "string" && fallbackTaskPipePresets.some((preset) => preset.taskKind === parsed.taskPipeKind)
            ? parsed.taskPipeKind
            : defaultRuntimeInitDefaults.taskPipeKind,
        autoDeferQuestions:
          typeof parsed.autoDeferQuestions === "boolean"
            ? parsed.autoDeferQuestions
            : defaultRuntimeInitDefaults.autoDeferQuestions
      });
    } catch {
      try {
        window.localStorage.removeItem(RUNTIME_INIT_STORAGE_KEY);
      } catch {
        // Local storage can be unavailable in hardened browser contexts.
      }
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(RUNTIME_INIT_STORAGE_KEY, JSON.stringify(runtimeInitDefaults));
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, [runtimeInitDefaults]);
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(PINNED_SECTIONS_STORAGE_KEY);
      if (!stored) {
        return;
      }
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) {
        return;
      }
      const nextSections = parsed.filter((item): item is SectionId => sectionIds.has(item as SectionId)).slice(0, 6);
      if (nextSections.length > 0) {
        setPinnedSections(nextSections);
      }
    } catch {
      try {
        window.localStorage.removeItem(PINNED_SECTIONS_STORAGE_KEY);
      } catch {
        // Local storage can be unavailable in hardened browser contexts.
      }
    }
  }, []);
  useEffect(() => {
    try {
      window.localStorage.setItem(PINNED_SECTIONS_STORAGE_KEY, JSON.stringify(pinnedSections));
    } catch {
      // Local storage can be unavailable in hardened browser contexts.
    }
  }, [pinnedSections]);
  useEffect(() => {
    setRecentSections((previous) => [section, ...previous.filter((item) => item !== section)].slice(0, 5));
  }, [section]);
  useEffect(() => {
    if (!commandPaletteOpen) {
      return;
    }
    commandInputRef.current?.focus();
  }, [commandPaletteOpen]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if ((event.metaKey || event.ctrlKey) && key === "k") {
        event.preventDefault();
        setCommandPaletteOpen((current) => !current);
        return;
      }
      if ((event.metaKey || event.ctrlKey) && event.key === ",") {
        event.preventDefault();
        setSettingsOpen(true);
        return;
      }
      if (event.key === "Escape") {
        setCommandPaletteOpen(false);
        setSettingsOpen(false);
        setOperatorCenterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const currentViewMode = useMemo(() => {
    return viewModes.find((mode) => mode.id === viewMode) || viewModes[0] || fallbackViewModes[2];
  }, [viewMode, viewModes]);
  const currentLanguageMode = useMemo(() => {
    return languageModes.find((mode) => mode.id === languageMode) || languageModes[0] || fallbackLanguageModes[0];
  }, [languageMode, languageModes]);
  const visibleSections = useMemo(() => {
    const allowed = new Set(currentViewMode.allowedSections);
    return localizedSections.filter((item) => allowed.has(item.id));
  }, [currentViewMode, localizedSections]);
  const workVisibleSections = useMemo(() => {
    return visibleSections.filter((item) => !operatorSectionIds.has(item.id));
  }, [visibleSections]);
  const selectViewMode = (modeId: string) => {
    const nextMode = viewModes.find((mode) => mode.id === modeId) || currentViewMode;
    setViewMode(nextMode.id);
    if (!nextMode.allowedSections.includes(section)) {
      setSection((nextMode.allowedSections[0] as SectionId | undefined) || "overview");
    }
  };
  const openModeFunctionOption = (groupId: string, optionId: string) => {
    if (groupId === "view_mode") {
      setSettingsTab("appearance");
      setSettingsOpen(true);
      return;
    }

    if (groupId === "language_mode") {
      setSettingsTab("appearance");
      setSettingsOpen(true);
      return;
    }

    if (groupId === "section_location" && sectionIds.has(optionId as SectionId)) {
      openSection(optionId as SectionId);
      return;
    }

    if (["desktop_session_mode", "task_pipe", "cli_adapter"].includes(groupId)) {
      setSettingsTab("execution");
      setSettingsOpen(true);
      return;
    }

    const group = modeFunctionCatalog.groups.find((item) => item.id === groupId);
    const option = group?.options.find((item) => item.id === optionId);
    openSection("documents");
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
    .filter((document) =>
      ["work-summary", "intent-feature-map", "request-trace", "user-request", "evaluation"].includes(document.category)
    )
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
  const copySelectedSource = async () => {
    if (!selectedSource) {
      return;
    }
    const copied = await writeClipboardText(selectedSource.content);
    setSourceCopyNotice(copied ? `${selectedSource.path} copied` : "Clipboard unavailable");
  };
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
      detail: "에이전트 작업 환경에서 다음 실행을 시작할 수 있습니다.",
      section: "desktop" as SectionId,
      action: "작업 시작"
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
      tone: "violet"
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
    intent: intentFeatureMap.summary.totalThemes.toLocaleString("ko-KR"),
    structure: structureOverview.summary.totalPlanes
      ? `${structureOverview.summary.totalPlanes}/${structureOverview.summary.totalPressurePoints}`
      : snapshot.stats.rootFolders.toLocaleString("ko-KR"),
    documents: viewFilteredDocuments.length.toLocaleString("ko-KR"),
    source: visibleSourceFiles.length.toLocaleString("ko-KR"),
    requirements: visibleRequirements.length.toLocaleString("ko-KR"),
    agents: agentCatalog.length.toLocaleString("ko-KR")
  };
  const operatorCenterSections = sections.filter((item) => operatorSectionIds.has(item.id)).map((item) => ({
    ...sectionForLanguage(item, uiLanguage),
    meta: sectionNavMeta[item.id]
  }));
  const sectionById = useMemo(() => {
    return new Map(localizedSections.map((item) => [item.id, item]));
  }, [localizedSections]);
  const coreFunctionSections = useMemo(() => {
    return (["overview", "desktop", "agents", "source", "intent"] as SectionId[])
      .map((id) => sectionById.get(id))
      .filter((item): item is Section => {
        return item ? currentViewMode.allowedSections.includes(item.id) : false;
      });
  }, [currentViewMode.allowedSections, sectionById]);
  const openSection = (targetSection: SectionId) => {
    if (!currentViewMode.allowedSections.includes(targetSection)) {
      const modeWithSection =
        viewModes.find((mode) => mode.id === "superadmin_developer" && mode.allowedSections.includes(targetSection)) ||
        viewModes.find((mode) => mode.allowedSections.includes(targetSection));
      if (modeWithSection) {
        setViewMode(modeWithSection.id);
      }
    }
    setSection(targetSection);
  };
  const togglePinnedSection = (targetSection: SectionId) => {
    setPinnedSections((previous) => {
      if (previous.includes(targetSection)) {
        return previous.filter((item) => item !== targetSection);
      }
      return [targetSection, ...previous].slice(0, 6);
    });
  };
  const pinnedVisibleSections = pinnedSections
    .map((id) => sectionById.get(id))
    .filter((item): item is Section => {
      return item ? currentViewMode.allowedSections.includes(item.id) && !operatorSectionIds.has(item.id) : false;
    });
  const recentVisibleSections = recentSections
    .map((id) => sectionById.get(id))
    .filter((item): item is Section => {
      return item ? currentViewMode.allowedSections.includes(item.id) : false;
    });
  const nextActionLabel = collaborationBoard.nextActions[0]?.nextAction || "No pending handoff";
  const currentSectionLabel = sectionById.get(section)?.label || "홈";
  const currentSection = sectionById.get(section);
  const currentFeatureGroup =
    localizedFeatureGroups.find((group) => group.id === currentSection?.group) || localizedFeatureGroups[0];
  const currentThemeLabel =
    themeMode === "system"
      ? uiLanguage === "ko" ? "시스템" : "System"
      : themeMode === "dark"
        ? uiLanguage === "ko" ? "다크" : "Dark"
        : uiLanguage === "ko" ? "라이트" : "Light";
  const openSettingsTab = (tabId: SettingsTabId = "appearance") => {
    setSettingsTab(tabId);
    setSettingsOpen(true);
  };
  const openTerminalDrawer = () => {
    setSection("desktop");
    setTerminalDrawerOpen(true);
  };
  const homeMainTabs: CoreFeatureTab[] = [
    {
      id: "files",
      label: uiLanguage === "ko" ? "파일 가져오기" : "Files",
      kicker: uiLanguage === "ko" ? "작업공간" : "Workspace",
      title: uiLanguage === "ko" ? "먼저 폴더를 가져오고 파일을 올립니다" : "Bring in a folder first",
      detail:
        uiLanguage === "ko"
          ? "왼쪽 Explorer에서 실제 작업공간을 잡고, 파일을 열어 에이전트 작업 입력으로 씁니다."
          : "Use the left Explorer to own the real workspace, open files, and feed agent work.",
      icon: FolderOpen,
      metric: `${visibleSourceFiles.length.toLocaleString("ko-KR")} files`,
      cta: uiLanguage === "ko" ? "Explorer 열기" : "Open Explorer",
      secondaryCta: uiLanguage === "ko" ? "작업 폴더 선택" : "Choose folder",
      run: () => openSection("source"),
      secondaryRun: () => openSection("source"),
      steps:
        uiLanguage === "ko"
          ? ["작업 폴더 선택", "Explorer에서 파일 열기", "수정/저장 후 에이전트 작업에 연결"]
          : ["Choose a workspace folder", "Open files from Explorer", "Edit/save and connect work to agents"]
    },
    {
      id: "agents",
      label: uiLanguage === "ko" ? "에이전트 만들기" : "Agents",
      kicker: uiLanguage === "ko" ? "생성" : "Factory",
      title: uiLanguage === "ko" ? "작업 목적에 맞는 에이전트를 만듭니다" : "Create agents for the work",
      detail:
        uiLanguage === "ko"
          ? "정의, 역할, 실행 환경을 한곳에서 보고 새 에이전트 작업으로 연결합니다."
          : "Review definitions, roles, and runtime readiness from one place.",
      icon: Bot,
      metric: `${agentCatalog.length.toLocaleString("ko-KR")} agents`,
      cta: uiLanguage === "ko" ? "에이전트 화면 열기" : "Open agents",
      secondaryCta: uiLanguage === "ko" ? "생성 후보 보기" : "View candidates",
      run: () => openSection("agents"),
      secondaryRun: () => openSection("intent"),
      steps:
        uiLanguage === "ko"
          ? ["목표/역할 선택", "필요 도구와 skill 연결", "실행 lane으로 넘기기"]
          : ["Pick goal and role", "Attach tools and skills", "Send to a run lane"]
    },
    {
      id: "run",
      label: uiLanguage === "ko" ? "작업 실행" : "Run",
      kicker: uiLanguage === "ko" ? "다중 CLI" : "Multi-CLI",
      title: uiLanguage === "ko" ? "하단 터미널에서 작업을 실행합니다" : "Run work in the bottom terminal",
      detail:
        uiLanguage === "ko"
          ? "Codex CLI 같은 guest adapter를 하단 terminal lane으로 띄우고 질문은 결정함으로 보냅니다."
          : "Launch guest adapters in bottom terminal lanes and route questions to the decision inbox.",
      icon: SquareTerminal,
      metric: runtimeInitDefaults.adapterId,
      cta: uiLanguage === "ko" ? "하단 터미널 열기" : "Open terminal",
      secondaryCta: uiLanguage === "ko" ? "실행 설정" : "Run settings",
      run: openTerminalDrawer,
      secondaryRun: () => openSettingsTab("execution"),
      steps:
        uiLanguage === "ko"
          ? ["CLI lane 선택", "작업 prompt 입력", "결정/결과를 데이터로 축적"]
          : ["Pick a CLI lane", "Enter the task prompt", "Accumulate decisions and results"]
    },
    {
      id: "learn",
      label: uiLanguage === "ko" ? "학습/개선" : "Learn",
      kicker: uiLanguage === "ko" ? "루프" : "Loop",
      title: uiLanguage === "ko" ? "작업 결과를 다음 자동화로 바꿉니다" : "Turn results into the next automation",
      detail:
        uiLanguage === "ko"
          ? "누적된 실행 기록, 결정, 평가를 보고 반복되는 작업을 prompt, workflow, tool, skill 후보로 승격합니다."
          : "Review accumulated runs, decisions, and evaluations to promote repeatable work.",
      icon: Database,
      metric: `${visibleEvaluations.toLocaleString("ko-KR")} evals`,
      cta: uiLanguage === "ko" ? "학습 지도 열기" : "Open learning map",
      secondaryCta: uiLanguage === "ko" ? "축적 데이터 보기" : "View accumulated data",
      run: () => openSection("intent"),
      secondaryRun: () => openSection("desktop"),
      steps:
        uiLanguage === "ko"
          ? ["실행 기록 확인", "반복 패턴 찾기", "자동화 후보로 승격"]
          : ["Review run records", "Find repeated patterns", "Promote automation candidates"]
    }
  ];
  const settingsTabs: Array<{
    id: SettingsTabId;
    label: string;
    detail: string;
    icon: LucideIcon;
  }> = [
    {
      id: "appearance",
      label: uiLanguage === "ko" ? "화면" : "Display",
      detail: uiLanguage === "ko" ? "언어와 보기 권한" : "Language and view mode",
      icon: Languages
    },
    {
      id: "navigation",
      label: uiLanguage === "ko" ? "레이아웃" : "Layout",
      detail: uiLanguage === "ko" ? "왼쪽 레일과 하단 터미널" : "Left rail and bottom terminal",
      icon: LayoutDashboard
    },
    {
      id: "execution",
      label: uiLanguage === "ko" ? "초기화" : "Initialize",
      detail: uiLanguage === "ko" ? "어댑터와 작업 파이프 기본값" : "Adapter and pipe defaults",
      icon: Network
    },
    {
      id: "data",
      label: uiLanguage === "ko" ? "데이터/운영" : "Data",
      detail: uiLanguage === "ko" ? "필터와 snapshot" : "Filters and snapshot",
      icon: Database
    }
  ];
  const commandItems: CommandItem[] = [
    ...workVisibleSections.map((item) => ({
      id: `section-${item.id}`,
      label: item.label,
      detail: item.purpose,
      group: "Section",
      icon: item.icon,
      badge: sectionNavMeta[item.id],
      keywords: [item.id, item.label, item.shortLabel, item.purpose],
      run: () => openSection(item.id)
    })),
    {
      id: "operator-center",
      label: uiLanguage === "ko" ? "운영 센터 열기" : "Open Operator Center",
      detail:
        uiLanguage === "ko"
          ? "모니터링, 문서, 요구사항, 히스토리는 작업 화면과 분리해서 봅니다."
          : "Monitoring, documents, requirements, history, and admin surfaces are separated here.",
      group: uiLanguage === "ko" ? "운영" : "Operator",
      icon: ShieldCheck,
      badge: operatorCenterSections.length.toLocaleString("ko-KR"),
      keywords: ["operator", "monitoring", "documents", "history", "requirements", "admin"],
      run: () => setOperatorCenterOpen(true)
    },
    {
      id: "settings-appearance",
      label: uiLanguage === "ko" ? "화면 설정" : "Display Settings",
      detail: uiLanguage === "ko" ? "화면 언어, 보기 모드, 문서 언어는 설정에서만 바꿉니다." : "Change UI language, view mode, and document language in Settings.",
      group: uiLanguage === "ko" ? "설정" : "Settings",
      icon: Languages,
      badge: currentViewMode.label,
      keywords: ["settings", "preferences", "view", "language", "display"],
      run: () => openSettingsTab("appearance")
    },
    {
      id: "settings-execution",
      label: uiLanguage === "ko" ? "초기화 설정" : "Initialization Settings",
      detail: uiLanguage === "ko" ? "어댑터, session mode, pipe 기본값을 한 곳에서 정합니다." : "Set adapter, session mode, and pipe defaults in one place.",
      group: uiLanguage === "ko" ? "설정" : "Settings",
      icon: Network,
      badge: runtimeInitDefaults.adapterId,
      keywords: ["settings", "initialize", "adapter", "session", "task pipe", "auto defer"],
      run: () => openSettingsTab("execution")
    },
    {
      id: "terminal-drawer-open",
      label: uiLanguage === "ko" ? "하단 터미널 열기" : "Open Bottom Terminal",
      detail:
        uiLanguage === "ko"
          ? "다중 CLI lane, stdout/stderr, decision event를 아래에서 올라오는 패널로 봅니다."
          : "Open multi-CLI lanes, stdout/stderr, and decision events in the bottom drawer.",
      group: uiLanguage === "ko" ? "실행" : "Run",
      icon: SquareTerminal,
      badge: terminalDrawerOpen ? "open" : "closed",
      keywords: ["terminal", "drawer", "panel", "cli", "run board", "bottom"],
      run: openTerminalDrawer
    },
    ...viewCategories.slice(0, 10).map((item) => ({
      id: `category-${item}`,
      label: categoryLabel(item),
      detail: uiLanguage === "ko" ? `문서 필터: ${item}` : `Documents filter: ${item}`,
      group: uiLanguage === "ko" ? "문서 필터" : "Document Filter",
      icon: ListFilter,
      badge: item === category ? "active" : undefined,
      keywords: [item, categoryLabel(item), "documents", "filter"],
      run: () => {
        openSection("documents");
        setCategory(item);
      }
    })),
    {
      id: "action-settings",
      label: uiLanguage === "ko" ? "설정" : "Settings",
      detail: uiLanguage === "ko" ? "테마, 언어, 레이아웃, 초기화 기본값을 조정합니다." : "Adjust theme, language, layout, and initialization defaults.",
      group: uiLanguage === "ko" ? "빠른 실행" : "Quick Action",
      icon: Settings,
      badge: currentViewMode.label,
      keywords: ["settings", "preferences", "view", "language", "pinned"],
      run: () => openSettingsTab("appearance")
    },
    {
      id: "action-attention",
      label: attentionState.action,
      detail: attentionState.title,
      group: uiLanguage === "ko" ? "빠른 실행" : "Quick Action",
      icon: attentionState.icon,
      badge: attentionState.label,
      keywords: ["attention", "now", attentionState.label, attentionState.title],
      run: () => openSection(attentionState.section)
    },
    {
      id: "action-evidence",
      label: uiLanguage === "ko" ? "근거 기록" : "Evidence Trail",
      detail: `${visibleWebSearches.toLocaleString("ko-KR")} web searches / ${visibleEvaluations.toLocaleString("ko-KR")} evaluations`,
      group: uiLanguage === "ko" ? "빠른 실행" : "Quick Action",
      icon: FileSearch,
      badge: `${visibleWebSearches}/${visibleEvaluations}`,
      keywords: ["evidence", "web search", "evaluation", "documents"],
      run: () => openSection("documents")
    },
    {
      id: "action-reset-filters",
      label: uiLanguage === "ko" ? "필터 초기화" : "Reset Filters",
      detail: "검색어, 문서, 히스토리, 소스 필터를 초기화합니다.",
      group: uiLanguage === "ko" ? "빠른 실행" : "Quick Action",
      icon: ListFilter,
      keywords: ["reset", "filter", "search", "clear"],
      run: () => {
        setQuery("");
        setCategory("all");
        setHistoryDate("all");
        setHistoryCategory("all");
        setSourceProject("all");
        setSourceLanguage("all");
      }
    }
  ];
  const normalizedCommandQuery = commandQuery.trim().toLowerCase();
  const filteredCommandItems = normalizedCommandQuery
    ? commandItems.filter((item) =>
        `${item.group} ${item.label} ${item.detail} ${item.keywords.join(" ")}`
          .toLowerCase()
          .includes(normalizedCommandQuery)
      )
    : commandItems.slice(0, 18);
  const runCommandItem = (item: CommandItem) => {
    item.run();
    setCommandPaletteOpen(false);
    setCommandQuery("");
  };

  return (
    <main className={`desktop-app-root theme-${themeMode}`}>
      <div className={`desktop-app-shell sidebar-${sidebarMode}`}>
        <aside className="activity-rail" aria-label={uiLanguage === "ko" ? "주요 기능 레일" : "Primary activity rail"}>
          <button className="activity-brand" type="button" onClick={() => openSection("overview")} title={uiLanguage === "ko" ? "작업공간 홈" : "Workspace Home"}>
            <Bot size={22} aria-hidden="true" />
          </button>
          <nav aria-label={uiLanguage === "ko" ? "주요 데스크톱 섹션" : "Pinned desktop sections"}>
            {workVisibleSections.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openSection(item.id)}
                className={section === item.id ? "active" : ""}
                title={item.label}
                aria-current={section === item.id ? "page" : undefined}
              >
                <item.icon size={19} aria-hidden="true" />
                <span>{item.shortLabel}</span>
              </button>
            ))}
          </nav>
          <button
            className="activity-settings"
            type="button"
            onClick={() => setOperatorCenterOpen(true)}
            title={uiLanguage === "ko" ? "운영 센터 열기" : "Open Operator Center"}
          >
            <ShieldCheck size={19} aria-hidden="true" />
          </button>
          <button className="activity-settings" type="button" onClick={() => openSettingsTab("appearance")} title={uiLanguage === "ko" ? "설정" : "Settings"}>
            <Settings size={19} aria-hidden="true" />
          </button>
        </aside>

        <section className="desktop-viewport" aria-label={uiLanguage === "ko" ? "데스크톱 앱 작업 화면" : "Desktop app viewport"}>
          <header className="desktop-titlebar">
            <div className="titlebar-section">
              {currentSection ? <currentSection.icon size={18} aria-hidden="true" /> : <LayoutDashboard size={18} aria-hidden="true" />}
              <div>
                <span>{currentViewMode.label}</span>
                <strong>{currentSectionLabel}</strong>
              </div>
            </div>
            <div className={`titlebar-context-strip status-${attentionState.tone}`}>
              <span>
                <strong>{currentFeatureGroup?.label || (uiLanguage === "ko" ? "작업" : "Work")}</strong>
                <small>{currentSection?.purpose || (uiLanguage === "ko" ? "선택한 화면의 역할을 보여줍니다." : "Shows the role of the selected surface.")}</small>
              </span>
              <button type="button" onClick={() => openSection(attentionState.section)} title={attentionState.title}>
                <attentionState.icon size={14} aria-hidden="true" />
                <span>{attentionState.action}</span>
              </button>
            </div>
            <div className="titlebar-actions">
              <button type="button" onClick={openTerminalDrawer} title={uiLanguage === "ko" ? "하단 터미널 열기" : "Open bottom terminal"}>
                <SquareTerminal size={15} aria-hidden="true" />
                <span>{uiLanguage === "ko" ? "터미널" : "Terminal"}</span>
              </button>
              <label className="titlebar-search">
                <Search size={15} aria-hidden="true" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={
                    section === "source"
                      ? uiLanguage === "ko"
                        ? "파일/코드 검색"
                        : "Search files and code"
                      : uiLanguage === "ko"
                        ? "문서 검색"
                        : "Search documents"
                  }
                />
              </label>
              <button type="button" onClick={() => setCommandPaletteOpen(true)} title="Command Palette">
                <Search size={16} aria-hidden="true" />
              </button>
            </div>
          </header>

      {commandPaletteOpen && (
        <div
          className="command-palette-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setCommandPaletteOpen(false);
            }
          }}
        >
          <section className="command-palette" role="dialog" aria-modal="true" aria-label={uiLanguage === "ko" ? "명령 검색" : "Command palette"}>
            <div className="command-palette-search">
              <Search size={18} aria-hidden="true" />
              <input
                ref={commandInputRef}
                value={commandQuery}
                onChange={(event) => setCommandQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && filteredCommandItems[0]) {
                    runCommandItem(filteredCommandItems[0]);
                  }
                }}
                placeholder="섹션, 설정, 문서 필터, 빠른 실행 검색"
              />
              <button type="button" onClick={() => setCommandPaletteOpen(false)}>
                {uiLanguage === "ko" ? "닫기" : "Close"}
              </button>
            </div>
            <div className="command-palette-meta">
              <span>{filteredCommandItems.length.toLocaleString("ko-KR")} {uiLanguage === "ko" ? "개 결과" : "results"}</span>
              <span>{currentViewMode.label}</span>
            </div>
            <div className="command-palette-results">
              {filteredCommandItems.length ? (
                filteredCommandItems.slice(0, 18).map((item) => (
                  <button key={item.id} type="button" onClick={() => runCommandItem(item)}>
                    <item.icon size={17} aria-hidden="true" />
                    <span>
                      <small>{item.group}</small>
                      <strong>{item.label}</strong>
                      <em>{item.detail}</em>
                    </span>
                    {item.badge && <b>{item.badge}</b>}
                  </button>
                ))
              ) : (
                <p className="empty-state">{uiLanguage === "ko" ? "일치하는 명령이 없습니다." : "No matching command."}</p>
              )}
            </div>
          </section>
        </div>
      )}

      {settingsOpen && (
        <div
          className="settings-dialog-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSettingsOpen(false);
            }
          }}
        >
          <section className="settings-dialog" role="dialog" aria-modal="true" aria-label={uiLanguage === "ko" ? "설정" : "Settings"}>
            <header>
              <div>
                <p className="eyebrow">{uiLanguage === "ko" ? "앱 설정" : "Preferences"}</p>
                <h2>{uiLanguage === "ko" ? "설정" : "Settings"}</h2>
              </div>
              <button type="button" onClick={() => setSettingsOpen(false)} title={uiLanguage === "ko" ? "설정 닫기" : "Close settings"}>
                <X size={17} aria-hidden="true" />
              </button>
            </header>

            <div className="settings-dialog-body">
              <nav className="settings-tab-list" aria-label={uiLanguage === "ko" ? "설정 대분류" : "Settings categories"}>
                {settingsTabs.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={settingsTab === item.id ? "active" : ""}
                    onClick={() => setSettingsTab(item.id)}
                  >
                    <item.icon size={16} aria-hidden="true" />
                    <span>
                      <strong>{item.label}</strong>
                      <small>{item.detail}</small>
                    </span>
                  </button>
                ))}
              </nav>

              <div className="settings-tab-panel">
                {settingsTab === "appearance" && (
                  <div className="settings-grid">
                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <LayoutDashboard size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "테마" : "Theme"}</span>
                          <strong>{currentThemeLabel}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        {(["system", "light", "dark"] as AppThemeMode[]).map((mode) => (
                          <button
                            key={mode}
                            className={themeMode === mode ? "active" : ""}
                            onClick={() => setThemeMode(mode)}
                            type="button"
                          >
                            {mode === "system"
                              ? uiLanguage === "ko" ? "시스템" : "System"
                              : mode === "dark"
                                ? uiLanguage === "ko" ? "다크" : "Dark"
                                : uiLanguage === "ko" ? "라이트" : "Light"}
                          </button>
                        ))}
                      </div>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <Languages size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "화면 언어" : "UI Language"}</span>
                          <strong>{uiLanguage === "ko" ? "한국어 우선" : "English Mode"}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        <button
                          className={uiLanguage === "ko" ? "active" : ""}
                          onClick={() => setUiLanguage("ko")}
                          type="button"
                          title="한국어 화면 문구를 우선 사용합니다."
                        >
                          한국어
                        </button>
                        <button
                          className={uiLanguage === "en" ? "active" : ""}
                          onClick={() => setUiLanguage("en")}
                          type="button"
                          title="Use English interface copy."
                        >
                          English
                        </button>
                      </div>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <ShieldCheck size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "보기 모드" : "View Mode"}</span>
                          <strong>{currentViewMode.label}</strong>
                        </div>
                      </div>
                      <div className="settings-option-list">
                        {viewModes.map((mode) => (
                          <button
                            key={mode.id}
                            className={currentViewMode.id === mode.id ? "active" : ""}
                            onClick={() => selectViewMode(mode.id)}
                            type="button"
                            title={mode.intent}
                          >
                            <span>{mode.label}</span>
                            <small>{truncateText(mode.intent, 78)}</small>
                          </button>
                        ))}
                      </div>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <Languages size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "문서 언어" : "Document Language"}</span>
                          <strong>{currentLanguageMode.label}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        {languageModes.map((mode) => (
                          <button
                            key={mode.id}
                            className={currentLanguageMode.id === mode.id ? "active" : ""}
                            onClick={() => {
                              setLanguageMode(mode.id);
                              setCategory("all");
                              setHistoryCategory("all");
                            }}
                            type="button"
                            title={mode.intent}
                          >
                            {mode.label}
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {settingsTab === "navigation" && (
                  <div className="settings-grid">
                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <LayoutDashboard size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "좌측 레일" : "Left Rail"}</span>
                          <strong>{sidebarMode === "expanded" ? (uiLanguage === "ko" ? "짧은 라벨 표시" : "Labels visible") : uiLanguage === "ko" ? "아이콘만" : "Icons only"}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        <button
                          className={sidebarMode === "expanded" ? "active" : ""}
                          onClick={() => setSidebarMode("expanded")}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "라벨 표시" : "Labels"}
                        </button>
                        <button
                          className={sidebarMode === "collapsed" ? "active" : ""}
                          onClick={() => setSidebarMode("collapsed")}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "아이콘만" : "Icons"}
                        </button>
                      </div>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <SquareTerminal size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "하단 터미널" : "Bottom Terminal"}</span>
                          <strong>{terminalDrawerOpen ? (uiLanguage === "ko" ? "열림" : "Open") : uiLanguage === "ko" ? "닫힘" : "Closed"}</strong>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        <button
                          className={terminalDrawerOpen ? "active" : ""}
                          onClick={() => {
                            setSection("desktop");
                            setTerminalDrawerOpen(true);
                          }}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "열기" : "Open"}
                        </button>
                        <button
                          className={!terminalDrawerOpen ? "active" : ""}
                          onClick={() => setTerminalDrawerOpen(false)}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "닫기" : "Close"}
                        </button>
                      </div>
                    </section>

                    <section className="settings-pane wide">
                      <div className="settings-pane-heading">
                        <LayoutDashboard size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "고정 섹션" : "Pinned Sections"}</span>
                          <strong>{pinnedVisibleSections.length.toLocaleString("ko-KR")} {uiLanguage === "ko" ? "개 고정" : "pinned"}</strong>
                        </div>
                      </div>
                      <div className="settings-pin-grid">
                        {workVisibleSections.map((item) => (
                          <button
                            key={item.id}
                            className={pinnedSections.includes(item.id) ? "active" : ""}
                            type="button"
                            onClick={() => togglePinnedSection(item.id)}
                            title={item.purpose}
                          >
                            <item.icon size={15} aria-hidden="true" />
                            <span>{item.shortLabel}</span>
                          </button>
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {settingsTab === "execution" && (
                  <div className="settings-grid">
                    <section className="settings-pane wide quick-setup-pane">
                      <div className="settings-pane-heading">
                        <PlayCircle size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "바로 시작 기본값" : "Ready-to-run defaults"}</span>
                          <strong>{uiLanguage === "ko" ? "Codex 기준으로 단순화" : "Simplified for Codex"}</strong>
                          <small>
                            {uiLanguage === "ko"
                              ? "처음에는 이 값으로 시작하고, 필요할 때만 세부 lane을 바꿉니다."
                              : "Start with these defaults, then change lanes only when needed."}
                          </small>
                        </div>
                      </div>
                      <div className="settings-action-row">
                        <button type="button" onClick={() => setRuntimeInitDefaults(defaultRuntimeInitDefaults)}>
                          <CheckCircle2 size={15} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "추천 기본값 적용" : "Apply recommended defaults"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setRuntimeInitDefaults(defaultRuntimeInitDefaults);
                            setSection("desktop");
                            setTerminalDrawerOpen(true);
                            setSettingsOpen(false);
                          }}
                        >
                          <SquareTerminal size={15} aria-hidden="true" />
                          <span>{uiLanguage === "ko" ? "터미널로 바로 가기" : "Go to terminal"}</span>
                        </button>
                      </div>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <SquareTerminal size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "기본 CLI 어댑터" : "Default CLI Adapter"}</span>
                          <strong>{runtimeInitDefaults.adapterId}</strong>
                        </div>
                      </div>
                      <div className="settings-option-list">
                        {fallbackDesktopAdapters.map((adapter) => {
                          const setupGuide = adapterSetupGuides[adapter.adapterId];
                          return (
                            <button
                              key={adapter.adapterId}
                              className={runtimeInitDefaults.adapterId === adapter.adapterId ? "active" : ""}
                              onClick={() => setRuntimeInitDefaults((current) => ({ ...current, adapterId: adapter.adapterId }))}
                              type="button"
                              title={setupGuide?.installHint || adapter.command}
                            >
                              <span>{adapter.label}</span>
                              <small>{setupGuide?.verifyCommand || adapter.command}</small>
                            </button>
                          );
                        })}
                      </div>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <Bot size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "Session Mode" : "Session Mode"}</span>
                          <strong>{sessionModePresets.find((mode) => mode.id === runtimeInitDefaults.sessionModeId)?.label || sessionModePresets[0].label}</strong>
                        </div>
                      </div>
                      <div className="settings-option-list">
                        {sessionModePresets.map((mode) => (
                          <button
                            key={mode.id}
                            className={runtimeInitDefaults.sessionModeId === mode.id ? "active" : ""}
                            onClick={() => setRuntimeInitDefaults((current) => ({ ...current, sessionModeId: mode.id }))}
                            type="button"
                            title={mode.intent}
                          >
                            <span>{mode.label}</span>
                            <small>{truncateText(mode.intent, 82)}</small>
                          </button>
                        ))}
                      </div>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <Network size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "Task Pipe" : "Task Pipe"}</span>
                          <strong>{fallbackTaskPipePresets.find((preset) => preset.taskKind === runtimeInitDefaults.taskPipeKind)?.label || fallbackTaskPipePresets[0].label}</strong>
                        </div>
                      </div>
                      <div className="settings-option-list">
                        {fallbackTaskPipePresets.map((preset) => (
                          <button
                            key={preset.taskKind}
                            className={runtimeInitDefaults.taskPipeKind === preset.taskKind ? "active" : ""}
                            onClick={() => setRuntimeInitDefaults((current) => ({ ...current, taskPipeKind: preset.taskKind }))}
                            type="button"
                            title={preset.intent}
                          >
                            <span>{preset.label}</span>
                            <small>{preset.laneCount} lanes / {truncateText(preset.intent, 68)}</small>
                          </button>
                        ))}
                      </div>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <Inbox size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "질문 처리" : "Question Handling"}</span>
                          <strong>{runtimeInitDefaults.autoDeferQuestions ? (uiLanguage === "ko" ? "자동 보류" : "Auto defer") : uiLanguage === "ko" ? "수동 처리" : "Manual"}</strong>
                          <small>
                            {uiLanguage === "ko"
                              ? "Auto-defer questions는 초기화 설정에서만 바꿉니다."
                              : "Auto-defer questions is configured here only."}
                          </small>
                        </div>
                      </div>
                      <div className="settings-segment-list">
                        <button
                          className={runtimeInitDefaults.autoDeferQuestions ? "active" : ""}
                          onClick={() => setRuntimeInitDefaults((current) => ({ ...current, autoDeferQuestions: true }))}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "자동 보류" : "Auto defer"}
                        </button>
                        <button
                          className={!runtimeInitDefaults.autoDeferQuestions ? "active" : ""}
                          onClick={() => setRuntimeInitDefaults((current) => ({ ...current, autoDeferQuestions: false }))}
                          type="button"
                        >
                          {uiLanguage === "ko" ? "수동 처리" : "Manual"}
                        </button>
                      </div>
                    </section>
                  </div>
                )}

                {settingsTab === "data" && (
                  <div className="settings-grid">
                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <ListFilter size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "필터" : "Filters"}</span>
                          <strong>{categoryLabel(category)}</strong>
                        </div>
                      </div>
                      <button
                        className="settings-primary-action"
                        type="button"
                        onClick={() => {
                          setQuery("");
                          setCategory("all");
                          setHistoryDate("all");
                          setHistoryCategory("all");
                          setSourceProject("all");
                          setSourceLanguage("all");
                        }}
                      >
                        <ListFilter size={15} aria-hidden="true" />
                        <span>{uiLanguage === "ko" ? "필터 초기화" : "Reset Filters"}</span>
                      </button>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <Clock3 size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "스냅샷" : "Snapshot"}</span>
                          <strong>{formatDate(snapshot.generatedAt)}</strong>
                        </div>
                      </div>
                      <p>
                        {viewFilteredDocuments.length.toLocaleString("ko-KR")} {uiLanguage === "ko" ? "개 문서" : "documents"} /{" "}
                        {visibleSections.length.toLocaleString("ko-KR")} {uiLanguage === "ko" ? "개 섹션" : "sections"}
                      </p>
                    </section>

                    <section className="settings-pane">
                      <div className="settings-pane-heading">
                        <ShieldCheck size={16} aria-hidden="true" />
                        <div>
                          <span>{uiLanguage === "ko" ? "운영 센터" : "Operator Center"}</span>
                          <strong>{operatorCenterSections.length.toLocaleString("ko-KR")}</strong>
                        </div>
                      </div>
                      <button className="settings-primary-action" type="button" onClick={() => setOperatorCenterOpen(true)}>
                        <ShieldCheck size={15} aria-hidden="true" />
                        <span>{uiLanguage === "ko" ? "운영 센터 열기" : "Open Operator Center"}</span>
                      </button>
                    </section>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {operatorCenterOpen && (
        <OperatorCenterDialog
          sections={operatorCenterSections}
          onClose={() => setOperatorCenterOpen(false)}
          onOpenSection={openSection}
        />
      )}

          <section className={`operator-strip operator-${attentionState.tone}`} aria-label="Workspace status and actions">
            <div className="operator-strip-state">
              <attentionState.icon size={17} aria-hidden="true" />
              <div>
                <span>{currentSectionLabel}</span>
                <strong>{attentionState.title}</strong>
              </div>
            </div>
            <div className="operator-strip-actions">
              <button type="button" onClick={() => openSection(attentionState.section)}>
                <ArrowRight size={15} aria-hidden="true" />
                <span>{attentionState.action}</span>
              </button>
              <button type="button" onClick={() => openSection("agents")}>
                <Inbox size={15} aria-hidden="true" />
                <span>{truncateText(nextActionLabel, 34)}</span>
              </button>
              <button type="button" onClick={() => setOperatorCenterOpen(true)}>
                <FileSearch size={15} aria-hidden="true" />
                <span>{visibleWebSearches.toLocaleString("ko-KR")} / {visibleEvaluations.toLocaleString("ko-KR")}</span>
              </button>
              <button type="button" onClick={() => openSection("desktop")}>
                <SquareTerminal size={15} aria-hidden="true" />
                <span>Runtime</span>
              </button>
            </div>
          </section>

          <section className="toolbar desktop-toolbar" aria-label="Document filters">
            {section !== "source" && (
              <>
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
            <div className="desktop-home-grid">
              <section className={`workspace-home-panel home-${attentionState.tone}`} aria-label="Workspace home">
                <div>
                  <p className="eyebrow">Agent Workspace</p>
                  <h2>{attentionState.title}</h2>
                  <p>{attentionState.detail}</p>
                </div>
                <div className="workspace-home-actions">
                  <button type="button" onClick={() => openSection("desktop")}>
                    <FolderOpen size={16} aria-hidden="true" />
                    <span>Open Workspace</span>
                  </button>
                  <button type="button" onClick={() => openSection("agents")}>
                    <Bot size={16} aria-hidden="true" />
                    <span>Agent Factory</span>
                  </button>
                  <button type="button" onClick={openTerminalDrawer}>
                    <PlayCircle size={16} aria-hidden="true" />
                    <span>Start Task</span>
                  </button>
                </div>
              </section>

              <CoreFeatureTabs
                activeTab={activeHomeTab}
                language={uiLanguage}
                tabs={homeMainTabs}
                onSelectTab={setActiveHomeTab}
              />

              <ProductFeatureArchitecturePanel
                architecture={productFeatureArchitecture}
                onOpenSection={openSection}
                onOpenOperatorCenter={() => setOperatorCenterOpen(true)}
              />

              <section className="run-timeline-panel" aria-label="Run timeline">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Timeline</p>
                    <h2>Run Flow</h2>
                  </div>
                  <Activity size={18} aria-hidden="true" />
                </div>
                <div className="desktop-run-timeline">
                  {commandSteps.map((step, index) => (
                    <button
                      key={step.label}
                      className={`timeline-step step-${step.tone}`}
                      onClick={() => step.section && openSection(step.section)}
                      type="button"
                      disabled={!step.section}
                    >
                      <span>{index + 1}</span>
                      <step.icon size={16} aria-hidden="true" />
                      <strong>{step.title}</strong>
                      <small>{step.detail}</small>
                    </button>
                  ))}
                </div>
              </section>

              <section className="decision-dock-panel" aria-label="Decision inbox">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Decision Inbox</p>
                    <h2>{attentionItems.length ? "Pending" : "Clear"}</h2>
                  </div>
                  <button type="button" onClick={() => openSection("agents")}>
                    <Inbox size={16} aria-hidden="true" />
                    <span>Open</span>
                  </button>
                </div>
                <div className="desktop-decision-list">
                  {attentionItems.length ? (
                    attentionItems.map((item) => (
                      <article key={item.id}>
                        <span>{item.label}</span>
                        <strong>{item.title}</strong>
                        <p>{item.detail}</p>
                        <small>{item.meta}</small>
                      </article>
                    ))
                  ) : (
                    <p className="empty-state">현재 blocker나 handoff가 없습니다.</p>
                  )}
                </div>
              </section>

              <section className="home-metrics-strip" aria-label="Workspace metrics">
                <Metric label="Primary Features" value={productFeatureArchitecture.summary.primaryFeatures} icon={Network} tone="green" />
                <Metric label="Agents" value={agentCatalog.length} icon={Bot} tone="blue" />
                <Metric label="Task Runs" value={snapshot.stats.tasks} icon={PlayCircle} tone="amber" />
                <Metric label="Decisions" value={attentionItems.length} icon={Inbox} tone="red" />
                <Metric label="Learning Themes" value={intentFeatureMap.summary.totalThemes} icon={GitBranch} tone="violet" />
              </section>

              <section className="panel home-recent-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Work Trail</p>
                    <h2>Recent Signals</h2>
                  </div>
                  <button type="button" onClick={() => setOperatorCenterOpen(true)}>
                    <ShieldCheck size={16} aria-hidden="true" />
                    <span>Operator</span>
                  </button>
                </div>
                <DocumentList documents={recentHistory.slice(0, 6)} compact />
              </section>

              <section className="panel capability-dock-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">Capabilities</p>
                    <h2>Optional Setup</h2>
                  </div>
                  <button type="button" onClick={() => openSection("desktop")}>
                    <Settings size={16} aria-hidden="true" />
                    <span>Runtime</span>
                  </button>
                </div>
                <div className="capability-dock-list">
                  <article>
                    <SquareTerminal size={16} aria-hidden="true" />
                    <span>Guest adapters</span>
                    <strong>{sectionNavMeta.desktop}</strong>
                  </article>
                  <article>
                    <Bot size={16} aria-hidden="true" />
                    <span>Agents</span>
                    <strong>{agentCatalog.length.toLocaleString("ko-KR")}</strong>
                  </article>
                  <article>
                    <ShieldCheck size={16} aria-hidden="true" />
                    <span>Public gate</span>
                    <strong>{snapshot.publicReview.status}</strong>
                  </article>
                </div>
              </section>
            </div>
          )}

      {section === "desktop" && (
        <DesktopRuntimePanel
          agentCatalogCount={agentCatalog.length}
          blockedTaskCount={collaborationBoard.summary.blockedTasks}
          sourceFiles={visibleSourceFiles}
          uiLanguage={uiLanguage}
          initDefaults={runtimeInitDefaults}
          onOpenSettings={() => openSettingsTab("execution")}
          terminalDrawerOpen={terminalDrawerOpen}
          setTerminalDrawerOpen={setTerminalDrawerOpen}
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

      {section === "intent" && (
        <div className="content-grid">
          <IntentFeatureMapPanel
            map={intentFeatureMap}
            full
            onOpenIntent={() => openSection("intent")}
            onOpenDocuments={() => {
              openSection("documents");
              setCategory("intent-feature-map");
            }}
          />
        </div>
      )}

      {section === "structure" && (
        <section className="structure-grid">
          <StructureBackbonePanel
            overview={structureOverview}
            onOpenStructure={() => openSection("structure")}
            onOpenSource={() => openSection("source")}
          />

          <section className="panel structure-pressure-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Pressure</p>
                <h2>복잡도 압력점</h2>
              </div>
              <AlertTriangle size={18} aria-hidden="true" />
            </div>
            <div className="pressure-list">
              {structureOverview.pressurePoints.map((point) => (
                <article key={point.id} className={`pressure-${point.priority}`}>
                  <span>{point.priority}</span>
                  <strong>{point.signal}</strong>
                  <p>{point.reason}</p>
                  <small>{point.nextAction}</small>
                </article>
              ))}
            </div>
          </section>

          <section className="panel wide structure-boundary-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Boundary Rules</p>
                <h2>어디에 무엇을 둘지</h2>
              </div>
              <ShieldCheck size={18} aria-hidden="true" />
            </div>
            <div className="boundary-rule-grid">
              {structureOverview.boundaryRules.map((rule) => (
                <article key={rule.id}>
                  <span>{rule.sourcePath}</span>
                  <strong>{rule.label}</strong>
                  <p>{rule.rule}</p>
                  <div className="path-list">
                    {rule.appliesTo.slice(0, 8).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="panel wide">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Root Inventory</p>
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
        <DesktopRuntimePanel
          agentCatalogCount={agentCatalog.length}
          blockedTaskCount={collaborationBoard.summary.blockedTasks}
          sourceFiles={visibleSourceFiles}
          uiLanguage={uiLanguage}
          initDefaults={runtimeInitDefaults}
          onOpenSettings={() => openSettingsTab("execution")}
          terminalDrawerOpen={terminalDrawerOpen}
          setTerminalDrawerOpen={setTerminalDrawerOpen}
          surface="files"
        />
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
        </section>
      </div>
    </main>
  );
}

function StructureBackbonePanel({
  overview,
  compact = false,
  onOpenStructure,
  onOpenSource
}: {
  overview: StructureOverview;
  compact?: boolean;
  onOpenStructure: () => void;
  onOpenSource: () => void;
}) {
  const planes = compact ? overview.planes.slice(0, 4) : overview.planes;
  const hotspots = overview.sourceHotspots.slice(0, compact ? 3 : 6);

  return (
    <section className="panel wide structure-backbone-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Architecture Backbone</p>
          <h2>플랫폼 계층과 소유 경계</h2>
        </div>
        <div className="structure-summary">
          <span>{overview.summary.totalPlanes.toLocaleString("ko-KR")} planes</span>
          <span>{overview.summary.totalBoundaryRules.toLocaleString("ko-KR")} rules</span>
          <span>{overview.summary.totalPressurePoints.toLocaleString("ko-KR")} pressure</span>
        </div>
      </div>

      <div className="structure-plane-grid">
        {planes.map((plane) => (
          <article key={plane.id}>
            <div className="plane-head">
              <Layers size={17} aria-hidden="true" />
              <span>{plane.owner}</span>
            </div>
            <h3>{plane.label}</h3>
            <p>{plane.intent}</p>
            <div className="plane-metrics">
              <span>{plane.documentCount.toLocaleString("ko-KR")} docs</span>
              <span>{plane.sourceFileCount.toLocaleString("ko-KR")} source</span>
              <span>{plane.uiEntry}</span>
            </div>
            <div className="path-list">
              {plane.primaryPaths.slice(0, 6).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            {!compact && (
              <dl className="plane-contract">
                <dt>Contains</dt>
                <dd>{plane.contains.join(" / ")}</dd>
                <dt>Not Here</dt>
                <dd>{plane.mustNotContain.join(" / ")}</dd>
              </dl>
            )}
          </article>
        ))}
      </div>

      {hotspots.length > 0 && (
        <div className="source-hotspot-strip">
          {hotspots.map((file) => (
            <button key={file.path} type="button" onClick={onOpenSource} title={file.recommendation}>
              <Code2 size={15} aria-hidden="true" />
              <strong>{file.path}</strong>
              <span>{file.lineCount.toLocaleString("ko-KR")} lines</span>
            </button>
          ))}
        </div>
      )}

      <div className="structure-actions">
        <button type="button" onClick={onOpenStructure}>
          <Layers size={15} aria-hidden="true" />
          <span>Structure</span>
        </button>
        <button type="button" onClick={onOpenSource}>
          <Code2 size={15} aria-hidden="true" />
          <span>Source Hotspots</span>
        </button>
      </div>
    </section>
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

function IntentFeatureMapPanel({
  map,
  full = false,
  onOpenIntent,
  onOpenDocuments
}: {
  map: IntentFeatureMap;
  full?: boolean;
  onOpenIntent: () => void;
  onOpenDocuments: () => void;
}) {
  const visibleThemes = full ? map.themes : map.themes.slice(0, 6);
  const roadmapStages = [
    { id: "now", label: "Now", items: map.roadmap.now, tone: "green" },
    { id: "next", label: "Next", items: map.roadmap.next, tone: "blue" },
    { id: "later", label: "Later", items: map.roadmap.later, tone: "slate" }
  ] as const;

  return (
    <section className="panel wide intent-map-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Intent Feature Map</p>
          <h2>사용자 의도에서 기능 우선순위로</h2>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={onOpenIntent}>
            <GitBranch size={16} aria-hidden="true" />
            <span>Map</span>
          </button>
          <button type="button" onClick={onOpenDocuments}>
            <BookOpenText size={16} aria-hidden="true" />
            <span>Source</span>
          </button>
        </div>
      </div>

      <div className="intent-map-hero">
        <article>
          <span>structured intents</span>
          <strong>{map.summary.totalIntents.toLocaleString("ko-KR")}</strong>
          <p>
            {map.sourcePath || "customer snapshot hides internal intent history"}
            {map.summary.sourceDate ? ` / ${map.summary.sourceDate}` : ""}
          </p>
        </article>
        <article>
          <span>feature themes</span>
          <strong>{map.summary.totalThemes.toLocaleString("ko-KR")}</strong>
          <p>히스토리 의도를 제품 기능 축으로 묶습니다.</p>
        </article>
        <article>
          <span>now candidates</span>
          <strong>{map.summary.now.toLocaleString("ko-KR")}</strong>
          <p>다음 구현 결정을 바로 돕는 후보입니다.</p>
        </article>
        <article>
          <span>next/later</span>
          <strong>{(map.summary.next + map.summary.later).toLocaleString("ko-KR")}</strong>
          <p>
            {map.summary.next.toLocaleString("ko-KR")} next / {map.summary.later.toLocaleString("ko-KR")} later /{" "}
            {map.summary.availableMaps.toLocaleString("ko-KR")} maps
          </p>
        </article>
      </div>

      <div className="intent-map-layout">
        <div className="intent-theme-list" aria-label="Intent-derived feature themes">
          {visibleThemes.length ? (
            visibleThemes.map((theme) => (
              <article key={theme.id}>
                <header>
                  <GitBranch size={16} aria-hidden="true" />
                  <strong>{theme.label}</strong>
                </header>
                <p>{theme.intent}</p>
                <dl>
                  <dt>Implemented</dt>
                  <dd>{theme.implemented}</dd>
                  <dt>Next</dt>
                  <dd>{theme.nextCandidate}</dd>
                </dl>
              </article>
            ))
          ) : (
            <p className="empty-state">사용자 의도 기반 기능 지도가 아직 생성되지 않았습니다.</p>
          )}
        </div>

        <div className="intent-roadmap-grid" aria-label="Intent roadmap">
          {roadmapStages.map((stage) => (
            <article key={stage.id} className={`intent-roadmap-column roadmap-${stage.tone}`}>
              <header>
                <span>{stage.label}</span>
                <strong>{stage.items.length.toLocaleString("ko-KR")}</strong>
              </header>
              <div>
                {stage.items.length ? (
                  stage.items.map((item) => (
                    <section key={`${stage.id}-${item.feature}`}>
                      <h3>{item.feature}</h3>
                      <p>{item.reason}</p>
                      <small>{item.dependency}</small>
                    </section>
                  ))
                ) : (
                  <p className="empty-state">후보 없음</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {full && map.sourceLimits.length > 0 && (
        <div className="intent-source-limits">
          {map.sourceLimits.map((limit) => (
            <span key={limit}>{limit}</span>
          ))}
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

function WorkspaceExplorerDirectoryView({
  directory,
  level,
  activePath,
  dirtyPaths,
  editorBusy,
  runtimeAvailable,
  onOpenFile
}: {
  directory: WorkspaceExplorerDirectory;
  level: number;
  activePath: string;
  dirtyPaths: Set<string>;
  editorBusy: boolean;
  runtimeAvailable: boolean;
  onOpenFile: (relativePath: string) => Promise<void>;
}) {
  return (
    <div className="workspace-tree-directory" role="group">
      <div className="workspace-tree-folder" role="treeitem" aria-expanded="true" style={{ paddingLeft: `${8 + level * 12}px` }}>
        <FolderOpen size={14} aria-hidden="true" />
        <strong>{directory.name || "root"}</strong>
        <span>{directory.children.length + directory.files.length}</span>
      </div>
      {directory.children.map((child) => (
        <WorkspaceExplorerDirectoryView
          key={child.path}
          directory={child}
          level={level + 1}
          activePath={activePath}
          dirtyPaths={dirtyPaths}
          editorBusy={editorBusy}
          runtimeAvailable={runtimeAvailable}
          onOpenFile={onOpenFile}
        />
      ))}
      {directory.files.map((file) => {
        const fileName = file.path.split("/").pop() || file.path;
        const active = activePath === file.path;
        const dirty = dirtyPaths.has(file.path);
        return (
          <button
            key={file.id}
            type="button"
            className={`workspace-tree-file ${active ? "active" : ""} ${dirty ? "dirty" : "clean"}`}
            style={{ paddingLeft: `${24 + level * 12}px` }}
            onClick={() => {
              void onOpenFile(file.path);
            }}
            disabled={!runtimeAvailable || editorBusy}
            role="treeitem"
          >
            <Code2 size={13} aria-hidden="true" />
            <span>{fileName}</span>
            <small>
              {file.extension || file.language || "file"} / {formatBytes(file.sizeBytes)}
            </small>
          </button>
        );
      })}
    </div>
  );
}

function DesktopRuntimePanel({
  agentCatalogCount,
  blockedTaskCount,
  sourceFiles,
  uiLanguage,
  initDefaults,
  onOpenSettings,
  terminalDrawerOpen,
  setTerminalDrawerOpen,
  surface = "runtime"
}: {
  agentCatalogCount: number;
  blockedTaskCount: number;
  sourceFiles: WorkspaceSourceFile[];
  uiLanguage: UiLanguage;
  initDefaults: RuntimeInitDefaults;
  onOpenSettings: () => void;
  terminalDrawerOpen: boolean;
  setTerminalDrawerOpen: (open: boolean) => void;
  surface?: "runtime" | "files";
}) {
  const copy = nativeWorkspaceCopy[uiLanguage];
  const isFileWorkspaceSurface = surface === "files";
  const initialSessionMode = sessionModePresets.find((mode) => mode.id === initDefaults.sessionModeId) || sessionModePresets[0];
  const [runtimeState, setRuntimeState] = useState<"checking" | "available" | "unavailable">("checking");
  const [health, setHealth] = useState<DesktopHealthStatus | null>(null);
  const [adapters, setAdapters] = useState<CliAdapterStatus[]>(fallbackDesktopAdapters);
  const [reports, setReports] = useState<CliRunReport[]>([]);
  const [sessions, setSessions] = useState<CliSessionReport[]>([]);
  const [taskPipePresets, setTaskPipePresets] = useState<CliTaskPipelinePresetReport[]>(fallbackTaskPipePresets);
  const [selectedTaskPipeKind, setSelectedTaskPipeKind] = useState(initDefaults.taskPipeKind);
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
  const [accumulatedDataOverview, setAccumulatedDataOverview] = useState<AccumulatedDataOverviewReport | null>(null);
  const [accumulatedDataBusy, setAccumulatedDataBusy] = useState(false);
  const [accumulatedDataNotice, setAccumulatedDataNotice] = useState("");
  const [serviceReadiness, setServiceReadiness] = useState<ServiceReadinessReport | null>(null);
  const [serviceReadinessBusy, setServiceReadinessBusy] = useState(false);
  const [serviceReadinessNotice, setServiceReadinessNotice] = useState("");
  const [desktopWorkspace, setDesktopWorkspace] = useState<DesktopWorkspaceStateReport | null>(null);
  const [workspaceHostBusy, setWorkspaceHostBusy] = useState("");
  const [workspaceHostNotice, setWorkspaceHostNotice] = useState("");
  const [workspaceImportPath, setWorkspaceImportPath] = useState("");
  const [workspaceCloneUrl, setWorkspaceCloneUrl] = useState("");
  const [workspaceCloneFolder, setWorkspaceCloneFolder] = useState("");
  const [inboxReport, setInboxReport] = useState<HumanDecisionInboxReport | null>(null);
  const [error, setError] = useState("");
  const [runningAdapterId, setRunningAdapterId] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");
  const [selectedSessionModeId, setSelectedSessionModeId] = useState(initialSessionMode.id);
  const [selectedSessionAdapterId, setSelectedSessionAdapterId] = useState(initDefaults.adapterId);
  const [workingDir, setWorkingDir] = useState("");
  const [sessionPrompt, setSessionPrompt] = useState(initialSessionMode.prompt);
  const [autoDeferQuestions, setAutoDeferQuestions] = useState(initDefaults.autoDeferQuestions);
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
  const [runtimeSourceFiles, setRuntimeSourceFiles] = useState<WorkspaceSourceFile[]>([]);
  const [sourceCatalogReport, setSourceCatalogReport] = useState<WorkspaceTextFileListReport | null>(null);
  const [sourceSaveResults, setSourceSaveResults] = useState<WorkspaceWriteReport[]>([]);
  const [writeReport, setWriteReport] = useState<WorkspaceWriteReport | null>(null);
  const [sourceCopyNotice, setSourceCopyNotice] = useState("");
  const [sourceTemplateId, setSourceTemplateId] = useState<SourceTemplateId>("spec-section");
  const [sourceEditorViewMode, setSourceEditorViewMode] = useState<"edit" | "diff">("edit");
  const [sourceWordWrap, setSourceWordWrap] = useState(false);
  const [sourceMinimapEnabled, setSourceMinimapEnabled] = useState(true);
  const [sourceSettingsOpen, setSourceSettingsOpen] = useState(false);
  const [editorBusy, setEditorBusy] = useState(false);
  const [saveAllBusy, setSaveAllBusy] = useState(false);
  const [sourceCatalogBusy, setSourceCatalogBusy] = useState(false);
  const sourceEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const panelMountedRef = useRef(false);
  const activeSessionPollInFlightRef = useRef(false);
  const lastInboxRefreshAtRef = useRef(0);
  const lastTaskRunRefreshAtRef = useRef(0);

  const invoke = getTauriInvoke();
  const availableCount = adapters.filter((adapter) => adapter.available).length;
  const sourceCatalogFiles = runtimeSourceFiles.length ? runtimeSourceFiles : sourceFiles;
  const sourceFileCount = sourceCatalogFiles.length;
  const sourceCatalogLabel = runtimeSourceFiles.length ? "runtime" : "snapshot";
  const editableSourceFiles = useMemo(() => sourceCatalogFiles.filter((file) => !file.truncated).slice(0, 240), [sourceCatalogFiles]);
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
  const workspaceExplorerTree = useMemo(() => buildWorkspaceExplorerTree(filteredEditableSourceFiles), [filteredEditableSourceFiles]);
  const workspaceExplorerRootLabel =
    desktopWorkspace?.activeWorkspacePath?.split(/[\\/]/).filter(Boolean).pop() ||
    desktopWorkspace?.fallbackWorkspacePath?.split(/[\\/]/).filter(Boolean).pop() ||
    "workspace";
  const workspaceExplorerFolderCount = useMemo(() => countWorkspaceExplorerDirectories(workspaceExplorerTree), [workspaceExplorerTree]);
  const openDraftEntries = useMemo(
    () => Object.values(sourceDrafts).sort((left, right) => left.relativePath.localeCompare(right.relativePath)),
    [sourceDrafts]
  );
  const dirtyDraftEntries = useMemo(
    () => openDraftEntries.filter((entry) => entry.content !== entry.baseContent),
    [openDraftEntries]
  );
  const dirtySourcePathSet = useMemo(() => new Set(dirtyDraftEntries.map((entry) => entry.relativePath)), [dirtyDraftEntries]);
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
  useEffect(() => {
    const mode = sessionModePresets.find((item) => item.id === initDefaults.sessionModeId) || sessionModePresets[0];
    setSelectedSessionAdapterId(initDefaults.adapterId);
    setSelectedSessionModeId(mode.id);
    setSessionPrompt(mode.prompt);
    setSelectedTaskPipeKind(initDefaults.taskPipeKind);
    setAutoDeferQuestions(initDefaults.autoDeferQuestions);
  }, [
    initDefaults.adapterId,
    initDefaults.autoDeferQuestions,
    initDefaults.sessionModeId,
    initDefaults.taskPipeKind
  ]);
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
  const accumulatedDataStats = useMemo(() => {
    const stores = accumulatedDataOverview?.stores || [];
    const visibleStores = stores.filter((store) => store.count > 0).length;
    const latestStore =
      stores
        .filter((store) => store.latestUpdatedAt)
        .sort((left, right) => Number(right.latestUpdatedAt) - Number(left.latestUpdatedAt))[0] || null;
    return {
      stores: stores.length,
      visibleStores,
      records: accumulatedDataOverview?.totalRecords || 0,
      bytes: accumulatedDataOverview?.totalBytes || 0,
      latestUpdatedAt: latestStore?.latestUpdatedAt || "",
      boundedScanMaxFiles: accumulatedDataOverview?.boundedScanMaxFiles || 0
    };
  }, [accumulatedDataOverview]);
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
  const sourceEditorProfile = useMemo(
    () => sourceEditorProfileForPath(sourceFile?.relativePath || selectedSourcePath || sourcePathInput),
    [selectedSourcePath, sourceFile?.relativePath, sourcePathInput]
  );
  const selectedSourceTemplate = sourceTemplateById[sourceTemplateId];
  const activeMonacoEditorOptions = useMemo<editor.IStandaloneEditorConstructionOptions>(
    () => ({
      ...monacoEditorOptions,
      minimap: { enabled: sourceMinimapEnabled },
      wordWrap: sourceWordWrap ? "on" : "off"
    }),
    [sourceMinimapEnabled, sourceWordWrap]
  );
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
      ...(accumulatedDataOverview
        ? [
            {
              id: "accumulated-data-overview",
              label: accumulatedDataOverview.status,
              title: "Accumulated Data",
              detail: `${accumulatedDataOverview.stores.length} stores / ${accumulatedDataOverview.totalRecords} records / ${formatBytes(accumulatedDataOverview.totalBytes)}`
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
  }, [accumulatedDataOverview, dirtyDraftEntries.length, openDraftEntries.length, outputEvents, payloadAudit, pipelineStats.latest, runtimeDataBoundary, selectedDecision, serviceReadiness, sourceDiff, sourceFile?.relativePath, sourceSaveResults, supportBundle, taskRunRecords, writeReport]);

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

  const refreshRuntimeSourceFiles = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setSourceCatalogReport(null);
      return;
    }

    setSourceCatalogBusy(true);
    setError("");
    try {
      const report = await tauriInvoke<WorkspaceTextFileListReport>("list_workspace_text_files", {
        filter: sourceFilter.trim() || null,
        limit: 240
      });
      setRuntimeSourceFiles(report.files);
      setSourceCatalogReport(report);
      const firstPath = report.files[0]?.path || "";
      if (!sourcePathInput && firstPath) {
        setSelectedSourcePath(firstPath);
        setSourcePathInput(firstPath);
      }
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setSourceCatalogBusy(false);
    }
  };

  const refreshDesktopWorkspace = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setDesktopWorkspace(null);
      return;
    }

    setWorkspaceHostBusy("refresh");
    setError("");
    try {
      const report = await tauriInvoke<DesktopWorkspaceStateReport>("get_desktop_workspace_state");
      setDesktopWorkspace(report);
      if (!workspaceImportPath && report.activeWorkspacePath) {
        setWorkspaceImportPath(report.activeWorkspacePath);
      }
      setWorkspaceHostNotice("");
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setWorkspaceHostBusy("");
    }
  };

  const chooseDesktopWorkspaceFolder = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setError(copy.noRuntime);
      return;
    }

    setWorkspaceHostBusy("choose");
    setError("");
    try {
      const report = await tauriInvoke<DesktopWorkspaceStateReport>("choose_desktop_workspace_folder");
      setDesktopWorkspace(report);
      if (report.activeWorkspacePath) {
        setWorkspaceImportPath(report.activeWorkspacePath);
      }
      setWorkspaceHostNotice(report.status === "folder_selection_canceled" ? copy.chooseCanceled : report.status);
      if (report.activeWorkspacePath) {
        await refreshRuntimeSourceFiles();
        void refreshServiceReadiness();
      }
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setWorkspaceHostBusy("");
    }
  };

  const importDesktopWorkspace = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setError(copy.noRuntime);
      return;
    }
    if (!workspaceImportPath.trim()) {
      setWorkspaceHostNotice("Workspace path is required");
      return;
    }

    setWorkspaceHostBusy("import");
    setError("");
    try {
      const report = await tauriInvoke<DesktopWorkspaceStateReport>("set_desktop_workspace_path", {
        path: workspaceImportPath.trim()
      });
      setDesktopWorkspace(report);
      setWorkspaceHostNotice(report.status);
      await refreshRuntimeSourceFiles();
      void refreshServiceReadiness();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setWorkspaceHostBusy("");
    }
  };

  const cloneDesktopWorkspace = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setError(copy.noRuntime);
      return;
    }
    if (!workspaceCloneUrl.trim()) {
      setWorkspaceHostNotice("Repository URL is required");
      return;
    }

    setWorkspaceHostBusy("clone");
    setError("");
    try {
      const report = await tauriInvoke<DesktopWorkspaceStateReport>("clone_desktop_workspace", {
        repositoryUrl: workspaceCloneUrl.trim(),
        folderName: workspaceCloneFolder.trim() || null
      });
      setDesktopWorkspace(report);
      setWorkspaceImportPath(report.activeWorkspacePath);
      setWorkspaceHostNotice(report.status);
      await refreshRuntimeSourceFiles();
      void refreshServiceReadiness();
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setWorkspaceHostBusy("");
    }
  };

  const refreshAccumulatedDataOverview = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setAccumulatedDataOverview(null);
      return;
    }

    setAccumulatedDataBusy(true);
    setError("");
    try {
      const report = await tauriInvoke<AccumulatedDataOverviewReport>("get_accumulated_data_overview");
      setAccumulatedDataOverview(report);
      setAccumulatedDataNotice(
        `${report.status}: ${report.totalRecords} records / ${formatBytes(report.totalBytes)}`
      );
    } catch (caught) {
      setError(errorMessage(caught));
    } finally {
      setAccumulatedDataBusy(false);
    }
  };

  const refreshAdapters = async () => {
    setError("");
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setRuntimeState("unavailable");
      setHealth(null);
      setAdapters(fallbackDesktopAdapters);
      setDesktopWorkspace(null);
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
        nextAccumulatedDataOverview,
        nextServiceReadiness,
        nextDesktopWorkspace
      ] = await Promise.all([
        tauriInvoke<DesktopHealthStatus>("app_health"),
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions"),
        tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox"),
        tauriInvoke<CliTaskPipelinePresetReport[]>("list_cli_task_pipeline_presets"),
        tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records"),
        tauriInvoke<RuntimeDataBoundaryReport>("list_runtime_data_roots"),
        tauriInvoke<AccumulatedDataOverviewReport>("get_accumulated_data_overview"),
        tauriInvoke<ServiceReadinessReport>("get_service_readiness_report"),
        tauriInvoke<DesktopWorkspaceStateReport>("get_desktop_workspace_state")
      ]);
      if (!panelMountedRef.current) {
        return;
      }
      setRuntimeState("available");
      setHealth(nextHealth);
      setAdapters(nextAdapters);
      setSessions((current) => mergeSessionReports(current, nextSessions, { replaceAll: true }));
      setInboxReport(nextInbox);
      setTaskPipePresets(nextTaskPipePresets.length ? nextTaskPipePresets : fallbackTaskPipePresets);
      replaceTaskRunRecords(nextTaskRunRecords);
      setRuntimeDataBoundary(nextRuntimeDataBoundary);
      setAccumulatedDataOverview(nextAccumulatedDataOverview);
      setAccumulatedDataNotice("");
      setServiceReadiness(nextServiceReadiness);
      setServiceReadinessNotice("");
      setDesktopWorkspace(nextDesktopWorkspace);
      setWorkspaceImportPath(nextDesktopWorkspace.activeWorkspacePath);
      setWorkspaceHostNotice("");
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
      void refreshRuntimeSourceFiles();
    } catch (caught) {
      if (!panelMountedRef.current) {
        return;
      }
      setRuntimeState("unavailable");
      setHealth(null);
      setAdapters(fallbackDesktopAdapters);
      setSessions((current) => (current.length ? [] : current));
      setTaskPipePresets(fallbackTaskPipePresets);
      replaceTaskRunRecords([]);
      setRuntimeDataBoundary(null);
      setAccumulatedDataOverview(null);
      setAccumulatedDataNotice("");
      setPayloadAudit(null);
      setSupportBundle(null);
      setServiceReadiness(null);
      setServiceReadinessNotice("");
      setDesktopWorkspace(null);
      setWorkspaceHostNotice("");
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
      const [nextAdapters, nextSessions, nextInbox, nextTaskRunRecords, nextAccumulatedDataOverview] = await Promise.all([
        tauriInvoke<CliAdapterStatus[]>("list_cli_adapters"),
        tauriInvoke<CliSessionReport[]>("list_cli_adapter_sessions"),
        tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox"),
        tauriInvoke<CliTaskRunRecordReport[]>("list_cli_task_run_records"),
        tauriInvoke<AccumulatedDataOverviewReport>("get_accumulated_data_overview")
      ]);
      setAdapters(nextAdapters);
      setSessions((current) => mergeSessionReports(current, nextSessions, { replaceAll: true }));
      setInboxReport(nextInbox);
      replaceTaskRunRecords(nextTaskRunRecords);
      setAccumulatedDataOverview(nextAccumulatedDataOverview);
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

  const refreshDecisionInbox = async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setInboxReport(null);
      return;
    }

    try {
      const report = await tauriInvoke<HumanDecisionInboxReport>("list_human_decision_inbox");
      setInboxReport(report);
      void refreshAccumulatedDataOverview();
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
      void refreshAccumulatedDataOverview();
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
      void refreshAccumulatedDataOverview();
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
      void refreshAccumulatedDataOverview();
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
      void refreshAccumulatedDataOverview();
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
      void refreshAccumulatedDataOverview();
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
    setTerminalDrawerOpen(true);
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
    setTerminalDrawerOpen(true);
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
      setSourceCopyNotice("");
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
    setSourceCopyNotice("");
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
    setSourceCopyNotice("");
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

  const handleSourceEditorMount = (editorInstance: editor.IStandaloneCodeEditor) => {
    sourceEditorRef.current = editorInstance;
  };

  const runSourceEditorCommand = async (command: "undo" | "redo" | "find" | "replace" | "format") => {
    const editorInstance = sourceEditorRef.current;
    if (!sourceFile || !editorInstance) {
      setSourceCopyNotice("Open a source file before running editor commands");
      return;
    }

    if (command === "undo" || command === "redo") {
      editorInstance.trigger("platform-source-toolbar", command, null);
      updateSourceDraft(editorInstance.getValue());
      editorInstance.focus();
      return;
    }

    const actionId =
      command === "find"
        ? "actions.find"
        : command === "replace"
          ? "editor.action.startFindReplaceAction"
          : "editor.action.formatDocument";
    const action = editorInstance.getAction(actionId);
    if (!action) {
      setSourceCopyNotice(`${command} is unavailable for this file`);
      editorInstance.focus();
      return;
    }
    await action.run();
    if (command === "format") {
      updateSourceDraft(editorInstance.getValue());
    }
    editorInstance.focus();
  };

  const insertSourceTemplate = () => {
    if (!sourceFile) {
      return;
    }

    const templateBody = renderSourceTemplate(selectedSourceTemplate, sourceFile.relativePath);
    const editorInstance = sourceEditorRef.current;
    const selection = editorInstance?.getSelection() || null;
    if (editorInstance && selection) {
      editorInstance.executeEdits("platform-source-template", [
        {
          range: selection,
          text: templateBody,
          forceMoveMarkers: true
        }
      ]);
      updateSourceDraft(editorInstance.getValue());
      editorInstance.focus();
      setSourceCopyNotice(`${selectedSourceTemplate.label} inserted`);
      return;
    }

    updateSourceDraft(appendSourceTemplate(sourceDraft, templateBody));
    setSourceCopyNotice(`${selectedSourceTemplate.label} inserted`);
  };

  const copySourcePatchContext = async () => {
    if (!sourceFile) {
      return;
    }

    const diffLine = sourceDiff
      ? `+${sourceDiff.addedLines} / -${sourceDiff.removedLines} / ${sourceDiff.changedLines} changed`
      : "not computed";
    const context = [
      "Platform Source Patch Context",
      `Path: ${sourceFile.relativePath}`,
      `Profile: ${sourceEditorProfile.label}`,
      `Template: ${selectedSourceTemplate.label}`,
      `Dirty: ${currentSourceDirty ? "yes" : "no"}`,
      `Diff: ${diffLine}`,
      "Gate: workspace-scoped backup on save",
      "",
      "--- draft ---",
      sourceDraft
    ].join("\n");
    const copied = await writeClipboardText(context);
    setSourceCopyNotice(copied ? `${sourceFile.relativePath} patch context copied` : "Clipboard unavailable");
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
      setSourceCopyNotice("");
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
        setSourceCopyNotice("");
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

  const closeDraftByPath = (relativePath: string) => {
    const currentPath = relativePath.trim();
    if (!currentPath) {
      return;
    }
    const closingActiveDraft = sourceFile?.relativePath === currentPath;
    const nextEntry = openDraftEntries.find((entry) => entry.relativePath !== currentPath) || null;
    setSourceDrafts((current) => {
      const next = { ...current };
      delete next[currentPath];
      return next;
    });
    if (!closingActiveDraft) {
      return;
    }
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
      setSourceCopyNotice("");
      setWriteReport(null);
    }
  };

  const closeCurrentDraft = () => {
    if (!sourceFile) {
      return;
    }
    closeDraftByPath(sourceFile.relativePath);
  };

  const copyCurrentSourceDraft = async () => {
    if (!sourceFile) {
      return;
    }
    const copied = await writeClipboardText(sourceDraft);
    setSourceCopyNotice(copied ? `${sourceFile.relativePath} copied` : "Clipboard unavailable");
  };

  useEffect(() => {
    setSourceTemplateId(sourceEditorProfile.templateId);
  }, [sourceEditorProfile.templateId, sourceFile?.relativePath]);

  useEffect(() => {
    panelMountedRef.current = true;
    return () => {
      panelMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isFileWorkspaceSurface) {
      void refreshDesktopWorkspace();
      void refreshRuntimeSourceFiles();
      return;
    }
    void refreshAdapters();
  }, [isFileWorkspaceSurface]);

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

  const sourceWorkspacePanel = (
    <div className={`content-grid native-file-workspace-panel filesystem-workbench ${invoke ? "runtime-ready" : "runtime-fallback"}`}>
      <section className="native-file-hero">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{copy.description}</p>
        </div>
        <div className="native-workspace-actions">
          <button type="button" onClick={chooseDesktopWorkspaceFolder} disabled={!invoke || workspaceHostBusy !== ""}>
            <FolderOpen size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "choose" ? copy.choosingFolder : copy.chooseFolder}</span>
          </button>
          <button type="button" onClick={refreshDesktopWorkspace} disabled={!invoke || workspaceHostBusy !== ""}>
            <Activity size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "refresh" ? copy.loading : copy.refreshWorkspace}</span>
          </button>
          <button type="button" onClick={refreshRuntimeSourceFiles} disabled={!invoke || sourceCatalogBusy}>
            <Search size={16} aria-hidden="true" />
            <span>{sourceCatalogBusy ? copy.loading : copy.refreshFiles}</span>
          </button>
        </div>
      </section>

      {!invoke && <p className="desktop-error">{copy.noRuntime}</p>}
      {workspaceHostNotice && <p className="decision-resume-notice">{workspaceHostNotice}</p>}

      <section className="filesystem-workbench-shell" aria-label={copy.eyebrow}>
        <aside className="workspace-explorer-pane" aria-label={copy.fileTree}>
          <header className="workspace-explorer-header">
            <div>
              <p className="eyebrow">{copy.eyebrow}</p>
              <h2>{workspaceExplorerRootLabel}</h2>
            </div>
            <span>{sourceCatalogLabel}</span>
          </header>

          <button type="button" className="workspace-dropzone" onClick={chooseDesktopWorkspaceFolder} disabled={!invoke || workspaceHostBusy !== ""}>
            <FolderOpen size={18} aria-hidden="true" />
            <strong>{workspaceHostBusy === "choose" ? copy.choosingFolder : copy.uploadDropzone}</strong>
            <span>{copy.uploadDropzoneDetail}</span>
          </button>

          <div className="workspace-explorer-actions">
            <button type="button" onClick={chooseDesktopWorkspaceFolder} disabled={!invoke || workspaceHostBusy !== ""}>
              <FolderOpen size={15} aria-hidden="true" />
              <span>{copy.chooseFolder}</span>
            </button>
            <button type="button" onClick={refreshDesktopWorkspace} disabled={!invoke || workspaceHostBusy !== ""}>
              <Activity size={15} aria-hidden="true" />
              <span>{workspaceHostBusy === "refresh" ? copy.loading : copy.refreshWorkspace}</span>
            </button>
            <button type="button" onClick={refreshRuntimeSourceFiles} disabled={!invoke || sourceCatalogBusy}>
              <Search size={15} aria-hidden="true" />
              <span>{sourceCatalogBusy ? copy.loading : copy.refreshFiles}</span>
            </button>
          </div>

          <div className="workspace-explorer-state" aria-label={copy.workspaceState}>
            <article>
              <span>{copy.activeWorkspace}</span>
              <code>{desktopWorkspace?.activeWorkspacePath || desktopWorkspace?.fallbackWorkspacePath || "workspace pending"}</code>
            </article>
            <article>
              <span>{copy.folderSource}</span>
              <strong>{desktopWorkspace?.activeWorkspaceSource || (runtimeSourceFiles.length ? copy.runtimeSource : copy.fallbackSource)}</strong>
            </article>
          </div>

          <label className="workspace-explorer-search">
            <span>{copy.fileSearch}</span>
            <input
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
              placeholder={copy.fileSearch}
            />
          </label>

          <div className="workspace-explorer-meta">
            <span>{filteredEditableSourceFiles.length.toLocaleString("ko-KR")} files</span>
            <span>{workspaceExplorerFolderCount.toLocaleString("ko-KR")} folders</span>
            <span>{dirtyDraftEntries.length.toLocaleString("ko-KR")} {copy.dirty}</span>
          </div>

          {sourceCatalogReport && (
            <p className="source-catalog-note">
              {sourceCatalogReport.returnedCount}/{sourceCatalogReport.totalCount} files
              {sourceCatalogReport.truncated ? " / truncated" : ""}
            </p>
          )}

          <div className="workspace-explorer-tree" role="tree" aria-label={copy.fileTree}>
            {workspaceExplorerTree.length ? (
              workspaceExplorerTree.map((directory) => (
                <WorkspaceExplorerDirectoryView
                  key={directory.path}
                  directory={directory}
                  level={0}
                  activePath={sourceFile?.relativePath || selectedSourcePath}
                  dirtyPaths={dirtySourcePathSet}
                  editorBusy={editorBusy}
                  runtimeAvailable={Boolean(invoke)}
                  onOpenFile={openDraftOrLoad}
                />
              ))
            ) : (
              <div className="workspace-empty-tree">
                <FolderOpen size={18} aria-hidden="true" />
                <strong>{copy.chooseFolder}</strong>
                <span>{copy.noFiles}</span>
                <small>{copy.explorerHint}</small>
              </div>
            )}
          </div>

          <p className="workspace-explorer-hint">{copy.explorerHint}</p>
        </aside>

        <div className="filesystem-editor-pane">

      <section className="native-workspace-state-strip" aria-label={copy.workspaceState}>
        <article>
          <span>{copy.activeWorkspace}</span>
          <code>{desktopWorkspace?.activeWorkspacePath || desktopWorkspace?.fallbackWorkspacePath || "workspace pending"}</code>
        </article>
        <article>
          <span>{copy.folderSource}</span>
          <strong>{desktopWorkspace?.activeWorkspaceSource || (runtimeSourceFiles.length ? copy.runtimeSource : copy.fallbackSource)}</strong>
        </article>
        <article>
          <span>{copy.fileList}</span>
          <strong>
            {filteredEditableSourceFiles.length.toLocaleString("ko-KR")} / {sourceCatalogReport?.totalCount ?? sourceCatalogFiles.length}
          </strong>
        </article>
        <article>
          <span>{copy.openedDrafts}</span>
          <strong>
            {dirtyDraftEntries.length.toLocaleString("ko-KR")} {copy.dirty} / {openDraftEntries.length.toLocaleString("ko-KR")} open
          </strong>
        </article>
      </section>

      <section className="panel wide desktop-source-panel native-source-workbench">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{copy.runtimeSource}</p>
            <h2>{copy.title}</h2>
            <p>{copy.description}</p>
          </div>
          <div className="source-panel-stats">
            <span>{openDraftEntries.length} open</span>
            <strong>{dirtyDraftEntries.length} {copy.dirty}</strong>
            <span>{sourceCatalogLabel}</span>
          </div>
        </div>
        <div className="source-editor-controls native-source-controls">
          <label className="source-path-field">
            <span>{copy.openSelected}</span>
            <input
              value={sourcePathInput}
              onChange={(event) => {
                setSourcePathInput(event.target.value);
                setSelectedSourcePath(event.target.value);
              }}
              placeholder="workspace-relative/path.ts"
            />
          </label>
          <label>
            <span>{copy.fileList}</span>
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
            <span>{editorBusy ? copy.loading : copy.openSelected}</span>
          </button>
          <button type="button" onClick={saveSourceFile} disabled={!invoke || editorBusy || !sourceFile || !currentSourceDirty}>
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>{editorBusy ? copy.saving : copy.saveCurrent}</span>
          </button>
          <button type="button" onClick={saveAllSourceDrafts} disabled={!invoke || editorBusy || saveAllBusy || dirtyDraftEntries.length === 0}>
            <CheckCircle2 size={15} aria-hidden="true" />
            <span>{saveAllBusy ? copy.saving : copy.saveAll}</span>
          </button>
          <button type="button" onClick={copyCurrentSourceDraft} disabled={!sourceFile}>
            <Copy size={15} aria-hidden="true" />
            <span>{copy.copyFile}</span>
          </button>
        </div>

        <div className="source-command-toolbar" aria-label={copy.editorSettings}>
          <button type="button" onClick={() => runSourceEditorCommand("undo")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <History size={15} aria-hidden="true" />
            <span>Undo</span>
          </button>
          <button type="button" onClick={() => runSourceEditorCommand("redo")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <History size={15} aria-hidden="true" />
            <span>Redo</span>
          </button>
          <button type="button" onClick={() => runSourceEditorCommand("find")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <Search size={15} aria-hidden="true" />
            <span>Find</span>
          </button>
          <button type="button" onClick={() => runSourceEditorCommand("replace")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <Search size={15} aria-hidden="true" />
            <span>Replace</span>
          </button>
          <button type="button" onClick={() => runSourceEditorCommand("format")} disabled={!sourceFile || sourceEditorViewMode === "diff"}>
            <Code2 size={15} aria-hidden="true" />
            <span>Format</span>
          </button>
          <button type="button" onClick={() => setSourceEditorViewMode((current) => (current === "edit" ? "diff" : "edit"))} disabled={!sourceFile}>
            <FileSearch size={15} aria-hidden="true" />
            <span>{sourceEditorViewMode === "edit" ? copy.diffMode : copy.editMode}</span>
          </button>
          <button type="button" onClick={() => setSourceWordWrap((current) => !current)} className={sourceWordWrap ? "active" : ""}>
            <Code2 size={15} aria-hidden="true" />
            <span>{copy.wordWrap}</span>
          </button>
          <button type="button" onClick={() => setSourceMinimapEnabled((current) => !current)} className={sourceMinimapEnabled ? "active" : ""}>
            <LayoutDashboard size={15} aria-hidden="true" />
            <span>{copy.minimap}</span>
          </button>
        </div>

        <div className="source-review-grid native-source-grid">
          <aside className="source-file-browser">
            <header>
              <div>
                <span>{runtimeSourceFiles.length ? copy.runtimeSource : copy.fallbackSource}</span>
                <strong>{filteredEditableSourceFiles.length.toLocaleString("ko-KR")} shown</strong>
              </div>
              <Code2 size={16} aria-hidden="true" />
            </header>
            {sourceCatalogReport && (
              <p className="source-catalog-note">
                {sourceCatalogReport.returnedCount}/{sourceCatalogReport.totalCount} files
                {sourceCatalogReport.truncated ? " / truncated" : ""}
              </p>
            )}
            <input
              value={sourceFilter}
              onChange={(event) => setSourceFilter(event.target.value)}
              placeholder={copy.fileSearch}
            />
            <div className="source-file-browser-list">
              {filteredEditableSourceFiles.length ? (
                filteredEditableSourceFiles.map((file) => (
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
                ))
              ) : (
                <p className="empty-state">{copy.noFiles}</p>
              )}
            </div>
          </aside>

          <div className="source-edit-workbench">
            {openDraftEntries.length > 0 && (
              <div className="source-editor-tabs" aria-label={copy.openedDrafts}>
                {openDraftEntries.map((entry) => {
                  const dirty = entry.content !== entry.baseContent;
                  return (
                    <div
                      key={entry.relativePath}
                      className={`source-editor-tab ${sourceFile?.relativePath === entry.relativePath ? "active" : ""} ${dirty ? "dirty" : "clean"}`}
                    >
                      <button type="button" className="source-editor-tab-main" onClick={() => selectDraftEntry(entry.relativePath)}>
                        <span>{dirty ? copy.dirty : copy.clean}</span>
                        <strong>{entry.relativePath}</strong>
                      </button>
                      <button
                        type="button"
                        className="source-editor-tab-close"
                        onClick={() => closeDraftByPath(entry.relativePath)}
                        aria-label={`Close ${entry.relativePath}`}
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

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
                        <span>{sourceDiff.dirty ? copy.dirty : copy.clean}</span>
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
                {sourceEditorViewMode === "diff" ? (
                  <div className="monaco-editor-shell diff-shell">
                    <MonacoDiffEditor
                      beforeMount={definePlatformMonacoTheme}
                      height="100%"
                      language={monacoLanguageFromPath(sourceFile.relativePath)}
                      loading={<div className="monaco-editor-loading">Loading Monaco diff</div>}
                      modified={sourceDraft}
                      options={monacoDiffEditorOptions}
                      original={sourceFile.content}
                      theme={platformMonacoTheme}
                    />
                  </div>
                ) : (
                  <div className="monaco-editor-shell">
                    <MonacoEditor
                      beforeMount={definePlatformMonacoTheme}
                      height="100%"
                      language={monacoLanguageFromPath(sourceFile.relativePath)}
                      loading={<div className="monaco-editor-loading">Loading Monaco editor</div>}
                      onMount={handleSourceEditorMount}
                      onChange={(value) => updateSourceDraft(value ?? "")}
                      options={activeMonacoEditorOptions}
                      path={`file:///${sourceFile.relativePath.replace(/^\/+/, "")}`}
                      theme={platformMonacoTheme}
                      value={sourceDraft}
                    />
                  </div>
                )}
                {sourceCopyNotice && <p className="source-copy-notice">{sourceCopyNotice}</p>}
                {writeReport && (
                  <p className="desktop-success">
                    {copy.savedWithBackup}: {writeReport.backupPath}
                  </p>
                )}
              </div>
            ) : (
              <p className="empty-state">{copy.noFileOpen}</p>
            )}

            {sourceSaveResults.length > 0 && (
              <div className="source-save-results">
                <header>
                  <div>
                    <span>{copy.savedWithBackup}</span>
                    <strong>{sourceSaveResults.length} recent</strong>
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
      </section>
    </div>
  );

  if (isFileWorkspaceSurface) {
    return sourceWorkspacePanel;
  }

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

      <section className="panel wide quick-start-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Quick Start</p>
            <h2>{uiLanguage === "ko" ? "바로 쓰기" : "Start now"}</h2>
          </div>
          <span className="result-count">{selectedMode.label}</span>
        </div>
        <div className="quick-start-flow">
          <button type="button" onClick={chooseDesktopWorkspaceFolder} disabled={!invoke || workspaceHostBusy !== ""}>
            <FolderOpen size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "작업 폴더 선택" : "Choose workspace"}</span>
            <small>{desktopWorkspace?.activeWorkspacePath || "native folder picker"}</small>
          </button>
          <button type="button" onClick={runAllHealthChecks} disabled={!invoke || runningAdapterId !== ""}>
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "CLI 자동 확인" : "Check CLIs"}</span>
            <small>{availableCount} / {adapters.length} ready</small>
          </button>
          <button type="button" onClick={() => setTerminalDrawerOpen(true)}>
            <SquareTerminal size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "바로 하단 터미널 열기" : "Open terminal drawer"}</span>
            <small>{terminalDrawerOpen ? "open" : "bottom panel"}</small>
          </button>
          <button
            type="button"
            onClick={startSession}
            disabled={!invoke || runningAdapterId !== "" || !adapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId && adapter.available)}
          >
            <PlayCircle size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "선택 lane 시작" : "Start selected lane"}</span>
            <small>{adapters.find((adapter) => adapter.adapterId === selectedSessionAdapterId)?.label || selectedSessionAdapterId}</small>
          </button>
        </div>
      </section>

      <section className="metrics-band">
        <Metric label="Guest Adapters" value={adapters.length} icon={Network} tone="green" />
        <Metric label="Available" value={availableCount} icon={CheckCircle2} tone="blue" />
        <Metric label="Task Pipes" value={pipelineReports.length} icon={GitBranch} tone="rose" />
        <Metric label="Task Runs" value={taskRunRecords.length} icon={FileSearch} tone="blue" />
        <Metric label="Accumulated" value={accumulatedDataStats.records} icon={Database} tone="slate" />
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
          <button type="button" onClick={refreshAccumulatedDataOverview} disabled={!invoke || accumulatedDataBusy}>
            <Database size={16} aria-hidden="true" />
            <span>Accumulated data</span>
            <small>{accumulatedDataStats.records} records</small>
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
          <button type="button" onClick={refreshDesktopWorkspace} disabled={!invoke || workspaceHostBusy !== ""}>
            <FolderKanban size={16} aria-hidden="true" />
            <span>Workspace host</span>
            <small>{desktopWorkspace?.status || "not loaded"}</small>
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

      <section className="panel wide desktop-workspace-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Workspace Host</p>
            <h2>앱 워크스페이스</h2>
          </div>
          <div className="desktop-actions">
            <button type="button" onClick={chooseDesktopWorkspaceFolder} disabled={!invoke || workspaceHostBusy !== ""}>
              <FolderOpen size={16} aria-hidden="true" />
              <span>{workspaceHostBusy === "choose" ? "폴더 여는 중" : "폴더 선택"}</span>
            </button>
            <button type="button" onClick={refreshDesktopWorkspace} disabled={!invoke || workspaceHostBusy !== ""}>
              <Activity size={16} aria-hidden="true" />
              <span>{workspaceHostBusy === "refresh" ? "Refreshing" : "Refresh"}</span>
            </button>
          </div>
        </div>
        {workspaceHostNotice && <p className="decision-resume-notice">{workspaceHostNotice}</p>}

        <div className="task-run-summary-strip">
          <article>
            <span>status</span>
            <strong>{desktopWorkspace?.status || "not-loaded"}</strong>
          </article>
          <article>
            <span>source</span>
            <strong>{desktopWorkspace?.activeWorkspaceSource || "pending"}</strong>
          </article>
          <article>
            <span>git</span>
            <strong>{desktopWorkspace?.gitAvailable ? "available" : "missing"}</strong>
          </article>
          <article>
            <span>operation</span>
            <strong>{desktopWorkspace?.lastOperation || "none"}</strong>
          </article>
          <article>
            <span>last status</span>
            <strong>{desktopWorkspace?.lastStatus || "unset"}</strong>
          </article>
        </div>

        <div className="task-pipe-layout">
          <div className="task-pipe-controls">
            <label>
              <span>Import path</span>
              <input
                value={workspaceImportPath}
                onChange={(event) => setWorkspaceImportPath(event.target.value)}
                placeholder="/absolute/workspace/path"
              />
            </label>
            <button type="button" onClick={importDesktopWorkspace} disabled={!invoke || workspaceHostBusy !== "" || !workspaceImportPath.trim()}>
              <FolderOpen size={16} aria-hidden="true" />
              <span>{workspaceHostBusy === "import" ? "Importing" : "Import Workspace"}</span>
            </button>
            <label>
              <span>Repository URL</span>
              <input
                value={workspaceCloneUrl}
                onChange={(event) => setWorkspaceCloneUrl(event.target.value)}
                placeholder="https://github.com/org/repo.git"
              />
            </label>
            <label>
              <span>Folder name</span>
              <input
                value={workspaceCloneFolder}
                onChange={(event) => setWorkspaceCloneFolder(event.target.value)}
                placeholder="managed-workspace"
              />
            </label>
            <button type="button" onClick={cloneDesktopWorkspace} disabled={!invoke || workspaceHostBusy !== "" || !workspaceCloneUrl.trim()}>
              <GitBranch size={16} aria-hidden="true" />
              <span>{workspaceHostBusy === "clone" ? "Cloning" : "Clone Workspace"}</span>
            </button>
          </div>

          <div className="task-pipe-summary">
            <article>
              <span>active workspace</span>
              <code>{desktopWorkspace?.activeWorkspacePath || "runtime workspace pending"}</code>
            </article>
            <article>
              <span>managed root</span>
              <code>{desktopWorkspace?.managedWorkspaceRoot || "app data workspace root pending"}</code>
            </article>
            <article>
              <span>state file</span>
              <code>{desktopWorkspace?.statePath || "workspace state pending"}</code>
            </article>
            <article>
              <span>git version</span>
              <strong>{desktopWorkspace?.gitVersion || "not checked"}</strong>
            </article>
          </div>
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
            <div className="settings-controlled-summary">
              <article>
                <span>Pipe preset</span>
                <strong>{selectedTaskPipe.label}</strong>
              </article>
              <article>
                <span>Question handling</span>
                <strong>{autoDeferQuestions ? "auto-defer" : "manual"}</strong>
              </article>
              <button type="button" onClick={onOpenSettings}>
                <Settings size={15} aria-hidden="true" />
                <span>초기화 설정 변경</span>
              </button>
            </div>
            <label className="session-prompt-field">
              <span>Task intake</span>
              <textarea value={taskPipePrompt} onChange={(event) => setTaskPipePrompt(event.target.value)} rows={4} />
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

      <section className="panel wide accumulated-data-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Accumulated Data</p>
            <h2>축적 데이터 인덱스</h2>
          </div>
          <div className="desktop-actions">
            <button type="button" onClick={refreshAccumulatedDataOverview} disabled={!invoke || accumulatedDataBusy}>
              <Database size={15} aria-hidden="true" />
              <span>{accumulatedDataBusy ? "Refreshing" : "Refresh Index"}</span>
            </button>
          </div>
        </div>
        {accumulatedDataNotice && <p className="decision-resume-notice">{accumulatedDataNotice}</p>}
        <div className="task-run-summary-strip">
          <article>
            <span>stores</span>
            <strong>{accumulatedDataStats.visibleStores}/{accumulatedDataStats.stores}</strong>
          </article>
          <article>
            <span>records</span>
            <strong>{accumulatedDataStats.records}</strong>
          </article>
          <article>
            <span>total size</span>
            <strong>{formatBytes(accumulatedDataStats.bytes)}</strong>
          </article>
          <article>
            <span>latest</span>
            <strong>{accumulatedDataStats.latestUpdatedAt ? formatTimeLabel(accumulatedDataStats.latestUpdatedAt) : "idle"}</strong>
          </article>
          <article>
            <span>scan cap</span>
            <strong>{accumulatedDataStats.boundedScanMaxFiles || "n/a"}</strong>
          </article>
          <article>
            <span>format</span>
            <strong>{accumulatedDataOverview?.schemaVersion || "pending"}</strong>
          </article>
        </div>

        <div className="accumulated-data-layout">
          <div className="accumulated-store-grid">
            {(accumulatedDataOverview?.stores || []).map((store) => (
              <article key={store.id} className={`accumulated-store-card status-${store.status}`}>
                <header>
                  <div>
                    <span>{store.recordType}</span>
                    <h3>{store.label}</h3>
                  </div>
                  <strong>{store.status}</strong>
                </header>
                <div className="accumulated-store-stats">
                  <span>{store.count} records</span>
                  <span>{formatBytes(store.sizeBytes)}</span>
                  <span>{store.latestUpdatedAt ? formatTimeLabel(store.latestUpdatedAt) : "idle"}</span>
                </div>
                <p>{store.purpose}</p>
                <PathDisclosure label="세부 경로" value={store.path} />
                <div className="adapter-report">
                  <span>{store.plane}</span>
                  <span>{store.visibility}</span>
                  <span>{store.actionLabel}</span>
                </div>
              </article>
            ))}
            {!accumulatedDataOverview && (
              <p className="empty-state">누적 데이터 인덱스가 아직 로드되지 않았습니다.</p>
            )}
          </div>

          <article className="accumulated-data-map">
            <header>
              <div>
                <span>{accumulatedDataOverview?.status || "not loaded"}</span>
                <h3>User-visible data map</h3>
              </div>
              <Database size={18} aria-hidden="true" />
            </header>
            <div className="accumulated-summary-list">
              {(accumulatedDataOverview?.summary || [
                "Run the index to load task runs, decisions, audits, support bundles, and agent workspace records."
              ]).map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
            <div className="task-run-detail-meta">
              <span>{accumulatedDataOverview ? formatTimeLabel(accumulatedDataOverview.generatedAt) : "idle"}</span>
              <span>{accumulatedDataOverview?.status || "not-loaded"}</span>
              <span>{accumulatedDataOverview?.formatMigrationStatus || "manifest-pending"}</span>
            </div>
            <PathDisclosure
              label="인덱스 저장 위치"
              value={accumulatedDataOverview?.indexPath || runtimeDataBoundary?.taskRunStorePath || "runtime data root pending"}
            />
            {accumulatedDataOverview && (
              <div className="adapter-report">
                <span>{accumulatedDataOverview.schemaVersion}</span>
                <span>{accumulatedDataOverview.storageFormatVersion}</span>
              </div>
            )}
          </article>
        </div>
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
                <PathDisclosure label="세부 경로" value={root.path} />
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
            <PathDisclosure label="감사 리포트 경로" value={payloadAudit?.auditPath || "No audit report yet"} />
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
              <PathDisclosure label="Manifest" value={supportBundle?.manifestPath || "No manifest yet"} />
              <PathDisclosure label="Runtime roots" value={supportBundle?.runtimeRootsPath || "No runtime roots export"} />
              <PathDisclosure label="Payload audit" value={supportBundle?.installerPayloadAuditPath || "No payload audit export"} />
              <PathDisclosure label="Task run summary" value={supportBundle?.taskRunSummaryPath || "No task-run summary"} />
              <PathDisclosure label="Recent events" value={supportBundle?.recentEventsPath || "No recent events log"} />
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

      {!terminalDrawerOpen && (
        <button type="button" className="terminal-drawer-launcher" onClick={() => setTerminalDrawerOpen(true)}>
          <SquareTerminal size={16} aria-hidden="true" />
          <span>{uiLanguage === "ko" ? "터미널" : "Terminal"}</span>
          <strong>{sessions.length}</strong>
        </button>
      )}

      <section className={`panel wide cli-session-panel terminal-drawer ${terminalDrawerOpen ? "open" : "closed"}`} aria-label={uiLanguage === "ko" ? "하단 다중 CLI 터미널" : "Bottom multi-CLI terminal"}>
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Run Board</p>
            <h2>{uiLanguage === "ko" ? "하단 다중 CLI 터미널" : "Bottom multi-CLI terminal"}</h2>
          </div>
          <div className="desktop-actions">
            <span className="result-count">{sessions.length} sessions</span>
            <button type="button" onClick={() => setTerminalDrawerOpen(false)} title={uiLanguage === "ko" ? "터미널 접기" : "Collapse terminal"}>
              <X size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "접기" : "Collapse"}</span>
            </button>
          </div>
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
          <div className="settings-controlled-summary session-init-summary">
            <article>
              <span>Adapter</span>
              <strong>{adapters.find((adapter) => adapter.adapterId === selectedSessionAdapterId)?.label || selectedSessionAdapterId}</strong>
            </article>
            <article>
              <span>Mode</span>
              <strong>{selectedMode.label}</strong>
            </article>
            <article>
              <span>Questions</span>
              <strong>{autoDeferQuestions ? "auto-defer" : "manual"}</strong>
            </article>
            <button type="button" onClick={onOpenSettings}>
              <Settings size={15} aria-hidden="true" />
              <span>초기화 설정 변경</span>
            </button>
          </div>
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

async function writeClipboardText(value: string) {
  if (!value) {
    return false;
  }
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
    // Fall back to a temporary textarea when browser clipboard permissions are unavailable.
  }

  try {
    if (typeof document === "undefined") {
      return false;
    }
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "true");
    field.style.position = "fixed";
    field.style.left = "-9999px";
    field.style.top = "0";
    document.body.appendChild(field);
    field.focus();
    field.select();
    field.setSelectionRange(0, value.length);
    const copied = document.execCommand("copy");
    document.body.removeChild(field);
    return copied;
  } catch {
    return false;
  }
}

function monacoLanguageFromPath(relativePath: string) {
  const extension = relativePath.split(".").pop()?.toLowerCase() || "";
  const languageByExtension: Record<string, string> = {
    c: "c",
    cc: "cpp",
    cpp: "cpp",
    cs: "csharp",
    css: "css",
    go: "go",
    h: "cpp",
    hpp: "cpp",
    html: "html",
    java: "java",
    js: "javascript",
    jsx: "javascript",
    json: "json",
    jsonc: "json",
    kt: "kotlin",
    md: "markdown",
    mjs: "javascript",
    py: "python",
    rs: "rust",
    scss: "scss",
    sh: "shell",
    sql: "sql",
    ts: "typescript",
    tsx: "typescript",
    toml: "toml",
    txt: "plaintext",
    yaml: "yaml",
    yml: "yaml"
  };
  return languageByExtension[extension] || "plaintext";
}

function buildWorkspaceExplorerTree(files: WorkspaceSourceFile[]) {
  const root: WorkspaceExplorerDirectory = {
    name: "",
    path: "",
    files: [],
    children: []
  };

  const ensureChild = (parent: WorkspaceExplorerDirectory, name: string, path: string) => {
    let child = parent.children.find((item) => item.name === name);
    if (!child) {
      child = { name, path, files: [], children: [] };
      parent.children.push(child);
    }
    return child;
  };

  files.forEach((file) => {
    const parts = file.path.split("/").filter(Boolean);
    const fileName = parts.pop();
    if (!fileName || parts.length === 0) {
      root.files.push(file);
      return;
    }

    let current = root;
    let currentPath = "";
    parts.forEach((part) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      current = ensureChild(current, part, currentPath);
    });
    current.files.push(file);
  });

  sortWorkspaceExplorerDirectory(root);

  if (root.files.length > 0) {
    return [
      {
        name: "root files",
        path: "__root-files",
        files: root.files,
        children: []
      },
      ...root.children
    ];
  }

  return root.children;
}

function sortWorkspaceExplorerDirectory(directory: WorkspaceExplorerDirectory) {
  directory.children.sort((left, right) => left.name.localeCompare(right.name));
  directory.files.sort((left, right) => left.path.localeCompare(right.path));
  directory.children.forEach(sortWorkspaceExplorerDirectory);
}

function countWorkspaceExplorerDirectories(directories: WorkspaceExplorerDirectory[]): number {
  return directories.reduce((total, directory) => total + 1 + countWorkspaceExplorerDirectories(directory.children), 0);
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
