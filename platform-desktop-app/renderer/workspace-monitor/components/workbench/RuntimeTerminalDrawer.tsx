"use client";

import { Activity, AlertTriangle, ArrowRight, CheckCircle2, Inbox, ListFilter, ShieldCheck, SquareTerminal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useOverlayFocus } from "@/components/ui/useOverlayFocus";
import { formatBytes, formatDuration, isActiveSessionStatus } from "@/lib/runtimeDisplay";
import { NativePtyTerminalSurface } from "./runtime-terminal/RuntimeNativePtyTerminalSurface";
import { RuntimeTerminalStartPanel } from "./runtime-terminal/RuntimeTerminalStartPanel";
import { nativePtyQuickActions, terminalCopy } from "./runtime-terminal/runtimeTerminalCopy";
import type { RuntimeTerminalDrawerProps, RuntimeTerminalSession, TerminalDrawerView } from "./runtime-terminal/runtimeTerminalTypes";
import { formatSessionOutput, isWritableSessionStatus, sessionStatusDetail } from "./runtime-terminal/runtimeTerminalUtils";

export type { NativePtyQuickCommand, RuntimeNativePtySession, RuntimeTerminalDrawerProps, RuntimeTerminalEvent, RuntimeTerminalSession, RuntimeTextChoice } from "./runtime-terminal/runtimeTerminalTypes";

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
  sessionPromptChoiceKey,
  sessionPromptChoices = [],
  sessions,
  sessionStats,
  sourceDirty,
  uiLanguage,
  workingDir,
  workingDirOptions = [],
  nativePtyQuickCommands,
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
  onSelectSessionPromptChoice,
  onSessionPromptChange,
  onSaveSessionPromptChoice,
  onStartNativePtySession,
  onStartSession,
  onRunCliSetup,
  onResetSessionPromptChoice,
  onWorkingDirChange,
  onWriteNativePtyInput,
  onWriteSessionInput
}: RuntimeTerminalDrawerProps) {
  const [terminalDrawerView, setTerminalDrawerView] = useState<TerminalDrawerView>("start");
  const drawerRef = useRef<HTMLElement | null>(null);
  const collapseButtonRef = useRef<HTMLButtonElement | null>(null);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const canStartSession =
    runtimeAvailable &&
    runningAdapterId === "" &&
    adapters.some((adapter) => adapter.adapterId === selectedSessionAdapterId && adapter.available);
  const canWriteToSelectedSession =
    runtimeAvailable && Boolean(selectedSession) && sessionInput.trim() !== "" && Boolean(selectedSession && isWritableSessionStatus(selectedSession.status));
  const copy = terminalCopy[uiLanguage];
  const selectedAdapter = adapters.find((adapter) => adapter.adapterId === selectedSessionAdapterId);
  const selectedPromptChoice =
    sessionPromptChoices.find((choice) => (choice.promptKey || choice.id) === sessionPromptChoiceKey) ||
    sessionPromptChoices.find((choice) => choice.value === sessionPrompt) ||
    null;
  const selectedPromptDefaultValue = selectedPromptChoice?.defaultValue || selectedPromptChoice?.value || "";
  const selectedPromptIsCustomized = Boolean(selectedPromptChoice?.customized);
  const selectedPromptCanReset =
    Boolean(selectedPromptChoice) &&
    (selectedPromptIsCustomized || (selectedPromptDefaultValue !== "" && sessionPrompt.trim() !== selectedPromptDefaultValue.trim()));
  const terminalCwd = selectedSession?.workingDir || workingDir || "workspace root";
  const selectedSessionOutput = selectedSession ? formatSessionOutput(selectedSession, copy.noOutput) : copy.noSession;
  const selectedAdapterAvailable = Boolean(selectedAdapter?.available);
  const terminalReadinessState = runtimeAvailable && selectedAdapterAvailable ? "ready" : runtimeAvailable ? "adapter_blocked" : "runtime_offline";
  const nativePtyWritable = Boolean(nativePtySession && isWritableSessionStatus(nativePtySession.status));
  const startNativePtyFromDrawer = () => {
    setTerminalDrawerView("native");
    if (!nativePtyWritable) {
      void onStartNativePtySession({ rows: nativePtySession?.rows || 28, cols: nativePtySession?.cols || 100 });
    }
  };
  const readinessItems = [
    {
      id: "runtime",
      label: copy.runtime,
      value: runtimeAvailable ? copy.ready : copy.blocked,
      ready: runtimeAvailable
    },
    {
      id: "adapter",
      label: copy.adapter,
      value: selectedAdapter?.label || selectedSessionAdapterId,
      ready: selectedAdapterAvailable
    },
    {
      id: "native",
      label: copy.native,
      value: nativePtySession?.status || copy.idle,
      ready: nativePtyWritable
    },
    {
      id: "cwd",
      label: copy.workingDir,
      value: terminalCwd,
      ready: true
    }
  ];
  useEffect(() => {
    setPortalTarget(document.querySelector<HTMLElement>(".desktop-app-root") || document.body);
  }, []);

  useOverlayFocus({
    open,
    containerRef: drawerRef,
    initialFocusRef: collapseButtonRef,
    onClose: onCollapse,
    readyKey: portalTarget
  });

  const drawerOverlay = (
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

      <section
        ref={drawerRef}
        className={`panel wide cli-session-panel terminal-drawer ${open ? "open" : "closed"}`}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-hidden={!open}
        aria-label={copy.aria}
        style={open ? { opacity: 1, transform: "translateY(0)", transition: "none", visibility: "visible" } : undefined}
        tabIndex={-1}
      >
        <div className="panel-heading">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2>{copy.title}</h2>
          </div>
          <div className="desktop-actions">
            <span className="result-count">
              {sessions.length + nativePtySessions.length} {copy.sessions}
            </span>
            <button ref={collapseButtonRef} type="button" onClick={onCollapse} title={copy.collapse}>
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

        <section className="terminal-readiness-strip" data-terminal-readiness={terminalReadinessState} aria-label={copy.terminalReadiness}>
          <div className="terminal-readiness-summary">
            {terminalReadinessState === "ready" ? <CheckCircle2 size={16} aria-hidden="true" /> : <AlertTriangle size={16} aria-hidden="true" />}
            <div>
              <strong>{terminalReadinessState === "ready" ? copy.terminalReadyTitle : copy.terminalBlockedTitle}</strong>
              <span>{terminalReadinessState === "ready" ? copy.terminalReadyDetail : copy.terminalBlockedDetail}</span>
            </div>
          </div>
          <div className="terminal-readiness-facts">
            {readinessItems.map((item) => (
              <article key={item.id} className={item.ready ? "ready" : "blocked"} data-terminal-readiness-item={item.id}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </article>
            ))}
          </div>
          <div className="terminal-readiness-actions">
            <button type="button" onClick={startNativePtyFromDrawer} disabled={!runtimeAvailable}>
              <SquareTerminal size={15} aria-hidden="true" />
              <span>{copy.startNativePty}</span>
            </button>
            <button type="button" onClick={() => void onRunCliSetup?.()} disabled={!onRunCliSetup}>
              <ShieldCheck size={15} aria-hidden="true" />
              <span>{copy.terminalGuideCli}</span>
            </button>
          </div>
        </section>

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
              <RuntimeTerminalStartPanel
                adapters={adapters}
                autoDeferQuestions={autoDeferQuestions}
                canStartSession={canStartSession}
                copy={copy}
                onOpenSettings={onOpenSettings}
                onResetSessionPromptChoice={onResetSessionPromptChoice}
                onRunCliSetup={onRunCliSetup}
                onSaveSessionPromptChoice={onSaveSessionPromptChoice}
                onSelectSessionPromptChoice={onSelectSessionPromptChoice}
                onSessionPromptChange={onSessionPromptChange}
                onStartNativePty={startNativePtyFromDrawer}
                onStartSession={onStartSession}
                onSwitchToNative={() => setTerminalDrawerView("native")}
                onSwitchToOutput={() => setTerminalDrawerView("output")}
                onWorkingDirChange={onWorkingDirChange}
                runningAdapterId={runningAdapterId}
                runtimeAvailable={runtimeAvailable}
                selectedMode={selectedMode}
                selectedAdapterAvailable={selectedAdapterAvailable}
                nativePtySessionCount={nativePtySessions.length}
                nativePtyStatus={nativePtySession?.status || copy.idle}
                selectedPromptCanReset={selectedPromptCanReset}
                selectedPromptChoice={selectedPromptChoice}
                selectedPromptIsCustomized={selectedPromptIsCustomized}
                selectedSessionAdapterId={selectedSessionAdapterId}
                sessionPrompt={sessionPrompt}
                sessionPromptChoiceKey={sessionPromptChoiceKey}
                sessionPromptChoices={sessionPromptChoices}
                uiLanguage={uiLanguage}
                workingDir={workingDir}
                workingDirOptions={workingDirOptions}
              />
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
                  labels={copy}
                  placeholder={copy.nativePtyPlaceholder}
                  quickCommands={nativePtyQuickCommands?.length ? nativePtyQuickCommands : nativePtyQuickActions[uiLanguage]}
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
                    onClick={startNativePtyFromDrawer}
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

  return portalTarget ? createPortal(drawerOverlay, portalTarget) : drawerOverlay;
}
