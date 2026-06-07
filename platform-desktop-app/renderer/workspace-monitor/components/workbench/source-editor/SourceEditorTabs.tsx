import { X } from "lucide-react";

import type { SourceDraftEntry, WorkspaceTextFile } from "@/types/desktop";

import { isSourceDraftEntryDirty } from "./sourceDrafts";
import type { SourceWorkbenchCopy } from "./sourceWorkbenchTypes";

export type SourceEditorTabsProps = {
  copy: SourceWorkbenchCopy;
  openDraftEntries: SourceDraftEntry[];
  sourceEditorLocked: boolean;
  sourceFile: WorkspaceTextFile | null;
  onCloseDraftByPath: (relativePath: string) => void;
  onSelectDraftEntry: (relativePath: string) => void;
};

export function SourceEditorTabs({
  copy,
  openDraftEntries,
  sourceEditorLocked,
  sourceFile,
  onCloseDraftByPath,
  onSelectDraftEntry
}: SourceEditorTabsProps) {
  if (openDraftEntries.length === 0) {
    return null;
  }

  return (
    <div className="source-editor-tabs" role="tablist" aria-label={copy.openedDrafts}>
      {openDraftEntries.map((entry) => {
        const dirty = isSourceDraftEntryDirty(entry);
        const activeDraft = sourceFile?.relativePath === entry.relativePath;
        return (
          <div
            key={entry.relativePath}
            className={`source-editor-tab ${activeDraft ? "active" : ""} ${dirty ? "dirty" : "clean"}`}
            role="presentation"
          >
            <button
              type="button"
              className="source-editor-tab-main"
              role="tab"
              aria-selected={activeDraft}
              onClick={() => onSelectDraftEntry(entry.relativePath)}
              disabled={sourceEditorLocked}
            >
              <span>{dirty ? copy.dirty : copy.clean}</span>
              <strong>{entry.relativePath}</strong>
            </button>
            <button
              type="button"
              className="source-editor-tab-close"
              onClick={() => onCloseDraftByPath(entry.relativePath)}
              disabled={sourceEditorLocked}
              aria-label={`Close ${entry.relativePath}`}
            >
              <X size={14} aria-hidden="true" />
            </button>
          </div>
        );
      })}
    </div>
  );
}

