"use client";

import type { editor } from "monaco-editor";

import type { WorkspaceSourceFile } from "@/lib/snapshot";
import type {
  DesktopResourceSnapshotReport,
  SourceDiffSummary,
  SourceDraftEntry,
  UiLanguage,
  WorkspaceResourcePrepareReport,
  WorkspaceResourceWarmupReport,
  WorkspaceTextFile,
  WorkspaceTextFileListReport,
  WorkspaceWriteReport
} from "@/types/desktop";

import { SourceCommandToolbar } from "./SourceCommandToolbar";
import { SourceEditorFrame } from "./SourceEditorFrame";
import { SourceEditorTabs } from "./SourceEditorTabs";
import { SourceFileBrowser } from "./SourceFileBrowser";
import { SourceFileControls } from "./SourceFileControls";
import { SourceSaveResultsPanel } from "./SourceSaveResultsPanel";
import { SourceWorkbenchHeader } from "./SourceWorkbenchHeader";
import { SourceWorkbenchSwitcher } from "./SourceWorkbenchSwitcher";
import { SourceWorkspaceStatusStrip } from "./SourceWorkspaceStatusStrip";
import { isSourceDraftEntryDirty } from "./sourceDrafts";
import type { SourceWorkbenchView } from "./sourceDraftActions";
import type {
  SourceEditorViewMode,
  SourceWorkbenchCopy,
  SourceWorkbenchStateSetter
} from "./sourceWorkbenchTypes";
import type { SourceEditorCommand } from "./useSourceWorkbenchController";

export type { SourceEditorViewMode, SourceWorkbenchCopy } from "./sourceWorkbenchTypes";

export type SourceWorkbenchPanelProps = {
  activeMonacoEditorOptions: editor.IStandaloneEditorConstructionOptions;
  activeWorkspacePath: string;
  appResourceSnapshot: DesktopResourceSnapshotReport | null;
  copy: SourceWorkbenchCopy;
  currentSourceDirty: boolean;
  editorBusy: boolean;
  filteredEditableSourceFiles: WorkspaceSourceFile[];
  formatBytes: (bytes: number) => string;
  invokeAvailable: boolean;
  isFileWorkspaceSurface: boolean;
  latestSourceSaveResult: WorkspaceWriteReport | null;
  openDraftEntries: SourceDraftEntry[];
  runtimeSourceFileCount: number;
  saveAllBusy: boolean;
  selectedSourceFileOption: WorkspaceSourceFile | null;
  selectedSourcePath: string;
  setSelectedSourcePath: SourceWorkbenchStateSetter<string>;
  setSourceEditorViewMode: SourceWorkbenchStateSetter<SourceEditorViewMode>;
  setSourceMinimapEnabled: SourceWorkbenchStateSetter<boolean>;
  setSourcePathInput: SourceWorkbenchStateSetter<string>;
  setSourceWorkbenchView: SourceWorkbenchStateSetter<SourceWorkbenchView>;
  setSourceWordWrap: SourceWorkbenchStateSetter<boolean>;
  sourceCatalogFilesCount: number;
  sourceCatalogLabel: string;
  sourceCatalogReport: WorkspaceTextFileListReport | null;
  sourceCopyNotice: string;
  sourceDiff: SourceDiffSummary | null;
  sourceDraft: string;
  sourceEditorLocked: boolean;
  sourceEditorViewMode: SourceEditorViewMode;
  sourceFile: WorkspaceTextFile | null;
  sourceMinimapEnabled: boolean;
  sourceFilter: string;
  sourcePathInput: string;
  sourceSaveResults: WorkspaceWriteReport[];
  sourceSaveTotalBytes: number;
  sourceWorkbenchView: SourceWorkbenchView;
  sourceWordWrap: boolean;
  uiLanguage: UiLanguage;
  workspaceResourceBusy: boolean;
  workspaceResourceReport: WorkspaceResourcePrepareReport | null;
  workspaceSourceLabel: string;
  workspaceWarmupReport: WorkspaceResourceWarmupReport | null;
  writeReport: WorkspaceWriteReport | null;
  onCloseDraftByPath: (relativePath: string) => void;
  onCopyCurrentSourceDraft: () => void | Promise<void>;
  onHandleSourceEditorMount: (editorInstance: editor.IStandaloneCodeEditor) => void;
  onLoadSourceFile: () => void | Promise<void>;
  onOpenDraftOrLoad: (relativePath: string) => void | Promise<void>;
  onRunSourceEditorCommand: (command: SourceEditorCommand) => void | Promise<void>;
  onSaveAllSourceDrafts: () => void | Promise<void>;
  onSaveSourceFile: () => void | Promise<void>;
  onSelectDraftEntry: (relativePath: string) => void;
  onSourceFilterChange: (value: string) => void;
  onUpdateSourceDraft: (nextContent: string) => void;
};

export function SourceWorkbenchPanel({
  activeMonacoEditorOptions,
  activeWorkspacePath,
  appResourceSnapshot,
  copy,
  currentSourceDirty,
  editorBusy,
  filteredEditableSourceFiles,
  formatBytes,
  invokeAvailable,
  isFileWorkspaceSurface,
  latestSourceSaveResult,
  openDraftEntries,
  runtimeSourceFileCount,
  saveAllBusy,
  selectedSourceFileOption,
  selectedSourcePath,
  setSelectedSourcePath,
  setSourceEditorViewMode,
  setSourceMinimapEnabled,
  setSourcePathInput,
  setSourceWorkbenchView,
  setSourceWordWrap,
  sourceCatalogFilesCount,
  sourceCatalogLabel,
  sourceCatalogReport,
  sourceCopyNotice,
  sourceDiff,
  sourceDraft,
  sourceEditorLocked,
  sourceEditorViewMode,
  sourceFile,
  sourceFilter,
  sourceMinimapEnabled,
  sourcePathInput,
  sourceSaveResults,
  sourceSaveTotalBytes,
  sourceWorkbenchView,
  sourceWordWrap,
  uiLanguage,
  workspaceResourceBusy,
  workspaceResourceReport,
  workspaceSourceLabel,
  workspaceWarmupReport,
  writeReport,
  onCloseDraftByPath,
  onCopyCurrentSourceDraft,
  onHandleSourceEditorMount,
  onLoadSourceFile,
  onOpenDraftOrLoad,
  onRunSourceEditorCommand,
  onSaveAllSourceDrafts,
  onSaveSourceFile,
  onSelectDraftEntry,
  onSourceFilterChange,
  onUpdateSourceDraft
}: SourceWorkbenchPanelProps) {
  const dirtyDraftEntries = openDraftEntries.filter((entry) => isSourceDraftEntryDirty(entry));

  return (
    <>
      <SourceWorkspaceStatusStrip
        activeWorkspacePath={activeWorkspacePath}
        appResourceSnapshot={appResourceSnapshot}
        copy={copy}
        filteredEditableSourceFiles={filteredEditableSourceFiles}
        formatBytes={formatBytes}
        invokeAvailable={invokeAvailable}
        openDraftEntries={openDraftEntries}
        sourceCatalogFilesCount={sourceCatalogFilesCount}
        sourceCatalogReport={sourceCatalogReport}
        workspaceResourceBusy={workspaceResourceBusy}
        workspaceResourceReport={workspaceResourceReport}
        workspaceSourceLabel={workspaceSourceLabel}
        workspaceWarmupReport={workspaceWarmupReport}
      />

      <section className="panel wide desktop-source-panel native-source-workbench">
        <SourceWorkbenchHeader
          copy={copy}
          formatBytes={formatBytes}
          openDraftEntries={openDraftEntries}
          sourceCatalogLabel={sourceCatalogLabel}
          workspaceResourceReport={workspaceResourceReport}
          workspaceWarmupReport={workspaceWarmupReport}
        />
        <SourceFileControls
          copy={copy}
          currentSourceDirty={currentSourceDirty}
          dirtyDraftEntries={dirtyDraftEntries}
          editorBusy={editorBusy}
          filteredEditableSourceFiles={filteredEditableSourceFiles}
          formatBytes={formatBytes}
          invokeAvailable={invokeAvailable}
          saveAllBusy={saveAllBusy}
          selectedSourceFileOption={selectedSourceFileOption}
          selectedSourcePath={selectedSourcePath}
          setSelectedSourcePath={setSelectedSourcePath}
          setSourcePathInput={setSourcePathInput}
          sourceCatalogFilesCount={sourceCatalogFilesCount}
          sourceCatalogLabel={sourceCatalogLabel}
          sourceCatalogReport={sourceCatalogReport}
          sourceEditorLocked={sourceEditorLocked}
          sourceFile={sourceFile}
          sourceFilter={sourceFilter}
          sourcePathInput={sourcePathInput}
          onCopyCurrentSourceDraft={onCopyCurrentSourceDraft}
          onLoadSourceFile={onLoadSourceFile}
          onSaveAllSourceDrafts={onSaveAllSourceDrafts}
          onSaveSourceFile={onSaveSourceFile}
        />
        <SourceCommandToolbar
          copy={copy}
          setSourceEditorViewMode={setSourceEditorViewMode}
          setSourceMinimapEnabled={setSourceMinimapEnabled}
          setSourceWordWrap={setSourceWordWrap}
          sourceEditorLocked={sourceEditorLocked}
          sourceEditorViewMode={sourceEditorViewMode}
          sourceFile={sourceFile}
          sourceMinimapEnabled={sourceMinimapEnabled}
          sourceWordWrap={sourceWordWrap}
          onRunSourceEditorCommand={onRunSourceEditorCommand}
        />
        <SourceWorkbenchSwitcher
          filteredFileCount={filteredEditableSourceFiles.length}
          isFileWorkspaceSurface={isFileWorkspaceSurface}
          openDraftEntries={openDraftEntries}
          setSourceWorkbenchView={setSourceWorkbenchView}
          sourceSaveResults={sourceSaveResults}
          sourceWorkbenchView={sourceWorkbenchView}
          uiLanguage={uiLanguage}
        />

        <div className={`source-review-grid native-source-grid source-workbench-view-${sourceWorkbenchView}`}>
          {!isFileWorkspaceSurface && (sourceWorkbenchView === "files" || sourceWorkbenchView === "editor") && (
            <SourceFileBrowser
              copy={copy}
              filteredEditableSourceFiles={filteredEditableSourceFiles}
              formatBytes={formatBytes}
              invokeAvailable={invokeAvailable}
              runtimeSourceFileCount={runtimeSourceFileCount}
              sourceCatalogReport={sourceCatalogReport}
              sourceEditorLocked={sourceEditorLocked}
              sourceFile={sourceFile}
              sourceFilter={sourceFilter}
              uiLanguage={uiLanguage}
              onOpenDraftOrLoad={onOpenDraftOrLoad}
              onSourceFilterChange={onSourceFilterChange}
            />
          )}

          {sourceWorkbenchView === "editor" && (
            <div className="source-edit-workbench">
              <SourceEditorTabs
                copy={copy}
                openDraftEntries={openDraftEntries}
                sourceEditorLocked={sourceEditorLocked}
                sourceFile={sourceFile}
                onCloseDraftByPath={onCloseDraftByPath}
                onSelectDraftEntry={onSelectDraftEntry}
              />
              {sourceFile ? (
                <SourceEditorFrame
                  activeMonacoEditorOptions={activeMonacoEditorOptions}
                  copy={copy}
                  currentSourceDirty={currentSourceDirty}
                  editorBusy={editorBusy}
                  formatBytes={formatBytes}
                  invokeAvailable={invokeAvailable}
                  setSourceEditorViewMode={setSourceEditorViewMode}
                  sourceCopyNotice={sourceCopyNotice}
                  sourceDiff={sourceDiff}
                  sourceDraft={sourceDraft}
                  sourceEditorLocked={sourceEditorLocked}
                  sourceEditorViewMode={sourceEditorViewMode}
                  sourceFile={sourceFile}
                  uiLanguage={uiLanguage}
                  writeReport={writeReport}
                  onCopyCurrentSourceDraft={onCopyCurrentSourceDraft}
                  onHandleSourceEditorMount={onHandleSourceEditorMount}
                  onSaveSourceFile={onSaveSourceFile}
                  onUpdateSourceDraft={onUpdateSourceDraft}
                />
              ) : (
                <p className="empty-state">{copy.noFileOpen}</p>
              )}
            </div>
          )}

          {sourceWorkbenchView === "results" && (
            <SourceSaveResultsPanel
              formatBytes={formatBytes}
              latestSourceSaveResult={latestSourceSaveResult}
              sourceSaveResults={sourceSaveResults}
              sourceSaveTotalBytes={sourceSaveTotalBytes}
              uiLanguage={uiLanguage}
            />
          )}
        </div>
      </section>
    </>
  );
}

