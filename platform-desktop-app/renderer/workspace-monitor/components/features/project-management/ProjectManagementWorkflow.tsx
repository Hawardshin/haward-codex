import { ArrowRight } from "lucide-react";

import type { WorkspaceProjectManagement } from "@/lib/snapshot";
import type { UiLanguage } from "@/types/desktop";

import { projectLaneCopy } from "./projectManagementCopy";

type ProjectManagementWorkflowProps = {
  language: UiLanguage;
  lanes: WorkspaceProjectManagement["workflowLanes"];
  onOpenSection: (section: string) => void;
};

export function ProjectManagementWorkflow({ language, lanes, onOpenSection }: ProjectManagementWorkflowProps) {
  const ko = language === "ko";
  const locale = ko ? "ko-KR" : "en-US";
  return (
    <div className="project-workflow-lanes" data-project-workflow-lanes>
      {lanes.map((lane) => {
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
  );
}
