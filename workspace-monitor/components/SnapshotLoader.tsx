"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import type { WorkspaceSnapshot } from "@/lib/snapshot";

const MonitorShell = dynamic(() => import("./MonitorShell").then((module) => module.MonitorShell), {
  loading: () => <SnapshotLoadingShell detail="Loading interface" />,
  ssr: false
});

type SnapshotState =
  | { status: "loading"; snapshot: null; error: "" }
  | { status: "ready"; snapshot: WorkspaceSnapshot; error: "" }
  | { status: "error"; snapshot: null; error: string };

export function SnapshotLoader() {
  const [state, setState] = useState<SnapshotState>({ status: "loading", snapshot: null, error: "" });

  useEffect(() => {
    let canceled = false;
    const controller = typeof AbortController === "function" ? new AbortController() : null;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    async function loadSnapshot() {
      try {
        const snapshot = await Promise.race([
          fetchPublicSnapshot(controller),
          new Promise<WorkspaceSnapshot>((_, reject) => {
            timeoutId = setTimeout(() => {
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
          setState({
            status: "error",
            snapshot: null,
            error: caught instanceof Error ? caught.message : "Failed to load workspace snapshot."
          });
        }
      }
    }

    void loadSnapshot();
    return () => {
      canceled = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      controller?.abort();
    };
  }, []);

  if (state.status === "ready") {
    return <MonitorShell snapshot={state.snapshot} />;
  }

  if (state.status === "error") {
    return <SnapshotLoadingShell detail={state.error} status="error" />;
  }

  return <SnapshotLoadingShell detail="Loading workspace snapshot" />;
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
