import { Code2 } from "lucide-react";

import type { WorkspaceSourceFile } from "@/lib/snapshot";
import type { UiLanguage, WorkspaceTextFile, WorkspaceTextFileListReport } from "@/types/desktop";

import type { SourceWorkbenchCopy } from "./sourceWorkbenchTypes";

export type SourceFileBrowserProps = {
  copy: SourceWorkbenchCopy;
  filteredEditableSourceFiles: WorkspaceSourceFile[];
  formatBytes: (bytes: number) => string;
  invokeAvailable: boolean;
  runtimeSourceFileCount: number;
  sourceCatalogReport: WorkspaceTextFileListReport | null;
  sourceEditorLocked: boolean;
  sourceFile: WorkspaceTextFile | null;
  sourceFilter: string;
  uiLanguage: UiLanguage;
  onOpenDraftOrLoad: (relativePath: string) => void | Promise<void>;
  onSourceFilterChange: (value: string) => void;
};

export function SourceFileBrowser({
  copy,
  filteredEditableSourceFiles,
  formatBytes,
  invokeAvailable,
  runtimeSourceFileCount,
  sourceCatalogReport,
  sourceEditorLocked,
  sourceFile,
  sourceFilter,
  onOpenDraftOrLoad,
  onSourceFilterChange
}: SourceFileBrowserProps) {
  return (
    <aside className="source-file-browser">
      <header>
        <div>
          <span>{runtimeSourceFileCount ? copy.runtimeSource : copy.fallbackSource}</span>
          <strong>{filteredEditableSourceFiles.length.toLocaleString("ko-KR")} shown</strong>
        </div>
        <Code2 size={16} aria-hidden="true" />
      </header>
      {sourceCatalogReport && (
        <p className="source-catalog-note">
          {sourceCatalogReport.returnedCount}/{sourceCatalogReport.totalCount} files
          {sourceCatalogReport.truncated ? " / truncated" : ""}
        </p>
      )}
      <input
        value={sourceFilter}
        onChange={(event) => onSourceFilterChange(event.target.value)}
        placeholder={copy.fileSearch}
      />
      <div className="source-file-browser-list">
        {filteredEditableSourceFiles.length ? (
          filteredEditableSourceFiles.map((file) => (
            <button
              key={file.id}
              type="button"
              className={sourceFile?.relativePath === file.path ? "active" : ""}
              onClick={() => onOpenDraftOrLoad(file.path)}
              disabled={!invokeAvailable || sourceEditorLocked}
            >
              <strong>{file.path}</strong>
              <span>
                {file.project} / {file.language || file.extension} / {formatBytes(file.sizeBytes)}
              </span>
            </button>
          ))
        ) : (
          <p className="empty-state">{copy.noFiles}</p>
        )}
      </div>
    </aside>
  );
}

