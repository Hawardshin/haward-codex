import { spawnSync } from "node:child_process";

import { buildPublicReleaseConfigReport } from "./public-release-config.mjs";
import { repoRoot } from "./desktop-pipeline/paths.mjs";

function main(argv = process.argv.slice(2)) {
  const dryRun = argv.includes("--dry-run");
  const skipManifest = argv.includes("--skip-manifest");
  const configReport = buildPublicReleaseConfigReport({ writeFiles: !dryRun });
  const printableReport = {
    status: configReport.status,
    blockers: configReport.blockers,
    warnings: configReport.warnings,
    configPath: configReport.configPath,
    updateChannelMarkerPath: configReport.updateChannelMarkerPath,
    envSummary: configReport.envSummary,
    checks: configReport.checks
  };

  console.log(JSON.stringify(printableReport, null, 2));
  if (configReport.blockers.length) {
    process.exit(1);
  }
  if (dryRun) {
    console.log("[public-release-build] dry run complete; no Tauri build was started.");
    return;
  }

  run("corepack", [
    "pnpm",
    "--filter",
    "platform-desktop-app",
    "exec",
    "tauri",
    "build",
    "--config",
    JSON.stringify(configReport.config)
  ]);

  if (!skipManifest && configReport.envSummary.staticManifestEnabled) {
    run("node", ["scripts/create-updater-manifest.mjs"]);
  }
}

function run(command, args) {
  console.log(`\n[public-release-build] $ ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, {
    cwd: repoRoot,
    env: process.env,
    stdio: "inherit",
    shell: false
  });
  if (result.error) {
    console.error(`[public-release-build] Failed to start ${command}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

main();
