import { useCallback, useEffect, useRef } from "react";

type RefreshHandler = () => void | Promise<void>;

type RuntimeEnvironmentRefreshOptions = {
  runtimeAvailable: boolean;
  refreshProviderCredentials?: RefreshHandler;
  refreshAdapters: RefreshHandler;
  refreshServiceReadiness: RefreshHandler;
};

export function useRuntimeEnvironmentRefresh({
  runtimeAvailable,
  refreshProviderCredentials,
  refreshAdapters,
  refreshServiceReadiness
}: RuntimeEnvironmentRefreshOptions) {
  const handlersRef = useRef({
    refreshProviderCredentials,
    refreshAdapters,
    refreshServiceReadiness
  });

  useEffect(() => {
    handlersRef.current = {
      refreshProviderCredentials,
      refreshAdapters,
      refreshServiceReadiness
    };
  }, [refreshProviderCredentials, refreshAdapters, refreshServiceReadiness]);

  const refreshEnvironmentStatus = useCallback(async () => {
    if (typeof window === "undefined" || !runtimeAvailable) {
      return;
    }

    const handlers = handlersRef.current;
    const tasks: Array<void | Promise<void>> = [
      handlers.refreshAdapters(),
      handlers.refreshServiceReadiness()
    ];

    if (handlers.refreshProviderCredentials) {
      tasks.unshift(handlers.refreshProviderCredentials());
    }

    await Promise.allSettled(tasks);
  }, [runtimeAvailable]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleFocus = () => {
      void refreshEnvironmentStatus();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [refreshEnvironmentStatus]);

  return refreshEnvironmentStatus;
}
