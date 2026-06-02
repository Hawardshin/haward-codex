use serde::Serialize;
use std::env;
use std::io::Read;
use std::path::PathBuf;
use std::process::{Command, Stdio};
use std::sync::mpsc;
use std::thread;
use std::time::{Duration, Instant};

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

#[derive(Serialize)]
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

struct ProcessOutput {
    status: String,
    exit_code: Option<i32>,
    stdout: String,
    stderr: String,
    duration_ms: u128,
}

const MAX_HEALTH_OUTPUT_BYTES: usize = 20_000;
const HEALTH_TIMEOUT_MS: u64 = 2_500;

static ADAPTERS: &[AdapterDefinition] = &[
    AdapterDefinition {
        adapter_id: "claude-code-cli",
        label: "Claude Code CLI",
        command: "claude",
        version_args: &["--version"],
    },
    AdapterDefinition {
        adapter_id: "gemini-cli",
        label: "Gemini CLI",
        command: "gemini",
        version_args: &["--version"],
    },
    AdapterDefinition {
        adapter_id: "codex-cli",
        label: "Codex CLI",
        command: "codex",
        version_args: &["--version"],
    },
    AdapterDefinition {
        adapter_id: "opencode-cli",
        label: "OpenCode",
        command: "opencode",
        version_args: &["--version"],
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

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            app_health,
            list_cli_adapters,
            run_cli_adapter_health,
            run_all_cli_adapter_health
        ])
        .run(tauri::generate_context!())
        .expect("error while running Agent Workspace Platform desktop shell");
}

fn find_adapter(adapter_id: &str) -> Option<&'static AdapterDefinition> {
    ADAPTERS.iter().find(|adapter| adapter.adapter_id == adapter_id)
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

    let stdout = child
        .stdout
        .take()
        .ok_or_else(|| "Failed to capture stdout.".to_string())?;
    let stderr = child
        .stderr
        .take()
        .ok_or_else(|| "Failed to capture stderr.".to_string())?;

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
    output
        .lines()
        .map(str::trim)
        .filter(|line| {
            let lower = line.to_lowercase();
            line.ends_with('?')
                || lower.contains("do you want")
                || lower.contains("continue?")
                || lower.contains("permission")
                || lower.contains("approve")
        })
        .take(4)
        .map(|line| CliDecisionPrompt {
            question: line.to_string(),
            lane: adapter.adapter_id.to_string(),
            impact: "This CLI lane needs a user decision before the platform should continue source-affecting work.".to_string(),
            defer_message: "I will pause this lane and collect the decision for the user to review later.".to_string(),
            resume_action: format!("Resume {label} after the decision inbox item is answered.", label = adapter.label),
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
