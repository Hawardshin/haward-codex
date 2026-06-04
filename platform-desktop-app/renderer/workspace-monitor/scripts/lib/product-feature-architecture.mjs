import fs from "node:fs";
import path from "node:path";

const PRODUCT_FEATURE_REGISTRY_PATH = "platform-desktop-app/configs/product-feature-registry.json";

export function emptyProductFeatureArchitecture() {
  const featureLayers = [
    {
      id: "agent_orchestration",
      label: "CLI Orchestration",
      role: "primary",
      status: "fallback",
      purpose: "Coordinate agents and optional CLI lanes as supervised work.",
      userOutcome: "Start one task and let the platform coordinate specialist lanes.",
      primarySection: "desktop",
      primarySurfaces: ["Desktop Runtime", "Task Pipe", "Decision Inbox"],
      currentAssets: [],
      automationTargets: ["multi-lane task intake", "decision routing", "merge gates"],
      learningSignals: ["task-run records", "blocked lane count"],
      validationGates: []
    },
    {
      id: "agent_work_environment",
      label: "Agent Work Environment",
      role: "supporting",
      status: "fallback",
      purpose: "Host selected workspaces, runtime data, decisions, task runs, and support diagnostics.",
      userOutcome: "Use an app-owned workspace and accumulated data plane instead of a terminal-first clone.",
      primarySection: "desktop",
      primarySurfaces: ["Workspace Host", "Accumulated Data", "Runtime Data"],
      currentAssets: [],
      automationTargets: ["workspace import", "runtime data indexing"],
      learningSignals: ["task-run count", "decision count"],
      validationGates: []
    },
    {
      id: "agent_development_environment",
      label: "Agent Development Environment",
      role: "supporting",
      status: "fallback",
      purpose: "Provide a workbench for source, diffs, templates, requirements, specs, and validation.",
      userOutcome: "Shape agent platform behavior inside one development workbench.",
      primarySection: "source",
      primarySurfaces: ["Source Review", "Diff Review", "Requirements"],
      currentAssets: [],
      automationTargets: ["file index", "draft queue", "save with backup"],
      learningSignals: ["diff summary", "validation results"],
      validationGates: []
    },
    {
      id: "agent_factory",
      label: "Agent Core",
      role: "primary",
      status: "fallback",
      purpose: "Promote repeated work into prompts, workflows, templates, tools, skills, agents, and features.",
      userOutcome: "Create reusable agents and capabilities without repeating the same instructions.",
      primarySection: "agents",
      primarySurfaces: ["Agents", "Capability Center", "Evidence / Promotion"],
      currentAssets: [],
      automationTargets: ["candidate intake", "smallest asset selection", "agent definition creation"],
      learningSignals: ["candidate backlog", "agent definition count"],
      validationGates: []
    },
    {
      id: "learning_improvement_loop",
      label: "Learning & Evaluation Loop",
      role: "supporting",
      status: "fallback",
      purpose: "Accumulate requests, evidence, timings, evaluations, and intent maps into improvement loops.",
      userOutcome: "See why the platform improved and what should improve next.",
      primarySection: "intent",
      primarySurfaces: ["Intent Map", "Evaluations", "Work Timings"],
      currentAssets: [],
      automationTargets: ["intent structuring", "evaluation capture", "bottleneck detection"],
      learningSignals: ["intent themes", "evaluation pass rate", "timing bottlenecks"],
      validationGates: []
    },
    {
      id: "root_tool_management",
      label: "Root Tool Management",
      role: "supporting",
      status: "fallback",
      purpose: "Keep shared provider accounts, CLI adapters, workspace files, source tools, and decision defaults outside individual tasks.",
      userOutcome: "Configure root tools once so custom agents and guest CLI lanes can reuse the same base.",
      primarySection: "source",
      primarySurfaces: ["Root Tools", "Provider Accounts", "CLI Adapter Settings", "Workspace Explorer"],
      currentAssets: [],
      automationTargets: ["provider setup", "CLI adapter selection", "workspace access setup", "tool sharing"],
      learningSignals: ["configured provider count", "selected CLI adapter", "workspace file count"],
      validationGates: []
    },
    {
      id: "work_visibility",
      label: "Work Visibility",
      role: "supporting",
      status: "fallback",
      purpose: "Show active work, deferred decisions, task-run records, and available agents at a glance.",
      userOutcome: "Immediately see what is running, blocked, recorded, and ready to resume.",
      primarySection: "overview",
      primarySurfaces: ["Core Home Workload Strip", "Decision Inbox", "Task Run Store", "Run Status Bar"],
      currentAssets: [],
      automationTargets: ["active task summarization", "decision count", "task-run count", "agent count"],
      learningSignals: ["active task count", "blocked task count", "deferred decision count"],
      validationGates: []
    },
    {
      id: "observability_monitoring",
      label: "Observability & Monitoring",
      role: "supporting",
      status: "fallback",
      purpose: "Expose structure, documents, source inventory, service readiness, and status as supporting observability.",
      userOutcome: "Inspect platform state without treating the monitoring layer as the product.",
      primarySection: "structure",
      primarySurfaces: ["Structure", "Documents", "History", "Service Readiness"],
      currentAssets: [],
      automationTargets: ["snapshot collection", "customer snapshot sanitization"],
      learningSignals: ["service blockers", "source hotspot count"],
      validationGates: []
    }
  ];
  return buildArchitecture({
    sourcePath: "",
    productPosition: {
      primaryProduct: "agent_capability_platform",
      productClaim:
        "Agent Core makes custom agents easy to create, and CLI orchestration keeps long-running guest CLI work continuous through deferred decisions and task-run records. Root tools, workbench, learning, and observability support those two core capabilities.",
      monitoringRole: "supporting_observability"
    },
    desktopHomeSurface: {
      firstViewPriority: ["agent_factory", "agent_orchestration", "root_tool_management", "work_visibility"],
      supportingSurfaces: ["observability_monitoring"],
      homeCopyRule: "Show Agent Core, CLI orchestration continuity, root tool setup, and current workload before monitoring details.",
      configurationRule: "Expose core setup for accounts, CLI adapters, root tools, and question deferral in dedicated settings."
    },
    featureLayers,
    promotionLoop: {
      stages: ["observe_repetition_or_gap", "select_smallest_useful_asset", "implement_with_validation"],
      recordTargets: [],
      improvementRule: "Promote repeated work into the smallest useful durable asset first.",
      assetOrder: ["prompt", "workflow", "template", "tool", "skill", "agent", "project_feature"]
    },
    qualitySignals: [
      "The first screen names Agent Core and CLI orchestration before root tools, workbench, learning, or observability.",
      "Root tools are visually separate from task-specific agent creation and CLI orchestration surfaces.",
      "Current work volume, deferred decisions, task-run records, and agent count are visible at a glance.",
      "Readiness tests fail if monitoring becomes the primary product."
    ],
    validationGates: []
  });
}

export function collectProductFeatureArchitecture(repoRoot) {
  const fallback = emptyProductFeatureArchitecture();
  const registry = readJson(path.join(repoRoot, PRODUCT_FEATURE_REGISTRY_PATH), null);
  if (!registry || typeof registry !== "object") {
    return fallback;
  }

  const featureLayers = Array.isArray(registry.feature_layers)
    ? registry.feature_layers
        .filter((feature) => feature && typeof feature === "object")
        .map((feature) => ({
          id: feature.id || "",
          label: feature.label || titleFromId(feature.id || "feature"),
          role: feature.role || "supporting",
          status: feature.status || "planned",
          purpose: feature.purpose || "",
          userOutcome: feature.user_outcome || "",
          primarySection: feature.primary_section || "overview",
          primarySurfaces: arrayOfStrings(feature.primary_surfaces),
          currentAssets: arrayOfStrings(feature.current_assets),
          automationTargets: arrayOfStrings(feature.automation_targets),
          learningSignals: arrayOfStrings(feature.learning_signals),
          validationGates: arrayOfStrings(feature.validation_gates)
        }))
        .filter((feature) => feature.id)
    : fallback.featureLayers;

  const productPosition = registry.product_position || {};
  const desktopHomeSurface = registry.desktop_home_surface || {};
  const promotionLoop = registry.promotion_loop || {};

  return buildArchitecture({
    sourcePath: PRODUCT_FEATURE_REGISTRY_PATH,
    productPosition: {
      primaryProduct: productPosition.primary_product || fallback.productPosition.primaryProduct,
      productClaim: productPosition.primary_claim || fallback.productPosition.productClaim,
      monitoringRole: productPosition.monitoring_role || fallback.productPosition.monitoringRole
    },
    desktopHomeSurface: {
      firstViewPriority: arrayOfStrings(desktopHomeSurface.first_view_priority),
      supportingSurfaces: arrayOfStrings(desktopHomeSurface.supporting_surfaces),
      homeCopyRule: desktopHomeSurface.home_copy_rule || "",
      configurationRule: desktopHomeSurface.configuration_rule || ""
    },
    featureLayers,
    promotionLoop: {
      stages: arrayOfStrings(promotionLoop.stages),
      recordTargets: arrayOfStrings(promotionLoop.record_targets),
      improvementRule: promotionLoop.improvement_rule || "",
      assetOrder: arrayOfStrings(promotionLoop.asset_order)
    },
    qualitySignals: arrayOfStrings(registry.quality_signals),
    validationGates: Array.isArray(registry.validation_gates)
      ? registry.validation_gates
          .filter((gate) => gate && typeof gate === "object")
          .map((gate) => ({
            id: gate.id || "",
            command: gate.command || "",
            validates: gate.validates || ""
          }))
          .filter((gate) => gate.id)
      : []
  });
}

export function sanitizeProductFeatureArchitectureForCustomer(architecture) {
  return {
    ...architecture,
    sourcePath: "",
    featureLayers: architecture.featureLayers.map((feature) => ({
      ...feature,
      currentAssets: [],
      validationGates: []
    })),
    promotionLoop: {
      ...architecture.promotionLoop,
      recordTargets: []
    },
    validationGates: []
  };
}

function buildArchitecture({
  sourcePath,
  productPosition,
  desktopHomeSurface,
  featureLayers,
  promotionLoop,
  qualitySignals,
  validationGates
}) {
  const primaryFeatures = featureLayers.filter((feature) => feature.role === "primary").length;
  const supportingFeatures = featureLayers.filter((feature) => feature.role !== "primary").length;
  return {
    sourcePath,
    productPosition,
    desktopHomeSurface,
    summary: {
      totalFeatures: featureLayers.length,
      primaryFeatures,
      supportingFeatures,
      automationLoops: promotionLoop.stages.length > 0 ? 1 : 0
    },
    featureLayers,
    promotionLoop,
    qualitySignals,
    validationGates
  };
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function arrayOfStrings(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}

function titleFromId(value) {
  return String(value)
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
