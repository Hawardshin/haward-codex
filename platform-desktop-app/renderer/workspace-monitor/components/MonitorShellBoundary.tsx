"use client";

import dynamic from "next/dynamic";

import { SnapshotLoadingShell } from "@/components/SnapshotLoadingShell";
import type { WorkspaceSnapshot } from "@/lib/snapshot";

type MonitorShellProps = {
  snapshot: WorkspaceSnapshot;
  initialSection?: string;
};

const MonitorShell = dynamic<MonitorShellProps>(() => import("./MonitorShell").then((module) => module.MonitorShell), {
  ssr: false,
  loading: () => <SnapshotLoadingShell detail="Preparing warmed work surfaces" />
});

export function MonitorShellBoundary(props: MonitorShellProps) {
  return <MonitorShell {...props} />;
}
