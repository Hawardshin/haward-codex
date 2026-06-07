import type { WorkspaceSourceFile } from "@/lib/snapshot";
import type {
  DesktopResourceSnapshotReport,
  SourceDraftEntry,
  WorkspaceResourcePrepareReport,
  WorkspaceResourceWarmupReport,
  WorkspaceTextFileListReport
} from "@/types/desktop";

import { isSourceDraftEntryDirty } from "./sourceDrafts";
import type { SourceWorkbenchCopy } from "./sourceWorkbenchTypes";

export type SourceWorkspaceStatusStripProps = {
  activeWorkspacePath: string;
  appResourceSnapshot: DesktopResourceSnapshotReport | null;
  copy: SourceWorkbenchCopy;
  filteredEditableSourceFiles: WorkspaceSourceFile[];
  formatBytes: (bytes: number) => string;
  invokeAvailable: boolean;
  openDraftEntries: SourceDraftEntry[];
  sourceCatalogFilesCount: number;
  sourceCatalogReport: WorkspaceTextFileListReport | null;
  workspaceResourceBusy: boolean;
  workspaceResourceReport: WorkspaceResourcePrepareReport | null;
  workspaceSourceLabel: string;
  workspaceWarmupReport: WorkspaceResourceWarmupReport | null;
};

export function SourceWorkspaceStatusStrip({
  activeWorkspacePath,
  appResourceSnapshot,
  copy,
  filteredEditableSourceFiles,
  formatBytes,
  invokeAvailable,
  openDraftEntries,
  sourceCatalogFilesCount,
  sourceCatalogReport,
  workspaceResourceBusy,
  workspaceResourceReport,
  workspaceSourceLabel,
  workspaceWarmupReport
}: SourceWorkspaceStatusStripProps) {
  const dirtyDraftCount = openDraftEntries.filter((entry) => isSourceDraftEntryDirty(entry)).length;

  return (
    <section className="native-workspace-state-strip" aria-label={copy.workspaceState}>
      <article>
        <span>{copy.activeWorkspace}</span>
        <code>{activeWorkspacePath}</code>
      </article>
      <article>
        <span>{copy.folderSource}</span>
        <strong>{workspaceSourceLabel}</strong>
      </article>
      <article>
        <span>{copy.fileList}</span>
        <strong>
          {filteredEditableSourceFiles.length.toLocaleString("ko-KR")} / {sourceCatalogReport?.totalCount ?? sourceCatalogFilesCount}
        </strong>
      </article>
      <article>
        <span>OS 캐시</span>
        <strong>
          {workspaceResourceReport
            ? `${workspaceResourceReport.cachedTextFiles.toLocaleString("ko-KR")} / ${formatBytes(workspaceResourceReport.cachedBytes)} / ${workspaceResourceReport.parallelWorkers} workers`
            : workspaceWarmupReport
              ? `${workspaceWarmupReport.status} / ${workspaceWarmupReport.cachedTextFiles.toLocaleString("ko-KR")} / ${formatBytes(workspaceWarmupReport.cachedBytes)} / ${workspaceWarmupReport.parallelWorkers || "-"} workers`
              : workspaceResourceBusy
                ? copy.loading
                : "not prepared"}
        </strong>
      </article>
      <article>
        <span>메모리 예산</span>
        <strong>
          {formatBytes(workspaceResourceReport?.memoryBudgetBytes ?? workspaceWarmupReport?.memoryBudgetBytes ?? 128_000_000)}
          {workspaceResourceReport?.availableMemoryBytes ? ` / ${formatBytes(workspaceResourceReport.availableMemoryBytes)} free` : ""}
        </strong>
      </article>
      <article>
        <span>CPU 병렬</span>
        <strong>
          {workspaceResourceReport
            ? `${workspaceResourceReport.parallelWorkers}/${workspaceResourceReport.cpuThreads} threads`
            : workspaceWarmupReport?.cpuThreads
              ? `${workspaceWarmupReport.parallelWorkers}/${workspaceWarmupReport.cpuThreads} threads`
              : "runtime profile pending"}
        </strong>
      </article>
      <article>
        <span>앱 RAM/CPU</span>
        <strong>
          {appResourceSnapshot
            ? `${formatBytes(appResourceSnapshot.processMemoryBytes)} / ${appResourceSnapshot.processCpuUsage.toFixed(1)}% / pid ${appResourceSnapshot.appPid || "-"}`
            : invokeAvailable
              ? "native telemetry pending"
              : "browser preview"}
        </strong>
      </article>
      <article>
        <span>{copy.openedDrafts}</span>
        <strong>
          {dirtyDraftCount.toLocaleString("ko-KR")} {copy.dirty} / {openDraftEntries.length.toLocaleString("ko-KR")} open
        </strong>
      </article>
    </section>
  );
}

