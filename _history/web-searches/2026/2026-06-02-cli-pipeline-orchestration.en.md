# Web Search Record: CLI Pipeline Orchestration

- Date: 2026-06-02
- Work mode: `governance`
- Request: Build a structure where one CLI action can run several internal processes and orchestrate multiple CLIs through pipes or similar mechanisms.

## Queries

- `Python subprocess Popen pipeline official documentation pipe stdout stdin`
- `Node.js child_process spawn pipe official documentation stdio`
- `Bash manual pipelines official documentation pipe`
- `OWASP command injection prevention cheat sheet command execution`

## Sources Checked

| Source | Type | What was checked | Plan impact |
| --- | --- | --- | --- |
| https://docs.python.org/3/library/subprocess.html | Official docs | Python's standard library covers child process creation, stdin/stdout/stderr pipes, timeouts, and argv-style args. | Process nodes require cwd, timeout, output bounds, and argv args. |
| https://nodejs.org/api/child_process.html | Official docs | Node child process APIs provide stream-based stdout/stderr/stdin and spawn-style execution. | The process graph contract should stay runtime-neutral for future TypeScript/Node or desktop/daemon implementations. |
| https://www.gnu.org/software/bash/manual/html_node/Pipelines.html | Official docs | Shell pipelines connect command stdout/stdin. | Preserve that meaning as explicit `pipes` instead of hidden shell strings. |
| https://cheatsheetseries.owasp.org/cheatsheets/OS_Command_Injection_Defense_Cheat_Sheet.html | Security guidance | Command injection prevention needs allowlists and careful argument handling. | Require adapter allowlists, argv args, shell disabled by default, and secret/output redaction controls. |
| `agent-platform/configs/integrations/cli-adapter-registry.json` | Internal evidence | The repository already defines CLI-neutral adapter boundaries and shell-string avoidance. | Add the pipeline graph contract above existing CLI adapters. |

## Weak Sources Ignored

- Generic shell pipeline examples from blogs were not used as design evidence because official docs are stronger.
- Stack Overflow/Reddit discussion signals were not needed because this task designs an execution contract, not a specific CLI bug fix.

## Plan Impact

- Add a process graph validator before implementing any runner.
- Exclude raw shell strings from the default path because they are harder to validate, cancel, and clean up.
- Keep pipeline validation separate from resource leak validation by adding `cli_pipeline_targets` in addition to `resource_check_targets`.

## Remaining Uncertainty

- The actual runner runtime still needs a later decision among Python `subprocess`, Node `child_process`, Go `os/exec`, Rust `std::process`, or a hybrid.
- Desktop execution needs separate OS permission and sandbox review during productization.
