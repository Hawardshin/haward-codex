import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { projectRoot, tauriRoot } from "./desktop-pipeline/paths.mjs";

export const publicReleaseTargetDir = path.join(tauriRoot, "target", "public-release");
export const publicTauriConfigPath = path.join(publicReleaseTargetDir, "tauri.public.generated.json");
export const publicUpdateChannelMarkerPath = path.join(publicReleaseTargetDir, "service-update-channel.json");

export function buildPublicReleaseConfigReport({ env = process.env, writeFiles = false } = {}) {
  const baseConfig = readJson(path.join(tauriRoot, "tauri.conf.json"));
  const releaseEnv = parsePublicReleaseEnv(env);
  const blockers = validatePublicReleaseEnv(releaseEnv);
  const warnings = [];

  if (releaseEnv.updaterEndpoints.length > 1) {
    warnings.push("Multiple updater endpoints are configured. Tauri will try later endpoints only after non-2XX responses.");
  }

  const marker = buildUpdateChannelMarker(releaseEnv);
  const config = buildPublicTauriConfig(baseConfig, releaseEnv);

  if (writeFiles && blockers.length === 0) {
    mkdirSync(publicReleaseTargetDir, { recursive: true });
    writeFileSync(publicUpdateChannelMarkerPath, `${JSON.stringify(marker, null, 2)}\n`);
    writeFileSync(publicTauriConfigPath, `${JSON.stringify(config, null, 2)}\n`);
  }

  return {
    status: blockers.length ? "public_release_config_blocked" : "public_release_config_ready",
    blockers,
    warnings,
    configPath: publicTauriConfigPath,
    updateChannelMarkerPath: publicUpdateChannelMarkerPath,
    config,
    marker,
    envSummary: summarizePublicReleaseEnv(releaseEnv),
    checks: buildPublicReleaseChecks(releaseEnv, blockers)
  };
}

export function parsePublicReleaseEnv(env = process.env) {
  const updaterEndpoints = parseEndpointList(env.TAURI_UPDATER_ENDPOINTS);
  return {
    macosSigningIdentity: firstValue(env.APPLE_SIGNING_IDENTITY, env.TAURI_PUBLIC_SIGNING_IDENTITY),
    hasAppleCertificate: Boolean(env.APPLE_CERTIFICATE && env.APPLE_CERTIFICATE_PASSWORD),
    appleCertificatePath: normalizeMaybePath(env.APPLE_CERTIFICATE),
    hasAppleIdNotaryEnv: Boolean(env.APPLE_ID && env.APPLE_PASSWORD && env.APPLE_TEAM_ID),
    hasApiKeyNotaryEnv: Boolean(env.APPLE_API_KEY && env.APPLE_API_ISSUER && env.APPLE_API_KEY_PATH),
    appleApiKeyPath: normalizeMaybePath(env.APPLE_API_KEY_PATH),
    updaterPublicKey: env.TAURI_UPDATER_PUBLIC_KEY || "",
    updaterPrivateKey: env.TAURI_SIGNING_PRIVATE_KEY || "",
    hasUpdaterPrivateKeyPassword: Boolean(env.TAURI_SIGNING_PRIVATE_KEY_PASSWORD),
    updaterEndpoints,
    releaseAssetBaseUrl: env.TAURI_RELEASE_ASSET_BASE_URL || "",
    releaseNotes: env.TAURI_RELEASE_NOTES || "",
    createStaticManifest: env.TAURI_CREATE_STATIC_UPDATE_MANIFEST !== "0",
    generatedAt: new Date().toISOString()
  };
}

export function validatePublicReleaseEnv(releaseEnv) {
  const blockers = [];
  const hasDeveloperId = Boolean(releaseEnv.macosSigningIdentity && releaseEnv.macosSigningIdentity !== "-");
  if (!hasDeveloperId && !releaseEnv.hasAppleCertificate) {
    blockers.push("APPLE_SIGNING_IDENTITY or APPLE_CERTIFICATE/APPLE_CERTIFICATE_PASSWORD is required for public signing.");
  }
  if (!releaseEnv.hasAppleIdNotaryEnv && !releaseEnv.hasApiKeyNotaryEnv) {
    blockers.push("Apple notarization credentials are required: APPLE_ID/APPLE_PASSWORD/APPLE_TEAM_ID or APPLE_API_KEY/APPLE_API_ISSUER/APPLE_API_KEY_PATH.");
  }
  if (releaseEnv.hasApiKeyNotaryEnv && releaseEnv.appleApiKeyPath && !existsSync(releaseEnv.appleApiKeyPath)) {
    blockers.push(`APPLE_API_KEY_PATH does not exist: ${releaseEnv.appleApiKeyPath}`);
  }
  if (isBlankOrPlaceholder(releaseEnv.updaterPublicKey) || releaseEnv.updaterPublicKey.length < 32) {
    blockers.push("TAURI_UPDATER_PUBLIC_KEY must contain the Tauri updater public key content, not a placeholder or file path.");
  }
  if (isBlankOrPlaceholder(releaseEnv.updaterPrivateKey)) {
    blockers.push("TAURI_SIGNING_PRIVATE_KEY is required so Tauri can sign updater artifacts.");
  }
  const privateKeyPath = normalizeMaybePath(releaseEnv.updaterPrivateKey);
  if (privateKeyPath && looksLikeFilesystemPath(releaseEnv.updaterPrivateKey) && !existsSync(privateKeyPath)) {
    blockers.push(`TAURI_SIGNING_PRIVATE_KEY path does not exist: ${privateKeyPath}`);
  }
  if (releaseEnv.updaterEndpoints.length === 0) {
    blockers.push("TAURI_UPDATER_ENDPOINTS must contain at least one HTTPS update endpoint.");
  }
  for (const endpoint of releaseEnv.updaterEndpoints) {
    const parsed = parseUrl(endpoint);
    if (!parsed) {
      blockers.push(`Invalid updater endpoint URL: ${endpoint}`);
    } else if (parsed.protocol !== "https:") {
      blockers.push(`Public updater endpoint must use HTTPS: ${endpoint}`);
    }
  }
  if (releaseEnv.createStaticManifest) {
    const assetBase = parseUrl(releaseEnv.releaseAssetBaseUrl);
    if (!assetBase) {
      blockers.push("TAURI_RELEASE_ASSET_BASE_URL must be an HTTPS base URL when static manifest generation is enabled.");
    } else if (assetBase.protocol !== "https:") {
      blockers.push(`TAURI_RELEASE_ASSET_BASE_URL must use HTTPS: ${releaseEnv.releaseAssetBaseUrl}`);
    }
  }
  return Array.from(new Set(blockers));
}

export function buildPublicTauriConfig(baseConfig, releaseEnv) {
  const config = structuredClone(baseConfig);
  config.build = {
    ...(config.build || {}),
    beforeBuildCommand: "node scripts/tauri-before-build-prepared.mjs"
  };
  config.bundle = {
    ...(config.bundle || {}),
    createUpdaterArtifacts: true,
    resources: {
      ...(config.bundle?.resources || {}),
      "target/public-release/service-update-channel.json": "service-update-channel.json"
    },
    macOS: {
      ...(config.bundle?.macOS || {}),
      signingIdentity: releaseEnv.macosSigningIdentity || config.bundle?.macOS?.signingIdentity
    }
  };
  config.plugins = {
    ...(config.plugins || {}),
    updater: {
      pubkey: releaseEnv.updaterPublicKey,
      endpoints: releaseEnv.updaterEndpoints,
      windows: {
        installMode: "passive"
      }
    }
  };
  return config;
}

export function buildUpdateChannelMarker(releaseEnv) {
  return {
    schema_version: "2026-06-06",
    channel: "public",
    generated_at: releaseEnv.generatedAt,
    updater: {
      create_updater_artifacts: true,
      endpoints: releaseEnv.updaterEndpoints,
      public_key_sha256_16: sha256Short(releaseEnv.updaterPublicKey),
      signing_private_key_present: Boolean(releaseEnv.updaterPrivateKey),
      signing_private_key_password_present: releaseEnv.hasUpdaterPrivateKeyPassword
    },
    macos: {
      signing_identity_present: Boolean(releaseEnv.macosSigningIdentity),
      apple_certificate_present: releaseEnv.hasAppleCertificate,
      notarization_mode: releaseEnv.hasApiKeyNotaryEnv
        ? "app_store_connect_api_key"
        : releaseEnv.hasAppleIdNotaryEnv
          ? "apple_id"
          : "missing"
    },
    release_assets: {
      static_manifest_enabled: releaseEnv.createStaticManifest,
      asset_base_url: releaseEnv.releaseAssetBaseUrl || null
    },
    secret_boundary: [
      "TAURI_SIGNING_PRIVATE_KEY is read only from the process environment.",
      "Apple notarization credentials are read only from the process environment.",
      "No private updater key or Apple credential is written into this marker."
    ]
  };
}

export function appendAssetUrl(baseUrl, fileName) {
  const base = new URL(baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
  const encodedFileName = encodeURIComponent(fileName).replace(/%20/g, "%20");
  return new URL(encodedFileName, base).toString();
}

function buildPublicReleaseChecks(releaseEnv, blockers) {
  return [
    {
      id: "developer_id_signing",
      status: releaseEnv.macosSigningIdentity || releaseEnv.hasAppleCertificate ? "passed" : "blocked",
      detail: "APPLE_SIGNING_IDENTITY or APPLE_CERTIFICATE credentials"
    },
    {
      id: "notarization_credentials",
      status: releaseEnv.hasAppleIdNotaryEnv || releaseEnv.hasApiKeyNotaryEnv ? "passed" : "blocked",
      detail: "Apple ID or App Store Connect API key notarization credentials"
    },
    {
      id: "updater_public_key",
      status: blockers.some((blocker) => blocker.includes("TAURI_UPDATER_PUBLIC_KEY")) ? "blocked" : "passed",
      detail: "Tauri updater public key content"
    },
    {
      id: "updater_private_key",
      status: releaseEnv.updaterPrivateKey ? "passed" : "blocked",
      detail: "TAURI_SIGNING_PRIVATE_KEY for updater artifact signatures"
    },
    {
      id: "updater_endpoints",
      status: releaseEnv.updaterEndpoints.length ? "passed" : "blocked",
      detail: "HTTPS updater endpoint list"
    }
  ];
}

function summarizePublicReleaseEnv(releaseEnv) {
  return {
    macosSigningIdentityPresent: Boolean(releaseEnv.macosSigningIdentity),
    appleCertificatePresent: releaseEnv.hasAppleCertificate,
    notarizationMode: releaseEnv.hasApiKeyNotaryEnv
      ? "app_store_connect_api_key"
      : releaseEnv.hasAppleIdNotaryEnv
        ? "apple_id"
        : "missing",
    updaterPublicKeySha25616: releaseEnv.updaterPublicKey ? sha256Short(releaseEnv.updaterPublicKey) : null,
    updaterPrivateKeyPresent: Boolean(releaseEnv.updaterPrivateKey),
    updaterPrivateKeyPasswordPresent: releaseEnv.hasUpdaterPrivateKeyPassword,
    updaterEndpointCount: releaseEnv.updaterEndpoints.length,
    staticManifestEnabled: releaseEnv.createStaticManifest,
    releaseAssetBaseUrlPresent: Boolean(releaseEnv.releaseAssetBaseUrl)
  };
}

function parseEndpointList(value) {
  if (!value) {
    return [];
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }
  if (trimmed.startsWith("[")) {
    const parsed = JSON.parse(trimmed);
    if (!Array.isArray(parsed)) {
      throw new Error("TAURI_UPDATER_ENDPOINTS JSON value must be an array.");
    }
    return parsed.map((item) => String(item).trim()).filter(Boolean);
  }
  return trimmed.split(/[,\n]/).map((item) => item.trim()).filter(Boolean);
}

function isBlankOrPlaceholder(value) {
  if (!value || !value.trim()) {
    return true;
  }
  return /placeholder|change_me|content from publickey|your public key/i.test(value);
}

function looksLikeFilesystemPath(value) {
  return value.startsWith("/") || value.startsWith("~/") || value.startsWith("./") || value.startsWith("../");
}

function normalizeMaybePath(value) {
  if (!value || !looksLikeFilesystemPath(value)) {
    return value || "";
  }
  if (value.startsWith("~/")) {
    return path.join(process.env.HOME || "", value.slice(2));
  }
  return path.resolve(projectRoot, value);
}

function parseUrl(value) {
  try {
    return value ? new URL(value) : null;
  } catch {
    return null;
  }
}

function firstValue(...values) {
  return values.find((value) => value && String(value).trim()) || "";
}

function sha256Short(value) {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function parseArgs(argv) {
  return {
    writeFiles: argv.includes("--write"),
    printPath: argv.includes("--print-path"),
    reportOnly: argv.includes("--report-only")
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs(process.argv.slice(2));
  const report = buildPublicReleaseConfigReport({ writeFiles: options.writeFiles });
  if (options.printPath) {
    console.log(report.configPath);
  } else {
    console.log(JSON.stringify({
      status: report.status,
      blockers: report.blockers,
      warnings: report.warnings,
      configPath: report.configPath,
      updateChannelMarkerPath: report.updateChannelMarkerPath,
      envSummary: report.envSummary,
      checks: report.checks
    }, null, 2));
  }
  if (report.blockers.length && !options.reportOnly) {
    process.exitCode = 1;
  }
}
