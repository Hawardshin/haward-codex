import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

const monitorShell = fs.readFileSync(path.join(projectRoot, "components", "MonitorShell.tsx"), "utf8");
const providerPanelSource = monitorShell.slice(
  monitorShell.indexOf("function ProviderAccountsPanel"),
  monitorShell.indexOf("function DesktopRuntimePanel")
);
const motionHelpers = fs.readFileSync(path.join(projectRoot, "lib", "motion.ts"), "utf8");
const operatorCenterDialog = fs.readFileSync(
  path.join(projectRoot, "components", "features", "OperatorCenterDialog.tsx"),
  "utf8"
);
const toolStudio = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "ToolStudioPanel.tsx"),
  "utf8"
);
const workspaceExplorerPane = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "WorkspaceExplorerPane.tsx"),
  "utf8"
);
const runtimeTerminalDrawer = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "RuntimeTerminalDrawer.tsx"),
  "utf8"
);
const nativeGitWorkbench = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "NativeGitWorkbench.tsx"),
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
const agentBuilderPanels = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "AgentBuilderPanels.tsx"),
  "utf8"
);
const agentDetailPanels = fs.readFileSync(
  path.join(projectRoot, "components", "workbench", "AgentDetailPanels.tsx"),
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
const sourceControlsSmoke = fs.readFileSync(
  path.join(projectRoot, "scripts", "check-source-controls-playwright.mjs"),
  "utf8"
);
const buttonResponseAudit = fs.readFileSync(
  path.join(projectRoot, "scripts", "audit-button-response.mjs"),
  "utf8"
);
const sectionSwitchAudit = fs.readFileSync(
  path.join(projectRoot, "scripts", "audit-section-switch-latency.mjs"),
  "utf8"
);
const lazyBoundaryCheck = fs.readFileSync(
  path.join(projectRoot, "scripts", "check-lazy-boundary-contract.mjs"),
  "utf8"
);
const historyPayloadCheck = fs.readFileSync(path.join(projectRoot, "scripts", "check-history-payload.mjs"), "utf8");
const adminHistoryHook = fs.readFileSync(path.join(projectRoot, "components", "history", "useAdminHistoryIndex.ts"), "utf8");
const tauriLib = fs.readFileSync(path.resolve(projectRoot, "..", "..", "src-tauri", "src", "lib.rs"), "utf8");
const tauriCargo = fs.readFileSync(path.resolve(projectRoot, "..", "..", "src-tauri", "Cargo.toml"), "utf8");
const css = fs.readFileSync(path.join(projectRoot, "app", "globals.css"), "utf8");
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf8"));

test("Tool Studio is a first-class monitor section", () => {
  assert.match(monitorShell, /\|\s*"tools"/);
  assert.match(monitorShell, /id:\s*"tools"[\s\S]*?label:\s*"툴 스튜디오"/);
  assert.match(monitorShell, /allowedSections:\s*\["overview", "agents", "desktop", "source", "intent"\]/);
  assert.match(monitorShell, /defaultPinnedSections:\s*SectionId\[\]\s*=\s*\["overview", "agents", "desktop", "source", "intent"\]/);
  assert.doesNotMatch(monitorShell, /hasLegacyDefault && !next\.includes\("tools"\)/);
  assert.doesNotMatch(monitorShell, /next\.splice\(insertAt, 0, "tools"\)/);
  assert.match(monitorShell, /tools:\s*"Studio"/);
  assert.match(monitorShell, /section === "tools"[\s\S]*?<MemoizedToolStudioPanel/);
  assert.match(monitorShell, /import type \{ ToolStudioMode, ToolStudioModeRequest, ToolStudioPanelProps \} from "@\/components\/workbench\/ToolStudioPanel"/);
  assert.match(monitorShell, /const ToolStudioPanel = dynamic<ToolStudioPanelProps>/);
  assert.match(monitorShell, /\(\) => import\("@\/components\/workbench\/ToolStudioPanel"\)\.then\(\(module\) => module\.ToolStudioPanel\)/);
  assert.match(monitorShell, /const MemoizedToolStudioPanel = memo\(ToolStudioPanel\)/);
  assert.match(toolStudio, /export type ToolStudioPanelProps = \{/);
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
  assert.match(monitorShell, /<ActionGroup className="titlebar-actions"[\s\S]*?density="compact"[\s\S]*?>/);
  assert.match(monitorShell, /<ActionGroup className="task-handoff-actions"[\s\S]*?align="end" density="compact">/);
  assert.match(monitorShell, /<Button variant="secondary" size="sm" onClick=\{\(\) => setCommandPaletteOpen\(false\)\}>/);
  assert.match(monitorShell, /<Button key=\{item\.id\} variant="ghost" className="command-palette-result" onClick=\{\(\) => runCommandItem\(item\)\}>/);
  assert.match(toolStudio, /import \{ ActionGroup \} from "@\/components\/ui\/ActionGroup"/);
  assert.match(toolStudio, /<ActionGroup className="tool-studio-actions"[\s\S]*?align="end" density="compact">/);
  assert.match(css, /\.ui-action-group \{[\s\S]*?display: inline-flex;/);
  assert.match(css, /\.ui-action-group-compact \{[\s\S]*?gap: 6px;/);
  assert.match(css, /\.task-handoff-strip \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto;/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-studio-actions \{[\s\S]*?width: 100%;/);
});

test("Runtime text defaults expose selectable choices", () => {
  assert.match(runtimeTerminalDrawer, /export type RuntimeTextChoice/);
  assert.match(runtimeTerminalDrawer, /sessionPromptChoices\?: RuntimeTextChoice\[\]/);
  assert.match(runtimeTerminalDrawer, /workingDirOptions\?: RuntimeTextChoice\[\]/);
  assert.match(runtimeTerminalDrawer, /runtime-text-choice-grid/);
  assert.match(runtimeTerminalDrawer, /onSessionPromptChange\(choice\.value\)/);
  assert.match(runtimeTerminalDrawer, /onWorkingDirChange\(choice\.value\)/);
  assert.match(monitorShell, /RuntimeTextChoice/);
  assert.match(monitorShell, /const sessionPromptChoices = useMemo<RuntimeTextChoice\[\]>/);
  assert.match(monitorShell, /const workingDirOptions = useMemo<RuntimeTextChoice\[\]>/);
  assert.match(monitorShell, /const taskPipePromptChoices = useMemo<RuntimeTextChoice\[\]>/);
  assert.match(monitorShell, /sessionPromptChoices=\{sessionPromptChoices\}/);
  assert.match(monitorShell, /workingDirOptions=\{workingDirOptions\}/);
  assert.match(monitorShell, /setTaskPipePrompt\(choice\.value\)/);
  assert.match(css, /\.runtime-text-choice-grid \{/);
  assert.match(css, /--choice-bg:/);
  assert.match(css, /--choice-shadow:/);
  assert.match(css, /--choice-active-shadow:/);
  assert.match(css, /\.runtime-text-choice-grid\.compact button \{[\s\S]*?min-height: 44px;/);
  assert.match(css, /\.task-pipe-controls \.task-prompt-choice-field/);
});

test("Desktop Runtime exposes an open-source-informed Agent CLI cockpit", () => {
  assert.match(monitorShell, /data-agent-cli-cockpit="open-source-control-plane"/);
  assert.match(monitorShell, /Agent CLI Cockpit/);
  assert.match(monitorShell, /openSourceControlPlanePatterns/);
  assert.match(monitorShell, /CAO/);
  assert.match(monitorShell, /Agentify/);
  assert.match(monitorShell, /ClawX \/ OpenLoaf/);
  assert.match(monitorShell, /agentCliCockpitRows = adapters\.map/);
  assert.match(monitorShell, /providerAuthStatusForAdapter\(adapter\.adapterId, providerCredentialReport, uiLanguage\)/);
  assert.match(monitorShell, /startAdapterFromCockpit/);
  assert.match(monitorShell, /agent-cli-cockpit-tally/);
  assert.match(monitorShell, /agent-cli-cockpit-grid/);
  assert.match(monitorShell, /agent-cli-cockpit-signals/);
  assert.match(monitorShell, /row\.activeAdapterSessions\.length/);
  assert.match(monitorShell, /row\.adapterTaskRuns\.length/);
  assert.match(monitorShell, /row\.adapterDecisionItems/);
  assert.match(css, /\.agent-cli-cockpit \{/);
  assert.match(css, /\.agent-cli-pattern-strip \{/);
  assert.match(css, /\.agent-cli-cockpit-grid \{/);
  assert.match(css, /\.agent-cli-cockpit-card\.selected/);
  assert.match(css, /\.agent-cli-cockpit-actions button:disabled/);
});

test("Search agent provider and model settings use explicit choices", () => {
  assert.match(monitorShell, /const modelChoiceOptions = useMemo/);
  assert.match(monitorShell, /agent-provider-choice-grid/);
  assert.match(monitorShell, /agent-model-choice-grid/);
  assert.match(monitorShell, /onClick=\{\(\) => onChange\("providerId", provider\.providerId\)\}/);
  assert.match(monitorShell, /onClick=\{\(\) => onChange\("model", choice\.value\)\}/);
  assert.doesNotMatch(monitorShell, /<datalist id="search-agent-model-options">/);
  assert.doesNotMatch(monitorShell, /list="search-agent-model-options"/);
  assert.match(css, /\.agent-provider-choice-grid,/);
  assert.match(css, /\.agent-model-choice-grid button\.active/);
  assert.match(css, /\.agent-provider-choice-grid button,[\s\S]*?box-shadow: var\(--control-shadow\);/);
});

test("Provider account settings expose guided login and model setup controls", () => {
  assert.match(monitorShell, /AI 로그인 설정/);
  assert.match(monitorShell, /provider-login-guide/);
  assert.match(monitorShell, /provider-filter-choice/);
  assert.match(monitorShell, /ProviderActionFeedback/);
  assert.match(monitorShell, /actionFeedback=\{providerActionFeedback\}/);
  assert.match(providerPanelSource, /feedbackBadge/);
  assert.match(providerPanelSource, /provider-button-status/);
  assert.match(providerPanelSource, /provider-action-live-region/);
  assert.match(providerPanelSource, /has-provider-status/);
  assert.match(monitorShell, /onRefreshModels\(provider\.providerId\)/);
  assert.match(monitorShell, /onUseProvider\(provider, preferredModel\)/);
  assert.match(css, /\.provider-login-guide \{/);
  assert.match(css, /\.provider-filter-choice button\.active,/);
  assert.match(css, /\.provider-model-strip \{/);
  assert.match(css, /\.provider-model-chip-list button\.active/);
  assert.match(css, /\.provider-button-status \{[\s\S]*?position: absolute;/);
  assert.match(css, /\.provider-action-live-region \{[\s\S]*?position: absolute;[\s\S]*?width: 1px;/);
  assert.doesNotMatch(providerPanelSource, /\{error && <p className="desktop-error">\{error\}<\/p>\}/);
  assert.doesNotMatch(providerPanelSource, /\{notice && <p className="decision-resume-notice">\{notice\}<\/p>\}/);
});

test("Choice and search controls have compact tonal hierarchy", () => {
  assert.match(css, /\.settings-segment-list \{[\s\S]*?display: flex;/);
  assert.match(css, /\.settings-segment-list button \{[\s\S]*?min-width: 104px;[\s\S]*?min-height: var\(--control-compact-target-size\);/);
  assert.match(css, /\.settings-option-list button,[\s\S]*?background: var\(--choice-bg\);[\s\S]*?box-shadow: var\(--choice-shadow\);/);
  assert.match(css, /\.settings-option-list button\.active,[\s\S]*?background: var\(--choice-selected-bg\);[\s\S]*?box-shadow: var\(--choice-active-shadow\);/);
  assert.match(css, /\.command-palette-results button \{[\s\S]*?min-height: 52px;/);
  assert.match(css, /\.search-box,[\s\S]*?box-shadow: var\(--search-shadow\);/);
  assert.match(css, /\.quick-start-flow button,[\s\S]*?min-height: 64px;/);
  assert.match(css, /\.desktop-command-grid button \{[\s\S]*?min-height: 66px;/);
});

test("Workspace monitor encodes theory-backed desktop visual hierarchy tokens", () => {
  assert.match(monitorShell, /data-ui-foundation="gestalt-hierarchy-density"/);
  assert.match(css, /--grid-unit: 4px;/);
  assert.match(css, /--space-4: 16px;/);
  assert.match(css, /--surface-depth-focus:/);
  assert.match(css, /--surface-depth-selected:/);
  assert.match(css, /--hierarchy-border:/);
  assert.match(css, /--state-hover-surface:/);
  assert.match(css, /--focus-halo-size: 4px;/);
  assert.match(css, /--font-size-lg: 1\.0625rem;/);
  assert.match(css, /\.desktop-app-root :where\(button, a, input, textarea, \[role="button"\], \[role="tab"\], \[tabindex\]\):focus-visible \{[\s\S]*?box-shadow: 0 0 0 var\(--focus-halo-size\) var\(--focus-halo\);/);
  assert.match(css, /\.ui-button:hover:not\(:disabled\) \{[\s\S]*?background: var\(--state-hover-surface\);/);
  assert.match(css, /\.desktop-app-root :where\([\s\S]*?\.settings-dialog,[\s\S]*?\.adapter-card,[\s\S]*?\.home-navigation-dock[\s\S]*?\) \{[\s\S]*?box-shadow: var\(--surface-shadow-low\), var\(--hairline-shadow\);/);
  assert.match(css, /\.settings-tab-list button:hover:not\(:disabled\):not\(\.active\) \{[\s\S]*?background: var\(--state-hover-surface\);/);
  assert.match(css, /\.task-flow-rail button:hover:not\(:disabled\) \{[\s\S]*?border-color: var\(--state-hover-border\);/);
  assert.match(css, /@media \(hover: hover\) \{[\s\S]*?\.desktop-app-root button:not\(:disabled\):hover \{[\s\S]*?border-color: var\(--state-hover-border\);/);
});

test("Desktop titlebar uses native Tauri drag regions without stealing controls", () => {
  assert.match(monitorShell, /<header className="desktop-titlebar" data-tauri-drag-region="deep">/);
  assert.match(monitorShell, /className="titlebar-section" data-tauri-drag-region="deep"/);
  assert.match(monitorShell, /<ActionGroup className="titlebar-actions"[\s\S]*?data-tauri-drag-region="false"/);
  assert.match(monitorShell, /className="titlebar-search" data-tauri-drag-region="false"/);
  assert.match(css, /\.desktop-titlebar \{[\s\S]*?-webkit-app-region: drag;/);
  assert.match(css, /\.titlebar-actions,[\s\S]*?\.titlebar-search,[\s\S]*?-webkit-app-region: no-drag;/);
});

test("Workspace monitor replaces native select dropdowns with styled app choices", () => {
  assert.doesNotMatch(monitorShell, /<select\b/);
  assert.match(monitorShell, /function AppChoiceMenu/);
  assert.match(monitorShell, /function AppChoiceButtonGroup/);
  assert.match(monitorShell, /document-filter-choice/);
  assert.match(monitorShell, /history-date-choice/);
  assert.match(agentBuilderPanels, /learning-action-choice-grid/);
  assert.match(monitorShell, /decision-answer-type-choices/);
  assert.match(css, /\.app-choice-menu-trigger \{/);
  assert.match(css, /\.app-choice-button-group button\.active \{/);
  assert.match(css, /\.decision-answer-controls > button \{/);
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

test("Monitor section switches prewarm heavy surfaces and preserve source editor state", () => {
  assert.doesNotMatch(monitorShell, /const \[readySection, setReadySection\] = useState<SectionId>/);
  assert.match(monitorShell, /const titlebarSectionLabelRef = useRef<HTMLElement>\(null\)/);
  assert.doesNotMatch(monitorShell, /const pendingSectionCommitRef = useRef<\(\(\) => void\) \| null>\(null\)/);
  assert.match(monitorShell, /const prewarmWorkSurfaces = \(\) => \{/);
  assert.match(monitorShell, /void import\("@monaco-editor\/react"\)/);
  assert.match(monitorShell, /void import\("@\/components\/workbench\/AgentCollaborationScene"\)/);
  assert.match(monitorShell, /preloadToolStudioPanel\(\)/);
  assert.match(monitorShell, /preloadDesktopRuntimePanels\(\)/);
  assert.match(monitorShell, /preloadHomeFeaturePanels\(\)/);
  assert.match(monitorShell, /preloadAgentDetailPanels\(\)/);
  assert.match(monitorShell, /preloadAgentBuilderPanels\(\)/);
  assert.match(monitorShell, /void preloadAdminHistoryIndex\(\)/);
  assert.match(monitorShell, /const primeSectionActivation = useCallback\(\(targetSection: SectionId\) => \{/);
  assert.match(monitorShell, /viewport\?\.setAttribute\("data-active-section", targetSection\)/);
  assert.match(monitorShell, /viewport\?\.setAttribute\("data-section-content-ready", "true"\)/);
  assert.match(monitorShell, /element\.classList\.toggle\("active", isTarget\)/);
  assert.match(monitorShell, /titlebarSectionLabelRef\.current\.textContent = target\.label/);
  assert.match(monitorShell, /onPointerDown=\{\(\) => primeSectionActivation\(item\.id\)\}/);
  assert.doesNotMatch(monitorShell, /pendingSectionCommitRef\.current\?\.\(\)/);
  assert.doesNotMatch(monitorShell, /pendingSectionCommitRef\.current = scheduleAfterFirstPaint\(\(\) => \{/);
  assert.doesNotMatch(monitorShell, /scheduleAfterFirstPaint\(\(\) => setReadySection\(section\)\)/);
  assert.match(monitorShell, /const \[buttonFeedbackReady, setButtonFeedbackReady\] = useState\(false\)/);
  assert.match(monitorShell, /setButtonFeedbackReady\(true\)/);
  assert.match(monitorShell, /const sectionContentReady = buttonFeedbackReady/);
  assert.match(monitorShell, /data-section-content-ready=\{sectionContentReady \? "true" : "false"\}/);
  assert.match(monitorShell, /const maxResidentSectionPanels = 5/);
  assert.match(monitorShell, /const retainedResidentSections: SectionId\[\] = \["source"\]/);
  assert.match(monitorShell, /const nonRetainedResidentSections: SectionId\[\] = \["overview"\]/);
  assert.match(monitorShell, /const startupResidentPreloadSections: SectionId\[\] = \["agents", "desktop", "source", "tools", "overview"\]/);
  assert.match(monitorShell, /function normalizeResidentSectionIds\(candidates: SectionId\[\], activeSection: SectionId\)/);
  assert.match(monitorShell, /candidate !== activeSection && nonRetained\.has\(candidate\)/);
  assert.match(monitorShell, /const residentStartupPreloadDoneRef = useRef\(false\)/);
  assert.match(monitorShell, /const \[residentSectionIds, setResidentSectionIds\] = useState<SectionId\[\]>/);
  assert.match(monitorShell, /normalizeResidentSectionIds\(\[targetSection, \.\.\.current\], targetSection\)/);
  assert.match(monitorShell, /const preloadResidentPanels = \(\) => \{/);
  assert.match(monitorShell, /normalizeResidentSectionIds\(\[\.\.\.preloadSections, \.\.\.current\], section\)/);
  assert.match(monitorShell, /idleWindow\.requestIdleCallback\(preloadResidentPanels, \{ timeout: 900 \}\)/);
  assert.doesNotMatch(monitorShell, /const residentSectionMountPlan = useMemo\(\(\) => \{/);
  assert.doesNotMatch(monitorShell, /mountNextResidentSection/);
  assert.doesNotMatch(monitorShell, /requestIdleCallback\(mountNextResidentSection/);
  assert.match(monitorShell, /data-resident-section-count=\{residentSectionIds\.length\}/);
  assert.match(monitorShell, /data-resident-section-limit=\{maxResidentSectionPanels\}/);
  assert.doesNotMatch(monitorShell, /data-section-transition-shell/);
  assert.match(monitorShell, /const sourceQuery = section === "source" \? normalizedQuery : ""/);
  assert.match(monitorShell, /function MountedSectionPanel/);
  assert.match(monitorShell, /<MountedSectionPanel id="overview" active=\{section === "overview"\}>/);
  assert.match(monitorShell, /<MountedSectionPanel id="desktop" active=\{section === "desktop"\}>/);
  assert.match(monitorShell, /<MountedSectionPanel id="tools" active=\{section === "tools"\}>/);
  assert.match(monitorShell, /<MountedSectionPanel id="source" active=\{section === "source"\}>/);
  assert.match(monitorShell, /<MountedSectionPanel id="agents" active=\{section === "agents"\}>/);
  assert.match(monitorShell, /const MemoizedToolStudioPanel = memo\(ToolStudioPanel\)/);
  assert.match(monitorShell, /function preloadToolStudioPanel\(\) \{/);
  assert.match(monitorShell, /const WorkspaceExplorerPane = dynamic<WorkspaceExplorerPaneProps>/);
  assert.match(monitorShell, /const NativeGitWorkbench = dynamic<NativeGitWorkbenchProps>/);
  assert.match(monitorShell, /const RuntimeTerminalDrawer = dynamic<RuntimeTerminalDrawerProps>/);
  assert.match(monitorShell, /function preloadDesktopRuntimePanels\(\) \{[\s\S]*?WorkspaceExplorerPane[\s\S]*?NativeGitWorkbench[\s\S]*?RuntimeTerminalDrawer/);
  assert.match(monitorShell, /const OperatorCenterDialog = dynamic<OperatorCenterDialogProps>/);
  assert.match(monitorShell, /const ProductFeatureArchitecturePanel = dynamic<ProductFeatureArchitecturePanelProps>/);
  assert.match(monitorShell, /const CoreFeatureDrilldown = dynamic<CoreFeatureDrilldownProps>/);
  assert.match(monitorShell, /function preloadHomeFeaturePanels\(\) \{[\s\S]*?OperatorCenterDialog[\s\S]*?ProductFeatureArchitecturePanel[\s\S]*?CoreFeatureDrilldown/);
  assert.match(monitorShell, /const AgentCollaborationBoardPanel = dynamic<AgentCollaborationBoardPanelProps>/);
  assert.match(monitorShell, /const AgentInventoryPanel = dynamic<AgentInventoryPanelProps>/);
  assert.match(monitorShell, /const AgentRuntimeOverviewPanel = dynamic<AgentRuntimeOverviewPanelProps>/);
  assert.match(monitorShell, /const AgentCoreBlueprintPanel = dynamic<AgentCoreBlueprintPanelProps>/);
  assert.match(monitorShell, /const AgentFactoryWizard = dynamic<AgentFactoryWizardProps>/);
  assert.match(monitorShell, /const LearningFeedbackLoopPanel = dynamic<LearningFeedbackLoopPanelProps>/);
  assert.match(monitorShell, /function preloadAgentDetailPanels\(\) \{[\s\S]*?AgentDetailPanels/);
  assert.match(monitorShell, /function preloadAgentBuilderPanels\(\) \{[\s\S]*?AgentBuilderPanels/);
  assert.match(agentDetailPanels, /export function AgentCollaborationBoardPanel/);
  assert.match(agentDetailPanels, /export function AgentInventoryPanel/);
  assert.match(agentDetailPanels, /export function AgentRuntimeOverviewPanel/);
  assert.match(agentBuilderPanels, /export function AgentCoreBlueprintPanel/);
  assert.match(agentBuilderPanels, /export function AgentFactoryWizard/);
  assert.match(agentBuilderPanels, /export function LearningFeedbackLoopPanel/);
  assert.doesNotMatch(monitorShell, /function AgentCollaborationBoard\(/);
  assert.doesNotMatch(monitorShell, /function AgentInventory\(/);
  assert.doesNotMatch(monitorShell, /function AgentCoreBlueprintPanel\(/);
  assert.doesNotMatch(monitorShell, /function AgentFactoryWizard\(/);
  assert.doesNotMatch(monitorShell, /function LearningFeedbackLoopPanel\(/);
  assert.match(monitorShell, /<MemoizedToolStudioPanel/);
  assert.match(monitorShell, /const openAgentsSection = useCallback\(\(\) => \{/);
  assert.match(monitorShell, /const openSourceSection = useCallback\(\(\) => \{/);
  assert.match(monitorShell, /const openProviderSettings = useCallback\(\(\) => \{/);
  assert.match(monitorShell, /onOpenAgents=\{openAgentsSection\}/);
  assert.match(monitorShell, /onOpenSource=\{openSourceSection\}/);
  assert.match(monitorShell, /onOpenProviderSettings=\{openProviderSettings\}/);
  assert.match(monitorShell, /const MemoizedDesktopRuntimePanel = memo\(DesktopRuntimePanel\)/);
  assert.match(monitorShell, /<MemoizedDesktopRuntimePanel/);
  assert.match(monitorShell, /const consumeRuntimeLaunchRequest = useCallback\(\(\) => \{/);
  assert.match(monitorShell, /const openExecutionSettings = useCallback/);
  assert.match(monitorShell, /launchRequest=\{section === "desktop" \? runtimeLaunchRequest : null\}/);
  assert.match(monitorShell, /onLaunchRequestConsumed=\{consumeRuntimeLaunchRequest\}/);
  assert.match(monitorShell, /onOpenSettings=\{openExecutionSettings\}/);
  assert.match(monitorShell, /surfaceActive=\{section === "source"\}/);
  assert.match(monitorShell, /if \(!surfaceActive \|\| !launchRequest/);
  assert.doesNotMatch(monitorShell, /\{sectionContentReady && section === "desktop" && \(/);
  assert.doesNotMatch(monitorShell, /\{sectionContentReady && section === "tools" && \(/);
  assert.doesNotMatch(monitorShell, /\{sectionContentReady && section === "agents" && \(/);
  assert.match(css, /\.mounted-section-panel \{\s+contain: layout paint style;/);
  assert.match(css, /\.mounted-section-panel\[hidden\]/);
  assert.match(css, /\.section-transition-shell \{/);
});

test("Monitor enforces lazy workbench boundaries and long-task performance telemetry", () => {
  assert.match(packageJson.scripts.check, /check-lazy-boundary-contract\.mjs/);
  assert.equal(packageJson.scripts["check:lazy-boundaries"], "node scripts/check-lazy-boundary-contract.mjs");
  assert.equal(packageJson.scripts["perf:sections:repeat"], "node scripts/audit-section-switch-latency.mjs --runs=3");
  assert.match(lazyBoundaryCheck, /lazyBoundaryTargets/);
  assert.match(lazyBoundaryCheck, /MonitorShell must type-only import/);
  assert.match(lazyBoundaryCheck, /MonitorShell must dynamic import/);
  assert.match(lazyBoundaryCheck, /MonitorShell must keep an explicit preload path/);
  assert.match(lazyBoundaryCheck, /void\\\\s\+import/);
  for (const modulePath of [
    "@/components/features/OperatorCenterDialog",
    "@/components/features/ProductFeatureArchitecturePanel",
    "@/components/workbench/CoreFeatureDrilldown",
    "@/components/workbench/WorkspaceExplorerPane",
    "@/components/workbench/NativeGitWorkbench",
    "@/components/workbench/RuntimeTerminalDrawer",
    "@/components/workbench/ToolStudioPanel",
    "@/components/workbench/AgentDetailPanels",
    "@/components/workbench/AgentBuilderPanels"
  ]) {
    assert.match(lazyBoundaryCheck, new RegExp(modulePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(sectionSwitchAudit, /parsePositiveIntegerArg\("--runs", 1\)/);
  assert.match(sectionSwitchAudit, /PerformanceObserver/);
  assert.match(sectionSwitchAudit, /supportedEntryTypes\?\.includes\("longtask"\)/);
  assert.match(sectionSwitchAudit, /__workspaceMonitorLongTasks/);
  assert.match(sectionSwitchAudit, /longTaskMaxMs/);
  assert.match(sectionSwitchAudit, /longTaskTotalP95Ms/);
  assert.match(sectionSwitchAudit, /sectionStats/);
});

test("Desktop source workbench prepares native OS workspace resources", () => {
  assert.match(monitorShell, /type WorkspaceResourcePrepareReport = \{/);
  assert.match(monitorShell, /type WorkspaceResourceWarmupReport = \{/);
  assert.match(monitorShell, /type DesktopResourceSnapshotReport = \{/);
  assert.match(monitorShell, /const \[workspaceResourceReport, setWorkspaceResourceReport\] = useState<WorkspaceResourcePrepareReport \| null>\(null\)/);
  assert.match(monitorShell, /const \[workspaceWarmupReport, setWorkspaceWarmupReport\] = useState<WorkspaceResourceWarmupReport \| null>\(null\)/);
  assert.match(monitorShell, /const \[desktopResourceSnapshot, setDesktopResourceSnapshot\] = useState<DesktopResourceSnapshotReport \| null>\(null\)/);
  assert.match(monitorShell, /const workspaceWarmupPollRef = useRef<number \| null>\(null\)/);
  assert.match(monitorShell, /const SOURCE_DRAFT_UI_SYNC_MS = 180/);
  assert.match(monitorShell, /const sourceDraftRef = useRef\(""\)/);
  assert.match(monitorShell, /const sourceDraftSyncTimerRef = useRef<number \| null>\(null\)/);
  assert.match(monitorShell, /const \[workspaceResourceBusy, setWorkspaceResourceBusy\] = useState\(false\)/);
  assert.match(monitorShell, /const warmWorkspaceOsResources = async/);
  assert.match(monitorShell, /"warm_workspace_os_resources"/);
  assert.match(monitorShell, /scheduleWorkspaceWarmupPoll/);
  assert.match(monitorShell, /const prepareWorkspaceOsResources = async/);
  assert.match(monitorShell, /"prepare_workspace_os_resources"/);
  assert.match(monitorShell, /const refreshDesktopResourceSnapshot = async/);
  assert.match(monitorShell, /"get_desktop_resource_snapshot"/);
  assert.match(monitorShell, /preloadContents: true/);
  assert.match(monitorShell, /forceRefresh: Boolean\(options\.forceRefresh\)/);
  assert.match(monitorShell, /setWorkspaceResourceReport\(report\)/);
  assert.match(monitorShell, /setRuntimeSourceFiles\(report\.catalog\.files\)/);
  assert.match(monitorShell, /setSourceCatalogReport\(report\.catalog\)/);
  assert.match(monitorShell, /workspaceResourceReport \? "native cache"/);
  assert.match(monitorShell, /OS 캐시/);
  assert.match(monitorShell, /메모리 예산/);
  assert.match(monitorShell, /앱 RAM\/CPU/);
  assert.match(monitorShell, /desktopResourceSnapshot\.processMemoryBytes/);
  assert.match(monitorShell, /desktopResourceSnapshot\.processCpuUsage\.toFixed\(1\)/);
  assert.match(monitorShell, /native warming/);
  assert.match(monitorShell, /formatBytes\(workspaceResourceReport\.cachedBytes\)/);
  assert.match(monitorShell, /workspaceWarmupReport\.cachedBytes/);
  assert.match(monitorShell, /await prepareWorkspaceOsResources\(\{ forceRefresh: true \}\)/);
  assert.match(monitorShell, /void warmWorkspaceOsResources\(\{ forceRefresh: true \}\)/);
  assert.match(monitorShell, /memoryBudgetBytes: number/);
  assert.match(monitorShell, /parallelWorkers: number/);
  assert.match(monitorShell, /CPU 병렬/);
  assert.match(monitorShell, /preloadStrategy/);
  assert.match(monitorShell, /scanDurationMs \+ workspaceResourceReport\.preloadDurationMs/);
  assert.match(tauriCargo, /rayon = "1\.12\.0"/);
  assert.match(tauriCargo, /sysinfo = \{ version = "0\.39\.3", default-features = false, features = \["system"\] \}/);
  assert.match(tauriLib, /use rayon::prelude::\*/);
  assert.match(tauriLib, /use sysinfo::\{get_current_pid, ProcessRefreshKind, ProcessesToUpdate, System\}/);
  assert.match(tauriLib, /DesktopResourceSnapshotReport/);
  assert.match(tauriLib, /get_desktop_resource_snapshot/);
  assert.match(tauriLib, /process_memory_bytes/);
  assert.match(tauriLib, /process_cpu_usage/);
  assert.match(tauriLib, /WorkspaceResourceSnapshotCache/);
  assert.match(tauriLib, /WorkspaceResourceProfile/);
  assert.match(tauriLib, /rayon_parallel_cpu_ram_budget/);
  assert.match(tauriLib, /MAX_WORKSPACE_PRELOAD_WORKERS/);
  assert.match(tauriLib, /build_workspace_thread_pool/);
  assert.match(tauriLib, /selected[\s\S]*?par_iter\(\)[\s\S]*?filter_map\(read_workspace_preload_candidate\)/);
  assert.match(monitorShell, /onChange=\{\(value\) => updateSourceDraft\(value \?\? "", \{ immediate: false \}\)\}/);
  assert.match(monitorShell, /currentEditorDraftContent\(\)/);
  assert.match(monitorShell, /effectiveSourceDrafts\(\)/);
  assert.match(collector, /MAX_SOURCE_PREVIEW_CHARS = 1200/);
  assert.match(collector, /previewBytes: Buffer\.byteLength\(preview, "utf8"\)/);
  assert.doesNotMatch(collector, /content: preview/);
});

test("Workspace monitor sidebar and source editor defaults avoid clipped editing controls", () => {
  assert.match(monitorShell, /fontSize: 13/);
  assert.match(monitorShell, /minimap: \{ enabled: false \}/);
  assert.match(monitorShell, /wordWrap: "on"/);
  assert.match(monitorShell, /const \[sourceWordWrap, setSourceWordWrap\] = useState\(true\)/);
  assert.match(monitorShell, /const \[sourceMinimapEnabled, setSourceMinimapEnabled\] = useState\(false\)/);
  assert.match(monitorShell, /className="source-editor-primary-actions"/);
  assert.match(css, /\.desktop-app-shell\.sidebar-expanded \{[\s\S]*?grid-template-columns: 148px minmax\(0, 1fr\);/);
  assert.match(css, /\.desktop-app-shell\.sidebar-expanded \.activity-rail button \{[\s\S]*?width: 132px;/);
  assert.match(css, /\.source-editor-primary-actions \{/);
  assert.match(css, /\.filesystem-workbench \.native-source-controls \{[\s\S]*?minmax\(420px, 1\.45fr\);/);
  assert.match(css, /\.filesystem-workbench \.native-source-controls \.source-editor-action-group \{[\s\S]*?grid-column: auto;/);
  assert.match(css, /\.monaco-editor-shell \{[\s\S]*?height: clamp\(420px, 64dvh, 720px\);/);
});

test("Source workbench replaces native select and command buttons with app primitives", () => {
  assert.equal(packageJson.scripts["smoke:source-controls"], "node scripts/check-source-controls-playwright.mjs");
  assert.match(monitorShell, /from "@radix-ui\/react-dropdown-menu"/);
  assert.match(monitorShell, /ChevronDown/);
  assert.match(monitorShell, /<DropdownMenu\.Root>/);
  assert.match(monitorShell, /className="source-file-picker-trigger"/);
  assert.match(monitorShell, /className="source-file-picker-menu"/);
  assert.doesNotMatch(monitorShell, /<select[\s\S]*?value=\{selectedSourcePath\}/);
  assert.match(monitorShell, /<ActionGroup className="source-editor-action-group"[\s\S]*?density="compact">/);
  assert.match(monitorShell, /<Button variant="primary" className="source-action-button primary"/);
  assert.match(monitorShell, /<ActionGroup className="source-command-toolbar"[\s\S]*?asToolbar/);
  assert.match(monitorShell, /className=\{`source-tool-button toggle \$\{sourceWordWrap \? "active" : ""\}`\}/);
  assert.match(monitorShell, /<Button[\s\S]*?role="tab"[\s\S]*?aria-selected=\{sourceWorkbenchView === "editor"\}/);
  assert.match(workspaceExplorerPane, /import \{ ActionGroup \} from "@\/components\/ui\/ActionGroup"/);
  assert.match(workspaceExplorerPane, /import \{ Button \} from "@\/components\/ui\/Button"/);
  assert.match(workspaceExplorerPane, /<Button[\s\S]*?variant="outline"[\s\S]*?className="workspace-dropzone"/);
  assert.match(workspaceExplorerPane, /<ActionGroup className="workspace-explorer-actions"[\s\S]*?direction="column"/);
  assert.match(css, /\.source-file-picker-menu \{/);
  assert.match(css, /\.source-file-picker-item\[data-highlighted\]/);
  assert.match(css, /\.source-editor-action-group \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(104px, 1fr\)\);/);
  assert.match(sourceControlsSmoke, /workspace-monitor-source-controls-/);
  assert.match(sourceControlsSmoke, /sourceSelectCount,\s*0/);
  assert.match(sourceControlsSmoke, /await trigger\.click\(\)/);
  assert.match(sourceControlsSmoke, /source_controls_playwright_ok/);
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
  assert.match(motionHelpers, /data-button-feedback-ready", "true"/);
  assert.match(buttonResponseAudit, /data-button-feedback-ready/);
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
  assert.match(monitorShell, /from "@\/components\/history\/useAdminHistoryIndex"/);
  assert.match(monitorShell, /useAdminHistoryIndex\(snapshot, section\)/);
  assert.doesNotMatch(monitorShell, /function mergeDocuments\(/);
  assert.doesNotMatch(monitorShell, /function fetchAdminHistoryIndex\(/);
  assert.match(adminHistoryHook, /let cachedAdminHistoryIndex: WorkspaceAdminHistoryIndex \| null = null;/);
  assert.match(adminHistoryHook, /let adminHistoryIndexPromise: Promise<WorkspaceAdminHistoryIndex> \| null = null;/);
  assert.match(adminHistoryHook, /window\.requestIdleCallback\(load, \{ timeout: 5000 \}\)/);
  assert.match(adminHistoryHook, /new URL\("admin-history-index\.json", window\.location\.href\)/);
  assert.match(adminHistoryHook, /관리자용 기록/);
});

test("History admin loading is split into a local cached hook", () => {
  assert.match(adminHistoryHook, /export function useAdminHistoryIndex\(snapshot: WorkspaceSnapshot, section: string\)/);
  assert.match(adminHistoryHook, /function loadAdminHistoryIndex\(controller: AbortController \| null\)/);
  assert.match(adminHistoryHook, /function buildHistoryDaysFromDocuments/);
  assert.match(adminHistoryHook, /function adminHistoryStatusText/);
  assert.match(monitorShell, /const \{ documents: monitorDocuments, historyDays: monitorHistoryDays, statusText: adminHistoryStatusText \}/);
});

test("Operator Center and task run copy localize high-visibility Korean UI", () => {
  assert.match(monitorShell, /<OperatorCenterDialog[\s\S]*?language=\{uiLanguage\}/);
  assert.match(operatorCenterDialog, /aria-label=\{ko \? "운영 센터" : "Operator Center"\}/);
  assert.match(operatorCenterDialog, /운영 도구는 주 작업면과 분리됩니다/);
  assert.match(operatorCenterDialog, /\$\{section\.shortLabel\} 열기/);
  assert.match(monitorShell, /질문 자동 보류는 초기화 설정에서만 바꿉니다/);
  assert.match(monitorShell, /로그 열기/);
  assert.match(monitorShell, /제한된 표준 출력\/오류 미리보기와 실행 기록 JSON/);
  assert.match(monitorShell, /label="기록 날짜"/);
  assert.match(monitorShell, /label="기록 문서"/);
  assert.match(monitorShell, /작업 기록과 모니터링 신호/);
  assert.match(monitorShell, /모든 기록 유형/);
  assert.match(monitorShell, /작업 실행 저장소/);
  assert.match(monitorShell, /CLI 실행 경로/);
  assert.match(monitorShell, /공개 배포 차단 요소/);
  assert.match(toolStudioData, /표준 출력\/오류와 작업 실행 기록/);
  assert.match(toolStudio, /빠른 작업 메뉴/);
  assert.match(toolStudio, /가상 환경 생성/);
  assert.match(nativeGitWorkbench, /보관 항목을 선택하세요/);
  assert.match(runtimeTerminalDrawer, /구조화된 터미널 이벤트/);
  assert.doesNotMatch(monitorShell, /히스토리와 모니터링 통합 stream/);
  assert.doesNotMatch(monitorShell, /task-run store에/);
  assert.doesNotMatch(monitorShell, /decision inbox로/);
  assert.doesNotMatch(monitorShell, /CLI lane으로|CLI lane,|CLI lane 실행|CLI lane을/);
  assert.doesNotMatch(monitorShell, /blocker나|배포 blocker/);
  assert.doesNotMatch(monitorShell, /Tauri runtime이|native 런타임|필터와 snapshot/);
  assert.doesNotMatch(toolStudio, /빠른 액션 메뉴|Smoke 실행|workflow 복사|Registry 반영/);
  assert.doesNotMatch(nativeGitWorkbench, /Stash를 선택하세요|선택 Stash|전체 Stash|pathspec/);
});

test("Operator history surfaces keep timeline documents in bounded scroll panes", () => {
  assert.equal(packageJson.scripts["audit:surfaces"], "node scripts/audit-monitor-surfaces.mjs");
  assert.match(surfaceAudit, /const operatorSections = \[/);
  assert.match(surfaceAudit, /desktop:\$\{section\}/);
  assert.doesNotMatch(surfaceAudit, /mobile:history/);
  assert.match(surfaceAudit, /viewport: "1280x800"/);
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
  assert.match(agentBuilderPanels, /type AgentCoreCapabilityOption = \{/);
  assert.match(agentBuilderPanels, /const agentCoreCapabilityOptions: AgentCoreCapabilityOption\[\] = \[/);
  assert.match(agentBuilderPanels, /id:\s*"runtime"[\s\S]*?id:\s*"memory"[\s\S]*?id:\s*"gateway"[\s\S]*?id:\s*"browser"[\s\S]*?id:\s*"code_interpreter"[\s\S]*?id:\s*"identity"[\s\S]*?id:\s*"policy"[\s\S]*?id:\s*"observability"[\s\S]*?id:\s*"evaluation"/);
  assert.match(agentBuilderPanels, /resourceKo:\s*"런타임"[\s\S]*?resourceKo:\s*"메모리"[\s\S]*?resourceKo:\s*"게이트웨이"[\s\S]*?resourceKo:\s*"기본 제공 도구"/);
  assert.match(agentBuilderPanels, /const agentCoreResourceLifecycleSteps = \[/);
  assert.match(monitorShell, /selectedCapabilityIds: string\[\] = blueprint\.capabilities/);
  assert.match(monitorShell, /selectedCapabilities\.map\(\(item\) => item\.localCapability\)/);
  assert.match(agentBuilderPanels, /const \[selectedCapabilityIds, setSelectedCapabilityIds\] = useState<string\[\]>\(defaultCapabilityIds\)/);
  assert.match(agentBuilderPanels, /data-agentcore-capability=\{option\.id\}/);
  assert.match(agentBuilderPanels, /aria-pressed=\{selected\}/);
  assert.match(agentBuilderPanels, /data-agentcore-select-all/);
  assert.match(agentBuilderPanels, /className="agentcore-resource-topology"/);
  assert.match(agentBuilderPanels, /data-agentcore-resource=\{option\.id\}/);
  assert.match(agentBuilderPanels, /option\.localCapability/);
  assert.match(agentBuilderPanels, /onApplyBlueprint\(selectedBlueprint\.id, selectedCapabilityIds\)/);
  assert.match(agentBuilderPanels, /onStartPreflight\(selectedBlueprint\.id, selectedCapabilityIds\)/);
  assert.match(agentBuilderPanels, /onCreateProposal\(selectedBlueprint\.id, selectedCapabilityIds\)/);
  assert.match(css, /\.agentcore-capability-grid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.agentcore-resource-grid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.agentcore-resource-lifecycle \{[\s\S]*?grid-template-columns: repeat\(5, minmax\(0, 1fr\)\);/);
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
  assert.match(monitorShell, /id: "venv", label: "입력과 가상 환경 확인", actionLabel: "파이썬 환경", run: selectToolStep\("environment", "venv"\)/);
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
  assert.match(css, /\.home-focus-card \{[\s\S]*?background: var\(--surface-depth-focus\);[\s\S]*?box-shadow: var\(--surface-shadow-medium\), var\(--hairline-shadow\);/);
  assert.match(css, /\.home-focus-flow \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.home-focus-card button \{[\s\S]*?min-height: 48px;/);
  assert.match(css, /\.home-navigation-dock \{/);
  assert.match(css, /\.home-navigation-dock \.task-intent-grid \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.home-navigation-dock \.workspace-home-actions\.task-intent-grid button \{[\s\S]*?min-height: 88px;/);
  assert.match(css, /\.task-intent-grid \{[\s\S]*?grid-template-columns: repeat\(auto-fit, minmax\(300px, 1fr\)\);/);
  assert.match(css, /\.workspace-home-actions\.task-intent-grid button \{[\s\S]*?grid-template-columns: 28px 30px minmax\(0, 1fr\) minmax\(34px, auto\) 28px;/);
  assert.match(css, /\.task-intent-icon,[\s\S]*?\.task-intent-action-cue \{/);
  assert.match(css, /\.workspace-home-actions\.task-intent-grid button:not\(:disabled\):active \{[\s\S]*?inset 0 2px 8px/);
  assert.match(css, /\.task-handoff-strip \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto;/);
  assert.match(css, /\.task-flow-rail \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.task-flow-rail button \{[\s\S]*?min-height: 44px;/);
  assert.match(css, /@media \(max-width: 960px\) \{[\s\S]*?\.home-focus-command,[\s\S]*?\.home-focus-flow,[\s\S]*?\.workspace-home-actions,/);
});

test("Activity rail exposes readable destination labels in the desktop shell", () => {
  assert.match(monitorShell, /<span>\{item\.shortLabel\}<\/span>/);
  assert.match(monitorShell, /aria-current=\{section === item\.id \? "page" : undefined\}/);
  assert.match(monitorShell, /aria-label=\{uiLanguage === "ko" \? "작업공간 홈" : "Workspace Home"\}/);
  assert.match(monitorShell, /aria-label=\{uiLanguage === "ko" \? "운영 센터 열기" : "Open Operator Center"\}/);
  assert.match(monitorShell, /aria-label=\{uiLanguage === "ko" \? "설정" : "Settings"\}/);
  assert.match(css, /--desktop-app-min-width: 1280px;/);
  assert.match(css, /--desktop-app-min-height: 800px;/);
  assert.match(css, /\.desktop-app-shell \{[\s\S]*?grid-template-columns: 76px minmax\(0, 1fr\);/);
  assert.match(css, /\.desktop-app-shell \{[\s\S]*?min-width: var\(--desktop-app-min-width\);/);
  assert.match(css, /\.activity-rail nav button \{[\s\S]*?display: grid;[\s\S]*?grid-template-rows: auto auto;[\s\S]*?min-height: 56px;/);
  assert.match(css, /\.activity-rail nav button span \{[\s\S]*?position: static;[\s\S]*?text-overflow: ellipsis;[\s\S]*?white-space: nowrap;/);
  assert.doesNotMatch(css, /@media \(pointer: coarse\)/);
  assert.doesNotMatch(css, /@media \(max-width: 720px\)/);
  assert.doesNotMatch(css, /@media \(max-width: 420px\)/);
});
