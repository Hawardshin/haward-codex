import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const monitorShell = fs.readFileSync(path.join(projectRoot, "components", "MonitorShell.tsx"), "utf8");
const toolStudio = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "ToolStudioPanel.tsx"),
  "utf8"
);
const coreDrilldown = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "CoreFeatureDrilldown.tsx"),
  "utf8"
);
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"));

test("Tool Studio is a first-class monitor section", () => {
  assert.match(monitorShell, /\|\s*"tools"/);
  assert.match(monitorShell, /id:\s*"tools"[\s\S]*?label:\s*"툴 스튜디오"/);
  assert.match(monitorShell, /allowedSections:\s*\["overview", "agents", "tools", "desktop", "source", "intent"\]/);
  assert.match(monitorShell, /legacyDefaultPinnedSections:\s*SectionId\[\]\s*=\s*\["overview", "agents", "desktop", "source", "intent"\]/);
  assert.match(monitorShell, /hasLegacyDefault && !next\.includes\("tools"\)/);
  assert.match(monitorShell, /next\.splice\(insertAt, 0, "tools"\)/);
  assert.match(monitorShell, /tools:\s*"Studio"/);
  assert.match(monitorShell, /section === "tools"[\s\S]*?<ToolStudioPanel/);
  assert.match(monitorShell, /import \{ ToolStudioPanel \} from "@\/components\/workbench\/ToolStudioPanel"/);
  assert.doesNotMatch(monitorShell, /dynamic\(\(\) => import\("@\/components\/workbench\/ToolStudioPanel"\)/);
  assert.match(coreDrilldown, /"files" \| "agents" \| "tools" \| "run" \| "learn"/);
});

test("Tool Studio uses open-source menu primitives and exact dependencies", () => {
  assert.equal(packageJson.dependencies.three, "0.184.0");
  assert.equal(packageJson.dependencies["@radix-ui/react-dropdown-menu"], "2.1.16");
  assert.equal(packageJson.dependencies["@radix-ui/react-context-menu"], "2.2.16");
  assert.equal(packageJson.devDependencies["@types/three"], "0.184.1");
  assert.match(toolStudio, /from "@radix-ui\/react-dropdown-menu"/);
  assert.match(toolStudio, /from "@radix-ui\/react-context-menu"/);
  assert.match(toolStudio, /<DropdownMenu\.Root>/);
  assert.match(toolStudio, /<ContextMenu\.Root/);
});

test("Three.js scene is lazy-loaded and cleans up WebGL resources", () => {
  assert.doesNotMatch(toolStudio, /^import\s+.*from "three";/m);
  assert.match(toolStudio, /await import\("three"\)/);
  assert.match(toolStudio, /preserveDrawingBuffer: true/);
  assert.match(toolStudio, /renderer\.setClearColor\(0x101923, 1\)/);
  assert.match(toolStudio, /scene\.background = new THREE\.Color\(0x101923\)/);
  assert.match(toolStudio, /camera\.lookAt\(0, -0\.2, 0\)/);
  assert.match(toolStudio, /canvas\.setAttribute\("data-agent-3d-ready", "true"\)/);
  assert.match(toolStudio, /canvas\.removeAttribute\("data-agent-3d-ready"\)/);
  assert.match(toolStudio, /window\.cancelAnimationFrame\(animationFrame\)/);
  assert.match(toolStudio, /resizeObserver\.disconnect\(\)/);
  assert.match(toolStudio, /renderer\.dispose\(\)/);
  assert.match(toolStudio, /geometry\?\.dispose\(\)/);
  assert.match(toolStudio, /material\.dispose\(\)/);
});

test("Tool Studio exposes shortcut and interaction contracts", () => {
  assert.match(toolStudio, /data-tool-primary-menu/);
  assert.match(toolStudio, /data-tool-context-menu/);
  assert.match(toolStudio, /data-tool-mode-button=\{item\.id\}/);
  assert.match(toolStudio, /data-agent-3d-canvas/);
  assert.match(toolStudio, /key === "b"/);
  assert.match(toolStudio, /event\.key === "Enter"/);
  assert.match(toolStudio, /event\.altKey && key === "t"/);
  assert.match(toolStudio, /event\.shiftKey && key === "e"/);
});

test("Tool Studio CSS keeps split scroll and stable controls", () => {
  assert.match(css, /\.tool-studio-shell \{/);
  assert.match(css, /\.tool-studio-workbench \{[\s\S]*?grid-template-columns:/);
  assert.match(css, /\.tool-card-scroll,\n\.tool-detail-scroll,\n\.tool-env-scroll \{[\s\S]*?overflow: auto;/);
  assert.match(css, /\.tool-studio-actions button,[\s\S]*?min-height: var\(--control-target-size\);/);
  assert.match(css, /\.tool-agent-canvas \{[\s\S]*?height: clamp\(220px, 27vh, 320px\);/);
  assert.match(css, /\.tool-agent-canvas \{[\s\S]*?max-height: 320px;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-shell \{[\s\S]*?overflow: visible;/);
});
