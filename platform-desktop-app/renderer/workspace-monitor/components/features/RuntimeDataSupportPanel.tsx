import { Activity, FileSearch, ShieldCheck } from "lucide-react";

import { PathDisclosure } from "@/components/workbench/PathDisclosure";
import type {
  InstallerPayloadAuditReport,
  RuntimeDataBoundaryReport,
  SupportDiagnosticBundleReport,
  UiLanguage
} from "@/types/desktop";

type RuntimeDataSupportPanelProps = {
  uiLanguage: UiLanguage;
  runtimeDataBoundary: RuntimeDataBoundaryReport | null;
  payloadAudit: InstallerPayloadAuditReport | null;
  supportBundle: SupportDiagnosticBundleReport | null;
  runtimeDataBusy: string;
  runtimeDataNotice: string;
  invokeAvailable: boolean;
  refreshRuntimeRootsButtonClassName?: string;
  auditPayloadButtonClassName?: string;
  supportBundleButtonClassName?: string;
  onRefreshRuntimeRoots: () => void;
  onAuditPayload: () => void;
  onCreateSupportBundle: () => void;
  formatBytes: (value: number) => string;
};

export function RuntimeDataSupportPanel({
  uiLanguage,
  runtimeDataBoundary,
  payloadAudit,
  supportBundle,
  runtimeDataBusy,
  runtimeDataNotice,
  invokeAvailable,
  refreshRuntimeRootsButtonClassName,
  auditPayloadButtonClassName,
  supportBundleButtonClassName,
  onRefreshRuntimeRoots,
  onAuditPayload,
  onCreateSupportBundle,
  formatBytes
}: RuntimeDataSupportPanelProps) {
  const roots = runtimeDataBoundary?.roots || [];
  const stats = {
    roots: roots.length,
    created: roots.filter((root) => root.created).length,
    ready: roots.filter((root) => root.exists).length,
    highFindings: (payloadAudit?.findings || []).filter((finding) => finding.severity === "high").length
  };

  return (
    <section className="panel wide runtime-data-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Runtime Data & Support</p>
          <h2>설치형 데이터 경계</h2>
        </div>
        <div className="desktop-actions">
          <button
            type="button"
            className={refreshRuntimeRootsButtonClassName}
            data-desktop-action-feedback="refresh-runtime-roots"
            onClick={onRefreshRuntimeRoots}
            disabled={!invokeAvailable || runtimeDataBusy !== ""}
          >
            <Activity size={15} aria-hidden="true" />
            <span>{runtimeDataBusy === "roots" ? (uiLanguage === "ko" ? "점검 중" : "Checking") : uiLanguage === "ko" ? "루트 확인" : "Roots"}</span>
          </button>
          <button
            type="button"
            className={auditPayloadButtonClassName}
            data-desktop-action-feedback="audit-payload"
            onClick={onAuditPayload}
            disabled={!invokeAvailable || runtimeDataBusy !== ""}
          >
            <ShieldCheck size={15} aria-hidden="true" />
            <span>{runtimeDataBusy === "payload" ? (uiLanguage === "ko" ? "감사 중" : "Auditing") : uiLanguage === "ko" ? "페이로드 감사" : "Audit Payload"}</span>
          </button>
          <button
            type="button"
            className={supportBundleButtonClassName}
            data-desktop-action-feedback="create-support-bundle"
            onClick={onCreateSupportBundle}
            disabled={!invokeAvailable || runtimeDataBusy !== ""}
          >
            <FileSearch size={15} aria-hidden="true" />
            <span>{runtimeDataBusy === "support" ? (uiLanguage === "ko" ? "생성 중" : "Creating") : uiLanguage === "ko" ? "지원 번들" : "Support Bundle"}</span>
          </button>
        </div>
      </div>
      {runtimeDataNotice && <p className="decision-resume-notice">{runtimeDataNotice}</p>}
      <div className="task-run-summary-strip">
        <article>
          <span>{uiLanguage === "ko" ? "루트" : "roots"}</span>
          <strong>{stats.roots}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "준비됨" : "ready"}</span>
          <strong>{stats.ready}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "생성됨" : "created"}</span>
          <strong>{stats.created}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "페이로드 발견" : "payload findings"}</span>
          <strong>{payloadAudit?.flaggedCount ?? 0}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "높음" : "high"}</span>
          <strong>{stats.highFindings}</strong>
        </article>
      </div>

      <div className="runtime-data-layout">
        <div className="runtime-root-grid">
          {roots.slice(0, 10).map((root) => (
            <article key={root.id} className={root.exists ? "ready" : "missing"}>
              <header>
                <div>
                  <span>{root.plane}</span>
                  <h3>{root.label}</h3>
                </div>
                <strong>{root.created ? (uiLanguage === "ko" ? "생성됨" : "created") : root.exists ? (uiLanguage === "ko" ? "준비됨" : "ready") : uiLanguage === "ko" ? "없음" : "missing"}</strong>
              </header>
              <p>{root.purpose}</p>
              <PathDisclosure label="세부 경로" value={root.path} />
              <div className="adapter-report">
                <span>{root.id}</span>
                <span>{root.visibility}</span>
              </div>
            </article>
          ))}
          {!runtimeDataBoundary && (
            <p className="empty-state">런타임 루트 상태가 아직 로드되지 않았습니다.</p>
          )}
        </div>

        <article className="runtime-audit-card">
          <header>
            <div>
              <span>{payloadAudit?.status || "not-scanned"}</span>
              <h3>{uiLanguage === "ko" ? "설치 페이로드 감사" : "Installer Payload Audit"}</h3>
            </div>
            <strong>{payloadAudit?.flaggedCount ?? 0}</strong>
          </header>
          <div className="task-run-detail-meta">
            <span>{payloadAudit ? (uiLanguage === "ko" ? `${payloadAudit.scannedFiles}개 파일` : `${payloadAudit.scannedFiles} files`) : uiLanguage === "ko" ? "0개 파일" : "0 files"}</span>
            <span>{payloadAudit ? formatBytes(payloadAudit.scannedBytes) : "0 B"}</span>
            <span>{payloadAudit?.maxScanFiles ?? 0} max</span>
          </div>
          <PathDisclosure label="감사 보고서 경로" value={payloadAudit?.auditPath || (uiLanguage === "ko" ? "감사 보고서 없음" : "No audit report yet")} />
          <div className="payload-finding-list">
            {(payloadAudit?.findings || []).slice(0, 6).map((finding) => (
              <div key={`${finding.ruleId}-${finding.path}`}>
                <strong>{finding.severity}</strong>
                <span>{finding.ruleId}</span>
                <p>{finding.reason}</p>
                <code>{finding.path}</code>
              </div>
            ))}
            {payloadAudit && payloadAudit.findings.length === 0 && <p className="empty-state">{uiLanguage === "ko" ? "페이로드 문제를 찾지 못했습니다." : "No payload findings."}</p>}
          </div>
        </article>

        <article className="runtime-audit-card">
          <header>
            <div>
              <span>{supportBundle?.status || "not-created"}</span>
              <h3>{uiLanguage === "ko" ? "지원 진단 번들" : "Support Diagnostic Bundle"}</h3>
            </div>
            <strong>{supportBundle?.redacted ? (uiLanguage === "ko" ? "민감정보 제거됨" : "redacted") : uiLanguage === "ko" ? "대기 중" : "idle"}</strong>
          </header>
          <div className="support-bundle-grid">
            <PathDisclosure label={uiLanguage === "ko" ? "매니페스트" : "Manifest"} value={supportBundle?.manifestPath || (uiLanguage === "ko" ? "매니페스트 없음" : "No manifest yet")} />
            <PathDisclosure label={uiLanguage === "ko" ? "런타임 루트" : "Runtime roots"} value={supportBundle?.runtimeRootsPath || (uiLanguage === "ko" ? "런타임 루트 내보내기 없음" : "No runtime roots export")} />
            <PathDisclosure label={uiLanguage === "ko" ? "페이로드 감사" : "Payload audit"} value={supportBundle?.installerPayloadAuditPath || (uiLanguage === "ko" ? "페이로드 감사 내보내기 없음" : "No payload audit export")} />
            <PathDisclosure label={uiLanguage === "ko" ? "실행 기록 요약" : "Task run summary"} value={supportBundle?.taskRunSummaryPath || (uiLanguage === "ko" ? "실행 기록 요약 없음" : "No task-run summary")} />
            <PathDisclosure label={uiLanguage === "ko" ? "최근 이벤트" : "Recent events"} value={supportBundle?.recentEventsPath || (uiLanguage === "ko" ? "최근 이벤트 로그 없음" : "No recent events log")} />
          </div>
        </article>
      </div>
    </section>
  );
}
