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
  const visibleRoots = roots.slice(0, 6);
  const hiddenRootCount = Math.max(0, roots.length - visibleRoots.length);
  const stats = {
    roots: roots.length,
    created: roots.filter((root) => root.created).length,
    ready: roots.filter((root) => root.exists).length,
    highFindings: (payloadAudit?.findings || []).filter((finding) => finding.severity === "high").length
  };
  const copy = uiLanguage === "ko"
    ? {
        title: "데이터 경계",
        roots: "루트",
        checking: "점검 중",
        rootsAria: "런타임 데이터 루트 확인",
        audit: "감사",
        auditing: "감사 중",
        auditAria: "설치 페이로드 감사",
        bundle: "번들",
        creating: "생성 중",
        bundleAria: "지원 진단 번들 생성",
        ready: "준비됨",
        created: "생성됨",
        payloadFindings: "발견",
        high: "높음",
        missing: "없음",
        pathDetail: "경로",
        notLoaded: "런타임 루트 상태가 아직 로드되지 않았습니다.",
        moreRoots: (count: number) => `루트 ${count}개 더 있음`,
        installerAudit: "페이로드 감사",
        files: (count: number) => `${count}개 파일`,
        noFiles: "0개 파일",
        noAudit: "감사 보고서 없음",
        noFindings: "페이로드 문제를 찾지 못했습니다.",
        supportBundle: "진단 번들",
        redacted: "민감정보 제거됨",
        idle: "대기 중",
        manifest: "매니페스트",
        noManifest: "매니페스트 없음",
        runtimeRoots: "런타임 루트",
        noRuntimeRoots: "런타임 루트 내보내기 없음",
        payloadAudit: "페이로드 감사",
        noPayloadAudit: "페이로드 감사 내보내기 없음",
        taskRunSummary: "실행 기록 요약",
        noTaskRunSummary: "실행 기록 요약 없음",
        recentEvents: "최근 이벤트",
        noRecentEvents: "최근 이벤트 로그 없음"
      }
    : {
        title: "Data Boundary",
        roots: "Roots",
        checking: "Checking",
        rootsAria: "Check runtime data roots",
        audit: "Audit",
        auditing: "Auditing",
        auditAria: "Audit installer payload",
        bundle: "Bundle",
        creating: "Creating",
        bundleAria: "Create support diagnostic bundle",
        ready: "ready",
        created: "created",
        payloadFindings: "findings",
        high: "high",
        missing: "missing",
        pathDetail: "Path",
        notLoaded: "Runtime root status has not loaded yet.",
        moreRoots: (count: number) => `${count} more roots`,
        installerAudit: "Payload Audit",
        files: (count: number) => `${count} files`,
        noFiles: "0 files",
        noAudit: "No audit report yet",
        noFindings: "No payload findings.",
        supportBundle: "Diagnostic Bundle",
        redacted: "redacted",
        idle: "idle",
        manifest: "Manifest",
        noManifest: "No manifest yet",
        runtimeRoots: "Runtime roots",
        noRuntimeRoots: "No runtime roots export",
        payloadAudit: "Payload audit",
        noPayloadAudit: "No payload audit export",
        taskRunSummary: "Task run summary",
        noTaskRunSummary: "No task-run summary",
        recentEvents: "Recent events",
        noRecentEvents: "No recent events log"
      };

  return (
    <section className="panel wide runtime-data-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Runtime Data & Support</p>
          <h2>{copy.title}</h2>
        </div>
        <div className="desktop-actions">
          <button
            type="button"
            className={refreshRuntimeRootsButtonClassName}
            data-desktop-action-feedback="refresh-runtime-roots"
            onClick={onRefreshRuntimeRoots}
            disabled={!invokeAvailable || runtimeDataBusy !== ""}
            aria-label={copy.rootsAria}
            title={copy.rootsAria}
          >
            <Activity size={15} aria-hidden="true" />
            <span>{runtimeDataBusy === "roots" ? copy.checking : copy.roots}</span>
          </button>
          <button
            type="button"
            className={auditPayloadButtonClassName}
            data-desktop-action-feedback="audit-payload"
            onClick={onAuditPayload}
            disabled={!invokeAvailable || runtimeDataBusy !== ""}
            aria-label={copy.auditAria}
            title={copy.auditAria}
          >
            <ShieldCheck size={15} aria-hidden="true" />
            <span>{runtimeDataBusy === "payload" ? copy.auditing : copy.audit}</span>
          </button>
          <button
            type="button"
            className={supportBundleButtonClassName}
            data-desktop-action-feedback="create-support-bundle"
            onClick={onCreateSupportBundle}
            disabled={!invokeAvailable || runtimeDataBusy !== ""}
            aria-label={copy.bundleAria}
            title={copy.bundleAria}
          >
            <FileSearch size={15} aria-hidden="true" />
            <span>{runtimeDataBusy === "support" ? copy.creating : copy.bundle}</span>
          </button>
        </div>
      </div>
      {runtimeDataNotice && <p className="decision-resume-notice">{runtimeDataNotice}</p>}
      <div className="task-run-summary-strip">
        <article>
          <span>{copy.roots}</span>
          <strong>{stats.roots}</strong>
        </article>
        <article>
          <span>{copy.ready}</span>
          <strong>{stats.ready}</strong>
        </article>
        <article>
          <span>{copy.created}</span>
          <strong>{stats.created}</strong>
        </article>
        <article>
          <span>{copy.payloadFindings}</span>
          <strong>{payloadAudit?.flaggedCount ?? 0}</strong>
        </article>
        <article>
          <span>{copy.high}</span>
          <strong>{stats.highFindings}</strong>
        </article>
      </div>

      <div className="runtime-data-layout">
        <div className="runtime-root-grid">
          {visibleRoots.map((root) => (
            <article key={root.id} className={root.exists ? "ready" : "missing"}>
              <header>
                <div>
                  <span>{root.plane}</span>
                  <h3>{root.label}</h3>
                </div>
                <strong>{root.created ? copy.created : root.exists ? copy.ready : copy.missing}</strong>
              </header>
              <p>{root.purpose}</p>
              <PathDisclosure label={copy.pathDetail} value={root.path} />
              <div className="adapter-report">
                <span>{root.id}</span>
                <span>{root.visibility}</span>
              </div>
            </article>
          ))}
          {!runtimeDataBoundary && (
            <p className="empty-state">{copy.notLoaded}</p>
          )}
          {hiddenRootCount > 0 && (
            <p className="empty-state compact">{copy.moreRoots(hiddenRootCount)}</p>
          )}
        </div>

        <article className="runtime-audit-card">
          <header>
            <div>
              <span>{payloadAudit?.status || "not-scanned"}</span>
              <h3>{copy.installerAudit}</h3>
            </div>
            <strong>{payloadAudit?.flaggedCount ?? 0}</strong>
          </header>
          <div className="task-run-detail-meta">
            <span>{payloadAudit ? copy.files(payloadAudit.scannedFiles) : copy.noFiles}</span>
            <span>{payloadAudit ? formatBytes(payloadAudit.scannedBytes) : "0 B"}</span>
            <span>{payloadAudit?.maxScanFiles ?? 0} max</span>
          </div>
          <PathDisclosure label={copy.pathDetail} value={payloadAudit?.auditPath || copy.noAudit} />
          <div className="payload-finding-list">
            {(payloadAudit?.findings || []).slice(0, 6).map((finding) => (
              <div key={`${finding.ruleId}-${finding.path}`}>
                <strong>{finding.severity}</strong>
                <span>{finding.ruleId}</span>
                <p>{finding.reason}</p>
                <code>{finding.path}</code>
              </div>
            ))}
            {payloadAudit && payloadAudit.findings.length === 0 && <p className="empty-state">{copy.noFindings}</p>}
          </div>
        </article>

        <article className="runtime-audit-card">
          <header>
            <div>
              <span>{supportBundle?.status || "not-created"}</span>
              <h3>{copy.supportBundle}</h3>
            </div>
            <strong>{supportBundle?.redacted ? copy.redacted : copy.idle}</strong>
          </header>
          <div className="support-bundle-grid">
            <PathDisclosure label={copy.manifest} value={supportBundle?.manifestPath || copy.noManifest} />
            <PathDisclosure label={copy.runtimeRoots} value={supportBundle?.runtimeRootsPath || copy.noRuntimeRoots} />
            <PathDisclosure label={copy.payloadAudit} value={supportBundle?.installerPayloadAuditPath || copy.noPayloadAudit} />
            <PathDisclosure label={copy.taskRunSummary} value={supportBundle?.taskRunSummaryPath || copy.noTaskRunSummary} />
            <PathDisclosure label={copy.recentEvents} value={supportBundle?.recentEventsPath || copy.noRecentEvents} />
          </div>
        </article>
      </div>
    </section>
  );
}
