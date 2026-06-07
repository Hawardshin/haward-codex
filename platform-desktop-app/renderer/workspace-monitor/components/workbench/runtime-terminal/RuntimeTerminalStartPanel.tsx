"use client";

import { Clipboard, Eraser, ListFilter, Settings, ShieldCheck, SquareTerminal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { RuntimeTerminalAdapter, RuntimeTerminalSessionMode, RuntimeTextChoice } from "./runtimeTerminalTypes";

type RuntimeTerminalStartPanelProps = {
  adapters: RuntimeTerminalAdapter[];
  autoDeferQuestions: boolean;
  canStartSession: boolean;
  copy: Record<string, string>;
  onOpenSettings: () => void;
  onResetSessionPromptChoice?: () => void | Promise<void>;
  onRunCliSetup?: () => void | Promise<void>;
  onSaveSessionPromptChoice?: () => void | Promise<void>;
  onSelectSessionPromptChoice?: (choice: RuntimeTextChoice) => void;
  onSessionPromptChange: (value: string) => void;
  onStartSession: () => void | Promise<void>;
  onSwitchToOutput: () => void;
  onWorkingDirChange: (value: string) => void;
  runningAdapterId: string;
  selectedMode: RuntimeTerminalSessionMode;
  selectedPromptCanReset: boolean;
  selectedPromptChoice: RuntimeTextChoice | null;
  selectedPromptIsCustomized: boolean;
  selectedSessionAdapterId: string;
  sessionPrompt: string;
  sessionPromptChoiceKey?: string;
  sessionPromptChoices: RuntimeTextChoice[];
  uiLanguage: "ko" | "en";
  workingDir: string;
  workingDirOptions: RuntimeTextChoice[];
};

type TerminalUsageCard = {
  id: string;
  icon: LucideIcon;
  label: string;
  detail: string;
  onClick?: () => void | Promise<void>;
};

// 한국어 주석: 첫 실행 입력면을 독립시켜 Codex/CLI 시작 UX와 드로어 레이아웃 책임을 분리한다.
export function RuntimeTerminalStartPanel({
  adapters,
  autoDeferQuestions,
  canStartSession,
  copy,
  onOpenSettings,
  onResetSessionPromptChoice,
  onRunCliSetup,
  onSaveSessionPromptChoice,
  onSelectSessionPromptChoice,
  onSessionPromptChange,
  onStartSession,
  onSwitchToOutput,
  onWorkingDirChange,
  runningAdapterId,
  selectedMode,
  selectedPromptCanReset,
  selectedPromptChoice,
  selectedPromptIsCustomized,
  selectedSessionAdapterId,
  sessionPrompt,
  sessionPromptChoiceKey,
  sessionPromptChoices,
  uiLanguage,
  workingDir,
  workingDirOptions
}: RuntimeTerminalStartPanelProps) {
  const terminalUsageCards: TerminalUsageCard[] = [
    { id: "pty", icon: SquareTerminal, label: copy.terminalGuidePty, detail: copy.terminalGuidePtyDetail },
    { id: "cli", icon: ShieldCheck, label: copy.terminalGuideCli, detail: copy.terminalGuideCliDetail, onClick: onRunCliSetup },
    { id: "cwd", icon: ListFilter, label: copy.terminalGuideCwd, detail: copy.terminalGuideCwdDetail },
    { id: "account", icon: Settings, label: copy.terminalGuideAccount, detail: copy.terminalGuideAccountDetail }
  ];

  return (
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
            {card.id === "cli" && (
              <em style={{ fontStyle: "normal", fontSize: "10px", color: "var(--primary-accent)" }}>
                {uiLanguage === "ko" ? "지금 실행" : "Run now"}
              </em>
            )}
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
            onSwitchToOutput();
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
  );
}
