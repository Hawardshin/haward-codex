import { Activity, AlertTriangle, CheckCircle2 } from "lucide-react";

import type { UiLanguage } from "@/types/desktop";

export type DesktopActionFeedbackStatus = "running" | "done" | "failed";

export type DesktopActionFeedbackId =
  | "choose-workspace"
  | "check-adapters"
  | "sync-settings"
  | "prepare-agents-md"
  | "open-search-agent"
  | "open-terminal"
  | "start-terminal-agent-bridge"
  | "plan-subagent-tools"
  | "execute-subagent-tools"
  | "fanout-subagent-tools"
  | "reveal-workspace"
  | "open-workspace-path"
  | "open-external-terminal"
  | "start-selected-lane"
  | "init-task-pipe"
  | "refresh-decisions"
  | "refresh-task-runs"
  | "refresh-accumulated-data"
  | "refresh-runtime-roots"
  | "audit-payload"
  | "create-support-bundle"
  | "refresh-service-readiness"
  | "check-app-update"
  | "install-app-update"
  | "refresh-workspace-host"
  | "defer-questions"
  | "open-source-review"
  | "import-workspace"
  | "clone-workspace"
  | "start-cockpit-adapter";

export type DesktopActionFeedback = {
  id: DesktopActionFeedbackId;
  label: string;
  scope: string;
  status: DesktopActionFeedbackStatus;
  detail: string;
  result: string;
  next: string;
  updatedAt: string;
};

export function DesktopActionFeedbackCard({
  feedback,
  placement,
  uiLanguage
}: {
  feedback: DesktopActionFeedback | null;
  placement: "quick-start" | "command-palette";
  uiLanguage: UiLanguage;
}) {
  if (!feedback) {
    return null;
  }
  const StatusIcon = feedback.status === "running" ? Activity : feedback.status === "failed" ? AlertTriangle : CheckCircle2;
  return (
    <article
      className={`desktop-action-feedback-card status-${feedback.status}`}
      data-desktop-action-feedback-card={placement}
      role="status"
      aria-live="polite"
    >
      <header>
        <span className="desktop-action-feedback-status">
          <StatusIcon size={15} aria-hidden="true" />
          {desktopActionStatusLabel(feedback.status, uiLanguage)}
        </span>
        <div>
          <strong>{feedback.label}</strong>
          <small>{feedback.scope}</small>
        </div>
        <time dateTime={feedback.updatedAt}>{formatActionFeedbackTime(feedback.updatedAt)}</time>
      </header>
      <div className="desktop-action-feedback-body">
        <p>{feedback.result}</p>
        <small>{feedback.detail}</small>
      </div>
      <div className="desktop-action-feedback-next">
        <span>{uiLanguage === "ko" ? "다음 확인" : "Next check"}</span>
        <strong>{feedback.next}</strong>
      </div>
    </article>
  );
}

function desktopActionStatusLabel(status: DesktopActionFeedbackStatus, uiLanguage: UiLanguage) {
  if (status === "running") {
    return uiLanguage === "ko" ? "실행 중" : "Running";
  }
  if (status === "failed") {
    return uiLanguage === "ko" ? "실패" : "Failed";
  }
  return uiLanguage === "ko" ? "완료" : "Done";
}

function formatActionFeedbackTime(value: string) {
  const numericValue = Number(value);
  const date = Number.isFinite(numericValue) && value.trim() !== "" ? new Date(numericValue) : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
}
