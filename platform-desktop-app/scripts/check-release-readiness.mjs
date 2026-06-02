import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function checkReleaseReadiness({ mode = "internal", reportOnly = false } = {}) {
  const blockers = [];
  const warnings = [];
  const checks = [];
  const tauriConfig = readJson(path.join(root, "src-tauri", "tauri.conf.json"));
  const macos = tauriConfig.bundle?.macOS || {};
  const targets = tauriConfig.bundle?.targets || [];

  requireCheck(checks, targets.includes("app"), "bundle target includes app", blockers);
  requireCheck(checks, targets.includes("dmg"), "bundle target includes dmg", blockers);
  requireCheck(checks, tauriConfig.build?.frontendDist === "../../workspace-monitor/out", "frontendDist points to customer audited workspace-monitor/out", blockers);

  if (mode === "internal") {
    requireCheck(checks, macos.signingIdentity === "-", "internal build uses explicit ad-hoc signing identity", blockers);
    requireCheck(checks, macos.hardenedRuntime === true, "internal build enables hardenedRuntime for parity with public release path", blockers);
    if (!commandExists("codesign")) {
      warnings.push("codesign command is unavailable; macOS bundle verification will be skipped on this host.");
    }
    if (!commandExists("hdiutil")) {
      warnings.push("hdiutil command is unavailable; DMG verification will be skipped on this host.");
    }
  }

  if (mode === "public") {
    const hasConfiguredDeveloperId = Boolean(macos.signingIdentity && macos.signingIdentity !== "-");
    const hasCertificateEnv = Boolean(process.env.APPLE_CERTIFICATE && process.env.APPLE_CERTIFICATE_PASSWORD);
    requireCheck(
      checks,
      hasConfiguredDeveloperId || hasCertificateEnv,
      "public release has Developer ID signing identity or APPLE_CERTIFICATE credentials",
      blockers
    );
    requireCheck(checks, macos.hardenedRuntime === true, "public release enables hardenedRuntime", blockers);
    requireCheck(checks, commandExists("codesign"), "codesign command available", blockers);
    requireCheck(checks, commandExists("hdiutil"), "hdiutil command available", blockers);
    requireCheck(checks, commandExists("xcrun"), "xcrun command available for notarytool/stapler", blockers);
    const hasAppleIdNotaryEnv = Boolean(process.env.APPLE_ID && process.env.APPLE_PASSWORD && process.env.APPLE_TEAM_ID);
    const hasApiKeyNotaryEnv = Boolean(process.env.APPLE_API_KEY && process.env.APPLE_API_ISSUER && process.env.APPLE_API_KEY_PATH);
    requireCheck(
      checks,
      hasAppleIdNotaryEnv || hasApiKeyNotaryEnv,
      "public release has Apple notarization credentials",
      blockers
    );
    if (!existsSync(path.join(root, "src-tauri", "Entitlements.plist"))) {
      warnings.push("No Entitlements.plist is configured. This may be acceptable, but public release should document required entitlements explicitly.");
    }
  }

  const status = blockers.length
    ? mode === "public"
      ? "public_release_blocked"
      : "internal_release_blocked"
    : mode === "public"
      ? "public_release_preflight_ready"
      : "internal_release_preflight_ready";

  return {
    status,
    mode,
    reportOnly,
    blockers,
    warnings,
    checks,
    releaseClaim: mode === "public" && blockers.length === 0
      ? "Public preflight checks passed, but a clean-machine install/open smoke test is still required before final release language."
      : "Do not claim public release readiness until Developer ID signing, hardened runtime, notarization, stapling when applicable, and clean-machine smoke tests pass."
  };
}

function requireCheck(checks, passed, label, blockers) {
  checks.push({ label, status: passed ? "passed" : "blocked" });
  if (!passed) {
    blockers.push(label);
  }
}

function commandExists(command) {
  try {
    execFileSync("/bin/sh", ["-lc", `command -v ${command}`], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function parseArgs(argv) {
  const modeIndex = argv.indexOf("--mode");
  const mode = modeIndex >= 0 ? argv[modeIndex + 1] || "internal" : "internal";
  if (!["internal", "public"].includes(mode)) {
    throw new Error(`Unsupported release readiness mode: ${mode}`);
  }
  return {
    mode,
    reportOnly: argv.includes("--report-only")
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const report = checkReleaseReadiness(parseArgs(process.argv.slice(2)));
  console.log(JSON.stringify(report, null, 2));
  if (report.blockers.length && !report.reportOnly) {
    process.exitCode = 1;
  }
}
