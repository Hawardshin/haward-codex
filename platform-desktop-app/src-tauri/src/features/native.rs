use super::{command, NativeRuntimeFeatureGroupReport};

pub(super) fn group() -> NativeRuntimeFeatureGroupReport {
    NativeRuntimeFeatureGroupReport {
        group_id: "native-process-control",
        label: "Native Process Control",
        source_module: "src-tauri/src/features/native.rs",
        role: "Owns terminal setup checks, OS pipe probes, bounded OS actions, PTY sessions, and clipboard operations.",
        commands: vec![
            command("check_runtime_terminal_setup", "Check shell command and working directory readiness", "PATH and workspace boundary"),
            command("run_native_pipe_probe", "Connect two commands with an OS stdout-to-stdin pipe", "argv-only bounded process graph"),
            command("run_native_os_action", "Open/reveal workspace paths or external terminal", "Allowlisted OS actions and workspace path guard"),
            command("start_native_pty_terminal", "Start native PTY terminal", "Workspace cwd and PTY cleanup guard"),
            command("poll_native_pty_terminal_session", "Poll PTY session", "Bounded output snapshot"),
            command("list_native_pty_terminal_sessions", "List PTY sessions", "Bounded output snapshots"),
            command("write_native_pty_terminal_input", "Write PTY input", "Input byte bound and finished-session guard"),
            command("resize_native_pty_terminal", "Resize PTY", "Normalized rows/cols"),
            command("cancel_native_pty_terminal", "Cancel PTY session", "Child process cleanup"),
            command("read_system_clipboard_text", "Read clipboard text", "Clipboard text only"),
            command("write_system_clipboard_text", "Write clipboard text", "Clipboard text only"),
        ],
        follow_up: vec![
            "Move PTY session structs into features/native/pty.rs.",
            "Move pipe graph helpers into features/native/pipes.rs.",
            "Keep unrestricted shell strings out of the native process layer.",
        ],
    }
}
