import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const defaultRepoRoot = path.resolve(projectRoot, "..");
const snapshotPath = path.join(projectRoot, "src", "generated", "workspace-snapshot.json");
const publicSnapshotPath = path.join(projectRoot, "public", "workspace-snapshot.json");

const IGNORE_DIRS = new Set([".git", ".next", "node_modules", "out", "__pycache__", ".pytest_cache"]);
const MAX_DOCUMENTS = 1200;
const HISTORY_CATEGORIES = new Set([
  "daily-history",
  "evaluation",
  "plan",
  "request-trace",
  "user-request",
  "web-search",
  "work-timing",
  "work-summary"
]);
const DOCUMENT_SOURCES = [
  { category: "workspace-doc", root: "_docs" },
  { category: "philosophy", root: "_philosophy" },
  { category: "work-summary", root: "_history/work-summaries" },
  { category: "user-request", root: "_history/user-requests" },
  { category: "request-trace", root: "_history/request-traces" },
  { category: "web-search", root: "_history/web-searches" },
  { category: "work-timing", root: "_history/work-timings" },
  { category: "plan", root: "_history/plans" },
  { category: "evaluation", root: "_history/evaluations" },
  { category: "daily-history", root: "_history/2026" },
  { category: "requirement", root: "_requirements" },
  { category: "shared-spec", root: "_specs" },
  { category: "coordination", root: "_ops/coordination" },
  { category: "runtime-adapter", root: "_ops/assistant-runtimes" },
  { category: "runtime-adapter", root: ".claude/rules" },
  { category: "runtime-adapter", root: ".cursor/rules" },
  { category: "runtime-adapter", root: ".agents/rules" },
  { category: "agent-config", root: "agent-platform/configs/agents" },
  { category: "template", root: "_templates/assistant-operating-principles" },
  { category: "project-doc", root: "agent-platform/docs" },
  { category: "project-doc", root: "presentation-agent/docs" },
  { category: "project-doc", root: "platform-desktop-app/docs" },
  { category: "project-doc", root: "workspace-monitor/docs" },
  { category: "project-spec", root: "agent-platform/specs" },
  { category: "project-spec", root: "presentation-agent/specs" },
  { category: "project-spec", root: "platform-desktop-app/specs" },
  { category: "project-spec", root: "workspace-monitor/specs" }
];
const DOCUMENT_FILES = [
  { category: "runtime-adapter", file: "AGENTS.md" },
  { category: "runtime-adapter", file: "CLAUDE.md" }
];

export function main(argv = process.argv.slice(2)) {
  const options = parseArgs(argv);
  const repoRoot = path.resolve(options.repoRoot || process.env.MONITOR_REPO_ROOT || defaultRepoRoot);
  const canReadRepo = fs.existsSync(path.join(repoRoot, "_history")) && fs.existsSync(path.join(repoRoot, "_ops"));

  if (!canReadRepo && options.bestEffort && fs.existsSync(snapshotPath)) {
    console.warn(`[workspace-monitor] Repository root unavailable; keeping existing snapshot at ${snapshotPath}`);
    return;
  }
  if (!canReadRepo) {
    throw new Error(`Repository root is not readable: ${repoRoot}`);
  }

  const snapshot = buildSnapshot(repoRoot);
  writeJson(snapshotPath, snapshot);
  writeJson(publicSnapshotPath, snapshot);
  console.log(`[workspace-monitor] Wrote ${snapshot.documents.length} documents to ${path.relative(repoRoot, snapshotPath)}`);
}

export function buildSnapshot(repoRoot) {
  const projects = readJson(path.join(repoRoot, "_ops", "projects", "registry.json"), { projects: [] }).projects || [];
  const coordination = readJson(path.join(repoRoot, "_ops", "coordination", "status.json"), { agents: [], tasks: [] });
  const documents = collectDocuments(repoRoot);
  const requirements = collectRequirements(repoRoot);
  const historyDays = buildHistoryDays(documents);
  const folderStructure = buildFolderStructure(repoRoot, projects, documents);
  const categories = Array.from(new Set(documents.map((document) => document.category))).sort();
  const tasks = (coordination.tasks || []).map((task) => attachTaskTiming(repoRoot, task));
  const agentCatalog = collectAgentCatalog(repoRoot, coordination.agents || [], tasks);
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const activeAgents = (coordination.agents || []).filter((agent) => agent.status !== "idle").length;

  return {
    schemaVersion: "2026-06-01",
    generatedAt: new Date().toISOString(),
    repoRootName: path.basename(repoRoot),
    stats: {
      projects: projects.length,
      agents: (coordination.agents || []).length,
      agentDefinitions: agentCatalog.length,
      activeAgents,
      tasks: (coordination.tasks || []).length,
      completedTasks,
      documents: documents.length,
      requirements: requirements.length,
      evaluations: documents.filter((document) => document.category === "evaluation").length,
      webSearches: documents.filter((document) => document.category === "web-search").length,
      timingRecords: documents.filter((document) => document.category === "work-timing").length,
      historyDays: historyDays.length,
      rootFolders: folderStructure.rootFolders.length
    },
    projects: projects.map(normalizeProject),
    agents: coordination.agents || [],
    agentCatalog,
    tasks,
    requirements,
    documents,
    historyDays,
    folderStructure,
    categories,
    publicReview: {
      status: "review_required_before_public_deploy",
      checklist: [
        "Review src/generated/workspace-snapshot.json before making the repository public.",
        "Remove or redact private notes, secrets, raw prompts, or local-only paths that should not be published.",
        "Regenerate the snapshot after any redaction and run npm run build again."
      ]
    }
  };
}

export function collectAgentCatalog(repoRoot, coordinationAgents = [], tasks = []) {
  const root = path.join(repoRoot, "agent-platform", "configs", "agents");
  return walkFiles(root)
    .filter((filePath) => filePath.endsWith(".json"))
    .map((filePath) => {
      const config = readJson(filePath, {});
      const name = config.name || titleFromPath(filePath);
      const runtimeAgent = coordinationAgents.find((agent) => agent.id === name || agent.name === name) || null;
      const ownedTasks = tasks.filter((task) => task.agent === name || (runtimeAgent && task.agent === runtimeAgent.id));
      const docPaths = ["ko", "en", ""]
        .map((language) =>
          language
            ? path.join(repoRoot, "agent-platform", "docs", `${name}.${language}.md`)
            : path.join(repoRoot, "agent-platform", "docs", `${name}.md`)
        )
        .filter((docPath) => fs.existsSync(docPath))
        .map((docPath) => toPosix(path.relative(repoRoot, docPath)));

      return {
        id: slugify(name),
        name,
        description: config.description || "",
        runtime: config.runtime || "unknown",
        definitionStatus: config.metadata?.status || "unknown",
        runtimeStatus: runtimeAgent?.status || "not_running",
        trigger: config.metadata?.trigger || "",
        currentTask: runtimeAgent?.current_task || "",
        tools: Array.isArray(config.tools) ? config.tools : [],
        skills: Array.isArray(config.skills) ? config.skills : [],
        taskCount: ownedTasks.length,
        completedTaskCount: ownedTasks.filter((task) => task.status === "completed").length,
        configPath: toPosix(path.relative(repoRoot, filePath)),
        docPaths
      };
    })
    .sort((left, right) => left.name.localeCompare(right.name));
}

function attachTaskTiming(repoRoot, task) {
  if (!task || !task.timing_report) {
    return task;
  }
  const reportPath = path.join(repoRoot, task.timing_report);
  const timing = readJson(reportPath, null);
  if (!timing || !Array.isArray(timing.phases)) {
    return { ...task, timing_summary: { total: "missing", bottleneck: task.timing_report } };
  }
  const measured = timing.phases
    .map((phase) => ({ phase, duration: phaseDurationSeconds(phase) }))
    .filter((entry) => typeof entry.duration === "number" && Number.isFinite(entry.duration));
  if (!measured.length) {
    return { ...task, timing_summary: { total: "unmeasured", bottleneck: "not measured" } };
  }
  const totalSeconds = measured.reduce((sum, entry) => sum + entry.duration, 0);
  const slowest = measured.reduce((max, entry) => (entry.duration > max.duration ? entry : max), measured[0]);
  const label = slowest.phase.label || slowest.phase.phase_id || "phase";
  return {
    ...task,
    timing_summary: {
      total: formatDuration(totalSeconds),
      bottleneck: `${label} (${formatDuration(slowest.duration)})`
    }
  };
}

function phaseDurationSeconds(phase) {
  if (typeof phase.duration_seconds === "number") {
    return phase.duration_seconds;
  }
  if (typeof phase.duration_seconds === "string" && phase.duration_seconds.trim()) {
    const parsed = Number(phase.duration_seconds);
    return Number.isFinite(parsed) ? parsed : null;
  }
  if (phase.started_at && phase.ended_at) {
    const start = Date.parse(phase.started_at);
    const end = Date.parse(phase.ended_at);
    if (Number.isFinite(start) && Number.isFinite(end)) {
      return Math.max(0, (end - start) / 1000);
    }
  }
  return null;
}

function formatDuration(seconds) {
  if (seconds < 60) {
    return `${Math.round(seconds)}s`;
  }
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function collectDocuments(repoRoot) {
  const documents = [];
  for (const source of DOCUMENT_FILES) {
    const filePath = path.join(repoRoot, source.file);
    if (!fs.existsSync(filePath)) {
      continue;
    }
    documents.push(readDocument(repoRoot, filePath, source.category));
  }
  for (const source of DOCUMENT_SOURCES) {
    const sourceRoot = path.join(repoRoot, source.root);
    for (const filePath of walkFiles(sourceRoot)) {
      if (!/\.(md|json)$/i.test(filePath)) {
        continue;
      }
      documents.push(readDocument(repoRoot, filePath, source.category));
    }
  }
  return documents.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt)).slice(0, MAX_DOCUMENTS);
}

function readDocument(repoRoot, filePath, category) {
  const relativePath = toPosix(path.relative(repoRoot, filePath));
  const content = fs.readFileSync(filePath, "utf8");
  const stats = fs.statSync(filePath);
  const isMarkdown = filePath.endsWith(".md") || filePath.endsWith(".mdc");
  const historyDate = extractHistoryDate(relativePath);
  return {
    id: slugify(relativePath),
    path: relativePath,
    category,
    language: detectLanguage(relativePath),
    title: isMarkdown ? extractTitle(content, relativePath) : titleFromPath(relativePath),
    excerpt: makeExcerpt(content),
    html: isMarkdown ? markdownToHtml(content) : jsonPreviewToHtml(content),
    updatedAt: stats.mtime.toISOString(),
    historyDate,
    historyYear: historyDate ? historyDate.slice(0, 4) : "",
    workspaceArea: workspaceArea(relativePath)
  };
}

export function buildHistoryDays(documents) {
  const byDate = new Map();
  const historyDocuments = documents.filter((document) => HISTORY_CATEGORIES.has(document.category) && document.historyDate);

  for (const document of historyDocuments) {
    const date = document.historyDate;
    const record = byDate.get(date) || {
      date,
      year: date.slice(0, 4),
      documentsCount: 0,
      categories: {},
      documents: []
    };
    record.documentsCount += 1;
    record.categories[document.category] = (record.categories[document.category] || 0) + 1;
    record.documents.push(historyDocumentSummary(document));
    byDate.set(date, record);
  }

  return Array.from(byDate.values())
    .map((day) => ({
      ...day,
      categories: Object.entries(day.categories)
        .map(([category, count]) => ({ category, count }))
        .sort((left, right) => right.count - left.count || left.category.localeCompare(right.category)),
      documents: day.documents.sort((left, right) => left.category.localeCompare(right.category) || left.path.localeCompare(right.path))
    }))
    .sort((left, right) => right.date.localeCompare(left.date));
}

export function buildFolderStructure(repoRoot, projects, documents) {
  const rootPolicy = readJson(path.join(repoRoot, "_ops", "projects", "root-structure-policy.json"), {});
  const docsRegistry = readJson(path.join(repoRoot, "_docs", "registry.json"), { categories: [], required_documents: [] });
  const rootFolders = [
    ...(projects || []).map((project) => ({
      name: stripTrailingSlash(project.path || project.name || ""),
      path: project.path || `${project.name}/`,
      className: "registered_project",
      purpose: project.purpose || "",
      source: "_ops/projects/registry.json"
    })),
    ...(rootPolicy.reserved_operational_dirs || []).map((item) => ({
      name: item.name,
      path: `${item.name}/`,
      className: "reserved_operational",
      purpose: item.purpose || "",
      source: "_ops/projects/root-structure-policy.json"
    })),
    ...(rootPolicy.runtime_adapter_dirs || []).map((item) => ({
      name: item.name,
      path: `${item.name}/`,
      className: "runtime_adapter",
      purpose: item.purpose || "",
      source: "_ops/projects/root-structure-policy.json"
    })),
    ...(rootPolicy.local_only_dirs || []).map((item) => ({
      name: item.name,
      path: `${item.name}/`,
      className: "local_only",
      purpose: item.purpose || "",
      source: "_ops/projects/root-structure-policy.json"
    }))
  ].sort((left, right) => left.className.localeCompare(right.className) || left.name.localeCompare(right.name));

  const docsCategories = (docsRegistry.categories || []).map((category) => ({
    id: category.id,
    path: category.path,
    purpose: category.purpose || "",
    documentsCount: documents.filter((document) => document.path.startsWith(`${category.path}/`)).length,
    requiredDocumentsCount: (docsRegistry.required_documents || []).filter((requiredPath) =>
      requiredPath.startsWith(`${category.path}/`)
    ).length
  }));

  const projectHomes = (projects || []).map((project) => ({
    name: project.name,
    path: project.path,
    purpose: project.purpose || "",
    topLevelDirs: project.project_specific_home || [],
    sharedDependencies: project.shared_dependencies || [],
    boundaryNotes: project.boundary_notes || []
  }));

  const historyRoots = DOCUMENT_SOURCES.filter((source) => source.root.startsWith("_history/") || source.root === "_history/2026").map(
    (source) => ({
      category: source.category,
      root: source.root,
      documentsCount: documents.filter((document) => document.category === source.category && document.path.startsWith(source.root)).length
    })
  );

  return {
    rootFolders,
    docsCategories,
    projectHomes,
    historyRoots
  };
}

export function extractHistoryDate(relativePath) {
  const datedFolderMatch = relativePath.match(/(?:^|\/)(20\d{2})\/(20\d{2}-\d{2}-\d{2})(?:[-./]|$)/);
  if (datedFolderMatch) {
    return datedFolderMatch[2];
  }
  const dateMatch = relativePath.match(/(?:^|\/)(20\d{2}-\d{2}-\d{2})(?:[-./]|$)/);
  return dateMatch ? dateMatch[1] : "";
}

export function collectRequirements(repoRoot) {
  const roots = [
    path.join(repoRoot, "_requirements"),
    path.join(repoRoot, "workspace-monitor", "docs", "requirements"),
    path.join(repoRoot, "presentation-agent", "docs", "requirements"),
    path.join(repoRoot, "platform-desktop-app", "docs", "requirements")
  ];
  return roots.flatMap((root) =>
    walkFiles(root)
      .filter((filePath) => filePath.endsWith(".md"))
      .flatMap((filePath) => parseRequirementRows(fs.readFileSync(filePath, "utf8"), toPosix(path.relative(repoRoot, filePath))))
  );
}

export function parseRequirementRows(markdown, sourcePath = "") {
  return markdown
    .split(/\r?\n/)
    .filter((line) => /^\|\s*REQ-[A-Z]+-\d+/.test(line))
    .map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean))
    .filter((cells) => cells.length >= 2)
    .map((cells) => ({
      id: cells[0],
      requirement: stripMarkdown(cells[1]),
      priority: cells[2] || "unknown",
      sourcePath
    }));
}

export function markdownToHtml(markdown, maxLength = 18000) {
  const lines = markdown.slice(0, maxLength).split(/\r?\n/);
  const html = [];
  let inCode = false;
  let inList = false;
  let inTable = false;
  let tableRows = [];

  const closeList = () => {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  };
  const closeTable = () => {
    if (inTable) {
      html.push(renderTable(tableRows));
      tableRows = [];
      inTable = false;
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith("```")) {
      closeList();
      closeTable();
      html.push(inCode ? "</code></pre>" : "<pre><code>");
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      html.push(escapeHtml(line));
      continue;
    }
    if (/^\s*\|.+\|\s*$/.test(line)) {
      closeList();
      inTable = true;
      tableRows.push(line);
      continue;
    }
    closeTable();
    const trimmed = line.trim();
    if (!trimmed) {
      closeList();
      continue;
    }
    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length, 4);
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    const bullet = trimmed.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(bullet[1])}</li>`);
      continue;
    }
    closeList();
    html.push(`<p>${inlineMarkdown(trimmed)}</p>`);
  }
  closeList();
  closeTable();
  if (inCode) {
    html.push("</code></pre>");
  }
  return html.join("\n");
}

export function extractTitle(content, relativePath = "") {
  const heading = content.match(/^#\s+(.+)$/m);
  return heading ? stripMarkdown(heading[1]) : titleFromPath(relativePath);
}

function renderTable(rows) {
  const parsedRows = rows
    .filter((row) => !/^\|\s*-+/.test(row))
    .map((row) => row.split("|").slice(1, -1).map((cell) => inlineMarkdown(cell.trim())));
  if (parsedRows.length === 0) {
    return "";
  }
  const [head, ...body] = parsedRows;
  return [
    "<table>",
    `<thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>`,
    `<tbody>${body.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>`,
    "</table>"
  ].join("");
}

function historyDocumentSummary(document) {
  return {
    id: document.id,
    path: document.path,
    category: document.category,
    language: document.language,
    title: document.title,
    excerpt: document.excerpt,
    updatedAt: document.updatedAt,
    historyDate: document.historyDate
  };
}

function workspaceArea(relativePath) {
  const parts = relativePath.split("/");
  if (parts[0].startsWith("_") && parts.length > 1) {
    return `${parts[0]}/${parts[1]}`;
  }
  return parts[0] || "";
}

function stripTrailingSlash(value) {
  return value.replace(/\/$/, "");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span class="doc-link">$1</span>');
}

function jsonPreviewToHtml(content) {
  try {
    return `<pre><code>${escapeHtml(JSON.stringify(JSON.parse(content), null, 2).slice(0, 12000))}</code></pre>`;
  } catch {
    return `<pre><code>${escapeHtml(content.slice(0, 12000))}</code></pre>`;
  }
}

function walkFiles(root) {
  if (!fs.existsSync(root)) {
    return [];
  }
  const files = [];
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (IGNORE_DIRS.has(entry.name)) {
        continue;
      }
      const entryPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(entryPath);
      } else {
        files.push(entryPath);
      }
    }
  }
  return files;
}

function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback;
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function normalizeProject(project) {
  return {
    name: project.name,
    path: project.path,
    status: project.status,
    type: project.type,
    purpose: project.purpose,
    scope: project.scope,
    boundaryNotes: project.boundary_notes || []
  };
}

function detectLanguage(relativePath) {
  if (/\.ko\.(md|json)$/.test(relativePath) || /\.ko\.md$/.test(relativePath)) {
    return "ko";
  }
  if (/\.en\.(md|json)$/.test(relativePath) || /\.en\.md$/.test(relativePath)) {
    return "en";
  }
  return "unknown";
}

function makeExcerpt(content) {
  return stripMarkdown(content).replace(/\s+/g, " ").trim().slice(0, 280);
}

function stripMarkdown(value) {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`[\]()-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function titleFromPath(relativePath) {
  const base = path.basename(relativePath || "Document").replace(/\.(ko|en)?\.?md$|\.json$/g, "");
  return base
    .split(/[-_]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9가-힣]+/g, "-").replace(/^-|-$/g, "");
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function parseArgs(argv) {
  const options = { bestEffort: false, repoRoot: "" };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--best-effort") {
      options.bestEffort = true;
    } else if (value === "--repo-root") {
      options.repoRoot = argv[index + 1] || "";
      index += 1;
    }
  }
  return options;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
