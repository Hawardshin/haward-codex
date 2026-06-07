import { useMemo, useState } from "react";
import { KeyRound, RefreshCw, Send, Settings, SquareTerminal, WalletCards } from "lucide-react";

import type {
  ProviderCredentialReport,
  ProviderCredentialSummary,
  ProviderModelCatalogReport,
  UiLanguage
} from "@/types/desktop";

import { providerDisplayName } from "./runtimeCatalog";

export const researchInsightAgentId = "research-insight-planner-agent";
export const researchInsightAgentConfigPath = "agent-platform/configs/agents/research-insight-planner-agent.json";
export const researchInsightPlanTemplatePath = "agent-platform/configs/planning/research-insight-plan-template.json";

export type SearchAgentRunForm = {
  objective: string;
  questions: string;
  searchChannels: string;
  captureTargets: string;
  notes: string;
  providerId: string;
  model: string;
  modelRouteId: string;
  constraintProfileId: string;
  connectorPolicyId: string;
  maxInputTokens: string;
  maxOutputTokens: string;
  budgetUsd: string;
};

export type SearchAgentChatMessage = {
  id: string;
  role: "agent" | "user" | "system";
  title: string;
  body: string;
  meta: string;
};

export type ModelRouteDecision = {
  routeId: string;
  routeLabel: string;
  model: string;
  tier: "small" | "balanced" | "premium";
  complexityScore: number;
  estimatedTokens: number;
  maxInputTokens: number;
  maxOutputTokens: number;
  budgetUsd: number;
  connectorPolicyId: string;
  connectorLabel: string;
  constraintLabel: string;
  reasons: string[];
};

const modelRouteOptions = [
  {
    value: "auto",
    labelKo: "자동",
    labelEn: "Auto",
    detailKo: "작업 난이도와 근거 수로 모델 티어 결정",
    detailEn: "Route by task difficulty and evidence load"
  },
  {
    value: "small",
    labelKo: "작은 모델",
    labelEn: "Small",
    detailKo: "정리, 짧은 수정, 단순 확인",
    detailEn: "Summaries, small edits, simple checks"
  },
  {
    value: "balanced",
    labelKo: "균형",
    labelEn: "Balanced",
    detailKo: "일반 구현, 리뷰, 계획",
    detailEn: "General implementation, review, planning"
  },
  {
    value: "premium",
    labelKo: "비싼 모델",
    labelEn: "Premium",
    detailKo: "광범위 연구, 아키텍처, 고위험 판단",
    detailEn: "Deep research, architecture, high-risk judgment"
  },
  {
    value: "manual",
    labelKo: "직접 선택",
    labelEn: "Manual",
    detailKo: "아래 모델 입력값 그대로 사용",
    detailEn: "Use the model typed below"
  }
];

const constraintProfileOptions = [
  {
    value: "quick",
    labelKo: "빠른 작업",
    labelEn: "Quick",
    detailKo: "질문 최소, 작은 모델 우선",
    detailEn: "Few questions, small model first",
    maxInputTokens: 8000,
    maxOutputTokens: 1200,
    budgetUsd: 0.2
  },
  {
    value: "developer",
    labelKo: "개발 작업",
    labelEn: "Developer",
    detailKo: "코드 변경, 테스트, 제한된 근거",
    detailEn: "Code change, tests, bounded evidence",
    maxInputTokens: 32000,
    maxOutputTokens: 2400,
    budgetUsd: 1.5
  },
  {
    value: "research",
    labelKo: "연구/설계",
    labelEn: "Research",
    detailKo: "다중 출처, 논문/공식문서, synthesis",
    detailEn: "Multi-source, papers/docs, synthesis",
    maxInputTokens: 96000,
    maxOutputTokens: 6000,
    budgetUsd: 8
  },
  {
    value: "governed",
    labelKo: "강제 제약",
    labelEn: "Governed",
    detailKo: "예산·토큰·도구 접근 제한을 강하게 적용",
    detailEn: "Strict budget, tokens, and tool access",
    maxInputTokens: 24000,
    maxOutputTokens: 1800,
    budgetUsd: 0.8
  }
];

const connectorPolicyOptions = [
  {
    value: "mcp-first",
    labelKo: "MCP 우선",
    labelEn: "MCP first",
    detailKo: "도구·리소스·프롬프트를 MCP JSON-RPC 경계로 연결",
    detailEn: "Connect tools/resources/prompts through MCP JSON-RPC boundaries"
  },
  {
    value: "provider-api",
    labelKo: "API 직접",
    labelEn: "Direct API",
    detailKo: "MCP가 없는 제공자는 provider API로 제한 실행",
    detailEn: "Use provider API when MCP is unavailable"
  },
  {
    value: "local-only",
    labelKo: "로컬만",
    labelEn: "Local only",
    detailKo: "Ollama/로컬 런타임과 저장소 근거만 허용",
    detailEn: "Allow only local runtime and repository evidence"
  },
  {
    value: "approval-required",
    labelKo: "승인 필요",
    labelEn: "Approval",
    detailKo: "외부 API, 비용 증가, 도구 실행 전 사용자 승인",
    detailEn: "Require user approval before external API, cost, or tool escalation"
  }
];

export const defaultSearchAgentRunForm: SearchAgentRunForm = {
  objective: "사용자 요청을 조사해서 실행 가능한 계획과 검증 기준으로 정리하기",
  questions:
    "현재 요청을 처리하려면 어떤 외부 근거가 필요한가?\n기존 저장소 지식 중 무엇을 재사용해야 하는가?\n실행 전에 보류해야 할 사용자 결정은 무엇인가?",
  searchChannels: "웹 검색\n저장소 검색",
  captureTargets: "_history/web-searches/YYYY/\n_research/\n_history/plans/YYYY/",
  notes: "출처, 한계, 계획 영향을 분리하고 약한 근거는 실행 근거로 쓰지 않습니다.",
  providerId: "ollama",
  model: "llama3.2",
  modelRouteId: "auto",
  constraintProfileId: "developer",
  connectorPolicyId: "mcp-first",
  maxInputTokens: "32000",
  maxOutputTokens: "2400",
  budgetUsd: "1.50"
};

export const defaultSearchAgentChatMessages: SearchAgentChatMessage[] = [
  {
    id: "research-agent-ready",
    role: "agent",
    title: "검색 에이전트",
    body: "작업을 입력하고 모델 라우팅, 작업 제약, MCP/API 연결 정책, 토큰/예산 상한을 선택하면 기존 research-insight-planner-agent가 그 경계 안에서 실행됩니다.",
    meta: researchInsightAgentId
  },
  {
    id: "research-agent-runtime",
    role: "system",
    title: "작업 방식",
    body: "단순 작업은 작은 모델/로컬 실행으로 제한하고, 다중 연구·아키텍처·고위험 판단만 비싼 모델로 승격합니다. CLI는 보조 실행 경로로만 사용됩니다.",
    meta: "model route + connector policy + task-run store"
  }
];

type ChoiceOption = {
  value: string;
  label: string;
  detail?: string;
};

function AgentChoiceButtonGroup({
  density = "regular",
  label,
  onChange,
  options,
  value
}: {
  density?: "regular" | "compact";
  label: string;
  onChange: (value: string) => void;
  options: ChoiceOption[];
  value: string;
}) {
  const classes = ["app-choice-button-group", density === "compact" ? "compact" : ""].filter(Boolean).join(" ");

  return (
    <div className={classes} role="listbox" aria-label={label}>
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={active ? "active" : ""}
            role="option"
            aria-selected={active}
            title={option.detail || option.label}
            onClick={() => onChange(option.value)}
          >
            <span>{option.label}</span>
            {option.detail && <small>{option.detail}</small>}
          </button>
        );
      })}
    </div>
  );
}

export function SearchAgentWorkChatPanel({
  form,
  messages,
  agentAvailable,
  language,
  providerCredentialReport,
  providerModelCatalog,
  providerModelBusy,
  providerModelError,
  providerTaskBusy,
  runtimeLaunchQueued,
  onChange,
  onOpenProviderSettings,
  onOpenTerminal,
  onRun,
  onRefreshModels
}: {
  form: SearchAgentRunForm;
  messages: SearchAgentChatMessage[];
  agentAvailable: boolean;
  language: UiLanguage;
  providerCredentialReport: ProviderCredentialReport;
  providerModelCatalog: ProviderModelCatalogReport | null;
  providerModelBusy: boolean;
  providerModelError: string;
  providerTaskBusy: boolean;
  runtimeLaunchQueued: boolean;
  onChange: (field: keyof SearchAgentRunForm, value: string) => void;
  onOpenProviderSettings: () => void;
  onOpenTerminal: () => void;
  onRun: () => void;
  onRefreshModels: (providerId?: string) => void | Promise<void>;
}) {
  const ko = language === "ko";
  const copy = ko
    ? {
        title: "작업 에이전트",
        accountNeeded: "계정 필요",
        connection: "연결",
        setupNeeded: "설정 필요",
        account: "계정",
        accountAria: "제공자 계정 설정 열기",
        terminal: "터미널",
        terminalAria: "터미널 실행 경로 열기",
        models: "모델",
        modelsAria: "선택한 제공자 모델 목록 갱신",
        ready: "준비",
        connected: "연결됨",
        needsSetup: "연결 필요",
        connectKey: "API 키 연결",
        terminalFallback: "터미널",
        terminalFallbackDetail: "API 실패 시 CLI로 전환",
        taskRuns: "기록",
        taskRunsDetail: "응답과 로그 저장"
      }
    : {
        title: "Work Agent",
        accountNeeded: "Account needed",
        connection: "Connection",
        setupNeeded: "Setup needed",
        account: "Account",
        accountAria: "Open provider account settings",
        terminal: "Terminal",
        terminalAria: "Open terminal run path",
        models: "Models",
        modelsAria: "Refresh selected provider model list",
        ready: "Ready",
        connected: "Connected",
        needsSetup: "Needs setup",
        connectKey: "Connect an API key",
        terminalFallback: "Terminal",
        terminalFallbackDetail: "CLI fallback on API failure",
        taskRuns: "Runs",
        taskRunsDetail: "Responses and logs stored"
      };
  const [contextOpen, setContextOpen] = useState(false);
  const statusLabel = agentAvailable ? (ko ? "준비됨" : "Ready") : ko ? "설정 확인" : "Check config";
  const connectedProviders = providerCredentialReport.providers.filter((provider) => provider.configured);
  const selectedProvider =
    providerCredentialReport.providers.find((provider) => provider.providerId === form.providerId) ||
    connectedProviders[0] ||
    providerCredentialReport.providers[0];
  const selectedProviderConnected = Boolean(selectedProvider?.configured);
  const selectedProviderLocal = selectedProvider?.authMethod === "local_http";
  const selectedProviderModel = form.model.trim() || selectedProvider?.defaultModel || "";
  const routeDecision = useMemo(() => resolveModelRouteDecision(form, selectedProvider, language), [form, selectedProvider, language]);
  const routeChoiceOptions = useMemo(
    () =>
      modelRouteOptions.map((option) => ({
        value: option.value,
        label: ko ? option.labelKo : option.labelEn,
        detail: ko ? option.detailKo : option.detailEn
      })),
    [ko]
  );
  const constraintChoiceOptions = useMemo(
    () =>
      constraintProfileOptions.map((option) => ({
        value: option.value,
        label: ko ? option.labelKo : option.labelEn,
        detail: ko ? option.detailKo : option.detailEn
      })),
    [ko]
  );
  const connectorChoiceOptions = useMemo(
    () =>
      connectorPolicyOptions.map((option) => ({
        value: option.value,
        label: ko ? option.labelKo : option.labelEn,
        detail: ko ? option.detailKo : option.detailEn
      })),
    [ko]
  );
  const modelOptions = providerModelCatalog?.providerId === selectedProvider?.providerId ? providerModelCatalog.models : [];
  const modelStatusText = providerModelBusy
    ? ko
      ? "모델 읽는 중"
      : "Loading models"
    : providerModelError
      ? providerModelError
      : providerModelCatalog?.providerId === selectedProvider?.providerId
        ? `${providerModelCatalog.status} / ${modelOptions.length || 1} ${ko ? "개" : "model(s)"}`
        : ko
          ? "모델 목록 대기"
          : "Model list pending";
  const selectedProviderRuntimeLabel = selectedProviderLocal
    ? ko
      ? "로컬 실행"
      : "Local run"
    : selectedProviderConnected
      ? ko
        ? "직접 실행"
        : "Direct run"
      : ko
        ? "CLI 대체"
        : "CLI fallback";
  const selectedProviderRuntimeSource = selectedProviderLocal
    ? "127.0.0.1:11434"
    : selectedProvider?.envVar || "provider env";
  const selectedProviderRuntimeSourceLabel = selectedProviderLocal
    ? selectedProviderRuntimeSource
    : selectedProviderRuntimeSource === "provider env"
      ? ko
        ? "제공자 환경변수"
        : "provider env"
      : selectedProviderRuntimeSource;
  const modelChoiceOptions = useMemo(() => {
    const choices: Array<{ id: string; label: string; detail: string; value: string; badge?: string }> = [];
    const seen = new Set<string>();
    const addChoice = (choice: { id: string; label: string; detail: string; value: string; badge?: string }) => {
      const normalizedValue = choice.value.trim();
      if (!normalizedValue || seen.has(normalizedValue)) {
        return;
      }
      seen.add(normalizedValue);
      choices.push({ ...choice, value: normalizedValue });
    };

    addChoice({
      id: "route-recommended-model",
      label: ko ? "라우팅 추천" : "Route pick",
      detail: routeDecision.model,
      value: routeDecision.model,
      badge: routeDecision.tier
    });
    addChoice({
      id: "provider-default-model",
      label: ko ? "기본 모델" : "Default",
      detail: selectedProvider?.defaultModel || providerModelCatalog?.defaultModel || "",
      value: selectedProvider?.defaultModel || providerModelCatalog?.defaultModel || "",
      badge: selectedProvider?.label
    });
    modelOptions.slice(0, 5).forEach((model, index) => {
      addChoice({
        id: `catalog-model-${model.providerId}-${model.id}`,
        label: model.label || model.id,
        detail: model.id,
        value: model.id,
        badge: index === 0 ? (ko ? "발견" : "Found") : undefined
      });
    });
    addChoice({
      id: "current-model-input",
      label: ko ? "현재 입력" : "Current input",
      detail: selectedProviderModel,
      value: selectedProviderModel,
      badge: ko ? "직접" : "Custom"
    });

    return choices.slice(0, 6);
  }, [
    ko,
    modelOptions,
    providerModelCatalog?.defaultModel,
    routeDecision.model,
    routeDecision.tier,
    selectedProvider?.defaultModel,
    selectedProvider?.label,
    selectedProviderModel
  ]);
  const chatbotConnectionItems = useMemo<
    Array<{
      id: string;
      label: string;
      status: string;
      detail: string;
      state: "ready" | "missing" | "pending";
    }>
  >(
    () => [
      {
        id: "provider-api",
        label: ko ? "모델 API" : "Model API",
        status: selectedProviderConnected || selectedProviderLocal ? copy.connected : copy.needsSetup,
        detail: selectedProviderConnected || selectedProviderLocal
          ? `${selectedProvider?.label || selectedProvider?.providerId || "provider"} / ${selectedProviderRuntimeSourceLabel}`
          : copy.connectKey,
        state: selectedProviderConnected || selectedProviderLocal ? "ready" : "missing"
      },
      {
        id: "model-route",
        label: ko ? "모델" : "Model",
        status: routeDecision.tier,
        detail: `${routeDecision.model} / ${routeDecision.constraintLabel}`,
        state: "ready"
      },
      {
        id: "terminal-fallback",
        label: copy.terminalFallback,
        status: runtimeLaunchQueued ? (ko ? "대기 중" : "Queued") : copy.ready,
        detail: copy.terminalFallbackDetail,
        state: runtimeLaunchQueued ? "pending" : "ready"
      },
      {
        id: "task-run-store",
        label: copy.taskRuns,
        status: ko ? "저장" : "Stored",
        detail: copy.taskRunsDetail,
        state: "ready"
      }
    ],
    [
      ko,
      routeDecision.constraintLabel,
      routeDecision.model,
      routeDecision.tier,
      runtimeLaunchQueued,
      selectedProvider?.label,
      selectedProvider?.providerId,
      selectedProviderConnected,
      selectedProviderLocal,
      selectedProviderRuntimeSourceLabel,
      copy.connectKey,
      copy.connected,
      copy.needsSetup,
      copy.ready,
      copy.taskRuns,
      copy.taskRunsDetail,
      copy.terminalFallback,
      copy.terminalFallbackDetail
    ]
  );

  return (
    <section className="panel wide search-agent-work-chat-panel" data-chatbot-surface="search-agent">
      <div className="search-agent-work-chat-layout">
        <div className="agent-chat-workspace" aria-label={ko ? "검색 에이전트 작업 채팅" : "Search agent work chat"}>
          <header className="agent-chat-conversation-header">
            <div>
              <span className="agent-chat-kicker">Agent Core</span>
              <h2>{copy.title}</h2>
            </div>
            <div className="agent-chat-header-meta" aria-label={ko ? "채팅 상태" : "Chat status"}>
              <span className={`agent-chat-status-pill ${selectedProviderConnected || selectedProviderLocal ? "ready" : "missing"}`}>
                {providerTaskBusy ? (ko ? "작업 중" : "Running") : runtimeLaunchQueued ? (ko ? "대기 중" : "Queued") : statusLabel}
              </span>
              <span>
                <KeyRound size={14} aria-hidden="true" />
                {selectedProviderLocal
                  ? `${selectedProvider?.label} ${ko ? "로컬" : "local"}`
                  : selectedProviderConnected
                    ? selectedProvider?.label
                    : ko
                      ? copy.accountNeeded
                      : copy.accountNeeded}
              </span>
            </div>
          </header>

          <div className="agent-chat-thread" role="log" aria-label={ko ? "검색 에이전트 대화" : "Search agent conversation"}>
            {messages.map((message) => (
              <article key={message.id} className={`agent-chat-message ${message.role}`}>
                <header>
                  <strong>{message.title}</strong>
                  <span>{message.meta}</span>
                </header>
                <p>{message.body}</p>
              </article>
            ))}
          </div>

          <div className="agent-chat-composer">
            <label className="agent-chat-prompt-field">
              <span>{ko ? "메시지" : "Message"}</span>
              <textarea
                rows={3}
                value={form.objective}
                placeholder={ko ? "에이전트에게 맡길 일을 입력하세요." : "Message the agent."}
                onChange={(event) => onChange("objective", event.target.value)}
              />
            </label>
            <div className="agent-routing-control-strip" aria-label={ko ? "모델 라우팅과 작업 제약" : "Model routing and work constraints"}>
              <AgentChoiceButtonGroup
                density="compact"
                label={ko ? "모델 라우팅" : "Model route"}
                value={form.modelRouteId}
                options={routeChoiceOptions}
                onChange={(value) => onChange("modelRouteId", value)}
              />
              <AgentChoiceButtonGroup
                density="compact"
                label={ko ? "작업 제약" : "Task constraint"}
                value={form.constraintProfileId}
                options={constraintChoiceOptions}
                onChange={(value) => {
                  const profile = constraintProfileOptions.find((option) => option.value === value);
                  onChange("constraintProfileId", value);
                  if (profile) {
                    onChange("maxInputTokens", String(profile.maxInputTokens));
                    onChange("maxOutputTokens", String(profile.maxOutputTokens));
                    onChange("budgetUsd", profile.budgetUsd.toFixed(2));
                  }
                }}
              />
              <AgentChoiceButtonGroup
                density="compact"
                label={ko ? "연결 정책" : "Connector policy"}
                value={form.connectorPolicyId}
                options={connectorChoiceOptions}
                onChange={(value) => onChange("connectorPolicyId", value)}
              />
              <label className="agent-routing-number-field">
                <span>{ko ? "출력 토큰" : "Output tokens"}</span>
                <input
                  inputMode="numeric"
                  value={form.maxOutputTokens}
                  onChange={(event) => onChange("maxOutputTokens", event.target.value)}
                />
              </label>
              <label className="agent-routing-number-field">
                <span>{ko ? "예산 $" : "Budget $"}</span>
                <input
                  inputMode="decimal"
                  value={form.budgetUsd}
                  onChange={(event) => onChange("budgetUsd", event.target.value)}
                />
              </label>
            </div>
            <div className={`agent-route-summary ${routeDecision.tier}`} data-model-route-summary="true">
              <WalletCards size={16} aria-hidden="true" />
              <strong>{ko ? "이번 실행" : "This run"}</strong>
              <span>{routeDecision.model}</span>
              <span>{routeDecision.constraintLabel}</span>
              <span>{routeDecision.connectorLabel}</span>
              <span>{ko ? `복잡도 ${routeDecision.complexityScore}/10` : `complexity ${routeDecision.complexityScore}/10`}</span>
              <span>{ko ? `출력 ${routeDecision.maxOutputTokens.toLocaleString("ko-KR")} 토큰` : `${routeDecision.maxOutputTokens.toLocaleString("en-US")} output tokens`}</span>
              <span>{`$${routeDecision.budgetUsd.toFixed(2)}`}</span>
            </div>
            <div className="agent-chat-connection-strip" data-chatbot-connection="search-agent">
              <div className="agent-chat-connection-head">
                <span>{copy.connection}</span>
                <strong>
                  {selectedProviderConnected || selectedProviderLocal
                    ? selectedProviderRuntimeLabel
                    : copy.setupNeeded}
                </strong>
              </div>
              <div className="agent-chat-connection-grid" aria-label={ko ? "챗봇 연결 상태" : "Chatbot connection status"}>
                {chatbotConnectionItems.map((item) => (
                  <article
                    key={item.id}
                    className={`state-${item.state}`}
                    data-chatbot-connection-item={item.id}
                  >
                    <span>{item.label}</span>
                    <strong>{item.status}</strong>
                    <small>{item.detail}</small>
                  </article>
                ))}
              </div>
              <div className="agent-chat-connection-actions">
                <button type="button" onClick={onOpenProviderSettings} aria-label={copy.accountAria} title={copy.accountAria}>
                  <KeyRound size={15} aria-hidden="true" />
                  <span>{copy.account}</span>
                </button>
                <button type="button" onClick={onOpenTerminal} aria-label={copy.terminalAria} title={copy.terminalAria}>
                  <SquareTerminal size={15} aria-hidden="true" />
                  <span>{copy.terminal}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onRefreshModels(selectedProvider?.providerId)}
                  disabled={providerModelBusy || !selectedProvider}
                  aria-label={copy.modelsAria}
                  title={copy.modelsAria}
                >
                  <RefreshCw size={15} aria-hidden="true" />
                  <span>{copy.models}</span>
                </button>
              </div>
            </div>
            <div className="agent-chat-composer-footer">
              <div className="agent-provider-run-controls" aria-label={ko ? "제공자 실행 설정" : "Provider run settings"}>
                <div className="agent-provider-choice-field">
                  <span>{ko ? "계정" : "Account"}</span>
                  <div className="agent-provider-choice-grid" role="listbox" aria-label={ko ? "계정 선택" : "Account choices"}>
                    {providerCredentialReport.providers.map((provider) => (
                      <button
                        key={provider.providerId}
                        type="button"
                        className={form.providerId === provider.providerId ? "active" : ""}
                        role="option"
                        aria-selected={form.providerId === provider.providerId}
                        onClick={() => onChange("providerId", provider.providerId)}
                      >
                        <span>{providerDisplayName(provider.providerId, provider.label, ko ? "ko" : "en")}</span>
                        <small>
                          {provider.authMethod === "local_http"
                            ? ko
                              ? "로컬"
                              : "local"
                            : provider.configured
                              ? ko
                                ? "연결됨"
                                : "connected"
                              : ko
                                ? "미연결"
                                : "not connected"}
                        </small>
                      </button>
                    ))}
                  </div>
                </div>
                <label>
                  <span>{ko ? "모델" : "Model"}</span>
                  <div className="agent-model-picker">
                    <input
                      value={selectedProviderModel}
                      placeholder={selectedProvider?.defaultModel || "model"}
                      onChange={(event) => onChange("model", event.target.value)}
                    />
                    <button
                      type="button"
                      className="agent-model-refresh-button"
                      onClick={() => onRefreshModels(selectedProvider?.providerId)}
                      disabled={providerModelBusy || !selectedProvider}
                      aria-label={ko ? "모델 목록 새로고침" : "Refresh model list"}
                      title={ko ? "모델 목록 새로고침" : "Refresh model list"}
                    >
                      <RefreshCw size={15} aria-hidden="true" />
                    </button>
                  </div>
                  {modelChoiceOptions.length > 0 && (
                    <div className="agent-model-choice-grid" role="listbox" aria-label={ko ? "모델 선택지" : "Model choices"}>
                      {modelChoiceOptions.map((choice) => (
                        <button
                          key={choice.id}
                          type="button"
                          className={selectedProviderModel === choice.value ? "active" : ""}
                          role="option"
                          aria-selected={selectedProviderModel === choice.value}
                          onClick={() => onChange("model", choice.value)}
                          title={choice.detail}
                        >
                          <span>{choice.label}</span>
                          <small>{choice.detail}</small>
                          {choice.badge && <em>{choice.badge}</em>}
                        </button>
                      ))}
                    </div>
                  )}
                  <small className={providerModelError ? "agent-model-status warning" : "agent-model-status"}>
                    {modelStatusText}
                  </small>
                </label>
                <div className={`agent-provider-run-state ${selectedProviderConnected || selectedProviderLocal ? "connected" : "missing"}`}>
                  <strong>{selectedProviderRuntimeLabel}</strong>
                  <span>{selectedProviderRuntimeSourceLabel}</span>
                </div>
              </div>
              <div className="agent-chat-actions">
                <button type="button" onClick={onOpenTerminal}>
                  <SquareTerminal size={16} aria-hidden="true" />
                  <span>{ko ? "터미널" : "Terminal"}</span>
                </button>
                <button type="button" className="primary-action-button agent-chat-send-button" onClick={onRun} disabled={providerTaskBusy}>
                  <Send size={16} aria-hidden="true" />
                  <span>{providerTaskBusy ? (ko ? "작업 중" : "Running") : ko ? "전송" : "Send"}</span>
                </button>
              </div>
            </div>
          </div>

          <details
            className="agent-chat-details agent-chat-context-drawer"
            open={contextOpen}
            onToggle={(event) => setContextOpen(event.currentTarget.open)}
          >
            <summary>
              <Settings size={14} aria-hidden="true" />
              <span>{ko ? "컨텍스트와 실행 계약" : "Context and Run Contract"}</span>
            </summary>
            {contextOpen && (
              <>
                <div className="agent-chat-context-form">
                  <label>
                    <span>{ko ? "검색 질문" : "Search Questions"}</span>
                    <textarea
                      rows={6}
                      value={form.questions}
                      onChange={(event) => onChange("questions", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{ko ? "검색 채널" : "Search Channels"}</span>
                    <textarea
                      rows={5}
                      value={form.searchChannels}
                      onChange={(event) => onChange("searchChannels", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{ko ? "저장 위치" : "Capture Targets"}</span>
                    <textarea
                      rows={4}
                      value={form.captureTargets}
                      onChange={(event) => onChange("captureTargets", event.target.value)}
                    />
                  </label>
                  <label>
                    <span>{ko ? "실행 메모" : "Run Notes"}</span>
                    <textarea
                      rows={4}
                      value={form.notes}
                      onChange={(event) => onChange("notes", event.target.value)}
                    />
                  </label>
                </div>
                <div className="agent-chat-contract-grid" aria-label={ko ? "실행 계약" : "Run contract"}>
                  <div className="agent-chat-contract-card">
                    <span>{ko ? "실행 계정" : "Run Account"}</span>
                    <strong>
                      {selectedProvider
                        ? providerDisplayName(selectedProvider.providerId, selectedProvider.label, ko ? "ko" : "en")
                        : ko
                          ? "계정 없음"
                          : "No account"}
                    </strong>
                    <small>
                      {selectedProviderConnected
                        ? `${ko ? "비밀 키 저장소" : "credential"} / ${selectedProviderModel}`
                        : ko
                          ? "설정 > 초기화 > 계정 연결에서 키를 저장하면 바로 실행됩니다."
                          : "Save a key in Settings > Init > Account Connections to run directly."}
                    </small>
                  </div>
                  <div className="agent-chat-contract-card">
                    <span>{ko ? "모델 라우팅" : "Model Route"}</span>
                    <strong>{`${routeDecision.routeLabel} / ${routeDecision.model}`}</strong>
                    <small>
                      {ko
                        ? `${routeDecision.connectorLabel} / 출력 ${routeDecision.maxOutputTokens} 토큰 / $${routeDecision.budgetUsd.toFixed(2)}`
                        : `${routeDecision.connectorLabel} / ${routeDecision.maxOutputTokens} output tokens / $${routeDecision.budgetUsd.toFixed(2)}`}
                    </small>
                  </div>
                  <div className="agent-chat-contract-card">
                    <span>{ko ? "사용 에이전트" : "Agent"}</span>
                    <strong>{researchInsightAgentId}</strong>
                    <small>{researchInsightAgentConfigPath}</small>
                  </div>
                  <div className="agent-chat-contract-card">
                    <span>{ko ? "입력 스키마" : "Input Schema"}</span>
                    <strong>research-insight-plan-template</strong>
                    <small>{researchInsightPlanTemplatePath}</small>
                  </div>
                  <div className="agent-chat-contract-card">
                    <span>{ko ? "실행 결과" : "Output"}</span>
                    <strong>{ko ? "근거, 불확실성, 실행 계획, 검증" : "Evidence, uncertainty, plan, validation"}</strong>
                    <small>
                      {ko
                        ? "질문은 결정함으로 보류하고, 실행 기록은 작업 실행 저장소에 남습니다."
                        : "Questions go to the decision inbox, and runs are stored in the task-run store."}
                    </small>
                  </div>
                </div>
              </>
            )}
          </details>
        </div>
      </div>
    </section>
  );
}

export function renderSearchAgentPrompt(form: SearchAgentRunForm, language: UiLanguage, provider?: ProviderCredentialSummary | null) {
  const objective = form.objective.trim() || defaultSearchAgentRunForm.objective;
  const questions = linesFromText(form.questions);
  const channels = linesFromText(form.searchChannels);
  const captureTargets = linesFromText(form.captureTargets);
  const notes = form.notes.trim() || defaultSearchAgentRunForm.notes;
  const dateLabel = new Date().toISOString().slice(0, 10);
  const outputLanguage = language === "ko" ? "한국어" : "English";
  const providerName = provider
    ? providerDisplayName(provider.providerId, provider.label, language)
    : language === "ko"
      ? "미지정"
      : "not selected";
  const routeDecision = resolveModelRouteDecision(form, provider, language);
  const routeReasons = buildModelRouteReasons(form, scoreSearchAgentTaskComplexity(form), routeDecision.tier, routeDecision.constraintLabel, routeDecision.estimatedTokens, language);

  return [
    language === "ko" ? "[플랫폼 검색 에이전트 실행]" : "[Agent Platform Existing Agent Run]",
    language === "ko" ? `에이전트: ${researchInsightAgentId}` : `Agent: ${researchInsightAgentId}`,
    language === "ko"
      ? `에이전트 설정 경로: ${researchInsightAgentConfigPath}`
      : `Agent config: ${researchInsightAgentConfigPath}`,
    language === "ko"
      ? `입력 스키마: ${researchInsightPlanTemplatePath}`
      : `Input schema: ${researchInsightPlanTemplatePath}`,
    language === "ko" ? `제공자: ${providerName}` : `Provider: ${providerName}`,
    language === "ko"
      ? "런타임 역할: 플랫폼의 기존 검색/조사 에이전트를 사용하고 즉석 채팅을 새로 만들지 마세요."
      : "Runtime role: run the existing search/research agent from the platform, not a new ad hoc chat.",
    language === "ko" ? `출력 언어: ${outputLanguage}` : `Output language: ${outputLanguage}`,
    "",
    language === "ko" ? "플랫폼 강제 작업 제어:" : "Platform-enforced work controls:",
    language === "ko"
      ? `- 모델 라우팅: ${routeDecision.routeLabel} / 티어=${routeDecision.tier} / 모델=${routeDecision.model}`
      : `- Model route: ${routeDecision.routeLabel} / tier=${routeDecision.tier} / model=${routeDecision.model}`,
    language === "ko"
      ? `- 제약 프로필: ${routeDecision.constraintLabel}`
      : `- Constraint profile: ${routeDecision.constraintLabel}`,
    language === "ko"
      ? `- 연결 정책: ${routeDecision.connectorLabel}`
      : `- Connector policy: ${routeDecision.connectorLabel}`,
    language === "ko"
      ? `- 토큰 제한: 입력<=${routeDecision.maxInputTokens}, 출력<=${routeDecision.maxOutputTokens}`
      : `- Token caps: input<=${routeDecision.maxInputTokens}, output<=${routeDecision.maxOutputTokens}`,
    language === "ko"
      ? `- 예산 한도: 약 $${routeDecision.budgetUsd.toFixed(2)}`
      : `- Budget cap: approximately $${routeDecision.budgetUsd.toFixed(2)}`,
    language === "ko"
      ? "- 아래 조건은 실행 권고가 아니라 실행 제약입니다."
      : "- Treat these controls as execution constraints, not suggestions.",
    language === "ko"
      ? "- 필수 도구/API가 MCP를 못 쓰면 위 연결 정책에 맞춰 우회 경로를 명확히 제시하세요."
      : "- If a needed tool or API cannot use MCP, use the connector policy above and state the fallback clearly.",
    language === "ko"
      ? "- 승인되지 않은 더 비싼 모델, 무분별한 출처 확장, 외부 실행으로 임의 escalate하지 마세요."
      : "- Do not escalate to a more expensive model, broader source search, or external tool execution unless the route policy permits it or asks for approval.",
    language === "ko" ? "라우팅 근거:" : "Route evidence:",
    ...routeReasons.map((item) => `- ${item}`),
    "",
    language === "ko" ? "목표:" : "Objective:",
    objective,
    "",
    language === "ko" ? "검색 질문:" : "Search questions:",
    ...(questions.length
      ? questions.map((item) => `- ${item}`)
      : [language === "ko" ? "- 이 요청에 필요한 근거를 찾으세요." : "- Find the evidence needed for this request."]),
    "",
    language === "ko" ? "검색 채널:" : "Search channels:",
    ...(channels.length
      ? channels.map((item) => `- ${item}`)
      : [
          language === "ko" ? "- 웹 검색" : "- web search",
          language === "ko" ? "- 저장소 검색" : "- repository search"
        ]),
    "",
    language === "ko" ? "필수 실행 엔진 단계:" : "Required answer-engine stages:",
    "- query_understanding",
    "- search_retrieval",
    "- source_ranking",
    "- evidence_extraction",
    "- synthesis",
    "- citation_grounding",
    "- skeptic_review",
    "",
    language === "ko" ? "출력 규약:" : "Output contract:",
    language === "ko"
      ? "- 인용/로컬 파일 경로 근거를 붙여서 수용 가능한 증거를 정리하세요."
      : "- Summarize accepted evidence with citations or local file paths.",
    language === "ko"
      ? "- 미지원 주장, 불확실성, 반대 근거를 분리해 기록하세요."
      : "- Separate unsupported claims, uncertainty, and contrary evidence.",
    language === "ko"
      ? "- plan_steps, validation_steps, risks_or_unknowns, blocked_decisions를 생성하세요."
      : "- Produce plan_steps, validation_steps, risks_or_unknowns, and blocked_decisions.",
    language === "ko"
      ? "- 아래 Capture targets 아래에 남겨야 하는 결과를 기록하세요."
      : "- Record what should be captured under the targets below.",
    language === "ko"
      ? "- 소스 영향이 있거나 되돌릴 수 없는 결정이 필요할 때만 사용자 질문을 남기고, 아니면 안전한 기본 경로로 진행하세요."
      : "- Ask only source-affecting or irreversible questions; otherwise continue with reversible defaults.",
    "",
    language === "ko" ? "수집 대상:" : "Capture targets:",
    ...(captureTargets.length
      ? captureTargets.map((item) => `- ${item.replace("YYYY", dateLabel.slice(0, 4))}`)
      : [language === "ko" ? "- _research/" : "- _research/"]),
    "",
    language === "ko" ? "메모:" : "Notes:",
    notes
  ].join("\n");
}

export function renderSearchAgentSystemPrompt(language: UiLanguage) {
  return [
    language === "ko"
      ? "당신은 Agent Workspace Platform의 research-insight-planner-agent 런타임입니다."
      : "You are the direct provider runtime for research-insight-planner-agent inside Agent Workspace Platform.",
    `Output language: ${language === "ko" ? "한국어" : "English"}.`,
    language === "ko"
      ? "작업 요청은 사용자의 입력을 그대로 실행 요청으로 처리합니다."
      : "Use the user's task input as the work request.",
    language === "ko" ? "UI 설명 대신 실행 가능한 결과를 반환하세요." : "Return a useful work result, not a UI explanation.",
    language === "ko"
      ? "근거, 가정, 불확실성, 실행 계획, 검증 단계, 미해결 결정사항을 분리해 정리하세요."
      : "Separate evidence, assumptions, uncertainty, plan steps, validation steps, and blocked decisions.",
    language === "ko"
      ? "근거나 실행 사실이 없으면 파일 편집/명령 실행/방문을 완료했다고 쓰지 마세요."
      : "Do not claim that source files were edited, shell commands were run, or web pages were visited unless the prompt includes that evidence.",
    language === "ko"
      ? "추가 실행이 필요하면 데스크톱 플랫폼에서 다음 액션을 정확히 제시하세요."
      : "When more execution is needed, state the exact next action that should be launched through the desktop platform."
  ].join("\n");
}

export function resolveModelRouteDecision(
  form: SearchAgentRunForm,
  provider?: ProviderCredentialSummary | null,
  language: UiLanguage = "ko"
): ModelRouteDecision {
  const routeOption = modelRouteOptions.find((option) => option.value === form.modelRouteId) || modelRouteOptions[0];
  const constraint = constraintProfileOptions.find((option) => option.value === form.constraintProfileId) || constraintProfileOptions[1];
  const connector = connectorPolicyOptions.find((option) => option.value === form.connectorPolicyId) || connectorPolicyOptions[0];
  const explicitMaxInput = parsePositiveInteger(form.maxInputTokens);
  const explicitMaxOutput = parsePositiveInteger(form.maxOutputTokens);
  const explicitBudget = parsePositiveNumber(form.budgetUsd);
  const score = scoreSearchAgentTaskComplexity(form);
  const estimatedTokens = estimateSearchTaskTokenDemand(form);
  const autoTier: ModelRouteDecision["tier"] = estimateAutoModelTier(form, score, constraint.value, estimatedTokens);
  const tier: ModelRouteDecision["tier"] = routeOption.value === "premium"
    ? "premium"
    : routeOption.value === "balanced"
      ? "balanced"
      : routeOption.value === "small"
        ? "small"
        : routeOption.value === "manual"
          ? "balanced"
          : autoTier;
  const maxInputTokens = clampNumber(
    explicitMaxInput
      || clampNumber(
        Math.max(constraint.maxInputTokens, estimatedTokens + Math.min(8000, Math.floor(score * 1000))),
        1000,
        200000
      ),
    1000,
    200000
  );
  const maxOutputTokens = clampNumber(
    explicitMaxOutput
      || clampNumber(
        Math.max(
          constraint.maxOutputTokens,
          256 + Math.floor(score * 700) + Math.floor(estimatedTokens / 40)
        ),
        256,
        12000
      ),
    256,
    12000
  );
  const budgetBoost = tier === "premium" ? 1.6 : tier === "balanced" ? 1.2 : 0.9;
  const budgetUsd = clampNumber(
    explicitBudget || constraint.budgetUsd * budgetBoost + (estimatedTokens >= 16000 ? 0.4 : 0),
    0.01,
    100
  );
  const model = routeOption.value === "manual"
    ? form.model.trim() || provider?.defaultModel || defaultSearchAgentRunForm.model
    : recommendedModelForTier(provider?.providerId || form.providerId, tier, form.model.trim() || provider?.defaultModel || defaultSearchAgentRunForm.model);
  const reasons = buildModelRouteReasons(form, score, tier, constraint.value, estimatedTokens, language);

  return {
    routeId: routeOption.value,
    routeLabel: language === "ko" ? routeOption.labelKo : routeOption.labelEn,
    model,
    tier,
    complexityScore: score,
    estimatedTokens,
    maxInputTokens,
    maxOutputTokens,
    budgetUsd,
    connectorPolicyId: connector.value,
    connectorLabel: language === "ko" ? connector.labelKo : connector.labelEn,
    constraintLabel: language === "ko" ? constraint.labelKo : constraint.labelEn,
    reasons
  };
}

function estimateAutoModelTier(
  form: SearchAgentRunForm,
  score: number,
  constraint: string,
  estimatedTokens: number
): ModelRouteDecision["tier"] {
  const profile = form.modelRouteId === "manual"
    ? "manual"
    : constraint;
  const requiresHighTrust = /규정|규격|compliance|legal|privacy|license|보안|의료|financial|finance|cost|비용|심리|의사결정/.test(
    `${form.objective} ${form.questions} ${form.notes} ${form.searchChannels} ${form.captureTargets}`.toLowerCase()
  );
  if (score >= 8 || profile === "research" || estimatedTokens >= 18000 || requiresHighTrust) {
    return "premium";
  }
  if (score >= 5 || profile === "developer" || estimatedTokens >= 9000) {
    return "balanced";
  }
  if (estimatedTokens >= 4200 && !requiresHighTrust) {
    return "balanced";
  }
  return "small";
}

function scoreSearchAgentTaskComplexity(form: SearchAgentRunForm) {
  const haystack = [
    form.objective,
    form.questions,
    form.searchChannels,
    form.captureTargets,
    form.notes
  ].join("\n").toLowerCase();
  let score = 0;
  if (/논문|paper|arxiv|survey|research|리서치|연구|근거|citation|source|출처/.test(haystack)) {
    score += 3;
  }
  if (/architecture|아키텍처|구조|설계|migration|마이그레이션|refactor|리팩터/.test(haystack)) {
    score += 2;
  }
  if (/security|privacy|license|legal|보안|개인정보|라이선스|법률|cost|비용|금융|financial|medical|의료|윤리|compliance|규제/.test(haystack)) {
    score += 2;
  }
  if (/implementation|구현|source|소스|test|검증|build|배포|desktop|mcp|api/.test(haystack)) {
    score += 1;
  }
  if (linesFromText(form.searchChannels).length >= 3 || linesFromText(form.questions).length >= 4) {
    score += 1;
  }
  if (estimateTextTokens(haystack) > 6000) {
    score += 1;
  }
  return Math.min(score, 10);
}

function buildModelRouteReasons(
  form: SearchAgentRunForm,
  score: number,
  tier: ModelRouteDecision["tier"],
  constraintProfileId: string,
  estimatedTokens: number,
  language: UiLanguage
) {
  const isResearchProfile = constraintProfileId === "research";
  const policy = tier === "premium" ? "high-cost" : tier === "balanced" ? "balanced" : "low-cost";
  if (language === "en") {
    const reasons = [
      `complexity_score=${score}`,
      `selected_constraint=${constraintProfileId}`,
      `resolved_tier=${tier}`,
      `estimated_input_tokens=${estimatedTokens}`,
      `policy=${policy}`
    ];
    if (tier === "premium") {
      reasons.push("premium when broad research, architecture, high-risk judgment, long-context synthesis, or strict verification is needed");
      if (/논문|paper|arxiv|survey|research|서베이/.test(form.notes.toLowerCase() + form.objective.toLowerCase())) {
        reasons.push("premium because the task references papers/research and high-confidence evidence needs");
      }
      if (isResearchProfile) {
        reasons.push("research profile always permits premium-tier cost to reduce hallucination risk.");
      }
    } else if (tier === "small") {
      reasons.push("small when task is bounded, low-risk, mostly summary/check, and token pressure is low");
    } else {
      reasons.push("balanced when implementation, review, or planning needs reliability without deep-research cost");
    }
    reasons.push(`token_limit_reason=${estimatedTokens >= 12000 ? "high" : estimatedTokens >= 4200 ? "medium" : "low"}`);
    if (estimatedTokens >= 12000) {
      reasons.push("long estimated input context increases model and budget allocation");
    }
    return reasons;
  }

  const reasons = [
    `복잡도 점수: ${score}`,
    `요건 제약: ${constraintProfileId}`,
    `선택 티어: ${tier}`,
    `예상 입력 토큰: ${estimatedTokens}`,
    `운영 정책: ${policy === "high-cost" ? "비싼 모델 허용" : policy === "balanced" ? "균형 라우팅" : "저비용 라우팅"}`
  ];
  if (tier === "premium") {
    reasons.push("높은 난이도/리스크/근거 신뢰성이 필요한 과제여서 비싼 모델 라우팅이 적합합니다.");
    if (/논문|paper|arxiv|survey|research|서베이/.test(form.notes.toLowerCase() + form.objective.toLowerCase())) {
      reasons.push("요청에 논문/연구 근거가 포함되어 있어 고신뢰 경로가 필요합니다.");
    }
    if (isResearchProfile) {
      reasons.push("리서치 프로필에서는 근거 오차를 줄이기 위해 비싼 모델 티어를 허용합니다.");
    }
  } else if (tier === "small") {
    reasons.push("범위가 좁고 위험도가 낮아 요약/검증 중심의 작은 모델로 충분합니다.");
  } else {
    reasons.push("구현/리뷰/계획형 작업으로, 비용이 과도하지 않은 균형형 모델이 적절합니다.");
  }
  if (estimatedTokens >= 12000) {
    reasons.push("입력 토큰이 많아 입력 컨텍스트 확보가 필요합니다.");
  }
  return reasons;
}

function recommendedModelForTier(providerId: string, tier: ModelRouteDecision["tier"], fallbackModel: string) {
  if (providerId === "openai") {
    if (tier === "small") {
      return "gpt-5-mini";
    }
    if (tier === "premium") {
      return "gpt-5.2";
    }
    return fallbackModel || "gpt-5.2";
  }
  if (providerId === "ollama") {
    return fallbackModel || "llama3.2";
  }
  if (providerId === "google-gemini") {
    return fallbackModel || "gemini-3.5-flash";
  }
  return fallbackModel;
}

function estimateTextTokens(value: string) {
  return Math.ceil(value.length / 4);
}

function estimateSearchTaskTokenDemand(form: SearchAgentRunForm) {
  const content = [
    form.objective,
    form.questions,
    form.searchChannels,
    form.captureTargets,
    form.notes
  ].join("\n").trim();
  const base = estimateTextTokens(content || defaultSearchAgentRunForm.objective);
  const linePenalty = [
    linesFromText(form.questions).length,
    linesFromText(form.searchChannels).length,
    linesFromText(form.captureTargets).length
  ].reduce((sum, value) => sum + value, 0);
  return clampNumber(base + linePenalty * 250, 200, 120000);
}

function linesFromText(value: string) {
  return value
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function parsePositiveInteger(value: string) {
  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function parsePositiveNumber(value: string) {
  const parsed = Number.parseFloat(value.trim());
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function clampNumber(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}
