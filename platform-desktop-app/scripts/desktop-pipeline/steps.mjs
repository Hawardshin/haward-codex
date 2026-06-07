import {
  preparedTauriBuildConfig,
  projectRoot,
  repoRoot,
  tauriRoot
} from "./paths.mjs";

export function step(label, command, args, cwd, options = {}) {
  return { label, command, args, cwd, ...options };
}

export function pnpmWorkspaceStep(label, args, options = {}) {
  return step(label, "corepack", ["pnpm", ...args], repoRoot, options);
}

export const developerSnapshotCollectStep = pnpmWorkspaceStep("Workspace Monitor developer snapshot collect", [
  "--filter",
  "workspace-monitor",
  "run",
  "collect"
]);

export const macosDmgIntermediateCleanupStep = step(
  "Clean stale macOS DMG intermediates",
  "node",
  ["scripts/cleanup-macos-dmg-intermediates.mjs"],
  projectRoot
);

export function tauriPreparedBuildStep(label) {
  // prepared build는 Tauri CLI를 감싸서 반복 DMG 생성 실패 시 내부 복구 경로를 사용할 수 있게 한다.
  return step(label, "node", [
    "scripts/tauri-build-with-dmg-recovery.mjs",
    "--config",
    preparedTauriBuildConfig
  ], projectRoot);
}

export const setupSteps = [
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
  ]),
  pnpmWorkspaceStep("Install AWP CLI", ["--filter", "platform-desktop-app", "run", "cli:install"])
];

export const quickVerifySteps = [
  developerSnapshotCollectStep,
  pnpmWorkspaceStep("Workspace Monitor type check", ["--filter", "workspace-monitor", "run", "check"]),
  pnpmWorkspaceStep("Workspace Monitor tests", ["--filter", "workspace-monitor", "test"]),
  pnpmWorkspaceStep("Desktop app tests", ["--filter", "platform-desktop-app", "test"]),
  pnpmWorkspaceStep("Desktop app readiness check", ["--filter", "platform-desktop-app", "run", "check"])
];

export const commonVerifySteps = [
  developerSnapshotCollectStep,
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
