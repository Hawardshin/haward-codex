use serde::Serialize;

#[derive(Serialize)]
struct HealthStatus {
    status: &'static str,
    shell: &'static str,
    ui_source: &'static str,
}

#[tauri::command]
fn app_health() -> HealthStatus {
    HealthStatus {
        status: "ok",
        shell: "tauri",
        ui_source: "workspace-monitor",
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![app_health])
        .run(tauri::generate_context!())
        .expect("error while running Agent Workspace Platform desktop shell");
}

