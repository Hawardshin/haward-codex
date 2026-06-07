import type {
  CliSessionReport,
  DecisionGroup,
  HumanDecisionItem,
  OutputEvent
} from "@/types/desktop";

export const SESSION_POLL_IDLE_UPDATE_BUCKET_MS = 5000;
export const SESSION_OUTPUT_SIGNATURE_CHARS = 2048;

export type RuntimeNativePtyRenderReport = {
  sessionId: string;
  status: string;
  exitCode?: number | null;
  elapsedMs: number;
  output: string;
  outputTruncated: boolean;
  workingDir: string;
  rows: number;
  cols: number;
  pid?: number | null;
  terminalKind: string;
};

export function mergeSessionReports<T extends CliSessionReport>(
  current: T[],
  reports: T[],
  options: { promote?: boolean; replaceAll?: boolean } = {}
) {
  if (reports.length === 0) {
    return current;
  }

  const currentById = new Map(current.map((session) => [session.sessionId, session]));
  const reportsById = new Map(reports.map((report) => [report.sessionId, report]));
  const reportIds = new Set(reports.map((report) => report.sessionId));

  if (options.replaceAll) {
    let changed = current.length !== reports.length;
    const next = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      if (existing && areSessionReportsRenderEqual(existing, report)) {
        return existing;
      }
      changed = true;
      return report;
    });
    return changed ? next : current;
  }

  let changed = false;
  const updated = current.map((session) => {
    const report = reportsById.get(session.sessionId);
    if (!report) {
      return session;
    }
    if (areSessionReportsRenderEqual(session, report)) {
      return session;
    }
    changed = true;
    return report;
  });
  const newReports = reports.filter((report) => !currentById.has(report.sessionId));
  if (newReports.length > 0) {
    changed = true;
  }
  if (!changed) {
    return current;
  }

  if (options.promote) {
    const promoted = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      return existing && areSessionReportsRenderEqual(existing, report) ? existing : report;
    });
    return [...promoted, ...updated.filter((session) => !reportIds.has(session.sessionId))];
  }

  return [...updated, ...newReports];
}

export function mergeNativePtyReports<T extends RuntimeNativePtyRenderReport>(
  current: T[],
  reports: T[],
  options: { promote?: boolean; replaceAll?: boolean } = {}
) {
  if (reports.length === 0) {
    return current;
  }

  const currentById = new Map(current.map((session) => [session.sessionId, session]));
  const reportsById = new Map(reports.map((report) => [report.sessionId, report]));
  const reportIds = new Set(reports.map((report) => report.sessionId));

  if (options.replaceAll) {
    let changed = current.length !== reports.length;
    const next = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      if (existing && areNativePtyReportsRenderEqual(existing, report)) {
        return existing;
      }
      changed = true;
      return report;
    });
    return changed ? next : current;
  }

  let changed = false;
  const updated = current.map((session) => {
    const report = reportsById.get(session.sessionId);
    if (!report) {
      return session;
    }
    if (areNativePtyReportsRenderEqual(session, report)) {
      return session;
    }
    changed = true;
    return report;
  });
  const newReports = reports.filter((report) => !currentById.has(report.sessionId));
  if (newReports.length > 0) {
    changed = true;
  }
  if (!changed) {
    return current;
  }

  if (options.promote) {
    const promoted = reports.map((report) => {
      const existing = currentById.get(report.sessionId);
      return existing && areNativePtyReportsRenderEqual(existing, report) ? existing : report;
    });
    return [...promoted, ...updated.filter((session) => !reportIds.has(session.sessionId))];
  }

  return [...updated, ...newReports];
}

export function areSessionReportsRenderEqual(left: CliSessionReport, right: CliSessionReport) {
  return sessionReportRenderSignature(left) === sessionReportRenderSignature(right);
}

export function sessionReportRenderSignature(session: CliSessionReport) {
  return [
    session.sessionId,
    session.taskRunId,
    session.taskKind,
    session.pipelineId || "",
    session.laneId || "",
    session.status,
    session.exitCode ?? "",
    Math.floor(session.elapsedMs / SESSION_POLL_IDLE_UPDATE_BUCKET_MS),
    session.stdout.length,
    session.stdout.slice(-SESSION_OUTPUT_SIGNATURE_CHARS),
    session.stderr.length,
    session.stderr.slice(-SESSION_OUTPUT_SIGNATURE_CHARS),
    session.decisionPrompts
      .map((prompt) => `${prompt.lane}:${prompt.question}:${prompt.resumeAction}`)
      .join("\u001e"),
    session.outputTruncated ? "1" : "0",
    session.deferMessageSent ? "1" : "0",
    session.autoDeferQuestions ? "1" : "0",
    session.autoDeferTriggered ? "1" : "0",
    session.decisionInboxItems,
    session.pendingDecisionPrompts,
    session.deferredPromptCount,
    session.decisionCaptureError || "",
    session.taskRecordPath || "",
    session.stdoutLogPath || "",
    session.stderrLogPath || "",
    session.persistenceError || ""
  ].join("\u001f");
}

export function areNativePtyReportsRenderEqual(
  left: RuntimeNativePtyRenderReport,
  right: RuntimeNativePtyRenderReport
) {
  return nativePtyReportRenderSignature(left) === nativePtyReportRenderSignature(right);
}

export function nativePtyReportRenderSignature(session: RuntimeNativePtyRenderReport) {
  return [
    session.sessionId,
    session.status,
    session.exitCode ?? "",
    Math.floor(session.elapsedMs / SESSION_POLL_IDLE_UPDATE_BUCKET_MS),
    session.output.length,
    session.output.slice(-SESSION_OUTPUT_SIGNATURE_CHARS),
    session.outputTruncated ? "1" : "0",
    session.workingDir,
    session.rows,
    session.cols,
    session.pid ?? "",
    session.terminalKind
  ].join("\u001f");
}

export function isOpenDecisionStatus(status: string) {
  return ["open", "deferred", "resuming"].includes(status);
}

export function isActiveSessionStatus(status: string) {
  return ["running", "defer_message_sent"].includes(status);
}

export function formatDuration(ms: number) {
  if (ms < 1000) {
    return `${ms}ms`;
  }
  if (ms < 60_000) {
    return `${Math.round(ms / 100) / 10}s`;
  }
  return `${Math.round(ms / 60_000)}m`;
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes}B`;
  }
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)}KB`;
  }
  return `${Math.round((bytes / (1024 * 1024)) * 10) / 10}MB`;
}

export function detectOutputEvents(sourceId: string, lane: string, output: string): OutputEvent[] {
  const lines = output
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const events: OutputEvent[] = [];

  for (const [index, line] of lines.entries()) {
    const lower = line.toLowerCase();
    const id = `${sourceId}-${index}`;
    if (events.length >= 8) {
      break;
    }
    if (/[?？]|\b(confirm|approve|continue|proceed|choose|select|y\/n|yes\/no)\b|선택|확인|승인|진행|질문/.test(lower)) {
      events.push({ id, type: "question", lane, label: "question candidate", detail: line.slice(0, 180) });
      continue;
    }
    if (/\b(error|failed|failure|panic|exception)\b|오류|실패/.test(lower)) {
      events.push({ id, type: "error", lane, label: "error signal", detail: line.slice(0, 180) });
      continue;
    }
    if (/\b(warn|warning|deprecated|caution)\b|경고|주의/.test(lower)) {
      events.push({ id, type: "warning", lane, label: "warning signal", detail: line.slice(0, 180) });
      continue;
    }
    if (/\b(pass|passed|fail|failed|test|tests|build|lint|typecheck)\b/.test(lower)) {
      events.push({ id, type: "test", lane, label: "validation signal", detail: line.slice(0, 180) });
      continue;
    }
    if (/[./\w-]+\.(ts|tsx|js|jsx|mjs|json|md|rs|py|css|html)(:\d+)?/.test(line)) {
      events.push({ id, type: "file", lane, label: "file reference", detail: line.slice(0, 180) });
    }
  }

  if (events.length === 0 && lines.length > 0) {
    events.push({
      id: `${sourceId}-summary`,
      type: "info",
      lane,
      label: "output captured",
      detail: lines[0].slice(0, 180)
    });
  }

  return events;
}

export function groupDecisions(decisions: HumanDecisionItem[]): DecisionGroup[] {
  const groups = new Map<string, DecisionGroup>();
  for (const decision of decisions) {
    const id = decision.sessionId || decision.source || "unlinked";
    const group = groups.get(id) || {
      id,
      label: decision.sessionId ? `${decision.adapterId || "session"} / ${decision.sessionId}` : decision.source || "unlinked",
      openCount: 0,
      answeredCount: 0,
      decisions: []
    };
    if (isOpenDecisionStatus(decision.status)) {
      group.openCount += 1;
    }
    if (decision.status === "answered" || decision.answeredAt) {
      group.answeredCount += 1;
    }
    group.decisions.push(decision);
    groups.set(id, group);
  }
  return Array.from(groups.values()).sort((left, right) => right.openCount - left.openCount || left.label.localeCompare(right.label));
}
