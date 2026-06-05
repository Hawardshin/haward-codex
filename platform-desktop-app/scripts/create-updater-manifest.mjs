import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { appendAssetUrl, parsePublicReleaseEnv, validatePublicReleaseEnv } from "./public-release-config.mjs";
import { tauriRoot } from "./desktop-pipeline/paths.mjs";

const appName = "Agent Workspace Platform";
const macosUpdaterBundle = path.join(
  tauriRoot,
  "target/release/bundle/macos",
  `${appName}.app.tar.gz`
);
const macosUpdaterSignature = `${macosUpdaterBundle}.sig`;
const defaultManifestPath = path.join(tauriRoot, "target/release/bundle/latest.json");

export function createUpdaterManifest({ env = process.env, outputPath = defaultManifestPath } = {}) {
  const releaseEnv = parsePublicReleaseEnv(env);
  const blockers = validatePublicReleaseEnv(releaseEnv).filter((blocker) => {
    return blocker.includes("TAURI_RELEASE_ASSET_BASE_URL") || blocker.includes("TAURI_UPDATER_PUBLIC_KEY");
  });
  if (!releaseEnv.createStaticManifest) {
    blockers.push("Static manifest generation is disabled by TAURI_CREATE_STATIC_UPDATE_MANIFEST=0.");
  }
  if (!existsSync(macosUpdaterBundle)) {
    blockers.push(`Missing macOS updater bundle: ${macosUpdaterBundle}`);
  }
  if (!existsSync(macosUpdaterSignature)) {
    blockers.push(`Missing macOS updater signature: ${macosUpdaterSignature}`);
  }
  if (blockers.length) {
    return {
      status: "updater_manifest_blocked",
      blockers,
      manifestPath: outputPath,
      artifactPath: macosUpdaterBundle,
      signaturePath: macosUpdaterSignature
    };
  }

  const version = readJson(path.join(tauriRoot, "tauri.conf.json")).version;
  const artifactFileName = path.basename(macosUpdaterBundle);
  const manifest = {
    version,
    notes: releaseEnv.releaseNotes || `Agent Workspace Platform ${version}`,
    pub_date: new Date().toISOString(),
    platforms: {
      [defaultUpdaterTarget()]: {
        signature: readFileSync(macosUpdaterSignature, "utf8").trim(),
        url: appendAssetUrl(releaseEnv.releaseAssetBaseUrl, artifactFileName)
      }
    }
  };

  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
  return {
    status: "updater_manifest_ready",
    blockers: [],
    manifestPath: outputPath,
    artifactPath: macosUpdaterBundle,
    signaturePath: macosUpdaterSignature,
    target: defaultUpdaterTarget(),
    assetUrl: manifest.platforms[defaultUpdaterTarget()].url
  };
}

function defaultUpdaterTarget() {
  if (process.platform === "darwin") {
    return `darwin-${process.arch === "arm64" ? "aarch64" : process.arch}`;
  }
  if (process.platform === "win32") {
    return `windows-${process.arch === "x64" ? "x86_64" : process.arch}`;
  }
  return `linux-${process.arch === "x64" ? "x86_64" : process.arch}`;
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function parseArgs(argv) {
  const outputIndex = argv.indexOf("--output");
  return {
    outputPath: outputIndex >= 0 ? path.resolve(argv[outputIndex + 1]) : defaultManifestPath
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = createUpdaterManifest(parseArgs(process.argv.slice(2)));
  console.log(JSON.stringify(report, null, 2));
  if (report.blockers.length) {
    process.exitCode = 1;
  }
}
