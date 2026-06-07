import { Activity, CheckCircle2, KeyRound } from "lucide-react";

import type {
  CliAdapterStatus,
  CliRunReport,
  CliSessionReport,
  DesktopHealthStatus,
  ProviderCredentialReport,
  UiLanguage
} from "@/types/desktop";

import { adapterSetupGuides, localizedAdapterGuideText, providerAuthStatusForAdapter } from "./runtimeCatalog";

type DesktopControlPanelProps = {
  uiLanguage: UiLanguage;
  adapters: CliAdapterStatus[];
  reports: CliRunReport[];
  sessions: CliSessionReport[];
  health: DesktopHealthStatus | null;
  error: string;
  runningAdapterId: string;
  providerCredentialReport?: ProviderCredentialReport | null;
  invokeAvailable: boolean;
  checkAdaptersButtonClassName?: string;
  onRefreshAdapters: () => void | Promise<void>;
  onRunAllHealthChecks: () => void | Promise<void>;
  onRunSingleHealthCheck: (adapterId: string) => void | Promise<void>;
  onOpenSettings: (subsectionId: "providers") => void;
};

export function DesktopControlPanel({
  uiLanguage,
  adapters,
  reports,
  sessions,
  health,
  error,
  runningAdapterId,
  providerCredentialReport,
  invokeAvailable,
  checkAdaptersButtonClassName,
  onRefreshAdapters,
  onRunAllHealthChecks,
  onRunSingleHealthCheck,
  onOpenSettings
}: DesktopControlPanelProps) {
  return (
    <section className="panel wide desktop-control-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{uiLanguage === "ko" ? "기능 통합 센터" : "Capability Center"}</p>
          <h2>CLI adapter 상태</h2>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={() => void onRefreshAdapters()} disabled={runningAdapterId !== ""}>
            <Activity size={16} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "새로고침" : "Refresh"}</span>
          </button>
          <button
            type="button"
            className={checkAdaptersButtonClassName}
            data-desktop-action-feedback="check-adapters"
            onClick={() => void onRunAllHealthChecks()}
            disabled={!invokeAvailable || runningAdapterId !== ""}
          >
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>{runningAdapterId === "all" ? (uiLanguage === "ko" ? "실행 중" : "Running") : (uiLanguage === "ko" ? "전체 점검" : "Run All Checks")}</span>
          </button>
        </div>
      </div>

      {error && <p className="desktop-error">{error}</p>}

      <div className="desktop-health-strip">
        <article>
          <span>{uiLanguage === "ko" ? "쉘" : "Shell"}</span>
          <strong>{health?.shell || (uiLanguage === "ko" ? "연결 안됨" : "not connected")}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "UI 소스" : "UI Source"}</span>
          <strong>{health?.uiSource || "workspace-monitor"}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "실행 범위" : "Execution Scope"}</span>
          <strong>{uiLanguage === "ko" ? "제한된 파이프 및 범위 파일" : "bounded pipes and scoped files"}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "상태 소유권" : "Platform state owner"}</span>
          <strong>{uiLanguage === "ko" ? "작업, 결정, 산출물, 검증" : "tasks, decisions, artifacts, validation"}</strong>
        </article>
      </div>

      <div className="adapter-grid">
        {adapters.map((adapter) => {
          const report = reports.find((item) => item.adapterId === adapter.adapterId);
          const running = runningAdapterId === adapter.adapterId;
          const setupGuide = adapterSetupGuides[adapter.adapterId];
          const guideInstall = localizedAdapterGuideText(setupGuide, uiLanguage, "installHint");
          const guideVerify = localizedAdapterGuideText(setupGuide, uiLanguage, "verifyCommand");
          const guideCaution = localizedAdapterGuideText(setupGuide, uiLanguage, "caution");
          const adapterSessionCount = sessions.filter((session) => session.adapterId === adapter.adapterId).length;
          const adapterChecked = reports.some((item) => item.adapterId === adapter.adapterId);

          return (
            <article key={adapter.adapterId} className={adapter.available ? "adapter-card available" : "adapter-card missing"}>
              <header>
                <div>
                  <span>{adapter.adapterId}</span>
                  <h3>{adapter.label}</h3>
                </div>
                <strong>{adapter.available ? (uiLanguage === "ko" ? "사용 가능" : "available") : uiLanguage === "ko" ? "누락" : "missing"}</strong>
              </header>
              <p>
                <code>{adapter.command}</code>
                {adapter.version ? ` / ${adapter.version}` : ""}
              </p>
              <small>{adapter.resolvedPath || adapter.lastError || (uiLanguage === "ko" ? "상태 상세 없음" : "No status detail")}</small>
              {setupGuide && (
                <div className="adapter-setup-guide">
                  <span>{adapter.available ? (uiLanguage === "ko" ? "검증" : "Verify") : uiLanguage === "ko" ? "설치" : "Setup"}</span>
                  <code>{adapter.available ? guideVerify || adapter.command : guideInstall || adapter.command}</code>
                  <small>{setupGuide.sourceUrl}</small>
                  <small>{guideCaution}</small>
                </div>
              )}
              <div className="capability-meta-grid">
                <span>{adapter.available ? (uiLanguage === "ko" ? "준비됨" : "ready") : uiLanguage === "ko" ? "나중에 설정" : "setup-later"}</span>
                <span>{providerAuthStatusForAdapter(adapter.adapterId, providerCredentialReport, uiLanguage)}</span>
                <span>{adapterSessionCount} {uiLanguage === "ko" ? "경로" : "lanes"}</span>
                <span>{adapterChecked ? (uiLanguage === "ko" ? "확인됨" : "checked") : (uiLanguage === "ko" ? "미확인" : "unchecked")}</span>
              </div>
              <div className="adapter-card-actions">
                <button
                  type="button"
                  onClick={() => void onRunSingleHealthCheck(adapter.adapterId)}
                  disabled={!invokeAvailable || runningAdapterId !== "" || !adapter.available}
                >
                  <Activity size={15} aria-hidden="true" />
                  <span>{running ? (uiLanguage === "ko" ? "실행 중" : "Running") : uiLanguage === "ko" ? "상태 점검" : "Health Check"}</span>
                </button>
                <button type="button" onClick={() => onOpenSettings("providers")}>
                  <KeyRound size={15} aria-hidden="true" />
                  <span>{uiLanguage === "ko" ? "계정 연결" : "Accounts"}</span>
                </button>
              </div>
              {report && (
                <div className="adapter-report">
                  <span>{report.status}</span>
                  <span>{report.durationMs}ms</span>
                  <span>{report.exitCode ?? (uiLanguage === "ko" ? "코드 없음" : "no code")}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
