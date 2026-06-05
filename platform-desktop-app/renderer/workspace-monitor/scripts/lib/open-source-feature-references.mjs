import fs from "node:fs";
import path from "node:path";

const OPEN_SOURCE_FEATURE_REFERENCE_REGISTRY_PATH =
  "platform-desktop-app/configs/open-source-feature-reference-registry.json";

export function emptyOpenSourceFeatureReferences() {
  return buildOpenSourceFeatureReferences({
    sourcePath: "",
    sourceBoundary: {
      policy: "public_sources_only",
      customerVisibility: "summary_allowed"
    },
    referenceLinks: [],
    featureReferenceLayers: []
  });
}

export function collectOpenSourceFeatureReferences(repoRoot) {
  const fallback = emptyOpenSourceFeatureReferences();
  const registry = readJson(path.join(repoRoot, OPEN_SOURCE_FEATURE_REFERENCE_REGISTRY_PATH), null);
  if (!registry || typeof registry !== "object") {
    return fallback;
  }

  const sourceBoundary = registry.source_boundary || {};
  const referenceLinks = Array.isArray(registry.reference_links)
    ? registry.reference_links
        .filter((source) => source && typeof source === "object")
        .map((source) => ({
          id: source.id || "",
          title: source.title || "",
          url: source.url || "",
          path: source.path || "",
          sourceType: source.source_type || "",
          usedFor: arrayOfStrings(source.used_for),
          lastChecked: source.last_checked || ""
        }))
        .filter((source) => source.id && (source.url || source.path))
    : [];

  const featureReferenceLayers = Array.isArray(registry.feature_reference_layers)
    ? registry.feature_reference_layers
        .filter((layer) => layer && typeof layer === "object")
        .map((layer) => ({
          featureId: layer.feature_id || "",
          label: layer.label || titleFromId(layer.feature_id || "feature"),
          priority: layer.priority || "p2",
          primarySection: layer.primary_section || "overview",
          installPolicy: layer.install_policy || "no_new_dependency_now",
          installNeededNow: Boolean(layer.install_needed_now),
          directExplorationRequired: layer.direct_exploration_required !== false,
          implementationTargets: arrayOfStrings(layer.implementation_targets),
          candidateRepos: Array.isArray(layer.candidate_repos)
            ? layer.candidate_repos
                .filter((repo) => repo && typeof repo === "object")
                .map((repo) => ({
                  id: repo.id || "",
                  title: repo.title || "",
                  url: repo.url || "",
                  verifiedBy: repo.verified_by || "",
                  watchTargets: arrayOfStrings(repo.watch_targets),
                  patternsToExtract: arrayOfStrings(repo.patterns_to_extract)
                }))
                .filter((repo) => repo.id && repo.url)
            : []
        }))
        .filter((layer) => layer.featureId)
    : [];

  return buildOpenSourceFeatureReferences({
    sourcePath: OPEN_SOURCE_FEATURE_REFERENCE_REGISTRY_PATH,
    sourceBoundary: {
      policy: sourceBoundary.policy || "public_sources_only",
      customerVisibility: sourceBoundary.customer_visibility || "summary_allowed",
      excludedSources: arrayOfStrings(sourceBoundary.excluded_sources),
      acceptedSourceTypes: arrayOfStrings(sourceBoundary.accepted_source_types)
    },
    referenceLinks,
    featureReferenceLayers
  });
}

export function sanitizeOpenSourceFeatureReferencesForCustomer(references) {
  return {
    ...references,
    sourcePath: "",
    sourceBoundary: {
      policy: references.sourceBoundary.policy,
      customerVisibility: "summary_allowed",
      excludedSources: [],
      acceptedSourceTypes: []
    },
    referenceLinks: [],
    featureReferenceLayers: references.featureReferenceLayers.map((layer) => ({
      ...layer,
      candidateRepos: layer.candidateRepos.slice(0, 3).map((repo) => ({
        ...repo,
        watchTargets: [],
        patternsToExtract: repo.patternsToExtract.slice(0, 2)
      }))
    }))
  };
}

function buildOpenSourceFeatureReferences({ sourcePath, sourceBoundary, referenceLinks, featureReferenceLayers }) {
  const totalRepositories = featureReferenceLayers.reduce((total, layer) => total + layer.candidateRepos.length, 0);
  const installReady = featureReferenceLayers.filter((layer) => layer.installNeededNow).length;
  const directExplorationRequired = featureReferenceLayers.filter((layer) => layer.directExplorationRequired).length;
  const highPriority = featureReferenceLayers.filter((layer) => layer.priority === "p0" || layer.priority === "p1").length;
  return {
    sourcePath,
    sourceBoundary,
    summary: {
      totalLayers: featureReferenceLayers.length,
      totalRepositories,
      installReady,
      directExplorationRequired,
      highPriority
    },
    referenceLinks,
    featureReferenceLayers
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

function titleFromId(id) {
  return String(id)
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
