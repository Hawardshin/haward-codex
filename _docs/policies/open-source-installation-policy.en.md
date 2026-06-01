# Open-Source Installation Policy

## Purpose

When mature open-source software fits the task and reduces maintenance cost, the agent may install and use it instead of only considering it. Installation must be reproducible, reversible, license-aware, and security-reviewed.

## Core Rules

- Consider installation when mature open source is a better fit than custom implementation.
- Before installing, check web search, official docs, repository activity, releases, license, and security signals.
- Python projects should normally use project-local virtual environments or project dependency files.
- Avoid global installs. If a global tool or Codex skill must be installed, record why, where it is installed, how to remove it, and request any required permission.
- Record the install command, dependency file, lock-file status, import/test verification, and rollback plan.
- Record every actual install, upgrade, removal, or global configuration change in `_ops/installations/registry.json` and `_history/installations/YYYY/`.
- After installation, run at least one relevant test, CLI check, or smoke test.
- If security or licensing is unclear, do not install until an alternative is found or the user confirms the risk.
- Do not report an installation as complete in the final response without an installation record.

## Installation Record Fields

Before installing an open-source candidate, record these fields in `agent-platform/configs/open-source/candidate-template.json` or the owning project docs.

- `install_needed`: whether installation is needed
- `installation_scope`: where it will be installed, such as `project`, `tool`, `adapter`, or `global`
- `install_command`: exact installation command
- `dependency_record_path`: tracked dependency file, lock file, or package manifest
- `installation_record_path`: detailed installation record under `_history/installations/YYYY/`
- `environment_path`: actual install location such as `.venv`, tool-local runtime, or global path
- `version_or_lock_status`: pin, range, lock file, SBOM, or not applicable
- `post_install_verification`: import, CLI, test, smoke test, or equivalent verification
- `security_review`: maintenance, vulnerability, provenance, or dependency-risk notes
- `license_review`: license compatibility and attribution obligations
- `rollback_plan`: removal path and recovery verification

## Installation Audit Records

- Before installing: create a draft record from `_templates/installation-record/installation-record.ko.md` and record rationale, research links, exact command, expected changed files, and rollback plan.
- During installation: record the command actually run and any permission approval.
- After installing: record installed version, lock/SBOM status, changed files, and verification result.
- Registry: index the detailed record, scope, dependency files, verification, and commit in `_ops/installations/registry.json`.
- Close-out evaluation: if installation actually occurred, set `installation_occurred=true` and include `installation_record_targets` in `work-evaluator-agent` input.
- Removals and upgrades require the same level of audit record.

## Python Default

- Record project dependencies in `pyproject.toml` or the project's existing package manager config.
- Use an isolated venv, temporary workspace, or project-local tool runner for experiments.
- Do not install directly into system Python or OS package-manager managed environments.
- After installing, verify behavior with `python -c "import <package>"`, unit tests, CLI help, or a smoke test.

## JavaScript/Node Default

- Track project dependencies through `package.json` and a lock file.
- Record changes to reproducible lock files such as `package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`.
- Do not commit `node_modules/`; reproduce it from the lock file and install command.

## References

- [Python Packaging User Guide: pip and virtual environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/)
- [Python documentation: Installing Python modules](https://docs.python.org/3/installing/index.html)
- [npm Docs: package-lock.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json/)
- [OWASP Developer Guide: Dependencies](https://devguide.owasp.org/en/05-implementation/02-dependencies/)
- [OWASP CycloneDX](https://owasp.org/www-project-cyclonedx/)
- [OpenSSF Scorecard](https://openssf.org/scorecard/)
- [CISA Open Source Software Security](https://www.cisa.gov/opensource)
- [CISA Secure by Demand Guide](https://www.cisa.gov/resources-tools/resources/secure-demand-guide)
