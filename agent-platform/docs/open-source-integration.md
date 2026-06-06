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

## Pattern Adoption Gate

Use `agent_platform.oss.check_pattern_adoption_plan` before source code is shaped around open-source repositories. This gate is for structure patterns, not dependency scoring. It requires:

- source repository provenance, inspected paths, license posture, and adoption-signal caveats
- at least three reusable pattern candidates
- compared language/runtime options, including hybrid runtime choices when relevant
- compared architecture options and folder-structure options
- direct code import rules with license, pinned commit, attribution, tests, rollback, and human checkpoint gates
- hybrid module build boundary, interface contract, validation, and rollback plan
- explicit adoption decisions for `adopt`, `trial`, `reference_only`, `reject`, `defer`, or `direct_import`

Run:

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-oss-pattern-adoption configs/open-source/pattern-adoption-template.json
```

Stars, trending rank, comments, and social signals are discovery or adoption signals only. They do not prove correctness, license compatibility, or local fit.

## Adoption Flow

1. Define the capability needed.
2. Research current open-source candidates and official docs.
3. If the work is inspired by repository structure, record a pattern adoption plan under `configs/open-source/` and run `check-oss-pattern-adoption`.
4. Record candidate scores and tradeoffs when a dependency or framework may be installed.
5. If installation is needed, record `install_needed`, `installation_scope`, `install_command`, `dependency_record_path`, `installation_record_path`, `environment_path`, `version_or_lock_status`, `post_install_verification`, `security_review`, `license_review`, and `rollback_plan`.
6. Install the strongest candidate only inside the owning project/tool scope unless a global install is explicitly justified.
7. Trial the candidate behind a local adapter.
8. Keep platform models independent from the dependency.
9. Commit the decision, dependency metadata, pattern plan, and test coverage.

## Adapter Rule

External frameworks should sit behind local interfaces such as `AgentRuntime`. The rest of the platform should depend on local models like `AgentSpec`, `ExecutionRequest`, and `ExecutionResult`.

Third-party imports should live in `agent_platform.adapters` modules, not in `agent_platform.core`.

## Direct Code Import Rule

Do not copy source code from another repository just because a feature is useful. A direct import decision must record the source repository, license review, pinned commit, source provenance, attribution plan, tests, rollback plan, and human checkpoint. If any source repository has unclear, restrictive, or unknown license posture, keep it as reference-only until review clears it.

## Hybrid Module Rule

Another language can be the right implementation choice for provider SDKs, UI-facing packages, sandbox sidecars, file watchers, process supervisors, or performance-sensitive modules. Keep it as a separate module with its own build command and a versioned adapter contract, then validate both the module build and the Python adapter tests before activation.

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
