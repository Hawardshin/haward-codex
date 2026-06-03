import { Activity, Archive, ArrowRight, ClipboardCheck, Clock3, FileSearch, GitBranch, RotateCcw, ShieldCheck, Trash2 } from "lucide-react";
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

export type DesktopGitHistoryFileReport = {
  path: string;
  additions: number;
  deletions: number;
};

export type DesktopGitHistoryCommitReport = {
  hash: string;
  shortHash: string;
  subject: string;
  author: string;
  authoredAt: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  files: DesktopGitHistoryFileReport[];
};

export type DesktopGitStashReport = {
  reference: string;
  branch: string;
  message: string;
  filesChanged: number;
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
  history: DesktopGitHistoryCommitReport[];
  stashes: DesktopGitStashReport[];
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

export type DesktopGitWorkbenchAction =
  | "refresh"
  | "fetch"
  | "create_branch"
  | "commit_all"
  | "commit_selected"
  | "discard_selected"
  | "stash_all"
  | "stash_selected"
  | "apply_stash"
  | "pop_stash"
  | "drop_stash"
  | "pull_ff"
  | "push";

export type DesktopGitWorkbenchActionPayload = {
  filePaths?: string[];
  stashRef?: string;
};

type NativeGitView = "changes" | "history" | "stashes";

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
  onRunAction: (action: DesktopGitWorkbenchAction, payload?: DesktopGitWorkbenchActionPayload) => void;
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
  const history = useMemo(() => status?.history || [], [status?.history]);
  const stashes = useMemo(() => status?.stashes || [], [status?.stashes]);
  const dirtyCount = status ? status.stagedCount + status.unstagedCount + status.untrackedCount : 0;
  const [activeView, setActiveView] = useState<NativeGitView>("changes");
  const [selectedPath, setSelectedPath] = useState("");
  const [includedPaths, setIncludedPaths] = useState<Set<string>>(new Set());
  const [selectedHistoryHash, setSelectedHistoryHash] = useState("");
  const [selectedStashRef, setSelectedStashRef] = useState("");
  const selectedFile = files.find((file) => file.path === selectedPath) || files[0] || null;
  const selectedHistory = history.find((commit) => commit.hash === selectedHistoryHash) || history[0] || null;
  const selectedStash = stashes.find((stash) => stash.reference === selectedStashRef) || stashes[0] || null;
  const includedFiles = files.filter((file) => includedPaths.has(file.path));
  const includedFilePaths = includedFiles.map((file) => file.path);
  const totalAdditions = files.reduce((total, file) => total + file.additions, 0);
  const totalDeletions = files.reduce((total, file) => total + file.deletions, 0);
  const includedAdditions = includedFiles.reduce((total, file) => total + file.additions, 0);
  const includedDeletions = includedFiles.reduce((total, file) => total + file.deletions, 0);
  const allFilesIncluded = files.length > 0 && includedFiles.length === files.length;
  const reviewState = status?.conflicted
    ? "충돌 해결 필요"
    : status?.clean
      ? "커밋할 변경 없음"
      : `${includedFiles.length}/${dirtyCount}개 포함`;
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
      setIncludedPaths(new Set());
      return;
    }
    setSelectedPath((current) => (files.some((file) => file.path === current) ? current : files[0].path));
    setIncludedPaths(new Set(files.map((file) => file.path)));
  }, [files]);

  useEffect(() => {
    if (!history.length) {
      setSelectedHistoryHash("");
      return;
    }
    setSelectedHistoryHash((current) => (history.some((commit) => commit.hash === current) ? current : history[0].hash));
  }, [history]);

  useEffect(() => {
    if (!stashes.length) {
      setSelectedStashRef("");
      return;
    }
    setSelectedStashRef((current) => (stashes.some((stash) => stash.reference === current) ? current : stashes[0].reference));
  }, [stashes]);

  const toggleIncludedPath = (path: string) => {
    setIncludedPaths((current) => {
      const next = new Set(current);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const toggleAllIncluded = () => {
    setIncludedPaths(allFilesIncluded ? new Set() : new Set(files.map((file) => file.path)));
  };

  const runAction = (action: DesktopGitWorkbenchAction, payload?: DesktopGitWorkbenchActionPayload) => {
    onRunAction(action, payload);
  };

  const discardSelected = () => {
    if (!includedFilePaths.length) {
      return;
    }
    if (window.confirm(`${includedFilePaths.length}개 선택 파일의 작업 트리 변경을 버릴까요? 이 작업은 되돌릴 수 없습니다.`)) {
      runAction("discard_selected", { filePaths: includedFilePaths });
    }
  };

  const dropSelectedStash = () => {
    if (!selectedStash) {
      return;
    }
    if (window.confirm(`${selectedStash.reference} stash를 삭제할까요?`)) {
      runAction("drop_stash", { stashRef: selectedStash.reference });
    }
  };

  return (
    <section className="panel wide native-git-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Native Git Workbench</p>
          <h2>Git 작업대</h2>
          <p>변경 선택, diff 검토, 커밋, stash, history, fetch/pull/push를 한 작업대에서 처리합니다.</p>
        </div>
        <div className="desktop-actions">
          <button type="button" onClick={() => runAction("refresh")} disabled={!runtimeAvailable || busy !== ""}>
            <Activity size={16} aria-hidden="true" />
            <span>{busy === "refresh" ? "Refreshing" : "새로고침"}</span>
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
          <strong>+{includedFiles.length ? includedAdditions : totalAdditions} / -{includedFiles.length ? includedDeletions : totalDeletions}</strong>
        </article>
      </div>

      <div className="native-git-layout">
        <aside className="native-git-file-list" tabIndex={0} aria-label="Git workbench navigation">
          <header>
            <div>
              <span>{status?.repositoryRoot || workspacePathFallback || "repository pending"}</span>
              <h3>{activeView === "changes" ? "변경 파일" : activeView === "history" ? "커밋 히스토리" : "Stash"}</h3>
            </div>
            <strong>{status?.clean ? "clean" : status?.conflicted ? "conflict" : "dirty"}</strong>
          </header>

          <div className="native-git-view-tabs" role="tablist" aria-label="Git workbench views">
            <button type="button" className={activeView === "changes" ? "active" : ""} onClick={() => setActiveView("changes")}>
              Changes
            </button>
            <button type="button" className={activeView === "history" ? "active" : ""} onClick={() => setActiveView("history")}>
              History
            </button>
            <button type="button" className={activeView === "stashes" ? "active" : ""} onClick={() => setActiveView("stashes")}>
              Stash
            </button>
          </div>

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

          {activeView === "changes" && (
            <div className="native-git-changes-list">
              <label className="native-git-select-all">
                <input type="checkbox" checked={allFilesIncluded} onChange={toggleAllIncluded} disabled={!files.length} />
                <span>{includedFiles.length}개 파일 커밋 포함</span>
              </label>
              <div className="native-git-files">
                {files.slice(0, 120).map((file) => (
                  <button
                    key={`${file.status}-${file.path}`}
                    type="button"
                    className={selectedFile?.path === file.path ? "active" : ""}
                    onClick={() => setSelectedPath(file.path)}
                  >
                    <input
                      type="checkbox"
                      checked={includedPaths.has(file.path)}
                      onChange={() => toggleIncludedPath(file.path)}
                      onClick={(event) => event.stopPropagation()}
                      aria-label={`${file.path} include in commit`}
                    />
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
            </div>
          )}

          {activeView === "history" && (
            <div className="native-git-history-list">
              {history.map((commit) => (
                <button
                  key={commit.hash}
                  type="button"
                  className={selectedHistory?.hash === commit.hash ? "active" : ""}
                  onClick={() => setSelectedHistoryHash(commit.hash)}
                >
                  <span>{commit.shortHash}</span>
                  <strong>{commit.subject || "(no subject)"}</strong>
                  <small>
                    {commit.author} / {commit.filesChanged} files / +{commit.additions} -{commit.deletions}
                  </small>
                </button>
              ))}
              {status && history.length === 0 && <p className="empty-state">커밋 히스토리가 없습니다.</p>}
            </div>
          )}

          {activeView === "stashes" && (
            <div className="native-git-stash-list">
              {stashes.map((stash) => (
                <button
                  key={stash.reference}
                  type="button"
                  className={selectedStash?.reference === stash.reference ? "active" : ""}
                  onClick={() => setSelectedStashRef(stash.reference)}
                >
                  <span>{stash.reference}</span>
                  <strong>{stash.message || "stash"}</strong>
                  <small>
                    {stash.branch || "branch unknown"} / {stash.filesChanged} files
                  </small>
                </button>
              ))}
              {status && stashes.length === 0 && <p className="empty-state">저장된 stash가 없습니다.</p>}
            </div>
          )}

          <div className="native-git-summary-notes">
            {(status?.summary || []).map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </aside>

        <main className="native-git-diff-pane" tabIndex={0} aria-label="Selected Git detail">
          {activeView === "changes" && (
            <>
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
                  <span className={selectedFile && includedPaths.has(selectedFile.path) ? "active" : ""}>included</span>
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
            </>
          )}

          {activeView === "history" && (
            <>
              <header>
                <div>
                  <span>{selectedHistory?.shortHash || "history"}</span>
                  <h3>{selectedHistory?.subject || "커밋을 선택하세요"}</h3>
                  {selectedHistory && <small>{selectedHistory.author} / {selectedHistory.authoredAt}</small>}
                </div>
                <div className="native-git-diff-stats">
                  <span>+{selectedHistory?.additions || 0}</span>
                  <span>-{selectedHistory?.deletions || 0}</span>
                </div>
              </header>
              <div className="native-git-history-detail">
                {selectedHistory?.files.length ? (
                  selectedHistory.files.map((file) => (
                    <article key={`${selectedHistory.hash}-${file.path}`}>
                      <strong>{file.path}</strong>
                      <span>+{file.additions} / -{file.deletions}</span>
                    </article>
                  ))
                ) : (
                  <div className="native-git-diff-empty">
                    <Clock3 size={18} aria-hidden="true" />
                    <strong>커밋 파일 요약 없음</strong>
                    <span>아직 표시할 history 데이터가 없습니다.</span>
                  </div>
                )}
              </div>
            </>
          )}

          {activeView === "stashes" && (
            <>
              <header>
                <div>
                  <span>{selectedStash?.reference || "stash"}</span>
                  <h3>{selectedStash?.message || "Stash를 선택하세요"}</h3>
                  {selectedStash && <small>{selectedStash.branch || "branch unknown"} / {selectedStash.filesChanged} files</small>}
                </div>
                <Archive size={18} aria-hidden="true" />
              </header>
              <div className="native-git-stash-detail">
                <button type="button" onClick={() => selectedStash && runAction("apply_stash", { stashRef: selectedStash.reference })} disabled={!runtimeAvailable || busy !== "" || !selectedStash}>
                  <Archive size={16} aria-hidden="true" />
                  <span>Apply</span>
                </button>
                <button type="button" onClick={() => selectedStash && runAction("pop_stash", { stashRef: selectedStash.reference })} disabled={!runtimeAvailable || busy !== "" || !selectedStash}>
                  <RotateCcw size={16} aria-hidden="true" />
                  <span>Pop</span>
                </button>
                <button type="button" onClick={dropSelectedStash} disabled={!runtimeAvailable || busy !== "" || !selectedStash}>
                  <Trash2 size={16} aria-hidden="true" />
                  <span>Drop</span>
                </button>
              </div>
            </>
          )}
        </main>

        <aside className="native-git-actions" aria-label="Git commit and sync actions">
          <section className="native-git-sync-card">
            <span>repository action</span>
            <strong>{status?.lastCommandStatus || "not_run"}</strong>
            <div>
              <button type="button" onClick={() => runAction("fetch")} disabled={!runtimeAvailable || busy !== ""}>
                <Activity size={16} aria-hidden="true" />
                <span>{busy === "fetch" ? "Fetching" : "Fetch"}</span>
              </button>
              <button type="button" onClick={() => runAction("pull_ff")} disabled={!runtimeAvailable || busy !== "" || Boolean(status?.conflicted)}>
                <ArrowRight size={16} aria-hidden="true" />
                <span>{busy === "pull_ff" ? "Pulling" : "Pull"}</span>
              </button>
              <button type="button" onClick={() => runAction("push")} disabled={!runtimeAvailable || busy !== "" || Boolean(status?.conflicted)}>
                <GitBranch size={16} aria-hidden="true" />
                <span>{busy === "push" ? "Pushing" : "Push"}</span>
              </button>
            </div>
          </section>

          <label>
            <span>새 브랜치</span>
            <input value={branchName} onChange={(event) => onBranchNameChange(event.target.value)} />
          </label>
          <button type="button" onClick={() => runAction("create_branch")} disabled={!runtimeAvailable || busy !== "" || !branchName.trim()}>
            <GitBranch size={16} aria-hidden="true" />
            <span>{busy === "create_branch" ? "Creating" : "브랜치 만들기"}</span>
          </button>

          <label className="wide-field">
            <span>커밋 요약 / stash 이름</span>
            <input value={commitMessage} onChange={(event) => onCommitMessageChange(event.target.value)} />
          </label>
          <button className="native-git-commit-button" type="button" onClick={() => runAction("commit_selected", { filePaths: includedFilePaths })} disabled={!runtimeAvailable || busy !== "" || !commitMessage.trim() || includedFilePaths.length === 0}>
            <ClipboardCheck size={16} aria-hidden="true" />
            <span>{busy === "commit_selected" ? "Committing" : `${includedFilePaths.length}개 선택 커밋`}</span>
          </button>
          <button type="button" onClick={() => runAction("commit_all")} disabled={!runtimeAvailable || busy !== "" || !commitMessage.trim() || dirtyCount === 0}>
            <ClipboardCheck size={16} aria-hidden="true" />
            <span>{busy === "commit_all" ? "Committing" : "전체 변경 커밋"}</span>
          </button>

          <div className="native-git-danger-actions">
            <button type="button" onClick={() => runAction("stash_selected", { filePaths: includedFilePaths })} disabled={!runtimeAvailable || busy !== "" || includedFilePaths.length === 0}>
              <Archive size={16} aria-hidden="true" />
              <span>선택 Stash</span>
            </button>
            <button type="button" onClick={() => runAction("stash_all")} disabled={!runtimeAvailable || busy !== "" || dirtyCount === 0}>
              <Archive size={16} aria-hidden="true" />
              <span>전체 Stash</span>
            </button>
            <button type="button" onClick={discardSelected} disabled={!runtimeAvailable || busy !== "" || includedFilePaths.length === 0}>
              <Trash2 size={16} aria-hidden="true" />
              <span>선택 버리기</span>
            </button>
          </div>

          <div className="native-git-commit-guard">
            <ShieldCheck size={16} aria-hidden="true" />
            <span>선택 커밋은 체크된 파일 pathspec만 커밋합니다. Stash/Discard는 선택 파일 목록을 검증한 뒤 실행합니다.</span>
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
