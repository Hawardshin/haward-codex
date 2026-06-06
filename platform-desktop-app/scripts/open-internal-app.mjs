import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";

import { macosAppArtifact, macosDmgArtifact, repoRoot } from "./desktop-pipeline/paths.mjs";

const dryRun = process.argv.includes("--dry-run");
const checkOnly = process.argv.includes("--check");

function main() {
  if (process.platform !== "darwin") {
    fail("run:internal currently opens the macOS .app artifact only. Use the platform-specific bundle produced by package:internal on this OS.");
  }

  if (!existsSync(macosAppArtifact)) {
    fail(`Missing internal app artifact. Run \`corepack pnpm run desktop:package:internal\` first. Expected: ${macosAppArtifact}`);
  }

  const report = {
    status: dryRun || checkOnly ? "internal_app_open_ready" : "internal_app_opened",
    app: macosAppArtifact,
    dmg: existsSync(macosDmgArtifact) ? macosDmgArtifact : null,
    command: `open -n ${JSON.stringify(macosAppArtifact)}`
  };

  if (dryRun || checkOnly) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  const result = spawnSync("open", ["-n", macosAppArtifact], {
    cwd: repoRoot,
    encoding: "utf8",
    shell: false
  });

  if (result.error) {
    fail(`Failed to start macOS open command: ${result.error.message}`);
  }
  if (result.status !== 0) {
    fail(`${result.stderr || result.stdout || "macOS open command failed."}`.trim());
  }

  console.log(JSON.stringify(report, null, 2));
}

function fail(message) {
  console.error(`[open-internal-app] ${message}`);
  process.exit(1);
}

main();
