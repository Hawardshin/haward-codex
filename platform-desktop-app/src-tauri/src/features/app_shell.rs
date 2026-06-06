use super::{command, NativeRuntimeFeatureGroupReport};

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
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
