import { FileSearch, ShieldCheck } from "lucide-react";

import type { CliTaskRunDetailReport, CliTaskRunRecordReport, UiLanguage } from "@/types/desktop";

type TaskRunStorePanelProps = {
  uiLanguage: UiLanguage;
  taskRunRecords: CliTaskRunRecordReport[];
  selectedTaskRunRecord: CliTaskRunRecordReport | null;
  taskRunDetail: CliTaskRunDetailReport | null;
  taskRunBusy: boolean;
  taskRunPruneNotice: string;
  invokeAvailable: boolean;
  runningAdapterId: string;
  refreshButtonClassName?: string;
  onRefreshRecords: () => void;
  onPruneRecords: () => void;
  onLoadDetail: (taskRunId: string) => void;
  formatBytes: (value: number) => string;
  formatDuration: (value: number) => string;
};

export function TaskRunStorePanel({
  uiLanguage,
  taskRunRecords,
  selectedTaskRunRecord,
  taskRunDetail,
  taskRunBusy,
  taskRunPruneNotice,
  invokeAvailable,
  runningAdapterId,
  refreshButtonClassName,
  onRefreshRecords,
  onPruneRecords,
  onLoadDetail,
  formatBytes,
  formatDuration
}: TaskRunStorePanelProps) {
  const stats = {
    active: taskRunRecords.filter((record) => isActiveTaskRunStatus(record.status)).length,
    outputBytes: taskRunRecords.reduce((total, record) => total + record.stdoutBytes + record.stderrBytes, 0),
    decisions: taskRunRecords.reduce((total, record) => total + record.decisionInboxItems, 0),
    truncated: taskRunRecords.filter((record) => record.outputTruncated).length
  };

  return (
    <section className="panel wide task-run-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Task Run Store</p>
          <h2>저장된 실행 기록과 로그</h2>
        </div>
        <div className="desktop-actions">
          <button
            type="button"
            className={refreshButtonClassName}
            data-desktop-action-feedback="refresh-task-runs"
            onClick={onRefreshRecords}
            disabled={!invokeAvailable || runningAdapterId !== ""}
          >
            <FileSearch size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "기록 새로고침" : "Refresh Records"}</span>
          </button>
          <button type="button" onClick={onPruneRecords} disabled={!invokeAvailable || taskRunBusy || taskRunRecords.length <= 30}>
            <ShieldCheck size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "오래된 기록 정리" : "Prune Old"}</span>
          </button>
        </div>
      </div>
      {taskRunPruneNotice && <p className="decision-resume-notice">{taskRunPruneNotice}</p>}
      <div className="task-run-summary-strip">
        <article>
          <span>{uiLanguage === "ko" ? "기록" : "records"}</span>
          <strong>{taskRunRecords.length}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "진행 중" : "active"}</span>
          <strong>{stats.active}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "로그 용량" : "log bytes"}</span>
          <strong>{formatBytes(stats.outputBytes)}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "결정" : "decisions"}</span>
          <strong>{stats.decisions}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "잘림" : "truncated"}</span>
          <strong>{stats.truncated}</strong>
        </article>
      </div>
      {taskRunRecords.length === 0 ? (
        <p className="empty-state">아직 저장된 작업 실행 기록이 없습니다. 세션이나 작업 파이프라인을 실행하면 record.json과 표준 출력/오류 로그가 생성됩니다.</p>
      ) : (
        <div className="task-run-store-layout">
          <div className="task-run-grid">
            {taskRunRecords.slice(0, 8).map((record) => (
              <article
                key={record.recordId}
                className={`task-run-card status-${record.status} ${selectedTaskRunRecord?.taskRunId === record.taskRunId ? "active" : ""}`}
              >
                <header>
                  <div>
                    <span>{record.taskKind}</span>
                    <h3>{record.label}</h3>
                  </div>
                  <strong>{record.status}</strong>
                </header>
                <div className="task-run-meta">
                  <span>{record.adapterId}</span>
                  <span>{record.laneId || record.pipelineId || (uiLanguage === "ko" ? "단일 실행 경로" : "single lane")}</span>
                  <span>{formatDuration(record.elapsedMs)}</span>
                  <span>{record.exitCode ?? (uiLanguage === "ko" ? "코드 없음" : "no code")}</span>
                </div>
                <p>{record.recordPath}</p>
                <div className="task-run-log-paths">
                  <code>{record.stdoutLogPath}</code>
                  <code>{record.stderrLogPath}</code>
                </div>
                <div className="adapter-report">
                  <span>{formatBytes(record.stdoutBytes + record.stderrBytes)}</span>
                  <span>{uiLanguage === "ko" ? `${record.pendingDecisionPrompts}개 대기` : `${record.pendingDecisionPrompts} pending`}</span>
                  <span>{record.autoDeferTriggered ? (uiLanguage === "ko" ? "자동 보류됨" : "auto-deferred") : uiLanguage === "ko" ? "기록됨" : "captured"}</span>
                </div>
                <div className="desktop-actions">
                  <button type="button" onClick={() => onLoadDetail(record.taskRunId)} disabled={!invokeAvailable || taskRunBusy}>
                    <FileSearch size={15} aria-hidden="true" />
                    <span>
                      {taskRunBusy && selectedTaskRunRecord?.taskRunId === record.taskRunId
                        ? uiLanguage === "ko"
                          ? "여는 중"
                          : "Opening"
                        : uiLanguage === "ko"
                          ? "로그 열기"
                          : "Open Logs"}
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <article className="task-run-detail">
            <header>
              <div>
                <span>{taskRunDetail?.record.taskRunId || selectedTaskRunRecord?.taskRunId || (uiLanguage === "ko" ? "실행 기록 없음" : "no-task-run")}</span>
                <h3>{taskRunDetail?.record.taskKind || selectedTaskRunRecord?.taskKind || (uiLanguage === "ko" ? "실행 기록 상세" : "Task run detail")}</h3>
              </div>
              <strong>{taskRunDetail?.record.status || selectedTaskRunRecord?.status || "idle"}</strong>
            </header>
            {!taskRunDetail ? (
              <p className="empty-state">
                {uiLanguage === "ko"
                  ? "기록을 선택하고 로그 열기를 누르면 제한된 표준 출력/오류 미리보기와 실행 기록 JSON이 표시됩니다."
                  : "Select a record and open logs to view bounded stdout/stderr previews and the run record JSON."}
              </p>
            ) : (
              <>
                <div className="task-run-detail-meta">
                  <span>{taskRunDetail.record.adapterId}</span>
                  <span>{taskRunDetail.record.laneId || taskRunDetail.record.pipelineId || (uiLanguage === "ko" ? "단일 실행 경로" : "single lane")}</span>
                  <span>{formatBytes(taskRunDetail.record.stdoutBytes + taskRunDetail.record.stderrBytes)}</span>
                  <span>{uiLanguage === "ko" ? `${taskRunDetail.maxLogPreviewBytes.toLocaleString("ko-KR")}바이트 미리보기` : `${taskRunDetail.maxLogPreviewBytes.toLocaleString("ko-KR")} byte preview`}</span>
                </div>
                <div className="task-run-preview-tabs">
                  <article>
                    <span>stdout{taskRunDetail.stdoutTruncated ? ` / ${uiLanguage === "ko" ? "잘림" : "truncated"}` : ""}</span>
                    <pre><code>{taskRunDetail.stdoutPreview || (uiLanguage === "ko" ? "stdout 로그가 없습니다." : "No stdout log")}</code></pre>
                  </article>
                  <article>
                    <span>stderr{taskRunDetail.stderrTruncated ? ` / ${uiLanguage === "ko" ? "잘림" : "truncated"}` : ""}</span>
                    <pre><code>{taskRunDetail.stderrPreview || (uiLanguage === "ko" ? "stderr 로그가 없습니다." : "No stderr log")}</code></pre>
                  </article>
                  <article>
                    <span>{uiLanguage === "ko" ? "실행 기록 JSON" : "record JSON"}</span>
                    <pre><code>{taskRunDetail.recordJson}</code></pre>
                  </article>
                </div>
              </>
            )}
          </article>
        </div>
      )}
    </section>
  );
}

function isActiveTaskRunStatus(status: string) {
  return ["running", "defer_message_sent"].includes(status);
}
