# Installation Audit Trail Plan

## Initial Instruction

The user said "especially for installation, more." I interpreted this as requiring even stronger documentation for installation work than for ordinary completed work.

## Research First

- Checked the Python Packaging User Guide and Python official documentation for project-local venvs, dependency files, and system Python installation risks.
- Checked npm package-lock documentation for reproducible dependency trees and dependency-change visibility.
- Checked the OWASP Developer Guide and CycloneDX for dependency/SBOM metadata requirements.
- Checked OpenSSF Scorecard as a pre-install open-source security posture signal.

## Local Review

- Existing `_docs/open-source-installation-policy.*` already required install command, dependency file, security/license review, and rollback.
- It did not yet provide a detailed per-install audit record location, installation registry, or evaluator installation target.
- `work-evaluator-agent` checked work summary targets but not whether installation records existed when installation happened.

## Plan

1. Add `_ops/installations/registry.json` as a self-documenting installation registry.
2. Add `_history/installations/` as the detailed per-install record location.
3. Add Korean/English Markdown templates and a JSON entry template under `_templates/installation-record/`.
4. Update installation policy, persistent instructions, AGENTS, README, operations index, and close/evaluation workflows.
5. Add `installation_occurred` and `installation_record_targets` to `work-evaluator-agent`.
6. Extend open-source candidate evaluation with installation record path, environment path, version/lock status, and post-install verification.
7. Save research, work summary, and evaluation records, then verify, commit, and push.

## Decision

- If no actual installation occurred, no detailed installation record is required.
- If installation occurred, evaluation input must set `installation_occurred=true`; missing record targets are blocking gaps.
- The installation registry remains useful even with empty entries because it explicitly says no installs have been recorded yet.
