import { Database } from "lucide-react";

import { PathDisclosure } from "@/components/workbench/PathDisclosure";
import type { AccumulatedDataOverviewReport, RuntimeDataBoundaryReport, UiLanguage } from "@/types/desktop";

type AccumulatedDataStats = {
  stores: number;
  visibleStores: number;
  records: number;
  bytes: number;
  latestUpdatedAt: string;
  boundedScanMaxFiles: number;
};

type AccumulatedDataPanelProps = {
  uiLanguage: UiLanguage;
  accumulatedDataOverview: AccumulatedDataOverviewReport | null;
  accumulatedDataStats: AccumulatedDataStats;
  accumulatedDataBusy: boolean;
  accumulatedDataNotice: string;
  runtimeDataBoundary: RuntimeDataBoundaryReport | null;
  invokeAvailable: boolean;
  refreshButtonClassName?: string;
  onRefreshOverview: () => void;
  formatBytes: (value: number) => string;
  formatTimeLabel: (value: string) => string;
};

export function AccumulatedDataPanel({
  uiLanguage,
  accumulatedDataOverview,
  accumulatedDataStats,
  accumulatedDataBusy,
  accumulatedDataNotice,
  runtimeDataBoundary,
  invokeAvailable,
  refreshButtonClassName,
  onRefreshOverview,
  formatBytes,
  formatTimeLabel
}: AccumulatedDataPanelProps) {
  const stores = accumulatedDataOverview?.stores || [];
  const summary = accumulatedDataOverview?.summary || [
    uiLanguage === "ko"
      ? "인덱스를 실행하면 작업 실행, 결정, 감사, 지원 번들, 에이전트 작업공간 기록을 불러옵니다."
      : "Run the index to load task runs, decisions, audits, support bundles, and agent workspace records."
  ];

  return (
    <section className="panel wide accumulated-data-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Accumulated Data</p>
          <h2>축적 데이터 인덱스</h2>
        </div>
        <div className="desktop-actions">
          <button
            type="button"
            className={refreshButtonClassName}
            data-desktop-action-feedback="refresh-accumulated-data"
            onClick={onRefreshOverview}
            disabled={!invokeAvailable || accumulatedDataBusy}
          >
            <Database size={15} aria-hidden="true" />
            <span>{accumulatedDataBusy ? (uiLanguage === "ko" ? "새로고침 중" : "Refreshing") : uiLanguage === "ko" ? "인덱스 새로고침" : "Refresh Index"}</span>
          </button>
        </div>
      </div>
      {accumulatedDataNotice && <p className="decision-resume-notice">{accumulatedDataNotice}</p>}
      <div className="task-run-summary-strip">
        <article>
          <span>{uiLanguage === "ko" ? "저장소" : "stores"}</span>
          <strong>{accumulatedDataStats.visibleStores}/{accumulatedDataStats.stores}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "기록" : "records"}</span>
          <strong>{accumulatedDataStats.records}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "총 용량" : "total size"}</span>
          <strong>{formatBytes(accumulatedDataStats.bytes)}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "최근" : "latest"}</span>
          <strong>{accumulatedDataStats.latestUpdatedAt ? formatTimeLabel(accumulatedDataStats.latestUpdatedAt) : "idle"}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "스캔 한도" : "scan cap"}</span>
          <strong>{accumulatedDataStats.boundedScanMaxFiles || "n/a"}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "형식" : "format"}</span>
          <strong>{accumulatedDataOverview?.schemaVersion || "pending"}</strong>
        </article>
      </div>

      <div className="accumulated-data-layout">
        <div className="accumulated-store-grid">
          {stores.map((store) => (
            <article key={store.id} className={`accumulated-store-card status-${store.status}`}>
              <header>
                <div>
                  <span>{store.recordType}</span>
                  <h3>{store.label}</h3>
                </div>
                <strong>{store.status}</strong>
              </header>
              <div className="accumulated-store-stats">
                <span>{uiLanguage === "ko" ? `${store.count}개 기록` : `${store.count} records`}</span>
                <span>{formatBytes(store.sizeBytes)}</span>
                <span>{store.latestUpdatedAt ? formatTimeLabel(store.latestUpdatedAt) : "idle"}</span>
              </div>
              <p>{store.purpose}</p>
              <PathDisclosure label="세부 경로" value={store.path} />
              <div className="adapter-report">
                <span>{store.plane}</span>
                <span>{store.visibility}</span>
                <span>{store.actionLabel}</span>
              </div>
            </article>
          ))}
          {!accumulatedDataOverview && (
            <p className="empty-state">누적 데이터 인덱스가 아직 로드되지 않았습니다.</p>
          )}
        </div>

        <article className="accumulated-data-map">
          <header>
            <div>
              <span>{accumulatedDataOverview?.status || (uiLanguage === "ko" ? "불러오지 않음" : "not loaded")}</span>
              <h3>{uiLanguage === "ko" ? "사용자에게 보이는 데이터 지도" : "User-visible data map"}</h3>
            </div>
            <Database size={18} aria-hidden="true" />
          </header>
          <div className="accumulated-summary-list">
            {summary.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className="task-run-detail-meta">
            <span>{accumulatedDataOverview ? formatTimeLabel(accumulatedDataOverview.generatedAt) : "idle"}</span>
            <span>{accumulatedDataOverview?.status || (uiLanguage === "ko" ? "불러오지 않음" : "not-loaded")}</span>
            <span>{accumulatedDataOverview?.formatMigrationStatus || (uiLanguage === "ko" ? "매니페스트 대기" : "manifest-pending")}</span>
          </div>
          <PathDisclosure
            label="인덱스 저장 위치"
            value={accumulatedDataOverview?.indexPath || runtimeDataBoundary?.taskRunStorePath || "runtime data root pending"}
          />
          {accumulatedDataOverview && (
            <div className="adapter-report">
              <span>{accumulatedDataOverview.schemaVersion}</span>
              <span>{accumulatedDataOverview.storageFormatVersion}</span>
            </div>
          )}
        </article>
      </div>
    </section>
  );
}
