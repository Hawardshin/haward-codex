const FUNDAMENTAL_SOURCE_PATH = "historyInsightLoop";

const OPERATING_MODEL_STAGES = [
  {
    id: "signal_intake",
    label: "Signal intake",
    purpose: "히스토리, 요청, 검증, 스펙, 타이밍 기록을 한 신호면으로 모은다.",
    output: "bounded_history_signals",
    guard: "내부 경로와 evidence는 developer snapshot에만 둔다."
  },
  {
    id: "structural_diagnosis",
    label: "Structural diagnosis",
    purpose: "반복된 불편을 표면 증상이 아니라 원인 구조로 묶는다.",
    output: "root_cause_groups",
    guard: "한 번 나온 선호가 아니라 반복 패턴과 검증 기록에 묶는다."
  },
  {
    id: "principle_selection",
    label: "Principle selection",
    purpose: "재발을 막을 제품/운영 원칙을 선택한다.",
    output: "structural_principles",
    guard: "가장 작은 durable asset 또는 feature surface로 승격한다."
  },
  {
    id: "package_execution",
    label: "Package execution",
    purpose: "원칙을 실행 가능한 개선 패키지와 target asset으로 바꾼다.",
    output: "improvement_packages",
    guard: "bounded slice, rollback, owner feature를 함께 둔다."
  },
  {
    id: "fitness_check",
    label: "Fitness check",
    purpose: "구조 품질이 다시 무너지지 않도록 자동 검증 계약을 붙인다.",
    output: "fitness_checks",
    guard: "테스트, snapshot sanitizer, browser smoke, package gate로 확인한다."
  },
  {
    id: "memory_feedback",
    label: "Memory feedback",
    purpose: "검증 결과와 남은 gap을 다시 히스토리로 환류한다.",
    output: "next_history_loop",
    guard: "요청 trace, evaluation, work summary, timing record를 남긴다."
  }
];

const STRUCTURAL_PRINCIPLE_RULES = [
  {
    id: "history-as-operating-memory",
    label: "히스토리를 운영 메모리로 승격",
    labelEn: "Promote history into operating memory",
    priority: "p0",
    sourcePatternIds: ["web-research-to-spec", "large-scope-slicing", "build-closeout-gate"],
    rootCause: "반복 요청과 검증 결과가 UI/실행면으로 올라오지 않으면 다음 작업도 다시 설명해야 한다.",
    structuralPrinciple: "히스토리는 회고 문서가 아니라 다음 실행을 결정하는 운영 메모리여야 한다.",
    platformChange: "Workspace snapshot이 반복 패턴을 구조 원칙과 실행 패키지로 승격한다.",
    targetSection: "intent",
    ownerFeatureId: "learning_improvement_loop",
    packageId: "operating-memory-snapshot-plane",
    packageTitle: "운영 메모리 snapshot plane",
    nowAction: "historyInsightLoop를 fundamentalImprovementStructure로 승격해 Product Structure에 노출한다.",
    nextAction: "task-run, timing, evaluation이 같은 구조 원칙에 누적되도록 runtime records와 연결한다.",
    targetAssets: [
      "platform-desktop-app/renderer/workspace-monitor/scripts/lib/fundamental-improvement-structure.mjs",
      "platform-desktop-app/renderer/workspace-monitor/components/features/ProductFeatureArchitecturePanel.tsx"
    ],
    verification: ["collector unit test", "snapshot generated stats", "Product Structure Browser smoke"],
    rollback: "Remove the derived snapshot field and UI board; keep historyInsightLoop unchanged."
  },
  {
    id: "desktop-native-first-plane",
    label: "데스크톱 네이티브 실행면 우선",
    labelEn: "Desktop-native execution plane first",
    priority: "p0",
    sourcePatternIds: ["desktop-native-resource-loop", "release-blocker-gate"],
    rootCause: "데스크톱 앱의 성능과 신뢰성 문제를 renderer UI 상태만으로 다루면 CPU, RAM, pipe, process lifecycle 개선이 빠진다.",
    structuralPrinciple: "데스크톱 제품은 renderer-first가 아니라 native runtime, process, memory plane을 제품 계약으로 가져야 한다.",
    platformChange: "구조 개선 모델이 native resource loop를 핵심 원칙으로 표시하고 package gate와 연결한다.",
    targetSection: "desktop",
    ownerFeatureId: "agent_orchestration",
    packageId: "native-resource-contract-plane",
    packageTitle: "네이티브 자원 계약 plane",
    nowAction: "히스토리 기반 구조 원칙에서 Rust/Tauri, PTY, process cleanup, memory readiness를 명시한다.",
    nextAction: "실제 runtime telemetry가 안정화되면 scoring을 기록 기반으로 교체한다.",
    targetAssets: ["platform-desktop-app/src-tauri/src/lib.rs", "platform-desktop-app/scripts/check-service-readiness.mjs"],
    verification: ["desktop internal package", "resource check record", "service readiness"],
    rollback: "Keep native runtime unchanged and remove only the structural recommendation surface."
  },
  {
    id: "controls-are-design-contracts",
    label: "UI 불편을 디자인 계약으로 전환",
    labelEn: "Turn UI friction into design contracts",
    priority: "p0",
    sourcePatternIds: ["ui-feedback-to-design-contract", "large-scope-slicing"],
    rootCause: "버튼, 드롭다운, 탭 지연, 잘림 같은 피드백을 화면별 수정으로 처리하면 같은 문제가 반복된다.",
    structuralPrinciple: "반복 UI 피드백은 control primitive, sizing rule, smoke test가 있는 디자인 계약으로 바뀌어야 한다.",
    platformChange: "Product Structure가 history feedback을 UI primitive와 validation gate로 연결한다.",
    targetSection: "overview",
    ownerFeatureId: "work_visibility",
    packageId: "design-contract-control-plane",
    packageTitle: "디자인 계약 control plane",
    nowAction: "근본 개선 구조 보드가 UI friction 원칙과 검증 계약을 보여준다.",
    nextAction: "버튼, select, 탭, 사이드바를 shared control audit으로 묶는다.",
    targetAssets: [
      "platform-desktop-app/renderer/workspace-monitor/app/globals.css",
      "platform-desktop-app/renderer/workspace-monitor/scripts/check-source-control-design.mjs"
    ],
    verification: ["Browser overflow smoke", "source control design check", "readiness token check"],
    rollback: "Remove the board styles while preserving existing controls."
  },
  {
    id: "definition-of-done-is-artifact",
    label: "완료 정의를 산출물과 gate로 고정",
    labelEn: "Definition of done is artifact plus gate",
    priority: "p0",
    sourcePatternIds: ["build-closeout-gate", "release-blocker-gate"],
    rootCause: "코드 수정만으로 완료하면 사용자가 매번 빌드하고 release blocker를 다시 발견한다.",
    structuralPrinciple: "의미 있는 구현 완료는 앱 산출물, 검증 로그, release readiness 상태까지 포함한다.",
    platformChange: "개선 구조가 build/package fitness check를 최종 구조 gate로 유지한다.",
    targetSection: "structure",
    ownerFeatureId: "observability_monitoring",
    packageId: "artifact-closeout-gate",
    packageTitle: "산출물 기반 close-out gate",
    nowAction: "snapshot 구조에서 package/internal gate를 fitness check로 노출한다.",
    nextAction: "public signing/notarization/updater blockers는 internal success와 분리해서 계속 표시한다.",
    targetAssets: ["platform-desktop-app/scripts/desktop-pipeline.mjs", "platform-desktop-app/tests/readiness.test.mjs"],
    verification: ["desktop:package:internal", "release readiness internal", "hdiutil verify"],
    rollback: "Keep pipeline unchanged and remove the derived UI contract only."
  },
  {
    id: "bounded-slice-change-system",
    label: "넓은 요청을 bounded slice 시스템으로 처리",
    labelEn: "Process broad work as bounded slices",
    priority: "p1",
    sourcePatternIds: ["large-scope-slicing", "web-research-to-spec"],
    rootCause: "근본 개선 요청은 범위가 넓어 바로 구현하면 맥락 과부하와 누락 위험이 커진다.",
    structuralPrinciple: "큰 요청은 축소하지 말고 inventory, slice, merge gate, verification으로 변환해야 한다.",
    platformChange: "개선 구조가 large-scope decomposition을 platform operating model stage로 고정한다.",
    targetSection: "agents",
    ownerFeatureId: "agent_factory",
    packageId: "large-scope-slice-gate",
    packageTitle: "Large-scope slice gate",
    nowAction: "이번 변경의 decomposition packet과 UI 구조 보드를 연결한다.",
    nextAction: "future agent lanes can consume the same slice schema as task input.",
    targetAssets: ["_history/large-scope-decompositions/", "_ops/workflows/76-large-scope-decomposition.md"],
    verification: ["large-scope record", "omission check", "traceability record"],
    rollback: "Keep records as history and remove only the generated snapshot surface."
  },
  {
    id: "public-private-plane-separation",
    label: "developer/customer plane 분리",
    labelEn: "Separate developer and customer planes",
    priority: "p1",
    sourcePatternIds: ["release-blocker-gate", "web-research-to-spec"],
    rootCause: "내부 히스토리와 customer-facing 제품 snapshot이 섞이면 개인정보, 소스 노출, release gate 오판이 생긴다.",
    structuralPrinciple: "developer evidence plane과 customer product plane은 collector와 테스트에서 분리되어야 한다.",
    platformChange: "근본 개선 구조도 customer snapshot에서 완전히 sanitize한다.",
    targetSection: "structure",
    ownerFeatureId: "agent_work_environment",
    packageId: "customer-snapshot-sanitizer-gate",
    packageTitle: "Customer snapshot sanitizer gate",
    nowAction: "fundamentalImprovementStructure sanitizer와 stats zeroing을 추가한다.",
    nextAction: "runtime data plane과 support export도 같은 분리 원칙으로 묶는다.",
    targetAssets: [
      "platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs",
      "platform-desktop-app/renderer/workspace-monitor/tests/collector.test.mjs"
    ],
    verification: ["customer sanitizer test", "customer bundle audit", "privacy boundary check when payload rules change"],
    rollback: "Customer snapshot remains safe because sanitizer removes the whole derived model."
  }
];

const FITNESS_CHECK_RULES = [
  {
    id: "collector-derivation-fitness",
    label: "Collector derivation fitness",
    command: "corepack pnpm --filter workspace-monitor test",
    validates: "히스토리 패턴이 구조 원칙, package, evidence로 결정적으로 변환된다.",
    principleIds: ["history-as-operating-memory", "bounded-slice-change-system"]
  },
  {
    id: "customer-sanitizer-fitness",
    label: "Customer sanitizer fitness",
    command: "corepack pnpm --filter workspace-monitor test",
    validates: "내부 히스토리 경로와 구조 진단은 customer snapshot에 남지 않는다.",
    principleIds: ["public-private-plane-separation", "history-as-operating-memory"]
  },
  {
    id: "ui-structure-fitness",
    label: "UI structure fitness",
    command: "Browser smoke on Product Structure",
    validates: "근본 개선 구조가 Product Structure에서 렌더링되고 카드 텍스트가 넘치지 않는다.",
    principleIds: ["controls-are-design-contracts", "history-as-operating-memory"]
  },
  {
    id: "desktop-artifact-fitness",
    label: "Desktop artifact fitness",
    command: "corepack pnpm run desktop:package:internal",
    validates: "구현 완료가 내부 .app/.dmg 산출물과 release gate까지 이어진다.",
    principleIds: ["definition-of-done-is-artifact", "desktop-native-first-plane"]
  }
];

export function emptyFundamentalImprovementStructure() {
  return buildFundamentalImprovementStructure({
    sourcePath: FUNDAMENTAL_SOURCE_PATH,
    sourceDocuments: 0,
    sourcePatterns: [],
    structuralPrinciples: [],
    improvementPackages: [],
    fitnessChecks: []
  });
}

export function collectFundamentalImprovementStructure(historyInsightLoop = {}) {
  const sourcePatterns = Array.isArray(historyInsightLoop.signalGroups) ? historyInsightLoop.signalGroups : [];
  const patternMap = new Map(sourcePatterns.map((pattern) => [pattern.id, pattern]));
  const structuralPrinciples = STRUCTURAL_PRINCIPLE_RULES.map((rule) => buildStructuralPrinciple(rule, patternMap)).filter(
    (principle) => principle.supportingPatterns.length > 0
  );
  const activePrincipleIds = new Set(structuralPrinciples.map((principle) => principle.id));
  const improvementPackages = structuralPrinciples.map((principle) => buildImprovementPackage(principle));
  const fitnessChecks = FITNESS_CHECK_RULES.filter((check) => check.principleIds.some((id) => activePrincipleIds.has(id))).map(
    (check) => ({
      ...check,
      status: "contract",
      principleIds: check.principleIds.filter((id) => activePrincipleIds.has(id))
    })
  );

  return buildFundamentalImprovementStructure({
    sourcePath: FUNDAMENTAL_SOURCE_PATH,
    sourceDocuments: historyInsightLoop.summary?.sourceDocuments || 0,
    sourcePatterns,
    structuralPrinciples,
    improvementPackages,
    fitnessChecks
  });
}

export function sanitizeFundamentalImprovementStructureForCustomer(structure = emptyFundamentalImprovementStructure()) {
  return {
    sourcePath: "",
    summary: {
      ...structure.summary,
      sourceDocuments: 0,
      sourcePatterns: 0,
      totalStructuralPrinciples: 0,
      totalImprovementPackages: 0,
      totalFitnessChecks: 0,
      totalEvidenceLinks: 0,
      highPriorityPrinciples: 0
    },
    operatingModel: [],
    structuralPrinciples: [],
    improvementPackages: [],
    fitnessChecks: []
  };
}

function buildFundamentalImprovementStructure({
  sourcePath,
  sourceDocuments,
  sourcePatterns,
  structuralPrinciples,
  improvementPackages,
  fitnessChecks
}) {
  const totalEvidenceLinks = structuralPrinciples.reduce((sum, principle) => sum + principle.evidencePaths.length, 0);
  const latestInsightAt =
    structuralPrinciples
      .map((principle) => principle.latestEvidenceAt)
      .filter(Boolean)
      .sort()
      .at(-1) || "";

  return {
    sourcePath,
    summary: {
      sourceDocuments,
      sourcePatterns: sourcePatterns.length,
      totalStructuralPrinciples: structuralPrinciples.length,
      highPriorityPrinciples: structuralPrinciples.filter((principle) => principle.priority === "p0").length,
      totalImprovementPackages: improvementPackages.length,
      totalFitnessChecks: fitnessChecks.length,
      totalEvidenceLinks,
      latestInsightAt
    },
    operatingModel: OPERATING_MODEL_STAGES,
    structuralPrinciples,
    improvementPackages,
    fitnessChecks
  };
}

function buildStructuralPrinciple(rule, patternMap) {
  const matchedPatterns = rule.sourcePatternIds.map((id) => patternMap.get(id)).filter(Boolean);
  const evidencePaths = uniqueFlat(matchedPatterns.map((pattern) => pattern.evidencePaths || [])).slice(0, 10);
  const evidenceTitles = uniqueFlat(matchedPatterns.map((pattern) => pattern.evidenceTitles || [])).slice(0, 10);
  const latestEvidenceAt =
    matchedPatterns
      .map((pattern) => pattern.latestEvidenceAt || "")
      .filter(Boolean)
      .sort()
      .at(-1) || "";
  const signalCount = matchedPatterns.reduce((sum, pattern) => sum + (pattern.signalCount || 0), 0);

  return {
    id: rule.id,
    label: rule.label,
    labelEn: rule.labelEn,
    priority: rule.priority,
    readiness: matchedPatterns.length === rule.sourcePatternIds.length ? "active" : "partial",
    rootCause: rule.rootCause,
    structuralPrinciple: rule.structuralPrinciple,
    platformChange: rule.platformChange,
    targetSection: rule.targetSection,
    ownerFeatureId: rule.ownerFeatureId,
    signalCount,
    supportingPatterns: matchedPatterns.map((pattern) => ({
      id: pattern.id,
      label: pattern.label,
      signalStrength: pattern.signalStrength,
      signalCount: pattern.signalCount
    })),
    missingPatternIds: rule.sourcePatternIds.filter((id) => !patternMap.has(id)),
    evidencePaths,
    evidenceTitles,
    latestEvidenceAt,
    packageBlueprint: {
      id: rule.packageId,
      title: rule.packageTitle,
      nowAction: rule.nowAction,
      nextAction: rule.nextAction,
      targetAssets: rule.targetAssets,
      verification: rule.verification,
      rollback: rule.rollback
    }
  };
}

function buildImprovementPackage(principle) {
  return {
    id: principle.packageBlueprint.id,
    principleId: principle.id,
    title: principle.packageBlueprint.title,
    priority: principle.priority,
    status: "applied_contract",
    ownerFeatureId: principle.ownerFeatureId,
    targetSection: principle.targetSection,
    nowAction: principle.packageBlueprint.nowAction,
    nextAction: principle.packageBlueprint.nextAction,
    targetAssets: principle.packageBlueprint.targetAssets,
    verification: principle.packageBlueprint.verification,
    rollback: principle.packageBlueprint.rollback,
    evidencePaths: principle.evidencePaths.slice(0, 6)
  };
}

function uniqueFlat(groups) {
  const seen = new Set();
  const values = [];
  for (const group of groups) {
    for (const value of group) {
      if (typeof value === "string" && value && !seen.has(value)) {
        seen.add(value);
        values.push(value);
      }
    }
  }
  return values;
}
