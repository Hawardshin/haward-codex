import { isActiveSessionStatus } from "@/lib/runtimeDisplay";
import type { RuntimeTerminalSession } from "./runtimeTerminalTypes";

export function formatSessionOutput(session: RuntimeTerminalSession, fallback: string) {
  const chunks: string[] = [];
  if (session.stdout) {
    chunks.push(`[stdout]\n${session.stdout}`);
  }
  if (session.stderr) {
    chunks.push(`[stderr]\n${session.stderr}`);
  }
  return chunks.length ? chunks.join("\n\n") : fallback;
}

export function sessionStatusDetail(session: RuntimeTerminalSession) {
  if (session.pendingDecisionPrompts) {
    return `${session.pendingDecisionPrompts} pending`;
  }
  if (session.decisionInboxItems) {
    return `${session.decisionInboxItems} inbox`;
  }
  return session.outputTruncated ? "truncated" : "bounded";
}

export function isWritableSessionStatus(status: string) {
  return isActiveSessionStatus(status);
}
