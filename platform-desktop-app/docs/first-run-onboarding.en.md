# First-Run Onboarding Design

## Principles

First run prioritizes action over product explanation. After installation, the user should be able to open a workspace and see current state quickly.

The onboarding flow should:

- Ask only required questions first.
- Let optional capabilities be configured later.
- Explain permissions, file access, network behavior, and CLI execution at the moment they matter.
- Continue available work even when a user defers a choice.

## Screen 1: Start

Primary buttons:

- Open existing workspace
- Create new workspace
- Try demo

Secondary buttons:

- Developer setup
- Recent workspaces

The copy should stay short and describe what the user can see after opening a workspace.

## Screen 2: Workspace Boundary

Show the selected folder and clarify:

- Documents and config files that will be read
- Snapshots and indexes that will be generated
- Command execution scope
- Secrets and tokens are not auto-collected

## Screen 3: View Mode

The default selection is `user`.

Options:

- `user`: task and history oriented
- `developer`: settings, validation, and specs
- `superadmin_developer`: full platform operation and development

Keep explanations short and let users change this later.

## Screen 4: Readiness Scan

Required checks:

- Workspace readable
- Core folders and settings exist
- Snapshot can be generated

Optional checks:

- Git
- Python agent layer
- Node/Next monitor
- Guest CLI adapters on top of the platform
- Slack/Discord/Teams notifications
- Browser automation

Optional failures must not block the dashboard.

## Screen 5: Dashboard

The first dashboard shows:

- Active tasks
- Blocked questions
- Recent outputs
- Project list
- Start new task
- History

The user must be able to start work without understanding every internal platform artifact.

## Avoid

- Do not force every integration setup during first run.
- Do not fill the first screen with terminology-heavy explanation cards.
- Do not block the whole app because an optional CLI is missing.
- Do not expose raw developer configs on the user-mode first screen.
- Do not bundle real tokens, webhook URLs, or browser cookies into the installer.
