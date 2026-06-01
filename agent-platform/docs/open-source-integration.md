# Open-Source Integration

## Policy

Use mature open-source software when it reduces platform maintenance cost and fits the task. Do not adopt a framework just because it is popular.

If the best open-source candidate needs to be installed, install it in the owning project or tool environment rather than avoiding the dependency by default. Follow `_docs/policies/open-source-installation-policy.ko.md`: record the install command, dependency file, installation audit record, environment path, version/lock status, security review, license review, verification, and rollback plan.

## Evaluation Criteria

Score each candidate on a 0-5 scale:

- maintained: recent releases, issue activity, compatibility with current Python
- documentation: install, examples, architecture, migration guidance
- community: usage, contributors, support surface
- fit: how directly it solves the current need
- lock-in risk: how hard it would be to replace later
- installation readiness: whether install scope, command, dependency tracking, installation record, environment path, version/lock status, security review, license review, post-install verification, and rollback are recorded

`agent_platform.oss.evaluate_candidate` turns those scores into `adopt`, `trial`, or `avoid`. Candidate JSON files can live under `configs/open-source/`.

When `install_needed` is true, the evaluator also returns `ready_to_install`, `installation_review_required`, or `do_not_install`.

## Adoption Flow

1. Define the capability needed.
2. Research current open-source candidates and official docs.
3. Record candidate scores and tradeoffs.
4. If installation is needed, record `install_needed`, `installation_scope`, `install_command`, `dependency_record_path`, `installation_record_path`, `environment_path`, `version_or_lock_status`, `post_install_verification`, `security_review`, `license_review`, and `rollback_plan`.
5. Install the strongest candidate only inside the owning project/tool scope unless a global install is explicitly justified.
6. Trial the candidate behind a local adapter.
7. Keep platform models independent from the dependency.
8. Commit the decision, dependency metadata, and test coverage.

## Adapter Rule

External frameworks should sit behind local interfaces such as `AgentRuntime`. The rest of the platform should depend on local models like `AgentSpec`, `ExecutionRequest`, and `ExecutionResult`.

Third-party imports should live in `agent_platform.adapters` modules, not in `agent_platform.core`.

## Candidate Record Template

```text
Name:
Purpose:
License:
Source:
Maintained:
Documentation:
Community:
Fit:
Lock-in risk:
Install needed:
Installation scope:
Install command:
Dependency record path:
Installation record path:
Environment path:
Version or lock status:
Post-install verification:
Security review:
License review:
Rollback plan:
Decision:
Notes:
```
