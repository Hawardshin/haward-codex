use serde::Serialize;

mod agent_factory;
mod app_shell;
mod cli;
mod decisions;
mod diagnostics;
mod native;
mod providers;
mod workspace;

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct NativeRuntimeFeatureMapReport {
    status: &'static str,
    schema_version: &'static str,
    source_layout: NativeRuntimeSourceLayoutReport,
    groups: Vec<NativeRuntimeFeatureGroupReport>,
    total_groups: usize,
    total_commands: usize,
    migration_notes: Vec<&'static str>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct NativeRuntimeSourceLayoutReport {
    root_module: &'static str,
    feature_root: &'static str,
    grouping_policy: &'static str,
    command_registration: &'static str,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct NativeRuntimeFeatureGroupReport {
    pub(crate) group_id: &'static str,
    pub(crate) label: &'static str,
    pub(crate) source_module: &'static str,
    pub(crate) role: &'static str,
    pub(crate) commands: Vec<NativeRuntimeFeatureCommandReport>,
    pub(crate) follow_up: Vec<&'static str>,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub(crate) struct NativeRuntimeFeatureCommandReport {
    pub(crate) command: &'static str,
    pub(crate) capability: &'static str,
    pub(crate) risk_boundary: &'static str,
}

pub(crate) fn command(
    command: &'static str,
    capability: &'static str,
    risk_boundary: &'static str,
) -> NativeRuntimeFeatureCommandReport {
    NativeRuntimeFeatureCommandReport {
        command,
        capability,
        risk_boundary,
    }
}

pub(crate) fn feature_map_report() -> NativeRuntimeFeatureMapReport {
    let groups = vec![
        app_shell::group(),
        cli::group(),
        native::group(),
        workspace::group(),
        providers::group(),
        diagnostics::group(),
        agent_factory::group(),
        decisions::group(),
    ];
    let total_commands = groups.iter().map(|group| group.commands.len()).sum();
    NativeRuntimeFeatureMapReport {
        status: "ready",
        schema_version: "rust-runtime-feature-map.v1",
        source_layout: NativeRuntimeSourceLayoutReport {
            root_module: "src-tauri/src/lib.rs",
            feature_root: "src-tauri/src/features/",
            grouping_policy: "Feature ownership is declared in one module per runtime capability group before large lib.rs helpers are moved.",
            command_registration: "Tauri commands remain registered once through generate_handler to avoid duplicate invoke handlers.",
        },
        total_groups: groups.len(),
        total_commands,
        groups,
        migration_notes: vec![
            "Move command wrappers into feature modules after each group has focused tests.",
            "Keep process, PTY, workspace path, credential, and data-store boundaries separate.",
            "Do not expose unrestricted shell execution while splitting the native runtime.",
        ],
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn runtime_feature_map_groups_commands_by_native_capability() {
        let report = feature_map_report();

        assert_eq!(report.status, "ready");
        assert!(report.total_groups >= 8);
        assert!(report.total_commands >= 40);
        assert!(report
            .groups
            .iter()
            .any(|group| group.group_id == "native-process-control"));
        assert!(report
            .groups
            .iter()
            .flat_map(|group| group.commands.iter())
            .any(|command| command.command == "run_native_pipe_probe"));
        assert_eq!(report.source_layout.feature_root, "src-tauri/src/features/");
    }
}
