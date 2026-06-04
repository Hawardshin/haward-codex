import { readFileSync } from "node:fs";
import { join } from "node:path";

export const desktopBuildPipelineRequiredFiles = [
  "scripts/desktop-pipeline.mjs",
  "scripts/desktop-pipeline/paths.mjs",
  "scripts/desktop-pipeline/definitions.mjs",
  "scripts/desktop-pipeline/runner.mjs",
  "scripts/tauri-before-build-prepared.mjs"
];

export function checkDesktopBuildPipeline({ root, readJson }) {
  const failures = [];
  const pkg = readJson("package.json");
  const rootPkg = readJson("../package.json");
  const workspaceMonitorPkg = readJson("renderer/workspace-monitor/package.json");

  requireScripts(pkg, ["check", "test", "verify", "tauri:dev", "tauri:build"], "package.json", failures);
  requireScripts(pkg, ["runtime:contract"], "package.json", failures);
  requireScripts(pkg, ["setup", "verify:quick", "package:internal", "deploy:public:report", "pipeline:dry-run"], "package.json", failures);
  requireScripts(pkg, ["customer-bundle:audit", "release:preflight", "release:preflight:public", "release:preflight:public:report"], "package.json", failures);
  requireScripts(pkg, ["service:readiness", "service:readiness:public:report"], "package.json", failures);
  requireScripts(rootPkg, [
    "desktop:setup",
    "desktop:setup:verify",
    "desktop:verify:quick",
    "desktop:verify",
    "desktop:renderer:build",
    "desktop:package:internal",
    "desktop:release:report"
  ], "root package.json", failures);

  requireScriptIncludes(pkg, "renderer:build", "build:customer", "platform-desktop-app renderer:build must use the customer Workspace Monitor build", failures);
  requireScriptIncludes(pkg, "renderer:build", "customer-bundle:audit", "platform-desktop-app renderer:build must audit the customer bundle after building", failures);
  requireScriptIncludes(pkg, "monitor:build", "renderer:build", "platform-desktop-app monitor:build must remain a compatibility alias for renderer:build", failures);
  requireScriptIncludes(pkg, "tauri:build:prepared", "tauri-build-prepared", "package.json must expose tauri:build:prepared for no-rebuild internal packaging", failures);
  requireScriptIncludes(workspaceMonitorPkg, "build:customer", "--snapshot-mode customer", "workspace-monitor package.json must expose build:customer with customer snapshot mode", failures);

  for (const requiredScript of ["check-customer-bundle.mjs", "check-release-readiness.mjs", "check-runtime-contract.mjs", "check-service-readiness.mjs"]) {
    requireScriptIncludes(pkg, "check", requiredScript, `platform-desktop-app check must run ${requiredScript}`, failures);
  }

  if (!pkg.devDependencies?.["@tauri-apps/cli"]) {
    failures.push("package.json must declare @tauri-apps/cli as a project-local devDependency");
  }

  checkDocsAndPipelineStructure(root, failures);

  return failures;
}

function requireScripts(pkg, scriptNames, label, failures) {
  for (const scriptName of scriptNames) {
    if (!pkg.scripts?.[scriptName]) {
      failures.push(`${label} must expose ${scriptName}`);
    }
  }
}

function requireScriptIncludes(pkg, scriptName, token, message, failures) {
  if (!pkg.scripts?.[scriptName]?.includes(token)) {
    failures.push(message);
  }
}

function checkDocsAndPipelineStructure(root, failures) {
  const installableRequirementsKo = readText(root, "docs/requirements/2026-06-02-installable-desktop.ko.md");
  const installableRequirementsEn = readText(root, "docs/requirements/2026-06-02-installable-desktop.en.md");
  const readmeKo = readText(root, "README.ko.md");
  const readmeEn = readText(root, "README.en.md");
  const defaultReadme = readText(root, "README.md");
  const releaseRunbookKo = readText(root, "docs/release-runbook.ko.md");
  const releaseRunbookEn = readText(root, "docs/release-runbook.en.md");
  const desktopPipelineEntrypoint = readText(root, "scripts/desktop-pipeline.mjs");
  const desktopPipelineStructure = [
    desktopPipelineEntrypoint,
    readText(root, "scripts/desktop-pipeline/definitions.mjs"),
    readText(root, "scripts/desktop-pipeline/runner.mjs")
  ].join("\n");

  if (!installableRequirementsKo.includes("PDA-REQ-038") || !installableRequirementsEn.includes("PDA-REQ-038")) {
    failures.push("installable desktop requirements must include PDA-REQ-038 for bilingual README and one-command release paths");
  }
  if (!installableRequirementsKo.includes("PDA-REQ-039") || !installableRequirementsEn.includes("PDA-REQ-039")) {
    failures.push("installable desktop requirements must include PDA-REQ-039 for Korean-first native workspace UX");
  }

  for (const requiredPhrase of [
    "corepack pnpm run desktop:setup:verify",
    "corepack pnpm run desktop:verify",
    "corepack pnpm run desktop:package:internal",
    "corepack pnpm run desktop:release:report",
    "docs/release-runbook.ko.md",
    "README.en.md"
  ]) {
    if (!defaultReadme.includes(requiredPhrase)) {
      failures.push(`README.md must include ${requiredPhrase}`);
    }
  }

  for (const requiredPhrase of [
    "corepack pnpm run desktop:package:internal",
    "Developer ID",
    "notarization",
    "clean-machine",
    "ad-hoc signing"
  ]) {
    if (!readmeKo.includes(requiredPhrase) || !releaseRunbookKo.includes(requiredPhrase)) {
      failures.push(`Korean desktop docs must include ${requiredPhrase}`);
    }
    if (!readmeEn.includes(requiredPhrase) || !releaseRunbookEn.includes(requiredPhrase)) {
      failures.push(`English desktop docs must include ${requiredPhrase}`);
    }
  }

  for (const requiredPhrase of [
    "package-internal",
    "public-report",
    "commonVerifySteps",
    "Tauri internal package build",
    "codesign",
    "hdiutil",
    "Public distribution remains blocked"
  ]) {
    if (!desktopPipelineStructure.includes(requiredPhrase)) {
      failures.push(`desktop pipeline structure must include ${requiredPhrase}`);
    }
  }
  if (!desktopPipelineEntrypoint.includes("./desktop-pipeline/runner.mjs")) {
    failures.push("desktop-pipeline.mjs must remain a thin entrypoint to scripts/desktop-pipeline/runner.mjs");
  }
}

function readText(root, relativePath) {
  return readFileSync(join(root, relativePath), "utf8");
}
