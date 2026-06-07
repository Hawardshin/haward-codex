import { ArrowRight, ClipboardCheck, FileText, FolderOpen, ListChecks } from "lucide-react";

import type { UiLanguage } from "@/types/desktop";

import {
  projectActionCopy,
  projectReadinessCopy,
  projectReportReadinessCopy,
  resourceTargetSection,
  type ProjectManagementProject,
  type ProjectManagementResource
} from "./projectManagementCopy";

type ProjectDetailPanelProps = {
  language: UiLanguage;
  project: ProjectManagementProject | null;
  onOpenSection: (section: string) => void;
};

export function ProjectDetailPanel({ language, project, onOpenSection }: ProjectDetailPanelProps) {
  const ko = language === "ko";
  if (!project) {
    return (
      <section className="project-detail-panel" data-project-detail-panel>
        <p className="empty-state">{ko ? "프로젝트를 가져오면 상세 작업 큐가 여기에 표시됩니다." : "Import a project to show its action queue here."}</p>
      </section>
    );
  }

  const sections = [
    {
      id: "requirements",
      label: ko ? "요구사항" : "Requirements",
      items: project.reportBundle.requirements,
      empty: ko ? "연결된 요구사항이 없습니다." : "No linked requirements yet."
    },
    {
      id: "reports",
      label: ko ? "보고서" : "Reports",
      items: project.reportBundle.reports,
      empty: ko ? "검증 보고서가 없습니다." : "No validation reports yet."
    },
    {
      id: "evidence",
      label: ko ? "근거" : "Evidence",
      items: project.reportBundle.evidence,
      empty: ko ? "근거 문서가 없습니다." : "No evidence documents yet."
    },
    {
      id: "recent",
      label: ko ? "최근" : "Recent",
      items: project.reportBundle.recent,
      empty: ko ? "최근 프로젝트 기록이 없습니다." : "No recent project trail yet."
    }
  ];

  return (
    <section className="project-detail-panel" data-project-detail-panel data-project-detail={project.id}>
      <div className="project-panel-heading">
        <div>
          <p className="eyebrow">{ko ? "프로젝트 상세" : "Project Detail"}</p>
          <h3>{project.name}</h3>
        </div>
        <span>{project.progressPercent}%</span>
      </div>
      <div className="project-detail-status">
        <span>
          <FolderOpen size={15} aria-hidden="true" />
          {projectReadinessCopy(project, ko)}
        </span>
        <span>
          <ClipboardCheck size={15} aria-hidden="true" />
          {projectReportReadinessCopy(project, ko)}
        </span>
        <span>
          <ListChecks size={15} aria-hidden="true" />
          {project.activeRunLabel}
        </span>
      </div>
      <div className="project-action-queue" data-project-action-queue>
        {project.actionQueue.map((action) => {
          const copy = projectActionCopy(action, ko);
          return (
            <button key={action.id} type="button" className={action.priority} onClick={() => onOpenSection(action.targetSection)} data-project-queue-action={action.id}>
              <ArrowRight size={14} aria-hidden="true" />
              <span>{copy.label}</span>
              <small>{copy.description}</small>
            </button>
          );
        })}
      </div>
      <div className="project-report-bundle" data-project-report-bundle>
        {sections.map((section) => (
          <article key={section.id} data-project-report-section={section.id}>
            <strong>{section.label}</strong>
            {section.items.length ? (
              <div>
                {section.items.slice(0, 3).map((item) => (
                  <ProjectResourceButton key={`${section.id}-${item.path}-${item.title}`} item={item} onOpenSection={onOpenSection} />
                ))}
              </div>
            ) : (
              <small>{section.empty}</small>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

function ProjectResourceButton({ item, onOpenSection }: { item: ProjectManagementResource; onOpenSection: (section: string) => void }) {
  return (
    <button type="button" onClick={() => onOpenSection(resourceTargetSection(item))} data-project-resource-link={item.category}>
      <FileText size={13} aria-hidden="true" />
      <span>{item.title}</span>
    </button>
  );
}
