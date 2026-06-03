import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
const monitorShell = fs.readFileSync(path.join(projectRoot, "components", "MonitorShell.tsx"), "utf8");

function assertIncludes(source, label, tokens) {
  for (const token of tokens) {
    if (!source.includes(token)) {
      throw new Error(`${label} must include \`${token}\`.`);
    }
  }
}

assertIncludes(monitorShell, "Source action button roles", [
  'className="source-action-button primary"',
  'className="source-action-button save"',
  'className="source-action-button save-all"',
  'className="source-action-button secondary"',
  'className="source-tool-button"'
]);

assertIncludes(css, "Source action bar design", [
  ".filesystem-workbench .native-source-controls .source-path-field",
  ".source-action-button.primary",
  ".source-action-button::before",
  ".source-action-button:not(:disabled):hover",
  "minmax(128px, auto)",
  "box-shadow:",
  "transform: translateY(-1px);"
]);

assertIncludes(css, "Compact source action bar layout", [
  "  .filesystem-workbench .native-source-controls {\n    grid-template-columns: repeat(2, minmax(0, 1fr));",
  "  .filesystem-workbench-shell {\n    grid-template-columns: 1fr;\n    height: auto;",
  "  .filesystem-workbench .native-source-controls .source-action-button {\n    grid-column: auto;"
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

console.log(
  JSON.stringify(
    {
      status: "source_control_design_ok",
      checkedGroups: 4
    },
    null,
    2
  )
);
