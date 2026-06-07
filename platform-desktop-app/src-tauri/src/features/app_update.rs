use serde::Serialize;
use serde_json::Value;
use std::sync::Mutex;
use tauri::{AppHandle, State};
use tauri_plugin_updater::UpdaterExt;

use super::{command, NativeRuntimeFeatureGroupReport};

#[derive(Default)]
pub(crate) struct PendingAppUpdate(Mutex<Option<tauri_plugin_updater::Update>>);

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct AppUpdateCheckReport {
    status: String,
    update_available: bool,
    current_version: String,
    version: String,
    date: String,
    body: String,
    target: String,
    download_url: String,
    signature_present: bool,
    raw_json: Value,
    detail: String,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct AppUpdateInstallReport {
    status: String,
    installed: bool,
    restarted: bool,
    downloaded_bytes: u64,
    content_length: Option<u64>,
    detail: String,
}

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    // 업데이트 기능은 공개 배포 게이트와 연결되므로 런타임 feature map에 별도 그룹으로 노출한다.
    NativeRuntimeFeatureGroupReport {
        group_id: "app-update-recovery",
        label: "App Update & Recovery",
        source_module: "src-tauri/src/features/app_update.rs",
        role: "Owns Tauri updater check/install commands and pending update state.",
        commands: vec![
            command("check_app_update", "Check app update availability", "Signed updater endpoint"),
            command("install_app_update", "Install pending app update", "Signed updater artifact and app restart boundary"),
        ],
        follow_up: vec![
            "Keep public updater credentials outside source and validate them through release preflight.",
            "Keep app restart explicit so users can inspect update status before applying it.",
        ],
    }
}

#[tauri::command]
pub(crate) async fn check_app_update(
    app: AppHandle,
    pending_update: State<'_, PendingAppUpdate>,
) -> Result<AppUpdateCheckReport, String> {
    match app.updater() {
        Ok(updater) => match updater.check().await {
            Ok(Some(update)) => {
                let report = app_update_check_report("update_available", true, &update);
                // install 명령은 사용자가 확인한 동일 업데이트만 적용하도록 check 결과를 보관한다.
                let mut pending = pending_update
                    .0
                    .lock()
                    .map_err(|_| "pending update state is unavailable".to_string())?;
                *pending = Some(update);
                Ok(report)
            }
            Ok(None) => {
                let package_version = app.package_info().version.to_string();
                // 최신 상태가 확인되면 오래된 pending update를 명시적으로 비운다.
                let mut pending = pending_update
                    .0
                    .lock()
                    .map_err(|_| "pending update state is unavailable".to_string())?;
                *pending = None;
                Ok(AppUpdateCheckReport {
                    status: "up_to_date".to_string(),
                    update_available: false,
                    current_version: package_version.clone(),
                    version: package_version,
                    date: String::new(),
                    body: String::new(),
                    target: String::new(),
                    download_url: String::new(),
                    signature_present: false,
                    raw_json: Value::Null,
                    detail: "No update is available from the configured updater endpoint."
                        .to_string(),
                })
            }
            Err(error) => {
                // 실패한 check 뒤에 이전 업데이트를 설치하지 않도록 pending 상태를 제거한다.
                let mut pending = pending_update
                    .0
                    .lock()
                    .map_err(|_| "pending update state is unavailable".to_string())?;
                *pending = None;
                Ok(app_update_unavailable_report(&format!(
                    "Updater check failed: {error}"
                )))
            }
        },
        Err(error) => Ok(app_update_unavailable_report(&format!(
            "Updater is not configured for this build: {error}"
        ))),
    }
}

#[tauri::command]
pub(crate) async fn install_app_update(
    app: AppHandle,
    pending_update: State<'_, PendingAppUpdate>,
    restart: Option<bool>,
) -> Result<AppUpdateInstallReport, String> {
    // 다운로드 중에는 상태 lock을 잡지 않도록 pending update를 먼저 꺼낸다.
    let update = {
        let mut pending = pending_update
            .0
            .lock()
            .map_err(|_| "pending update state is unavailable".to_string())?;
        pending.take()
    };
    let Some(update) = update else {
        return Ok(AppUpdateInstallReport {
            status: "no_pending_update".to_string(),
            installed: false,
            restarted: false,
            downloaded_bytes: 0,
            content_length: None,
            detail: "Run an update check before installing.".to_string(),
        });
    };

    let mut downloaded_bytes = 0_u64;
    let mut content_length = None;
    // 진행률은 UI가 설치 상태를 설명할 수 있도록 누적 byte와 content length만 기록한다.
    if let Err(error) = update
        .download_and_install(
            |chunk_length, next_content_length| {
                downloaded_bytes = downloaded_bytes.saturating_add(chunk_length as u64);
                if next_content_length.is_some() {
                    content_length = next_content_length;
                }
            },
            || {},
        )
        .await
    {
        return Ok(AppUpdateInstallReport {
            status: "install_failed".to_string(),
            installed: false,
            restarted: false,
            downloaded_bytes,
            content_length,
            detail: format!("Updater install failed: {error}"),
        });
    }

    let restart_requested = restart.unwrap_or(false);
    if restart_requested {
        // restart는 호출자가 명시한 경우에만 실행한다. 기본값은 설치 후 상태를 먼저 보여주는 흐름이다.
        app.restart();
    }

    Ok(AppUpdateInstallReport {
        status: "installed".to_string(),
        installed: true,
        restarted: restart_requested,
        downloaded_bytes,
        content_length,
        detail: if restart_requested {
            "Update was downloaded and installed. App restart was requested.".to_string()
        } else {
            "Update was downloaded and installed. Restart the app to finish applying it."
                .to_string()
        },
    })
}

fn app_update_check_report(
    status: &str,
    update_available: bool,
    update: &tauri_plugin_updater::Update,
) -> AppUpdateCheckReport {
    // Tauri updater의 원본 metadata를 보존해 진단 화면에서 endpoint 응답을 확인할 수 있게 한다.
    AppUpdateCheckReport {
        status: status.to_string(),
        update_available,
        current_version: update.current_version.clone(),
        version: update.version.clone(),
        date: update.date.map(|date| date.to_string()).unwrap_or_default(),
        body: update.body.clone().unwrap_or_default(),
        target: update.target.clone(),
        download_url: update.download_url.to_string(),
        signature_present: !update.signature.trim().is_empty(),
        raw_json: update.raw_json.clone(),
        detail: format!(
            "Update {} is available for target {}.",
            update.version, update.target
        ),
    }
}

fn app_update_unavailable_report(detail: &str) -> AppUpdateCheckReport {
    // updater가 설정되지 않은 internal build도 전체 앱 readiness를 막지 않도록 보고서로만 반환한다.
    AppUpdateCheckReport {
        status: "updater_unavailable".to_string(),
        update_available: false,
        current_version: String::new(),
        version: String::new(),
        date: String::new(),
        body: String::new(),
        target: String::new(),
        download_url: String::new(),
        signature_present: false,
        raw_json: Value::Null,
        detail: detail.to_string(),
    }
}
