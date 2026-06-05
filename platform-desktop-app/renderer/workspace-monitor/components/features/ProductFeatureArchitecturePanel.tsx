import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  Eye,
  FileSearch,
  GitBranch,
  Layers3,
  Network,
  RefreshCw,
  ShieldCheck,
  SquareTerminal
} from "lucide-react";

import type {
  WorkspaceFundamentalImprovementStructure,
  WorkspaceHistoryInsightLoop,
  WorkspaceOpenSourceFeatureReferences,
  WorkspaceProductFeatureArchitecture,
  WorkspaceReferencePlatformAdvantages
} from "@/lib/snapshot";

export type ProductSectionId =
  | "overview"
  | "desktop"
  | "projects"
  | "history"
  | "intent"
  | "structure"
  | "documents"
  | "source"
  | "requirements"
  | "tools"
  | "agents";

export type ProductFeatureArchitecturePanelProps = {
  architecture: WorkspaceProductFeatureArchitecture;
  referenceAdvantages?: WorkspaceReferencePlatformAdvantages;
  openSourceFeatureReferences?: WorkspaceOpenSourceFeatureReferences;
  historyInsights?: WorkspaceHistoryInsightLoop;
  fundamentalImprovement?: WorkspaceFundamentalImprovementStructure;
  onOpenSection: (section: ProductSectionId) => void;
  onOpenOperatorCenter?: () => void;
};

const sectionIds = new Set<ProductSectionId>([
  "overview",
  "desktop",
  "projects",
  "history",
  "intent",
  "structure",
  "documents",
  "source",
  "requirements",
  "tools",
  "agents"
]);

const featureIcons = {
  agent_orchestration: Network,
  agent_work_environment: SquareTerminal,
  agent_development_environment: Code2,
  agent_factory: Bot,
  learning_improvement_loop: BrainCircuit,
  root_tool_management: Code2,
  work_visibility: Eye,
  observability_monitoring: Eye
};

export function ProductFeatureArchitecturePanel({
  architecture,
  referenceAdvantages,
  openSourceFeatureReferences,
  historyInsights,
  fundamentalImprovement,
  onOpenSection,
  onOpenOperatorCenter
}: ProductFeatureArchitecturePanelProps) {
  const primaryFeatures = architecture.featureLayers.filter((feature) => feature.role === "primary");
  const supportingFeatures = architecture.featureLayers.filter((feature) => feature.role !== "primary");
  const referencePatterns = referenceAdvantages?.transferPatterns ?? [];
  const visibleReferencePatterns = referencePatterns
    .filter((pattern) => pattern.priority === "p0" || pattern.status !== "queued_p1")
    .slice(0, 6);
  const openSourceFeatureLayers = openSourceFeatureReferences?.featureReferenceLayers ?? [];
  const visibleOpenSourceLayers = openSourceFeatureLayers
    .filter((layer) => layer.priority === "p0" || layer.priority === "p1")
    .slice(0, 6);
  const visibleHistoryInsights = (historyInsights?.signalGroups ?? [])
    .filter((insight) => insight.priority === "p0" || insight.priority === "p1")
    .slice(0, 4);
  const visibleFundamentalPrinciples = (fundamentalImprovement?.structuralPrinciples ?? [])
    .filter((principle) => principle.priority === "p0" || principle.priority === "p1")
    .slice(0, 4);
  const visibleImprovementPackages = (fundamentalImprovement?.improvementPackages ?? []).slice(0, 3);

  return (
    <section className="product-feature-panel" aria-label="Product feature architecture">
      <div className="product-feature-summary">
        <div className="product-feature-position">
          <p className="eyebrow">Agent Capability Platform</p>
          <h2>Agent Core and CLI Orchestration</h2>
          <p>{architecture.productPosition.productClaim}</p>
          <div className="product-feature-actions">
            <button type="button" onClick={() => onOpenSection("desktop")}>
              <Network size={15} aria-hidden="true" />
              <span>Open CLI Orchestration</span>
            </button>
            <button type="button" onClick={() => onOpenSection("agents")}>
              <Bot size={15} aria-hidden="true" />
              <span>Open Agent Core</span>
            </button>
          </div>
        </div>
        <article>
          <span>Primary</span>
          <strong>{architecture.summary.primaryFeatures}</strong>
          <p>sellable platform features</p>
        </article>
        <article>
          <span>Supporting</span>
          <strong>{architecture.summary.supportingFeatures}</strong>
          <p>moved to Operator Center</p>
        </article>
        <article>
          <span>Rule</span>
          <strong>Observability is support</strong>
          <p>{architecture.productPosition.monitoringRole}</p>
        </article>
      </div>

      <div className="product-feature-grid">
        {primaryFeatures.map((feature) => {
          const Icon = featureIcons[feature.id as keyof typeof featureIcons] ?? GitBranch;
          const section = sectionIds.has(feature.primarySection as ProductSectionId)
            ? (feature.primarySection as ProductSectionId)
            : "overview";
          return (
            <button
              key={feature.id}
              className={`product-feature-card feature-role-${feature.role === "primary" ? "primary" : "supporting"}`}
              type="button"
              onClick={() => onOpenSection(section)}
            >
              <span className="product-feature-card-top">
                <Icon size={17} aria-hidden="true" />
                <small>{feature.role}</small>
              </span>
              <strong>{feature.label}</strong>
              <p>{feature.userOutcome || feature.purpose}</p>
              <span className="feature-tag-row">
                {feature.primarySurfaces.slice(0, 3).map((surface) => (
                  <em key={surface}>{surface}</em>
                ))}
              </span>
              <span className="feature-card-signal">
                <ArrowRight size={14} aria-hidden="true" />
                {feature.learningSignals[0] || feature.automationTargets[0] || feature.status}
              </span>
            </button>
          );
        })}
      </div>

      {referenceAdvantages && visibleReferencePatterns.length > 0 && (
        <div className="reference-advantage-board" aria-label="Reference platform advantage transfer">
          <header>
            <div>
              <p className="eyebrow">레퍼런스 장점 적용 지도</p>
              <h3>{referenceAdvantages.productPosition.customerPromise}</h3>
              <p>{referenceAdvantages.productPosition.primaryRule}</p>
            </div>
            <div className="reference-advantage-summary">
              <span>
                <Layers3 size={14} aria-hidden="true" />
                {referenceAdvantages.summary.platformGroups} groups
              </span>
              <span>
                <CheckCircle2 size={14} aria-hidden="true" />
                {referenceAdvantages.summary.implemented + referenceAdvantages.summary.integratedContract} applied
              </span>
              <span>
                <Clock3 size={14} aria-hidden="true" />
                {referenceAdvantages.summary.queuedP0} p0 queued
              </span>
            </div>
          </header>
          <div className="reference-advantage-grid">
            {visibleReferencePatterns.map((pattern) => {
              const section = sectionIds.has(pattern.productSection as ProductSectionId)
                ? (pattern.productSection as ProductSectionId)
                : "overview";
              return (
                <button
                  key={pattern.id}
                  type="button"
                  className={`reference-advantage-card reference-status-${pattern.status.replaceAll("_", "-")}`}
                  onClick={() => onOpenSection(section)}
                >
                  <span className="reference-advantage-card-top">
                    <ShieldCheck size={15} aria-hidden="true" />
                    <small>{statusLabel(pattern.status)}</small>
                  </span>
                  <strong>{pattern.labelKo || pattern.labelEn}</strong>
                  <p>{pattern.userValueKo || pattern.platformDecision}</p>
                  <span className="reference-source-row">
                    {pattern.sourcePlatforms.slice(0, 3).map((source) => (
                      <em key={source}>{source}</em>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {openSourceFeatureReferences && visibleOpenSourceLayers.length > 0 && (
        <div className="open-source-feature-board" data-open-source-feature-radar="feature-reference-install-policy">
          <header>
            <div>
              <p className="eyebrow">오픈소스 기능 레이더</p>
              <h3>기능별로 직접 탐구할 repo와 설치 정책을 고정</h3>
              <p>
                {openSourceFeatureReferences.summary.totalLayers}개 기능 layer에{" "}
                {openSourceFeatureReferences.summary.totalRepositories}개 후보 repo를 연결했습니다. 현재 단계에서 새 설치가 필요한
                layer는 {openSourceFeatureReferences.summary.installReady}개입니다.
              </p>
            </div>
            <div className="open-source-feature-summary">
              <span>
                <Layers3 size={14} aria-hidden="true" />
                {openSourceFeatureReferences.summary.totalLayers} layers
              </span>
              <span>
                <GitBranch size={14} aria-hidden="true" />
                {openSourceFeatureReferences.summary.totalRepositories} repos
              </span>
              <span>
                <ShieldCheck size={14} aria-hidden="true" />
                install audit {openSourceFeatureReferences.summary.installReady}
              </span>
            </div>
          </header>
          <div className="open-source-feature-grid">
            {visibleOpenSourceLayers.map((layer) => {
              const section = sectionIds.has(layer.primarySection as ProductSectionId)
                ? (layer.primarySection as ProductSectionId)
                : "overview";
              return (
                <button
                  type="button"
                  key={layer.featureId}
                  className="open-source-feature-card"
                  onClick={() => onOpenSection(section)}
                >
                  <span className="open-source-feature-card-top">
                    <FileSearch size={15} aria-hidden="true" />
                    <small>{layer.priority}</small>
                  </span>
                  <strong>{layer.label}</strong>
                  <p>{layer.implementationTargets.slice(0, 3).join(" · ")}</p>
                  <span className="open-source-install-policy">
                    {layer.installNeededNow ? "installation audit required" : layer.installPolicy.replaceAll("_", " ")}
                  </span>
                  <span className="open-source-repo-row">
                    {layer.candidateRepos.slice(0, 3).map((repo) => (
                      <em key={repo.id}>{repo.title}</em>
                    ))}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {fundamentalImprovement && visibleFundamentalPrinciples.length > 0 && (
        <div className="fundamental-improvement-board" aria-label="Fundamental improvement structure">
          <header>
            <div>
              <p className="eyebrow">근본 개선 구조</p>
              <h3>히스토리 신호를 구조 원칙, 실행 패키지, fitness check로 전환</h3>
              <p>
                {fundamentalImprovement.summary.sourcePatterns.toLocaleString("ko-KR")}개 반복 패턴에서{" "}
                {fundamentalImprovement.summary.totalStructuralPrinciples.toLocaleString("ko-KR")}개 구조 원칙과{" "}
                {fundamentalImprovement.summary.totalImprovementPackages.toLocaleString("ko-KR")}개 개선 패키지를 생성합니다.
              </p>
            </div>
            <div className="fundamental-improvement-summary">
              <span>
                <BrainCircuit size={14} aria-hidden="true" />
                {fundamentalImprovement.summary.highPriorityPrinciples} p0
              </span>
              <span>
                <Layers3 size={14} aria-hidden="true" />
                {fundamentalImprovement.summary.totalImprovementPackages} packages
              </span>
              <span>
                <CheckCircle2 size={14} aria-hidden="true" />
                {fundamentalImprovement.summary.totalFitnessChecks} checks
              </span>
            </div>
          </header>
          <div className="fundamental-improvement-stage-row" aria-label="Fundamental improvement operating model">
            {fundamentalImprovement.operatingModel.slice(0, 6).map((stage) => (
              <span key={stage.id}>
                <GitBranch size={13} aria-hidden="true" />
                {stage.label}
              </span>
            ))}
          </div>
          <div className="fundamental-improvement-grid">
            {visibleFundamentalPrinciples.map((principle) => {
              const section = sectionIds.has(principle.targetSection as ProductSectionId)
                ? (principle.targetSection as ProductSectionId)
                : "overview";
              return (
                <button
                  key={principle.id}
                  type="button"
                  className="fundamental-improvement-card"
                  onClick={() => onOpenSection(section)}
                >
                  <span className="fundamental-improvement-card-top">
                    <BrainCircuit size={15} aria-hidden="true" />
                    <small>{principle.readiness}</small>
                  </span>
                  <strong>{principle.label}</strong>
                  <p>{principle.structuralPrinciple}</p>
                  <span className="fundamental-improvement-root">{principle.rootCause}</span>
                  <span className="fundamental-improvement-card-foot">
                    {principle.signalCount} signals · {principle.ownerFeatureId.replaceAll("_", " ")}
                  </span>
                </button>
              );
            })}
          </div>
          {visibleImprovementPackages.length > 0 && (
            <div className="fundamental-improvement-package-row" aria-label="Improvement packages">
              {visibleImprovementPackages.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    onOpenSection(sectionIds.has(item.targetSection as ProductSectionId) ? (item.targetSection as ProductSectionId) : "overview")
                  }
                >
                  <span>{item.status.replaceAll("_", " ")}</span>
                  <strong>{item.title}</strong>
                  <p>{item.nowAction}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {historyInsights && visibleHistoryInsights.length > 0 && (
        <div className="history-insight-board" aria-label="History insight inference loop">
          <header>
            <div>
              <p className="eyebrow">히스토리 인사이트 루프</p>
              <h3>반복된 요청과 검증 기록을 다음 플랫폼 행동으로 전환</h3>
              <p>
                {historyInsights.summary.sourceDocuments.toLocaleString("ko-KR")}개 기록에서{" "}
                {historyInsights.summary.totalPatterns.toLocaleString("ko-KR")}개 반복 패턴을 뽑아 실행면에 연결합니다.
              </p>
            </div>
            <div className="history-insight-summary">
              <span>
                <BrainCircuit size={14} aria-hidden="true" />
                {historyInsights.summary.totalPatterns} patterns
              </span>
              <span>
                <CheckCircle2 size={14} aria-hidden="true" />
                {historyInsights.summary.appliedPatterns} applied
              </span>
              <span>
                <FileSearch size={14} aria-hidden="true" />
                {historyInsights.summary.totalEvidenceLinks} evidence
              </span>
            </div>
          </header>
          <div className="history-insight-stage-row" aria-label="Inference process stages">
            {historyInsights.inferenceStages.slice(0, 5).map((stage) => (
              <span key={stage.id}>
                <RefreshCw size={13} aria-hidden="true" />
                {stage.label}
              </span>
            ))}
          </div>
          <div className="history-insight-grid">
            {visibleHistoryInsights.map((insight) => {
              const section = sectionIds.has(insight.targetSection as ProductSectionId)
                ? (insight.targetSection as ProductSectionId)
                : "overview";
              return (
                <button key={insight.id} type="button" className="history-insight-card" onClick={() => onOpenSection(section)}>
                  <span className="history-insight-card-top">
                    <BrainCircuit size={15} aria-hidden="true" />
                    <small>{insight.signalStrength}</small>
                  </span>
                  <strong>{insight.label}</strong>
                  <p>{insight.inference}</p>
                  <span className="history-insight-application">{insight.platformApplication}</span>
                  <span className="history-insight-card-foot">
                    {insight.signalCount} signals · {insight.assetType.replaceAll("_", " ")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {supportingFeatures.length > 0 && (
        <div className="product-operator-strip" aria-label="Separated operator features">
          <span>Operator tools are separate</span>
          <p>
            {supportingFeatures.map((feature) => feature.label).join(", ")} support the workbench without becoming the
            main product surface.
          </p>
          <button type="button" onClick={onOpenOperatorCenter ?? (() => onOpenSection("documents"))}>
            <Eye size={15} aria-hidden="true" />
            <strong>Open Operator Center</strong>
          </button>
        </div>
      )}

      <div className="product-loop-strip" aria-label="Capability promotion loop">
        <span>Continuous improvement</span>
        <p>{architecture.promotionLoop.improvementRule}</p>
        <strong>{architecture.promotionLoop.assetOrder.slice(0, 5).join(" -> ")}</strong>
      </div>
    </section>
  );
}

function statusLabel(status: string) {
  if (status === "implemented") {
    return "applied";
  }
  if (status === "integrated_contract") {
    return "contract";
  }
  if (status === "queued_p0") {
    return "p0 queued";
  }
  return status.replaceAll("_", " ");
}
