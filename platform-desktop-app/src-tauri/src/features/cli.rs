use super::{command, NativeRuntimeFeatureGroupReport};

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    NativeRuntimeFeatureGroupReport {
        group_id: "cli-orchestration",
        label: "CLI Orchestration",
        source_module: "src-tauri/src/features/cli.rs",
        role: "Owns guest CLI adapter readiness, sessions, stdin, task pipelines, and process cleanup boundaries.",
        commands: vec![
            command("list_cli_adapters", "List configured guest adapters", "PATH and command metadata only"),
            command("run_cli_adapter_health", "Run one adapter health probe", "Bounded process execution"),
            command("run_all_cli_adapter_health", "Run all adapter health probes", "Bounded process execution"),
            command("list_cli_task_pipeline_presets", "List task pipeline presets", "Static preset metadata"),
            command("start_cli_adapter_session", "Start one interactive CLI lane", "Workspace cwd, bounded output, process group cleanup"),
            command("start_cli_task_pipeline", "Start a multi-lane CLI task graph", "Lane fan-out with merge-gate metadata"),
            command("poll_cli_adapter_session", "Poll one active CLI session", "Bounded output snapshot"),
            command("list_cli_adapter_sessions", "Poll all active CLI sessions", "Bounded output snapshots"),
            command("write_cli_adapter_stdin", "Write stdin to a running CLI lane", "Input byte bound and finished-session guard"),
            command("send_cli_adapter_defer_message", "Send defer message to one lane", "Decision deferral only"),
            command("defer_all_cli_adapter_questions", "Defer all active lane questions", "Decision deferral only"),
            command("cancel_cli_adapter_session", "Cancel one CLI lane", "Process group cleanup"),
        ],
        follow_up: vec![
            "Move CLI session structs and helpers into features/cli/ after store boundary tests are added.",
            "Keep adapter installation optional and report missing commands as capability_missing.",
        ],
    }
}
