# Spec: Maintainable Language, Architecture, And Folder Decisions

## Goal

Make coding research explicitly record implementation language, architecture evidence, and folder structure decisions from a maintainability perspective. The workflow must recognize that formal best practices and practitioner opinions can differ, and that folder purpose and ownership should be understandable by inspection.

## Requirements

- `REQ-WS-022`
- Compare at least two language/runtime candidates before implementation.
- Separate architecture theory/framework evidence from practitioner opinion evidence.
- Record at least two folder-structure candidates, folder decision rationale, folder semantics, and maintainability rationale.

## Implementation Scope

- `agent-platform/src/agent_platform/planning/coding_research.py`
- `agent-platform/tests/test_coding_research.py`
- `agent-platform/configs/planning/coding-research-template.json`
- `agent-platform/configs/research/coding-research-profile.json`
- Related docs, operating prompts, requirements, and history records

## Out Of Scope

- Redesigning a specific project's actual folder structure
- Installing new external packages
