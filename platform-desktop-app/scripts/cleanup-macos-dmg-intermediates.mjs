import { existsSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const macosBundleRoot = path.join(projectRoot, "src-tauri", "target", "release", "bundle", "macos");
const dmgBundleRoot = path.join(projectRoot, "src-tauri", "target", "release", "bundle", "dmg");
const staleDmgPattern = /^rw\..+\.dmg$/;
const staleFinalDmgPattern = /\.dmg$/;

function collectStaleFiles(root, pattern) {
  if (!existsSync(root)) {
    return [];
  }
  return readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isFile() && pattern.test(entry.name))
    .map((entry) => path.join(root, entry.name));
}

// Tauri/create-dmg 반복 실행은 이전 final DMG와 rw 중간 파일이 남아 있으면 실패할 수 있다.
const staleFiles = [
  ...collectStaleFiles(macosBundleRoot, staleDmgPattern),
  ...collectStaleFiles(dmgBundleRoot, staleFinalDmgPattern)
];

if (!existsSync(macosBundleRoot) && !existsSync(dmgBundleRoot)) {
  console.log(
    `[cleanup-macos-dmg-intermediates] bundle roots missing, nothing to clean: ${macosBundleRoot}, ${dmgBundleRoot}`
  );
  process.exit(0);
}

for (const staleFile of staleFiles) {
  // bundle target 안의 DMG 파일만 삭제해 source tree나 사용자 파일에는 닿지 않게 한다.
  rmSync(staleFile, { force: true });
  console.log(`[cleanup-macos-dmg-intermediates] removed ${staleFile}`);
}

if (staleFiles.length === 0) {
  console.log("[cleanup-macos-dmg-intermediates] no stale macOS DMG intermediates found");
}
