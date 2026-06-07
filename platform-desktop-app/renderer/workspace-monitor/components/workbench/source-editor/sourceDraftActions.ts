import type { SourceDraftEntry, WorkspaceTextFile, WorkspaceWriteReport } from "@/types/desktop";

import {
  applySourceDraftSaveReport,
  createSourceDraftEntry,
  mergeSourceSaveReports,
  removeSourceDraftByPath,
  upsertSavedSourceDraft,
  type SourceDraftMap
} from "./sourceDrafts";

export type SourceWorkbenchView = "files" | "editor" | "results";

export type SourceEditorVisibleState = {
  sourceFile: WorkspaceTextFile | null;
  sourceDraft: string;
  activeSourcePath: string;
  selectedSourcePath: string;
  sourcePathInput: string;
  sourceCopyNotice: string;
  writeReport: WorkspaceWriteReport | null;
  workbenchView: SourceWorkbenchView;
};

export type OpenSourceFileState = {
  draftEntry: SourceDraftEntry;
  visibleState: SourceEditorVisibleState;
};

export type SourceFileSaveResult = {
  activeFileStillVisible: boolean;
  sourceFile: WorkspaceTextFile | null;
  sourceDraft: string;
  writeReport: WorkspaceWriteReport;
  sourceCopyNotice: string;
  workbenchView: SourceWorkbenchView;
};

export type SaveAllSourceDraftResult = {
  sourceDrafts: SourceDraftMap;
  activeEntry: SourceDraftEntry | null;
  sourceFile: WorkspaceTextFile | null;
  sourceDraft: string;
  writeReport: WorkspaceWriteReport | null;
  sourceCopyNotice: string;
  workbenchView: SourceWorkbenchView | null;
};

export type CloseSourceDraftResult = {
  currentPath: string;
  sourceDrafts: SourceDraftMap;
  closingActiveDraft: boolean;
  visibleState: SourceEditorVisibleState | null;
};

export function sourceTextFileFromDraftEntry(entry: SourceDraftEntry): WorkspaceTextFile {
  return {
    relativePath: entry.relativePath,
    content: entry.baseContent,
    sizeBytes: entry.sizeBytes,
    maxSizeBytes: entry.maxSizeBytes
  };
}

export function sourceWriteReportFromDraftEntry(entry: SourceDraftEntry): WorkspaceWriteReport | null {
  if (!entry.lastSavedBackupPath) {
    return null;
  }
  return {
    relativePath: entry.relativePath,
    sizeBytes: entry.sizeBytes,
    backupPath: entry.lastSavedBackupPath,
    status: entry.status || "saved"
  };
}

export function buildOpenSourceFileState(file: WorkspaceTextFile): OpenSourceFileState {
  const draftEntry = createSourceDraftEntry(file);
  return {
    draftEntry,
    visibleState: {
      sourceFile: file,
      sourceDraft: file.content,
      activeSourcePath: file.relativePath,
      selectedSourcePath: file.relativePath,
      sourcePathInput: file.relativePath,
      sourceCopyNotice: "",
      writeReport: null,
      workbenchView: "editor"
    }
  };
}

export function buildSelectSourceDraftState(entry: SourceDraftEntry): SourceEditorVisibleState {
  return {
    sourceFile: sourceTextFileFromDraftEntry(entry),
    sourceDraft: entry.content,
    activeSourcePath: entry.relativePath,
    selectedSourcePath: entry.relativePath,
    sourcePathInput: entry.relativePath,
    sourceCopyNotice: "",
    writeReport: sourceWriteReportFromDraftEntry(entry),
    workbenchView: "editor"
  };
}

export function buildSourceFileSaveResult(args: {
  fileToSave: WorkspaceTextFile;
  report: WorkspaceWriteReport;
  savedContent: string;
  activePathAfterSave: string;
  nextDraftContent: string;
}): SourceFileSaveResult {
  const activeFileStillVisible = args.activePathAfterSave === args.fileToSave.relativePath;
  return {
    activeFileStillVisible,
    sourceFile: activeFileStillVisible
      ? {
          ...args.fileToSave,
          content: args.savedContent,
          sizeBytes: args.report.sizeBytes
        }
      : null,
    sourceDraft: args.nextDraftContent,
    writeReport: args.report,
    sourceCopyNotice: "",
    workbenchView: "results"
  };
}

export function buildSourceFileSaveDrafts(
  drafts: SourceDraftMap,
  args: {
    fileToSave: WorkspaceTextFile;
    report: WorkspaceWriteReport;
    savedContent: string;
    activeFileStillVisible: boolean;
    nextDraftContent: string;
  }
): SourceDraftMap {
  return upsertSavedSourceDraft(
    drafts,
    args.fileToSave,
    args.report,
    args.savedContent,
    args.activeFileStillVisible ? args.nextDraftContent : undefined
  );
}

export function buildSaveAllSourceDraftResult(args: {
  draftSnapshot: SourceDraftMap;
  savedEntries: Array<{ entry: SourceDraftEntry; report: WorkspaceWriteReport }>;
  activePathAfterSave: string;
  activeVisibleContent: string;
}): SaveAllSourceDraftResult {
  const nextDrafts: SourceDraftMap = { ...args.draftSnapshot };
  const reports = args.savedEntries.map(({ report }) => report);

  for (const { entry, report } of args.savedEntries) {
    nextDrafts[entry.relativePath] = applySourceDraftSaveReport(entry, report);
  }

  if (args.activePathAfterSave && nextDrafts[args.activePathAfterSave]) {
    nextDrafts[args.activePathAfterSave] = {
      ...nextDrafts[args.activePathAfterSave],
      content: args.activeVisibleContent
    };
  }

  const activeEntry = args.activePathAfterSave ? nextDrafts[args.activePathAfterSave] ?? null : null;
  return {
    sourceDrafts: nextDrafts,
    activeEntry,
    sourceFile: activeEntry ? sourceTextFileFromDraftEntry(activeEntry) : null,
    sourceDraft: activeEntry?.content ?? "",
    writeReport: reports[0] ?? null,
    sourceCopyNotice: "",
    workbenchView: reports[0] ? "results" : null
  };
}

export function buildRevertedCurrentDraftState(
  drafts: SourceDraftMap,
  file: WorkspaceTextFile,
  entry: SourceDraftEntry
): Pick<SourceEditorVisibleState, "sourceDraft" | "writeReport"> & { sourceDrafts: SourceDraftMap } {
  return {
    sourceDraft: entry.baseContent,
    sourceDrafts: {
      ...drafts,
      [file.relativePath]: {
        ...entry,
        content: entry.baseContent
      }
    },
    writeReport: null
  };
}

export function buildCloseSourceDraftResult(args: {
  drafts: SourceDraftMap;
  openEntries: SourceDraftEntry[];
  activeFile: WorkspaceTextFile | null;
  relativePath: string;
}): CloseSourceDraftResult {
  const currentPath = args.relativePath.trim();
  const sourceDrafts = currentPath ? removeSourceDraftByPath(args.drafts, currentPath) : args.drafts;
  const closingActiveDraft = Boolean(currentPath && args.activeFile?.relativePath === currentPath);

  if (!currentPath || !closingActiveDraft) {
    return {
      currentPath,
      sourceDrafts,
      closingActiveDraft,
      visibleState: null
    };
  }

  const nextEntry = args.openEntries.find((entry) => entry.relativePath !== currentPath) || null;
  if (nextEntry) {
    return {
      currentPath,
      sourceDrafts,
      closingActiveDraft,
      visibleState: buildSelectSourceDraftState(nextEntry)
    };
  }

  return {
    currentPath,
    sourceDrafts,
    closingActiveDraft,
    visibleState: {
      sourceFile: null,
      sourceDraft: "",
      activeSourcePath: "",
      selectedSourcePath: "",
      sourcePathInput: "",
      sourceCopyNotice: "",
      writeReport: null,
      workbenchView: "files"
    }
  };
}

export function mergeSavedSourceReports(current: WorkspaceWriteReport[], reports: WorkspaceWriteReport | WorkspaceWriteReport[]) {
  return mergeSourceSaveReports(current, reports);
}
