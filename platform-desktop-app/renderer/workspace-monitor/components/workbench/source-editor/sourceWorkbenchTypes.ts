export type SourceEditorViewMode = "edit" | "diff";

export type SourceWorkbenchCopy = {
  clean: string;
  copyFile: string;
  description: string;
  diffMode: string;
  dirty: string;
  editMode: string;
  editorSettings: string;
  fallbackSource: string;
  fileList: string;
  fileSearch: string;
  foldAll: string;
  loading: string;
  minimap: string;
  noFileOpen: string;
  noFiles: string;
  openSelected: string;
  openedDrafts: string;
  runtimeSource: string;
  saveAll: string;
  saveCurrent: string;
  saving: string;
  title: string;
  unfoldAll: string;
  wordWrap: string;
  activeWorkspace: string;
  folderSource: string;
  workspaceState: string;
};

export type SourceWorkbenchStateSetter<T> = (value: T | ((current: T) => T)) => void;

