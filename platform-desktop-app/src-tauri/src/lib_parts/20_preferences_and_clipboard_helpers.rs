fn desktop_preferences_report(app: &AppHandle) -> Result<DesktopPreferencesReport, String> {
    let path = desktop_preferences_path(app)?;
    let (source, preferences) = if path.exists() {
        let content = fs::read_to_string(&path)
            .map_err(|error| format!("Failed to read desktop preferences: {error}"))?;
        let preferences: DesktopPreferences = serde_json::from_str(&content)
            .map_err(|error| format!("Failed to parse desktop preferences: {error}"))?;
        (
            "app_config".to_string(),
            normalize_desktop_preferences(preferences),
        )
    } else {
        ("default_native".to_string(), DesktopPreferences::default())
    };

    Ok(DesktopPreferencesReport {
        schema_version: DESKTOP_PREFERENCES_SCHEMA_VERSION.to_string(),
        status: "loaded".to_string(),
        source,
        preferences_path: path_to_string(&path),
        preferences,
    })
}

fn save_desktop_preferences_report(
    app: &AppHandle,
    preferences: DesktopPreferences,
) -> Result<DesktopPreferencesReport, String> {
    let path = desktop_preferences_path(app)?;
    let preferences = normalize_desktop_preferences(preferences);
    write_pretty_json(&path, &preferences)?;
    Ok(DesktopPreferencesReport {
        schema_version: DESKTOP_PREFERENCES_SCHEMA_VERSION.to_string(),
        status: "saved".to_string(),
        source: "app_config".to_string(),
        preferences_path: path_to_string(&path),
        preferences,
    })
}

fn normalize_desktop_preferences(preferences: DesktopPreferences) -> DesktopPreferences {
    let defaults = DesktopPreferences::default();
    let runtime_defaults = DesktopRuntimeInitDefaults::default();
    DesktopPreferences {
        schema_version: DESKTOP_PREFERENCES_SCHEMA_VERSION.to_string(),
        ui_language: match preferences.ui_language.as_str() {
            "ko" | "en" => preferences.ui_language,
            _ => defaults.ui_language,
        },
        theme_mode: match preferences.theme_mode.as_str() {
            "system" | "light" | "dark" => preferences.theme_mode,
            _ => defaults.theme_mode,
        },
        sidebar_mode: match preferences.sidebar_mode.as_str() {
            "expanded" | "collapsed" => preferences.sidebar_mode,
            _ => defaults.sidebar_mode,
        },
        terminal_drawer_open: preferences.terminal_drawer_open,
        runtime_init_defaults: DesktopRuntimeInitDefaults {
            adapter_id: normalize_one_of(
                preferences.runtime_init_defaults.adapter_id,
                &[
                    "claude-code-cli",
                    "gemini-cli",
                    "codex-cli",
                    "opencode-cli",
                    "claw-code-cli",
                ],
                &runtime_defaults.adapter_id,
            ),
            session_mode_id: normalize_one_of(
                preferences.runtime_init_defaults.session_mode_id,
                &[
                    "platform-improvement",
                    "knowledge-accumulation",
                    "review-verify",
                ],
                &runtime_defaults.session_mode_id,
            ),
            task_pipe_kind: normalize_one_of(
                preferences.runtime_init_defaults.task_pipe_kind,
                &[
                    "platform_improvement_pipe",
                    "knowledge_accumulation_pipe",
                    "review_verify_pipe",
                ],
                &runtime_defaults.task_pipe_kind,
            ),
            auto_defer_questions: preferences.runtime_init_defaults.auto_defer_questions,
        },
        runtime_customization: normalize_runtime_customization(preferences.runtime_customization),
        pinned_sections: normalize_pinned_sections(
            preferences.pinned_sections,
            defaults.pinned_sections,
        ),
    }
}

fn normalize_runtime_customization(
    customization: DesktopRuntimeCustomization,
) -> DesktopRuntimeCustomization {
    let mut provider_overrides = Vec::new();
    for definition in PROVIDER_CREDENTIALS {
        let override_entry = customization
            .provider_overrides
            .iter()
            .find(|entry| entry.provider_id == definition.provider_id);
        let default_model = override_entry
            .map(|entry| entry.default_model.trim().to_string())
            .filter(|value| provider_model_id_is_valid(value))
            .unwrap_or_else(|| definition.default_model.to_string());
        let base_url = override_entry
            .map(|entry| entry.base_url.trim().to_string())
            .filter(|value| provider_base_url_is_valid(value))
            .unwrap_or_else(|| provider_default_base_url(definition.provider_id).to_string());
        provider_overrides.push(DesktopProviderOverride {
            provider_id: definition.provider_id.to_string(),
            default_model,
            base_url,
        });
    }

    let mut quick_commands: Vec<DesktopTerminalQuickCommand> = customization
        .terminal
        .quick_commands
        .into_iter()
        .take(MAX_TERMINAL_QUICK_COMMANDS)
        .filter_map(|command| {
            let input = truncate_chars(command.input.trim(), 500);
            if input.is_empty() {
                return None;
            }
            let input = if input.ends_with('\n') {
                input
            } else {
                format!("{input}\n")
            };
            Some(DesktopTerminalQuickCommand {
                id: safe_short_setting(command.id, 48, "quick-command"),
                label: safe_short_setting(command.label, 48, "Command"),
                detail: safe_short_setting(command.detail, 120, input.trim()),
                input,
            })
        })
        .collect();
    if quick_commands.is_empty() {
        quick_commands = default_terminal_quick_commands();
    }

    DesktopRuntimeCustomization {
        provider_overrides,
        prompts: normalize_prompt_customization(customization.prompts),
        terminal: DesktopTerminalCustomization {
            shell_command: truncate_chars(
                customization.terminal.shell_command.trim(),
                MAX_TERMINAL_COMMAND_CHARS,
            ),
            startup_command: truncate_chars(
                customization.terminal.startup_command.trim(),
                MAX_TERMINAL_STARTUP_COMMAND_CHARS,
            ),
            quick_commands,
        },
    }
}

fn normalize_prompt_customization(
    customization: DesktopPromptCustomization,
) -> DesktopPromptCustomization {
    DesktopPromptCustomization {
        session_prompts: normalize_prompt_override_map(
            customization.session_prompts,
            is_allowed_session_prompt_key,
        ),
        task_pipe_prompts: normalize_prompt_override_map(
            customization.task_pipe_prompts,
            is_allowed_task_pipe_prompt_key,
        ),
    }
}

fn normalize_prompt_override_map(
    prompts: HashMap<String, String>,
    allow_key: fn(&str) -> bool,
) -> HashMap<String, String> {
    prompts
        .into_iter()
        .filter_map(|(key, value)| {
            let key = key.trim().to_string();
            let value = truncate_chars(value.trim(), MAX_RUNTIME_PROMPT_CHARS);
            if key.is_empty() || value.is_empty() || !allow_key(&key) {
                None
            } else {
                Some((key, value))
            }
        })
        .collect()
}

fn is_allowed_session_prompt_key(key: &str) -> bool {
    matches!(
        key,
        "research_insight_agent"
            | "user_task"
            | "platform_improvement"
            | "knowledge_accumulation"
            | "review_verify"
    )
}

fn is_allowed_task_pipe_prompt_key(key: &str) -> bool {
    matches!(
        key,
        "selected-preset:research_insight_agent_pipe"
            | "selected-preset:platform_improvement_pipe"
            | "selected-preset:knowledge_accumulation_pipe"
            | "selected-preset:review_verify_pipe"
            | "implementation-pipe"
            | "research-pipe"
            | "review-pipe"
    )
}

fn safe_short_setting(value: String, max_chars: usize, fallback: &str) -> String {
    let trimmed = value.trim();
    if trimmed.is_empty() {
        fallback.to_string()
    } else {
        truncate_chars(trimmed, max_chars)
    }
}

fn provider_model_id_is_valid(value: &str) -> bool {
    !value.is_empty()
        && value.len() <= MAX_PROVIDER_MODEL_CHARS
        && value.chars().all(|character| {
            character.is_ascii_alphanumeric() || matches!(character, '-' | '_' | '.' | ':' | '/')
        })
}

fn provider_base_url_is_valid(value: &str) -> bool {
    if value.is_empty() || value.len() > MAX_PROVIDER_BASE_URL_CHARS {
        return false;
    }
    value.starts_with("http://") || value.starts_with("https://")
}

fn normalize_one_of(value: String, allowed: &[&str], fallback: &str) -> String {
    if allowed.iter().any(|item| *item == value.as_str()) {
        value
    } else {
        fallback.to_string()
    }
}

fn normalize_pinned_sections(values: Vec<String>, fallback: Vec<String>) -> Vec<String> {
    let allowed = [
        "overview",
        "desktop",
        "agents",
        "source",
        "intent",
        "projects",
        "history",
        "structure",
        "documents",
        "requirements",
    ];
    let mut seen = HashSet::new();
    let normalized: Vec<String> = values
        .into_iter()
        .filter(|value| allowed.iter().any(|item| *item == value))
        .filter(|value| seen.insert(value.clone()))
        .take(6)
        .collect();
    if normalized.is_empty() {
        fallback
    } else {
        normalized
    }
}

fn read_system_clipboard_text_report(app: &AppHandle) -> Result<SystemClipboardTextReport, String> {
    let text = app
        .clipboard()
        .read_text()
        .map_err(|error| format!("Failed to read system clipboard text: {error}"))?;
    Ok(SystemClipboardTextReport {
        status: if text.is_empty() {
            "empty".to_string()
        } else {
            "read".to_string()
        },
        text_length: text.chars().count(),
        text,
    })
}

fn write_system_clipboard_text_report(
    app: &AppHandle,
    text: &str,
) -> Result<SystemClipboardTextReport, String> {
    if text.is_empty() {
        return Ok(SystemClipboardTextReport {
            status: "empty".to_string(),
            text: String::new(),
            text_length: 0,
        });
    }
    app.clipboard()
        .write_text(text.to_string())
        .map_err(|error| format!("Failed to write system clipboard text: {error}"))?;
    Ok(SystemClipboardTextReport {
        status: "written".to_string(),
        text: String::new(),
        text_length: text.chars().count(),
    })
}
