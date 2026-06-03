import { Activity, ArrowRight, CheckCircle2, ClipboardCheck, FileSearch, GitBranch, ShieldCheck } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export type DesktopGitFileReport = {
  status: string;
  path: string;
  originalPath?: string | null;
  changeKind: string;
  staged: boolean;
  unstaged: boolean;
  untracked: boolean;
  conflicted: boolean;
  additions: number;
  deletions: number;
  diffPreview: DesktopGitDiffLineReport[];
};

export type DesktopGitDiffLineReport = {
  kind: string;
  text: string;
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
  const files = useMemo(() => status?.files || [], [status?.files]);
  const dirtyCount = status ? status.stagedCount + status.unstagedCount + status.untrackedCount : 0;
  const [selectedPath, setSelectedPath] = useState("");
  const selectedFile = files.find((file) => file.path === selectedPath) || files[0] || null;
  const totalAdditions = files.reduce((total, file) => total + file.additions, 0);
  const totalDeletions = files.reduce((total, file) => total + file.deletions, 0);
  const reviewState = status?.conflicted
    ? "충돌 해결 필요"
    : status?.clean
      ? "커밋할 변경 없음"
      : `${dirtyCount}개 변경 검토`;
  const syncState = status?.behind
    ? `${status.behind} behind`
    : status?.ahead
      ? `${status.ahead} ahead`
      : status?.upstream
        ? "동기화됨"
        : "upstream 없음";

  useEffect(() => {
    if (!files.length) {
      setSelectedPath("");
      return;
    }
    setSelectedPath((current) => (files.some((file) => file.path === current) ? current : files[0].path));
  }, [files]);

  return (
    <section className="panel wide native-git-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Native Git Workbench</p>
          <h2>변경사항과 커밋</h2>
          <p>변경 파일을 고르고 diff preview를 검토한 뒤 같은 화면에서 커밋, pull, push를 처리합니다.</p>
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
          <span>review</span>
          <strong>{reviewState}</strong>
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
          <span>sync</span>
          <strong>{syncState}</strong>
        </article>
        <article>
          <span>lines</span>
          <strong>+{totalAdditions} / -{totalDeletions}</strong>
        </article>
      </div>

      <div className="native-git-layout">
        <aside className="native-git-file-list" tabIndex={0} aria-label="Git changed files">
          <header>
            <div>
              <span>{status?.repositoryRoot || workspacePathFallback || "repository pending"}</span>
              <h3>변경 파일</h3>
            </div>
            <strong>{status?.clean ? "clean" : status?.conflicted ? "conflict" : "dirty"}</strong>
          </header>

          <div className="native-git-change-meter" aria-label="Git line change summary">
            <span style={{ flexGrow: Math.max(totalAdditions, 1) }} />
            <i style={{ flexGrow: Math.max(totalDeletions, 1) }} />
          </div>

          <div className="native-git-remotes">
            {(status?.remotes || []).slice(0, 4).map((remote) => (
              <span key={`${remote.name}-${remote.direction}-${remote.url}`}>
                {remote.name} {remote.direction}: {remote.url}
              </span>
            ))}
          </div>
          <div className="native-git-files">
            {files.slice(0, 120).map((file) => (
              <button
                key={`${file.status}-${file.path}`}
                type="button"
                className={selectedFile?.path === file.path ? "active" : ""}
                onClick={() => setSelectedPath(file.path)}
              >
                <span>{file.status}</span>
                <div>
                  <strong>{file.path}</strong>
                  <small>
                    {file.changeKind} / +{file.additions} / -{file.deletions}
                  </small>
                </div>
              </button>
            ))}
            {status && status.files.length === 0 && <p className="empty-state">변경 파일이 없습니다.</p>}
            {!status && <p className="empty-state">Git 상태를 아직 읽지 않았습니다.</p>}
          </div>

          <div className="native-git-summary-notes">
            {(status?.summary || []).map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </aside>

        <main className="native-git-diff-pane" tabIndex={0} aria-label="Selected file diff preview">
          <header>
            <div>
              <span>{selectedFile?.changeKind || "no file selected"}</span>
              <h3>{selectedFile?.path || "변경 파일을 선택하세요"}</h3>
              {selectedFile?.originalPath && <small>{selectedFile.originalPath}</small>}
            </div>
            <div className="native-git-diff-stats">
              <span>+{selectedFile?.additions || 0}</span>
              <span>-{selectedFile?.deletions || 0}</span>
            </div>
          </header>

          {selectedFile && (
            <div className="native-git-file-state-strip">
              <span className={selectedFile.staged ? "active" : ""}>staged</span>
              <span className={selectedFile.unstaged ? "active" : ""}>unstaged</span>
              <span className={selectedFile.untracked ? "active" : ""}>untracked</span>
              <span className={selectedFile.conflicted ? "danger active" : ""}>conflict</span>
            </div>
          )}

          <div className="native-git-diff-preview">
            {selectedFile?.diffPreview.length ? (
              selectedFile.diffPreview.map((line, index) => (
                <code className={`native-git-diff-line ${line.kind}`} key={`${selectedFile.path}-${index}`}>
                  {line.text || " "}
                </code>
              ))
            ) : selectedFile ? (
              <div className="native-git-diff-empty">
                <FileSearch size={18} aria-hidden="true" />
                <strong>diff preview 없음</strong>
                <span>대형/바이너리/미리보기 제한 파일이거나 Git diff 출력이 비어 있습니다.</span>
              </div>
            ) : (
              <div className="native-git-diff-empty">
                <FileSearch size={18} aria-hidden="true" />
                <strong>변경 파일을 선택하세요</strong>
                <span>왼쪽 변경 파일을 선택하면 이 영역에서 검토합니다.</span>
              </div>
            )}
          </div>
        </main>

        <aside className="native-git-actions" aria-label="Git commit and sync actions">
          <section className="native-git-sync-card">
            <span>repository action</span>
            <strong>{status?.lastCommandStatus || "not_run"}</strong>
            <div>
              <button type="button" onClick={() => onRunAction("pull_ff")} disabled={!runtimeAvailable || busy !== "" || Boolean(status?.conflicted)}>
                <ArrowRight size={16} aria-hidden="true" />
                <span>{busy === "pull_ff" ? "Pulling" : "Pull --ff-only"}</span>
              </button>
              <button type="button" onClick={() => onRunAction("push")} disabled={!runtimeAvailable || busy !== "" || Boolean(status?.conflicted)}>
                <GitBranch size={16} aria-hidden="true" />
                <span>{busy === "push" ? "Pushing" : "Push"}</span>
              </button>
            </div>
          </section>

          <label>
            <span>새 브랜치</span>
            <input value={branchName} onChange={(event) => onBranchNameChange(event.target.value)} />
          </label>
          <button type="button" onClick={() => onRunAction("create_branch")} disabled={!runtimeAvailable || busy !== "" || !branchName.trim()}>
            <GitBranch size={16} aria-hidden="true" />
            <span>{busy === "create_branch" ? "Creating" : "브랜치 만들기"}</span>
          </button>

          <label className="wide-field">
            <span>커밋 요약</span>
            <input value={commitMessage} onChange={(event) => onCommitMessageChange(event.target.value)} />
          </label>
          <button className="native-git-commit-button" type="button" onClick={() => onRunAction("commit_all")} disabled={!runtimeAvailable || busy !== "" || !commitMessage.trim() || dirtyCount === 0}>
            <ClipboardCheck size={16} aria-hidden="true" />
            <span>{busy === "commit_all" ? "Committing" : `${dirtyCount}개 변경 커밋`}</span>
          </button>

          <div className="native-git-commit-guard">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>커밋은 `git add -A` 후 실행되며, credential/SSH secret은 앱이 직접 보관하지 않습니다.</span>
          </div>

          {(status?.lastCommandOutput || status?.lastCommandError) && (
            <pre tabIndex={0} aria-label="Git command output">
              <code>{[status.lastCommandOutput, status.lastCommandError].filter(Boolean).join("\n")}</code>
            </pre>
          )}
        </aside>
      </div>
    </section>
  );
}
