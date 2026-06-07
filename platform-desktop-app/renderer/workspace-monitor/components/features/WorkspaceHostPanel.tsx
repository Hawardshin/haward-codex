import { Activity, FolderOpen, GitBranch } from "lucide-react";

import type { DesktopWorkspaceStateReport, UiLanguage } from "@/types/desktop";

type WorkspaceHostPanelProps = {
  uiLanguage: UiLanguage;
  desktopWorkspace: DesktopWorkspaceStateReport | null;
  workspaceHostBusy: string;
  workspaceHostNotice: string;
  workspaceImportPath: string;
  workspaceCloneUrl: string;
  workspaceCloneFolder: string;
  invokeAvailable: boolean;
  chooseButtonClassName?: string;
  refreshButtonClassName?: string;
  importButtonClassName?: string;
  cloneButtonClassName?: string;
  onChooseWorkspace: () => void;
  onRefreshWorkspace: () => void;
  onImportWorkspace: () => void;
  onCloneWorkspace: () => void;
  onWorkspaceImportPathChange: (value: string) => void;
  onWorkspaceCloneUrlChange: (value: string) => void;
  onWorkspaceCloneFolderChange: (value: string) => void;
};

export function WorkspaceHostPanel({
  uiLanguage,
  desktopWorkspace,
  workspaceHostBusy,
  workspaceHostNotice,
  workspaceImportPath,
  workspaceCloneUrl,
  workspaceCloneFolder,
  invokeAvailable,
  chooseButtonClassName,
  refreshButtonClassName,
  importButtonClassName,
  cloneButtonClassName,
  onChooseWorkspace,
  onRefreshWorkspace,
  onImportWorkspace,
  onCloneWorkspace,
  onWorkspaceImportPathChange,
  onWorkspaceCloneUrlChange,
  onWorkspaceCloneFolderChange
}: WorkspaceHostPanelProps) {
  const copy = uiLanguage === "ko"
    ? {
        title: "작업공간",
        permission: "권한",
        permissionBusy: "요청 중",
        permissionAria: "작업공간 접근 권한 요청",
        refresh: "갱신",
        refreshing: "갱신 중",
        refreshAria: "작업공간 상태 새로고침",
        status: "상태",
        notLoaded: "불러오지 않음",
        source: "출처",
        pending: "대기 중",
        missing: "없음",
        operation: "최근 작업",
        none: "없음",
        lastStatus: "최근 상태",
        unset: "미설정",
        importPath: "가져올 경로",
        import: "가져오기",
        importing: "가져오는 중",
        importAria: "기존 작업공간 가져오기",
        repoUrl: "저장소 URL",
        folderName: "폴더 이름",
        clone: "복제",
        cloning: "복제 중",
        cloneAria: "저장소를 작업공간으로 복제",
        activeWorkspace: "현재 작업공간",
        runtimePending: "런타임 작업공간 대기 중",
        managedRoot: "관리 루트",
        managedPending: "앱 데이터 작업공간 루트 대기 중",
        stateFile: "상태 파일",
        statePending: "작업공간 상태 대기 중",
        gitVersion: "Git 버전",
        notChecked: "미점검",
        available: "사용 가능"
      }
    : {
        title: "Workspace",
        permission: "Access",
        permissionBusy: "Requesting",
        permissionAria: "Request workspace access",
        refresh: "Refresh",
        refreshing: "Refreshing",
        refreshAria: "Refresh workspace status",
        status: "status",
        notLoaded: "not-loaded",
        source: "source",
        pending: "pending",
        missing: "missing",
        operation: "operation",
        none: "none",
        lastStatus: "last status",
        unset: "unset",
        importPath: "Import path",
        import: "Import",
        importing: "Importing",
        importAria: "Import an existing workspace",
        repoUrl: "Repository URL",
        folderName: "Folder name",
        clone: "Clone",
        cloning: "Cloning",
        cloneAria: "Clone repository into a workspace",
        activeWorkspace: "active workspace",
        runtimePending: "runtime workspace pending",
        managedRoot: "managed root",
        managedPending: "app data workspace root pending",
        stateFile: "state file",
        statePending: "workspace state pending",
        gitVersion: "git version",
        notChecked: "not checked",
        available: "available"
      };

  return (
    <section className="panel wide desktop-workspace-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Workspace Host</p>
          <h2>{copy.title}</h2>
        </div>
        <div className="desktop-actions">
          <button
            type="button"
            className={chooseButtonClassName}
            data-desktop-action-feedback="choose-workspace"
            onClick={onChooseWorkspace}
            disabled={!invokeAvailable || workspaceHostBusy !== ""}
            aria-label={copy.permissionAria}
            title={copy.permissionAria}
          >
            <FolderOpen size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "choose" ? copy.permissionBusy : copy.permission}</span>
          </button>
          <button
            type="button"
            className={refreshButtonClassName}
            data-desktop-action-feedback="refresh-workspace-host"
            onClick={onRefreshWorkspace}
            disabled={!invokeAvailable || workspaceHostBusy !== ""}
            aria-label={copy.refreshAria}
            title={copy.refreshAria}
          >
            <Activity size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "refresh" ? copy.refreshing : copy.refresh}</span>
          </button>
        </div>
      </div>
      {workspaceHostNotice && <p className="decision-resume-notice">{workspaceHostNotice}</p>}

      <div className="task-run-summary-strip">
        <article>
          <span>{copy.status}</span>
          <strong>{desktopWorkspace?.status || copy.notLoaded}</strong>
        </article>
        <article>
          <span>{copy.source}</span>
          <strong>{desktopWorkspace?.activeWorkspaceSource || copy.pending}</strong>
        </article>
        <article>
          <span>git</span>
          <strong>{desktopWorkspace?.gitAvailable ? copy.available : copy.missing}</strong>
        </article>
        <article>
          <span>{copy.operation}</span>
          <strong>{desktopWorkspace?.lastOperation || copy.none}</strong>
        </article>
        <article>
          <span>{copy.lastStatus}</span>
          <strong>{desktopWorkspace?.lastStatus || copy.unset}</strong>
        </article>
      </div>

      <div className="task-pipe-layout">
        <div className="task-pipe-controls">
          <label>
            <span>{copy.importPath}</span>
            <input
              value={workspaceImportPath}
              onChange={(event) => onWorkspaceImportPathChange(event.target.value)}
              placeholder="/absolute/workspace/path"
            />
          </label>
          <button
            type="button"
            className={importButtonClassName}
            data-desktop-action-feedback="import-workspace"
            onClick={onImportWorkspace}
            disabled={!invokeAvailable || workspaceHostBusy !== "" || !workspaceImportPath.trim()}
            aria-label={copy.importAria}
            title={copy.importAria}
          >
            <FolderOpen size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "import" ? copy.importing : copy.import}</span>
          </button>
          <label>
            <span>{copy.repoUrl}</span>
            <input
              value={workspaceCloneUrl}
              onChange={(event) => onWorkspaceCloneUrlChange(event.target.value)}
              placeholder="https://github.com/org/repo.git"
            />
          </label>
          <label>
            <span>{copy.folderName}</span>
            <input
              value={workspaceCloneFolder}
              onChange={(event) => onWorkspaceCloneFolderChange(event.target.value)}
              placeholder="managed-workspace"
            />
          </label>
          <button
            type="button"
            className={cloneButtonClassName}
            data-desktop-action-feedback="clone-workspace"
            onClick={onCloneWorkspace}
            disabled={!invokeAvailable || workspaceHostBusy !== "" || !workspaceCloneUrl.trim()}
            aria-label={copy.cloneAria}
            title={copy.cloneAria}
          >
            <GitBranch size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "clone" ? copy.cloning : copy.clone}</span>
          </button>
        </div>

        <div className="task-pipe-summary">
          <article>
            <span>{copy.activeWorkspace}</span>
            <code>{desktopWorkspace?.activeWorkspacePath || copy.runtimePending}</code>
          </article>
          <article>
            <span>{copy.managedRoot}</span>
            <code>{desktopWorkspace?.managedWorkspaceRoot || copy.managedPending}</code>
          </article>
          <article>
            <span>{copy.stateFile}</span>
            <code>{desktopWorkspace?.statePath || copy.statePending}</code>
          </article>
          <article>
            <span>{copy.gitVersion}</span>
            <strong>{desktopWorkspace?.gitVersion || copy.notChecked}</strong>
          </article>
        </div>
      </div>
    </section>
  );
}
