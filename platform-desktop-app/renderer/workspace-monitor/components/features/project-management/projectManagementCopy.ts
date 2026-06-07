import type { WorkspaceProjectManagement } from "@/lib/snapshot";

export type ProjectManagementProject = WorkspaceProjectManagement["portfolio"][number];
export type ProjectManagementAction = ProjectManagementProject["actionQueue"][number] | WorkspaceProjectManagement["desktopActions"][number];
export type ProjectManagementResource = ProjectManagementProject["resources"][number];

export const emptyProjectManagement: WorkspaceProjectManagement = {
  sourcePath: "_ops/projects/registry.json",
  summary: {
    managedProjects: 0,
    activeProjects: 0,
    repoBackedProjects: 0,
    openWorkItems: 0,
    completedWorkItems: 0,
    milestoneCount: 0,
    evidenceDocuments: 0,
    reportDocuments: 0,
    readyToRunProjects: 0,
    attentionProjects: 0,
    projectReportsReady: 0
  },
  portfolio: [],
  milestones: [],
  workflowLanes: [
    {
      id: "import",
      label: "Import",
      count: 0,
      description: "Open, clone, or create a Git-backed workspace.",
      targetSection: "source"
    },
    {
      id: "plan",
      label: "Plan",
      count: 0,
      description: "Review requirements, specs, and current project plans.",
      targetSection: "requirements"
    },
    {
      id: "execute",
      label: "Run",
      count: 0,
      description: "Launch the selected guest AI tool or terminal lane.",
      targetSection: "desktop"
    },
    {
      id: "verify",
      label: "Report",
      count: 0,
      description: "Review validation, evidence, and work reports.",
      targetSection: "eval"
    }
  ],
  recentTrail: [],
  desktopActions: [
    {
      id: "open_existing_git_repo",
      label: "Open existing Git repository",
      targetSection: "source",
      description: "Import a local Git workspace."
    },
    {
      id: "clone_remote_repo",
      label: "Clone remote repository",
      targetSection: "source",
      description: "Create a managed workspace from a remote repository."
    },
    {
      id: "review_reports",
      label: "Review project reports",
      targetSection: "eval",
      description: "Open current work summaries, validation, and evidence."
    }
  ]
};

export function projectLaneCopy(lane: WorkspaceProjectManagement["workflowLanes"][number], ko: boolean) {
  if (!ko) {
    return { label: lane.label, description: lane.description };
  }
  const labels: Record<string, { label: string; description: string }> = {
    import: { label: "가져오기", description: "기존 Git 레포를 열거나 원격 레포를 복제합니다." },
    plan: { label: "계획", description: "요구사항, 스펙, 현재 프로젝트 계획을 봅니다." },
    execute: { label: "실행", description: "선택한 AI 도구나 터미널 작업을 시작합니다." },
    verify: { label: "보고", description: "검증 결과, 근거, 작업 보고서를 확인합니다." }
  };
  return labels[lane.id] || { label: lane.label, description: lane.description };
}

export function projectActionCopy(action: ProjectManagementAction, ko: boolean) {
  if (!ko) {
    return { label: action.label, description: action.description };
  }
  const labels: Record<string, { label: string; description: string }> = {
    open_existing_git_repo: {
      label: "기존 Git 열기",
      description: "로컬 Git 작업공간을 프로젝트로 가져옵니다."
    },
    clone_remote_repo: {
      label: "원격 레포 복제",
      description: "원격 저장소에서 새 작업공간을 만듭니다."
    },
    create_new_repo: {
      label: "새 Git 만들기",
      description: "새 프로젝트를 별도 Git 저장소로 시작합니다."
    },
    review_reports: {
      label: "보고서 보기",
      description: "현재 작업 요약, 검증, 근거를 엽니다."
    },
    import_project_workspace: {
      label: "작업공간 연결",
      description: "이 프로젝트를 별도 Git 작업공간으로 가져옵니다."
    },
    review_project_requirements: {
      label: "요구사항 확인",
      description: "프로젝트 요구사항과 성공 기준을 연결합니다."
    },
    run_project_workspace: {
      label: "터미널 실행",
      description: "선택한 프로젝트 작업을 터미널/AI 실행 화면에서 진행합니다."
    },
    review_project_reports: {
      label: "보고서 확인",
      description: "검증 결과, 근거, 작업 요약을 검토합니다."
    },
    open_project_timeline: {
      label: "작업 순서 보기",
      description: "최근 작업 기록과 순서를 확인합니다."
    },
    open_project_documents: {
      label: "문서 보기",
      description: "프로젝트 관련 문서와 근거 파일을 확인합니다."
    }
  };
  return labels[action.id] || { label: action.label, description: action.description };
}

export function projectReadinessCopy(project: ProjectManagementProject, ko: boolean) {
  if (!ko) {
    return project.readiness.replace(/_/g, " ");
  }
  if (project.readiness === "ready_to_run") {
    return "실행 준비";
  }
  if (project.readiness === "needs_requirements") {
    return "요구사항 필요";
  }
  return "작업공간 필요";
}

export function projectReportReadinessCopy(project: ProjectManagementProject, ko: boolean) {
  if (!ko) {
    return project.reportReadiness.replace(/_/g, " ");
  }
  if (project.reportReadiness === "ready") {
    return "보고 준비";
  }
  if (project.reportReadiness === "needs_evidence") {
    return "근거 필요";
  }
  return "검증 필요";
}

export function formatGitBoundary(boundary: string, ko: boolean) {
  if (!ko) {
    return boundary.replace(/_/g, " ");
  }
  if (boundary === "separate_git_workspace") {
    return "별도 Git 작업공간";
  }
  if (boundary === "registry_only") {
    return "등록만 됨";
  }
  return boundary.replace(/_/g, " ");
}

export function formatMilestoneStatus(status: string, ko: boolean) {
  if (!ko) {
    return status.replace(/_/g, " ");
  }
  const labels: Record<string, string> = {
    active: "진행 중",
    complete: "완료",
    needs_attention: "확인 필요"
  };
  return labels[status] || status.replace(/_/g, " ");
}

export function resourceTargetSection(resource: ProjectManagementResource) {
  if (resource.category === "requirement") {
    return "requirements";
  }
  if (["evaluation", "work-timing", "resource-check", "omission-check"].includes(resource.category)) {
    return "eval";
  }
  if (["work-summary", "daily-history", "request-trace", "web-search", "plan"].includes(resource.category)) {
    return "history";
  }
  return "documents";
}
