import { CheckCircle2, Code2, FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/Button";
import type { SourceDraftEntry, UiLanguage, WorkspaceWriteReport } from "@/types/desktop";

import type { SourceWorkbenchView } from "./sourceDraftActions";
import type { SourceWorkbenchStateSetter } from "./sourceWorkbenchTypes";

export type SourceWorkbenchSwitcherProps = {
  filteredFileCount: number;
  isFileWorkspaceSurface: boolean;
  openDraftEntries: SourceDraftEntry[];
  setSourceWorkbenchView: SourceWorkbenchStateSetter<SourceWorkbenchView>;
  sourceSaveResults: WorkspaceWriteReport[];
  sourceWorkbenchView: SourceWorkbenchView;
  uiLanguage: UiLanguage;
};

export function SourceWorkbenchSwitcher({
  filteredFileCount,
  isFileWorkspaceSurface,
  openDraftEntries,
  setSourceWorkbenchView,
  sourceSaveResults,
  sourceWorkbenchView,
  uiLanguage
}: SourceWorkbenchSwitcherProps) {
  return (
    <div className="source-workbench-switcher" role="tablist" aria-label={uiLanguage === "ko" ? "소스 작업 보기" : "Source workbench views"}>
      {!isFileWorkspaceSurface && (
        <Button
          variant="ghost"
          size="sm"
          role="tab"
          aria-selected={sourceWorkbenchView === "files"}
          className={sourceWorkbenchView === "files" ? "active" : ""}
          onClick={() => setSourceWorkbenchView("files")}
        >
          <FolderOpen size={15} aria-hidden="true" />
          <span>{uiLanguage === "ko" ? "파일" : "Files"}</span>
          <small>{filteredFileCount.toLocaleString("ko-KR")}</small>
        </Button>
      )}
      <Button
        variant="ghost"
        size="sm"
        role="tab"
        aria-selected={sourceWorkbenchView === "editor"}
        className={sourceWorkbenchView === "editor" ? "active" : ""}
        onClick={() => setSourceWorkbenchView("editor")}
      >
        <Code2 size={15} aria-hidden="true" />
        <span>{uiLanguage === "ko" ? "편집" : "Editor"}</span>
        <small>{openDraftEntries.length.toLocaleString("ko-KR")}</small>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        role="tab"
        aria-selected={sourceWorkbenchView === "results"}
        className={sourceWorkbenchView === "results" ? "active" : ""}
        onClick={() => setSourceWorkbenchView("results")}
      >
        <CheckCircle2 size={15} aria-hidden="true" />
        <span>{uiLanguage === "ko" ? "저장 결과" : "Save results"}</span>
        <small>{sourceSaveResults.length.toLocaleString("ko-KR")}</small>
      </Button>
    </div>
  );
}

