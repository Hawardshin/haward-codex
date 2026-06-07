fn git_remote_reports(git_path: &PathBuf, repository_root: &Path) -> Vec<DesktopGitRemoteReport> {
    let output = run_bounded_command_in_dir(
        git_path,
        &["remote", "-v"],
        repository_root,
        Duration::from_millis(2_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    let Some(output) = output.ok().filter(|value| value.status == "passed") else {
        return Vec::new();
    };
    let mut seen = HashSet::new();
    output
        .stdout
        .lines()
        .filter_map(|line| {
            let mut parts = line.split_whitespace();
            let name = parts.next()?.to_string();
            let url = parts.next().unwrap_or_default().to_string();
            let direction = parts
                .next()
                .unwrap_or_default()
                .trim_matches(|character| character == '(' || character == ')')
                .to_string();
            let key = format!("{name}:{direction}:{url}");
            if !seen.insert(key) {
                return None;
            }
            Some(DesktopGitRemoteReport {
                name,
                url: redact_sensitive_text(&redact_repository_url(&url)),
                direction,
            })
        })
        .take(12)
        .collect()
}

fn git_history_reports(
    git_path: &PathBuf,
    repository_root: &Path,
) -> Vec<DesktopGitHistoryCommitReport> {
    let count_arg = format!("-n{MAX_GIT_HISTORY_COMMITS}");
    let output = run_bounded_command_in_dir(
        git_path,
        &[
            "log",
            count_arg.as_str(),
            "--date=iso-strict",
            "--numstat",
            "--format=format:%H%x1f%h%x1f%s%x1f%an%x1f%ad",
        ],
        repository_root,
        Duration::from_millis(4_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    let Some(output) = output.ok().filter(|value| value.status == "passed") else {
        return Vec::new();
    };
    parse_git_history_reports(&redact_sensitive_text(&output.stdout))
}

fn parse_git_history_reports(output: &str) -> Vec<DesktopGitHistoryCommitReport> {
    let mut commits = Vec::new();
    let mut current: Option<DesktopGitHistoryCommitReport> = None;
    for line in output.lines() {
        if line.contains('\u{1f}') {
            if let Some(commit) = current.take() {
                commits.push(commit);
            }
            let mut parts = line.split('\u{1f}');
            let hash = parts.next().unwrap_or_default().to_string();
            let short_hash = parts.next().unwrap_or_default().to_string();
            let subject = parts.next().unwrap_or_default().to_string();
            let author = parts.next().unwrap_or_default().to_string();
            let authored_at = parts.next().unwrap_or_default().to_string();
            current = Some(DesktopGitHistoryCommitReport {
                hash,
                short_hash,
                subject: truncate_chars(subject.trim(), 180),
                author: truncate_chars(author.trim(), 80),
                authored_at: truncate_chars(authored_at.trim(), 80),
                files_changed: 0,
                additions: 0,
                deletions: 0,
                files: Vec::new(),
            });
            continue;
        }
        let Some(commit) = current.as_mut() else {
            continue;
        };
        let mut parts = line.split('\t');
        let additions = parts.next().unwrap_or_default();
        let deletions = parts.next().unwrap_or_default();
        if additions.is_empty() || deletions.is_empty() {
            continue;
        }
        let path = parts.next().unwrap_or_default();
        commit.files_changed += 1;
        let parsed_additions = additions.parse::<usize>().unwrap_or(0);
        let parsed_deletions = deletions.parse::<usize>().unwrap_or(0);
        commit.additions += parsed_additions;
        commit.deletions += parsed_deletions;
        if commit.files.len() < 12 {
            commit.files.push(DesktopGitHistoryFileReport {
                path: truncate_chars(redact_sensitive_text(path).trim(), 180),
                additions: parsed_additions,
                deletions: parsed_deletions,
            });
        }
    }
    if let Some(commit) = current {
        commits.push(commit);
    }
    commits.truncate(MAX_GIT_HISTORY_COMMITS);
    commits
}

fn git_stash_reports(git_path: &PathBuf, repository_root: &Path) -> Vec<DesktopGitStashReport> {
    let output = run_bounded_command_in_dir(
        git_path,
        &["stash", "list", "--format=%gd%x1f%gs"],
        repository_root,
        Duration::from_millis(3_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    let Some(output) = output.ok().filter(|value| value.status == "passed") else {
        return Vec::new();
    };
    output
        .stdout
        .lines()
        .take(MAX_GIT_STASHES)
        .filter_map(|line| {
            let mut parts = line.split('\u{1f}');
            let reference = parts.next()?.trim().to_string();
            if reference.is_empty() {
                return None;
            }
            let raw_message = parts.next().unwrap_or_default().trim();
            let (branch, message) = parse_git_stash_subject(raw_message);
            let files_changed = git_stash_file_count(git_path, repository_root, &reference);
            Some(DesktopGitStashReport {
                reference,
                branch,
                message,
                files_changed,
            })
        })
        .collect()
}

fn parse_git_stash_subject(raw_message: &str) -> (String, String) {
    let sanitized = truncate_chars(redact_sensitive_text(raw_message).trim(), 220);
    let prefix = "WIP on ";
    if let Some(rest) = sanitized.strip_prefix(prefix) {
        if let Some((branch, message)) = rest.split_once(": ") {
            return (branch.to_string(), message.to_string());
        }
    }
    (String::new(), sanitized)
}

fn git_stash_file_count(git_path: &PathBuf, repository_root: &Path, stash_ref: &str) -> usize {
    let output = run_bounded_command_in_dir(
        git_path,
        &["stash", "show", "--name-only", stash_ref],
        repository_root,
        Duration::from_millis(2_000),
        MAX_GIT_OPERATION_OUTPUT_BYTES,
    );
    output
        .ok()
        .filter(|value| value.status == "passed")
        .map(|value| {
            value
                .stdout
                .lines()
                .filter(|line| !line.trim().is_empty())
                .count()
        })
        .unwrap_or(0)
}

fn parse_git_status_files(
    status_text: &str,
    git_path: &PathBuf,
    repository_root: &Path,
) -> Vec<DesktopGitFileReport> {
    status_text
        .lines()
        .filter(|line| !line.starts_with("## "))
        .filter(|line| line.len() >= 3)
        .take(MAX_GIT_STATUS_FILES)
        .enumerate()
        .map(|(index, line)| {
            let status = line.chars().take(2).collect::<String>();
            let path_text = line.chars().skip(3).collect::<String>();
            let (path, original_path) = if let Some((left, right)) = path_text.split_once(" -> ") {
                (right.to_string(), Some(left.to_string()))
            } else {
                (path_text, None)
            };
            let staged = git_file_has_staged_change(&status);
            let unstaged = git_file_has_unstaged_change(&status);
            let untracked = status == "??";
            let conflicted = git_status_is_conflicted(&status);
            let diff_preview = if index < MAX_GIT_DIFF_PREVIEW_FILES {
                git_file_diff_preview(git_path, repository_root, &path, &status)
            } else {
                Vec::new()
            };
            let (additions, deletions) =
                git_file_change_counts(git_path, repository_root, &path, &status, &diff_preview);
            let change_kind = git_status_change_kind(&status);
            DesktopGitFileReport {
                status,
                path,
                original_path,
                change_kind,
                staged,
                unstaged,
                untracked,
                conflicted,
                additions,
                deletions,
                diff_preview,
            }
        })
        .collect()
}

fn git_status_change_kind(status: &str) -> String {
    if git_status_is_conflicted(status) {
        return "conflict".to_string();
    }
    if status == "??" {
        return "untracked".to_string();
    }
    if status.contains('R') {
        return "renamed".to_string();
    }
    if status.contains('D') {
        return "deleted".to_string();
    }
    if status.contains('A') {
        return "added".to_string();
    }
    if status.contains('M') {
        return "modified".to_string();
    }
    "changed".to_string()
}

fn git_file_diff_preview(
    git_path: &PathBuf,
    repository_root: &Path,
    relative_path: &str,
    status: &str,
) -> Vec<DesktopGitDiffLineReport> {
    if status == "??" {
        return git_untracked_file_preview(repository_root, relative_path);
    }

    let diff_args = [
        "diff",
        "--no-ext-diff",
        "--unified=3",
        "HEAD",
        "--",
        relative_path,
    ];
    let primary = run_bounded_command_in_dir(
        git_path,
        &diff_args,
        repository_root,
        Duration::from_millis(2_500),
        MAX_GIT_DIFF_PREVIEW_OUTPUT_BYTES,
    );
    let mut preview = primary
        .ok()
        .filter(|output| output.status == "passed")
        .map(|output| parse_git_diff_preview(&redact_sensitive_text(&output.stdout)))
        .unwrap_or_default();

    if preview.is_empty() && git_file_has_staged_change(status) {
        let cached_args = [
            "diff",
            "--cached",
            "--no-ext-diff",
            "--unified=3",
            "--",
            relative_path,
        ];
        preview = run_bounded_command_in_dir(
            git_path,
            &cached_args,
            repository_root,
            Duration::from_millis(2_500),
            MAX_GIT_DIFF_PREVIEW_OUTPUT_BYTES,
        )
        .ok()
        .filter(|output| output.status == "passed")
        .map(|output| parse_git_diff_preview(&redact_sensitive_text(&output.stdout)))
        .unwrap_or_default();
    }

    preview
}

fn git_file_change_counts(
    git_path: &PathBuf,
    repository_root: &Path,
    relative_path: &str,
    status: &str,
    preview: &[DesktopGitDiffLineReport],
) -> (usize, usize) {
    if status == "??" {
        return (
            preview
                .iter()
                .filter(|line| line.kind == "addition")
                .count(),
            0,
        );
    }

    let args = ["diff", "--numstat", "HEAD", "--", relative_path];
    let primary = run_bounded_command_in_dir(
        git_path,
        &args,
        repository_root,
        Duration::from_millis(2_500),
        MAX_GIT_DIFF_PREVIEW_OUTPUT_BYTES,
    );
    let counts = primary
        .ok()
        .filter(|output| output.status == "passed")
        .and_then(|output| parse_git_numstat_counts(&output.stdout));
    if let Some(counts) = counts {
        return counts;
    }

    if git_file_has_staged_change(status) {
        let cached_args = ["diff", "--cached", "--numstat", "--", relative_path];
        if let Some(counts) = run_bounded_command_in_dir(
            git_path,
            &cached_args,
            repository_root,
            Duration::from_millis(2_500),
            MAX_GIT_DIFF_PREVIEW_OUTPUT_BYTES,
        )
        .ok()
        .filter(|output| output.status == "passed")
        .and_then(|output| parse_git_numstat_counts(&output.stdout))
        {
            return counts;
        }
    }

    (
        preview
            .iter()
            .filter(|line| line.kind == "addition")
            .count(),
        preview
            .iter()
            .filter(|line| line.kind == "deletion")
            .count(),
    )
}

fn parse_git_numstat_counts(output: &str) -> Option<(usize, usize)> {
    let line = output.lines().find(|line| !line.trim().is_empty())?;
    let mut parts = line.split('\t');
    let additions = parts.next()?.parse::<usize>().unwrap_or(0);
    let deletions = parts.next()?.parse::<usize>().unwrap_or(0);
    Some((additions, deletions))
}

fn git_untracked_file_preview(
    repository_root: &Path,
    relative_path: &str,
) -> Vec<DesktopGitDiffLineReport> {
    let Ok(root) = repository_root.canonicalize() else {
        return Vec::new();
    };
    let candidate = root.join(relative_path);
    let Ok(canonical) = candidate.canonicalize() else {
        return Vec::new();
    };
    if !canonical.starts_with(&root) {
        return Vec::new();
    }
    let Ok(metadata) = fs::metadata(&canonical) else {
        return Vec::new();
    };
    if !metadata.is_file() || metadata.len() > MAX_WORKSPACE_FILE_BYTES as u64 {
        return Vec::new();
    }
    let Ok(content) = fs::read_to_string(&canonical) else {
        return Vec::new();
    };
    content
        .lines()
        .take(MAX_GIT_DIFF_PREVIEW_LINES)
        .map(|line| DesktopGitDiffLineReport {
            kind: "addition".to_string(),
            text: truncate_chars(line, 240),
        })
        .collect()
}

fn parse_git_diff_preview(diff_text: &str) -> Vec<DesktopGitDiffLineReport> {
    diff_text
        .lines()
        .filter(|line| {
            !line.starts_with("diff --git ")
                && !line.starts_with("index ")
                && !line.starts_with("new file mode ")
                && !line.starts_with("deleted file mode ")
        })
        .take(MAX_GIT_DIFF_PREVIEW_LINES)
        .map(|line| {
            let kind =
                if line.starts_with("@@") || line.starts_with("--- ") || line.starts_with("+++ ") {
                    "meta"
                } else if line.starts_with('+') {
                    "addition"
                } else if line.starts_with('-') {
                    "deletion"
                } else {
                    "context"
                };
            DesktopGitDiffLineReport {
                kind: kind.to_string(),
                text: truncate_chars(line, 240),
            }
        })
        .collect()
}

fn git_file_has_staged_change(status: &str) -> bool {
    let mut chars = status.chars();
    let first = chars.next().unwrap_or(' ');
    first != ' ' && first != '?'
}

fn git_file_has_unstaged_change(status: &str) -> bool {
    let mut chars = status.chars();
    let _ = chars.next();
    let second = chars.next().unwrap_or(' ');
    second != ' ' && second != '?'
}

fn git_status_is_conflicted(status: &str) -> bool {
    matches!(status, "DD" | "AU" | "UD" | "UA" | "DU" | "AA" | "UU")
        || status.chars().any(|character| character == 'U')
}

fn run_git_with_owned_args(
    git_path: &PathBuf,
    args: &[String],
    repository_root: &Path,
    timeout: Duration,
    max_output_bytes: usize,
) -> Result<ProcessOutput, String> {
    let arg_refs = args.iter().map(String::as_str).collect::<Vec<_>>();
    run_bounded_command_in_dir(
        git_path,
        &arg_refs,
        repository_root,
        timeout,
        max_output_bytes,
    )
}

fn git_args_with_paths(prefix: &[&str], paths: &[String]) -> Result<Vec<String>, String> {
    if paths.is_empty() {
        return Err("Select at least one changed file first.".to_string());
    }
    if paths.len() > MAX_GIT_ACTION_FILE_PATHS {
        return Err(format!(
            "Too many files selected. Max selection is {MAX_GIT_ACTION_FILE_PATHS} files."
        ));
    }
    let mut args = prefix
        .iter()
        .map(|value| value.to_string())
        .collect::<Vec<_>>();
    args.extend(paths.iter().cloned());
    Ok(args)
}
