use super::{command, NativeRuntimeFeatureGroupReport};

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    NativeRuntimeFeatureGroupReport {
        group_id: "workspace-host",
        label: "Workspace Host",
        source_module: "src-tauri/src/features/workspace.rs",
        role: "Owns selected workspace roots, source file access, bounded OS cache, and native Git operations.",
        commands: vec![
            command("get_desktop_workspace_state", "Read active workspace state", "Workspace state store"),
            command("set_desktop_workspace_path", "Set active workspace path", "Workspace path guard and cache invalidation"),
            command("choose_desktop_workspace_folder", "Pick workspace folder natively", "Tauri dialog selection"),
            command("clone_desktop_workspace", "Clone a workspace repository", "Bounded git clone"),
            command("get_desktop_git_status", "Read native Git status", "Workspace repository only"),
            command("run_desktop_git_action", "Run bounded Git action", "Allowlisted git operations"),
            command("warm_workspace_os_resources", "Warm source cache in background", "Bounded workspace scan"),
            command("prepare_workspace_os_resources", "Prepare source cache foreground", "Bounded workspace scan and preload"),
            command("list_workspace_text_files", "List text source files", "Workspace path guard"),
            command("read_workspace_text_file", "Read one text source file", "Workspace path guard and max file size"),
            command("write_workspace_text_file", "Write one text source file", "Workspace path guard and backup"),
            command("get_desktop_resource_snapshot", "Sample process and cache resource telemetry", "Read-only process/system metrics"),
        ],
        follow_up: vec![
            "Move workspace path guards into features/workspace/paths.rs.",
            "Move cache code into features/workspace/cache.rs.",
            "Move Git operations into features/workspace/git.rs.",
        ],
    }
}
