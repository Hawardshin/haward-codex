import snapshotJson from "@/src/generated/workspace-snapshot.json";

export type WorkspaceStats = {
  projects: number;
  agents: number;
  agentDefinitions?: number;
  activeAgents: number;
  activeCollaborationTasks?: number;
  blockedCollaborationTasks?: number;
  tasks: number;
  completedTasks: number;
  documents: number;
  requirements: number;
  evaluations: number;
  webSearches: number;
  timingRecords?: number;
  historyDays: number;
  sourceFiles?: number;
  rootFolders: number;
};

export type WorkspaceProject = {
  name: string;
  path: string;
  status: string;
  type: string;
  purpose: string;
  scope: string;
  boundaryNotes: string[];
};

export type WorkspaceAgent = {
  id: string;
  name?: string;
  role?: string;
  status: string;
  current_task?: string;
  notes?: string;
};

export type WorkspaceAgentDefinition = {
  id: string;
  name: string;
  description: string;
  runtime: string;
  definitionStatus: string;
  runtimeStatus: string;
  trigger: string;
  currentTask: string;
  tools: string[];
  skills: string[];
  taskCount: number;
  completedTaskCount: number;
  configPath: string;
  docPaths: string[];
};

export type WorkspaceTask = {
  id: string;
  title?: string;
  project?: string;
  status: string;
  agent?: string;
  priority?: string;
  next_action?: string;
  evaluation_report?: string;
  timing_report?: string;
  timing_summary?: {
    total?: string;
    bottleneck?: string;
  };
};

export type WorkspaceCollaborationTask = {
  id: string;
  title: string;
  project: string;
  status: string;
  priority: string;
  agent: string;
  lane: string;
  nextAction: string;
  blockers: string[];
  references: string[];
  timingTotal: string;
  bottleneck: string;
  evaluationReport: string;
};

export type WorkspaceCollaborationBoard = {
  summary: {
    agents: number;
    activeAgents: number;
    activeTasks: number;
    blockedTasks: number;
    queuedTasks: number;
    completedTasks: number;
    handoffs: number;
    blockers: number;
  };
  agents: Array<{
    id: string;
    name: string;
    role: string;
    status: string;
    currentTask: string;
    taskCount: number;
    activeTaskCount: number;
    blockedTaskCount: number;
    completedTaskCount: number;
  }>;
  lanes: Array<{
    id: string;
    label: string;
    tasks: WorkspaceCollaborationTask[];
  }>;
  flows: Array<{
    id: string;
    agent: string;
    task: string;
    project: string;
    status: string;
    lane: string;
    priority: string;
    timingTotal: string;
    bottleneck: string;
  }>;
  blockers: Array<{
    taskId: string;
    title: string;
    agent: string;
    blockers: string[];
  }>;
  nextActions: Array<{
    taskId: string;
    title: string;
    agent: string;
    nextAction: string;
  }>;
};

export type WorkspaceRequirement = {
  id: string;
  requirement: string;
  priority: string;
  sourcePath: string;
};

export type WorkspaceDocument = {
  id: string;
  path: string;
  category: string;
  language: string;
  title: string;
  excerpt: string;
  html: string;
  updatedAt: string;
  historyDate: string;
  historyYear: string;
  workspaceArea: string;
};

export type WorkspaceSourceFile = {
  id: string;
  path: string;
  project: string;
  language: string;
  extension: string;
  sizeBytes: number;
  lineCount: number;
  updatedAt: string;
  truncated: boolean;
  content: string;
};

export type WorkspaceHistoryDocument = Omit<WorkspaceDocument, "html" | "historyYear" | "workspaceArea">;

export type WorkspaceHistoryDay = {
  date: string;
  year: string;
  documentsCount: number;
  categories: Array<{
    category: string;
    count: number;
  }>;
  documents: WorkspaceHistoryDocument[];
};

export type WorkspaceFolderStructure = {
  rootFolders: Array<{
    name: string;
    path: string;
    className: string;
    purpose: string;
    source: string;
  }>;
  docsCategories: Array<{
    id: string;
    path: string;
    purpose: string;
    documentsCount: number;
    requiredDocumentsCount: number;
  }>;
  projectHomes: Array<{
    name: string;
    path: string;
    purpose: string;
    topLevelDirs: string[];
    sharedDependencies: string[];
    boundaryNotes: string[];
  }>;
  historyRoots: Array<{
    category: string;
    root: string;
    documentsCount: number;
  }>;
};

export type WorkspaceViewMode = {
  id: string;
  label: string;
  intent: string;
  allowedSections: string[];
  visibilityRules: Record<string, string[]>;
  securityNotes: string[];
};

export type WorkspaceSnapshot = {
  schemaVersion: string;
  generatedAt: string;
  repoRootName: string;
  stats: WorkspaceStats;
  projects: WorkspaceProject[];
  agents: WorkspaceAgent[];
  agentCatalog?: WorkspaceAgentDefinition[];
  collaborationBoard?: WorkspaceCollaborationBoard;
  tasks: WorkspaceTask[];
  requirements: WorkspaceRequirement[];
  documents: WorkspaceDocument[];
  historyDays: WorkspaceHistoryDay[];
  sourceFiles?: WorkspaceSourceFile[];
  folderStructure: WorkspaceFolderStructure;
  viewModeCatalog?: {
    defaultMode: string;
    modes: WorkspaceViewMode[];
  };
  categories: string[];
  publicReview: {
    status: string;
    checklist: string[];
  };
};

export const snapshot = snapshotJson as WorkspaceSnapshot;

export function formatDate(value: string) {
  if (!value || value.startsWith("1970-")) {
    return "not generated";
  }
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function formatDay(value: string) {
  if (!value) {
    return "날짜 없음";
  }
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(`${value}T00:00:00`));
}

export function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    "agent-config": "에이전트 설정",
    coordination: "조율",
    "daily-history": "일일 기록",
    evaluation: "평가",
    philosophy: "철학",
    plan: "계획",
    "project-doc": "프로젝트 문서",
    "project-spec": "프로젝트 스펙",
    requirement: "요구사항",
    "request-trace": "요청 추적",
    "runtime-adapter": "런타임 어댑터",
    "shared-spec": "공유 스펙",
    template: "템플릿",
    "user-request": "요청 요약",
    "web-search": "웹 검색",
    "work-timing": "작업 시간",
    "workspace-doc": "워크스페이스 문서",
    "work-summary": "작업 요약"
  };
  return labels[category] ?? category;
}
