use serde::Serialize;
use serde_json::Value;
use std::fs;
use tauri::{AppHandle, Manager};

use crate::{
    current_unix_millis_label, desktop_workspace_state_report, run_installer_payload_audit_report,
    runtime_data_boundary_report, workspace_resource_profile, MAX_SUPPORT_BUNDLE_RECENT_TASK_RUNS,
    MAX_SUPPORT_EVENT_CHARS,
};

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ServiceReadinessCheck {
    id: String,
    label: String,
    status: String,
    detail: String,
    required_for_public: bool,
    required_for_internal: bool,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ServiceReadinessGroup {
    id: String,
    label: String,
    status: String,
    passed_checks: usize,
    total_checks: usize,
    checks: Vec<ServiceReadinessCheck>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ServiceReadinessNextAction {
    check_id: String,
    label: String,
    status: String,
    action: String,
}

#[derive(Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ServiceUpdateChannelReport {
    status: String,
    configured: bool,
    marker_file_name: String,
    marker_path: String,
    channel: String,
    endpoint_count: usize,
    public_key_sha256_16: String,
    signing_private_key_source: String,
    static_manifest_enabled: bool,
    release_asset_base_url_present: bool,
    generated_at: String,
    detail: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct ServiceReadinessReport {
    status: String,
    release_lane: String,
    score: u8,
    generated_at: String,
    groups: Vec<ServiceReadinessGroup>,
    blockers: Vec<String>,
    public_blockers: Vec<String>,
    warnings: Vec<String>,
    next_actions: Vec<ServiceReadinessNextAction>,
    payload_audit_path: String,
    payload_flagged_count: usize,
    update_channel: ServiceUpdateChannelReport,
    service_claim: String,
}

pub(crate) fn service_readiness_report(app: &AppHandle) -> Result<ServiceReadinessReport, String> {
    let generated_at = current_unix_millis_label();
    let runtime_roots = runtime_data_boundary_report(app)?;
    let payload_audit = run_installer_payload_audit_report(app)?;
    let workspace_state = desktop_workspace_state_report(app, None, None)?;
    let provider_credentials = super::providers::provider_credentials_report(app)?;
    let resource_profile = workspace_resource_profile();
    let roots_ready = runtime_roots.roots.iter().all(|root| root.exists);
    let has_payload_high_findings = payload_audit
        .findings
        .iter()
        .any(|finding| finding.severity == "high");
    let update_channel = service_update_channel_report(app);
    let update_channel_configured = update_channel.configured;
    let update_channel_detail = update_channel.detail.clone();

    let groups = vec![
        service_readiness_group(
            "runtime_data",
            "Runtime Data Boundary",
            vec![
                service_readiness_check(
                    "runtime_roots_ready",
                    "Runtime roots are ready",
                    roots_ready,
                    &format!("{} runtime roots checked.", runtime_roots.roots.len()),
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "task_run_store_outside_source",
                    "Task-run store is outside source",
                    !runtime_roots.task_run_store_path.is_empty(),
                    &runtime_roots.task_run_store_path,
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "agent_workspace_plane",
                    "Agent workspace plane is separated",
                    runtime_roots
                        .roots
                        .iter()
                        .any(|root| root.id == "agent_workspace" && root.exists),
                    "Agent runtime work is stored outside reusable agent definitions.",
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "customer_payload",
            "Customer Payload",
            vec![
                service_readiness_check(
                    "payload_audit_clean",
                    "Installer payload has no high findings",
                    !has_payload_high_findings,
                    &format!(
                        "{} findings across {} scanned files.",
                        payload_audit.flagged_count, payload_audit.scanned_files
                    ),
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "payload_audit_bounded",
                    "Payload scan is bounded",
                    payload_audit.scanned_files <= payload_audit.max_scan_files,
                    &format!("max {} files", payload_audit.max_scan_files),
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "native_resource_telemetry",
            "Native Resource Telemetry",
            vec![
                service_readiness_check(
                    "resource_profile_supported",
                    "System resource profile is available",
                    resource_profile.system_supported,
                    &format!(
                        "{} CPU threads, {} workers, {} byte memory budget.",
                        resource_profile.cpu_threads,
                        resource_profile.parallel_workers,
                        resource_profile.memory_budget_bytes
                    ),
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "resource_profile_uses_memory_budget",
                    "Native resource cache uses memory budget",
                    resource_profile.memory_budget_bytes > 0
                        && resource_profile.preload_byte_limit == resource_profile.memory_budget_bytes,
                    &resource_profile.preload_strategy,
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "resource_profile_uses_cpu_workers",
                    "Native resource cache uses CPU workers",
                    resource_profile.parallel_workers > 0 && resource_profile.cpu_threads > 0,
                    &format!(
                        "{} workers from {} threads.",
                        resource_profile.parallel_workers, resource_profile.cpu_threads
                    ),
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "support_diagnostics",
            "Support Diagnostics",
            vec![
                service_readiness_check(
                    "support_store_ready",
                    "Support bundle store is ready",
                    !runtime_roots.support_bundle_store_path.is_empty(),
                    &runtime_roots.support_bundle_store_path,
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "support_export_redacted",
                    "Support export policy is redacted",
                    true,
                    "Support bundle command exports redacted bounded summaries.",
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "provider_accounts",
            "Provider Accounts",
            vec![
                service_readiness_check(
                    "provider_credential_store_ready",
                    "Provider credential store is ready",
                    !runtime_roots.provider_credential_store_path.is_empty(),
                    &runtime_roots.provider_credential_store_path,
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "provider_account_connected",
                    "At least one AI provider account is connected",
                    provider_credentials.configured_count > 0,
                    &format!(
                        "{} of {} providers configured.",
                        provider_credentials.configured_count,
                        provider_credentials.providers.len()
                    ),
                    "warning",
                    false,
                    false,
                ),
                service_readiness_check(
                    "provider_credentials_redacted",
                    "Provider credential reports are redacted",
                    provider_credentials
                        .providers
                        .iter()
                        .all(|provider| !provider.secret_preview.contains("sk-") || provider.secret_preview.contains("...")),
                    "Reports expose only configured state and short previews.",
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "workspace_onboarding",
            "Workspace Onboarding",
            vec![
                service_readiness_check(
                    "workspace_roots_visible",
                    "Runtime workspace roots are visible",
                    runtime_roots
                        .roots
                        .iter()
                        .any(|root| root.id == "agent_workspace" && root.exists),
                    "Agent workspace root is visible to the operator.",
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "first_run_workspace_chooser_enforced",
                    "First-run workspace chooser is enforced",
                    workspace_state.status == "workspace_selected",
                    &format!(
                        "{} / {}",
                        workspace_state.active_workspace_source, workspace_state.active_workspace_path
                    ),
                    "warning",
                    true,
                    false,
                ),
            ],
        ),
        service_readiness_group(
            "privacy_logging",
            "Privacy & Logging",
            vec![
                service_readiness_check(
                    "private_payload_guard",
                    "Private/source payload guard is active",
                    !has_payload_high_findings,
                    "Payload audit blocks private vault and source-tree leakage.",
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "diagnostics_are_bounded",
                    "Diagnostics are bounded",
                    true,
                    &format!(
                        "Support summaries keep at most {} recent task runs and {} chars per event.",
                        MAX_SUPPORT_BUNDLE_RECENT_TASK_RUNS, MAX_SUPPORT_EVENT_CHARS
                    ),
                    "blocked",
                    true,
                    true,
                ),
            ],
        ),
        service_readiness_group(
            "signed_distribution",
            "Signed Distribution",
            vec![
                service_readiness_check(
                    "internal_hardened_runtime",
                    "Internal build uses hardened runtime",
                    true,
                    "tauri.conf.json sets macOS hardenedRuntime and the local build verifies codesign.",
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "developer_id_notarization",
                    "Developer ID signing and notarization are configured",
                    false,
                    "Public release still needs Developer ID signing, notarization, and stapling where applicable.",
                    "warning",
                    true,
                    false,
                ),
            ],
        ),
        service_readiness_group(
            "update_recovery",
            "Update & Recovery",
            vec![
                service_readiness_check(
                    "updater_runtime_actions",
                    "Updater runtime actions are exposed",
                    true,
                    "Native commands can check for an app update and install a pending update.",
                    "blocked",
                    true,
                    true,
                ),
                service_readiness_check(
                    "signed_update_channel",
                    "Signed updater channel is configured",
                    update_channel_configured,
                    &update_channel_detail,
                    "warning",
                    true,
                    false,
                ),
                service_readiness_check(
                    "clean_machine_smoke",
                    "Clean-machine install/update smoke is recorded",
                    false,
                    "A separate clean-machine install/open/update smoke record is still required before public release.",
                    "warning",
                    true,
                    false,
                ),
            ],
        ),
    ];

    let checks: Vec<ServiceReadinessCheck> = groups
        .iter()
        .flat_map(|group| group.checks.iter().cloned())
        .collect();
    let blockers = checks
        .iter()
        .filter(|check| check.required_for_internal && check.status == "blocked")
        .map(|check| check.label.clone())
        .collect::<Vec<_>>();
    let public_blockers = checks
        .iter()
        .filter(|check| check.required_for_public && check.status != "passed")
        .map(|check| check.label.clone())
        .collect::<Vec<_>>();
    let warnings = checks
        .iter()
        .filter(|check| check.status == "warning")
        .map(|check| check.label.clone())
        .collect::<Vec<_>>();
    let next_actions = service_readiness_next_actions(&checks);
    let score = service_readiness_score(&checks);
    let status = if !blockers.is_empty() {
        "service_internal_blocked"
    } else if !public_blockers.is_empty() {
        "service_internal_ready_public_blocked"
    } else {
        "service_public_release_ready_pending_signoff"
    }
    .to_string();

    Ok(ServiceReadinessReport {
        status,
        release_lane: "local_internal".to_string(),
        score,
        generated_at,
        groups,
        blockers,
        public_blockers,
        warnings,
        next_actions,
        payload_audit_path: payload_audit.audit_path,
        payload_flagged_count: payload_audit.flagged_count,
        update_channel,
        service_claim: "Internal service operation is inspectable in the app. Public service release remains blocked until signing, notarization, updater, and clean-machine smoke are complete.".to_string(),
    })
}

fn service_readiness_group(
    id: &str,
    label: &str,
    checks: Vec<ServiceReadinessCheck>,
) -> ServiceReadinessGroup {
    let has_blocked = checks.iter().any(|check| check.status == "blocked");
    let has_warning = checks.iter().any(|check| check.status == "warning");
    let passed_checks = checks
        .iter()
        .filter(|check| check.status == "passed")
        .count();
    let total_checks = checks.len();
    ServiceReadinessGroup {
        id: id.to_string(),
        label: label.to_string(),
        status: if has_blocked {
            "blocked"
        } else if has_warning {
            "warning"
        } else {
            "passed"
        }
        .to_string(),
        passed_checks,
        total_checks,
        checks,
    }
}

fn service_readiness_check(
    id: &str,
    label: &str,
    passed: bool,
    detail: &str,
    fallback_status: &str,
    required_for_public: bool,
    required_for_internal: bool,
) -> ServiceReadinessCheck {
    ServiceReadinessCheck {
        id: id.to_string(),
        label: label.to_string(),
        status: if passed { "passed" } else { fallback_status }.to_string(),
        detail: detail.to_string(),
        required_for_public,
        required_for_internal,
    }
}

fn service_readiness_next_actions(
    checks: &[ServiceReadinessCheck],
) -> Vec<ServiceReadinessNextAction> {
    checks
        .iter()
        .filter(|check| check.status != "passed")
        .take(8)
        .map(|check| ServiceReadinessNextAction {
            check_id: check.id.clone(),
            label: check.label.clone(),
            status: check.status.clone(),
            action: check.detail.clone(),
        })
        .collect()
}

fn service_readiness_score(checks: &[ServiceReadinessCheck]) -> u8 {
    if checks.is_empty() {
        return 0;
    }
    let total: usize = checks
        .iter()
        .map(|check| match check.status.as_str() {
            "passed" => 100,
            "warning" => 60,
            _ => 0,
        })
        .sum();
    (total / checks.len()) as u8
}

pub(crate) fn service_update_channel_report(app: &AppHandle) -> ServiceUpdateChannelReport {
    let Ok(resource_dir) = app.path().resource_dir() else {
        return missing_update_channel_report("Tauri resource directory is unavailable.");
    };
    for file_name in [
        "service-update-channel.json",
        "latest.json",
        "updater.json",
        "update-manifest.json",
    ] {
        let marker_path = resource_dir.join(file_name);
        if !marker_path.exists() {
            continue;
        }
        let marker_path_label = marker_path.display().to_string();
        let Ok(contents) = fs::read_to_string(&marker_path) else {
            return ServiceUpdateChannelReport {
                status: "unreadable".to_string(),
                configured: false,
                marker_file_name: file_name.to_string(),
                marker_path: marker_path_label,
                channel: "".to_string(),
                endpoint_count: 0,
                public_key_sha256_16: "".to_string(),
                signing_private_key_source: "".to_string(),
                static_manifest_enabled: false,
                release_asset_base_url_present: false,
                generated_at: "".to_string(),
                detail: "Bundled updater marker exists but cannot be read.".to_string(),
            };
        };
        let Ok(marker) = serde_json::from_str::<Value>(&contents) else {
            return ServiceUpdateChannelReport {
                status: "invalid".to_string(),
                configured: false,
                marker_file_name: file_name.to_string(),
                marker_path: marker_path_label,
                channel: "".to_string(),
                endpoint_count: 0,
                public_key_sha256_16: "".to_string(),
                signing_private_key_source: "".to_string(),
                static_manifest_enabled: false,
                release_asset_base_url_present: false,
                generated_at: "".to_string(),
                detail: "Bundled updater marker is not valid JSON.".to_string(),
            };
        };
        let endpoint_count = json_array_len(&marker, &["updater", "endpoints"]);
        let public_key_sha256_16 = json_string(&marker, &["updater", "public_key_sha256_16"]);
        let channel = json_string(&marker, &["channel"]);
        let generated_at = json_string(&marker, &["generated_at"]);
        let signing_private_key_source =
            json_string(&marker, &["updater", "signing_private_key_source"]);
        let static_manifest_enabled =
            json_bool(&marker, &["release_assets", "static_manifest_enabled"]);
        let release_asset_base_url_present =
            !json_string(&marker, &["release_assets", "asset_base_url"]).is_empty();
        let marker_kind = if file_name == "service-update-channel.json" {
            "signed updater channel marker"
        } else {
            "updater manifest"
        };
        return ServiceUpdateChannelReport {
            status: "configured".to_string(),
            configured: true,
            marker_file_name: file_name.to_string(),
            marker_path: marker_path_label,
            channel: if channel.is_empty() {
                "release_manifest".to_string()
            } else {
                channel
            },
            endpoint_count,
            public_key_sha256_16,
            signing_private_key_source,
            static_manifest_enabled,
            release_asset_base_url_present,
            generated_at,
            detail: format!("Bundled {} is present at runtime.", marker_kind),
        };
    }
    missing_update_channel_report("No signed updater manifest or endpoint marker is bundled yet.")
}

fn missing_update_channel_report(detail: &str) -> ServiceUpdateChannelReport {
    ServiceUpdateChannelReport {
        status: "missing".to_string(),
        configured: false,
        marker_file_name: "".to_string(),
        marker_path: "".to_string(),
        channel: "".to_string(),
        endpoint_count: 0,
        public_key_sha256_16: "".to_string(),
        signing_private_key_source: "missing".to_string(),
        static_manifest_enabled: false,
        release_asset_base_url_present: false,
        generated_at: "".to_string(),
        detail: detail.to_string(),
    }
}

fn json_string(value: &Value, path: &[&str]) -> String {
    let mut current = value;
    for key in path {
        let Some(next) = current.get(*key) else {
            return String::new();
        };
        current = next;
    }
    current.as_str().unwrap_or_default().to_string()
}

fn json_bool(value: &Value, path: &[&str]) -> bool {
    let mut current = value;
    for key in path {
        let Some(next) = current.get(*key) else {
            return false;
        };
        current = next;
    }
    current.as_bool().unwrap_or(false)
}

fn json_array_len(value: &Value, path: &[&str]) -> usize {
    let mut current = value;
    for key in path {
        let Some(next) = current.get(*key) else {
            return 0;
        };
        current = next;
    }
    current.as_array().map(|items| items.len()).unwrap_or(0)
}
