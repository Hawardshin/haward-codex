fn normalize_string_list(values: Vec<String>) -> Vec<String> {
    values
        .into_iter()
        .map(|value| value.trim().to_string())
        .filter(|value| !value.is_empty())
        .take(12)
        .collect()
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
