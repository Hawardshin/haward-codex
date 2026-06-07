import { useCallback, useEffect, useRef, useState } from "react";

import type { UiLanguage } from "@/types/desktop";

import type { DesktopActionFeedbackStatus } from "./DesktopActionFeedbackCard";

type RefreshHandler = () => void | Promise<unknown>;
type WorkspaceResourceRefreshHandler = (options?: { forceRefresh?: boolean }) => void | Promise<unknown>;

export type SettingsRuntimeSyncReason =
  | "manual"
  | "provider-save"
  | "provider-clear"
  | "provider-verify"
  | "workspace-change"
  | "source-save"
  | "agents-md"
  | (string & {});

export type SettingsRuntimeSyncOptions = {
  reason?: SettingsRuntimeSyncReason;
  includeSourceCatalog?: boolean;
  forceSourceRefresh?: boolean;
  feedback?: boolean;
};

export type RuntimeSettingsSyncRequest = {
  requestId: string;
  reason: SettingsRuntimeSyncReason;
  includeSourceCatalog: boolean;
  forceSourceRefresh: boolean;
};

export type SettingsRuntimeSyncRequest = RuntimeSettingsSyncRequest;

type UseSettingsRuntimeSyncOptions = {
  uiLanguage: UiLanguage;
  runtimeAvailable: boolean;
  runtimeUnavailableErrorMessage: string;
  isFileWorkspaceSurface: boolean;
  onRuntimeUnavailable: () => void;
  setError: (message: string) => void;
  onActionStatus?: (
    id: "sync-settings",
    status: DesktopActionFeedbackStatus,
    result?: string
  ) => void;
  formatError: (caught: unknown) => string;
  refreshProviderCredentials?: RefreshHandler;
  refreshAdapters: RefreshHandler;
  refreshDesktopWorkspace: RefreshHandler;
  refreshDesktopGitStatus: RefreshHandler;
  refreshRuntimeDataBoundary: RefreshHandler;
  refreshAccumulatedDataOverview: RefreshHandler;
  refreshServiceReadiness: RefreshHandler;
  refreshDesktopResourceSnapshot: RefreshHandler;
  prepareWorkspaceOsResources: WorkspaceResourceRefreshHandler;
  warmWorkspaceOsResources: WorkspaceResourceRefreshHandler;
};

const manualSettingsSyncOptions: SettingsRuntimeSyncOptions = {
  reason: "manual",
  includeSourceCatalog: true,
  forceSourceRefresh: true,
  feedback: true
};

export function createSettingsRuntimeSyncRequest(
  reason: SettingsRuntimeSyncReason,
  options: Pick<SettingsRuntimeSyncOptions, "includeSourceCatalog" | "forceSourceRefresh"> = {}
): RuntimeSettingsSyncRequest {
  return {
    requestId: `${reason}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    reason,
    includeSourceCatalog: Boolean(options.includeSourceCatalog),
    forceSourceRefresh: Boolean(options.forceSourceRefresh)
  };
}

export function settingsRuntimeSyncReasonLabel(
  reason: SettingsRuntimeSyncReason | undefined,
  uiLanguage: UiLanguage
) {
  if (reason === "provider-save") {
    return uiLanguage === "ko" ? "계정 저장 후 동기화" : "Sync after provider save";
  }
  if (reason === "provider-clear") {
    return uiLanguage === "ko" ? "계정 삭제 후 동기화" : "Sync after provider clear";
  }
  if (reason === "provider-verify") {
    return uiLanguage === "ko" ? "구독 검증 후 동기화" : "Sync after subscription check";
  }
  if (reason === "workspace-change") {
    return uiLanguage === "ko" ? "작업공간 변경 후 동기화" : "Sync after workspace change";
  }
  if (reason === "source-save") {
    return uiLanguage === "ko" ? "소스 저장 후 동기화" : "Sync after source save";
  }
  if (reason === "agents-md") {
    return uiLanguage === "ko" ? "AGENTS.md 준비 후 동기화" : "Sync after AGENTS.md setup";
  }
  return uiLanguage === "ko" ? "설정과 런타임 상태 동기화" : "Sync settings and runtime state";
}

function mergeSettingsSyncOptions(
  current: SettingsRuntimeSyncOptions | null,
  next: SettingsRuntimeSyncOptions
): SettingsRuntimeSyncOptions {
  return {
    reason: next.reason || current?.reason,
    includeSourceCatalog: Boolean(current?.includeSourceCatalog || next.includeSourceCatalog),
    forceSourceRefresh: Boolean(current?.forceSourceRefresh || next.forceSourceRefresh),
    feedback: Boolean(current?.feedback || next.feedback)
  };
}

export function useSettingsRuntimeSync(options: UseSettingsRuntimeSyncOptions) {
  const optionsRef = useRef(options);
  const inFlightRef = useRef(false);
  const queuedOptionsRef = useRef<SettingsRuntimeSyncOptions | null>(null);
  const timerRef = useRef<number | null>(null);
  const [settingsSyncBusy, setSettingsSyncBusy] = useState(false);
  const [settingsSyncNotice, setSettingsSyncNotice] = useState("");

  optionsRef.current = options;

  const runSettingsSyncPass = useCallback(async (syncOptions: SettingsRuntimeSyncOptions = {}) => {
    const current = optionsRef.current;
    if (!current.runtimeAvailable) {
      current.onRuntimeUnavailable();
      throw new Error(current.runtimeUnavailableErrorMessage);
    }

    const reasonLabel = settingsRuntimeSyncReasonLabel(syncOptions.reason, current.uiLanguage);
    setSettingsSyncNotice(
      current.uiLanguage === "ko" ? `${reasonLabel} 중입니다.` : `${reasonLabel} is running.`
    );
    current.setError("");

    const tasks: Promise<unknown>[] = [
      current.refreshAdapters(),
      current.refreshDesktopWorkspace(),
      current.refreshDesktopGitStatus(),
      current.refreshRuntimeDataBoundary(),
      current.refreshAccumulatedDataOverview(),
      current.refreshServiceReadiness(),
      current.refreshDesktopResourceSnapshot()
    ].map((task) => Promise.resolve(task));

    if (current.refreshProviderCredentials) {
      tasks.unshift(Promise.resolve(current.refreshProviderCredentials()));
    }

    const resourceRefreshOptions = { forceRefresh: Boolean(syncOptions.forceSourceRefresh) };
    if (syncOptions.includeSourceCatalog || current.isFileWorkspaceSurface) {
      tasks.push(Promise.resolve(current.prepareWorkspaceOsResources(resourceRefreshOptions)));
    } else {
      tasks.push(Promise.resolve(current.warmWorkspaceOsResources(resourceRefreshOptions)));
    }

    const results = await Promise.allSettled(tasks);
    const failed = results.filter((result) => result.status === "rejected");
    if (failed.length > 0) {
      const message = failed
        .map((result) => result.status === "rejected" ? current.formatError(result.reason) : "")
        .filter(Boolean)
        .join("\n");
      setSettingsSyncNotice(
        current.uiLanguage === "ko" ? `일부 동기화가 실패했습니다: ${message}` : `Some sync steps failed: ${message}`
      );
      throw new Error(message || "settings sync failed");
    }

    const doneMessage = current.uiLanguage === "ko"
      ? `${reasonLabel} 완료: 계정, CLI, 서비스 준비도, 작업공간, 실행 기록을 다시 읽었습니다.`
      : `${reasonLabel} done: accounts, CLIs, readiness, workspace, and run records were refreshed.`;
    setSettingsSyncNotice(doneMessage);
    return doneMessage;
  }, []);

  const syncSettingsAndRuntimeState = useCallback(async (syncOptions: SettingsRuntimeSyncOptions = {}) => {
    const current = optionsRef.current;
    if (inFlightRef.current) {
      queuedOptionsRef.current = mergeSettingsSyncOptions(queuedOptionsRef.current, syncOptions);
      setSettingsSyncNotice(
        current.uiLanguage === "ko"
          ? "동기화가 이미 진행 중이라 다음 동기화를 예약했습니다."
          : "A sync is already running, so the next sync was queued."
      );
      return;
    }

    inFlightRef.current = true;
    setSettingsSyncBusy(true);
    let currentOptions: SettingsRuntimeSyncOptions | null = syncOptions;
    let failedFeedbackEnabled = Boolean(syncOptions.feedback);
    queuedOptionsRef.current = null;

    try {
      while (currentOptions) {
        failedFeedbackEnabled = Boolean(currentOptions.feedback);
        if (currentOptions.feedback) {
          const latest = optionsRef.current;
          latest.onActionStatus?.(
            "sync-settings",
            "running",
            settingsRuntimeSyncReasonLabel(currentOptions.reason, latest.uiLanguage)
          );
        }
        const doneMessage = await runSettingsSyncPass(currentOptions);
        if (currentOptions.feedback) {
          optionsRef.current.onActionStatus?.("sync-settings", "done", doneMessage);
        }
        currentOptions = queuedOptionsRef.current;
        queuedOptionsRef.current = null;
      }
    } catch (caught) {
      const latest = optionsRef.current;
      const message = latest.formatError(caught);
      latest.setError(message);
      setSettingsSyncNotice(message);
      if (failedFeedbackEnabled) {
        latest.onActionStatus?.("sync-settings", "failed", message);
      }
      throw caught;
    } finally {
      inFlightRef.current = false;
      setSettingsSyncBusy(false);
    }
  }, [runSettingsSyncPass]);

  const queueSettingsSync = useCallback((
    reason: SettingsRuntimeSyncReason,
    queueOptions: Pick<SettingsRuntimeSyncOptions, "includeSourceCatalog" | "forceSourceRefresh"> = {}
  ) => {
    const nextOptions: SettingsRuntimeSyncOptions = {
      ...queueOptions,
      reason,
      feedback: true
    };
    queuedOptionsRef.current = mergeSettingsSyncOptions(queuedOptionsRef.current, nextOptions);
    if (timerRef.current && typeof window !== "undefined") {
      window.clearTimeout(timerRef.current);
    }
    if (typeof window === "undefined") {
      const queuedOptions = queuedOptionsRef.current || nextOptions;
      queuedOptionsRef.current = null;
      void syncSettingsAndRuntimeState(queuedOptions);
      return;
    }
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      const queuedOptions = queuedOptionsRef.current || nextOptions;
      queuedOptionsRef.current = null;
      void syncSettingsAndRuntimeState(queuedOptions);
    }, 350);
  }, [syncSettingsAndRuntimeState]);

  const runManualSettingsSync = useCallback(() => {
    return syncSettingsAndRuntimeState(manualSettingsSyncOptions);
  }, [syncSettingsAndRuntimeState]);

  useEffect(() => {
    return () => {
      if (timerRef.current && typeof window !== "undefined") {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  return {
    settingsSyncBusy,
    settingsSyncNotice,
    queueSettingsSync,
    runManualSettingsSync,
    syncSettingsAndRuntimeState
  };
}
