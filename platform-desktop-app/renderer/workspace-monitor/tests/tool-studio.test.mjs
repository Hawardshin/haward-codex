import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const monitorShell = fs.readFileSync(path.join(projectRoot, "components", "MonitorShell.tsx"), "utf8");
const motionHelpers = fs.readFileSync(path.join(projectRoot, "lib", "motion.ts"), "utf8");
const operatorCenterDialog = fs.readFileSync(
  path.join(projectRoot, "components", "features", "OperatorCenterDialog.tsx"),
  "utf8"
);
const toolStudio = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "ToolStudioPanel.tsx"),
  "utf8"
);
const toolStudioData = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "tool-studio", "data.ts"),
  "utf8"
);
const toolStudioTypes = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "tool-studio", "types.ts"),
  "utf8"
);
const agentCollaborationScene = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "AgentCollaborationScene.tsx"),
  "utf8"
);
const coreDrilldown = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "CoreFeatureDrilldown.tsx"),
  "utf8"
);
const buttonComponent = fs.readFileSync(path.join(projectRoot, "components", "ui", "Button.tsx"), "utf8");
const actionGroupComponent = fs.readFileSync(path.join(projectRoot, "components", "ui", "ActionGroup.tsx"), "utf8");
const collector = fs.readFileSync(path.join(projectRoot, "scripts", "collect-workspace.mjs"), "utf8");
const scrollCheck = fs.readFileSync(path.join(projectRoot, "scripts", "check-scroll-containers.mjs"), "utf8");
const surfaceAudit = fs.readFileSync(path.join(projectRoot, "scripts", "audit-monitor-surfaces.mjs"), "utf8");
const historyPayloadCheck = fs.readFileSync(path.join(projectRoot, "scripts", "check-history-payload.mjs"), "utf8");
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
  assert.match(monitorShell, /import \{ ToolStudioPanel, type ToolStudioMode, type ToolStudioModeRequest \} from "@\/components\/workbench\/ToolStudioPanel"/);
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

test("Monitor uses library-backed button variants for primary controls", () => {
  assert.equal(packageJson.dependencies["@radix-ui/react-slot"], "1.2.4");
  assert.equal(packageJson.dependencies["class-variance-authority"], "0.7.1");
  assert.match(buttonComponent, /from "@radix-ui\/react-slot"/);
  assert.match(buttonComponent, /from "class-variance-authority"/);
  assert.match(buttonComponent, /export const buttonVariants = cva\("ui-button"/);
  assert.match(buttonComponent, /variant:\s*\{[\s\S]*?primary:[\s\S]*?secondary:[\s\S]*?ghost:/);
  assert.match(buttonComponent, /size:\s*\{[\s\S]*?sm:[\s\S]*?md:[\s\S]*?icon:/);
  assert.match(buttonComponent, /asChild \? Slot : "button"/);
  assert.match(monitorShell, /import \{ Button \} from "@\/components\/ui\/Button"/);
  assert.match(monitorShell, /<Button variant="secondary" onClick=\{openTerminalDrawer\}/);
  assert.match(monitorShell, /<Button variant="ghost" size="icon" onClick=\{\(\) => setCommandPaletteOpen\(true\)\}/);
  assert.match(toolStudio, /import \{ Button \} from "@\/components\/ui\/Button"/);
  assert.match(toolStudio, /<Button[\s\S]*?variant="primary"[\s\S]*?data-tool-primary-menu/);
  assert.match(css, /\.ui-button \{[\s\S]*?min-height: var\(--control-target-size\);/);
  assert.match(css, /\.ui-button-primary \{[\s\S]*?background: var\(--action-primary-bg\);/);
  assert.match(css, /\.ui-button-icon \{[\s\S]*?aspect-ratio: 1;/);
});

test("Monitor groups repeated actions with shared action primitives", () => {
  assert.match(actionGroupComponent, /export const actionGroupVariants = cva\("ui-action-group"/);
  assert.match(actionGroupComponent, /align:\s*\{[\s\S]*?start:[\s\S]*?end:[\s\S]*?stretch:/);
  assert.match(actionGroupComponent, /density:\s*\{[\s\S]*?compact:[\s\S]*?spacious:/);
  assert.match(actionGroupComponent, /role=\{role \|\| \(asToolbar \? "toolbar" : "group"\)\}/);
  assert.match(monitorShell, /import \{ ActionGroup \} from "@\/components\/ui\/ActionGroup"/);
  assert.match(monitorShell, /<ActionGroup className="titlebar-actions"[\s\S]*?density="compact">/);
  assert.match(monitorShell, /<ActionGroup className="task-handoff-actions"[\s\S]*?align="end" density="compact">/);
  assert.match(monitorShell, /<Button variant="secondary" size="sm" onClick=\{\(\) => setCommandPaletteOpen\(false\)\}>/);
  assert.match(monitorShell, /<Button key=\{item\.id\} variant="ghost" className="command-palette-result" onClick=\{\(\) => runCommandItem\(item\)\}>/);
  assert.match(toolStudio, /import \{ ActionGroup \} from "@\/components\/ui\/ActionGroup"/);
  assert.match(toolStudio, /<ActionGroup className="tool-studio-actions"[\s\S]*?align="end" density="compact">/);
  assert.match(css, /\.ui-action-group \{[\s\S]*?display: inline-flex;/);
  assert.match(css, /\.ui-action-group-compact \{[\s\S]*?gap: 6px;/);
  assert.match(css, /\.task-handoff-strip \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto;/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.task-handoff-actions \{[\s\S]*?width: 100%;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-actions \{[\s\S]*?width: 100%;/);
});

test("Agents collaboration uses lazy open-source 3D character scene", () => {
  assert.equal(packageJson.dependencies["@react-three/fiber"], "9.6.1");
  assert.equal(packageJson.dependencies["@react-three/drei"], "10.7.7");
  assert.match(monitorShell, /const AgentCollaborationScene = dynamic\(/);
  assert.match(monitorShell, /import\("@\/components\/workbench\/AgentCollaborationScene"\)/);
  assert.match(monitorShell, /ssr:\s*false/);
  assert.match(monitorShell, /data-agent-collaboration-theater/);
  assert.match(monitorShell, /<AgentCollaborationScene board=\{collaborationBoard\} language=\{uiLanguage\} \/>/);
  assert.match(agentCollaborationScene, /from "@react-three\/fiber"/);
  assert.match(agentCollaborationScene, /import \{ Float, Html, Line \} from "@react-three\/drei"/);
  assert.match(agentCollaborationScene, /useFrame/);
  assert.match(agentCollaborationScene, /preserveDrawingBuffer: true/);
  assert.match(agentCollaborationScene, /powerPreference: "high-performance"/);
  assert.match(agentCollaborationScene, /data-agent-collaboration-3d-ready/);
  assert.match(agentCollaborationScene, /function AgentCharacter/);
  assert.match(agentCollaborationScene, /function TaskLaneNode/);
  assert.match(agentCollaborationScene, /visorPalette/);
  assert.match(agentCollaborationScene, /agent-character-visor/);
  assert.match(agentCollaborationScene, /agent-character-chest-panel/);
  assert.match(agentCollaborationScene, /agent-character-status-light/);
  assert.match(agentCollaborationScene, /agent-character-role-halo/);
  assert.match(agentCollaborationScene, /agent-character-ear-left/);
  assert.match(agentCollaborationScene, /agent-character-eye-left/);
  assert.match(agentCollaborationScene, /agent-character-muzzle/);
  assert.match(agentCollaborationScene, /agent-character-nose/);
  assert.match(agentCollaborationScene, /agent-character-cheek-left/);
  assert.match(agentCollaborationScene, /agent-character-tail/);
  assert.match(agentCollaborationScene, /const compactAgentName/);
  assert.match(agentCollaborationScene, /data-agent-character-identity/);
  assert.match(agentCollaborationScene, /agent-collaboration-identity-strip/);
  assert.match(agentCollaborationScene, /const scale = node\.agent\.activeTaskCount > 0 \? 0\.86 : 0\.78/);
  assert.match(css, /\.agent-collaboration-theater \{/);
  assert.match(css, /\.agent-collaboration-scene-shell,[\s\S]*?min-height: clamp\(280px, 42vh, 520px\);/);
  assert.match(css, /\.agent-collaboration-scene-hud \{/);
  assert.match(css, /\.agent-character-identity \{/);
  assert.match(css, /\.agent-collaboration-identity-strip \{/);
  assert.match(css, /width: 112px;/);
  assert.match(css, /width: 28px;/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.agent-collaboration-scene-shell,/);
});

test("Agents details use one active workspace instead of stacking every feature", () => {
  assert.match(monitorShell, /type AgentDetailViewId = "collaboration" \| "blueprint" \| "builder" \| "learning" \| "flow" \| "inventory" \| "runtime"/);
  assert.match(monitorShell, /const agentDetailViews: Array/);
  assert.match(monitorShell, /useState<AgentDetailViewId>\("collaboration"\)/);
  assert.match(monitorShell, /const \[agentDetailRenderView, setAgentDetailRenderView\] = useState<AgentDetailViewId>\("collaboration"\)/);
  assert.match(monitorShell, /const pendingAgentDetailCommitRef = useRef<\(\(\) => void\) \| null>\(null\)/);
  assert.match(monitorShell, /const selectAgentDetailView = useCallback\(\(view: AgentDetailViewId\) => \{/);
  assert.match(monitorShell, /pendingAgentDetailCommitRef\.current = scheduleAfterFirstPaint\(\(\) => \{[\s\S]*?setAgentDetailRenderView\(view\)/);
  assert.match(monitorShell, /data-agent-detail-workspace/);
  assert.match(monitorShell, /data-agent-detail-render-view=\{agentDetailRenderView\}/);
  assert.match(monitorShell, /data-agent-detail-pending=\{agentDetailView === agentDetailRenderView \? "false" : "true"\}/);
  assert.match(monitorShell, /role="tablist"/);
  assert.match(monitorShell, /data-agent-detail-tab=\{item\.id\}/);
  assert.match(monitorShell, /aria-selected=\{selected\}/);
  assert.match(monitorShell, /onClick=\{\(\) => selectAgentDetailView\(item\.id\)\}/);
  assert.match(monitorShell, /aria-busy=\{agentDetailView !== agentDetailRenderView\}/);
  assert.match(monitorShell, /data-agent-detail-active-surface/);
  assert.match(monitorShell, /agentDetailRenderView === "collaboration"/);
  assert.match(monitorShell, /agentDetailRenderView === "blueprint"/);
  assert.match(monitorShell, /agentDetailRenderView === "builder"/);
  assert.match(monitorShell, /agentDetailRenderView === "learning"/);
  assert.match(monitorShell, /agentDetailRenderView === "flow"/);
  assert.match(monitorShell, /agentDetailRenderView === "inventory"/);
  assert.match(monitorShell, /agentDetailRenderView === "runtime"/);
  assert.match(css, /\.agent-detail-workspace\[data-agent-detail-pending="true"\] \.agent-detail-active-surface \{/);
  assert.match(css, /\.agent-detail-switcher \{[\s\S]*?grid-template-columns: repeat\(7, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.agent-detail-switcher button\[aria-selected="true"\]/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.agent-detail-switcher \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/);
});

test("Three.js scene is lazy-loaded and cleans up WebGL resources", () => {
  assert.doesNotMatch(toolStudio, /^import\s+.*from "three";/m);
  assert.match(toolStudio, /await import\("three"\)/);
  assert.match(toolStudio, /preserveDrawingBuffer: true/);
  assert.match(toolStudio, /renderer\.setClearColor\(0x101923, 1\)/);
  assert.match(toolStudio, /scene\.background = new THREE\.Color\(0x101923\)/);
  assert.match(toolStudio, /camera\.lookAt\(0, -0\.2, 0\)/);
  assert.match(toolStudio, /const bodyGeometry = new THREE\.CapsuleGeometry\(0\.31, 0\.24, 8, 18\)/);
  assert.match(toolStudio, /const earGeometry = new THREE\.SphereGeometry\(0\.115, 16, 12\)/);
  assert.match(toolStudio, /const eyeGeometry = new THREE\.SphereGeometry\(0\.024, 12, 8\)/);
  assert.match(toolStudio, /const noseGeometry = new THREE\.SphereGeometry\(0\.018, 10, 8\)/);
  assert.match(toolStudio, /const muzzleGeometry = new THREE\.SphereGeometry\(0\.115, 16, 10\)/);
  assert.match(toolStudio, /const visorGeometry = new THREE\.BoxGeometry\(0\.18, 0\.034, 0\.04\)/);
  assert.match(toolStudio, /const chestPanelGeometry = new THREE\.BoxGeometry\(0\.18, 0\.095, 0\.04\)/);
  assert.match(toolStudio, /const roleHaloGeometry = new THREE\.TorusGeometry\(0\.42, 0\.016, 8, 48\)/);
  assert.match(toolStudio, /tool-agent-character-visor/);
  assert.match(toolStudio, /tool-agent-character-chest-panel/);
  assert.match(toolStudio, /tool-agent-character-status-light/);
  assert.match(toolStudio, /tool-agent-character-role-halo/);
  assert.match(toolStudio, /tool-agent-character-ear-left/);
  assert.match(toolStudio, /tool-agent-character-eye-left/);
  assert.match(toolStudio, /tool-agent-character-muzzle/);
  assert.match(toolStudio, /tool-agent-character-nose/);
  assert.match(toolStudio, /tool-agent-character-cheek-left/);
  assert.match(toolStudio, /tool-agent-character-tail/);
  assert.match(toolStudio, /toolModeSceneColors/);
  assert.match(toolStudio, /character\.scale\.setScalar\(0\.82\)/);
  assert.match(toolStudio, /className="tool-agent-legend"/);
  assert.match(css, /\.tool-agent-legend \{/);
  assert.match(toolStudio, /canvas\.setAttribute\("data-agent-3d-ready", "true"\)/);
  assert.match(toolStudio, /canvas\.removeAttribute\("data-agent-3d-ready"\)/);
  assert.match(toolStudio, /window\.cancelAnimationFrame\(animationFrame\)/);
  assert.match(toolStudio, /document\.hidden/);
  assert.match(toolStudio, /Boolean\(entry\?\.isIntersecting\) && isCanvasInViewport\(\)/);
  assert.match(toolStudio, /document\.addEventListener\("visibilitychange", handleDocumentVisibilityChange\)/);
  assert.match(toolStudio, /document\.removeEventListener\("visibilitychange", handleDocumentVisibilityChange\)/);
  assert.match(toolStudio, /resizeObserver\.disconnect\(\)/);
  assert.match(toolStudio, /renderer\.dispose\(\)/);
  assert.match(toolStudio, /geometry\?\.dispose\(\)/);
  assert.match(toolStudio, /material\.dispose\(\)/);
});

test("Tool Studio exposes shortcut and interaction contracts", () => {
  assert.match(toolStudio, /from "\.\/tool-studio\/data"/);
  assert.match(toolStudio, /from "\.\/tool-studio\/types"/);
  assert.match(toolStudio, /export type \{ ToolStudioMode, ToolStudioModeRequest \} from "\.\/tool-studio\/types"/);
  assert.match(toolStudio, /data-tool-primary-menu/);
  assert.match(toolStudio, /className="tool-studio-primary-action tool-dropdown-trigger"/);
  assert.match(toolStudio, /aria-haspopup="menu"/);
  assert.match(toolStudio, /className="tool-dropdown-trigger-icon"/);
  assert.match(toolStudio, /className="tool-dropdown-trigger-copy"/);
  assert.match(toolStudio, /className="tool-dropdown-trigger-label"/);
  assert.match(toolStudio, /className="tool-dropdown-trigger-caret"/);
  assert.match(toolStudio, /activeStage\.labelKo/);
  assert.match(toolStudio, /const \[actionMenuOpen, setActionMenuOpen\] = useState\(false\)/);
  assert.match(toolStudio, /data-tool-action-menu-trigger/);
  assert.match(toolStudio, /<DropdownMenu\.Root open=\{actionMenuOpen\} onOpenChange=\{setActionMenuOpen\}>/);
  assert.match(toolStudio, /data-tool-action-menu/);
  assert.match(toolStudio, /data-tool-action-menu-item="previous-mode"/);
  assert.match(toolStudio, /data-tool-action-menu-item="next-mode"/);
  assert.match(toolStudio, /data-tool-action-stage=\{item\.id\}/);
  assert.match(toolStudio, /data-tool-context-menu/);
  assert.match(toolStudio, /data-tool-stage-context-menu=\{item\.id\}/);
  assert.match(toolStudio, /data-tool-mode-context-menu=\{item\.id\}/);
  assert.match(toolStudioTypes, /export type ToolStudioStage = "create" \| "ship"/);
  assert.match(toolStudio, /const \[stage, setStage\] = useState<ToolStudioStage>\("create"\)/);
  assert.match(toolStudioData, /export const toolStudioStages: ToolStage\[\] = \[/);
  assert.match(toolStudioData, /stage: "create"/);
  assert.match(toolStudioData, /stage: "ship"/);
  assert.match(toolStudio, /const currentStageModes = toolModes\.filter\(\(item\) => item\.stage === activeStage\.id\)/);
  assert.match(toolStudio, /const selectStage = useCallback\(/);
  assert.match(toolStudio, /data-tool-stage-rail/);
  assert.match(toolStudio, /data-tool-stage-button=\{item\.id\}/);
  assert.match(toolStudio, /data-tool-mode-depth=\{stage\}/);
  assert.match(toolStudio, /data-tool-mode-button=\{item\.id\}/);
  assert.match(toolStudio, /data-agent-3d-canvas/);
  assert.match(toolStudioTypes, /export type ToolStudioMode = "build" \| "environment" \| "deploy" \| "registry"/);
  assert.match(toolStudioTypes, /export type ToolStudioModeRequest = \{[\s\S]*?mode: ToolStudioMode;[\s\S]*?requestId: number;/);
  assert.match(toolStudio, /requestedMode\?: ToolStudioModeRequest \| null/);
  assert.match(toolStudio, /if \(requestedMode\) \{[\s\S]*?selectMode\(requestedMode\.mode\);/);
  assert.match(toolStudio, /const selectAdjacentMode = useCallback/);
  assert.match(toolStudio, /const copyActionMap = useCallback/);
  assert.match(toolStudio, /event\.altKey && event\.key === "Enter"/);
  assert.match(toolStudio, /event\.altKey && key === "1"/);
  assert.match(toolStudio, /event\.altKey && key === "2"/);
  assert.match(toolStudio, /event\.altKey && event\.key === "ArrowLeft"/);
  assert.match(toolStudio, /event\.altKey && event\.key === "ArrowRight"/);
  assert.match(toolStudio, /key === "b"/);
  assert.match(toolStudio, /event\.key === "Enter"/);
  assert.match(toolStudio, /event\.altKey && key === "t"/);
  assert.match(toolStudio, /event\.shiftKey && key === "e"/);
});

test("Tool Studio CSS keeps split scroll and stable controls", () => {
  assert.match(css, /\.tool-studio-shell \{/);
  assert.match(css, /\.tool-studio-depth-rail \{[\s\S]*?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-studio-depth-rail button \{[\s\S]*?min-height: 58px;/);
  assert.match(css, /\.tool-studio-depth-rail button\.active,[\s\S]*?\.tool-studio-mode-rail button\.active \{/);
  assert.match(css, /\.tool-studio-workbench \{[\s\S]*?grid-template-columns:/);
  assert.match(css, /\.tool-card-scroll,\n\.tool-detail-scroll,\n\.tool-env-scroll \{[\s\S]*?overflow: auto;/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.tool-card-scroll,[\s\S]*?\.tool-env-scroll[\s\S]*?\) \{[\s\S]*?overscroll-behavior: contain;[\s\S]*?scrollbar-color: var\(--scrollbar-thumb\) var\(--scrollbar-track\);/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.workspace-explorer-tree,[\s\S]*?\.source-editor-frame,[\s\S]*?\.tool-card-scroll,[\s\S]*?\.tool-env-scroll[\s\S]*?\) \{[\s\S]*?contain: layout paint style;/);
  assert.match(css, /\.tool-studio-workbench \{[\s\S]*?background: var\(--scroll-scope-bg\);[\s\S]*?border: 1px solid var\(--scroll-scope-border\);/);
  assert.match(css, /\.tool-studio-actions button,[\s\S]*?min-height: var\(--control-target-size\);/);
  assert.match(css, /\.tool-studio-actions \.tool-dropdown-trigger \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto;/);
  assert.match(css, /\.tool-action-menu-trigger kbd \{[\s\S]*?font-family: var\(--font-family-mono\);/);
  assert.match(css, /\.tool-menu-separator \{[\s\S]*?background: var\(--line\);/);
  assert.match(css, /\.tool-dropdown-trigger-label,[\s\S]*?\.tool-dropdown-trigger-copy small \{[\s\S]*?text-overflow: ellipsis;/);
  assert.match(css, /\.tool-dropdown-trigger\[data-state="open"\] \.tool-dropdown-trigger-caret \{[\s\S]*?transform: rotate\(180deg\);/);
  assert.match(css, /\.tool-agent-canvas \{[\s\S]*?height: clamp\(220px, 27vh, 320px\);/);
  assert.match(css, /\.tool-agent-canvas \{[\s\S]*?max-height: 320px;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-shell \{[\s\S]*?overflow: visible;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-actions \.tool-dropdown-trigger \{[\s\S]*?width: 100%;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-depth-rail,[\s\S]*?\.tool-studio-workbench,/);
});

test("Tool Studio 3D scene pauses when offscreen or motion should be reduced", () => {
  assert.match(toolStudio, /const reducedMotionQuery = window\.matchMedia\("\(prefers-reduced-motion: reduce\)"\)/);
  assert.match(toolStudio, /const isCanvasInViewport = \(\) => \{[\s\S]*?canvas\.getBoundingClientRect\(\)/);
  assert.match(toolStudio, /const visibilityObserver = new IntersectionObserver/);
  assert.match(toolStudio, /window\.addEventListener\("scroll", requestViewportCheck, \{ passive: true \}\)/);
  assert.match(toolStudio, /window\.removeEventListener\("scroll", requestViewportCheck\)/);
  assert.match(toolStudio, /viewportCheckInterval = window\.setInterval\(requestViewportCheck, 400\)/);
  assert.match(toolStudio, /window\.clearInterval\(viewportCheckInterval\)/);
  assert.match(toolStudio, /sceneVisible = Boolean\(entry\?\.isIntersecting\)/);
  assert.match(toolStudio, /canvas\.setAttribute\("data-agent-3d-paused", "true"\)/);
  assert.match(toolStudio, /canvas\.setAttribute\("data-agent-3d-paused", "false"\)/);
  assert.match(toolStudio, /visibilityObserver\.disconnect\(\)/);
  assert.match(toolStudio, /reducedMotionQuery\.removeEventListener\("change", handleReducedMotionChange\)/);
});

test("Monitor section switches stage heavy content after first paint", () => {
  assert.match(monitorShell, /const \[readySection, setReadySection\] = useState<SectionId>/);
  assert.match(monitorShell, /const titlebarSectionLabelRef = useRef<HTMLElement>\(null\)/);
  assert.match(monitorShell, /const pendingSectionCommitRef = useRef<\(\(\) => void\) \| null>\(null\)/);
  assert.match(monitorShell, /const primeSectionActivation = useCallback\(\(targetSection: SectionId\) => \{/);
  assert.match(monitorShell, /const alreadyReady =[\s\S]*?data-section-content-ready"\) === "true"/);
  assert.match(monitorShell, /viewport\?\.setAttribute\("data-active-section", targetSection\)/);
  assert.match(monitorShell, /if \(!alreadyReady\) \{[\s\S]*?viewport\?\.setAttribute\("data-section-content-ready", "false"\)/);
  assert.match(monitorShell, /element\.classList\.toggle\("active", isTarget\)/);
  assert.match(monitorShell, /titlebarSectionLabelRef\.current\.textContent = target\.label/);
  assert.match(monitorShell, /onPointerDown=\{\(\) => primeSectionActivation\(item\.id\)\}/);
  assert.match(monitorShell, /pendingSectionCommitRef\.current\?\.\(\)/);
  assert.match(monitorShell, /pendingSectionCommitRef\.current = scheduleAfterFirstPaint\(\(\) => \{/);
  assert.match(monitorShell, /scheduleAfterFirstPaint\(\(\) => setReadySection\(section\)\)/);
  assert.match(monitorShell, /const sectionContentReady = readySection === section/);
  assert.match(monitorShell, /data-section-content-ready=\{sectionContentReady \? "true" : "false"\}/);
  assert.match(monitorShell, /data-section-transition-shell/);
  assert.match(monitorShell, /data-section-transition-target=\{section\}/);
  assert.match(monitorShell, /const sourceQuery = sectionContentReady && section === "source" \? normalizedQuery : ""/);
  assert.match(monitorShell, /\{sectionContentReady && section === "desktop" && \(/);
  assert.match(monitorShell, /\{sectionContentReady && section === "tools" && \(/);
  assert.match(monitorShell, /\{sectionContentReady && section === "source" && \(/);
  assert.match(monitorShell, /\{sectionContentReady && section === "agents" && \(/);
  assert.match(css, /\.section-transition-shell \{/);
});

test("Monitor uses a shared motion system for smooth tab, dialog, and menu transitions", () => {
  assert.match(css, /--motion-duration-fast: 140ms;/);
  assert.match(css, /--motion-duration-standard: 190ms;/);
  assert.match(css, /@keyframes workspace-panel-enter/);
  assert.match(css, /@keyframes workspace-menu-enter/);
  assert.match(css, /\.desktop-viewport\[data-section-content-ready="true"\] :where\(/);
  assert.match(css, /\.settings-dialog-backdrop \{[\s\S]*?animation: workspace-fade-in/);
  assert.match(css, /\.settings-dialog \{[\s\S]*?animation: workspace-menu-enter/);
  assert.match(css, /\.command-palette \{[\s\S]*?animation: workspace-menu-enter/);
  assert.match(css, /\.tool-menu-content,[\s\S]*?\.tool-context-content \{[\s\S]*?animation: workspace-menu-enter/);
  assert.match(css, /\.agent-detail-active-surface \{[\s\S]*?transition:[\s\S]*?transform var\(--motion-duration-fast\)/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\) \{/);
});

test("Monitor buttons expose instant press feedback before heavy click work", () => {
  assert.equal(packageJson.scripts["perf:buttons"], "node scripts/audit-button-response.mjs");
  assert.match(monitorShell, /from "@\/lib\/motion"/);
  assert.match(monitorShell, /installInstantButtonFeedback\(root\)/);
  assert.match(motionHelpers, /export function installInstantButtonFeedback\(root: HTMLElement\)/);
  assert.match(motionHelpers, /export function scheduleAfterFirstPaint\(callback: \(\) => void, delayMs = 0\)/);
  assert.match(motionHelpers, /root\.addEventListener\("pointerdown", handlePointerDown, true\)/);
  assert.match(motionHelpers, /root\.addEventListener\("keydown", handleKeyDown, true\)/);
  assert.match(motionHelpers, /data-instant-button-feedback", "active"/);
  assert.match(motionHelpers, /data-instant-button-painted", "true"/);
  assert.match(motionHelpers, /data-button-response-active", "true"/);
  assert.match(css, /\[data-instant-button-feedback="active"\]/);
});

test("History documents use bounded admin previews instead of loading full records into the UI snapshot", () => {
  assert.equal(packageJson.scripts["check:history-payload"], "node scripts/check-history-payload.mjs");
  assert.match(packageJson.scripts.check, /check-history-payload/);
  assert.match(collector, /const publicAdminHistoryIndexPath = path\.join\(projectRoot, "public", "admin-history-index\.json"\)/);
  assert.match(collector, /const MAX_INLINE_HISTORY_DOCUMENTS = 96;/);
  assert.match(collector, /const HISTORY_DOCUMENT_HTML_CHARS = 2200;/);
  assert.match(collector, /function historyAdminPreviewToHtml\(content\)/);
  assert.match(collector, /export function buildAdminHistoryIndex\(documents\)/);
  assert.match(collector, /export function compactDocumentsForSnapshot\(documents\)/);
  assert.match(collector, /migrated_to_lazy_admin_index/);
  assert.match(collector, /isHistoryDocument[\s\S]*?\? historyAdminPreviewToHtml\(content\)/);
  assert.match(collector, /previewMode: isHistoryDocument \? "admin-summary" : "document-preview"/);
  assert.match(collector, /htmlTruncated: isHistoryDocument \? content\.length > HISTORY_ADMIN_EXCERPT_CHARS : content\.length > maxHtmlChars/);
  assert.match(collector, /sourceBytes: stats\.size/);
  assert.match(historyPayloadCheck, /const adminHistoryIndexPath = path\.join\(projectRoot, "public", "admin-history-index\.json"\)/);
  assert.match(historyPayloadCheck, /const maxDocumentJsonBytes = 1_900_000;/);
  assert.match(historyPayloadCheck, /Inline history documents must stay at or below/);
  assert.match(historyPayloadCheck, /Admin history index day groups must not duplicate document lists/);
  assert.match(historyPayloadCheck, /Snapshot adminHistory summary must match generated admin-history-index\.json/);
  assert.match(monitorShell, /fetchAdminHistoryIndex\(controller\)/);
  assert.match(monitorShell, /new URL\("admin-history-index\.json", window\.location\.href\)/);
  assert.match(monitorShell, /mergeDocuments\(snapshot\.documents, adminHistoryIndex\?\.documents \|\| \[\]\)/);
  assert.match(monitorShell, /adminHistoryStatusText\(adminHistoryState, snapshot\)/);
});

test("Operator Center and task run copy localize high-visibility Korean UI", () => {
  assert.match(monitorShell, /<OperatorCenterDialog[\s\S]*?language=\{uiLanguage\}/);
  assert.match(operatorCenterDialog, /aria-label=\{ko \? "운영 센터" : "Operator Center"\}/);
  assert.match(operatorCenterDialog, /운영 도구는 주 작업면과 분리됩니다/);
  assert.match(operatorCenterDialog, /\$\{section\.shortLabel\} 열기/);
  assert.match(monitorShell, /질문 자동 보류는 초기화 설정에서만 바꿉니다/);
  assert.match(monitorShell, /로그 열기/);
  assert.match(monitorShell, /제한된 stdout\/stderr 미리보기와 실행 기록 JSON/);
});

test("Operator history surfaces keep timeline documents in bounded scroll panes", () => {
  assert.equal(packageJson.scripts["audit:surfaces"], "node scripts/audit-monitor-surfaces.mjs");
  assert.match(surfaceAudit, /const operatorSections = \[/);
  assert.match(surfaceAudit, /desktop:\$\{section\}/);
  assert.match(surfaceAudit, /mobile:history/);
  assert.match(surfaceAudit, /timeline docs must be a bounded scroll pane/);
  assert.match(css, /\.timeline-docs \{[\s\S]*?max-height: clamp\(260px, 34dvh, 420px\);[\s\S]*?overflow: auto;/);
  assert.match(css, /\.timeline-docs \{[\s\S]*?background: var\(--scroll-scope-bg\);/);
  assert.match(scrollCheck, /selector: "\.timeline-docs"/);
  assert.match(scrollCheck, /max-height: clamp\(260px, 34dvh, 420px\);/);
  assert.match(css, /\.agent-chat-details summary \{[\s\S]*?min-height: var\(--control-target-size\);/);
  assert.match(css, /\.agent-chat-details summary::-webkit-details-marker \{[\s\S]*?display: none;/);
});

test("Tool Studio build mode exposes a dedicated tool builder workbench", () => {
  assert.match(toolStudioTypes, /export type ToolBuilderBlueprint = \{/);
  assert.match(toolStudioTypes, /packageName: string;/);
  assert.match(toolStudioTypes, /moduleName: string;/);
  assert.match(toolStudioTypes, /entrypoint: string;/);
  assert.match(toolStudioTypes, /pyprojectPath: string;/);
  assert.match(toolStudioTypes, /testPath: string;/);
  assert.match(toolStudioTypes, /initCommand: string;/);
  assert.match(toolStudioTypes, /editTargets: string\[\];/);
  assert.match(toolStudioTypes, /sourceChecklistKo: string\[\];/);
  assert.match(toolStudioTypes, /sourceChecklistEn: string\[\];/);
  assert.match(toolStudioData, /export const toolBuilderBlueprints: ToolBuilderBlueprint\[\] = \[/);
  assert.match(toolStudioData, /id:\s*"python-cli-tool"[\s\S]*?id:\s*"mcp-wrapper-tool"[\s\S]*?id:\s*"automation-tool"/);
  assert.match(toolStudio, /const \[selectedBlueprintId, setSelectedBlueprintId\] = useState/);
  assert.match(toolStudio, /const \[selectedSourceTarget, setSelectedSourceTarget\] = useState/);
  assert.match(toolStudio, /const selectedSourceChecklist = ko \? selectedBlueprint\.sourceChecklistKo : selectedBlueprint\.sourceChecklistEn/);
  assert.match(toolStudio, /className="tool-builder-workbench"/);
  assert.match(toolStudio, /data-tool-builder-blueprint=\{blueprint\.id\}/);
  assert.match(toolStudio, /data-tool-builder-manifest/);
  assert.match(toolStudio, /data-tool-builder-command="run"/);
  assert.match(toolStudio, /data-tool-builder-command="package"/);
  assert.match(toolStudio, /data-tool-builder-action="source"/);
  assert.match(toolStudio, /data-tool-builder-action="smoke"/);
  assert.match(toolStudio, /data-tool-builder-action="package"/);
  assert.match(toolStudio, /data-tool-builder-action="copy"/);
  assert.match(toolStudio, /className="tool-python-source-manager"/);
  assert.match(toolStudio, /data-tool-python-source-manager/);
  assert.match(toolStudio, /data-tool-python-source-files/);
  assert.match(toolStudio, /data-tool-python-source-target=\{target\}/);
  assert.match(toolStudio, /data-tool-python-source-pyproject/);
  assert.match(toolStudio, /data-tool-python-source-entrypoint/);
  assert.match(toolStudio, /data-tool-python-source-checklist/);
  assert.match(toolStudio, /data-tool-python-source-command/);
  assert.match(toolStudio, /data-tool-python-source-action="open"/);
  assert.match(toolStudio, /data-tool-python-source-action="terminal"/);
  assert.match(toolStudio, /data-tool-python-source-action="copy"/);
  assert.match(toolStudio, /copyPythonSourcePlan/);
  assert.match(toolStudio, /writeClipboardText\(JSON\.stringify/);
  assert.match(css, /\.tool-builder-blueprints \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-builder-canvas \{[\s\S]*?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-builder-actions \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-python-source-manager \{/);
  assert.match(css, /\.tool-python-source-layout \{[\s\S]*?grid-template-columns: minmax\(210px, 1\.05fr\) minmax\(0, 0\.95fr\);/);
  assert.match(css, /\.tool-python-source-checklist ul \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(css, /\.tool-python-source-actions \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-builder-blueprints,[\s\S]*?\.tool-builder-canvas,[\s\S]*?\.tool-builder-actions,/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-python-source-layout,[\s\S]*?\.tool-python-source-actions,[\s\S]*?\.tool-python-source-checklist ul,/);
});

test("Tool Studio environment mode exposes a Python execution workbench", () => {
  assert.match(toolStudioTypes, /export type PythonEnvironmentProfile = \{/);
  assert.match(toolStudioTypes, /export type VirtualEnvironmentLifecycleStep = \{/);
  assert.match(toolStudioData, /export const pythonEnvironmentProfiles: PythonEnvironmentProfile\[\] = \[/);
  assert.match(toolStudioData, /export const virtualEnvironmentLifecycleSteps: VirtualEnvironmentLifecycleStep\[\] = \[/);
  assert.match(toolStudioData, /id:\s*"local-venv"[\s\S]*?id:\s*"isolated-runner"[\s\S]*?id:\s*"agent-sandbox"/);
  assert.match(toolStudioData, /id:\s*"create"[\s\S]*?id:\s*"activate"[\s\S]*?id:\s*"install"[\s\S]*?id:\s*"freeze"[\s\S]*?id:\s*"rebuild"/);
  assert.match(toolStudio, /const \[selectedEnvironmentId, setSelectedEnvironmentId\] = useState/);
  assert.match(toolStudio, /const \[selectedVenvStepId, setSelectedVenvStepId\] = useState/);
  assert.match(toolStudio, /const selectedEnvironment = pythonEnvironmentProfiles\.find/);
  assert.match(toolStudio, /const selectedVenvStep = virtualEnvironmentLifecycleSteps\.find/);
  assert.match(toolStudio, /className="tool-environment-workbench"/);
  assert.match(toolStudio, /data-tool-environment-profile=\{profile\.id\}/);
  assert.match(toolStudio, /data-tool-environment-runtime/);
  assert.match(toolStudio, /data-tool-environment-install/);
  assert.match(toolStudio, /data-tool-environment-run/);
  assert.match(toolStudio, /data-tool-environment-sandbox/);
  assert.match(toolStudio, /data-tool-environment-health/);
  assert.match(toolStudio, /data-tool-venv-manager/);
  assert.match(toolStudio, /data-tool-venv-step=\{step\.id\}/);
  assert.match(toolStudio, /data-tool-venv-command=\{selectedVenvStep\.id\}/);
  assert.match(toolStudio, /data-tool-venv-action="terminal"/);
  assert.match(toolStudio, /data-tool-venv-action="copy-command"/);
  assert.match(toolStudio, /data-tool-venv-action="copy-workflow"/);
  assert.match(toolStudio, /data-tool-environment-action="create"/);
  assert.match(toolStudio, /data-tool-environment-action="install"/);
  assert.match(toolStudio, /data-tool-environment-action="smoke"/);
  assert.match(toolStudio, /data-tool-environment-action="copy"/);
  assert.match(toolStudio, /copyEnvironmentPlan/);
  assert.match(toolStudio, /copyVirtualEnvironmentCommand/);
  assert.match(toolStudio, /copyVirtualEnvironmentWorkflow/);
  assert.match(css, /\.tool-environment-profiles \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-environment-canvas \{[\s\S]*?grid-template-columns: minmax\(0, 1\.05fr\) minmax\(0, 0\.95fr\);/);
  assert.match(css, /\.tool-environment-actions \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-venv-steps \{[\s\S]*?grid-template-columns: repeat\(5, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-venv-actions \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-environment-profiles,[\s\S]*?\.tool-environment-canvas,[\s\S]*?\.tool-environment-actions,/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-venv-heading,[\s\S]*?\.tool-venv-steps,[\s\S]*?\.tool-venv-actions,/);
});

test("Tool Studio deploy mode exposes a deployment workbench", () => {
  assert.match(toolStudioTypes, /export type ToolDeployTarget = \{/);
  assert.match(toolStudioData, /export const toolDeployTargets: ToolDeployTarget\[\] = \[/);
  assert.match(toolStudioData, /id:\s*"local-registry"[\s\S]*?id:\s*"agentcore-gateway"[\s\S]*?id:\s*"desktop-bundle"/);
  assert.match(toolStudio, /const \[selectedDeployTargetId, setSelectedDeployTargetId\] = useState/);
  assert.match(toolStudio, /className="tool-deploy-workbench"/);
  assert.match(toolStudio, /data-tool-deploy-target=\{target\.id\}/);
  assert.match(toolStudio, /data-tool-deploy-release/);
  assert.match(toolStudio, /data-tool-deploy-preflight/);
  assert.match(toolStudio, /data-tool-deploy-guardrails/);
  assert.match(toolStudio, /data-tool-deploy-rollback/);
  assert.match(toolStudio, /data-tool-deploy-action="preflight"/);
  assert.match(toolStudio, /data-tool-deploy-action="package"/);
  assert.match(toolStudio, /data-tool-deploy-action="registry"/);
  assert.match(toolStudio, /data-tool-deploy-action="copy"/);
  assert.match(toolStudio, /copyDeployPlan/);
  assert.match(css, /\.tool-deploy-targets \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-deploy-canvas \{[\s\S]*?grid-template-columns: minmax\(0, 1\.15fr\) minmax\(0, 0\.85fr\);/);
  assert.match(css, /\.tool-deploy-actions \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-deploy-targets,[\s\S]*?\.tool-deploy-canvas,[\s\S]*?\.tool-deploy-actions,/);
});

test("AgentCore builder supports multi-capability bundles", () => {
  assert.match(monitorShell, /type AgentCoreCapabilityOption = \{/);
  assert.match(monitorShell, /const agentCoreCapabilityOptions: AgentCoreCapabilityOption\[\] = \[/);
  assert.match(monitorShell, /id:\s*"runtime"[\s\S]*?id:\s*"memory"[\s\S]*?id:\s*"gateway"[\s\S]*?id:\s*"browser"[\s\S]*?id:\s*"code_interpreter"[\s\S]*?id:\s*"identity"[\s\S]*?id:\s*"policy"[\s\S]*?id:\s*"observability"[\s\S]*?id:\s*"evaluation"/);
  assert.match(monitorShell, /resourceKo:\s*"Runtime"[\s\S]*?resourceKo:\s*"Memory"[\s\S]*?resourceKo:\s*"Gateway"[\s\S]*?resourceKo:\s*"Built-in Tools"/);
  assert.match(monitorShell, /const agentCoreResourceLifecycleSteps = \[/);
  assert.match(monitorShell, /selectedCapabilityIds: string\[\] = blueprint\.capabilities/);
  assert.match(monitorShell, /selectedCapabilities\.map\(\(item\) => item\.localCapability\)/);
  assert.match(monitorShell, /const \[selectedCapabilityIds, setSelectedCapabilityIds\] = useState<string\[\]>\(defaultCapabilityIds\)/);
  assert.match(monitorShell, /data-agentcore-capability=\{option\.id\}/);
  assert.match(monitorShell, /aria-pressed=\{selected\}/);
  assert.match(monitorShell, /data-agentcore-select-all/);
  assert.match(monitorShell, /className="agentcore-resource-topology"/);
  assert.match(monitorShell, /data-agentcore-resource=\{option\.id\}/);
  assert.match(monitorShell, /option\.localCapability/);
  assert.match(monitorShell, /onApplyBlueprint\(selectedBlueprint\.id, selectedCapabilityIds\)/);
  assert.match(monitorShell, /onStartPreflight\(selectedBlueprint\.id, selectedCapabilityIds\)/);
  assert.match(monitorShell, /onCreateProposal\(selectedBlueprint\.id, selectedCapabilityIds\)/);
  assert.match(css, /\.agentcore-capability-grid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.agentcore-resource-grid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.agentcore-resource-lifecycle \{[\s\S]*?grid-template-columns: repeat\(5, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.agentcore-capability-grid \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.agentcore-resource-grid \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/);
});

test("Monitor home exposes task-intent routes before section names", () => {
  const focusCommandIndex = monitorShell.indexOf("home-focus-command");
  const taskIntentIndex = monitorShell.indexOf("workspace-home-actions task-intent-grid");
  const statusRowIndex = monitorShell.indexOf("core-home-status-row");

  assert.match(monitorShell, /type TaskIntentItem = \{/);
  assert.match(monitorShell, /const \[activeTaskIntentId, setActiveTaskIntentId\] = useState\(""\)/);
  assert.match(monitorShell, /const \[activeTaskFlowStepId, setActiveTaskFlowStepId\] = useState\(""\)/);
  assert.match(monitorShell, /const \[requestedToolMode, setRequestedToolMode\] = useState<ToolStudioModeRequest \| null>\(null\)/);
  assert.match(monitorShell, /const taskIntentItems = useMemo<TaskIntentItem\[\]>/);
  assert.match(monitorShell, /targetSection:\s*"tools"/);
  assert.match(monitorShell, /nextStep:\s*uiLanguage === "ko" \? "빌드 모드에서 Python 소스와 입력 스키마부터 선택합니다\."/);
  assert.match(monitorShell, /id: "source", label: "소스 선택", actionLabel: "툴 만들기", run: selectToolStep\("build", "source"\)/);
  assert.match(monitorShell, /id: "venv", label: "입력과 venv 확인", actionLabel: "파이썬 환경", run: selectToolStep\("environment", "venv"\)/);
  assert.match(monitorShell, /setRequestedToolMode\(\(previous\) => \(\{ mode, requestId: \(previous\?\.requestId \|\| 0\) \+ 1 \}\)\)/);
  assert.match(monitorShell, /openSection\("tools", \{ intentId: "build-tool", flowStepId \}\)/);
  assert.match(monitorShell, /id:\s*"build-tool"[\s\S]*?label:\s*uiLanguage === "ko" \? "툴 만들기"/);
  assert.match(monitorShell, /requestedMode=\{requestedToolMode\}/);
  assert.match(monitorShell, /data-task-intent=\{item\.id\}/);
  assert.match(monitorShell, /data-task-handoff=\{activeTaskIntent\.id\}/);
  assert.match(monitorShell, /data-task-flow-step=\{step\.id\}/);
  assert.match(monitorShell, /aria-current=\{step\.id === activeTaskFlowStep\?\.id \? "step" : undefined\}/);
  assert.match(monitorShell, /className="task-flow-rail"/);
  assert.match(monitorShell, /const primaryHomeIntent = useMemo/);
  assert.match(monitorShell, /taskIntentItems\.find\(\(item\) => item\.id === "build-tool"\)/);
  assert.match(monitorShell, /const primaryHomeFlowStep = useMemo/);
  assert.match(monitorShell, /primaryHomeIntent\.label/);
  assert.match(monitorShell, /primaryHomeIntent\.detail/);
  assert.doesNotMatch(monitorShell, /한 화면은 하나의 결정을 크게 보여줍니다/);
  assert.match(monitorShell, /className="home-focus-command"/);
  assert.match(monitorShell, /data-home-focus-command/);
  assert.match(monitorShell, /className="home-focus-card"/);
  assert.match(monitorShell, /data-home-focus-card=\{primaryHomeIntent\.id\}/);
  assert.match(monitorShell, /className="home-focus-flow"/);
  assert.match(monitorShell, /data-home-focus-primary/);
  assert.match(monitorShell, /className="home-navigation-dock"/);
  assert.match(monitorShell, /data-home-navigation-dock/);
  assert.match(monitorShell, /className="task-intent-icon"/);
  assert.match(monitorShell, /className="task-intent-action-cue"/);
  assert.match(monitorShell, /data-active-section=\{section\}/);
  assert.match(monitorShell, /!isPrimaryWorkSurface && section !== "overview" && \(/);
  assert.match(monitorShell, /taskIntentItems\.map\(\(item\) => \(\{/);
  assert.ok(focusCommandIndex > -1);
  assert.ok(taskIntentIndex > -1);
  assert.ok(statusRowIndex > -1);
  assert.ok(focusCommandIndex < taskIntentIndex);
  assert.ok(taskIntentIndex < statusRowIndex);
  assert.match(monitorShell, /group:\s*uiLanguage === "ko" \? "하고 싶은 일" : "Goal"/);
  assert.match(monitorShell, /placeholder=\{uiLanguage === "ko" \? "하고 싶은 일 검색: 툴, 에이전트, 실행, 파일, 설정"/);
  assert.match(css, /\.core-home-panel \{[\s\S]*?background: transparent;/);
  assert.match(css, /--surface-panel:/);
  assert.match(css, /--font-size-work-title:/);
  assert.match(css, /--line-height-tight:/);
  assert.match(css, /--line-accent:/);
  assert.match(css, /--focus-shadow:/);
  assert.match(css, /--font-weight-strong:/);
  assert.match(css, /\.home-focus-command \{[\s\S]*?grid-template-columns: minmax\(0, 0\.9fr\) minmax\(320px, 1\.1fr\);/);
  assert.match(css, /\.home-focus-command \{[\s\S]*?min-height: 252px;/);
  assert.match(css, /\.home-focus-command::before \{[\s\S]*?height: 3px;/);
  assert.match(css, /\.home-focus-copy h2 \{[\s\S]*?font-size: var\(--font-size-work-title\);/);
  assert.match(css, /\.home-focus-card \{[\s\S]*?box-shadow: var\(--focus-shadow\);/);
  assert.match(css, /\.home-focus-flow \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.home-focus-card button \{[\s\S]*?min-height: 48px;/);
  assert.match(css, /\.home-navigation-dock \{/);
  assert.match(css, /\.home-navigation-dock \.task-intent-grid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.home-navigation-dock \.workspace-home-actions\.task-intent-grid button \{[\s\S]*?min-height: 88px;/);
  assert.match(css, /\.task-intent-grid \{[\s\S]*?grid-template-columns: repeat\(auto-fit, minmax\(300px, 1fr\)\);/);
  assert.match(css, /\.workspace-home-actions\.task-intent-grid button \{[\s\S]*?grid-template-columns: 28px 30px minmax\(0, 1fr\) minmax\(34px, auto\) 28px;/);
  assert.match(css, /\.task-intent-icon,[\s\S]*?\.task-intent-action-cue \{/);
  assert.match(css, /\.workspace-home-actions\.task-intent-grid button:not\(:disabled\):active \{[\s\S]*?inset 0 2px 8px/);
  assert.match(css, /\.task-handoff-strip \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto auto;/);
  assert.match(css, /\.task-flow-rail \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.task-flow-rail button \{[\s\S]*?min-height: 44px;/);
  assert.match(css, /@media \(max-width: 960px\) \{[\s\S]*?\.home-focus-command,[\s\S]*?\.home-focus-flow,[\s\S]*?\.workspace-home-actions,/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.home-focus-copy h2 \{[\s\S]*?font-size: var\(--font-size-screen-title\);/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.workspace-home-actions\.task-intent-grid button \{[\s\S]*?grid-template-columns: 28px minmax\(0, 1fr\) 28px;/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.task-intent-icon \{[\s\S]*?display: none;/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.home-focus-flow li strong \{[\s\S]*?white-space: normal;/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.task-flow-rail \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(css, /\.desktop-viewport\[data-active-section="overview"\] \.titlebar-context-strip,[\s\S]*?\.desktop-viewport\[data-active-section="overview"\] \.titlebar-actions,[\s\S]*?\.desktop-viewport\[data-active-section="overview"\] > \.desktop-toolbar \{[\s\S]*?display: none;/);
  assert.match(css, /\.desktop-viewport\[data-active-section="overview"\] \.core-home-status-row \{[\s\S]*?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 420px\) \{[\s\S]*?\.activity-rail nav \{[\s\S]*?display: flex;[\s\S]*?overflow-x: auto;/);
  assert.doesNotMatch(css, /@media \(max-width: 420px\) \{[\s\S]*?\.activity-rail nav \{[\s\S]*?grid-template-columns: repeat\(5/);
});

test("Activity rail exposes readable destination labels in collapsed and mobile layouts", () => {
  assert.match(monitorShell, /<span>\{item\.shortLabel\}<\/span>/);
  assert.match(monitorShell, /aria-current=\{section === item\.id \? "page" : undefined\}/);
  assert.match(monitorShell, /aria-label=\{uiLanguage === "ko" \? "작업공간 홈" : "Workspace Home"\}/);
  assert.match(monitorShell, /aria-label=\{uiLanguage === "ko" \? "운영 센터 열기" : "Open Operator Center"\}/);
  assert.match(monitorShell, /aria-label=\{uiLanguage === "ko" \? "설정" : "Settings"\}/);
  assert.match(css, /\.desktop-app-shell \{[\s\S]*?grid-template-columns: 76px minmax\(0, 1fr\);/);
  assert.match(css, /\.activity-rail nav button \{[\s\S]*?display: grid;[\s\S]*?grid-template-rows: auto auto;[\s\S]*?min-height: 56px;/);
  assert.match(css, /\.activity-rail nav button span \{[\s\S]*?position: static;[\s\S]*?text-overflow: ellipsis;[\s\S]*?white-space: nowrap;/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.activity-rail nav button \{[\s\S]*?flex: 0 0 58px;[\s\S]*?min-height: 48px;/);
  assert.match(css, /@media \(max-width: 420px\) \{[\s\S]*?\.activity-rail nav button \{[\s\S]*?flex-basis: 58px;/);
});
