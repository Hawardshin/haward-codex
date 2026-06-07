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
