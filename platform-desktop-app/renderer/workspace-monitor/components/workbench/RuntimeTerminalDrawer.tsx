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

  return (
    <>
      {!open && (
        <button type="button" className="terminal-drawer-launcher" onClick={onOpen}>
          <SquareTerminal size={16} aria-hidden="true" />
          <span>{uiLanguage === "ko" ? "터미널" : "Terminal"}</span>
          <strong>{sessions.length}</strong>
        </button>
      )}

      {open && (
        <button
          type="button"
          className="terminal-drawer-backdrop"
          aria-label={uiLanguage === "ko" ? "터미널 닫기" : "Close terminal"}
          onClick={onCollapse}
        />
      )}

      <section className={`panel wide cli-session-panel terminal-drawer ${open ? "open" : "closed"}`} aria-label={uiLanguage === "ko" ? "하단 다중 CLI 터미널" : "Bottom multi-CLI terminal"}>
        <div className="panel-heading">
          <div>
            <p className="eyebrow">Run Board</p>
            <h2>{uiLanguage === "ko" ? "하단 다중 CLI 터미널" : "Bottom multi-CLI terminal"}</h2>
          </div>
          <div className="desktop-actions">
            <span className="result-count">{sessions.length} sessions</span>
            <button type="button" onClick={onCollapse} title={uiLanguage === "ko" ? "터미널 접기" : "Collapse terminal"}>
              <X size={15} aria-hidden="true" />
              <span>{uiLanguage === "ko" ? "접기" : "Collapse"}</span>
            </button>
          </div>
        </div>

        <div className="run-board-strip">
          <article>
            <span>active lanes</span>
            <strong>{sessionStats.active}</strong>
          </article>
          <article>
            <span>deferred lanes</span>
            <strong>{sessionStats.deferred}</strong>
          </article>
          <article>
            <span>auto deferred</span>
            <strong>{sessionStats.autoDeferred}</strong>
          </article>
          <article>
            <span>output</span>
            <strong>{formatBytes(sessionStats.outputBytes)}</strong>
          </article>
          <article>
            <span>events</span>
            <strong>{outputEvents.length}</strong>
          </article>
        </div>

        <div className="process-graph" aria-label="CLI process graph">
          <article className="process-node node-intake">
            <span>intake</span>
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
            <span>decision</span>
            <strong>{openDecisionCount} open</strong>
          </article>
          <article className="process-node node-review">
            <span>review</span>
            <strong>{sourceDirty ? "diff pending" : "clean"}</strong>
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
            <span>{uiLanguage === "ko" ? "시작" : "Start"}</span>
            <small>{canStartSession ? "ready" : "blocked"}</small>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={terminalDrawerView === "sessions"}
            className={terminalDrawerView === "sessions" ? "active" : ""}
            onClick={() => setTerminalDrawerView("sessions")}
          >
            <ListFilter size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "세션" : "Sessions"}</span>
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
            <span>{uiLanguage === "ko" ? "출력" : "Output"}</span>
            <small>{selectedSession?.status || "idle"}</small>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={terminalDrawerView === "events"}
            className={terminalDrawerView === "events" ? "active" : ""}
            onClick={() => setTerminalDrawerView("events")}
          >
            <Inbox size={15} aria-hidden="true" />
            <span>{uiLanguage === "ko" ? "이벤트" : "Events"}</span>
            <small>{selectedOutputEvents.length}</small>
          </button>
        </div>

        {terminalDrawerView === "start" && (
        <div className="terminal-view-panel terminal-start-panel">
        <div className="session-launcher">
          <div className="settings-controlled-summary session-init-summary">
            <article>
              <span>Adapter</span>
              <strong>{adapters.find((adapter) => adapter.adapterId === selectedSessionAdapterId)?.label || selectedSessionAdapterId}</strong>
            </article>
            <article>
              <span>Mode</span>
              <strong>{selectedMode.label}</strong>
            </article>
            <article>
              <span>Questions</span>
              <strong>{autoDeferQuestions ? "auto-defer" : "manual"}</strong>
            </article>
            <button type="button" onClick={onOpenSettings}>
              <Settings size={15} aria-hidden="true" />
              <span>초기화 설정 변경</span>
            </button>
          </div>
          <label>
            <span>Working dir</span>
            <input value={workingDir} onChange={(event) => onWorkingDirChange(event.target.value)} placeholder="workspace root" />
          </label>
          <label className="session-prompt-field">
            <span>Initial input</span>
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
            <span>{runningAdapterId === "session" ? "Starting" : "Start Session"}</span>
          </button>
        </div>
        <p className="session-mode-note">{selectedMode.intent}</p>
        </div>
        )}

        {terminalDrawerView !== "start" && sessions.length === 0 ? (
          <p className="empty-state">실행 세션이 없습니다. 설치된 adapter를 선택하고 session을 시작하세요.</p>
        ) : (
          terminalDrawerView !== "start" && (
          <div className={`session-grid terminal-view-${terminalDrawerView}`}>
            {terminalDrawerView === "sessions" && (
            <div className="session-list" tabIndex={0} aria-label={uiLanguage === "ko" ? "CLI 세션 목록" : "CLI session list"}>
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
                    <span>{session.exitCode ?? "no code"}</span>
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
                    <strong>{session.taskRecordPath || "record pending"}</strong>
                    <small>{session.stdoutLogPath || "stdout log pending"}</small>
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
                      <span>Inspect</span>
                    </button>
                    <button type="button" onClick={() => void onPollSession(session.sessionId)} disabled={!runtimeAvailable}>
                      <Activity size={15} aria-hidden="true" />
                      <span>Poll</span>
                    </button>
                    <button type="button" onClick={() => void onDeferSession(session.sessionId)} disabled={!runtimeAvailable || session.status !== "running"}>
                      <Inbox size={15} aria-hidden="true" />
                      <span>Defer</span>
                    </button>
                    <button type="button" onClick={() => void onCancelSession(session.sessionId)} disabled={!runtimeAvailable || !["running", "defer_message_sent"].includes(session.status)}>
                      <ShieldCheck size={15} aria-hidden="true" />
                      <span>Cancel</span>
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
                  <span>{selectedSession?.sessionId || "no-session"}</span>
                  <h3>{selectedSession?.label || "Session output"}</h3>
                </div>
                <strong>{selectedSession?.status || "idle"}</strong>
              </header>
              <pre tabIndex={0} aria-label={uiLanguage === "ko" ? "선택한 CLI 출력" : "Selected CLI output"}>
                <code>{selectedSession ? selectedSession.stdout || selectedSession.stderr || "No output yet" : "No session selected"}</code>
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
                  <span>Send</span>
                </button>
              </div>
            </article>
            )}
            {terminalDrawerView === "events" && (
            <article className="session-terminal terminal-events-panel">
              <header>
                <div>
                  <span>{selectedSession?.sessionId || "no-session"}</span>
                  <h3>{uiLanguage === "ko" ? "터미널 이벤트" : "Terminal events"}</h3>
                </div>
                <strong>{selectedOutputEvents.length}</strong>
              </header>
              <div className="terminal-event-rail" tabIndex={0} aria-label={uiLanguage === "ko" ? "터미널 이벤트 목록" : "Terminal event list"}>
                {selectedOutputEvents.slice(0, 24).map((event) => (
                  <article key={event.id} className={`event-${event.type}`}>
                    <span>{event.type}</span>
                    <strong>{event.label}</strong>
                    <small>{event.detail}</small>
                  </article>
                ))}
                {selectedOutputEvents.length === 0 && <p className="empty-state">구조화된 terminal event가 아직 없습니다.</p>}
              </div>
            </article>
            )}
          </div>
          )
        )}
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
