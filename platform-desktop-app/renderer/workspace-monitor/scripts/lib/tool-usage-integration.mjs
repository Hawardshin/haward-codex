import fs from "node:fs";
import path from "node:path";

const TOOL_USAGE_INTEGRATION_REGISTRY_PATH = "platform-desktop-app/configs/tool-usage-integration-registry.json";

export function emptyToolUsageIntegration() {
  return buildToolUsageIntegration({
    sourcePath: "",
    referenceLinks: [],
    patterns: [],
    verificationLadders: [],
    adoptionBacklog: []
  });
}

export function collectToolUsageIntegration(repoRoot) {
  const fallback = emptyToolUsageIntegration();
  const registry = readJson(path.join(repoRoot, TOOL_USAGE_INTEGRATION_REGISTRY_PATH), null);
  if (!registry || typeof registry !== "object") {
    return fallback;
  }

  const patterns = Array.isArray(registry.patterns)
    ? registry.patterns
        .filter((pattern) => pattern && typeof pattern === "object")
        .map((pattern) => ({
          id: pattern.id || "",
          label: pattern.label || titleFromId(pattern.id || "tool-pattern"),
          labelKo: pattern.label_ko || pattern.label || titleFromId(pattern.id || "tool-pattern"),
          purpose: pattern.purpose || "",
          toolSurfaces: arrayOfStrings(pattern.tool_surfaces),
          triggerWhen: arrayOfStrings(pattern.trigger_when),
          sequence: arrayOfStrings(pattern.sequence),
          evidenceOutputs: arrayOfStrings(pattern.evidence_outputs),
          validationCommands: arrayOfStrings(pattern.validation_commands),
          failureModes: arrayOfStrings(pattern.failure_modes),
          platformApplication: pattern.platform_application || "",
          status: pattern.status || "planned",
          priority: pattern.priority || "p2"
        }))
        .filter((pattern) => pattern.id)
    : [];

  const verificationLadders = Array.isArray(registry.verification_ladders)
    ? registry.verification_ladders
        .filter((ladder) => ladder && typeof ladder === "object")
        .map((ladder) => ({
          id: ladder.id || "",
          label: ladder.label || titleFromId(ladder.id || "verification-ladder"),
          surface: ladder.surface || "tools",
          commands: arrayOfStrings(ladder.commands),
          acceptance: arrayOfStrings(ladder.acceptance),
          ownerFeatureId: ladder.owner_feature_id || ""
        }))
        .filter((ladder) => ladder.id)
    : [];

  const adoptionBacklog = Array.isArray(registry.adoption_backlog)
    ? registry.adoption_backlog
        .filter((item) => item && typeof item === "object")
        .map((item) => ({
          id: item.id || "",
          title: item.title || titleFromId(item.id || "adoption-item"),
          targetPaths: arrayOfStrings(item.target_paths),
          smallestAssetType: item.smallest_asset_type || "project_feature",
          status: item.status || "queued",
          riskControls: arrayOfStrings(item.risk_controls)
        }))
        .filter((item) => item.id)
    : [];

  const referenceLinks = Array.isArray(registry.reference_links)
    ? registry.reference_links
        .filter((link) => link && typeof link === "object")
        .map((link) => ({
          id: link.id || "",
          title: link.title || titleFromId(link.id || "reference"),
          url: link.url || "",
          path: link.path || "",
          sourceType: link.source_type || "unknown",
          usedFor: arrayOfStrings(link.used_for),
          lastChecked: link.last_checked || "",
          reliability: link.reliability || "",
          limitations: link.limitations || ""
        }))
        .filter((link) => link.id)
    : [];

  return buildToolUsageIntegration({
    sourcePath: TOOL_USAGE_INTEGRATION_REGISTRY_PATH,
    referenceLinks,
    patterns,
    verificationLadders,
    adoptionBacklog
  });
}

export function sanitizeToolUsageIntegrationForCustomer(integration) {
  return {
    ...integration,
    sourcePath: "",
    referenceLinks: integration.referenceLinks.filter((link) => link.url),
    adoptionBacklog: integration.adoptionBacklog.map((item) => ({
      ...item,
      targetPaths: [],
      riskControls: item.riskControls.slice(0, 3)
    }))
  };
}

function buildToolUsageIntegration({
  sourcePath,
  referenceLinks,
  patterns,
  verificationLadders,
  adoptionBacklog
}) {
  const validationCommandCount =
    patterns.reduce((total, pattern) => total + pattern.validationCommands.length, 0) +
    verificationLadders.reduce((total, ladder) => total + ladder.commands.length, 0);
  return {
    sourcePath,
    summary: {
      totalPatterns: patterns.length,
      implementedPatterns: patterns.filter((pattern) => pattern.status === "implemented").length,
      p0Patterns: patterns.filter((pattern) => pattern.priority === "p0").length,
      verificationLadders: verificationLadders.length,
      validationCommands: validationCommandCount,
      adoptionBacklog: adoptionBacklog.length,
      referenceLinks: referenceLinks.length
    },
    referenceLinks,
    patterns,
    verificationLadders,
    adoptionBacklog
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
