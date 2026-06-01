# 2026-06-02 Omission Prevention Operations Note

## Summary

The risk that an agent can miss required items is better handled by an item-level close-out coverage gate than by telling the agent to remember better.

## Reusable Insights

- Checklists reduce reliance on memory in repeatable work.
- Requirements traceability helps find missing links between requirements and tests, code, bugs, or validation.
- Definition of Done and acceptance criteria have different roles. For this platform, artifact existence and acceptance checks should remain separate.
- Forcing full coverage on every `quick` task would erase the speed benefit. For non-`quick` work, omission cost is high enough to justify a blocking gate.

## Platform Application

- `omission-guard-agent` checks task-specific coverage records.
- `work-evaluator-agent` requires `omission_check_targets` in non-`quick` modes.
- `covered` needs evidence; `deferred` and `not_applicable` need rationale.

## Sources

- WHO Safe surgery Tool and Resources: https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery/tool-and-resources
- NASA Software Engineering and Assurance Handbook: https://swehb.nasa.gov/display/SWEHBVC
- Microsoft Learn Requirements traceability: https://learn.microsoft.com/en-us/azure/Devops/pipelines/test/requirements-traceability?view=azure-devops
- Atlassian Definition of Done: https://www.atlassian.com/agile/project-management/definition-of-done
