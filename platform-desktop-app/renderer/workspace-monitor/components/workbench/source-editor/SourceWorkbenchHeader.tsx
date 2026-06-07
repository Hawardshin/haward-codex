import type {
  SourceDraftEntry,
  WorkspaceResourcePrepareReport,
  WorkspaceResourceWarmupReport
} from "@/types/desktop";

import { isSourceDraftEntryDirty } from "./sourceDrafts";
import type { SourceWorkbenchCopy } from "./sourceWorkbenchTypes";

export type SourceWorkbenchHeaderProps = {
  copy: SourceWorkbenchCopy;
  formatBytes: (bytes: number) => string;
  openDraftEntries: SourceDraftEntry[];
  sourceCatalogLabel: string;
  workspaceResourceReport: WorkspaceResourcePrepareReport | null;
  workspaceWarmupReport: WorkspaceResourceWarmupReport | null;
};

export function SourceWorkbenchHeader({
  copy,
  formatBytes,
  openDraftEntries,
  sourceCatalogLabel,
  workspaceResourceReport,
  workspaceWarmupReport
}: SourceWorkbenchHeaderProps) {
  const dirtyDraftCount = openDraftEntries.filter((entry) => isSourceDraftEntryDirty(entry)).length;

  return (
    <div className="panel-heading">
      <div>
        <p className="eyebrow">{copy.runtimeSource}</p>
        <h2>{copy.title}</h2>
        <p>{copy.description}</p>
      </div>
      <div className="source-panel-stats">
        <span>{openDraftEntries.length} open</span>
        <strong>
          {dirtyDraftCount} {copy.dirty}
        </strong>
        <span>{sourceCatalogLabel}</span>
        {workspaceResourceReport && <span>{formatBytes(workspaceResourceReport.cachedBytes)} cached</span>}
        {workspaceResourceReport && <span>{workspaceResourceReport.preloadStrategy}</span>}
        {workspaceResourceReport && <span>{workspaceResourceReport.scanDurationMs + workspaceResourceReport.preloadDurationMs} ms native</span>}
        {workspaceWarmupReport?.status === "warming" && <span>native warming</span>}
      </div>
    </div>
  );
}

