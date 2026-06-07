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

    // GUI 앱은 로그인 셸 PATH를 물려받지 않는 경우가 많아 터미널과 앱의 CLI 탐지 결과가 달라진다.
    for base in command_search_paths() {
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

    resolve_command_from_login_shell(command)
        .filter(|path| path.file_name().and_then(|name| name.to_str()) == Some(command))
        .filter(is_executable_file)
}

fn command_search_paths() -> Vec<PathBuf> {
    let mut paths = Vec::new();
    let mut seen = HashSet::new();
    if let Some(path_var) = env::var_os("PATH") {
        for path in env::split_paths(&path_var) {
            push_unique_path(&mut paths, &mut seen, path);
        }
    }

    let Some(home) = env::var_os("HOME").map(PathBuf::from) else {
        push_common_system_command_paths(&mut paths, &mut seen);
        return paths;
    };

    for relative in [
        ".local/bin",
        ".npm-global/bin",
        ".bun/bin",
        ".deno/bin",
        ".cargo/bin",
        ".codex/bin",
        "Library/pnpm",
    ] {
        push_unique_path(&mut paths, &mut seen, home.join(relative));
    }

    let nvm_versions = home.join(".nvm/versions/node");
    if let Ok(entries) = fs::read_dir(&nvm_versions) {
        let mut node_bins: Vec<PathBuf> = entries
            .flatten()
            .map(|entry| entry.path().join("bin"))
            .filter(|path| path.is_dir())
            .collect();
        node_bins.sort();
        node_bins.reverse();
        for path in node_bins {
            push_unique_path(&mut paths, &mut seen, path);
        }
    }

    push_common_system_command_paths(&mut paths, &mut seen);
    paths
}

fn push_common_system_command_paths(paths: &mut Vec<PathBuf>, seen: &mut HashSet<String>) {
    for path in [
        "/opt/homebrew/bin",
        "/opt/homebrew/sbin",
        "/usr/local/bin",
        "/usr/bin",
        "/bin",
        "/usr/sbin",
        "/sbin",
    ] {
        push_unique_path(paths, seen, PathBuf::from(path));
    }
}

fn push_unique_path(paths: &mut Vec<PathBuf>, seen: &mut HashSet<String>, path: PathBuf) {
    let key = path.to_string_lossy().to_string();
    if seen.insert(key) {
        paths.push(path);
    }
}

fn resolve_command_from_login_shell(command: &str) -> Option<PathBuf> {
    if command.trim().is_empty()
        || command.contains('/')
        || command.contains('\\')
        || command.chars().any(char::is_whitespace)
    {
        return None;
    }
    let shell = if Path::new("/bin/zsh").exists() {
        "/bin/zsh"
    } else if Path::new("/bin/bash").exists() {
        "/bin/bash"
    } else {
        "/bin/sh"
    };
    let lookup = format!("command -v {}", shell_quote(command));
    let output = Command::new(shell)
        .args(["-lc", &lookup])
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::null())
        .output()
        .ok()?;
    if !output.status.success() {
        return None;
    }
    let stdout = String::from_utf8_lossy(&output.stdout);
    let path = stdout.lines().map(str::trim).find(|line| !line.is_empty())?;
    Some(PathBuf::from(path))
}

fn shell_quote(value: &str) -> String {
    format!("'{}'", value.replace('\'', "'\\''"))
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
