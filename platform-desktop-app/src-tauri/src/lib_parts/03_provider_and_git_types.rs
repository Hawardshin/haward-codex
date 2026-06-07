#[derive(Clone, Deserialize, Serialize)]
#[serde(default, rename_all = "camelCase")]
struct ProviderCredentialRecord {
    provider_id: String,
    auth_method: String,
    account_hint: String,
    secret: String,
    created_at: String,
    updated_at: String,
    subscription_state: String,
    subscription_checked_at: String,
    subscription_message: String,
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
    requires_subscription_verification: bool,
    subscription_state: String,
    subscription_checked_at: String,
    subscription_message: String,
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
    model_route_id: String,
    constraint_profile_id: String,
    connector_policy_id: String,
    max_input_tokens: Option<u64>,
    max_output_tokens: Option<u64>,
    budget_usd: Option<f64>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct ProviderAgentTaskReport {
    task_run_id: String,
    provider_id: String,
    provider_label: String,
    model: String,
    model_route_id: String,
    constraint_profile_id: String,
    connector_policy_id: String,
    max_input_tokens: Option<u64>,
    max_output_tokens: u64,
    budget_usd: Option<f64>,
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

impl Default for DesktopPromptCustomization {
    fn default() -> Self {
        Self {
            session_prompts: HashMap::new(),
            task_pipe_prompts: HashMap::new(),
        }
    }
}

impl Default for DesktopRuntimeCustomization {
    fn default() -> Self {
        Self {
            provider_overrides: default_provider_overrides(),
            prompts: DesktopPromptCustomization::default(),
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
            subscription_state: "not_configured".to_string(),
            subscription_checked_at: String::new(),
            subscription_message: String::new(),
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
            model_route_id: "manual".to_string(),
            constraint_profile_id: "developer".to_string(),
            connector_policy_id: "provider-api".to_string(),
            max_input_tokens: None,
            max_output_tokens: None,
            budget_usd: None,
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
