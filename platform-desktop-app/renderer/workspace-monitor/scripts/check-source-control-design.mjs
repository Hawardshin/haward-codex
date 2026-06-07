import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
const sourceWorkbenchVisualFiles = [
  "SourceWorkbenchPanel.tsx",
  "SourceCommandToolbar.tsx",
  "SourceEditorFrame.tsx",
  "SourceFileControls.tsx",
  "SourceSaveResultsPanel.tsx"
];
const sourceWorkbenchVisualSource = sourceWorkbenchVisualFiles
  .map((fileName) => fs.readFileSync(path.join(projectRoot, "components", "workbench", "source-editor", fileName), "utf8"))
  .join("\n");

function assertIncludes(source, label, tokens) {
  for (const token of tokens) {
    if (!source.includes(token)) {
      throw new Error(`${label} must include \`${token}\`.`);
    }
  }
}

assertIncludes(sourceWorkbenchVisualSource, "Source action button roles", [
  'className="source-action-button primary"',
  'className="source-action-button save"',
  'className="source-action-button save-all"',
  'className="source-action-button secondary"',
  'className="source-tool-button"',
  'className="source-inline-save-receipt"',
  'className="source-save-result-card"'
]);

assertIncludes(css, "Source action bar design", [
  ".filesystem-workbench .native-source-controls .source-path-field",
  ".filesystem-workbench .native-source-controls .source-file-picker-field",
  ".source-file-picker-menu",
  ".source-file-picker-item[data-highlighted]",
  ".source-editor-action-group",
  ".source-action-button.primary",
  ".source-action-button::before",
  ".source-action-button:not(:disabled):hover",
  "minmax(420px, 1.45fr)",
  ".source-editor-primary-actions",
  "box-shadow:",
  "transform: translateY(-1px);"
]);

assertIncludes(css, "Compact source action bar layout", [
  "  .filesystem-workbench .native-source-controls {\n    grid-template-columns: repeat(2, minmax(0, 1fr));",
  "  .filesystem-workbench-shell {\n    grid-template-columns: 1fr;\n    height: auto;",
  "  .filesystem-workbench .native-source-controls .source-editor-action-group {\n    grid-column: auto;"
]);

assertIncludes(css, "Source toolbar design", [
  ".source-command-toolbar button:not(:disabled):hover",
  ".source-command-toolbar button.mode",
  ".source-workbench-switcher button.active::after"
]);

assertIncludes(css, "Source file row design", [
  ".source-file-browser-list button::before",
  ".source-file-browser-list button:not(:disabled):hover",
  ".source-file-browser-list button.active::before",
  ".source-editor-tab-main:hover"
]);

assertIncludes(css, "Source result receipt design", [
  ".source-results-hero",
  ".source-results-summary",
  ".source-save-result-card::before",
  ".source-result-lozenge",
  ".source-result-backup-path",
  ".source-inline-save-receipt",
  "  .source-results-summary,"
]);

console.log(
  JSON.stringify(
    {
      status: "source_control_design_ok",
      checkedGroups: 5
    },
    null,
    2
  )
);
