# Create Project Prompt

Use when: 새 루트 프로젝트를 만들어야 할 때.

## Prompt

```text
Create a new root-level project folder using kebab-case.
For Python agent projects, start from _templates/python-agent-project/.
For general projects, start from _templates/project/.
Create README, docs, artifacts, and tests; add src when the project needs code.
Define the project boundary in the README: what belongs inside, what stays shared, and what is out of scope.
Register the project in _ops/projects/registry.json and update _ops/projects/index.ko.md and _ops/projects/index.en.md.
Update _ops/maps/ and _history/, then commit and push immediately.
```
