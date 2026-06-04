import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const cssPath = path.join(projectRoot, "app", "globals.css");
const monitorShellPath = path.join(projectRoot, "components", "MonitorShell.tsx");
const terminalDrawerPath = path.join(projectRoot, "components", "workbench", "RuntimeTerminalDrawer.tsx");

const css = fs.readFileSync(cssPath, "utf8");
const monitorShell = fs.readFileSync(monitorShellPath, "utf8");
const terminalDrawer = fs.readFileSync(terminalDrawerPath, "utf8");

function readCssBlock(selector) {
  const needle = `${selector} {`;
  const start = css.indexOf(needle);
  if (start === -1) {
    throw new Error(`Missing CSS block for ${selector}`);
  }

  let depth = 0;
  for (let index = start; index < css.length; index += 1) {
    const char = css[index];
    if (char === "{") {
      depth += 1;
    }
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return css.slice(start, index + 1);
      }
    }
  }

  throw new Error(`Unclosed CSS block for ${selector}`);
}

function assertBlockIncludes(selector, expectedTokens) {
  const block = readCssBlock(selector);
  for (const token of expectedTokens) {
    if (!block.includes(token)) {
      throw new Error(`${selector} must include \`${token}\` for scroll-safe desktop layout.`);
    }
  }
}

function assertBlockExcludes(selector, forbiddenTokens) {
  const block = readCssBlock(selector);
  for (const token of forbiddenTokens) {
    if (block.includes(token)) {
      throw new Error(`${selector} must not include \`${token}\`; it can hide content on small windows.`);
    }
  }
}

function assertSourceSliceIncludes(source, anchor, expectedTokens) {
  const start = source.indexOf(anchor);
  if (start === -1) {
    throw new Error(`Missing source anchor \`${anchor}\``);
  }
  const end = source.indexOf(">", start);
  const slice = source.slice(start, end === -1 ? start + 260 : end + 1);
  for (const token of expectedTokens) {
    if (!slice.includes(token)) {
      throw new Error(`Source anchor \`${anchor}\` must include \`${token}\`.`);
    }
  }
}

function assertSourceIncludes(source, label, expectedTokens) {
  for (const token of expectedTokens) {
    if (!source.includes(token)) {
      throw new Error(`${label} must include \`${token}\`.`);
    }
  }
}

const cssContracts = [
  {
    selector: ".desktop-app-shell",
    includes: ["min-height: 100dvh;", "overflow: visible;"],
    excludes: ["  height: 100dvh;", "overflow: hidden;", "min-height: 720px;"]
  },
  {
    selector: ".activity-rail",
    includes: ["position: sticky;", "min-height: 0;", "height: 100dvh;", "max-height: 100dvh;"]
  },
  {
    selector: ".desktop-viewport",
    includes: ["min-height: 100dvh;", "height: auto;", "max-height: none;", "overflow: visible;", "overflow-x: hidden;", "scrollbar-gutter: stable;"],
    excludes: ["  height: 100vh;", "  max-height: 100vh;"]
  },
  {
    selector: ".settings-dialog",
    includes: ["height: min(760px, calc(100dvh - 36px));", "max-height: calc(100dvh - 36px);", "overflow: hidden;"]
  },
  {
    selector: ".settings-tab-panel",
    includes: ["overflow: auto;", "overscroll-behavior: contain;", "scrollbar-gutter: stable;"]
  },
  {
    selector: ".terminal-drawer",
    includes: ["max-height: calc(100dvh - 64px);", "overflow: hidden;"]
  },
  {
    selector: ".terminal-drawer-workbench",
    includes: ["overflow: auto;", "overscroll-behavior: contain;", "scrollbar-gutter: stable;"]
  },
  {
    selector: ".terminal-drawer-sidebar",
    includes: ["overflow: auto;", "overscroll-behavior: contain;", "scrollbar-gutter: stable;"]
  },
  {
    selector: ".terminal-drawer-main",
    includes: ["grid-template-rows: minmax(0, 1fr);", "overflow: auto;", "overscroll-behavior: contain;", "scrollbar-gutter: stable;"]
  },
  {
    selector: ".filesystem-workbench-shell",
    includes: ["height: clamp(360px, calc(100dvh - 148px), 760px);", "min-height: 0;", "overflow: hidden;"]
  },
  {
    selector: ".workspace-explorer-tree",
    includes: ["overflow: auto;", "overscroll-behavior: contain;", "scrollbar-gutter: stable;"]
  },
  {
    selector: ".source-editor-frame",
    includes: ["overflow: auto;", "overscroll-behavior: contain;", "scrollbar-gutter: stable;"]
  },
  {
    selector: ".monaco-editor-shell",
    includes: ["height: clamp(340px, 58dvh, 620px);", "min-height: 0;", "overflow: hidden;"]
  }
];

for (const contract of cssContracts) {
  assertBlockIncludes(contract.selector, contract.includes);
  if (contract.excludes) {
    assertBlockExcludes(contract.selector, contract.excludes);
  }
}

assertSourceSliceIncludes(monitorShell, 'className="desktop-viewport"', ["tabIndex={0}"]);
assertSourceSliceIncludes(terminalDrawer, 'className="terminal-drawer-sidebar"', ["tabIndex={0}"]);
assertSourceSliceIncludes(terminalDrawer, 'className="terminal-drawer-main"', ["tabIndex={0}", "aria-label"]);
assertSourceIncludes(css, "Mobile terminal drawer scroll contract", [
  "grid-template-rows: minmax(220px, 0.42fr) minmax(300px, 0.58fr);",
  "  .terminal-drawer-sidebar {\n    border-right: 0;\n    border-bottom: 1px solid var(--line);\n    overflow: auto;",
  "  .terminal-drawer-main {\n    min-width: 0;\n    min-height: 0;\n    overflow: auto;"
]);
assertSourceIncludes(css, "Mobile source workbench width contract", [
  "  .filesystem-editor-pane .panel-heading {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr);",
  "  .filesystem-workbench .native-source-controls {\n    grid-template-columns: minmax(0, 1fr);",
  "  .source-command-toolbar,\n  .source-workbench-switcher {\n    display: grid;\n    grid-template-columns: minmax(0, 1fr);\n    width: 100%;"
]);

console.log(
  JSON.stringify(
    {
      status: "scroll_contract_ok",
      checkedCssContracts: cssContracts.length,
      checkedFocusablePanes: 3,
      checkedMobileOverrides: 2
    },
    null,
    2
  )
);
