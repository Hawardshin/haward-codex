import { CheckCircle2, ClipboardCheck, Database, ShieldCheck } from "lucide-react";

import type { UiLanguage, WorkspaceWriteReport } from "@/types/desktop";

export type SourceSaveResultsPanelProps = {
  formatBytes: (bytes: number) => string;
  latestSourceSaveResult: WorkspaceWriteReport | null;
  sourceSaveResults: WorkspaceWriteReport[];
  sourceSaveTotalBytes: number;
  uiLanguage: UiLanguage;
};

export function SourceSaveResultsPanel({
  formatBytes,
  latestSourceSaveResult,
  sourceSaveResults,
  sourceSaveTotalBytes,
  uiLanguage
}: SourceSaveResultsPanelProps) {
  return (
    <div className="source-save-results source-results-panel">
      <header className="source-results-hero">
        <span className="source-results-hero-icon">
          <ClipboardCheck size={18} aria-hidden="true" />
        </span>
        <div>
          <span>{uiLanguage === "ko" ? "수정 결과" : "Edit results"}</span>
          <strong>
            {sourceSaveResults.length > 0
              ? uiLanguage === "ko"
                ? `${sourceSaveResults.length}개 저장됨`
                : `${sourceSaveResults.length} saved`
              : uiLanguage === "ko"
                ? "저장 기록 없음"
                : "No saved changes"}
          </strong>
          <small>
            {latestSourceSaveResult
              ? latestSourceSaveResult.relativePath
              : uiLanguage === "ko"
                ? "최근 저장 파일 없음"
                : "No recent saved file"}
          </small>
        </div>
      </header>
      <div className="source-results-summary">
        <article>
          <span>{uiLanguage === "ko" ? "최근 파일" : "Latest file"}</span>
          <strong>{latestSourceSaveResult?.relativePath || "-"}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "저장 용량" : "Saved size"}</span>
          <strong>{formatBytes(sourceSaveTotalBytes)}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "백업 상태" : "Backup state"}</span>
          <strong>{sourceSaveResults.length > 0 ? (uiLanguage === "ko" ? "생성됨" : "Created") : "-"}</strong>
        </article>
      </div>
      <div className="source-results-list">
        {sourceSaveResults.length > 0 ? (
          sourceSaveResults.map((report) => (
            <article className="source-save-result-card" key={`${report.relativePath}-${report.backupPath}`}>
              <span className="source-result-status-mark">
                <CheckCircle2 size={16} aria-hidden="true" />
              </span>
              <div className="source-result-content">
                <div className="source-result-titleline">
                  <span className="source-result-lozenge">{report.status}</span>
                  <strong>{report.relativePath}</strong>
                </div>
                <div className="source-result-meta">
                  <span>
                    <Database size={13} aria-hidden="true" />
                    {formatBytes(report.sizeBytes)}
                  </span>
                  <span>
                    <ShieldCheck size={13} aria-hidden="true" />
                    {uiLanguage === "ko" ? "백업 생성" : "backup created"}
                  </span>
                </div>
                <code className="source-result-backup-path">{report.backupPath}</code>
              </div>
            </article>
          ))
        ) : (
          <div className="source-results-empty">
            <span className="source-result-status-mark muted">
              <ClipboardCheck size={16} aria-hidden="true" />
            </span>
            <strong>{uiLanguage === "ko" ? "아직 저장 결과가 없습니다." : "No save results yet."}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

