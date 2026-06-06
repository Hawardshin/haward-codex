"use client";

import { lazy, Suspense, useEffect, useState } from "react";

import { SnapshotLoadingShell } from "@/components/SnapshotLoadingShell";
import { readInitialSectionFromParts } from "@/lib/section-location.mjs";
import type { WorkspaceSnapshot } from "@/lib/snapshot";

const MonitorShellBoundary = lazy(() =>
  import("./MonitorShellBoundary").then((module) => ({ default: module.MonitorShellBoundary }))
);

const STARTUP_PREWARM_MIN_MS = 850;

type SnapshotState =
  | { status: "loading"; snapshot: null; error: "" }
  | { status: "ready"; snapshot: WorkspaceSnapshot; error: "" }
  | { status: "error"; snapshot: null; error: string };

export function SnapshotLoader() {
  const [state, setState] = useState<SnapshotState>({
    status: "loading",
    snapshot: null,
    error: ""
  });
  const [initialSection, setInitialSection] = useState("");

  useEffect(() => {
    let canceled = false;
    const controller = typeof AbortController === "function" ? new AbortController() : null;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let timedOut = false;

    const clearSnapshotTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    };

    async function loadSnapshot() {
      try {
        const snapshotPromise = Promise.race([
          fetchPublicSnapshot(controller),
          new Promise<WorkspaceSnapshot>((_, reject) => {
            timeoutId = setTimeout(() => {
              timedOut = true;
              controller?.abort();
              reject(new Error("Snapshot request timed out."));
            }, 7000);
          })
        ]);
        const [snapshot] = await Promise.all([
          snapshotPromise,
          waitForStartupPrewarmWindow()
        ]);
        if (!canceled) {
          setState({ status: "ready", snapshot, error: "" });
        }
      } catch (caught) {
        if (!canceled) {
          const errorMessage = timedOut
            ? "Snapshot request timed out."
            : caught instanceof Error
              ? caught.message
              : "Failed to load workspace snapshot.";
          console.warn(errorMessage);
          setState({ status: "error", snapshot: null, error: errorMessage });
        }
      } finally {
        clearSnapshotTimeout();
      }
    }

    void loadSnapshot();
    return () => {
      canceled = true;
      clearSnapshotTimeout();
      controller?.abort();
    };
  }, []);

  useEffect(() => {
    const syncSectionFromLocation = () => {
      setInitialSection(readInitialSectionFromLocation());
    };

    syncSectionFromLocation();
    window.addEventListener("hashchange", syncSectionFromLocation);
    window.addEventListener("popstate", syncSectionFromLocation);
    return () => {
      window.removeEventListener("hashchange", syncSectionFromLocation);
      window.removeEventListener("popstate", syncSectionFromLocation);
    };
  }, []);

  if (state.status === "ready") {
    return (
      <Suspense fallback={<SnapshotLoadingShell detail="Preparing warmed work surfaces" />}>
        <MonitorShellBoundary snapshot={state.snapshot} initialSection={initialSection} />
      </Suspense>
    );
  }

  if (state.status === "error") {
    return <SnapshotLoadingShell detail={state.error} status="error" />;
  }

  return <SnapshotLoadingShell detail="Loading workspace snapshot" />;
}

function readInitialSectionFromLocation() {
  if (typeof window === "undefined") {
    return "";
  }
  return readInitialSectionFromParts(window.location.search, window.location.hash);
}

function waitForStartupPrewarmWindow() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, STARTUP_PREWARM_MIN_MS);
  });
}

async function fetchPublicSnapshot(controller: AbortController | null) {
  const snapshotUrl = new URL("workspace-snapshot.json", window.location.href);
  const requestOptions: RequestInit = { cache: "no-cache" };
  if (controller) {
    requestOptions.signal = controller.signal;
  }
  const response = await fetch(snapshotUrl, requestOptions);
  if (!response.ok) {
    throw new Error(`Snapshot request failed with ${response.status}`);
  }
  return (await response.json()) as WorkspaceSnapshot;
}
