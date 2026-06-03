# Web Search: Deferred Native Git, Clipboard QA, PTY Decision

## Queries

- `Tauri v2 command Rust invoke official documentation`
- `git official documentation status branch commit pull push command porcelain`
- `xterm.js official documentation fit addon terminal web frontend`
- `portable-pty Rust crate documentation pseudo terminal cross platform`
- `site:v2.tauri.app Tauri v2 invoke command Rust documentation`
- `git branch official documentation git-scm`
- `git commit official documentation git-scm`
- `git pull official documentation git-scm`

## Checked Sources

- Tauri v2 Calling Rust from the Frontend: https://v2.tauri.app/develop/calling-rust/
- Git status docs: https://git-scm.com/docs/git-status
- Git commit docs: https://git-scm.com/docs/git-commit
- Git pull docs: https://git-scm.com/docs/git-pull
- Git push docs: https://git-scm.com/docs/git-push
- Git switch docs: https://git-scm.com/docs/git-switch
- xterm.js docs: https://xtermjs.org/docs/
- portable-pty docs: https://docs.rs/portable-pty/latest/portable_pty/

## Plan Impact

- Tauri command pattern supports adding Rust command endpoints and frontend invocation.
- Git official docs support using system `git` commands for status, commit, pull, push, and branch switch/create behavior.
- xterm.js and portable-pty were treated as possible PTY extension references, but the slice kept the existing pipe-first CLI supervisor as product default because adopting PTY requires dependency/security/resource audit.

## Weak Sources Ignored

- Non-official blog summaries and generic terminal UI examples were not used for implementation decisions.
