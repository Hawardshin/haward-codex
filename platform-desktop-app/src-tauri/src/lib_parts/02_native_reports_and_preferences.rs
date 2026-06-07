#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct NativeOsActionRequest {
    action: String,
    target_path: Option<String>,
    working_dir: Option<String>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct NativeOsActionReport {
    status: String,
    action: String,
    operating_system: String,
    method: String,
    target_path: String,
    working_dir: String,
    command: Option<String>,
    args: Vec<String>,
    exit_code: Option<i32>,
    stdout: String,
    stderr: String,
    duration_ms: u128,
    bounded: bool,
    error: Option<String>,
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

#[derive(Deserialize)]
#[serde(default, rename_all = "camelCase")]
struct SubagentToolPlanInput {
    goal: String,
    context: String,
    working_dir: Option<String>,
    manager_agent: String,
    preferred_pattern: String,
    requested_agents: Vec<String>,
    required_capabilities: Vec<String>,
    allowed_tools: Vec<String>,
    blocked_tools: Vec<String>,
    max_subagents: usize,
}

impl Default for SubagentToolPlanInput {
    fn default() -> Self {
        Self {
            goal: String::new(),
            context: String::new(),
            working_dir: None,
            manager_agent: "agent-orchestrator-agent".to_string(),
            preferred_pattern: "supervisor_router".to_string(),
            requested_agents: Vec::new(),
            required_capabilities: Vec::new(),
            allowed_tools: Vec::new(),
            blocked_tools: Vec::new(),
            max_subagents: 5,
        }
    }
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
struct SubagentToolSummary {
    tool_name: String,
    agent_name: String,
    allowed_tools: Vec<String>,
    output_contract: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct SubagentToolPlanReport {
    task_run_id: String,
    request_id: String,
    status: String,
    plan_status: String,
    command: String,
    exit_code: Option<i32>,
    duration_ms: u128,
    working_dir: String,
    subagent_tool_count: usize,
    subagent_tools: Vec<SubagentToolSummary>,
    output: String,
    stderr: String,
    output_truncated: bool,
    task_record_path: Option<String>,
    stdout_log_path: Option<String>,
    stderr_log_path: Option<String>,
    persistence_error: Option<String>,
}

#[derive(Deserialize)]
#[serde(default, rename_all = "camelCase")]
struct SubagentToolExecutionInput {
    plan_task_run_id: String,
    tool_name: String,
    adapter_id: String,
    prompt: String,
    working_dir: Option<String>,
    auto_defer_questions: Option<bool>,
}

impl Default for SubagentToolExecutionInput {
    fn default() -> Self {
        Self {
            plan_task_run_id: String::new(),
            tool_name: String::new(),
            adapter_id: String::new(),
            prompt: String::new(),
            working_dir: None,
            auto_defer_questions: Some(true),
        }
    }
}

#[derive(Deserialize)]
#[serde(default, rename_all = "camelCase")]
struct SubagentToolFanoutInput {
    plan_task_run_id: String,
    tool_names: Vec<String>,
    adapter_id: String,
    prompt: String,
    working_dir: Option<String>,
    auto_defer_questions: Option<bool>,
    max_sessions: Option<usize>,
}

impl Default for SubagentToolFanoutInput {
    fn default() -> Self {
        Self {
            plan_task_run_id: String::new(),
            tool_names: Vec::new(),
            adapter_id: String::new(),
            prompt: String::new(),
            working_dir: None,
            auto_defer_questions: Some(true),
            max_sessions: Some(DEFAULT_SUBAGENT_FANOUT_SESSIONS),
        }
    }
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct SubagentToolFanoutReport {
    pipeline_id: String,
    plan_task_run_id: String,
    task_kind: String,
    label: String,
    status: String,
    intent: String,
    adapter_id: String,
    working_dir: String,
    prompt_bytes: usize,
    selected_tool_count: usize,
    started_sessions: usize,
    missing_lanes: usize,
    skipped_tools: Vec<String>,
    process_cap: usize,
    merge_gate: String,
    bounded: bool,
    max_output_bytes: usize,
    lanes: Vec<CliTaskPipelineLaneReport>,
    pipes: Vec<CliPipeEdgeReport>,
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
struct DesktopPromptCustomization {
    session_prompts: HashMap<String, String>,
    task_pipe_prompts: HashMap<String, String>,
}

#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct DesktopRuntimeCustomization {
    provider_overrides: Vec<DesktopProviderOverride>,
    prompts: DesktopPromptCustomization,
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
