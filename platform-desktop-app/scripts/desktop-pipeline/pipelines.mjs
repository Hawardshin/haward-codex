import {
  macosAppArtifact,
  macosDmgArtifact,
  projectRoot,
  repoRoot,
  tauriRoot
} from "./paths.mjs";
import {
  internalPackageArtifactHints,
  publicPackageArtifactHints
} from "./package-artifacts.mjs";
import {
  commonVerifySteps,
  macosDmgIntermediateCleanupStep,
  pnpmWorkspaceStep,
  quickVerifySteps,
  setupSteps,
  step,
  tauriPreparedBuildStep
} from "./steps.mjs";

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
      macosDmgIntermediateCleanupStep,
      tauriPreparedBuildStep("Tauri build with prepared renderer")
    ]
  },
  "package-internal": {
    description: "Run verification and build the local/internal Tauri app and DMG.",
    steps: [
      ...commonVerifySteps,
      step("Rust build", "cargo", ["build"], tauriRoot),
      macosDmgIntermediateCleanupStep,
      tauriPreparedBuildStep("Tauri internal package build with prepared renderer"),
      step("macOS app signature verification", "codesign", ["--verify", "--deep", "--strict", macosAppArtifact], repoRoot, {
        onlyPlatform: "darwin"
      }),
      step("macOS DMG verification", "hdiutil", ["verify", macosDmgArtifact], repoRoot, {
        onlyPlatform: "darwin"
      })
    ],
    artifactHints: internalPackageArtifactHints
  },
  "package-public": {
    description: "Run verification, require public signing/updater/notarization environment, and build public updater artifacts through public-release-build/create-updater-manifest.",
    steps: [
      pnpmWorkspaceStep("Public release preflight", [
        "--filter",
        "platform-desktop-app",
        "run",
        "release:preflight:public"
      ]),
      ...commonVerifySteps,
      step("Rust build", "cargo", ["build"], tauriRoot),
      macosDmgIntermediateCleanupStep,
      step("Tauri public package build with signed updater artifacts", "node", ["scripts/public-release-build.mjs"], projectRoot),
      step("macOS app signature verification", "codesign", ["--verify", "--deep", "--strict", macosAppArtifact], repoRoot, {
        onlyPlatform: "darwin"
      }),
      step("macOS DMG verification", "hdiutil", ["verify", macosDmgArtifact], repoRoot, {
        onlyPlatform: "darwin"
      }),
      step("macOS Gatekeeper assessment", "spctl", ["--assess", "--type", "execute", "--verbose", macosAppArtifact], repoRoot, {
        onlyPlatform: "darwin"
      }),
      step("macOS stapled ticket validation", "xcrun", ["stapler", "validate", macosDmgArtifact], repoRoot, {
        onlyPlatform: "darwin"
      })
    ],
    artifactHints: publicPackageArtifactHints
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
