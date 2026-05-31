# Installation Audit Trail Policy

## Purpose

Installation work changes dependency trees, lock files, and local or global environment state, so it needs a stronger audit trail than ordinary work summaries.

## Sources Checked

| Source | Type | Checked | Used For |
| --- | --- | --- | --- |
| [Python Packaging User Guide: pip and virtual environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/) | official docs | 2026-05-31 | Informed the project-local virtual environment and dependency-file default for Python installs. |
| [Python documentation: Installing Python modules](https://docs.python.org/3/installing/index.html) | official docs | 2026-05-31 | Informed the risk of installing directly into system Python. |
| [npm Docs: package-lock.json](https://docs.npmjs.com/cli/v6/configuring-npm/package-lock-json/) | official docs | 2026-05-31 | Informed lock-file use for reproducible dependency trees and visible dependency changes. |
| [OWASP Developer Guide: Dependencies](https://devguide.owasp.org/en/05-implementation/02-dependencies/) | security guide | 2026-05-31 | Informed SBOM-style dependency metadata: location, version, license, source, and support status. |
| [OWASP CycloneDX](https://owasp.org/www-project-cyclonedx/) | SBOM standard | 2026-05-31 | Informed supply-chain transparency concepts such as SBOM and OBOM. |
| [OpenSSF Scorecard](https://openssf.org/scorecard/) | security signal | 2026-05-31 | Informed pre-install review of open-source trust, risk, and security posture. |

## Applied Insights

- For installs, "what changed" is less important than "what was installed, where, how it is reproduced, and how to roll it back."
- Pre-install intent and post-install reality can differ, so installation records should capture both draft plan and actual result.
- Python should prefer project-local venvs and dependency files; system/global installs are exceptions.
- Node-family installs should treat lock files as reproducible dependency-tree records.
- Dependency security review should combine maintenance, source, license, vulnerability, provenance, and rollback signals.

## Repository Rule Added

- `_ops/installations/registry.json` is the installation audit index.
- `_history/installations/YYYY/` is the detailed per-install record location.
- `_templates/installation-record/` provides Korean/English record templates and a JSON entry template.
- `work-evaluator-agent` treats missing `installation_record_targets` as a blocking gap when `installation_occurred=true`.
