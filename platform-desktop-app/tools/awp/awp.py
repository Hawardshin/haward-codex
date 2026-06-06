#!/usr/bin/env python3
"""Lightweight Agent Workspace Platform companion CLI."""

from __future__ import annotations

import argparse
import json
import os
import platform
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Any


VERSION = "0.1.0"
PROTECTED_PARTS = {"_private", "outputs"}
CLI_ADAPTERS = [
    ("codex-cli", "codex"),
    ("claude-code-cli", "claude"),
    ("gemini-cli", "gemini"),
    ("opencode-cli", "opencode"),
    ("claw-code-cli", "claw"),
]
MAX_OUTPUT_BYTES = 8_000
LAUNCH_TIMEOUT_SECONDS = 5


class CliError(Exception):
    pass


def workspace_root() -> Path:
    configured = os.environ.get("AGENT_WORKSPACE_ROOT", "").strip()
    if configured:
        root = Path(configured).expanduser().resolve(strict=True)
        ensure_not_protected(root)
        return root

    current = Path.cwd().resolve()
    for candidate in [current, *current.parents]:
        if (candidate / "AGENTS.md").exists():
            ensure_not_protected(candidate)
            return candidate
    ensure_not_protected(current)
    return current


def ensure_not_protected(path: Path) -> None:
    if any(part in PROTECTED_PARTS for part in path.parts):
        raise CliError("Path points to a protected local-only directory.")


def workspace_path(value: str | None, *, require_dir: bool = False) -> Path:
    root = workspace_root()
    raw = Path(value).expanduser() if value else root
    candidate = raw if raw.is_absolute() else root / raw
    resolved = candidate.resolve(strict=True)
    try:
        relative = resolved.relative_to(root)
    except ValueError as exc:
        raise CliError("Path is outside the selected workspace root.") from exc
    if any(part in PROTECTED_PARTS for part in relative.parts):
        raise CliError("Path points to a protected local-only directory.")
    if require_dir and not resolved.is_dir():
        raise CliError("Target must be a directory.")
    return resolved


def bounded_text(value: bytes) -> str:
    return value[:MAX_OUTPUT_BYTES].decode("utf-8", errors="replace").strip()


def run_launcher(command: str, args: list[str], cwd: Path | None = None) -> dict[str, Any]:
    resolved = shutil.which(command)
    if not resolved:
        raise CliError(f"Command was not found on PATH: {command}")
    started_command = [resolved, *args]
    try:
        completed = subprocess.run(
            started_command,
            cwd=str(cwd) if cwd else None,
            stdin=subprocess.DEVNULL,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=LAUNCH_TIMEOUT_SECONDS,
            shell=False,
            check=False,
        )
    except subprocess.TimeoutExpired as exc:
        return {
            "status": "timed_out",
            "command": resolved,
            "args": args,
            "exitCode": None,
            "stdout": bounded_text(exc.stdout or b""),
            "stderr": bounded_text(exc.stderr or b""),
        }
    return {
        "status": "passed" if completed.returncode == 0 else "failed",
        "command": resolved,
        "args": args,
        "exitCode": completed.returncode,
        "stdout": bounded_text(completed.stdout),
        "stderr": bounded_text(completed.stderr),
    }


def action_result(action: str, target: Path, method: str, process: dict[str, Any] | None = None) -> dict[str, Any]:
    process = process or {}
    return {
        "status": "opened" if process.get("status", "passed") == "passed" else process.get("status"),
        "action": action,
        "method": method,
        "operatingSystem": platform.system().lower(),
        "targetPath": str(target),
        "workspaceRoot": str(workspace_root()),
        "command": process.get("command"),
        "args": process.get("args", []),
        "exitCode": process.get("exitCode", 0),
        "stdout": process.get("stdout", ""),
        "stderr": process.get("stderr", ""),
        "bounded": True,
    }


def open_path_command(args: argparse.Namespace) -> int:
    target = workspace_path(args.path)
    system = platform.system()
    if system == "Darwin":
        result = action_result("open", target, "macos_open", run_launcher("open", [str(target)]))
    elif system == "Windows":
        os.startfile(str(target))  # type: ignore[attr-defined]
        result = action_result("open", target, "windows_startfile")
    else:
        result = action_result("open", target, "linux_xdg_open", run_launcher("xdg-open", [str(target)]))
    print_result(result, args.json)
    return 0 if result["status"] == "opened" else 1


def reveal_command(args: argparse.Namespace) -> int:
    target = workspace_path(args.path)
    system = platform.system()
    if system == "Darwin":
        result = action_result("reveal", target, "macos_open_reveal", run_launcher("open", ["-R", str(target)]))
    elif system == "Windows":
        result = action_result("reveal", target, "windows_explorer_select", run_launcher("explorer", [f"/select,{target}"]))
    else:
        parent = target if target.is_dir() else target.parent
        result = action_result("reveal", target, "linux_xdg_open_parent", run_launcher("xdg-open", [str(parent)]))
    print_result(result, args.json)
    return 0 if result["status"] == "opened" else 1


def terminal_command(args: argparse.Namespace) -> int:
    target = workspace_path(args.path, require_dir=True)
    system = platform.system()
    if system == "Darwin":
        result = action_result(
            "terminal",
            target,
            "macos_open_terminal_app",
            run_launcher("open", ["-a", "Terminal", str(target)], cwd=target),
        )
    elif system == "Windows":
        result = action_result(
            "terminal",
            target,
            "windows_cmd_start_terminal",
            run_launcher("cmd", ["/C", "start", "", "cmd", "/K", "cd", "/D", str(target)], cwd=target),
        )
    else:
        result = linux_terminal_result(target)
    print_result(result, args.json)
    return 0 if result["status"] == "opened" else 1


def linux_terminal_result(target: Path) -> dict[str, Any]:
    candidates = [
        ("xdg-terminal-exec", [str(target)], "linux_xdg_terminal_exec"),
        ("gnome-terminal", [f"--working-directory={target}"], "linux_gnome_terminal"),
        ("konsole", ["--workdir", str(target)], "linux_konsole"),
        ("xfce4-terminal", [f"--working-directory={target}"], "linux_xfce4_terminal"),
    ]
    for command, args, method in candidates:
        if shutil.which(command):
            return action_result("terminal", target, method, run_launcher(command, args, cwd=target))
    raise CliError("No supported Linux terminal launcher was found on PATH.")


def adapter_report(command: str) -> dict[str, Any]:
    resolved = shutil.which(command)
    if not resolved:
        return {"command": command, "available": False, "resolvedPath": None, "version": None}
    version = ""
    for version_args in (["--version"], ["version"], ["-v"]):
        try:
            completed = subprocess.run(
                [resolved, *version_args],
                stdin=subprocess.DEVNULL,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                timeout=2.5,
                shell=False,
                check=False,
            )
        except (OSError, subprocess.TimeoutExpired):
            continue
        output = bounded_text(completed.stdout) or bounded_text(completed.stderr)
        if output:
            version = output.splitlines()[0]
            break
    return {"command": command, "available": True, "resolvedPath": resolved, "version": version}


def cli_check_command(args: argparse.Namespace) -> int:
    adapters = [
        {"adapterId": adapter_id, **adapter_report(command)}
        for adapter_id, command in CLI_ADAPTERS
    ]
    result = {
        "status": "ready" if any(adapter["available"] for adapter in adapters) else "capability_missing",
        "workspaceRoot": str(workspace_root()),
        "adapters": adapters,
    }
    print_result(result, args.json)
    return 0


def doctor_command(args: argparse.Namespace) -> int:
    root = workspace_root()
    bin_dir = Path.home() / ".local" / "bin"
    adapters = [
        {"adapterId": adapter_id, **adapter_report(command)}
        for adapter_id, command in CLI_ADAPTERS
    ]
    result = {
        "status": "ready",
        "version": VERSION,
        "workspaceRoot": str(root),
        "python": sys.executable,
        "platform": platform.platform(),
        "userBinDir": str(bin_dir),
        "userBinOnPath": str(bin_dir) in os.environ.get("PATH", "").split(os.pathsep),
        "protectedDirs": sorted(PROTECTED_PARTS),
        "availableCliAdapters": sum(1 for adapter in adapters if adapter["available"]),
        "adapters": adapters,
    }
    print_result(result, args.json)
    return 0


def print_result(result: dict[str, Any], as_json: bool) -> None:
    if as_json:
        print(json.dumps(result, ensure_ascii=False, indent=2))
        return
    print(f"status: {result.get('status')}")
    for key in ["action", "method", "targetPath", "workspaceRoot", "command", "exitCode"]:
        if result.get(key) not in (None, ""):
            print(f"{key}: {result[key]}")
    if "availableCliAdapters" in result:
        print(f"availableCliAdapters: {result['availableCliAdapters']}")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(prog="awp", description="Lightweight Agent Workspace Platform CLI")
    parser.add_argument("--version", action="version", version=f"awp {VERSION}")
    subcommands = parser.add_subparsers(dest="command", required=True)

    doctor = subcommands.add_parser("doctor", help="Check workspace and optional CLI adapters")
    doctor.add_argument("--json", action="store_true", help="Print JSON output")
    doctor.set_defaults(func=doctor_command)

    cli_check = subcommands.add_parser("cli-check", help="Check optional AI CLI adapter commands")
    cli_check.add_argument("--json", action="store_true", help="Print JSON output")
    cli_check.set_defaults(func=cli_check_command)

    open_parser = subcommands.add_parser("open", help="Open a workspace path with the OS default app")
    open_parser.add_argument("path", nargs="?", help="Workspace-relative path; defaults to workspace root")
    open_parser.add_argument("--json", action="store_true", help="Print JSON output")
    open_parser.set_defaults(func=open_path_command)

    reveal_parser = subcommands.add_parser("reveal", help="Reveal a workspace path in the OS file manager")
    reveal_parser.add_argument("path", nargs="?", help="Workspace-relative path; defaults to workspace root")
    reveal_parser.add_argument("--json", action="store_true", help="Print JSON output")
    reveal_parser.set_defaults(func=reveal_command)

    terminal = subcommands.add_parser("terminal", help="Open an external terminal at a workspace directory")
    terminal.add_argument("path", nargs="?", help="Workspace-relative directory; defaults to workspace root")
    terminal.add_argument("--json", action="store_true", help="Print JSON output")
    terminal.set_defaults(func=terminal_command)
    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    try:
        return int(args.func(args))
    except CliError as exc:
        print(f"awp: {exc}", file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
