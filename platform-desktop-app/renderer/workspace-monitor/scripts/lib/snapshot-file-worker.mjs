import { parentPort } from "node:worker_threads";

import { readDocument, readSourceFile } from "../collect-workspace.mjs";

parentPort?.on("message", ({ taskIndex, task }) => {
  try {
    const result = task.type === "document"
      ? readDocument(task.repoRoot, task.filePath, task.category)
      : readSourceFile(task.repoRoot, task.filePath, task.project);
    parentPort.postMessage({ taskIndex, result });
  } catch (error) {
    parentPort.postMessage({
      taskIndex,
      error: error instanceof Error ? error.message : String(error)
    });
  }
});
