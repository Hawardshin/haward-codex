import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

import { helpText, pipelines } from "./definitions.mjs";
import { tauriRoot } from "./paths.mjs";

export function main(argv = process.argv.slice(2)) {
  const mode = argv.find((arg) => !arg.startsWith("--")) ?? "help";
  const dryRun = argv.includes("--dry-run");

  if (mode === "help" || mode === "--help" || mode === "-h") {
    printHelp();
    return;
  }

  const pipeline = pipelines[mode];
  if (!pipeline) {
    console.error(`[desktop-pipeline] Unknown pipeline: ${mode}`);
    printHelp();
    process.exit(1);
  }

  console.log(`[desktop-pipeline] ${pipeline.description}`);
  console.log(`[desktop-pipeline] mode=${mode} dryRun=${dryRun ? "true" : "false"}`);

  if (!existsSync(tauriRoot)) {
    console.error(`[desktop-pipeline] Missing Tauri root: ${tauriRoot}`);
    process.exit(1);
  }

  for (const currentStep of pipeline.steps) {
    runStep(currentStep, dryRun);
  }

  if (pipeline.artifactHints?.length) {
    console.log("[desktop-pipeline] Expected local/internal artifacts:");
    for (const artifact of pipeline.artifactHints) {
      console.log(`  - ${artifact}`);
    }
  }

  if (mode === "public-report") {
    console.log("[desktop-pipeline] Public distribution remains blocked until signing, notarization, updater, and clean-machine smoke gates pass.");
  }

  console.log("[desktop-pipeline] completed");
}

function runStep(currentStep, dryRun) {
  if (currentStep.onlyPlatform && currentStep.onlyPlatform !== process.platform) {
    console.log(`\n[desktop-pipeline] ${currentStep.label}`);
    console.log(`[desktop-pipeline] skipped on ${process.platform}; only runs on ${currentStep.onlyPlatform}`);
    return;
  }

  const printable = `${currentStep.command} ${currentStep.args.join(" ")}`;
  console.log(`\n[desktop-pipeline] ${currentStep.label}`);
  console.log(`[desktop-pipeline] $ ${printable}`);

  if (dryRun) {
    return;
  }

  const result = spawnSync(currentStep.command, currentStep.args, {
    cwd: currentStep.cwd,
    env: process.env,
    stdio: "inherit",
    shell: false
  });

  if (result.error) {
    console.error(`[desktop-pipeline] Failed to start ${currentStep.command}: ${result.error.message}`);
    process.exit(1);
  }

  if (result.status !== 0) {
    console.error(`[desktop-pipeline] Step failed: ${currentStep.label}`);
    process.exit(result.status ?? 1);
  }
}

function printHelp() {
  console.log(helpText);
}
