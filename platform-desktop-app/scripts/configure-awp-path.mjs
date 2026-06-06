import { copyFileSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const remove = args.has("--remove");
const home = os.homedir();
const binDir = path.join(home, ".local", "bin");
const shellFiles = [path.join(home, ".zprofile"), path.join(home, ".zshrc")];
const beginMarker = "# >>> agent-workspace-platform awp path >>>";
const endMarker = "# <<< agent-workspace-platform awp path <<<";
const block = `${beginMarker}
# Managed by platform-desktop-app/scripts/configure-awp-path.mjs.
if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then
  export PATH="$HOME/.local/bin:$PATH"
fi
${endMarker}
`;

function stamp() {
  return new Date().toISOString().replace(/[-:]/g, "").replace(/\..+/, "Z");
}

function removeManagedBlock(content) {
  const escapedBegin = beginMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedEnd = endMarker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return content.replace(new RegExp(`\\n?${escapedBegin}[\\s\\S]*?${escapedEnd}\\n?`, "g"), "\n").replace(/\n{3,}/g, "\n\n");
}

function configureFile(filePath) {
  const existed = existsSync(filePath);
  const before = existed ? readFileSync(filePath, "utf8") : "";
  const hasBlock = before.includes(beginMarker) && before.includes(endMarker);
  const backupPath = existed ? `${filePath}.awp-backup-${stamp()}` : "";
  let after = before;
  let action = "unchanged";

  if (remove) {
    if (hasBlock) {
      after = removeManagedBlock(before);
      action = "removed";
    }
  } else if (!hasBlock) {
    const separator = before.length === 0 ? "" : before.endsWith("\n") ? "\n" : "\n\n";
    after = `${before}${separator}${block}`;
    action = existed ? "updated" : "created";
  }

  if (!dryRun && action !== "unchanged") {
    if (existed) {
      copyFileSync(filePath, backupPath);
    }
    writeFileSync(filePath, after, "utf8");
  }

  return {
    path: filePath,
    existed,
    action: dryRun && action !== "unchanged" ? `would_${action}` : action,
    backupPath: !dryRun && action !== "unchanged" ? backupPath : "",
    marker: beginMarker
  };
}

const files = shellFiles.map(configureFile);
const pathEntries = (process.env.PATH || "").split(path.delimiter).filter(Boolean);

console.log(JSON.stringify({
  status: files.some((file) => file.action !== "unchanged") ? "configured" : "already_configured",
  dryRun,
  remove,
  binDir,
  currentProcessHasBinDir: pathEntries.includes(binDir),
  shellFiles: files,
  verificationCommand: "zsh -lic 'command -v awp && awp --version'"
}, null, 2));
