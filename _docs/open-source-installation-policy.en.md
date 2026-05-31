# Open-Source Installation Policy

## Purpose

When mature open-source software fits the task and reduces maintenance cost, the agent may install and use it instead of only considering it. Installation must be reproducible, reversible, license-aware, and security-reviewed.

## Core Rules

- Consider installation when mature open source is a better fit than custom implementation.
- Before installing, check web search, official docs, repository activity, releases, license, and security signals.
- Python projects should normally use project-local virtual environments or project dependency files.
- Avoid global installs. If a global tool or Codex skill must be installed, record why, where it is installed, how to remove it, and request any required permission.
- Record the install command, dependency file, lock-file status, import/test verification, and rollback plan.
- After installation, run at least one relevant test, CLI check, or smoke test.
- If security or licensing is unclear, do not install until an alternative is found or the user confirms the risk.

## Installation Record Fields

Before installing an open-source candidate, record these fields in `agent-platform/configs/open-source/candidate-template.json` or the owning project docs.

- `install_needed`: whether installation is needed
- `installation_scope`: where it will be installed, such as `project`, `tool`, `adapter`, or `global`
- `install_command`: exact installation command
- `dependency_record_path`: tracked dependency file, lock file, or package manifest
- `security_review`: maintenance, vulnerability, provenance, or dependency-risk notes
- `license_review`: license compatibility and attribution obligations
- `rollback_plan`: removal path and recovery verification

## Python Default

- Record project dependencies in `pyproject.toml` or the project's existing package manager config.
- Use an isolated venv, temporary workspace, or project-local tool runner for experiments.
- Do not install directly into system Python or OS package-manager managed environments.
- After installing, verify behavior with `python -c "import <package>"`, unit tests, CLI help, or a smoke test.

## References

- [Python Packaging User Guide: pip and virtual environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
- [OpenSSF Scorecard](https://openssf.org/scorecard/)
- [CISA Open Source Software Security](https://www.cisa.gov/opensource)
- [CISA Secure by Demand Guide](https://www.cisa.gov/resources-tools/resources/secure-demand-guide)
