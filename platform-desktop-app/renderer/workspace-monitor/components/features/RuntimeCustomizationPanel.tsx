import {
  Bot,
  PlayCircle,
  RefreshCw,
  SquareTerminal,
  Trash2,
  Wrench
} from "lucide-react";
import type {
  NativePtyQuickCommand,
  ProviderCredentialReport,
  RuntimeCustomization,
  RuntimeProviderOverride,
  UiLanguage
} from "@/types/desktop";

const providerLabelKoMap: Record<string, string> = {
  ollama: "올라마",
  openai: "오픈AI",
  anthropic: "클로드",
  "google-gemini": "제미니",
};

const providerDisplayName = (providerId: string, fallback: string, uiLanguage: UiLanguage) => {
  if (uiLanguage !== "ko") {
    return fallback;
  }
  return providerLabelKoMap[providerId] || fallback;
};

const runtimeProviderDefaultBaseUrls: Record<string, string> = {
  ollama: "http://127.0.0.1:11434",
  openai: "https://api.openai.com/v1",
  anthropic: "https://api.anthropic.com",
  "google-gemini": "https://generativelanguage.googleapis.com"
};

function providerDefaultBaseUrlFor(providerId: string) {
  return runtimeProviderDefaultBaseUrls[providerId] || "";
}

function trimRuntimeSetting(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

const defaultTerminalQuickCommands: NativePtyQuickCommand[] = [
  { id: "pwd", label: "현재 위치", detail: "pwd", input: "pwd\n" },
  { id: "list", label: "파일 목록", detail: "ls -la", input: "ls -la\n" },
  { id: "git", label: "Git 상태", detail: "git status --short", input: "git status --short\n" }
];

function normalizeRuntimeCustomization(customization: Partial<RuntimeCustomization> | null | undefined): RuntimeCustomization {
  const providerOverrides = (customization?.providerOverrides || []).map((override) => ({
    providerId: override.providerId,
    defaultModel: trimRuntimeSetting(override.defaultModel, 140),
    baseUrl: trimRuntimeSetting(override.baseUrl, 240) || providerDefaultBaseUrlFor(override.providerId)
  }));

  return {
    providerOverrides,
    prompts: customization?.prompts || { sessionPrompts: {}, taskPipePrompts: {} },
    terminal: {
      shellCommand: customization?.terminal?.shellCommand || "",
      startupCommand: customization?.terminal?.startupCommand || "",
      quickCommands: customization?.terminal?.quickCommands || defaultTerminalQuickCommands
    }
  };
}

export function RuntimeCustomizationPanel({
  uiLanguage,
  report,
  customization,
  onProviderChange,
  onProviderReset,
  onTerminalChange,
  onQuickCommandChange,
  onAddQuickCommand,
  onRemoveQuickCommand,
  onResetQuickCommands
}: {
  uiLanguage: UiLanguage;
  report: ProviderCredentialReport;
  customization: RuntimeCustomization;
  onProviderChange: (providerId: string, field: keyof RuntimeProviderOverride, value: string) => void;
  onProviderReset: (providerId: string) => void;
  onTerminalChange: (field: "shellCommand" | "startupCommand", value: string) => void;
  onQuickCommandChange: (index: number, field: keyof NativePtyQuickCommand, value: string) => void;
  onAddQuickCommand: () => void;
  onRemoveQuickCommand: (index: number) => void;
  onResetQuickCommands: () => void;
}) {
  const ko = uiLanguage === "ko";
  const copy = ko
    ? {
        title: "실행 커스텀",
        summary: "모델, API 주소, 네이티브 셸, 빠른 명령을 저장하고 실제 실행에 적용합니다.",
        providerTitle: "AI 제공자 런타임",
        providerDetail: "계정 저장과 별개로 호출 모델과 base URL을 바꿉니다.",
        terminalTitle: "네이티브 터미널",
        terminalDetail: "PTY 셸과 시작 명령을 사용 환경에 맞춥니다.",
        quickTitle: "빠른 명령",
        model: "작업 기본 모델",
        baseUrl: "API base URL",
        reset: "기본값",
        official: "공식",
        local: "로컬",
        proxy: "프록시",
        shell: "셸",
        shellInput: "셸 명령",
        startupCommand: "시작 명령",
        startupPlaceholder: "예: nvm use --lts 또는 source .venv/bin/activate",
        systemShell: "시스템 기본",
        directInput: "직접 입력",
        commandLabel: "버튼 라벨",
        commandDetail: "설명",
        commandInput: "실행 명령",
        addCommand: "명령 추가",
        remove: "삭제",
        resetCommands: "추천 명령 복원"
      }
    : {
        title: "Runtime customization",
        summary: "Store model, API URL, native shell, and quick commands, then apply them to real execution.",
        providerTitle: "AI provider runtime",
        providerDetail: "Change call model and base URL separately from credential storage.",
        terminalTitle: "Native terminal",
        terminalDetail: "Tune the PTY shell and startup command for your environment.",
        quickTitle: "Quick commands",
        model: "Work default model",
        baseUrl: "API base URL",
        reset: "Defaults",
        official: "Official",
        local: "Local",
        proxy: "Proxy",
        shell: "Shell",
        shellInput: "Shell command",
        startupCommand: "Startup command",
        startupPlaceholder: "e.g. nvm use --lts or source .venv/bin/activate",
        systemShell: "System default",
        directInput: "Custom",
        commandLabel: "Button label",
        commandDetail: "Detail",
        commandInput: "Command input",
        addCommand: "Add command",
        remove: "Remove",
        resetCommands: "Restore recommended"
      };
  const normalized = normalizeRuntimeCustomization(customization);
  const overrideById = new Map(normalized.providerOverrides.map((override) => [override.providerId, override]));
  const shellPresets = [
    { label: copy.systemShell, value: "", detail: ko ? "로그인 셸 사용" : "Use login shell" },
    { label: "zsh", value: "/bin/zsh", detail: "/bin/zsh" },
    { label: "bash", value: "/bin/bash", detail: "/bin/bash" },
    { label: "fish", value: "/opt/homebrew/bin/fish", detail: "/opt/homebrew/bin/fish" }
  ];
  const activeShellPreset = shellPresets.some((preset) => preset.value === normalized.terminal.shellCommand)
    ? normalized.terminal.shellCommand
    : "__custom__";
  const providerBaseUrlPresets = (providerId: string) => {
    const official = providerDefaultBaseUrlFor(providerId);
    if (providerId === "openai") {
      return [
        { label: copy.official, value: official },
        { label: copy.proxy, value: "http://127.0.0.1:4000/v1" },
        { label: copy.local, value: "http://127.0.0.1:11434/v1" }
      ];
    }
    if (providerId === "ollama") {
      return [
        { label: copy.local, value: official },
        { label: "localhost", value: "http://localhost:11434" }
      ];
    }
    return [{ label: copy.official, value: official }];
  };

  return (
    <section className="settings-pane wide runtime-customization-pane" data-runtime-customization-panel>
      <div className="settings-pane-heading">
        <Wrench size={16} aria-hidden="true" />
        <div>
          <span>{copy.title}</span>
          <strong>{copy.summary}</strong>
        </div>
      </div>

      <div className="runtime-customization-grid">
        <div className="runtime-customization-block">
          <header>
            <div>
              <span>{copy.providerTitle}</span>
              <strong>{copy.providerDetail}</strong>
            </div>
            <Bot size={16} aria-hidden="true" />
          </header>
          <div className="runtime-provider-custom-list">
              {report.providers.map((provider) => {
                const override = overrideById.get(provider.providerId) || {
                  providerId: provider.providerId,
                  defaultModel: provider.defaultModel,
                  baseUrl: providerDefaultBaseUrlFor(provider.providerId)
                };
                const providerName = providerDisplayName(provider.providerId, provider.label, uiLanguage);
                return (
                  <article key={provider.providerId} className="runtime-provider-custom-card" data-runtime-provider-custom={provider.providerId}>
                    <header>
                      <div>
                        <span>{provider.providerId}</span>
                        <strong>{providerName}</strong>
                      </div>
                    <button type="button" onClick={() => onProviderReset(provider.providerId)}>
                      <RefreshCw size={14} aria-hidden="true" />
                      <span>{copy.reset}</span>
                    </button>
                  </header>
                  <div className="runtime-custom-fields">
                    <label>
                      <span>{copy.model}</span>
                      <input
                        data-runtime-provider-model={provider.providerId}
                        value={override.defaultModel}
                        onChange={(event) => onProviderChange(provider.providerId, "defaultModel", event.target.value)}
                        placeholder={provider.defaultModel}
                      />
                    </label>
                    <label>
                      <span>{copy.baseUrl}</span>
                      <input
                        data-runtime-provider-base-url={provider.providerId}
                        value={override.baseUrl}
                        onChange={(event) => onProviderChange(provider.providerId, "baseUrl", event.target.value)}
                        placeholder={providerDefaultBaseUrlFor(provider.providerId)}
                      />
                    </label>
                  </div>
                    <div className="runtime-preset-row" role="group" aria-label={`${providerName} ${copy.baseUrl}`}>
                    {providerBaseUrlPresets(provider.providerId).map((preset) => (
                      <button
                        key={`${provider.providerId}-${preset.value}`}
                        type="button"
                        className={override.baseUrl === preset.value ? "active" : ""}
                        onClick={() => onProviderChange(provider.providerId, "baseUrl", preset.value)}
                      >
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="runtime-customization-block">
          <header>
            <div>
              <span>{copy.terminalTitle}</span>
              <strong>{copy.terminalDetail}</strong>
            </div>
            <SquareTerminal size={16} aria-hidden="true" />
          </header>
          <div className="runtime-shell-preset-row" role="group" aria-label={copy.shell}>
            {shellPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                className={activeShellPreset === preset.value ? "active" : ""}
                onClick={() => onTerminalChange("shellCommand", preset.value)}
                title={preset.detail}
              >
                <span>{preset.label}</span>
                <small>{preset.detail}</small>
              </button>
            ))}
            <button type="button" className={activeShellPreset === "__custom__" ? "active" : ""}>
              <span>{copy.directInput}</span>
              <small>{normalized.terminal.shellCommand || copy.shellInput}</small>
            </button>
          </div>
          <div className="runtime-custom-fields single">
            <label>
              <span>{copy.shellInput}</span>
              <input
                data-runtime-terminal-shell
                value={normalized.terminal.shellCommand}
                onChange={(event) => onTerminalChange("shellCommand", event.target.value)}
                placeholder="/bin/zsh"
              />
            </label>
            <label>
              <span>{copy.startupCommand}</span>
              <textarea
                data-runtime-terminal-startup-command
                value={normalized.terminal.startupCommand}
                onChange={(event) => onTerminalChange("startupCommand", event.target.value)}
                placeholder={copy.startupPlaceholder}
                rows={3}
              />
            </label>
          </div>

          <div className="runtime-quick-command-editor">
            <header>
              <div>
                <span>{copy.quickTitle}</span>
                <strong>{normalized.terminal.quickCommands.length}/8</strong>
              </div>
              <div>
                <button type="button" onClick={onResetQuickCommands}>
                  <RefreshCw size={14} aria-hidden="true" />
                  <span>{copy.resetCommands}</span>
                </button>
                <button type="button" onClick={onAddQuickCommand} disabled={normalized.terminal.quickCommands.length >= 8}>
                  <PlayCircle size={14} aria-hidden="true" />
                  <span>{copy.addCommand}</span>
                </button>
              </div>
            </header>
            <div className="runtime-quick-command-list">
              {normalized.terminal.quickCommands.map((command, index) => (
                <article key={`${command.id}-${index}`} className="runtime-quick-command-row">
                  <div className="runtime-custom-fields quick">
                    <label>
                      <span>{copy.commandLabel}</span>
                      <input
                        value={command.label}
                        onChange={(event) => onQuickCommandChange(index, "label", event.target.value)}
                      />
                    </label>
                    <label>
                      <span>{copy.commandDetail}</span>
                      <input
                        value={command.detail}
                        onChange={(event) => onQuickCommandChange(index, "detail", event.target.value)}
                      />
                    </label>
                    <label>
                      <span>{copy.commandInput}</span>
                      <input
                        data-runtime-quick-command-input={index}
                        value={command.input}
                        onChange={(event) => onQuickCommandChange(index, "input", event.target.value)}
                      />
                    </label>
                  </div>
                  <button type="button" onClick={() => onRemoveQuickCommand(index)} disabled={normalized.terminal.quickCommands.length <= 1}>
                    <Trash2 size={14} aria-hidden="true" />
                    <span>{copy.remove}</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
