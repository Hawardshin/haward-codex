import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const evaluationPanel = fs.readFileSync(path.join(projectRoot, "components", "features", "EvaluationReportPanel.tsx"), "utf8");
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"));

function assertIncludes(source, label, tokens) {
  for (const token of tokens) {
    if (!source.includes(token)) {
      throw new Error(`${label} must include \`${token}\`.`);
    }
  }
}

const dimensionIds = [
  "desktop-performance",
  "ux-control-clarity",
  "native-resource-lifecycle",
  "eval-evidence",
  "release-packaging",
  "open-source-leverage",
  "automation-continuity"
];

assertIncludes(evaluationPanel, "Comprehensive improvement panel", [
  'data-eval-comprehensive-improvement="all-signal-cockpit"',
  "Composite Improvement Cockpit",
  "comprehensiveImprovementDimensions",
  "comprehensiveImprovementScore",
  "priorityDimensions",
  "riskLaneCount",
  ...dimensionIds
]);

assertIncludes(css, "Comprehensive improvement design", [
  ".eval-comprehensive-panel",
  ".eval-comprehensive-summary",
  ".eval-comprehensive-grid",
  ".eval-comprehensive-priority",
  ".eval-dimension-card",
  ".eval-dimension-meter",
  ".eval-dimension-card.state-risk",
  ".eval-dimension-card.state-watch",
  ".eval-dimension-card.state-strong"
]);

assertIncludes(packageJson.scripts.check, "Workspace monitor check pipeline", [
  "node scripts/check-comprehensive-improvement-contract.mjs"
]);

console.log(
  JSON.stringify(
    {
      status: "comprehensive_improvement_contract_ok",
      checkedDimensions: dimensionIds.length,
      checkedSurfaces: 3
    },
    null,
    2
  )
);
