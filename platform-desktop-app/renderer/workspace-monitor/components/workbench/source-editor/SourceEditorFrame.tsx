"use client";

import dynamic from "next/dynamic";
import type { editor } from "monaco-editor";
import { CheckCircle2, Copy, FileSearch } from "lucide-react";

import { ActionGroup } from "@/components/ui/ActionGroup";
import { Button } from "@/components/ui/Button";
import type {
  SourceDiffSummary,
  UiLanguage,
  WorkspaceTextFile,
  WorkspaceWriteReport
} from "@/types/desktop";

import {
  definePlatformMonacoTheme,
  monacoDiffEditorOptions,
  platformMonacoTheme
} from "./monacoConfig";
import { monacoLanguageFromPath } from "./sourceLanguage";
import type {
  SourceEditorViewMode,
  SourceWorkbenchCopy,
  SourceWorkbenchStateSetter
} from "./sourceWorkbenchTypes";

const MonacoEditor = dynamic(() => import("@monaco-editor/react").then((module) => module.default), {
  ssr: false,
  loading: () => <div className="monaco-editor-loading">Loading Monaco editor</div>
});

const MonacoDiffEditor = dynamic(() => import("@monaco-editor/react").then((module) => module.DiffEditor), {
  ssr: false,
  loading: () => <div className="monaco-editor-loading">Loading Monaco diff</div>
});

export type SourceEditorFrameProps = {
  activeMonacoEditorOptions: editor.IStandaloneEditorConstructionOptions;
  copy: SourceWorkbenchCopy;
  currentSourceDirty: boolean;
  editorBusy: boolean;
  formatBytes: (bytes: number) => string;
  invokeAvailable: boolean;
  setSourceEditorViewMode: SourceWorkbenchStateSetter<SourceEditorViewMode>;
  sourceCopyNotice: string;
  sourceDiff: SourceDiffSummary | null;
  sourceDraft: string;
  sourceEditorLocked: boolean;
  sourceEditorViewMode: SourceEditorViewMode;
  sourceFile: WorkspaceTextFile;
  uiLanguage: UiLanguage;
  writeReport: WorkspaceWriteReport | null;
  onCopyCurrentSourceDraft: () => void | Promise<void>;
  onHandleSourceEditorMount: (editorInstance: editor.IStandaloneCodeEditor) => void;
  onSaveSourceFile: () => void | Promise<void>;
  onUpdateSourceDraft: (nextContent: string) => void;
};

export function SourceEditorFrame({
  activeMonacoEditorOptions,
  copy,
  currentSourceDirty,
  editorBusy,
  formatBytes,
  invokeAvailable,
  setSourceEditorViewMode,
  sourceCopyNotice,
  sourceDiff,
  sourceDraft,
  sourceEditorLocked,
  sourceEditorViewMode,
  sourceFile,
  uiLanguage,
  writeReport,
  onCopyCurrentSourceDraft,
  onHandleSourceEditorMount,
  onSaveSourceFile,
  onUpdateSourceDraft
}: SourceEditorFrameProps) {
  return (
    <div className="source-editor-frame" tabIndex={0} aria-label={uiLanguage === "ko" ? "소스 편집 스크롤 영역" : "Source editor scroll region"}>
      <div className="source-editor-meta">
        <div>
          <span>{sourceFile.relativePath}</span>
          <strong>
            {formatBytes(sourceDraft.length)} / max {formatBytes(sourceFile.maxSizeBytes)}
          </strong>
        </div>
        <ActionGroup className="source-editor-primary-actions" asToolbar align="end" density="compact" aria-label={copy.editorSettings}>
          <Button
            variant="secondary"
            size="sm"
            className="save"
            onClick={onSaveSourceFile}
            disabled={!invokeAvailable || sourceEditorLocked || !sourceFile || !currentSourceDirty}
          >
            <CheckCircle2 size={14} aria-hidden="true" />
            <span>{editorBusy ? copy.saving : copy.saveCurrent}</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setSourceEditorViewMode((current) => (current === "edit" ? "diff" : "edit"))} disabled={sourceEditorLocked}>
            <FileSearch size={14} aria-hidden="true" />
            <span>{sourceEditorViewMode === "edit" ? copy.diffMode : copy.editMode}</span>
          </Button>
          <Button variant="secondary" size="sm" onClick={onCopyCurrentSourceDraft}>
            <Copy size={14} aria-hidden="true" />
            <span>{copy.copyFile}</span>
          </Button>
        </ActionGroup>
      </div>
      {sourceDiff && (
        <div className={`source-diff-review ${sourceDiff.dirty ? "dirty" : "clean"}`}>
          <header>
            <div>
              <span>{sourceDiff.dirty ? copy.dirty : copy.clean}</span>
              <strong>
                +{sourceDiff.addedLines} / -{sourceDiff.removedLines} / {sourceDiff.changedLines} changed
              </strong>
            </div>
            <small>backup save gate</small>
          </header>
          {sourceDiff.preview.length > 0 && (
            <div className="source-diff-preview">
              {sourceDiff.preview.map((item) => (
                <article key={item.line}>
                  <span>line {item.line}</span>
                  <code>- {item.before || "<empty>"}</code>
                  <code>+ {item.after || "<empty>"}</code>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
      {sourceEditorViewMode === "diff" ? (
        <div className="monaco-editor-shell diff-shell">
          <MonacoDiffEditor
            beforeMount={definePlatformMonacoTheme}
            height="100%"
            language={monacoLanguageFromPath(sourceFile.relativePath)}
            loading={<div className="monaco-editor-loading">Loading Monaco diff</div>}
            modified={sourceDraft}
            options={monacoDiffEditorOptions}
            original={sourceFile.content}
            theme={platformMonacoTheme}
          />
        </div>
      ) : (
        <div className="monaco-editor-shell">
          <MonacoEditor
            beforeMount={definePlatformMonacoTheme}
            height="100%"
            language={monacoLanguageFromPath(sourceFile.relativePath)}
            loading={<div className="monaco-editor-loading">Loading Monaco editor</div>}
            onMount={onHandleSourceEditorMount}
            onChange={(value) => onUpdateSourceDraft(value ?? "")}
            options={activeMonacoEditorOptions}
            path={`file:///${sourceFile.relativePath.replace(/^\/+/, "")}`}
            theme={platformMonacoTheme}
            value={sourceDraft}
          />
        </div>
      )}
      {sourceCopyNotice && <p className="source-copy-notice">{sourceCopyNotice}</p>}
      {writeReport && (
        <div className="source-inline-save-receipt" role="status">
          <span className="source-result-status-mark">
            <CheckCircle2 size={16} aria-hidden="true" />
          </span>
          <div>
            <span>{uiLanguage === "ko" ? "저장 완료" : "Saved"}</span>
            <strong>{writeReport.relativePath}</strong>
            <code>{writeReport.backupPath}</code>
          </div>
        </div>
      )}
    </div>
  );
}

