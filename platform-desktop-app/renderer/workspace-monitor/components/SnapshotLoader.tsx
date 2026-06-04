"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { readInitialSectionFromParts } from "@/lib/section-location.mjs";
import type { WorkspaceSnapshot } from "@/lib/snapshot";

type MonitorShellProps = {
  snapshot: WorkspaceSnapshot;
  initialSection?: string;
};

const MonitorShell = dynamic<MonitorShellProps>(() => import("./MonitorShell").then((module) => module.MonitorShell), {
  ssr: false,
  loading: () => <SnapshotLoadingShell detail="Loading workspace monitor" />
});

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
        const snapshot = await Promise.race([
          fetchPublicSnapshot(controller),
          new Promise<WorkspaceSnapshot>((_, reject) => {
            timeoutId = setTimeout(() => {
              timedOut = true;
              controller?.abort();
              reject(new Error("Snapshot request timed out."));
            }, 7000);
          })
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
    return <MonitorShell snapshot={state.snapshot} initialSection={initialSection} />;
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

function SnapshotLoadingShell({ detail, status = "loading" }: { detail: string; status?: "loading" | "error" }) {
  return (
    <main className="snapshot-loading-shell">
      <div>
        <p className="eyebrow">Workspace Monitor</p>
        <h1>{status === "error" ? "Snapshot unavailable" : "Loading monitor"}</h1>
        <p>{detail}</p>
      </div>
      <span className={`snapshot-loading-indicator ${status}`} />
    </main>
  );
}
