import { AlertTriangle, Download, RefreshCw, ShieldCheck } from "lucide-react";

import type { AppUpdateCheckReport, AppUpdateInstallReport, ServiceReadinessReport, UiLanguage } from "@/types/desktop";

type ServiceReadinessPanelProps = {
  uiLanguage: UiLanguage;
  serviceReadiness: ServiceReadinessReport | null;
  serviceReadinessBusy: boolean;
  serviceReadinessNotice: string;
  appUpdateCheck: AppUpdateCheckReport | null;
  appUpdateInstall: AppUpdateInstallReport | null;
  appUpdateBusy: string;
  invokeAvailable: boolean;
  refreshButtonClassName?: string;
  checkUpdateButtonClassName?: string;
  installUpdateButtonClassName?: string;
  onRunReadiness: () => void;
  onCheckUpdate: () => void;
  onInstallUpdate: () => void;
  formatTimeLabel: (value: string) => string;
  formatBytes: (value: number) => string;
};

export function ServiceReadinessPanel({
  uiLanguage,
  serviceReadiness,
  serviceReadinessBusy,
  serviceReadinessNotice,
  appUpdateCheck,
  appUpdateInstall,
  appUpdateBusy,
  invokeAvailable,
  refreshButtonClassName,
  checkUpdateButtonClassName,
  installUpdateButtonClassName,
  onRunReadiness,
  onCheckUpdate,
  onInstallUpdate,
  formatTimeLabel,
  formatBytes
}: ServiceReadinessPanelProps) {
  const groups = serviceReadiness?.groups || [];
  const stats = {
    groups: groups.length,
    passedGroups: groups.filter((group) => group.status === "passed").length,
    warnings: serviceReadiness?.warnings.length || 0,
    publicBlockers: serviceReadiness?.publicBlockers.length || 0
  };
  const updateChannel = serviceReadiness?.updateChannel || null;

  return (
    <section className="panel wide service-readiness-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{uiLanguage === "ko" ? "서비스 준비도" : "Service Readiness"}</p>
          <h2>서비스 출시 준비도</h2>
        </div>
        <div className="desktop-actions">
          <button
            type="button"
            className={refreshButtonClassName}
            data-desktop-action-feedback="refresh-service-readiness"
            onClick={onRunReadiness}
            disabled={!invokeAvailable || serviceReadinessBusy}
          >
            <ShieldCheck size={15} aria-hidden="true" />
            <span>{serviceReadinessBusy ? (uiLanguage === "ko" ? "점검 중" : "Checking") : uiLanguage === "ko" ? "준비도 점검" : "Run Readiness"}</span>
          </button>
        </div>
      </div>
      {serviceReadinessNotice && <p className="decision-resume-notice">{serviceReadinessNotice}</p>}
      <div className="service-domain-row" aria-label="Service readiness domains">
        <span>{uiLanguage === "ko" ? "런타임 데이터" : "Runtime Data"}</span>
        <span>{uiLanguage === "ko" ? "고객 페이로드" : "Customer Payload"}</span>
        <span>{uiLanguage === "ko" ? "지원 진단" : "Support Diagnostics"}</span>
        <span>{uiLanguage === "ko" ? "워크스페이스 온보딩" : "Workspace Onboarding"}</span>
        <span>{uiLanguage === "ko" ? "개인정보·로그" : "Privacy & Logging"}</span>
        <span>{uiLanguage === "ko" ? "서명 배포" : "Signed Distribution"}</span>
        <span>{uiLanguage === "ko" ? "업데이트·복구" : "Update & Recovery"}</span>
      </div>
      <div className={`service-readiness-hero status-${serviceReadiness?.status || "unknown"}`}>
        <div>
          <span>{serviceReadiness?.releaseLane || "local_internal"}</span>
          <strong>{serviceReadiness?.status || (uiLanguage === "ko" ? "미점검" : "not checked")}</strong>
          <p>{serviceReadiness?.serviceClaim || "서비스 준비도 보고서를 실행하면 공개 배포 차단 요소와 다음 조치가 표시됩니다."}</p>
        </div>
        <div className="service-score-ring">
          <span>{serviceReadiness?.score ?? 0}</span>
          <small>{uiLanguage === "ko" ? "점수" : "score"}</small>
        </div>
      </div>
      <div className="task-run-summary-strip">
        <article>
          <span>{uiLanguage === "ko" ? "그룹" : "groups"}</span>
          <strong>{stats.passedGroups}/{stats.groups}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "공개 차단 요소" : "Public blockers"}</span>
          <strong>{stats.publicBlockers}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "경고" : "warnings"}</span>
          <strong>{stats.warnings}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "페이로드 발견" : "payload findings"}</span>
          <strong>{serviceReadiness?.payloadFlaggedCount ?? 0}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "생성 시각" : "generated"}</span>
          <strong>{serviceReadiness ? formatTimeLabel(serviceReadiness.generatedAt) : "idle"}</strong>
        </article>
      </div>
      {updateChannel && (
        <article className={`service-update-channel-card status-${updateChannel.configured ? "passed" : "warning"}`}>
          <header>
            <div>
              <span>{uiLanguage === "ko" ? "업데이트 채널" : "Update Channel"}</span>
              <h3>
                {updateChannel.configured
                  ? updateChannel.channel || updateChannel.markerFileName
                  : uiLanguage === "ko"
                    ? "번들된 채널 없음"
                    : "No bundled channel"}
              </h3>
            </div>
            <strong>{updateChannel.status}</strong>
          </header>
          <p>{updateChannel.detail}</p>
          <div className="service-update-actions">
            <button
              type="button"
              className={checkUpdateButtonClassName}
              data-desktop-action-feedback="check-app-update"
              onClick={onCheckUpdate}
              disabled={!invokeAvailable || appUpdateBusy !== ""}
            >
              <RefreshCw size={14} aria-hidden="true" />
              <span>{appUpdateBusy === "check" ? (uiLanguage === "ko" ? "확인 중" : "Checking") : uiLanguage === "ko" ? "업데이트 확인" : "Check Update"}</span>
            </button>
            <button
              type="button"
              className={installUpdateButtonClassName}
              data-desktop-action-feedback="install-app-update"
              onClick={onInstallUpdate}
              disabled={!invokeAvailable || appUpdateBusy !== "" || !appUpdateCheck?.updateAvailable}
            >
              <Download size={14} aria-hidden="true" />
              <span>{appUpdateBusy === "install" ? (uiLanguage === "ko" ? "설치 중" : "Installing") : uiLanguage === "ko" ? "설치 후 재시작" : "Install & Restart"}</span>
            </button>
          </div>
          {(appUpdateCheck || appUpdateInstall) && (
            <div className="service-update-result">
              {appUpdateCheck && (
                <article className={`status-${appUpdateCheck.updateAvailable ? "warning" : appUpdateCheck.status === "updater_unavailable" ? "blocked" : "passed"}`}>
                  <span>{uiLanguage === "ko" ? "업데이트 확인" : "Update check"}</span>
                  <strong>{appUpdateCheck.status}</strong>
                  <p>{appUpdateCheck.detail}</p>
                  {appUpdateCheck.updateAvailable && (
                    <small>{appUpdateCheck.currentVersion} → {appUpdateCheck.version} / {appUpdateCheck.target || "default target"}</small>
                  )}
                </article>
              )}
              {appUpdateInstall && (
                <article className={`status-${appUpdateInstall.installed ? "passed" : "warning"}`}>
                  <span>{uiLanguage === "ko" ? "설치 결과" : "Install result"}</span>
                  <strong>{appUpdateInstall.status}</strong>
                  <p>{appUpdateInstall.detail}</p>
                  <small>{formatBytes(appUpdateInstall.downloadedBytes)} / {appUpdateInstall.contentLength ? formatBytes(appUpdateInstall.contentLength) : "unknown"}</small>
                </article>
              )}
            </div>
          )}
          <div className="service-update-channel-facts">
            <span>
              {uiLanguage === "ko" ? "엔드포인트" : "endpoints"} <strong>{updateChannel.endpointCount}</strong>
            </span>
            <span>
              {uiLanguage === "ko" ? "키 해시" : "key hash"} <strong>{updateChannel.publicKeySha256_16 || "none"}</strong>
            </span>
            <span>
              {uiLanguage === "ko" ? "정적 manifest" : "static manifest"} <strong>{updateChannel.staticManifestEnabled ? "on" : "off"}</strong>
            </span>
            <span>
              {uiLanguage === "ko" ? "키 출처" : "key source"} <strong>{updateChannel.signingPrivateKeySource || "missing"}</strong>
            </span>
          </div>
          <code>{updateChannel.markerPath || "resource marker path pending"}</code>
        </article>
      )}

      <div className="service-readiness-layout">
        <div className="service-group-grid">
          {groups.map((group) => (
            <article key={group.id} className={`service-group-card status-${group.status}`}>
              <header>
                <div>
                  <span>{group.id}</span>
                  <h3>{group.label}</h3>
                </div>
                <strong>{group.status}</strong>
              </header>
              <div className="adapter-report">
                <span>{uiLanguage === "ko" ? `${group.passedChecks}/${group.totalChecks}개 점검` : `${group.passedChecks}/${group.totalChecks} checks`}</span>
                <span>{uiLanguage === "ko" ? `공개 필수 ${group.checks.filter((check) => check.requiredForPublic).length}개` : `${group.checks.filter((check) => check.requiredForPublic).length} public`}</span>
              </div>
              <div className="service-check-list">
                {group.checks.map((check) => (
                  <div key={check.id} className={`status-${check.status}`}>
                    <strong>{check.status}</strong>
                    <span>{check.label}</span>
                    <p>{check.detail}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
          {!serviceReadiness && (
            <p className="empty-state">준비도 점검을 누르면 서명된 배포, 업데이트/복구, 개인정보/로그, 온보딩 부족 항목을 점검합니다.</p>
          )}
        </div>

        <article className="service-next-actions">
          <header>
            <div>
              <span>{uiLanguage === "ko" ? `${serviceReadiness?.publicBlockers.length || 0}개 차단 요소` : `${serviceReadiness?.publicBlockers.length || 0} blockers`}</span>
              <h3>{uiLanguage === "ko" ? "공개 차단 요소 / 다음 조치" : "Public blockers / next actions"}</h3>
            </div>
            <AlertTriangle size={18} aria-hidden="true" />
          </header>
          <div className="service-blocker-list">
            {(serviceReadiness?.nextActions || []).map((action) => (
              <div key={action.checkId} className={`status-${action.status}`}>
                <strong>{action.status}</strong>
                <span>{action.label}</span>
                <p>{action.action}</p>
              </div>
            ))}
            {serviceReadiness && serviceReadiness.nextActions.length === 0 && (
              <p className="empty-state">{uiLanguage === "ko" ? "다음 조치는 없습니다. 공개 준비 완료라고 표현하기 전 최종 릴리스 검증은 아직 필요합니다." : "No next actions. Public readiness still needs final clean release validation before release language."}</p>
            )}
            {!serviceReadiness && (
              <p className="empty-state">공개 서비스 차단 요소는 준비도 보고서 실행 후 표시됩니다.</p>
            )}
          </div>
          <code>{serviceReadiness?.payloadAuditPath || "payload audit path pending"}</code>
        </article>
      </div>
    </section>
  );
}
