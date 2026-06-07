import type { editor } from "monaco-editor";
import { useCallback, type RefObject } from "react";

import { writeClipboardText } from "@/lib/clipboard.mjs";
import type {
  SourceDiffSummary,
  SourceDraftEntry,
  TauriInvoke,
  UiLanguage,
  WorkspaceTextFile,
  WorkspaceWriteReport
} from "@/types/desktop";

import {
  buildCloseSourceDraftResult,
  buildOpenSourceFileState,
  buildRevertedCurrentDraftState,
  buildSaveAllSourceDraftResult,
  buildSelectSourceDraftState,
  buildSourceFileSaveDrafts,
  buildSourceFileSaveResult,
  mergeSavedSourceReports,
  type SourceEditorVisibleState,
  type SourceWorkbenchView
} from "./sourceDraftActions";
import {
  listDirtySourceDraftEntries,
  listOpenSourceDraftEntries,
  type SourceDraftMap
} from "./sourceDrafts";
import {
  appendSourceTemplate,
  renderSourceTemplate,
  type SourceEditorProfile,
  type SourceTemplate
} from "./sourceTemplates";
import {
  buildSourcePatchContext,
  renderAgentsMdStarter
} from "./sourceDocuments";
import type { SourceDraftUpdateOptions } from "./useSourceEditorSession";
import type { SourceLoadRequestGate } from "./useSourceLoadRequestGate";

export type SourceEditorCommand = "undo" | "redo" | "find" | "replace" | "format" | "foldAll" | "unfoldAll";

type StateSetter<T> = (value: T | ((current: T) => T)) => void;

type SettingsSyncOptions = {
  includeSourceCatalog?: boolean;
  forceSourceRefresh?: boolean;
};

export type UseSourceWorkbenchControllerArgs = {
  tauriInvoke: TauriInvoke | null;
  uiLanguage: UiLanguage;
  runtimeUnavailableErrorMessage: string;
  workspaceRelativePathRequiredMessage: string;
  sourceFile: WorkspaceTextFile | null;
  sourceDrafts: SourceDraftMap;
  sourcePathInput: string;
  selectedSourcePath: string;
  sourceEditorLocked: boolean;
  openDraftEntries: SourceDraftEntry[];
  currentDraftEntry: SourceDraftEntry | null;
  agentsInstructionPath: string;
  workspaceExplorerRootLabel: string;
  selectedSourceTemplate: SourceTemplate;
  sourceEditorProfile: SourceEditorProfile;
  currentSourceDirty: boolean;
  sourceDiff: SourceDiffSummary | null;
  sourceEditorRef: RefObject<editor.IStandaloneCodeEditor | null>;
  beginSourceLoadRequest: () => SourceLoadRequestGate;
  cancelPendingSourceLoad: () => void;
  applySourceEditorVisibleState: (state: SourceEditorVisibleState) => void;
  clearSourceDraftSyncTimer: () => void;
  updateSourceDraft: (nextContent: string, options?: SourceDraftUpdateOptions) => void;
  currentEditorDraftContent: () => string;
  effectiveSourceDrafts: () => SourceDraftMap;
  getActiveSourcePath: () => string;
  setVisibleSourceDraftContent: (nextContent: string) => void;
  setRuntimeUnavailable: () => void;
  setEditorBusy: StateSetter<boolean>;
  setSaveAllBusy: StateSetter<boolean>;
  setError: StateSetter<string>;
  setSourceFile: StateSetter<WorkspaceTextFile | null>;
  setSourceDrafts: StateSetter<SourceDraftMap>;
  setSourceCopyNotice: StateSetter<string>;
  setSourceSaveResults: StateSetter<WorkspaceWriteReport[]>;
  setSourceWorkbenchView: StateSetter<SourceWorkbenchView>;
  setWriteReport: StateSetter<WorkspaceWriteReport | null>;
  queueSettingsSync: (reason: string, options?: SettingsSyncOptions) => void;
};

function sourceControllerErrorMessage(caught: unknown) {
  if (caught instanceof Error) {
    return caught.message;
  }
  return String(caught);
}

export function useSourceWorkbenchController({
  tauriInvoke,
  uiLanguage,
  runtimeUnavailableErrorMessage,
  workspaceRelativePathRequiredMessage,
  sourceFile,
  sourceDrafts,
  sourcePathInput,
  selectedSourcePath,
  sourceEditorLocked,
  openDraftEntries,
  currentDraftEntry,
  agentsInstructionPath,
  workspaceExplorerRootLabel,
  selectedSourceTemplate,
  sourceEditorProfile,
  currentSourceDirty,
  sourceDiff,
  sourceEditorRef,
  beginSourceLoadRequest,
  cancelPendingSourceLoad,
  applySourceEditorVisibleState,
  clearSourceDraftSyncTimer,
  updateSourceDraft,
  currentEditorDraftContent,
  effectiveSourceDrafts,
  getActiveSourcePath,
  setVisibleSourceDraftContent,
  setRuntimeUnavailable,
  setEditorBusy,
  setSaveAllBusy,
  setError,
  setSourceFile,
  setSourceDrafts,
  setSourceCopyNotice,
  setSourceSaveResults,
  setSourceWorkbenchView,
  setWriteReport,
  queueSettingsSync
}: UseSourceWorkbenchControllerArgs) {
  const openWorkspaceTextFileInEditor = useCallback(
    (nextFile: WorkspaceTextFile) => {
      const { draftEntry, visibleState } = buildOpenSourceFileState(nextFile);
      applySourceEditorVisibleState(visibleState);
      setSourceDrafts((current) => ({ ...current, [draftEntry.relativePath]: draftEntry }));
    },
    [applySourceEditorVisibleState, setSourceDrafts]
  );

  const loadSourceFileByPath = useCallback(
    async (relativePath: string) => {
      const targetPath = relativePath.trim();
      if (!tauriInvoke) {
        setError(runtimeUnavailableErrorMessage);
        return;
      }
      if (!targetPath) {
        setError(workspaceRelativePathRequiredMessage);
        return;
      }

      const isCurrentSourceLoad = beginSourceLoadRequest();
      setEditorBusy(true);
      setError("");
      setWriteReport(null);
      clearSourceDraftSyncTimer();
      try {
        const nextFile = await tauriInvoke<WorkspaceTextFile>("read_workspace_text_file", {
          relativePath: targetPath
        });
        if (!isCurrentSourceLoad()) {
          return;
        }
        openWorkspaceTextFileInEditor(nextFile);
      } catch (caught) {
        if (isCurrentSourceLoad()) {
          setError(sourceControllerErrorMessage(caught));
        }
      } finally {
        if (isCurrentSourceLoad()) {
          setEditorBusy(false);
        }
      }
    },
    [
      beginSourceLoadRequest,
      clearSourceDraftSyncTimer,
      openWorkspaceTextFileInEditor,
      runtimeUnavailableErrorMessage,
      setEditorBusy,
      setError,
      setWriteReport,
      tauriInvoke,
      workspaceRelativePathRequiredMessage
    ]
  );

  const loadSourceFile = useCallback(async () => {
    await loadSourceFileByPath(sourcePathInput || selectedSourcePath);
  }, [loadSourceFileByPath, selectedSourcePath, sourcePathInput]);

  const selectDraftEntry = useCallback(
    (relativePath: string) => {
      const entry = sourceDrafts[relativePath];
      if (!entry) {
        return;
      }
      cancelPendingSourceLoad();
      clearSourceDraftSyncTimer();
      applySourceEditorVisibleState(buildSelectSourceDraftState(entry));
    },
    [applySourceEditorVisibleState, cancelPendingSourceLoad, clearSourceDraftSyncTimer, sourceDrafts]
  );

  const openDraftOrLoad = useCallback(
    async (relativePath: string) => {
      if (sourceDrafts[relativePath]) {
        selectDraftEntry(relativePath);
        return;
      }
      await loadSourceFileByPath(relativePath);
    },
    [loadSourceFileByPath, selectDraftEntry, sourceDrafts]
  );

  const prepareAgentsInstructions = useCallback(async () => {
    if (!tauriInvoke) {
      setRuntimeUnavailable();
      throw new Error(runtimeUnavailableErrorMessage);
    }

    const targetPath = agentsInstructionPath || "AGENTS.md";
    if (sourceDrafts[targetPath]) {
      selectDraftEntry(targetPath);
      return;
    }

    const isCurrentSourceLoad = beginSourceLoadRequest();
    setEditorBusy(true);
    setError("");
    setWriteReport(null);
    clearSourceDraftSyncTimer();
    try {
      try {
        const existingFile = await tauriInvoke<WorkspaceTextFile>("read_workspace_text_file", {
          relativePath: targetPath
        });
        if (!isCurrentSourceLoad()) {
          return;
        }
        openWorkspaceTextFileInEditor(existingFile);
        return;
      } catch (caught) {
        if (!isCurrentSourceLoad()) {
          return;
        }
        if (agentsInstructionPath) {
          throw caught;
        }
      }

      const content = renderAgentsMdStarter(workspaceExplorerRootLabel);
      const report = await tauriInvoke<WorkspaceWriteReport>("write_workspace_text_file", {
        relativePath: "AGENTS.md",
        content
      });
      const nextFile: WorkspaceTextFile = {
        relativePath: report.relativePath,
        content,
        sizeBytes: report.sizeBytes,
        maxSizeBytes: Math.max(64_000, report.sizeBytes, content.length)
      };
      if (!isCurrentSourceLoad()) {
        return;
      }
      openWorkspaceTextFileInEditor(nextFile);
      setWriteReport(report);
      setSourceSaveResults((current) => mergeSavedSourceReports(current, report));
      queueSettingsSync("agents-md", { includeSourceCatalog: true, forceSourceRefresh: true });
    } catch (caught) {
      if (isCurrentSourceLoad()) {
        throw caught;
      }
    } finally {
      if (isCurrentSourceLoad()) {
        setEditorBusy(false);
      }
    }
  }, [
    agentsInstructionPath,
    beginSourceLoadRequest,
    clearSourceDraftSyncTimer,
    openWorkspaceTextFileInEditor,
    queueSettingsSync,
    runtimeUnavailableErrorMessage,
    selectDraftEntry,
    setEditorBusy,
    setError,
    setRuntimeUnavailable,
    setSourceSaveResults,
    setWriteReport,
    sourceDrafts,
    tauriInvoke,
    workspaceExplorerRootLabel
  ]);

  const runSourceEditorCommand = useCallback(
    async (command: SourceEditorCommand) => {
      const editorInstance = sourceEditorRef.current;
      if (!sourceFile || !editorInstance) {
        setSourceCopyNotice("Open a source file before running editor commands");
        return;
      }
      if (sourceEditorLocked) {
        setSourceCopyNotice(uiLanguage === "ko" ? "저장 중에는 편집 명령을 잠시 막습니다." : "Editing commands are locked while saving.");
        return;
      }

      if (command === "undo" || command === "redo") {
        editorInstance.trigger("platform-source-toolbar", command, null);
        updateSourceDraft(editorInstance.getValue(), { immediate: true });
        editorInstance.focus();
        return;
      }

      const actionId =
        command === "find"
          ? "actions.find"
          : command === "replace"
            ? "editor.action.startFindReplaceAction"
            : command === "foldAll"
              ? "editor.foldAll"
              : command === "unfoldAll"
                ? "editor.unfoldAll"
                : "editor.action.formatDocument";
      const action = editorInstance.getAction(actionId);
      if (!action) {
        setSourceCopyNotice(`${command} is unavailable for this file`);
        editorInstance.focus();
        return;
      }
      await action.run();
      if (command === "format") {
        updateSourceDraft(editorInstance.getValue(), { immediate: true });
      }
      editorInstance.focus();
    },
    [setSourceCopyNotice, sourceEditorLocked, sourceEditorRef, sourceFile, uiLanguage, updateSourceDraft]
  );

  const insertSourceTemplate = useCallback(() => {
    if (!sourceFile || sourceEditorLocked) {
      return;
    }

    const templateBody = renderSourceTemplate(selectedSourceTemplate, sourceFile.relativePath);
    const editorInstance = sourceEditorRef.current;
    const selection = editorInstance?.getSelection() || null;
    if (editorInstance && selection) {
      editorInstance.executeEdits("platform-source-template", [
        {
          range: selection,
          text: templateBody,
          forceMoveMarkers: true
        }
      ]);
      updateSourceDraft(editorInstance.getValue(), { immediate: true });
      editorInstance.focus();
      setSourceCopyNotice(`${selectedSourceTemplate.label} inserted`);
      return;
    }

    updateSourceDraft(appendSourceTemplate(currentEditorDraftContent(), templateBody), { immediate: true });
    setSourceCopyNotice(`${selectedSourceTemplate.label} inserted`);
  }, [
    currentEditorDraftContent,
    selectedSourceTemplate,
    setSourceCopyNotice,
    sourceEditorLocked,
    sourceEditorRef,
    sourceFile,
    updateSourceDraft
  ]);

  const copySourcePatchContext = useCallback(async () => {
    if (!sourceFile) {
      return;
    }

    const context = buildSourcePatchContext({
      relativePath: sourceFile.relativePath,
      profileLabel: sourceEditorProfile.label,
      templateLabel: selectedSourceTemplate.label,
      dirty: currentSourceDirty,
      diff: sourceDiff,
      draftContent: currentEditorDraftContent()
    });
    const copied = await writeClipboardText(context);
    setSourceCopyNotice(copied ? `${sourceFile.relativePath} patch context copied` : "Clipboard unavailable");
  }, [
    currentEditorDraftContent,
    currentSourceDirty,
    selectedSourceTemplate.label,
    setSourceCopyNotice,
    sourceDiff,
    sourceEditorProfile.label,
    sourceFile
  ]);

  const saveSourceFile = useCallback(async () => {
    if (!tauriInvoke || !sourceFile) {
      return;
    }
    const fileToSave = sourceFile;
    const savedContent = currentEditorDraftContent();

    setEditorBusy(true);
    setError("");
    try {
      clearSourceDraftSyncTimer();
      const report = await tauriInvoke<WorkspaceWriteReport>("write_workspace_text_file", {
        relativePath: fileToSave.relativePath,
        content: savedContent
      });
      const activePathAfterSave = getActiveSourcePath();
      const activeFileStillVisible = activePathAfterSave === fileToSave.relativePath;
      const nextDraftContent = activeFileStillVisible ? currentEditorDraftContent() : savedContent;
      const saveResult = buildSourceFileSaveResult({
        fileToSave,
        report,
        savedContent,
        activePathAfterSave,
        nextDraftContent
      });
      setWriteReport(saveResult.writeReport);
      if (saveResult.sourceFile) {
        setSourceFile(saveResult.sourceFile);
        setVisibleSourceDraftContent(saveResult.sourceDraft);
      }
      setSourceDrafts((current) =>
        buildSourceFileSaveDrafts(current, {
          fileToSave,
          report,
          savedContent,
          activeFileStillVisible: saveResult.activeFileStillVisible,
          nextDraftContent: saveResult.sourceDraft
        })
      );
      setSourceSaveResults((current) => mergeSavedSourceReports(current, report));
      setSourceCopyNotice(saveResult.sourceCopyNotice);
      setSourceWorkbenchView(saveResult.workbenchView);
      queueSettingsSync("source-save", { includeSourceCatalog: true, forceSourceRefresh: true });
    } catch (caught) {
      setError(sourceControllerErrorMessage(caught));
    } finally {
      setEditorBusy(false);
    }
  }, [
    clearSourceDraftSyncTimer,
    currentEditorDraftContent,
    getActiveSourcePath,
    queueSettingsSync,
    setEditorBusy,
    setError,
    setSourceCopyNotice,
    setSourceDrafts,
    setSourceFile,
    setSourceSaveResults,
    setSourceWorkbenchView,
    setVisibleSourceDraftContent,
    setWriteReport,
    sourceFile,
    tauriInvoke
  ]);

  const saveAllSourceDrafts = useCallback(async () => {
    const draftSnapshot = effectiveSourceDrafts();
    const dirtyEntries = listDirtySourceDraftEntries(listOpenSourceDraftEntries(draftSnapshot));
    if (!tauriInvoke || dirtyEntries.length === 0) {
      return;
    }

    setSaveAllBusy(true);
    setError("");
    try {
      clearSourceDraftSyncTimer();
      const reportsToAdd: WorkspaceWriteReport[] = [];
      const savedEntries: Array<{ entry: SourceDraftEntry; report: WorkspaceWriteReport }> = [];
      for (const entry of dirtyEntries) {
        const report = await tauriInvoke<WorkspaceWriteReport>("write_workspace_text_file", {
          relativePath: entry.relativePath,
          content: entry.content
        });
        reportsToAdd.push(report);
        savedEntries.push({ entry, report });
      }
      const saveAllResult = buildSaveAllSourceDraftResult({
        draftSnapshot,
        savedEntries,
        activePathAfterSave: getActiveSourcePath(),
        activeVisibleContent: currentEditorDraftContent()
      });
      setSourceDrafts(saveAllResult.sourceDrafts);
      setSourceSaveResults((current) => mergeSavedSourceReports(current, reportsToAdd));
      if (saveAllResult.sourceFile) {
        setSourceFile(saveAllResult.sourceFile);
        setVisibleSourceDraftContent(saveAllResult.sourceDraft);
        setSourceCopyNotice(saveAllResult.sourceCopyNotice);
      }
      if (saveAllResult.writeReport) {
        setWriteReport(saveAllResult.writeReport);
      }
      if (saveAllResult.workbenchView) {
        setSourceWorkbenchView(saveAllResult.workbenchView);
      }
      queueSettingsSync("source-save", { includeSourceCatalog: true, forceSourceRefresh: true });
    } catch (caught) {
      setError(sourceControllerErrorMessage(caught));
    } finally {
      setSaveAllBusy(false);
    }
  }, [
    clearSourceDraftSyncTimer,
    currentEditorDraftContent,
    effectiveSourceDrafts,
    getActiveSourcePath,
    queueSettingsSync,
    setError,
    setSaveAllBusy,
    setSourceCopyNotice,
    setSourceDrafts,
    setSourceFile,
    setSourceSaveResults,
    setSourceWorkbenchView,
    setVisibleSourceDraftContent,
    setWriteReport,
    tauriInvoke
  ]);

  const revertCurrentDraft = useCallback(() => {
    if (!sourceFile || !currentDraftEntry || sourceEditorLocked) {
      return;
    }
    clearSourceDraftSyncTimer();
    const reverted = buildRevertedCurrentDraftState(sourceDrafts, sourceFile, currentDraftEntry);
    setVisibleSourceDraftContent(reverted.sourceDraft);
    setSourceDrafts(reverted.sourceDrafts);
    setWriteReport(reverted.writeReport);
  }, [
    clearSourceDraftSyncTimer,
    currentDraftEntry,
    setSourceDrafts,
    setVisibleSourceDraftContent,
    setWriteReport,
    sourceDrafts,
    sourceEditorLocked,
    sourceFile
  ]);

  const closeDraftByPath = useCallback(
    (relativePath: string) => {
      const currentPath = relativePath.trim();
      if (!currentPath) {
        return;
      }
      clearSourceDraftSyncTimer();
      const closeResult = buildCloseSourceDraftResult({
        drafts: sourceDrafts,
        openEntries: openDraftEntries,
        activeFile: sourceFile,
        relativePath: currentPath
      });
      if (closeResult.closingActiveDraft) {
        cancelPendingSourceLoad();
      }
      setSourceDrafts(closeResult.sourceDrafts);
      if (closeResult.visibleState) {
        applySourceEditorVisibleState(closeResult.visibleState);
      }
    },
    [
      applySourceEditorVisibleState,
      cancelPendingSourceLoad,
      clearSourceDraftSyncTimer,
      openDraftEntries,
      setSourceDrafts,
      sourceDrafts,
      sourceFile
    ]
  );

  const closeCurrentDraft = useCallback(() => {
    if (!sourceFile) {
      return;
    }
    closeDraftByPath(sourceFile.relativePath);
  }, [closeDraftByPath, sourceFile]);

  const copyCurrentSourceDraft = useCallback(async () => {
    if (!sourceFile) {
      return;
    }
    const copied = await writeClipboardText(currentEditorDraftContent());
    setSourceCopyNotice(copied ? `${sourceFile.relativePath} copied` : "Clipboard unavailable");
  }, [currentEditorDraftContent, setSourceCopyNotice, sourceFile]);

  return {
    openWorkspaceTextFileInEditor,
    loadSourceFileByPath,
    loadSourceFile,
    selectDraftEntry,
    openDraftOrLoad,
    prepareAgentsInstructions,
    runSourceEditorCommand,
    insertSourceTemplate,
    copySourcePatchContext,
    saveSourceFile,
    saveAllSourceDrafts,
    revertCurrentDraft,
    closeDraftByPath,
    closeCurrentDraft,
    copyCurrentSourceDraft
  };
}
