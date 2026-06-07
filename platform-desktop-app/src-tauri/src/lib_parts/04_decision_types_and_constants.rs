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

struct NativeOsCommandPlan {
    method: String,
    command_path: PathBuf,
    args: Vec<String>,
}

struct NativePipeExecution {
    producer_command: String,
    producer_args: Vec<String>,
    producer_path: PathBuf,
    consumer_command: String,
    consumer_args: Vec<String>,
    consumer_path: PathBuf,
    working_dir: PathBuf,
    timeout: Duration,
    timeout_ms: u64,
    max_output_bytes: usize,
}

struct NativePipeWaitResult {
    producer_exit_code: Option<i32>,
    consumer_exit_code: Option<i32>,
    timed_out: bool,
    error: Option<String>,
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
const DEFAULT_SUBAGENT_FANOUT_SESSIONS: usize = 2;
const MAX_SUBAGENT_FANOUT_SESSIONS: usize = 3;
const SUBAGENT_FANOUT_MERGE_GATE: &str = "subagent_manual_merge_gate";
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
const PROVIDER_CREDENTIALS_SCHEMA_VERSION: &str = "provider-credentials.v2";
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
const MAX_RUNTIME_PROMPT_CHARS: usize = 4_000;
const NATIVE_PIPE_PROBE_TIMEOUT_MS: u64 = 5_000;
const MAX_NATIVE_PIPE_PROBE_TIMEOUT_MS: u64 = 30_000;
const MAX_NATIVE_PIPE_ARGS: usize = 32;
const MAX_NATIVE_PIPE_ARG_CHARS: usize = 2_000;
const NATIVE_OS_ACTION_TIMEOUT_MS: u64 = 5_000;
const MAX_NATIVE_OS_ACTION_OUTPUT_BYTES: usize = 8_000;
const OPENAI_BASE_URL: &str = "https://api.openai.com/v1";
const ANTHROPIC_BASE_URL: &str = "https://api.anthropic.com";
const GEMINI_BASE_URL: &str = "https://generativelanguage.googleapis.com";
const MAX_PROVIDER_TASK_OUTPUT_BYTES: usize = 100_000;
const DEFAULT_PROVIDER_TASK_OUTPUT_TOKENS: u64 = 2_048;
const MAX_PROVIDER_TASK_OUTPUT_TOKENS: u64 = 12_000;
const MIN_PROVIDER_TASK_OUTPUT_TOKENS: u64 = 256;
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
        caution: "로컬의 Ollama HTTP 런타임(127.0.0.1:11434)에서 동작합니다. API 키를 저장하지 않습니다. 사용 전 Ollama 설치와 모델 pull이 필요합니다.",
        requires_subscription_verification: false,
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
        caution: "OpenAI 공식 API key 페이지에서 대상 계정으로 로그인 후 프로젝트 키를 발급받아 저장하세요. ChatGPT 웹 세션 쿠키는 저장하지 않습니다.",
        requires_subscription_verification: true,
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
        caution: "개인/비즈니스용 Claude API 키만 사용하세요. 웹 로그인 토큰이나 소비자 OAuth 토큰은 저장되지 않습니다.",
        requires_subscription_verification: true,
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
        caution: "Google AI Studio API key 페이지에서 대상 Google 계정으로 로그인 후 제한된 Gemini 키를 발급받아 저장하세요. Vertex AI OAuth/ADC는 별도 운영 흐름입니다.",
        requires_subscription_verification: true,
    },
];
