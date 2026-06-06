use portable_pty::{native_pty_system, CommandBuilder, MasterPty, PtySize};
use rayon::prelude::*;
use rayon::{ThreadPool, ThreadPoolBuilder};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use std::collections::{HashMap, HashSet};
use std::env;
use std::fs;
use std::io::{Read, Write};
#[cfg(unix)]
use std::os::unix::process::CommandExt;
use std::path::{Component, Path, PathBuf};
use std::process::{Child, ChildStdin, Command, Stdio};
use std::sync::{mpsc, Arc, Mutex};
use std::thread;
use std::time::{Duration, Instant, SystemTime, UNIX_EPOCH};
use sysinfo::{get_current_pid, ProcessRefreshKind, ProcessesToUpdate, System};
use tauri::{AppHandle, Manager, State};
use tauri_plugin_clipboard_manager::ClipboardExt;
use tauri_plugin_dialog::DialogExt;
use tauri_plugin_opener::OpenerExt;

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

struct ProviderCredentialDefinition {
    provider_id: &'static str,
    label: &'static str,
    auth_method: &'static str,
    env_var: &'static str,
    default_model: &'static str,
    setup_url: &'static str,
    login_url: &'static str,
    docs_url: &'static str,
    caution: &'static str,
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

#[derive(Default)]
struct PtySessionStore {
    sessions: Mutex<HashMap<String, NativePtySession>>,
}

struct WorkspaceResourceStore {
    inner: Arc<WorkspaceResourceStoreInner>,
}

struct WorkspaceResourceStoreInner {
    cache: Mutex<Option<WorkspaceResourceCache>>,
    warmup: Mutex<WorkspaceResourceWarmupReport>,
}

impl Default for WorkspaceResourceStore {
    fn default() -> Self {
        Self {
            inner: Arc::new(WorkspaceResourceStoreInner {
                cache: Mutex::new(None),
                warmup: Mutex::new(WorkspaceResourceWarmupReport::default()),
            }),
        }
    }
}

impl Clone for WorkspaceResourceStore {
    fn clone(&self) -> Self {
        Self {
            inner: Arc::clone(&self.inner),
        }
    }
}

#[derive(Clone, Default)]
struct WorkspaceResourceCache {
    root_path: String,
    generated_at: String,
    scanned_entries: usize,
    truncated: bool,
    files: Vec<WorkspaceTextFileEntry>,
    text_files: HashMap<String, WorkspaceTextFile>,
    cached_bytes: usize,
    scan_duration_ms: u64,
    entry_build_duration_ms: u64,
    preload_duration_ms: u64,
    profile: WorkspaceResourceProfile,
}

#[derive(Clone, Default, Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceResourceProfile {
    system_supported: bool,
    cpu_threads: usize,
    available_parallelism: usize,
    parallel_workers: usize,
    total_memory_bytes: u64,
    available_memory_bytes: u64,
    used_memory_bytes: u64,
    memory_budget_bytes: usize,
    preload_file_limit: usize,
    preload_byte_limit: usize,
    preload_strategy: String,
}

#[derive(Clone, Default, Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceResourceSnapshotCache {
    cache_status: String,
    root_path: String,
    generated_at: String,
    scanned_entries: usize,
    total_count: usize,
    cached_text_files: usize,
    cached_bytes: usize,
    scan_duration_ms: u64,
    entry_build_duration_ms: u64,
    preload_duration_ms: u64,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopResourceSnapshotReport {
    status: String,
    schema_version: String,
    sampled_at: String,
    system_supported: bool,
    app_pid: u32,
    process_name: String,
    process_memory_bytes: u64,
    process_virtual_memory_bytes: u64,
    process_cpu_usage: f32,
    process_run_time_seconds: u64,
    process_task_count: usize,
    cpu_threads: usize,
    available_parallelism: usize,
    parallel_workers: usize,
    global_cpu_usage: f32,
    total_memory_bytes: u64,
    available_memory_bytes: u64,
    used_memory_bytes: u64,
    memory_budget_bytes: usize,
    preload_byte_limit: usize,
    preload_file_limit: usize,
    preload_strategy: String,
    workspace_cache: WorkspaceResourceSnapshotCache,
    semantic_metrics: Vec<DesktopResourceMetric>,
    warmup_status: String,
    warmup_source: String,
    warmup_error: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopResourceMetric {
    name: &'static str,
    value: f64,
    unit: &'static str,
    source: &'static str,
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

struct NativePtySession {
    label: String,
    command: String,
    child: Box<dyn portable_pty::Child + Send + Sync>,
    master: Option<Box<dyn MasterPty + Send>>,
    writer: Option<Box<dyn Write + Send>>,
    output: Arc<Mutex<NativePtyOutput>>,
    reader_handle: Option<thread::JoinHandle<()>>,
    started: Instant,
    working_dir: PathBuf,
    status: String,
    exit_code: Option<i32>,
    finished: bool,
    finished_at: Option<Instant>,
    rows: u16,
    cols: u16,
    pid: Option<u32>,
}

#[derive(Clone, Default)]
struct NativePtyOutput {
    output: String,
    output_truncated: bool,
}

impl Drop for CliSession {
    fn drop(&mut self) {
        dispose_cli_session_runtime(self, "dropped");
    }
}

impl Drop for NativePtySession {
    fn drop(&mut self) {
        dispose_native_pty_session_runtime(self, "dropped");
    }
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
struct NativePtySessionReport {
    session_id: String,
    label: String,
    command: String,
    status: String,
    exit_code: Option<i32>,
    elapsed_ms: u128,
    output: String,
    output_truncated: bool,
    working_dir: String,
    rows: u16,
    cols: u16,
    pid: Option<u32>,
    terminal_kind: String,
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

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceTextFile {
    relative_path: String,
    content: String,
    size_bytes: usize,
    max_size_bytes: usize,
}

#[derive(Clone, Serialize)]
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

#[derive(Clone, Serialize)]
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
struct WorkspaceResourcePrepareReport {
    status: String,
    source: String,
    schema_version: String,
    root_path: String,
    generated_at: String,
    scanned_entries: usize,
    total_count: usize,
    returned_count: usize,
    cached_text_files: usize,
    cached_bytes: usize,
    preload_file_limit: usize,
    preload_byte_limit: usize,
    memory_budget_bytes: usize,
    cpu_threads: usize,
    available_parallelism: usize,
    parallel_workers: usize,
    total_memory_bytes: u64,
    available_memory_bytes: u64,
    used_memory_bytes: u64,
    scan_duration_ms: u64,
    entry_build_duration_ms: u64,
    preload_duration_ms: u64,
    preload_strategy: String,
    system_supported: bool,
    warmup_status: String,
    truncated: bool,
    catalog: WorkspaceTextFileListReport,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceResourceWarmupReport {
    schema_version: String,
    status: String,
    source: String,
    root_path: String,
    started_at: String,
    finished_at: String,
    cached_text_files: usize,
    cached_bytes: usize,
    memory_budget_bytes: usize,
    cpu_threads: usize,
    available_parallelism: usize,
    parallel_workers: usize,
    total_memory_bytes: u64,
    available_memory_bytes: u64,
    used_memory_bytes: u64,
    scan_duration_ms: u64,
    entry_build_duration_ms: u64,
    preload_duration_ms: u64,
    preload_strategy: String,
    system_supported: bool,
    error: String,
}

impl Default for WorkspaceResourceWarmupReport {
    fn default() -> Self {
        Self {
            schema_version: WORKSPACE_RESOURCE_CACHE_SCHEMA_VERSION.to_string(),
            status: "idle".to_string(),
            source: "not_started".to_string(),
            root_path: String::new(),
            started_at: String::new(),
            finished_at: String::new(),
            cached_text_files: 0,
            cached_bytes: 0,
            memory_budget_bytes: 0,
            cpu_threads: 0,
            available_parallelism: 0,
            parallel_workers: 0,
            total_memory_bytes: 0,
            available_memory_bytes: 0,
            used_memory_bytes: 0,
            scan_duration_ms: 0,
            entry_build_duration_ms: 0,
            preload_duration_ms: 0,
            preload_strategy: String::new(),
            system_supported: false,
            error: String::new(),
        }
    }
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

#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct DesktopRuntimeInitDefaults {
    adapter_id: String,
    session_mode_id: String,
    task_pipe_kind: String,
    auto_defer_questions: bool,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct DesktopProviderOverride {
    provider_id: String,
    default_model: String,
    base_url: String,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct DesktopTerminalQuickCommand {
    id: String,
    label: String,
    detail: String,
    input: String,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct DesktopTerminalCustomization {
    shell_command: String,
    startup_command: String,
    quick_commands: Vec<DesktopTerminalQuickCommand>,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct DesktopRuntimeCustomization {
    provider_overrides: Vec<DesktopProviderOverride>,
    terminal: DesktopTerminalCustomization,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct DesktopPreferences {
    schema_version: String,
    ui_language: String,
    theme_mode: String,
    sidebar_mode: String,
    terminal_drawer_open: bool,
    runtime_init_defaults: DesktopRuntimeInitDefaults,
    runtime_customization: DesktopRuntimeCustomization,
    pinned_sections: Vec<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopPreferencesReport {
    schema_version: String,
    status: String,
    source: String,
    preferences_path: String,
    preferences: DesktopPreferences,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct ProviderCredentialRecord {
    provider_id: String,
    auth_method: String,
    account_hint: String,
    secret: String,
    created_at: String,
    updated_at: String,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct ProviderCredentialStore {
    schema_version: String,
    credentials: Vec<ProviderCredentialRecord>,
}

#[derive(Deserialize)]
#[serde(default, rename_all = "camelCase")]
struct ProviderCredentialInput {
    provider_id: String,
    auth_method: String,
    secret: String,
    account_hint: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ProviderCredentialSummary {
    provider_id: String,
    label: String,
    auth_method: String,
    env_var: String,
    default_model: String,
    configured: bool,
    environment_available: bool,
    status: String,
    account_hint: String,
    secret_preview: String,
    last_updated_at: String,
    storage: String,
    credential_source: String,
    setup_url: String,
    login_url: String,
    docs_url: String,
    caution: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ProviderCredentialReport {
    schema_version: String,
    status: String,
    source: String,
    credential_file_path: String,
    storage_warning: String,
    configured_count: usize,
    providers: Vec<ProviderCredentialSummary>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ProviderModelSummary {
    provider_id: String,
    id: String,
    label: String,
    size: Option<u64>,
    modified_at: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ProviderModelCatalogReport {
    provider_id: String,
    provider_label: String,
    status: String,
    source: String,
    default_model: String,
    models: Vec<ProviderModelSummary>,
    error: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ProviderAuthUrlOpenReport {
    provider_id: String,
    purpose: String,
    url: String,
    status: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct SystemClipboardTextReport {
    status: String,
    text: String,
    text_length: usize,
}

#[derive(Deserialize)]
#[serde(default, rename_all = "camelCase")]
struct ProviderAgentTaskInput {
    provider_id: String,
    model: String,
    task_kind: String,
    prompt: String,
    system_prompt: String,
    working_dir: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ProviderAgentTaskReport {
    task_run_id: String,
    provider_id: String,
    provider_label: String,
    model: String,
    status: String,
    http_status: Option<u16>,
    duration_ms: u128,
    output: String,
    stderr: String,
    output_truncated: bool,
    working_dir: String,
    task_kind: String,
    task_record_path: Option<String>,
    stdout_log_path: Option<String>,
    stderr_log_path: Option<String>,
    persistence_error: Option<String>,
    request_id: String,
}

impl Default for DesktopRuntimeInitDefaults {
    fn default() -> Self {
        Self {
            adapter_id: "codex-cli".to_string(),
            session_mode_id: "platform-improvement".to_string(),
            task_pipe_kind: "platform_improvement_pipe".to_string(),
            auto_defer_questions: true,
        }
    }
}

impl Default for DesktopProviderOverride {
    fn default() -> Self {
        Self {
            provider_id: String::new(),
            default_model: String::new(),
            base_url: String::new(),
        }
    }
}

impl Default for DesktopTerminalQuickCommand {
    fn default() -> Self {
        Self {
            id: String::new(),
            label: String::new(),
            detail: String::new(),
            input: String::new(),
        }
    }
}

impl Default for DesktopTerminalCustomization {
    fn default() -> Self {
        Self {
            shell_command: String::new(),
            startup_command: String::new(),
            quick_commands: default_terminal_quick_commands(),
        }
    }
}

impl Default for DesktopRuntimeCustomization {
    fn default() -> Self {
        Self {
            provider_overrides: default_provider_overrides(),
            terminal: DesktopTerminalCustomization::default(),
        }
    }
}

impl Default for DesktopPreferences {
    fn default() -> Self {
        Self {
            schema_version: DESKTOP_PREFERENCES_SCHEMA_VERSION.to_string(),
            ui_language: "ko".to_string(),
            theme_mode: "system".to_string(),
            sidebar_mode: "collapsed".to_string(),
            terminal_drawer_open: false,
            runtime_init_defaults: DesktopRuntimeInitDefaults::default(),
            runtime_customization: DesktopRuntimeCustomization::default(),
            pinned_sections: vec![
                "overview".to_string(),
                "desktop".to_string(),
                "agents".to_string(),
                "source".to_string(),
                "intent".to_string(),
            ],
        }
    }
}

impl Default for ProviderCredentialRecord {
    fn default() -> Self {
        Self {
            provider_id: String::new(),
            auth_method: "api_key".to_string(),
            account_hint: String::new(),
            secret: String::new(),
            created_at: String::new(),
            updated_at: String::new(),
        }
    }
}

impl Default for ProviderCredentialStore {
    fn default() -> Self {
        Self {
            schema_version: PROVIDER_CREDENTIALS_SCHEMA_VERSION.to_string(),
            credentials: Vec::new(),
        }
    }
}

impl Default for ProviderCredentialInput {
    fn default() -> Self {
        Self {
            provider_id: String::new(),
            auth_method: "api_key".to_string(),
            secret: String::new(),
            account_hint: String::new(),
        }
    }
}

impl Default for ProviderAgentTaskInput {
    fn default() -> Self {
        Self {
            provider_id: String::new(),
            model: String::new(),
            task_kind: "provider_agent_task".to_string(),
            prompt: String::new(),
            system_prompt: String::new(),
            working_dir: None,
        }
    }
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
struct DesktopGitFileReport {
    status: String,
    path: String,
    original_path: Option<String>,
    change_kind: String,
    staged: bool,
    unstaged: bool,
    untracked: bool,
    conflicted: bool,
    additions: usize,
    deletions: usize,
    diff_preview: Vec<DesktopGitDiffLineReport>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopGitDiffLineReport {
    kind: String,
    text: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopGitRemoteReport {
    name: String,
    url: String,
    direction: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopGitHistoryFileReport {
    path: String,
    additions: usize,
    deletions: usize,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopGitHistoryCommitReport {
    hash: String,
    short_hash: String,
    subject: String,
    author: String,
    authored_at: String,
    files_changed: usize,
    additions: usize,
    deletions: usize,
    files: Vec<DesktopGitHistoryFileReport>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopGitStashReport {
    reference: String,
    branch: String,
    message: String,
    files_changed: usize,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopGitStatusReport {
    schema_version: String,
    status: String,
    workspace_path: String,
    git_available: bool,
    git_version: String,
    repository_root: String,
    branch: String,
    upstream: String,
    ahead: usize,
    behind: usize,
    clean: bool,
    conflicted: bool,
    staged_count: usize,
    unstaged_count: usize,
    untracked_count: usize,
    files: Vec<DesktopGitFileReport>,
    remotes: Vec<DesktopGitRemoteReport>,
    history: Vec<DesktopGitHistoryCommitReport>,
    stashes: Vec<DesktopGitStashReport>,
    last_command_status: String,
    last_command_output: String,
    last_command_error: String,
    refreshed_at: String,
    summary: Vec<String>,
}

#[derive(Deserialize)]
#[serde(default, rename_all = "camelCase")]
struct DesktopGitActionInput {
    action: String,
    commit_message: String,
    branch_name: String,
    file_paths: Vec<String>,
    stash_ref: String,
}

impl Default for DesktopGitActionInput {
    fn default() -> Self {
        Self {
            action: "refresh".to_string(),
            commit_message: String::new(),
            branch_name: String::new(),
            file_paths: Vec::new(),
            stash_ref: String::new(),
        }
    }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct DesktopGitActionReport {
    status: String,
    action: String,
    command: String,
    output: String,
    error: String,
    refreshed_at: String,
    git: DesktopGitStatusReport,
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
    provider_credential_store_path: String,
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

#[derive(Deserialize)]
#[serde(default, rename_all = "camelCase")]
struct AgentFactoryProposalInput {
    agent_id: String,
    label: String,
    goal: String,
    role: String,
    tools: Vec<String>,
    guardrails: Vec<String>,
    validation_commands: Vec<String>,
    output_contract: String,
    owner_project: String,
    target_path: String,
    rollback_plan: String,
}

impl Default for AgentFactoryProposalInput {
    fn default() -> Self {
        Self {
            agent_id: String::new(),
            label: String::new(),
            goal: String::new(),
            role: String::new(),
            tools: Vec::new(),
            guardrails: Vec::new(),
            validation_commands: Vec::new(),
            output_contract: String::new(),
            owner_project: "agent-platform".to_string(),
            target_path: String::new(),
            rollback_plan: String::new(),
        }
    }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct AgentFactoryProposalReport {
    status: String,
    proposal_id: String,
    proposal_path: String,
    target_path: String,
    created_at: String,
    agent_id: String,
    label: String,
    validation_command: String,
    rollback_plan: String,
    spec: Value,
}

#[derive(Deserialize)]
#[serde(default, rename_all = "camelCase")]
struct LearningImprovementDecisionInput {
    candidate_id: String,
    label: String,
    source: String,
    evidence: Vec<String>,
    action: String,
    asset_type: String,
    target_path: String,
    validation_command: String,
    rollback_plan: String,
    notes: String,
}

impl Default for LearningImprovementDecisionInput {
    fn default() -> Self {
        Self {
            candidate_id: String::new(),
            label: String::new(),
            source: String::new(),
            evidence: Vec::new(),
            action: "defer".to_string(),
            asset_type: "prompt".to_string(),
            target_path: String::new(),
            validation_command: String::new(),
            rollback_plan: String::new(),
            notes: String::new(),
        }
    }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct LearningImprovementDecisionReport {
    status: String,
    decision_id: String,
    decision_path: String,
    created_at: String,
    candidate_id: String,
    action: String,
    asset_type: String,
    target_path: String,
    validation_command: String,
    rollback_plan: String,
    record: Value,
}

const MAX_HEALTH_OUTPUT_BYTES: usize = 20_000;
const HEALTH_TIMEOUT_MS: u64 = 2_500;
const MAX_SESSION_OUTPUT_BYTES: usize = 100_000;
const MAX_DECISION_SCAN_BYTES: usize = 32_000;
const SESSION_TIMEOUT_MS: u64 = 300_000;
const FINISHED_SESSION_RETENTION_MS: u64 = 30 * 60 * 1000;
const MAX_RETAINED_FINISHED_SESSIONS: usize = 40;
const MAX_SESSION_INPUT_BYTES: usize = 20_000;
const SESSION_READER_JOIN_GRACE_MS: u64 = 250;
const SESSION_READER_JOIN_POLL_MS: u64 = 10;
const MAX_WORKSPACE_FILE_BYTES: usize = 1_000_000;
const DEFAULT_WORKSPACE_SOURCE_LIST_LIMIT: usize = 240;
const MAX_WORKSPACE_SOURCE_LIST_LIMIT: usize = 500;
const MAX_WORKSPACE_SOURCE_SCAN_ENTRIES: usize = 40_000;
const MAX_SOURCE_LIST_LINE_COUNT_BYTES: usize = 128_000;
const WORKSPACE_RESOURCE_CACHE_SCHEMA_VERSION: &str = "workspace-os-resource-cache.v1";
const DEFAULT_WORKSPACE_PRELOAD_TEXT_BYTES: usize = 128_000_000;
const MIN_WORKSPACE_PRELOAD_TEXT_BYTES: usize = 32_000_000;
const MAX_WORKSPACE_PRELOAD_TEXT_FILES: usize = 2_048;
const MAX_WORKSPACE_PRELOAD_TEXT_BYTES: usize = 512_000_000;
const MAX_WORKSPACE_PRELOAD_WORKERS: usize = 16;
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
const DESKTOP_PREFERENCES_SCHEMA_VERSION: &str = "desktop-preferences.v1";
const PROVIDER_CREDENTIALS_SCHEMA_VERSION: &str = "provider-credentials.v1";
const GIT_CLONE_TIMEOUT_MS: u64 = 120_000;
const MAX_GIT_CLONE_OUTPUT_BYTES: usize = 24_000;
const MAX_GIT_REPOSITORY_URL_BYTES: usize = 2_048;
const GIT_OPERATION_TIMEOUT_MS: u64 = 90_000;
const MAX_GIT_OPERATION_OUTPUT_BYTES: usize = 32_000;
const MAX_GIT_STATUS_FILES: usize = 160;
const MAX_GIT_DIFF_PREVIEW_FILES: usize = 32;
const MAX_GIT_DIFF_PREVIEW_LINES: usize = 80;
const MAX_GIT_DIFF_PREVIEW_OUTPUT_BYTES: usize = 24_000;
const MAX_GIT_COMMIT_MESSAGE_CHARS: usize = 500;
const MAX_GIT_ACTION_FILE_PATHS: usize = 120;
const MAX_GIT_HISTORY_COMMITS: usize = 40;
const MAX_GIT_STASHES: usize = 20;
const DESKTOP_GIT_STATUS_SCHEMA_VERSION: &str = "desktop-git-status.v1";
const MAX_WORKSPACE_FOLDER_NAME_BYTES: usize = 120;
const MAX_PROVIDER_SECRET_BYTES: usize = 8_192;
const MAX_PROVIDER_ACCOUNT_HINT_CHARS: usize = 160;
const MAX_PROVIDER_BASE_URL_CHARS: usize = 240;
const MAX_PROVIDER_MODEL_CHARS: usize = 140;
const MAX_TERMINAL_COMMAND_CHARS: usize = 512;
const MAX_TERMINAL_STARTUP_COMMAND_CHARS: usize = 2_000;
const MAX_TERMINAL_QUICK_COMMANDS: usize = 8;
const OPENAI_BASE_URL: &str = "https://api.openai.com/v1";
const ANTHROPIC_BASE_URL: &str = "https://api.anthropic.com";
const GEMINI_BASE_URL: &str = "https://generativelanguage.googleapis.com";
const MAX_PROVIDER_TASK_OUTPUT_BYTES: usize = 100_000;
const MAX_PROVIDER_TASK_OUTPUT_TOKENS: u64 = 2_048;
const PROVIDER_TASK_TIMEOUT_MS: u64 = 120_000;
const LOCAL_HTTP_AUTH_METHOD: &str = "local_http";
const OLLAMA_PROVIDER_ID: &str = "ollama";
const OLLAMA_BASE_URL: &str = "http://127.0.0.1:11434";
const OLLAMA_DEFAULT_MODEL: &str = "llama3.2";
const MAX_SUPPORT_BUNDLE_RECENT_TASK_RUNS: usize = 20;
const MAX_SUPPORT_EVENT_CHARS: usize = 600;
const MAX_FACTORY_FIELD_CHARS: usize = 4_000;
const MAX_FACTORY_LIST_ITEMS: usize = 24;
const MAX_FACTORY_LIST_ITEM_CHARS: usize = 500;

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
    AdapterDefinition {
        adapter_id: "claw-code-cli",
        label: "Claw Code",
        command: "claw",
        version_args: &["--version"],
        session_args: &[],
    },
];

static PROVIDER_CREDENTIALS: &[ProviderCredentialDefinition] = &[
    ProviderCredentialDefinition {
        provider_id: OLLAMA_PROVIDER_ID,
        label: "Ollama / Local",
        auth_method: LOCAL_HTTP_AUTH_METHOD,
        env_var: "",
        default_model: OLLAMA_DEFAULT_MODEL,
        setup_url: "https://ollama.com/download",
        login_url: "https://ollama.com/download",
        docs_url: "https://docs.ollama.com/api",
        caution: "Runs through the local Ollama HTTP runtime at 127.0.0.1:11434. No API key is stored; install Ollama and pull a model before first use.",
    },
    ProviderCredentialDefinition {
        provider_id: "openai",
        label: "ChatGPT / OpenAI",
        auth_method: "api_key",
        env_var: "OPENAI_API_KEY",
        default_model: "gpt-5.2",
        setup_url: "https://platform.openai.com/api-keys",
        login_url: "https://platform.openai.com/api-keys",
        docs_url: "https://platform.openai.com/docs/api-reference/authentication",
        caution: "Open the OpenAI Platform API keys page, sign in with the target account, create a restricted project key, then save it here. Do not store ChatGPT web session cookies.",
    },
    ProviderCredentialDefinition {
        provider_id: "anthropic",
        label: "Claude / Anthropic",
        auth_method: "api_key",
        env_var: "ANTHROPIC_API_KEY",
        default_model: "claude-sonnet-4-6",
        setup_url: "https://console.anthropic.com/settings/keys",
        login_url: "https://claude.ai/login",
        docs_url: "https://platform.claude.com/docs/en/api/authentication/overview",
        caution: "Use a Claude API key or provider-supported federation; consumer web OAuth tokens are not stored here.",
    },
    ProviderCredentialDefinition {
        provider_id: "google-gemini",
        label: "Gemini / Google",
        auth_method: "api_key",
        env_var: "GEMINI_API_KEY",
        default_model: "gemini-3.5-flash",
        setup_url: "https://aistudio.google.com/api-keys",
        login_url: "https://aistudio.google.com/api-keys",
        docs_url: "https://ai.google.dev/gemini-api/docs/api-key",
        caution: "Open Google AI Studio API keys, sign in with the target Google account, create a restricted Gemini key, then save it here. Vertex AI OAuth or ADC remains a separate production provider flow.",
    },
];

fn provider_default_base_url(provider_id: &str) -> &'static str {
    match provider_id {
        OLLAMA_PROVIDER_ID => OLLAMA_BASE_URL,
        "openai" => OPENAI_BASE_URL,
        "anthropic" => ANTHROPIC_BASE_URL,
        "google-gemini" => GEMINI_BASE_URL,
        _ => "",
    }
}

fn default_provider_overrides() -> Vec<DesktopProviderOverride> {
    PROVIDER_CREDENTIALS
        .iter()
        .map(|definition| DesktopProviderOverride {
            provider_id: definition.provider_id.to_string(),
            default_model: definition.default_model.to_string(),
            base_url: provider_default_base_url(definition.provider_id).to_string(),
        })
        .collect()
}

fn default_terminal_quick_commands() -> Vec<DesktopTerminalQuickCommand> {
    vec![
        DesktopTerminalQuickCommand {
            id: "pwd".to_string(),
            label: "현재 위치".to_string(),
            detail: "pwd".to_string(),
            input: "pwd\n".to_string(),
        },
        DesktopTerminalQuickCommand {
            id: "list".to_string(),
            label: "파일 목록".to_string(),
            detail: "ls -la".to_string(),
            input: "ls -la\n".to_string(),
        },
        DesktopTerminalQuickCommand {
            id: "git".to_string(),
            label: "Git 상태".to_string(),
            detail: "git status --short".to_string(),
            input: "git status --short\n".to_string(),
        },
    ]
}

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
        lane_id: "orchestration_lane",
        adapter_id: "claw-code-cli",
        role: "slash-command and team-orchestration critique lane",
        prompt_suffix: "Review whether this task should become a slash command, team lane, skill, hook, plugin, or parity-gap record before merge.",
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

static SEARCH_AGENT_LANES: &[PipelineLaneDefinition] = &[
    PipelineLaneDefinition {
        lane_id: "research_insight_lane",
        adapter_id: "codex-cli",
        role: "existing research-insight-planner-agent execution lane",
        prompt_suffix: "Act as research-insight-planner-agent using agent-platform/configs/agents/research-insight-planner-agent.json and agent-platform/configs/planning/research-insight-plan-template.json. Return grounded evidence, uncertainty, plan steps, validation steps, and capture targets.",
    },
    PipelineLaneDefinition {
        lane_id: "source_ranking_lane",
        adapter_id: "gemini-cli",
        role: "source discovery and ranking lane",
        prompt_suffix: "Broaden the search query ladder, rank high-authority and contrary sources, and separate adoption signals from factual evidence.",
    },
    PipelineLaneDefinition {
        lane_id: "grounding_review_lane",
        adapter_id: "claude-code-cli",
        role: "citation grounding and skeptic review lane",
        prompt_suffix: "Check unsupported claims, missing source methodology, citation coverage, and user decisions that should be deferred.",
    },
];

static PIPELINE_PRESETS: &[PipelineTaskPreset] = &[
    PipelineTaskPreset {
        task_kind: "research_insight_agent_pipe",
        label: "Search Agent Pipe",
        intent: "Initialize the existing research-insight-planner-agent with source ranking and skeptic review lanes.",
        lanes: SEARCH_AGENT_LANES,
        merge_gate: "research_insight_merge_gate",
    },
    PipelineTaskPreset {
        task_kind: "platform_improvement_pipe",
        label: "Platform Improvement Pipe",
        intent:
            "Initialize implementation, review, research, orchestration, and fallback lanes for platform changes.",
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
fn get_desktop_preferences(app: AppHandle) -> Result<DesktopPreferencesReport, String> {
    desktop_preferences_report(&app)
}

#[tauri::command]
fn save_desktop_preferences(
    app: AppHandle,
    preferences: DesktopPreferences,
) -> Result<DesktopPreferencesReport, String> {
    save_desktop_preferences_report(&app, preferences)
}

#[tauri::command]
fn list_provider_credentials(app: AppHandle) -> Result<ProviderCredentialReport, String> {
    provider_credentials_report(&app)
}

#[tauri::command]
fn save_provider_credential(
    app: AppHandle,
    input: ProviderCredentialInput,
) -> Result<ProviderCredentialReport, String> {
    save_provider_credential_report(&app, input)
}

#[tauri::command]
fn clear_provider_credential(
    app: AppHandle,
    provider_id: String,
) -> Result<ProviderCredentialReport, String> {
    clear_provider_credential_report(&app, &provider_id)
}

#[tauri::command]
fn open_provider_auth_url(
    app: AppHandle,
    provider_id: String,
    purpose: Option<String>,
) -> Result<ProviderAuthUrlOpenReport, String> {
    open_provider_auth_url_report(&app, &provider_id, purpose.as_deref())
}

#[tauri::command]
fn read_system_clipboard_text(app: AppHandle) -> Result<SystemClipboardTextReport, String> {
    read_system_clipboard_text_report(&app)
}

#[tauri::command]
fn write_system_clipboard_text(
    app: AppHandle,
    text: String,
) -> Result<SystemClipboardTextReport, String> {
    write_system_clipboard_text_report(&app, &text)
}

#[tauri::command]
async fn list_provider_models(
    app: AppHandle,
    provider_id: String,
) -> Result<ProviderModelCatalogReport, String> {
    list_provider_models_report(&app, &provider_id).await
}

#[tauri::command]
async fn run_provider_agent_task(
    app: AppHandle,
    input: ProviderAgentTaskInput,
) -> Result<ProviderAgentTaskReport, String> {
    run_provider_agent_task_report(&app, input).await
}

#[tauri::command]
fn get_desktop_workspace_state(app: AppHandle) -> Result<DesktopWorkspaceStateReport, String> {
    desktop_workspace_state_report(&app, None, None)
}

#[tauri::command]
fn set_desktop_workspace_path(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    path: String,
) -> Result<DesktopWorkspaceStateReport, String> {
    let report = set_desktop_workspace_path_report(&app, &path)?;
    cache_store.clear_cache()?;
    Ok(report)
}

#[tauri::command]
async fn choose_desktop_workspace_folder(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
) -> Result<DesktopWorkspaceStateReport, String> {
    let Some(folder_path) = app
        .dialog()
        .file()
        .set_title("작업공간 폴더 선택")
        .blocking_pick_folder()
    else {
        return desktop_workspace_state_report(
            &app,
            None,
            Some("folder_selection_canceled".to_string()),
        );
    };
    let path = folder_path
        .into_path()
        .map_err(|error| format!("Failed to resolve selected folder path: {error}"))?;
    let report = set_desktop_workspace_path_report(&app, &path_to_string(&path))?;
    cache_store.clear_cache()?;
    Ok(report)
}

#[tauri::command]
fn clone_desktop_workspace(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    repository_url: String,
    folder_name: Option<String>,
) -> Result<DesktopWorkspaceStateReport, String> {
    let report = clone_desktop_workspace_report(&app, &repository_url, folder_name.as_deref())?;
    cache_store.clear_cache()?;
    Ok(report)
}

#[tauri::command]
fn get_desktop_git_status(app: AppHandle) -> Result<DesktopGitStatusReport, String> {
    desktop_git_status_report(&app, None, None, None)
}

#[tauri::command]
fn run_desktop_git_action(
    app: AppHandle,
    input: DesktopGitActionInput,
) -> Result<DesktopGitActionReport, String> {
    run_desktop_git_action_report(&app, input)
}

#[tauri::command]
fn create_agent_factory_proposal(
    app: AppHandle,
    input: AgentFactoryProposalInput,
) -> Result<AgentFactoryProposalReport, String> {
    create_agent_factory_proposal_report(&app, input)
}

#[tauri::command]
fn record_learning_improvement_decision(
    app: AppHandle,
    input: LearningImprovementDecisionInput,
) -> Result<LearningImprovementDecisionReport, String> {
    record_learning_improvement_decision_report(&app, input)
}

#[tauri::command]
fn start_cli_adapter_session(
    app: AppHandle,
    store: State<'_, SessionStore>,
    adapter_id: String,
    prompt: String,
    working_dir: Option<String>,
    auto_defer_questions: Option<bool>,
    task_kind: Option<String>,
) -> Result<CliSessionReport, String> {
    if prompt.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Prompt is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let adapter =
        find_adapter(&adapter_id).ok_or_else(|| format!("Unknown adapter id: {adapter_id}"))?;
    let working_dir = resolve_workspace_dir(&app, working_dir.as_deref())?;
    let session_task_kind = normalize_task_kind(task_kind.as_deref(), "single_cli_session")?;
    let (session_id, mut session, report) = create_cli_session(
        &app,
        adapter,
        &prompt,
        working_dir,
        auto_defer_questions.unwrap_or(true),
        &session_task_kind,
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
            dispose_cli_session_runtime(&mut session, "store_lock_failed");
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
                dispose_cli_session_runtime(&mut session, "store_lock_failed");
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
    let provider_env = provider_env_for_adapter(app, adapter.adapter_id)?;
    let mut command = Command::new(&path);
    command
        .args(adapter.session_args)
        .current_dir(&working_dir)
        .stdin(Stdio::piped())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());
    configure_process_group(&mut command);
    for (key, value) in provider_env {
        command.env(key, value);
    }
    let mut child = command
        .spawn()
        .map_err(|error| format!("Failed to start CLI session: {error}"))?;

    let mut stdin = match child.stdin.take() {
        Some(stdin) => stdin,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture CLI stdin.".to_string());
        }
    };
    if !prompt.trim().is_empty() {
        if let Err(error) = stdin
            .write_all(prompt.as_bytes())
            .and_then(|_| stdin.write_all(b"\n"))
            .and_then(|_| stdin.flush())
        {
            let _ = kill_and_wait_child(&mut child);
            return Err(format!("Failed to write initial prompt: {error}"));
        }
    }

    let stdout = match child.stdout.take() {
        Some(stdout) => stdout,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture CLI stdout.".to_string());
        }
    };
    let stderr = match child.stderr.take() {
        Some(stderr) => stderr,
        None => {
            let _ = kill_and_wait_child(&mut child);
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
fn start_native_pty_terminal(
    app: AppHandle,
    store: State<'_, PtySessionStore>,
    working_dir: Option<String>,
    command: Option<String>,
    rows: Option<u16>,
    cols: Option<u16>,
) -> Result<NativePtySessionReport, String> {
    let working_dir = resolve_workspace_dir(&app, working_dir.as_deref())?;
    let command = command
        .map(|value| value.trim().to_string())
        .filter(|value| !value.is_empty())
        .unwrap_or_else(default_native_shell);
    if command.len() > 512 {
        return Err("PTY command is too long. Max length is 512 bytes.".to_string());
    }

    let (session_id, mut session, report) =
        create_native_pty_session(&command, working_dir, rows, cols)?;
    match store.sessions.lock() {
        Ok(mut sessions) => {
            cleanup_finished_pty_sessions_locked(&mut sessions);
            sessions.insert(session_id, session);
        }
        Err(_) => {
            dispose_native_pty_session_runtime(&mut session, "store_lock_failed");
            return Err("Failed to lock native PTY session store.".to_string());
        }
    }
    Ok(report)
}

#[tauri::command]
fn poll_native_pty_terminal_session(
    store: State<'_, PtySessionStore>,
    session_id: String,
) -> Result<NativePtySessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let report = {
        let session = sessions
            .get_mut(&session_id)
            .ok_or_else(|| format!("Unknown native PTY session id: {session_id}"))?;
        poll_native_pty_session_locked(&session_id, session)
    };
    cleanup_finished_pty_sessions_locked(&mut sessions);
    Ok(report)
}

#[tauri::command]
fn list_native_pty_terminal_sessions(
    store: State<'_, PtySessionStore>,
) -> Result<Vec<NativePtySessionReport>, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let reports: Vec<NativePtySessionReport> = sessions
        .iter_mut()
        .map(|(session_id, session)| poll_native_pty_session_locked(session_id, session))
        .collect();
    cleanup_finished_pty_sessions_locked(&mut sessions);
    Ok(reports)
}

#[tauri::command]
fn write_native_pty_terminal_input(
    store: State<'_, PtySessionStore>,
    session_id: String,
    input: String,
) -> Result<NativePtySessionReport, String> {
    if input.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Input is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown native PTY session id: {session_id}"))?;
    if session.finished {
        return Err("Cannot write input to a finished native PTY session.".to_string());
    }
    let writer = session
        .writer
        .as_mut()
        .ok_or_else(|| "Native PTY writer is not available.".to_string())?;
    writer
        .write_all(input.as_bytes())
        .and_then(|_| writer.flush())
        .map_err(|error| format!("Failed to write native PTY input: {error}"))?;
    Ok(poll_native_pty_session_locked(&session_id, session))
}

#[tauri::command]
fn resize_native_pty_terminal(
    store: State<'_, PtySessionStore>,
    session_id: String,
    rows: u16,
    cols: u16,
) -> Result<NativePtySessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown native PTY session id: {session_id}"))?;
    let size = normalized_pty_size(Some(rows), Some(cols));
    let master = session
        .master
        .as_mut()
        .ok_or_else(|| "Native PTY master is not available.".to_string())?;
    master
        .resize(size)
        .map_err(|error| format!("Failed to resize native PTY: {error}"))?;
    session.rows = size.rows;
    session.cols = size.cols;
    Ok(poll_native_pty_session_locked(&session_id, session))
}

#[tauri::command]
fn cancel_native_pty_terminal(
    store: State<'_, PtySessionStore>,
    session_id: String,
) -> Result<NativePtySessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock native PTY session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown native PTY session id: {session_id}"))?;
    let exit_code = kill_and_wait_pty_child(session.child.as_mut());
    mark_pty_session_finished(session, "canceled", exit_code);
    Ok(poll_native_pty_session_locked(&session_id, session))
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
    cache_store: State<'_, WorkspaceResourceStore>,
    relative_path: String,
) -> Result<WorkspaceTextFile, String> {
    let root = workspace_root_for_app(Some(&app))?;
    let normalized = normalize_relative_workspace_path(&relative_path)?;
    if let Some(file) = cache_store.cached_text_file(&root, &normalized)? {
        return Ok(file);
    }

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
    let file = WorkspaceTextFile {
        relative_path: normalized,
        size_bytes: content.len(),
        content,
        max_size_bytes: MAX_WORKSPACE_FILE_BYTES,
    };
    cache_store.upsert_text_file(&root, &file)?;
    Ok(file)
}

#[tauri::command]
fn list_workspace_text_files(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    filter: Option<String>,
    limit: Option<usize>,
) -> Result<WorkspaceTextFileListReport, String> {
    let root = workspace_root_for_app(Some(&app))?;
    let normalized_filter = filter.unwrap_or_default().trim().to_lowercase();
    let limit = limit
        .unwrap_or(DEFAULT_WORKSPACE_SOURCE_LIST_LIMIT)
        .clamp(1, MAX_WORKSPACE_SOURCE_LIST_LIMIT);

    if let Some(cache) = cache_store.cache_for_root(&root)? {
        return Ok(workspace_list_report_from_cache(
            &cache,
            &normalized_filter,
            limit,
            "runtime_workspace_os_cache",
        ));
    }

    let cache = build_workspace_resource_cache(&root, false)?;
    cache_store.replace_cache(cache.clone())?;
    Ok(workspace_list_report_from_cache(
        &cache,
        &normalized_filter,
        limit,
        "runtime_workspace_os_scan_cache",
    ))
}

#[tauri::command]
fn warm_workspace_os_resources(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    force_refresh: Option<bool>,
) -> Result<WorkspaceResourceWarmupReport, String> {
    let root = workspace_root_for_app(Some(&app))?;
    cache_store.start_background_warmup(
        root,
        force_refresh.unwrap_or(false),
        "background_workspace_os_warmup",
    )
}

#[tauri::command]
fn prepare_workspace_os_resources(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
    filter: Option<String>,
    limit: Option<usize>,
    preload_contents: Option<bool>,
    force_refresh: Option<bool>,
) -> Result<WorkspaceResourcePrepareReport, String> {
    let root = workspace_root_for_app(Some(&app))?;
    let normalized_filter = filter.unwrap_or_default().trim().to_lowercase();
    let limit = limit
        .unwrap_or(DEFAULT_WORKSPACE_SOURCE_LIST_LIMIT)
        .clamp(1, MAX_WORKSPACE_SOURCE_LIST_LIMIT);
    let force_refresh = force_refresh.unwrap_or(false);
    let cache = if !force_refresh {
        cache_store.cache_for_root(&root)?
    } else {
        None
    };
    let cache = match cache {
        Some(cache) => cache,
        None => {
            let cache = build_workspace_resource_cache(&root, preload_contents.unwrap_or(true))?;
            cache_store.replace_cache(cache.clone())?;
            cache_store.set_warmup_report(workspace_warmup_report_from_cache(
                &cache,
                "foreground_workspace_os_prepare",
            ))?;
            cache
        }
    };
    let catalog = workspace_list_report_from_cache(
        &cache,
        &normalized_filter,
        limit,
        "runtime_workspace_os_prepared_cache",
    );
    let warmup = cache_store.warmup_report()?;
    Ok(workspace_resource_prepare_report(&cache, catalog, &warmup))
}

#[tauri::command]
fn get_desktop_resource_snapshot(
    cache_store: State<'_, WorkspaceResourceStore>,
) -> Result<DesktopResourceSnapshotReport, String> {
    let profile = workspace_resource_profile();
    let mut system = System::new();
    system.refresh_memory();
    system.refresh_cpu_all();

    let current_pid = get_current_pid().ok();
    if let Some(pid) = current_pid {
        let process_refresh = ProcessRefreshKind::nothing()
            .with_cpu()
            .with_memory()
            .with_tasks();
        system.refresh_processes_specifics(ProcessesToUpdate::Some(&[pid]), false, process_refresh);
        thread::sleep(Duration::from_millis(120));
        system.refresh_cpu_all();
        system.refresh_processes_specifics(ProcessesToUpdate::Some(&[pid]), false, process_refresh);
    }

    let process = current_pid.and_then(|pid| system.process(pid));
    let warmup = cache_store.warmup_report()?;
    let workspace_cache = cache_store.snapshot_cache()?;

    let process_memory_bytes = process.map(|item| item.memory()).unwrap_or(0);
    let process_virtual_memory_bytes = process.map(|item| item.virtual_memory()).unwrap_or(0);
    let process_cpu_usage = process.map(|item| item.cpu_usage()).unwrap_or(0.0);
    let process_task_count = process
        .and_then(|item| item.tasks().map(|tasks| tasks.len()))
        .unwrap_or(0);
    let semantic_metrics = vec![
        DesktopResourceMetric {
            name: "process.memory.usage",
            value: process_memory_bytes as f64,
            unit: "By",
            source: "sysinfo",
        },
        DesktopResourceMetric {
            name: "process.memory.virtual",
            value: process_virtual_memory_bytes as f64,
            unit: "By",
            source: "sysinfo",
        },
        DesktopResourceMetric {
            name: "process.cpu.utilization",
            value: f64::from(process_cpu_usage) / 100.0,
            unit: "1",
            source: "sysinfo",
        },
        DesktopResourceMetric {
            name: "process.thread.count",
            value: process_task_count as f64,
            unit: "{thread}",
            source: "sysinfo",
        },
    ];

    Ok(DesktopResourceSnapshotReport {
        status: "sampled".to_string(),
        schema_version: "desktop-resource-snapshot.v1".to_string(),
        sampled_at: current_unix_millis_label(),
        system_supported: sysinfo::IS_SUPPORTED_SYSTEM,
        app_pid: current_pid.map(|pid| pid.as_u32()).unwrap_or(0),
        process_name: process
            .map(|item| item.name().to_string_lossy().to_string())
            .unwrap_or_else(|| "unknown".to_string()),
        process_memory_bytes,
        process_virtual_memory_bytes,
        process_cpu_usage,
        process_run_time_seconds: process.map(|item| item.run_time()).unwrap_or(0),
        process_task_count,
        cpu_threads: profile.cpu_threads,
        available_parallelism: profile.available_parallelism,
        parallel_workers: profile.parallel_workers,
        global_cpu_usage: system.global_cpu_usage(),
        total_memory_bytes: system.total_memory(),
        available_memory_bytes: system.available_memory(),
        used_memory_bytes: system.used_memory(),
        memory_budget_bytes: profile.memory_budget_bytes,
        preload_byte_limit: profile.preload_byte_limit,
        preload_file_limit: profile.preload_file_limit,
        preload_strategy: profile.preload_strategy,
        workspace_cache,
        semantic_metrics,
        warmup_status: warmup.status,
        warmup_source: warmup.source,
        warmup_error: warmup.error,
    })
}

#[tauri::command]
fn write_workspace_text_file(
    app: AppHandle,
    cache_store: State<'_, WorkspaceResourceStore>,
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
    cache_store.clear_cache()?;
    Ok(WorkspaceWriteReport {
        relative_path: normalized,
        size_bytes: content.len(),
        backup_path: backup_path.to_string_lossy().to_string(),
        status: "written_with_backup".to_string(),
    })
}

impl WorkspaceResourceStore {
    fn cache_for_root(&self, root: &Path) -> Result<Option<WorkspaceResourceCache>, String> {
        let root_path = path_to_string(root);
        let cache = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        Ok(cache
            .as_ref()
            .filter(|cached| cached.root_path == root_path)
            .cloned())
    }

    fn replace_cache(&self, cache: WorkspaceResourceCache) -> Result<(), String> {
        let mut current = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        *current = Some(cache);
        Ok(())
    }

    fn clear_cache(&self) -> Result<(), String> {
        let mut current = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        *current = None;
        drop(current);
        self.set_warmup_report(WorkspaceResourceWarmupReport {
            status: "invalidated".to_string(),
            source: "cache_cleared".to_string(),
            finished_at: current_unix_millis_label(),
            ..WorkspaceResourceWarmupReport::default()
        })?;
        Ok(())
    }

    fn cached_text_file(
        &self,
        root: &Path,
        relative_path: &str,
    ) -> Result<Option<WorkspaceTextFile>, String> {
        let root_path = path_to_string(root);
        let cache = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        Ok(cache
            .as_ref()
            .filter(|cached| cached.root_path == root_path)
            .and_then(|cached| cached.text_files.get(relative_path).cloned()))
    }

    fn upsert_text_file(&self, root: &Path, file: &WorkspaceTextFile) -> Result<(), String> {
        let root_path = path_to_string(root);
        let mut cache = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        let Some(current) = cache.as_mut() else {
            return Ok(());
        };
        if current.root_path != root_path {
            return Ok(());
        }
        current.cached_bytes = current
            .cached_bytes
            .saturating_sub(
                current
                    .text_files
                    .get(&file.relative_path)
                    .map(|cached| cached.size_bytes)
                    .unwrap_or(0),
            )
            .saturating_add(file.size_bytes);
        current
            .text_files
            .insert(file.relative_path.clone(), file.clone());
        Ok(())
    }

    fn warmup_report(&self) -> Result<WorkspaceResourceWarmupReport, String> {
        let report = self
            .inner
            .warmup
            .lock()
            .map_err(|_| "Workspace resource warmup lock is poisoned.".to_string())?;
        Ok(report.clone())
    }

    fn set_warmup_report(&self, report: WorkspaceResourceWarmupReport) -> Result<(), String> {
        let mut current = self
            .inner
            .warmup
            .lock()
            .map_err(|_| "Workspace resource warmup lock is poisoned.".to_string())?;
        *current = report;
        Ok(())
    }

    fn snapshot_cache(&self) -> Result<WorkspaceResourceSnapshotCache, String> {
        let cache = self
            .inner
            .cache
            .lock()
            .map_err(|_| "Workspace resource cache lock is poisoned.".to_string())?;
        Ok(match cache.as_ref() {
            Some(cache) => WorkspaceResourceSnapshotCache {
                cache_status: "ready".to_string(),
                root_path: cache.root_path.clone(),
                generated_at: cache.generated_at.clone(),
                scanned_entries: cache.scanned_entries,
                total_count: cache.files.len(),
                cached_text_files: cache.text_files.len(),
                cached_bytes: cache.cached_bytes,
                scan_duration_ms: cache.scan_duration_ms,
                entry_build_duration_ms: cache.entry_build_duration_ms,
                preload_duration_ms: cache.preload_duration_ms,
            },
            None => WorkspaceResourceSnapshotCache {
                cache_status: "empty".to_string(),
                ..WorkspaceResourceSnapshotCache::default()
            },
        })
    }

    fn start_background_warmup(
        &self,
        root: PathBuf,
        force_refresh: bool,
        source: &str,
    ) -> Result<WorkspaceResourceWarmupReport, String> {
        let root_path = path_to_string(&root);
        if !force_refresh {
            if let Some(cache) = self.cache_for_root(&root)? {
                let report = workspace_warmup_report_from_cache(&cache, "ready_from_memory");
                self.set_warmup_report(report.clone())?;
                return Ok(report);
            }
        } else {
            self.clear_cache()?;
        }

        let current = self.warmup_report()?;
        if current.status == "warming" && current.root_path == root_path {
            return Ok(current);
        }

        let started_at = current_unix_millis_label();
        let profile = workspace_resource_profile();
        let warming = WorkspaceResourceWarmupReport {
            schema_version: WORKSPACE_RESOURCE_CACHE_SCHEMA_VERSION.to_string(),
            status: "warming".to_string(),
            source: source.to_string(),
            root_path,
            started_at,
            finished_at: String::new(),
            cached_text_files: 0,
            cached_bytes: 0,
            memory_budget_bytes: profile.memory_budget_bytes,
            cpu_threads: profile.cpu_threads,
            available_parallelism: profile.available_parallelism,
            parallel_workers: profile.parallel_workers,
            total_memory_bytes: profile.total_memory_bytes,
            available_memory_bytes: profile.available_memory_bytes,
            used_memory_bytes: profile.used_memory_bytes,
            scan_duration_ms: 0,
            entry_build_duration_ms: 0,
            preload_duration_ms: 0,
            preload_strategy: profile.preload_strategy,
            system_supported: profile.system_supported,
            error: String::new(),
        };
        self.set_warmup_report(warming.clone())?;

        let store = self.clone();
        let warming_for_thread = warming.clone();
        thread::Builder::new()
            .name("workspace-resource-warmup".to_string())
            .spawn(move || {
                let result = build_workspace_resource_cache(&root, true);
                match result {
                    Ok(cache) => {
                        let report = workspace_warmup_report_from_cache(
                            &cache,
                            "background_workspace_os_warmup",
                        );
                        if let Err(error) = store.replace_cache(cache) {
                            let mut failed = report.clone();
                            failed.status = "failed".to_string();
                            failed.error = error;
                            failed.finished_at = current_unix_millis_label();
                            let _ = store.set_warmup_report(failed);
                            return;
                        }
                        let _ = store.set_warmup_report(report);
                    }
                    Err(error) => {
                        let mut failed = warming_for_thread;
                        failed.status = "failed".to_string();
                        failed.finished_at = current_unix_millis_label();
                        failed.error = error;
                        let _ = store.set_warmup_report(failed);
                    }
                }
            })
            .map_err(|error| {
                format!("Failed to spawn workspace resource warmup thread: {error}")
            })?;

        Ok(warming)
    }
}

struct WorkspaceTextFileScanResult {
    scanned_entries: usize,
    truncated: bool,
    files: Vec<WorkspaceTextFileEntry>,
    scan_duration_ms: u64,
    entry_build_duration_ms: u64,
}

struct WorkspaceTextFileCandidate {
    path: PathBuf,
    relative_path: String,
    metadata: fs::Metadata,
}

struct WorkspacePreloadCandidate {
    path: PathBuf,
    relative_path: String,
    size_bytes: usize,
}

fn scan_workspace_text_file_entries(
    root: &Path,
    normalized_filter: &str,
    profile: &WorkspaceResourceProfile,
) -> WorkspaceTextFileScanResult {
    let scan_started = Instant::now();
    let mut stack = vec![root.to_path_buf()];
    let mut scanned_entries = 0_usize;
    let mut candidates = Vec::new();
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
            let relative_path = workspace_relative_display_path(root, &path);
            if !is_source_editor_text_path(&relative_path) {
                continue;
            }
            if !normalized_filter.is_empty()
                && !relative_path.to_lowercase().contains(normalized_filter)
            {
                continue;
            }

            let metadata = match entry.metadata() {
                Ok(metadata) => metadata,
                Err(_) => continue,
            };
            candidates.push(WorkspaceTextFileCandidate {
                path,
                relative_path,
                metadata,
            });
        }
    }

    let scan_duration_ms = elapsed_millis(scan_started);
    let entry_started = Instant::now();
    let mut files: Vec<WorkspaceTextFileEntry> = if let Some(pool) =
        build_workspace_thread_pool(profile.parallel_workers, "workspace-entry-build")
    {
        pool.install(|| {
            candidates
                .par_iter()
                .map(|candidate| {
                    workspace_text_file_entry(
                        root,
                        &candidate.path,
                        &candidate.relative_path,
                        &candidate.metadata,
                    )
                })
                .collect()
        })
    } else {
        candidates
            .iter()
            .map(|candidate| {
                workspace_text_file_entry(
                    root,
                    &candidate.path,
                    &candidate.relative_path,
                    &candidate.metadata,
                )
            })
            .collect()
    };
    let entry_build_duration_ms = elapsed_millis(entry_started);

    files.sort_by(|left, right| left.path.cmp(&right.path));
    WorkspaceTextFileScanResult {
        scanned_entries,
        truncated,
        files,
        scan_duration_ms,
        entry_build_duration_ms,
    }
}

fn build_workspace_resource_cache(
    root: &Path,
    preload_contents: bool,
) -> Result<WorkspaceResourceCache, String> {
    let profile = workspace_resource_profile();
    let scan = scan_workspace_text_file_entries(root, "", &profile);
    let preload_started = Instant::now();
    let (text_files, cached_bytes) = if preload_contents {
        preload_workspace_text_files(root, &scan.files, &profile)
    } else {
        (HashMap::new(), 0)
    };
    let preload_duration_ms = elapsed_millis(preload_started);

    Ok(WorkspaceResourceCache {
        root_path: path_to_string(root),
        generated_at: current_unix_millis_label(),
        scanned_entries: scan.scanned_entries,
        truncated: scan.truncated,
        files: scan.files,
        text_files,
        cached_bytes,
        scan_duration_ms: scan.scan_duration_ms,
        entry_build_duration_ms: scan.entry_build_duration_ms,
        preload_duration_ms,
        profile,
    })
}

fn workspace_resource_profile() -> WorkspaceResourceProfile {
    let available_parallelism = thread::available_parallelism()
        .map(|parallelism| parallelism.get())
        .unwrap_or(1);
    let mut system = System::new();
    system.refresh_memory();
    system.refresh_cpu_all();

    let cpu_threads = system.cpus().len().max(available_parallelism).max(1);
    let parallel_workers = cpu_threads
        .saturating_sub(1)
        .max(1)
        .min(MAX_WORKSPACE_PRELOAD_WORKERS);
    let available_memory_bytes = system.available_memory();
    let memory_budget_bytes = workspace_memory_budget_bytes(available_memory_bytes);
    let preload_file_limit = if memory_budget_bytes >= DEFAULT_WORKSPACE_PRELOAD_TEXT_BYTES {
        MAX_WORKSPACE_PRELOAD_TEXT_FILES
    } else {
        MAX_WORKSPACE_PRELOAD_TEXT_FILES / 4
    };

    WorkspaceResourceProfile {
        system_supported: sysinfo::IS_SUPPORTED_SYSTEM,
        cpu_threads,
        available_parallelism,
        parallel_workers,
        total_memory_bytes: system.total_memory(),
        available_memory_bytes,
        used_memory_bytes: system.used_memory(),
        memory_budget_bytes,
        preload_file_limit,
        preload_byte_limit: memory_budget_bytes,
        preload_strategy: "rayon_parallel_cpu_ram_budget".to_string(),
    }
}

fn workspace_memory_budget_bytes(available_memory_bytes: u64) -> usize {
    if available_memory_bytes == 0 {
        return DEFAULT_WORKSPACE_PRELOAD_TEXT_BYTES;
    }

    let available_memory = usize::try_from(available_memory_bytes).unwrap_or(usize::MAX);
    if available_memory < MIN_WORKSPACE_PRELOAD_TEXT_BYTES.saturating_mul(2) {
        return (available_memory / 4)
            .max(8_000_000)
            .min(MIN_WORKSPACE_PRELOAD_TEXT_BYTES);
    }

    (available_memory / 4).clamp(
        DEFAULT_WORKSPACE_PRELOAD_TEXT_BYTES,
        MAX_WORKSPACE_PRELOAD_TEXT_BYTES,
    )
}

fn build_workspace_thread_pool(worker_count: usize, name: &str) -> Option<ThreadPool> {
    let thread_name_prefix = name.to_string();
    ThreadPoolBuilder::new()
        .num_threads(worker_count.max(1))
        .thread_name(move |index| format!("{thread_name_prefix}-{index}"))
        .build()
        .ok()
}

fn preload_workspace_text_files(
    root: &Path,
    entries: &[WorkspaceTextFileEntry],
    profile: &WorkspaceResourceProfile,
) -> (HashMap<String, WorkspaceTextFile>, usize) {
    let mut selected = Vec::new();
    let mut selected_bytes = 0_usize;

    for entry in entries.iter().filter(|entry| !entry.truncated) {
        if selected.len() >= profile.preload_file_limit {
            break;
        }
        if entry.size_bytes > MAX_WORKSPACE_FILE_BYTES {
            continue;
        }
        if selected_bytes.saturating_add(entry.size_bytes) > profile.preload_byte_limit {
            continue;
        }
        selected_bytes = selected_bytes.saturating_add(entry.size_bytes);
        selected.push(WorkspacePreloadCandidate {
            path: root.join(&entry.path),
            relative_path: entry.path.clone(),
            size_bytes: entry.size_bytes,
        });
    }

    let loaded: Vec<WorkspaceTextFile> = if let Some(pool) =
        build_workspace_thread_pool(profile.parallel_workers, "workspace-preload")
    {
        pool.install(|| {
            selected
                .par_iter()
                .filter_map(read_workspace_preload_candidate)
                .collect()
        })
    } else {
        selected
            .iter()
            .filter_map(read_workspace_preload_candidate)
            .collect()
    };
    let cached_bytes = loaded.iter().map(|file| file.size_bytes).sum();
    let text_files = loaded
        .into_iter()
        .map(|file| (file.relative_path.clone(), file))
        .collect();

    (text_files, cached_bytes)
}

fn read_workspace_preload_candidate(
    candidate: &WorkspacePreloadCandidate,
) -> Option<WorkspaceTextFile> {
    if candidate.size_bytes > MAX_WORKSPACE_FILE_BYTES {
        return None;
    }
    let content = fs::read_to_string(&candidate.path).ok()?;
    if content.len() > MAX_WORKSPACE_FILE_BYTES {
        return None;
    }
    Some(WorkspaceTextFile {
        relative_path: candidate.relative_path.clone(),
        size_bytes: content.len(),
        content,
        max_size_bytes: MAX_WORKSPACE_FILE_BYTES,
    })
}

fn workspace_list_report_from_cache(
    cache: &WorkspaceResourceCache,
    normalized_filter: &str,
    limit: usize,
    source: &str,
) -> WorkspaceTextFileListReport {
    let mut files: Vec<WorkspaceTextFileEntry> = cache
        .files
        .iter()
        .filter(|entry| {
            normalized_filter.is_empty() || entry.path.to_lowercase().contains(normalized_filter)
        })
        .cloned()
        .collect();
    files.sort_by(|left, right| left.path.cmp(&right.path));
    let total_count = files.len();
    let truncated = cache.truncated || total_count > limit;
    let files: Vec<WorkspaceTextFileEntry> = files.into_iter().take(limit).collect();
    WorkspaceTextFileListReport {
        status: "listed".to_string(),
        source: source.to_string(),
        total_count,
        returned_count: files.len(),
        truncated,
        files,
    }
}

fn workspace_resource_prepare_report(
    cache: &WorkspaceResourceCache,
    catalog: WorkspaceTextFileListReport,
    warmup: &WorkspaceResourceWarmupReport,
) -> WorkspaceResourcePrepareReport {
    WorkspaceResourcePrepareReport {
        status: "prepared".to_string(),
        source: catalog.source.clone(),
        schema_version: WORKSPACE_RESOURCE_CACHE_SCHEMA_VERSION.to_string(),
        root_path: cache.root_path.clone(),
        generated_at: cache.generated_at.clone(),
        scanned_entries: cache.scanned_entries,
        total_count: catalog.total_count,
        returned_count: catalog.returned_count,
        cached_text_files: cache.text_files.len(),
        cached_bytes: cache.cached_bytes,
        preload_file_limit: cache.profile.preload_file_limit,
        preload_byte_limit: cache.profile.preload_byte_limit,
        memory_budget_bytes: cache.profile.memory_budget_bytes,
        cpu_threads: cache.profile.cpu_threads,
        available_parallelism: cache.profile.available_parallelism,
        parallel_workers: cache.profile.parallel_workers,
        total_memory_bytes: cache.profile.total_memory_bytes,
        available_memory_bytes: cache.profile.available_memory_bytes,
        used_memory_bytes: cache.profile.used_memory_bytes,
        scan_duration_ms: cache.scan_duration_ms,
        entry_build_duration_ms: cache.entry_build_duration_ms,
        preload_duration_ms: cache.preload_duration_ms,
        preload_strategy: cache.profile.preload_strategy.clone(),
        system_supported: cache.profile.system_supported,
        warmup_status: warmup.status.clone(),
        truncated: cache.truncated || catalog.truncated,
        catalog,
    }
}

fn workspace_warmup_report_from_cache(
    cache: &WorkspaceResourceCache,
    source: &str,
) -> WorkspaceResourceWarmupReport {
    WorkspaceResourceWarmupReport {
        schema_version: WORKSPACE_RESOURCE_CACHE_SCHEMA_VERSION.to_string(),
        status: "ready".to_string(),
        source: source.to_string(),
        root_path: cache.root_path.clone(),
        started_at: cache.generated_at.clone(),
        finished_at: current_unix_millis_label(),
        cached_text_files: cache.text_files.len(),
        cached_bytes: cache.cached_bytes,
        memory_budget_bytes: cache.profile.memory_budget_bytes,
        cpu_threads: cache.profile.cpu_threads,
        available_parallelism: cache.profile.available_parallelism,
        parallel_workers: cache.profile.parallel_workers,
        total_memory_bytes: cache.profile.total_memory_bytes,
        available_memory_bytes: cache.profile.available_memory_bytes,
        used_memory_bytes: cache.profile.used_memory_bytes,
        scan_duration_ms: cache.scan_duration_ms,
        entry_build_duration_ms: cache.entry_build_duration_ms,
        preload_duration_ms: cache.preload_duration_ms,
        preload_strategy: cache.profile.preload_strategy.clone(),
        system_supported: cache.profile.system_supported,
        error: String::new(),
    }
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
    let context = tauri::generate_context!();
    let updater_configured = context
        .config()
        .plugins
        .0
        .get("updater")
        .is_some_and(|value| value.is_object());
    let mut builder = tauri::Builder::default()
        .manage(SessionStore::default())
        .manage(PtySessionStore::default())
        .manage(WorkspaceResourceStore::default())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_clipboard_manager::init());

    if updater_configured {
        builder = builder.plugin(tauri_plugin_updater::Builder::new().build());
    }

    builder
        .setup(|app| {
            let handle = app.handle().clone();
            let cache_store = handle.state::<WorkspaceResourceStore>();
            if let Ok(root) = workspace_root_for_app(Some(&handle)) {
                let _ =
                    cache_store.start_background_warmup(root, false, "startup_workspace_os_warmup");
            }
            Ok(())
        })
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
            get_desktop_preferences,
            save_desktop_preferences,
            list_provider_credentials,
            save_provider_credential,
            clear_provider_credential,
            open_provider_auth_url,
            read_system_clipboard_text,
            write_system_clipboard_text,
            list_provider_models,
            run_provider_agent_task,
            get_desktop_workspace_state,
            set_desktop_workspace_path,
            choose_desktop_workspace_folder,
            clone_desktop_workspace,
            get_desktop_git_status,
            run_desktop_git_action,
            create_agent_factory_proposal,
            record_learning_improvement_decision,
            start_cli_adapter_session,
            start_cli_task_pipeline,
            poll_cli_adapter_session,
            list_cli_adapter_sessions,
            start_native_pty_terminal,
            poll_native_pty_terminal_session,
            list_native_pty_terminal_sessions,
            write_native_pty_terminal_input,
            resize_native_pty_terminal,
            cancel_native_pty_terminal,
            write_cli_adapter_stdin,
            send_cli_adapter_defer_message,
            defer_all_cli_adapter_questions,
            cancel_cli_adapter_session,
            get_desktop_resource_snapshot,
            warm_workspace_os_resources,
            prepare_workspace_os_resources,
            list_workspace_text_files,
            read_workspace_text_file,
            write_workspace_text_file,
            list_human_decision_inbox,
            answer_human_decision,
            answer_and_resume_human_decision
        ])
        .run(context)
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

fn normalize_task_kind(value: Option<&str>, fallback: &str) -> Result<String, String> {
    let candidate = value
        .map(str::trim)
        .filter(|item| !item.is_empty())
        .unwrap_or(fallback);
    if candidate.len() > 80 {
        return Err("Task kind is too long. Max length is 80 characters.".to_string());
    }
    if !candidate.chars().all(|character| {
        character.is_ascii_lowercase() || character.is_ascii_digit() || character == '_'
    }) {
        return Err(
            "Task kind may only use lowercase letters, numbers, and underscores.".to_string(),
        );
    }
    Ok(candidate.to_string())
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
    run_bounded_command_with_cwd(path, args, None, timeout, max_output_bytes)
}

fn run_bounded_command_in_dir(
    path: &PathBuf,
    args: &[&str],
    cwd: &Path,
    timeout: Duration,
    max_output_bytes: usize,
) -> Result<ProcessOutput, String> {
    run_bounded_command_with_cwd(path, args, Some(cwd), timeout, max_output_bytes)
}

fn run_bounded_command_with_cwd(
    path: &PathBuf,
    args: &[&str],
    cwd: Option<&Path>,
    timeout: Duration,
    max_output_bytes: usize,
) -> Result<ProcessOutput, String> {
    let started = Instant::now();
    let mut command = Command::new(path);
    command
        .args(args)
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());
    configure_process_group(&mut command);
    if let Some(cwd) = cwd {
        command.current_dir(cwd);
    }
    let mut child = command
        .spawn()
        .map_err(|error| format!("Failed to spawn command: {error}"))?;

    let stdout = match child.stdout.take() {
        Some(stdout) => stdout,
        None => {
            let _ = kill_and_wait_child(&mut child);
            return Err("Failed to capture stdout.".to_string());
        }
    };
    let stderr = match child.stderr.take() {
        Some(stderr) => stderr,
        None => {
            let _ = kill_and_wait_child(&mut child);
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
                    let status = kill_and_wait_child(&mut child);
                    let _ = tx.send((status, true));
                    break;
                }
                thread::sleep(Duration::from_millis(40));
            }
            Err(_) => {
                let _ = kill_and_wait_child(&mut child);
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
    if session.finished {
        finalize_finished_cli_session_runtime(session);
    } else {
        join_finished_reader(&mut session.stdout_handle);
        join_finished_reader(&mut session.stderr_handle);
    }
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

fn join_reader_with_grace(handle: &mut Option<thread::JoinHandle<()>>) {
    let deadline = Instant::now() + Duration::from_millis(SESSION_READER_JOIN_GRACE_MS);
    while handle
        .as_ref()
        .map(|value| !value.is_finished())
        .unwrap_or(false)
        && Instant::now() < deadline
    {
        thread::sleep(Duration::from_millis(SESSION_READER_JOIN_POLL_MS));
    }
    join_finished_reader(handle);
}

fn cli_session_readers_closed(session: &CliSession) -> bool {
    session.stdout_handle.is_none() && session.stderr_handle.is_none()
}

fn finalize_finished_cli_session_runtime(session: &mut CliSession) {
    session.stdin.take();
    join_reader_with_grace(&mut session.stdout_handle);
    join_reader_with_grace(&mut session.stderr_handle);
    if !cli_session_readers_closed(session) {
        kill_child_process_tree(&mut session.child);
        join_reader_with_grace(&mut session.stdout_handle);
        join_reader_with_grace(&mut session.stderr_handle);
    }
}

fn dispose_cli_session_runtime(session: &mut CliSession, status: &str) {
    session.stdin.take();
    if !session.finished {
        let exit_code = kill_and_wait_child(&mut session.child);
        mark_session_finished(session, status, exit_code);
    }
    finalize_finished_cli_session_runtime(session);
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

fn configure_process_group(command: &mut Command) {
    #[cfg(unix)]
    {
        command.process_group(0);
    }
}

fn kill_child_process_tree(child: &mut Child) {
    #[cfg(unix)]
    {
        let pid = child.id();
        if pid > 0 && pid <= i32::MAX as u32 {
            unsafe {
                let _ = libc::kill(-(pid as libc::pid_t), libc::SIGKILL);
            }
        }
    }
    let _ = child.kill();
}

fn kill_and_wait_child(child: &mut Child) -> Option<i32> {
    kill_child_process_tree(child);
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
            finalize_finished_cli_session_runtime(&mut session);
        }
    }
}

fn create_native_pty_session(
    command: &str,
    working_dir: PathBuf,
    rows: Option<u16>,
    cols: Option<u16>,
) -> Result<(String, NativePtySession, NativePtySessionReport), String> {
    let size = normalized_pty_size(rows, cols);
    let pty_system = native_pty_system();
    let pair = pty_system
        .openpty(size)
        .map_err(|error| format!("Failed to open native PTY: {error}"))?;

    let mut command_builder = CommandBuilder::new(command);
    command_builder.cwd(working_dir.as_os_str());
    command_builder.env("TERM", "xterm-256color");
    command_builder.env("COLORTERM", "truecolor");

    let mut child = pair
        .slave
        .spawn_command(command_builder)
        .map_err(|error| format!("Failed to start native PTY command: {error}"))?;
    let reader = match pair.master.try_clone_reader() {
        Ok(reader) => reader,
        Err(error) => {
            let _ = kill_and_wait_pty_child(child.as_mut());
            return Err(format!("Failed to clone native PTY reader: {error}"));
        }
    };
    let writer = match pair.master.take_writer() {
        Ok(writer) => writer,
        Err(error) => {
            let _ = kill_and_wait_pty_child(child.as_mut());
            return Err(format!("Failed to open native PTY writer: {error}"));
        }
    };

    let output = Arc::new(Mutex::new(NativePtyOutput::default()));
    let reader_output = Arc::clone(&output);
    let reader_handle = thread::spawn(move || {
        read_native_pty_stream(reader, reader_output, MAX_SESSION_OUTPUT_BYTES);
    });

    let session_id = new_session_id("native-pty");
    let label = native_shell_label(command);
    let mut session = NativePtySession {
        label,
        command: command.to_string(),
        child,
        master: Some(pair.master),
        writer: Some(writer),
        output,
        reader_handle: Some(reader_handle),
        started: Instant::now(),
        working_dir,
        status: "running".to_string(),
        exit_code: None,
        finished: false,
        finished_at: None,
        rows: size.rows,
        cols: size.cols,
        pid: None,
    };
    session.pid = session.child.process_id();
    let report = poll_native_pty_session_locked(&session_id, &mut session);
    Ok((session_id, session, report))
}

fn poll_native_pty_session_locked(
    session_id: &str,
    session: &mut NativePtySession,
) -> NativePtySessionReport {
    if !session.finished {
        match session.child.try_wait() {
            Ok(Some(status)) => {
                let next_status = if status.success() { "exited" } else { "failed" };
                mark_pty_session_finished(session, next_status, Some(status.exit_code() as i32));
            }
            Ok(None) => {}
            Err(_) => {
                let exit_code = kill_and_wait_pty_child(session.child.as_mut());
                mark_pty_session_finished(session, "error", exit_code);
            }
        }
    }
    if session.finished {
        finalize_finished_native_pty_runtime(session);
    } else {
        join_finished_reader(&mut session.reader_handle);
    }
    native_pty_session_report(session_id, session)
}

fn mark_pty_session_finished(
    session: &mut NativePtySession,
    status: impl Into<String>,
    exit_code: Option<i32>,
) {
    session.exit_code = exit_code;
    session.status = status.into();
    session.finished = true;
    if session.finished_at.is_none() {
        session.finished_at = Some(Instant::now());
    }
    session.writer.take();
    session.master.take();
}

fn finalize_finished_native_pty_runtime(session: &mut NativePtySession) {
    session.writer.take();
    session.master.take();
    join_reader_with_grace(&mut session.reader_handle);
}

fn dispose_native_pty_session_runtime(session: &mut NativePtySession, status: &str) {
    session.writer.take();
    if !session.finished {
        let exit_code = kill_and_wait_pty_child(session.child.as_mut());
        mark_pty_session_finished(session, status, exit_code);
    }
    finalize_finished_native_pty_runtime(session);
}

fn kill_and_wait_pty_child(child: &mut (dyn portable_pty::Child + Send + Sync)) -> Option<i32> {
    let _ = child.kill();
    child
        .wait()
        .ok()
        .map(|exit_status| exit_status.exit_code() as i32)
}

fn cleanup_finished_pty_sessions_locked(sessions: &mut HashMap<String, NativePtySession>) {
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
            finalize_finished_native_pty_runtime(&mut session);
        }
    }
}

fn native_pty_session_report(
    session_id: &str,
    session: &NativePtySession,
) -> NativePtySessionReport {
    let output = session
        .output
        .lock()
        .map(|value| value.clone())
        .unwrap_or_default();
    NativePtySessionReport {
        session_id: session_id.to_string(),
        label: session.label.clone(),
        command: session.command.clone(),
        status: session.status.clone(),
        exit_code: session.exit_code,
        elapsed_ms: session.started.elapsed().as_millis(),
        output: output.output,
        output_truncated: output.output_truncated,
        working_dir: session.working_dir.to_string_lossy().to_string(),
        rows: session.rows,
        cols: session.cols,
        pid: session.pid,
        terminal_kind: "native_pty".to_string(),
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

fn read_native_pty_stream<R: Read>(
    mut reader: R,
    output: Arc<Mutex<NativePtyOutput>>,
    max_output_bytes: usize,
) {
    let mut buffer = [0_u8; 4096];

    loop {
        match reader.read(&mut buffer) {
            Ok(0) => break,
            Ok(read_count) => {
                let text = String::from_utf8_lossy(&buffer[..read_count]).to_string();
                if let Ok(mut locked) = output.lock() {
                    append_native_pty_output(&mut locked, &text, max_output_bytes);
                }
            }
            Err(_) => break,
        }
    }
}

fn append_native_pty_output(output: &mut NativePtyOutput, text: &str, max_output_bytes: usize) {
    let remaining = max_output_bytes.saturating_sub(output.output.len());
    if remaining == 0 {
        output.output_truncated = true;
        return;
    }
    if text.len() <= remaining {
        output.output.push_str(text);
    } else {
        let mut end = remaining;
        while end > 0 && !text.is_char_boundary(end) {
            end -= 1;
        }
        output.output.push_str(&text[..end]);
        output.output_truncated = true;
    }
}

fn normalized_pty_size(rows: Option<u16>, cols: Option<u16>) -> PtySize {
    PtySize {
        rows: rows.unwrap_or(28).clamp(8, 80),
        cols: cols.unwrap_or(100).clamp(24, 240),
        pixel_width: 0,
        pixel_height: 0,
    }
}

fn default_native_shell() -> String {
    #[cfg(windows)]
    {
        env::var("ComSpec")
            .map(|value| value.trim().to_string())
            .ok()
            .filter(|value| !value.is_empty())
            .unwrap_or_else(|| "cmd.exe".to_string())
    }
    #[cfg(not(windows))]
    {
        env::var("SHELL")
            .map(|value| value.trim().to_string())
            .ok()
            .filter(|value| !value.is_empty())
            .unwrap_or_else(|| {
                if Path::new("/bin/zsh").exists() {
                    "/bin/zsh".to_string()
                } else if Path::new("/bin/bash").exists() {
                    "/bin/bash".to_string()
                } else {
                    "sh".to_string()
                }
            })
    }
}

fn native_shell_label(command: &str) -> String {
    Path::new(command)
        .file_name()
        .and_then(|value| value.to_str())
        .filter(|value| !value.trim().is_empty())
        .unwrap_or(command)
        .to_string()
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
        "provider_credentials",
        "Provider Credentials",
        "provider_credential_store",
        provider_credentials_base_path(app)?,
        "user_local_app_config_secret",
        "Local provider API credentials used to launch guest adapters; excluded from support exports.",
    )?);
    roots.push(runtime_root_report(
        "agent_factory_proposals",
        "Agent Factory Proposals",
        "agent_factory_store",
        agent_factory_proposals_base_path(app)?,
        "user_visible_runtime_data",
        "Drafted agent specs and proposal records created by the desktop Agent Factory wizard.",
    )?);
    roots.push(runtime_root_report(
        "learning_feedback_decisions",
        "Learning Feedback Decisions",
        "learning_feedback_store",
        learning_feedback_decisions_base_path(app)?,
        "user_visible_runtime_data",
        "Approved, rejected, deferred, or promoted improvement decisions from accumulated work evidence.",
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
        provider_credential_store_path: path_to_string(&provider_credentials_base_path(app)?),
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
    let agent_factory_path = agent_factory_proposals_base_path(app)?;
    let learning_feedback_path = learning_feedback_decisions_base_path(app)?;
    let runtime_store_path = runtime_data_store_base_path(app)?;
    let index_path = accumulated_data_index_path(app)?;

    for path in [
        &runtime_store_path,
        &task_run_path,
        &support_path,
        &payload_audit_path,
        &agent_workspace_path,
        &agent_factory_path,
        &learning_feedback_path,
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

    let agent_factory_stats =
        directory_data_stats(&agent_factory_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "agent_factory_proposals",
        "Agent Factory Proposals",
        "agent proposal records",
        "agent_factory_store",
        &agent_factory_path,
        count_immediate_files_with_extension(
            &agent_factory_path,
            "json",
            MAX_ACCUMULATED_DATA_SCAN_FILES,
        ),
        agent_factory_stats.size_bytes,
        directory_latest_modified_label(&agent_factory_stats),
        "user_visible_runtime_data",
        "Drafted agent specifications, target paths, validation commands, and rollback metadata.",
        "Review proposal",
        agent_factory_stats.scan_truncated,
    ));

    let learning_feedback_stats =
        directory_data_stats(&learning_feedback_path, MAX_ACCUMULATED_DATA_SCAN_FILES);
    stores.push(accumulated_data_store_report(
        "learning_feedback_decisions",
        "Learning Feedback Decisions",
        "improvement decision records",
        "learning_feedback_store",
        &learning_feedback_path,
        count_immediate_files_with_extension(
            &learning_feedback_path,
            "json",
            MAX_ACCUMULATED_DATA_SCAN_FILES,
        ),
        learning_feedback_stats.size_bytes,
        directory_latest_modified_label(&learning_feedback_stats),
        "user_visible_runtime_data",
        "Approval, rejection, deferral, or promotion records for improvement candidates.",
        "Review decisions",
        learning_feedback_stats.scan_truncated,
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
    let provider_credentials = provider_credentials_report(app)?;
    let resource_profile = workspace_resource_profile();
    let roots_ready = runtime_roots.roots.iter().all(|root| root.exists);
    let has_payload_high_findings = payload_audit
        .findings
        .iter()
        .any(|finding| finding.severity == "high");
    let update_channel_configured = service_update_channel_configured(app);
    let update_channel_detail = if update_channel_configured {
        "A signed updater channel marker is bundled for this build."
    } else {
        "No signed updater manifest or endpoint marker is bundled yet."
    };

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
            "native_resource_telemetry",
            "Native Resource Telemetry",
            vec![
                service_readiness_check(
                    "resource_profile_supported",
                    "System resource profile is available",
                    resource_profile.system_supported,
                    &format!(
                        "{} CPU threads, {} workers, {} byte memory budget.",
                        resource_profile.cpu_threads,
                        resource_profile.parallel_workers,
                        resource_profile.memory_budget_bytes
                    ),
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "resource_profile_uses_memory_budget",
                    "Native resource cache uses memory budget",
                    resource_profile.memory_budget_bytes > 0
                        && resource_profile.preload_byte_limit == resource_profile.memory_budget_bytes,
                    &resource_profile.preload_strategy,
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "resource_profile_uses_cpu_workers",
                    "Native resource cache uses CPU workers",
                    resource_profile.parallel_workers > 0 && resource_profile.cpu_threads > 0,
                    &format!(
                        "{} workers from {} threads.",
                        resource_profile.parallel_workers, resource_profile.cpu_threads
                    ),
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
            "provider_accounts",
            "Provider Accounts",
            vec![
                service_readiness_check(
                    "provider_credential_store_ready",
                    "Provider credential store is ready",
                    !runtime_roots.provider_credential_store_path.is_empty(),
                    &runtime_roots.provider_credential_store_path,
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "provider_account_connected",
                    "At least one AI provider account is connected",
                    provider_credentials.configured_count > 0,
                    &format!(
                        "{} of {} providers configured.",
                        provider_credentials.configured_count,
                        provider_credentials.providers.len()
                    ),
                    "warning",
                    false,
                    false,
                ),
                service_readiness_check(
                    "provider_credentials_redacted",
                    "Provider credential reports are redacted",
                    provider_credentials
                        .providers
                        .iter()
                        .all(|provider| !provider.secret_preview.contains("sk-") || provider.secret_preview.contains("...")),
                    "Reports expose only configured state and short previews.",
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
                    update_channel_detail,
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

fn desktop_preferences_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(app
        .path()
        .app_config_dir()
        .map_err(|error| format!("Failed to resolve app config directory: {error}"))?
        .join("desktop-preferences.v1.json"))
}

fn provider_credentials_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(app
        .path()
        .app_config_dir()
        .map_err(|error| format!("Failed to resolve app config directory: {error}"))?
        .join("provider-credentials"))
}

fn provider_credentials_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(provider_credentials_base_path(app)?.join("provider-credentials.v1.json"))
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

fn agent_factory_proposals_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?
        .join("agent-factory")
        .join("proposals"))
}

fn learning_feedback_decisions_base_path(app: &AppHandle) -> Result<PathBuf, String> {
    Ok(runtime_data_store_base_path(app)?
        .join("learning-feedback")
        .join("decisions"))
}

fn create_agent_factory_proposal_report(
    app: &AppHandle,
    input: AgentFactoryProposalInput,
) -> Result<AgentFactoryProposalReport, String> {
    let goal = normalize_factory_text(&input.goal, "Goal")?;
    let role = normalize_factory_text(&input.role, "Role")?;
    let label = normalize_optional_factory_text(&input.label).unwrap_or_else(|| {
        truncate_chars(
            goal.split('.').next().unwrap_or("Generated Agent").trim(),
            80,
        )
    });
    let agent_id = normalize_agent_slug(&input.agent_id, &label, &goal, "generated-agent");
    let owner_project = normalize_owner_project(&input.owner_project);
    let target_path = normalize_proposal_target_path(
        &input.target_path,
        &owner_project,
        &format!("{agent_id}.json"),
    );
    let validation_commands = normalize_factory_list(input.validation_commands);
    let tools = normalize_factory_list(input.tools);
    let guardrails = normalize_factory_list(input.guardrails);
    let output_contract =
        normalize_optional_factory_text(&input.output_contract).unwrap_or_else(|| {
            "Return a bounded result with evidence, validation status, and rollback notes."
                .to_string()
        });
    let rollback_plan =
        normalize_optional_factory_text(&input.rollback_plan).unwrap_or_else(|| {
            format!("Remove or disable {target_path} and archive the proposal record.")
        });
    let created_at = current_unix_millis_label();
    let proposal_id = format!("agent-proposal-{}-{agent_id}", file_safe_timestamp_label());
    let proposal_path = agent_factory_proposals_base_path(app)?.join(format!("{proposal_id}.json"));
    let validation_command = validation_commands
        .first()
        .cloned()
        .unwrap_or_else(|| {
            format!(
                "PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/{agent_id}.json"
            )
        });

    let spec = json!({
        "schema_version": "agent-factory-proposal.v1",
        "proposal_id": proposal_id,
        "status": "drafted",
        "created_at": created_at,
        "target_path": target_path,
        "agent": {
            "id": agent_id,
            "label": label,
            "goal": goal,
            "role": role,
            "owner_project": owner_project,
            "runtime_role": "bounded_capability",
            "recommended_session_mode": "platform_improvement",
            "recommended_task_pipe": "platform_improvement_pipe"
        },
        "tools": tools,
        "guardrails": guardrails,
        "output_contract": output_contract,
        "validation": {
            "commands": validation_commands,
            "primary_command": validation_command,
            "required_evidence": [
                "agent spec inspection passes",
                "request trace links source evidence",
                "rollback plan remains actionable"
            ]
        },
        "traceability": {
            "source": "desktop_agent_factory_wizard",
            "app_data_store": "agent_factory_proposals",
            "rollback_plan": rollback_plan,
            "privacy_boundary": "proposal stored in app-data runtime store, not bundled customer payload"
        }
    });

    write_pretty_json(&proposal_path, &spec)?;

    Ok(AgentFactoryProposalReport {
        status: "proposal_created".to_string(),
        proposal_id,
        proposal_path: path_to_string(&proposal_path),
        target_path,
        created_at,
        agent_id,
        label,
        validation_command,
        rollback_plan,
        spec,
    })
}

fn record_learning_improvement_decision_report(
    app: &AppHandle,
    input: LearningImprovementDecisionInput,
) -> Result<LearningImprovementDecisionReport, String> {
    let label = normalize_factory_text(&input.label, "Candidate label")?;
    let candidate_id = normalize_factory_slug(
        &input.candidate_id,
        &label,
        &input.source,
        "improvement-candidate",
    );
    let action = normalize_one_of(
        input.action,
        &["approve", "reject", "defer", "promote"],
        "defer",
    );
    let asset_type = normalize_one_of(
        input.asset_type,
        &[
            "prompt",
            "workflow",
            "template",
            "tool",
            "skill",
            "agent",
            "project_feature",
        ],
        "prompt",
    );
    let source = normalize_optional_factory_text(&input.source)
        .unwrap_or_else(|| "desktop_learning_feedback_loop".to_string());
    let evidence = normalize_factory_list(input.evidence);
    let target_path = normalize_proposal_target_path(
        &input.target_path,
        "agent-platform",
        &format!("{candidate_id}.json"),
    );
    let validation_command = normalize_optional_factory_text(&input.validation_command)
        .unwrap_or_else(|| "record validation command before promotion".to_string());
    let rollback_plan = normalize_optional_factory_text(&input.rollback_plan)
        .unwrap_or_else(|| "Mark this improvement decision rejected or disabled and keep the source evidence for audit.".to_string());
    let notes = normalize_optional_factory_text(&input.notes).unwrap_or_default();
    let created_at = current_unix_millis_label();
    let decision_id = format!(
        "learning-decision-{}-{candidate_id}",
        file_safe_timestamp_label()
    );
    let decision_path =
        learning_feedback_decisions_base_path(app)?.join(format!("{decision_id}.json"));
    let status = match action.as_str() {
        "approve" | "promote" => "promotion_recorded",
        "reject" => "rejection_recorded",
        _ => "deferred_recorded",
    }
    .to_string();
    let record = json!({
        "schema_version": "learning-improvement-decision.v1",
        "decision_id": decision_id,
        "status": status,
        "created_at": created_at,
        "candidate": {
            "id": candidate_id,
            "label": label,
            "source": source,
            "evidence": evidence
        },
        "decision": {
            "action": action,
            "asset_type": asset_type,
            "target_path": target_path,
            "validation_command": validation_command,
            "rollback_plan": rollback_plan,
            "notes": notes
        },
        "traceability": {
            "source": "desktop_learning_feedback_loop",
            "app_data_store": "learning_feedback_decisions",
            "privacy_boundary": "decision record stored in app-data runtime store, not bundled customer payload"
        }
    });

    write_pretty_json(&decision_path, &record)?;

    Ok(LearningImprovementDecisionReport {
        status,
        decision_id,
        decision_path: path_to_string(&decision_path),
        created_at,
        candidate_id,
        action,
        asset_type,
        target_path,
        validation_command,
        rollback_plan,
        record,
    })
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

fn restrict_secret_file_permissions(path: &Path) -> Result<(), String> {
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let permissions = fs::Permissions::from_mode(0o600);
        fs::set_permissions(path, permissions)
            .map_err(|error| format!("Failed to restrict secret file permissions: {error}"))?;
    }
    #[cfg(not(unix))]
    {
        let _ = path;
    }
    Ok(())
}

fn open_url_with_system_browser(app: &AppHandle, url: &str) -> Result<(), String> {
    app.opener()
        .open_url(url, None::<&str>)
        .map_err(|error| format!("Failed to open provider URL with Tauri opener: {error}"))
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

fn elapsed_millis(started: Instant) -> u64 {
    u64::try_from(started.elapsed().as_millis()).unwrap_or(u64::MAX)
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

fn desktop_preferences_report(app: &AppHandle) -> Result<DesktopPreferencesReport, String> {
    let path = desktop_preferences_path(app)?;
    let (source, preferences) = if path.exists() {
        let content = fs::read_to_string(&path)
            .map_err(|error| format!("Failed to read desktop preferences: {error}"))?;
        let preferences: DesktopPreferences = serde_json::from_str(&content)
            .map_err(|error| format!("Failed to parse desktop preferences: {error}"))?;
        (
            "app_config".to_string(),
            normalize_desktop_preferences(preferences),
        )
    } else {
        ("default_native".to_string(), DesktopPreferences::default())
    };

    Ok(DesktopPreferencesReport {
        schema_version: DESKTOP_PREFERENCES_SCHEMA_VERSION.to_string(),
        status: "loaded".to_string(),
        source,
        preferences_path: path_to_string(&path),
        preferences,
    })
}

fn save_desktop_preferences_report(
    app: &AppHandle,
    preferences: DesktopPreferences,
) -> Result<DesktopPreferencesReport, String> {
    let path = desktop_preferences_path(app)?;
    let preferences = normalize_desktop_preferences(preferences);
    write_pretty_json(&path, &preferences)?;
    Ok(DesktopPreferencesReport {
        schema_version: DESKTOP_PREFERENCES_SCHEMA_VERSION.to_string(),
        status: "saved".to_string(),
        source: "app_config".to_string(),
        preferences_path: path_to_string(&path),
        preferences,
    })
}

fn normalize_desktop_preferences(preferences: DesktopPreferences) -> DesktopPreferences {
    let defaults = DesktopPreferences::default();
    let runtime_defaults = DesktopRuntimeInitDefaults::default();
    DesktopPreferences {
        schema_version: DESKTOP_PREFERENCES_SCHEMA_VERSION.to_string(),
        ui_language: match preferences.ui_language.as_str() {
            "ko" | "en" => preferences.ui_language,
            _ => defaults.ui_language,
        },
        theme_mode: match preferences.theme_mode.as_str() {
            "system" | "light" | "dark" => preferences.theme_mode,
            _ => defaults.theme_mode,
        },
        sidebar_mode: match preferences.sidebar_mode.as_str() {
            "expanded" | "collapsed" => preferences.sidebar_mode,
            _ => defaults.sidebar_mode,
        },
        terminal_drawer_open: preferences.terminal_drawer_open,
        runtime_init_defaults: DesktopRuntimeInitDefaults {
            adapter_id: normalize_one_of(
                preferences.runtime_init_defaults.adapter_id,
                &[
                    "claude-code-cli",
                    "gemini-cli",
                    "codex-cli",
                    "opencode-cli",
                    "claw-code-cli",
                ],
                &runtime_defaults.adapter_id,
            ),
            session_mode_id: normalize_one_of(
                preferences.runtime_init_defaults.session_mode_id,
                &[
                    "platform-improvement",
                    "knowledge-accumulation",
                    "review-verify",
                ],
                &runtime_defaults.session_mode_id,
            ),
            task_pipe_kind: normalize_one_of(
                preferences.runtime_init_defaults.task_pipe_kind,
                &[
                    "platform_improvement_pipe",
                    "knowledge_accumulation_pipe",
                    "review_verify_pipe",
                ],
                &runtime_defaults.task_pipe_kind,
            ),
            auto_defer_questions: preferences.runtime_init_defaults.auto_defer_questions,
        },
        runtime_customization: normalize_runtime_customization(preferences.runtime_customization),
        pinned_sections: normalize_pinned_sections(
            preferences.pinned_sections,
            defaults.pinned_sections,
        ),
    }
}

fn normalize_runtime_customization(
    customization: DesktopRuntimeCustomization,
) -> DesktopRuntimeCustomization {
    let mut provider_overrides = Vec::new();
    for definition in PROVIDER_CREDENTIALS {
        let override_entry = customization
            .provider_overrides
            .iter()
            .find(|entry| entry.provider_id == definition.provider_id);
        let default_model = override_entry
            .map(|entry| entry.default_model.trim().to_string())
            .filter(|value| provider_model_id_is_valid(value))
            .unwrap_or_else(|| definition.default_model.to_string());
        let base_url = override_entry
            .map(|entry| entry.base_url.trim().to_string())
            .filter(|value| provider_base_url_is_valid(value))
            .unwrap_or_else(|| provider_default_base_url(definition.provider_id).to_string());
        provider_overrides.push(DesktopProviderOverride {
            provider_id: definition.provider_id.to_string(),
            default_model,
            base_url,
        });
    }

    let mut quick_commands: Vec<DesktopTerminalQuickCommand> = customization
        .terminal
        .quick_commands
        .into_iter()
        .take(MAX_TERMINAL_QUICK_COMMANDS)
        .filter_map(|command| {
            let input = truncate_chars(command.input.trim(), 500);
            if input.is_empty() {
                return None;
            }
            let input = if input.ends_with('\n') {
                input
            } else {
                format!("{input}\n")
            };
            Some(DesktopTerminalQuickCommand {
                id: safe_short_setting(command.id, 48, "quick-command"),
                label: safe_short_setting(command.label, 48, "Command"),
                detail: safe_short_setting(command.detail, 120, input.trim()),
                input,
            })
        })
        .collect();
    if quick_commands.is_empty() {
        quick_commands = default_terminal_quick_commands();
    }

    DesktopRuntimeCustomization {
        provider_overrides,
        terminal: DesktopTerminalCustomization {
            shell_command: truncate_chars(
                customization.terminal.shell_command.trim(),
                MAX_TERMINAL_COMMAND_CHARS,
            ),
            startup_command: truncate_chars(
                customization.terminal.startup_command.trim(),
                MAX_TERMINAL_STARTUP_COMMAND_CHARS,
            ),
            quick_commands,
        },
    }
}

fn safe_short_setting(value: String, max_chars: usize, fallback: &str) -> String {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        fallback.to_string()
    } else {
        truncate_chars(trimmed, max_chars)
    }
}

fn provider_model_id_is_valid(value: &str) -> bool {
    !value.is_empty()
        && value.len() <= MAX_PROVIDER_MODEL_CHARS
        && value.chars().all(|character| {
            character.is_ascii_alphanumeric() || matches!(character, '-' | '_' | '.' | ':' | '/')
        })
}

fn provider_base_url_is_valid(value: &str) -> bool {
    if value.is_empty() || value.len() > MAX_PROVIDER_BASE_URL_CHARS {
        return false;
    }
    value.starts_with("http://") || value.starts_with("https://")
}

fn normalize_one_of(value: String, allowed: &[&str], fallback: &str) -> String {
    if allowed.iter().any(|item| *item == value.as_str()) {
        value
    } else {
        fallback.to_string()
    }
}

fn normalize_pinned_sections(values: Vec<String>, fallback: Vec<String>) -> Vec<String> {
    let allowed = [
        "overview",
        "desktop",
        "agents",
        "source",
        "intent",
        "projects",
        "history",
        "structure",
        "documents",
        "requirements",
    ];
    let mut seen = HashSet::new();
    let normalized: Vec<String> = values
        .into_iter()
        .filter(|value| allowed.iter().any(|item| *item == value))
        .filter(|value| seen.insert(value.clone()))
        .take(6)
        .collect();
    if normalized.is_empty() {
        fallback
    } else {
        normalized
    }
}

fn provider_credentials_report(app: &AppHandle) -> Result<ProviderCredentialReport, String> {
    let path = provider_credentials_path(app)?;
    let store = read_provider_credential_store(app)?;
    let providers: Vec<ProviderCredentialSummary> = PROVIDER_CREDENTIALS
        .iter()
        .map(|definition| {
            let record = store
                .credentials
                .iter()
                .find(|credential| credential.provider_id == definition.provider_id);
            provider_credential_summary(definition, record)
        })
        .collect();
    let configured_count = providers
        .iter()
        .filter(|provider| provider.configured)
        .count();
    let status = if configured_count > 0 {
        "provider_credentials_ready"
    } else {
        "provider_credentials_required"
    }
    .to_string();

    Ok(ProviderCredentialReport {
        schema_version: PROVIDER_CREDENTIALS_SCHEMA_VERSION.to_string(),
        status,
        source: if path.exists() {
            "app_config_file".to_string()
        } else {
            "default_empty".to_string()
        },
        credential_file_path: path_to_string(&path),
        storage_warning: "Secrets are stored only in the local app config credential file and are redacted from reports and support bundles. Replace this storage adapter with OS keychain before public release.".to_string(),
        configured_count,
        providers,
    })
}

fn save_provider_credential_report(
    app: &AppHandle,
    input: ProviderCredentialInput,
) -> Result<ProviderCredentialReport, String> {
    let definition = find_provider_credential(&input.provider_id)
        .ok_or_else(|| format!("Unknown provider id: {}", input.provider_id))?;
    if provider_is_local_http(definition) {
        return provider_credentials_report(app);
    }
    let auth_method = if input.auth_method.trim().is_empty() {
        definition.auth_method
    } else {
        input.auth_method.trim()
    };
    if auth_method != definition.auth_method {
        return Err(format!(
            "Unsupported auth method '{}' for provider '{}'.",
            auth_method, definition.provider_id
        ));
    }
    let secret = normalize_provider_secret(&input.secret)?;
    let account_hint = truncate_chars(
        &redact_sensitive_text(input.account_hint.trim()),
        MAX_PROVIDER_ACCOUNT_HINT_CHARS,
    );
    let mut store = read_provider_credential_store(app)?;
    let now = current_unix_millis_label();
    let created_at = store
        .credentials
        .iter()
        .find(|credential| credential.provider_id == definition.provider_id)
        .map(|credential| credential.created_at.clone())
        .filter(|value| !value.is_empty())
        .unwrap_or_else(|| now.clone());
    store
        .credentials
        .retain(|credential| credential.provider_id != definition.provider_id);
    store.credentials.push(ProviderCredentialRecord {
        provider_id: definition.provider_id.to_string(),
        auth_method: definition.auth_method.to_string(),
        account_hint,
        secret,
        created_at,
        updated_at: now,
    });
    store = normalize_provider_credential_store(store);
    write_provider_credential_store(app, &store)?;
    provider_credentials_report(app)
}

fn clear_provider_credential_report(
    app: &AppHandle,
    provider_id: &str,
) -> Result<ProviderCredentialReport, String> {
    let definition = find_provider_credential(provider_id)
        .ok_or_else(|| format!("Unknown provider id: {provider_id}"))?;
    if provider_is_local_http(definition) {
        return provider_credentials_report(app);
    }
    let mut store = read_provider_credential_store(app)?;
    store
        .credentials
        .retain(|credential| credential.provider_id != definition.provider_id);
    store = normalize_provider_credential_store(store);
    write_provider_credential_store(app, &store)?;
    provider_credentials_report(app)
}

fn open_provider_auth_url_report(
    app: &AppHandle,
    provider_id: &str,
    purpose: Option<&str>,
) -> Result<ProviderAuthUrlOpenReport, String> {
    let definition = find_provider_credential(provider_id)
        .ok_or_else(|| format!("Unknown provider id: {provider_id}"))?;
    let purpose = match purpose.unwrap_or("setup") {
        "login" => "login",
        "docs" => "docs",
        _ => "setup",
    };
    let url = match purpose {
        "login" => definition.login_url,
        "docs" => definition.docs_url,
        _ => definition.setup_url,
    };
    open_url_with_system_browser(app, url)?;
    Ok(ProviderAuthUrlOpenReport {
        provider_id: definition.provider_id.to_string(),
        purpose: purpose.to_string(),
        url: url.to_string(),
        status: "opened".to_string(),
    })
}

fn read_system_clipboard_text_report(app: &AppHandle) -> Result<SystemClipboardTextReport, String> {
    let text = app
        .clipboard()
        .read_text()
        .map_err(|error| format!("Failed to read system clipboard text: {error}"))?;
    Ok(SystemClipboardTextReport {
        status: if text.is_empty() {
            "empty".to_string()
        } else {
            "read".to_string()
        },
        text_length: text.chars().count(),
        text,
    })
}

fn write_system_clipboard_text_report(
    app: &AppHandle,
    text: &str,
) -> Result<SystemClipboardTextReport, String> {
    if text.is_empty() {
        return Ok(SystemClipboardTextReport {
            status: "empty".to_string(),
            text: String::new(),
            text_length: 0,
        });
    }
    app.clipboard()
        .write_text(text.to_string())
        .map_err(|error| format!("Failed to write system clipboard text: {error}"))?;
    Ok(SystemClipboardTextReport {
        status: "written".to_string(),
        text: String::new(),
        text_length: text.chars().count(),
    })
}

async fn list_provider_models_report(
    app: &AppHandle,
    provider_id: &str,
) -> Result<ProviderModelCatalogReport, String> {
    let definition = find_provider_credential(provider_id)
        .ok_or_else(|| format!("Unknown provider id: {provider_id}"))?;
    let preferences = desktop_preferences_report(app)
        .map(|report| report.preferences)
        .unwrap_or_else(|_| DesktopPreferences::default());
    let provider_override = preferences
        .runtime_customization
        .provider_overrides
        .iter()
        .find(|entry| entry.provider_id == definition.provider_id);
    let default_model = provider_override
        .map(|entry| entry.default_model.trim().to_string())
        .filter(|value| provider_model_id_is_valid(value))
        .unwrap_or_else(|| definition.default_model.to_string());
    let base_url = provider_override
        .map(|entry| entry.base_url.trim().to_string())
        .filter(|value| provider_base_url_is_valid(value))
        .unwrap_or_else(|| provider_default_base_url(definition.provider_id).to_string());
    if definition.provider_id == OLLAMA_PROVIDER_ID {
        return list_ollama_provider_models_report(definition, &base_url, &default_model).await;
    }
    Ok(default_provider_model_catalog_report(
        definition,
        &default_model,
    ))
}

fn default_provider_model_catalog_report(
    definition: &ProviderCredentialDefinition,
    default_model: &str,
) -> ProviderModelCatalogReport {
    ProviderModelCatalogReport {
        provider_id: definition.provider_id.to_string(),
        provider_label: definition.label.to_string(),
        status: "static_default_model".to_string(),
        source: "provider_definition".to_string(),
        default_model: default_model.to_string(),
        models: vec![ProviderModelSummary {
            provider_id: definition.provider_id.to_string(),
            id: default_model.to_string(),
            label: default_model.to_string(),
            size: None,
            modified_at: String::new(),
        }],
        error: None,
    }
}

async fn list_ollama_provider_models_report(
    definition: &ProviderCredentialDefinition,
    base_url: &str,
    default_model: &str,
) -> Result<ProviderModelCatalogReport, String> {
    let endpoint = provider_endpoint(base_url, "/api/tags");
    let response = match provider_http_client()?.get(&endpoint).send().await {
        Ok(response) => response,
        Err(error) => {
            return Ok(ProviderModelCatalogReport {
                provider_id: definition.provider_id.to_string(),
                provider_label: definition.label.to_string(),
                status: "local_model_runtime_unavailable".to_string(),
                source: endpoint,
                default_model: default_model.to_string(),
                models: Vec::new(),
                error: Some(format!(
                    "Ollama runtime is not reachable at {base_url}. Start Ollama, then refresh models. {error}"
                )),
            });
        }
    };
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Ollama model list response body read failed: {error}"))?;
    if !(200..300).contains(&http_status) {
        return Ok(ProviderModelCatalogReport {
            provider_id: definition.provider_id.to_string(),
            provider_label: definition.label.to_string(),
            status: "local_model_catalog_failed".to_string(),
            source: endpoint,
            default_model: default_model.to_string(),
            models: Vec::new(),
            error: Some(format!(
                "Ollama /api/tags returned HTTP {http_status}: {}",
                truncate_chars(&redact_sensitive_text(&body), 900)
            )),
        });
    }
    let value = serde_json::from_str::<Value>(&body)
        .map_err(|error| format!("Ollama model list JSON parse failed: {error}"))?;
    let mut models = extract_ollama_model_catalog(definition, &value);
    models.sort_by(|left, right| left.id.cmp(&right.id));
    let status = if models.is_empty() {
        "local_model_catalog_empty"
    } else {
        "local_model_catalog_ready"
    };
    Ok(ProviderModelCatalogReport {
        provider_id: definition.provider_id.to_string(),
        provider_label: definition.label.to_string(),
        status: status.to_string(),
        source: endpoint,
        default_model: default_model.to_string(),
        models,
        error: None,
    })
}

fn extract_ollama_model_catalog(
    definition: &ProviderCredentialDefinition,
    value: &Value,
) -> Vec<ProviderModelSummary> {
    let mut models = Vec::new();
    let Some(items) = value.get("models").and_then(Value::as_array) else {
        return models;
    };
    for item in items {
        let id = item
            .get("name")
            .or_else(|| item.get("model"))
            .and_then(Value::as_str)
            .unwrap_or("")
            .trim();
        if id.is_empty() {
            continue;
        }
        models.push(ProviderModelSummary {
            provider_id: definition.provider_id.to_string(),
            id: id.to_string(),
            label: id.to_string(),
            size: item.get("size").and_then(Value::as_u64),
            modified_at: item
                .get("modified_at")
                .and_then(Value::as_str)
                .unwrap_or("")
                .to_string(),
        });
    }
    models
}

fn read_provider_credential_store(app: &AppHandle) -> Result<ProviderCredentialStore, String> {
    let path = provider_credentials_path(app)?;
    if !path.exists() {
        return Ok(ProviderCredentialStore::default());
    }
    let content = fs::read_to_string(&path)
        .map_err(|error| format!("Failed to read provider credentials: {error}"))?;
    let store: ProviderCredentialStore = serde_json::from_str(&content)
        .map_err(|error| format!("Failed to parse provider credentials: {error}"))?;
    Ok(normalize_provider_credential_store(store))
}

fn write_provider_credential_store(
    app: &AppHandle,
    store: &ProviderCredentialStore,
) -> Result<(), String> {
    let path = provider_credentials_path(app)?;
    write_pretty_json(&path, store)?;
    restrict_secret_file_permissions(&path)
}

fn normalize_provider_credential_store(store: ProviderCredentialStore) -> ProviderCredentialStore {
    let mut seen = HashSet::new();
    let mut credentials = Vec::new();
    for credential in store.credentials {
        let Some(definition) = find_provider_credential(&credential.provider_id) else {
            continue;
        };
        if !seen.insert(definition.provider_id.to_string()) {
            continue;
        }
        if credential.secret.trim().is_empty() {
            continue;
        }
        credentials.push(ProviderCredentialRecord {
            provider_id: definition.provider_id.to_string(),
            auth_method: definition.auth_method.to_string(),
            account_hint: truncate_chars(
                &redact_sensitive_text(credential.account_hint.trim()),
                MAX_PROVIDER_ACCOUNT_HINT_CHARS,
            ),
            secret: credential.secret.trim().to_string(),
            created_at: credential.created_at,
            updated_at: credential.updated_at,
        });
    }
    ProviderCredentialStore {
        schema_version: PROVIDER_CREDENTIALS_SCHEMA_VERSION.to_string(),
        credentials,
    }
}

fn provider_credential_summary(
    definition: &ProviderCredentialDefinition,
    record: Option<&ProviderCredentialRecord>,
) -> ProviderCredentialSummary {
    if provider_is_local_http(definition) {
        return ProviderCredentialSummary {
            provider_id: definition.provider_id.to_string(),
            label: definition.label.to_string(),
            auth_method: definition.auth_method.to_string(),
            env_var: definition.env_var.to_string(),
            default_model: definition.default_model.to_string(),
            configured: true,
            environment_available: true,
            status: "local_runtime_configured".to_string(),
            account_hint: "local runtime".to_string(),
            secret_preview: "no API key".to_string(),
            last_updated_at: String::new(),
            storage: "local_http_runtime".to_string(),
            credential_source: "local_runtime".to_string(),
            setup_url: definition.setup_url.to_string(),
            login_url: definition.login_url.to_string(),
            docs_url: definition.docs_url.to_string(),
            caution: definition.caution.to_string(),
        };
    }
    let saved_configured = record
        .map(|credential| !credential.secret.trim().is_empty())
        .unwrap_or(false);
    let environment_available = env::var(definition.env_var)
        .map(|value| !value.trim().is_empty())
        .unwrap_or(false);
    let configured = saved_configured || environment_available;
    let credential_source = if saved_configured {
        "app_config_file"
    } else if environment_available {
        "environment_variable"
    } else {
        "not_configured"
    };
    let status = if saved_configured {
        "saved_local"
    } else if environment_available {
        "environment_available"
    } else {
        "not_connected"
    };
    ProviderCredentialSummary {
        provider_id: definition.provider_id.to_string(),
        label: definition.label.to_string(),
        auth_method: definition.auth_method.to_string(),
        env_var: definition.env_var.to_string(),
        default_model: definition.default_model.to_string(),
        configured,
        environment_available,
        status: status.to_string(),
        account_hint: record
            .map(|credential| credential.account_hint.clone())
            .unwrap_or_default(),
        secret_preview: if let Some(credential) = record {
            credential_secret_preview(&credential.secret)
        } else if environment_available {
            format!("env:{}", definition.env_var)
        } else {
            String::new()
        },
        last_updated_at: record
            .map(|credential| credential.updated_at.clone())
            .unwrap_or_default(),
        storage: if saved_configured {
            "local_app_config_secret_file".to_string()
        } else if environment_available {
            "shell_environment".to_string()
        } else {
            "not_configured".to_string()
        },
        credential_source: credential_source.to_string(),
        setup_url: definition.setup_url.to_string(),
        login_url: definition.login_url.to_string(),
        docs_url: definition.docs_url.to_string(),
        caution: definition.caution.to_string(),
    }
}

fn find_provider_credential(provider_id: &str) -> Option<&'static ProviderCredentialDefinition> {
    PROVIDER_CREDENTIALS
        .iter()
        .find(|definition| definition.provider_id == provider_id)
}

fn provider_is_local_http(definition: &ProviderCredentialDefinition) -> bool {
    definition.auth_method == LOCAL_HTTP_AUTH_METHOD
}

fn normalize_provider_secret(value: &str) -> Result<String, String> {
    let secret = value.trim();
    if secret.is_empty() {
        return Err("Provider API key is empty.".to_string());
    }
    if secret.len() > MAX_PROVIDER_SECRET_BYTES {
        return Err(format!(
            "Provider API key is too large. Max input is {MAX_PROVIDER_SECRET_BYTES} bytes."
        ));
    }
    if secret.chars().any(|character| {
        character == '\n' || character == '\r' || character == '\0' || character.is_control()
    }) {
        return Err(
            "Provider API key cannot contain control characters or line breaks.".to_string(),
        );
    }
    Ok(secret.to_string())
}

fn credential_secret_preview(secret: &str) -> String {
    let normalized = secret.trim();
    let char_count = normalized.chars().count();
    if char_count <= 8 {
        return "****".to_string();
    }
    let prefix: String = normalized.chars().take(4).collect();
    let suffix: String = normalized
        .chars()
        .skip(char_count.saturating_sub(4))
        .collect();
    format!("{prefix}...{suffix}")
}

fn provider_env_for_adapter(
    app: &AppHandle,
    adapter_id: &str,
) -> Result<Vec<(String, String)>, String> {
    let store = read_provider_credential_store(app)?;
    let allowed_providers = provider_ids_for_adapter(adapter_id);
    let mut env_values = Vec::new();
    for provider_id in allowed_providers {
        let Some(definition) = find_provider_credential(provider_id) else {
            continue;
        };
        let Some(credential) = store
            .credentials
            .iter()
            .find(|item| item.provider_id == definition.provider_id)
        else {
            continue;
        };
        if !credential.secret.trim().is_empty() {
            env_values.push((definition.env_var.to_string(), credential.secret.clone()));
        }
    }
    Ok(env_values)
}

fn provider_ids_for_adapter(adapter_id: &str) -> &'static [&'static str] {
    match adapter_id {
        "codex-cli" => &["openai"],
        "claude-code-cli" => &["anthropic"],
        "gemini-cli" => &["google-gemini"],
        "opencode-cli" | "claw-code-cli" => &["openai", "anthropic", "google-gemini"],
        _ => &[],
    }
}

struct ProviderApiResponse {
    http_status: u16,
    body: String,
    output: String,
}

async fn run_provider_agent_task_report(
    app: &AppHandle,
    input: ProviderAgentTaskInput,
) -> Result<ProviderAgentTaskReport, String> {
    if input.prompt.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "Prompt is too large. Max input is {MAX_SESSION_INPUT_BYTES} bytes."
        ));
    }

    let definition = find_provider_credential(&input.provider_id)
        .ok_or_else(|| format!("Unknown provider id: {}", input.provider_id))?;
    let preferences = desktop_preferences_report(app)
        .map(|report| report.preferences)
        .unwrap_or_else(|_| DesktopPreferences::default());
    let provider_override = preferences
        .runtime_customization
        .provider_overrides
        .iter()
        .find(|entry| entry.provider_id == definition.provider_id);
    let secret = provider_secret_for_definition(app, definition)?;
    let model = normalize_provider_model(
        definition,
        &input.model,
        provider_override.map(|entry| entry.default_model.as_str()),
    )?;
    let base_url = provider_override
        .map(|entry| entry.base_url.trim().to_string())
        .filter(|value| provider_base_url_is_valid(value))
        .unwrap_or_else(|| provider_default_base_url(definition.provider_id).to_string());
    let task_kind = normalize_task_kind(Some(input.task_kind.as_str()), "provider_agent_task")?;
    let working_dir = resolve_workspace_dir(app, input.working_dir.as_deref())?;
    let system_prompt = provider_task_system_prompt(&task_kind, &input.system_prompt);
    let request_id = new_session_id(&format!("provider-{}", definition.provider_id));
    let task_run_id = format!("task-run-{request_id}");
    let started_at = current_unix_millis_label();
    let started = Instant::now();

    let api_result = call_provider_api(
        definition,
        &secret,
        &model,
        &base_url,
        &system_prompt,
        &input.prompt,
    )
    .await;
    let duration_ms = started.elapsed().as_millis();
    let mut http_status = None;
    let mut output = String::new();
    let mut stderr = String::new();
    let status = match api_result {
        Ok(response) => {
            http_status = Some(response.http_status);
            if (200..300).contains(&response.http_status) {
                output = if response.output.trim().is_empty() {
                    response.body
                } else {
                    response.output
                };
                "completed"
            } else {
                stderr = response.body;
                "provider_api_failed"
            }
        }
        Err(error) => {
            stderr = redact_sensitive_text(&error);
            "provider_network_error"
        }
    }
    .to_string();

    let (output, output_truncated) = truncate_provider_task_output(&output);
    let (stderr, stderr_truncated) = truncate_provider_task_output(&redact_sensitive_text(&stderr));
    let mut report = ProviderAgentTaskReport {
        task_run_id,
        provider_id: definition.provider_id.to_string(),
        provider_label: definition.label.to_string(),
        model,
        status,
        http_status,
        duration_ms,
        output,
        stderr,
        output_truncated: output_truncated || stderr_truncated,
        working_dir: path_to_string(&working_dir),
        task_kind,
        task_record_path: None,
        stdout_log_path: None,
        stderr_log_path: None,
        persistence_error: None,
        request_id,
    };

    match persist_provider_agent_task_run(app, &report, &started_at, &input.prompt) {
        Ok(paths) => {
            report.task_record_path = Some(paths.record_path);
            report.stdout_log_path = Some(paths.stdout_log_path);
            report.stderr_log_path = Some(paths.stderr_log_path);
        }
        Err(error) => {
            report.persistence_error = Some(error);
        }
    }

    Ok(report)
}

async fn call_provider_api(
    definition: &ProviderCredentialDefinition,
    secret: &str,
    model: &str,
    base_url: &str,
    system_prompt: &str,
    prompt: &str,
) -> Result<ProviderApiResponse, String> {
    match definition.provider_id {
        OLLAMA_PROVIDER_ID => {
            call_ollama_provider_api(base_url, model, system_prompt, prompt).await
        }
        "openai" => call_openai_provider_api(base_url, secret, model, system_prompt, prompt).await,
        "anthropic" => {
            call_anthropic_provider_api(base_url, secret, model, system_prompt, prompt).await
        }
        "google-gemini" => {
            call_gemini_provider_api(base_url, secret, model, system_prompt, prompt).await
        }
        _ => Err(format!(
            "Unsupported provider id: {}",
            definition.provider_id
        )),
    }
}

async fn call_ollama_provider_api(
    base_url: &str,
    model: &str,
    system_prompt: &str,
    prompt: &str,
) -> Result<ProviderApiResponse, String> {
    let payload = json!({
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "stream": false,
        "options": {
            "num_predict": MAX_PROVIDER_TASK_OUTPUT_TOKENS
        }
    });
    let response = provider_http_client()?
        .post(provider_endpoint(base_url, "/api/chat"))
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("Ollama request failed: {error}"))?;
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Ollama response body read failed: {error}"))?;
    let output = serde_json::from_str::<Value>(&body)
        .map(|value| extract_ollama_output_text(&value))
        .unwrap_or_default();
    Ok(ProviderApiResponse {
        http_status,
        body,
        output,
    })
}

async fn call_openai_provider_api(
    base_url: &str,
    secret: &str,
    model: &str,
    system_prompt: &str,
    prompt: &str,
) -> Result<ProviderApiResponse, String> {
    let payload = json!({
        "model": model,
        "instructions": system_prompt,
        "input": prompt,
        "max_output_tokens": MAX_PROVIDER_TASK_OUTPUT_TOKENS,
        "store": false
    });
    let response = provider_http_client()?
        .post(provider_endpoint(base_url, "/responses"))
        .bearer_auth(secret)
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("OpenAI request failed: {error}"))?;
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("OpenAI response body read failed: {error}"))?;
    let output = serde_json::from_str::<Value>(&body)
        .map(|value| extract_openai_output_text(&value))
        .unwrap_or_default();
    Ok(ProviderApiResponse {
        http_status,
        body,
        output,
    })
}

async fn call_anthropic_provider_api(
    base_url: &str,
    secret: &str,
    model: &str,
    system_prompt: &str,
    prompt: &str,
) -> Result<ProviderApiResponse, String> {
    let payload = json!({
        "model": model,
        "max_tokens": MAX_PROVIDER_TASK_OUTPUT_TOKENS,
        "system": system_prompt,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    });
    let response = provider_http_client()?
        .post(provider_endpoint(base_url, "/v1/messages"))
        .header("x-api-key", secret)
        .header("anthropic-version", "2023-06-01")
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("Anthropic request failed: {error}"))?;
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Anthropic response body read failed: {error}"))?;
    let output = serde_json::from_str::<Value>(&body)
        .map(|value| extract_anthropic_output_text(&value))
        .unwrap_or_default();
    Ok(ProviderApiResponse {
        http_status,
        body,
        output,
    })
}

async fn call_gemini_provider_api(
    base_url: &str,
    secret: &str,
    model: &str,
    system_prompt: &str,
    prompt: &str,
) -> Result<ProviderApiResponse, String> {
    let model_path = gemini_model_path(model);
    let endpoint = provider_endpoint(base_url, &format!("/v1beta/{model_path}:generateContent"));
    let payload = json!({
        "systemInstruction": {
            "parts": [
                {
                    "text": system_prompt
                }
            ]
        },
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "generationConfig": {
            "maxOutputTokens": MAX_PROVIDER_TASK_OUTPUT_TOKENS
        }
    });
    let response = provider_http_client()?
        .post(endpoint)
        .header("x-goog-api-key", secret)
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("Gemini request failed: {error}"))?;
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Gemini response body read failed: {error}"))?;
    let output = serde_json::from_str::<Value>(&body)
        .map(|value| extract_gemini_output_text(&value))
        .unwrap_or_default();
    Ok(ProviderApiResponse {
        http_status,
        body,
        output,
    })
}

fn provider_endpoint(base_url: &str, endpoint_path: &str) -> String {
    let base = base_url.trim().trim_end_matches('/');
    let path = endpoint_path.trim_start_matches('/');
    if base.ends_with(path) {
        base.to_string()
    } else {
        format!("{base}/{path}")
    }
}

fn provider_http_client() -> Result<reqwest::Client, String> {
    reqwest::Client::builder()
        .timeout(Duration::from_millis(PROVIDER_TASK_TIMEOUT_MS))
        .build()
        .map_err(|error| format!("Failed to create provider HTTP client: {error}"))
}

fn provider_secret_for_definition(
    app: &AppHandle,
    definition: &ProviderCredentialDefinition,
) -> Result<String, String> {
    if provider_is_local_http(definition) {
        return Ok(String::new());
    }
    let store = read_provider_credential_store(app)?;
    if let Some(credential) = store
        .credentials
        .iter()
        .find(|item| item.provider_id == definition.provider_id)
    {
        if !credential.secret.trim().is_empty() {
            return Ok(credential.secret.trim().to_string());
        }
    }
    env::var(definition.env_var)
        .map(|value| value.trim().to_string())
        .ok()
        .filter(|value| !value.is_empty())
        .ok_or_else(|| {
            format!(
                "{} is not connected. Save a key or set {}.",
                definition.label, definition.env_var
            )
        })
}

fn provider_task_system_prompt(task_kind: &str, value: &str) -> String {
    let trimmed = value.trim();
    if !trimmed.is_empty() {
        return truncate_chars(trimmed, MAX_SESSION_INPUT_BYTES);
    }
    format!(
        "You are running as an Agent Workspace Platform direct provider task. Task kind: {task_kind}. Work from the user's request, return concrete output, separate assumptions from facts, list validation steps, and do not claim that files were edited or commands were run unless the prompt includes that evidence."
    )
}

fn normalize_provider_model(
    definition: &ProviderCredentialDefinition,
    value: &str,
    fallback_model: Option<&str>,
) -> Result<String, String> {
    let fallback = fallback_model
        .map(str::trim)
        .filter(|candidate| provider_model_id_is_valid(candidate))
        .unwrap_or(definition.default_model);
    let candidate = if value.trim().is_empty() {
        fallback
    } else {
        value.trim()
    };
    if candidate.len() > MAX_PROVIDER_MODEL_CHARS {
        return Err("Provider model id is too long.".to_string());
    }
    if !candidate.chars().all(|character| {
        character.is_ascii_alphanumeric() || matches!(character, '-' | '_' | '.' | ':' | '/')
    }) {
        return Err("Provider model id contains unsupported characters.".to_string());
    }
    Ok(candidate.to_string())
}

fn gemini_model_path(model: &str) -> String {
    if model.starts_with("models/") {
        model.to_string()
    } else {
        format!("models/{model}")
    }
}

fn truncate_provider_task_output(value: &str) -> (String, bool) {
    if value.len() <= MAX_PROVIDER_TASK_OUTPUT_BYTES {
        return (value.to_string(), false);
    }
    let mut output = String::new();
    for character in value.chars() {
        if output.len() + character.len_utf8() > MAX_PROVIDER_TASK_OUTPUT_BYTES {
            break;
        }
        output.push(character);
    }
    (format!("{output}\n[truncated]"), true)
}

fn extract_openai_output_text(value: &Value) -> String {
    if let Some(output_text) = value.get("output_text").and_then(Value::as_str) {
        return output_text.to_string();
    }
    let mut chunks = Vec::new();
    if let Some(items) = value.get("output").and_then(Value::as_array) {
        for item in items {
            if let Some(content_items) = item.get("content").and_then(Value::as_array) {
                for content in content_items {
                    if let Some(text) = content.get("text").and_then(Value::as_str) {
                        chunks.push(text.to_string());
                    }
                }
            }
        }
    }
    chunks.join("\n")
}

fn extract_ollama_output_text(value: &Value) -> String {
    value
        .get("message")
        .and_then(|message| message.get("content"))
        .and_then(Value::as_str)
        .unwrap_or_default()
        .to_string()
}

fn extract_anthropic_output_text(value: &Value) -> String {
    let mut chunks = Vec::new();
    if let Some(items) = value.get("content").and_then(Value::as_array) {
        for item in items {
            if let Some(text) = item.get("text").and_then(Value::as_str) {
                chunks.push(text.to_string());
            }
        }
    }
    chunks.join("\n")
}

fn extract_gemini_output_text(value: &Value) -> String {
    let mut chunks = Vec::new();
    if let Some(candidates) = value.get("candidates").and_then(Value::as_array) {
        for candidate in candidates {
            let Some(parts) = candidate
                .get("content")
                .and_then(|content| content.get("parts"))
                .and_then(Value::as_array)
            else {
                continue;
            };
            for part in parts {
                if let Some(text) = part.get("text").and_then(Value::as_str) {
                    chunks.push(text.to_string());
                }
            }
        }
    }
    chunks.join("\n")
}

fn persist_provider_agent_task_run(
    app: &AppHandle,
    report: &ProviderAgentTaskReport,
    started_at: &str,
    prompt: &str,
) -> Result<TaskRunPersistPaths, String> {
    let root = workspace_root_for_app(Some(app))?;
    let run_dir = task_run_dir(app, &report.task_run_id)?;
    fs::create_dir_all(&run_dir)
        .map_err(|error| format!("Failed to create provider task run directory: {error}"))?;

    let record_path = run_dir.join("record.json");
    let stdout_log_path = run_dir.join("stdout.log");
    let stderr_log_path = run_dir.join("stderr.log");
    fs::write(&stdout_log_path, report.output.as_bytes())
        .map_err(|error| format!("Failed to write provider task stdout log: {error}"))?;
    fs::write(&stderr_log_path, report.stderr.as_bytes())
        .map_err(|error| format!("Failed to write provider task stderr log: {error}"))?;

    let relative_record_path = workspace_relative_display_path(&root, &record_path);
    let relative_stdout_path = workspace_relative_display_path(&root, &stdout_log_path);
    let relative_stderr_path = workspace_relative_display_path(&root, &stderr_log_path);
    let updated_at = current_unix_millis_label();
    let exit_code = if report.status == "completed" { 0 } else { 1 };
    let record = json!({
        "schema_version": 1,
        "record_id": format!("record-{}", report.request_id),
        "session_id": report.request_id.clone(),
        "task_run_id": report.task_run_id.clone(),
        "task_kind": report.task_kind.clone(),
        "pipeline_id": Value::Null,
        "lane_id": Value::Null,
        "lane_role": Value::Null,
        "adapter_id": report.provider_id.clone(),
        "label": format!("{} Direct Task", report.provider_label),
        "command": "provider_api",
        "status": report.status.clone(),
        "exit_code": exit_code,
        "started_at": started_at,
        "updated_at": updated_at,
        "elapsed_ms": u64::try_from(report.duration_ms).unwrap_or(u64::MAX),
        "working_dir": report.working_dir.clone(),
        "prompt_preview": prompt_preview(&redact_sensitive_text(prompt)),
        "stdout_bytes": report.output.len(),
        "stderr_bytes": report.stderr.len(),
        "output_truncated": report.output_truncated,
        "decision_inbox_items": 0,
        "pending_decision_prompts": 0,
        "deferred_prompt_count": 0,
        "auto_defer_questions": false,
        "auto_defer_triggered": false,
        "defer_message_sent": false,
        "bounded": true,
        "max_output_bytes": MAX_PROVIDER_TASK_OUTPUT_BYTES,
        "decision_prompts": [],
        "provider_task": {
            "provider_id": report.provider_id.clone(),
            "provider_label": report.provider_label.clone(),
            "model": report.model.clone(),
            "http_status": report.http_status,
            "credential_policy": "secret_not_persisted"
        },
        "paths": {
            "record": relative_record_path,
            "stdout_log": relative_stdout_path,
            "stderr_log": relative_stderr_path
        }
    });
    let formatted = serde_json::to_string_pretty(&record)
        .map_err(|error| format!("Failed to serialize provider task record: {error}"))?;
    fs::write(&record_path, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write provider task record: {error}"))?;

    Ok(TaskRunPersistPaths {
        record_path: relative_record_path,
        stdout_log_path: relative_stdout_path,
        stderr_log_path: relative_stderr_path,
    })
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

fn desktop_git_status_report(
    app: &AppHandle,
    last_command_status: Option<String>,
    last_command_output: Option<String>,
    last_command_error: Option<String>,
) -> Result<DesktopGitStatusReport, String> {
    let workspace = workspace_root_for_app(Some(app))?;
    let workspace_path = path_to_string(&workspace);
    let git_status = git_capability_status();
    let Some(git_path) = resolve_command("git") else {
        return Ok(DesktopGitStatusReport {
            schema_version: DESKTOP_GIT_STATUS_SCHEMA_VERSION.to_string(),
            status: "capability_missing".to_string(),
            workspace_path,
            git_available: false,
            git_version: git_status.1,
            repository_root: String::new(),
            branch: String::new(),
            upstream: String::new(),
            ahead: 0,
            behind: 0,
            clean: false,
            conflicted: false,
            staged_count: 0,
            unstaged_count: 0,
            untracked_count: 0,
            files: Vec::new(),
            remotes: Vec::new(),
            history: Vec::new(),
            stashes: Vec::new(),
            last_command_status: last_command_status.unwrap_or_else(|| "not_run".to_string()),
            last_command_output: last_command_output.unwrap_or_default(),
            last_command_error: last_command_error.unwrap_or_default(),
            refreshed_at: current_unix_millis_label(),
            summary: vec![
                "Git was not found on PATH. Configure Git to use native workspace operations."
                    .to_string(),
            ],
        });
    };

    let root_output = run_bounded_command_in_dir(
        &git_path,
        &["rev-parse", "--show-toplevel"],
        &workspace,
        Duration::from_millis(4_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    )?;
    if root_output.status != "passed" {
        return Ok(DesktopGitStatusReport {
            schema_version: DESKTOP_GIT_STATUS_SCHEMA_VERSION.to_string(),
            status: "not_git_repository".to_string(),
            workspace_path,
            git_available: git_status.0,
            git_version: git_status.1,
            repository_root: String::new(),
            branch: String::new(),
            upstream: String::new(),
            ahead: 0,
            behind: 0,
            clean: false,
            conflicted: false,
            staged_count: 0,
            unstaged_count: 0,
            untracked_count: 0,
            files: Vec::new(),
            remotes: Vec::new(),
            history: Vec::new(),
            stashes: Vec::new(),
            last_command_status: last_command_status.unwrap_or_else(|| "not_run".to_string()),
            last_command_output: last_command_output.unwrap_or_default(),
            last_command_error: last_command_error
                .unwrap_or_else(|| redact_sensitive_text(&root_output.stderr)),
            refreshed_at: current_unix_millis_label(),
            summary: vec![
                "The active workspace is not a Git repository yet.".to_string(),
                "Use Clone Workspace or select a repository folder before Git actions.".to_string(),
            ],
        });
    }

    let repository_root = root_output
        .stdout
        .lines()
        .next()
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .unwrap_or(&workspace_path)
        .to_string();
    let repository_root_path = PathBuf::from(&repository_root);
    let status_output = run_bounded_command_in_dir(
        &git_path,
        &["status", "--porcelain=v1", "--branch"],
        &repository_root_path,
        Duration::from_millis(4_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    )?;
    let status_text = redact_sensitive_text(&status_output.stdout);
    let branch = git_branch_name(&git_path, &repository_root_path);
    let upstream = git_upstream_name(&git_path, &repository_root_path);
    let (ahead, behind) = git_ahead_behind(&git_path, &repository_root_path, &upstream);
    let files = parse_git_status_files(&status_text, &git_path, &repository_root_path);
    let staged_count = files
        .iter()
        .filter(|file| git_file_has_staged_change(&file.status))
        .count();
    let unstaged_count = files
        .iter()
        .filter(|file| git_file_has_unstaged_change(&file.status))
        .count();
    let untracked_count = files.iter().filter(|file| file.status == "??").count();
    let conflicted = files
        .iter()
        .any(|file| git_status_is_conflicted(&file.status));
    let clean = staged_count == 0 && unstaged_count == 0 && untracked_count == 0 && !conflicted;
    let status = if status_output.status != "passed" {
        "status_failed"
    } else if conflicted {
        "conflicts_detected"
    } else if clean {
        "clean"
    } else {
        "changes_detected"
    }
    .to_string();
    let remotes = git_remote_reports(&git_path, &repository_root_path);
    let mut summary = vec![format!(
        "Branch {} / {} staged / {} unstaged / {} untracked.",
        if branch.is_empty() {
            "detached".to_string()
        } else {
            branch.clone()
        },
        staged_count,
        unstaged_count,
        untracked_count
    )];
    if !upstream.is_empty() {
        summary.push(format!(
            "Upstream {upstream}; ahead {ahead}, behind {behind}."
        ));
    } else {
        summary.push("No upstream is configured for the current branch.".to_string());
    }
    if conflicted {
        summary
            .push("Conflict state is visible; resolve files before commit/pull/push.".to_string());
    }
    let history = git_history_reports(&git_path, &repository_root_path);
    let stashes = git_stash_reports(&git_path, &repository_root_path);

    Ok(DesktopGitStatusReport {
        schema_version: DESKTOP_GIT_STATUS_SCHEMA_VERSION.to_string(),
        status,
        workspace_path,
        git_available: git_status.0,
        git_version: git_status.1,
        repository_root: redact_sensitive_text(&repository_root),
        branch,
        upstream,
        ahead,
        behind,
        clean,
        conflicted,
        staged_count,
        unstaged_count,
        untracked_count,
        files,
        remotes,
        history,
        stashes,
        last_command_status: last_command_status.unwrap_or_else(|| "not_run".to_string()),
        last_command_output: last_command_output.unwrap_or_default(),
        last_command_error: last_command_error.unwrap_or_default(),
        refreshed_at: current_unix_millis_label(),
        summary,
    })
}

fn run_desktop_git_action_report(
    app: &AppHandle,
    input: DesktopGitActionInput,
) -> Result<DesktopGitActionReport, String> {
    let action = normalize_one_of(
        input.action,
        &[
            "refresh",
            "fetch",
            "create_branch",
            "commit_all",
            "commit_selected",
            "discard_selected",
            "stash_all",
            "stash_selected",
            "apply_stash",
            "pop_stash",
            "drop_stash",
            "pull_ff",
            "push",
        ],
        "refresh",
    );
    if action == "refresh" {
        let git = desktop_git_status_report(app, Some("refreshed".to_string()), None, None)?;
        return Ok(DesktopGitActionReport {
            status: "refreshed".to_string(),
            action,
            command: "git status --porcelain=v1 --branch".to_string(),
            output: String::new(),
            error: String::new(),
            refreshed_at: current_unix_millis_label(),
            git,
        });
    }

    let workspace = workspace_root_for_app(Some(app))?;
    let Some(git_path) = resolve_command("git") else {
        let git = desktop_git_status_report(
            app,
            Some("capability_missing".to_string()),
            None,
            Some("Git was not found on PATH.".to_string()),
        )?;
        return Ok(DesktopGitActionReport {
            status: "capability_missing".to_string(),
            action,
            command: "git".to_string(),
            output: String::new(),
            error: "Git was not found on PATH.".to_string(),
            refreshed_at: current_unix_millis_label(),
            git,
        });
    };
    let root_output = run_bounded_command_in_dir(
        &git_path,
        &["rev-parse", "--show-toplevel"],
        &workspace,
        Duration::from_millis(4_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    )?;
    if root_output.status != "passed" {
        let error = redact_sensitive_text(&root_output.stderr);
        let git = desktop_git_status_report(
            app,
            Some("not_git_repository".to_string()),
            None,
            Some(error.clone()),
        )?;
        return Ok(DesktopGitActionReport {
            status: "not_git_repository".to_string(),
            action,
            command: "git rev-parse --show-toplevel".to_string(),
            output: String::new(),
            error,
            refreshed_at: current_unix_millis_label(),
            git,
        });
    }
    let repository_root_text = root_output
        .stdout
        .lines()
        .next()
        .map(str::trim)
        .filter(|value| !value.is_empty())
        .map(ToOwned::to_owned)
        .unwrap_or_else(|| path_to_string(&workspace));
    let repository_root_path = PathBuf::from(repository_root_text);
    let selected_paths = validate_git_relative_paths(&input.file_paths, &repository_root_path)?;
    let stash_ref = validate_git_stash_ref(&input.stash_ref)?;

    let (command_label, output) = match action.as_str() {
        "fetch" => (
            "git fetch --prune".to_string(),
            run_bounded_command_in_dir(
                &git_path,
                &["fetch", "--prune"],
                &repository_root_path,
                Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                MAX_GIT_OPERATION_OUTPUT_BYTES,
            )?,
        ),
        "create_branch" => {
            let branch = validate_git_branch_name(&input.branch_name)?;
            let args = ["switch", "-c", branch.as_str()];
            (
                format!("git switch -c {branch}"),
                run_bounded_command_in_dir(
                    &git_path,
                    &args,
                    &repository_root_path,
                    Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                    MAX_GIT_OPERATION_OUTPUT_BYTES,
                )?,
            )
        }
        "commit_all" => {
            let message = validate_git_commit_message(&input.commit_message)?;
            let add_output = run_bounded_command_in_dir(
                &git_path,
                &["add", "-A"],
                &repository_root_path,
                Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                MAX_GIT_OPERATION_OUTPUT_BYTES,
            )?;
            if add_output.status != "passed" {
                ("git add -A".to_string(), add_output)
            } else {
                let args = ["commit", "-m", message.as_str()];
                (
                    "git add -A && git commit -m <message>".to_string(),
                    run_bounded_command_in_dir(
                        &git_path,
                        &args,
                        &repository_root_path,
                        Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                        MAX_GIT_OPERATION_OUTPUT_BYTES,
                    )?,
                )
            }
        }
        "commit_selected" => {
            let message = validate_git_commit_message(&input.commit_message)?;
            let add_output = run_git_with_owned_args(
                &git_path,
                &git_args_with_paths(&["add", "--"], &selected_paths)?,
                &repository_root_path,
                Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                MAX_GIT_OPERATION_OUTPUT_BYTES,
            )?;
            if add_output.status != "passed" {
                ("git add -- <selected files>".to_string(), add_output)
            } else {
                (
                    "git commit -m <message> -- <selected files>".to_string(),
                    run_git_with_owned_args(
                        &git_path,
                        &git_args_with_paths(
                            &["commit", "-m", message.as_str(), "--"],
                            &selected_paths,
                        )?,
                        &repository_root_path,
                        Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                        MAX_GIT_OPERATION_OUTPUT_BYTES,
                    )?,
                )
            }
        }
        "discard_selected" => (
            "git restore --staged --worktree && git clean -f -- <selected files>".to_string(),
            git_discard_selected_changes(&git_path, &repository_root_path, &selected_paths)?,
        ),
        "stash_all" => {
            let message = git_stash_message(&input.commit_message);
            let args = [
                "stash",
                "push",
                "--include-untracked",
                "-m",
                message.as_str(),
            ];
            (
                "git stash push --include-untracked -m <message>".to_string(),
                run_bounded_command_in_dir(
                    &git_path,
                    &args,
                    &repository_root_path,
                    Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                    MAX_GIT_OPERATION_OUTPUT_BYTES,
                )?,
            )
        }
        "stash_selected" => {
            let message = git_stash_message(&input.commit_message);
            (
                "git stash push --include-untracked -m <message> -- <selected files>".to_string(),
                run_git_with_owned_args(
                    &git_path,
                    &git_args_with_paths(
                        &[
                            "stash",
                            "push",
                            "--include-untracked",
                            "-m",
                            message.as_str(),
                            "--",
                        ],
                        &selected_paths,
                    )?,
                    &repository_root_path,
                    Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                    MAX_GIT_OPERATION_OUTPUT_BYTES,
                )?,
            )
        }
        "apply_stash" => {
            let stash_ref = require_git_stash_ref(&stash_ref)?;
            (
                format!("git stash apply {stash_ref}"),
                run_bounded_command_in_dir(
                    &git_path,
                    &["stash", "apply", stash_ref.as_str()],
                    &repository_root_path,
                    Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                    MAX_GIT_OPERATION_OUTPUT_BYTES,
                )?,
            )
        }
        "pop_stash" => {
            let stash_ref = require_git_stash_ref(&stash_ref)?;
            (
                format!("git stash pop {stash_ref}"),
                run_bounded_command_in_dir(
                    &git_path,
                    &["stash", "pop", stash_ref.as_str()],
                    &repository_root_path,
                    Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                    MAX_GIT_OPERATION_OUTPUT_BYTES,
                )?,
            )
        }
        "drop_stash" => {
            let stash_ref = require_git_stash_ref(&stash_ref)?;
            (
                format!("git stash drop {stash_ref}"),
                run_bounded_command_in_dir(
                    &git_path,
                    &["stash", "drop", stash_ref.as_str()],
                    &repository_root_path,
                    Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                    MAX_GIT_OPERATION_OUTPUT_BYTES,
                )?,
            )
        }
        "pull_ff" => (
            "git pull --ff-only".to_string(),
            run_bounded_command_in_dir(
                &git_path,
                &["pull", "--ff-only"],
                &repository_root_path,
                Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                MAX_GIT_OPERATION_OUTPUT_BYTES,
            )?,
        ),
        "push" => (
            "git push".to_string(),
            run_bounded_command_in_dir(
                &git_path,
                &["push"],
                &repository_root_path,
                Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
                MAX_GIT_OPERATION_OUTPUT_BYTES,
            )?,
        ),
        _ => unreachable!(),
    };
    let output_text = truncate_chars(&redact_sensitive_text(&output.stdout), 1_200);
    let error_text = truncate_chars(&redact_sensitive_text(&output.stderr), 1_200);
    let git = desktop_git_status_report(
        app,
        Some(output.status.clone()),
        Some(output_text.clone()),
        Some(error_text.clone()),
    )?;
    Ok(DesktopGitActionReport {
        status: output.status,
        action,
        command: command_label,
        output: output_text,
        error: error_text,
        refreshed_at: current_unix_millis_label(),
        git,
    })
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

fn git_branch_name(git_path: &PathBuf, repository_root: &Path) -> String {
    let output = run_bounded_command_in_dir(
        git_path,
        &["branch", "--show-current"],
        repository_root,
        Duration::from_millis(2_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    output
        .ok()
        .and_then(|value| first_non_empty_line(&value.stdout))
        .unwrap_or_else(|| "detached".to_string())
}

fn git_upstream_name(git_path: &PathBuf, repository_root: &Path) -> String {
    let output = run_bounded_command_in_dir(
        git_path,
        &["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"],
        repository_root,
        Duration::from_millis(2_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    output
        .ok()
        .filter(|value| value.status == "passed")
        .and_then(|value| first_non_empty_line(&value.stdout))
        .unwrap_or_default()
}

fn git_ahead_behind(git_path: &PathBuf, repository_root: &Path, upstream: &str) -> (usize, usize) {
    if upstream.trim().is_empty() {
        return (0, 0);
    }
    let output = run_bounded_command_in_dir(
        git_path,
        &[
            "rev-list",
            "--left-right",
            "--count",
            &format!("{upstream}...HEAD"),
        ],
        repository_root,
        Duration::from_millis(2_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    let Some(line) = output
        .ok()
        .filter(|value| value.status == "passed")
        .and_then(|value| first_non_empty_line(&value.stdout))
    else {
        return (0, 0);
    };
    let mut parts = line.split_whitespace();
    let behind = parts
        .next()
        .and_then(|value| value.parse::<usize>().ok())
        .unwrap_or(0);
    let ahead = parts
        .next()
        .and_then(|value| value.parse::<usize>().ok())
        .unwrap_or(0);
    (ahead, behind)
}

fn git_remote_reports(git_path: &PathBuf, repository_root: &Path) -> Vec<DesktopGitRemoteReport> {
    let output = run_bounded_command_in_dir(
        git_path,
        &["remote", "-v"],
        repository_root,
        Duration::from_millis(2_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    let Some(output) = output.ok().filter(|value| value.status == "passed") else {
        return Vec::new();
    };
    let mut seen = HashSet::new();
    output
        .stdout
        .lines()
        .filter_map(|line| {
            let mut parts = line.split_whitespace();
            let name = parts.next()?.to_string();
            let url = parts.next().unwrap_or_default().to_string();
            let direction = parts
                .next()
                .unwrap_or_default()
                .trim_matches(|character| character == '(' || character == ')')
                .to_string();
            let key = format!("{name}:{direction}:{url}");
            if !seen.insert(key) {
                return None;
            }
            Some(DesktopGitRemoteReport {
                name,
                url: redact_sensitive_text(&redact_repository_url(&url)),
                direction,
            })
        })
        .take(12)
        .collect()
}

fn git_history_reports(
    git_path: &PathBuf,
    repository_root: &Path,
) -> Vec<DesktopGitHistoryCommitReport> {
    let count_arg = format!("-n{MAX_GIT_HISTORY_COMMITS}");
    let output = run_bounded_command_in_dir(
        git_path,
        &[
            "log",
            count_arg.as_str(),
            "--date=iso-strict",
            "--numstat",
            "--format=format:%H%x1f%h%x1f%s%x1f%an%x1f%ad",
        ],
        repository_root,
        Duration::from_millis(4_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    let Some(output) = output.ok().filter(|value| value.status == "passed") else {
        return Vec::new();
    };
    parse_git_history_reports(&redact_sensitive_text(&output.stdout))
}

fn parse_git_history_reports(output: &str) -> Vec<DesktopGitHistoryCommitReport> {
    let mut commits = Vec::new();
    let mut current: Option<DesktopGitHistoryCommitReport> = None;
    for line in output.lines() {
        if line.contains('\u{1f}') {
            if let Some(commit) = current.take() {
                commits.push(commit);
            }
            let mut parts = line.split('\u{1f}');
            let hash = parts.next().unwrap_or_default().to_string();
            let short_hash = parts.next().unwrap_or_default().to_string();
            let subject = parts.next().unwrap_or_default().to_string();
            let author = parts.next().unwrap_or_default().to_string();
            let authored_at = parts.next().unwrap_or_default().to_string();
            current = Some(DesktopGitHistoryCommitReport {
                hash,
                short_hash,
                subject: truncate_chars(subject.trim(), 180),
                author: truncate_chars(author.trim(), 80),
                authored_at: truncate_chars(authored_at.trim(), 80),
                files_changed: 0,
                additions: 0,
                deletions: 0,
                files: Vec::new(),
            });
            continue;
        }
        let Some(commit) = current.as_mut() else {
            continue;
        };
        let mut parts = line.split('\t');
        let additions = parts.next().unwrap_or_default();
        let deletions = parts.next().unwrap_or_default();
        if additions.is_empty() || deletions.is_empty() {
            continue;
        }
        let path = parts.next().unwrap_or_default();
        commit.files_changed += 1;
        let parsed_additions = additions.parse::<usize>().unwrap_or(0);
        let parsed_deletions = deletions.parse::<usize>().unwrap_or(0);
        commit.additions += parsed_additions;
        commit.deletions += parsed_deletions;
        if commit.files.len() < 12 {
            commit.files.push(DesktopGitHistoryFileReport {
                path: truncate_chars(redact_sensitive_text(path).trim(), 180),
                additions: parsed_additions,
                deletions: parsed_deletions,
            });
        }
    }
    if let Some(commit) = current {
        commits.push(commit);
    }
    commits.truncate(MAX_GIT_HISTORY_COMMITS);
    commits
}

fn git_stash_reports(git_path: &PathBuf, repository_root: &Path) -> Vec<DesktopGitStashReport> {
    let output = run_bounded_command_in_dir(
        git_path,
        &["stash", "list", "--format=%gd%x1f%gs"],
        repository_root,
        Duration::from_millis(3_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    let Some(output) = output.ok().filter(|value| value.status == "passed") else {
        return Vec::new();
    };
    output
        .stdout
        .lines()
        .take(MAX_GIT_STASHES)
        .filter_map(|line| {
            let mut parts = line.split('\u{1f}');
            let reference = parts.next()?.trim().to_string();
            if reference.is_empty() {
                return None;
            }
            let raw_message = parts.next().unwrap_or_default().trim();
            let (branch, message) = parse_git_stash_subject(raw_message);
            let files_changed = git_stash_file_count(git_path, repository_root, &reference);
            Some(DesktopGitStashReport {
                reference,
                branch,
                message,
                files_changed,
            })
        })
        .collect()
}

fn parse_git_stash_subject(raw_message: &str) -> (String, String) {
    let sanitized = truncate_chars(redact_sensitive_text(raw_message).trim(), 220);
    let prefix = "WIP on ";
    if let Some(rest) = sanitized.strip_prefix(prefix) {
        if let Some((branch, message)) = rest.split_once(": ") {
            return (branch.to_string(), message.to_string());
        }
    }
    (String::new(), sanitized)
}

fn git_stash_file_count(git_path: &PathBuf, repository_root: &Path, stash_ref: &str) -> usize {
    let output = run_bounded_command_in_dir(
        git_path,
        &["stash", "show", "--name-only", stash_ref],
        repository_root,
        Duration::from_millis(2_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    output
        .ok()
        .filter(|value| value.status == "passed")
        .map(|value| {
            value
                .stdout
                .lines()
                .filter(|line| !line.trim().is_empty())
                .count()
        })
        .unwrap_or(0)
}

fn parse_git_status_files(
    status_text: &str,
    git_path: &PathBuf,
    repository_root: &Path,
) -> Vec<DesktopGitFileReport> {
    status_text
        .lines()
        .filter(|line| !line.starts_with("## "))
        .filter(|line| line.len() >= 3)
        .take(MAX_GIT_STATUS_FILES)
        .enumerate()
        .map(|(index, line)| {
            let status = line.chars().take(2).collect::<String>();
            let path_text = line.chars().skip(3).collect::<String>();
            let (path, original_path) = if let Some((left, right)) = path_text.split_once(" -> ") {
                (right.to_string(), Some(left.to_string()))
            } else {
                (path_text, None)
            };
            let staged = git_file_has_staged_change(&status);
            let unstaged = git_file_has_unstaged_change(&status);
            let untracked = status == "??";
            let conflicted = git_status_is_conflicted(&status);
            let diff_preview = if index < MAX_GIT_DIFF_PREVIEW_FILES {
                git_file_diff_preview(git_path, repository_root, &path, &status)
            } else {
                Vec::new()
            };
            let (additions, deletions) =
                git_file_change_counts(git_path, repository_root, &path, &status, &diff_preview);
            let change_kind = git_status_change_kind(&status);
            DesktopGitFileReport {
                status,
                path,
                original_path,
                change_kind,
                staged,
                unstaged,
                untracked,
                conflicted,
                additions,
                deletions,
                diff_preview,
            }
        })
        .collect()
}

fn git_status_change_kind(status: &str) -> String {
    if git_status_is_conflicted(status) {
        return "conflict".to_string();
    }
    if status == "??" {
        return "untracked".to_string();
    }
    if status.contains('R') {
        return "renamed".to_string();
    }
    if status.contains('D') {
        return "deleted".to_string();
    }
    if status.contains('A') {
        return "added".to_string();
    }
    if status.contains('M') {
        return "modified".to_string();
    }
    "changed".to_string()
}

fn git_file_diff_preview(
    git_path: &PathBuf,
    repository_root: &Path,
    relative_path: &str,
    status: &str,
) -> Vec<DesktopGitDiffLineReport> {
    if status == "??" {
        return git_untracked_file_preview(repository_root, relative_path);
    }

    let diff_args = [
        "diff",
        "--no-ext-diff",
        "--unified=3",
        "HEAD",
        "--",
        relative_path,
    ];
    let primary = run_bounded_command_in_dir(
        git_path,
        &diff_args,
        repository_root,
        Duration::from_millis(2_500),
        MAX_GIT_DIFF_PREVIEW_OUTPUT_BYTES,
    );
    let mut preview = primary
        .ok()
        .filter(|output| output.status == "passed")
        .map(|output| parse_git_diff_preview(&redact_sensitive_text(&output.stdout)))
        .unwrap_or_default();

    if preview.is_empty() && git_file_has_staged_change(status) {
        let cached_args = [
            "diff",
            "--cached",
            "--no-ext-diff",
            "--unified=3",
            "--",
            relative_path,
        ];
        preview = run_bounded_command_in_dir(
            git_path,
            &cached_args,
            repository_root,
            Duration::from_millis(2_500),
            MAX_GIT_DIFF_PREVIEW_OUTPUT_BYTES,
        )
        .ok()
        .filter(|output| output.status == "passed")
        .map(|output| parse_git_diff_preview(&redact_sensitive_text(&output.stdout)))
        .unwrap_or_default();
    }

    preview
}

fn git_file_change_counts(
    git_path: &PathBuf,
    repository_root: &Path,
    relative_path: &str,
    status: &str,
    preview: &[DesktopGitDiffLineReport],
) -> (usize, usize) {
    if status == "??" {
        return (
            preview
                .iter()
                .filter(|line| line.kind == "addition")
                .count(),
            0,
        );
    }

    let args = ["diff", "--numstat", "HEAD", "--", relative_path];
    let primary = run_bounded_command_in_dir(
        git_path,
        &args,
        repository_root,
        Duration::from_millis(2_500),
        MAX_GIT_DIFF_PREVIEW_OUTPUT_BYTES,
    );
    let counts = primary
        .ok()
        .filter(|output| output.status == "passed")
        .and_then(|output| parse_git_numstat_counts(&output.stdout));
    if let Some(counts) = counts {
        return counts;
    }

    if git_file_has_staged_change(status) {
        let cached_args = ["diff", "--cached", "--numstat", "--", relative_path];
        if let Some(counts) = run_bounded_command_in_dir(
            git_path,
            &cached_args,
            repository_root,
            Duration::from_millis(2_500),
            MAX_GIT_DIFF_PREVIEW_OUTPUT_BYTES,
        )
        .ok()
        .filter(|output| output.status == "passed")
        .and_then(|output| parse_git_numstat_counts(&output.stdout))
        {
            return counts;
        }
    }

    (
        preview
            .iter()
            .filter(|line| line.kind == "addition")
            .count(),
        preview
            .iter()
            .filter(|line| line.kind == "deletion")
            .count(),
    )
}

fn parse_git_numstat_counts(output: &str) -> Option<(usize, usize)> {
    let line = output.lines().find(|line| !line.trim().is_empty())?;
    let mut parts = line.split('\t');
    let additions = parts.next()?.parse::<usize>().unwrap_or(0);
    let deletions = parts.next()?.parse::<usize>().unwrap_or(0);
    Some((additions, deletions))
}

fn git_untracked_file_preview(
    repository_root: &Path,
    relative_path: &str,
) -> Vec<DesktopGitDiffLineReport> {
    let Ok(root) = repository_root.canonicalize() else {
        return Vec::new();
    };
    let candidate = root.join(relative_path);
    let Ok(canonical) = candidate.canonicalize() else {
        return Vec::new();
    };
    if !canonical.starts_with(&root) {
        return Vec::new();
    }
    let Ok(metadata) = fs::metadata(&canonical) else {
        return Vec::new();
    };
    if !metadata.is_file() || metadata.len() > MAX_WORKSPACE_FILE_BYTES as u64 {
        return Vec::new();
    }
    let Ok(content) = fs::read_to_string(&canonical) else {
        return Vec::new();
    };
    content
        .lines()
        .take(MAX_GIT_DIFF_PREVIEW_LINES)
        .map(|line| DesktopGitDiffLineReport {
            kind: "addition".to_string(),
            text: truncate_chars(line, 240),
        })
        .collect()
}

fn parse_git_diff_preview(diff_text: &str) -> Vec<DesktopGitDiffLineReport> {
    diff_text
        .lines()
        .filter(|line| {
            !line.starts_with("diff --git ")
                && !line.starts_with("index ")
                && !line.starts_with("new file mode ")
                && !line.starts_with("deleted file mode ")
        })
        .take(MAX_GIT_DIFF_PREVIEW_LINES)
        .map(|line| {
            let kind =
                if line.starts_with("@@") || line.starts_with("--- ") || line.starts_with("+++ ") {
                    "meta"
                } else if line.starts_with('+') {
                    "addition"
                } else if line.starts_with('-') {
                    "deletion"
                } else {
                    "context"
                };
            DesktopGitDiffLineReport {
                kind: kind.to_string(),
                text: truncate_chars(line, 240),
            }
        })
        .collect()
}

fn git_file_has_staged_change(status: &str) -> bool {
    let mut chars = status.chars();
    let first = chars.next().unwrap_or(' ');
    first != ' ' && first != '?'
}

fn git_file_has_unstaged_change(status: &str) -> bool {
    let mut chars = status.chars();
    let _ = chars.next();
    let second = chars.next().unwrap_or(' ');
    second != ' ' && second != '?'
}

fn git_status_is_conflicted(status: &str) -> bool {
    matches!(status, "DD" | "AU" | "UD" | "UA" | "DU" | "AA" | "UU")
        || status.chars().any(|character| character == 'U')
}

fn run_git_with_owned_args(
    git_path: &PathBuf,
    args: &[String],
    repository_root: &Path,
    timeout: Duration,
    max_output_bytes: usize,
) -> Result<ProcessOutput, String> {
    let arg_refs = args.iter().map(String::as_str).collect::<Vec<_>>();
    run_bounded_command_in_dir(
        git_path,
        &arg_refs,
        repository_root,
        timeout,
        max_output_bytes,
    )
}

fn git_args_with_paths(prefix: &[&str], paths: &[String]) -> Result<Vec<String>, String> {
    if paths.is_empty() {
        return Err("Select at least one changed file first.".to_string());
    }
    if paths.len() > MAX_GIT_ACTION_FILE_PATHS {
        return Err(format!(
            "Too many files selected. Max selection is {MAX_GIT_ACTION_FILE_PATHS} files."
        ));
    }
    let mut args = prefix
        .iter()
        .map(|value| value.to_string())
        .collect::<Vec<_>>();
    args.extend(paths.iter().cloned());
    Ok(args)
}

fn validate_git_relative_paths(
    paths: &[String],
    repository_root: &Path,
) -> Result<Vec<String>, String> {
    let root = repository_root
        .canonicalize()
        .map_err(|error| format!("Failed to resolve repository root: {error}"))?;
    let mut seen = HashSet::new();
    let mut safe_paths = Vec::new();
    for raw_path in paths.iter().take(MAX_GIT_ACTION_FILE_PATHS + 1) {
        let path = raw_path.trim();
        if path.is_empty() {
            continue;
        }
        if path.len() > MAX_WORKSPACE_FOLDER_NAME_BYTES * 8 {
            return Err("Selected file path is too long for desktop Git operations.".to_string());
        }
        if path.chars().any(|character| character.is_control()) {
            return Err("Selected file path contains control characters.".to_string());
        }
        let path_value = Path::new(path);
        if path_value.is_absolute() {
            return Err("Selected Git file path must be repository-relative.".to_string());
        }
        let mut component_values = Vec::new();
        for component in path_value.components() {
            match component {
                Component::Normal(value) => {
                    component_values.push(value.to_string_lossy().to_string())
                }
                Component::CurDir => {}
                Component::ParentDir | Component::RootDir | Component::Prefix(_) => {
                    return Err("Selected Git file path cannot leave the repository.".to_string());
                }
            }
        }
        if component_values.is_empty()
            || component_values
                .first()
                .is_some_and(|value| value == ".git")
        {
            return Err("Selected Git file path is not allowed.".to_string());
        }
        let normalized = component_values.join("/");
        let candidate = root.join(&normalized);
        if let Ok(canonical) = candidate.canonicalize() {
            if !canonical.starts_with(&root) {
                return Err("Selected Git file path resolved outside the repository.".to_string());
            }
        }
        if seen.insert(normalized.clone()) {
            safe_paths.push(normalized);
        }
    }
    if paths.len() > MAX_GIT_ACTION_FILE_PATHS {
        return Err(format!(
            "Too many files selected. Max selection is {MAX_GIT_ACTION_FILE_PATHS} files."
        ));
    }
    Ok(safe_paths)
}

fn git_discard_selected_changes(
    git_path: &PathBuf,
    repository_root: &Path,
    selected_paths: &[String],
) -> Result<ProcessOutput, String> {
    let tracked_paths = git_filter_paths(
        git_path,
        repository_root,
        &["ls-files", "--cached", "--"],
        selected_paths,
    )?;
    let untracked_paths = git_filter_paths(
        git_path,
        repository_root,
        &["ls-files", "--others", "--exclude-standard", "--"],
        selected_paths,
    )?;
    if tracked_paths.is_empty() && untracked_paths.is_empty() {
        return Ok(ProcessOutput {
            status: "failed".to_string(),
            exit_code: Some(1),
            stdout: String::new(),
            stderr: "No selected changed files matched Git status.".to_string(),
            duration_ms: 0,
        });
    }

    let mut combined = ProcessOutput {
        status: "passed".to_string(),
        exit_code: Some(0),
        stdout: String::new(),
        stderr: String::new(),
        duration_ms: 0,
    };

    if !tracked_paths.is_empty() {
        let output = run_git_with_owned_args(
            git_path,
            &git_args_with_paths(&["restore", "--staged", "--worktree", "--"], &tracked_paths)?,
            repository_root,
            Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
            MAX_GIT_OPERATION_OUTPUT_BYTES,
        )?;
        append_git_process_output(&mut combined, &output);
        if output.status != "passed" {
            return Ok(combined);
        }
    }

    if !untracked_paths.is_empty() {
        let output = run_git_with_owned_args(
            git_path,
            &git_args_with_paths(&["clean", "-f", "-d", "--"], &untracked_paths)?,
            repository_root,
            Duration::from_millis(GIT_OPERATION_TIMEOUT_MS),
            MAX_GIT_OPERATION_OUTPUT_BYTES,
        )?;
        append_git_process_output(&mut combined, &output);
    }

    Ok(combined)
}

fn git_filter_paths(
    git_path: &PathBuf,
    repository_root: &Path,
    prefix: &[&str],
    selected_paths: &[String],
) -> Result<Vec<String>, String> {
    if selected_paths.is_empty() {
        return Ok(Vec::new());
    }
    let output = run_git_with_owned_args(
        git_path,
        &git_args_with_paths(prefix, selected_paths)?,
        repository_root,
        Duration::from_millis(3_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    )?;
    if output.status != "passed" {
        return Ok(Vec::new());
    }
    let allowed = selected_paths.iter().cloned().collect::<HashSet<_>>();
    Ok(output
        .stdout
        .lines()
        .map(str::trim)
        .filter(|line| !line.is_empty())
        .filter(|line| allowed.contains(*line))
        .map(ToOwned::to_owned)
        .collect())
}

fn append_git_process_output(target: &mut ProcessOutput, output: &ProcessOutput) {
    if output.status != "passed" {
        target.status = output.status.clone();
        target.exit_code = output.exit_code;
    }
    target.duration_ms += output.duration_ms;
    if !output.stdout.trim().is_empty() {
        if !target.stdout.is_empty() {
            target.stdout.push('\n');
        }
        target.stdout.push_str(&output.stdout);
    }
    if !output.stderr.trim().is_empty() {
        if !target.stderr.is_empty() {
            target.stderr.push('\n');
        }
        target.stderr.push_str(&output.stderr);
    }
}

fn git_stash_message(value: &str) -> String {
    let message = truncate_chars(value.trim(), MAX_GIT_COMMIT_MESSAGE_CHARS);
    if message.is_empty() {
        "Desktop workbench stash".to_string()
    } else {
        message
    }
}

fn validate_git_stash_ref(value: &str) -> Result<String, String> {
    let stash_ref = value.trim();
    if stash_ref.is_empty() {
        return Ok(String::new());
    }
    if !stash_ref.starts_with("stash@{") || !stash_ref.ends_with('}') {
        return Err("Stash reference must look like stash@{0}.".to_string());
    }
    let index = &stash_ref[7..stash_ref.len().saturating_sub(1)];
    if index.is_empty() || !index.chars().all(|character| character.is_ascii_digit()) {
        return Err("Stash reference must use a numeric index.".to_string());
    }
    Ok(stash_ref.to_string())
}

fn require_git_stash_ref(stash_ref: &str) -> Result<String, String> {
    if stash_ref.trim().is_empty() {
        Err("Select a stash first.".to_string())
    } else {
        Ok(stash_ref.to_string())
    }
}

fn validate_git_commit_message(value: &str) -> Result<String, String> {
    let message = truncate_chars(value.trim(), MAX_GIT_COMMIT_MESSAGE_CHARS);
    if message.is_empty() {
        return Err("Commit message is required.".to_string());
    }
    Ok(message)
}

fn validate_git_branch_name(value: &str) -> Result<String, String> {
    let branch = value.trim();
    if branch.is_empty() {
        return Err("Branch name is required.".to_string());
    }
    if branch.len() > 120 {
        return Err("Branch name is too long.".to_string());
    }
    if branch.starts_with('-')
        || branch.contains("..")
        || branch.contains("@{")
        || branch.ends_with('/')
        || branch.ends_with(".lock")
        || branch.chars().any(|character| {
            character.is_control()
                || character.is_whitespace()
                || matches!(character, '~' | '^' | ':' | '?' | '*' | '[' | '\\')
        })
    {
        return Err("Branch name is not safe for desktop Git operations.".to_string());
    }
    Ok(branch.to_string())
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

fn sanitize_slug(value: &str, fallback: &str) -> String {
    let mut output = String::new();
    let mut last_dash = false;
    for character in value.to_lowercase().chars() {
        if character.is_ascii_alphanumeric() {
            output.push(character);
            last_dash = false;
        } else if !last_dash {
            output.push('-');
            last_dash = true;
        }
        if output.len() >= 80 {
            break;
        }
    }
    let trimmed = output.trim_matches('-').to_string();
    if trimmed.is_empty() {
        fallback.to_string()
    } else {
        trimmed
    }
}

fn normalize_agent_slug(value: &str, label: &str, goal: &str, fallback: &str) -> String {
    let source = if !value.trim().is_empty() {
        value
    } else if !label.trim().is_empty() {
        label
    } else {
        goal
    };
    let slug = sanitize_slug(source, fallback);
    if slug.ends_with("-agent") {
        slug
    } else {
        format!("{slug}-agent")
    }
}

fn normalize_factory_slug(value: &str, label: &str, source: &str, fallback: &str) -> String {
    if !value.trim().is_empty() {
        sanitize_slug(value, fallback)
    } else if !label.trim().is_empty() {
        sanitize_slug(label, fallback)
    } else {
        sanitize_slug(source, fallback)
    }
}

fn normalize_factory_text(value: &str, label: &str) -> Result<String, String> {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        return Err(format!("{label} is required."));
    }
    if trimmed.chars().count() > MAX_FACTORY_FIELD_CHARS {
        return Err(format!(
            "{label} is too long. Max size is {MAX_FACTORY_FIELD_CHARS} chars."
        ));
    }
    Ok(trimmed.to_string())
}

fn normalize_optional_factory_text(value: &str) -> Option<String> {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        return None;
    }
    Some(truncate_chars(trimmed, MAX_FACTORY_FIELD_CHARS))
}

fn normalize_factory_list(values: Vec<String>) -> Vec<String> {
    let mut seen = HashSet::new();
    values
        .into_iter()
        .flat_map(|value| {
            value
                .lines()
                .map(str::trim)
                .filter(|line| !line.is_empty())
                .map(|line| truncate_chars(line, MAX_FACTORY_LIST_ITEM_CHARS))
                .collect::<Vec<_>>()
        })
        .filter(|value| seen.insert(value.clone()))
        .take(MAX_FACTORY_LIST_ITEMS)
        .collect()
}

fn normalize_owner_project(value: &str) -> String {
    sanitize_slug(value.trim(), "agent-platform")
}

fn normalize_proposal_target_path(value: &str, owner_project: &str, file_name: &str) -> String {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        return format!("{owner_project}/configs/agents/{file_name}");
    }
    let sanitized = trimmed
        .split('/')
        .filter(|part| !part.trim().is_empty() && *part != "." && *part != "..")
        .map(|part| sanitize_file_name(part))
        .filter(|part| !part.is_empty())
        .collect::<Vec<_>>();
    if sanitized.is_empty() {
        format!("{owner_project}/configs/agents/{file_name}")
    } else {
        sanitized.join("/")
    }
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
