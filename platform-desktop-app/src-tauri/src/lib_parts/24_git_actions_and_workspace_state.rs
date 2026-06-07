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
