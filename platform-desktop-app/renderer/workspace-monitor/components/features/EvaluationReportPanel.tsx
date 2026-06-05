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

type EvalDocument = WorkspaceSnapshot["documents"][number];
type EvalHistoryDay = WorkspaceSnapshot["historyDays"][number];
type EvalOpsEvent = NonNullable<WorkspaceSnapshot["unifiedOps"]>["events"][number];
type EvalOpenSourceReferences = NonNullable<WorkspaceSnapshot["openSourceFeatureReferences"]>;

type EvalToolSignal = {
  id: string;
  label: string;
  query: RegExp;
  role: string;
};

type EvalScenario = {
  id: string;
  labelKo: string;
  labelEn: string;
  purposeKo: string;
  purposeEn: string;
  evidence: string;
};

type EvalCandidateRepo = {
  id: string;
  title: string;
  url: string;
  focus: string;
  status: string;
};

export type EvaluationReportPanelProps = {
  language: "ko" | "en";
  documents: EvalDocument[];
  historyDays: EvalHistoryDay[];
  unifiedEvents: EvalOpsEvent[];
  stats: WorkspaceSnapshot["stats"];
  activeTasks: number;
  blockedTasks: number;
  openSourceReferences: EvalOpenSourceReferences;
  onOpenDocuments: (category?: string) => void;
  onOpenRuntime: () => void;
};

const toolSignals: EvalToolSignal[] = [
  {
    id: "browser",
    label: "Browser smoke",
    query: /browser smoke|playwright|section latency|audit-section-switch/i,
    role: "UI 상태와 탭 전환 검증"
  },
  {
    id: "typescript",
    label: "TypeScript",
    query: /tsc --noemit|tsc --noEmit|typescript|type check/i,
    role: "렌더러 타입 계약"
  },
  {
    id: "node-test",
    label: "Node tests",
    query: /node --test|tests? \d+|renderer test|platform test/i,
    role: "회귀 테스트"
  },
  {
    id: "package",
    label: "Internal package",
    query: /package:internal|desktop:package:internal|codesign|hdiutil|dmg/i,
    role: "설치형 앱 산출물"
  },
  {
    id: "rust-tauri",
    label: "Rust/Tauri",
    query: /cargo (check|test|build)|tauri|rust/i,
    role: "네이티브 런타임"
  },
  {
    id: "web-search",
    label: "Web research",
    query: /web search|웹 검색|official docs|source ranking|citation/i,
    role: "외부 근거"
  },
  {
    id: "git",
    label: "Git close-out",
    query: /git push|commit|origin\/main|커밋|push/i,
    role: "작업 완료 추적"
  }
];

const fallbackEvalRepos: EvalCandidateRepo[] = [
  {
    id: "openai-evals",
    title: "OpenAI Evals",
    url: "https://github.com/openai/evals",
    focus: "benchmark registry, private eval patterns, dashboard report links",
    status: "reference"
  },
  {
    id: "inspect-ai",
    title: "Inspect AI",
    url: "https://inspect.aisi.org.uk/",
    focus: "task-based model evaluation, scoring, reproducible eval logs",
    status: "reference"
  },
  {
    id: "promptfoo",
    title: "promptfoo",
    url: "https://github.com/promptfoo/promptfoo",
    focus: "prompt/provider comparison, assertions, CI regression gates",
    status: "candidate"
  },
  {
    id: "deepeval",
    title: "DeepEval",
    url: "https://github.com/confident-ai/deepeval",
    focus: "pytest-style LLM tests, judge metrics, agent/tool-use evals",
    status: "candidate"
  },
  {
    id: "phoenix",
    title: "Arize Phoenix",
    url: "https://github.com/Arize-ai/phoenix",
    focus: "trace debugging, OpenTelemetry/OpenInference, eval datasets",
    status: "candidate"
  },
  {
    id: "opik",
    title: "Opik",
    url: "https://github.com/comet-ml/opik",
    focus: "trace logging, scoring, prompt optimization, local/self-host path",
    status: "candidate"
  },
  {
    id: "langfuse",
    title: "Langfuse",
    url: "https://github.com/langfuse/langfuse",
    focus: "scores on traces, datasets, prompt management, dashboards",
    status: "candidate"
  }
];

const evalScenarios: EvalScenario[] = [
  {
    id: "current-work",
    labelKo: "현재 작업 평가",
    labelEn: "Current Work Eval",
    purposeKo: "이번 작업이 요구사항, 구현, 검증, 빌드, 기록, push까지 닫혔는지 확인합니다.",
    purposeEn: "Check whether the current work closed requirements, implementation, validation, build, records, and push.",
    evidence: "evaluation, request-trace, work-summary, package records"
  },
  {
    id: "history-regression",
    labelKo: "히스토리 회귀",
    labelEn: "History Regression",
    purposeKo: "반복 지적이 다시 생기는지 과거 평가와 요약에서 찾습니다.",
    purposeEn: "Find repeated complaints or regressions in past evaluations and summaries.",
    evidence: "history days, work summaries, omission checks"
  },
  {
    id: "tool-use",
    labelKo: "툴 사용 비교",
    labelEn: "Tool Use Comparison",
    purposeKo: "웹 검색, Browser, 테스트, 패키징, Git close-out 사용 여부를 비교합니다.",
    purposeEn: "Compare web search, Browser, tests, packaging, and Git close-out usage.",
    evidence: "tool-signal text and validation records"
  },
  {
    id: "token-cost",
    labelKo: "토큰/비용 추적",
    labelEn: "Token and Cost Tracking",
    purposeKo: "토큰 수와 모델 비용이 구조화 기록으로 남는지 점검합니다.",
    purposeEn: "Check whether token counts and model cost are captured as structured records.",
    evidence: "token usage mentions and missing structured fields"
  },
  {
    id: "agent-trace",
    labelKo: "에이전트 trace",
    labelEn: "Agent Trace",
    purposeKo: "도구 호출, 결정 보류, 산출물, 검증 단계를 한 run으로 재구성합니다.",
    purposeEn: "Reconstruct tool calls, deferred decisions, artifacts, and validation as one run.",
    evidence: "unified ops and task-run records"
  },
  {
    id: "ui-performance",
    labelKo: "UI/성능 병목",
    labelEn: "UI and Performance Bottlenecks",
    purposeKo: "탭 전환, long task, resident panel, Browser smoke 수치를 같이 봅니다.",
    purposeEn: "Review tab switching, long tasks, resident panels, and Browser smoke together.",
    evidence: "latency audits and resource checks"
  },
  {
    id: "open-source-fit",
    labelKo: "오픈소스 fit",
    labelEn: "Open-Source Fit",
    purposeKo: "외부 eval runner를 설치할지, 현재 local-first 리포트로 충분한지 판단합니다.",
    purposeEn: "Decide whether to install an external eval runner or keep local-first reports.",
    evidence: "open-source reference registry and install policy"
  }
];

function textOf(document: EvalDocument) {
  return `${document.title} ${document.path} ${document.category} ${document.excerpt}`.toLowerCase();
}

function percent(value: number) {
  return `${Math.max(0, Math.min(100, Math.round(value))).toLocaleString("ko-KR")}%`;
}

function scoreFromRatio(value: number, max: number) {
  if (max <= 0) {
    return 0;
  }
  return Math.min(100, Math.round((value / max) * 100));
}

function latestByCategory(documents: EvalDocument[], category: string) {
  return documents.find((document) => document.category === category) || null;
}

function mergeEvalRepos(openSourceReferences: EvalOpenSourceReferences): EvalCandidateRepo[] {
  const layer = openSourceReferences.featureReferenceLayers.find(
    (item) => item.featureId === "learning_improvement_loop" || /evaluation/i.test(item.label)
  );
  const registryCandidates =
    layer?.candidateRepos.map((repo) => ({
      id: repo.id,
      title: repo.title,
      url: repo.url,
      focus: [...repo.watchTargets, ...repo.patternsToExtract].slice(0, 4).join(", "),
      status: layer.installNeededNow ? "install-audit-required" : "registry"
    })) || [];
  const merged = new Map<string, EvalCandidateRepo>();
  for (const candidate of [...registryCandidates, ...fallbackEvalRepos]) {
    if (!merged.has(candidate.id)) {
      merged.set(candidate.id, candidate);
    }
  }
  return Array.from(merged.values()).slice(0, 9);
}

export function EvaluationReportPanel({
  activeTasks,
  blockedTasks,
  documents,
  historyDays,
  language,
  onOpenDocuments,
  onOpenRuntime,
  openSourceReferences,
  stats,
  unifiedEvents
}: EvaluationReportPanelProps) {
  const ko = language === "ko";
  const evaluationDocs = documents.filter((document) => document.category === "evaluation");
  const webSearchDocs = documents.filter((document) => document.category === "web-search");
  const workSummaryDocs = documents.filter((document) => document.category === "work-summary");
  const requestTraceDocs = documents.filter((document) => document.category === "request-trace");
  const timingDocs = documents.filter((document) => document.category === "work-timing");
  const specDocs = documents.filter((document) => document.category === "project-spec" || document.category === "shared-spec");
  const requirementDocs = documents.filter((document) => document.category === "requirement");
  const latestEvaluation = latestByCategory(documents, "evaluation");
  const latestWorkSummary = latestByCategory(documents, "work-summary");
  const latestRequestTrace = latestByCategory(documents, "request-trace");
  const latestWebSearch = latestByCategory(documents, "web-search");
  const textCorpus = documents.map(textOf).join("\n");
  const tokenMentionCount = documents.filter((document) => /token|토큰|usage|cost|비용/i.test(textOf(document))).length;
  const structuredTokenCount = documents.filter((document) => /token[_ -]?usage|tokens?\s*[:=]\s*\d+|input_tokens|output_tokens/i.test(textOf(document))).length;
  const evidenceCategories = [
    evaluationDocs.length,
    webSearchDocs.length,
    workSummaryDocs.length,
    requestTraceDocs.length,
    timingDocs.length,
    specDocs.length,
    requirementDocs.length
  ].filter(Boolean).length;
  const evidenceScore = scoreFromRatio(evidenceCategories, 7);
  const validationSignalScore = scoreFromRatio(
    toolSignals.filter((signal) => signal.query.test(textCorpus)).length,
    toolSignals.length
  );
  const tokenScore = structuredTokenCount > 0 ? 100 : tokenMentionCount > 0 ? 55 : 20;
  const openSignalPenalty = Math.min(20, blockedTasks * 5);
  const currentWorkScore = Math.max(0, Math.round(evidenceScore * 0.45 + validationSignalScore * 0.35 + tokenScore * 0.2 - openSignalPenalty));
  const openSourceCandidates = mergeEvalRepos(openSourceReferences);
  const toolRows = toolSignals.map((signal) => {
    const count = documents.filter((document) => signal.query.test(textOf(document))).length;
    return {
      ...signal,
      count,
      status: count > 0 ? (ko ? "사용 기록 있음" : "recorded") : ko ? "기록 부족" : "weak record"
    };
  });
  const bottlenecks = [
    {
      id: "token-structure",
      label: ko ? "토큰 수가 구조화 필드로 고정되지 않음" : "Token usage is not fixed as structured fields",
      detail: ko
        ? "일부 기록에는 토큰 언급이 있지만 모델별 input/output/cost를 안정적으로 비교하기 어렵습니다."
        : "Some records mention tokens, but model-level input/output/cost comparison is not reliable yet.",
      severity: structuredTokenCount > 0 ? "low" : "high"
    },
    {
      id: "eval-runner",
      label: ko ? "외부 EVAL runner는 아직 optional 후보" : "External eval runner remains optional",
      detail: ko
        ? "promptfoo/DeepEval/Phoenix/Opik/Langfuse는 설치 audit 후 붙이는 후보로 남겨야 합니다."
        : "promptfoo, DeepEval, Phoenix, Opik, and Langfuse should be attached after install audit.",
      severity: "medium"
    },
    {
      id: "trace-to-score",
      label: ko ? "trace는 많지만 점수 체계는 분산됨" : "Many traces, scattered score model",
      detail: ko
        ? "작업 기록, 평가, request trace, timing을 하나의 run score로 묶는 계약이 더 필요합니다."
        : "Work history, evals, request traces, and timings need a unified run-score contract.",
      severity: "medium"
    },
    {
      id: "active-work",
      label: ko ? "현재 막힌 작업/진행 작업 점검" : "Active and blocked work check",
      detail: `${activeTasks.toLocaleString("ko-KR")} active / ${blockedTasks.toLocaleString("ko-KR")} blocked`,
      severity: blockedTasks > 0 ? "high" : "low"
    }
  ];

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
            <strong>{percent(currentWorkScore)}</strong>
          </article>
          <article>
            <FileSearch size={17} aria-hidden="true" />
            <span>{ko ? "근거 커버리지" : "Evidence coverage"}</span>
            <strong>{percent(evidenceScore)}</strong>
          </article>
          <article>
            <Wrench size={17} aria-hidden="true" />
            <span>{ko ? "툴 기록" : "Tool signals"}</span>
            <strong>{percent(validationSignalScore)}</strong>
          </article>
          <article>
            <Scale size={17} aria-hidden="true" />
            <span>{ko ? "토큰/비용 추적" : "Token/cost trace"}</span>
            <strong>{percent(tokenScore)}</strong>
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
            {[
              [ko ? "평가" : "Evals", evaluationDocs.length],
              [ko ? "검색" : "Searches", webSearchDocs.length],
              [ko ? "요약" : "Summaries", workSummaryDocs.length],
              [ko ? "추적" : "Traces", requestTraceDocs.length],
              [ko ? "시간" : "Timing", timingDocs.length]
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{Number(value).toLocaleString("ko-KR")}</strong>
                <i style={{ inlineSize: `${Math.max(8, scoreFromRatio(Number(value), Math.max(1, documents.length)))}%` }} aria-hidden="true" />
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
