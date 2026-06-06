"use client";

import {
  Activity,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileSearch,
  Gauge,
  GitBranch,
  History,
  Layers,
  Scale,
  Wrench
} from "lucide-react";

import type { WorkspaceSnapshot } from "@/lib/snapshot";
import { evalScenarios } from "@/components/features/evaluationReportCatalog";
import {
  buildEvaluationReportModel,
  formatEvalPercent
} from "@/components/features/evaluationReportModel";
import type { EvalRuntimeTelemetrySignal } from "@/components/features/evaluationReportModel";

type EvalDocument = WorkspaceSnapshot["documents"][number];
type EvalHistoryDay = WorkspaceSnapshot["historyDays"][number];
type EvalOpsEvent = NonNullable<WorkspaceSnapshot["unifiedOps"]>["events"][number];
type EvalOpenSourceReferences = NonNullable<WorkspaceSnapshot["openSourceFeatureReferences"]>;

export type EvaluationReportPanelProps = {
  language: "ko" | "en";
  documents: EvalDocument[];
  historyDays: EvalHistoryDay[];
  unifiedEvents: EvalOpsEvent[];
  stats: WorkspaceSnapshot["stats"];
  activeTasks: number;
  blockedTasks: number;
  openSourceReferences: EvalOpenSourceReferences;
  runtimeTelemetry?: EvalRuntimeTelemetrySignal | null;
  onOpenDocuments: (category?: string) => void;
  onOpenRuntime: () => void;
};

export function EvaluationReportPanel({
  activeTasks,
  blockedTasks,
  documents,
  historyDays,
  language,
  onOpenDocuments,
  onOpenRuntime,
  openSourceReferences,
  runtimeTelemetry,
  stats,
  unifiedEvents
}: EvaluationReportPanelProps) {
  const ko = language === "ko";
  const {
    bottlenecks,
    comprehensiveImprovementDimensions,
    comprehensiveImprovementScore,
    comprehensiveImprovementState,
    currentWorkScore,
    evaluationDocs,
    evidenceScore,
    historyEvidenceBars,
    latestEvaluation,
    latestRequestTrace,
    latestWebSearch,
    latestWorkSummary,
    openSourceCandidates,
    priorityDimensions,
    requestTraceDocs,
    riskLaneCount,
    runtimeTelemetryAvailable,
    runtimeTelemetryRows,
    structuredTokenCount,
    timingDocs,
    tokenMentionCount,
    tokenScore,
    toolRows,
    validationSignalScore,
    webSearchDocs,
    workSummaryDocs
  } = buildEvaluationReportModel({
    activeTasks,
    blockedTasks,
    documents,
    ko,
    openSourceReferences,
    runtimeTelemetry,
    stats
  });

  return (
    <section className="eval-workbench" data-eval-workbench="open-source-eval-cockpit" aria-label={ko ? "AI 평가 작업대" : "AI evaluation workbench"}>
      <section className="panel wide eval-hero">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">EVAL</p>
            <h2>{ko ? "현재 작업 평가 보고서" : "Current work evaluation report"}</h2>
            <p>
              {ko
                ? "히스토리, 평가, 웹 검색, 작업 시간, 도구 사용 신호를 한 화면에서 비교합니다."
                : "Compare history, evals, web research, timing, and tool-use signals in one surface."}
            </p>
          </div>
          <ClipboardCheck size={20} aria-hidden="true" />
        </div>
        <div className="eval-score-strip">
          <article>
            <Gauge size={17} aria-hidden="true" />
            <span>{ko ? "현재 작업 점수" : "Current work score"}</span>
            <strong>{formatEvalPercent(currentWorkScore)}</strong>
          </article>
          <article>
            <FileSearch size={17} aria-hidden="true" />
            <span>{ko ? "근거 커버리지" : "Evidence coverage"}</span>
            <strong>{formatEvalPercent(evidenceScore)}</strong>
          </article>
          <article>
            <Wrench size={17} aria-hidden="true" />
            <span>{ko ? "툴 기록" : "Tool signals"}</span>
            <strong>{formatEvalPercent(validationSignalScore)}</strong>
          </article>
          <article>
            <Scale size={17} aria-hidden="true" />
            <span>{ko ? "토큰/비용 추적" : "Token/cost trace"}</span>
            <strong>{formatEvalPercent(tokenScore)}</strong>
          </article>
        </div>
        <div className="eval-hero-actions">
          <button type="button" onClick={() => onOpenDocuments("evaluation")}>
            <FileSearch size={15} aria-hidden="true" />
            <span>{ko ? "평가 기록 열기" : "Open eval records"}</span>
          </button>
          <button type="button" onClick={onOpenRuntime}>
            <Activity size={15} aria-hidden="true" />
            <span>{ko ? "런타임 보기" : "Open runtime"}</span>
          </button>
        </div>
      </section>

      <section className="panel wide eval-comprehensive-panel" data-eval-comprehensive-improvement="all-signal-cockpit">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{ko ? "종합 개선" : "Comprehensive Improvement"}</p>
            <h2>{ko ? "전체 개선 cockpit" : "Composite Improvement Cockpit"}</h2>
            <p>
              {ko
                ? "성능, UI, 네이티브 리소스, EVAL, 패키징, 오픈소스, 자동화 신호를 하나의 우선순위로 압축합니다."
                : "Compress performance, UI, native resources, EVAL, packaging, open source, and automation signals into one priority model."}
            </p>
          </div>
          <Gauge size={20} aria-hidden="true" />
        </div>
        <div className="eval-comprehensive-summary" aria-label={ko ? "종합 개선 요약" : "Comprehensive improvement summary"}>
          <article className={`state-${comprehensiveImprovementState}`}>
            <span>{ko ? "종합 점수" : "Composite score"}</span>
            <strong>{formatEvalPercent(comprehensiveImprovementScore)}</strong>
          </article>
          <article>
            <span>{ko ? "위험 lane" : "Risk lanes"}</span>
            <strong>{riskLaneCount.toLocaleString("ko-KR")}</strong>
          </article>
          <article>
            <span>{ko ? "최우선" : "Top priority"}</span>
            <strong>{ko ? priorityDimensions[0]?.labelKo : priorityDimensions[0]?.labelEn}</strong>
          </article>
        </div>
        <div className="eval-comprehensive-grid">
          {comprehensiveImprovementDimensions.map((dimension) => (
            <article key={dimension.id} className={`eval-dimension-card state-${dimension.state}`} data-improvement-dimension={dimension.id}>
              <div>
                <strong>{ko ? dimension.labelKo : dimension.labelEn}</strong>
                <span>{formatEvalPercent(dimension.score)}</span>
              </div>
              <i className="eval-dimension-meter" aria-hidden="true">
                <b style={{ inlineSize: `${dimension.score}%` }} />
              </i>
              <p>{ko ? dimension.evidenceKo : dimension.evidenceEn}</p>
              <small>{ko ? dimension.nextKo : dimension.nextEn}</small>
            </article>
          ))}
        </div>
        <div className="eval-comprehensive-priority">
          {priorityDimensions.map((dimension, index) => (
            <article key={dimension.id}>
              <span>{`P${index + 1}`}</span>
              <strong>{ko ? dimension.labelKo : dimension.labelEn}</strong>
              <p>{ko ? dimension.nextKo : dimension.nextEn}</p>
            </article>
          ))}
        </div>
        <div className="eval-runtime-telemetry-strip" data-eval-runtime-telemetry={runtimeTelemetryAvailable ? "native-sampled" : "browser-preview"}>
          {runtimeTelemetryRows.map((item) => (
            <article key={item.id} data-runtime-metric={item.id}>
              <span>{ko ? item.labelKo : item.labelEn}</span>
              <strong>{item.value}</strong>
              <small>{item.detail}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="eval-report-grid">
        <article className="panel eval-current-card">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">{ko ? "이번 작업" : "Current Work"}</p>
              <h3>{latestWorkSummary?.title || latestEvaluation?.title || (ko ? "최신 작업 기록 없음" : "No recent work record")}</h3>
            </div>
            <CheckCircle2 size={18} aria-hidden="true" />
          </div>
          <dl className="eval-report-list">
            <div>
              <dt>{ko ? "최신 평가" : "Latest eval"}</dt>
              <dd>{latestEvaluation?.title || (ko ? "없음" : "none")}</dd>
            </div>
            <div>
              <dt>{ko ? "요청 추적" : "Request trace"}</dt>
              <dd>{latestRequestTrace?.title || (ko ? "없음" : "none")}</dd>
            </div>
            <div>
              <dt>{ko ? "웹 근거" : "Web evidence"}</dt>
              <dd>{latestWebSearch?.title || (ko ? "없음" : "none")}</dd>
            </div>
          </dl>
        </article>

        <article className="panel eval-history-card">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">{ko ? "히스토리 비교" : "History Comparison"}</p>
              <h3>{historyDays.length.toLocaleString("ko-KR")} days</h3>
            </div>
            <History size={18} aria-hidden="true" />
          </div>
          <div className="eval-history-bars" aria-label={ko ? "히스토리 근거 분포" : "History evidence distribution"}>
            {historyEvidenceBars.map(({ label, value, widthPercent }) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value.toLocaleString("ko-KR")}</strong>
                <i style={{ inlineSize: `${widthPercent}%` }} aria-hidden="true" />
              </div>
            ))}
          </div>
        </article>

        <article className="panel eval-token-card">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">{ko ? "토큰/툴" : "Tokens and Tools"}</p>
              <h3>{ko ? "비교 가능성" : "Comparability"}</h3>
            </div>
            <BarChart3 size={18} aria-hidden="true" />
          </div>
          <div className="eval-token-grid">
            <span>{ko ? "토큰 언급" : "Token mentions"} <strong>{tokenMentionCount.toLocaleString("ko-KR")}</strong></span>
            <span>{ko ? "구조화 토큰" : "Structured token"} <strong>{structuredTokenCount.toLocaleString("ko-KR")}</strong></span>
            <span>{ko ? "통합 신호" : "Ops signals"} <strong>{unifiedEvents.length.toLocaleString("ko-KR")}</strong></span>
            <span>{ko ? "작업 기록" : "Task records"} <strong>{stats.tasks.toLocaleString("ko-KR")}</strong></span>
          </div>
        </article>
      </section>

      <section className="panel wide eval-tool-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{ko ? "툴 사용 비교" : "Tool Use Comparison"}</p>
            <h2>{ko ? "무엇으로 검증했는지" : "What validated the work"}</h2>
          </div>
          <Wrench size={18} aria-hidden="true" />
        </div>
        <div className="eval-tool-grid">
          {toolRows.map((tool) => (
            <article key={tool.id} className={tool.count > 0 ? "recorded" : "weak"}>
              <strong>{tool.label}</strong>
              <span>{tool.role}</span>
              <em>{tool.status}</em>
              <small>{tool.count.toLocaleString("ko-KR")}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="panel wide eval-scenario-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{ko ? "시나리오" : "Scenarios"}</p>
            <h2>{ko ? "평가해야 하는 모든 주요 경우" : "Major cases this surface should evaluate"}</h2>
          </div>
          <Layers size={18} aria-hidden="true" />
        </div>
        <div className="eval-scenario-grid">
          {evalScenarios.map((scenario) => (
            <article key={scenario.id}>
              <GitBranch size={15} aria-hidden="true" />
              <strong>{ko ? scenario.labelKo : scenario.labelEn}</strong>
              <p>{ko ? scenario.purposeKo : scenario.purposeEn}</p>
              <small>{scenario.evidence}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="panel wide eval-open-source-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Open Source EVAL</p>
            <h2>{ko ? "적용 후보와 구조 패턴" : "Candidate tools and structure patterns"}</h2>
          </div>
          <FileSearch size={18} aria-hidden="true" />
        </div>
        <div className="eval-open-source-grid">
          {openSourceCandidates.map((candidate) => (
            <a key={candidate.id} href={candidate.url} target="_blank" rel="noreferrer">
              <span>{candidate.status}</span>
              <strong>{candidate.title}</strong>
              <p>{candidate.focus}</p>
            </a>
          ))}
        </div>
      </section>

      <section className="panel wide eval-bottleneck-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{ko ? "병목과 불편" : "Bottlenecks"}</p>
            <h2>{ko ? "다음 근본 개선 후보" : "Next structural improvement candidates"}</h2>
          </div>
          <Clock3 size={18} aria-hidden="true" />
        </div>
        <div className="eval-bottleneck-list">
          {bottlenecks.map((item) => (
            <article key={item.id} className={`severity-${item.severity}`}>
              <span>{item.severity}</span>
              <strong>{item.label}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
