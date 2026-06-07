import { useMemo, useState } from "react";
import { FolderGit2 } from "lucide-react";

import type { WorkspaceProjectManagement } from "@/lib/snapshot";
import type { UiLanguage } from "@/types/desktop";

import { emptyProjectManagement } from "./project-management/projectManagementCopy";
import { ProjectDetailPanel } from "./project-management/ProjectDetailPanel";
import { ProjectManagementMetrics } from "./project-management/ProjectManagementMetrics";
import { ProjectManagementSidePanel } from "./project-management/ProjectManagementSidePanel";
import { ProjectManagementWorkflow } from "./project-management/ProjectManagementWorkflow";
import { ProjectPortfolioList } from "./project-management/ProjectPortfolioList";

type ProjectManagementPanelProps = {
  language: UiLanguage;
  projectManagement?: WorkspaceProjectManagement;
  onOpenSection: (section: string) => void;
};

export function ProjectManagementPanel({ language, projectManagement, onOpenSection }: ProjectManagementPanelProps) {
  const ko = language === "ko";
  const model = projectManagement || emptyProjectManagement;
  const [selectedProjectId, setSelectedProjectId] = useState(model.portfolio[0]?.id || "");
  const selectedProject = useMemo(
    () => model.portfolio.find((project) => project.id === selectedProjectId) || model.portfolio[0] || null,
    [model.portfolio, selectedProjectId]
  );

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

      <ProjectManagementMetrics language={language} summary={model.summary} />
      <ProjectManagementWorkflow language={language} lanes={model.workflowLanes} onOpenSection={onOpenSection} />

      <div className="project-management-grid">
        <ProjectPortfolioList
          language={language}
          projects={model.portfolio}
          summary={model.summary}
          selectedProjectId={selectedProject?.id || ""}
          onSelectProject={setSelectedProjectId}
          onOpenSection={onOpenSection}
        />
        <ProjectDetailPanel language={language} project={selectedProject} onOpenSection={onOpenSection} />
        <ProjectManagementSidePanel language={language} model={model} selectedProject={selectedProject} onOpenSection={onOpenSection} />
      </div>
    </section>
  );
}
