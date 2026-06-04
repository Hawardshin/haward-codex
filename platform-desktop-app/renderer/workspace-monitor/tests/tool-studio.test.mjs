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
  assert.match(toolStudio, /export type ToolStudioMode = "build" \| "environment" \| "deploy" \| "registry"/);
  assert.match(toolStudio, /export type ToolStudioModeRequest = \{[\s\S]*?mode: ToolStudioMode;[\s\S]*?requestId: number;/);
  assert.match(toolStudio, /requestedMode\?: ToolStudioModeRequest \| null/);
  assert.match(toolStudio, /if \(requestedMode\) \{[\s\S]*?selectMode\(requestedMode\.mode\);/);
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

test("Monitor section switches stage heavy content after first paint", () => {
  assert.match(monitorShell, /const \[readySection, setReadySection\] = useState<SectionId>/);
  assert.match(monitorShell, /const titlebarSectionLabelRef = useRef<HTMLElement>\(null\)/);
  assert.match(monitorShell, /const pendingSectionCommitRef = useRef<\(\(\) => void\) \| null>\(null\)/);
  assert.match(monitorShell, /const primeSectionActivation = useCallback\(\(targetSection: SectionId\) => \{/);
  assert.match(monitorShell, /viewport\?\.setAttribute\("data-active-section", targetSection\)/);
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

test("Tool Studio build mode exposes a dedicated tool builder workbench", () => {
  assert.match(toolStudio, /type ToolBuilderBlueprint = \{/);
  assert.match(toolStudio, /const toolBuilderBlueprints: ToolBuilderBlueprint\[\] = \[/);
  assert.match(toolStudio, /id:\s*"python-cli-tool"[\s\S]*?id:\s*"mcp-wrapper-tool"[\s\S]*?id:\s*"automation-tool"/);
  assert.match(toolStudio, /const \[selectedBlueprintId, setSelectedBlueprintId\] = useState/);
  assert.match(toolStudio, /className="tool-builder-workbench"/);
  assert.match(toolStudio, /data-tool-builder-blueprint=\{blueprint\.id\}/);
  assert.match(toolStudio, /data-tool-builder-manifest/);
  assert.match(toolStudio, /data-tool-builder-command="run"/);
  assert.match(toolStudio, /data-tool-builder-command="package"/);
  assert.match(toolStudio, /data-tool-builder-action="source"/);
  assert.match(toolStudio, /data-tool-builder-action="smoke"/);
  assert.match(toolStudio, /data-tool-builder-action="package"/);
  assert.match(toolStudio, /data-tool-builder-action="copy"/);
  assert.match(toolStudio, /writeClipboardText\(JSON\.stringify/);
  assert.match(css, /\.tool-builder-blueprints \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-builder-canvas \{[\s\S]*?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.tool-builder-actions \{[\s\S]*?grid-template-columns: repeat\(4, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 860px\) \{[\s\S]*?\.tool-builder-blueprints,[\s\S]*?\.tool-builder-canvas,[\s\S]*?\.tool-builder-actions,/);
});

test("Tool Studio environment mode exposes a Python execution workbench", () => {
  assert.match(toolStudio, /type PythonEnvironmentProfile = \{/);
  assert.match(toolStudio, /type VirtualEnvironmentLifecycleStep = \{/);
  assert.match(toolStudio, /const pythonEnvironmentProfiles: PythonEnvironmentProfile\[\] = \[/);
  assert.match(toolStudio, /const virtualEnvironmentLifecycleSteps: VirtualEnvironmentLifecycleStep\[\] = \[/);
  assert.match(toolStudio, /id:\s*"local-venv"[\s\S]*?id:\s*"isolated-runner"[\s\S]*?id:\s*"agent-sandbox"/);
  assert.match(toolStudio, /id:\s*"create"[\s\S]*?id:\s*"activate"[\s\S]*?id:\s*"install"[\s\S]*?id:\s*"freeze"[\s\S]*?id:\s*"rebuild"/);
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
  assert.match(toolStudio, /type ToolDeployTarget = \{/);
  assert.match(toolStudio, /const toolDeployTargets: ToolDeployTarget\[\] = \[/);
  assert.match(toolStudio, /id:\s*"local-registry"[\s\S]*?id:\s*"agentcore-gateway"[\s\S]*?id:\s*"desktop-bundle"/);
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
  assert.match(monitorShell, /data-active-section=\{section\}/);
  assert.match(monitorShell, /!isPrimaryWorkSurface && section !== "overview" && \(/);
  assert.match(monitorShell, /taskIntentItems\.map\(\(item\) => \(\{/);
  assert.ok(taskIntentIndex > -1);
  assert.ok(statusRowIndex > -1);
  assert.ok(taskIntentIndex < statusRowIndex);
  assert.match(monitorShell, /group:\s*uiLanguage === "ko" \? "하고 싶은 일" : "Goal"/);
  assert.match(monitorShell, /placeholder=\{uiLanguage === "ko" \? "하고 싶은 일 검색: 툴, 에이전트, 실행, 파일, 설정"/);
  assert.match(css, /\.task-intent-grid \{[\s\S]*?grid-template-columns: repeat\(auto-fit, minmax\(300px, 1fr\)\);/);
  assert.match(css, /\.workspace-home-actions\.task-intent-grid button \{[\s\S]*?grid-template-columns: auto auto minmax\(0, 1fr\) auto;/);
  assert.match(css, /\.task-handoff-strip \{[\s\S]*?grid-template-columns: auto minmax\(0, 1fr\) auto auto;/);
  assert.match(css, /\.task-flow-rail \{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\);/);
  assert.match(css, /\.task-flow-rail button \{[\s\S]*?min-height: 44px;/);
  assert.match(css, /@media \(max-width: 720px\) \{[\s\S]*?\.task-flow-rail \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/);
  assert.match(css, /\.desktop-viewport\[data-active-section="overview"\] \.titlebar-context-strip,[\s\S]*?\.desktop-viewport\[data-active-section="overview"\] \.titlebar-actions,[\s\S]*?\.desktop-viewport\[data-active-section="overview"\] > \.desktop-toolbar \{[\s\S]*?display: none;/);
  assert.match(css, /\.desktop-viewport\[data-active-section="overview"\] \.core-home-status-row \{[\s\S]*?grid-template-columns: repeat\(2, minmax\(0, 1fr\)\);/);
  assert.match(css, /@media \(max-width: 420px\) \{[\s\S]*?\.activity-rail nav \{[\s\S]*?display: flex;[\s\S]*?overflow-x: auto;/);
  assert.doesNotMatch(css, /@media \(max-width: 420px\) \{[\s\S]*?\.activity-rail nav \{[\s\S]*?grid-template-columns: repeat\(5/);
});
