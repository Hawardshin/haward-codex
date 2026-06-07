import { ClipboardCheck, FolderGit2, GitBranch, ListChecks, Milestone, type LucideIcon } from "lucide-react";

import type { WorkspaceProjectManagement } from "@/lib/snapshot";
import type { UiLanguage } from "@/types/desktop";

type ProjectManagementMetricsProps = {
  language: UiLanguage;
  summary: WorkspaceProjectManagement["summary"];
};

export function ProjectManagementMetrics({ language, summary }: ProjectManagementMetricsProps) {
  const ko = language === "ko";
  const locale = ko ? "ko-KR" : "en-US";
  return (
    <div className="project-management-metrics" data-project-management-summary>
      <ProjectMetric label={ko ? "관리 프로젝트" : "Projects"} value={summary.managedProjects} icon={FolderGit2} locale={locale} />
      <ProjectMetric label={ko ? "실행 준비" : "Ready To Run"} value={summary.readyToRunProjects} icon={ListChecks} locale={locale} />
      <ProjectMetric label={ko ? "Git 경계" : "Git Boundaries"} value={summary.repoBackedProjects} icon={GitBranch} locale={locale} />
      <ProjectMetric label={ko ? "마일스톤" : "Milestones"} value={summary.milestoneCount} icon={Milestone} locale={locale} />
      <ProjectMetric label={ko ? "주의 필요" : "Needs Attention"} value={summary.attentionProjects} icon={ClipboardCheck} locale={locale} />
      <ProjectMetric label={ko ? "보고 준비" : "Reports Ready"} value={summary.projectReportsReady} icon={ClipboardCheck} locale={locale} />
      <ProjectMetric label={ko ? "열린 작업" : "Open Work"} value={summary.openWorkItems} icon={ListChecks} locale={locale} />
      <ProjectMetric label={ko ? "보고서/근거" : "Reports / Evidence"} value={summary.reportDocuments + summary.evidenceDocuments} icon={ClipboardCheck} locale={locale} />
    </div>
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
