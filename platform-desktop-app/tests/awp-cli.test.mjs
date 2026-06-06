import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "..");
const cliPath = path.join(projectRoot, "tools", "awp", "awp.py");
const installerPath = path.join(projectRoot, "scripts", "install-awp-cli.mjs");
const packageJson = JSON.parse(readFileSync(path.join(projectRoot, "package.json"), "utf8"));

function run(command, args) {
  return spawnSync(command, args, {
    cwd: path.resolve(projectRoot, ".."),
    encoding: "utf8"
  });
}

test("awp CLI exposes version and workspace doctor JSON", () => {
  const version = run("python3", [cliPath, "--version"]);
  assert.equal(version.status, 0);
  assert.match(version.stdout, /awp 0\.1\.0/);

  const doctor = run("python3", [cliPath, "doctor", "--json"]);
  assert.equal(doctor.status, 0, doctor.stderr);
  const report = JSON.parse(doctor.stdout);
  assert.equal(report.status, "ready");
  assert.match(report.workspaceRoot, /brain\/codex$/);
  assert.equal(typeof report.userBinOnPath, "boolean");
  assert.ok(Array.isArray(report.adapters));
});

test("awp CLI checks optional adapter commands without requiring installs", () => {
  const result = run("python3", [cliPath, "cli-check", "--json"]);
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.ok(["ready", "capability_missing"].includes(report.status));
  assert.ok(report.adapters.some((adapter) => adapter.adapterId === "codex-cli"));
});

test("awp installer supports a dry run and package script", () => {
  assert.equal(packageJson.scripts["cli:install"], "node scripts/install-awp-cli.mjs");
  assert.equal(packageJson.scripts["cli:doctor"], "python3 tools/awp/awp.py doctor");

  const result = run("node", [installerPath, "--dry-run"]);
  assert.equal(result.status, 0, result.stderr);
  const report = JSON.parse(result.stdout);
  assert.equal(report.status, "planned");
  assert.equal(report.command, "awp");
  assert.match(report.target, /\.local\/bin\/awp$/);
});
