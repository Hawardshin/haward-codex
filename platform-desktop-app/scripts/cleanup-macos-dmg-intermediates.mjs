import { existsSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const macosBundleRoot = path.join(projectRoot, "src-tauri", "target", "release", "bundle", "macos");
const staleDmgPattern = /^rw\..+\.dmg$/;

if (!existsSync(macosBundleRoot)) {
  console.log(`[cleanup-macos-dmg-intermediates] bundle root missing, nothing to clean: ${macosBundleRoot}`);
  process.exit(0);
}

const staleFiles = readdirSync(macosBundleRoot, { withFileTypes: true })
  .filter((entry) => entry.isFile() && staleDmgPattern.test(entry.name))
  .map((entry) => path.join(macosBundleRoot, entry.name));

for (const staleFile of staleFiles) {
  rmSync(staleFile, { force: true });
  console.log(`[cleanup-macos-dmg-intermediates] removed ${staleFile}`);
}

if (staleFiles.length === 0) {
  console.log("[cleanup-macos-dmg-intermediates] no stale macOS DMG intermediates found");
}
