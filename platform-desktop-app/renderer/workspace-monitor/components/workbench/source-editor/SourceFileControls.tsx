import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { CheckCircle2, ChevronDown, Copy, FileSearch, Search } from "lucide-react";

import { ActionGroup } from "@/components/ui/ActionGroup";
import { Button } from "@/components/ui/Button";
import type { WorkspaceSourceFile } from "@/lib/snapshot";
import type {
  SourceDraftEntry,
  WorkspaceTextFile,
  WorkspaceTextFileListReport
} from "@/types/desktop";

import type { SourceWorkbenchCopy, SourceWorkbenchStateSetter } from "./sourceWorkbenchTypes";

export type SourceFileControlsProps = {
  copy: SourceWorkbenchCopy;
  currentSourceDirty: boolean;
  dirtyDraftEntries: SourceDraftEntry[];
  editorBusy: boolean;
  filteredEditableSourceFiles: WorkspaceSourceFile[];
  formatBytes: (bytes: number) => string;
  invokeAvailable: boolean;
  saveAllBusy: boolean;
  selectedSourceFileOption: WorkspaceSourceFile | null;
  selectedSourcePath: string;
  setSelectedSourcePath: SourceWorkbenchStateSetter<string>;
  setSourcePathInput: SourceWorkbenchStateSetter<string>;
  sourceCatalogFilesCount: number;
  sourceCatalogLabel: string;
  sourceCatalogReport: WorkspaceTextFileListReport | null;
  sourceEditorLocked: boolean;
  sourceFile: WorkspaceTextFile | null;
  sourceFilter: string;
  sourcePathInput: string;
  onCopyCurrentSourceDraft: () => void | Promise<void>;
  onLoadSourceFile: () => void | Promise<void>;
  onSaveAllSourceDrafts: () => void | Promise<void>;
  onSaveSourceFile: () => void | Promise<void>;
};

export function SourceFileControls({
  copy,
  currentSourceDirty,
  dirtyDraftEntries,
  editorBusy,
  filteredEditableSourceFiles,
  formatBytes,
  invokeAvailable,
  saveAllBusy,
  selectedSourceFileOption,
  selectedSourcePath,
  setSelectedSourcePath,
  setSourcePathInput,
  sourceCatalogFilesCount,
  sourceCatalogLabel,
  sourceCatalogReport,
  sourceEditorLocked,
  sourceFile,
  sourceFilter,
  sourcePathInput,
  onCopyCurrentSourceDraft,
  onLoadSourceFile,
  onSaveAllSourceDrafts,
  onSaveSourceFile
}: SourceFileControlsProps) {
  return (
    <div className="source-editor-controls native-source-controls">
      <label className="source-path-field">
        <span>{copy.openSelected}</span>
        <input
          value={sourcePathInput}
          onChange={(event) => {
            setSourcePathInput(event.target.value);
            setSelectedSourcePath(event.target.value);
          }}
          placeholder="workspace-relative/path.ts"
        />
      </label>
      <div className="source-file-picker-field">
        <span>{copy.fileList}</span>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button
              variant="secondary"
              className="source-file-picker-trigger"
              disabled={filteredEditableSourceFiles.length === 0}
              aria-label={copy.fileList}
              title={selectedSourceFileOption?.path || sourcePathInput || copy.noFiles}
            >
              <FileSearch size={15} aria-hidden="true" />
              <span className="source-file-picker-value">{selectedSourceFileOption?.path || sourcePathInput || copy.noFiles}</span>
              <ChevronDown size={15} aria-hidden="true" className="source-file-picker-caret" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="source-file-picker-menu" align="start" sideOffset={6} collisionPadding={16}>
              <DropdownMenu.Label className="source-file-picker-label">
                <span>{copy.fileList}</span>
                <strong>
                  {filteredEditableSourceFiles.length.toLocaleString("ko-KR")} / {sourceCatalogReport?.totalCount ?? sourceCatalogFilesCount}
                </strong>
              </DropdownMenu.Label>
              <DropdownMenu.Separator className="source-file-picker-separator" />
              {filteredEditableSourceFiles.length ? (
                filteredEditableSourceFiles.map((file) => (
                  <DropdownMenu.Item
                    key={file.id}
                    className="source-file-picker-item"
                    data-selected={file.path === selectedSourcePath ? "true" : "false"}
                    onSelect={() => {
                      setSelectedSourcePath(file.path);
                      setSourcePathInput(file.path);
                    }}
                  >
                    <FileSearch size={14} aria-hidden="true" />
                    <span>
                      <strong>{file.path}</strong>
                      <small>
                        {file.project} / {file.language || file.extension} / {formatBytes(file.sizeBytes)}
                      </small>
                    </span>
                    {file.path === selectedSourcePath && <CheckCircle2 size={14} aria-hidden="true" />}
                  </DropdownMenu.Item>
                ))
              ) : (
                <DropdownMenu.Item className="source-file-picker-item empty" disabled>
                  <Search size={14} aria-hidden="true" />
                  <span>
                    <strong>{copy.noFiles}</strong>
                    <small>{sourceFilter || sourceCatalogLabel}</small>
                  </span>
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
      <ActionGroup className="source-editor-action-group" align="stretch" density="compact">
        <Button
          variant="primary"
          className="source-action-button primary"
          onClick={onLoadSourceFile}
          loading={editorBusy}
          disabled={!invokeAvailable || sourceEditorLocked || !sourcePathInput.trim()}
        >
          <FileSearch size={15} aria-hidden="true" />
          <span>{editorBusy ? copy.loading : copy.openSelected}</span>
        </Button>
        <Button
          variant="secondary"
          className="source-action-button save"
          onClick={onSaveSourceFile}
          loading={editorBusy}
          disabled={!invokeAvailable || sourceEditorLocked || !sourceFile || !currentSourceDirty}
        >
          <CheckCircle2 size={15} aria-hidden="true" />
          <span>{editorBusy ? copy.saving : copy.saveCurrent}</span>
        </Button>
        <Button
          variant="secondary"
          className="source-action-button save-all"
          onClick={onSaveAllSourceDrafts}
          loading={saveAllBusy}
          disabled={!invokeAvailable || sourceEditorLocked || dirtyDraftEntries.length === 0}
        >
          <CheckCircle2 size={15} aria-hidden="true" />
          <span>{saveAllBusy ? copy.saving : copy.saveAll}</span>
        </Button>
        <Button variant="secondary" className="source-action-button secondary" onClick={onCopyCurrentSourceDraft} disabled={!sourceFile}>
          <Copy size={15} aria-hidden="true" />
          <span>{copy.copyFile}</span>
        </Button>
      </ActionGroup>
    </div>
  );
}

