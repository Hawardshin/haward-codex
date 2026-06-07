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
  const copy = uiLanguage === "ko"
    ? {
        title: "실행 연결",
        refresh: "갱신",
        refreshAria: "CLI 어댑터 상태 새로고침",
        runAll: "점검",
        running: "실행 중",
        runAllAria: "모든 CLI 어댑터 상태 점검",
        shell: "쉘",
        disconnected: "연결 안됨",
        uiSource: "UI",
        executionScope: "범위",
        executionScopeValue: "제한 실행",
        stateOwner: "상태",
        stateOwnerValue: "앱 소유",
        available: "사용 가능",
        missing: "누락",
        noStatus: "상태 상세 없음",
        verify: "검증",
        setup: "설치",
        ready: "준비됨",
        setupLater: "나중에 설정",
        lanes: "경로",
        checked: "확인됨",
        unchecked: "미확인",
        health: "점검",
        healthAria: (label: string) => `${label} 상태 점검`,
        accounts: "계정",
        accountsAria: "제공자 계정 연결 열기",
        noCode: "코드 없음"
      }
    : {
        title: "Runtime Connections",
        refresh: "Refresh",
        refreshAria: "Refresh CLI adapter status",
        runAll: "Check",
        running: "Running",
        runAllAria: "Run all CLI adapter checks",
        shell: "Shell",
        disconnected: "not connected",
        uiSource: "UI",
        executionScope: "Scope",
        executionScopeValue: "bounded",
        stateOwner: "State",
        stateOwnerValue: "app-owned",
        available: "available",
        missing: "missing",
        noStatus: "No status detail",
        verify: "Verify",
        setup: "Setup",
        ready: "ready",
        setupLater: "setup later",
        lanes: "lanes",
        checked: "checked",
        unchecked: "unchecked",
        health: "Check",
        healthAria: (label: string) => `Check ${label} health`,
        accounts: "Accounts",
        accountsAria: "Open provider account connections",
        noCode: "no code"
      };

  return (
    <section className="panel wide desktop-control-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">{uiLanguage === "ko" ? "기능 통합 센터" : "Capability Center"}</p>
          <h2>{copy.title}</h2>
        </div>
        <div className="desktop-actions">
          <button
            type="button"
            onClick={() => void onRefreshAdapters()}
            disabled={runningAdapterId !== ""}
            aria-label={copy.refreshAria}
            title={copy.refreshAria}
          >
            <Activity size={16} aria-hidden="true" />
            <span>{copy.refresh}</span>
          </button>
          <button
            type="button"
            className={checkAdaptersButtonClassName}
            data-desktop-action-feedback="check-adapters"
            onClick={() => void onRunAllHealthChecks()}
            disabled={!invokeAvailable || runningAdapterId !== ""}
            aria-label={copy.runAllAria}
            title={copy.runAllAria}
          >
            <CheckCircle2 size={16} aria-hidden="true" />
            <span>{runningAdapterId === "all" ? copy.running : copy.runAll}</span>
          </button>
        </div>
      </div>

      {error && <p className="desktop-error">{error}</p>}

      <div className="desktop-health-strip">
        <article>
          <span>{copy.shell}</span>
          <strong>{health?.shell || copy.disconnected}</strong>
        </article>
        <article>
          <span>{copy.uiSource}</span>
          <strong>{health?.uiSource || "workspace-monitor"}</strong>
        </article>
        <article>
          <span>{copy.executionScope}</span>
          <strong>{copy.executionScopeValue}</strong>
        </article>
        <article>
          <span>{copy.stateOwner}</span>
          <strong>{copy.stateOwnerValue}</strong>
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
                <strong>{adapter.available ? copy.available : copy.missing}</strong>
              </header>
              <p>
                <code>{adapter.command}</code>
                {adapter.version ? ` / ${adapter.version}` : ""}
              </p>
              <small>{adapter.resolvedPath || adapter.lastError || copy.noStatus}</small>
              {setupGuide && (
                <div className="adapter-setup-guide">
                  <span>{adapter.available ? copy.verify : copy.setup}</span>
                  <code>{adapter.available ? guideVerify || adapter.command : guideInstall || adapter.command}</code>
                  <small>{setupGuide.sourceUrl}</small>
                  <small>{guideCaution}</small>
                </div>
              )}
              <div className="capability-meta-grid">
                <span>{adapter.available ? copy.ready : copy.setupLater}</span>
                <span>{providerAuthStatusForAdapter(adapter.adapterId, providerCredentialReport, uiLanguage)}</span>
                <span>{adapterSessionCount} {copy.lanes}</span>
                <span>{adapterChecked ? copy.checked : copy.unchecked}</span>
              </div>
              <div className="adapter-card-actions">
                <button
                  type="button"
                  onClick={() => void onRunSingleHealthCheck(adapter.adapterId)}
                  disabled={!invokeAvailable || runningAdapterId !== "" || !adapter.available}
                  aria-label={copy.healthAria(adapter.label)}
                  title={copy.healthAria(adapter.label)}
                >
                  <Activity size={15} aria-hidden="true" />
                  <span>{running ? copy.running : copy.health}</span>
                </button>
                <button type="button" onClick={() => onOpenSettings("providers")} aria-label={copy.accountsAria} title={copy.accountsAria}>
                  <KeyRound size={15} aria-hidden="true" />
                  <span>{copy.accounts}</span>
                </button>
              </div>
              {report && (
                <div className="adapter-report">
                  <span>{report.status}</span>
                  <span>{report.durationMs}ms</span>
                  <span>{report.exitCode ?? copy.noCode}</span>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
