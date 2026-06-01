import snapshotJson from "@/src/generated/workspace-snapshot.json";

export type WorkspaceStats = {
  projects: number;
  agents: number;
  activeAgents: number;
  tasks: number;
  completedTasks: number;
  documents: number;
  requirements: number;
  evaluations: number;
  webSearches: number;
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

export type WorkspaceTask = {
  id: string;
  title?: string;
  project?: string;
  status: string;
  agent?: string;
  priority?: string;
  next_action?: string;
  evaluation_report?: string;
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
};

export type WorkspaceSnapshot = {
  schemaVersion: string;
  generatedAt: string;
  repoRootName: string;
  stats: WorkspaceStats;
  projects: WorkspaceProject[];
  agents: WorkspaceAgent[];
  tasks: WorkspaceTask[];
  requirements: WorkspaceRequirement[];
  documents: WorkspaceDocument[];
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

export function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    coordination: "조율",
    "daily-history": "일일 기록",
    evaluation: "평가",
    philosophy: "철학",
    plan: "계획",
    "project-doc": "프로젝트 문서",
    "project-spec": "프로젝트 스펙",
    requirement: "요구사항",
    "request-trace": "요청 추적",
    "shared-spec": "공유 스펙",
    "user-request": "요청 요약",
    "web-search": "웹 검색",
    "workspace-doc": "워크스페이스 문서",
    "work-summary": "작업 요약"
  };
  return labels[category] ?? category;
}
