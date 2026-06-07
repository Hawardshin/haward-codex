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
  return (
    <section className="panel wide desktop-workspace-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Workspace Host</p>
          <h2>앱 워크스페이스</h2>
        </div>
        <div className="desktop-actions">
          <button
            type="button"
            className={chooseButtonClassName}
            data-desktop-action-feedback="choose-workspace"
            onClick={onChooseWorkspace}
            disabled={!invokeAvailable || workspaceHostBusy !== ""}
          >
            <FolderOpen size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "choose" ? "권한 요청 중" : "작업공간 접근 권한 요청"}</span>
          </button>
          <button
            type="button"
            className={refreshButtonClassName}
            data-desktop-action-feedback="refresh-workspace-host"
            onClick={onRefreshWorkspace}
            disabled={!invokeAvailable || workspaceHostBusy !== ""}
          >
            <Activity size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "refresh" ? (uiLanguage === "ko" ? "새로고침 중" : "Refreshing") : uiLanguage === "ko" ? "새로고침" : "Refresh"}</span>
          </button>
        </div>
      </div>
      {workspaceHostNotice && <p className="decision-resume-notice">{workspaceHostNotice}</p>}

      <div className="task-run-summary-strip">
        <article>
          <span>{uiLanguage === "ko" ? "상태" : "status"}</span>
          <strong>{desktopWorkspace?.status || (uiLanguage === "ko" ? "불러오지 않음" : "not-loaded")}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "출처" : "source"}</span>
          <strong>{desktopWorkspace?.activeWorkspaceSource || (uiLanguage === "ko" ? "대기 중" : "pending")}</strong>
        </article>
        <article>
          <span>git</span>
          <strong>{desktopWorkspace?.gitAvailable ? (uiLanguage === "ko" ? "사용 가능" : "available") : uiLanguage === "ko" ? "없음" : "missing"}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "최근 작업" : "operation"}</span>
          <strong>{desktopWorkspace?.lastOperation || (uiLanguage === "ko" ? "없음" : "none")}</strong>
        </article>
        <article>
          <span>{uiLanguage === "ko" ? "최근 상태" : "last status"}</span>
          <strong>{desktopWorkspace?.lastStatus || (uiLanguage === "ko" ? "미설정" : "unset")}</strong>
        </article>
      </div>

      <div className="task-pipe-layout">
        <div className="task-pipe-controls">
          <label>
            <span>{uiLanguage === "ko" ? "가져올 경로" : "Import path"}</span>
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
          >
            <FolderOpen size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "import" ? (uiLanguage === "ko" ? "가져오는 중" : "Importing") : uiLanguage === "ko" ? "작업공간 가져오기" : "Import Workspace"}</span>
          </button>
          <label>
            <span>{uiLanguage === "ko" ? "저장소 URL" : "Repository URL"}</span>
            <input
              value={workspaceCloneUrl}
              onChange={(event) => onWorkspaceCloneUrlChange(event.target.value)}
              placeholder="https://github.com/org/repo.git"
            />
          </label>
          <label>
            <span>{uiLanguage === "ko" ? "폴더 이름" : "Folder name"}</span>
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
          >
            <GitBranch size={16} aria-hidden="true" />
            <span>{workspaceHostBusy === "clone" ? (uiLanguage === "ko" ? "복제 중" : "Cloning") : uiLanguage === "ko" ? "작업공간 복제" : "Clone Workspace"}</span>
          </button>
        </div>

        <div className="task-pipe-summary">
          <article>
            <span>{uiLanguage === "ko" ? "현재 작업공간" : "active workspace"}</span>
            <code>{desktopWorkspace?.activeWorkspacePath || (uiLanguage === "ko" ? "런타임 작업공간 대기 중" : "runtime workspace pending")}</code>
          </article>
          <article>
            <span>{uiLanguage === "ko" ? "관리 루트" : "managed root"}</span>
            <code>{desktopWorkspace?.managedWorkspaceRoot || (uiLanguage === "ko" ? "앱 데이터 작업공간 루트 대기 중" : "app data workspace root pending")}</code>
          </article>
          <article>
            <span>{uiLanguage === "ko" ? "상태 파일" : "state file"}</span>
            <code>{desktopWorkspace?.statePath || (uiLanguage === "ko" ? "작업공간 상태 대기 중" : "workspace state pending")}</code>
          </article>
          <article>
            <span>{uiLanguage === "ko" ? "Git 버전" : "git version"}</span>
            <strong>{desktopWorkspace?.gitVersion || (uiLanguage === "ko" ? "미점검" : "not checked")}</strong>
          </article>
        </div>
      </div>
    </section>
  );
}
