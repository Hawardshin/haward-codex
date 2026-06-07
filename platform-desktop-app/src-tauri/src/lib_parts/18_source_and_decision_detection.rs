fn platform_artifacts_base_path(root: &Path) -> PathBuf {
    if root.join("platform-desktop-app").exists() {
        root.join("platform-desktop-app").join("artifacts")
    } else {
        root.join("artifacts")
    }
}

fn workspace_relative_display_path(root: &Path, path: &Path) -> String {
    path.strip_prefix(root)
        .unwrap_or(path)
        .to_string_lossy()
        .replace('\\', "/")
}

fn workspace_text_file_entry(
    root: &Path,
    path: &Path,
    relative_path: &str,
    metadata: &fs::Metadata,
) -> WorkspaceTextFileEntry {
    let extension = source_editor_extension(relative_path);
    let project = relative_path
        .split('/')
        .next()
        .filter(|value| !value.is_empty())
        .unwrap_or("workspace")
        .to_string();
    let updated_at = metadata
        .modified()
        .ok()
        .and_then(|value| value.duration_since(UNIX_EPOCH).ok())
        .map(|value| format!("unix_ms:{}", value.as_millis()))
        .unwrap_or_default();
    let size_bytes = metadata.len() as usize;
    let truncated = size_bytes > MAX_WORKSPACE_FILE_BYTES;
    let line_count = if truncated || size_bytes > MAX_SOURCE_LIST_LINE_COUNT_BYTES {
        0
    } else {
        fs::read_to_string(path)
            .map(|content| content.lines().count())
            .unwrap_or(0)
    };
    WorkspaceTextFileEntry {
        id: sanitize_file_name(relative_path),
        path: workspace_relative_display_path(root, path),
        project,
        language: source_editor_language(&extension).to_string(),
        extension,
        size_bytes,
        line_count,
        updated_at,
        truncated,
        content: String::new(),
    }
}

fn should_skip_source_editor_dir(file_name: &str) -> bool {
    SOURCE_EDITOR_SKIP_DIRS
        .iter()
        .any(|blocked| file_name.eq_ignore_ascii_case(blocked))
}

fn is_source_editor_text_path(relative_path: &str) -> bool {
    let lower = relative_path.to_lowercase();
    SOURCE_EDITOR_TEXT_EXTENSIONS
        .iter()
        .any(|extension| lower.ends_with(&format!(".{extension}")))
}

fn source_editor_extension(relative_path: &str) -> String {
    if relative_path.ends_with(".ko.md") {
        return "ko.md".to_string();
    }
    if relative_path.ends_with(".en.md") {
        return "en.md".to_string();
    }
    Path::new(relative_path)
        .extension()
        .and_then(|value| value.to_str())
        .unwrap_or("")
        .to_lowercase()
}

fn source_editor_language(extension: &str) -> &'static str {
    match extension {
        "c" | "cc" | "cpp" | "h" => "cpp",
        "css" => "css",
        "go" => "go",
        "html" => "html",
        "java" => "java",
        "js" | "mjs" | "jsx" => "javascript",
        "json" => "json",
        "ko.md" | "en.md" | "md" => "markdown",
        "py" => "python",
        "rs" => "rust",
        "sh" => "shell",
        "sql" => "sql",
        "toml" => "toml",
        "ts" | "tsx" => "typescript",
        "yaml" | "yml" => "yaml",
        _ => "text",
    }
}

fn prompt_preview(prompt: &str) -> String {
    prompt
        .chars()
        .take(MAX_TASK_PROMPT_PREVIEW_CHARS)
        .collect::<String>()
        .trim()
        .to_string()
}

fn read_bounded_text_preview(path: &Path, max_bytes: usize) -> Result<(String, bool), String> {
    if !path.exists() {
        return Ok((String::new(), false));
    }
    if !path.is_file() {
        return Err("Task run log path is not a file.".to_string());
    }

    let bytes = fs::read(path).map_err(|error| format!("Failed to read task run log: {error}"))?;
    let truncated = bytes.len() > max_bytes;
    let preview = if truncated {
        let mut end = max_bytes;
        while end > 0 && std::str::from_utf8(&bytes[..end]).is_err() {
            end -= 1;
        }
        String::from_utf8_lossy(&bytes[..end]).to_string()
    } else {
        String::from_utf8_lossy(&bytes).to_string()
    };
    Ok((preview, truncated))
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

fn elapsed_millis(started: Instant) -> u64 {
    u64::try_from(started.elapsed().as_millis()).unwrap_or(u64::MAX)
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

fn detect_decision_prompts_for(
    adapter_id: &str,
    label: &str,
    output: &str,
) -> Vec<CliDecisionPrompt> {
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

fn defer_session_questions_locked(
    session_id: &str,
    session: &mut CliSession,
    mode: &str,
) -> Result<usize, String> {
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
        if !session
            .deferred_prompt_keys
            .iter()
            .any(|existing| existing == &key)
        {
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
            !session
                .deferred_prompt_keys
                .iter()
                .any(|existing| existing == &key)
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
    let inbox_path = root
        .join("_ops")
        .join("coordination")
        .join("human-decision-inbox.json");
    let canonical_inbox = inbox_path
        .canonicalize()
        .map_err(|error| format!("Failed to resolve human decision inbox: {error}"))?;
    ensure_workspace_path(&root, &canonical_inbox)?;

    let content = fs::read_to_string(&canonical_inbox)
        .map_err(|error| format!("Failed to read human decision inbox: {error}"))?;
    let mut inbox: Value = serde_json::from_str(&content)
        .map_err(|error| format!("Failed to parse human decision inbox: {error}"))?;
    let existing_ids: Vec<String> = inbox
        .get("decisions")
        .and_then(Value::as_array)
        .ok_or_else(|| "Human decision inbox is missing decisions array.".to_string())?
        .iter()
        .filter_map(|item| {
            item.get("id")
                .and_then(Value::as_str)
                .map(ToOwned::to_owned)
        })
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

    let formatted = serde_json::to_string_pretty(&inbox)
        .map_err(|error| format!("Failed to serialize human decision inbox: {error}"))?;
    fs::write(&canonical_inbox, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write human decision inbox: {error}"))?;
    Ok(appended_count)
}
