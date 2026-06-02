use serde::Serialize;
use serde_json::{json, Value};
use std::collections::HashMap;
use std::env;
use std::fs;
use std::io::{Read, Write};
use std::path::{Component, Path, PathBuf};
use std::process::{Child, ChildStdin, Command, Stdio};
use std::sync::{mpsc, Arc, Mutex};
use std::thread;
use std::time::{Duration, Instant, SystemTime, UNIX_EPOCH};
use tauri::State;

#[derive(Serialize)]
struct HealthStatus {
    status: &'static str,
    shell: &'static str,
    ui_source: &'static str,
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
    status: String,
    exit_code: Option<i32>,
    finished: bool,
    defer_message_sent: bool,
    auto_defer_questions: bool,
    auto_defer_triggered: bool,
    decision_inbox_items: usize,
    deferred_prompt_keys: Vec<String>,
    decision_capture_error: Option<String>,
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
struct WorkspaceTextFile {
    relative_path: String,
    content: String,
    size_bytes: usize,
    max_size_bytes: usize,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
struct WorkspaceWriteReport {
    relative_path: String,
    size_bytes: usize,
    backup_path: String,
    status: String,
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

const MAX_HEALTH_OUTPUT_BYTES: usize = 20_000;
const HEALTH_TIMEOUT_MS: u64 = 2_500;
const MAX_SESSION_OUTPUT_BYTES: usize = 100_000;
const MAX_DECISION_SCAN_BYTES: usize = 32_000;
const SESSION_TIMEOUT_MS: u64 = 300_000;
const MAX_SESSION_INPUT_BYTES: usize = 20_000;
const MAX_WORKSPACE_FILE_BYTES: usize = 1_000_000;
const MAX_DECISION_ANSWER_BYTES: usize = 20_000;
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
        intent: "Initialize implementation, review, research, and fallback lanes for platform changes.",
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
fn list_cli_adapters() -> Vec<CliAdapterStatus> {
    ADAPTERS.iter().map(adapter_status).collect()
}

#[tauri::command]
fn run_cli_adapter_health(adapter_id: String) -> Result<CliRunReport, String> {
    let adapter = find_adapter(&adapter_id).ok_or_else(|| format!("Unknown adapter id: {adapter_id}"))?;
    Ok(run_adapter_health(adapter))
}

#[tauri::command]
fn run_all_cli_adapter_health() -> Vec<CliRunReport> {
    ADAPTERS.iter().map(run_adapter_health).collect()
}

#[tauri::command]
fn list_cli_task_pipeline_presets() -> Vec<CliTaskPipelinePresetReport> {
    PIPELINE_PRESETS.iter().map(pipeline_preset_report).collect()
}

#[tauri::command]
fn start_cli_adapter_session(
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

    let adapter = find_adapter(&adapter_id).ok_or_else(|| format!("Unknown adapter id: {adapter_id}"))?;
    let working_dir = resolve_workspace_dir(working_dir.as_deref())?;
    let (session_id, mut session, report) = create_cli_session(
        adapter,
        &prompt,
        working_dir,
        auto_defer_questions.unwrap_or(true),
    )?;
    match store.sessions.lock() {
        Ok(mut sessions) => {
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

    let preset = find_pipeline_preset(&task_kind).ok_or_else(|| format!("Unknown task pipe kind: {task_kind}"))?;
    let resolved_working_dir = resolve_workspace_dir(working_dir.as_deref())?;
    let pipeline_id = new_session_id(preset.task_kind);
    let mut lane_reports = Vec::new();
    let mut pipe_reports = Vec::new();
    let mut pending_sessions: Vec<(String, CliSession)> = Vec::new();

    for lane in preset.lanes {
        let adapter = find_adapter(lane.adapter_id).ok_or_else(|| format!("Unknown adapter id in pipe preset: {}", lane.adapter_id))?;
        if resolve_command(adapter.command).is_none() {
            let status = "capability_missing".to_string();
            lane_reports.push(CliTaskPipelineLaneReport {
                lane_id: lane.lane_id.to_string(),
                adapter_id: lane.adapter_id.to_string(),
                role: lane.role.to_string(),
                status: status.clone(),
                session: None,
                error: Some(format!("Command '{}' was not found on PATH.", adapter.command)),
            });
            append_pipe_edges(&mut pipe_reports, &pipeline_id, lane.lane_id, preset.merge_gate, &status);
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
            append_pipe_edges(&mut pipe_reports, &pipeline_id, lane.lane_id, preset.merge_gate, &status);
            continue;
        }
        match create_cli_session(
            adapter,
            &lane_prompt,
            resolved_working_dir.clone(),
            auto_defer_questions.unwrap_or(true),
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
                append_pipe_edges(&mut pipe_reports, &pipeline_id, lane.lane_id, preset.merge_gate, &status);
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
                append_pipe_edges(&mut pipe_reports, &pipeline_id, lane.lane_id, preset.merge_gate, &status);
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
    adapter: &'static AdapterDefinition,
    prompt: &str,
    working_dir: PathBuf,
    auto_defer_questions: bool,
) -> Result<(String, CliSession, CliSessionReport), String> {
    let path = resolve_command(adapter.command)
        .ok_or_else(|| format!("Command '{}' was not found on PATH.", adapter.command))?;
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

    let session_id = new_session_id(adapter.adapter_id);
    let mut session = CliSession {
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
        status: "running".to_string(),
        exit_code: None,
        finished: false,
        defer_message_sent: false,
        auto_defer_questions,
        auto_defer_triggered: false,
        decision_inbox_items: 0,
        deferred_prompt_keys: Vec::new(),
        decision_capture_error: None,
    };
    let report = poll_session_locked(&session_id, &mut session);
    Ok((session_id, session, report))
}

#[tauri::command]
fn poll_cli_adapter_session(store: State<'_, SessionStore>, session_id: String) -> Result<CliSessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown CLI session id: {session_id}"))?;
    Ok(poll_session_locked(&session_id, session))
}

#[tauri::command]
fn list_cli_adapter_sessions(store: State<'_, SessionStore>) -> Result<Vec<CliSessionReport>, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    Ok(sessions
        .iter_mut()
        .map(|(session_id, session)| poll_session_locked(session_id, session))
        .collect())
}

#[tauri::command]
fn write_cli_adapter_stdin(
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
    Ok(poll_session_locked(&session_id, session))
}

#[tauri::command]
fn send_cli_adapter_defer_message(
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
    Ok(poll_session_locked(&session_id, session))
}

#[tauri::command]
fn defer_all_cli_adapter_questions(store: State<'_, SessionStore>) -> Result<Vec<CliSessionReport>, String> {
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
        reports.push(poll_session_locked(session_id, session));
    }
    Ok(reports)
}

#[tauri::command]
fn cancel_cli_adapter_session(store: State<'_, SessionStore>, session_id: String) -> Result<CliSessionReport, String> {
    let mut sessions = store
        .sessions
        .lock()
        .map_err(|_| "Failed to lock CLI session store.".to_string())?;
    let session = sessions
        .get_mut(&session_id)
        .ok_or_else(|| format!("Unknown CLI session id: {session_id}"))?;
    if !session.finished {
        let _ = session.child.kill();
        let status = session
            .child
            .wait()
            .ok()
            .and_then(|exit_status| exit_status.code());
        session.exit_code = status;
        session.status = "canceled".to_string();
        session.finished = true;
        session.stdin.take();
    }
    Ok(poll_session_locked(&session_id, session))
}

#[tauri::command]
fn read_workspace_text_file(relative_path: String) -> Result<WorkspaceTextFile, String> {
    let (path, normalized) = resolve_workspace_file(&relative_path, true)?;
    let metadata = path
        .metadata()
        .map_err(|error| format!("Failed to read file metadata: {error}"))?;
    if metadata.len() as usize > MAX_WORKSPACE_FILE_BYTES {
        return Err(format!(
            "File is too large for the desktop editor. Max size is {MAX_WORKSPACE_FILE_BYTES} bytes."
        ));
    }
    let content = fs::read_to_string(&path).map_err(|error| format!("Failed to read text file: {error}"))?;
    Ok(WorkspaceTextFile {
        relative_path: normalized,
        size_bytes: content.len(),
        content,
        max_size_bytes: MAX_WORKSPACE_FILE_BYTES,
    })
}

#[tauri::command]
fn write_workspace_text_file(relative_path: String, content: String) -> Result<WorkspaceWriteReport, String> {
    if content.len() > MAX_WORKSPACE_FILE_BYTES {
        return Err(format!(
            "Content is too large for the desktop editor. Max size is {MAX_WORKSPACE_FILE_BYTES} bytes."
        ));
    }
    let root = workspace_root()?;
    let (path, normalized) = resolve_workspace_file(&relative_path, true)?;
    let original = fs::read(&path).map_err(|error| format!("Failed to read original file for backup: {error}"))?;
    let backup_path = source_backup_path(&root, &normalized)?;
    if let Some(parent) = backup_path.parent() {
        fs::create_dir_all(parent).map_err(|error| format!("Failed to create backup directory: {error}"))?;
    }
    fs::write(&backup_path, original).map_err(|error| format!("Failed to write backup file: {error}"))?;
    fs::write(&path, content.as_bytes()).map_err(|error| format!("Failed to write workspace file: {error}"))?;
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
            resume_detail: "The decision was answered, but it is not linked to an active CLI session.".to_string(),
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
            resume_detail: format!("The decision was answered, but CLI session {session_id} is not currently loaded."),
        });
    };
    if session.finished {
        let report = poll_session_locked(&session_id, session);
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: Some(report),
            resume_status: "session_finished".to_string(),
            resume_detail: format!("The decision was answered, but CLI session {session_id} has already finished."),
        });
    }
    let Some(stdin) = session.stdin.as_mut() else {
        let report = poll_session_locked(&session_id, session);
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: Some(report),
            resume_status: "stdin_unavailable".to_string(),
            resume_detail: format!("The decision was answered, but CLI session {session_id} cannot accept stdin."),
        });
    };

    if let Err(error) = stdin
        .write_all(answer_text.as_bytes())
        .and_then(|_| stdin.write_all(b"\n"))
        .and_then(|_| stdin.flush())
    {
        let report = poll_session_locked(&session_id, session);
        return Ok(DecisionResumeReport {
            inbox: update.report,
            session: Some(report),
            resume_status: "resume_failed".to_string(),
            resume_detail: format!("The decision was answered, but writing to CLI session {session_id} failed: {error}"),
        });
    }

    session.defer_message_sent = false;
    let report = poll_session_locked(&session_id, session);
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
            list_cli_adapters,
            run_cli_adapter_health,
            run_all_cli_adapter_health,
            list_cli_task_pipeline_presets,
            start_cli_adapter_session,
            start_cli_task_pipeline,
            poll_cli_adapter_session,
            list_cli_adapter_sessions,
            write_cli_adapter_stdin,
            send_cli_adapter_defer_message,
            defer_all_cli_adapter_questions,
            cancel_cli_adapter_session,
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
    ADAPTERS.iter().find(|adapter| adapter.adapter_id == adapter_id)
}

fn find_pipeline_preset(task_kind: &str) -> Option<&'static PipelineTaskPreset> {
    PIPELINE_PRESETS.iter().find(|preset| preset.task_kind == task_kind)
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

fn pipeline_lane_prompt(preset: &PipelineTaskPreset, lane: &PipelineLaneDefinition, prompt: &str) -> String {
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
            .and_then(|output| first_non_empty_line(&output.stdout).or_else(|| first_non_empty_line(&output.stderr)));

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

    thread::spawn(move || {
        loop {
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
                    let _ = tx.send((None, false));
                    break;
                }
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

fn poll_session_locked(session_id: &str, session: &mut CliSession) -> CliSessionReport {
    if !session.finished {
        match session.child.try_wait() {
            Ok(Some(status)) => {
                session.exit_code = status.code();
                session.status = if status.success() {
                    "exited".to_string()
                } else {
                    "failed".to_string()
                };
                session.finished = true;
                session.stdin.take();
            }
            Ok(None) => {
                if session.started.elapsed() >= session.timeout {
                    let _ = session.child.kill();
                    session.exit_code = session
                        .child
                        .wait()
                        .ok()
                        .and_then(|exit_status| exit_status.code());
                    session.status = "timed_out".to_string();
                    session.finished = true;
                    session.stdin.take();
                }
            }
            Err(_) => {
                let _ = session.child.kill();
                session.status = "error".to_string();
                session.finished = true;
                session.stdin.take();
            }
        }
    }

    if !session.finished {
        auto_defer_session_questions_locked(session_id, session);
    }
    join_finished_reader(&mut session.stdout_handle);
    join_finished_reader(&mut session.stderr_handle);
    session_report(session_id, session)
}

fn join_finished_reader(handle: &mut Option<thread::JoinHandle<()>>) {
    let should_join = handle.as_ref().map(|value| value.is_finished()).unwrap_or(false);
    if should_join {
        if let Some(value) = handle.take() {
            let _ = value.join();
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
    let decision_prompts = detect_decision_prompts_for(&session.adapter_id, &session.label, &decision_output);
    let pending_decision_prompts = decision_prompts
        .iter()
        .filter(|prompt| {
            let key = decision_prompt_key(&prompt.question);
            !session.deferred_prompt_keys.iter().any(|existing| existing == &key)
        })
        .count();
    let status = if !session.finished && session.defer_message_sent {
        "defer_message_sent".to_string()
    } else {
        session.status.clone()
    };

    CliSessionReport {
        session_id: session_id.to_string(),
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

fn append_session_output(output: &mut CliSessionOutput, is_stdout: bool, text: &str, max_output_bytes: usize) {
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

fn detect_decision_prompts_for(adapter_id: &str, label: &str, output: &str) -> Vec<CliDecisionPrompt> {
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

fn defer_session_questions_locked(session_id: &str, session: &mut CliSession, mode: &str) -> Result<usize, String> {
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
        if !session.deferred_prompt_keys.iter().any(|existing| existing == &key) {
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
            !session.deferred_prompt_keys.iter().any(|existing| existing == &key)
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
    let inbox_path = root.join("_ops").join("coordination").join("human-decision-inbox.json");
    let canonical_inbox = inbox_path
        .canonicalize()
        .map_err(|error| format!("Failed to resolve human decision inbox: {error}"))?;
    ensure_workspace_path(&root, &canonical_inbox)?;

    let content =
        fs::read_to_string(&canonical_inbox).map_err(|error| format!("Failed to read human decision inbox: {error}"))?;
    let mut inbox: Value =
        serde_json::from_str(&content).map_err(|error| format!("Failed to parse human decision inbox: {error}"))?;
    let existing_ids: Vec<String> = inbox
        .get("decisions")
        .and_then(Value::as_array)
        .ok_or_else(|| "Human decision inbox is missing decisions array.".to_string())?
        .iter()
        .filter_map(|item| item.get("id").and_then(Value::as_str).map(ToOwned::to_owned))
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

    let formatted =
        serde_json::to_string_pretty(&inbox).map_err(|error| format!("Failed to serialize human decision inbox: {error}"))?;
    fs::write(&canonical_inbox, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write human decision inbox: {error}"))?;
    Ok(appended_count)
}

fn decision_prompt_key(question: &str) -> String {
    let dashed: String = question
        .trim()
        .to_lowercase()
        .chars()
        .map(|character| if character.is_ascii_alphanumeric() { character } else { '-' })
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
    let content =
        fs::read_to_string(&inbox_path).map_err(|error| format!("Failed to read human decision inbox: {error}"))?;
    let inbox: Value =
        serde_json::from_str(&content).map_err(|error| format!("Failed to parse human decision inbox: {error}"))?;
    Ok((inbox_path, inbox))
}

fn write_human_decision_inbox_value(inbox_path: &Path, inbox: &Value) -> Result<(), String> {
    let formatted =
        serde_json::to_string_pretty(inbox).map_err(|error| format!("Failed to serialize human decision inbox: {error}"))?;
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
    let inbox_path = root.join("_ops").join("coordination").join("human-decision-inbox.json");
    let canonical_inbox = inbox_path
        .canonicalize()
        .map_err(|error| format!("Failed to resolve human decision inbox: {error}"))?;
    ensure_workspace_path(root, &canonical_inbox)?;
    Ok(canonical_inbox)
}

fn human_decision_report(inbox: &Value, updated_id: Option<String>) -> Result<HumanDecisionInboxReport, String> {
    let decisions = inbox
        .get("decisions")
        .and_then(Value::as_array)
        .ok_or_else(|| "Human decision inbox is missing decisions array.".to_string())?;
    let items: Vec<HumanDecisionItem> = decisions.iter().map(human_decision_item_from_value).collect();
    let open_count = items
        .iter()
        .filter(|item| matches!(item.status.as_str(), "open" | "deferred" | "resuming"))
        .count();
    let answered_count = items.iter().filter(|item| item.status == "answered").count();
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
        answer_type: answer.and_then(|item| item.get("type")).and_then(Value::as_str).map(ToOwned::to_owned),
        answer_text: answer.and_then(|item| item.get("text")).and_then(Value::as_str).map(ToOwned::to_owned),
        answered_at: value
            .get("answered_at")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned)
            .or_else(|| answer.and_then(|item| item.get("answered_at")).and_then(Value::as_str).map(ToOwned::to_owned)),
        blocked_work_count: value.get("blocked_work").and_then(Value::as_array).map(Vec::len).unwrap_or(0),
        unblocked_work_count: value.get("unblocked_work").and_then(Value::as_array).map(Vec::len).unwrap_or(0),
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

fn resolve_workspace_dir(relative_or_absolute: Option<&str>) -> Result<PathBuf, String> {
    let root = workspace_root()?;
    let candidate = match relative_or_absolute.map(str::trim).filter(|value| !value.is_empty()) {
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

fn resolve_workspace_file(relative_path: &str, existing_required: bool) -> Result<(PathBuf, String), String> {
    let root = workspace_root()?;
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
                    return Err("Workspace path points to a protected local-only directory.".to_string());
                }
                normalized.push(text.to_string());
            }
            _ => {
                return Err("Workspace path must not contain '.', '..', root, or prefix components.".to_string());
            }
        }
    }
    if normalized.is_empty() {
        return Err("Workspace path is empty.".to_string());
    }
    Ok(normalized.join("/"))
}

fn workspace_root() -> Result<PathBuf, String> {
    if let Some(value) = env::var_os("AGENT_WORKSPACE_ROOT") {
        let root = PathBuf::from(value)
            .canonicalize()
            .map_err(|error| format!("Failed to resolve AGENT_WORKSPACE_ROOT: {error}"))?;
        ensure_not_private_root(&root)?;
        return Ok(root);
    }

    let cwd = env::current_dir().map_err(|error| format!("Failed to read current directory: {error}"))?;
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
        .join(format!("{millis}-{}.bak", sanitize_file_name(relative_path))))
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
