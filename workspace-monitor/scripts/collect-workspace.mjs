import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const defaultRepoRoot = path.resolve(projectRoot, "..");
const snapshotPath = path.join(projectRoot, "src", "generated", "workspace-snapshot.json");
const publicSnapshotPath = path.join(projectRoot, "public", "workspace-snapshot.json");

const IGNORE_DIRS = new Set([".git", ".next", "node_modules", "out", "__pycache__", ".pytest_cache", "_private", "outputs"]);
const MAX_DOCUMENTS = 1200;
const MAX_SOURCE_FILES = 260;
const MAX_SOURCE_CHARS = 22000;
const MAX_SOURCE_FILE_BYTES = 180000;
const SOURCE_DIR_NAMES = ["src", "tests", "app", "components", "lib", "scripts"];
const SOURCE_EXTENSIONS = new Set([
  ".py",
  ".js",
  ".mjs",
  ".cjs",
  ".ts",
  ".tsx",
  ".css",
  ".html",
  ".json",
  ".toml",
  ".yaml",
  ".yml",
  ".sh"
]);
const SOURCE_EXCLUDED_SEGMENTS = ["/_private/", "/outputs/", "/src/generated/", "/public/", "/out/", "/.next/", "/node_modules/"];
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
  { category: "security", root: "_ops/security" },
  { category: "runtime-adapter", root: "_ops/assistant-runtimes" },
  { category: "runtime-adapter", root: ".claude/rules" },
  { category: "runtime-adapter", root: ".cursor/rules" },
  { category: "runtime-adapter", root: ".agents/rules" },
  { category: "agent-config", root: "agent-platform/configs/agents" },
  { category: "agent-config", root: "agent-platform/configs/access" },
  { category: "security-config", root: "agent-platform/configs/security" },
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
  const viewModeCatalog = collectViewModeCatalog(repoRoot);
  const languageModeCatalog = collectLanguageModeCatalog(repoRoot);
  const modeFunctionCatalog = collectModeFunctionCatalog(repoRoot, viewModeCatalog, languageModeCatalog);
  const sourceFiles = collectSourceFiles(repoRoot, projects);
  const categories = Array.from(new Set(documents.map((document) => document.category))).sort();
  const tasks = (coordination.tasks || []).map((task) => attachTaskTiming(repoRoot, task));
  const agentCatalog = collectAgentCatalog(repoRoot, coordination.agents || [], tasks);
  const collaborationBoard = buildAgentCollaborationBoard(coordination.agents || [], agentCatalog, tasks);
  const unifiedOps = buildUnifiedOps({
    documents,
    historyDays,
    tasks,
    collaborationBoard
  });
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const activeAgents = (coordination.agents || []).filter((agent) => agent.status !== "idle").length;

  return {
    schemaVersion: "2026-06-03",
    generatedAt: new Date().toISOString(),
    repoRootName: path.basename(repoRoot),
    stats: {
      projects: projects.length,
      agents: (coordination.agents || []).length,
      agentDefinitions: agentCatalog.length,
      activeAgents,
      activeCollaborationTasks: collaborationBoard.summary.activeTasks,
      blockedCollaborationTasks: collaborationBoard.summary.blockedTasks,
      tasks: (coordination.tasks || []).length,
      completedTasks,
      documents: documents.length,
      requirements: requirements.length,
      evaluations: documents.filter((document) => document.category === "evaluation").length,
      webSearches: documents.filter((document) => document.category === "web-search").length,
      timingRecords: documents.filter((document) => document.category === "work-timing").length,
      historyDays: historyDays.length,
      unifiedOpsEvents: unifiedOps.summary.totalEvents,
      modeGroups: modeFunctionCatalog.summary.totalGroups,
      modeOptions: modeFunctionCatalog.summary.totalOptions,
      sourceFiles: sourceFiles.length,
      rootFolders: folderStructure.rootFolders.length
    },
    projects: projects.map(normalizeProject),
    agents: coordination.agents || [],
    agentCatalog,
    collaborationBoard,
    tasks,
    requirements,
    documents,
    historyDays,
    unifiedOps,
    sourceFiles,
    folderStructure,
    viewModeCatalog,
    languageModeCatalog,
    modeFunctionCatalog,
    categories,
    publicReview: {
      status: "review_required_before_public_deploy",
      checklist: [
        "Review src/generated/workspace-snapshot.json before making the repository public.",
        "Run python3 _tools/privacy-audit/src/privacy_audit.py --check before public deploy.",
        "Remove or redact private notes, secrets, raw prompts, or local-only paths that should not be published.",
        "Regenerate the snapshot after any redaction and run npm run build again."
      ]
    }
  };
}

export function buildAgentCollaborationBoard(runtimeAgents = [], agentCatalog = [], tasks = []) {
  const agentsByKey = new Map();
  for (const agent of agentCatalog || []) {
    agentsByKey.set(agent.name, {
      id: agent.id,
      name: agent.name,
      role: agent.description || agent.trigger || "",
      status: agent.runtimeStatus || agent.definitionStatus || "unknown",
      currentTask: agent.currentTask || "",
      taskCount: 0,
      activeTaskCount: 0,
      blockedTaskCount: 0,
      completedTaskCount: 0
    });
  }
  for (const agent of runtimeAgents || []) {
    const key = agent.name || agent.id;
    const existing = agentsByKey.get(key);
    agentsByKey.set(key, {
      id: existing?.id || slugify(key),
      name: key,
      role: agent.role || existing?.role || "",
      status: agent.status || existing?.status || "unknown",
      currentTask: agent.current_task || existing?.currentTask || "",
      taskCount: existing?.taskCount || 0,
      activeTaskCount: existing?.activeTaskCount || 0,
      blockedTaskCount: existing?.blockedTaskCount || 0,
      completedTaskCount: existing?.completedTaskCount || 0
    });
  }

  const laneSpecs = [
    { id: "active", label: "작업 중" },
    { id: "blocked", label: "대기/차단" },
    { id: "queued", label: "예정" },
    { id: "completed", label: "완료" },
    { id: "other", label: "기타" }
  ];
  const lanes = laneSpecs.map((lane) => ({ ...lane, tasks: [] }));
  const laneById = new Map(lanes.map((lane) => [lane.id, lane]));
  const flows = [];
  const blockers = [];
  const nextActions = [];

  for (const task of tasks || []) {
    const agentName = task.agent || "unassigned";
    if (!agentsByKey.has(agentName)) {
      agentsByKey.set(agentName, {
        id: slugify(agentName),
        name: agentName,
        role: "",
        status: "not_registered",
        currentTask: "",
        taskCount: 0,
        activeTaskCount: 0,
        blockedTaskCount: 0,
        completedTaskCount: 0
      });
    }

    const laneId = collaborationLaneForTask(task);
    const summary = {
      id: task.id || slugify(task.title || "task"),
      title: task.title || task.id || "Untitled task",
      project: task.project || "workspace",
      status: task.status || "unknown",
      priority: task.priority || "",
      agent: agentName,
      lane: laneId,
      nextAction: task.next_action || "",
      blockers: Array.isArray(task.blockers) ? task.blockers : [],
      references: Array.isArray(task.references) ? task.references.slice(0, 4) : [],
      timingTotal: task.timing_summary?.total || "",
      bottleneck: task.timing_summary?.bottleneck || "",
      evaluationReport: task.evaluation_report || ""
    };
    laneById.get(laneId)?.tasks.push(summary);
    flows.push({
      id: `${summary.id}-${slugify(agentName)}`,
      agent: agentName,
      task: summary.title,
      project: summary.project,
      status: summary.status,
      lane: laneId,
      priority: summary.priority,
      timingTotal: summary.timingTotal,
      bottleneck: summary.bottleneck
    });

    if (summary.blockers.length) {
      blockers.push({
        taskId: summary.id,
        title: summary.title,
        agent: agentName,
        blockers: summary.blockers
      });
    }
    if (summary.nextAction) {
      nextActions.push({
        taskId: summary.id,
        title: summary.title,
        agent: agentName,
        nextAction: summary.nextAction
      });
    }

    const agent = agentsByKey.get(agentName);
    agent.taskCount += 1;
    if (laneId === "active") {
      agent.activeTaskCount += 1;
    }
    if (laneId === "blocked") {
      agent.blockedTaskCount += 1;
    }
    if (laneId === "completed") {
      agent.completedTaskCount += 1;
    }
  }

  const agents = Array.from(agentsByKey.values()).sort(
    (left, right) =>
      right.activeTaskCount - left.activeTaskCount ||
      right.blockedTaskCount - left.blockedTaskCount ||
      right.taskCount - left.taskCount ||
      left.name.localeCompare(right.name)
  );
  const sortedLanes = lanes.map((lane) => ({
    ...lane,
    tasks: lane.tasks.sort(
      (left, right) => priorityRank(right.priority) - priorityRank(left.priority) || left.title.localeCompare(right.title)
    )
  }));

  return {
    summary: {
      agents: agents.length,
      activeAgents: agents.filter((agent) => agent.status !== "idle" && agent.status !== "not_running").length,
      activeTasks: sortedLanes.find((lane) => lane.id === "active")?.tasks.length || 0,
      blockedTasks: sortedLanes.find((lane) => lane.id === "blocked")?.tasks.length || 0,
      queuedTasks: sortedLanes.find((lane) => lane.id === "queued")?.tasks.length || 0,
      completedTasks: sortedLanes.find((lane) => lane.id === "completed")?.tasks.length || 0,
      handoffs: flows.length,
      blockers: blockers.length
    },
    agents,
    lanes: sortedLanes,
    flows: flows.slice(0, 40),
    blockers: blockers.slice(0, 20),
    nextActions: nextActions.slice(0, 20)
  };
}

export function buildUnifiedOps({ documents = [], historyDays = [], tasks = [], collaborationBoard = emptyCollaborationBoard() } = {}) {
  const events = [];

  for (const document of documents) {
    if (!HISTORY_CATEGORIES.has(document.category)) {
      continue;
    }
    const signalType = historySignalType(document.category);
    events.push({
      id: `history-${document.id}`,
      sourceType: "history",
      signalType,
      lane: historySignalLane(document.category),
      severity: historySignalSeverity(document),
      status: historySignalStatus(document),
      title: document.title,
      detail: document.excerpt,
      path: document.path,
      category: document.category,
      language: document.language,
      date: document.historyDate || document.updatedAt.slice(0, 10),
      timestamp: document.updatedAt
    });
  }

  for (const task of tasks) {
    const lane = collaborationLaneForTask(task);
    events.push({
      id: `monitor-task-${slugify(task.id || task.title || "task")}`,
      sourceType: "monitor",
      signalType: "task",
      lane,
      severity: taskSeverity(task, lane),
      status: task.status || "unknown",
      title: task.title || task.id || "Untitled task",
      detail: task.next_action || task.timing_summary?.bottleneck || task.evaluation_report || "No next action recorded.",
      path: task.evaluation_report || task.timing_report || "",
      category: "task-monitor",
      language: "unknown",
      date: "",
      timestamp: task.updated_at || task.created_at || ""
    });
  }

  for (const blocker of collaborationBoard.blockers || []) {
    events.push({
      id: `monitor-blocker-${slugify(blocker.taskId || blocker.title)}`,
      sourceType: "monitor",
      signalType: "blocker",
      lane: "blocked",
      severity: "critical",
      status: "blocked",
      title: blocker.title,
      detail: blocker.blockers.join(" / "),
      path: "",
      category: "blocker-monitor",
      language: "unknown",
      date: "",
      timestamp: ""
    });
  }

  for (const action of collaborationBoard.nextActions || []) {
    events.push({
      id: `monitor-next-${slugify(action.taskId || action.title)}`,
      sourceType: "monitor",
      signalType: "next-action",
      lane: "active",
      severity: "attention",
      status: "next",
      title: action.title,
      detail: action.nextAction,
      path: "",
      category: "next-action-monitor",
      language: "unknown",
      date: "",
      timestamp: ""
    });
  }

  const sortedEvents = events
    .sort((left, right) => {
      const rightTime = right.timestamp || right.date || "";
      const leftTime = left.timestamp || left.date || "";
      return rightTime.localeCompare(leftTime) || severityRank(right.severity) - severityRank(left.severity) || left.title.localeCompare(right.title);
    })
    .slice(0, 160);
  const byLane = summarizeOpsField(sortedEvents, "lane");
  const bySignalType = summarizeOpsField(sortedEvents, "signalType");
  const bySourceType = summarizeOpsField(sortedEvents, "sourceType");
  const openSignals = sortedEvents.filter((event) => ["critical", "attention", "warning"].includes(event.severity)).length;
  const criticalSignals = sortedEvents.filter((event) => event.severity === "critical").length;

  return {
    summary: {
      totalEvents: sortedEvents.length,
      historyEvents: sortedEvents.filter((event) => event.sourceType === "history").length,
      monitorEvents: sortedEvents.filter((event) => event.sourceType === "monitor").length,
      evidenceEvents: sortedEvents.filter((event) => ["evidence", "evaluation", "web-search"].includes(event.signalType)).length,
      decisionEvents: sortedEvents.filter((event) => ["decision", "blocker", "next-action"].includes(event.signalType)).length,
      openSignals,
      criticalSignals,
      latestEventAt: sortedEvents[0]?.timestamp || sortedEvents[0]?.date || "",
      historyDays: historyDays.length
    },
    lanes: byLane,
    signalTypes: bySignalType,
    sourceTypes: bySourceType,
    events: sortedEvents
  };
}

function emptyCollaborationBoard() {
  return {
    summary: { activeTasks: 0, blockedTasks: 0, queuedTasks: 0, completedTasks: 0 },
    blockers: [],
    nextActions: []
  };
}

function summarizeOpsField(events, field) {
  const counts = new Map();
  for (const event of events) {
    const key = event[field] || "unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([id, count]) => ({ id, label: id.replaceAll("-", " "), count }))
    .sort((left, right) => right.count - left.count || left.id.localeCompare(right.id));
}

function historySignalType(category) {
  const map = {
    "daily-history": "history",
    evaluation: "evaluation",
    plan: "plan",
    "request-trace": "trace",
    "user-request": "intake",
    "web-search": "web-search",
    "work-timing": "timing",
    "work-summary": "summary"
  };
  return map[category] || "history";
}

function historySignalLane(category) {
  const map = {
    evaluation: "verification",
    "web-search": "evidence",
    "work-timing": "monitoring",
    "request-trace": "traceability",
    "user-request": "intake",
    plan: "planning",
    "work-summary": "delivery",
    "daily-history": "history"
  };
  return map[category] || "history";
}

function historySignalSeverity(document) {
  const text = `${document.title} ${document.excerpt} ${document.path}`.toLowerCase();
  if (/rework_required|blocked|critical|fail|failed|unresolved|gap|warning|risk/.test(text)) {
    return "warning";
  }
  if (document.category === "evaluation" || document.category === "work-timing") {
    return "verified";
  }
  if (document.category === "web-search" || document.category === "request-trace") {
    return "evidence";
  }
  return "info";
}

function historySignalStatus(document) {
  const text = `${document.title} ${document.excerpt}`.toLowerCase();
  if (/ready_to_close|ready|passed|complete|completed|통과|완료/.test(text)) {
    return "ready";
  }
  if (/rework_required|failed|blocked|차단|실패/.test(text)) {
    return "needs_attention";
  }
  return document.category;
}

function taskSeverity(task, lane) {
  const text = `${task.status || ""} ${task.next_action || ""} ${task.evaluation_report || ""}`.toLowerCase();
  if (lane === "blocked" || /blocked|failed|failure|risk|decision|needs/.test(text)) {
    return "critical";
  }
  if (lane === "active" || lane === "queued") {
    return "attention";
  }
  if (lane === "completed") {
    return "verified";
  }
  return "info";
}

function severityRank(severity) {
  const ranks = {
    critical: 5,
    warning: 4,
    attention: 3,
    verified: 2,
    evidence: 1,
    info: 0
  };
  return ranks[severity] || 0;
}

export function collectSourceFiles(repoRoot, projects = []) {
  const roots = sourceRoots(repoRoot, projects);
  const seen = new Set();
  const files = [];

  for (const root of roots) {
    for (const filePath of walkFiles(root.path)) {
      const relativePath = toPosix(path.relative(repoRoot, filePath));
      if (seen.has(relativePath) || !isSourceFile(relativePath)) {
        continue;
      }
      const stats = fs.statSync(filePath);
      if (stats.size > MAX_SOURCE_FILE_BYTES) {
        continue;
      }
      seen.add(relativePath);
      files.push(readSourceFile(repoRoot, filePath, root.project));
    }
  }

  return files
    .sort((left, right) => left.path.localeCompare(right.path))
    .slice(0, MAX_SOURCE_FILES);
}

export function collectViewModeCatalog(repoRoot) {
  const registry = readJson(path.join(repoRoot, "agent-platform", "configs", "access", "view-mode-registry.json"), {
    default_mode: "superadmin_developer",
    modes: []
  });
  const modes = Array.isArray(registry.modes)
    ? registry.modes
        .filter((mode) => mode && typeof mode === "object")
        .map((mode) => ({
          id: mode.id || "",
          label: mode.label || mode.id || "",
          intent: mode.intent || "",
          allowedSections: Array.isArray(mode.allowed_sections) ? mode.allowed_sections : [],
          visibilityRules: mode.visibility_rules || {},
          securityNotes: Array.isArray(mode.security_notes) ? mode.security_notes : []
        }))
        .filter((mode) => mode.id)
    : [];

  return {
    defaultMode: registry.default_mode || "superadmin_developer",
    modes
  };
}

export function collectLanguageModeCatalog(repoRoot) {
  const registry = readJson(path.join(repoRoot, "agent-platform", "configs", "access", "language-mode-registry.json"), {
    default_mode: "all",
    modes: [
      {
        id: "all",
        label: "All Languages",
        display_label: "전체",
        intent: "Show every collected document.",
        included_languages: ["ko", "en"],
        include_unknown: true,
        document_rule: "Show documents tagged ko, en, or unknown."
      },
      {
        id: "ko",
        label: "Korean Only",
        display_label: "한국어만",
        intent: "Show only Korean documents.",
        included_languages: ["ko"],
        include_unknown: false,
        document_rule: "Show only documents tagged ko."
      },
      {
        id: "en",
        label: "English Only",
        display_label: "English Only",
        intent: "Show only English documents.",
        included_languages: ["en"],
        include_unknown: false,
        document_rule: "Show only documents tagged en."
      }
    ]
  });
  const modes = Array.isArray(registry.modes)
    ? registry.modes
        .filter((mode) => mode && typeof mode === "object")
        .map((mode) => ({
          id: mode.id || "",
          label: mode.display_label || mode.label || mode.id || "",
          intent: mode.intent || "",
          includedLanguages: Array.isArray(mode.included_languages) ? mode.included_languages : [],
          includeUnknown: Boolean(mode.include_unknown),
          documentRule: mode.document_rule || ""
        }))
        .filter((mode) => mode.id)
    : [];

  return {
    defaultMode: registry.default_mode || "all",
    modes
  };
}

const MONITOR_SECTION_OPTIONS = [
  {
    id: "overview",
    label: "Overview",
    description: "Command center, unified operations stream, and the mode/function switchboard.",
    location: "Top section tabs / Overview"
  },
  {
    id: "desktop",
    label: "Desktop",
    description: "Platform-first desktop runtime, CLI adapter health, task pipes, terminal events, decision inbox, and source editor.",
    location: "Top section tabs / Desktop"
  },
  {
    id: "projects",
    label: "Projects",
    description: "Registered project boundaries and project-level purpose.",
    location: "Top section tabs / Projects"
  },
  {
    id: "history",
    label: "History",
    description: "Dated work history, unified ops events, and category density.",
    location: "Top section tabs / History"
  },
  {
    id: "structure",
    label: "Structure",
    description: "Root folder policy, project homes, document categories, and history roots.",
    location: "Top section tabs / Structure"
  },
  {
    id: "documents",
    label: "Documents",
    description: "Collected docs, requirements, specs, plans, traces, evaluations, and rendered markdown previews.",
    location: "Top section tabs / Documents"
  },
  {
    id: "source",
    label: "Source",
    description: "Collected source files and code browsing for developer/superadmin views.",
    location: "Top section tabs / Source"
  },
  {
    id: "requirements",
    label: "Requirements",
    description: "Requirement records extracted from baselines and project requirement docs.",
    location: "Top section tabs / Requirements"
  },
  {
    id: "agents",
    label: "Agents",
    description: "Agent inventory, runtime status, collaboration lanes, blockers, and next actions.",
    location: "Top section tabs / Agents"
  }
];

const DESKTOP_SESSION_MODE_OPTIONS = [
  {
    id: "user_task",
    label: "User Task",
    description: "Deliver the user's task and defer only blocked decisions when the user is absent.",
    location: "Desktop / Run Board / Mode"
  },
  {
    id: "platform_improvement",
    label: "Platform Improvement",
    description: "Improve the platform while preserving requirements, specs, history, and validation.",
    location: "Desktop / Run Board / Mode"
  },
  {
    id: "knowledge_accumulation",
    label: "Knowledge Accumulation",
    description: "Turn messy output, logs, questions, and evidence into durable structured knowledge.",
    location: "Desktop / Run Board / Mode"
  },
  {
    id: "review_verify",
    label: "Review & Verify",
    description: "Check bugs, missing tests, unsupported claims, resource risks, and release blockers.",
    location: "Desktop / Run Board / Mode"
  }
];

const TASK_PIPE_OPTIONS = [
  {
    id: "platform_improvement_pipe",
    label: "Platform Improvement Pipe",
    description: "Fan out implementation, review, research, and fallback lanes from one task intake.",
    location: "Desktop / Task Pipe Init / Pipe preset"
  },
  {
    id: "knowledge_accumulation_pipe",
    label: "Knowledge Accumulation Pipe",
    description: "Fan out structuring, skeptic, and durable-record lanes from messy output.",
    location: "Desktop / Task Pipe Init / Pipe preset"
  },
  {
    id: "review_verify_pipe",
    label: "Review & Verify Pipe",
    description: "Fan out bug review, validation, and contrary lanes before release.",
    location: "Desktop / Task Pipe Init / Pipe preset"
  }
];

export function collectModeFunctionCatalog(repoRoot, viewModeCatalog, languageModeCatalog) {
  const workModePath = path.join(repoRoot, "agent-platform", "configs", "workflows", "work-mode-registry.json");
  const installModePath = path.join(repoRoot, "agent-platform", "configs", "installations", "install-mode-registry.json");
  const cliAdapterPath = path.join(repoRoot, "agent-platform", "configs", "integrations", "cli-adapter-registry.json");
  const workModeRegistry = readJson(workModePath, { default_mode: "standard", modes: [] });
  const installModeRegistry = readJson(installModePath, { default_mode: "user", modes: [] });
  const cliAdapterRegistry = readJson(cliAdapterPath, { supported_ai_cli_adapters: [] });

  const groups = [
    makeModeFunctionGroup({
      id: "view_mode",
      label: "View Mode",
      purpose: "Controls which monitor sections are visible for user, developer, and superadmin contexts.",
      selectorLocation: "Top bar / View Mode segmented control",
      defaultMode: viewModeCatalog.defaultMode,
      sourcePath: "agent-platform/configs/access/view-mode-registry.json",
      options: (viewModeCatalog.modes || []).map((mode) => ({
        id: mode.id,
        label: mode.label,
        description: mode.intent,
        location: mode.allowedSections?.length
          ? `Shows: ${mode.allowedSections.join(", ")}`
          : "Top bar / View Mode segmented control",
        status: mode.id === viewModeCatalog.defaultMode ? "default" : "available"
      }))
    }),
    makeModeFunctionGroup({
      id: "language_mode",
      label: "Language Mode",
      purpose: "Filters collected docs by Korean, English, or all language scopes.",
      selectorLocation: "Toolbar / Document filters / Language select",
      defaultMode: languageModeCatalog.defaultMode,
      sourcePath: "agent-platform/configs/access/language-mode-registry.json",
      options: (languageModeCatalog.modes || []).map((mode) => ({
        id: mode.id,
        label: mode.label,
        description: mode.intent || mode.documentRule,
        location: mode.documentRule || "Toolbar / Document filters / Language select",
        status: mode.id === languageModeCatalog.defaultMode ? "default" : "available"
      }))
    }),
    makeModeFunctionGroup({
      id: "work_mode",
      label: "Work Mode",
      purpose: "Selects task execution strictness and close-out gates before implementation or research work.",
      selectorLocation: "Task intake / _ops/workflows/02-select-work-mode.md / mode selection record",
      defaultMode: workModeRegistry.default_mode || "standard",
      sourcePath: "agent-platform/configs/workflows/work-mode-registry.json",
      options: normalizeRegistryModes(workModeRegistry.modes, workModeRegistry.default_mode, {
        descriptionFields: ["intent"],
        locationField: "closeout_gate",
        statusFields: ["enforcement_level"]
      })
    }),
    makeModeFunctionGroup({
      id: "install_mode",
      label: "Install Mode",
      purpose: "Separates end-user setup from developer improvement setup.",
      selectorLocation: "Setup flow / _ops/workflows/62-select-install-mode.md / install profile",
      defaultMode: installModeRegistry.default_mode || "user",
      sourcePath: "agent-platform/configs/installations/install-mode-registry.json",
      options: normalizeRegistryModes(installModeRegistry.modes, installModeRegistry.default_mode, {
        descriptionFields: ["intent"],
        locationField: "dependency_policy",
        statusFields: ["setup_posture", "audience"]
      })
    }),
    makeModeFunctionGroup({
      id: "desktop_session_mode",
      label: "Desktop Session Mode",
      purpose: "Changes the prompt posture for a CLI session launched from the platform-first desktop shell.",
      selectorLocation: "Desktop / Run Board / Mode",
      defaultMode: "user_task",
      sourcePath: "workspace-monitor/components/MonitorShell.tsx",
      desktopRuntime: true,
      options: DESKTOP_SESSION_MODE_OPTIONS
    }),
    makeModeFunctionGroup({
      id: "task_pipe",
      label: "Task Pipe Preset",
      purpose: "Initializes multi-CLI process lanes and merge gates from one task prompt.",
      selectorLocation: "Desktop / Task Pipe Init / Pipe preset",
      defaultMode: "platform_improvement_pipe",
      sourcePath: "platform-desktop-app/src-tauri/src/lib.rs",
      desktopRuntime: true,
      options: TASK_PIPE_OPTIONS
    }),
    makeModeFunctionGroup({
      id: "cli_adapter",
      label: "CLI Adapter",
      purpose: "Attaches Claude Code, Gemini CLI, Codex CLI, and OpenCode as optional guest capabilities.",
      selectorLocation: "Desktop / Capability Center and Run Board / Adapter",
      defaultMode: "",
      sourcePath: "agent-platform/configs/integrations/cli-adapter-registry.json",
      desktopRuntime: true,
      options: normalizeCliAdapters(cliAdapterRegistry.supported_ai_cli_adapters)
    }),
    makeModeFunctionGroup({
      id: "section_location",
      label: "Monitor Section",
      purpose: "Shows where core platform functions live inside the installable monitor surface.",
      selectorLocation: "Top section tabs",
      defaultMode: "overview",
      sourcePath: "workspace-monitor/components/MonitorShell.tsx",
      options: MONITOR_SECTION_OPTIONS
    })
  ];

  return {
    summary: {
      totalGroups: groups.length,
      totalOptions: groups.reduce((total, group) => total + group.optionCount, 0),
      explicitSelectors: groups.filter((group) => group.selectorLocation).length,
      registryBackedGroups: groups.filter((group) => group.sourcePath.includes("configs/")).length,
      desktopGroups: groups.filter((group) => group.desktopRuntime).length
    },
    groups
  };
}

function makeModeFunctionGroup({
  id,
  label,
  purpose,
  selectorLocation,
  defaultMode = "",
  sourcePath = "",
  desktopRuntime = false,
  options = []
}) {
  const normalizedOptions = options
    .filter((option) => option && option.id)
    .map((option) => ({
      id: option.id,
      label: option.label || option.id,
      description: option.description || "",
      location: option.location || selectorLocation,
      status: option.status || (option.id === defaultMode ? "default" : "available"),
      sourcePath: option.sourcePath || sourcePath
    }));
  return {
    id,
    label,
    purpose,
    selectorLocation,
    defaultMode,
    sourcePath,
    desktopRuntime,
    optionCount: normalizedOptions.length,
    options: normalizedOptions
  };
}

function normalizeRegistryModes(modes, defaultMode, config = {}) {
  if (!Array.isArray(modes)) {
    return [];
  }
  return modes
    .filter((mode) => mode && typeof mode === "object")
    .map((mode) => {
      const id = mode.id || mode.mode_id || "";
      const description = firstPresent(mode, config.descriptionFields || ["intent", "purpose", "summary"]);
      return {
        id,
        label: mode.display_label || mode.label || titleFromPath(id),
        description: normalizeReadableValue(description),
        location: normalizeReadableValue(mode[config.locationField]) || "",
        status:
          normalizeReadableValue(firstPresent(mode, config.statusFields || ["status", "default_state", "enforcement_level"])) ||
          (id === defaultMode ? "default" : "available")
      };
    })
    .filter((mode) => mode.id);
}

function normalizeCliAdapters(adapters) {
  if (!Array.isArray(adapters)) {
    return [];
  }
  return adapters
    .filter((adapter) => adapter && typeof adapter === "object")
    .map((adapter) => ({
      id: adapter.adapter_id || adapter.id || "",
      label: adapter.display_name || adapter.label || adapter.adapter_id || "",
      description: `${adapter.capability_class || "cli_adapter"} / ${adapter.runtime_role || "guest_adapter"}`,
      location: Array.isArray(adapter.expected_command_candidates)
        ? `Command candidates: ${adapter.expected_command_candidates.join(", ")}`
        : "Desktop / Capability Center and Run Board / Adapter",
      status: adapter.default_state || adapter.setup_posture || "optional_supported"
    }))
    .filter((adapter) => adapter.id);
}

function firstPresent(source, fields) {
  for (const field of fields || []) {
    if (source?.[field]) {
      return source[field];
    }
  }
  return "";
}

function normalizeReadableValue(value) {
  if (Array.isArray(value)) {
    return value.filter(Boolean).join(" / ");
  }
  if (value && typeof value === "object") {
    return Object.entries(value)
      .slice(0, 4)
      .map(([key, item]) => `${key}: ${normalizeReadableValue(item)}`)
      .join(" / ");
  }
  return value ? String(value) : "";
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

function collaborationLaneForTask(task) {
  const status = String(task?.status || "").toLowerCase();
  const blockers = Array.isArray(task?.blockers) ? task.blockers : [];
  if (blockers.length && !["completed", "done", "closed"].includes(status)) {
    return "blocked";
  }
  if (["in_progress", "running", "active", "working", "reviewing"].includes(status)) {
    return "active";
  }
  if (["blocked", "waiting", "paused"].includes(status)) {
    return "blocked";
  }
  if (["pending", "planned", "queued", "todo", "not_started"].includes(status)) {
    return "queued";
  }
  if (["completed", "complete", "done", "closed"].includes(status)) {
    return "completed";
  }
  return "other";
}

function priorityRank(priority = "") {
  const normalized = String(priority).toLowerCase();
  const ranks = {
    critical: 5,
    highest: 5,
    high: 4,
    must: 4,
    medium: 3,
    normal: 3,
    low: 2,
    optional: 1
  };
  return ranks[normalized] || 0;
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

function sourceRoots(repoRoot, projects = []) {
  const roots = [];
  for (const project of projects || []) {
    const projectPath = stripTrailingSlash(project.path || project.name || "");
    if (!projectPath || projectPath.startsWith("_")) {
      continue;
    }
    for (const dirName of SOURCE_DIR_NAMES) {
      const rootPath = path.join(repoRoot, projectPath, dirName);
      if (fs.existsSync(rootPath)) {
        roots.push({ project: project.name || projectPath, path: rootPath });
      }
    }
  }

  const toolsRoot = path.join(repoRoot, "_tools");
  if (fs.existsSync(toolsRoot)) {
    for (const entry of fs.readdirSync(toolsRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) {
        continue;
      }
      for (const dirName of ["src", "tests", "scripts"]) {
        const rootPath = path.join(toolsRoot, entry.name, dirName);
        if (fs.existsSync(rootPath)) {
          roots.push({ project: `_tools/${entry.name}`, path: rootPath });
        }
      }
    }
  }

  return roots;
}

function isSourceFile(relativePath) {
  const normalized = `/${relativePath}`;
  if (SOURCE_EXCLUDED_SEGMENTS.some((segment) => normalized.includes(segment))) {
    return false;
  }
  if (/package-lock\.json$|tsconfig\.tsbuildinfo$/.test(relativePath)) {
    return false;
  }
  return SOURCE_EXTENSIONS.has(path.extname(relativePath).toLowerCase());
}

function readSourceFile(repoRoot, filePath, project) {
  const relativePath = toPosix(path.relative(repoRoot, filePath));
  const content = fs.readFileSync(filePath, "utf8");
  const stats = fs.statSync(filePath);
  const truncated = content.length > MAX_SOURCE_CHARS;
  const preview = truncated ? content.slice(0, MAX_SOURCE_CHARS) : content;

  return {
    id: slugify(relativePath),
    path: relativePath,
    project,
    language: sourceLanguage(relativePath),
    extension: path.extname(relativePath).replace(/^\./, ""),
    sizeBytes: stats.size,
    lineCount: content.split(/\r?\n/).length,
    updatedAt: stats.mtime.toISOString(),
    truncated,
    content: preview
  };
}

function sourceLanguage(relativePath) {
  const extension = path.extname(relativePath).toLowerCase();
  const languages = {
    ".py": "python",
    ".js": "javascript",
    ".mjs": "javascript",
    ".cjs": "javascript",
    ".ts": "typescript",
    ".tsx": "tsx",
    ".css": "css",
    ".html": "html",
    ".json": "json",
    ".toml": "toml",
    ".yaml": "yaml",
    ".yml": "yaml",
    ".sh": "shell"
  };
  return languages[extension] || extension.replace(/^\./, "") || "unknown";
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
