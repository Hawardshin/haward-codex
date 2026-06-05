const HISTORY_INSIGHT_SOURCE_PATH = "_history/";

const INSIGHT_RULES = [
  {
    id: "build-closeout-gate",
    label: "구현 후 자동 빌드 게이트",
    labelEn: "Automatic build close-out gate",
    sourceCategories: ["user-request", "evaluation", "request-trace", "work-summary", "daily-history"],
    keywords: ["빌드", "package:internal", "desktop:package:internal", "build", ".app", ".dmg", "검증"],
    repeatedProcess: "사용자가 반복적으로 구현 후 빌드까지 요구하고, 히스토리는 내부 패키징 빌드를 close-out gate로 기록한다.",
    inference: "구현 완료의 정의는 코드 수정이 아니라 검증 가능한 앱 산출물 생성까지 포함해야 한다.",
    platformApplication: "Desktop pipeline, readiness, validation 기록을 한 흐름으로 묶어 build gate를 계속 표시한다.",
    targetSection: "desktop",
    assetType: "workflow",
    status: "applied",
    priority: "p0"
  },
  {
    id: "web-research-to-spec",
    label: "웹 근거에서 스펙으로 이어지는 조사 루프",
    labelEn: "Research-to-spec inference loop",
    sourceCategories: ["web-search", "plan", "evaluation", "project-spec", "request-trace"],
    keywords: ["웹 검색", "web search", "official", "source", "research", "coding-research", "근거", "스펙"],
    repeatedProcess: "외부 근거 확인 후 requirements, spec, validation, trace로 옮기는 흐름이 반복된다.",
    inference: "추론 품질은 검색 결과 자체가 아니라 의사결정과 검증 산출물로 연결될 때 높아진다.",
    platformApplication: "History insight board는 검색 기록, 스펙, 평가를 하나의 evidence loop로 묶어 보여준다.",
    targetSection: "intent",
    assetType: "workflow",
    status: "applied",
    priority: "p0"
  },
  {
    id: "large-scope-slicing",
    label: "큰 요청을 bounded slice로 나누는 실행 루프",
    labelEn: "Large-scope slicing loop",
    sourceCategories: ["plan", "work-summary", "daily-history", "evaluation", "request-trace"],
    keywords: ["large-scope", "범위", "slice", "decomposition", "계획", "작업 모드", "mode"],
    repeatedProcess: "넓은 요청은 web-first, mode selection, bounded implementation, validation gate로 반복 처리된다.",
    inference: "큰 범위는 축소하지 말고, 실행 가능한 slice와 merge gate로 변환해야 한다.",
    platformApplication: "Agent Core와 CLI orchestration은 요청을 lanes, blocked decisions, validation gates로 나누는 실행면을 우선시한다.",
    targetSection: "agents",
    assetType: "workflow",
    status: "applied",
    priority: "p0"
  },
  {
    id: "desktop-native-resource-loop",
    label: "데스크톱 네이티브 자원 활용 루프",
    labelEn: "Desktop-native resource loop",
    sourceCategories: ["evaluation", "work-summary", "resource-check", "project-spec", "daily-history"],
    keywords: ["rust", "cpu", "ram", "memory", "메모리", "프로세스", "pipe", "pty", "tauri", "native"],
    repeatedProcess: "사용자는 데스크톱 앱의 장점을 요구했고, 히스토리는 Rust 자원, PTY, process cleanup, memory telemetry를 반복 기록한다.",
    inference: "성능 문제는 renderer state만 보지 말고 OS process, memory, pipe lifecycle까지 제품 계약에 넣어야 한다.",
    platformApplication: "Desktop Runtime과 Source Workbench에 native telemetry, PTY, process cleanup readiness를 계속 노출한다.",
    targetSection: "desktop",
    assetType: "project_feature",
    status: "applied",
    priority: "p0"
  },
  {
    id: "ui-feedback-to-design-contract",
    label: "UI 피드백을 디자인 계약으로 바꾸는 루프",
    labelEn: "UI feedback to design contract",
    sourceCategories: ["work-summary", "evaluation", "project-spec", "daily-history", "user-request"],
    keywords: ["ui", "버튼", "select", "dropdown", "탭", "사이드바", "직관", "디자인", "layout", "overflow"],
    repeatedProcess: "사용자 UI 피드백이 버튼, 드롭다운, 탭 전환, 사이드바, 오류 상태, desktop-only 계약으로 여러 번 이어졌다.",
    inference: "주관적 UI 불편은 visual token, control primitive, smoke test, overflow rule로 전환해야 재발을 막는다.",
    platformApplication: "Monitor UI는 native select 제거, tonal hierarchy, stable controls, Playwright/static audits를 feature contract로 유지한다.",
    targetSection: "overview",
    assetType: "project_feature",
    status: "applied",
    priority: "p1"
  },
  {
    id: "release-blocker-gate",
    label: "공개 릴리스 blocker를 fail-fast gate로 유지",
    labelEn: "Release blocker fail-fast gate",
    sourceCategories: ["evaluation", "work-summary", "request-trace", "project-spec", "daily-history"],
    keywords: ["public release", "notarization", "signing", "updater", "blocker", "preflight", "release"],
    repeatedProcess: "공개 배포 시도는 signing, notarization, updater, clean-machine smoke blocker를 반복적으로 드러냈다.",
    inference: "외부 credential이 필요한 조건은 구현 실패가 아니라 release readiness gate로 분리해야 한다.",
    platformApplication: "Service readiness와 release preflight는 internal build 통과와 public release blocker를 분리해서 보여준다.",
    targetSection: "structure",
    assetType: "validation_gate",
    status: "applied",
    priority: "p1"
  }
];

const INFERENCE_STAGES = [
  {
    id: "observe",
    label: "Observe history",
    input: "user requests, work summaries, web searches, plans, evaluations, traces, timings",
    output: "bounded history signals",
    guards: ["ignore _private", "use category/path/title/excerpt only", "preserve source paths for developer view"]
  },
  {
    id: "cluster",
    label: "Cluster repetitions",
    input: "history signals",
    output: "repeated process groups",
    guards: ["require matching category or multiple keywords", "limit evidence paths per pattern"]
  },
  {
    id: "infer",
    label: "Infer reusable rule",
    input: "repeated process group",
    output: "platform insight and target section",
    guards: ["separate evidence signal from factual proof", "keep claims tied to evidence paths"]
  },
  {
    id: "apply",
    label: "Apply to platform",
    input: "insight",
    output: "workflow, validation gate, feature, or UI surface",
    guards: ["choose smallest useful asset", "keep customer snapshot sanitized"]
  },
  {
    id: "verify",
    label: "Verify loop",
    input: "applied platform asset",
    output: "tests, readiness checks, package build, evaluation",
    guards: ["record validation", "keep rollback path"]
  }
];

export function emptyHistoryInsightLoop() {
  return buildHistoryInsightLoop({
    sourcePath: HISTORY_INSIGHT_SOURCE_PATH,
    sourceDocuments: 0,
    patterns: []
  });
}

export function collectHistoryInsightLoop(documents = []) {
  const historyDocuments = documents.filter((document) => document && isHistoryLikeDocument(document));
  const patterns = INSIGHT_RULES.map((rule) => buildPattern(rule, historyDocuments)).filter(
    (pattern) => pattern.signalCount > 0
  );

  return buildHistoryInsightLoop({
    sourcePath: HISTORY_INSIGHT_SOURCE_PATH,
    sourceDocuments: historyDocuments.length,
    patterns
  });
}

export function sanitizeHistoryInsightLoopForCustomer(loop = emptyHistoryInsightLoop()) {
  return {
    sourcePath: "",
    summary: {
      ...loop.summary,
      sourceDocuments: 0,
      totalEvidenceLinks: 0,
      activeRecommendations: 0
    },
    inferenceStages: [],
    signalGroups: []
  };
}

function buildHistoryInsightLoop({ sourcePath, sourceDocuments, patterns }) {
  const totalEvidenceLinks = patterns.reduce((sum, pattern) => sum + pattern.evidencePaths.length, 0);
  const appliedPatterns = patterns.filter((pattern) => pattern.status === "applied").length;
  const queuedPatterns = patterns.filter((pattern) => pattern.status !== "applied").length;
  const activeRecommendations = patterns.filter((pattern) => ["p0", "p1"].includes(pattern.priority)).length;
  const latestInsightAt = patterns
    .map((pattern) => pattern.latestEvidenceAt)
    .filter(Boolean)
    .sort()
    .at(-1) || "";

  return {
    sourcePath,
    summary: {
      sourceDocuments,
      totalPatterns: patterns.length,
      appliedPatterns,
      queuedPatterns,
      activeRecommendations,
      totalEvidenceLinks,
      latestInsightAt
    },
    inferenceStages: INFERENCE_STAGES,
    signalGroups: patterns
  };
}

function buildPattern(rule, documents) {
  const matches = documents
    .map((document) => ({ document, score: scoreDocument(rule, document) }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      const rightDate = right.document.updatedAt || right.document.historyDate || "";
      const leftDate = left.document.updatedAt || left.document.historyDate || "";
      return right.score - left.score || rightDate.localeCompare(leftDate) || left.document.path.localeCompare(right.document.path);
    });
  const evidenceDocuments = matches.slice(0, 6).map((entry) => entry.document);
  const sourceCategories = summarizeCategories(matches.map((entry) => entry.document));
  const latestEvidenceAt = matches
    .map((entry) => entry.document.updatedAt || entry.document.historyDate || "")
    .filter(Boolean)
    .sort()
    .at(-1) || "";

  return {
    id: rule.id,
    label: rule.label,
    labelEn: rule.labelEn,
    repeatedProcess: rule.repeatedProcess,
    inference: rule.inference,
    platformApplication: rule.platformApplication,
    targetSection: rule.targetSection,
    assetType: rule.assetType,
    status: rule.status,
    priority: rule.priority,
    signalStrength: signalStrength(matches.length),
    signalCount: matches.length,
    sourceCategories,
    evidencePaths: evidenceDocuments.map((document) => document.path),
    evidenceTitles: evidenceDocuments.map((document) => document.title),
    latestEvidenceAt
  };
}

function scoreDocument(rule, document) {
  const text = `${document.path || ""} ${document.category || ""} ${document.title || ""} ${document.excerpt || ""}`.toLowerCase();
  const categoryMatch = rule.sourceCategories.includes(document.category);
  const keywordMatches = rule.keywords.filter((keyword) => text.includes(keyword.toLowerCase())).length;
  if (keywordMatches === 0) {
    return 0;
  }
  if (!categoryMatch && keywordMatches < 2) {
    return 0;
  }
  return keywordMatches + (categoryMatch ? 1 : 0);
}

function isHistoryLikeDocument(document) {
  return (
    typeof document.path === "string" &&
    (document.path.startsWith("_history/") ||
      document.path.includes("/specs/") ||
      document.path.includes("/docs/requirements/") ||
      ["evaluation", "plan", "request-trace", "user-request", "web-search", "work-timing", "work-summary", "daily-history"].includes(
        document.category
      ))
  );
}

function summarizeCategories(documents) {
  const counts = new Map();
  for (const document of documents) {
    const category = document.category || "unknown";
    counts.set(category, (counts.get(category) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category));
}

function signalStrength(count) {
  if (count >= 12) {
    return "high";
  }
  if (count >= 4) {
    return "medium";
  }
  if (count > 0) {
    return "emerging";
  }
  return "none";
}
