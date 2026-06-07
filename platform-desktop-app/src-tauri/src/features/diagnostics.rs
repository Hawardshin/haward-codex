use super::{command, NativeRuntimeFeatureGroupReport};

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    NativeRuntimeFeatureGroupReport {
        group_id: "diagnostics-and-data",
        label: "Diagnostics and Data",
        source_module: "src-tauri/src/features/diagnostics.rs",
        role: "Owns runtime data boundaries, accumulated data, installer payload audit, support bundle, and service readiness.",
        commands: vec![
            command("list_runtime_data_roots", "List runtime data roots", "App data/log/config boundaries"),
            command("get_accumulated_data_overview", "Read accumulated data overview", "Bounded data-store scan"),
            command("run_installer_payload_audit", "Audit installer payload", "Bundle/source leakage scan"),
            command("create_support_diagnostic_bundle", "Create support diagnostic bundle", "Redacted bounded export"),
            command("get_service_readiness_report", "Generate service readiness report", "Read-only readiness evaluation"),
            command("get_desktop_preferences", "Read desktop preferences", "App config file"),
            command("save_desktop_preferences", "Save desktop preferences", "Normalized app config file"),
            command("list_cli_task_run_records", "List task-run records", "Runtime task-run store"),
            command("read_cli_task_run_record", "Read one task-run record", "Runtime task-run store"),
            command("prune_cli_task_run_records", "Prune task-run records", "Retention limit"),
        ],
        follow_up: vec![
            "Keep service readiness implementation in features/service_readiness.rs while support bundle export remains in lib.rs.",
            "Keep diagnostic export redacted and bounded.",
        ],
    }
}
