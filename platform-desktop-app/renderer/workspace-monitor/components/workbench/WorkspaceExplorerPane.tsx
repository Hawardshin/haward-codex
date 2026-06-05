"use client";

import { Activity, ChevronRight, Code2, Folder, FolderOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { ActionGroup } from "@/components/ui/ActionGroup";
import { Button } from "@/components/ui/Button";
import type { WorkspaceSourceFile } from "@/lib/snapshot";

type WorkspaceExplorerCopy = {
  activeWorkspace: string;
  chooseFolder: string;
  choosingFolder: string;
  dirty: string;
  explorerHint: string;
  fallbackSource: string;
  fileSearch: string;
  fileTree: string;
  folderSource: string;
  loading: string;
  noFiles: string;
  permissionDetail: string;
  refreshFiles: string;
  refreshWorkspace: string;
  runtimeSource: string;
  uploadDropzone: string;
  uploadDropzoneDetail: string;
  workspaceState: string;
  eyebrow: string;
};

export type WorkspaceExplorerDirectory = {
  name: string;
  path: string;
  files: WorkspaceSourceFile[];
  children: WorkspaceExplorerDirectory[];
};

type SourceCatalogReportSummary = {
  totalCount: number;
  returnedCount: number;
  truncated: boolean;
};

type WorkspaceExplorerPaneProps = {
  activePath: string;
  catalogLabel: string;
  copy: WorkspaceExplorerCopy;
  dirtyCount: number;
  dirtyPaths: Set<string>;
  editorBusy: boolean;
  files: WorkspaceSourceFile[];
  rootLabel: string;
  runtimeAvailable: boolean;
  sourceCatalogBusy: boolean;
  sourceCatalogReport: SourceCatalogReportSummary | null;
  sourceFilter: string;
  workspaceHostBusy: string;
  workspacePath: string;
  workspaceSource: string;
  onChooseFolder: () => void;
  onOpenFile: (relativePath: string) => Promise<void>;
  onRefreshFiles: () => void;
  onRefreshWorkspace: () => void;
  onSourceFilterChange: (value: string) => void;
};

export function WorkspaceExplorerPane({
  activePath,
  catalogLabel,
  copy,
  dirtyCount,
  dirtyPaths,
  editorBusy,
  files,
  rootLabel,
  runtimeAvailable,
  sourceCatalogBusy,
  sourceCatalogReport,
  sourceFilter,
  workspaceHostBusy,
  workspacePath,
  workspaceSource,
  onChooseFolder,
  onOpenFile,
  onRefreshFiles,
  onRefreshWorkspace,
  onSourceFilterChange
}: WorkspaceExplorerPaneProps) {
  const explorerTree = useMemo(() => buildWorkspaceExplorerTree(files), [files]);
  const folderCount = useMemo(() => countWorkspaceExplorerDirectories(explorerTree), [explorerTree]);

  return (
    <aside className="workspace-explorer-pane" aria-label={copy.fileTree}>
      <header className="workspace-explorer-header">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{rootLabel}</h2>
        </div>
        <span>{catalogLabel}</span>
      </header>

      <Button
        variant="outline"
        className="workspace-dropzone"
        onClick={onChooseFolder}
        loading={workspaceHostBusy === "choose"}
        disabled={!runtimeAvailable || workspaceHostBusy !== ""}
      >
        <FolderOpen size={18} aria-hidden="true" />
        <strong>{workspaceHostBusy === "choose" ? copy.choosingFolder : copy.uploadDropzone}</strong>
        <span>{copy.uploadDropzoneDetail}</span>
      </Button>
      <p className="workspace-permission-hint">{copy.permissionDetail}</p>

      <ActionGroup className="workspace-explorer-actions" direction="column" density="compact" align="stretch">
        <Button
          variant="secondary"
          onClick={onChooseFolder}
          loading={workspaceHostBusy === "choose"}
          disabled={!runtimeAvailable || workspaceHostBusy !== ""}
        >
          <FolderOpen size={15} aria-hidden="true" />
          <span>{copy.chooseFolder}</span>
        </Button>
        <Button
          variant="secondary"
          onClick={onRefreshWorkspace}
          loading={workspaceHostBusy === "refresh"}
          disabled={!runtimeAvailable || workspaceHostBusy !== ""}
        >
          <Activity size={15} aria-hidden="true" />
          <span>{workspaceHostBusy === "refresh" ? copy.loading : copy.refreshWorkspace}</span>
        </Button>
        <Button variant="secondary" onClick={onRefreshFiles} loading={sourceCatalogBusy} disabled={!runtimeAvailable || sourceCatalogBusy}>
          <Search size={15} aria-hidden="true" />
          <span>{sourceCatalogBusy ? copy.loading : copy.refreshFiles}</span>
        </Button>
      </ActionGroup>

      <div className="workspace-explorer-state" aria-label={copy.workspaceState}>
        <article>
          <span>{copy.activeWorkspace}</span>
          <code>{workspacePath}</code>
        </article>
        <article>
          <span>{copy.folderSource}</span>
          <strong>{workspaceSource}</strong>
        </article>
      </div>

      <label className="workspace-explorer-search">
        <span>{copy.fileSearch}</span>
        <input value={sourceFilter} onChange={(event) => onSourceFilterChange(event.target.value)} placeholder={copy.fileSearch} />
      </label>

      <div className="workspace-explorer-meta">
        <span>{files.length.toLocaleString("ko-KR")} files</span>
        <span>{folderCount.toLocaleString("ko-KR")} folders</span>
        <span>
          {dirtyCount.toLocaleString("ko-KR")} {copy.dirty}
        </span>
      </div>

      {sourceCatalogReport && (
        <p className="source-catalog-note">
          {sourceCatalogReport.returnedCount}/{sourceCatalogReport.totalCount} files
          {sourceCatalogReport.truncated ? " / truncated" : ""}
        </p>
      )}

      <div className="workspace-explorer-tree" role="tree" aria-label={copy.fileTree} tabIndex={0}>
        {explorerTree.length ? (
          explorerTree.map((directory) => (
            <WorkspaceExplorerDirectoryView
              key={directory.path}
              directory={directory}
              level={0}
              activePath={activePath}
              dirtyPaths={dirtyPaths}
              editorBusy={editorBusy}
              runtimeAvailable={runtimeAvailable}
              onOpenFile={onOpenFile}
            />
          ))
        ) : (
          <div className="workspace-empty-tree">
            <FolderOpen size={18} aria-hidden="true" />
            <strong>{copy.chooseFolder}</strong>
            <span>{copy.noFiles}</span>
            <small>{copy.explorerHint}</small>
          </div>
        )}
      </div>

      <p className="workspace-explorer-hint">{copy.explorerHint}</p>
    </aside>
  );
}

function WorkspaceExplorerDirectoryView({
  directory,
  level,
  activePath,
  dirtyPaths,
  editorBusy,
  runtimeAvailable,
  onOpenFile
}: {
  directory: WorkspaceExplorerDirectory;
  level: number;
  activePath: string;
  dirtyPaths: Set<string>;
  editorBusy: boolean;
  runtimeAvailable: boolean;
  onOpenFile: (relativePath: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState(level === 0);
  const itemCount = directory.children.length + directory.files.length;

  return (
    <div className="workspace-tree-directory" role="group">
      <button
        type="button"
        className={`workspace-tree-folder ${expanded ? "expanded" : "collapsed"}`}
        role="treeitem"
        aria-expanded={expanded}
        style={{ paddingLeft: `${8 + level * 12}px` }}
        onClick={() => setExpanded((current) => !current)}
      >
        <ChevronRight size={13} aria-hidden="true" />
        {expanded ? <FolderOpen size={14} aria-hidden="true" /> : <Folder size={14} aria-hidden="true" />}
        <strong>{directory.name || "root"}</strong>
        <span>{itemCount}</span>
      </button>
      {expanded && (
        <>
          {directory.children.map((child) => (
            <WorkspaceExplorerDirectoryView
              key={child.path}
              directory={child}
              level={level + 1}
              activePath={activePath}
              dirtyPaths={dirtyPaths}
              editorBusy={editorBusy}
              runtimeAvailable={runtimeAvailable}
              onOpenFile={onOpenFile}
            />
          ))}
          {directory.files.map((file) => {
            const fileName = file.path.split("/").pop() || file.path;
            const active = activePath === file.path;
            const dirty = dirtyPaths.has(file.path);
            return (
              <button
                key={file.id}
                type="button"
                className={`workspace-tree-file ${active ? "active" : ""} ${dirty ? "dirty" : "clean"}`}
                style={{ paddingLeft: `${24 + level * 12}px` }}
                onClick={() => {
                  void onOpenFile(file.path);
                }}
                disabled={!runtimeAvailable || editorBusy}
                role="treeitem"
              >
                <Code2 size={13} aria-hidden="true" />
                <span>{fileName}</span>
                <small>
                  {file.extension || file.language || "file"} / {formatBytes(file.sizeBytes)}
                </small>
              </button>
            );
          })}
        </>
      )}
    </div>
  );
}

export function buildWorkspaceExplorerTree(files: WorkspaceSourceFile[]) {
  const root: WorkspaceExplorerDirectory = {
    name: "",
    path: "",
    files: [],
    children: []
  };

  const ensureChild = (parent: WorkspaceExplorerDirectory, name: string, path: string) => {
    let child = parent.children.find((item) => item.name === name);
    if (!child) {
      child = { name, path, files: [], children: [] };
      parent.children.push(child);
    }
    return child;
  };

  files.forEach((file) => {
    const parts = file.path.split("/").filter(Boolean);
    const fileName = parts.pop();
    if (!fileName || parts.length === 0) {
      root.files.push(file);
      return;
    }

    let current = root;
    let currentPath = "";
    parts.forEach((part) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      current = ensureChild(current, part, currentPath);
    });
    current.files.push(file);
  });

  sortWorkspaceExplorerDirectory(root);

  if (root.files.length > 0) {
    return [
      {
        name: "root files",
        path: "__root-files",
        files: root.files,
        children: []
      },
      ...root.children
    ];
  }

  return root.children;
}

function sortWorkspaceExplorerDirectory(directory: WorkspaceExplorerDirectory) {
  directory.children.sort((left, right) => left.name.localeCompare(right.name));
  directory.files.sort((left, right) => left.path.localeCompare(right.path));
  directory.children.forEach(sortWorkspaceExplorerDirectory);
}

function countWorkspaceExplorerDirectories(directories: WorkspaceExplorerDirectory[]): number {
  return directories.reduce((total, directory) => total + 1 + countWorkspaceExplorerDirectories(directory.children), 0);
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes}B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)}KB`;
  }
  return `${Math.round((bytes / (1024 * 1024)) * 10) / 10}MB`;
}
