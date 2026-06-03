import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const args = parseArgs(process.argv.slice(2));
const snapshotPath =
  args.snapshot === "public"
    ? path.join(projectRoot, "public", "workspace-snapshot.json")
    : path.join(projectRoot, "src", "generated", "workspace-snapshot.json");
const snapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf8"));
const intentMap = snapshot.intentFeatureMap || {};
const summary = intentMap.summary || {};
const failures = [];

if (args.expect === "customer") {
  expect(snapshot.repoRootName === "customer-workspace", "customer snapshot should use customer-workspace repoRootName");
  expect((snapshot.stats?.documents || 0) === 0, "customer snapshot should remove internal documents");
  expect((snapshot.stats?.sourceFiles || 0) === 0, "customer snapshot should remove source files");
  expect((summary.totalThemes || 0) === 0, "customer snapshot should remove intent feature themes");
  expect(Array.isArray(intentMap.themes) && intentMap.themes.length === 0, "customer intent themes should be empty");
  expect(Array.isArray(intentMap.roadmap?.now) && intentMap.roadmap.now.length === 0, "customer Now roadmap should be empty");
} else {
  expect(snapshot.repoRootName !== "customer-workspace", "developer snapshot should not be a customer snapshot");
  expect(Number(summary.totalIntents || 0) > 0, "developer snapshot should include structured intent count");
  expect(Number(summary.totalThemes || 0) > 0, "developer snapshot should include feature themes");
  expect(Number(summary.now || 0) > 0, "developer snapshot should include Now roadmap candidates");
  expect(Number(summary.availableMaps || 0) > 0, "developer snapshot should report available intent maps");
  expect(/^\d{4}-\d{2}-\d{2}$/.test(summary.sourceDate || ""), "developer snapshot should expose sourceDate");
  expect(Boolean(intentMap.sourcePath), "developer snapshot should expose sourcePath");
  expect(Array.isArray(intentMap.themes) && intentMap.themes.length === summary.totalThemes, "theme count should match summary");
}

const report = {
  status: failures.length ? "failed" : "passed",
  expect: args.expect,
  snapshot: args.snapshot,
  snapshotPath: path.relative(projectRoot, snapshotPath),
  summary,
  failures
};

console.log(JSON.stringify(report, null, 2));
if (failures.length) {
  process.exitCode = 1;
}

function expect(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function parseArgs(argv) {
  const parsed = {
    snapshot: "generated",
    expect: "developer"
  };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--snapshot") {
      parsed.snapshot = argv[index + 1] || parsed.snapshot;
      index += 1;
    } else if (value === "--expect") {
      parsed.expect = argv[index + 1] || parsed.expect;
      index += 1;
    }
  }
  if (!["generated", "public"].includes(parsed.snapshot)) {
    throw new Error(`Unsupported --snapshot value: ${parsed.snapshot}`);
  }
  if (!["developer", "customer"].includes(parsed.expect)) {
    throw new Error(`Unsupported --expect value: ${parsed.expect}`);
  }
  return parsed;
}

