import type { WorkspaceSnapshot } from "@/lib/snapshot";
import {
  buildRuntimeTelemetryModel,
  formatRuntimeBytes
} from "@/components/features/evaluationRuntimeTelemetry";
import type { EvalRuntimeTelemetrySignal, RuntimeTelemetryRow } from "@/components/features/evaluationRuntimeTelemetry";

export type { EvalRuntimeTelemetrySignal } from "@/components/features/evaluationRuntimeTelemetry";

export type EvalDocument = WorkspaceSnapshot["documents"][number];
export type EvalOpenSourceReferences = NonNullable<WorkspaceSnapshot["openSourceFeatureReferences"]>;

export type EvalToolSignal = {
  id: string;
  label: string;
  query: RegExp;
  role: string;
};

export type EvalToolRow = EvalToolSignal & {
  count: number;
  status: string;
};

export type EvalScenario = {
  id: string;
  labelKo: string;
  labelEn: string;
  purposeKo: string;
  purposeEn: string;
  evidence: string;
};

export type EvalCandidateRepo = {
  id: string;
  title: string;
  url: string;
  focus: string;
  status: string;
};

export type ImprovementDimension = {
  id: string;
  labelKo: string;
  labelEn: string;
  score: number;
  state: "strong" | "watch" | "risk";
  evidenceKo: string;
  evidenceEn: string;
  nextKo: string;
  nextEn: string;
};

export type EvalBottleneck = {
  id: string;
  label: string;
  detail: string;
  severity: "low" | "medium" | "high";
};

export type EvalHistoryEvidenceBar = {
  label: string;
  value: number;
  widthPercent: number;
};

export type EvaluationReportModelInput = {
  activeTasks: number;
  blockedTasks: number;
  documents: EvalDocument[];
  ko: boolean;
  openSourceReferences: EvalOpenSourceReferences;
  runtimeTelemetry?: EvalRuntimeTelemetrySignal | null;
  stats: WorkspaceSnapshot["stats"];
};

export type EvaluationReportModel = {
  bottlenecks: EvalBottleneck[];
  comprehensiveImprovementDimensions: ImprovementDimension[];
  comprehensiveImprovementScore: number;
  comprehensiveImprovementState: ImprovementDimension["state"];
  currentWorkScore: number;
  evaluationDocs: EvalDocument[];
  evidenceScore: number;
  historyEvidenceBars: EvalHistoryEvidenceBar[];
  latestEvaluation: EvalDocument | null;
  latestRequestTrace: EvalDocument | null;
  latestWebSearch: EvalDocument | null;
  latestWorkSummary: EvalDocument | null;
  openSourceCandidates: EvalCandidateRepo[];
  priorityDimensions: ImprovementDimension[];
  requestTraceDocs: EvalDocument[];
  riskLaneCount: number;
  runtimeTelemetryAvailable: boolean;
  runtimeTelemetryRows: RuntimeTelemetryRow[];
  structuredTokenCount: number;
  timingDocs: EvalDocument[];
  tokenMentionCount: number;
  tokenScore: number;
  toolRows: EvalToolRow[];
  validationSignalScore: number;
  webSearchDocs: EvalDocument[];
  workSummaryDocs: EvalDocument[];
};

export const evalScenarios: EvalScenario[] = [
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

export function formatEvalPercent(value: number) {
  return `${Math.max(0, Math.min(100, Math.round(value))).toLocaleString("ko-KR")}%`;
}

function textOf(document: EvalDocument) {
  return `${document.title} ${document.path} ${document.category} ${document.excerpt}`.toLowerCase();
}

function scoreFromRatio(value: number, max: number) {
  if (max <= 0) {
    return 0;
  }
  return Math.min(100, Math.round((value / max) * 100));
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function scoreState(score: number): ImprovementDimension["state"] {
  if (score >= 80) {
    return "strong";
  }
  if (score >= 62) {
    return "watch";
  }
  return "risk";
}

function latestByCategory(documents: EvalDocument[], category: string) {
  return documents.find((document) => document.category === category) || null;
}

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

export function buildEvaluationReportModel({
  activeTasks,
  blockedTasks,
  documents,
  ko,
  openSourceReferences,
  runtimeTelemetry,
  stats
}: EvaluationReportModelInput): EvaluationReportModel {
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
  const toolSignalCount = (id: string) => toolRows.find((tool) => tool.id === id)?.count || 0;
  const documentsMatching = (query: RegExp) => documents.filter((document) => query.test(textOf(document))).length;
  const designSignalCount = documentsMatching(/design|ui|ux|visual|button|dropdown|select|sidebar|control|디자인|버튼|드롭다운|선택|사이드바/i);
  const nativeResourceSignalCount = documentsMatching(
    /resource|process|pipe|memory|cpu|ram|leak|terminal|pty|tauri|rust|native|운영체제|메모리|프로세스|파이프/i
  );
  const releaseSignalCount = toolSignalCount("package") + documentsMatching(/build|package|dmg|codesign|notar|release|빌드|패키징|배포/i);
  const { nativeRuntimeScore, runtimeTelemetryAvailable, runtimeTelemetryRows } = buildRuntimeTelemetryModel({
    ko,
    nativeResourceSignalCount,
    runtimeTelemetry,
    rustTauriSignalCount: toolSignalCount("rust-tauri"),
    validationSignalScore
  });
  const openSourceLayerScore = scoreFromRatio(
    (openSourceReferences.summary?.totalLayers || openSourceReferences.featureReferenceLayers.length || 0) +
      (openSourceReferences.summary?.totalRepositories || openSourceCandidates.length || 0),
    16
  );
  const historyLoopScore = scoreFromRatio(
    (stats.historyInsightPatterns || 0) +
      (stats.historyInsightRecommendations || 0) +
      (stats.fundamentalImprovementPrinciples || 0) +
      (stats.fundamentalImprovementPackages || 0) +
      (stats.fundamentalImprovementFitnessChecks || 0),
    18
  );
  const comprehensiveImprovementDimensions: ImprovementDimension[] = [
    {
      id: "desktop-performance",
      labelKo: "데스크톱 성능",
      labelEn: "Desktop Performance",
      score: clampScore(
        scoreFromRatio(timingDocs.length + (stats.timingRecords || 0), 10) * 0.42 +
          scoreFromRatio(toolSignalCount("browser") + toolSignalCount("typescript"), 8) * 0.3 +
          nativeRuntimeScore * 0.28
      ),
      state: "watch",
      evidenceKo: runtimeTelemetryAvailable && runtimeTelemetry
        ? `${formatRuntimeBytes(runtimeTelemetry.processMemoryBytes)} RAM / ${runtimeTelemetry.processCpuUsage.toFixed(1)}% CPU / ${toolSignalCount("browser").toLocaleString("ko-KR")} browser signals`
        : `${timingDocs.length.toLocaleString("ko-KR")} timing docs / ${toolSignalCount("browser").toLocaleString("ko-KR")} browser signals`,
      evidenceEn: runtimeTelemetryAvailable && runtimeTelemetry
        ? `${formatRuntimeBytes(runtimeTelemetry.processMemoryBytes)} RAM / ${runtimeTelemetry.processCpuUsage.toFixed(1)}% CPU / ${toolSignalCount("browser").toLocaleString("ko-KR")} browser signals`
        : `${timingDocs.length.toLocaleString("ko-KR")} timing docs / ${toolSignalCount("browser").toLocaleString("ko-KR")} browser signals`,
      nextKo: "탭 전환, long task, resident preload를 같은 smoke run에서 계속 측정합니다.",
      nextEn: "Keep tab switching, long tasks, and resident preload measured in one smoke run."
    },
    {
      id: "ux-control-clarity",
      labelKo: "UX/컨트롤 명확성",
      labelEn: "UX Control Clarity",
      score: clampScore(scoreFromRatio(designSignalCount, 14) * 0.5 + scoreFromRatio(requirementDocs.length + specDocs.length, 18) * 0.5),
      state: "watch",
      evidenceKo: `${designSignalCount.toLocaleString("ko-KR")} design/control records`,
      evidenceEn: `${designSignalCount.toLocaleString("ko-KR")} design/control records`,
      nextKo: "텍스트 입력형 설정은 선택형 primitive로 승격하고 버튼 크기/음영 계약을 유지합니다.",
      nextEn: "Promote text-only settings to choice primitives and keep button sizing/shadow contracts."
    },
    {
      id: "native-resource-lifecycle",
      labelKo: "네이티브 리소스 생명주기",
      labelEn: "Native Resource Lifecycle",
      score: nativeRuntimeScore,
      state: "watch",
      evidenceKo: runtimeTelemetryAvailable && runtimeTelemetry
        ? `${runtimeTelemetry.semanticMetrics?.length || 0} semantic metrics / ${runtimeTelemetry.workspaceCache.cachedTextFiles.toLocaleString("ko-KR")} cached files`
        : `${nativeResourceSignalCount.toLocaleString("ko-KR")} resource/process records`,
      evidenceEn: runtimeTelemetryAvailable && runtimeTelemetry
        ? `${runtimeTelemetry.semanticMetrics?.length || 0} semantic metrics / ${runtimeTelemetry.workspaceCache.cachedTextFiles.toLocaleString("ko-KR")} cached files`
        : `${nativeResourceSignalCount.toLocaleString("ko-KR")} resource/process records`,
      nextKo: "PTY, subprocess, timers, cache, memory retention은 시작/종료 소유권을 하나씩 계약화합니다.",
      nextEn: "Contract ownership for PTYs, subprocesses, timers, caches, and memory retention."
    },
    {
      id: "eval-evidence",
      labelKo: "근거/EVAL 폐쇄성",
      labelEn: "Evidence and EVAL Closure",
      score: clampScore(evidenceScore * 0.48 + validationSignalScore * 0.34 + currentWorkScore * 0.18),
      state: "watch",
      evidenceKo: `${evidenceCategories.toLocaleString("ko-KR")} evidence categories`,
      evidenceEn: `${evidenceCategories.toLocaleString("ko-KR")} evidence categories`,
      nextKo: "요구사항, spec, validation, 평가, trace가 한 작업 점수로 이어지게 합니다.",
      nextEn: "Keep requirements, specs, validation, evals, and traces tied to one work score."
    },
    {
      id: "release-packaging",
      labelKo: "빌드/패키징 자동화",
      labelEn: "Release Packaging",
      score: clampScore(scoreFromRatio(releaseSignalCount, 14) * 0.65 + scoreFromRatio(toolSignalCount("git"), 5) * 0.2 + validationSignalScore * 0.15),
      state: "watch",
      evidenceKo: `${releaseSignalCount.toLocaleString("ko-KR")} build/package records`,
      evidenceEn: `${releaseSignalCount.toLocaleString("ko-KR")} build/package records`,
      nextKo: "구현 후 내부 패키징까지 자동 실행하고 실패는 화면과 기록 양쪽에 남깁니다.",
      nextEn: "Run internal packaging after implementation and keep failures visible in UI and records."
    },
    {
      id: "open-source-leverage",
      labelKo: "오픈소스 활용성",
      labelEn: "Open-Source Leverage",
      score: clampScore(openSourceLayerScore * 0.72 + scoreFromRatio(toolSignalCount("web-search"), 8) * 0.28),
      state: "watch",
      evidenceKo: `${openSourceCandidates.length.toLocaleString("ko-KR")} eval/reference candidates`,
      evidenceEn: `${openSourceCandidates.length.toLocaleString("ko-KR")} eval/reference candidates`,
      nextKo: "설치가 필요한 후보는 audit, license, rollback, verification을 통과한 뒤 붙입니다.",
      nextEn: "Install candidates only after audit, license, rollback, and verification are recorded."
    },
    {
      id: "automation-continuity",
      labelKo: "반복 개선 자동화",
      labelEn: "Automation Continuity",
      score: clampScore(historyLoopScore * 0.58 + scoreFromRatio(requestTraceDocs.length + workSummaryDocs.length, 18) * 0.42),
      state: "watch",
      evidenceKo: `${(stats.historyInsightPatterns || 0).toLocaleString("ko-KR")} history patterns`,
      evidenceEn: `${(stats.historyInsightPatterns || 0).toLocaleString("ko-KR")} history patterns`,
      nextKo: "반복 지적은 prompt, workflow, tool, skill, feature 중 가장 작은 durable asset으로 승격합니다.",
      nextEn: "Promote repeated friction into the smallest durable prompt, workflow, tool, skill, or feature."
    }
  ].map((dimension) => ({
    ...dimension,
    state: scoreState(dimension.score)
  }));
  const comprehensiveImprovementScore = clampScore(
    comprehensiveImprovementDimensions.reduce((total, dimension) => total + dimension.score, 0) / comprehensiveImprovementDimensions.length
  );
  const comprehensiveImprovementState = scoreState(comprehensiveImprovementScore);
  const priorityDimensions = [...comprehensiveImprovementDimensions].sort((left, right) => left.score - right.score).slice(0, 3);
  const riskLaneCount = comprehensiveImprovementDimensions.filter((dimension) => dimension.state === "risk").length;
  const historyEvidenceBars = [
    { label: ko ? "평가" : "Evals", value: evaluationDocs.length },
    { label: ko ? "검색" : "Searches", value: webSearchDocs.length },
    { label: ko ? "요약" : "Summaries", value: workSummaryDocs.length },
    { label: ko ? "추적" : "Traces", value: requestTraceDocs.length },
    { label: ko ? "시간" : "Timing", value: timingDocs.length }
  ].map((item) => ({
    ...item,
    widthPercent: Math.max(8, scoreFromRatio(item.value, Math.max(1, documents.length)))
  }));
  const bottlenecks: EvalBottleneck[] = [
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

  return {
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
  };
}
