use serde::Serialize;
use serde_json::Value;
use std::fs;
use std::path::PathBuf;
use tauri::{AppHandle, Manager};

use super::{command, NativeRuntimeFeatureGroupReport, NativeRuntimeFeatureMapReport};
use crate::{path_to_string, workspace_root};

#[derive(Serialize)]
pub(crate) struct HealthStatus {
    status: &'static str,
    shell: &'static str,
    ui_source: &'static str,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct InstallerShellRuntimeContractReport {
    status: String,
    source: String,
    contract_path: String,
    schema_version: String,
    name: String,
    purpose: String,
    boot_sequence_count: usize,
    enforcement_gate_count: usize,
    data_accumulation_target_count: usize,
    contract: Value,
}

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    // 런타임 기능 지도는 UI가 Rust command 위치를 설명할 때 쓰는 공개 계약이다.
    NativeRuntimeFeatureGroupReport {
        group_id: "app-shell",
        label: "App Shell",
        source_module: "src-tauri/src/features/app_shell.rs",
        role: "Launches the Tauri host, exposes health, and binds the installer shell runtime contract.",
        commands: vec![
            command(
                "app_health",
                "Desktop shell health check",
                "Read-only runtime status",
            ),
            command(
                "get_installer_shell_runtime_contract",
                "Bundled runtime contract inspection",
                "Reads bundled contract resource only",
            ),
            command(
                "get_rust_runtime_feature_map",
                "Feature-by-feature Rust runtime source map",
                "Read-only static capability inventory",
            ),
        ],
        follow_up: vec![
            "Move builder setup and invoke registration into an app_shell module after command modules are split.",
            "Keep invoke_handler registration single-pass to match Tauri v2 command registration rules.",
        ],
    }
}

#[tauri::command]
pub(crate) fn app_health() -> HealthStatus {
    // 설치형 앱이 뜬 직후 UI가 네이티브 브리지를 확인할 수 있는 가장 가벼운 명령이다.
    HealthStatus {
        status: "ok",
        shell: "tauri",
        ui_source: "workspace-monitor",
    }
}

#[tauri::command]
pub(crate) fn get_installer_shell_runtime_contract(
    app: AppHandle,
) -> Result<InstallerShellRuntimeContractReport, String> {
    let (contract_path, source) = resolve_installer_shell_runtime_contract_path(&app)?;
    let content = fs::read_to_string(&contract_path).map_err(|error| {
        format!(
            "Failed to read installer shell runtime contract at {}: {error}",
            path_to_string(&contract_path)
        )
    })?;
    let contract: Value = serde_json::from_str(&content)
        .map_err(|error| format!("Installer shell runtime contract is invalid JSON: {error}"))?;

    // UI에는 전체 계약과 함께 빠른 상태 카드에 필요한 요약값도 같이 내려준다.
    let schema_version = contract
        .get("schema_version")
        .and_then(Value::as_str)
        .unwrap_or("unknown")
        .to_string();
    let name = contract
        .get("name")
        .and_then(Value::as_str)
        .unwrap_or("installer-shell-runtime-contract")
        .to_string();
    let purpose = contract
        .get("purpose")
        .and_then(Value::as_str)
        .unwrap_or("")
        .to_string();
    let boot_sequence_count = contract
        .get("shell_boot_sequence")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);
    let enforcement_gate_count = contract
        .get("enforcement_gates")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);
    let data_accumulation_target_count = contract
        .get("data_accumulation_targets")
        .and_then(Value::as_array)
        .map(Vec::len)
        .unwrap_or(0);

    Ok(InstallerShellRuntimeContractReport {
        status: "ready".to_string(),
        source,
        contract_path: path_to_string(&contract_path),
        schema_version,
        name,
        purpose,
        boot_sequence_count,
        enforcement_gate_count,
        data_accumulation_target_count,
        contract,
    })
}

#[tauri::command]
pub(crate) fn get_rust_runtime_feature_map() -> NativeRuntimeFeatureMapReport {
    // 실제 command 등록과 source map 검사가 같은 feature tree를 보게 유지한다.
    super::feature_map_report()
}

fn resolve_installer_shell_runtime_contract_path(
    app: &AppHandle,
) -> Result<(PathBuf, String), String> {
    // 패키징된 앱에서는 bundled resource가 우선이다. 개발 중에는 workspace source로 fallback한다.
    if let Ok(resource_dir) = app.path().resource_dir() {
        let candidate = resource_dir
            .join("runtime-contracts")
            .join("installer-shell-runtime-contract.json");
        if candidate.exists() {
            return Ok((candidate, "bundle_resource".to_string()));
        }
    }

    let root = workspace_root()?;
    let candidate = root
        .join("platform-desktop-app")
        .join("runtime-contracts")
        .join("installer-shell-runtime-contract.json");
    if candidate.exists() {
        return Ok((candidate, "workspace_source".to_string()));
    }

    Err(
        "Installer shell runtime contract was not found in bundled resources or workspace source."
            .to_string(),
    )
}
