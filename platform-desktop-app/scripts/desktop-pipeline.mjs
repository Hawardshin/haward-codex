import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(projectRoot, "..");
const tauriRoot = path.join(projectRoot, "src-tauri");
const macosAppArtifact = path.join(
  tauriRoot,
  "target/release/bundle/macos/Agent Workspace Platform.app"
);
const macosDmgArtifact = path.join(
  tauriRoot,
  "target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg"
);
const preparedTauriBuildConfig = JSON.stringify({
  build: {
    beforeBuildCommand: "node scripts/tauri-before-build-prepared.mjs"
  }
});

const setupSteps = [
  step("Install desktop workspace dependencies", "corepack", [
    "pnpm",
    "--filter",
    "platform-desktop-app",
    "--filter",
    "workspace-monitor",
    "install",
    "--frozen-lockfile"
  ], repoRoot),
  step("Install Workspace Monitor Playwright browser", "corepack", [
    "pnpm",
    "--filter",
    "workspace-monitor",
    "run",
    "install:browsers"
  ], repoRoot)
];

const quickVerifySteps = [
  step("Workspace Monitor type check", "corepack", ["pnpm", "--filter", "workspace-monitor", "run", "check"], repoRoot),
  step("Workspace Monitor tests", "corepack", ["pnpm", "--filter", "workspace-monitor", "test"], repoRoot),
  step("Desktop app tests", "corepack", ["pnpm", "--filter", "platform-desktop-app", "test"], repoRoot),
  step("Desktop app readiness check", "corepack", ["pnpm", "--filter", "platform-desktop-app", "run", "check"], repoRoot)
];

const commonVerifySteps = [
  step("Workspace Monitor type check", "corepack", ["pnpm", "--filter", "workspace-monitor", "run", "check"], repoRoot),
  step("Workspace Monitor tests", "corepack", ["pnpm", "--filter", "workspace-monitor", "test"], repoRoot),
  step("Customer renderer build and bundle audit", "corepack", ["pnpm", "--filter", "platform-desktop-app", "run", "renderer:build"], repoRoot),
  step("Developer snapshot intent-map check", "corepack", ["pnpm", "--filter", "workspace-monitor", "run", "check:intent-map"], repoRoot),
  step("Customer snapshot intent-map check", "corepack", ["pnpm", "--filter", "workspace-monitor", "run", "check:intent-map:customer"], repoRoot),
  step("Desktop app tests", "corepack", ["pnpm", "--filter", "platform-desktop-app", "test"], repoRoot),
  step("Desktop app readiness check", "corepack", ["pnpm", "--filter", "platform-desktop-app", "run", "check"], repoRoot),
  step("Rust tests", "cargo", ["test"], tauriRoot)
];

const pipelines = {
  setup: {
    description: "Install only the dependencies and browser binary needed for the desktop app path.",
    steps: setupSteps
  },
  "verify-quick": {
    description: "Run the fast developer verification path without rebuilding the renderer or Rust app.",
    steps: quickVerifySteps
  },
  verify: {
    description: "Run the developer verification path without producing a new installer.",
    steps: commonVerifySteps
  },
  "tauri-build-prepared": {
    description: "Build the Tauri bundle using an already prepared and audited renderer output.",
    steps: [
      tauriPreparedBuildStep("Tauri build with prepared renderer")
    ]
  },
  "package-internal": {
    description: "Run verification and build the local/internal Tauri app and DMG.",
    steps: [
      ...commonVerifySteps,
      step("Rust build", "cargo", ["build"], tauriRoot),
      tauriPreparedBuildStep("Tauri internal package build with prepared renderer"),
      step("macOS app signature verification", "codesign", ["--verify", "--deep", "--strict", macosAppArtifact], repoRoot, {
        onlyPlatform: "darwin"
      }),
      step("macOS DMG verification", "hdiutil", ["verify", macosDmgArtifact], repoRoot, {
        onlyPlatform: "darwin"
      })
    ],
    artifactHints: [
      "platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app",
      "platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg"
    ]
  },
  "public-report": {
    description: "Report public distribution gates without claiming release readiness.",
    steps: [
      step("Public release preflight report", "corepack", [
        "pnpm",
        "--filter",
        "platform-desktop-app",
        "run",
        "release:preflight:public:report"
      ], repoRoot),
      step("Public service readiness report", "corepack", [
        "pnpm",
        "--filter",
        "platform-desktop-app",
        "run",
        "service:readiness:public:report"
      ], repoRoot)
    ]
  }
};

function step(label, command, args, cwd, options = {}) {
  return { label, command, args, cwd, ...options };
}

function tauriPreparedBuildStep(label) {
  return step(label, "corepack", [
    "pnpm",
    "--filter",
    "platform-desktop-app",
    "exec",
    "tauri",
    "build",
    "--config",
    preparedTauriBuildConfig
  ], repoRoot);
}

function main(argv = process.argv.slice(2)) {
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
  console.log(`Usage:
  node scripts/desktop-pipeline.mjs setup [--dry-run]
  node scripts/desktop-pipeline.mjs verify-quick [--dry-run]
  node scripts/desktop-pipeline.mjs verify [--dry-run]
  node scripts/desktop-pipeline.mjs tauri-build-prepared [--dry-run]
  node scripts/desktop-pipeline.mjs package-internal [--dry-run]
  node scripts/desktop-pipeline.mjs public-report [--dry-run]

Root shortcuts:
  corepack pnpm run desktop:setup
  corepack pnpm run desktop:verify:quick
  corepack pnpm run desktop:setup:verify
  corepack pnpm run desktop:verify
  corepack pnpm run desktop:renderer:build
  corepack pnpm run desktop:package:internal
  corepack pnpm run desktop:release:report`);
}

main();
