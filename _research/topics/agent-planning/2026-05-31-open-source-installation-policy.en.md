# Open-Source Installation Policy Research

## Purpose

The user said open-source installation should happen when needed. This note captures the reference basis for moving from "consider open source" to "install it when it is the right fit, with dependency, license, security, and rollback controls."

## Sources Checked

| Source | Type | Checked | Used For |
| --- | --- | --- | --- |
| [Python Packaging User Guide: pip and virtual environments](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/) | official docs | 2026-05-31 | Default Python dependency isolation with virtual environments |
| [OpenSSF Scorecard](https://openssf.org/scorecard/) | official/open-source security reference | 2026-05-31 | Maintenance, security policy, and vulnerability-handling signals |
| [CISA Open Source Software Security](https://www.cisa.gov/opensource) | official security agency | 2026-05-31 | Open-source supply-chain risk and security considerations |
| [CISA Secure by Demand Guide](https://www.cisa.gov/resources-tools/resources/secure-demand-guide) | official security guide | 2026-05-31 | Recording security expectations in software acquisition and use |

## Insights

- When mature open source fits the task, avoiding installation by default is not useful. Installation should include dependency management and verification.
- For Python, project-local virtual environments or dependency files are the default. Global installation should be exceptional.
- Security review should include maintenance state, provenance, security policy, release activity, and vulnerability signals.
- Installation records should include a rollback plan so the dependency can be removed or replaced later.

## Platform Impact

- Add `_docs/policies/open-source-installation-policy.ko.md` and `.en.md`.
- Add installation record fields to `agent-platform/configs/open-source/candidate-template.json`.
- Add installation readiness to `OpenSourceCandidate` evaluation.
- Reflect installation rules in persistent instructions, AGENTS, README, and the coding research workflow.

## Caveats

- Actual installation commands may require network and filesystem permissions, so request approval when the tool policy requires it.
- Global installs can weaken reproducibility, so they remain exceptional.
