import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(projectRoot, "..");
const tauriRoot = path.join(projectRoot, "src-tauri");
const macosBundleRoot = path.join(tauriRoot, "target", "release", "bundle", "macos");
const dmgBundleRoot = path.join(tauriRoot, "target", "release", "bundle", "dmg");
const bundleDmgScript = path.join(dmgBundleRoot, "bundle_dmg.sh");
const volumeIcon = path.join(dmgBundleRoot, "icon.icns");

const config = readJson(path.join(tauriRoot, "tauri.conf.json"));
const productName = config.productName;
const version = config.version ?? readJson(path.join(projectRoot, "package.json")).version;
const archName = process.arch === "arm64" ? "aarch64" : process.arch;
const appName = `${productName}.app`;
const dmgName = `${productName}_${version}_${archName}.dmg`;
const macosAppArtifact = path.join(macosBundleRoot, appName);
const macosDmgArtifact = path.join(dmgBundleRoot, dmgName);

// 기본 경로는 Tauri CLI 그대로다. 복구 로직은 실패 후 macOS DMG 조건이 맞을 때만 작동한다.
const tauriArgs = [
  "pnpm",
  "--filter",
  "platform-desktop-app",
  "exec",
  "tauri",
  "build",
  "--ci",
  ...process.argv.slice(2)
];

const tauriResult = spawnSync("corepack", tauriArgs, {
  cwd: repoRoot,
  env: {
    ...process.env,
    // Tauri가 대화형 prompt를 띄우지 않도록 internal package build도 CI 모드로 고정한다.
    CI: process.env.CI ?? "true"
  },
  stdio: "inherit",
  shell: false
});

if (tauriResult.error) {
  console.error(`[tauri-build-with-dmg-recovery] Failed to start Tauri build: ${tauriResult.error.message}`);
  process.exit(1);
}

if (tauriResult.status === 0) {
  process.exit(0);
}

if (process.platform !== "darwin") {
  process.exit(tauriResult.status ?? 1);
}

// 앱 번들은 만들어졌고 DMG cosmetic 단계만 실패한 경우에만 복구한다.
const canRecover =
  existsSync(bundleDmgScript) &&
  existsSync(volumeIcon) &&
  existsSync(macosAppArtifact);

if (!canRecover) {
  console.error("[tauri-build-with-dmg-recovery] Tauri build failed and DMG recovery prerequisites are missing.");
  console.error(`[tauri-build-with-dmg-recovery] app=${macosAppArtifact}`);
  console.error(`[tauri-build-with-dmg-recovery] script=${bundleDmgScript}`);
  console.error(`[tauri-build-with-dmg-recovery] icon=${volumeIcon}`);
  process.exit(tauriResult.status ?? 1);
}

console.warn(
  "[tauri-build-with-dmg-recovery] Tauri build failed during bundling; retrying DMG creation without Finder AppleScript."
);
// create-dmg는 기존 최종 DMG나 rw 중간 파일이 있으면 반복 실행에서 실패할 수 있다.
removeMatchingFiles(macosBundleRoot, /^rw\..+\.dmg$/);
removeMatchingFiles(dmgBundleRoot, /\.dmg$/);

// --skip-jenkins는 Finder AppleScript 꾸미기 단계를 건너뛰어 비대화형 패키징을 안정화한다.
const recoveryArgs = [
  "--skip-jenkins",
  "--volname",
  productName,
  "--icon",
  appName,
  "200",
  "190",
  "--hide-extension",
  appName,
  "--app-drop-link",
  "600",
  "185",
  "--volicon",
  "icon.icns",
  dmgName,
  "../macos"
];

const recoveryResult = spawnSync("./bundle_dmg.sh", recoveryArgs, {
  cwd: dmgBundleRoot,
  env: process.env,
  stdio: "inherit",
  shell: false
});

if (recoveryResult.error) {
  console.error(`[tauri-build-with-dmg-recovery] Failed to start DMG recovery: ${recoveryResult.error.message}`);
  process.exit(1);
}

if (recoveryResult.status !== 0) {
  console.error("[tauri-build-with-dmg-recovery] DMG recovery failed.");
  process.exit(recoveryResult.status ?? 1);
}

if (!existsSync(macosDmgArtifact)) {
  console.error(`[tauri-build-with-dmg-recovery] DMG recovery did not create ${macosDmgArtifact}`);
  process.exit(1);
}

console.log(`[tauri-build-with-dmg-recovery] recovered ${macosDmgArtifact}`);

function readJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function removeMatchingFiles(root, pattern) {
  if (!existsSync(root)) {
    return;
  }
  // 패턴을 제한해 generated bundle directory 밖의 파일은 절대 삭제하지 않는다.
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (entry.isFile() && pattern.test(entry.name)) {
      const staleFile = path.join(root, entry.name);
      rmSync(staleFile, { force: true });
      console.log(`[tauri-build-with-dmg-recovery] removed stale ${staleFile}`);
    }
  }
}
