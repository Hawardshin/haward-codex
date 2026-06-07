"use client";

import { Activity, ArrowRight, ChevronLeft, ChevronRight, Clipboard, ClipboardPaste, Eraser, Inbox, ListFilter, Maximize2, Search, Settings, ShieldCheck, SquareTerminal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useOverlayFocus } from "@/components/ui/useOverlayFocus";
import { readClipboardText, writeClipboardText } from "@/lib/clipboard.mjs";
import { formatBytes, formatDuration, isActiveSessionStatus } from "@/lib/runtimeDisplay";

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

export type NativePtyQuickCommand = {
  id: string;
  label: string;
  detail: string;
  input: string;
};

export type RuntimeTextChoice = {
  id: string;
  label: string;
  detail: string;
  value: string;
  badge?: string;
  customized?: boolean;
  defaultValue?: string;
  promptKey?: string;
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
  sessionPromptChoiceKey?: string;
  sessionPromptChoices?: RuntimeTextChoice[];
  sessions: RuntimeTerminalSession[];
  sessionStats: RuntimeTerminalStats;
  sourceDirty: boolean;
  uiLanguage: RuntimeTerminalLanguage;
  workingDir: string;
  workingDirOptions?: RuntimeTextChoice[];
  nativePtyQuickCommands?: NativePtyQuickCommand[];
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
  onSelectSessionPromptChoice?: (choice: RuntimeTextChoice) => void;
  onSessionPromptChange: (value: string) => void;
  onSaveSessionPromptChoice?: () => void | Promise<void>;
  onStartNativePtySession: (size: { rows: number; cols: number }) => void | Promise<void>;
  onStartSession: () => void | Promise<void>;
  onRunCliSetup?: () => void | Promise<void>;
  onResetSessionPromptChoice?: () => void | Promise<void>;
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
    terminalSearch: "검색",
    terminalSearchPlaceholder: "출력 검색",
    terminalSearchPrevious: "이전",
    terminalSearchNext: "다음",
    terminalCopySelection: "선택 복사",
    terminalCopyOutput: "출력 복사",
    terminalPaste: "붙여넣기",
    terminalClear: "화면 정리",
    terminalFit: "맞춤",
    terminalQuickCommands: "빠른 명령",
    terminalCopied: "복사됨",
    terminalCopyFailed: "복사할 내용이 없거나 권한이 없습니다.",
    terminalPasted: "붙여넣음",
    terminalPasteBlocked: "클립보드 읽기 권한이 없거나 붙여넣을 수 없습니다.",
    terminalCleared: "터미널 화면을 정리했습니다.",
    terminalFitted: "터미널 크기를 다시 맞췄습니다.",
    terminalSearchMatch: "검색 결과로 이동했습니다.",
    terminalSearchNoMatch: "일치하는 출력이 없습니다.",
    terminalCommandSent: "명령을 보냈습니다.",
    terminalGuidePty: "PTY 셸",
    terminalGuidePtyDetail: "실제 OS 셸을 앱 안에서 시작",
    terminalGuideCwd: "작업 폴더",
    terminalGuideCwdDetail: "루트/프로젝트/사용자 지정 경로 선택",
    terminalGuideControls: "검색과 클립보드",
    terminalGuideControlsDetail: "Cmd/Ctrl+F, Shift+C/V, 화면 정리",
    terminalGuideAccount: "AI 계정",
    terminalGuideAccountDetail: "설정에서 GPT/Gemini 키 연결",
    terminalGuideCli: "CLI 자동 설정",
    terminalGuideCliDetail: "원클릭으로 awp CLI 설치와 PATH 등록",
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
    savePrompt: "선택 프롬프트 저장",
    resetPrompt: "기본값",
    promptDefault: "기본 프롬프트",
    promptCustomized: "수정된 프롬프트",
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
    terminalSearch: "Search",
    terminalSearchPlaceholder: "Search output",
    terminalSearchPrevious: "Previous",
    terminalSearchNext: "Next",
    terminalCopySelection: "Copy selection",
    terminalCopyOutput: "Copy output",
    terminalPaste: "Paste",
    terminalClear: "Clear screen",
    terminalFit: "Fit",
    terminalQuickCommands: "Quick commands",
    terminalCopied: "Copied",
    terminalCopyFailed: "Nothing to copy or clipboard permission is blocked.",
    terminalPasted: "Pasted",
    terminalPasteBlocked: "Clipboard read is unavailable or this terminal cannot receive input.",
    terminalCleared: "Terminal screen cleared.",
    terminalFitted: "Terminal size refit.",
    terminalSearchMatch: "Moved to search match.",
    terminalSearchNoMatch: "No matching output.",
    terminalCommandSent: "Command sent.",
    terminalGuidePty: "PTY shell",
    terminalGuidePtyDetail: "Start the real OS shell inside the app",
    terminalGuideCwd: "Working folder",
    terminalGuideCwdDetail: "Choose root, project, or custom path",
    terminalGuideControls: "Search and clipboard",
    terminalGuideControlsDetail: "Cmd/Ctrl+F, Shift+C/V, clear screen",
    terminalGuideAccount: "AI accounts",
    terminalGuideAccountDetail: "Connect GPT/Gemini keys in Settings",
    terminalGuideCli: "CLI Auto Setup",
    terminalGuideCliDetail: "One-click install AWP CLI and PATH",
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
    savePrompt: "Save selected prompt",
    resetPrompt: "Default",
    promptDefault: "Default prompt",
    promptCustomized: "Customized prompt",
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

const nativePtyQuickActions = {
  ko: [
    { id: "pwd", label: "현재 위치", detail: "pwd", input: "pwd\n" },
    { id: "list", label: "파일 목록", detail: "ls -la", input: "ls -la\n" },
    { id: "git", label: "Git 상태", detail: "git status --short", input: "git status --short\n" }
  ],
  en: [
    { id: "pwd", label: "Current dir", detail: "pwd", input: "pwd\n" },
    { id: "list", label: "List files", detail: "ls -la", input: "ls -la\n" },
    { id: "git", label: "Git status", detail: "git status --short", input: "git status --short\n" }
  ]
} satisfies Record<RuntimeTerminalLanguage, NativePtyQuickCommand[]>;

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
  const terminalUsageCards = [
    { id: "pty", icon: SquareTerminal, label: copy.terminalGuidePty, detail: copy.terminalGuidePtyDetail },
    { id: "cli", icon: ShieldCheck, label: copy.terminalGuideCli, detail: copy.terminalGuideCliDetail, onClick: onRunCliSetup },
    { id: "cwd", icon: ListFilter, label: copy.terminalGuideCwd, detail: copy.terminalGuideCwdDetail },
    { id: "account", icon: Settings, label: copy.terminalGuideAccount, detail: copy.terminalGuideAccountDetail }
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
        <div className="terminal-usage-guide" data-terminal-usage-guide>
          {terminalUsageCards.map((card) => (
            <article
              key={card.id}
              data-terminal-usage-card={card.id}
              onClick={card.onClick}
              style={card.onClick ? { cursor: "pointer", border: "1px solid var(--primary-accent)" } : undefined}
            >
              <card.icon size={15} aria-hidden="true" />
              <strong>{card.label}</strong>
              <small>{card.detail}</small>
              {card.id === "cli" && <em style={{ fontStyle: "normal", fontSize: "10px", color: "var(--primary-accent)" }}>{uiLanguage === "ko" ? "지금 실행" : "Run now"}</em>}
            </article>
          ))}
        </div>
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
                    className={`${(choice.promptKey || choice.id) === sessionPromptChoiceKey || (!sessionPromptChoiceKey && sessionPrompt === choice.value) ? "active" : ""} ${choice.customized ? "customized" : ""}`.trim()}
                    aria-pressed={(choice.promptKey || choice.id) === sessionPromptChoiceKey || (!sessionPromptChoiceKey && sessionPrompt === choice.value)}
                    onClick={() => {
                      if (onSelectSessionPromptChoice) {
                        onSelectSessionPromptChoice(choice);
                      } else {
                        onSessionPromptChange(choice.value);
                      }
                    }}
                    title={choice.detail}
                  >
                    <span>{choice.label}</span>
                    <small>{choice.detail}</small>
                    {choice.badge && <em>{choice.badge}</em>}
                    {choice.customized && <em>{uiLanguage === "ko" ? "수정" : "Custom"}</em>}
                  </button>
                ))}
              </div>
            )}
            <textarea aria-label={copy.initialInput} value={sessionPrompt} onChange={(event) => onSessionPromptChange(event.target.value)} rows={4} />
            {selectedPromptChoice && (
              <div className="prompt-edit-actions" data-session-prompt-editor>
                <button type="button" onClick={() => void onSaveSessionPromptChoice?.()} disabled={!sessionPrompt.trim() || !onSaveSessionPromptChoice}>
                  <Clipboard size={14} aria-hidden="true" />
                  <span>{copy.savePrompt}</span>
                </button>
                <button type="button" onClick={() => void onResetSessionPromptChoice?.()} disabled={!selectedPromptCanReset || !onResetSessionPromptChoice}>
                  <Eraser size={14} aria-hidden="true" />
                  <span>{copy.resetPrompt}</span>
                </button>
                <small>{selectedPromptIsCustomized ? copy.promptCustomized : copy.promptDefault}</small>
              </div>
            )}
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

  return portalTarget ? createPortal(drawerOverlay, portalTarget) : drawerOverlay;
}

function NativePtyTerminalSurface({
  ariaLabel,
  labels,
  placeholder,
  quickCommands,
  runtimeAvailable,
  session,
  startLabel,
  onResize,
  onStart,
  onWrite
}: {
  ariaLabel: string;
  labels: Record<string, string>;
  placeholder: string;
  quickCommands: NativePtyQuickCommand[];
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
  const searchAddonRef = useRef<import("@xterm/addon-search").SearchAddon | null>(null);
  const lastOutputRef = useRef("");
  const resizeSignatureRef = useRef("");
  const pendingInputRef = useRef("");
  const flushTimerRef = useRef<number | null>(null);
  const noticeTimerRef = useRef<number | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const fitAndResizeRef = useRef<() => void>(() => {});
  const sessionRef = useRef<RuntimeNativePtySession | null>(session);
  const runtimeAvailableRef = useRef(runtimeAvailable);
  const onResizeRef = useRef(onResize);
  const onWriteRef = useRef(onWrite);
  const [searchQuery, setSearchQuery] = useState("");
  const [terminalNotice, setTerminalNotice] = useState("");

  useEffect(() => {
    sessionRef.current = session;
    runtimeAvailableRef.current = runtimeAvailable;
    onResizeRef.current = onResize;
    onWriteRef.current = onWrite;
  }, [runtimeAvailable, session, onResize, onWrite]);

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current !== null && typeof window !== "undefined") {
        window.clearTimeout(noticeTimerRef.current);
        noticeTimerRef.current = null;
      }
    };
  }, []);

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
    fitAndResizeRef.current = fitAndResize;

    void (async () => {
      const [{ Terminal }, { FitAddon }, { WebLinksAddon }, { SearchAddon }] = await Promise.all([
        import("@xterm/xterm"),
        import("@xterm/addon-fit"),
        import("@xterm/addon-web-links"),
        import("@xterm/addon-search")
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
      const searchAddon = new SearchAddon();
      terminal.loadAddon(fitAddon);
      terminal.loadAddon(searchAddon);
      terminal.loadAddon(new WebLinksAddon());
      terminal.open(hostRef.current);
      terminalRef.current = terminal;
      fitAddonRef.current = fitAddon;
      searchAddonRef.current = searchAddon;
      terminal.attachCustomKeyEventHandler((event) => {
        const key = event.key.toLowerCase();
        if ((event.metaKey || event.ctrlKey) && key === "f") {
          window.setTimeout(() => searchInputRef.current?.focus(), 0);
          return false;
        }
        if ((event.metaKey || event.ctrlKey) && event.shiftKey && key === "c") {
          void copyTerminalSelection();
          return false;
        }
        if ((event.metaKey || event.ctrlKey) && event.shiftKey && key === "v") {
          void pasteFromClipboard();
          return false;
        }
        if ((event.metaKey || event.ctrlKey) && key === "l") {
          clearTerminalScreen();
          return false;
        }
        return true;
      });
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
      searchAddonRef.current = null;
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

  const canUseActivePty = runtimeAvailable && Boolean(session) && Boolean(session && isWritableSessionStatus(session.status));

  function notify(message: string) {
    setTerminalNotice(message);
    if (noticeTimerRef.current !== null && typeof window !== "undefined") {
      window.clearTimeout(noticeTimerRef.current);
    }
    if (typeof window !== "undefined") {
      noticeTimerRef.current = window.setTimeout(() => {
        setTerminalNotice("");
        noticeTimerRef.current = null;
      }, 2600);
    }
  }

  async function copyTerminalSelection() {
    const terminal = terminalRef.current;
    const selectedText = terminal?.getSelection() || "";
    const fallbackOutput = sessionRef.current?.output || "";
    const copied = await writeClipboardText(selectedText || fallbackOutput);
    notify(copied ? labels.terminalCopied : labels.terminalCopyFailed);
  }

  async function pasteFromClipboard() {
    const activeSession = sessionRef.current;
    if (!activeSession || !runtimeAvailableRef.current || !isWritableSessionStatus(activeSession.status)) {
      notify(labels.terminalPasteBlocked);
      return;
    }
    try {
      const text = await readClipboardText();
      if (!text) {
        notify(labels.terminalPasteBlocked);
        return;
      }
      await onWriteRef.current(activeSession.sessionId, text);
      terminalRef.current?.focus();
      notify(labels.terminalPasted);
    } catch {
      notify(labels.terminalPasteBlocked);
    }
  }

  function clearTerminalScreen() {
    const terminal = terminalRef.current;
    terminal?.clear();
    lastOutputRef.current = sessionRef.current?.output || "";
    const activeSession = sessionRef.current;
    if (activeSession && runtimeAvailableRef.current && isWritableSessionStatus(activeSession.status)) {
      void onWriteRef.current(activeSession.sessionId, "\f");
    }
    terminal?.focus();
    notify(labels.terminalCleared);
  }

  function fitTerminalScreen() {
    fitAndResizeRef.current();
    terminalRef.current?.focus();
    notify(labels.terminalFitted);
  }

  function runTerminalSearch(direction: "next" | "previous") {
    const query = searchQuery.trim();
    if (!query || !searchAddonRef.current) {
      searchInputRef.current?.focus();
      return;
    }
    const found = direction === "previous" ? searchAddonRef.current.findPrevious(query) : searchAddonRef.current.findNext(query);
    notify(found ? labels.terminalSearchMatch : labels.terminalSearchNoMatch);
  }

  function writeQuickCommand(input: string) {
    const activeSession = sessionRef.current;
    if (!activeSession || !runtimeAvailableRef.current || !isWritableSessionStatus(activeSession.status)) {
      notify(labels.terminalPasteBlocked);
      return;
    }
    void onWriteRef.current(activeSession.sessionId, input);
    terminalRef.current?.focus();
    notify(labels.terminalCommandSent);
  }

  return (
    <div className="native-pty-terminal-shell" aria-label={ariaLabel}>
      <div className="native-pty-command-center" data-terminal-command-center>
        <label className="native-pty-search-control">
          <Search size={14} aria-hidden="true" />
          <span>{labels.terminalSearch}</span>
          <input
            ref={searchInputRef}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                runTerminalSearch(event.shiftKey ? "previous" : "next");
              }
            }}
            placeholder={labels.terminalSearchPlaceholder}
            data-terminal-search-input
          />
        </label>
        <div className="native-pty-toolbar" role="toolbar" aria-label={labels.nativePtySurface}>
          <button type="button" onClick={() => runTerminalSearch("previous")} disabled={!searchQuery.trim()} data-terminal-search-action="previous" title={labels.terminalSearchPrevious}>
            <ChevronLeft size={15} aria-hidden="true" />
            <span>{labels.terminalSearchPrevious}</span>
          </button>
          <button type="button" onClick={() => runTerminalSearch("next")} disabled={!searchQuery.trim()} data-terminal-search-action="next" title={labels.terminalSearchNext}>
            <ChevronRight size={15} aria-hidden="true" />
            <span>{labels.terminalSearchNext}</span>
          </button>
          <button type="button" onClick={() => void copyTerminalSelection()} data-terminal-action="copy-selection" title={labels.terminalCopySelection}>
            <Clipboard size={15} aria-hidden="true" />
            <span>{labels.terminalCopySelection}</span>
          </button>
          <button type="button" onClick={() => void pasteFromClipboard()} disabled={!canUseActivePty} data-terminal-action="paste" title={labels.terminalPaste}>
            <ClipboardPaste size={15} aria-hidden="true" />
            <span>{labels.terminalPaste}</span>
          </button>
          <button type="button" onClick={clearTerminalScreen} data-terminal-action="clear" title={labels.terminalClear}>
            <Eraser size={15} aria-hidden="true" />
            <span>{labels.terminalClear}</span>
          </button>
          <button type="button" onClick={fitTerminalScreen} data-terminal-action="fit" title={labels.terminalFit}>
            <Maximize2 size={15} aria-hidden="true" />
            <span>{labels.terminalFit}</span>
          </button>
        </div>
      </div>
      <div className="native-pty-quick-commands" data-terminal-quick-commands aria-label={labels.terminalQuickCommands}>
        <span>{labels.terminalQuickCommands}</span>
        {quickCommands.map((command) => (
          <button key={command.id} type="button" onClick={() => writeQuickCommand(command.input)} disabled={!canUseActivePty} data-terminal-quick-command={command.id}>
            <strong>{command.label}</strong>
            <small>{command.detail}</small>
          </button>
        ))}
      </div>
      {terminalNotice && <p className="native-pty-notice" role="status">{terminalNotice}</p>}
      <div className="native-pty-terminal-stage">
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
  return isActiveSessionStatus(status);
}
