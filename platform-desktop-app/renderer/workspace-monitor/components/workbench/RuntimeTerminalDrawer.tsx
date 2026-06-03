"use client";

import { Activity, ArrowRight, Inbox, ListFilter, Settings, ShieldCheck, SquareTerminal, X } from "lucide-react";
import { useState } from "react";

type RuntimeTerminalLanguage = "ko" | "en";
type TerminalDrawerView = "start" | "sessions" | "output" | "events";

type RuntimeTerminalAdapter = {
  adapterId: string;
  label: string;
  available: boolean;
};

type RuntimeTerminalSessionMode = {
  label: string;
  intent: string;
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

type RuntimeTerminalDrawerProps = {
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
  sessions: RuntimeTerminalSession[];
  sessionStats: RuntimeTerminalStats;
  sourceDirty: boolean;
  uiLanguage: RuntimeTerminalLanguage;
  workingDir: string;
  onCancelSession: (sessionId: string) => void | Promise<void>;
  onCollapse: () => void;
  onDeferSession: (sessionId: string) => void | Promise<void>;
  onOpen: () => void;
  onOpenSettings: () => void;
  onPollSession: (sessionId: string) => void | Promise<void>;
  onSelectSession: (sessionId: string) => void;
  onSessionInputChange: (value: string) => void;
  onSessionPromptChange: (value: string) => void;
  onStartSession: () => void | Promise<void>;
  onWorkingDirChange: (value: string) => void;
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
    noEvents: "구조화된 terminal event가 아직 없습니다."
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
  sessions,
  sessionStats,
  sourceDirty,
  uiLanguage,
  workingDir,
  onCancelSession,
  onCollapse,
  onDeferSession,
  onOpen,
  onOpenSettings,
  onPollSession,
  onSelectSession,
  onSessionInputChange,
  onSessionPromptChange,
  onStartSession,
  onWorkingDirChange,
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

  return (
    <>
      {!open && (
        <button type="button" className="terminal-drawer-launcher" onClick={onOpen}>
          <SquareTerminal size={16} aria-hidden="true" />
          <span>{copy.launcher}</span>
          <strong>{sessions.length}</strong>
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
              {sessions.length} {copy.sessions}
            </span>
            <button type="button" onClick={onCollapse} title={copy.collapse}>
              <X size={15} aria-hidden="true" />
              <span>{copy.collapse}</span>
            </button>
          </div>
        </div>

        <div className="terminal-drawer-workbench">
          <aside className="terminal-drawer-sidebar" aria-label={copy.rail}>
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

            <div className="terminal-view-switcher" role="tablist" aria-label={uiLanguage === "ko" ? "터미널 보기" : "Terminal views"}>
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
          </aside>

          <div className="terminal-drawer-main">
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
          <label>
            <span>{copy.workingDir}</span>
            <input value={workingDir} onChange={(event) => onWorkingDirChange(event.target.value)} placeholder="workspace root" />
          </label>
          <label className="session-prompt-field">
            <span>{copy.initialInput}</span>
            <textarea value={sessionPrompt} onChange={(event) => onSessionPromptChange(event.target.value)} rows={4} />
          </label>
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

            {terminalDrawerView !== "start" && sessions.length === 0 ? (
              <p className="empty-state">{copy.noSessions}</p>
            ) : (
              terminalDrawerView !== "start" && (
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
              <pre tabIndex={0} aria-label={copy.selectedOutput}>
                <code>{selectedSession ? selectedSession.stdout || selectedSession.stderr || copy.noOutput : copy.noSession}</code>
              </pre>
              {selectedSession?.stderr && selectedSession.stdout && <small>{selectedSession.stderr}</small>}
              <div className="session-input-row">
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
