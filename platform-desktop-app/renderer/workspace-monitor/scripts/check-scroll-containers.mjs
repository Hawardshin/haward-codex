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
    includes: ["min-width: var(--desktop-app-min-width);", "min-height: 100dvh;", "min-height: max(100dvh, var(--desktop-app-min-height));", "overflow: visible;"],
    excludes: ["  height: 100dvh;", "overflow: hidden;", "min-height: 720px;"]
  },
  {
    selector: ".activity-rail",
    includes: ["position: sticky;", "min-height: 0;", "height: 100dvh;", "max-height: 100dvh;"]
  },
  {
    selector: ".desktop-viewport",
    includes: ["min-height: 100dvh;", "height: auto;", "max-height: none;", "overflow: visible;", "overflow-x: hidden;", "scrollbar-gutter: stable;", "overscroll-behavior: contain;"],
    excludes: ["  height: 100vh;", "  max-height: 100vh;"]
  },
  {
    selector: ".settings-dialog-backdrop",
    includes: ["overflow: hidden;", "overscroll-behavior: none;", "align-items: center;"]
  },
  {
    selector: ".settings-dialog",
    includes: [
      "height: min(820px, calc(100dvh - (var(--space-4) * 2)));",
      "max-height: calc(100dvh - (var(--space-4) * 2));",
      "overflow: hidden;"
    ]
  },
  {
    selector: ".settings-tab-panel",
    includes: ["overflow-x: hidden;", "overflow-y: auto;", "overscroll-behavior: contain;", "scrollbar-gutter: stable;"]
  },
  {
    selector: ".settings-subsection-rail",
    includes: ["overflow-x: auto;", "overflow-y: hidden;", "scrollbar-gutter: stable;"]
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
    includes: ["height: clamp(420px, 64dvh, 720px);", "min-height: 0;", "overflow: hidden;"]
  },
  {
    selector: ".tool-studio-workbench",
    includes: ["overflow: hidden;", "background: var(--scroll-scope-bg);", "border: 1px solid var(--scroll-scope-border);"]
  },
  {
    selector: ".tool-card-scroll,\n.tool-detail-scroll,\n.tool-env-scroll",
    includes: ["overflow: auto;"]
  },
  {
    selector: ".timeline-docs",
    includes: ["max-height: clamp(260px, 34dvh, 420px);", "overflow: auto;", "background: var(--scroll-scope-bg);", "border: 1px solid var(--scroll-scope-border);"]
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
assertSourceIncludes(css, "Desktop-only minimum window contract", [
  "--desktop-app-min-width: 1280px;",
  "--desktop-app-min-height: 800px;",
  "width: max(100%, var(--desktop-app-min-width));",
  "min-width: var(--desktop-app-min-width);"
]);
for (const forbiddenMobileContract of ["@media (pointer: coarse)", "@media (max-width: 720px)", "@media (max-width: 420px)"]) {
  if (css.includes(forbiddenMobileContract)) {
    throw new Error(`Desktop renderer must not keep mobile UI contract ${forbiddenMobileContract}.`);
  }
}
assertSourceIncludes(css, "Scoped scroll contract", [
  "--scrollbar-track:",
  "--scrollbar-thumb:",
  "--scrollbar-thumb-hover:",
  ".desktop-app-root :where(\n  .activity-rail nav,",
  ".terminal-drawer-main,\n  .workspace-explorer-tree,\n  .source-editor-frame,",
  ".source-editor-frame,\n  .timeline-docs,\n  .tool-studio-mode-rail,",
  "scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);",
  "contain: layout paint style;"
]);

console.log(
  JSON.stringify(
    {
      status: "scroll_contract_ok",
      checkedCssContracts: cssContracts.length,
      checkedFocusablePanes: 3,
      checkedDesktopOnlyContract: 1,
      checkedScopedScroll: 1
    },
    null,
    2
  )
);
