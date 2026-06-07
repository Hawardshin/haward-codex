use os_pipe::pipe;
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

use features::app_update::PendingAppUpdate;
use features::service_readiness::{service_readiness_report, ServiceReadinessReport};


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
    requires_subscription_verification: bool,
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
struct RuntimeTerminalSetupCheckReport {
    status: String,
    command: String,
    command_source: String,
    resolved_path: Option<String>,
    working_dir: String,
    error: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct CliAdapterPtyLaunchReport {
    adapter_id: &'static str,
    label: &'static str,
    command: &'static str,
    resolved_path: String,
    startup_input: String,
    terminal: NativePtySessionReport,
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

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct NativePipeProbeRequest {
    producer_command: String,
    producer_args: Option<Vec<String>>,
    consumer_command: String,
    consumer_args: Option<Vec<String>>,
    working_dir: Option<String>,
    timeout_ms: Option<u64>,
    max_output_bytes: Option<usize>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct NativePipeProbeReport {
    status: String,
    pipe_kind: String,
    producer_command: String,
    producer_args: Vec<String>,
    producer_resolved_path: String,
    producer_exit_code: Option<i32>,
    producer_stderr: String,
    consumer_command: String,
    consumer_args: Vec<String>,
    consumer_resolved_path: String,
    consumer_exit_code: Option<i32>,
    consumer_stdout: String,
    consumer_stderr: String,
    working_dir: String,
    duration_ms: u128,
    timeout_ms: u64,
    timed_out: bool,
    bounded: bool,
    max_output_bytes: usize,
    output_truncated: bool,
    error: Option<String>,
}
