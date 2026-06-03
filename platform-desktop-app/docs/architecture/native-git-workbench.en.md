# Native Git Workbench

## Decision

The installable desktop app provides a Native Git Workbench that runs the system `git` inside the selected workspace. Users choose a workspace first, then manage branches, changes, commits, pull, and push from the same desktop surface instead of scattering Git input across setup forms.

## Scope

- `get_desktop_git_status`: reads the Git root, branch, upstream, ahead/behind counts, changed files, remotes, per-file additions/deletions, bounded diff previews, recent history, and stash list for the selected workspace.
- `run_desktop_git_action`: allows `refresh`, `fetch`, `create_branch`, `commit_all`, `commit_selected`, `discard_selected`, `stash_all`, `stash_selected`, `apply_stash`, `pop_stash`, `drop_stash`, `pull_ff`, and `push`.
- Commands run from the Git root under the selected workspace and return redacted bounded command output.
- Commit messages, branch names, selected file paths, and stash references are length-limited and reject risky control characters.

## Credential / SSH Boundary

The app does not inspect or store SSH private keys, tokens, cookies, or credential-helper stores. Private remote authentication stays with the user's OS, Git, and SSH configuration. When authentication is missing, the workbench surfaces bounded Git command output as a `capability_missing` or authentication failure state.

These future steps require a separate installation and security audit:

- changing credential-helper settings
- generating, copying, uploading, or auto-registering SSH keys
- storing or injecting tokens
- handling secrets embedded in remote URLs

## User Experience

Native Git Workbench should behave like a GitHub Desktop-style workbench: Changes, History, and Stash stay in the same Git surface. Changes provides per-file include checkboxes and selected-file diff previews, while the commit box distinguishes selected-file commit from all-change commit. Stash provides selected/all stash plus apply/pop/drop, but apply/pop/drop run only against the explicitly selected stash reference. Users can still run direct `git` commands in the bottom Work Console, while the Git buttons shorten common, repeatable actions safely.

Diff previews are bounded per file. Large diffs, binaries, and preview-limited files degrade to a preview-unavailable state without blocking overall Git status reading or commit actions.

Discard runs only against selected files. Tracked files are restored with `git restore --staged --worktree`, and untracked files are removed separately with `git clean -f -d`. The renderer confirms destructive actions, and the backend accepts only repository-relative paths.
