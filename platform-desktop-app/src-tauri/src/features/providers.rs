use super::{command, NativeRuntimeFeatureGroupReport};
use crate::*;
use serde_json::{json, Value};
use std::collections::HashSet;
use std::env;
use std::fs;
use std::time::{Duration, Instant};
use tauri::AppHandle;

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    NativeRuntimeFeatureGroupReport {
        group_id: "provider-accounts",
        label: "Provider Accounts",
        source_module: "src-tauri/src/features/providers.rs",
        role: "Owns provider credential metadata, model catalog checks, subscription verification, and direct model tasks.",
        commands: vec![
            command("list_provider_credentials", "List redacted provider credential state", "No raw secret in report"),
            command("save_provider_credential", "Save provider credential", "Local app config secret store"),
            command("clear_provider_credential", "Clear provider credential", "Provider allowlist"),
            command("open_provider_auth_url", "Open setup/login/docs URL", "Provider allowlisted URLs"),
            command("verify_provider_subscription", "Verify provider subscription state", "Provider API check with redacted output"),
            command("list_provider_models", "List provider model catalog", "Provider API or local HTTP check"),
            command("run_provider_agent_task", "Run one provider-backed agent task", "Bounded provider HTTP request"),
        ],
        follow_up: vec![
            "Move public keychain storage behind a separate release gate before public distribution.",
            "Keep provider HTTP calls bounded, redacted, and task-run persisted outside the source tree.",
        ],
    }
}

pub(crate) fn provider_credentials_report(app: &AppHandle) -> Result<ProviderCredentialReport, String> {
    let path = provider_credentials_path(app)?;
    let store = read_provider_credential_store(app)?;
    let providers: Vec<ProviderCredentialSummary> = PROVIDER_CREDENTIALS
        .iter()
        .map(|definition| {
            let record = store
                .credentials
                .iter()
                .find(|credential| credential.provider_id == definition.provider_id);
            provider_credential_summary(definition, record)
        })
        .collect();
    let configured_count = providers
        .iter()
        .filter(|provider| provider.configured)
        .count();
    let status = if configured_count > 0 {
        "provider_credentials_ready"
    } else {
        "provider_credentials_required"
    }
    .to_string();

    Ok(ProviderCredentialReport {
        schema_version: PROVIDER_CREDENTIALS_SCHEMA_VERSION.to_string(),
        status,
        source: if path.exists() {
            "app_config_file".to_string()
        } else {
            "default_empty".to_string()
        },
        credential_file_path: path_to_string(&path),
        storage_warning: "키 원문은 로컬 앱 설정 파일에만 저장되며 보고서/지원 번들에는 마스킹 처리되어 노출되지 않습니다. 공개 배포 전에는 OS keychain 기반 저장소로 교체해야 합니다.".to_string(),
        configured_count,
        providers,
    })
}

pub(crate) fn save_provider_credential_report(
    app: &AppHandle,
    input: ProviderCredentialInput,
) -> Result<ProviderCredentialReport, String> {
    let definition = find_provider_credential(&input.provider_id)
        .ok_or_else(|| format!("알 수 없는 제공자입니다: {}", input.provider_id))?;
    if provider_is_local_http(definition) {
        return provider_credentials_report(app);
    }
    let auth_method = if input.auth_method.trim().is_empty() {
        definition.auth_method
    } else {
        input.auth_method.trim()
    };
    if auth_method != definition.auth_method {
        return Err(format!(
            "제공자 '{}'의 인증 방식 '{}'은(는) 지원되지 않습니다.",
            auth_method, definition.provider_id
        ));
    }
    let secret = normalize_provider_secret_for_definition(definition, &input.secret)?;
    let account_hint = truncate_chars(
        &redact_sensitive_text(input.account_hint.trim()),
        MAX_PROVIDER_ACCOUNT_HINT_CHARS,
    );
    let mut store = read_provider_credential_store(app)?;
    let now = current_unix_millis_label();
    let created_at = store
        .credentials
        .iter()
        .find(|credential| credential.provider_id == definition.provider_id)
        .map(|credential| credential.created_at.clone())
        .filter(|value| !value.is_empty())
        .unwrap_or_else(|| now.clone());
    store
        .credentials
        .retain(|credential| credential.provider_id != definition.provider_id);
    store.credentials.push(ProviderCredentialRecord {
        provider_id: definition.provider_id.to_string(),
        auth_method: definition.auth_method.to_string(),
        account_hint,
        secret,
        created_at,
        updated_at: now,
        subscription_state: "not_verified".to_string(),
        subscription_checked_at: String::new(),
        subscription_message: String::new(),
    });
    store = normalize_provider_credential_store(store);
    write_provider_credential_store(app, &store)?;
    provider_credentials_report(app)
}

pub(crate) fn clear_provider_credential_report(
    app: &AppHandle,
    provider_id: &str,
) -> Result<ProviderCredentialReport, String> {
    let definition = find_provider_credential(provider_id)
        .ok_or_else(|| format!("알 수 없는 제공자입니다: {provider_id}"))?;
    if provider_is_local_http(definition) {
        return provider_credentials_report(app);
    }
    let mut store = read_provider_credential_store(app)?;
    store
        .credentials
        .retain(|credential| credential.provider_id != definition.provider_id);
    store = normalize_provider_credential_store(store);
    write_provider_credential_store(app, &store)?;
    provider_credentials_report(app)
}

pub(crate) fn open_provider_auth_url_report(
    app: &AppHandle,
    provider_id: &str,
    purpose: Option<&str>,
) -> Result<ProviderAuthUrlOpenReport, String> {
    let definition = find_provider_credential(provider_id)
        .ok_or_else(|| format!("알 수 없는 제공자입니다: {provider_id}"))?;
    let purpose = match purpose.unwrap_or("setup") {
        "login" => "login",
        "docs" => "docs",
        _ => "setup",
    };
    let url = match purpose {
        "login" => definition.login_url,
        "docs" => definition.docs_url,
        _ => definition.setup_url,
    };
    open_url_with_system_browser(app, url)?;
    Ok(ProviderAuthUrlOpenReport {
        provider_id: definition.provider_id.to_string(),
        purpose: purpose.to_string(),
        url: url.to_string(),
        status: "opened".to_string(),
    })
}

pub(crate) async fn verify_provider_subscription_report(
    app: &AppHandle,
    provider_id: &str,
) -> Result<ProviderCredentialReport, String> {
    let definition = find_provider_credential(provider_id)
        .ok_or_else(|| format!("알 수 없는 제공자입니다: {provider_id}"))?;
    if !definition.requires_subscription_verification {
        let mut report = provider_credentials_report(app)?;
        report.providers = mark_provider_subscription_status(
            report.providers,
            provider_id,
            "not_required",
            "구독 검증이 필요하지 않습니다.".to_string(),
            String::new(),
        );
        return Ok(report);
    }

    let secret = provider_secret_for_definition(app, definition)?;
    let checked_at = current_unix_millis_label();
    let mut outcome = match definition.provider_id {
        "openai" => verify_openai_subscription(&secret).await?,
        "anthropic" => verify_anthropic_subscription(&secret).await?,
        "google-gemini" => verify_gemini_subscription(&secret).await?,
        _ => {
            return Err(format!(
                "{} 구독 검증은 현재 지원되지 않습니다.",
                definition.label
            ))
        }
    };
    if outcome.message.trim().is_empty() {
        outcome.message = "구독 검증 결과를 확인했습니다.".to_string();
    }

    let state = if outcome.verified {
        "verified"
    } else {
        "error"
    };
    let mut report = provider_credentials_report(app)?;
    report.providers = mark_provider_subscription_status(
        report.providers,
        provider_id,
        state,
        outcome.message.clone(),
        checked_at.clone(),
    );

    let mut persisted = false;
    let mut store = read_provider_credential_store(app)?;
    for credential in &mut store.credentials {
        if credential.provider_id != definition.provider_id {
            continue;
        }
        if credential.secret.trim().is_empty() {
            continue;
        }
        credential.subscription_state = state.to_string();
        credential.subscription_checked_at = checked_at.clone();
        credential.subscription_message = outcome.message.clone();
        persisted = true;
        break;
    }
    if persisted {
        write_provider_credential_store(app, &store).map_err(|error| {
            format!("구독 검증 상태 저장에 실패했습니다: {error}. 현재 세션 상태만 반영됩니다.")
        })?;
    } else {
        report.providers = mark_provider_subscription_status(
            report.providers,
            provider_id,
            state,
            format!(
                "{} (현재 세션 기준만 반영됩니다. 앱 저장소에 API 키를 저장해 주세요.)",
                outcome.message
            ),
            checked_at,
        );
    }

    if persisted {
        return provider_credentials_report(app);
    }

    Ok(report)
}

#[derive(Debug, Clone)]
struct ProviderSubscriptionVerificationOutcome {
    verified: bool,
    message: String,
}

fn mark_provider_subscription_status(
    mut providers: Vec<ProviderCredentialSummary>,
    provider_id: &str,
    state: &str,
    message: String,
    checked_at: String,
) -> Vec<ProviderCredentialSummary> {
    for provider in &mut providers {
        if provider.provider_id != provider_id {
            continue;
        }
        provider.subscription_state = state.to_string();
        provider.subscription_message = message.clone();
        provider.subscription_checked_at = checked_at.clone();
        return providers;
    }
    providers
}

async fn verify_provider_subscription_for_run(
    app: &AppHandle,
    definition: &ProviderCredentialDefinition,
) -> Result<(), String> {
    if !definition.requires_subscription_verification {
        return Ok(());
    }

    let report = verify_provider_subscription_report(app, definition.provider_id).await?;
    let verified = report
        .providers
        .iter()
        .find(|provider| provider.provider_id == definition.provider_id)
        .map(|provider| provider.subscription_state == "verified")
        .unwrap_or(false);

    if verified {
        return Ok(());
    }

    let reason = report
        .providers
        .iter()
        .find(|provider| provider.provider_id == definition.provider_id)
        .map(|provider| provider.subscription_message.clone())
        .filter(|value| !value.trim().is_empty())
        .unwrap_or_else(|| {
            "구독 검증이 필요합니다. 제공자 설정에서 구독 검증을 먼저 실행하세요.".to_string()
        });

    Err(format!(
        "{} 구독 검증이 완료되지 않았습니다. {}",
        definition.label, reason
    ))
}

pub(crate) async fn list_provider_models_report(
    app: &AppHandle,
    provider_id: &str,
) -> Result<ProviderModelCatalogReport, String> {
    let definition = find_provider_credential(provider_id)
        .ok_or_else(|| format!("알 수 없는 제공자입니다: {provider_id}"))?;
    let preferences = desktop_preferences_report(app)
        .map(|report| report.preferences)
        .unwrap_or_else(|_| DesktopPreferences::default());
    let provider_override = preferences
        .runtime_customization
        .provider_overrides
        .iter()
        .find(|entry| entry.provider_id == definition.provider_id);
    let default_model = provider_override
        .map(|entry| entry.default_model.trim().to_string())
        .filter(|value| provider_model_id_is_valid(value))
        .unwrap_or_else(|| definition.default_model.to_string());
    let base_url = provider_override
        .map(|entry| entry.base_url.trim().to_string())
        .filter(|value| provider_base_url_is_valid(value))
        .unwrap_or_else(|| provider_default_base_url(definition.provider_id).to_string());
    if definition.provider_id == OLLAMA_PROVIDER_ID {
        return list_ollama_provider_models_report(definition, &base_url, &default_model).await;
    }
    Ok(default_provider_model_catalog_report(
        definition,
        &default_model,
    ))
}

fn default_provider_model_catalog_report(
    definition: &ProviderCredentialDefinition,
    default_model: &str,
) -> ProviderModelCatalogReport {
    ProviderModelCatalogReport {
        provider_id: definition.provider_id.to_string(),
        provider_label: definition.label.to_string(),
        status: "static_default_model".to_string(),
        source: "provider_definition".to_string(),
        default_model: default_model.to_string(),
        models: vec![ProviderModelSummary {
            provider_id: definition.provider_id.to_string(),
            id: default_model.to_string(),
            label: default_model.to_string(),
            size: None,
            modified_at: String::new(),
        }],
        error: None,
    }
}

async fn list_ollama_provider_models_report(
    definition: &ProviderCredentialDefinition,
    base_url: &str,
    default_model: &str,
) -> Result<ProviderModelCatalogReport, String> {
    let endpoint = provider_endpoint(base_url, "/api/tags");
    let response = match provider_http_client()?.get(&endpoint).send().await {
        Ok(response) => response,
        Err(error) => {
            return Ok(ProviderModelCatalogReport {
                provider_id: definition.provider_id.to_string(),
                provider_label: definition.label.to_string(),
                status: "local_model_runtime_unavailable".to_string(),
                source: endpoint,
                default_model: default_model.to_string(),
                models: Vec::new(),
                error: Some(format!(
                    "Ollama 런타임을 {base_url}에서 찾을 수 없습니다. Ollama를 실행한 뒤 모델 새로고침하세요. {error}"
                )),
            });
        }
    };
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Ollama 모델 목록 응답 본문 읽기 실패: {error}"))?;
    if !(200..300).contains(&http_status) {
        return Ok(ProviderModelCatalogReport {
            provider_id: definition.provider_id.to_string(),
            provider_label: definition.label.to_string(),
            status: "local_model_catalog_failed".to_string(),
            source: endpoint,
            default_model: default_model.to_string(),
            models: Vec::new(),
            error: Some(format!(
                "Ollama /api/tags 호출이 HTTP {http_status}를 반환했습니다: {}",
                truncate_chars(&redact_sensitive_text(&body), 900)
            )),
        });
    }
    let value = serde_json::from_str::<Value>(&body)
        .map_err(|error| format!("Ollama 모델 목록 JSON 파싱 실패: {error}"))?;
    let mut models = extract_ollama_model_catalog(definition, &value);
    models.sort_by(|left, right| left.id.cmp(&right.id));
    let status = if models.is_empty() {
        "local_model_catalog_empty"
    } else {
        "local_model_catalog_ready"
    };
    Ok(ProviderModelCatalogReport {
        provider_id: definition.provider_id.to_string(),
        provider_label: definition.label.to_string(),
        status: status.to_string(),
        source: endpoint,
        default_model: default_model.to_string(),
        models,
        error: None,
    })
}

fn extract_ollama_model_catalog(
    definition: &ProviderCredentialDefinition,
    value: &Value,
) -> Vec<ProviderModelSummary> {
    let mut models = Vec::new();
    let Some(items) = value.get("models").and_then(Value::as_array) else {
        return models;
    };
    for item in items {
        let id = item
            .get("name")
            .or_else(|| item.get("model"))
            .and_then(Value::as_str)
            .unwrap_or("")
            .trim();
        if id.is_empty() {
            continue;
        }
        models.push(ProviderModelSummary {
            provider_id: definition.provider_id.to_string(),
            id: id.to_string(),
            label: id.to_string(),
            size: item.get("size").and_then(Value::as_u64),
            modified_at: item
                .get("modified_at")
                .and_then(Value::as_str)
                .unwrap_or("")
                .to_string(),
        });
    }
    models
}

fn read_provider_credential_store(app: &AppHandle) -> Result<ProviderCredentialStore, String> {
    let path = provider_credentials_path(app)?;
    if path.exists() {
        let content = fs::read_to_string(&path)
            .map_err(|error| format!("Provider credentials 파일을 읽지 못했습니다: {error}"))?;
        let store: ProviderCredentialStore = serde_json::from_str(&content)
            .map_err(|error| format!("Provider credentials 파일 파싱 실패: {error}"))?;
        return Ok(normalize_provider_credential_store(store));
    }

    let legacy_path = legacy_provider_credentials_path(app)?;
    if !legacy_path.exists() {
        return Ok(ProviderCredentialStore::default());
    }
    let content = fs::read_to_string(&legacy_path)
        .map_err(|error| format!("Provider credentials 파일을 읽지 못했습니다: {error}"))?;
    let store: ProviderCredentialStore = serde_json::from_str(&content)
        .map_err(|error| format!("Provider credentials 파일 파싱 실패: {error}"))?;
    let normalized = normalize_provider_credential_store(store);
    write_provider_credential_store(app, &normalized)?;
    let _ = fs::remove_file(&legacy_path);
    Ok(normalized)
}

fn write_provider_credential_store(
    app: &AppHandle,
    store: &ProviderCredentialStore,
) -> Result<(), String> {
    let path = provider_credentials_path(app)?;
    write_pretty_json(&path, store)?;
    restrict_secret_file_permissions(&path)
}

fn normalize_provider_credential_store(store: ProviderCredentialStore) -> ProviderCredentialStore {
    let mut seen = HashSet::new();
    let mut credentials = Vec::new();
    for credential in store.credentials {
        let Some(definition) = find_provider_credential(&credential.provider_id) else {
            continue;
        };
        if !seen.insert(definition.provider_id.to_string()) {
            continue;
        }
        if credential.secret.trim().is_empty() {
            continue;
        }
        credentials.push(ProviderCredentialRecord {
            provider_id: definition.provider_id.to_string(),
            auth_method: definition.auth_method.to_string(),
            account_hint: truncate_chars(
                &redact_sensitive_text(credential.account_hint.trim()),
                MAX_PROVIDER_ACCOUNT_HINT_CHARS,
            ),
            secret: credential.secret.trim().to_string(),
            created_at: credential.created_at,
            updated_at: credential.updated_at,
            subscription_state: credential.subscription_state.trim().to_string(),
            subscription_checked_at: credential.subscription_checked_at.trim().to_string(),
            subscription_message: truncate_chars(
                &redact_sensitive_text(credential.subscription_message.trim()),
                MAX_PROVIDER_ACCOUNT_HINT_CHARS,
            ),
        });
    }
    ProviderCredentialStore {
        schema_version: PROVIDER_CREDENTIALS_SCHEMA_VERSION.to_string(),
        credentials,
    }
}

fn provider_credential_summary(
    definition: &ProviderCredentialDefinition,
    record: Option<&ProviderCredentialRecord>,
) -> ProviderCredentialSummary {
    if provider_is_local_http(definition) {
        return ProviderCredentialSummary {
            provider_id: definition.provider_id.to_string(),
            label: definition.label.to_string(),
            auth_method: definition.auth_method.to_string(),
            env_var: definition.env_var.to_string(),
            default_model: definition.default_model.to_string(),
            configured: true,
            environment_available: true,
            status: "local_runtime_configured".to_string(),
            account_hint: "로컬 런타임".to_string(),
            secret_preview: "API 키 없음".to_string(),
            last_updated_at: String::new(),
            storage: "local_http_runtime".to_string(),
            credential_source: "local_runtime".to_string(),
            setup_url: definition.setup_url.to_string(),
            login_url: definition.login_url.to_string(),
            docs_url: definition.docs_url.to_string(),
            caution: definition.caution.to_string(),
            requires_subscription_verification: false,
            subscription_state: "not_required".to_string(),
            subscription_checked_at: String::new(),
            subscription_message: String::new(),
        };
    }
    let saved_configured = record
        .map(|credential| !credential.secret.trim().is_empty())
        .unwrap_or(false);
    let environment_available = env::var(definition.env_var)
        .map(|value| !value.trim().is_empty())
        .unwrap_or(false);
    let configured = saved_configured || environment_available;
    let credential_source = if saved_configured {
        "app_config_file"
    } else if environment_available {
        "environment_variable"
    } else {
        "not_configured"
    };
    let status = if saved_configured {
        "saved_local"
    } else if environment_available {
        "environment_available"
    } else {
        "not_connected"
    };
    ProviderCredentialSummary {
        provider_id: definition.provider_id.to_string(),
        label: definition.label.to_string(),
        auth_method: definition.auth_method.to_string(),
        env_var: definition.env_var.to_string(),
        default_model: definition.default_model.to_string(),
        configured,
        environment_available,
        status: status.to_string(),
        account_hint: record
            .map(|credential| credential.account_hint.clone())
            .unwrap_or_default(),
        secret_preview: if let Some(credential) = record {
            credential_secret_preview(&credential.secret)
        } else if environment_available {
            format!("env:{}", definition.env_var)
        } else {
            String::new()
        },
        last_updated_at: record
            .map(|credential| credential.updated_at.clone())
            .unwrap_or_default(),
        storage: if saved_configured {
            "local_app_config_secret_file".to_string()
        } else if environment_available {
            "shell_environment".to_string()
        } else {
            "not_configured".to_string()
        },
        credential_source: credential_source.to_string(),
        setup_url: definition.setup_url.to_string(),
        login_url: definition.login_url.to_string(),
        docs_url: definition.docs_url.to_string(),
        caution: definition.caution.to_string(),
        requires_subscription_verification: definition.requires_subscription_verification,
        subscription_state: subscription_state_for_summary(definition, saved_configured, record),
        subscription_checked_at: record
            .map(|credential| credential.subscription_checked_at.clone())
            .unwrap_or_default(),
        subscription_message: subscription_message_for_summary(
            definition,
            saved_configured,
            record,
        ),
    }
}

fn subscription_state_for_summary(
    definition: &ProviderCredentialDefinition,
    configured: bool,
    record: Option<&ProviderCredentialRecord>,
) -> String {
    if !definition.requires_subscription_verification {
        return "not_required".to_string();
    }
    if !configured {
        return "not_configured".to_string();
    }
    let Some(record) = record else {
        return "unverified".to_string();
    };
    if !record.subscription_state.trim().is_empty() {
        let state = record.subscription_state.trim().to_lowercase();
        if state == "verified"
            || state == "not_required"
            || state == "error"
            || state == "unverified"
        {
            return state;
        }
        if state == "not_configured" {
            return "unverified".to_string();
        }
    }
    if !record.subscription_message.trim().is_empty() {
        return "error".to_string();
    }
    "unverified".to_string()
}

fn subscription_message_for_summary(
    definition: &ProviderCredentialDefinition,
    configured: bool,
    record: Option<&ProviderCredentialRecord>,
) -> String {
    if !definition.requires_subscription_verification {
        return "구독 검증이 필요하지 않습니다.".to_string();
    }
    if !configured {
        return "먼저 계정 키를 설정하세요.".to_string();
    }
    let Some(record) = record else {
        return "구독 검증을 먼저 실행하세요.".to_string();
    };
    if !record.subscription_message.trim().is_empty() {
        return record.subscription_message.trim().to_string();
    }
    let status = record.subscription_state.trim().to_lowercase();
    if status == "verified" {
        return "구독 검증이 완료되었습니다.".to_string();
    }
    if status == "error" {
        return "구독 검증에 실패했습니다.".to_string();
    }
    "구독 검증을 먼저 실행하세요.".to_string()
}

fn find_provider_credential(provider_id: &str) -> Option<&'static ProviderCredentialDefinition> {
    PROVIDER_CREDENTIALS
        .iter()
        .find(|definition| definition.provider_id == provider_id)
}

fn provider_is_local_http(definition: &ProviderCredentialDefinition) -> bool {
    definition.auth_method == LOCAL_HTTP_AUTH_METHOD
}

fn normalize_provider_secret(value: &str) -> Result<String, String> {
    let secret = value.trim();
    if secret.is_empty() {
        return Err("API 키가 비어 있습니다.".to_string());
    }
    if secret.len() > MAX_PROVIDER_SECRET_BYTES {
        return Err(format!(
            "API 키 크기가 너무 큽니다. 최대 입력은 {MAX_PROVIDER_SECRET_BYTES}바이트입니다."
        ));
    }
    if secret.chars().any(|character| {
        character == '\n' || character == '\r' || character == '\0' || character.is_control()
    }) {
        return Err("API 키에는 제어 문자나 줄바꿈을 넣을 수 없습니다.".to_string());
    }
    Ok(secret.to_string())
}

fn normalize_provider_secret_for_definition(
    definition: &ProviderCredentialDefinition,
    value: &str,
) -> Result<String, String> {
    if provider_is_local_http(definition) {
        return Ok(String::new());
    }

    let secret = normalize_provider_secret(value)?;
    validate_provider_secret_shape(definition, &secret)?;
    Ok(secret)
}

fn validate_provider_secret_shape(
    definition: &ProviderCredentialDefinition,
    secret: &str,
) -> Result<(), String> {
    if provider_is_local_http(definition) {
        return Ok(());
    }
    let normalized = secret.trim();
    if !normalized
        .chars()
        .all(|character| character.is_ascii_alphanumeric() || matches!(character, '-' | '_'))
        && !matches!(definition.provider_id, "google-gemini")
    {
        return Err(format!(
            "{}은(는) 허용되지 않는 문자가 포함되어 있습니다.",
            definition.label
        ));
    }

    if definition.provider_id == "openai" {
        if !normalized.starts_with("sk-") {
            return Err(format!(
                "{} 계정 연동은 OpenAI API 키 형식(예: sk-...)만 허용합니다. ChatGPT 웹 로그인 세션/쿠키는 지원되지 않습니다.",
                definition.label
            ));
        }
        if normalized.len() < 20 {
            return Err(format!(
                "{} 키 길이가 너무 짧습니다. OpenAI 공식 API 키를 확인하세요.",
                definition.label
            ));
        }
        return Ok(());
    }

    if definition.provider_id == "anthropic" {
        if !normalized.starts_with("sk-ant-") || normalized.len() < 30 {
            return Err(format!(
                "{}은(는) Anthropic API 키 형식(예: sk-ant-...)이 아닙니다. 소비자 웹 OAuth 토큰은 저장하지 않습니다.",
                definition.label
            ));
        }
        return Ok(());
    }

    if definition.provider_id == "google-gemini" {
        if !(normalized.starts_with("AIza")
            || (normalized.len() >= 30
                && normalized.len() <= 80
                && normalized.chars().all(|character| {
                    character.is_ascii_alphanumeric() || character == '-' || character == '_'
                })))
        {
            return Err(format!(
                "{}은(는) Google AI Studio API 키 형식이 아닙니다. Vertex AI OAuth/ADC 토큰은 별도 운영 흐름입니다.",
                definition.label
            ));
        }
        return Ok(());
    }

    Ok(())
}

fn credential_secret_preview(secret: &str) -> String {
    let normalized = secret.trim();
    let char_count = normalized.chars().count();
    if char_count <= 8 {
        return "****".to_string();
    }
    let prefix: String = normalized.chars().take(4).collect();
    let suffix: String = normalized
        .chars()
        .skip(char_count.saturating_sub(4))
        .collect();
    format!("{prefix}...{suffix}")
}

pub(crate) fn provider_env_for_adapter(
    app: &AppHandle,
    adapter_id: &str,
) -> Result<Vec<(String, String)>, String> {
    let store = read_provider_credential_store(app)?;
    let allowed_providers = provider_ids_for_adapter(adapter_id);
    let mut env_values = Vec::new();
    for provider_id in allowed_providers {
        let Some(definition) = find_provider_credential(provider_id) else {
            continue;
        };
        let env_key = definition.env_var;
        if env_key.trim().is_empty() {
            continue;
        }
        let Some(credential) = store
            .credentials
            .iter()
            .find(|item| item.provider_id == definition.provider_id)
        else {
            if let Ok(env_value) = env::var(env_key) {
                let trimmed = env_value.trim().to_string();
                if !trimmed.is_empty() {
                    env_values.push((env_key.to_string(), trimmed));
                }
            }
            continue;
        };
        if !credential.secret.trim().is_empty() {
            let secret = credential.secret.trim().to_string();
            env_values.push((env_key.to_string(), secret.clone()));
            if definition.provider_id == "google-gemini" && env_key == "GEMINI_API_KEY" {
                env_values.push(("GOOGLE_API_KEY".to_string(), secret));
            }
            continue;
        }
        if let Ok(env_value) = env::var(env_key) {
            let trimmed = env_value.trim().to_string();
            if !trimmed.is_empty() {
                env_values.push((env_key.to_string(), trimmed.clone()));
                if definition.provider_id == "google-gemini" && env_key == "GEMINI_API_KEY" {
                    env_values.push(("GOOGLE_API_KEY".to_string(), trimmed));
                }
            }
        }
    }
    Ok(env_values)
}

fn provider_ids_for_adapter(adapter_id: &str) -> &'static [&'static str] {
    match adapter_id {
        "codex-cli" => &["openai"],
        "claude-code-cli" => &["anthropic"],
        "gemini-cli" => &["google-gemini"],
        "opencode-cli" | "claw-code-cli" => &["openai", "anthropic", "google-gemini"],
        _ => &[],
    }
}

struct ProviderApiResponse {
    http_status: u16,
    body: String,
    output: String,
}

pub(crate) async fn run_provider_agent_task_report(
    app: &AppHandle,
    input: ProviderAgentTaskInput,
) -> Result<ProviderAgentTaskReport, String> {
    if input.prompt.len() > MAX_SESSION_INPUT_BYTES {
        return Err(format!(
            "요청이 너무 깁니다. 최대 입력은 {MAX_SESSION_INPUT_BYTES}바이트입니다."
        ));
    }

    let definition = find_provider_credential(&input.provider_id)
        .ok_or_else(|| format!("알 수 없는 제공자입니다: {}", input.provider_id))?;
    let preferences = desktop_preferences_report(app)
        .map(|report| report.preferences)
        .unwrap_or_else(|_| DesktopPreferences::default());
    let provider_override = preferences
        .runtime_customization
        .provider_overrides
        .iter()
        .find(|entry| entry.provider_id == definition.provider_id);
    let secret = provider_secret_for_definition(app, definition)?;

    if definition.requires_subscription_verification {
        verify_provider_subscription_for_run(app, definition).await?;
    }

    let model = normalize_provider_model(
        definition,
        &input.model,
        provider_override.map(|entry| entry.default_model.as_str()),
    )?;
    let base_url = provider_override
        .map(|entry| entry.base_url.trim().to_string())
        .filter(|value| provider_base_url_is_valid(value))
        .unwrap_or_else(|| provider_default_base_url(definition.provider_id).to_string());
    let task_kind = normalize_task_kind(Some(input.task_kind.as_str()), "provider_agent_task")?;
    let max_output_tokens = normalize_provider_task_output_tokens(input.max_output_tokens);
    if let Some(max_input_tokens) = input.max_input_tokens {
        let estimated_prompt_tokens =
            estimate_text_tokens(&input.prompt) + estimate_text_tokens(&input.system_prompt);
        if estimated_prompt_tokens > max_input_tokens {
            return Err(format!(
                "현재 입력은 {estimated_prompt_tokens}토큰으로 추정되어, 설정된 최대 토큰 수 {max_input_tokens}을(를) 초과했습니다."
            ));
        }
    }
    let working_dir = resolve_workspace_dir(app, input.working_dir.as_deref())?;
    let system_prompt = provider_task_system_prompt(&task_kind, &input.system_prompt);
    let request_id = new_session_id(&format!("provider-{}", definition.provider_id));
    let task_run_id = format!("task-run-{request_id}");
    let started_at = current_unix_millis_label();
    let started = Instant::now();

    let api_result = call_provider_api(
        definition,
        &secret,
        &model,
        &base_url,
        &system_prompt,
        &input.prompt,
        max_output_tokens,
    )
    .await;
    let duration_ms = started.elapsed().as_millis();
    let mut http_status = None;
    let mut output = String::new();
    let mut stderr = String::new();
    let status = match api_result {
        Ok(response) => {
            http_status = Some(response.http_status);
            if (200..300).contains(&response.http_status) {
                output = if response.output.trim().is_empty() {
                    response.body
                } else {
                    response.output
                };
                "completed"
            } else {
                stderr = response.body;
                "provider_api_failed"
            }
        }
        Err(error) => {
            stderr = redact_sensitive_text(&error);
            "provider_network_error"
        }
    }
    .to_string();

    let (output, output_truncated) = truncate_provider_task_output(&output);
    let (stderr, stderr_truncated) = truncate_provider_task_output(&redact_sensitive_text(&stderr));
    let mut report = ProviderAgentTaskReport {
        task_run_id,
        provider_id: definition.provider_id.to_string(),
        provider_label: definition.label.to_string(),
        model,
        model_route_id: normalize_provider_task_control_id(&input.model_route_id, "manual"),
        constraint_profile_id: normalize_provider_task_control_id(
            &input.constraint_profile_id,
            "developer",
        ),
        connector_policy_id: normalize_provider_task_control_id(
            &input.connector_policy_id,
            "provider-api",
        ),
        max_input_tokens: input.max_input_tokens,
        max_output_tokens,
        budget_usd: input.budget_usd,
        status,
        http_status,
        duration_ms,
        output,
        stderr,
        output_truncated: output_truncated || stderr_truncated,
        working_dir: path_to_string(&working_dir),
        task_kind,
        task_record_path: None,
        stdout_log_path: None,
        stderr_log_path: None,
        persistence_error: None,
        request_id,
    };

    match persist_provider_agent_task_run(app, &report, &started_at, &input.prompt) {
        Ok(paths) => {
            report.task_record_path = Some(paths.record_path);
            report.stdout_log_path = Some(paths.stdout_log_path);
            report.stderr_log_path = Some(paths.stderr_log_path);
        }
        Err(error) => {
            report.persistence_error = Some(error);
        }
    }

    Ok(report)
}

async fn call_provider_api(
    definition: &ProviderCredentialDefinition,
    secret: &str,
    model: &str,
    base_url: &str,
    system_prompt: &str,
    prompt: &str,
    max_output_tokens: u64,
) -> Result<ProviderApiResponse, String> {
    match definition.provider_id {
        OLLAMA_PROVIDER_ID => {
            call_ollama_provider_api(base_url, model, system_prompt, prompt, max_output_tokens)
                .await
        }
        "openai" => {
            call_openai_provider_api(
                base_url,
                secret,
                model,
                system_prompt,
                prompt,
                max_output_tokens,
            )
            .await
        }
        "anthropic" => {
            call_anthropic_provider_api(
                base_url,
                secret,
                model,
                system_prompt,
                prompt,
                max_output_tokens,
            )
            .await
        }
        "google-gemini" => {
            call_gemini_provider_api(
                base_url,
                secret,
                model,
                system_prompt,
                prompt,
                max_output_tokens,
            )
            .await
        }
        _ => Err(format!(
            "지원되지 않는 제공자입니다: {}",
            definition.provider_id
        )),
    }
}

async fn verify_openai_subscription(
    secret: &str,
) -> Result<ProviderSubscriptionVerificationOutcome, String> {
    let models_endpoint = provider_endpoint(OPENAI_BASE_URL, "/models");
    let models_response = provider_http_client()?
        .get(&models_endpoint)
        .bearer_auth(secret)
        .send()
        .await
        .map_err(|error| format!("OpenAI 구독 검증 요청 실패: {error}"))?;
    let models_status_code = models_response.status().as_u16();
    let models_body = models_response
        .text()
        .await
        .map_err(|error| format!("OpenAI 구독 검증 응답 파싱 실패: {error}"))?;
    if !(200..300).contains(&models_status_code) {
        let detail = provider_http_error_message("OpenAI", models_status_code, &models_body);
        return Ok(ProviderSubscriptionVerificationOutcome {
            verified: false,
            message: detail,
        });
    }
    if let Ok(value) = serde_json::from_str::<Value>(&models_body) {
        if value.get("data").and_then(Value::as_array).is_none() {
            return Ok(ProviderSubscriptionVerificationOutcome {
                verified: false,
                message: "OpenAI 모델 목록 응답 형식이 예상과 다릅니다.".to_string(),
            });
        }
    } else {
        return Ok(ProviderSubscriptionVerificationOutcome {
            verified: false,
            message: "OpenAI 모델 목록 응답 파싱에 실패했습니다.".to_string(),
        });
    }

    let billing_endpoint = provider_endpoint(OPENAI_BASE_URL, "/dashboard/billing/subscription");
    let billing_response = provider_http_client()?
        .get(&billing_endpoint)
        .bearer_auth(secret)
        .send()
        .await
        .map_err(|error| format!("OpenAI 구독 상태 조회 요청 실패: {error}"))?;
    let billing_status_code = billing_response.status().as_u16();
    let billing_body = billing_response
        .text()
        .await
        .map_err(|error| format!("OpenAI 구독 상태 응답 파싱 실패: {error}"))?;
    if !(200..300).contains(&billing_status_code) {
        return Ok(ProviderSubscriptionVerificationOutcome {
            verified: false,
            message: provider_http_error_message(
                "OpenAI 구독/과금 상태 조회",
                billing_status_code,
                &billing_body,
            ),
        });
    }

    let billing_data = serde_json::from_str::<Value>(&billing_body)
        .map_err(|error| format!("OpenAI 구독/과금 응답 파싱 실패: {error}"))?;
    let has_payment_method = billing_data
        .get("has_payment_method")
        .and_then(Value::as_bool)
        .unwrap_or(false);
    let hard_limit = billing_data
        .get("hard_limit_usd")
        .and_then(parse_openai_money);
    let soft_limit = billing_data
        .get("soft_limit_usd")
        .and_then(parse_openai_money);
    if has_payment_method || hard_limit.unwrap_or(0.0) > 0.0 || soft_limit.unwrap_or(0.0) > 0.0 {
        return Ok(ProviderSubscriptionVerificationOutcome {
            verified: true,
            message: "OpenAI 구독·결제 상태 조회에 성공했으며 실제 계정 연동이 확인되었습니다."
                .to_string(),
        });
    }

    Ok(ProviderSubscriptionVerificationOutcome {
        verified: false,
        message: "OpenAI 계정에서 결제 상태가 활성화되지 않았거나 사용 한도가 0입니다. 유료 결제 등록 후 다시 시도하세요.".to_string(),
    })
}

async fn verify_anthropic_subscription(
    secret: &str,
) -> Result<ProviderSubscriptionVerificationOutcome, String> {
    let endpoint = provider_endpoint(ANTHROPIC_BASE_URL, "/v1/models");
    let response = provider_http_client()?
        .get(&endpoint)
        .header("x-api-key", secret)
        .header("anthropic-version", "2023-06-01")
        .send()
        .await
        .map_err(|error| format!("Anthropic 구독 검증 요청 실패: {error}"))?;
    let status_code = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Anthropic 구독 검증 응답 파싱 실패: {error}"))?;

    if (200..300).contains(&status_code) {
        if let Ok(value) = serde_json::from_str::<Value>(&body) {
            if value.get("data").and_then(Value::as_array).is_none() {
                return Ok(ProviderSubscriptionVerificationOutcome {
                    verified: false,
                    message: "Anthropic 모델 목록 응답 형식이 예상과 다릅니다.".to_string(),
                });
            }
        }
        return Ok(ProviderSubscriptionVerificationOutcome {
            verified: true,
            message: "Anthropic 계정/키가 유효하며 API 구독 상태 조회가 가능합니다.".to_string(),
        });
    }

    let detail = provider_http_error_message("Anthropic", status_code, &body);
    Ok(ProviderSubscriptionVerificationOutcome {
        verified: false,
        message: detail,
    })
}

async fn verify_gemini_subscription(
    secret: &str,
) -> Result<ProviderSubscriptionVerificationOutcome, String> {
    let endpoint = provider_endpoint(GEMINI_BASE_URL, "/v1beta/models");
    let response = provider_http_client()?
        .get(&endpoint)
        .header("x-goog-api-key", secret)
        .send()
        .await
        .map_err(|error| format!("Google Gemini 구독 검증 요청 실패: {error}"))?;
    let status = response.status();
    let status_code = status.as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Google Gemini 구독 검증 응답 파싱 실패: {error}"))?;

    if (200..300).contains(&status_code) {
        if let Ok(value) = serde_json::from_str::<Value>(&body) {
            if value.get("models").and_then(Value::as_array).is_none() {
                return Ok(ProviderSubscriptionVerificationOutcome {
                    verified: false,
                    message: "Gemini 모델 목록 응답 형식이 예상과 다릅니다.".to_string(),
                });
            }
        }
        return Ok(ProviderSubscriptionVerificationOutcome {
            verified: true,
            message: "Google Gemini 계정/키가 유효하며 API 구독 상태 조회가 가능합니다."
                .to_string(),
        });
    }

    let detail = provider_http_error_message("Gemini", status_code, &body);
    Ok(ProviderSubscriptionVerificationOutcome {
        verified: false,
        message: detail,
    })
}

fn parse_openai_money(value: &Value) -> Option<f64> {
    if let Some(number) = value.as_f64() {
        return Some(number);
    }
    if let Some(text) = value.as_str() {
        return text.trim().replace(',', "").parse::<f64>().ok();
    }
    None
}

fn provider_http_error_message(provider: &str, status_code: u16, body: &str) -> String {
    let error_message = serde_json::from_str::<Value>(body)
        .ok()
        .and_then(|value| {
            value
                .get("error")
                .and_then(Value::as_object)
                .and_then(|error| {
                    error
                        .get("message")
                        .and_then(Value::as_str)
                        .map(ToString::to_string)
                        .or_else(|| {
                            error
                                .get("status")
                                .and_then(Value::as_str)
                                .map(ToString::to_string)
                        })
                })
                .or_else(|| {
                    value
                        .get("error")
                        .and_then(Value::as_str)
                        .map(ToString::to_string)
                })
        })
        .unwrap_or_else(|| "API 응답에서 오류 상세가 없습니다.".to_string());
    format!("{provider} 구독 검증 요청 실패: HTTP {status_code}. {error_message}")
}

async fn call_ollama_provider_api(
    base_url: &str,
    model: &str,
    system_prompt: &str,
    prompt: &str,
    max_output_tokens: u64,
) -> Result<ProviderApiResponse, String> {
    let payload = json!({
        "model": model,
        "messages": [
            {
                "role": "system",
                "content": system_prompt
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "stream": false,
        "options": {
            "num_predict": max_output_tokens
        }
    });
    let response = provider_http_client()?
        .post(provider_endpoint(base_url, "/api/chat"))
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("Ollama 요청 실패: {error}"))?;
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Ollama 응답 본문 읽기 실패: {error}"))?;
    let output = serde_json::from_str::<Value>(&body)
        .map(|value| extract_ollama_output_text(&value))
        .unwrap_or_default();
    Ok(ProviderApiResponse {
        http_status,
        body,
        output,
    })
}

async fn call_openai_provider_api(
    base_url: &str,
    secret: &str,
    model: &str,
    system_prompt: &str,
    prompt: &str,
    max_output_tokens: u64,
) -> Result<ProviderApiResponse, String> {
    let payload = json!({
        "model": model,
        "instructions": system_prompt,
        "input": prompt,
        "max_output_tokens": max_output_tokens,
        "store": false
    });
    let response = provider_http_client()?
        .post(provider_endpoint(base_url, "/responses"))
        .bearer_auth(secret)
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("OpenAI 요청 실패: {error}"))?;
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("OpenAI 응답 본문 읽기 실패: {error}"))?;
    let output = serde_json::from_str::<Value>(&body)
        .map(|value| extract_openai_output_text(&value))
        .unwrap_or_default();
    Ok(ProviderApiResponse {
        http_status,
        body,
        output,
    })
}

async fn call_anthropic_provider_api(
    base_url: &str,
    secret: &str,
    model: &str,
    system_prompt: &str,
    prompt: &str,
    max_output_tokens: u64,
) -> Result<ProviderApiResponse, String> {
    let payload = json!({
        "model": model,
        "max_tokens": max_output_tokens,
        "system": system_prompt,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    });
    let response = provider_http_client()?
        .post(provider_endpoint(base_url, "/v1/messages"))
        .header("x-api-key", secret)
        .header("anthropic-version", "2023-06-01")
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("Anthropic 요청 실패: {error}"))?;
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Anthropic 응답 본문 읽기 실패: {error}"))?;
    let output = serde_json::from_str::<Value>(&body)
        .map(|value| extract_anthropic_output_text(&value))
        .unwrap_or_default();
    Ok(ProviderApiResponse {
        http_status,
        body,
        output,
    })
}

async fn call_gemini_provider_api(
    base_url: &str,
    secret: &str,
    model: &str,
    system_prompt: &str,
    prompt: &str,
    max_output_tokens: u64,
) -> Result<ProviderApiResponse, String> {
    let model_path = gemini_model_path(model);
    let endpoint = provider_endpoint(base_url, &format!("/v1beta/{model_path}:generateContent"));
    let payload = json!({
        "systemInstruction": {
            "parts": [
                {
                    "text": system_prompt
                }
            ]
        },
        "contents": [
            {
                "role": "user",
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "generationConfig": {
            "maxOutputTokens": max_output_tokens
        }
    });
    let response = provider_http_client()?
        .post(endpoint)
        .header("x-goog-api-key", secret)
        .json(&payload)
        .send()
        .await
        .map_err(|error| format!("Gemini 요청 실패: {error}"))?;
    let http_status = response.status().as_u16();
    let body = response
        .text()
        .await
        .map_err(|error| format!("Gemini 응답 본문 읽기 실패: {error}"))?;
    let output = serde_json::from_str::<Value>(&body)
        .map(|value| extract_gemini_output_text(&value))
        .unwrap_or_default();
    Ok(ProviderApiResponse {
        http_status,
        body,
        output,
    })
}

fn provider_endpoint(base_url: &str, endpoint_path: &str) -> String {
    let base = base_url.trim().trim_end_matches('/');
    let path = endpoint_path.trim_start_matches('/');
    if base.ends_with(path) {
        base.to_string()
    } else {
        format!("{base}/{path}")
    }
}

fn provider_http_client() -> Result<reqwest::Client, String> {
    reqwest::Client::builder()
        .timeout(Duration::from_millis(PROVIDER_TASK_TIMEOUT_MS))
        .build()
        .map_err(|error| format!("Provider HTTP 클라이언트 생성 실패: {error}"))
}

fn provider_secret_for_definition(
    app: &AppHandle,
    definition: &ProviderCredentialDefinition,
) -> Result<String, String> {
    if provider_is_local_http(definition) {
        return Ok(String::new());
    }
    let store = read_provider_credential_store(app)?;
    if let Some(credential) = store
        .credentials
        .iter()
        .find(|item| item.provider_id == definition.provider_id)
    {
        if !credential.secret.trim().is_empty() {
            let secret = credential.secret.trim().to_string();
            validate_provider_secret_shape(definition, &secret)?;
            return Ok(secret);
        }
    }
    let secret = env::var(definition.env_var).map_err(|_| {
        format!(
            "{} 연결이 없습니다. 키를 저장하거나 {} 환경 변수를 설정하세요.",
            definition.label, definition.env_var
        )
    })?;
    let secret = secret.trim().to_string();
    if secret.is_empty() {
        return Err(format!(
            "{} 연결이 없습니다. 키를 저장하거나 {} 환경 변수를 설정하세요.",
            definition.label, definition.env_var
        ));
    }
    validate_provider_secret_shape(definition, &secret)?;
    Ok(secret)
}

fn provider_task_system_prompt(task_kind: &str, value: &str) -> String {
    let trimmed = value.trim();
    if !trimmed.is_empty() {
        return truncate_chars(trimmed, MAX_SESSION_INPUT_BYTES);
    }
    format!(
        "에이전트 워크스페이스 플랫폼의 직접 Provider 작업입니다. 작업 유형: {task_kind}. 사용자의 요청을 바탕으로 실행하고, 구체적인 결과를 반환하세요. 가정과 사실을 분리하고, 검증 절차를 함께 남기세요."
    )
}

fn normalize_provider_model(
    definition: &ProviderCredentialDefinition,
    value: &str,
    fallback_model: Option<&str>,
) -> Result<String, String> {
    let fallback = fallback_model
        .map(str::trim)
        .filter(|candidate| provider_model_id_is_valid(candidate))
        .unwrap_or(definition.default_model);
    let candidate = if value.trim().is_empty() {
        fallback
    } else {
        value.trim()
    };
    if candidate.len() > MAX_PROVIDER_MODEL_CHARS {
        return Err("모델 ID가 너무 깁니다.".to_string());
    }
    if !candidate.chars().all(|character| {
        character.is_ascii_alphanumeric() || matches!(character, '-' | '_' | '.' | ':' | '/')
    }) {
        return Err("지원되지 않는 문자가 모델 ID에 포함되어 있습니다.".to_string());
    }
    Ok(candidate.to_string())
}

fn normalize_provider_task_output_tokens(value: Option<u64>) -> u64 {
    value.unwrap_or(DEFAULT_PROVIDER_TASK_OUTPUT_TOKENS).clamp(
        MIN_PROVIDER_TASK_OUTPUT_TOKENS,
        MAX_PROVIDER_TASK_OUTPUT_TOKENS,
    )
}

fn normalize_provider_task_control_id(value: &str, fallback: &str) -> String {
    let candidate = value.trim();
    if candidate.is_empty() {
        return fallback.to_string();
    }
    let normalized: String = candidate
        .chars()
        .filter(|character| character.is_ascii_alphanumeric() || matches!(character, '-' | '_'))
        .take(64)
        .collect();
    if normalized.is_empty() {
        fallback.to_string()
    } else {
        normalized
    }
}

fn estimate_text_tokens(value: &str) -> u64 {
    u64::try_from(value.chars().count().div_ceil(4)).unwrap_or(u64::MAX)
}

fn gemini_model_path(model: &str) -> String {
    if model.starts_with("models/") {
        model.to_string()
    } else {
        format!("models/{model}")
    }
}

fn truncate_provider_task_output(value: &str) -> (String, bool) {
    if value.len() <= MAX_PROVIDER_TASK_OUTPUT_BYTES {
        return (value.to_string(), false);
    }
    let mut output = String::new();
    for character in value.chars() {
        if output.len() + character.len_utf8() > MAX_PROVIDER_TASK_OUTPUT_BYTES {
            break;
        }
        output.push(character);
    }
    (format!("{output}\n[truncated]"), true)
}

fn extract_openai_output_text(value: &Value) -> String {
    if let Some(output_text) = value.get("output_text").and_then(Value::as_str) {
        return output_text.to_string();
    }
    let mut chunks = Vec::new();
    if let Some(items) = value.get("output").and_then(Value::as_array) {
        for item in items {
            if let Some(content_items) = item.get("content").and_then(Value::as_array) {
                for content in content_items {
                    if let Some(text) = content.get("text").and_then(Value::as_str) {
                        chunks.push(text.to_string());
                    }
                }
            }
        }
    }
    chunks.join("\n")
}

fn extract_ollama_output_text(value: &Value) -> String {
    value
        .get("message")
        .and_then(|message| message.get("content"))
        .and_then(Value::as_str)
        .unwrap_or_default()
        .to_string()
}

fn extract_anthropic_output_text(value: &Value) -> String {
    let mut chunks = Vec::new();
    if let Some(items) = value.get("content").and_then(Value::as_array) {
        for item in items {
            if let Some(text) = item.get("text").and_then(Value::as_str) {
                chunks.push(text.to_string());
            }
        }
    }
    chunks.join("\n")
}

fn extract_gemini_output_text(value: &Value) -> String {
    let mut chunks = Vec::new();
    if let Some(candidates) = value.get("candidates").and_then(Value::as_array) {
        for candidate in candidates {
            let Some(parts) = candidate
                .get("content")
                .and_then(|content| content.get("parts"))
                .and_then(Value::as_array)
            else {
                continue;
            };
            for part in parts {
                if let Some(text) = part.get("text").and_then(Value::as_str) {
                    chunks.push(text.to_string());
                }
            }
        }
    }
    chunks.join("\n")
}

fn persist_provider_agent_task_run(
    app: &AppHandle,
    report: &ProviderAgentTaskReport,
    started_at: &str,
    prompt: &str,
) -> Result<TaskRunPersistPaths, String> {
    let root = workspace_root_for_app(Some(app))?;
    let run_dir = task_run_dir(app, &report.task_run_id)?;
    fs::create_dir_all(&run_dir)
        .map_err(|error| format!("Failed to create provider task run directory: {error}"))?;

    let record_path = run_dir.join("record.json");
    let stdout_log_path = run_dir.join("stdout.log");
    let stderr_log_path = run_dir.join("stderr.log");
    fs::write(&stdout_log_path, report.output.as_bytes())
        .map_err(|error| format!("Failed to write provider task stdout log: {error}"))?;
    fs::write(&stderr_log_path, report.stderr.as_bytes())
        .map_err(|error| format!("Failed to write provider task stderr log: {error}"))?;

    let relative_record_path = workspace_relative_display_path(&root, &record_path);
    let relative_stdout_path = workspace_relative_display_path(&root, &stdout_log_path);
    let relative_stderr_path = workspace_relative_display_path(&root, &stderr_log_path);
    let updated_at = current_unix_millis_label();
    let exit_code = if report.status == "completed" { 0 } else { 1 };
    let provider_task = json!({
        "provider_id": report.provider_id.clone(),
        "provider_label": report.provider_label.clone(),
        "model": report.model.clone(),
        "model_route_id": report.model_route_id.clone(),
        "constraint_profile_id": report.constraint_profile_id.clone(),
        "connector_policy_id": report.connector_policy_id.clone(),
        "max_input_tokens": report.max_input_tokens,
        "max_output_tokens": report.max_output_tokens,
        "budget_usd": report.budget_usd,
        "http_status": report.http_status,
        "credential_policy": "secret_not_persisted"
    });
    let paths = json!({
        "record": relative_record_path,
        "stdout_log": relative_stdout_path,
        "stderr_log": relative_stderr_path
    });
    let record = json!({
        "schema_version": 1,
        "record_id": format!("record-{}", report.request_id),
        "session_id": report.request_id.clone(),
        "task_run_id": report.task_run_id.clone(),
        "task_kind": report.task_kind.clone(),
        "pipeline_id": Value::Null,
        "lane_id": Value::Null,
        "lane_role": Value::Null,
        "adapter_id": report.provider_id.clone(),
        "label": format!("{} Direct Task", report.provider_label),
        "command": "provider_api",
        "status": report.status.clone(),
        "exit_code": exit_code,
        "started_at": started_at,
        "updated_at": updated_at,
        "elapsed_ms": u64::try_from(report.duration_ms).unwrap_or(u64::MAX),
        "working_dir": report.working_dir.clone(),
        "prompt_preview": prompt_preview(&redact_sensitive_text(prompt)),
        "stdout_bytes": report.output.len(),
        "stderr_bytes": report.stderr.len(),
        "output_truncated": report.output_truncated,
        "decision_inbox_items": 0,
        "pending_decision_prompts": 0,
        "deferred_prompt_count": 0,
        "auto_defer_questions": false,
        "auto_defer_triggered": false,
        "defer_message_sent": false,
        "bounded": true,
        "max_output_bytes": MAX_PROVIDER_TASK_OUTPUT_BYTES,
        "decision_prompts": [],
        "provider_task": provider_task,
        "paths": paths
    });
    let formatted = serde_json::to_string_pretty(&record)
        .map_err(|error| format!("Failed to serialize provider task record: {error}"))?;
    fs::write(&record_path, format!("{formatted}\n"))
        .map_err(|error| format!("Failed to write provider task record: {error}"))?;

    Ok(TaskRunPersistPaths {
        record_path: relative_record_path,
        stdout_log_path: relative_stdout_path,
        stderr_log_path: relative_stderr_path,
    })
}
