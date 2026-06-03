import fs from "node:fs";
import path from "node:path";

const REFERENCE_PLATFORM_ADVANTAGE_REGISTRY_PATH =
  "platform-desktop-app/configs/reference-platform-advantage-registry.json";

export function emptyReferencePlatformAdvantages() {
  return buildReferenceAdvantages({
    sourcePath: "",
    sourceBoundary: {
      policy: "public_sources_only",
      customerVisibility: "summary_only"
    },
    referenceLinks: [],
    platformGroups: [],
    transferPatterns: []
  });
}

export function collectReferencePlatformAdvantages(repoRoot) {
  const fallback = emptyReferencePlatformAdvantages();
  const registry = readJson(path.join(repoRoot, REFERENCE_PLATFORM_ADVANTAGE_REGISTRY_PATH), null);
  if (!registry || typeof registry !== "object") {
    return fallback;
  }

  const productPosition = registry.product_position || {};
  const sourceBoundary = registry.source_boundary || {};
  const referenceLinks = Array.isArray(registry.reference_links)
    ? registry.reference_links
        .filter((source) => source && typeof source === "object")
        .map((source) => ({
          id: source.id || "",
          title: source.title || "",
          url: source.url || "",
          sourceType: source.source_type || "",
          reliability: source.reliability || "",
          limitation: source.limitation || "",
          planImpact: source.plan_impact || ""
        }))
        .filter((source) => source.id && source.url)
    : [];
  const platformGroups = Array.isArray(registry.platform_groups)
    ? registry.platform_groups
        .filter((group) => group && typeof group === "object")
        .map((group) => ({
          id: group.id || "",
          labelKo: group.label_ko || "",
          labelEn: group.label_en || "",
          platforms: arrayOfStrings(group.platforms),
          role: group.role || "",
          strongestAdvantage: group.strongest_advantage || "",
          transferRule: group.transfer_rule || ""
        }))
        .filter((group) => group.id)
    : [];
  const transferPatterns = Array.isArray(registry.transfer_patterns)
    ? registry.transfer_patterns
        .filter((pattern) => pattern && typeof pattern === "object")
        .map((pattern) => ({
          id: pattern.id || "",
          labelKo: pattern.label_ko || "",
          labelEn: pattern.label_en || "",
          sourcePlatforms: arrayOfStrings(pattern.source_platforms),
          observedStrength: pattern.observed_strength || "",
          platformDecision: pattern.platform_decision || "",
          productSection: pattern.product_section || "overview",
          userValueKo: pattern.user_value_ko || "",
          currentPlatformAssets: arrayOfStrings(pattern.current_platform_assets),
          implementationTargets: arrayOfStrings(pattern.implementation_targets),
          riskControls: arrayOfStrings(pattern.risk_controls),
          status: pattern.status || "queued",
          priority: pattern.priority || "p2",
          sourceIds: arrayOfStrings(pattern.source_ids)
        }))
        .filter((pattern) => pattern.id)
    : [];

  return buildReferenceAdvantages({
    sourcePath: REFERENCE_PLATFORM_ADVANTAGE_REGISTRY_PATH,
    productPosition: {
      purpose: productPosition.purpose || "",
      primaryRule: productPosition.primary_rule || "",
      customerPromise: productPosition.customer_promise || "",
      monitoringBoundary: productPosition.monitoring_boundary || ""
    },
    sourceBoundary: {
      policy: sourceBoundary.policy || "public_sources_only",
      customerVisibility: sourceBoundary.customer_visibility || "summary_only",
      excludedSources: arrayOfStrings(sourceBoundary.excluded_sources),
      acceptedSourceTypes: arrayOfStrings(sourceBoundary.accepted_source_types)
    },
    referenceLinks,
    platformGroups,
    transferPatterns
  });
}

export function sanitizeReferencePlatformAdvantagesForCustomer(advantages) {
  return {
    ...advantages,
    sourcePath: "",
    sourceBoundary: {
      policy: advantages.sourceBoundary.policy,
      customerVisibility: "summary_only",
      excludedSources: [],
      acceptedSourceTypes: []
    },
    referenceLinks: [],
    transferPatterns: advantages.transferPatterns.map((pattern) => ({
      ...pattern,
      sourceIds: [],
      currentPlatformAssets: [],
      riskControls: pattern.riskControls.slice(0, 2)
    }))
  };
}

function buildReferenceAdvantages({
  sourcePath,
  productPosition = {
    purpose: "",
    primaryRule: "",
    customerPromise: "",
    monitoringBoundary: ""
  },
  sourceBoundary,
  referenceLinks,
  platformGroups,
  transferPatterns
}) {
  const implemented = transferPatterns.filter((pattern) => pattern.status === "implemented").length;
  const integratedContract = transferPatterns.filter((pattern) => pattern.status === "integrated_contract").length;
  const queuedP0 = transferPatterns.filter((pattern) => pattern.status === "queued_p0").length;
  const highPriority = transferPatterns.filter((pattern) => pattern.priority === "p0" || pattern.priority === "p1").length;
  return {
    sourcePath,
    productPosition,
    sourceBoundary,
    summary: {
      totalSources: referenceLinks.length,
      platformGroups: platformGroups.length,
      totalPatterns: transferPatterns.length,
      implemented,
      integratedContract,
      queuedP0,
      highPriority
    },
    referenceLinks,
    platformGroups,
    transferPatterns
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
