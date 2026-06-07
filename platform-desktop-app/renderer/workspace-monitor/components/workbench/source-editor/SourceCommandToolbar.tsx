import { Code2, FileSearch, History, LayoutDashboard, Search } from "lucide-react";

import { ActionGroup } from "@/components/ui/ActionGroup";
import { Button } from "@/components/ui/Button";
import type { WorkspaceTextFile } from "@/types/desktop";

import type {
  SourceEditorViewMode,
  SourceWorkbenchCopy,
  SourceWorkbenchStateSetter
} from "./sourceWorkbenchTypes";
import type { SourceEditorCommand } from "./useSourceWorkbenchController";

export type SourceCommandToolbarProps = {
  copy: SourceWorkbenchCopy;
  setSourceEditorViewMode: SourceWorkbenchStateSetter<SourceEditorViewMode>;
  setSourceMinimapEnabled: SourceWorkbenchStateSetter<boolean>;
  setSourceWordWrap: SourceWorkbenchStateSetter<boolean>;
  sourceEditorLocked: boolean;
  sourceEditorViewMode: SourceEditorViewMode;
  sourceFile: WorkspaceTextFile | null;
  sourceMinimapEnabled: boolean;
  sourceWordWrap: boolean;
  onRunSourceEditorCommand: (command: SourceEditorCommand) => void | Promise<void>;
};

export function SourceCommandToolbar({
  copy,
  setSourceEditorViewMode,
  setSourceMinimapEnabled,
  setSourceWordWrap,
  sourceEditorLocked,
  sourceEditorViewMode,
  sourceFile,
  sourceMinimapEnabled,
  sourceWordWrap,
  onRunSourceEditorCommand
}: SourceCommandToolbarProps) {
  const commandDisabled = !sourceFile || sourceEditorLocked || sourceEditorViewMode === "diff";

  return (
    <ActionGroup className="source-command-toolbar" asToolbar aria-label={copy.editorSettings} density="compact">
      <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => onRunSourceEditorCommand("undo")} disabled={commandDisabled}>
        <History size={15} aria-hidden="true" />
        <span>Undo</span>
      </Button>
      <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => onRunSourceEditorCommand("redo")} disabled={commandDisabled}>
        <History size={15} aria-hidden="true" />
        <span>Redo</span>
      </Button>
      <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => onRunSourceEditorCommand("find")} disabled={commandDisabled}>
        <Search size={15} aria-hidden="true" />
        <span>Find</span>
      </Button>
      <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => onRunSourceEditorCommand("replace")} disabled={commandDisabled}>
        <Search size={15} aria-hidden="true" />
        <span>Replace</span>
      </Button>
      <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => onRunSourceEditorCommand("format")} disabled={!sourceFile || sourceEditorLocked || sourceEditorViewMode === "diff"}>
        <Code2 size={15} aria-hidden="true" />
        <span>Format</span>
      </Button>
      <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => onRunSourceEditorCommand("foldAll")} disabled={commandDisabled}>
        <Code2 size={15} aria-hidden="true" />
        <span>{copy.foldAll}</span>
      </Button>
      <Button variant="ghost" size="sm" className="source-tool-button" onClick={() => onRunSourceEditorCommand("unfoldAll")} disabled={commandDisabled}>
        <Code2 size={15} aria-hidden="true" />
        <span>{copy.unfoldAll}</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="source-tool-button mode"
        onClick={() => setSourceEditorViewMode((current) => (current === "edit" ? "diff" : "edit"))}
        disabled={!sourceFile || sourceEditorLocked}
      >
        <FileSearch size={15} aria-hidden="true" />
        <span>{sourceEditorViewMode === "edit" ? copy.diffMode : copy.editMode}</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setSourceWordWrap((current) => !current)} className={`source-tool-button toggle ${sourceWordWrap ? "active" : ""}`} aria-pressed={sourceWordWrap}>
        <Code2 size={15} aria-hidden="true" />
        <span>{copy.wordWrap}</span>
      </Button>
      <Button variant="ghost" size="sm" onClick={() => setSourceMinimapEnabled((current) => !current)} className={`source-tool-button toggle ${sourceMinimapEnabled ? "active" : ""}`} aria-pressed={sourceMinimapEnabled}>
        <LayoutDashboard size={15} aria-hidden="true" />
        <span>{copy.minimap}</span>
      </Button>
    </ActionGroup>
  );
}

