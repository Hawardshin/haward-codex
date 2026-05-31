# Python Agent Structure

## Purpose

`agent-platform` starts with a small Python core that can stay stable while open-source agent frameworks are evaluated and attached through adapters.

## Directory Shape

```text
agent-platform/
  pyproject.toml
  configs/
    agents/
      example-python-agent.json
  src/
    agent_platform/
      cli.py
      adapters/
      core/
        models.py
        registry.py
        runtime.py
      evaluation/
        work_evaluator.py
      oss/
        evaluation.py
  tests/
```

## Design Rules

- Keep the core package dependency-light.
- Use Python as the default runtime for agent orchestration and backend automation.
- Store declarative agent specs as JSON until a richer schema is needed.
- Put runtime-specific integrations behind `AgentRuntime`.
- Treat open-source frameworks as replaceable adapters, not as the platform's domain model.

## Extension Points

- `AgentSpec`: declarative identity, runtime, skills, tools, and metadata.
- `AgentRegistry`: loading and listing agent specs.
- `AgentRuntime`: adapter boundary for Python functions and future open-source frameworks.
- `OpenSourceCandidate`: repeatable scoring for dependency decisions.
- `WorkEvaluationInput`: structured close-out evaluation against the user's initial instruction.
- `agent_platform.adapters`: place for third-party framework adapters.

## Commands

From `agent-platform/`:

```bash
python3 -m unittest discover -s tests
python3 -m agent_platform.cli list-agents --registry configs/agents
python3 -m agent_platform.cli score-oss configs/open-source/candidate-template.json
python3 -m agent_platform.cli evaluate-work configs/evaluation/work-evaluation-template.json
```

For the module command, either install the package or run with `PYTHONPATH=src`.
