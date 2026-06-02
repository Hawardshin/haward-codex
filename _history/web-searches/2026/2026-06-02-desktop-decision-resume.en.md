# Web Search Record: Desktop Decision Resume

- Date: 2026-06-02
- Work: Implement a Desktop flow that resumes a linked active CLI session from a deferred human decision answer
- Purpose: Check current references for HITL pause/decide/resume patterns and Tauri shared state/stdin behavior

## Queries

- `Tauri v2 command State shared state Rust official docs`
- `human in the loop agent resume after user approval CLI session stdin orchestration`
- `Tauri v2 shell plugin permissions subprocess stdin stdout official docs`
- `AI agent decision inbox resume workflow human approval`

## Checked Sources

- Tauri `State` Rust docs: https://docs.rs/tauri/latest/tauri/struct.State.html
- Tauri shell/stdin permission reference: https://v2.tauri.app/reference/javascript/shell/
- LangChain HITL docs: https://docs.langchain.com/oss/python/langchain/human-in-the-loop
- LangChain frontend HITL docs: https://docs.langchain.com/oss/python/langchain/frontend/human-in-the-loop
- RunAgents approval timeline product signal: https://runagents.io/
- Nuvrail approval/audit product signal: https://nuvrail.com/

## Weak Sources Ignored

- Reddit/product marketing pages were treated only as signals for approval UX and audit trail needs.
- Unofficial Tauri subprocess guides were treated only as implementation-signal material; the current repository Rust code and official Tauri material remain the command-contract basis.

## Plan Impact

- Do not make saving an answer automatically resume work; expose resume only as an explicit user action.
- Answer-and-resume should operate only when a decision carries linked session metadata.
- If the session is missing, finished, or lacks stdin, preserve the saved answer and return resume status/detail to the UI.
- Reuse the existing bounded pipe session stdin path without installing shell plugin or PTY dependencies.

## Uncertainty

- Rust/Cargo is missing in the current environment, so direct Tauri Rust compilation is not verified.
- Actual CLI prompt/approval protocols vary by provider; this implementation uses the minimal contract of sending the user's free-form answer to session stdin.
