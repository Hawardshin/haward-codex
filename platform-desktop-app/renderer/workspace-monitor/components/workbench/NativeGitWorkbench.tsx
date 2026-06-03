import { Activity, ArrowRight, ClipboardCheck, GitBranch } from "lucide-react";

export type DesktopGitFileReport = {
  status: string;
  path: string;
  originalPath?: string | null;
};

export type DesktopGitRemoteReport = {
  name: string;
  url: string;
  direction: string;
};

export type DesktopGitStatusReport = {
  schemaVersion: string;
  status: string;
  workspacePath: string;
  gitAvailable: boolean;
  gitVersion: string;
  repositoryRoot: string;
  branch: string;
  upstream: string;
  ahead: number;
  behind: number;
  clean: boolean;
  conflicted: boolean;
  stagedCount: number;
  unstagedCount: number;
  untrackedCount: number;
  files: DesktopGitFileReport[];
  remotes: DesktopGitRemoteReport[];
  lastCommandStatus: string;
  lastCommandOutput: string;
  lastCommandError: string;
  refreshedAt: string;
  summary: string[];
};

export type DesktopGitActionReport = {
  status: string;
  action: string;
  command: string;
  output: string;
  error: string;
  refreshedAt: string;
  git: DesktopGitStatusReport;
};

export type DesktopGitWorkbenchAction = "refresh" | "create_branch" | "commit_all" | "pull_ff" | "push";

type NativeGitWorkbenchProps = {
  status: DesktopGitStatusReport | null;
  busy: string;
  notice: string;
  branchName: string;
  commitMessage: string;
  runtimeAvailable: boolean;
  workspacePathFallback: string;
  onBranchNameChange: (value: string) => void;
  onCommitMessageChange: (value: string) => void;
  onRunAction: (action: DesktopGitWorkbenchAction) => void;
};

export function NativeGitWorkbench({
  status,
  busy,
  notice,
  branchName,
  commitMessage,
  runtimeAvailable,
  workspacePathFallback,
  onBranchNameChange,
  onCommitMessageChange,
  onRunAction
}: NativeGitWorkbenchProps) {
  const dirtyCount = status ? status.stagedCount + status.unstagedCount + status.untrackedCount : 0;

  return (
    <section className="panel wide native-git-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Native Git Workbench</p>
          <h2>브랜치와 변경사항</h2>
          <p>터미널에 직접 입력하지 않아도 현재 앱 워크스페이스의 Git 상태와 기본 작업을 처리합니다.</p>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={() => onRunAction("refresh")} disabled={!runtimeAvailable || busy !== ""}>
            <Activity size={16} aria-hidden="true" />
            <span>{busy === "refresh" ? "Refreshing" : "Git 상태 새로고침"}</span>
          </button>
        </div>
      </div>
      {notice && <p className="decision-resume-notice">{notice}</p>}

      <div className="task-run-summary-strip native-git-summary">
        <article>
          <span>status</span>
          <strong>{status?.status || "not-loaded"}</strong>
        </article>
        <article>
          <span>branch</span>
          <strong>{status?.branch || "pending"}</strong>
        </article>
        <article>
          <span>upstream</span>
          <strong>{status?.upstream || "not set"}</strong>
        </article>
        <article>
          <span>ahead / behind</span>
          <strong>{status ? `${status.ahead} / ${status.behind}` : "0 / 0"}</strong>
        </article>
        <article>
          <span>dirty</span>
          <strong>{dirtyCount}</strong>
        </article>
      </div>

      <div className="native-git-layout">
        <div className="native-git-actions">
          <label>
            <span>새 브랜치</span>
            <input value={branchName} onChange={(event) => onBranchNameChange(event.target.value)} />
          </label>
          <button type="button" onClick={() => onRunAction("create_branch")} disabled={!runtimeAvailable || busy !== "" || !branchName.trim()}>
            <GitBranch size={16} aria-hidden="true" />
            <span>{busy === "create_branch" ? "Creating" : "브랜치 만들기"}</span>
          </button>
          <label className="wide-field">
            <span>커밋 메시지</span>
            <input value={commitMessage} onChange={(event) => onCommitMessageChange(event.target.value)} />
          </label>
          <button type="button" onClick={() => onRunAction("commit_all")} disabled={!runtimeAvailable || busy !== "" || !commitMessage.trim()}>
            <ClipboardCheck size={16} aria-hidden="true" />
            <span>{busy === "commit_all" ? "Committing" : "전체 변경 커밋"}</span>
          </button>
          <button type="button" onClick={() => onRunAction("pull_ff")} disabled={!runtimeAvailable || busy !== "" || Boolean(status?.conflicted)}>
            <ArrowRight size={16} aria-hidden="true" />
            <span>{busy === "pull_ff" ? "Pulling" : "Pull --ff-only"}</span>
          </button>
          <button type="button" onClick={() => onRunAction("push")} disabled={!runtimeAvailable || busy !== "" || Boolean(status?.conflicted)}>
            <GitBranch size={16} aria-hidden="true" />
            <span>{busy === "push" ? "Pushing" : "Push"}</span>
          </button>
        </div>

        <div className="native-git-file-list" tabIndex={0} aria-label="Git changed files">
          <header>
            <div>
              <span>{status?.repositoryRoot || workspacePathFallback || "repository pending"}</span>
              <h3>변경 파일</h3>
            </div>
            <strong>{status?.clean ? "clean" : status?.conflicted ? "conflict" : "dirty"}</strong>
          </header>
          {(status?.summary || []).map((item) => (
            <p key={item}>{item}</p>
          ))}
          <div className="native-git-remotes">
            {(status?.remotes || []).slice(0, 4).map((remote) => (
              <span key={`${remote.name}-${remote.direction}-${remote.url}`}>
                {remote.name} {remote.direction}: {remote.url}
              </span>
            ))}
          </div>
          <div className="native-git-files">
            {(status?.files || []).slice(0, 80).map((file) => (
              <article key={`${file.status}-${file.path}`}>
                <span>{file.status}</span>
                <strong>{file.path}</strong>
                {file.originalPath && <small>{file.originalPath}</small>}
              </article>
            ))}
            {status && status.files.length === 0 && <p className="empty-state">변경 파일이 없습니다.</p>}
            {!status && <p className="empty-state">Git 상태를 아직 읽지 않았습니다.</p>}
          </div>
          {(status?.lastCommandOutput || status?.lastCommandError) && (
            <pre tabIndex={0} aria-label="Git command output">
              <code>{[status.lastCommandOutput, status.lastCommandError].filter(Boolean).join("\n")}</code>
            </pre>
          )}
        </div>
      </div>
    </section>
  );
}
