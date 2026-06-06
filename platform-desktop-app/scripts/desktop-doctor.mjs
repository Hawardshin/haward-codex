import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { runCustomerBundleAudit } from "./check-customer-bundle.mjs";
import { checkReleaseReadiness } from "./check-release-readiness.mjs";
import { checkServiceReadiness } from "./check-service-readiness.mjs";
import { projectRoot, repoRoot, tauriRoot } from "./desktop-pipeline/paths.mjs";

const requiredFiles = [
  "package.json",
  "src-tauri/tauri.conf.json",
  "renderer/workspace-monitor/package.json",
  "scripts/desktop-pipeline.mjs",
  "scripts/desktop-pipeline/definitions.mjs",
  "scripts/desktop-pipeline/runner.mjs",
  "scripts/tauri-before-build-prepared.mjs"
];

function main(argv = process.argv.slice(2)) {
  const jsonOutput = argv.includes("--json");
  const report = buildDoctorReport();

  if (jsonOutput) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printHumanReport(report);
  }

  if (report.summary.failures > 0) {
    process.exitCode = 1;
  }
}

export function buildDoctorReport() {
  const checks = [
    checkFile("Root pnpm lockfile", path.join(repoRoot, "pnpm-lock.yaml")),
    ...requiredFiles.map((relativePath) => checkFile(relativePath, path.join(projectRoot, relativePath))),
    checkPackageScripts(),
    commandCheck("Node runtime", "node", ["--version"], repoRoot),
    commandCheck("pnpm via Corepack", "corepack", ["pnpm", "--version"], repoRoot),
    commandCheck("Rust cargo", "cargo", ["--version"], tauriRoot),
    commandCheck("Rust compiler", "rustc", ["--version"], tauriRoot),
    commandCheck("Tauri CLI", "corepack", ["pnpm", "--filter", "platform-desktop-app", "exec", "tauri", "--version"], repoRoot),
    commandCheck("Playwright CLI", "corepack", ["pnpm", "--filter", "workspace-monitor", "exec", "playwright", "--version"], repoRoot),
    checkPlaywrightBrowsers(),
    checkCustomerBundle(),
    checkInternalRelease(),
    checkPublicReleaseGates()
  ];

  const summary = summarize(checks);
  return {
    status: summary.failures > 0 ? "desktop_doctor_failed" : summary.warnings > 0 ? "desktop_doctor_ready_with_warnings" : "desktop_doctor_ready",
    generatedAt: new Date().toISOString(),
    summary,
    checks,
    nextCommands: nextCommands(summary)
  };
}

function checkFile(label, filePath) {
  return {
    id: idFromLabel(label),
    label,
    status: existsSync(filePath) ? "passed" : "failed",
    detail: path.relative(repoRoot, filePath).split(path.sep).join("/")
  };
}

function checkPackageScripts() {
  const rootPkg = readJson(path.join(repoRoot, "package.json"));
  const pkg = readJson(path.join(projectRoot, "package.json"));
  const monitorPkg = readJson(path.join(projectRoot, "renderer/workspace-monitor/package.json"));
  const requiredRootScripts = [
    "desktop:setup",
    "desktop:dev",
    "desktop:verify:quick",
    "desktop:verify",
    "desktop:renderer:build",
    "desktop:package:internal",
    "desktop:run:internal",
    "desktop:package:run:internal",
    "desktop:release:dev-env",
    "desktop:release:report",
    "desktop:doctor"
  ];
  const requiredProjectScripts = [
    "doctor",
    "setup",
    "verify:quick",
    "verify",
    "renderer:build",
    "package:internal",
    "run:internal",
    "package:public",
    "deploy:public:report",
    "release:public:dev-env",
    "release:public:config",
    "release:manifest",
    "tauri:build:prepared"
  ];
  const missing = [
    ...requiredRootScripts.filter((scriptName) => !rootPkg.scripts?.[scriptName]).map((scriptName) => `root:${scriptName}`),
    ...requiredProjectScripts.filter((scriptName) => !pkg.scripts?.[scriptName]).map((scriptName) => `desktop:${scriptName}`),
    ...["install:browsers", "build:customer"].filter((scriptName) => !monitorPkg.scripts?.[scriptName]).map((scriptName) => `monitor:${scriptName}`)
  ];

  return {
    id: "package_scripts",
    label: "Desktop package scripts",
    status: missing.length ? "failed" : "passed",
    detail: missing.length ? `Missing scripts: ${missing.join(", ")}` : "Required setup, dev, verify, renderer, package, run, release, browser, and doctor scripts are present."
  };
}

function commandCheck(label, command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    shell: false,
    timeout: 20_000
  });
  const output = normalizeOutput(`${result.stdout || ""}\n${result.stderr || ""}`);
  return {
    id: idFromLabel(label),
    label,
    status: result.status === 0 ? "passed" : "failed",
    detail: output || result.error?.message || `${command} ${args.join(" ")} exited with ${String(result.status)}`
  };
}

function checkPlaywrightBrowsers() {
  const result = spawnSync("corepack", ["pnpm", "--filter", "workspace-monitor", "exec", "playwright", "install", "--list"], {
    cwd: repoRoot,
    encoding: "utf8",
    shell: false,
    timeout: 20_000
  });
  const output = normalizeOutput(`${result.stdout || ""}\n${result.stderr || ""}`);
  const hasHeadlessShell = output.includes("chromium_headless_shell");
  return {
    id: "playwright_browsers",
    label: "Playwright browser cache",
    status: result.status === 0 && hasHeadlessShell ? "passed" : "failed",
    detail: hasHeadlessShell ? "Chromium headless shell is installed for the current Playwright cache." : output || "Chromium headless shell was not found."
  };
}

function checkCustomerBundle() {
  const report = runCustomerBundleAudit({ allowMissingDist: true, allowStaleGeneratedSnapshots: true });
  return {
    id: "customer_bundle",
    label: "Customer renderer bundle boundary",
    status: report.failures.length ? "failed" : report.warnings.length ? "warning" : "passed",
    detail: report.failures[0] || report.warnings[0] || `${report.checkedSnapshots.length} snapshots checked; ${report.scannedDistFiles} dist files scanned.`
  };
}

function checkInternalRelease() {
  const report = checkReleaseReadiness({ mode: "internal", reportOnly: true });
  return {
    id: "internal_release_preflight",
    label: "Internal release preflight",
    status: report.blockers.length ? "failed" : report.warnings.length ? "warning" : "passed",
    detail: report.blockers[0] || report.warnings[0] || "Internal release preflight has no blockers."
  };
}

function checkPublicReleaseGates() {
  const release = checkReleaseReadiness({ mode: "public", reportOnly: true });
  const service = checkServiceReadiness({ mode: "public", reportOnly: true });
  const blockers = [...release.blockers, ...service.publicBlockers];
  return {
    id: "public_release_gates",
    label: "Public release gates",
    status: blockers.length ? "warning" : "passed",
    detail: blockers.length ? `Still blocked for public release: ${Array.from(new Set(blockers)).join("; ")}` : "No public release blockers reported."
  };
}

function summarize(checks) {
  return {
    total: checks.length,
    passed: checks.filter((check) => check.status === "passed").length,
    warnings: checks.filter((check) => check.status === "warning").length,
    failures: checks.filter((check) => check.status === "failed").length
  };
}

function nextCommands(summary) {
  if (summary.failures > 0) {
    return [
      "corepack pnpm run desktop:setup",
      "corepack pnpm run desktop:doctor"
    ];
  }
  return [
    "corepack pnpm run desktop:dev",
    "corepack pnpm run desktop:verify:quick",
    "corepack pnpm run desktop:verify",
    "corepack pnpm run desktop:package:internal",
    "corepack pnpm run desktop:run:internal",
    "corepack pnpm run desktop:release:report"
  ];
}

function printHumanReport(report) {
  console.log(`[desktop-doctor] ${report.status}`);
  console.log(`[desktop-doctor] passed=${report.summary.passed} warnings=${report.summary.warnings} failures=${report.summary.failures}`);
  for (const check of report.checks) {
    const marker = check.status === "passed" ? "PASS" : check.status === "warning" ? "WARN" : "FAIL";
    console.log(`\n[${marker}] ${check.label}`);
    console.log(`  ${check.detail}`);
  }
  console.log("\nNext commands:");
  for (const command of report.nextCommands) {
    console.log(`  - ${command}`);
  }
}

function idFromLabel(label) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function normalizeOutput(output) {
  return output.trim().split("\n").map((line) => line.trim()).filter(Boolean).slice(0, 8).join(" | ");
}

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
