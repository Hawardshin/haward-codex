import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const monitorShellPath = path.join(projectRoot, "components", "MonitorShell.tsx");
const sourceTemplatePath = path.join(
  projectRoot,
  "components",
  "workbench",
  "source-editor",
  "sourceTemplates.ts"
);
const sourceEditorIndexPath = path.join(projectRoot, "components", "workbench", "source-editor", "index.ts");
const sourceEditorCatalogPath = path.join(projectRoot, "components", "workbench", "source-editor", "sourceCatalog.ts");
const sourceEditorDraftActionsPath = path.join(
  projectRoot,
  "components",
  "workbench",
  "source-editor",
  "sourceDraftActions.ts"
);
const sourceEditorDocumentsPath = path.join(
  projectRoot,
  "components",
  "workbench",
  "source-editor",
  "sourceDocuments.ts"
);
const sourceEditorMonacoPath = path.join(projectRoot, "components", "workbench", "source-editor", "monacoConfig.ts");
const sourceEditorDraftsPath = path.join(projectRoot, "components", "workbench", "source-editor", "sourceDrafts.ts");
const sourceEditorDiffPath = path.join(projectRoot, "components", "workbench", "source-editor", "sourceDiff.ts");
const sourceEditorLanguagePath = path.join(projectRoot, "components", "workbench", "source-editor", "sourceLanguage.ts");
const sourceEditorLoadRequestsPath = path.join(
  projectRoot,
  "components",
  "workbench",
  "source-editor",
  "useSourceLoadRequestGate.ts"
);
const sourceEditorSessionPath = path.join(
  projectRoot,
  "components",
  "workbench",
  "source-editor",
  "useSourceEditorSession.ts"
);
const sourceWorkbenchControllerPath = path.join(
  projectRoot,
  "components",
  "workbench",
  "source-editor",
  "useSourceWorkbenchController.ts"
);
const sourceWorkbenchPanelPath = path.join(
  projectRoot,
  "components",
  "workbench",
  "source-editor",
  "SourceWorkbenchPanel.tsx"
);
const sourceWorkbenchVisualComponentNames = [
  "SourceCommandToolbar.tsx",
  "SourceEditorFrame.tsx",
  "SourceEditorTabs.tsx",
  "SourceFileBrowser.tsx",
  "SourceFileControls.tsx",
  "SourceSaveResultsPanel.tsx",
  "SourceWorkbenchHeader.tsx",
  "SourceWorkbenchSwitcher.tsx",
  "SourceWorkspaceStatusStrip.tsx"
];
const monitorShell = fs.readFileSync(monitorShellPath, "utf8");
const sourceTemplates = fs.readFileSync(sourceTemplatePath, "utf8");
const sourceEditorIndex = fs.readFileSync(sourceEditorIndexPath, "utf8");
const sourceEditorCatalog = fs.readFileSync(sourceEditorCatalogPath, "utf8");
const sourceEditorDraftActions = fs.readFileSync(sourceEditorDraftActionsPath, "utf8");
const sourceEditorDocuments = fs.readFileSync(sourceEditorDocumentsPath, "utf8");
const sourceEditorMonaco = fs.readFileSync(sourceEditorMonacoPath, "utf8");
const sourceEditorDrafts = fs.readFileSync(sourceEditorDraftsPath, "utf8");
const sourceEditorDiff = fs.readFileSync(sourceEditorDiffPath, "utf8");
const sourceEditorLanguage = fs.readFileSync(sourceEditorLanguagePath, "utf8");
const sourceEditorLoadRequests = fs.readFileSync(sourceEditorLoadRequestsPath, "utf8");
const sourceEditorSession = fs.readFileSync(sourceEditorSessionPath, "utf8");
const sourceWorkbenchController = fs.readFileSync(sourceWorkbenchControllerPath, "utf8");
const sourceWorkbenchPanel = fs.readFileSync(sourceWorkbenchPanelPath, "utf8");
const sourceWorkbenchVisualSource = [
  sourceWorkbenchPanel,
  ...sourceWorkbenchVisualComponentNames.map((fileName) =>
    fs.readFileSync(path.join(projectRoot, "components", "workbench", "source-editor", fileName), "utf8")
  )
].join("\n");

test("source editor templates live outside MonitorShell", () => {
  assert.match(
    monitorShell,
    /from "@\/components\/workbench\/source-editor"/,
    "MonitorShell should import source editor helpers from the source editor module"
  );
  assert.doesNotMatch(
    monitorShell,
    /const sourceTemplates:\s*SourceTemplate\[\]/,
    "MonitorShell should not own the source template catalog"
  );
  assert.doesNotMatch(
    monitorShell,
    /function sourceEditorProfileForPath/,
    "MonitorShell should not own source editor profile routing"
  );
});

test("source editor template module exposes profile routing and template helpers", () => {
  assert.match(sourceTemplates, /export type SourceTemplateId/);
  assert.match(sourceTemplates, /export const sourceTemplates:\s*SourceTemplate\[\]/);
  assert.match(sourceTemplates, /export const sourceTemplateById/);
  assert.match(sourceTemplates, /export function sourceEditorProfileForPath/);
  assert.match(sourceTemplates, /export function renderSourceTemplate/);
  assert.match(sourceTemplates, /export function appendSourceTemplate/);

  for (const templateId of [
    "requirement-row",
    "spec-section",
    "validation-record",
    "tauri-command",
    "agent-config",
    "decision-inbox-item"
  ]) {
    assert.match(sourceTemplates, new RegExp(`id: "${templateId}"`), `missing ${templateId} template`);
  }
});

test("source editor Monaco configuration lives outside MonitorShell", () => {
  assert.match(sourceEditorIndex, /export \* from "\.\/monacoConfig"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/SourceWorkbenchPanel"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/SourceEditorFrame"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/SourceFileControls"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/SourceSaveResultsPanel"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/sourceWorkbenchTypes"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/sourceCatalog"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/sourceDraftActions"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/sourceDocuments"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/sourceDrafts"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/sourceDiff"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/sourceLanguage"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/sourceTemplates"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/useSourceEditorSession"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/useSourceWorkbenchController"/);
  assert.match(sourceEditorIndex, /export \* from "\.\/useSourceLoadRequestGate"/);
  assert.match(sourceEditorMonaco, /export const monacoEditorOptions/);
  assert.match(sourceEditorMonaco, /export const monacoDiffEditorOptions/);
  assert.match(sourceEditorMonaco, /export const platformMonacoTheme/);
  assert.match(sourceEditorMonaco, /export const definePlatformMonacoTheme/);
  assert.doesNotMatch(
    monitorShell,
    /const monacoEditorOptions:\s*editor\.IStandaloneEditorConstructionOptions/,
    "MonitorShell should not own Monaco editor options"
  );
  assert.doesNotMatch(
    monitorShell,
    /const definePlatformMonacoTheme/,
    "MonitorShell should not own Monaco theme registration"
  );
});

test("source workbench visual panel lives outside MonitorShell", () => {
  assert.match(sourceWorkbenchPanel, /export function SourceWorkbenchPanel/);
  assert.match(sourceWorkbenchPanel, /<SourceWorkspaceStatusStrip/);
  assert.match(sourceWorkbenchPanel, /<SourceFileControls/);
  assert.match(sourceWorkbenchPanel, /<SourceEditorFrame/);
  assert.match(sourceWorkbenchVisualSource, /@monaco-editor\/react/);
  assert.match(sourceWorkbenchVisualSource, /const MonacoEditor = dynamic/);
  assert.match(sourceWorkbenchVisualSource, /const MonacoDiffEditor = dynamic/);
  assert.match(sourceWorkbenchVisualSource, /className="source-file-picker-trigger"/);
  assert.match(sourceWorkbenchVisualSource, /className="source-command-toolbar"/);
  assert.match(sourceWorkbenchVisualSource, /className="source-editor-tabs"/);
  assert.match(sourceWorkbenchVisualSource, /className="source-save-results source-results-panel"/);
  assert.match(sourceWorkbenchVisualSource, /native-workspace-state-strip/);
  assert.match(monitorShell, /<SourceWorkbenchPanel/);
  assert.doesNotMatch(
    sourceWorkbenchPanel,
    /const Monaco(Editor|DiffEditor) = dynamic/,
    "SourceWorkbenchPanel should compose the editor frame instead of owning Monaco dynamic components"
  );
  assert.doesNotMatch(
    monitorShell,
    /className="source-command-toolbar"/,
    "MonitorShell should not own source editor toolbar JSX"
  );
  assert.doesNotMatch(
    monitorShell,
    /const Monaco(Editor|DiffEditor) = dynamic/,
    "MonitorShell should not own Monaco dynamic editor components"
  );
});

test("source editor session state lives outside MonitorShell", () => {
  assert.match(sourceEditorSession, /export function useSourceEditorSession/);
  assert.match(sourceEditorSession, /const sourceEditorRef = useRef<editor\.IStandaloneCodeEditor \| null>\(null\)/);
  assert.match(sourceEditorSession, /const sourceDraftRef = useRef\(""\)/);
  assert.match(sourceEditorSession, /const activeSourcePathRef = useRef\(""\)/);
  assert.match(sourceEditorSession, /const sourceDraftSyncTimerRef = useRef<number \| null>\(null\)/);
  assert.match(sourceEditorSession, /const applySourceEditorVisibleState = useCallback/);
  assert.match(sourceEditorSession, /const updateSourceDraft = useCallback/);
  assert.match(sourceEditorSession, /buildEffectiveSourceDrafts\(sourceDrafts, sourceFile, currentEditorDraftContent\(\)\)/);
  assert.match(sourceEditorSession, /return \(\) => clearSourceDraftSyncTimer\(\)/);
  assert.match(monitorShell, /useSourceEditorSession\(\{/);
  assert.match(sourceWorkbenchController, /getActiveSourcePath\(\)/);
  assert.match(sourceWorkbenchController, /setVisibleSourceDraftContent\(saveResult\.sourceDraft\)/);
  assert.doesNotMatch(
    monitorShell,
    /const sourceEditorRef = useRef<editor\.IStandaloneCodeEditor \| null>\(null\)/,
    "MonitorShell should not own the Monaco editor instance ref"
  );
  assert.doesNotMatch(
    monitorShell,
    /const sourceDraftSyncTimerRef = useRef<number \| null>\(null\)/,
    "MonitorShell should not own the source draft sync timer"
  );
  assert.doesNotMatch(
    monitorShell,
    /const updateSourceDraft = \(nextContent: string/,
    "MonitorShell should not own source draft sync scheduling"
  );
  assert.doesNotMatch(
    monitorShell,
    /const currentEditorDraftContent = \(\) =>/,
    "MonitorShell should not own current editor draft reads"
  );
});

test("source load request gate lives outside MonitorShell", () => {
  assert.match(sourceEditorLoadRequests, /export function useSourceLoadRequestGate/);
  assert.match(sourceEditorLoadRequests, /const requestSeqRef = useRef\(0\)/);
  assert.match(sourceEditorLoadRequests, /const beginSourceLoadRequest = useCallback/);
  assert.match(sourceEditorLoadRequests, /const cancelPendingSourceLoad = useCallback/);
  assert.match(sourceEditorLoadRequests, /return \(\) => requestSeqRef\.current === requestSeq/);
  assert.match(monitorShell, /useSourceLoadRequestGate\(\)/);
  assert.match(sourceWorkbenchController, /const isCurrentSourceLoad = beginSourceLoadRequest\(\)/);
  assert.match(sourceWorkbenchController, /cancelPendingSourceLoad\(\)/);
  assert.doesNotMatch(
    monitorShell,
    /const sourceLoadRequestSeqRef = useRef\(0\)/,
    "MonitorShell should not own the source load request sequence ref"
  );
  assert.doesNotMatch(
    monitorShell,
    /const requestSeq = sourceLoadRequestSeqRef\.current \+ 1/,
    "MonitorShell should not own source load request sequence mutation"
  );
});

test("source editor generated documents live outside MonitorShell", () => {
  assert.match(sourceEditorDocuments, /export function renderAgentsMdStarter/);
  assert.match(sourceEditorDocuments, /export function formatSourceDiffLine/);
  assert.match(sourceEditorDocuments, /export function buildSourcePatchContext/);
  assert.match(sourceEditorDocuments, /# Repository Instructions/);
  assert.match(sourceEditorDocuments, /Platform Source Patch Context/);
  assert.match(sourceEditorDocuments, /workspace-scoped backup on save/);
  assert.match(sourceWorkbenchController, /renderAgentsMdStarter\(workspaceExplorerRootLabel\)/);
  assert.match(sourceWorkbenchController, /buildSourcePatchContext\(\{/);
  assert.doesNotMatch(
    monitorShell,
    /"# Repository Instructions"/,
    "MonitorShell should not own the AGENTS.md starter document"
  );
  assert.doesNotMatch(
    monitorShell,
    /"Platform Source Patch Context"/,
    "MonitorShell should not own the source patch context document"
  );
  assert.doesNotMatch(
    monitorShell,
    /const diffLine = sourceDiff/,
    "MonitorShell should not format source diff text inline"
  );
});

test("source catalog filtering lives outside MonitorShell", () => {
  assert.match(sourceEditorCatalog, /export function selectSourceCatalogFiles/);
  assert.match(sourceEditorCatalog, /export function findAgentsInstructionPath/);
  assert.match(sourceEditorCatalog, /export function sourceCatalogLabelFor/);
  assert.match(sourceEditorCatalog, /export function listEditableSourceFiles/);
  assert.match(sourceEditorCatalog, /export function filterEditableSourceFiles/);
  assert.match(sourceEditorCatalog, /export function findSelectedSourceFileOption/);
  assert.match(sourceEditorCatalog, /export function workspaceExplorerRootLabelFor/);
  assert.match(monitorShell, /selectSourceCatalogFiles\(runtimeSourceFiles, sourceFiles\)/);
  assert.match(monitorShell, /findAgentsInstructionPath\(sourceCatalogFiles\)/);
  assert.match(monitorShell, /sourceCatalogLabelFor\(Boolean\(workspaceResourceReport\), runtimeSourceFiles\.length > 0\)/);
  assert.match(monitorShell, /listEditableSourceFiles\(shouldPrepareSourceWorkspace, sourceCatalogFiles\)/);
  assert.match(monitorShell, /filterEditableSourceFiles\(shouldPrepareSourceWorkspace, editableSourceFiles, deferredSourceFilter\)/);
  assert.match(monitorShell, /findSelectedSourceFileOption\(filteredEditableSourceFiles, sourceCatalogFiles, selectedSourcePath\)/);
  assert.match(monitorShell, /workspaceExplorerRootLabelFor\(desktopWorkspace\)/);
  assert.doesNotMatch(
    monitorShell,
    /sourceCatalogFiles\.find\(\(file\) => file\.path === "AGENTS\.md"\)/,
    "MonitorShell should not own AGENTS.md source path selection"
  );
  assert.doesNotMatch(
    monitorShell,
    /sourceCatalogFiles\.filter\(\(file\) => !file\.truncated\)/,
    "MonitorShell should not own editable source file filtering"
  );
  assert.doesNotMatch(
    monitorShell,
    /\[file\.path, file\.project, file\.language, file\.extension\]/,
    "MonitorShell should not own source search haystack fields"
  );
});

test("source editor language mapping lives outside MonitorShell", () => {
  assert.match(sourceEditorLanguage, /export function monacoLanguageFromPath/);
  assert.match(sourceEditorLanguage, /ts:\s*"typescript"/);
  assert.match(sourceEditorLanguage, /tsx:\s*"typescript"/);
  assert.match(sourceEditorLanguage, /rs:\s*"rust"/);
  assert.match(sourceEditorLanguage, /return monacoLanguageByExtension\[extension\] \|\| "plaintext"/);
  assert.doesNotMatch(
    monitorShell,
    /function monacoLanguageFromPath/,
    "MonitorShell should not own Monaco language mapping"
  );
});

test("source editor diff calculation lives outside MonitorShell", () => {
  assert.match(sourceEditorDiff, /export function buildSourceDiffSummary/);
  assert.match(sourceEditorDiff, /addedLines \+= 1/);
  assert.match(sourceEditorDiff, /removedLines \+= 1/);
  assert.match(sourceEditorDiff, /changedLines \+= 1/);
  assert.doesNotMatch(
    monitorShell,
    /function buildSourceDiffSummary/,
    "MonitorShell should not own source diff calculation"
  );
});

test("source editor draft state transitions live outside MonitorShell", () => {
  assert.match(sourceEditorDrafts, /export function isSourceDraftEntryDirty/);
  assert.match(sourceEditorDrafts, /export function listOpenSourceDraftEntries/);
  assert.match(sourceEditorDrafts, /export function listDirtySourceDraftEntries/);
  assert.match(sourceEditorDrafts, /export function buildDirtySourcePathSet/);
  assert.match(sourceEditorDrafts, /export function findCurrentSourceDraftEntry/);
  assert.match(sourceEditorDrafts, /export function isCurrentSourceDraftDirty/);
  assert.match(sourceEditorDrafts, /export function createSourceDraftEntry/);
  assert.match(sourceEditorDrafts, /export function upsertSourceDraftContent/);
  assert.match(sourceEditorDrafts, /export function buildEffectiveSourceDrafts/);
  assert.match(sourceEditorDrafts, /export function removeSourceDraftByPath/);
  assert.match(sourceEditorDrafts, /export function applySourceDraftSaveReport/);
  assert.match(sourceEditorDrafts, /export function upsertSavedSourceDraft/);
  assert.match(sourceEditorDrafts, /export function mergeSourceSaveReports/);
  assert.match(monitorShell, /listOpenSourceDraftEntries\(sourceDrafts\)/);
  assert.match(monitorShell, /listDirtySourceDraftEntries\(openDraftEntries\)/);
  assert.match(monitorShell, /buildDirtySourcePathSet\(dirtyDraftEntries\)/);
  assert.match(monitorShell, /findCurrentSourceDraftEntry\(sourceDrafts, sourceFile\)/);
  assert.match(monitorShell, /isCurrentSourceDraftDirty\(currentDraftEntry, sourceFile, sourceDraft\)/);
  assert.match(sourceEditorSession, /upsertSourceDraftContent\(current, draftFile, nextContent\)/);
  assert.match(sourceEditorSession, /buildEffectiveSourceDrafts\(sourceDrafts, sourceFile, currentEditorDraftContent\(\)\)/);
  assert.match(sourceWorkbenchController, /const draftSnapshot = effectiveSourceDrafts\(\)/);
  assert.doesNotMatch(
    monitorShell,
    /const nextEntry: SourceDraftEntry = \{/,
    "MonitorShell should not construct source draft entries inline"
  );
  assert.doesNotMatch(
    monitorShell,
    /loadedAt: new Date\(\)\.toISOString\(\)/,
    "MonitorShell should not own draft loadedAt creation"
  );
  assert.doesNotMatch(
    monitorShell,
    /Object\.values\(sourceDrafts\)\.sort/,
    "MonitorShell should not own draft entry ordering"
  );
  assert.doesNotMatch(
    monitorShell,
    /entry\.content !== entry\.baseContent/,
    "MonitorShell should not own dirty draft detection"
  );
  assert.doesNotMatch(
    monitorShell,
    /current\.filter\(\(item\) => !reportsToAdd\.some/,
    "MonitorShell should not own save report list dedupe"
  );
});

test("source editor action transitions live outside MonitorShell", () => {
  assert.match(sourceEditorDraftActions, /export type SourceWorkbenchView/);
  assert.match(sourceEditorDraftActions, /export type SourceEditorVisibleState/);
  assert.match(sourceEditorDraftActions, /export function sourceTextFileFromDraftEntry/);
  assert.match(sourceEditorDraftActions, /export function sourceWriteReportFromDraftEntry/);
  assert.match(sourceEditorDraftActions, /export function buildOpenSourceFileState/);
  assert.match(sourceEditorDraftActions, /export function buildSelectSourceDraftState/);
  assert.match(sourceEditorDraftActions, /export function buildSourceFileSaveResult/);
  assert.match(sourceEditorDraftActions, /export function buildSourceFileSaveDrafts/);
  assert.match(sourceEditorDraftActions, /export function buildSaveAllSourceDraftResult/);
  assert.match(sourceEditorDraftActions, /export function buildRevertedCurrentDraftState/);
  assert.match(sourceEditorDraftActions, /export function buildCloseSourceDraftResult/);
  assert.match(sourceEditorDraftActions, /export function mergeSavedSourceReports/);
  assert.match(sourceWorkbenchController, /applySourceEditorVisibleState\(visibleState\)/);
  assert.match(sourceWorkbenchController, /buildOpenSourceFileState\(nextFile\)/);
  assert.match(sourceWorkbenchController, /buildSelectSourceDraftState\(entry\)/);
  assert.match(sourceWorkbenchController, /buildSourceFileSaveResult\(\{/);
  assert.match(sourceWorkbenchController, /buildSourceFileSaveDrafts\(current, \{/);
  assert.match(sourceWorkbenchController, /buildSaveAllSourceDraftResult\(\{/);
  assert.match(sourceWorkbenchController, /buildRevertedCurrentDraftState\(sourceDrafts, sourceFile, currentDraftEntry\)/);
  assert.match(sourceWorkbenchController, /buildCloseSourceDraftResult\(\{/);
  assert.doesNotMatch(
    monitorShell,
    /setSourceFile\(\{\s*relativePath: entry\.relativePath/s,
    "MonitorShell should not build selected draft file state inline"
  );
  assert.doesNotMatch(
    monitorShell,
    /nextDrafts\[entry\.relativePath\] = applySourceDraftSaveReport/,
    "MonitorShell should not own save-all draft transition details"
  );
  assert.doesNotMatch(
    monitorShell,
    /setSourceDrafts\(\(current\) => removeSourceDraftByPath/,
    "MonitorShell should not own close-draft map removal"
  );
});

test("source workbench controller owns native source handlers outside MonitorShell", () => {
  assert.match(sourceWorkbenchController, /export function useSourceWorkbenchController/);
  assert.match(sourceWorkbenchController, /read_workspace_text_file/);
  assert.match(sourceWorkbenchController, /write_workspace_text_file/);
  assert.match(sourceWorkbenchController, /renderAgentsMdStarter/);
  assert.match(sourceWorkbenchController, /buildSourceFileSaveResult/);
  assert.match(sourceWorkbenchController, /buildSaveAllSourceDraftResult/);
  assert.match(sourceWorkbenchController, /buildCloseSourceDraftResult/);
  assert.match(sourceWorkbenchController, /const runSourceEditorCommand = useCallback/);
  assert.match(sourceWorkbenchController, /const insertSourceTemplate = useCallback/);
  assert.match(sourceWorkbenchController, /const copySourcePatchContext = useCallback/);
  assert.match(sourceWorkbenchController, /const saveSourceFile = useCallback/);
  assert.match(sourceWorkbenchController, /const saveAllSourceDrafts = useCallback/);
  assert.match(monitorShell, /useSourceWorkbenchController\(\{/);
  assert.doesNotMatch(
    monitorShell,
    /const loadSourceFileByPath = async/,
    "MonitorShell should not own native source load handlers"
  );
  assert.doesNotMatch(
    monitorShell,
    /const saveSourceFile = async/,
    "MonitorShell should not own native source save handlers"
  );
  assert.doesNotMatch(
    monitorShell,
    /const closeDraftByPath =/,
    "MonitorShell should not own source draft close handlers"
  );
});
