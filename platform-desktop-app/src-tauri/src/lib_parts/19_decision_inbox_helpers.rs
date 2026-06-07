fn decision_prompt_key(question: &str) -> String {
    let dashed: String = question
        .trim()
        .to_lowercase()
        .chars()
        .map(|character| {
            if character.is_ascii_alphanumeric() {
                character
            } else {
                '-'
            }
        })
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
    let content = fs::read_to_string(&inbox_path)
        .map_err(|error| format!("Failed to read human decision inbox: {error}"))?;
    let inbox: Value = serde_json::from_str(&content)
        .map_err(|error| format!("Failed to parse human decision inbox: {error}"))?;
    Ok((inbox_path, inbox))
}

fn write_human_decision_inbox_value(inbox_path: &Path, inbox: &Value) -> Result<(), String> {
    let formatted = serde_json::to_string_pretty(inbox)
        .map_err(|error| format!("Failed to serialize human decision inbox: {error}"))?;
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
    let inbox_path = root
        .join("_ops")
        .join("coordination")
        .join("human-decision-inbox.json");
    let canonical_inbox = inbox_path
        .canonicalize()
        .map_err(|error| format!("Failed to resolve human decision inbox: {error}"))?;
    ensure_workspace_path(root, &canonical_inbox)?;
    Ok(canonical_inbox)
}

fn human_decision_report(
    inbox: &Value,
    updated_id: Option<String>,
) -> Result<HumanDecisionInboxReport, String> {
    let decisions = inbox
        .get("decisions")
        .and_then(Value::as_array)
        .ok_or_else(|| "Human decision inbox is missing decisions array.".to_string())?;
    let items: Vec<HumanDecisionItem> = decisions
        .iter()
        .map(human_decision_item_from_value)
        .collect();
    let open_count = items
        .iter()
        .filter(|item| matches!(item.status.as_str(), "open" | "deferred" | "resuming"))
        .count();
    let answered_count = items
        .iter()
        .filter(|item| item.status == "answered")
        .count();
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
        answer_type: answer
            .and_then(|item| item.get("type"))
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        answer_text: answer
            .and_then(|item| item.get("text"))
            .and_then(Value::as_str)
            .map(ToOwned::to_owned),
        answered_at: value
            .get("answered_at")
            .and_then(Value::as_str)
            .map(ToOwned::to_owned)
            .or_else(|| {
                answer
                    .and_then(|item| item.get("answered_at"))
                    .and_then(Value::as_str)
                    .map(ToOwned::to_owned)
            }),
        blocked_work_count: value
            .get("blocked_work")
            .and_then(Value::as_array)
            .map(Vec::len)
            .unwrap_or(0),
        unblocked_work_count: value
            .get("unblocked_work")
            .and_then(Value::as_array)
            .map(Vec::len)
            .unwrap_or(0),
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
