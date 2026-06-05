"use client";

import { Activity, ArrowRight, Inbox, ListFilter, Settings, ShieldCheck, SquareTerminal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type RuntimeTerminalLanguage = "ko" | "en";
type TerminalDrawerView = "start" | "native" | "sessions" | "output" | "events";

type RuntimeTerminalAdapter = {
  adapterId: string;
  label: string;
  available: boolean;
};

type RuntimeTerminalSessionMode = {
  label: string;
  intent: string;
};

export type RuntimeTextChoice = {
  id: string;
  label: string;
  detail: string;
  value: string;
  badge?: string;
};

export type RuntimeTerminalSession = {
  sessionId: string;
  taskKind: string;
  adapterId: string;
  label: string;
  status: string;
  exitCode?: number | null;
  elapsedMs: number;
  stdout: string;
  stderr: string;
  outputTruncated: boolean;
  workingDir: string;
  deferMessageSent: boolean;
  autoDeferQuestions: boolean;
  autoDeferTriggered: boolean;
  decisionInboxItems: number;
  pendingDecisionPrompts: number;
  deferredPromptCount: number;
  decisionCaptureError?: string | null;
  taskRecordPath?: string | null;
  stdoutLogPath?: string | null;
  persistenceError?: string | null;
};

export type RuntimeNativePtySession = {
  sessionId: string;
  label: string;
  command: string;
  status: string;
  exitCode?: number | null;
  elapsedMs: number;
  output: string;
  outputTruncated: boolean;
  workingDir: string;
  rows: number;
  cols: number;
  pid?: number | null;
  terminalKind: string;
};

type RuntimeTerminalStats = {
  active: number;
  deferred: number;
  autoDeferred: number;
  outputBytes: number;
};

export type RuntimeTerminalEvent = {
  id: string;
  type: string;
  label: string;
  detail: string;
};

export type RuntimeTerminalDrawerProps = {
  adapters: RuntimeTerminalAdapter[];
  autoDeferQuestions: boolean;
  open: boolean;
  openDecisionCount: number;
  outputEvents: RuntimeTerminalEvent[];
  runningAdapterId: string;
  runtimeAvailable: boolean;
  selectedMode: RuntimeTerminalSessionMode;
  selectedOutputEvents: RuntimeTerminalEvent[];
  selectedSession: RuntimeTerminalSession | null;
  selectedSessionAdapterId: string;
  sessionInput: string;
  sessionPrompt: string;
  sessionPromptChoices?: RuntimeTextChoice[];
  sessions: RuntimeTerminalSession[];
  sessionStats: RuntimeTerminalStats;
  sourceDirty: boolean;
  uiLanguage: RuntimeTerminalLanguage;
  workingDir: string;
  workingDirOptions?: RuntimeTextChoice[];
  nativePtySession: RuntimeNativePtySession | null;
  nativePtySessions: RuntimeNativePtySession[];
  onCancelSession: (sessionId: string) => void | Promise<void>;
  onCancelNativePtySession: (sessionId: string) => void | Promise<void>;
  onCollapse: () => void;
  onDeferSession: (sessionId: string) => void | Promise<void>;
  onOpen: () => void;
  onOpenSettings: () => void;
  onPollNativePtySession: (sessionId: string) => void | Promise<void>;
  onPollSession: (sessionId: string) => void | Promise<void>;
  onResizeNativePtySession: (sessionId: string, size: { rows: number; cols: number }) => void | Promise<void>;
  onSelectNativePtySession: (sessionId: string) => void;
  onSelectSession: (sessionId: string) => void;
  onSessionInputChange: (value: string) => void;
  onSessionPromptChange: (value: string) => void;
  onStartNativePtySession: (size: { rows: number; cols: number }) => void | Promise<void>;
  onStartSession: () => void | Promise<void>;
  onWorkingDirChange: (value: string) => void;
  onWriteNativePtyInput: (sessionId: string, input: string) => void | Promise<void>;
  onWriteSessionInput: (sessionId: string) => void | Promise<void>;
};

const terminalCopy = {
  ko: {
    launcher: "터미널",
    close: "터미널 닫기",
    aria: "하단 다중 CLI 터미널",
    eyebrow: "실행 보드",
    title: "하단 다중 CLI 터미널",
    collapse: "접기",
    sessions: "세션",
    activeLanes: "실행 중",
    deferredLanes: "보류",
    autoDeferred: "자동 보류",
    output: "출력",
    events: "이벤트",
    rail: "터미널 상태와 보기 선택",
    intake: "입력",
    decision: "결정함",
    review: "검토",
    diffPending: "diff 대기",
    clean: "정리됨",
    start: "시작",
    native: "PTY",
    nativePty: "네이티브 PTY",
    nativePtyDetail: "OS pseudo terminal + xterm.js",
    startNativePty: "PTY 셸 시작",
    refreshNativePty: "PTY 새로고침",
    stopNativePty: "PTY 중단",
    nativePtySurface: "네이티브 PTY 터미널",
    nativePtyPlaceholder: "PTY 셸을 시작하면 여기에서 실제 터미널 입출력이 렌더링됩니다.",
    blocked: "막힘",
    ready: "준비됨",
    adapter: "어댑터",
    mode: "모드",
    questions: "질문",
    autoDefer: "자동 보류",
    manual: "수동",
    changeInit: "초기화 설정 변경",
    workingDir: "작업 폴더",
    initialInput: "초기 입력",
    starting: "시작 중",
    startSession: "세션 시작",
    noSessions: "실행 세션이 없습니다. 설정에서 어댑터를 확인한 뒤 세션을 시작하세요.",
    sessionList: "CLI 세션 목록",
    inspect: "보기",
    poll: "새로고침",
    defer: "질문 보류",
    cancel: "중단",
    noCode: "코드 없음",
    recordPending: "기록 대기",
    stdoutPending: "stdout 로그 대기",
    selectedOutput: "선택한 CLI 출력",
    noSession: "세션 없음",
    sessionOutput: "세션 출력",
    idle: "대기",
    noOutput: "아직 출력이 없습니다",
    send: "보내기",
    eventList: "터미널 이벤트 목록",
    noEvents: "구조화된 터미널 이벤트가 아직 없습니다."
  },
  en: {
    launcher: "Terminal",
    close: "Close terminal",
    aria: "Bottom multi-CLI terminal",
    eyebrow: "Run Board",
    title: "Bottom multi-CLI terminal",
    collapse: "Collapse",
    sessions: "Sessions",
    activeLanes: "active lanes",
    deferredLanes: "deferred lanes",
    autoDeferred: "auto deferred",
    output: "output",
    events: "events",
    rail: "Terminal state and view selector",
    intake: "intake",
    decision: "decision",
    review: "review",
    diffPending: "diff pending",
    clean: "clean",
    start: "Start",
    native: "PTY",
    nativePty: "Native PTY",
    nativePtyDetail: "OS pseudo terminal + xterm.js",
    startNativePty: "Start PTY Shell",
    refreshNativePty: "Poll PTY",
    stopNativePty: "Stop PTY",
    nativePtySurface: "Native PTY terminal",
    nativePtyPlaceholder: "Start a PTY shell to render real terminal I/O here.",
    blocked: "blocked",
    ready: "ready",
    adapter: "Adapter",
    mode: "Mode",
    questions: "Questions",
    autoDefer: "auto-defer",
    manual: "manual",
    changeInit: "Change init settings",
    workingDir: "Working dir",
    initialInput: "Initial input",
    starting: "Starting",
    startSession: "Start Session",
    noSessions: "No run sessions. Check the adapter in Settings, then start a session.",
    sessionList: "CLI session list",
    inspect: "Inspect",
    poll: "Poll",
    defer: "Defer",
    cancel: "Cancel",
    noCode: "no code",
    recordPending: "record pending",
    stdoutPending: "stdout log pending",
    selectedOutput: "Selected CLI output",
    noSession: "no-session",
    sessionOutput: "Session output",
    idle: "idle",
    noOutput: "No output yet",
    send: "Send",
    eventList: "Terminal event list",
    noEvents: "No structured terminal events yet."
  }
} satisfies Record<RuntimeTerminalLanguage, Record<string, string>>;

export function RuntimeTerminalDrawer({
  adapters,
  autoDeferQuestions,
  open,
  openDecisionCount,
  outputEvents,
  runningAdapterId,
  runtimeAvailable,
  selectedMode,
  selectedOutputEvents,
  selectedSession,
  selectedSessionAdapterId,
  sessionInput,
  sessionPrompt,
  sessionPromptChoices = [],
  sessions,
  sessionStats,
  sourceDirty,
  uiLanguage,
  workingDir,
  workingDirOptions = [],
  nativePtySession,
  nativePtySessions,
  onCancelSession,
  onCancelNativePtySession,
  onCollapse,
  onDeferSession,
  onOpen,
  onOpenSettings,
  onPollNativePtySession,
  onPollSession,
  onResizeNativePtySession,
  onSelectNativePtySession,
  onSelectSession,
  onSessionInputChange,
  onSessionPromptChange,
  onStartNativePtySession,
  onStartSession,
  onWorkingDirChange,
  onWriteNativePtyInput,
  onWriteSessionInput
}: RuntimeTerminalDrawerProps) {
  const [terminalDrawerView, setTerminalDrawerView] = useState<TerminalDrawerView>("start");
  const canStartSession =
    runtimeAvailable &&
    runningAdapterId === "" &&
    adapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId && adapter.available);
  const canWriteToSelectedSession =
    runtimeAvailable && Boolean(selectedSession) && sessionInput.trim() !== "" && Boolean(selectedSession && isWritableSessionStatus(selectedSession.status));
  const copy = terminalCopy[uiLanguage];
  const selectedAdapter = adapters.find((adapter) => adapter.adapterId === selectedSessionAdapterId);
  const terminalCwd = selectedSession?.workingDir || workingDir || "workspace root";
  const selectedSessionOutput = selectedSession ? formatSessionOutput(selectedSession, copy.noOutput) : copy.noSession;

  return (
    <>
      {!open && (
        <button type="button" className="terminal-drawer-launcher" onClick={onOpen}>
          <SquareTerminal size={16} aria-hidden="true" />
          <span>{copy.launcher}</span>
          <strong>{sessions.length + nativePtySessions.length}</strong>
        </button>
      )}

      {open && (
        <button
          type="button"
          className="terminal-drawer-backdrop"
          aria-label={copy.close}
          onClick={onCollapse}
        />
      )}

      <section className={`panel wide cli-session-panel terminal-drawer ${open ? "open" : "closed"}`} aria-label={copy.aria}>
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2>{copy.title}</h2>
          </div>
          <div className="desktop-actions">
            <span className="result-count">
              {sessions.length + nativePtySessions.length} {copy.sessions}
            </span>
            <button type="button" onClick={onCollapse} title={copy.collapse}>
              <X size={15} aria-hidden="true" />
              <span>{copy.collapse}</span>
            </button>
          </div>
        </div>

        <div className="terminal-chrome-bar" aria-label={uiLanguage === "ko" ? "터미널 탭과 상태" : "Terminal tabs and status"}>
          <div className="terminal-chrome-title">
            <SquareTerminal size={15} aria-hidden="true" />
            <strong>TERMINAL</strong>
            <span>{selectedAdapter?.label || selectedSessionAdapterId}</span>
          </div>
          <div className="terminal-view-switcher terminal-tab-strip" role="tablist" aria-label={uiLanguage === "ko" ? "터미널 보기" : "Terminal views"}>
            <button
              type="button"
              role="tab"
              aria-selected={terminalDrawerView === "start"}
              className={terminalDrawerView === "start" ? "active" : ""}
              onClick={() => setTerminalDrawerView("start")}
            >
              <SquareTerminal size={15} aria-hidden="true" />
              <span>{copy.start}</span>
              <small>{canStartSession ? copy.ready : copy.blocked}</small>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={terminalDrawerView === "sessions"}
              className={terminalDrawerView === "sessions" ? "active" : ""}
              onClick={() => setTerminalDrawerView("sessions")}
            >
              <ListFilter size={15} aria-hidden="true" />
              <span>{copy.sessions}</span>
              <small>{sessions.length}</small>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={terminalDrawerView === "native"}
              className={terminalDrawerView === "native" ? "active" : ""}
              onClick={() => setTerminalDrawerView("native")}
            >
              <SquareTerminal size={15} aria-hidden="true" />
              <span>{copy.native}</span>
              <small>{nativePtySession?.status || copy.idle}</small>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={terminalDrawerView === "output"}
              className={terminalDrawerView === "output" ? "active" : ""}
              onClick={() => setTerminalDrawerView("output")}
            >
              <Activity size={15} aria-hidden="true" />
              <span>{copy.output}</span>
              <small>{selectedSession?.status || copy.idle}</small>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={terminalDrawerView === "events"}
              className={terminalDrawerView === "events" ? "active" : ""}
              onClick={() => setTerminalDrawerView("events")}
            >
              <Inbox size={15} aria-hidden="true" />
              <span>{copy.events}</span>
              <small>{selectedOutputEvents.length}</small>
            </button>
          </div>
          <div className="terminal-chrome-meta">
            <span>{runtimeAvailable ? "runtime" : "offline"}</span>
            <strong>{sessionStats.active} active</strong>
            <code>{terminalCwd}</code>
          </div>
        </div>

        <div className="terminal-drawer-workbench">
          <aside className="terminal-drawer-sidebar" aria-label={copy.rail} tabIndex={0}>
            <div className="run-board-strip">
              <article>
                <span>{copy.activeLanes}</span>
                <strong>{sessionStats.active}</strong>
              </article>
              <article>
                <span>{copy.deferredLanes}</span>
                <strong>{sessionStats.deferred}</strong>
              </article>
              <article>
                <span>{copy.autoDeferred}</span>
                <strong>{sessionStats.autoDeferred}</strong>
              </article>
              <article>
                <span>{copy.output}</span>
                <strong>{formatBytes(sessionStats.outputBytes)}</strong>
              </article>
              <article>
                <span>{copy.native}</span>
                <strong>{nativePtySessions.length}</strong>
              </article>
              <article>
                <span>{copy.events}</span>
                <strong>{outputEvents.length}</strong>
              </article>
            </div>

            <div className="process-graph" aria-label="CLI process graph">
              <article className="process-node node-intake">
                <span>{copy.intake}</span>
                <strong>{selectedMode.label}</strong>
              </article>
              {sessions.slice(0, 4).map((session) => (
                <article key={session.sessionId} className={`process-node node-${session.status}`}>
                  <span>{session.adapterId}</span>
                  <strong>{session.status}</strong>
                  <small>{formatDuration(session.elapsedMs)}</small>
                </article>
              ))}
              <article className="process-node node-decision">
                <span>{copy.decision}</span>
                <strong>{openDecisionCount} open</strong>
              </article>
              <article className="process-node node-review">
                <span>{copy.review}</span>
                <strong>{sourceDirty ? copy.diffPending : copy.clean}</strong>
              </article>
            </div>
          </aside>

          <div className="terminal-drawer-main" tabIndex={0} aria-label={uiLanguage === "ko" ? "터미널 작업 영역" : "Terminal work area"}>
            {terminalDrawerView === "start" && (
            <div className="terminal-view-panel terminal-start-panel">
        <div className="session-launcher">
          <div className="settings-controlled-summary session-init-summary">
            <article>
              <span>{copy.adapter}</span>
              <strong>{adapters.find((adapter) => adapter.adapterId === selectedSessionAdapterId)?.label || selectedSessionAdapterId}</strong>
            </article>
            <article>
              <span>{copy.mode}</span>
              <strong>{selectedMode.label}</strong>
            </article>
            <article>
              <span>{copy.questions}</span>
              <strong>{autoDeferQuestions ? copy.autoDefer : copy.manual}</strong>
            </article>
            <button type="button" onClick={onOpenSettings}>
              <Settings size={15} aria-hidden="true" />
              <span>{copy.changeInit}</span>
            </button>
          </div>
          <div className="runtime-choice-field">
            <span>{copy.workingDir}</span>
            {workingDirOptions.length > 0 && (
              <div className="runtime-text-choice-grid compact" aria-label={uiLanguage === "ko" ? "작업 폴더 선택지" : "Working directory choices"}>
                {workingDirOptions.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    className={workingDir === choice.value ? "active" : ""}
                    aria-pressed={workingDir === choice.value}
                    onClick={() => onWorkingDirChange(choice.value)}
                    title={choice.detail}
                  >
                    <span>{choice.label}</span>
                    <small>{choice.detail}</small>
                    {choice.badge && <em>{choice.badge}</em>}
                  </button>
                ))}
              </div>
            )}
            <input aria-label={copy.workingDir} value={workingDir} onChange={(event) => onWorkingDirChange(event.target.value)} placeholder="workspace root" />
          </div>
          <div className="runtime-choice-field session-prompt-field">
            <span>{copy.initialInput}</span>
            {sessionPromptChoices.length > 0 && (
              <div className="runtime-text-choice-grid" aria-label={uiLanguage === "ko" ? "초기 입력 선택지" : "Initial input choices"}>
                {sessionPromptChoices.map((choice) => (
                  <button
                    key={choice.id}
                    type="button"
                    className={sessionPrompt === choice.value ? "active" : ""}
                    aria-pressed={sessionPrompt === choice.value}
                    onClick={() => onSessionPromptChange(choice.value)}
                    title={choice.detail}
                  >
                    <span>{choice.label}</span>
                    <small>{choice.detail}</small>
                    {choice.badge && <em>{choice.badge}</em>}
                  </button>
                ))}
              </div>
            )}
            <textarea aria-label={copy.initialInput} value={sessionPrompt} onChange={(event) => onSessionPromptChange(event.target.value)} rows={4} />
          </div>
          <button
            type="button"
            onClick={() => {
              setTerminalDrawerView("output");
              void onStartSession();
            }}
            disabled={!canStartSession}
          >
            <SquareTerminal size={16} aria-hidden="true" />
            <span>{runningAdapterId === "session" ? copy.starting : copy.startSession}</span>
          </button>
        </div>
        <p className="session-mode-note">{selectedMode.intent}</p>
            </div>
            )}

            {terminalDrawerView === "native" && (
              <article className="session-terminal native-pty-panel">
                <header>
                  <div>
                    <span>{nativePtySession?.sessionId || copy.nativePty}</span>
                    <h3>{copy.nativePty}</h3>
                  </div>
                  <strong>{nativePtySession?.status || copy.idle}</strong>
                </header>
                <div className="terminal-emulator-meta">
                  <span>{nativePtySession?.terminalKind || "native_pty"}</span>
                  <code>{nativePtySession?.workingDir || workingDir || "workspace root"}</code>
                  <strong>{nativePtySession?.pid ? `pid ${nativePtySession.pid}` : `${nativePtySession?.cols || 100}x${nativePtySession?.rows || 28}`}</strong>
                </div>
                {nativePtySessions.length > 1 && (
                  <div className="native-pty-session-strip" aria-label={uiLanguage === "ko" ? "PTY 세션 선택" : "PTY session selector"}>
                    {nativePtySessions.map((session) => (
                      <button
                        key={session.sessionId}
                        type="button"
                        className={nativePtySession?.sessionId === session.sessionId ? "active" : ""}
                        aria-pressed={nativePtySession?.sessionId === session.sessionId}
                        onClick={() => onSelectNativePtySession(session.sessionId)}
                      >
                        <span>{session.label}</span>
                        <small>{session.status}</small>
                      </button>
                    ))}
                  </div>
                )}
                <NativePtyTerminalSurface
                  ariaLabel={copy.nativePtySurface}
                  placeholder={copy.nativePtyPlaceholder}
                  runtimeAvailable={runtimeAvailable}
                  session={nativePtySession}
                  startLabel={copy.startNativePty}
                  onResize={onResizeNativePtySession}
                  onStart={onStartNativePtySession}
                  onWrite={onWriteNativePtyInput}
                />
                <div className="desktop-actions native-pty-actions">
                  <button
                    type="button"
                    onClick={() => void onStartNativePtySession({ rows: nativePtySession?.rows || 28, cols: nativePtySession?.cols || 100 })}
                    disabled={!runtimeAvailable}
                  >
                    <SquareTerminal size={15} aria-hidden="true" />
                    <span>{copy.startNativePty}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => nativePtySession && void onPollNativePtySession(nativePtySession.sessionId)}
                    disabled={!runtimeAvailable || !nativePtySession}
                  >
                    <Activity size={15} aria-hidden="true" />
                    <span>{copy.refreshNativePty}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => nativePtySession && void onCancelNativePtySession(nativePtySession.sessionId)}
                    disabled={!runtimeAvailable || !nativePtySession || !isWritableSessionStatus(nativePtySession.status)}
                  >
                    <ShieldCheck size={15} aria-hidden="true" />
                    <span>{copy.stopNativePty}</span>
                  </button>
                </div>
              </article>
            )}

            {terminalDrawerView !== "start" && terminalDrawerView !== "native" && sessions.length === 0 ? (
              <p className="empty-state">{copy.noSessions}</p>
            ) : (
              terminalDrawerView !== "start" && terminalDrawerView !== "native" && (
              <div className={`session-grid terminal-view-${terminalDrawerView}`}>
                {terminalDrawerView === "sessions" && (
                <div className="session-list" tabIndex={0} aria-label={copy.sessionList}>
              {sessions.map((session) => (
                <article key={session.sessionId} className={`session-card status-${session.status}`}>
                  <header>
                    <div>
                      <span>{session.adapterId}</span>
                      <h3>{session.label}</h3>
                    </div>
                    <strong>{session.status}</strong>
                  </header>
                  <p>{session.workingDir}</p>
                  <div className="adapter-report">
                    <span>{session.elapsedMs}ms</span>
                    <span>{session.exitCode ?? copy.noCode}</span>
                    <span>{sessionStatusDetail(session)}</span>
                  </div>
                  <div className="lane-mini-timeline">
                    <span>started</span>
                    <span>{session.deferMessageSent ? (session.autoDeferTriggered ? "auto-deferred" : "deferred") : "streaming"}</span>
                    <span>{session.autoDeferQuestions ? `${session.deferredPromptCount} held` : "manual hold"}</span>
                    <span>{isActiveSessionStatus(session.status) ? "open" : "finished"}</span>
                  </div>
                  {session.decisionCaptureError && <p className="desktop-error">{session.decisionCaptureError}</p>}
                  {session.persistenceError && <p className="desktop-error">{session.persistenceError}</p>}
                  <div className="session-record-link">
                    <span>{session.taskKind}</span>
                    <strong>{session.taskRecordPath || copy.recordPending}</strong>
                    <small>{session.stdoutLogPath || copy.stdoutPending}</small>
                  </div>
                  <div className="desktop-actions">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectSession(session.sessionId);
                        setTerminalDrawerView("output");
                      }}
                    >
                      <ListFilter size={15} aria-hidden="true" />
                      <span>{copy.inspect}</span>
                    </button>
                    <button type="button" onClick={() => void onPollSession(session.sessionId)} disabled={!runtimeAvailable}>
                      <Activity size={15} aria-hidden="true" />
                      <span>{copy.poll}</span>
                    </button>
                    <button type="button" onClick={() => void onDeferSession(session.sessionId)} disabled={!runtimeAvailable || session.status !== "running"}>
                      <Inbox size={15} aria-hidden="true" />
                      <span>{copy.defer}</span>
                    </button>
                    <button type="button" onClick={() => void onCancelSession(session.sessionId)} disabled={!runtimeAvailable || !["running", "defer_message_sent"].includes(session.status)}>
                      <ShieldCheck size={15} aria-hidden="true" />
                      <span>{copy.cancel}</span>
                    </button>
                  </div>
                </article>
              ))}
                </div>
                )}
                {terminalDrawerView === "output" && (
                <article className="session-terminal">
              <header>
                <div>
                  <span>{selectedSession?.sessionId || copy.noSession}</span>
                  <h3>{selectedSession?.label || copy.sessionOutput}</h3>
                </div>
                <strong>{selectedSession?.status || copy.idle}</strong>
              </header>
              <div className="terminal-emulator-meta">
                <span>{selectedSession?.adapterId || selectedSessionAdapterId}</span>
                <code>{terminalCwd}</code>
                <strong>{selectedSession?.exitCode ?? copy.noCode}</strong>
              </div>
              <pre className="terminal-emulator-screen" tabIndex={0} aria-label={copy.selectedOutput}>
                <code>{selectedSessionOutput}</code>
              </pre>
              <div className="session-input-row terminal-command-row">
                <span className="terminal-prompt-symbol">$</span>
                <input
                  value={sessionInput}
                  onChange={(event) => onSessionInputChange(event.target.value)}
                  placeholder="stdin input"
                  disabled={!selectedSession || !isWritableSessionStatus(selectedSession.status)}
                />
                <button
                  type="button"
                  onClick={() => selectedSession && void onWriteSessionInput(selectedSession.sessionId)}
                  disabled={!canWriteToSelectedSession}
                >
                  <ArrowRight size={15} aria-hidden="true" />
                  <span>{copy.send}</span>
                </button>
              </div>
                </article>
                )}
                {terminalDrawerView === "events" && (
                <article className="session-terminal terminal-events-panel">
              <header>
                <div>
                  <span>{selectedSession?.sessionId || copy.noSession}</span>
                  <h3>{copy.events}</h3>
                </div>
                <strong>{selectedOutputEvents.length}</strong>
              </header>
              <div className="terminal-event-rail" tabIndex={0} aria-label={copy.eventList}>
                {selectedOutputEvents.slice(0, 24).map((event) => (
                  <article key={event.id} className={`event-${event.type}`}>
                    <span>{event.type}</span>
                    <strong>{event.label}</strong>
                    <small>{event.detail}</small>
                  </article>
                ))}
                {selectedOutputEvents.length === 0 && <p className="empty-state">{copy.noEvents}</p>}
              </div>
                </article>
                )}
              </div>
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function NativePtyTerminalSurface({
  ariaLabel,
  placeholder,
  runtimeAvailable,
  session,
  startLabel,
  onResize,
  onStart,
  onWrite
}: {
  ariaLabel: string;
  placeholder: string;
  runtimeAvailable: boolean;
  session: RuntimeNativePtySession | null;
  startLabel: string;
  onResize: (sessionId: string, size: { rows: number; cols: number }) => void | Promise<void>;
  onStart: (size: { rows: number; cols: number }) => void | Promise<void>;
  onWrite: (sessionId: string, input: string) => void | Promise<void>;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<import("@xterm/xterm").Terminal | null>(null);
  const fitAddonRef = useRef<import("@xterm/addon-fit").FitAddon | null>(null);
  const lastOutputRef = useRef("");
  const resizeSignatureRef = useRef("");
  const pendingInputRef = useRef("");
  const flushTimerRef = useRef<number | null>(null);
  const sessionRef = useRef<RuntimeNativePtySession | null>(session);
  const runtimeAvailableRef = useRef(runtimeAvailable);
  const onResizeRef = useRef(onResize);
  const onWriteRef = useRef(onWrite);

  useEffect(() => {
    sessionRef.current = session;
    runtimeAvailableRef.current = runtimeAvailable;
    onResizeRef.current = onResize;
    onWriteRef.current = onWrite;
  }, [runtimeAvailable, session, onResize, onWrite]);

  useEffect(() => {
    let disposed = false;
    let dataDisposable: { dispose: () => void } | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const flushInput = () => {
      if (flushTimerRef.current !== null && typeof window !== "undefined") {
        window.clearTimeout(flushTimerRef.current);
        flushTimerRef.current = null;
      }
      const input = pendingInputRef.current;
      pendingInputRef.current = "";
      const activeSession = sessionRef.current;
      if (!input || !runtimeAvailableRef.current || !activeSession || !isWritableSessionStatus(activeSession.status)) {
        return;
      }
      void onWriteRef.current(activeSession.sessionId, input);
    };

    const fitAndResize = () => {
      const terminal = terminalRef.current;
      const fitAddon = fitAddonRef.current;
      if (!terminal || !fitAddon) {
        return;
      }
      try {
        fitAddon.fit();
      } catch {
        return;
      }
      const activeSession = sessionRef.current;
      if (!activeSession || !runtimeAvailableRef.current || !isWritableSessionStatus(activeSession.status)) {
        return;
      }
      const signature = `${activeSession.sessionId}:${terminal.rows}:${terminal.cols}`;
      if (resizeSignatureRef.current === signature) {
        return;
      }
      resizeSignatureRef.current = signature;
      void onResizeRef.current(activeSession.sessionId, { rows: terminal.rows, cols: terminal.cols });
    };

    void (async () => {
      const [{ Terminal }, { FitAddon }, { WebLinksAddon }] = await Promise.all([
        import("@xterm/xterm"),
        import("@xterm/addon-fit"),
        import("@xterm/addon-web-links")
      ]);
      if (disposed || !hostRef.current) {
        return;
      }
      const terminal = new Terminal({
        allowProposedApi: false,
        convertEol: false,
        cursorBlink: true,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: 13,
        letterSpacing: 0,
        lineHeight: 1.15,
        scrollback: 5000,
        theme: {
          background: "#0d1117",
          foreground: "#d6deeb",
          cursor: "#7cc9b7",
          selectionBackground: "#264f78",
          black: "#0d1117",
          blue: "#58a6ff",
          brightBlack: "#6e7681",
          brightBlue: "#79c0ff",
          brightCyan: "#56d4dd",
          brightGreen: "#7ee787",
          brightMagenta: "#d2a8ff",
          brightRed: "#ff7b72",
          brightWhite: "#ffffff",
          brightYellow: "#f2cc60",
          cyan: "#39c5cf",
          green: "#3fb950",
          magenta: "#bc8cff",
          red: "#f85149",
          white: "#d6deeb",
          yellow: "#d29922"
        }
      });
      const fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      terminal.loadAddon(new WebLinksAddon());
      terminal.open(hostRef.current);
      terminalRef.current = terminal;
      fitAddonRef.current = fitAddon;
      dataDisposable = terminal.onData((data) => {
        pendingInputRef.current += data;
        if (data.includes("\r") || data.includes("\u0003")) {
          flushInput();
          return;
        }
        if (flushTimerRef.current === null && typeof window !== "undefined") {
          flushTimerRef.current = window.setTimeout(flushInput, 16);
        }
      });
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(fitAndResize);
        resizeObserver.observe(hostRef.current);
      }
      fitAndResize();
      const activeSession = sessionRef.current;
      if (activeSession?.output) {
        terminal.write(activeSession.output);
        lastOutputRef.current = activeSession.output;
      }
    })();

    return () => {
      disposed = true;
      if (flushTimerRef.current !== null && typeof window !== "undefined") {
        window.clearTimeout(flushTimerRef.current);
        flushTimerRef.current = null;
      }
      dataDisposable?.dispose();
      resizeObserver?.disconnect();
      terminalRef.current?.dispose();
      terminalRef.current = null;
      fitAddonRef.current = null;
    };
  }, []);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) {
      return;
    }
    if (!session) {
      terminal.clear();
      lastOutputRef.current = "";
      return;
    }
    const output = session.output || "";
    const previous = lastOutputRef.current;
    if (!previous || !output.startsWith(previous)) {
      terminal.clear();
      if (output) {
        terminal.write(output);
      }
    } else if (output.length > previous.length) {
      terminal.write(output.slice(previous.length));
    }
    lastOutputRef.current = output;
  }, [session?.output, session?.sessionId, session]);

  const startFromSurface = () => {
    const terminal = terminalRef.current;
    void onStart({
      rows: terminal?.rows || session?.rows || 28,
      cols: terminal?.cols || session?.cols || 100
    });
  };

  return (
    <div className="native-pty-terminal-shell" aria-label={ariaLabel}>
      <div ref={hostRef} className="native-pty-terminal-host" />
      {!session && (
        <div className="native-pty-placeholder">
          <span>{placeholder}</span>
          <button type="button" onClick={startFromSurface} disabled={!runtimeAvailable}>
            <SquareTerminal size={15} aria-hidden="true" />
            <strong>{startLabel}</strong>
          </button>
        </div>
      )}
    </div>
  );
}

function formatSessionOutput(session: RuntimeTerminalSession, fallback: string) {
  const chunks: string[] = [];
  if (session.stdout) {
    chunks.push(`[stdout]\n${session.stdout}`);
  }
  if (session.stderr) {
    chunks.push(`[stderr]\n${session.stderr}`);
  }
  return chunks.length ? chunks.join("\n\n") : fallback;
}

function sessionStatusDetail(session: RuntimeTerminalSession) {
  if (session.pendingDecisionPrompts) {
    return `${session.pendingDecisionPrompts} pending`;
  }
  if (session.decisionInboxItems) {
    return `${session.decisionInboxItems} inbox`;
  }
  return session.outputTruncated ? "truncated" : "bounded";
}

function isWritableSessionStatus(status: string) {
  return ["running", "defer_message_sent"].includes(status);
}

function isActiveSessionStatus(status: string) {
  return isWritableSessionStatus(status);
}

function formatDuration(ms: number) {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  if (ms < 60_000) {
    return `${Math.round(ms / 100) / 10}s`;
  }
  return `${Math.round(ms / 60_000)}m`;
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
