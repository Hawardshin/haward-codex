import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  ExternalLink,
  KeyRound,
  ListFilter,
  RefreshCw,
  ShieldCheck,
  Trash2,
  WalletCards
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { providerDisplayName, providerPanelFeedbackId } from "./runtimeCatalog";

import type {
  ProviderActionFeedback,
  ProviderActionKind,
  ProviderCredentialInputState,
  ProviderCredentialReport,
  ProviderCredentialSummary,
  ProviderModelCatalogReport,
  UiLanguage
} from "@/types/desktop";

export function ProviderAccountsPanel({
  uiLanguage,
  report,
  inputs,
  busy,
  notice,
  error,
  actionFeedback,
  runtimeAvailable,
  providerModelBusy,
  providerModelBusyProviderId,
  providerModelCatalog,
  providerModelError,
  selectedProviderId,
  selectedModel,
  effectiveDefaultModelForProvider,
  onClear,
  onInputChange,
  onOpenUrl,
  onRefresh,
  onRefreshModels,
  onSave,
  onUseProvider,
  onVerifySubscription
}: {
  uiLanguage: UiLanguage;
  report: ProviderCredentialReport;
  inputs: Record<string, ProviderCredentialInputState>;
  busy: string;
  notice: string;
  error: string;
  actionFeedback: ProviderActionFeedback | null;
  runtimeAvailable: boolean;
  providerModelBusy: boolean;
  providerModelBusyProviderId: string;
  providerModelCatalog: ProviderModelCatalogReport | null;
  providerModelError: string;
  selectedProviderId: string;
  selectedModel: string;
  effectiveDefaultModelForProvider: (provider: ProviderCredentialSummary) => string;
  onClear: (provider: ProviderCredentialSummary) => void | Promise<void>;
  onInputChange: (providerId: string, field: keyof ProviderCredentialInputState, value: string) => void;
  onOpenUrl: (provider: ProviderCredentialSummary, purpose: "setup" | "login" | "docs") => void | Promise<void>;
  onRefresh: () => void | Promise<void>;
  onRefreshModels: (providerId: string) => void | Promise<void>;
  onSave: (provider: ProviderCredentialSummary) => void | Promise<void>;
  onUseProvider: (provider: ProviderCredentialSummary, modelId?: string) => void | Promise<void>;
  onVerifySubscription: (provider: ProviderCredentialSummary) => void | Promise<void>;
}) {
  const [providerFilter, setProviderFilter] = useState<"all" | "needed" | "connected" | "local">("all");
  const copy = uiLanguage === "ko"
    ? {
        title: "제공자 계정 연결",
        status: "연결 상태",
        connected: "연결됨",
        needed: "필요함",
        nativeOnly: "네이티브 앱에서만 저장됩니다.",
        summary: "저장된 키는 모델 API 직접 작업과 CLI 실행 환경변수 주입에 사용됩니다.",
        guideEyebrow: "AI 로그인 설정",
        guideTitle: "GPT와 Gemini는 로그인 후 키 발급 화면으로 바로 이동",
        guideDetail: "OpenAI와 Gemini는 공식 API key 페이지에서 로그인하고 키를 만든 뒤 이 앱에 저장합니다. Ollama는 로컬 런타임 상태를 확인합니다.",
        fastLaneTitle: "빠른 AI 계정 설정",
        fastLaneDetail: "공식 계정으로 로그인한 뒤 키를 만들고 저장하면 작업 기본값으로 바로 사용할 수 있습니다.",
        loginSetup: "로그인/키 발급",
        loginSetupDetail: "공식 API key 페이지 열기",
        configuredNow: "사용 가능",
        notConfiguredYet: "설정 필요",
        chooseProvider: "제공자 선택",
        chooseProviderDetail: "연결 필요, 연결됨, 로컬 런타임을 바로 필터링",
        openOfficial: "공식 로그인/키 발급",
        openOfficialDetail: "제공자 계정으로 로그인한 공식 키 발급 페이지 열기",
        saveKeyStep: "키 저장",
        saveKeyDetail: "계정 메모와 API 키를 앱 설정 저장소에 기록",
        verifyModel: "모델 확인",
        verifyModelDetail: "로컬 모델 또는 기본 모델을 작업 기본값으로 선택",
        storage: "저장 위치",
        refresh: "새로고침",
        allProviders: "전체",
        neededProviders: "설정 필요",
        connectedProviders: "연결됨",
        localProviders: "로컬",
        showCount: "표시",
        cloudAccounts: "클라우드 계정",
        localRuntimes: "로컬 런타임",
        setup: "키 발급",
        login: "로그인 열기",
        docs: "공식 문서",
        save: "저장",
        saving: "저장 중",
        clear: "삭제",
        clearing: "삭제 중",
        refreshModels: "모델 확인",
        refreshingModels: "모델 확인 중",
        verifySubscription: "구독 검증",
        verifyingSubscription: "구독 검증 중",
        verifySubscriptionHint: "API 키의 구독 사용 및 할당량 사용 가능 여부를 확인합니다.",
        subscriptionVerified: "구독 확인됨",
        subscriptionRequired: "구독 확인 필요",
        subscriptionNotRequired: "구독 불필요",
        subscriptionInProgress: "구독 검증 대기",
        useForWork: "작업 기본값",
        usingForWork: "사용 중",
        accountHint: "계정 메모",
        accountPlaceholder: "예: 개인 OpenAI 프로젝트, 회사 Claude Console",
        apiKey: "API 키",
        apiKeyPlaceholder: "공급자 API 키 붙여넣기",
        localRuntime: "로컬 런타임",
        localRuntimeSummary: "API key 없이 내 컴퓨터에서 실행 중인 모델 서버를 사용합니다.",
        localEndpoint: "로컬 주소",
        localNoKey: "API key 없음",
        installLocal: "Ollama 설치",
        authMethod: "인증 방식",
        envVar: "실행 변수",
        defaultModel: "기본 모델",
        connectionSource: "인결 출처",
        appStored: "앱 저장",
        envDetected: "환경변수 감지",
        localReady: "로컬 준비",
        keyMissing: "키 필요",
        modelCatalog: "모델",
        modelFallback: "기본 모델만 표시",
        noProviders: "해당 조건의 제공자가 없습니다.",
        storageWarningKo: "키 원문은 로컬 앱 설정 파일에만 저장되고 보고서/지원 번들에는 마스킹되어 노출되지 않습니다.",
        providerStatusReady: "provider_credentials_ready",
        providerStatusRequired: "provider_credentials_required",
        providerStatusReadyLabel: "사용 가능",
        providerStatusRequiredLabel: "설정 필요",
        sourceLabelAppConfig: "app_config_file",
        sourceLabelDefault: "default_empty",
        sourceDisplayAppConfig: "앱 설정 파일",
        sourceDisplayDefault: "기본 상태",
        errorBadge: "오류",
        doneBadge: "완료",
        infoBadge: "상태",
        source: "출처",
        key: "비밀 키",
        notSaved: "저장 안 됨",
        statusUnknown: "상태 미확인",
        sourceUnknown: "출처 미확인"
      }
    : {
        title: "Provider Accounts",
        status: "Connection status",
        connected: "Connected",
        needed: "Needed",
        nativeOnly: "Saving is available only in the native app.",
        summary: "Saved keys power direct model API work and provider-specific CLI environment injection.",
        guideEyebrow: "AI login setup",
        guideTitle: "GPT and Gemini open straight to the signed-in key flow",
        guideDetail: "OpenAI and Gemini use official API key pages. Sign in there, create a key, then save it in this app. Ollama checks the local runtime.",
        fastLaneTitle: "Fast AI account setup",
        fastLaneDetail: "Sign in to the official account, create a key, save it here, then use it as the work default.",
        loginSetup: "Login / get key",
        loginSetupDetail: "Open official API key page",
        configuredNow: "Ready",
        notConfiguredYet: "Setup needed",
        chooseProvider: "Choose provider",
        chooseProviderDetail: "Filter setup needed, connected, and local runtime entries",
        openOfficial: "Official login / key",
        openOfficialDetail: "Open the signed-in provider key page",
        saveKeyStep: "Save key",
        saveKeyDetail: "Store an account note and API key in the app settings store",
        verifyModel: "Verify model",
        verifyModelDetail: "Select a local or default model for agent work",
        storage: "Storage path",
        refresh: "Refresh",
        allProviders: "All",
        neededProviders: "Needs setup",
        connectedProviders: "Connected",
        localProviders: "Local",
        showCount: "Showing",
        cloudAccounts: "Cloud accounts",
        localRuntimes: "Local runtimes",
        setup: "Get key",
        login: "Open login",
        docs: "Docs",
        save: "Save",
        saving: "Saving",
        clear: "Clear",
        clearing: "Clearing",
        refreshModels: "Check models",
        refreshingModels: "Checking models",
        verifySubscription: "Verify subscription",
        verifyingSubscription: "Verifying",
        verifySubscriptionHint: "Check whether the account can use paid AI features and quotas.",
        subscriptionVerified: "Subscription verified",
        subscriptionRequired: "Subscription required",
        subscriptionNotRequired: "No subscription needed",
        subscriptionInProgress: "Subscription check pending",
        useForWork: "Use for work",
        usingForWork: "In use",
        accountHint: "Account note",
        accountPlaceholder: "e.g. personal OpenAI project, company Claude Console",
        apiKey: "API key",
        apiKeyPlaceholder: "Paste provider API key",
        localRuntime: "Local runtime",
        localRuntimeSummary: "Uses the model server running on this computer without saving an API key.",
        localEndpoint: "Local endpoint",
        localNoKey: "No API key",
        installLocal: "Install Ollama",
        authMethod: "Auth method",
        envVar: "Runtime env",
        defaultModel: "Default model",
        connectionSource: "Connection source",
        appStored: "App saved",
        envDetected: "Env detected",
        localReady: "Local ready",
        keyMissing: "Key needed",
        modelCatalog: "Models",
        modelFallback: "Default model only",
        noProviders: "No providers match this filter.",
        storageWarningKo: "API keys are kept only in the local app config; reports and support bundles only get redacted previews.",
        providerStatusReady: "provider_credentials_ready",
        providerStatusRequired: "provider_credentials_required",
        providerStatusReadyLabel: "ready",
        providerStatusRequiredLabel: "required",
        sourceLabelAppConfig: "app_config_file",
        sourceLabelDefault: "default_empty",
        sourceDisplayAppConfig: "app config",
        sourceDisplayDefault: "default",
        errorBadge: "Error",
        doneBadge: "Done",
        infoBadge: "Info",
        source: "source",
        key: "key",
        notSaved: "Not saved",
        statusUnknown: "Unknown status",
        sourceUnknown: "Unknown source"
      };
  const connectedCount = report.providers.filter((provider) => provider.configured).length;
  const cloudCount = report.providers.filter((provider) => provider.authMethod !== "local_http").length;
  const localCount = report.providers.filter((provider) => provider.authMethod === "local_http").length;

  const providerStatusLabel = report.status === copy.providerStatusReady
    ? copy.providerStatusReadyLabel
    : report.status === copy.providerStatusRequired
      ? copy.providerStatusRequiredLabel
      : copy.statusUnknown;

  const providerSourceLabel = report.source === copy.sourceLabelAppConfig
    ? copy.sourceDisplayAppConfig
    : report.source === copy.sourceLabelDefault
      ? copy.sourceDisplayDefault
      : copy.sourceUnknown;

  const storageWarningLabel = uiLanguage === "ko"
    ? copy.storageWarningKo
    : report.storageWarning;
  const visibleProviders = report.providers.filter((provider) => {
    if (providerFilter === "needed") {
      return !provider.configured;
    }
    if (providerFilter === "connected") {
      return provider.configured;
    }
    if (providerFilter === "local") {
      return provider.authMethod === "local_http";
    }
    return true;
  });
  const filterOptions: Array<{ id: "all" | "needed" | "connected" | "local"; label: string; count: number }> = [
    { id: "all", label: copy.allProviders, count: report.providers.length },
    { id: "needed", label: copy.neededProviders, count: report.providers.length - connectedCount },
    { id: "connected", label: copy.connectedProviders, count: connectedCount },
    { id: "local", label: copy.localProviders, count: localCount }
  ];
  const guideSteps = [
    { icon: ListFilter, label: copy.chooseProvider, detail: copy.chooseProviderDetail },
    { icon: ExternalLink, label: copy.openOfficial, detail: copy.openOfficialDetail },
    { icon: KeyRound, label: copy.saveKeyStep, detail: copy.saveKeyDetail },
    { icon: Bot, label: copy.verifyModel, detail: copy.verifyModelDetail }
  ];
  const feedbackFor = (providerId: string, action: ProviderActionKind) =>
    actionFeedback?.providerId === providerId && actionFeedback.action === action ? actionFeedback : null;
  const feedbackBadge = (feedback: ProviderActionFeedback | null) => {
    if (!feedback) {
      return null;
    }
    const label = feedback.tone === "error" ? copy.errorBadge : feedback.tone === "success" ? copy.doneBadge : copy.infoBadge;
    return (
      <span className={`provider-button-status status-${feedback.tone}`} aria-hidden="true">
        {label}
      </span>
    );
  };
  const feedbackClass = (feedback: ProviderActionFeedback | null) =>
    feedback ? `has-provider-status status-${feedback.tone}` : "";
  const actionLabel = (label: string, feedback: ProviderActionFeedback | null) =>
    feedback ? `${label}: ${feedback.message}` : label;
  const panelStatusMessage = actionFeedback?.message || error || notice || (!runtimeAvailable ? copy.nativeOnly : "");
  const refreshFeedback = feedbackFor(providerPanelFeedbackId, "refresh");

  return (
    <div className="provider-accounts-panel">
      <header className="settings-section-header">
        <div className="settings-section-title">
          <WalletCards size={18} aria-hidden="true" />
          <h2>{copy.title}</h2>
          <span className="count-badge">{report.providers.length}</span>
        </div>
        <p className="settings-section-summary">{copy.summary}</p>
      </header>

      <section className="provider-login-guide">
        <div className="provider-guide-header">
          <span className="eyebrow">{copy.guideEyebrow}</span>
          <h3>{copy.guideTitle}</h3>
          <p>{copy.guideDetail}</p>
        </div>
        <div className="provider-guide-steps">
          {guideSteps.map((step, idx) => (
            <article key={idx} className="provider-guide-step">
              <div className="provider-guide-icon">
                <step.icon size={16} aria-hidden="true" />
              </div>
              <div className="provider-guide-content">
                <strong>{step.label}</strong>
                <small>{step.detail}</small>
              </div>
              {idx < guideSteps.length - 1 && <div className="provider-guide-arrow" aria-hidden="true" />}
            </article>
          ))}
        </div>
      </section>

      <div className="settings-action-bar">
        <div className="settings-filter-strip">
          <span className="settings-filter-label">{copy.showCount}</span>
          <div className="settings-filter-choices provider-filter-choice">
            {filterOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={`settings-filter-choice ${providerFilter === option.id ? "active" : ""}`}
                onClick={() => setProviderFilter(option.id)}
              >
                <span>{option.label}</span>
                <small>{option.count}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="settings-action-group">
          <Button
            size="sm"
            className={feedbackClass(refreshFeedback)}
            loading={busy === providerPanelFeedbackId}
            disabled={!runtimeAvailable || Boolean(busy)}
            onClick={onRefresh}
            title={refreshFeedback?.message || undefined}
            aria-label={actionLabel(copy.refresh, refreshFeedback)}
          >
            <RefreshCw size={14} aria-hidden="true" />
            <span>{copy.refresh}</span>
            {feedbackBadge(refreshFeedback)}
          </Button>
        </div>
      </div>

      <div
        className="provider-action-live-region"
        role={error ? "alert" : "status"}
        aria-live={error ? "assertive" : "polite"}
        aria-atomic="true"
      >
        {panelStatusMessage}
      </div>

      {visibleProviders.length === 0 ? (
        <div className="empty-state">
          <p>{copy.noProviders}</p>
        </div>
      ) : (
        <div className="provider-cards-grid">
          {visibleProviders.map((provider) => {
            const input = inputs[provider.providerId] || { accountHint: "", secret: "" };
            const isLocal = provider.authMethod === "local_http";
            const isBusy = busy === provider.providerId;
            const isModelBusy = providerModelBusy && providerModelBusyProviderId === provider.providerId;
            const currentCatalog = providerModelCatalog?.providerId === provider.providerId ? providerModelCatalog : null;
            const models = currentCatalog?.models || [];
            const effectiveDefault = effectiveDefaultModelForProvider(provider);
            const isDefaultInUse = selectedProviderId === provider.providerId;
            const docsFeedback = feedbackFor(provider.providerId, "docs");
            const clearFeedback = feedbackFor(provider.providerId, "clear");
            const saveFeedback = feedbackFor(provider.providerId, "save");
            const modelFeedback = feedbackFor(provider.providerId, "models");
            const subscriptionFeedback = feedbackFor(provider.providerId, "verifySubscription");
            const setupFeedback = feedbackFor(provider.providerId, "setup");

            return (
              <article
                key={provider.providerId}
                className={`provider-account-card ${provider.configured ? "configured" : "needs-setup"}`}
                data-provider-id={provider.providerId}
              >
                <div className="provider-card-header">
                  <div className="provider-card-identity">
                    <div className="provider-logo-ring" aria-hidden="true">
                      <Bot size={18} />
                    </div>
                    <div className="provider-card-titles">
                      <h3>{providerDisplayName(provider.providerId, provider.label, uiLanguage)}</h3>
                      <div className="provider-status-row">
                        <span className={`status-pill ${provider.configured ? "ready" : "required"}`}>
                          {provider.configured ? copy.connected : copy.needed}
                        </span>
                        {provider.configured && (
                          <span className="source-label">
                            {provider.credentialSource === "app_config_file" ? copy.appStored : copy.envDetected}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="provider-card-actions">
                    <button
                      type="button"
                      className={`provider-ghost-action ${feedbackClass(docsFeedback)}`}
                      title={copy.docs}
                      aria-label={actionLabel(copy.docs, docsFeedback)}
                      onClick={() => onOpenUrl(provider, "docs")}
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      {feedbackBadge(docsFeedback)}
                    </button>
                    {provider.configured && (
                      <button
                        type="button"
                        className={`provider-ghost-action danger ${feedbackClass(clearFeedback)}`}
                        title={clearFeedback?.message || copy.clear}
                        aria-label={actionLabel(copy.clear, clearFeedback)}
                        disabled={Boolean(busy)}
                        onClick={() => onClear(provider)}
                      >
                        <Trash2 size={14} aria-hidden="true" />
                        {feedbackBadge(clearFeedback)}
                      </button>
                    )}
                  </div>
                </div>

                <div className="provider-card-body">
                  {isLocal ? (
                    <div className="provider-local-summary">
                      <p>{copy.localRuntimeSummary}</p>
                      <div className="provider-metadata-table">
                        <div className="metadata-row">
                          <span>{copy.localEndpoint}</span>
                          <strong>{provider.setupUrl}</strong>
                        </div>
                        <div className="metadata-row">
                          <span>{copy.authMethod}</span>
                          <strong>{copy.localNoKey}</strong>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="provider-credential-form">
                      <div className="form-field">
                        <label htmlFor={`hint-${provider.providerId}`}>{copy.accountHint}</label>
                        <input
                          id={`hint-${provider.providerId}`}
                          type="text"
                          value={input.accountHint}
                          placeholder={copy.accountPlaceholder}
                          onChange={(e) => onInputChange(provider.providerId, "accountHint", e.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor={`key-${provider.providerId}`}>{copy.apiKey}</label>
                        <div className="input-with-action">
                          <input
                            id={`key-${provider.providerId}`}
                            type="password"
                            value={input.secret}
                            placeholder={provider.configured ? "••••••••••••••••" : copy.apiKeyPlaceholder}
                            onChange={(e) => onInputChange(provider.providerId, "secret", e.target.value)}
                          />
                          <Button
                            size="sm"
                            className={feedbackClass(saveFeedback)}
                            loading={isBusy}
                            disabled={!runtimeAvailable || Boolean(busy) || !input.secret.trim()}
                            onClick={() => onSave(provider)}
                            title={saveFeedback?.message || undefined}
                            aria-label={actionLabel(isBusy ? copy.saving : copy.save, saveFeedback)}
                          >
                            <span>{isBusy ? copy.saving : copy.save}</span>
                            {feedbackBadge(saveFeedback)}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {provider.configured && (
                    <div className="provider-runtime-controls">
                      <div className="provider-model-section">
                        <div className="section-heading">
                          <div className="section-title">
                            <Bot size={14} aria-hidden="true" />
                            <h4>{copy.modelCatalog}</h4>
                          </div>
                          <button
                            type="button"
                            className={`provider-text-action ${feedbackClass(modelFeedback)}`}
                            disabled={!runtimeAvailable || isModelBusy}
                            onClick={() => onRefreshModels(provider.providerId)}
                            title={modelFeedback?.message || undefined}
                            aria-label={actionLabel(copy.refreshModels, modelFeedback)}
                          >
                            {isModelBusy ? copy.refreshingModels : copy.refreshModels}
                            {feedbackBadge(modelFeedback)}
                          </button>
                        </div>

                        {models.length > 0 ? (
                          <div className="provider-model-strip">
                            {models.map((model) => {
                              const isSelected = selectedProviderId === provider.providerId && selectedModel === model.id;
                              const isEffective = effectiveDefault === model.id;
                              return (
                                <button
                                  key={model.id}
                                  type="button"
                                  className={`provider-model-choice ${isSelected ? "active" : ""}`}
                                  onClick={() => onUseProvider(provider, model.id)}
                                >
                                  <span>{model.label}</span>
                                  {isEffective && <CheckCircle2 size={10} aria-hidden="true" />}
                                </button>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="provider-model-fallback">
                            <button
                              type="button"
                              className={`provider-model-choice ${isDefaultInUse ? "active" : ""}`}
                              onClick={() => onUseProvider(provider)}
                            >
                              <span>{provider.defaultModel}</span>
                              {isDefaultInUse && <CheckCircle2 size={10} aria-hidden="true" />}
                            </button>
                            <small>{copy.modelFallback}</small>
                          </div>
                        )}
                      </div>

                      {provider.requiresSubscriptionVerification && (
                        <div className="provider-subscription-section">
                          <div className="section-heading">
                            <div className="section-title">
                              <ShieldCheck size={14} aria-hidden="true" />
                              <h4>{copy.verifySubscription}</h4>
                            </div>
                            <button
                              type="button"
                              className={`provider-text-action ${feedbackClass(subscriptionFeedback)}`}
                              disabled={!runtimeAvailable || isBusy}
                              onClick={() => onVerifySubscription(provider)}
                              title={subscriptionFeedback?.message || copy.verifySubscriptionHint}
                              aria-label={actionLabel(copy.verifySubscription, subscriptionFeedback)}
                            >
                              {isBusy ? copy.verifyingSubscription : copy.verifySubscription}
                              {feedbackBadge(subscriptionFeedback)}
                            </button>
                          </div>
                          <div className="subscription-status-card">
                            <div className="subscription-status-badge">
                              {provider.subscriptionState === "verified" ? (
                                <CheckCircle2 size={14} className="tone-success" />
                              ) : (
                                <AlertTriangle size={14} className="tone-warning" />
                              )}
                              <span>
                                {provider.subscriptionState === "verified"
                                  ? copy.subscriptionVerified
                                  : provider.subscriptionState === "checking"
                                    ? copy.subscriptionInProgress
                                    : copy.subscriptionRequired}
                              </span>
                            </div>
                            {provider.subscriptionMessage && (
                              <p className="subscription-message">{provider.subscriptionMessage}</p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="provider-card-footer">
                  {!provider.configured && (
                    <div className="provider-fast-setup">
                      <Button
                        variant="primary"
                        size="sm"
                        className={feedbackClass(setupFeedback)}
                        onClick={() => onOpenUrl(provider, "setup")}
                        title={setupFeedback?.message || undefined}
                        aria-label={actionLabel(copy.loginSetup, setupFeedback)}
                      >
                        <ExternalLink size={14} aria-hidden="true" />
                        <span>{copy.loginSetup}</span>
                        {feedbackBadge(setupFeedback)}
                      </Button>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <footer className="settings-section-footer">
        <AlertTriangle size={14} aria-hidden="true" />
        <p>{storageWarningLabel}</p>
      </footer>
    </div>
  );
}
