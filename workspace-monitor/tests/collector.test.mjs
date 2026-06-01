import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  buildSnapshot,
  extractHistoryDate,
  extractTitle,
  markdownToHtml,
  parseRequirementRows
} from "../scripts/collect-workspace.mjs";

test("extractTitle falls back to the first markdown heading", () => {
  assert.equal(extractTitle("# 작업 요약\n\n내용", "_history/work-summaries/2026/example.ko.md"), "작업 요약");
});

test("markdownToHtml escapes raw HTML and renders common blocks", () => {
  const html = markdownToHtml("# Title\n\n<script>alert(1)</script>\n\n- item\n\n| A | B |\n| --- | --- |\n| 1 | 2 |");

  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(html, /<li>item<\/li>/);
  assert.match(html, /<table>/);
});

test("parseRequirementRows extracts requirement IDs", () => {
  const rows = parseRequirementRows("| REQ-WM-001 | Build Next.js app | must | test |", "requirements.md");

  assert.equal(rows.length, 1);
  assert.equal(rows[0].id, "REQ-WM-001");
  assert.equal(rows[0].priority, "must");
});

test("extractHistoryDate reads dated history file paths", () => {
  assert.equal(
    extractHistoryDate("_history/work-summaries/2026/2026-06-01-workspace-monitor.ko.md"),
    "2026-06-01"
  );
  assert.equal(extractHistoryDate("_docs/policies/source-collection-policy.ko.md"), "");
});

test("buildSnapshot reads minimal repository shape", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "workspace-monitor-test-"));
  fs.mkdirSync(path.join(root, "_ops", "projects"), { recursive: true });
  fs.mkdirSync(path.join(root, "_ops", "coordination"), { recursive: true });
  fs.mkdirSync(path.join(root, "_history", "work-summaries", "2026"), { recursive: true });
  fs.mkdirSync(path.join(root, "_docs"), { recursive: true });
  fs.mkdirSync(path.join(root, "_requirements", "baselines"), { recursive: true });

  fs.writeFileSync(
    path.join(root, "_ops", "projects", "registry.json"),
    JSON.stringify({ projects: [{ name: "demo", path: "demo/", status: "active", type: "demo", purpose: "Demo", scope: "Demo scope" }] })
  );
  fs.writeFileSync(
    path.join(root, "_ops", "projects", "root-structure-policy.json"),
    JSON.stringify({
      reserved_operational_dirs: [{ name: "_history", purpose: "History" }],
      runtime_adapter_dirs: [],
      local_only_dirs: []
    })
  );
  fs.writeFileSync(
    path.join(root, "_ops", "coordination", "status.json"),
    JSON.stringify({ agents: [{ id: "agent", status: "idle" }], tasks: [{ id: "task", status: "completed" }] })
  );
  fs.writeFileSync(
    path.join(root, "_docs", "registry.json"),
    JSON.stringify({
      categories: [{ id: "instructions", path: "_docs/instructions", purpose: "Instructions" }],
      required_documents: []
    })
  );
  fs.writeFileSync(
    path.join(root, "_history", "work-summaries", "2026", "2026-06-01-today.ko.md"),
    "# 오늘 요약\n\n- 완료"
  );
  fs.writeFileSync(
    path.join(root, "_requirements", "baselines", "requirements.ko.md"),
    "| ID | 요구사항 | 우선순위 |\n| --- | --- | --- |\n| REQ-WM-001 | Build monitor | must |"
  );

  const snapshot = buildSnapshot(root);

  assert.equal(snapshot.stats.projects, 1);
  assert.equal(snapshot.stats.completedTasks, 1);
  assert.equal(snapshot.documents.length, 4);
  assert.equal(snapshot.historyDays[0].date, "2026-06-01");
  assert.equal(snapshot.folderStructure.rootFolders.some((folder) => folder.path === "demo/"), true);
  assert.equal(snapshot.folderStructure.docsCategories[0].path, "_docs/instructions");
  assert.equal(snapshot.requirements[0].id, "REQ-WM-001");
});
