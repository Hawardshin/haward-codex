import { ClipboardCheck, FolderOpen, ListChecks, Newspaper, PlayCircle } from "lucide-react";

import type { WorkspaceProjectManagement } from "@/lib/snapshot";
import type { UiLanguage } from "@/types/desktop";

import { formatGitBoundary, projectReadinessCopy, projectReportReadinessCopy, type ProjectManagementProject } from "./projectManagementCopy";

type ProjectPortfolioListProps = {
  language: UiLanguage;
  projects: ProjectManagementProject[];
  summary: WorkspaceProjectManagement["summary"];
  selectedProjectId: string;
  onSelectProject: (projectId: string) => void;
  onOpenSection: (section: string) => void;
};

export function ProjectPortfolioList({
  language,
  projects,
  summary,
  selectedProjectId,
  onSelectProject,
  onOpenSection
}: ProjectPortfolioListProps) {
  const ko = language === "ko";
  const locale = ko ? "ko-KR" : "en-US";
  return (
    <section className="project-portfolio-list" data-project-portfolio-list>
      <div className="project-panel-heading">
        <div>
          <p className="eyebrow">{ko ? "포트폴리오" : "Portfolio"}</p>
          <h3>{ko ? "레포지토리별 현재 상태" : "Current state by repository"}</h3>
        </div>
        <span>{summary.activeProjects.toLocaleString(locale)} active</span>
      </div>
      {projects.length ? (
        projects.map((project) => (
          <article
            key={project.id}
            className={`project-portfolio-card ${project.health} ${selectedProjectId === project.id ? "selected" : ""}`}
            data-project-card={project.id}
          >
            <button type="button" className="project-card-main" onClick={() => onSelectProject(project.id)} aria-pressed={selectedProjectId === project.id}>
              <span>{formatGitBoundary(project.gitBoundary, ko)}</span>
              <strong>{project.name}</strong>
              <p>{project.purpose || project.scope || project.path}</p>
            </button>
            <dl>
              <dt>{ko ? "작업" : "Work"}</dt>
              <dd>{project.activeTaskCount}/{project.taskCount}</dd>
              <dt>{ko ? "요구" : "Req"}</dt>
              <dd>{project.requirementCount}</dd>
              <dt>{ko ? "보고" : "Reports"}</dt>
              <dd>{project.reportCount}</dd>
            </dl>
            <div className="project-readiness-row" data-project-readiness={project.readiness}>
              <span>
                <PlayCircle size={14} aria-hidden="true" />
                {projectReadinessCopy(project, ko)}
              </span>
              <span>
                <ClipboardCheck size={14} aria-hidden="true" />
                {projectReportReadinessCopy(project, ko)}
              </span>
            </div>
            <div className="project-progress-meter" aria-label={ko ? "프로젝트 진행률" : "Project progress"}>
              <span style={{ width: `${project.progressPercent}%` }} />
            </div>
            <div className="project-next-action">
              <ListChecks size={15} aria-hidden="true" />
              <span>{project.nextAction}</span>
            </div>
            <div className="project-card-actions">
              <button type="button" onClick={() => onOpenSection(project.primarySection)} data-project-card-action="primary">
                <FolderOpen size={14} aria-hidden="true" />
                <span>{ko ? "다음 화면" : "Next Surface"}</span>
              </button>
              <button type="button" onClick={() => onOpenSection("history")} data-project-card-action="trail">
                <Newspaper size={14} aria-hidden="true" />
                <span>{ko ? "기록 보기" : "Open Trail"}</span>
              </button>
            </div>
          </article>
        ))
      ) : (
        <p className="empty-state">{ko ? "아직 등록된 Git 프로젝트가 없습니다." : "No Git projects are registered yet."}</p>
      )}
    </section>
  );
}
