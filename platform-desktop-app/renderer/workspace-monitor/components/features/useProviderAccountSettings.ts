"use client";

import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";

import type {
  ProviderActionFeedback,
  ProviderCredentialInputState,
  ProviderCredentialReport,
  ProviderCredentialSummary,
  ProviderModelCatalogReport,
  TauriInvoke,
  UiLanguage
} from "@/types/desktop";

import type { SearchAgentRunForm } from "./SearchAgentWorkChatPanel";
import {
  fallbackProviderCredentialReport,
  providerDisplayName,
  providerPanelFeedbackId
} from "./runtimeCatalog";

type ProviderAuthPurpose = "setup" | "login" | "docs";

type RuntimeSettingsSyncOptions = {
  includeSourceCatalog?: boolean;
  forceSourceRefresh?: boolean;
};

type UseProviderAccountSettingsOptions = {
  uiLanguage: UiLanguage;
  searchAgentRunForm: SearchAgentRunForm;
  setSearchAgentRunForm: Dispatch<SetStateAction<SearchAgentRunForm>>;
  effectiveProviderModelFor: (provider: Pick<ProviderCredentialSummary, "providerId" | "defaultModel">) => string;
  getTauriInvoke: () => TauriInvoke | null;
  requestRuntimeSettingsSync: (reason: string, options?: RuntimeSettingsSyncOptions) => void;
};

function providerInputsFromReport(
  report: ProviderCredentialReport,
  current: Record<string, ProviderCredentialInputState>
): Record<string, ProviderCredentialInputState> {
  const next = { ...current };
  for (const provider of report.providers) {
    next[provider.providerId] = {
      accountHint: next[provider.providerId]?.accountHint ?? provider.accountHint ?? "",
      secret: next[provider.providerId]?.secret ?? ""
    };
  }
  return next;
}

export function useProviderAccountSettings({
  uiLanguage,
  searchAgentRunForm,
  setSearchAgentRunForm,
  effectiveProviderModelFor,
  getTauriInvoke,
  requestRuntimeSettingsSync
}: UseProviderAccountSettingsOptions) {
  const [providerCredentials, setProviderCredentials] =
    useState<ProviderCredentialReport>(fallbackProviderCredentialReport);
  const [providerCredentialInputs, setProviderCredentialInputs] =
    useState<Record<string, ProviderCredentialInputState>>({});
  const [providerCredentialBusy, setProviderCredentialBusy] = useState("");
  const [providerCredentialNotice, setProviderCredentialNotice] = useState("");
  const [providerCredentialError, setProviderCredentialError] = useState("");
  const [providerActionFeedback, setProviderActionFeedback] = useState<ProviderActionFeedback | null>(null);
  const [providerModelCatalog, setProviderModelCatalog] = useState<ProviderModelCatalogReport | null>(null);
  const [providerModelBusy, setProviderModelBusy] = useState(false);
  const [providerModelBusyProviderId, setProviderModelBusyProviderId] = useState("");
  const [providerModelError, setProviderModelError] = useState("");

  const refreshProviderModels = useCallback(
    async (providerId = searchAgentRunForm.providerId, userInitiated = false) => {
      const provider =
        providerCredentials.providers.find((item) => item.providerId === providerId) ||
        fallbackProviderCredentialReport.providers.find((item) => item.providerId === providerId) ||
        providerCredentials.providers[0] ||
        fallbackProviderCredentialReport.providers[0];
      if (!provider) {
        const message = uiLanguage === "ko" ? "선택할 모델 제공자가 없습니다." : "No model provider is available.";
        setProviderModelCatalog(null);
        setProviderModelError(message);
        setProviderActionFeedback({
          providerId: providerPanelFeedbackId,
          action: "models",
          tone: "error",
          message
        });
        return;
      }

      const tauriInvoke = getTauriInvoke();
      setProviderModelBusy(true);
      setProviderModelBusyProviderId(provider.providerId);
      setProviderModelError("");

      if (!tauriInvoke) {
        const defaultModel = effectiveProviderModelFor(provider);
        const fallbackReport: ProviderModelCatalogReport = {
          providerId: provider.providerId,
          providerLabel: providerDisplayName(provider.providerId, provider.label, uiLanguage),
          status:
            provider.authMethod === "local_http"
              ? "browser_preview_local_default"
              : "browser_preview_provider_default",
          source: "browser_fallback",
          defaultModel,
          models: [
            {
              providerId: provider.providerId,
              id: defaultModel,
              label: defaultModel,
              size: null,
              modifiedAt: ""
            }
          ],
          error:
            provider.authMethod === "local_http"
              ? uiLanguage === "ko"
                ? "설치 앱에서 Ollama 모델 목록을 읽을 수 있습니다. 지금은 기본 모델만 표시합니다."
                : "The installed app can read the Ollama model list. This preview shows only the default model."
              : null
        };
        setProviderModelCatalog(fallbackReport);
        setProviderModelError(fallbackReport.error || "");
        if (fallbackReport.error) {
          setProviderActionFeedback({
            providerId: provider.providerId,
            action: "models",
            tone: "error",
            message: fallbackReport.error
          });
        } else if (userInitiated) {
          setProviderActionFeedback({
            providerId: provider.providerId,
            action: "models",
            tone: "success",
            message:
              uiLanguage === "ko"
                ? `${providerDisplayName(provider.providerId, provider.label, uiLanguage)} 기본 모델을 확인했습니다.`
                : `${providerDisplayName(provider.providerId, provider.label, uiLanguage)} default model checked.`
          });
        }
        setProviderModelBusy(false);
        setProviderModelBusyProviderId("");
        return;
      }

      try {
        const report = await tauriInvoke<ProviderModelCatalogReport>("list_provider_models", {
          providerId: provider.providerId
        });
        setProviderModelCatalog(report);
        setProviderModelError(report.error || "");
        if (report.error) {
          setProviderActionFeedback({
            providerId: provider.providerId,
            action: "models",
            tone: "error",
            message: report.error
          });
        } else if (userInitiated) {
          setProviderActionFeedback({
            providerId: provider.providerId,
            action: "models",
            tone: "success",
            message:
              uiLanguage === "ko"
                ? `${providerDisplayName(provider.providerId, provider.label, uiLanguage)} 모델 목록을 확인했습니다.`
                : `${providerDisplayName(provider.providerId, provider.label, uiLanguage)} model list checked.`
          });
        }
        const suggestedModel = report.models[0]?.id || report.defaultModel || effectiveProviderModelFor(provider);
        if (suggestedModel) {
          setSearchAgentRunForm((current) =>
            current.providerId === provider.providerId && !current.model.trim()
              ? { ...current, model: suggestedModel }
              : current
          );
        }
      } catch (modelError) {
        const defaultModel = effectiveProviderModelFor(provider);
        setProviderModelCatalog({
          providerId: provider.providerId,
          providerLabel: providerDisplayName(provider.providerId, provider.label, uiLanguage),
          status: "model_catalog_error",
          source: "tauri_command",
          defaultModel,
          models: [
            {
              providerId: provider.providerId,
              id: defaultModel,
              label: defaultModel,
              size: null,
              modifiedAt: ""
            }
          ],
          error: String(modelError)
        });
        setProviderModelError(String(modelError));
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "models",
          tone: "error",
          message: String(modelError)
        });
      } finally {
        setProviderModelBusy(false);
        setProviderModelBusyProviderId("");
      }
    },
    [
      effectiveProviderModelFor,
      getTauriInvoke,
      providerCredentials.providers,
      searchAgentRunForm.providerId,
      setSearchAgentRunForm,
      uiLanguage
    ]
  );

  useEffect(() => {
    let canceled = false;
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      setProviderCredentials(fallbackProviderCredentialReport);
      return;
    }

    tauriInvoke<ProviderCredentialReport>("list_provider_credentials")
      .then((report) => {
        if (canceled) {
          return;
        }
        setProviderCredentials(report);
        setProviderCredentialInputs((current) => providerInputsFromReport(report, current));
        setProviderCredentialError("");
      })
      .catch((credentialError) => {
        if (canceled) {
          return;
        }
        setProviderCredentials(fallbackProviderCredentialReport);
        setProviderCredentialError(String(credentialError));
      });

    return () => {
      canceled = true;
    };
  }, [getTauriInvoke]);

  useEffect(() => {
    void refreshProviderModels(searchAgentRunForm.providerId);
  }, [providerCredentials.source, providerCredentials.status, refreshProviderModels, searchAgentRunForm.providerId]);

  const refreshProviderCredentials = useCallback(async () => {
    const tauriInvoke = getTauriInvoke();
    if (!tauriInvoke) {
      const message =
        uiLanguage === "ko"
          ? "네이티브 런타임에서만 계정을 저장할 수 있습니다."
          : "Provider credentials can only be saved in the native runtime.";
      setProviderCredentials(fallbackProviderCredentialReport);
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: providerPanelFeedbackId,
        action: "refresh",
        tone: "error",
        message
      });
      return;
    }

    setProviderCredentialBusy(providerPanelFeedbackId);
    try {
      const report = await tauriInvoke<ProviderCredentialReport>("list_provider_credentials");
      setProviderCredentials(report);
      setProviderCredentialInputs((current) => providerInputsFromReport(report, current));
      setProviderCredentialError("");
      const message = uiLanguage === "ko" ? "계정 연결 상태를 새로고침했습니다." : "Provider account status refreshed.";
      setProviderCredentialNotice(message);
      setProviderActionFeedback({
        providerId: providerPanelFeedbackId,
        action: "refresh",
        tone: "success",
        message
      });
      void refreshProviderModels(searchAgentRunForm.providerId);
    } catch (credentialError) {
      const message = String(credentialError);
      setProviderCredentialError(message);
      setProviderActionFeedback({
        providerId: providerPanelFeedbackId,
        action: "refresh",
        tone: "error",
        message
      });
    } finally {
      setProviderCredentialBusy("");
    }
  }, [getTauriInvoke, refreshProviderModels, searchAgentRunForm.providerId, uiLanguage]);

  const updateProviderCredentialInput = useCallback(
    (providerId: string, field: keyof ProviderCredentialInputState, value: string) => {
      setProviderActionFeedback((current) =>
        current?.providerId === providerId && current.action === "save" ? null : current
      );
      setProviderCredentialError("");
      setProviderCredentialInputs((current) => ({
        ...current,
        [providerId]: {
          accountHint: current[providerId]?.accountHint || "",
          secret: current[providerId]?.secret || "",
          [field]: value
        }
      }));
    },
    []
  );

  const saveProviderCredential = useCallback(
    async (provider: ProviderCredentialSummary) => {
      const tauriInvoke = getTauriInvoke();
      const input = providerCredentialInputs[provider.providerId] || { accountHint: "", secret: "" };
      const providerName = providerDisplayName(provider.providerId, provider.label, uiLanguage);
      if (provider.authMethod === "local_http") {
        const message =
          uiLanguage === "ko"
            ? `${providerName}는 API 키 저장 없이 로컬 런타임으로 사용합니다.`
            : `${providerName} uses the local runtime without saving an API key.`;
        setProviderCredentialNotice(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "save",
          tone: "info",
          message
        });
        return;
      }
      if (!tauriInvoke) {
        const message = uiLanguage === "ko" ? "네이티브 앱에서만 저장할 수 있습니다." : "Save is available only in the native app.";
        setProviderCredentialError(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "save",
          tone: "error",
          message
        });
        return;
      }
      if (!input.secret.trim()) {
        const message = uiLanguage === "ko" ? `${providerName} API 키를 입력하세요.` : `Enter a ${providerName} API key.`;
        setProviderCredentialError(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "save",
          tone: "error",
          message
        });
        return;
      }

      setProviderCredentialBusy(provider.providerId);
      try {
        const report = await tauriInvoke<ProviderCredentialReport>("save_provider_credential", {
          input: {
            providerId: provider.providerId,
            authMethod: provider.authMethod,
            secret: input.secret,
            accountHint: input.accountHint
          }
        });
        setProviderCredentials(report);
        setProviderCredentialInputs((current) => ({
          ...providerInputsFromReport(report, current),
          [provider.providerId]: {
            accountHint: input.accountHint,
            secret: ""
          }
        }));
        const savedMessage =
          uiLanguage === "ko" ? `${providerName} 연결 정보를 저장했습니다.` : `${providerName} credentials saved.`;
        setProviderCredentialError("");
        setProviderCredentialNotice(savedMessage);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "save",
          tone: "success",
          message: savedMessage
        });
        if (!provider.requiresSubscriptionVerification) {
          requestRuntimeSettingsSync("provider-save");
          return;
        }

        try {
          const verifiedReport = await tauriInvoke<ProviderCredentialReport>("verify_provider_subscription", {
            providerId: provider.providerId
          });
          setProviderCredentials(verifiedReport);
          setProviderCredentialInputs((current) => ({
            ...providerInputsFromReport(verifiedReport, current),
            [provider.providerId]: {
              accountHint: input.accountHint,
              secret: ""
            }
          }));
          const updatedProvider = verifiedReport.providers.find((item) => item.providerId === provider.providerId);
          const verified = updatedProvider?.subscriptionState === "verified";
          const verifiedMessage =
            uiLanguage === "ko"
              ? `${providerName} 구독 검증이 완료되어 바로 사용 가능합니다.`
              : `${providerName} subscription is verified and ready to use.`;
          const needVerifyMessage =
            uiLanguage === "ko"
              ? `${providerName}은(는) 구독 검증이 필요합니다.`
              : `${providerName} requires subscription verification.`;
          setProviderCredentialError(verified ? "" : updatedProvider?.subscriptionMessage || needVerifyMessage);
          setProviderCredentialNotice(verified ? verifiedMessage : needVerifyMessage);
          setProviderActionFeedback({
            providerId: provider.providerId,
            action: "save",
            tone: verified ? "success" : "error",
            message: verified ? verifiedMessage : needVerifyMessage
          });
        } catch (verifyError) {
          const message = String(verifyError);
          setProviderCredentialError(message);
          setProviderActionFeedback({
            providerId: provider.providerId,
            action: "save",
            tone: "error",
            message
          });
        }
        requestRuntimeSettingsSync("provider-save");
      } catch (credentialError) {
        const message = String(credentialError);
        setProviderCredentialError(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "save",
          tone: "error",
          message
        });
      } finally {
        setProviderCredentialBusy("");
      }
    },
    [getTauriInvoke, providerCredentialInputs, requestRuntimeSettingsSync, uiLanguage]
  );

  const clearProviderCredential = useCallback(
    async (provider: ProviderCredentialSummary) => {
      const tauriInvoke = getTauriInvoke();
      const providerName = providerDisplayName(provider.providerId, provider.label, uiLanguage);
      if (provider.authMethod === "local_http") {
        const message =
          uiLanguage === "ko"
            ? `${providerName}는 삭제할 API 키가 없습니다.`
            : `${providerName} has no API key to clear.`;
        setProviderCredentialNotice(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "clear",
          tone: "info",
          message
        });
        return;
      }
      if (!tauriInvoke) {
        const message = uiLanguage === "ko" ? "네이티브 앱에서만 삭제할 수 있습니다." : "Clear is available only in the native app.";
        setProviderCredentialError(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "clear",
          tone: "error",
          message
        });
        return;
      }

      setProviderCredentialBusy(provider.providerId);
      try {
        const report = await tauriInvoke<ProviderCredentialReport>("clear_provider_credential", {
          providerId: provider.providerId
        });
        setProviderCredentials(report);
        setProviderCredentialInputs((current) => ({
          ...providerInputsFromReport(report, current),
          [provider.providerId]: { accountHint: "", secret: "" }
        }));
        setProviderCredentialError("");
        const message = uiLanguage === "ko" ? `${providerName} 연결을 삭제했습니다.` : `${providerName} credentials cleared.`;
        setProviderCredentialNotice(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "clear",
          tone: "success",
          message
        });
        requestRuntimeSettingsSync("provider-clear");
      } catch (credentialError) {
        const message = String(credentialError);
        setProviderCredentialError(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "clear",
          tone: "error",
          message
        });
      } finally {
        setProviderCredentialBusy("");
      }
    },
    [getTauriInvoke, requestRuntimeSettingsSync, uiLanguage]
  );

  const openProviderAuthUrl = useCallback(
    async (provider: ProviderCredentialSummary, purpose: ProviderAuthPurpose) => {
      const tauriInvoke = getTauriInvoke();
      const providerName = providerDisplayName(provider.providerId, provider.label, uiLanguage);
      const fallbackUrl = purpose === "login" ? provider.loginUrl : purpose === "docs" ? provider.docsUrl : provider.setupUrl;
      if (!tauriInvoke) {
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: purpose,
          tone: "info",
          message:
            uiLanguage === "ko"
              ? `${providerName} 링크를 브라우저에서 열었습니다.`
              : `${providerName} link opened in the browser.`
        });
        return;
      }

      setProviderCredentialBusy(provider.providerId);
      try {
        await tauriInvoke("open_provider_auth_url", {
          providerId: provider.providerId,
          purpose
        });
        setProviderCredentialError("");
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: purpose,
          tone: "success",
          message: uiLanguage === "ko" ? `${providerName} 링크를 열었습니다.` : `${providerName} link opened.`
        });
      } catch (credentialError) {
        const message = String(credentialError);
        setProviderCredentialError(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: purpose,
          tone: "error",
          message
        });
        window.open(fallbackUrl, "_blank", "noopener,noreferrer");
      } finally {
        setProviderCredentialBusy("");
      }
    },
    [getTauriInvoke, uiLanguage]
  );

  const verifyProviderSubscription = useCallback(
    async (provider: ProviderCredentialSummary) => {
      const tauriInvoke = getTauriInvoke();
      const providerName = providerDisplayName(provider.providerId, provider.label, uiLanguage);
      if (!provider.requiresSubscriptionVerification) {
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "verifySubscription",
          tone: "info",
          message:
            uiLanguage === "ko"
              ? `${providerName}는 구독 검증이 필요하지 않습니다.`
              : `${providerName} does not require subscription verification.`
        });
        return;
      }
      if (!provider.configured) {
        const message =
          uiLanguage === "ko"
            ? `${providerName} 키를 먼저 설정한 뒤 구독을 확인하세요.`
            : `Configure ${providerName} first, then verify subscription.`;
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "verifySubscription",
          tone: "error",
          message
        });
        return;
      }
      if (!tauriInvoke) {
        const message =
          uiLanguage === "ko"
            ? "브라우저 미리보기에서는 구독 검증을 실행할 수 없습니다."
            : "Subscription verification is not available in preview mode.";
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "verifySubscription",
          tone: "error",
          message
        });
        return;
      }

      setProviderCredentialBusy(provider.providerId);
      try {
        const report = await tauriInvoke<ProviderCredentialReport>("verify_provider_subscription", {
          providerId: provider.providerId
        });
        setProviderCredentials(report);
        setProviderCredentialInputs((current) => providerInputsFromReport(report, current));

        const updatedProvider = report.providers.find((item) => item.providerId === provider.providerId);
        const verified = updatedProvider?.subscriptionState === "verified";
        const message =
          updatedProvider?.subscriptionMessage ||
          (uiLanguage === "ko"
            ? `${providerName} 구독 확인이 완료되었습니다.`
            : `${providerName} subscription verification completed.`);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "verifySubscription",
          tone: verified ? "success" : "error",
          message
        });
        if (verified) {
          setProviderCredentialNotice(
            uiLanguage === "ko"
              ? `${providerName} 구독을 확인했습니다. 직접 실행이 가능합니다.`
              : `${providerName} subscription verified. Direct use is now available.`
          );
          setProviderCredentialError("");
        } else {
          setProviderCredentialError(message);
        }
        requestRuntimeSettingsSync("provider-verify");
      } catch (credentialError) {
        const message = String(credentialError);
        setProviderCredentialError(message);
        setProviderActionFeedback({
          providerId: provider.providerId,
          action: "verifySubscription",
          tone: "error",
          message
        });
      } finally {
        setProviderCredentialBusy("");
      }
    },
    [getTauriInvoke, requestRuntimeSettingsSync, uiLanguage]
  );

  return {
    providerCredentials,
    providerCredentialInputs,
    providerCredentialBusy,
    providerCredentialNotice,
    providerCredentialError,
    providerActionFeedback,
    providerModelCatalog,
    providerModelBusy,
    providerModelBusyProviderId,
    providerModelError,
    setProviderCredentialNotice,
    setProviderActionFeedback,
    setProviderModelCatalog,
    setProviderModelError,
    refreshProviderModels,
    refreshProviderCredentials,
    updateProviderCredentialInput,
    saveProviderCredential,
    clearProviderCredential,
    openProviderAuthUrl,
    verifyProviderSubscription
  };
}
