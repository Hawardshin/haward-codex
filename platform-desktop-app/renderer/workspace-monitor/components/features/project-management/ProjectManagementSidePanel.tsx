import { ArrowRight, Milestone } from "lucide-react";

import type { WorkspaceProjectManagement } from "@/lib/snapshot";
import type { UiLanguage } from "@/types/desktop";

import { formatMilestoneStatus, projectActionCopy, type ProjectManagementProject } from "./projectManagementCopy";

type ProjectManagementSidePanelProps = {
  language: UiLanguage;
  model: WorkspaceProjectManagement;
  selectedProject: ProjectManagementProject | null;
  onOpenSection: (section: string) => void;
};

export function ProjectManagementSidePanel({ language, model, selectedProject, onOpenSection }: ProjectManagementSidePanelProps) {
  const ko = language === "ko";
  return (
    <aside className="project-management-side">
      <section data-project-milestone-list>
        <div className="project-panel-heading compact">
          <div>
            <p className="eyebrow">{ko ? "마일스톤" : "Milestones"}</p>
            <h3>{selectedProject?.milestone || (ko ? "작업공간 준비" : "Workspace setup")}</h3>
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
  );
}
