import {
  ArrowRight,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Code2,
  Eye,
  GitBranch,
  Layers3,
  Network,
  ShieldCheck,
  SquareTerminal
} from "lucide-react";

import type { WorkspaceProductFeatureArchitecture, WorkspaceReferencePlatformAdvantages } from "@/lib/snapshot";

type ProductSectionId =
  | "overview"
  | "desktop"
  | "projects"
  | "history"
  | "intent"
  | "structure"
  | "documents"
  | "source"
  | "requirements"
  | "agents";

type ProductFeatureArchitecturePanelProps = {
  architecture: WorkspaceProductFeatureArchitecture;
  referenceAdvantages?: WorkspaceReferencePlatformAdvantages;
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
  "agents"
]);

const featureIcons = {
  agent_orchestration: Network,
  agent_work_environment: SquareTerminal,
  agent_development_environment: Code2,
  agent_factory: Bot,
  learning_improvement_loop: BrainCircuit,
  observability_monitoring: Eye
};

export function ProductFeatureArchitecturePanel({
  architecture,
  referenceAdvantages,
  onOpenSection,
  onOpenOperatorCenter
}: ProductFeatureArchitecturePanelProps) {
  const primaryFeatures = architecture.featureLayers.filter((feature) => feature.role === "primary");
  const supportingFeatures = architecture.featureLayers.filter((feature) => feature.role !== "primary");
  const referencePatterns = referenceAdvantages?.transferPatterns ?? [];
  const visibleReferencePatterns = referencePatterns
    .filter((pattern) => pattern.priority === "p0" || pattern.status !== "queued_p1")
    .slice(0, 6);

  return (
    <section className="product-feature-panel" aria-label="Product feature architecture">
      <div className="product-feature-summary">
        <div className="product-feature-position">
          <p className="eyebrow">Agent Capability Platform</p>
          <h2>Agent Orchestration, Workbench, Factory, Learning & Evaluation Loop</h2>
          <p>{architecture.productPosition.productClaim}</p>
          <div className="product-feature-actions">
            <button type="button" onClick={() => onOpenSection("desktop")}>
              <Network size={15} aria-hidden="true" />
              <span>Open Orchestration</span>
            </button>
            <button type="button" onClick={() => onOpenSection("agents")}>
              <Bot size={15} aria-hidden="true" />
              <span>Open Agent Factory</span>
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
