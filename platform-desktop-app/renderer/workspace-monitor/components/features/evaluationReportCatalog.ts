import type { WorkspaceSnapshot } from "@/lib/snapshot";

type EvalOpenSourceReferences = NonNullable<WorkspaceSnapshot["openSourceFeatureReferences"]>;

export type EvalToolSignal = {
  id: string;
  label: string;
  query: RegExp;
  role: string;
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

export const toolSignals: EvalToolSignal[] = [
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

export const fallbackEvalRepos: EvalCandidateRepo[] = [
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

export function mergeEvalRepos(openSourceReferences: EvalOpenSourceReferences): EvalCandidateRepo[] {
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
