import { ArrowRight, ClipboardCheck, FolderGit2, GitBranch, ListChecks, Milestone, Newspaper, type LucideIcon } from "lucide-react";

import type { WorkspaceProjectManagement } from "@/lib/snapshot";
import type { UiLanguage } from "@/types/desktop";

type ProjectManagementPanelProps = {
  language: UiLanguage;
  projectManagement?: WorkspaceProjectManagement;
  onOpenSection: (section: string) => void;
};

const emptyProjectManagement: WorkspaceProjectManagement = {
  sourcePath: "_ops/projects/registry.json",
  summary: {
    managedProjects: 0,
    activeProjects: 0,
    repoBackedProjects: 0,
    openWorkItems: 0,
    completedWorkItems: 0,
    milestoneCount: 0,
    evidenceDocuments: 0,
    reportDocuments: 0
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

export function ProjectManagementPanel({ language, projectManagement, onOpenSection }: ProjectManagementPanelProps) {
  const ko = language === "ko";
  const locale = ko ? "ko-KR" : "en-US";
  const model = projectManagement || emptyProjectManagement;
  const summary = model.summary;
  const mainProject = model.portfolio[0];

  return (
    <section className="project-management-panel" data-project-management-panel aria-label={ko ? "프로젝트 관리" : "Project management"}>
      <div className="project-management-hero">
        <div>
          <p className="eyebrow">{ko ? "프로젝트 관리 플랫폼" : "Project Management Platform"}</p>
          <h2>{ko ? "Git 작업공간, 작업 순서, 보고서, 근거를 프로젝트별로 봅니다" : "Manage Git workspaces, task order, reports, and evidence by project"}</h2>
          <p>
            {ko
              ? "Ollama, 툴 빌더, 에이전트 운영은 분리하고 이 화면은 현재 프로젝트를 가져오고 추적하고 검증하는 데 집중합니다."
              : "Ollama, tool builders, and agent operations stay separate; this surface focuses on importing, tracking, and verifying project work."}
          </p>
        </div>
        <button type="button" onClick={() => onOpenSection("source")} data-project-management-primary-action="import-workspace">
          <FolderGit2 size={16} aria-hidden="true" />
          <span>{ko ? "Git 작업공간 가져오기" : "Import Git Workspace"}</span>
        </button>
      </div>

      <div className="project-management-metrics" data-project-management-summary>
        <ProjectMetric label={ko ? "관리 프로젝트" : "Projects"} value={summary.managedProjects} icon={FolderGit2} locale={locale} />
        <ProjectMetric label={ko ? "Git 경계" : "Git Boundaries"} value={summary.repoBackedProjects} icon={GitBranch} locale={locale} />
        <ProjectMetric label={ko ? "마일스톤" : "Milestones"} value={summary.milestoneCount} icon={Milestone} locale={locale} />
        <ProjectMetric label={ko ? "보고서/근거" : "Reports / Evidence"} value={summary.reportDocuments + summary.evidenceDocuments} icon={ClipboardCheck} locale={locale} />
      </div>

      <div className="project-workflow-lanes" data-project-workflow-lanes>
        {model.workflowLanes.map((lane) => {
          const laneCopy = projectLaneCopy(lane, ko);
          return (
            <button key={lane.id} type="button" onClick={() => onOpenSection(lane.targetSection)} data-project-workflow-lane={lane.id}>
              <span>{laneCopy.label}</span>
              <strong>{lane.count.toLocaleString(locale)}</strong>
              <small>{laneCopy.description}</small>
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="project-management-grid">
        <section className="project-portfolio-list" data-project-portfolio-list>
          <div className="project-panel-heading">
            <div>
              <p className="eyebrow">{ko ? "포트폴리오" : "Portfolio"}</p>
              <h3>{ko ? "레포지토리별 현재 상태" : "Current state by repository"}</h3>
            </div>
            <span>{summary.activeProjects.toLocaleString(locale)} active</span>
          </div>
          {model.portfolio.length ? (
            model.portfolio.map((project) => (
              <article key={project.id} className={`project-portfolio-card ${project.health}`} data-project-card={project.id}>
                <div>
                  <span>{formatGitBoundary(project.gitBoundary, ko)}</span>
                  <strong>{project.name}</strong>
                  <p>{project.purpose || project.scope || project.path}</p>
                </div>
                <dl>
                  <dt>{ko ? "작업" : "Work"}</dt>
                  <dd>{project.activeTaskCount}/{project.taskCount}</dd>
                  <dt>{ko ? "요구" : "Req"}</dt>
                  <dd>{project.requirementCount}</dd>
                  <dt>{ko ? "보고" : "Reports"}</dt>
                  <dd>{project.reportCount}</dd>
                </dl>
                <div className="project-next-action">
                  <ListChecks size={15} aria-hidden="true" />
                  <span>{project.nextAction}</span>
                </div>
                <button type="button" onClick={() => onOpenSection("history")}>
                  <Newspaper size={14} aria-hidden="true" />
                  <span>{ko ? "기록 보기" : "Open Trail"}</span>
                </button>
              </article>
            ))
          ) : (
            <p className="empty-state">{ko ? "아직 등록된 Git 프로젝트가 없습니다." : "No Git projects are registered yet."}</p>
          )}
        </section>

        <aside className="project-management-side">
          <section data-project-milestone-list>
            <div className="project-panel-heading compact">
              <div>
                <p className="eyebrow">{ko ? "마일스톤" : "Milestones"}</p>
                <h3>{mainProject?.milestone || (ko ? "작업공간 준비" : "Workspace setup")}</h3>
              </div>
            </div>
            <div className="project-milestone-list">
              {model.milestones.slice(0, 5).map((milestone) => (
                <button key={milestone.id} type="button" onClick={() => onOpenSection("eval")}>
                  <Milestone size={15} aria-hidden="true" />
                  <span>{milestone.project}</span>
                  <strong>{formatMilestoneStatus(milestone.status, ko)}</strong>
                  <small>{milestone.nextAction}</small>
                </button>
              ))}
            </div>
          </section>

          <section data-project-recent-trail>
            <div className="project-panel-heading compact">
              <div>
                <p className="eyebrow">{ko ? "최근 보고" : "Recent Trail"}</p>
                <h3>{ko ? "보고서와 근거" : "Reports and evidence"}</h3>
              </div>
            </div>
            <div className="project-trail-list">
              {model.recentTrail.slice(0, 5).map((item) => (
                <button key={`${item.date}-${item.path}`} type="button" onClick={() => onOpenSection("documents")}>
                  <span>{item.date}</span>
                  <strong>{item.title}</strong>
                  <small>{item.category}</small>
                </button>
              ))}
            </div>
          </section>

          <section data-project-desktop-actions>
            <div className="project-panel-heading compact">
              <div>
                <p className="eyebrow">{ko ? "작업 시작" : "Start Work"}</p>
                <h3>{ko ? "사용자용 기본 액션" : "Default user actions"}</h3>
              </div>
            </div>
            <div className="project-action-list">
              {model.desktopActions.map((action) => {
                const actionCopy = projectActionCopy(action, ko);
                return (
                  <button key={action.id} type="button" onClick={() => onOpenSection(action.targetSection)} data-project-action={action.id}>
                    <ArrowRight size={14} aria-hidden="true" />
                    <span>{actionCopy.label}</span>
                    <small>{actionCopy.description}</small>
                  </button>
                );
              })}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}

function ProjectMetric({ label, value, icon: Icon, locale }: { label: string; value: number; icon: LucideIcon; locale: string }) {
  return (
    <article>
      <Icon size={17} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value.toLocaleString(locale)}</strong>
    </article>
  );
}

function projectLaneCopy(lane: WorkspaceProjectManagement["workflowLanes"][number], ko: boolean) {
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

function projectActionCopy(
  action: WorkspaceProjectManagement["desktopActions"][number],
  ko: boolean
) {
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
    }
  };
  return labels[action.id] || { label: action.label, description: action.description };
}

function formatGitBoundary(boundary: string, ko: boolean) {
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

function formatMilestoneStatus(status: string, ko: boolean) {
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
