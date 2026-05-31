# Open-Source Integration

## Policy

Use mature open-source software when it reduces platform maintenance cost and fits the task. Do not adopt a framework just because it is popular.

## Evaluation Criteria

Score each candidate on a 0-5 scale:

- maintained: recent releases, issue activity, compatibility with current Python
- documentation: install, examples, architecture, migration guidance
- community: usage, contributors, support surface
- fit: how directly it solves the current need
- lock-in risk: how hard it would be to replace later

`agent_platform.oss.evaluate_candidate` turns those scores into `adopt`, `trial`, or `avoid`. Candidate JSON files can live under `configs/open-source/`.

## Adoption Flow

1. Define the capability needed.
2. Research current open-source candidates and official docs.
3. Record candidate scores and tradeoffs.
4. Trial the strongest candidate behind a local adapter.
5. Keep platform models independent from the dependency.
6. Commit the decision and test coverage.

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
Decision:
Notes:
```
