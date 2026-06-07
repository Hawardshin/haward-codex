import type { SourceDraftEntry, WorkspaceTextFile, WorkspaceWriteReport } from "@/types/desktop";

export type SourceDraftMap = Record<string, SourceDraftEntry>;

export const sourceSaveResultsLimit = 8;

export function isSourceDraftEntryDirty(entry: SourceDraftEntry) {
  return entry.content !== entry.baseContent;
}

export function listOpenSourceDraftEntries(drafts: SourceDraftMap) {
  return Object.values(drafts).sort((left, right) => left.relativePath.localeCompare(right.relativePath));
}

export function listDirtySourceDraftEntries(entries: SourceDraftEntry[]) {
  return entries.filter(isSourceDraftEntryDirty);
}

export function buildDirtySourcePathSet(entries: SourceDraftEntry[]) {
  return new Set(entries.map((entry) => entry.relativePath));
}

export function findCurrentSourceDraftEntry(drafts: SourceDraftMap, file: WorkspaceTextFile | null) {
  return file ? drafts[file.relativePath] ?? null : null;
}

export function isCurrentSourceDraftDirty(
  entry: SourceDraftEntry | null,
  file: WorkspaceTextFile | null,
  visibleDraftContent: string
) {
  if (entry) {
    return isSourceDraftEntryDirty(entry);
  }
  return file ? visibleDraftContent !== file.content : false;
}

export function createSourceDraftEntry(
  file: WorkspaceTextFile,
  content = file.content,
  loadedAt = new Date().toISOString()
): SourceDraftEntry {
  return {
    relativePath: file.relativePath,
    baseContent: file.content,
    content,
    sizeBytes: file.sizeBytes,
    maxSizeBytes: file.maxSizeBytes,
    loadedAt
  };
}

export function upsertSourceDraftContent(
  drafts: SourceDraftMap,
  file: WorkspaceTextFile,
  content: string
): SourceDraftMap {
  const existing = drafts[file.relativePath] || createSourceDraftEntry(file);
  return {
    ...drafts,
    [file.relativePath]: {
      ...existing,
      content
    }
  };
}

export function buildEffectiveSourceDrafts(
  drafts: SourceDraftMap,
  file: WorkspaceTextFile | null,
  visibleContent: string
): SourceDraftMap {
  if (!file) {
    return drafts;
  }
  return upsertSourceDraftContent(drafts, file, visibleContent);
}

export function removeSourceDraftByPath(drafts: SourceDraftMap, relativePath: string): SourceDraftMap {
  if (!drafts[relativePath]) {
    return drafts;
  }
  const next = { ...drafts };
  delete next[relativePath];
  return next;
}

export function applySourceDraftSaveReport(
  draft: SourceDraftEntry,
  report: WorkspaceWriteReport,
  contentAfterSave = draft.content
): SourceDraftEntry {
  return {
    ...draft,
    baseContent: draft.content,
    content: contentAfterSave,
    sizeBytes: report.sizeBytes,
    lastSavedBackupPath: report.backupPath,
    status: report.status
  };
}

export function upsertSavedSourceDraft(
  drafts: SourceDraftMap,
  file: WorkspaceTextFile,
  report: WorkspaceWriteReport,
  savedContent: string,
  contentAfterSave?: string
): SourceDraftMap {
  const existing = drafts[file.relativePath] || createSourceDraftEntry(file, savedContent);
  return {
    ...drafts,
    [file.relativePath]: {
      ...existing,
      baseContent: savedContent,
      content: contentAfterSave ?? existing.content,
      sizeBytes: report.sizeBytes,
      lastSavedBackupPath: report.backupPath,
      status: report.status
    }
  };
}

export function mergeSourceSaveReports(
  current: WorkspaceWriteReport[],
  reports: WorkspaceWriteReport | WorkspaceWriteReport[],
  limit = sourceSaveResultsLimit
) {
  const reportsToAdd = Array.isArray(reports) ? reports : [reports];
  if (reportsToAdd.length === 0) {
    return current.slice(0, limit);
  }
  const savedPaths = new Set(reportsToAdd.map((report) => report.relativePath));
  return [
    ...reportsToAdd,
    ...current.filter((report) => !savedPaths.has(report.relativePath))
  ].slice(0, limit);
}
