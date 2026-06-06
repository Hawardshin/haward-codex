import os from "node:os";
import { Worker } from "node:worker_threads";

const DEFAULT_MAX_WORKERS = 6;

export function recommendedWorkerCount(taskCount, {
  maxWorkers = DEFAULT_MAX_WORKERS,
  minTasksPerWorker = 32
} = {}) {
  if (taskCount <= minTasksPerWorker || process.env.WORKSPACE_MONITOR_PARALLEL === "0") {
    return 1;
  }
  const available = typeof os.availableParallelism === "function" ? os.availableParallelism() : os.cpus().length;
  const cpuBound = Math.max(1, available - 1);
  const taskBound = Math.max(1, Math.floor(taskCount / minTasksPerWorker));
  return Math.max(1, Math.min(maxWorkers, cpuBound, taskBound));
}

export async function runWorkerTasks({
  tasks,
  workerPath,
  workerCount,
  fallback
}) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return [];
  }
  if (workerCount <= 1) {
    return fallback ? fallback(tasks) : tasks.map((task) => task);
  }

  const results = new Array(tasks.length);
  const workers = [];
  let nextTaskIndex = 0;
  let completed = 0;
  let settled = false;

  return new Promise((resolve, reject) => {
    const cleanup = () => {
      for (const worker of workers) {
        worker.terminate().catch(() => undefined);
      }
    };

    const fail = (error) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      reject(error);
    };

    const dispatch = (worker) => {
      if (settled) {
        return;
      }
      if (nextTaskIndex >= tasks.length) {
        return;
      }
      const taskIndex = nextTaskIndex;
      nextTaskIndex += 1;
      worker.postMessage({ taskIndex, task: tasks[taskIndex] });
    };

    for (let index = 0; index < workerCount; index += 1) {
      const worker = new Worker(workerPath, { type: "module" });
      workers.push(worker);
      worker.on("message", (message) => {
        if (settled) {
          return;
        }
        if (message?.error) {
          fail(new Error(message.error));
          return;
        }
        results[message.taskIndex] = message.result;
        completed += 1;
        if (completed >= tasks.length) {
          settled = true;
          cleanup();
          resolve(results);
          return;
        }
        dispatch(worker);
      });
      worker.on("error", fail);
      worker.on("exit", (code) => {
        if (!settled && code !== 0) {
          fail(new Error(`Snapshot worker exited with code ${code}`));
        }
      });
      dispatch(worker);
    }
  });
}
