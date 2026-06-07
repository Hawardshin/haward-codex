import type { editor } from "monaco-editor";
import { useCallback, useEffect, useRef } from "react";

import type { WorkspaceTextFile, WorkspaceWriteReport } from "@/types/desktop";

import type { SourceEditorVisibleState, SourceWorkbenchView } from "./sourceDraftActions";
import { buildEffectiveSourceDrafts, type SourceDraftMap, upsertSourceDraftContent } from "./sourceDrafts";

export type SourceDraftUpdateOptions = {
  immediate?: boolean;
};

type StateSetter<T> = (value: T | ((current: T) => T)) => void;

export type UseSourceEditorSessionArgs = {
  sourceFile: WorkspaceTextFile | null;
  sourceDraft: string;
  sourceDrafts: SourceDraftMap;
  setSourceFile: StateSetter<WorkspaceTextFile | null>;
  setSourceDraft: StateSetter<string>;
  setSourceDrafts: StateSetter<SourceDraftMap>;
  setSelectedSourcePath: StateSetter<string>;
  setSourcePathInput: StateSetter<string>;
  setSourceCopyNotice: StateSetter<string>;
  setWriteReport: StateSetter<WorkspaceWriteReport | null>;
  setSourceWorkbenchView: StateSetter<SourceWorkbenchView>;
  syncDelayMs?: number;
};

const defaultSourceDraftUiSyncMs = 180;

export function useSourceEditorSession({
  sourceFile,
  sourceDraft,
  sourceDrafts,
  setSourceFile,
  setSourceDraft,
  setSourceDrafts,
  setSelectedSourcePath,
  setSourcePathInput,
  setSourceCopyNotice,
  setWriteReport,
  setSourceWorkbenchView,
  syncDelayMs = defaultSourceDraftUiSyncMs
}: UseSourceEditorSessionArgs) {
  const sourceEditorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const sourceDraftRef = useRef("");
  const activeSourcePathRef = useRef("");
  const sourceDraftSyncTimerRef = useRef<number | null>(null);

  const clearSourceDraftSyncTimer = useCallback(() => {
    if (sourceDraftSyncTimerRef.current && typeof window !== "undefined") {
      window.clearTimeout(sourceDraftSyncTimerRef.current);
    }
    sourceDraftSyncTimerRef.current = null;
  }, []);

  const setVisibleSourceDraftContent = useCallback(
    (nextContent: string) => {
      sourceDraftRef.current = nextContent;
      setSourceDraft(nextContent);
    },
    [setSourceDraft]
  );

  const applySourceEditorVisibleState = useCallback(
    (state: SourceEditorVisibleState) => {
      setSourceFile(state.sourceFile);
      activeSourcePathRef.current = state.activeSourcePath;
      setVisibleSourceDraftContent(state.sourceDraft);
      setSelectedSourcePath(state.selectedSourcePath);
      setSourcePathInput(state.sourcePathInput);
      setSourceCopyNotice(state.sourceCopyNotice);
      setWriteReport(state.writeReport);
      setSourceWorkbenchView(state.workbenchView);
    },
    [
      setSelectedSourcePath,
      setSourceCopyNotice,
      setSourceFile,
      setSourcePathInput,
      setSourceWorkbenchView,
      setVisibleSourceDraftContent,
      setWriteReport
    ]
  );

  const commitSourceDraftState = useCallback(
    (nextContent: string, draftFile: WorkspaceTextFile | null, syncVisibleDraft = true) => {
      if (syncVisibleDraft && (!draftFile || activeSourcePathRef.current === draftFile.relativePath)) {
        setSourceDraft(nextContent);
      }
      if (!draftFile) {
        return;
      }
      setSourceDrafts((current) => upsertSourceDraftContent(current, draftFile, nextContent));
    },
    [setSourceDraft, setSourceDrafts]
  );

  const updateSourceDraft = useCallback(
    (nextContent: string, options: SourceDraftUpdateOptions = {}) => {
      const draftFile = sourceFile;
      const immediate = options.immediate ?? true;
      sourceDraftRef.current = nextContent;
      setSourceCopyNotice("");
      if (!draftFile) {
        return;
      }
      if (immediate || typeof window === "undefined") {
        clearSourceDraftSyncTimer();
        commitSourceDraftState(nextContent, draftFile);
        return;
      }
      if (sourceDraftSyncTimerRef.current) {
        return;
      }
      sourceDraftSyncTimerRef.current = window.setTimeout(() => {
        sourceDraftSyncTimerRef.current = null;
        commitSourceDraftState(sourceDraftRef.current, draftFile);
      }, syncDelayMs);
    },
    [clearSourceDraftSyncTimer, commitSourceDraftState, setSourceCopyNotice, sourceFile, syncDelayMs]
  );

  const currentEditorDraftContent = useCallback(
    () => sourceEditorRef.current?.getValue() ?? (sourceDraftRef.current || sourceDraft),
    [sourceDraft]
  );

  const effectiveSourceDrafts = useCallback(
    () => buildEffectiveSourceDrafts(sourceDrafts, sourceFile, currentEditorDraftContent()),
    [currentEditorDraftContent, sourceDrafts, sourceFile]
  );

  const handleSourceEditorMount = useCallback((editorInstance: editor.IStandaloneCodeEditor) => {
    sourceEditorRef.current = editorInstance;
  }, []);

  const getActiveSourcePath = useCallback(() => activeSourcePathRef.current, []);

  useEffect(() => {
    return () => clearSourceDraftSyncTimer();
  }, [clearSourceDraftSyncTimer]);

  return {
    sourceEditorRef,
    applySourceEditorVisibleState,
    clearSourceDraftSyncTimer,
    updateSourceDraft,
    currentEditorDraftContent,
    effectiveSourceDrafts,
    handleSourceEditorMount,
    getActiveSourcePath,
    setVisibleSourceDraftContent
  };
}
