export type EvalRuntimeTelemetrySignal = {
  status: string;
  schemaVersion: string;
  sampledAt: string;
  systemSupported: boolean;
  appPid: number;
  processMemoryBytes: number;
  processVirtualMemoryBytes: number;
  processCpuUsage: number;
  processRunTimeSeconds: number;
  processTaskCount: number;
  cpuThreads: number;
  parallelWorkers: number;
  globalCpuUsage: number;
  totalMemoryBytes: number;
  availableMemoryBytes: number;
  memoryBudgetBytes: number;
  workspaceCache: {
    cacheStatus: string;
    cachedTextFiles: number;
    cachedBytes: number;
    preloadDurationMs: number;
  };
  semanticMetrics?: Array<{
    name: string;
    value: number;
    unit: string;
    source: string;
  }>;
};

export type RuntimeTelemetryRow = {
  id: string;
  labelKo: string;
  labelEn: string;
  value: string;
  detail: string;
};

export type RuntimeTelemetryModelInput = {
  ko: boolean;
  nativeResourceSignalCount: number;
  runtimeTelemetry?: EvalRuntimeTelemetrySignal | null;
  rustTauriSignalCount: number;
  validationSignalScore: number;
};

export type RuntimeTelemetryModel = {
  nativeRuntimeScore: number;
  runtimeTelemetryAvailable: boolean;
  runtimeTelemetryRows: RuntimeTelemetryRow[];
};

export function formatRuntimeBytes(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = value;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex += 1;
  }
  return `${size >= 10 || unitIndex === 0 ? size.toFixed(0) : size.toFixed(1)} ${units[unitIndex]}`;
}

function scoreFromRatio(value: number, max: number) {
  if (max <= 0) {
    return 0;
  }
  return Math.min(100, Math.round((value / max) * 100));
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function buildRuntimeTelemetryModel({
  ko,
  nativeResourceSignalCount,
  runtimeTelemetry,
  rustTauriSignalCount,
  validationSignalScore
}: RuntimeTelemetryModelInput): RuntimeTelemetryModel {
  const runtimeTelemetryAvailable = Boolean(runtimeTelemetry?.status === "sampled" && runtimeTelemetry.systemSupported);
  const runtimeMemoryHeadroomScore =
    runtimeTelemetryAvailable && runtimeTelemetry?.memoryBudgetBytes
      ? clampScore(100 - Math.min(95, scoreFromRatio(runtimeTelemetry.processMemoryBytes, runtimeTelemetry.memoryBudgetBytes)))
      : scoreFromRatio(nativeResourceSignalCount, 12);
  const runtimeCpuHeadroomScore =
    runtimeTelemetryAvailable && runtimeTelemetry
      ? clampScore(100 - Math.min(95, runtimeTelemetry.processCpuUsage))
      : scoreFromRatio(rustTauriSignalCount, 4);
  const runtimeCacheScore =
    runtimeTelemetryAvailable && runtimeTelemetry?.workspaceCache
      ? runtimeTelemetry.workspaceCache.cachedBytes > 0 || runtimeTelemetry.workspaceCache.cacheStatus
        ? 100
        : 40
      : scoreFromRatio(nativeResourceSignalCount, 12);
  const nativeRuntimeScore = runtimeTelemetryAvailable
    ? clampScore(runtimeMemoryHeadroomScore * 0.36 + runtimeCpuHeadroomScore * 0.36 + runtimeCacheScore * 0.18 + validationSignalScore * 0.1)
    : clampScore(scoreFromRatio(nativeResourceSignalCount, 12) * 0.45 + scoreFromRatio(rustTauriSignalCount, 4) * 0.35 + validationSignalScore * 0.2);
  const runtimeTelemetryRows: RuntimeTelemetryRow[] = runtimeTelemetryAvailable && runtimeTelemetry
    ? [
        {
          id: "process.memory.usage",
          labelKo: "프로세스 RAM",
          labelEn: "Process RAM",
          value: formatRuntimeBytes(runtimeTelemetry.processMemoryBytes),
          detail: `${formatRuntimeBytes(runtimeTelemetry.availableMemoryBytes)} free / ${formatRuntimeBytes(runtimeTelemetry.memoryBudgetBytes)} budget`
        },
        {
          id: "process.cpu.utilization",
          labelKo: "프로세스 CPU",
          labelEn: "Process CPU",
          value: `${runtimeTelemetry.processCpuUsage.toFixed(1)}%`,
          detail: `${runtimeTelemetry.parallelWorkers}/${runtimeTelemetry.cpuThreads} workers`
        },
        {
          id: "workspace.cache.usage",
          labelKo: "워크스페이스 cache",
          labelEn: "Workspace Cache",
          value: formatRuntimeBytes(runtimeTelemetry.workspaceCache.cachedBytes),
          detail: `${runtimeTelemetry.workspaceCache.cachedTextFiles.toLocaleString("ko-KR")} files / ${runtimeTelemetry.workspaceCache.cacheStatus}`
        },
        {
          id: "process.thread.count",
          labelKo: "프로세스 task",
          labelEn: "Process Tasks",
          value: runtimeTelemetry.processTaskCount.toLocaleString("ko-KR"),
          detail: `${runtimeTelemetry.processRunTimeSeconds.toLocaleString("ko-KR")}s uptime`
        }
      ]
    : [
        {
          id: "runtime.preview",
          labelKo: "네이티브 telemetry",
          labelEn: "Native Telemetry",
          value: ko ? "대기" : "pending",
          detail: ko ? "Tauri desktop runtime에서 RAM/CPU/cache가 채워집니다." : "RAM, CPU, and cache fill in the Tauri desktop runtime."
        }
      ];

  return {
    nativeRuntimeScore,
    runtimeTelemetryAvailable,
    runtimeTelemetryRows
  };
}
