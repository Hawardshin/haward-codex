import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const projectRoot = path.resolve(__dirname, "..", "..");
export const repoRoot = path.resolve(projectRoot, "..");
export const tauriRoot = path.join(projectRoot, "src-tauri");
export const macosAppArtifact = path.join(
  tauriRoot,
  "target/release/bundle/macos/Agent Workspace Platform.app"
);
export const macosDmgArtifact = path.join(
  tauriRoot,
  "target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg"
);
export const preparedTauriBuildConfig = JSON.stringify({
  build: {
    beforeBuildCommand: "node scripts/tauri-before-build-prepared.mjs"
  }
});
