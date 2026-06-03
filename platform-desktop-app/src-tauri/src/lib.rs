use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::{HashMap, HashSet};
use std::env;
use std::fs;
use std::io::{Read, Write};
use std::path::{Component, Path, PathBuf};
use std::process::{Child, ChildStdin, Command, Stdio};
use std::sync::{mpsc, Arc, Mutex};
use std::thread;
use std::time::{Duration, Instant, SystemTime, UNIX_EPOCH};
use tauri::{AppHandle, Manager, State};

#[derive(Serialize)]
struct HealthStatus {
    status: &'static str,
    shell: &'static str,
    ui_source: &'static str,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct InstallerShellRuntimeContractReport {
    status: String,
    source: String,
    contract_path: String,
    schema_version: String,
    name: String,
    purpose: String,
    boot_sequence_count: usize,
    enforcement_gate_count: usize,
    data_accumulation_target_count: usize,
    contract: Value,
}

struct AdapterDefinition {
    adapter_id: &'static str,
    label: &'static str,
    command: &'static str,
    version_args: &'static [&'static str],
    session_args: &'static [&'static str],
}

struct PipelineLaneDefinition {
    lane_id: &'static str,
    adapter_id: &'static str,
    role: &'static str,
    prompt_suffix: &'static str,
}

struct PipelineTaskPreset {
    task_kind: &'static str,
    label: &'static str,
    intent: &'static str,
    lanes: &'static [PipelineLaneDefinition],
    merge_gate: &'static str,
}

#[derive(Default)]
struct SessionStore {
    sessions: Mutex<HashMap<String, CliSession>>,
}

struct CliSession {
    session_id: String,
    task_run_id: String,
    task_kind: String,
    pipeline_id: Option<String>,
    lane_id: Option<String>,
    lane_role: Option<String>,
    adapter_id: String,
    label: String,
    command: String,
    child: Child,
    stdin: Option<ChildStdin>,
    output: Arc<Mutex<CliSessionOutput>>,
    stdout_handle: Option<thread::JoinHandle<()>>,
    stderr_handle: Option<thread::JoinHandle<()>>,
    started: Instant,
    timeout: Duration,
    max_output_bytes: usize,
    working_dir: PathBuf,
    started_at: String,
    prompt_preview: String,
    status: String,
    exit_code: Option<i32>,
    finished: bool,
    finished_at: Option<Instant>,
    defer_message_sent: bool,
    auto_defer_questions: bool,
    auto_defer_triggered: bool,
    decision_inbox_items: usize,
    deferred_prompt_keys: Vec<String>,
    decision_capture_error: Option<String>,
    task_record_path: Option<String>,
    stdout_log_path: Option<String>,
    stderr_log_path: Option<String>,
    persistence_error: Option<String>,
    last_persist_signature: String,
}

#[derive(Clone, Default)]
struct CliSessionOutput {
    stdout: String,
    stderr: String,
    stdout_truncated: bool,
    stderr_truncated: bool,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliAdapterStatus {
    adapter_id: &'static str,
    label: &'static str,
    command: &'static str,
    available: bool,
    resolved_path: Option<String>,
    version: Option<String>,
    last_error: Option<String>,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct CliDecisionPrompt {
    question: String,
    lane: String,
    impact: String,
    defer_message: String,
    resume_action: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliRunReport {
    adapter_id: &'static str,
    label: &'static str,
    command: &'static str,
    status: String,
    exit_code: Option<i32>,
    duration_ms: u128,
    output: String,
    stderr: String,
    decision_prompts: Vec<CliDecisionPrompt>,
    bounded: bool,
    max_output_bytes: usize,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliSessionReport {
    session_id: String,
    task_run_id: String,
    task_kind: String,
    pipeline_id: Option<String>,
    lane_id: Option<String>,
    lane_role: Option<String>,
    adapter_id: String,
    label: String,
    command: String,
    status: String,
    exit_code: Option<i32>,
    elapsed_ms: u128,
    stdout: String,
    stderr: String,
    decision_prompts: Vec<CliDecisionPrompt>,
    bounded: bool,
    max_output_bytes: usize,
    output_truncated: bool,
    working_dir: String,
    defer_message_sent: bool,
    auto_defer_questions: bool,
    auto_defer_triggered: bool,
    decision_inbox_items: usize,
    pending_decision_prompts: usize,
    deferred_prompt_count: usize,
    decision_capture_error: Option<String>,
    task_record_path: Option<String>,
    stdout_log_path: Option<String>,
    stderr_log_path: Option<String>,
    persistence_error: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliTaskPipelinePresetReport {
    task_kind: &'static str,
    label: &'static str,
    intent: &'static str,
    lane_count: usize,
    adapter_ids: Vec<&'static str>,
    merge_gate: &'static str,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliTaskPipelineLaneReport {
    lane_id: String,
    adapter_id: String,
    role: String,
    status: String,
    session: Option<CliSessionReport>,
    error: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliPipeEdgeReport {
    pipe_id: String,
    from_node: String,
    to_node: String,
    stream: String,
    mode: String,
    status: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliTaskPipelineInitReport {
    pipeline_id: String,
    task_kind: String,
    label: String,
    status: String,
    intent: String,
    working_dir: String,
    prompt_bytes: usize,
    started_sessions: usize,
    missing_lanes: usize,
    merge_gate: String,
    bounded: bool,
    max_output_bytes: usize,
    lanes: Vec<CliTaskPipelineLaneReport>,
    pipes: Vec<CliPipeEdgeReport>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliTaskRunRecordReport {
    record_id: String,
    session_id: String,
    task_run_id: String,
    task_kind: String,
    pipeline_id: Option<String>,
    lane_id: Option<String>,
    lane_role: Option<String>,
    adapter_id: String,
    label: String,
    command: String,
    status: String,
    exit_code: Option<i32>,
    started_at: String,
    updated_at: String,
    elapsed_ms: u128,
    working_dir: String,
    stdout_bytes: usize,
    stderr_bytes: usize,
    output_truncated: bool,
    decision_inbox_items: usize,
    pending_decision_prompts: usize,
    deferred_prompt_count: usize,
    auto_defer_questions: bool,
    auto_defer_triggered: bool,
    record_path: String,
    stdout_log_path: String,
    stderr_log_path: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliTaskRunDetailReport {
    record: CliTaskRunRecordReport,
    record_json: String,
    stdout_preview: String,
    stderr_preview: String,
    stdout_truncated: bool,
    stderr_truncated: bool,
    max_log_preview_bytes: usize,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliTaskRunPruneReport {
    status: String,
    keep_count: usize,
    before_count: usize,
    after_count: usize,
    removed_count: usize,
    removed_task_run_ids: Vec<String>,
    errors: Vec<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceTextFile {
    relative_path: String,
    content: String,
    size_bytes: usize,
    max_size_bytes: usize,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceTextFileEntry {
    id: String,
    path: String,
    project: String,
    language: String,
    extension: String,
    size_bytes: usize,
    line_count: usize,
    updated_at: String,
    truncated: bool,
    content: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceTextFileListReport {
    status: String,
    source: String,
    total_count: usize,
    returned_count: usize,
    truncated: bool,
    files: Vec<WorkspaceTextFileEntry>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceWriteReport {
    relative_path: String,
    size_bytes: usize,
    backup_path: String,
    status: String,
}

#[derive(Clone, Default, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct DesktopWorkspaceState {
    schema_version: String,
    active_workspace_path: String,
    active_workspace_source: String,
    repository_url: String,
    last_operation: String,
    last_status: String,
    created_at: String,
    updated_at: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopWorkspaceStateReport {
    schema_version: String,
    status: String,
    active_workspace_path: String,
    active_workspace_source: String,
    state_path: String,
    managed_workspace_root: String,
    fallback_workspace_path: String,
    git_available: bool,
    git_version: String,
    repository_url: String,
    last_operation: String,
    last_status: String,
    updated_at: String,
    summary: Vec<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct HumanDecisionItem {
    id: String,
    status: String,
    priority: String,
    source: String,
    created_at: String,
    question: String,
    impact: String,
    resume_action: String,
    session_id: Option<String>,
    adapter_id: Option<String>,
    answer_type: Option<String>,
    answer_text: Option<String>,
    answered_at: Option<String>,
    blocked_work_count: usize,
    unblocked_work_count: usize,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct HumanDecisionInboxReport {
    status: String,
    total_count: usize,
    open_count: usize,
    answered_count: usize,
    decisions: Vec<HumanDecisionItem>,
    updated_id: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DecisionResumeReport {
    inbox: HumanDecisionInboxReport,
    session: Option<CliSessionReport>,
    resume_status: String,
    resume_detail: String,
}

struct DecisionAnswerUpdate {
    report: HumanDecisionInboxReport,
    session_id: Option<String>,
}

struct ProcessOutput {
    status: String,
    exit_code: Option<i32>,
    stdout: String,
    stderr: String,
    duration_ms: u128,
}

struct TaskRunPersistPaths {
    record_path: String,
    stdout_log_path: String,
    stderr_log_path: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct RuntimeDataRootReport {
    id: String,
    label: String,
    plane: String,
    path: String,
    exists: bool,
    created: bool,
    visibility: String,
    purpose: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct RuntimeDataBoundaryReport {
    status: String,
    roots: Vec<RuntimeDataRootReport>,
    task_run_store_path: String,
    support_bundle_store_path: String,
    installer_payload_audit_path: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct AccumulatedDataStoreReport {
    id: String,
    label: String,
    record_type: String,
    plane: String,
    path: String,
    status: String,
    count: usize,
    size_bytes: u64,
    latest_updated_at: String,
    visibility: String,
    purpose: String,
    action_label: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct AccumulatedDataOverviewReport {
    schema_version: String,
    storage_format_version: String,
    status: String,
    generated_at: String,
    index_path: String,
    format_migration_status: String,
    total_records: usize,
    total_bytes: u64,
    bounded_scan_max_files: usize,
    stores: Vec<AccumulatedDataStoreReport>,
    summary: Vec<String>,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct InstallerPayloadFinding {
    rule_id: String,
    severity: String,
    path: String,
    reason: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct InstallerPayloadAuditReport {
    status: String,
    scanned_paths: Vec<String>,
    scanned_files: usize,
    scanned_bytes: u64,
    flagged_count: usize,
    findings: Vec<InstallerPayloadFinding>,
    skipped_dirs: Vec<String>,
    max_scan_files: usize,
    audit_path: String,
    created_at: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct SupportDiagnosticBundleReport {
    status: String,
    bundle_id: String,
    bundle_dir: String,
    manifest_path: String,
    runtime_roots_path: String,
    installer_payload_audit_path: String,
    task_run_summary_path: String,
    recent_events_path: String,
    included_files: Vec<String>,
    redacted: bool,
    created_at: String,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct ServiceReadinessCheck {
    id: String,
    label: String,
    status: String,
    detail: String,
    required_for_public: bool,
    required_for_internal: bool,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct ServiceReadinessGroup {
    id: String,
    label: String,
    status: String,
    passed_checks: usize,
    total_checks: usize,
    checks: Vec<ServiceReadinessCheck>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ServiceReadinessNextAction {
    check_id: String,
    label: String,
    status: String,
    action: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ServiceReadinessReport {
    status: String,
    release_lane: String,
    score: u8,
    generated_at: String,
    groups: Vec<ServiceReadinessGroup>,
    blockers: Vec<String>,
    public_blockers: Vec<String>,
    warnings: Vec<String>,
    next_actions: Vec<ServiceReadinessNextAction>,
    payload_audit_path: String,
    payload_flagged_count: usize,
    service_claim: String,
}

const MAX_HEALTH_OUTPUT_BYTES: usize = 20_000;
const HEALTH_TIMEOUT_MS: u64 = 2_500;
const MAX_SESSION_OUTPUT_BYTES: usize = 100_000;
const MAX_DECISION_SCAN_BYTES: usize = 32_000;
const SESSION_TIMEOUT_MS: u64 = 300_000;
const FINISHED_SESSION_RETENTION_MS: u64 = 30 * 60 * 1000;
const MAX_RETAINED_FINISHED_SESSIONS: usize = 40;
const MAX_SESSION_INPUT_BYTES: usize = 20_000;
const MAX_WORKSPACE_FILE_BYTES: usize = 1_000_000;
const DEFAULT_WORKSPACE_SOURCE_LIST_LIMIT: usize = 240;
const MAX_WORKSPACE_SOURCE_LIST_LIMIT: usize = 500;
const MAX_WORKSPACE_SOURCE_SCAN_ENTRIES: usize = 8_000;
const MAX_SOURCE_LIST_LINE_COUNT_BYTES: usize = 128_000;
const MAX_DECISION_ANSWER_BYTES: usize = 20_000;
const MAX_TASK_RUN_RECORDS: usize = 80;
const MAX_TASK_PROMPT_PREVIEW_CHARS: usize = 280;
const MAX_TASK_RUN_LOG_PREVIEW_BYTES: usize = 64_000;
const DEFAULT_TASK_RUN_PRUNE_KEEP_COUNT: usize = 30;
const MAX_PAYLOAD_SCAN_FILES: usize = 4_000;
const MAX_ACCUMULATED_DATA_SCAN_FILES: usize = 1_200;
const ACCUMULATED_DATA_INDEX_SCHEMA_VERSION: &str = "accumulated-data-overview.v1";
const ACCUMULATED_DATA_STORAGE_FORMAT_VERSION: &str = "file-record-stores+overview-manifest.v1";
const DESKTOP_WORKSPACE_STATE_SCHEMA_VERSION: &str = "desktop-workspace-state.v1";
const GIT_CLONE_TIMEOUT_MS: u64 = 120_000;
const MAX_GIT_CLONE_OUTPUT_BYTES: usize = 24_000;
const MAX_GIT_REPOSITORY_URL_BYTES: usize = 2_048;
const MAX_WORKSPACE_FOLDER_NAME_BYTES: usize = 120;
const MAX_SUPPORT_BUNDLE_RECENT_TASK_RUNS: usize = 20;
const MAX_SUPPORT_EVENT_CHARS: usize = 600;

const SOURCE_EDITOR_SKIP_DIRS: &[&str] = &[
    "_private",
    "outputs",
    ".git",
    ".next",
    ".turbo",
    "node_modules",
    "target",
    "dist",
    "build",
    "out",
    "coverage",
    ".venv",
    "__pycache__",
];

const SOURCE_EDITOR_TEXT_EXTENSIONS: &[&str] = &[
    "c", "cc", "cpp", "css", "en.md", "go", "h", "html", "java", "js", "json", "jsx", "ko.md",
    "md", "mjs", "py", "rs", "sh", "sql", "toml", "ts", "tsx", "txt", "yaml", "yml",
];
const DEFER_MESSAGE: &str = "I will pause this lane here and collect the user decision later. Please do not make a source-affecting decision now.";

static ADAPTERS: &[AdapterDefinition] = &[
    AdapterDefinition {
        adapter_id: "claude-code-cli",
        label: "Claude Code CLI",
        command: "claude",
        version_args: &["--version"],
        session_args: &[],
    },
    AdapterDefinition {
        adapter_id: "gemini-cli",
        label: "Gemini CLI",
        command: "gemini",
        version_args: &["--version"],
        session_args: &[],
    },
    AdapterDefinition {
        adapter_id: "codex-cli",
        label: "Codex CLI",
        command: "codex",
        version_args: &["--version"],
        session_args: &[],
    },
    AdapterDefinition {
        adapter_id: "opencode-cli",
        label: "OpenCode",
        command: "opencode",
        version_args: &["--version"],
        session_args: &[],
    },
];

static PLATFORM_IMPROVEMENT_LANES: &[PipelineLaneDefinition] = &[
    PipelineLaneDefinition {
        lane_id: "implementation_lane",
        adapter_id: "codex-cli",
        role: "implementation and source-edit lane",
        prompt_suffix: "Focus on scoped implementation. Emit source-affecting decisions as explicit questions.",
    },
    PipelineLaneDefinition {
        lane_id: "review_lane",
        adapter_id: "claude-code-cli",
        role: "requirements and review lane",
        prompt_suffix: "Check requirements, policy, risks, and missing validation before merge.",
    },
    PipelineLaneDefinition {
        lane_id: "research_lane",
        adapter_id: "gemini-cli",
        role: "research and alternative-discovery lane",
        prompt_suffix: "Look for comparable patterns and source-backed alternatives, then summarize uncertainty.",
    },
    PipelineLaneDefinition {
        lane_id: "fallback_build_lane",
        adapter_id: "opencode-cli",
        role: "fallback implementation and build lane",
        prompt_suffix: "Provide a second implementation path and call out conflicts with the primary lane.",
    },
];

static KNOWLEDGE_ACCUMULATION_LANES: &[PipelineLaneDefinition] = &[
    PipelineLaneDefinition {
        lane_id: "structure_lane",
        adapter_id: "gemini-cli",
        role: "unstructured output structuring lane",
        prompt_suffix: "Turn logs and mixed output into schema, provenance, null handling, and validation notes.",
    },
    PipelineLaneDefinition {
        lane_id: "skeptic_lane",
        adapter_id: "claude-code-cli",
        role: "grounding and skeptic lane",
        prompt_suffix: "Separate supported facts, unsupported claims, assumptions, and required user decisions.",
    },
    PipelineLaneDefinition {
        lane_id: "record_lane",
        adapter_id: "codex-cli",
        role: "durable record and validation lane",
        prompt_suffix: "Map accepted knowledge into requirements, specs, history, and evaluator-ready records.",
    },
];

static REVIEW_VERIFY_LANES: &[PipelineLaneDefinition] = &[
    PipelineLaneDefinition {
        lane_id: "bug_review_lane",
        adapter_id: "claude-code-cli",
        role: "bug, regression, and risk review lane",
        prompt_suffix: "Prioritize concrete bugs, regressions, missing tests, and source references.",
    },
    PipelineLaneDefinition {
        lane_id: "validation_lane",
        adapter_id: "codex-cli",
        role: "validation command and repair lane",
        prompt_suffix: "Run or propose validation commands, then isolate repairable failures from deferred work.",
    },
    PipelineLaneDefinition {
        lane_id: "contrary_lane",
        adapter_id: "gemini-cli",
        role: "contrary evidence and edge-case lane",
        prompt_suffix: "Find edge cases, contrary examples, and weak assumptions before merge.",
    },
];

static PIPELINE_PRESETS: &[PipelineTaskPreset] = &[
    PipelineTaskPreset {
        task_kind: "platform_improvement_pipe",
        label: "Platform Improvement Pipe",
        intent:
            "Initialize implementation, review, research, and fallback lanes for platform changes.",
        lanes: PLATFORM_IMPROVEMENT_LANES,
        merge_gate: "platform_merge_gate",
    },
    PipelineTaskPreset {
        task_kind: "knowledge_accumulation_pipe",
        label: "Knowledge Accumulation Pipe",
        intent: "Initialize structuring, skeptic, and record lanes for durable knowledge capture.",
        lanes: KNOWLEDGE_ACCUMULATION_LANES,
        merge_gate: "knowledge_merge_gate",
    },
    PipelineTaskPreset {
        task_kind: "review_verify_pipe",
        label: "Review & Verify Pipe",
        intent: "Initialize review, validation, and contrary lanes before release or merge.",
        lanes: REVIEW_VERIFY_LANES,
        merge_gate: "validation_merge_gate",
    },
];

#[tauri::command]
fn app_health() -> HealthStatus {
    HealthStatus {
        status: "ok",
        shell: "tauri",
        ui_source: "workspace-monitor",
    }
}

#[tauri::command]
fn get_installer_shell_runtime_contract(
    app: AppHandle,
) -> Result<InstallerShellRuntimeContractReport, String> {
    let (contract_path, source) = resolve_installer_shell_runtime_contract_path(&app)?;
    let content = fs::read_to_string(&contract_path).map_err(|error| {
        format!(
            "Failed to read installer shell runtime contract at {}: {error}",
            path_to_string(&contract_path)
        )
    })?;
    let contract: Value = serde_json::from_str(&content)
        .map_err(|error| format!("Installer shell runtime contract is invalid JSON: {error}"))?;
    let schema_version = contract
        .get("schema_version")
        .and_then(Value::as_str)
        .unwrap_or("unknown")
        .to_string();
    let name = contract
        .get("name")
        .and_then(Value::as_str)
        .unwrap_or("installer-shell-runtime-contract")
        .to_string();
    let purpose = contract
        .get("purpose")
        .and_then(Value::as_str)
        .unwrap_or("")
        .to_string();
    let boot_sequence_count = contract
        .get("shell_boot_sequence")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);
    let enforcement_gate_count = contract
        .get("enforcement_gates")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);
    let data_accumulation_target_count = contract
        .get("data_accumulation_targets")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);

    Ok(InstallerShellRuntimeContractReport {
        status: "ready".to_string(),
        source,
        contract_path: path_to_string(&contract_path),
        schema_version,
        name,
        purpose,
        boot_sequence_count,
        enforcement_gate_count,
        data_accumulation_target_count,
        contract,
    })
}

#[tauri::command]
fn list_cli_adapters() -> Vec<CliAdapterStatus> {
    ADAPTERS.iter().map(adapter_status).collect()
}

#[tauri::command]
fn run_cli_adapter_health(adapter_id: String) -> Result<CliRunReport, String> {
    let adapter =
        find_adapter(&adapter_id).ok_or_else(|| format!("Unknown adapter id: {adapter_id}"))?;
    Ok(run_adapter_health(adapter))
}

#[tauri::command]
fn run_all_cli_adapter_health() -> Vec<CliRunReport> {
    ADAPTERS.iter().map(run_adapter_health).collect()
}

#[tauri::command]
fn list_cli_task_pipeline_presets() -> Vec<CliTaskPipelinePresetReport> {
    PIPELINE_PRESETS
        .iter()
        .map(pipeline_preset_report)
        .collect()
}

#[tauri::command]
fn list_cli_task_run_records(app: AppHandle) -> Result<Vec<CliTaskRunRecordReport>, String> {
    read_task_run_records(&app)
}

#[tauri::command]
fn read_cli_task_run_record(
    app: AppHandle,
    task_run_id: String,
) -> Result<CliTaskRunDetailReport, String> {
    read_task_run_detail(&app, &task_run_id)
}

#[tauri::command]
fn prune_cli_task_run_records(
    app: AppHandle,
    keep_count: Option<usize>,
) -> Result<CliTaskRunPruneReport, String> {
    prune_task_run_records(&app, keep_count)
}

#[tauri::command]
fn list_runtime_data_roots(app: AppHandle) -> Result<RuntimeDataBoundaryReport, String> {
    runtime_data_boundary_report(&app)
}

#[tauri::command]
fn get_accumulated_data_overview(app: AppHandle) -> Result<AccumulatedDataOverviewReport, String> {
    accumulated_data_overview_report(&app)
}

#[tauri::command]
fn run_installer_payload_audit(app: AppHandle) -> Result<InstallerPayloadAuditReport, String> {
    run_installer_payload_audit_report(&app)
}

#[tauri::command]
fn create_support_diagnostic_bundle(
    app: AppHandle,
) -> Result<SupportDiagnosticBundleReport, String> {
    create_support_diagnostic_bundle_report(&app)
}

#[tauri::command]
fn get_service_readiness_report(app: AppHandle) -> Result<ServiceReadinessReport, String> {
    service_readiness_report(&app)
}

#[tauri::command]
fn get_desktop_workspace_state(app: AppHandle) -> Result<DesktopWorkspaceStateReport, String> {
    desktop_workspace_state_report(&app, None, None)
}

#[tauri::command]
fn set_desktop_workspace_path(
    app: AppHandle,
    path: String,
) -> Result<DesktopWorkspaceStateReport, String> {
    set_desktop_workspace_path_report(&app, &path)
}

#[tauri::command]
fn clone_desktop_workspace(
    app: AppHandle,
    repository_url: String,
    folder_name: Option<String>,
) -> Result<DesktopWorkspaceStateReport, String> {
    clone_desktop_workspace_report(&app, &repository_url, folder_name.as_deref())
}

#[tauri::command]
fn start_cli_adapter_session(
    app: AppHandle,
    store: State<'_, SessionStore>,
    adapter_id: String,
    prompt: String,
    working_dir: Option<String>,
    auto_defer_questions: Option<bool>,
) -> Result<CliSessionReport, String> {
    if prompt.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Prompt is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let adapter =
        find_adapter(&adapter_id).ok_or_else(|| format!("Unknown adapter id: {adapter_id}"))?;
    let working_dir = resolve_workspace_dir(&app, working_dir.as_deref())?;
    let (session_id, mut session, report) = create_cli_session(
        &app,
        adapter,
        &prompt,
        working_dir,
        auto_defer_questions.unwrap_or(true),
        "single_cli_session",
        None,
        None,
        None,
    )?;
    match store.sessions.lock() {
        Ok(mut sessions) => {
            cleanup_finished_sessions_locked(&mut sessions);
            sessions.insert(session_id, session);
        }
        Err(_) => {
            let _ = session.child.kill();
            let _ = session.child.wait();
            return Err("Failed to lock CLI session store.".to_string());
        }
    }
    Ok(report)
}

#[tauri::command]
fn start_cli_task_pipeline(
    app: AppHandle,
    store: State<'_, SessionStore>,
    task_kind: String,
    prompt: String,
    working_dir: Option<String>,
    auto_defer_questions: Option<bool>,
) -> Result<CliTaskPipelineInitReport, String> {
    if prompt.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Prompt is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let preset = find_pipeline_preset(&task_kind)
        .ok_or_else(|| format!("Unknown task pipe kind: {task_kind}"))?;
    let resolved_working_dir = resolve_workspace_dir(&app, working_dir.as_deref())?;
    let pipeline_id = new_session_id(preset.task_kind);
    let mut lane_reports = Vec::new();
    let mut pipe_reports = Vec::new();
    let mut pending_sessions: Vec<(String, CliSession)> = Vec::new();

    for lane in preset.lanes {
        let adapter = find_adapter(lane.adapter_id)
            .ok_or_else(|| format!("Unknown adapter id in pipe preset: {}", lane.adapter_id))?;
        if resolve_command(adapter.command).is_none() {
            let status = "capability_missing".to_string();
            lane_reports.push(CliTaskPipelineLaneReport {
                lane_id: lane.lane_id.to_string(),
                adapter_id: lane.adapter_id.to_string(),
                role: lane.role.to_string(),
                status: status.clone(),
                session: None,
                error: Some(format!(
                    "Command '{}' was not found on PATH.",
                    adapter.command
                )),
            });
            append_pipe_edges(
                &mut pipe_reports,
                &pipeline_id,
                lane.lane_id,
                preset.merge_gate,
                &status,
            );
            continue;
        }

        let lane_prompt = pipeline_lane_prompt(preset, lane, &prompt);
        if lane_prompt.len() > MAX_SESSION_INPUT_BYTES {
            let status = "init_failed".to_string();
            lane_reports.push(CliTaskPipelineLaneReport {
                lane_id: lane.lane_id.to_string(),
                adapter_id: lane.adapter_id.to_string(),
                role: lane.role.to_string(),
                status: status.clone(),
                session: None,
                error: Some(format!(
                    "Lane prompt is too large after pipe metadata was added. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
                )),
            });
            append_pipe_edges(
                &mut pipe_reports,
                &pipeline_id,
                lane.lane_id,
                preset.merge_gate,
                &status,
            );
            continue;
        }
        match create_cli_session(
            &app,
            adapter,
            &lane_prompt,
            resolved_working_dir.clone(),
            auto_defer_questions.unwrap_or(true),
            preset.task_kind,
            Some(&pipeline_id),
            Some(lane.lane_id),
            Some(lane.role),
        ) {
            Ok((session_id, session, report)) => {
                let status = report.status.clone();
                lane_reports.push(CliTaskPipelineLaneReport {
                    lane_id: lane.lane_id.to_string(),
                    adapter_id: lane.adapter_id.to_string(),
                    role: lane.role.to_string(),
                    status: status.clone(),
                    session: Some(report),
                    error: None,
                });
                append_pipe_edges(
                    &mut pipe_reports,
                    &pipeline_id,
                    lane.lane_id,
                    preset.merge_gate,
                    &status,
                );
                pending_sessions.push((session_id, session));
            }
            Err(error) => {
                let status = "init_failed".to_string();
                lane_reports.push(CliTaskPipelineLaneReport {
                    lane_id: lane.lane_id.to_string(),
                    adapter_id: lane.adapter_id.to_string(),
                    role: lane.role.to_string(),
                    status: status.clone(),
                    session: None,
                    error: Some(error),
                });
                append_pipe_edges(
                    &mut pipe_reports,
                    &pipeline_id,
                    lane.lane_id,
                    preset.merge_gate,
                    &status,
                );
            }
        }
    }

    let started_sessions = pending_sessions.len();
    let missing_lanes = lane_reports
        .iter()
        .filter(|lane| lane.status == "capability_missing")
        .count();
    let status = if started_sessions > 0 {
        "initialized"
    } else if missing_lanes == lane_reports.len() {
        "capability_missing"
    } else {
        "init_failed"
    };

    match store.sessions.lock() {
        Ok(mut sessions) => {
            cleanup_finished_sessions_locked(&mut sessions);
            for (session_id, session) in pending_sessions {
                sessions.insert(session_id, session);
            }
        }
        Err(_) => {
            for (_, mut session) in pending_sessions {
                let _ = session.child.kill();
                let _ = session.child.wait();
            }
            return Err("Failed to lock CLI session store.".to_string());
        }
    }

    Ok(CliTaskPipelineInitReport {
        pipeline_id,
        task_kind: preset.task_kind.to_string(),
        label: preset.label.to_string(),
        status: status.to_string(),
        intent: preset.intent.to_string(),
        working_dir: resolved_working_dir.to_string_lossy().to_string(),
        prompt_bytes: prompt.len(),
        started_sessions,
        missing_lanes,
        merge_gate: preset.merge_gate.to_string(),
        bounded: true,
        max_output_bytes: MAX_SESSION_OUTPUT_BYTES,
        lanes: lane_reports,
        pipes: pipe_reports,
    })
}

fn create_cli_session(
    app: &AppHandle,
    adapter: &'static AdapterDefinition,
    prompt: &str,
    working_dir: PathBuf,
    auto_defer_questions: bool,
    task_kind: &str,
    pipeline_id: Option<&str>,
    lane_id: Option<&str>,
    lane_role: Option<&str>,
) -> Result<(String, CliSession, CliSessionReport), String> {
    let path = resolve_command(adapter.command)
        .ok_or_else(|| format!("Command '{}' was not found on PATH.", adapter.command))?;
    let session_id = new_session_id(adapter.adapter_id);
    let task_run_id = format!("task-run-{session_id}");
    let mut child = Command::new(&path)
        .args(adapter.session_args)
        .current_dir(&working_dir)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|error| format!("Failed to start CLI session: {error}"))?;

    let mut stdin = match child.stdin.take() {
        Some(stdin) => stdin,
        None => {
            let _ = child.kill();
            let _ = child.wait();
            return Err("Failed to capture CLI stdin.".to_string());
        }
    };
    if !prompt.trim().is_empty() {
        if let Err(error) = stdin
            .write_all(prompt.as_bytes())
            .and_then(|_| stdin.write_all(b"\n"))
            .and_then(|_| stdin.flush())
        {
            let _ = child.kill();
            let _ = child.wait();
            return Err(format!("Failed to write initial prompt: {error}"));
        }
    }

    let stdout = match child.stdout.take() {
        Some(stdout) => stdout,
        None => {
            let _ = child.kill();
            let _ = child.wait();
            return Err("Failed to capture CLI stdout.".to_string());
        }
    };
    let stderr = match child.stderr.take() {
        Some(stderr) => stderr,
        None => {
            let _ = child.kill();
            let _ = child.wait();
            return Err("Failed to capture CLI stderr.".to_string());
        }
    };
    let output = Arc::new(Mutex::new(CliSessionOutput::default()));
    let stdout_output = Arc::clone(&output);
    let stderr_output = Arc::clone(&output);
    let stdout_handle = thread::spawn(move || {
        read_session_stream(stdout, stdout_output, true, MAX_SESSION_OUTPUT_BYTES);
    });
    let stderr_handle = thread::spawn(move || {
        read_session_stream(stderr, stderr_output, false, MAX_SESSION_OUTPUT_BYTES);
    });

    let mut session = CliSession {
        session_id: session_id.clone(),
        task_run_id,
        task_kind: task_kind.to_string(),
        pipeline_id: pipeline_id.map(ToOwned::to_owned),
        lane_id: lane_id.map(ToOwned::to_owned),
        lane_role: lane_role.map(ToOwned::to_owned),
        adapter_id: adapter.adapter_id.to_string(),
        label: adapter.label.to_string(),
        command: adapter.command.to_string(),
        child,
        stdin: Some(stdin),
        output,
        stdout_handle: Some(stdout_handle),
        stderr_handle: Some(stderr_handle),
        started: Instant::now(),
        timeout: Duration::from_millis(SESSION_TIMEOUT_MS),
        max_output_bytes: MAX_SESSION_OUTPUT_BYTES,
        working_dir,
        started_at: current_unix_millis_label(),
        prompt_preview: prompt_preview(prompt),
        status: "running".to_string(),
        exit_code: None,
        finished: false,
        finished_at: None,
        defer_message_sent: false,
        auto_defer_questions,
        auto_defer_triggered: false,
        decision_inbox_items: 0,
        deferred_prompt_keys: Vec::new(),
        decision_capture_error: None,
        task_record_path: None,
        stdout_log_path: None,
        stderr_log_path: None,
        persistence_error: None,
        last_persist_signature: String::new(),
    };
    let report = poll_session_locked(app, &session_id, &mut session);
    Ok((session_id, session, report))
}

#[tauri::command]
fn poll_cli_adapter_session(
    app: AppHandle,
    store: State<'_, SessionStore>,
    session_id: String,
) -> Result<CliSessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let report = {
        let session = sessions
            .get_mut(&session_id)
            .ok_or_else(|| format!("Unknown CLI session id: {session_id}"))?;
        poll_session_locked(&app, &session_id, session)
    };
    cleanup_finished_sessions_locked(&mut sessions);
    Ok(report)
}

#[tauri::command]
fn list_cli_adapter_sessions(
    app: AppHandle,
    store: State<'_, SessionStore>,
) -> Result<Vec<CliSessionReport>, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let reports: Vec<CliSessionReport> = sessions
        .iter_mut()
        .map(|(session_id, session)| poll_session_locked(&app, session_id, session))
        .collect();
    cleanup_finished_sessions_locked(&mut sessions);
    Ok(reports)
}

#[tauri::command]
fn write_cli_adapter_stdin(
    app: AppHandle,
    store: State<'_, SessionStore>,
    session_id: String,
    input: String,
) -> Result<CliSessionReport, String> {
    if input.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Input is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown CLI session id: {session_id}"))?;
    if session.finished {
        return Err("Cannot write stdin to a finished CLI session.".to_string());
    }
    let stdin = session
        .stdin
        .as_mut()
        .ok_or_else(|| "CLI session stdin is not available.".to_string())?;
    stdin
        .write_all(input.as_bytes())
        .and_then(|_| stdin.write_all(b"\n"))
        .and_then(|_| stdin.flush())
        .map_err(|error| format!("Failed to write stdin: {error}"))?;
    session.defer_message_sent = false;
    session.decision_capture_error = None;
    Ok(poll_session_locked(&app, &session_id, session))
}

#[tauri::command]
fn send_cli_adapter_defer_message(
    app: AppHandle,
    store: State<'_, SessionStore>,
    session_id: String,
) -> Result<CliSessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown CLI session id: {session_id}"))?;
    if session.finished {
        return Err("Cannot defer a finished CLI session.".to_string());
    }
    defer_session_questions_locked(&session_id, session, "manual")?;
    Ok(poll_session_locked(&app, &session_id, session))
}

#[tauri::command]
fn defer_all_cli_adapter_questions(
    app: AppHandle,
    store: State<'_, SessionStore>,
) -> Result<Vec<CliSessionReport>, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let mut reports = Vec::new();
    for (session_id, session) in sessions.iter_mut() {
        if !session.finished {
            if let Err(error) = defer_session_questions_locked(session_id, session, "bulk") {
                session.decision_capture_error = Some(error);
            }
        }
        reports.push(poll_session_locked(&app, session_id, session));
    }
    Ok(reports)
}

#[tauri::command]
fn cancel_cli_adapter_session(
    app: AppHandle,
    store: State<'_, SessionStore>,
    session_id: String,
) -> Result<CliSessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let report = {
        let session = sessions
            .get_mut(&session_id)
            .ok_or_else(|| format!("Unknown CLI session id: {session_id}"))?;
        if !session.finished {
            let status = kill_and_wait_child(&mut session.child);
            mark_session_finished(session, "canceled", status);
        }
        poll_session_locked(&app, &session_id, session)
    };
    cleanup_finished_sessions_locked(&mut sessions);
    Ok(report)
}

#[tauri::command]
fn read_workspace_text_file(
    app: AppHandle,
    relative_path: String,
) -> Result<WorkspaceTextFile, String> {
    let (path, normalized) = resolve_workspace_file(Some(&app), &relative_path, true)?;
    let metadata = path
        .metadata()
        .map_err(|error| format!("Failed to read file metadata: {error}"))?;
    if metadata.len() as usize > MAX_WORKSPACE_FILE_BYTES {
        return Err(format!(
            "File is too large for the desktop editor. Max size is {MAX_WORKSPACE_FILE_BYTES} bytes."
        ));
    }
    let content =
        fs::read_to_string(&path).map_err(|error| format!("Failed to read text file: {error}"))?;
    Ok(WorkspaceTextFile {
        relative_path: normalized,
        size_bytes: content.len(),
        content,
        max_size_bytes: MAX_WORKSPACE_FILE_BYTES,
    })
}

#[tauri::command]
fn list_workspace_text_files(
    app: AppHandle,
    filter: Option<String>,
    limit: Option<usize>,
) -> Result<WorkspaceTextFileListReport, String> {
    let root = workspace_root_for_app(Some(&app))?;
    let normalized_filter = filter.unwrap_or_default().trim().to_lowercase();
    let limit = limit
        .unwrap_or(DEFAULT_WORKSPACE_SOURCE_LIST_LIMIT)
        .clamp(1, MAX_WORKSPACE_SOURCE_LIST_LIMIT);
    let mut stack = vec![root.clone()];
    let mut scanned_entries = 0_usize;
    let mut files = Vec::new();
    let mut truncated = false;

    while let Some(dir) = stack.pop() {
        if scanned_entries >= MAX_WORKSPACE_SOURCE_SCAN_ENTRIES {
            truncated = true;
            break;
        }

        let entries = match fs::read_dir(&dir) {
            Ok(entries) => entries,
            Err(_) => continue,
        };

        for entry_result in entries {
            if scanned_entries >= MAX_WORKSPACE_SOURCE_SCAN_ENTRIES {
                truncated = true;
                break;
            }
            scanned_entries += 1;

            let entry = match entry_result {
                Ok(entry) => entry,
                Err(_) => continue,
            };
            let file_name = entry.file_name().to_string_lossy().to_string();
            let file_type = match entry.file_type() {
                Ok(file_type) => file_type,
                Err(_) => continue,
            };

            if file_type.is_symlink() {
                continue;
            }
            if file_type.is_dir() {
                if should_skip_source_editor_dir(&file_name) {
                    continue;
                }
                stack.push(entry.path());
                continue;
            }
            if !file_type.is_file() {
                continue;
            }

            let path = entry.path();
            let relative_path = workspace_relative_display_path(&root, &path);
            if !is_source_editor_text_path(&relative_path) {
                continue;
            }
            if !normalized_filter.is_empty()
                && !relative_path.to_lowercase().contains(&normalized_filter)
            {
                continue;
            }

            let metadata = match entry.metadata() {
                Ok(metadata) => metadata,
                Err(_) => continue,
            };
            files.push(workspace_text_file_entry(
                &root,
                &path,
                &relative_path,
                &metadata,
            ));
        }
    }

    files.sort_by(|left, right| left.path.cmp(&right.path));
    let total_count = files.len();
    if total_count > limit {
        truncated = true;
    }
    let files: Vec<WorkspaceTextFileEntry> = files.into_iter().take(limit).collect();
    Ok(WorkspaceTextFileListReport {
        status: "listed".to_string(),
        source: "runtime_workspace_scan".to_string(),
        total_count,
        returned_count: files.len(),
        truncated,
        files,
    })
}

#[tauri::command]
fn write_workspace_text_file(
    app: AppHandle,
    relative_path: String,
    content: String,
) -> Result<WorkspaceWriteReport, String> {
    if content.len() > MAX_WORKSPACE_FILE_BYTES {
        return Err(format!(
            "Content is too large for the desktop editor. Max size is {MAX_WORKSPACE_FILE_BYTES} bytes."
        ));
    }
    let root = workspace_root_for_app(Some(&app))?;
    let (path, normalized) = resolve_workspace_file(Some(&app), &relative_path, true)?;
    let original = fs::read(&path)
        .map_err(|error| format!("Failed to read original file for backup: {error}"))?;
    let backup_path = source_backup_path(&root, &normalized)?;
    if let Some(parent) = backup_path.parent() {
        fs::create_dir_all(parent)
            .map_err(|error| format!("Failed to create backup directory: {error}"))?;
    }
    fs::write(&backup_path, original)
        .map_err(|error| format!("Failed to write backup file: {error}"))?;
    fs::write(&path, content.as_bytes())
        .map_err(|error| format!("Failed to write workspace file: {error}"))?;
    Ok(WorkspaceWriteReport {
        relative_path: normalized,
        size_bytes: content.len(),
        backup_path: backup_path.to_string_lossy().to_string(),
        status: "written_with_backup".to_string(),
    })
}

#[tauri::command]
fn list_human_decision_inbox() -> Result<HumanDecisionInboxReport, String> {
    let (_, inbox) = read_human_decision_inbox_value()?;
    human_decision_report(&inbox, None)
}

#[tauri::command]
fn answer_human_decision(
    decision_id: String,
    answer_type: String,
    answer_text: String,
) -> Result<HumanDecisionInboxReport, String> {
    update_human_decision_answer(
        &decision_id,
        &answer_type,
        &answer_text,
        "User answered the decision from the desktop decision inbox.",
    )
    .map(|update| update.report)
}

#[tauri::command]
fn answer_and_resume_human_decision(
    app: AppHandle,
    store: State<'_, SessionStore>,
    decision_id: String,
    answer_type: String,
    answer_text: String,
) -> Result<DecisionResumeReport, String> {
    let update = update_human_decision_answer(
        &decision_id,
        &answer_type,
        &answer_text,
        "User answered the decision from the desktop decision inbox and requested CLI session resume.",
    )?;
    let Some(session_id) = update.session_id.clone() else {
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: None,
            resume_status: "no_session_link".to_string(),
            resume_detail:
                "The decision was answered, but it is not linked to an active CLI session."
                    .to_string(),
        });
    };

    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let Some(session) = sessions.get_mut(&session_id) else {
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: None,
            resume_status: "session_not_found".to_string(),
            resume_detail: format!(
                "The decision was answered, but CLI session {session_id} is not currently loaded."
            ),
        });
    };
    if session.finished {
        let report = poll_session_locked(&app, &session_id, session);
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: Some(report),
            resume_status: "session_finished".to_string(),
            resume_detail: format!(
                "The decision was answered, but CLI session {session_id} has already finished."
            ),
        });
    }
    let Some(stdin) = session.stdin.as_mut() else {
        let report = poll_session_locked(&app, &session_id, session);
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: Some(report),
            resume_status: "stdin_unavailable".to_string(),
            resume_detail: format!(
                "The decision was answered, but CLI session {session_id} cannot accept stdin."
            ),
        });
    };

    if let Err(error) = stdin
        .write_all(answer_text.as_bytes())
        .and_then(|_| stdin.write_all(b"\n"))
        .and_then(|_| stdin.flush())
    {
        let report = poll_session_locked(&app, &session_id, session);
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: Some(report),
            resume_status: "resume_failed".to_string(),
            resume_detail: format!("The decision was answered, but writing to CLI session {session_id} failed: {error}"),
        });
    }

    session.defer_message_sent = false;
    let report = poll_session_locked(&app, &session_id, session);
    Ok(DecisionResumeReport {
        inbox: update.report,
        session: Some(report),
        resume_status: "resumed".to_string(),
        resume_detail: format!("Decision answer was sent to CLI session {session_id}."),
    })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(SessionStore::default())
        .invoke_handler(tauri::generate_handler![
            app_health,
            get_installer_shell_runtime_contract,
            list_cli_adapters,
            run_cli_adapter_health,
            run_all_cli_adapter_health,
            list_cli_task_pipeline_presets,
            list_cli_task_run_records,
            read_cli_task_run_record,
            prune_cli_task_run_records,
            list_runtime_data_roots,
            get_accumulated_data_overview,
            run_installer_payload_audit,
            create_support_diagnostic_bundle,
            get_service_readiness_report,
            get_desktop_workspace_state,
            set_desktop_workspace_path,
            clone_desktop_workspace,
            start_cli_adapter_session,
            start_cli_task_pipeline,
            poll_cli_adapter_session,
            list_cli_adapter_sessions,
            write_cli_adapter_stdin,
            send_cli_adapter_defer_message,
            defer_all_cli_adapter_questions,
            cancel_cli_adapter_session,
            list_workspace_text_files,
            read_workspace_text_file,
            write_workspace_text_file,
            list_human_decision_inbox,
            answer_human_decision,
            answer_and_resume_human_decision
        ])
        .run(tauri::generate_context!())
        .expect("error while running Agent Workspace Platform desktop shell");
}

fn find_adapter(adapter_id: &str) -> Option<&'static AdapterDefinition> {
    ADAPTERS
        .iter()
        .find(|adapter| adapter.adapter_id == adapter_id)
}

fn find_pipeline_preset(task_kind: &str) -> Option<&'static PipelineTaskPreset> {
    PIPELINE_PRESETS
        .iter()
        .find(|preset| preset.task_kind == task_kind)
}

fn pipeline_preset_report(preset: &PipelineTaskPreset) -> CliTaskPipelinePresetReport {
    CliTaskPipelinePresetReport {
        task_kind: preset.task_kind,
        label: preset.label,
        intent: preset.intent,
        lane_count: preset.lanes.len(),
        adapter_ids: preset.lanes.iter().map(|lane| lane.adapter_id).collect(),
        merge_gate: preset.merge_gate,
    }
}

fn pipeline_lane_prompt(
    preset: &PipelineTaskPreset,
    lane: &PipelineLaneDefinition,
    prompt: &str,
) -> String {
    format!(
        "[Platform task pipe init]\nTask kind: {}\nPreset: {}\nLane id: {}\nLane role: {}\nMerge gate: {}\nPipe contract: read task input from stdin, stream stdout/stderr continuously, send questions as explicit decision prompts, and avoid source-affecting decisions until the platform merge gate accepts them.\n\nTask input:\n{}\n\nLane instruction:\n{}",
        preset.task_kind,
        preset.label,
        lane.lane_id,
        lane.role,
        preset.merge_gate,
        prompt,
        lane.prompt_suffix
    )
}

fn append_pipe_edges(
    pipes: &mut Vec<CliPipeEdgeReport>,
    pipeline_id: &str,
    lane_id: &str,
    merge_gate: &str,
    status: &str,
) {
    pipes.push(CliPipeEdgeReport {
        pipe_id: format!("{pipeline_id}_{lane_id}_stdin_init"),
        from_node: "task_intake".to_string(),
        to_node: lane_id.to_string(),
        stream: "stdin".to_string(),
        mode: "pipe_init".to_string(),
        status: status.to_string(),
    });
    pipes.push(CliPipeEdgeReport {
        pipe_id: format!("{pipeline_id}_{lane_id}_stdout_stderr_capture"),
        from_node: lane_id.to_string(),
        to_node: "platform_event_store".to_string(),
        stream: "stdout_stderr".to_string(),
        mode: "bounded_capture".to_string(),
        status: status.to_string(),
    });
    pipes.push(CliPipeEdgeReport {
        pipe_id: format!("{pipeline_id}_{lane_id}_decision_inbox"),
        from_node: lane_id.to_string(),
        to_node: "human_decision_inbox".to_string(),
        stream: "question_events".to_string(),
        mode: "decision_pipe".to_string(),
        status: status.to_string(),
    });
    pipes.push(CliPipeEdgeReport {
        pipe_id: format!("{pipeline_id}_{lane_id}_merge_gate"),
        from_node: lane_id.to_string(),
        to_node: merge_gate.to_string(),
        stream: "accepted_summary".to_string(),
        mode: "artifact_pipe".to_string(),
        status: status.to_string(),
    });
}

fn adapter_status(adapter: &AdapterDefinition) -> CliAdapterStatus {
    match resolve_command(adapter.command) {
        Some(path) => {
            let version = run_bounded_command(
                &path,
                adapter.version_args,
                Duration::from_millis(HEALTH_TIMEOUT_MS),
                MAX_HEALTH_OUTPUT_BYTES,
            )
            .ok()
            .and_then(|output| {
                first_non_empty_line(&output.stdout)
                    .or_else(|| first_non_empty_line(&output.stderr))
            });

            CliAdapterStatus {
                adapter_id: adapter.adapter_id,
                label: adapter.label,
                command: adapter.command,
                available: true,
                resolved_path: Some(path.to_string_lossy().to_string()),
                version,
                last_error: None,
            }
        }
        None => CliAdapterStatus {
            adapter_id: adapter.adapter_id,
            label: adapter.label,
            command: adapter.command,
            available: false,
            resolved_path: None,
            version: None,
            last_error: Some("Command was not found on PATH.".to_string()),
        },
    }
}

fn run_adapter_health(adapter: &AdapterDefinition) -> CliRunReport {
    let started = Instant::now();
    let Some(path) = resolve_command(adapter.command) else {
        return CliRunReport {
            adapter_id: adapter.adapter_id,
            label: adapter.label,
            command: adapter.command,
            status: "capability_missing".to_string(),
            exit_code: None,
            duration_ms: started.elapsed().as_millis(),
            output: String::new(),
            stderr: "Command was not found on PATH.".to_string(),
            decision_prompts: Vec::new(),
            bounded: true,
            max_output_bytes: MAX_HEALTH_OUTPUT_BYTES,
        };
    };

    match run_bounded_command(
        &path,
        adapter.version_args,
        Duration::from_millis(HEALTH_TIMEOUT_MS),
        MAX_HEALTH_OUTPUT_BYTES,
    ) {
        Ok(output) => {
            let combined = format!("{}\n{}", output.stdout, output.stderr);
            CliRunReport {
                adapter_id: adapter.adapter_id,
                label: adapter.label,
                command: adapter.command,
                status: output.status,
                exit_code: output.exit_code,
                duration_ms: output.duration_ms,
                output: output.stdout,
                stderr: output.stderr,
                decision_prompts: detect_decision_prompts(adapter, &combined),
                bounded: true,
                max_output_bytes: MAX_HEALTH_OUTPUT_BYTES,
            }
        }
        Err(error) => CliRunReport {
            adapter_id: adapter.adapter_id,
            label: adapter.label,
            command: adapter.command,
            status: "error".to_string(),
            exit_code: None,
            duration_ms: started.elapsed().as_millis(),
            output: String::new(),
            stderr: error,
            decision_prompts: Vec::new(),
            bounded: true,
            max_output_bytes: MAX_HEALTH_OUTPUT_BYTES,
        },
    }
}

fn run_bounded_command(
    path: &PathBuf,
    args: &[&str],
    timeout: Duration,
    max_output_bytes: usize,
) -> Result<ProcessOutput, String> {
    let started = Instant::now();
    let mut child = Command::new(path)
        .args(args)
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|error| format!("Failed to spawn command: {error}"))?;

    let stdout = match child.stdout.take() {
        Some(stdout) => stdout,
        None => {
            let _ = child.kill();
            let _ = child.wait();
            return Err("Failed to capture stdout.".to_string());
        }
    };
    let stderr = match child.stderr.take() {
        Some(stderr) => stderr,
        None => {
            let _ = child.kill();
            let _ = child.wait();
            return Err("Failed to capture stderr.".to_string());
        }
    };

    let stdout_handle = thread::spawn(move || read_limited(stdout, max_output_bytes));
    let stderr_handle = thread::spawn(move || read_limited(stderr, max_output_bytes));
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || loop {
        match child.try_wait() {
            Ok(Some(status)) => {
                let _ = tx.send((status.code(), false));
                break;
            }
            Ok(None) => {
                if started.elapsed() >= timeout {
                    let _ = child.kill();
                    let status = child.wait().ok().and_then(|value| value.code());
                    let _ = tx.send((status, true));
                    break;
                }
                thread::sleep(Duration::from_millis(40));
            }
            Err(_) => {
                let _ = child.kill();
                let _ = child.wait();
                let _ = tx.send((None, false));
                break;
            }
        }
    });

    let (exit_code, timed_out) = rx
        .recv_timeout(timeout + Duration::from_millis(500))
        .map_err(|error| format!("Failed to wait for command: {error}"))?;
    let stdout_bytes = stdout_handle
        .join()
        .map_err(|_| "Failed to join stdout reader.".to_string())?;
    let stderr_bytes = stderr_handle
        .join()
        .map_err(|_| "Failed to join stderr reader.".to_string())?;

    let stdout = String::from_utf8_lossy(&stdout_bytes).trim().to_string();
    let stderr = String::from_utf8_lossy(&stderr_bytes).trim().to_string();
    let status = if timed_out {
        "timed_out"
    } else if exit_code == Some(0) {
        "passed"
    } else {
        "failed"
    };

    Ok(ProcessOutput {
        status: status.to_string(),
        exit_code,
        stdout,
        stderr,
        duration_ms: started.elapsed().as_millis(),
    })
}

fn poll_session_locked(
    app: &AppHandle,
    session_id: &str,
    session: &mut CliSession,
) -> CliSessionReport {
    if !session.finished {
        match session.child.try_wait() {
            Ok(Some(status)) => {
                let next_status = if status.success() {
                    "exited".to_string()
                } else {
                    "failed".to_string()
                };
                mark_session_finished(session, next_status, status.code());
            }
            Ok(None) => {
                if session.started.elapsed() >= session.timeout {
                    let exit_code = kill_and_wait_child(&mut session.child);
                    mark_session_finished(session, "timed_out", exit_code);
                }
            }
            Err(_) => {
                let exit_code = kill_and_wait_child(&mut session.child);
                mark_session_finished(session, "error", exit_code);
            }
        }
    }

    if !session.finished {
        auto_defer_session_questions_locked(session_id, session);
    }
    join_finished_reader(&mut session.stdout_handle);
    join_finished_reader(&mut session.stderr_handle);
    let report = session_report(session_id, session);
    let persist_signature = task_run_persist_signature(&report);
    if session.task_record_path.is_none() || session.last_persist_signature != persist_signature {
        match persist_session_task_run(app, session_id, session, &report) {
            Ok(paths) => {
                session.task_record_path = Some(paths.record_path);
                session.stdout_log_path = Some(paths.stdout_log_path);
                session.stderr_log_path = Some(paths.stderr_log_path);
                session.persistence_error = None;
                session.last_persist_signature = persist_signature;
            }
            Err(error) => {
                session.persistence_error = Some(error);
            }
        }
    }
    session_report(session_id, session)
}

fn join_finished_reader(handle: &mut Option<thread::JoinHandle<()>>) {
    let should_join = handle
        .as_ref()
        .map(|value| value.is_finished())
        .unwrap_or(false);
    if should_join {
        if let Some(value) = handle.take() {
            let _ = value.join();
        }
    }
}

fn mark_session_finished(
    session: &mut CliSession,
    status: impl Into<String>,
    exit_code: Option<i32>,
) {
    session.exit_code = exit_code;
    session.status = status.into();
    session.finished = true;
    if session.finished_at.is_none() {
        session.finished_at = Some(Instant::now());
    }
    session.stdin.take();
}

fn kill_and_wait_child(child: &mut Child) -> Option<i32> {
    let _ = child.kill();
    child.wait().ok().and_then(|exit_status| exit_status.code())
}

fn cleanup_finished_sessions_locked(sessions: &mut HashMap<String, CliSession>) {
    let now = Instant::now();
    let retention = Duration::from_millis(FINISHED_SESSION_RETENTION_MS);
    let mut finished_sessions: Vec<(String, Instant)> = sessions
        .iter()
        .filter_map(|(session_id, session)| {
            if session.finished {
                Some((
                    session_id.clone(),
                    session.finished_at.unwrap_or(session.started),
                ))
            } else {
                None
            }
        })
        .collect();

    if finished_sessions.is_empty() {
        return;
    }

    finished_sessions.sort_by_key(|(_, finished_at)| *finished_at);
    let mut remove_ids = HashSet::new();
    for (session_id, finished_at) in &finished_sessions {
        let age = now.checked_duration_since(*finished_at).unwrap_or_default();
        if age >= retention {
            remove_ids.insert(session_id.clone());
        }
    }

    let retained_finished = finished_sessions.len().saturating_sub(remove_ids.len());
    if retained_finished > MAX_RETAINED_FINISHED_SESSIONS {
        let overflow = retained_finished - MAX_RETAINED_FINISHED_SESSIONS;
        let overflow_ids: Vec<String> = finished_sessions
            .iter()
            .filter(|(session_id, _)| !remove_ids.contains(session_id))
            .take(overflow)
            .map(|(session_id, _)| session_id.clone())
            .collect();
        remove_ids.extend(overflow_ids);
    }

    for session_id in remove_ids {
        if let Some(mut session) = sessions.remove(&session_id) {
            join_finished_reader(&mut session.stdout_handle);
            join_finished_reader(&mut session.stderr_handle);
        }
    }
}

fn session_report(session_id: &str, session: &CliSession) -> CliSessionReport {
    let output = session
        .output
        .lock()
        .map(|value| value.clone())
        .unwrap_or_default();
    let decision_output = recent_session_output(&output);
    let decision_prompts =
        detect_decision_prompts_for(&session.adapter_id, &session.label, &decision_output);
    let pending_decision_prompts = decision_prompts
        .iter()
        .filter(|prompt| {
            let key = decision_prompt_key(&prompt.question);
            !session
                .deferred_prompt_keys
                .iter()
                .any(|existing| existing == &key)
        })
        .count();
    let status = if !session.finished && session.defer_message_sent {
        "defer_message_sent".to_string()
    } else {
        session.status.clone()
    };

    CliSessionReport {
        session_id: session_id.to_string(),
        task_run_id: session.task_run_id.clone(),
        task_kind: session.task_kind.clone(),
        pipeline_id: session.pipeline_id.clone(),
        lane_id: session.lane_id.clone(),
        lane_role: session.lane_role.clone(),
        adapter_id: session.adapter_id.clone(),
        label: session.label.clone(),
        command: session.command.clone(),
        status,
        exit_code: session.exit_code,
        elapsed_ms: session.started.elapsed().as_millis(),
        stdout: output.stdout,
        stderr: output.stderr,
        decision_prompts,
        bounded: true,
        max_output_bytes: session.max_output_bytes,
        output_truncated: output.stdout_truncated || output.stderr_truncated,
        working_dir: session.working_dir.to_string_lossy().to_string(),
        defer_message_sent: session.defer_message_sent,
        auto_defer_questions: session.auto_defer_questions,
        auto_defer_triggered: session.auto_defer_triggered,
        decision_inbox_items: session.decision_inbox_items,
        pending_decision_prompts,
        deferred_prompt_count: session.deferred_prompt_keys.len(),
        decision_capture_error: session.decision_capture_error.clone(),
        task_record_path: session.task_record_path.clone(),
        stdout_log_path: session.stdout_log_path.clone(),
        stderr_log_path: session.stderr_log_path.clone(),
        persistence_error: session.persistence_error.clone(),
    }
}

fn read_session_stream<R: Read>(
    mut reader: R,
    output: Arc<Mutex<CliSessionOutput>>,
    is_stdout: bool,
    max_output_bytes: usize,
) {
    let mut buffer = [0_u8; 1024];

    loop {
        match reader.read(&mut buffer) {
            Ok(0) => break,
            Ok(read_count) => {
                let text = String::from_utf8_lossy(&buffer[..read_count]).to_string();
                if let Ok(mut locked) = output.lock() {
                    append_session_output(&mut locked, is_stdout, &text, max_output_bytes);
                }
            }
            Err(_) => break,
        }
    }
}

fn append_session_output(
    output: &mut CliSessionOutput,
    is_stdout: bool,
    text: &str,
    max_output_bytes: usize,
) {
    let (target, truncated) = if is_stdout {
        (&mut output.stdout, &mut output.stdout_truncated)
    } else {
        (&mut output.stderr, &mut output.stderr_truncated)
    };
    let remaining = max_output_bytes.saturating_sub(target.len());
    if remaining == 0 {
        *truncated = true;
        return;
    }
    if text.len() <= remaining {
        target.push_str(text);
    } else {
        let mut end = remaining;
        while end > 0 && !text.is_char_boundary(end) {
            end -= 1;
        }
        target.push_str(&text[..end]);
        *truncated = true;
    }
}

fn persist_session_task_run(
    app: &AppHandle,
    session_id: &str,
    session: &CliSession,
    report: &CliSessionReport,
) -> Result<TaskRunPersistPaths, String> {
    let root = workspace_root_for_app(Some(app))?;
    let run_dir = task_run_dir(app, &session.task_run_id)?;
    fs::create_dir_all(&run_dir)
        .map_err(|error| format!("Failed to create task run directory: {error}"))?;

    let record_path = run_dir.join("record.json");
    let stdout_log_path = run_dir.join("stdout.log");
    let stderr_log_path = run_dir.join("stderr.log");
    fs::write(&stdout_log_path, report.stdout.as_bytes())
        .map_err(|error| format!("Failed to write task run stdout log: {error}"))?;
    fs::write(&stderr_log_path, report.stderr.as_bytes())
        .map_err(|error| format!("Failed to write task run stderr log: {error}"))?;

    let relative_record_path = workspace_relative_display_path(&root, &record_path);
    let relative_stdout_path = workspace_relative_display_path(&root, &stdout_log_path);
    let relative_stderr_path = workspace_relative_display_path(&root, &stderr_log_path);
    let updated_at = current_unix_millis_label();
    let record = json!({
        "schema_version": 1,
        "record_id": format!("record-{session_id}"),
        "session_id": session.session_id.clone(),
        "task_run_id": session.task_run_id.clone(),
        "task_kind": session.task_kind.clone(),
        "pipeline_id": session.pipeline_id.clone(),
        "lane_id": session.lane_id.clone(),
        "lane_role": session.lane_role.clone(),
        "adapter_id": session.adapter_id.clone(),
        "label": session.label.clone(),
        "command": session.command.clone(),
        "status": report.status.clone(),
        "exit_code": report.exit_code,
        "started_at": session.started_at.clone(),
        "updated_at": updated_at,
        "elapsed_ms": u64::try_from(report.elapsed_ms).unwrap_or(u64::MAX),
        "working_dir": report.working_dir.clone(),
        "prompt_preview": session.prompt_preview.clone(),
        "stdout_bytes": report.stdout.len(),
        "stderr_bytes": report.stderr.len(),
        "output_truncated": report.output_truncated,
        "decision_inbox_items": report.decision_inbox_items,
        "pending_decision_prompts": report.pending_decision_prompts,
        "deferred_prompt_count": report.deferred_prompt_count,
        "auto_defer_questions": report.auto_defer_questions,
        "auto_defer_triggered": report.auto_defer_triggered,
        "defer_message_sent": report.defer_message_sent,
        "bounded": report.bounded,
        "max_output_bytes": report.max_output_bytes,
        "decision_prompts": report.decision_prompts.clone(),
        "paths": {
            "record": relative_record_path,
            "stdout_log": relative_stdout_path,
            "stderr_log": relative_stderr_path
        }
    });
    let formatted = serde_json::to_string_pretty(&record)
        .map_err(|error| format!("Failed to serialize task run record: {error}"))?;
    fs::write(&record_path, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write task run record: {error}"))?;

    Ok(TaskRunPersistPaths {
        record_path: relative_record_path,
        stdout_log_path: relative_stdout_path,
        stderr_log_path: relative_stderr_path,
    })
}

fn task_run_persist_signature(report: &CliSessionReport) -> String {
    [
        report.status.clone(),
        report
            .exit_code
            .map(|code| code.to_string())
            .unwrap_or_default(),
        report.stdout.len().to_string(),
        report.stderr.len().to_string(),
        report.output_truncated.to_string(),
        report.defer_message_sent.to_string(),
        report.auto_defer_triggered.to_string(),
        report.decision_inbox_items.to_string(),
        report.pending_decision_prompts.to_string(),
        report.deferred_prompt_count.to_string(),
        report.decision_capture_error.clone().unwrap_or_default(),
    ]
    .join("\u{1f}")
}

fn read_task_run_records(app: &AppHandle) -> Result<Vec<CliTaskRunRecordReport>, String> {
    read_task_run_records_with_limit(app, Some(MAX_TASK_RUN_RECORDS))
}

fn read_task_run_records_with_limit(
    app: &AppHandle,
    limit: Option<usize>,
) -> Result<Vec<CliTaskRunRecordReport>, String> {
    let root = workspace_root_for_app(Some(app))?;
    let runtime_base = task_runs_base_path(app)?;
    fs::create_dir_all(&runtime_base)
        .map_err(|error| format!("Failed to create runtime task run directory: {error}"))?;
    let legacy_base = legacy_task_runs_base_path(&root);
    let mut records = Vec::new();
    read_task_run_records_from_base(&root, &runtime_base, &mut records)?;
    if legacy_base.exists() && legacy_base != runtime_base {
        read_task_run_records_from_base(&root, &legacy_base, &mut records)?;
    }

    records.sort_by(|left, right| right.updated_at.cmp(&left.updated_at));
    records.dedup_by(|left, right| left.task_run_id == right.task_run_id);
    if let Some(limit) = limit {
        records.truncate(limit);
    }
    Ok(records)
}

fn read_task_run_records_from_base(
    root: &Path,
    base: &Path,
    records: &mut Vec<CliTaskRunRecordReport>,
) -> Result<(), String> {
    if !base.exists() {
        return Ok(());
    }

    for entry in
        fs::read_dir(base).map_err(|error| format!("Failed to read task run directory: {error}"))?
    {
        let Ok(entry) = entry else {
            continue;
        };
        let path = entry.path();
        if !path.is_dir() {
            continue;
        }
        let record_path = path.join("record.json");
        if !record_path.is_file() {
            continue;
        }
        let Ok(content) = fs::read_to_string(&record_path) else {
            continue;
        };
        let Ok(value) = serde_json::from_str::<Value>(&content) else {
            continue;
        };
        records.push(task_run_record_report_from_value(
            root,
            &record_path,
            &value,
        ));
    }
    Ok(())
}

fn read_task_run_detail(
    app: &AppHandle,
    task_run_id: &str,
) -> Result<CliTaskRunDetailReport, String> {
    let task_run_id = task_run_id.trim();
    if task_run_id.is_empty() {
        return Err("Task run id is required.".to_string());
    }

    let root = workspace_root_for_app(Some(app))?;
    let run_dir = resolve_task_run_dir(app, &root, task_run_id)?;
    let record_path = run_dir.join("record.json");
    if !record_path.is_file() {
        return Err(format!("Task run record was not found: {task_run_id}"));
    }

    let record_json = fs::read_to_string(&record_path)
        .map_err(|error| format!("Failed to read task run record: {error}"))?;
    let record_value: Value = serde_json::from_str(&record_json)
        .map_err(|error| format!("Failed to parse task run record: {error}"))?;
    let record = task_run_record_report_from_value(&root, &record_path, &record_value);
    let (stdout_preview, stdout_truncated) =
        read_bounded_text_preview(&run_dir.join("stdout.log"), MAX_TASK_RUN_LOG_PREVIEW_BYTES)?;
    let (stderr_preview, stderr_truncated) =
        read_bounded_text_preview(&run_dir.join("stderr.log"), MAX_TASK_RUN_LOG_PREVIEW_BYTES)?;

    Ok(CliTaskRunDetailReport {
        record,
        record_json,
        stdout_preview,
        stderr_preview,
        stdout_truncated,
        stderr_truncated,
        max_log_preview_bytes: MAX_TASK_RUN_LOG_PREVIEW_BYTES,
    })
}

fn prune_task_run_records(
    app: &AppHandle,
    keep_count: Option<usize>,
) -> Result<CliTaskRunPruneReport, String> {
    let root = workspace_root_for_app(Some(app))?;
    let base = task_runs_base_path(app)?;
    if !base.exists() {
        return Ok(CliTaskRunPruneReport {
            status: "no_task_run_store".to_string(),
            keep_count: keep_count.unwrap_or(DEFAULT_TASK_RUN_PRUNE_KEEP_COUNT),
            before_count: 0,
            after_count: 0,
            removed_count: 0,
            removed_task_run_ids: Vec::new(),
            errors: Vec::new(),
        });
    }

    let keep_count = keep_count
        .unwrap_or(DEFAULT_TASK_RUN_PRUNE_KEEP_COUNT)
        .clamp(1, MAX_TASK_RUN_RECORDS);
    let mut records = Vec::new();
    read_task_run_records_from_base(&root, &base, &mut records)?;
    records.sort_by(|left, right| right.updated_at.cmp(&left.updated_at));
    let before_count = records.len();
    let mut removed_task_run_ids = Vec::new();
    let mut errors = Vec::new();

    for record in records.iter().skip(keep_count) {
        match resolve_task_run_dir_in_base(&root, &base, &record.task_run_id) {
            Ok(run_dir) => {
                if let Err(error) = fs::remove_dir_all(&run_dir) {
                    errors.push(format!("{}: {error}", record.task_run_id));
                } else {
                    removed_task_run_ids.push(record.task_run_id.clone());
                }
            }
            Err(error) => errors.push(format!("{}: {error}", record.task_run_id)),
        }
    }

    let mut after_records = Vec::new();
    read_task_run_records_from_base(&root, &base, &mut after_records)?;
    let after_count = after_records.len();
    let status = if errors.is_empty() {
        "pruned".to_string()
    } else if removed_task_run_ids.is_empty() {
        "prune_failed".to_string()
    } else {
        "partially_pruned".to_string()
    };

    Ok(CliTaskRunPruneReport {
        status,
        keep_count,
        before_count,
        after_count,
        removed_count: removed_task_run_ids.len(),
        removed_task_run_ids,
        errors,
    })
}

fn task_run_record_report_from_value(
    root: &Path,
    record_path: &Path,
    value: &Value,
) -> CliTaskRunRecordReport {
    let paths = value.get("paths").unwrap_or(&Value::Null);
    CliTaskRunRecordReport {
        record_id: value_string(value, "record_id", "unknown-task-run-record"),
        session_id: value_string(value, "session_id", "unknown-session"),
        task_run_id: value_string(value, "task_run_id", "unknown-task-run"),
        task_kind: value_string(value, "task_kind", "unknown"),
        pipeline_id: value
            .get("pipeline_id")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        lane_id: value
            .get("lane_id")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        lane_role: value
            .get("lane_role")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        adapter_id: value_string(value, "adapter_id", "unknown-adapter"),
        label: value_string(value, "label", "Unknown CLI"),
        command: value_string(value, "command", ""),
        status: value_string(value, "status", "unknown"),
        exit_code: value
            .get("exit_code")
            .and_then(Value::as_i64)
            .map(|code| code as i32),
        started_at: value_string(value, "started_at", ""),
        updated_at: value_string(value, "updated_at", ""),
        elapsed_ms: value.get("elapsed_ms").and_then(Value::as_u64).unwrap_or(0) as u128,
        working_dir: value_string(value, "working_dir", ""),
        stdout_bytes: value
            .get("stdout_bytes")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        stderr_bytes: value
            .get("stderr_bytes")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        output_truncated: value
            .get("output_truncated")
            .and_then(Value::as_bool)
            .unwrap_or(false),
        decision_inbox_items: value
            .get("decision_inbox_items")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        pending_decision_prompts: value
            .get("pending_decision_prompts")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        deferred_prompt_count: value
            .get("deferred_prompt_count")
            .and_then(Value::as_u64)
            .unwrap_or(0) as usize,
        auto_defer_questions: value
            .get("auto_defer_questions")
            .and_then(Value::as_bool)
            .unwrap_or(false),
        auto_defer_triggered: value
            .get("auto_defer_triggered")
            .and_then(Value::as_bool)
            .unwrap_or(false),
        record_path: paths
            .get("record")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned)
            .unwrap_or_else(|| workspace_relative_display_path(root, record_path)),
        stdout_log_path: paths
            .get("stdout_log")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned)
            .unwrap_or_default(),
        stderr_log_path: paths
            .get("stderr_log")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned)
            .unwrap_or_default(),
    }
}

fn task_runs_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?.join("task-runs"))
}

fn legacy_task_runs_base_path(root: &Path) -> PathBuf {
    platform_artifacts_base_path(root).join("task-runs")
}

fn task_run_dir(app: &AppHandle, task_run_id: &str) -> Result<PathBuf, String> {
    Ok(task_runs_base_path(app)?.join(sanitize_file_name(task_run_id)))
}

fn resolve_task_run_dir(
    app: &AppHandle,
    root: &Path,
    task_run_id: &str,
) -> Result<PathBuf, String> {
    let runtime_base = task_runs_base_path(app)?;
    let runtime_dir = runtime_base.join(sanitize_file_name(task_run_id));
    if runtime_dir.exists() {
        return resolve_task_run_dir_in_base(root, &runtime_base, task_run_id);
    }
    let legacy_base = legacy_task_runs_base_path(root);
    let legacy_dir = legacy_base.join(sanitize_file_name(task_run_id));
    if legacy_dir.exists() {
        return resolve_task_run_dir_in_base(root, &legacy_base, task_run_id);
    }
    Err(format!("Task run record was not found: {task_run_id}"))
}

fn resolve_task_run_dir_in_base(
    root: &Path,
    base: &Path,
    task_run_id: &str,
) -> Result<PathBuf, String> {
    let run_dir = base.join(sanitize_file_name(task_run_id));
    let canonical_base = base
        .canonicalize()
        .map_err(|error| format!("Failed to resolve task run base directory: {error}"))?;
    let canonical_run_dir = run_dir
        .canonicalize()
        .map_err(|error| format!("Failed to resolve task run directory: {error}"))?;
    if canonical_run_dir.starts_with(root) {
        ensure_workspace_path(root, &canonical_run_dir)?;
    }
    if !canonical_run_dir.starts_with(&canonical_base) {
        return Err("Task run path is outside the task run store.".to_string());
    }
    if !canonical_run_dir.is_dir() {
        return Err("Task run path is not a directory.".to_string());
    }
    Ok(canonical_run_dir)
}

fn runtime_data_boundary_report(app: &AppHandle) -> Result<RuntimeDataBoundaryReport, String> {
    let mut roots = Vec::new();
    roots.push(runtime_root_report(
        "app_config",
        "App Config",
        "platform_config_store",
        app.path()
            .app_config_dir()
            .map_err(|error| format!("Failed to resolve app config directory: {error}"))?,
        "user_local_app_config",
        "Installer-safe configuration metadata and user settings.",
    )?);
    roots.push(runtime_root_report(
        "app_data",
        "App Data",
        "platform_data_store",
        app.path()
            .app_data_dir()
            .map_err(|error| format!("Failed to resolve app data directory: {error}"))?,
        "user_local_app_data",
        "Durable runtime records that must not be bundled into the platform source tree.",
    )?);
    roots.push(runtime_root_report(
        "app_local_data",
        "App Local Data",
        "platform_local_data_store",
        app.path()
            .app_local_data_dir()
            .map_err(|error| format!("Failed to resolve app local data directory: {error}"))?,
        "user_local_machine_data",
        "Machine-local runtime records and non-roaming state.",
    )?);
    roots.push(runtime_root_report(
        "app_cache",
        "App Cache",
        "cache_store",
        app.path()
            .app_cache_dir()
            .map_err(|error| format!("Failed to resolve app cache directory: {error}"))?,
        "user_local_cache",
        "Regenerable cache and transient acceleration data.",
    )?);
    roots.push(runtime_root_report(
        "app_log",
        "App Logs",
        "log_store",
        app.path()
            .app_log_dir()
            .map_err(|error| format!("Failed to resolve app log directory: {error}"))?,
        "user_local_logs",
        "Runtime health and support logs subject to redaction before export.",
    )?);
    roots.push(runtime_root_report(
        "runtime_store",
        "Runtime Store",
        "platform_data_store",
        runtime_data_store_base_path(app)?,
        "user_local_app_data",
        "Platform-owned runtime records, task runs, support bundles, and audits.",
    )?);
    roots.push(runtime_root_report(
        "task_run_store",
        "Task Run Store",
        "task_execution_store",
        task_runs_base_path(app)?,
        "user_local_app_data",
        "CLI task-run records and stdout/stderr logs outside platform source.",
    )?);
    roots.push(runtime_root_report(
        "agent_workspace",
        "Agent Workspace",
        "agent_workspace",
        agent_workspace_base_path(app)?,
        "user_local_app_data",
        "Runtime agent scratch and work artifacts separated from reusable agent definitions.",
    )?);
    roots.push(runtime_root_report(
        "support_bundles",
        "Support Bundles",
        "support_diagnostic_store",
        support_bundles_base_path(app)?,
        "user_local_app_data",
        "Redacted support export bundles.",
    )?);
    roots.push(runtime_root_report(
        "payload_audits",
        "Payload Audits",
        "installer_payload_audit_store",
        payload_audits_base_path(app)?,
        "user_local_app_data",
        "Installer bundle scan reports.",
    )?);

    Ok(RuntimeDataBoundaryReport {
        status: "ready".to_string(),
        task_run_store_path: path_to_string(&task_runs_base_path(app)?),
        support_bundle_store_path: path_to_string(&support_bundles_base_path(app)?),
        installer_payload_audit_path: path_to_string(&payload_audits_base_path(app)?),
        roots,
    })
}

fn runtime_root_report(
    id: &str,
    label: &str,
    plane: &str,
    path: PathBuf,
    visibility: &str,
    purpose: &str,
) -> Result<RuntimeDataRootReport, String> {
    let existed_before = path.exists();
    fs::create_dir_all(&path)
        .map_err(|error| format!("Failed to create runtime data root {id}: {error}"))?;
    Ok(RuntimeDataRootReport {
        id: id.to_string(),
        label: label.to_string(),
        plane: plane.to_string(),
        path: path_to_string(&path),
        exists: path.exists(),
        created: !existed_before,
        visibility: visibility.to_string(),
        purpose: purpose.to_string(),
    })
}

fn accumulated_data_overview_report(
    app: &AppHandle,
) -> Result<AccumulatedDataOverviewReport, String> {
    let generated_at = current_unix_millis_label();
    let task_runs = read_task_run_records_with_limit(app, Some(MAX_TASK_RUN_RECORDS))?;
    let task_run_path = task_runs_base_path(app)?;
    let support_path = support_bundles_base_path(app)?;
    let payload_audit_path = payload_audits_base_path(app)?;
    let agent_workspace_path = agent_workspace_base_path(app)?;
    let runtime_store_path = runtime_data_store_base_path(app)?;
    let index_path = accumulated_data_index_path(app)?;

    for path in [
        &runtime_store_path,
        &task_run_path,
        &support_path,
        &payload_audit_path,
        &agent_workspace_path,
    ] {
        fs::create_dir_all(path)
            .map_err(|error| format!("Failed to create accumulated data store: {error}"))?;
    }

    let mut stores = Vec::new();
    let task_run_stats = directory_data_stats(&task_run_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "task_run_store",
        "Task Runs",
        "task-run records",
        "task_execution_store",
        &task_run_path,
        task_runs.len(),
        task_run_stats.size_bytes,
        task_runs
            .first()
            .map(|record| record.updated_at.clone())
            .unwrap_or_else(|| directory_latest_modified_label(&task_run_stats)),
        "user_visible_runtime_data",
        "CLI task execution records, record JSON, stdout logs, and stderr logs.",
        "Open Logs",
        task_run_stats.scan_truncated,
    ));

    let decision_path = workspace_root()?
        .join("_ops")
        .join("coordination")
        .join("human-decision-inbox.json");
    let decision_store = match read_human_decision_inbox_value() {
        Ok((inbox_path, inbox)) => {
            let report = human_decision_report(&inbox, None)?;
            let stats = single_file_data_stats(&inbox_path);
            accumulated_data_store_report(
                "decision_inbox",
                "Decision Inbox",
                "human decisions",
                "decision_store",
                &inbox_path,
                report.total_count,
                stats.size_bytes,
                directory_latest_modified_label(&stats),
                "user_visible_workspace_data",
                "Human-answerable questions, answers, blocked work, and resume actions.",
                "Answer & Resume",
                false,
            )
        }
        Err(_) => accumulated_data_store_report(
            "decision_inbox",
            "Decision Inbox",
            "human decisions",
            "decision_store",
            &decision_path,
            0,
            0,
            String::new(),
            "user_visible_workspace_data",
            "Human-answerable questions, answers, blocked work, and resume actions.",
            "Create inbox",
            false,
        ),
    };
    stores.push(decision_store);

    let support_stats = directory_data_stats(&support_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "support_bundles",
        "Support Bundles",
        "diagnostic bundles",
        "support_diagnostic_store",
        &support_path,
        count_immediate_dirs(&support_path, MAX_ACCUMULATED_DATA_SCAN_FILES),
        support_stats.size_bytes,
        directory_latest_modified_label(&support_stats),
        "user_exported_on_demand",
        "Redacted support diagnostic exports created by explicit user action.",
        "Export bundle",
        support_stats.scan_truncated,
    ));

    let payload_stats = directory_data_stats(&payload_audit_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "payload_audits",
        "Payload Audits",
        "installer audit reports",
        "installer_payload_audit_store",
        &payload_audit_path,
        count_immediate_files_with_extension(
            &payload_audit_path,
            "json",
            MAX_ACCUMULATED_DATA_SCAN_FILES,
        ),
        payload_stats.size_bytes,
        directory_latest_modified_label(&payload_stats),
        "developer_visible_user_safe_summary",
        "Installer payload scan reports that protect customers from source or private-file leakage.",
        "Review audit",
        payload_stats.scan_truncated,
    ));

    let agent_workspace_stats =
        directory_data_stats(&agent_workspace_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "agent_workspace",
        "Agent Workspace",
        "agent work artifacts",
        "agent_workspace",
        &agent_workspace_path,
        agent_workspace_stats
            .file_count
            .saturating_add(agent_workspace_stats.dir_count),
        agent_workspace_stats.size_bytes,
        directory_latest_modified_label(&agent_workspace_stats),
        "advanced_visible_runtime_data",
        "Runtime agent scratch, generated work artifacts, and task work folders.",
        "Inspect workspace",
        agent_workspace_stats.scan_truncated,
    ));

    let total_records = stores.iter().map(|store| store.count).sum();
    let total_bytes = stores
        .iter()
        .fold(0_u64, |total, store| total.saturating_add(store.size_bytes));
    let stores_with_data = stores.iter().filter(|store| store.count > 0).count();
    let summary = vec![
        format!("{} data stores indexed.", stores.len()),
        format!("{total_records} accumulated records are visible from the desktop shell."),
        format!(
            "{} stores currently contain data; scans are bounded to {} files per store.",
            stores_with_data, MAX_ACCUMULATED_DATA_SCAN_FILES
        ),
        "The overview exposes runtime data paths without exposing the platform source tree as the product surface.".to_string(),
        format!(
            "A versioned accumulated-data index manifest is written to {} for stable UI reads.",
            path_to_string(&index_path)
        ),
    ];
    let status = if total_records == 0 {
        "empty_ready"
    } else if stores.iter().any(|store| store.status == "bounded") {
        "indexed_bounded"
    } else {
        "indexed"
    }
    .to_string();

    let report = AccumulatedDataOverviewReport {
        schema_version: ACCUMULATED_DATA_INDEX_SCHEMA_VERSION.to_string(),
        storage_format_version: ACCUMULATED_DATA_STORAGE_FORMAT_VERSION.to_string(),
        status,
        generated_at,
        index_path: path_to_string(&index_path),
        format_migration_status: "manifest_v1_active".to_string(),
        total_records,
        total_bytes,
        bounded_scan_max_files: MAX_ACCUMULATED_DATA_SCAN_FILES,
        stores,
        summary,
    };

    write_pretty_json(&index_path, &report)
        .map_err(|error| format!("Failed to write accumulated data index manifest: {error}"))?;

    Ok(report)
}

fn accumulated_data_store_report(
    id: &str,
    label: &str,
    record_type: &str,
    plane: &str,
    path: &Path,
    count: usize,
    size_bytes: u64,
    latest_updated_at: String,
    visibility: &str,
    purpose: &str,
    action_label: &str,
    scan_truncated: bool,
) -> AccumulatedDataStoreReport {
    let status = if !path.exists() {
        "missing"
    } else if scan_truncated {
        "bounded"
    } else if count == 0 {
        "empty"
    } else {
        "available"
    };

    AccumulatedDataStoreReport {
        id: id.to_string(),
        label: label.to_string(),
        record_type: record_type.to_string(),
        plane: plane.to_string(),
        path: path_to_string(path),
        status: status.to_string(),
        count,
        size_bytes,
        latest_updated_at,
        visibility: visibility.to_string(),
        purpose: purpose.to_string(),
        action_label: action_label.to_string(),
    }
}

#[derive(Default)]
struct DirectoryDataStats {
    file_count: usize,
    dir_count: usize,
    size_bytes: u64,
    latest_modified_ms: Option<u128>,
    scan_truncated: bool,
}

fn directory_data_stats(path: &Path, max_files: usize) -> DirectoryDataStats {
    let mut stats = DirectoryDataStats::default();
    scan_directory_data_stats(path, &mut stats, max_files);
    stats
}

fn single_file_data_stats(path: &Path) -> DirectoryDataStats {
    let mut stats = DirectoryDataStats::default();
    if let Ok(metadata) = fs::symlink_metadata(path) {
        stats.file_count = 1;
        stats.size_bytes = metadata.len();
        merge_latest_modified(&mut stats, &metadata);
    }
    stats
}

fn scan_directory_data_stats(path: &Path, stats: &mut DirectoryDataStats, max_files: usize) {
    if stats.file_count >= max_files {
        stats.scan_truncated = true;
        return;
    }

    let Ok(entries) = fs::read_dir(path) else {
        return;
    };
    for entry in entries.flatten() {
        let entry_path = entry.path();
        let Ok(metadata) = fs::symlink_metadata(&entry_path) else {
            continue;
        };
        if metadata.file_type().is_symlink() {
            continue;
        }
        merge_latest_modified(stats, &metadata);
        if metadata.is_dir() {
            stats.dir_count = stats.dir_count.saturating_add(1);
            scan_directory_data_stats(&entry_path, stats, max_files);
        } else if metadata.is_file() {
            stats.file_count = stats.file_count.saturating_add(1);
            stats.size_bytes = stats.size_bytes.saturating_add(metadata.len());
        }

        if stats.file_count >= max_files {
            stats.scan_truncated = true;
            break;
        }
    }
}

fn merge_latest_modified(stats: &mut DirectoryDataStats, metadata: &fs::Metadata) {
    let Ok(modified) = metadata.modified() else {
        return;
    };
    let Ok(duration) = modified.duration_since(UNIX_EPOCH) else {
        return;
    };
    let modified_ms = duration.as_millis();
    if stats
        .latest_modified_ms
        .map(|current| modified_ms > current)
        .unwrap_or(true)
    {
        stats.latest_modified_ms = Some(modified_ms);
    }
}

fn directory_latest_modified_label(stats: &DirectoryDataStats) -> String {
    stats
        .latest_modified_ms
        .map(|value| value.to_string())
        .unwrap_or_default()
}

fn count_immediate_dirs(path: &Path, max_entries: usize) -> usize {
    count_immediate_entries(path, max_entries, |metadata| metadata.is_dir())
}

fn count_immediate_files_with_extension(path: &Path, extension: &str, max_entries: usize) -> usize {
    let extension = extension.to_ascii_lowercase();
    let Ok(entries) = fs::read_dir(path) else {
        return 0;
    };
    entries
        .flatten()
        .take(max_entries)
        .filter(|entry| {
            let entry_path = entry.path();
            let has_extension = entry_path
                .extension()
                .and_then(|value| value.to_str())
                .map(|value| value.eq_ignore_ascii_case(&extension))
                .unwrap_or(false);
            has_extension
                && fs::symlink_metadata(&entry_path)
                    .map(|metadata| !metadata.file_type().is_symlink() && metadata.is_file())
                    .unwrap_or(false)
        })
        .count()
}

fn count_immediate_entries<F>(path: &Path, max_entries: usize, predicate: F) -> usize
where
    F: Fn(&fs::Metadata) -> bool,
{
    let Ok(entries) = fs::read_dir(path) else {
        return 0;
    };
    entries
        .flatten()
        .take(max_entries)
        .filter(|entry| {
            fs::symlink_metadata(entry.path())
                .map(|metadata| !metadata.file_type().is_symlink() && predicate(&metadata))
                .unwrap_or(false)
        })
        .count()
}

fn service_readiness_report(app: &AppHandle) -> Result<ServiceReadinessReport, String> {
    let generated_at = current_unix_millis_label();
    let runtime_roots = runtime_data_boundary_report(app)?;
    let payload_audit = run_installer_payload_audit_report(app)?;
    let workspace_state = desktop_workspace_state_report(app, None, None)?;
    let roots_ready = runtime_roots.roots.iter().all(|root| root.exists);
    let has_payload_high_findings = payload_audit
        .findings
        .iter()
        .any(|finding| finding.severity == "high");
    let update_channel_configured = service_update_channel_configured(app);

    let groups = vec![
        service_readiness_group(
            "runtime_data",
            "Runtime Data Boundary",
            vec![
                service_readiness_check(
                    "runtime_roots_ready",
                    "Runtime roots are ready",
                    roots_ready,
                    &format!("{} runtime roots checked.", runtime_roots.roots.len()),
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "task_run_store_outside_source",
                    "Task-run store is outside source",
                    !runtime_roots.task_run_store_path.is_empty(),
                    &runtime_roots.task_run_store_path,
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "agent_workspace_plane",
                    "Agent workspace plane is separated",
                    runtime_roots
                        .roots
                        .iter()
                        .any(|root| root.id == "agent_workspace" && root.exists),
                    "Agent runtime work is stored outside reusable agent definitions.",
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "customer_payload",
            "Customer Payload",
            vec![
                service_readiness_check(
                    "payload_audit_clean",
                    "Installer payload has no high findings",
                    !has_payload_high_findings,
                    &format!(
                        "{} findings across {} scanned files.",
                        payload_audit.flagged_count, payload_audit.scanned_files
                    ),
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "payload_audit_bounded",
                    "Payload scan is bounded",
                    payload_audit.scanned_files <= payload_audit.max_scan_files,
                    &format!("max {} files", payload_audit.max_scan_files),
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "support_diagnostics",
            "Support Diagnostics",
            vec![
                service_readiness_check(
                    "support_store_ready",
                    "Support bundle store is ready",
                    !runtime_roots.support_bundle_store_path.is_empty(),
                    &runtime_roots.support_bundle_store_path,
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "support_export_redacted",
                    "Support export policy is redacted",
                    true,
                    "Support bundle command exports redacted bounded summaries.",
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "workspace_onboarding",
            "Workspace Onboarding",
            vec![
                service_readiness_check(
                    "workspace_roots_visible",
                    "Runtime workspace roots are visible",
                    runtime_roots
                        .roots
                        .iter()
                        .any(|root| root.id == "agent_workspace" && root.exists),
                    "Agent workspace root is visible to the operator.",
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "first_run_workspace_chooser_enforced",
                    "First-run workspace chooser is enforced",
                    workspace_state.status == "workspace_selected",
                    &format!(
                        "{} / {}",
                        workspace_state.active_workspace_source, workspace_state.active_workspace_path
                    ),
                    "warning",
                    true,
                    false,
                ),
            ],
        ),
        service_readiness_group(
            "privacy_logging",
            "Privacy & Logging",
            vec![
                service_readiness_check(
                    "private_payload_guard",
                    "Private/source payload guard is active",
                    !has_payload_high_findings,
                    "Payload audit blocks private vault and source-tree leakage.",
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "diagnostics_are_bounded",
                    "Diagnostics are bounded",
                    true,
                    &format!(
                        "Support summaries keep at most {} recent task runs and {} chars per event.",
                        MAX_SUPPORT_BUNDLE_RECENT_TASK_RUNS, MAX_SUPPORT_EVENT_CHARS
                    ),
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "signed_distribution",
            "Signed Distribution",
            vec![
                service_readiness_check(
                    "internal_hardened_runtime",
                    "Internal build uses hardened runtime",
                    true,
                    "tauri.conf.json sets macOS hardenedRuntime and the local build verifies codesign.",
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "developer_id_notarization",
                    "Developer ID signing and notarization are configured",
                    false,
                    "Public release still needs Developer ID signing, notarization, and stapling where applicable.",
                    "warning",
                    true,
                    false,
                ),
            ],
        ),
        service_readiness_group(
            "update_recovery",
            "Update & Recovery",
            vec![
                service_readiness_check(
                    "signed_update_channel",
                    "Signed updater channel is configured",
                    update_channel_configured,
                    "No signed updater manifest or endpoint marker is bundled yet.",
                    "warning",
                    true,
                    false,
                ),
                service_readiness_check(
                    "clean_machine_smoke",
                    "Clean-machine install/update smoke is recorded",
                    false,
                    "A separate clean-machine install/open/update smoke record is still required before public release.",
                    "warning",
                    true,
                    false,
                ),
            ],
        ),
    ];

    let checks: Vec<ServiceReadinessCheck> = groups
        .iter()
        .flat_map(|group| group.checks.iter().cloned())
        .collect();
    let blockers = checks
        .iter()
        .filter(|check| check.required_for_internal && check.status == "blocked")
        .map(|check| check.label.clone())
        .collect::<Vec<_>>();
    let public_blockers = checks
        .iter()
        .filter(|check| check.required_for_public && check.status != "passed")
        .map(|check| check.label.clone())
        .collect::<Vec<_>>();
    let warnings = checks
        .iter()
        .filter(|check| check.status == "warning")
        .map(|check| check.label.clone())
        .collect::<Vec<_>>();
    let next_actions = service_readiness_next_actions(&checks);
    let score = service_readiness_score(&checks);
    let status = if !blockers.is_empty() {
        "service_internal_blocked"
    } else if !public_blockers.is_empty() {
        "service_internal_ready_public_blocked"
    } else {
        "service_public_release_ready_pending_signoff"
    }
    .to_string();

    Ok(ServiceReadinessReport {
        status,
        release_lane: "local_internal".to_string(),
        score,
        generated_at,
        groups,
        blockers,
        public_blockers,
        warnings,
        next_actions,
        payload_audit_path: payload_audit.audit_path,
        payload_flagged_count: payload_audit.flagged_count,
        service_claim: "Internal service operation is inspectable in the app. Public service release remains blocked until signing, notarization, updater, and clean-machine smoke are complete.".to_string(),
    })
}

fn service_readiness_group(
    id: &str,
    label: &str,
    checks: Vec<ServiceReadinessCheck>,
) -> ServiceReadinessGroup {
    let has_blocked = checks.iter().any(|check| check.status == "blocked");
    let has_warning = checks.iter().any(|check| check.status == "warning");
    let passed_checks = checks
        .iter()
        .filter(|check| check.status == "passed")
        .count();
    let total_checks = checks.len();
    ServiceReadinessGroup {
        id: id.to_string(),
        label: label.to_string(),
        status: if has_blocked {
            "blocked"
        } else if has_warning {
            "warning"
        } else {
            "passed"
        }
        .to_string(),
        passed_checks,
        total_checks,
        checks,
    }
}

fn service_readiness_check(
    id: &str,
    label: &str,
    passed: bool,
    detail: &str,
    fallback_status: &str,
    required_for_public: bool,
    required_for_internal: bool,
) -> ServiceReadinessCheck {
    ServiceReadinessCheck {
        id: id.to_string(),
        label: label.to_string(),
        status: if passed { "passed" } else { fallback_status }.to_string(),
        detail: detail.to_string(),
        required_for_public,
        required_for_internal,
    }
}

fn service_readiness_next_actions(
    checks: &[ServiceReadinessCheck],
) -> Vec<ServiceReadinessNextAction> {
    checks
        .iter()
        .filter(|check| check.status != "passed")
        .take(8)
        .map(|check| ServiceReadinessNextAction {
            check_id: check.id.clone(),
            label: check.label.clone(),
            status: check.status.clone(),
            action: check.detail.clone(),
        })
        .collect()
}

fn service_readiness_score(checks: &[ServiceReadinessCheck]) -> u8 {
    if checks.is_empty() {
        return 0;
    }
    let total: usize = checks
        .iter()
        .map(|check| match check.status.as_str() {
            "passed" => 100,
            "warning" => 60,
            _ => 0,
        })
        .sum();
    (total / checks.len()) as u8
}

fn service_update_channel_configured(app: &AppHandle) -> bool {
    let Ok(resource_dir) = app.path().resource_dir() else {
        return false;
    };
    [
        "update-manifest.json",
        "latest.json",
        "updater.json",
        "service-update-channel.json",
    ]
    .iter()
    .any(|file_name| resource_dir.join(file_name).exists())
}

fn resolve_installer_shell_runtime_contract_path(
    app: &AppHandle,
) -> Result<(PathBuf, String), String> {
    if let Ok(resource_dir) = app.path().resource_dir() {
        let candidate = resource_dir
            .join("runtime-contracts")
            .join("installer-shell-runtime-contract.json");
        if candidate.exists() {
            return Ok((candidate, "bundle_resource".to_string()));
        }
    }

    let root = workspace_root()?;
    let candidate = root
        .join("platform-desktop-app")
        .join("runtime-contracts")
        .join("installer-shell-runtime-contract.json");
    if candidate.exists() {
        return Ok((candidate, "workspace_source".to_string()));
    }

    Err(
        "Installer shell runtime contract was not found in bundled resources or workspace source."
            .to_string(),
    )
}

fn runtime_data_store_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(app
        .path()
        .app_data_dir()
        .map_err(|error| format!("Failed to resolve app data directory: {error}"))?
        .join("runtime-data"))
}

fn accumulated_data_index_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?
        .join("indexes")
        .join("accumulated-data-overview.v1.json"))
}

fn agent_workspace_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?.join("agent-workspace"))
}

fn support_bundles_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?.join("support-bundles"))
}

fn payload_audits_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?.join("payload-audits"))
}

fn run_installer_payload_audit_report(
    app: &AppHandle,
) -> Result<InstallerPayloadAuditReport, String> {
    let created_at = current_unix_millis_label();
    let scan_root = app
        .path()
        .resource_dir()
        .map_err(|error| format!("Failed to resolve Tauri resource directory: {error}"))?;
    let mut state = PayloadScanState::default();
    scan_installer_payload_path(&scan_root, &scan_root, &mut state)?;
    let has_high = state
        .findings
        .iter()
        .any(|finding| finding.severity == "high");
    let status = if has_high {
        "attention_required"
    } else {
        "passed"
    }
    .to_string();
    let audit_dir = payload_audits_base_path(app)?;
    fs::create_dir_all(&audit_dir)
        .map_err(|error| format!("Failed to create payload audit directory: {error}"))?;
    let audit_path = audit_dir.join(format!(
        "installer-payload-audit-{}.json",
        file_safe_timestamp_label()
    ));
    let report = InstallerPayloadAuditReport {
        status,
        scanned_paths: vec![path_to_string(&scan_root)],
        scanned_files: state.scanned_files,
        scanned_bytes: state.scanned_bytes,
        flagged_count: state.findings.len(),
        findings: state.findings,
        skipped_dirs: state.skipped_dirs,
        max_scan_files: MAX_PAYLOAD_SCAN_FILES,
        audit_path: path_to_string(&audit_path),
        created_at,
    };
    write_pretty_json(&audit_path, &report)?;
    Ok(report)
}

#[derive(Default)]
struct PayloadScanState {
    scanned_files: usize,
    scanned_bytes: u64,
    findings: Vec<InstallerPayloadFinding>,
    skipped_dirs: Vec<String>,
}

fn scan_installer_payload_path(
    base: &Path,
    path: &Path,
    state: &mut PayloadScanState,
) -> Result<(), String> {
    if state.scanned_files >= MAX_PAYLOAD_SCAN_FILES {
        state.skipped_dirs.push(format!(
            "{}: max scan file limit reached",
            relative_payload_path(base, path)
        ));
        return Ok(());
    }

    let metadata = match fs::metadata(path) {
        Ok(metadata) => metadata,
        Err(error) => {
            state.findings.push(payload_finding(
                "payload_metadata_unreadable",
                "warning",
                base,
                path,
                &format!("Could not read bundled payload metadata: {error}"),
            ));
            return Ok(());
        }
    };

    if metadata.is_dir() {
        if let Some(reason) = disallowed_payload_dir_reason(path) {
            state.findings.push(payload_finding(
                "disallowed_payload_directory",
                "high",
                base,
                path,
                reason,
            ));
            state.skipped_dirs.push(relative_payload_path(base, path));
            return Ok(());
        }
        for entry in fs::read_dir(path)
            .map_err(|error| format!("Failed to scan bundled payload directory: {error}"))?
        {
            let Ok(entry) = entry else {
                continue;
            };
            scan_installer_payload_path(base, &entry.path(), state)?;
            if state.scanned_files >= MAX_PAYLOAD_SCAN_FILES {
                break;
            }
        }
        return Ok(());
    }

    if !metadata.is_file() {
        return Ok(());
    }

    state.scanned_files += 1;
    state.scanned_bytes = state.scanned_bytes.saturating_add(metadata.len());

    if let Some(reason) = disallowed_payload_file_reason(path) {
        state.findings.push(payload_finding(
            "disallowed_payload_file",
            "high",
            base,
            path,
            reason,
        ));
    }
    if path.file_name().and_then(|value| value.to_str()) == Some("workspace-snapshot.json") {
        audit_workspace_snapshot_file(base, path, state);
    }
    Ok(())
}

fn disallowed_payload_dir_reason(path: &Path) -> Option<&'static str> {
    let name = path.file_name()?.to_str()?;
    match name {
        "_private" => Some("Private local vault must never be bundled."),
        "outputs" => Some("Transient local outputs must not be included in installer payload."),
        ".git" => Some("Repository metadata must not be included in installer payload."),
        "src-tauri" | "src" | "components" | "scripts" => {
            Some("Developer source directory appears inside installer payload.")
        }
        _ => None,
    }
}

fn disallowed_payload_file_reason(path: &Path) -> Option<&'static str> {
    let relative = path_to_string(path);
    if relative.contains("/_private/") || relative.contains("\\_private\\") {
        return Some("Private local vault file path appears inside installer payload.");
    }
    if relative.contains("/outputs/") || relative.contains("\\outputs\\") {
        return Some("Transient output file path appears inside installer payload.");
    }
    match path
        .extension()
        .and_then(|value| value.to_str())
        .unwrap_or_default()
    {
        "rs" | "ts" | "tsx" | "py" => {
            Some("Source file extension appears inside installer payload.")
        }
        "map" => Some("Source map may reveal original platform source."),
        _ => None,
    }
}

fn audit_workspace_snapshot_file(base: &Path, path: &Path, state: &mut PayloadScanState) {
    let Ok(content) = fs::read_to_string(path) else {
        state.findings.push(payload_finding(
            "workspace_snapshot_unreadable",
            "warning",
            base,
            path,
            "Bundled workspace snapshot could not be read for source visibility audit.",
        ));
        return;
    };
    let Ok(value) = serde_json::from_str::<Value>(&content) else {
        state.findings.push(payload_finding(
            "workspace_snapshot_invalid",
            "warning",
            base,
            path,
            "Bundled workspace snapshot is not valid JSON.",
        ));
        return;
    };
    let source_count = value
        .get("sourceFiles")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);
    let document_count = value
        .get("documents")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);
    if source_count > 0 || document_count > 0 {
        state.findings.push(payload_finding(
            "customer_snapshot_contains_internal_content",
            "high",
            base,
            path,
            "Bundled customer snapshot still contains source files or internal documents.",
        ));
    }
}

fn payload_finding(
    rule_id: &str,
    severity: &str,
    base: &Path,
    path: &Path,
    reason: &str,
) -> InstallerPayloadFinding {
    InstallerPayloadFinding {
        rule_id: rule_id.to_string(),
        severity: severity.to_string(),
        path: relative_payload_path(base, path),
        reason: reason.to_string(),
    }
}

fn create_support_diagnostic_bundle_report(
    app: &AppHandle,
) -> Result<SupportDiagnosticBundleReport, String> {
    let created_at = current_unix_millis_label();
    let bundle_id = format!("support-bundle-{}", file_safe_timestamp_label());
    let bundle_dir = support_bundles_base_path(app)?.join(&bundle_id);
    fs::create_dir_all(&bundle_dir)
        .map_err(|error| format!("Failed to create support bundle directory: {error}"))?;

    let runtime_roots = runtime_data_boundary_report(app)?;
    let payload_audit = run_installer_payload_audit_report(app)?;
    let task_runs =
        read_task_run_records_with_limit(app, Some(MAX_SUPPORT_BUNDLE_RECENT_TASK_RUNS))?;
    let task_run_summary = task_run_support_summary(&task_runs);
    let recent_events = task_run_recent_events_text(&task_runs);

    let runtime_roots_path = bundle_dir.join("runtime-roots.json");
    let installer_payload_audit_path = bundle_dir.join("installer-payload-audit.json");
    let task_run_summary_path = bundle_dir.join("task-run-summary.redacted.json");
    let recent_events_path = bundle_dir.join("recent-events.redacted.log");
    let manifest_path = bundle_dir.join("manifest.json");

    write_pretty_json(&runtime_roots_path, &runtime_roots)?;
    write_pretty_json(&installer_payload_audit_path, &payload_audit)?;
    write_pretty_json(&task_run_summary_path, &task_run_summary)?;
    fs::write(&recent_events_path, recent_events)
        .map_err(|error| format!("Failed to write support bundle recent events: {error}"))?;

    let included_files = vec![
        "runtime-roots.json".to_string(),
        "installer-payload-audit.json".to_string(),
        "task-run-summary.redacted.json".to_string(),
        "recent-events.redacted.log".to_string(),
        "manifest.json".to_string(),
    ];
    let manifest = json!({
        "schema_version": 1,
        "bundle_id": bundle_id,
        "created_at": created_at,
        "app": {
            "package": env!("CARGO_PKG_NAME"),
            "version": env!("CARGO_PKG_VERSION")
        },
        "redacted": true,
        "exclusions": [
            "raw stdout/stderr logs",
            "platform source files",
            "_private/ contents",
            "user secrets and credentials"
        ],
        "included_files": included_files,
        "payload_audit_status": payload_audit.status,
        "task_run_count": task_runs.len()
    });
    write_pretty_json(&manifest_path, &manifest)?;

    Ok(SupportDiagnosticBundleReport {
        status: "created".to_string(),
        bundle_id,
        bundle_dir: path_to_string(&bundle_dir),
        manifest_path: path_to_string(&manifest_path),
        runtime_roots_path: path_to_string(&runtime_roots_path),
        installer_payload_audit_path: path_to_string(&installer_payload_audit_path),
        task_run_summary_path: path_to_string(&task_run_summary_path),
        recent_events_path: path_to_string(&recent_events_path),
        included_files,
        redacted: true,
        created_at,
    })
}

fn task_run_support_summary(records: &[CliTaskRunRecordReport]) -> Value {
    let items: Vec<Value> = records
        .iter()
        .map(|record| {
            json!({
                "task_run_id": record.task_run_id,
                "task_kind": record.task_kind,
                "adapter_id": record.adapter_id,
                "status": record.status,
                "exit_code": record.exit_code,
                "started_at": record.started_at,
                "updated_at": record.updated_at,
                "elapsed_ms": record.elapsed_ms,
                "stdout_bytes": record.stdout_bytes,
                "stderr_bytes": record.stderr_bytes,
                "output_truncated": record.output_truncated,
                "decision_inbox_items": record.decision_inbox_items,
                "pending_decision_prompts": record.pending_decision_prompts,
                "record_path": redact_sensitive_text(&record.record_path),
            })
        })
        .collect();
    json!({
        "schema_version": 1,
        "redacted": true,
        "records": items
    })
}

fn task_run_recent_events_text(records: &[CliTaskRunRecordReport]) -> String {
    if records.is_empty() {
        return "No recent task-run records.\n".to_string();
    }
    let mut lines = Vec::new();
    for record in records.iter().take(MAX_SUPPORT_BUNDLE_RECENT_TASK_RUNS) {
        let line = format!(
            "{} | {} | {} | {} | {}",
            record.updated_at,
            record.status,
            record.adapter_id,
            record.task_kind,
            redact_sensitive_text(&record.record_path)
        );
        lines.push(truncate_chars(&line, MAX_SUPPORT_EVENT_CHARS));
    }
    format!("{}\n", lines.join("\n"))
}

fn write_pretty_json<T: Serialize>(path: &Path, value: &T) -> Result<(), String> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)
            .map_err(|error| format!("Failed to create JSON parent directory: {error}"))?;
    }
    let formatted = serde_json::to_string_pretty(value)
        .map_err(|error| format!("Failed to serialize JSON artifact: {error}"))?;
    fs::write(path, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write JSON artifact: {error}"))
}

fn relative_payload_path(base: &Path, path: &Path) -> String {
    path.strip_prefix(base)
        .unwrap_or(path)
        .to_string_lossy()
        .replace('\\', "/")
}

fn path_to_string(path: &Path) -> String {
    path.to_string_lossy().replace('\\', "/")
}

fn redact_sensitive_text(value: &str) -> String {
    let mut redacted = value.to_string();
    if let Ok(home) = env::var("HOME") {
        if !home.is_empty() {
            redacted = redacted.replace(&home, "$HOME");
        }
    }
    if let Ok(root) = workspace_root() {
        redacted = redacted.replace(&path_to_string(&root), "$WORKSPACE");
    }
    for marker in [
        "token=",
        "password=",
        "secret=",
        "api_key=",
        "authorization:",
    ] {
        let lower = redacted.to_lowercase();
        if let Some(index) = lower.find(marker) {
            let end = redacted[index..]
                .find(|character: char| character.is_whitespace())
                .map(|offset| index + offset)
                .unwrap_or(redacted.len());
            redacted.replace_range(index..end, &format!("{marker}<redacted>"));
        }
    }
    redacted
}

fn truncate_chars(value: &str, max_chars: usize) -> String {
    let mut output: String = value.chars().take(max_chars).collect();
    if value.chars().count() > max_chars {
        output.push_str("...");
    }
    output
}

fn file_safe_timestamp_label() -> String {
    current_unix_millis_label().replace(':', "-")
}

fn platform_artifacts_base_path(root: &Path) -> PathBuf {
    if root.join("platform-desktop-app").exists() {
        root.join("platform-desktop-app").join("artifacts")
    } else {
        root.join("artifacts")
    }
}

fn workspace_relative_display_path(root: &Path, path: &Path) -> String {
    path.strip_prefix(root)
        .unwrap_or(path)
        .to_string_lossy()
        .replace('\\', "/")
}

fn workspace_text_file_entry(
    root: &Path,
    path: &Path,
    relative_path: &str,
    metadata: &fs::Metadata,
) -> WorkspaceTextFileEntry {
    let extension = source_editor_extension(relative_path);
    let project = relative_path
        .split('/')
        .next()
        .filter(|value| !value.is_empty())
        .unwrap_or("workspace")
        .to_string();
    let updated_at = metadata
        .modified()
        .ok()
        .and_then(|value| value.duration_since(UNIX_EPOCH).ok())
        .map(|value| format!("unix_ms:{}", value.as_millis()))
        .unwrap_or_default();
    let size_bytes = metadata.len() as usize;
    let truncated = size_bytes > MAX_WORKSPACE_FILE_BYTES;
    let line_count = if truncated || size_bytes > MAX_SOURCE_LIST_LINE_COUNT_BYTES {
        0
    } else {
        fs::read_to_string(path)
            .map(|content| content.lines().count())
            .unwrap_or(0)
    };
    WorkspaceTextFileEntry {
        id: sanitize_file_name(relative_path),
        path: workspace_relative_display_path(root, path),
        project,
        language: source_editor_language(&extension).to_string(),
        extension,
        size_bytes,
        line_count,
        updated_at,
        truncated,
        content: String::new(),
    }
}

fn should_skip_source_editor_dir(file_name: &str) -> bool {
    SOURCE_EDITOR_SKIP_DIRS
        .iter()
        .any(|blocked| file_name.eq_ignore_ascii_case(blocked))
}

fn is_source_editor_text_path(relative_path: &str) -> bool {
    let lower = relative_path.to_lowercase();
    SOURCE_EDITOR_TEXT_EXTENSIONS
        .iter()
        .any(|extension| lower.ends_with(&format!(".{extension}")))
}

fn source_editor_extension(relative_path: &str) -> String {
    if relative_path.ends_with(".ko.md") {
        return "ko.md".to_string();
    }
    if relative_path.ends_with(".en.md") {
        return "en.md".to_string();
    }
    Path::new(relative_path)
        .extension()
        .and_then(|value| value.to_str())
        .unwrap_or("")
        .to_lowercase()
}

fn source_editor_language(extension: &str) -> &'static str {
    match extension {
        "c" | "cc" | "cpp" | "h" => "cpp",
        "css" => "css",
        "go" => "go",
        "html" => "html",
        "java" => "java",
        "js" | "mjs" | "jsx" => "javascript",
        "json" => "json",
        "ko.md" | "en.md" | "md" => "markdown",
        "py" => "python",
        "rs" => "rust",
        "sh" => "shell",
        "sql" => "sql",
        "toml" => "toml",
        "ts" | "tsx" => "typescript",
        "yaml" | "yml" => "yaml",
        _ => "text",
    }
}

fn prompt_preview(prompt: &str) -> String {
    prompt
        .chars()
        .take(MAX_TASK_PROMPT_PREVIEW_CHARS)
        .collect::<String>()
        .trim()
        .to_string()
}

fn read_bounded_text_preview(path: &Path, max_bytes: usize) -> Result<(String, bool), String> {
    if !path.exists() {
        return Ok((String::new(), false));
    }
    if !path.is_file() {
        return Err("Task run log path is not a file.".to_string());
    }

    let bytes = fs::read(path).map_err(|error| format!("Failed to read task run log: {error}"))?;
    let truncated = bytes.len() > max_bytes;
    let preview = if truncated {
        let mut end = max_bytes;
        while end > 0 && std::str::from_utf8(&bytes[..end]).is_err() {
            end -= 1;
        }
        String::from_utf8_lossy(&bytes[..end]).to_string()
    } else {
        String::from_utf8_lossy(&bytes).to_string()
    };
    Ok((preview, truncated))
}

fn new_session_id(adapter_id: &str) -> String {
    let nanos = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|value| value.as_nanos())
        .unwrap_or(0);
    format!("{adapter_id}-{nanos}")
}

fn current_unix_millis_label() -> String {
    let millis = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|value| value.as_millis())
        .unwrap_or(0);
    format!("unix_ms:{millis}")
}

fn read_limited<R: Read>(mut reader: R, max_output_bytes: usize) -> Vec<u8> {
    let mut output = Vec::new();
    let mut buffer = [0_u8; 1024];

    loop {
        match reader.read(&mut buffer) {
            Ok(0) => break,
            Ok(read_count) => {
                let remaining = max_output_bytes.saturating_sub(output.len());
                if remaining > 0 {
                    output.extend_from_slice(&buffer[..read_count.min(remaining)]);
                }
            }
            Err(_) => break,
        }
    }

    output
}

fn first_non_empty_line(value: &str) -> Option<String> {
    value
        .lines()
        .map(str::trim)
        .find(|line| !line.is_empty())
        .map(ToOwned::to_owned)
}

fn detect_decision_prompts(adapter: &AdapterDefinition, output: &str) -> Vec<CliDecisionPrompt> {
    detect_decision_prompts_for(adapter.adapter_id, adapter.label, output)
}

fn recent_session_output(output: &CliSessionOutput) -> String {
    format!(
        "{}\n{}",
        tail_by_char_boundary(&output.stdout, MAX_DECISION_SCAN_BYTES),
        tail_by_char_boundary(&output.stderr, MAX_DECISION_SCAN_BYTES)
    )
}

fn tail_by_char_boundary(value: &str, max_bytes: usize) -> &str {
    if value.len() <= max_bytes {
        return value;
    }

    let mut start = value.len().saturating_sub(max_bytes);
    while start < value.len() && !value.is_char_boundary(start) {
        start += 1;
    }
    &value[start..]
}

fn detect_decision_prompts_for(
    adapter_id: &str,
    label: &str,
    output: &str,
) -> Vec<CliDecisionPrompt> {
    output
        .lines()
        .map(str::trim)
        .filter(|line| {
            let lower = line.to_lowercase();
            line.ends_with('?')
                || line.ends_with('？')
                || lower.contains("do you want")
                || lower.contains("would you like")
                || lower.contains("should i")
                || lower.contains("continue?")
                || lower.contains("permission")
                || lower.contains("approve")
                || lower.contains("confirm")
                || lower.contains("proceed")
                || lower.contains("yes/no")
                || lower.contains("y/n")
                || line.contains("선택")
                || line.contains("승인")
                || line.contains("계속")
                || line.contains("진행")
                || line.contains("확인")
                || line.contains("질문")
        })
        .take(4)
        .map(|line| CliDecisionPrompt {
            question: line.to_string(),
            lane: adapter_id.to_string(),
            impact: "This CLI lane needs a user decision before the platform should continue source-affecting work.".to_string(),
            defer_message: "I will pause this lane and collect the decision for the user to review later.".to_string(),
            resume_action: format!("Resume {label} after the decision inbox item is answered."),
        })
        .collect()
}

fn auto_defer_session_questions_locked(session_id: &str, session: &mut CliSession) {
    if !session.auto_defer_questions || session.defer_message_sent || session.stdin.is_none() {
        return;
    }
    if let Err(error) = defer_session_questions_locked(session_id, session, "auto") {
        session.decision_capture_error = Some(error);
    }
}

fn defer_session_questions_locked(
    session_id: &str,
    session: &mut CliSession,
    mode: &str,
) -> Result<usize, String> {
    if session.finished {
        return Err("Cannot defer a finished CLI session.".to_string());
    }

    let prompts = new_session_decision_prompts(session);
    if prompts.is_empty() {
        if mode == "manual" && !session.defer_message_sent {
            let stdin = session
                .stdin
                .as_mut()
                .ok_or_else(|| "CLI session stdin is not available.".to_string())?;
            stdin
                .write_all(DEFER_MESSAGE.as_bytes())
                .and_then(|_| stdin.write_all(b"\n"))
                .and_then(|_| stdin.flush())
                .map_err(|error| format!("Failed to send defer message: {error}"))?;
            session.defer_message_sent = true;
        }
        return Ok(0);
    }

    {
        let stdin = session
            .stdin
            .as_mut()
            .ok_or_else(|| "CLI session stdin is not available.".to_string())?;
        stdin
            .write_all(DEFER_MESSAGE.as_bytes())
            .and_then(|_| stdin.write_all(b"\n"))
            .and_then(|_| stdin.flush())
            .map_err(|error| format!("Failed to send defer message: {error}"))?;
    }

    session.defer_message_sent = true;
    if mode == "auto" {
        session.auto_defer_triggered = true;
    }
    let appended_count = append_session_decisions_to_inbox(session_id, session, &prompts, mode)?;
    for prompt in prompts {
        let key = decision_prompt_key(&prompt.question);
        if !session
            .deferred_prompt_keys
            .iter()
            .any(|existing| existing == &key)
        {
            session.deferred_prompt_keys.push(key);
        }
    }
    session.decision_inbox_items += appended_count;
    Ok(appended_count)
}

fn session_decision_prompts(session: &CliSession) -> Vec<CliDecisionPrompt> {
    let output = session
        .output
        .lock()
        .map(|value| value.clone())
        .unwrap_or_default();
    let decision_output = recent_session_output(&output);
    detect_decision_prompts_for(&session.adapter_id, &session.label, &decision_output)
}

fn new_session_decision_prompts(session: &CliSession) -> Vec<CliDecisionPrompt> {
    session_decision_prompts(session)
        .into_iter()
        .filter(|prompt| {
            let key = decision_prompt_key(&prompt.question);
            !session
                .deferred_prompt_keys
                .iter()
                .any(|existing| existing == &key)
        })
        .collect()
}

fn append_session_decisions_to_inbox(
    session_id: &str,
    session: &CliSession,
    prompts: &[CliDecisionPrompt],
    mode: &str,
) -> Result<usize, String> {
    if prompts.is_empty() {
        return Ok(0);
    }

    let root = workspace_root()?;
    let inbox_path = root
        .join("_ops")
        .join("coordination")
        .join("human-decision-inbox.json");
    let canonical_inbox = inbox_path
        .canonicalize()
        .map_err(|error| format!("Failed to resolve human decision inbox: {error}"))?;
    ensure_workspace_path(&root, &canonical_inbox)?;

    let content = fs::read_to_string(&canonical_inbox)
        .map_err(|error| format!("Failed to read human decision inbox: {error}"))?;
    let mut inbox: Value = serde_json::from_str(&content)
        .map_err(|error| format!("Failed to parse human decision inbox: {error}"))?;
    let existing_ids: Vec<String> = inbox
        .get("decisions")
        .and_then(Value::as_array)
        .ok_or_else(|| "Human decision inbox is missing decisions array.".to_string())?
        .iter()
        .filter_map(|item| {
            item.get("id")
                .and_then(Value::as_str)
                .map(ToOwned::to_owned)
        })
        .collect();

    let timestamp = current_unix_millis_label();
    let mut new_decisions = Vec::new();
    let mut new_history = Vec::new();
    for prompt in prompts.iter() {
        let decision_id = format!(
            "desktop-cli-session-{}-{}",
            sanitize_file_name(session_id),
            decision_prompt_key(&prompt.question)
        );
        if existing_ids.iter().any(|existing| existing == &decision_id) {
            continue;
        }

        new_decisions.push(json!({
            "id": decision_id.clone(),
            "status": "deferred",
            "priority": "normal",
            "source": "platform-desktop-app.cli-session",
            "created_at": timestamp.clone(),
            "question": prompt.question.clone(),
            "options": [],
            "answer_format": "Free-form user instruction or approval/denial for the deferred CLI lane.",
            "impact": prompt.impact.clone(),
            "blocked_work": [
                format!("CLI session {session_id} should not continue source-affecting work until this decision is answered.")
            ],
            "unblocked_work": [
                "Other CLI lanes, read-only analysis, documentation, and safe verification can continue."
            ],
            "assumptions": [
                "The desktop app sent a defer message instead of authorizing the CLI to proceed.",
                "The user can answer later from the decision inbox and resume only the affected lane."
            ],
            "resume_action": prompt.resume_action.clone(),
            "metadata": {
                "session_id": session_id,
                "adapter_id": session.adapter_id.clone(),
                "label": session.label.clone(),
                "working_dir": session.working_dir.to_string_lossy().to_string(),
                "defer_message_sent": session.defer_message_sent,
                "defer_mode": mode,
                "prompt_key": decision_prompt_key(&prompt.question)
            }
        }));
        new_history.push(json!({
            "timestamp": timestamp.clone(),
            "actor": "platform-desktop-app",
            "decision_id": decision_id,
            "from_status": null,
            "to_status": "deferred",
            "reason": format!("CLI session decision prompt was collected after sending a {mode} defer message.")
        }));
    }

    if new_decisions.is_empty() {
        return Ok(0);
    }

    let appended_count = new_decisions.len();
    inbox
        .get_mut("decisions")
        .and_then(Value::as_array_mut)
        .ok_or_else(|| "Human decision inbox is missing decisions array.".to_string())?
        .extend(new_decisions);
    inbox
        .get_mut("decision_history")
        .and_then(Value::as_array_mut)
        .ok_or_else(|| "Human decision inbox is missing decision_history array.".to_string())?
        .extend(new_history);

    let formatted = serde_json::to_string_pretty(&inbox)
        .map_err(|error| format!("Failed to serialize human decision inbox: {error}"))?;
    fs::write(&canonical_inbox, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write human decision inbox: {error}"))?;
    Ok(appended_count)
}

fn decision_prompt_key(question: &str) -> String {
    let dashed: String = question
        .trim()
        .to_lowercase()
        .chars()
        .map(|character| {
            if character.is_ascii_alphanumeric() {
                character
            } else {
                '-'
            }
        })
        .collect();
    let normalized = dashed
        .split('-')
        .filter(|part| !part.is_empty())
        .take(10)
        .collect::<Vec<_>>()
        .join("-");
    if normalized.is_empty() {
        "question".to_string()
    } else {
        normalized.chars().take(80).collect()
    }
}

fn read_human_decision_inbox_value() -> Result<(PathBuf, Value), String> {
    let root = workspace_root()?;
    let inbox_path = human_decision_inbox_path(&root)?;
    let content = fs::read_to_string(&inbox_path)
        .map_err(|error| format!("Failed to read human decision inbox: {error}"))?;
    let inbox: Value = serde_json::from_str(&content)
        .map_err(|error| format!("Failed to parse human decision inbox: {error}"))?;
    Ok((inbox_path, inbox))
}

fn write_human_decision_inbox_value(inbox_path: &Path, inbox: &Value) -> Result<(), String> {
    let formatted = serde_json::to_string_pretty(inbox)
        .map_err(|error| format!("Failed to serialize human decision inbox: {error}"))?;
    fs::write(inbox_path, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write human decision inbox: {error}"))
}

fn update_human_decision_answer(
    decision_id: &str,
    answer_type: &str,
    answer_text: &str,
    history_reason: &str,
) -> Result<DecisionAnswerUpdate, String> {
    let decision_id = decision_id.trim();
    if decision_id.is_empty() {
        return Err("Decision id is required.".to_string());
    }
    if answer_text.len() > MAX_DECISION_ANSWER_BYTES {
        return Err(format!(
            "Decision answer is too large. Max input is {MAX_DECISION_ANSWER_BYTES} bytes."
        ));
    }

    let answer_type = normalize_decision_answer_type(answer_type);
    let timestamp = current_unix_millis_label();
    let (inbox_path, mut inbox) = read_human_decision_inbox_value()?;
    let (from_status, session_id) = {
        let decisions = inbox
            .get_mut("decisions")
            .and_then(Value::as_array_mut)
            .ok_or_else(|| "Human decision inbox is missing decisions array.".to_string())?;
        let decision = decisions
            .iter_mut()
            .find(|item| item.get("id").and_then(Value::as_str) == Some(decision_id))
            .ok_or_else(|| format!("Unknown human decision id: {decision_id}"))?;
        let from_status = decision
            .get("status")
            .and_then(Value::as_str)
            .unwrap_or("open")
            .to_string();
        let session_id = decision_metadata_string(decision, "session_id");
        let decision_object = decision
            .as_object_mut()
            .ok_or_else(|| "Human decision record must be a JSON object.".to_string())?;
        decision_object.insert("status".to_string(), Value::String("answered".to_string()));
        decision_object.insert("answered_at".to_string(), Value::String(timestamp.clone()));
        decision_object.insert(
            "answer".to_string(),
            json!({
                "type": answer_type,
                "text": answer_text,
                "answered_at": timestamp
            }),
        );
        (from_status, session_id)
    };

    let history = inbox
        .get_mut("decision_history")
        .and_then(Value::as_array_mut)
        .ok_or_else(|| "Human decision inbox is missing decision_history array.".to_string())?;
    history.push(json!({
        "timestamp": current_unix_millis_label(),
        "actor": "platform-desktop-app",
        "decision_id": decision_id,
        "from_status": from_status,
        "to_status": "answered",
        "reason": history_reason
    }));

    write_human_decision_inbox_value(&inbox_path, &inbox)?;
    Ok(DecisionAnswerUpdate {
        report: human_decision_report(&inbox, Some(decision_id.to_string()))?,
        session_id,
    })
}

fn human_decision_inbox_path(root: &Path) -> Result<PathBuf, String> {
    let inbox_path = root
        .join("_ops")
        .join("coordination")
        .join("human-decision-inbox.json");
    let canonical_inbox = inbox_path
        .canonicalize()
        .map_err(|error| format!("Failed to resolve human decision inbox: {error}"))?;
    ensure_workspace_path(root, &canonical_inbox)?;
    Ok(canonical_inbox)
}

fn human_decision_report(
    inbox: &Value,
    updated_id: Option<String>,
) -> Result<HumanDecisionInboxReport, String> {
    let decisions = inbox
        .get("decisions")
        .and_then(Value::as_array)
        .ok_or_else(|| "Human decision inbox is missing decisions array.".to_string())?;
    let items: Vec<HumanDecisionItem> = decisions
        .iter()
        .map(human_decision_item_from_value)
        .collect();
    let open_count = items
        .iter()
        .filter(|item| matches!(item.status.as_str(), "open" | "deferred" | "resuming"))
        .count();
    let answered_count = items
        .iter()
        .filter(|item| item.status == "answered")
        .count();
    Ok(HumanDecisionInboxReport {
        status: "loaded".to_string(),
        total_count: items.len(),
        open_count,
        answered_count,
        decisions: items,
        updated_id,
    })
}

fn human_decision_item_from_value(value: &Value) -> HumanDecisionItem {
    let answer = value.get("answer");
    HumanDecisionItem {
        id: value_string(value, "id", "unknown-decision"),
        status: value_string(value, "status", "open"),
        priority: value_string(value, "priority", "normal"),
        source: value_string(value, "source", "unknown"),
        created_at: value_string(value, "created_at", ""),
        question: value_string(value, "question", "Decision needs a human answer."),
        impact: value_string(value, "impact", ""),
        resume_action: value_string(value, "resume_action", ""),
        session_id: decision_metadata_string(value, "session_id"),
        adapter_id: decision_metadata_string(value, "adapter_id"),
        answer_type: answer
            .and_then(|item| item.get("type"))
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        answer_text: answer
            .and_then(|item| item.get("text"))
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        answered_at: value
            .get("answered_at")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned)
            .or_else(|| {
                answer
                    .and_then(|item| item.get("answered_at"))
                    .and_then(Value::as_str)
                    .map(ToOwned::to_owned)
            }),
        blocked_work_count: value
            .get("blocked_work")
            .and_then(Value::as_array)
            .map(Vec::len)
            .unwrap_or(0),
        unblocked_work_count: value
            .get("unblocked_work")
            .and_then(Value::as_array)
            .map(Vec::len)
            .unwrap_or(0),
    }
}

fn decision_metadata_string(value: &Value, field: &str) -> Option<String> {
    value
        .get("metadata")
        .and_then(|metadata| metadata.get(field))
        .and_then(Value::as_str)
        .map(ToOwned::to_owned)
}

fn value_string(value: &Value, field: &str, fallback: &str) -> String {
    value
        .get(field)
        .and_then(Value::as_str)
        .unwrap_or(fallback)
        .to_string()
}

fn normalize_decision_answer_type(answer_type: &str) -> String {
    match answer_type.trim() {
        "approve" => "approve".to_string(),
        "edit" => "edit".to_string(),
        "reject" => "reject".to_string(),
        _ => "instruction".to_string(),
    }
}

fn desktop_workspace_state_report(
    app: &AppHandle,
    status_override: Option<&str>,
    extra_summary: Option<String>,
) -> Result<DesktopWorkspaceStateReport, String> {
    let state = read_desktop_workspace_state(app)?;
    let fallback_root = workspace_root()?;
    let selected_path = active_desktop_workspace_root(app)?;
    let active_path = selected_path
        .as_ref()
        .unwrap_or(&fallback_root)
        .to_string_lossy()
        .to_string();
    let active_source = if selected_path.is_some() {
        state
            .active_workspace_source
            .trim()
            .to_string()
            .if_empty("imported_or_cloned")
    } else {
        "fallback_development_repo".to_string()
    };
    let git_status = git_capability_status();
    let status = status_override.map(ToOwned::to_owned).unwrap_or_else(|| {
        if selected_path.is_some() {
            "workspace_selected".to_string()
        } else {
            "fallback_ready".to_string()
        }
    });
    let mut summary = vec![
        "Desktop app workspace host is active.".to_string(),
        "Source editing and CLI working directories resolve from the app-selected workspace before falling back to the development repository.".to_string(),
    ];
    if selected_path.is_none() {
        summary.push(
            "No app-owned workspace has been selected yet; using the development repository fallback for local validation."
                .to_string(),
        );
    }
    if let Some(extra) = extra_summary {
        summary.push(extra);
    }

    Ok(DesktopWorkspaceStateReport {
        schema_version: DESKTOP_WORKSPACE_STATE_SCHEMA_VERSION.to_string(),
        status,
        active_workspace_path: active_path,
        active_workspace_source: active_source,
        state_path: path_to_string(&desktop_workspace_state_path(app)?),
        managed_workspace_root: path_to_string(&managed_desktop_workspaces_base_path(app)?),
        fallback_workspace_path: path_to_string(&fallback_root),
        git_available: git_status.0,
        git_version: git_status.1,
        repository_url: state.repository_url,
        last_operation: state.last_operation,
        last_status: state.last_status,
        updated_at: state.updated_at,
        summary,
    })
}

fn set_desktop_workspace_path_report(
    app: &AppHandle,
    workspace_path: &str,
) -> Result<DesktopWorkspaceStateReport, String> {
    let canonical = canonical_user_workspace_path(workspace_path)?;
    let now = current_unix_millis_label();
    let mut state = read_desktop_workspace_state(app)?;
    if state.created_at.trim().is_empty() {
        state.created_at = now.clone();
    }
    state.schema_version = DESKTOP_WORKSPACE_STATE_SCHEMA_VERSION.to_string();
    state.active_workspace_path = path_to_string(&canonical);
    state.active_workspace_source = "imported_existing_workspace".to_string();
    state.last_operation = "import_workspace".to_string();
    state.last_status = "workspace_selected".to_string();
    state.updated_at = now;
    write_desktop_workspace_state(app, &state)?;
    desktop_workspace_state_report(
        app,
        Some("workspace_selected"),
        Some("Existing workspace path is now owned by the desktop app profile.".to_string()),
    )
}

fn clone_desktop_workspace_report(
    app: &AppHandle,
    repository_url: &str,
    folder_name: Option<&str>,
) -> Result<DesktopWorkspaceStateReport, String> {
    let repository_url = validate_git_repository_url(repository_url)?;
    let redacted_repository_url = redact_repository_url(&repository_url);
    let mut state = read_desktop_workspace_state(app)?;
    let now = current_unix_millis_label();
    if state.created_at.trim().is_empty() {
        state.created_at = now.clone();
    }
    state.schema_version = DESKTOP_WORKSPACE_STATE_SCHEMA_VERSION.to_string();
    state.repository_url = redacted_repository_url.clone();
    state.last_operation = "clone_workspace".to_string();
    state.updated_at = now;

    let Some(git_path) = resolve_command("git") else {
        state.last_status = "capability_missing".to_string();
        write_desktop_workspace_state(app, &state)?;
        return desktop_workspace_state_report(
            app,
            Some("capability_missing"),
            Some(
                "Git was not found on PATH, so the app kept the existing workspace selection."
                    .to_string(),
            ),
        );
    };

    let target_root = managed_desktop_workspaces_base_path(app)?;
    fs::create_dir_all(&target_root)
        .map_err(|error| format!("Failed to create managed workspace root: {error}"))?;
    let folder = workspace_folder_name(folder_name, &repository_url)?;
    let target = target_root.join(folder);
    if target.exists() {
        state.last_status = "target_exists".to_string();
        write_desktop_workspace_state(app, &state)?;
        return desktop_workspace_state_report(
            app,
            Some("target_exists"),
            Some(format!(
                "Managed workspace target already exists: {}",
                path_to_string(&target)
            )),
        );
    }

    let target_text = path_to_string(&target);
    let args = [
        "clone".to_string(),
        "--depth=1".to_string(),
        "--".to_string(),
        repository_url.clone(),
        target_text.clone(),
    ];
    let arg_refs: Vec<&str> = args.iter().map(String::as_str).collect();
    let output = run_bounded_command(
        &git_path,
        &arg_refs,
        Duration::from_millis(GIT_CLONE_TIMEOUT_MS),
        MAX_GIT_CLONE_OUTPUT_BYTES,
    )?;

    if output.status == "passed" {
        let canonical = target
            .canonicalize()
            .map_err(|error| format!("Failed to resolve cloned workspace: {error}"))?;
        state.active_workspace_path = path_to_string(&canonical);
        state.active_workspace_source = "cloned_by_desktop_app".to_string();
        state.last_status = "workspace_cloned".to_string();
        state.updated_at = current_unix_millis_label();
        write_desktop_workspace_state(app, &state)?;
        return desktop_workspace_state_report(
            app,
            Some("workspace_cloned"),
            Some("Repository was cloned into the desktop app managed workspace root.".to_string()),
        );
    }

    state.last_status = output.status.clone();
    write_desktop_workspace_state(app, &state)?;
    let clone_output = redact_clone_output(
        &format!(
            "git clone did not complete: {} {}",
            output.stdout, output.stderr
        ),
        &repository_url,
        &redacted_repository_url,
    );
    desktop_workspace_state_report(
        app,
        Some("clone_failed"),
        Some(truncate_chars(&clone_output, 600)),
    )
}

fn read_desktop_workspace_state(app: &AppHandle) -> Result<DesktopWorkspaceState, String> {
    let path = desktop_workspace_state_path(app)?;
    if !path.exists() {
        return Ok(default_desktop_workspace_state());
    }
    let content = fs::read_to_string(&path)
        .map_err(|error| format!("Failed to read desktop workspace state: {error}"))?;
    let mut state: DesktopWorkspaceState = serde_json::from_str(&content)
        .map_err(|error| format!("Failed to parse desktop workspace state: {error}"))?;
    if state.schema_version.trim().is_empty() {
        state.schema_version = DESKTOP_WORKSPACE_STATE_SCHEMA_VERSION.to_string();
    }
    Ok(state)
}

fn write_desktop_workspace_state(
    app: &AppHandle,
    state: &DesktopWorkspaceState,
) -> Result<(), String> {
    write_pretty_json(&desktop_workspace_state_path(app)?, state)
        .map_err(|error| format!("Failed to write desktop workspace state: {error}"))
}

fn default_desktop_workspace_state() -> DesktopWorkspaceState {
    DesktopWorkspaceState {
        schema_version: DESKTOP_WORKSPACE_STATE_SCHEMA_VERSION.to_string(),
        active_workspace_path: String::new(),
        active_workspace_source: "unset".to_string(),
        repository_url: String::new(),
        last_operation: "none".to_string(),
        last_status: "unset".to_string(),
        created_at: String::new(),
        updated_at: String::new(),
    }
}

fn active_desktop_workspace_root(app: &AppHandle) -> Result<Option<PathBuf>, String> {
    let state = read_desktop_workspace_state(app)?;
    if state.active_workspace_path.trim().is_empty() {
        return Ok(None);
    }
    let canonical = canonical_user_workspace_path(&state.active_workspace_path)?;
    Ok(Some(canonical))
}

fn canonical_user_workspace_path(path: &str) -> Result<PathBuf, String> {
    let trimmed = path.trim();
    if trimmed.is_empty() {
        return Err("Workspace path is required.".to_string());
    }
    let value = Path::new(trimmed);
    if !value.is_absolute() {
        return Err(
            "Workspace path must be an absolute path for the desktop app profile.".to_string(),
        );
    }
    let canonical = value
        .canonicalize()
        .map_err(|error| format!("Failed to resolve workspace path: {error}"))?;
    ensure_not_private_root(&canonical)?;
    if !canonical.is_dir() {
        return Err("Workspace path must be a directory.".to_string());
    }
    Ok(canonical)
}

fn desktop_workspace_state_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?
        .join("workspace-host")
        .join("desktop-workspace-state.v1.json"))
}

fn managed_desktop_workspaces_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?.join("managed-workspaces"))
}

fn git_capability_status() -> (bool, String) {
    let Some(git_path) = resolve_command("git") else {
        return (false, "capability_missing".to_string());
    };
    let output = run_bounded_command(
        &git_path,
        &["--version"],
        Duration::from_millis(2_000),
        MAX_HEALTH_OUTPUT_BYTES,
    );
    match output {
        Ok(output) => (
            output.status == "passed",
            first_non_empty_line(&output.stdout)
                .or_else(|| first_non_empty_line(&output.stderr))
                .unwrap_or_else(|| "git available".to_string()),
        ),
        Err(error) => (false, error),
    }
}

fn validate_git_repository_url(repository_url: &str) -> Result<String, String> {
    let trimmed = repository_url.trim();
    if trimmed.is_empty() {
        return Err("Repository URL is required.".to_string());
    }
    if trimmed.len() > MAX_GIT_REPOSITORY_URL_BYTES {
        return Err(format!(
            "Repository URL is too long. Max size is {MAX_GIT_REPOSITORY_URL_BYTES} bytes."
        ));
    }
    if trimmed.chars().any(char::is_whitespace) {
        return Err("Repository URL must not contain whitespace.".to_string());
    }
    if trimmed.starts_with("https://")
        || trimmed.starts_with("http://")
        || trimmed.starts_with("ssh://")
        || trimmed.starts_with("git@")
    {
        return Ok(trimmed.to_string());
    }
    Err("Repository URL must be an https, http, ssh, or git@ URL.".to_string())
}

fn workspace_folder_name(
    folder_name: Option<&str>,
    repository_url: &str,
) -> Result<String, String> {
    let candidate = folder_name
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(ToOwned::to_owned)
        .unwrap_or_else(|| {
            repository_url
                .trim_end_matches('/')
                .rsplit(['/', ':'])
                .next()
                .unwrap_or("workspace")
                .trim_end_matches(".git")
                .to_string()
        });
    if candidate.len() > MAX_WORKSPACE_FOLDER_NAME_BYTES {
        return Err(format!(
            "Workspace folder name is too long. Max size is {MAX_WORKSPACE_FOLDER_NAME_BYTES} bytes."
        ));
    }
    let sanitized = sanitize_file_name(&candidate)
        .trim_matches('-')
        .trim_matches('.')
        .to_string();
    if sanitized.is_empty() {
        return Err("Workspace folder name is empty after sanitization.".to_string());
    }
    Ok(sanitized)
}

fn redact_repository_url(repository_url: &str) -> String {
    let Some(scheme_index) = repository_url.find("://") else {
        return repository_url.to_string();
    };
    let credential_start = scheme_index + 3;
    let Some(at_offset) = repository_url[credential_start..].find('@') else {
        return repository_url.to_string();
    };
    let at_index = credential_start + at_offset;
    format!(
        "{}://<credentials>@{}",
        &repository_url[..scheme_index],
        &repository_url[at_index + 1..]
    )
}

fn redact_clone_output(
    output: &str,
    repository_url: &str,
    redacted_repository_url: &str,
) -> String {
    if repository_url == redacted_repository_url {
        return output.to_string();
    }
    output.replace(repository_url, redacted_repository_url)
}

trait EmptyStringFallback {
    fn if_empty(self, fallback: &str) -> String;
}

impl EmptyStringFallback for String {
    fn if_empty(self, fallback: &str) -> String {
        if self.trim().is_empty() {
            fallback.to_string()
        } else {
            self
        }
    }
}

fn resolve_workspace_dir(
    app: &AppHandle,
    relative_or_absolute: Option<&str>,
) -> Result<PathBuf, String> {
    let root = workspace_root_for_app(Some(app))?;
    let candidate = match relative_or_absolute
        .map(str::trim)
        .filter(|value| !value.is_empty())
    {
        Some(path) => {
            let value = Path::new(path);
            if value.is_absolute() {
                value.to_path_buf()
            } else {
                root.join(value)
            }
        }
        None => root.clone(),
    };
    let canonical = candidate
        .canonicalize()
        .map_err(|error| format!("Failed to resolve working directory: {error}"))?;
    ensure_workspace_path(&root, &canonical)?;
    if !canonical.is_dir() {
        return Err("Working directory must be a directory.".to_string());
    }
    Ok(canonical)
}

fn resolve_workspace_file(
    app: Option<&AppHandle>,
    relative_path: &str,
    existing_required: bool,
) -> Result<(PathBuf, String), String> {
    let root = workspace_root_for_app(app)?;
    let normalized = normalize_relative_workspace_path(relative_path)?;
    let path = root.join(&normalized);
    let parent = path
        .parent()
        .ok_or_else(|| "Workspace file path must have a parent directory.".to_string())?
        .canonicalize()
        .map_err(|error| format!("Failed to resolve workspace file parent: {error}"))?;
    ensure_workspace_path(&root, &parent)?;
    if existing_required {
        if !path.exists() {
            return Err(format!("Workspace file does not exist: {normalized}"));
        }
        if !path.is_file() {
            return Err(format!("Workspace path is not a file: {normalized}"));
        }
        let canonical_file = path
            .canonicalize()
            .map_err(|error| format!("Failed to resolve workspace file: {error}"))?;
        ensure_workspace_path(&root, &canonical_file)?;
        return Ok((canonical_file, normalized));
    }
    Ok((path, normalized))
}

fn normalize_relative_workspace_path(relative_path: &str) -> Result<String, String> {
    let trimmed = relative_path.trim();
    if trimmed.is_empty() {
        return Err("Workspace path is empty.".to_string());
    }
    let path = Path::new(trimmed);
    if path.is_absolute() {
        return Err("Workspace path must be relative to the selected workspace root.".to_string());
    }

    let mut normalized = Vec::new();
    for component in path.components() {
        match component {
            Component::Normal(value) => {
                let text = value.to_string_lossy();
                if text == "_private" || text == "outputs" {
                    return Err(
                        "Workspace path points to a protected local-only directory.".to_string()
                    );
                }
                normalized.push(text.to_string());
            }
            _ => {
                return Err(
                    "Workspace path must not contain '.', '..', root, or prefix components."
                        .to_string(),
                );
            }
        }
    }
    if normalized.is_empty() {
        return Err("Workspace path is empty.".to_string());
    }
    Ok(normalized.join("/"))
}

fn workspace_root_for_app(app: Option<&AppHandle>) -> Result<PathBuf, String> {
    if let Some(app) = app {
        if let Some(root) = active_desktop_workspace_root(app)? {
            return Ok(root);
        }
    }
    workspace_root()
}

fn workspace_root() -> Result<PathBuf, String> {
    if let Some(value) = env::var_os("AGENT_WORKSPACE_ROOT") {
        let root = PathBuf::from(value)
            .canonicalize()
            .map_err(|error| format!("Failed to resolve AGENT_WORKSPACE_ROOT: {error}"))?;
        ensure_not_private_root(&root)?;
        return Ok(root);
    }

    let cwd =
        env::current_dir().map_err(|error| format!("Failed to read current directory: {error}"))?;
    if cwd.join("AGENTS.md").exists() {
        return cwd
            .canonicalize()
            .map_err(|error| format!("Failed to resolve current workspace root: {error}"));
    }
    if let Some(parent) = cwd.parent() {
        if parent.join("AGENTS.md").exists() {
            return parent
                .canonicalize()
                .map_err(|error| format!("Failed to resolve parent workspace root: {error}"));
        }
    }
    cwd.canonicalize()
        .map_err(|error| format!("Failed to resolve fallback workspace root: {error}"))
}

fn ensure_workspace_path(root: &Path, candidate: &Path) -> Result<(), String> {
    let canonical_root = root
        .canonicalize()
        .map_err(|error| format!("Failed to canonicalize workspace root: {error}"))?;
    if !candidate.starts_with(&canonical_root) {
        return Err("Path is outside the selected workspace root.".to_string());
    }
    ensure_not_private_root(candidate)
}

fn ensure_not_private_root(path: &Path) -> Result<(), String> {
    for component in path.components() {
        if let Component::Normal(value) = component {
            let text = value.to_string_lossy();
            if text == "_private" || text == "outputs" {
                return Err("Path points to a protected local-only directory.".to_string());
            }
        }
    }
    Ok(())
}

fn source_backup_path(root: &Path, relative_path: &str) -> Result<PathBuf, String> {
    let base = if root.join("platform-desktop-app").exists() {
        root.join("platform-desktop-app")
    } else {
        root.to_path_buf()
    };
    let millis = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|value| value.as_millis())
        .unwrap_or(0);
    Ok(base
        .join("artifacts")
        .join("source-editor-backups")
        .join(format!(
            "{millis}-{}.bak",
            sanitize_file_name(relative_path)
        )))
}

fn sanitize_file_name(value: &str) -> String {
    value
        .chars()
        .map(|character| {
            if character.is_ascii_alphanumeric() || matches!(character, '-' | '_' | '.') {
                character
            } else {
                '-'
            }
        })
        .collect()
}

fn resolve_command(command: &str) -> Option<PathBuf> {
    if command.contains(std::path::MAIN_SEPARATOR) {
        let path = PathBuf::from(command);
        return is_executable_file(&path).then_some(path);
    }

    let path_var = env::var_os("PATH")?;
    for base in env::split_paths(&path_var) {
        let candidate = base.join(command);
        if is_executable_file(&candidate) {
            return Some(candidate);
        }

        #[cfg(windows)]
        {
            for extension in ["exe", "cmd", "bat"] {
                let with_extension = base.join(format!("{command}.{extension}"));
                if is_executable_file(&with_extension) {
                    return Some(with_extension);
                }
            }
        }
    }

    None
}

#[cfg(unix)]
fn is_executable_file(path: &PathBuf) -> bool {
    use std::os::unix::fs::PermissionsExt;

    path.is_file()
        && path
            .metadata()
            .map(|metadata| metadata.permissions().mode() & 0o111 != 0)
            .unwrap_or(false)
}

#[cfg(not(unix))]
fn is_executable_file(path: &PathBuf) -> bool {
    path.is_file()
}
