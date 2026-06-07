import { AlertTriangle, CheckCircle2, FileSearch, Loader2, SquareTerminal } from "lucide-react";

import type { UiLanguage } from "@/types/desktop";

export type RuntimeInitStatusReport = {
  kind: "session" | "task-pipe";
  status: "initializing" | "ready" | "failed";
  adapterId: string;
  adapterLabel: string;
  modeLabel?: string;
  sessionId?: string;
  taskRunId?: string;
  pipelineId?: string;
  pipelineLabel?: string;
  taskKind?: string;
  startedSessions?: number;
  missingLanes?: number;
  laneCount?: number;
  workingDir?: string;
  error?: string;
  updatedAt: string;
};

type RuntimeInitStatusCardProps = {
  report: RuntimeInitStatusReport | null;
  uiLanguage: UiLanguage;
  formatTimeLabel: (value: string) => string;
  onOpenTerminal: () => void;
  onRefreshTaskRuns: () => void;
};

export function RuntimeInitStatusCard({
  report,
  uiLanguage,
  formatTimeLabel,
  onOpenTerminal,
  onRefreshTaskRuns
}: RuntimeInitStatusCardProps) {
  const status = report?.status || "idle";
  const StatusIcon =
    status === "ready" ? CheckCircle2 : status === "failed" ? AlertTriangle : status === "initializing" ? Loader2 : SquareTerminal;
  const title = report
    ? runtimeInitTitle(report, uiLanguage)
    : uiLanguage === "ko"
      ? "Codex / CLI init 대기"
      : "Codex / CLI init idle";
  const detail = report
    ? runtimeInitDetail(report, uiLanguage)
    : uiLanguage === "ko"
      ? "아직 시작된 게스트 실행 경로가 없습니다."
      : "No guest execution lane has been started yet.";
  const facts = runtimeInitFacts(report, uiLanguage);

  return (
    <article className={`runtime-init-status-card status-${status}`} data-runtime-init-status={status} aria-live="polite">
      <header>
        <span className="runtime-init-status-pill">
          <StatusIcon size={15} aria-hidden="true" />
          {runtimeInitStatusLabel(status, uiLanguage)}
        </span>
        <div>
          <strong>{title}</strong>
          <small>{report ? formatTimeLabel(report.updatedAt) : uiLanguage === "ko" ? "시작 전" : "not started"}</small>
        </div>
      </header>
      <p>{detail}</p>
      <div className="runtime-init-status-facts">
        {facts.map((fact) => (
          <span key={fact.label}>
            {fact.label} <strong>{fact.value}</strong>
          </span>
        ))}
      </div>
      <div className="runtime-init-status-actions">
        <button type="button" onClick={onOpenTerminal}>
          <SquareTerminal size={14} aria-hidden="true" />
          <span>{uiLanguage === "ko" ? "터미널 열기" : "Open terminal"}</span>
        </button>
        <button type="button" onClick={onRefreshTaskRuns}>
          <FileSearch size={14} aria-hidden="true" />
          <span>{uiLanguage === "ko" ? "실행 기록 확인" : "Check task runs"}</span>
        </button>
      </div>
    </article>
  );
}

function runtimeInitTitle(report: RuntimeInitStatusReport, uiLanguage: UiLanguage) {
  if (report.status === "failed") {
    return uiLanguage === "ko" ? "init 실패" : "Init failed";
  }
  if (report.status === "initializing") {
    return report.kind === "task-pipe"
      ? uiLanguage === "ko" ? "작업 파이프라인 init 중" : "Task pipe initializing"
      : uiLanguage === "ko" ? `${report.adapterLabel} init 중` : `${report.adapterLabel} initializing`;
  }
  if (report.kind === "task-pipe") {
    return uiLanguage === "ko" ? "작업 파이프라인 init 완료" : "Task pipe initialized";
  }
  return uiLanguage === "ko" ? `${report.adapterLabel} init 완료` : `${report.adapterLabel} initialized`;
}

function runtimeInitDetail(report: RuntimeInitStatusReport, uiLanguage: UiLanguage) {
  if (report.error) {
    return report.error;
  }
  if (report.kind === "task-pipe") {
    const started = report.startedSessions ?? 0;
    const missing = report.missingLanes ?? 0;
    return uiLanguage === "ko"
      ? `${report.pipelineLabel || report.taskKind || "파이프라인"}에서 ${started}개 실행 경로가 시작됐고 ${missing}개가 누락됐습니다.`
      : `${started} lanes started in ${report.pipelineLabel || report.taskKind || "the pipeline"}; ${missing} lanes are missing.`;
  }
  return uiLanguage === "ko"
    ? `${report.adapterLabel} 세션이 하단 터미널과 실행 기록에 연결됐습니다.`
    : `${report.adapterLabel} is linked to the bottom terminal and task-run records.`;
}

function runtimeInitFacts(report: RuntimeInitStatusReport | null, uiLanguage: UiLanguage) {
  if (!report) {
    return [
      { label: uiLanguage === "ko" ? "상태" : "status", value: uiLanguage === "ko" ? "대기" : "idle" },
      { label: uiLanguage === "ko" ? "실행 경로" : "lane", value: uiLanguage === "ko" ? "선택 전" : "not selected" }
    ];
  }
  const facts = [
    { label: uiLanguage === "ko" ? "어댑터" : "adapter", value: report.adapterLabel || report.adapterId }
  ];
  if (report.sessionId) {
    facts.push({ label: uiLanguage === "ko" ? "세션" : "session", value: shortRuntimeId(report.sessionId) });
  }
  if (report.taskRunId) {
    facts.push({ label: uiLanguage === "ko" ? "실행 기록" : "task run", value: shortRuntimeId(report.taskRunId) });
  }
  if (report.pipelineId) {
    facts.push({ label: uiLanguage === "ko" ? "파이프라인" : "pipeline", value: shortRuntimeId(report.pipelineId) });
  }
  if (typeof report.startedSessions === "number") {
    facts.push({ label: uiLanguage === "ko" ? "시작" : "started", value: String(report.startedSessions) });
  }
  if (typeof report.missingLanes === "number") {
    facts.push({ label: uiLanguage === "ko" ? "누락" : "missing", value: String(report.missingLanes) });
  }
  if (report.workingDir) {
    facts.push({ label: uiLanguage === "ko" ? "경로" : "cwd", value: report.workingDir });
  }
  return facts;
}

function runtimeInitStatusLabel(status: string, uiLanguage: UiLanguage) {
  if (status === "ready") {
    return uiLanguage === "ko" ? "초기화 완료" : "Initialized";
  }
  if (status === "failed") {
    return uiLanguage === "ko" ? "실패" : "Failed";
  }
  if (status === "initializing") {
    return uiLanguage === "ko" ? "초기화 중" : "Initializing";
  }
  return uiLanguage === "ko" ? "대기" : "Idle";
}

function shortRuntimeId(value: string) {
  if (value.length <= 18) {
    return value;
  }
  return `${value.slice(0, 10)}...${value.slice(-5)}`;
}
