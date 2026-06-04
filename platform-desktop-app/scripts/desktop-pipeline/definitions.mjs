import {
  macosAppArtifact,
  macosDmgArtifact,
  preparedTauriBuildConfig,
  repoRoot,
  tauriRoot
} from "./paths.mjs";

export function step(label, command, args, cwd, options = {}) {
  return { label, command, args, cwd, ...options };
}

function pnpmWorkspaceStep(label, args, options = {}) {
  return step(label, "corepack", ["pnpm", ...args], repoRoot, options);
}

function tauriPreparedBuildStep(label) {
  return pnpmWorkspaceStep(label, [
    "--filter",
    "platform-desktop-app",
    "exec",
    "tauri",
    "build",
    "--config",
    preparedTauriBuildConfig
  ]);
}

const setupSteps = [
  pnpmWorkspaceStep("Install desktop workspace dependencies", [
    "--filter",
    "platform-desktop-app",
    "--filter",
    "workspace-monitor",
    "install",
    "--frozen-lockfile"
  ]),
  pnpmWorkspaceStep("Install Workspace Monitor Playwright browser", [
    "--filter",
    "workspace-monitor",
    "run",
    "install:browsers"
  ])
];

const quickVerifySteps = [
  pnpmWorkspaceStep("Workspace Monitor type check", ["--filter", "workspace-monitor", "run", "check"]),
  pnpmWorkspaceStep("Workspace Monitor tests", ["--filter", "workspace-monitor", "test"]),
  pnpmWorkspaceStep("Desktop app tests", ["--filter", "platform-desktop-app", "test"]),
  pnpmWorkspaceStep("Desktop app readiness check", ["--filter", "platform-desktop-app", "run", "check"])
];

const commonVerifySteps = [
  pnpmWorkspaceStep("Workspace Monitor type check", ["--filter", "workspace-monitor", "run", "check"]),
  pnpmWorkspaceStep("Workspace Monitor tests", ["--filter", "workspace-monitor", "test"]),
  pnpmWorkspaceStep("Customer renderer build and bundle audit", [
    "--filter",
    "platform-desktop-app",
    "run",
    "renderer:build"
  ]),
  pnpmWorkspaceStep("Developer snapshot intent-map check", ["--filter", "workspace-monitor", "run", "check:intent-map"]),
  pnpmWorkspaceStep("Customer snapshot intent-map check", [
    "--filter",
    "workspace-monitor",
    "run",
    "check:intent-map:customer"
  ]),
  pnpmWorkspaceStep("Desktop app tests", ["--filter", "platform-desktop-app", "test"]),
  pnpmWorkspaceStep("Desktop app readiness check", ["--filter", "platform-desktop-app", "run", "check"]),
  step("Rust tests", "cargo", ["test"], tauriRoot)
];

export const pipelines = {
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
      pnpmWorkspaceStep("Public release preflight report", [
        "--filter",
        "platform-desktop-app",
        "run",
        "release:preflight:public:report"
      ]),
      pnpmWorkspaceStep("Public service readiness report", [
        "--filter",
        "platform-desktop-app",
        "run",
        "service:readiness:public:report"
      ])
    ]
  }
};

export const helpText = `Usage:
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
  corepack pnpm run desktop:release:report
  corepack pnpm run desktop:doctor`;
