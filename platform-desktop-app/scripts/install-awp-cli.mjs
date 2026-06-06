import { chmodSync, existsSync, lstatSync, mkdirSync, readlinkSync, symlinkSync, unlinkSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(scriptPath), "..");
const cliSource = path.join(projectRoot, "tools", "awp", "awp.py");
const binDir = path.join(os.homedir(), ".local", "bin");
const target = path.join(binDir, "awp");
const args = new Set(process.argv.slice(2));
const dryRun = args.has("--dry-run");
const force = args.has("--force");

if (!existsSync(cliSource)) {
  throw new Error(`Missing awp CLI source: ${cliSource}`);
}

const pathEntries = (process.env.PATH || "").split(path.delimiter).filter(Boolean);
const targetOnPath = pathEntries.includes(binDir);
const result = {
  status: "planned",
  command: "awp",
  source: cliSource,
  target,
  binDir,
  dryRun,
  force,
  targetOnPath,
  warning: targetOnPath ? "" : `${binDir} is not currently on PATH.`
};

if (!dryRun) {
  mkdirSync(binDir, { recursive: true });
  chmodSync(cliSource, 0o755);
  if (existsSync(target)) {
    const stat = lstatSync(target);
    const pointsToSource = stat.isSymbolicLink() && path.resolve(path.dirname(target), readlinkSync(target)) === cliSource;
    if (!pointsToSource && !force) {
      throw new Error(`Refusing to overwrite existing ${target}. Re-run with --force after checking it.`);
    }
    if (!pointsToSource) {
      unlinkSync(target);
    }
  }
  if (!existsSync(target)) {
    symlinkSync(cliSource, target);
  }
  result.status = "installed";
}

console.log(JSON.stringify(result, null, 2));
