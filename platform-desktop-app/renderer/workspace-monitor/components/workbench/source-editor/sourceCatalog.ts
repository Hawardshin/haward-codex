import type { WorkspaceSourceFile } from "@/lib/snapshot";

type WorkspaceRootSource = {
  activeWorkspacePath?: string | null;
  fallbackWorkspacePath?: string | null;
} | null;

export function selectSourceCatalogFiles(
  runtimeFiles: WorkspaceSourceFile[],
  snapshotFiles: WorkspaceSourceFile[]
) {
  return runtimeFiles.length ? runtimeFiles : snapshotFiles;
}

export function findAgentsInstructionPath(files: WorkspaceSourceFile[]) {
  return files.find((file) => file.path === "AGENTS.md")?.path || files.find((file) => file.path.endsWith("/AGENTS.md"))?.path || "";
}

export function sourceCatalogLabelFor(hasPreparedWorkspace: boolean, hasRuntimeFiles: boolean) {
  if (hasPreparedWorkspace) {
    return "native cache";
  }
  return hasRuntimeFiles ? "runtime" : "snapshot";
}

export function listEditableSourceFiles(
  shouldPrepareSourceWorkspace: boolean,
  files: WorkspaceSourceFile[],
  maxFiles = 240
) {
  if (!shouldPrepareSourceWorkspace) {
    return [];
  }
  return files.filter((file) => !file.truncated).slice(0, maxFiles);
}

export function filterEditableSourceFiles(
  shouldPrepareSourceWorkspace: boolean,
  files: WorkspaceSourceFile[],
  filter: string,
  maxFiles = 80
) {
  if (!shouldPrepareSourceWorkspace) {
    return [];
  }
  const normalizedFilter = filter.trim().toLowerCase();
  if (!normalizedFilter) {
    return files.slice(0, maxFiles);
  }
  return files
    .filter((file) =>
      [file.path, file.project, file.language, file.extension]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedFilter))
    )
    .slice(0, maxFiles);
}

export function findSelectedSourceFileOption(
  filteredFiles: WorkspaceSourceFile[],
  catalogFiles: WorkspaceSourceFile[],
  selectedPath: string
) {
  return filteredFiles.find((file) => file.path === selectedPath) || catalogFiles.find((file) => file.path === selectedPath) || null;
}

export function workspaceExplorerRootLabelFor(workspace: WorkspaceRootSource) {
  return (
    workspace?.activeWorkspacePath?.split(/[\\/]/).filter(Boolean).pop() ||
    workspace?.fallbackWorkspacePath?.split(/[\\/]/).filter(Boolean).pop() ||
    "workspace"
  );
}
