export type RuntimeTerminalLanguage = "ko" | "en";
export type TerminalDrawerView = "start" | "native" | "sessions" | "output" | "events";

export type RuntimeTerminalAdapter = {
  adapterId: string;
  label: string;
  available: boolean;
};

export type RuntimeTerminalSessionMode = {
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

export type RuntimeTerminalStats = {
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
