# Spec: Platform Presentation Pack

## Purpose

Use `presentation-agent` to prepare presentation materials for the current workspace platform. Produce one overall platform presentation and separate presentations for each registered root project.

## Requirements

- `REQ-PA-006`: Script-aware HTML deck
- `REQ-PA-007`: Reference-based design application
- `REQ-PA-010`: Platform and project presentation pack

## Scope

- Overall platform deck spec and HTML
- `agent-platform` project deck spec and HTML
- `workspace-monitor` project deck spec and HTML
- `presentation-agent` project deck spec and HTML
- Presentation order and script usage guide
- Work-specific source notes

## Out Of Scope

- External image or logo downloads
- Large new presentation design template collection
- Final artifact-tool PPTX export

## Acceptance Criteria

- All four deck specs pass the `html_deck` validator.
- Four HTML presentation artifacts are generated.
- Each deck includes speaker notes and `script_beat`.
- The overall deck covers platform philosophy, operating loop, project structure, research, requirements, specs, evaluation, history, and capability promotion.
- The project decks separately cover all three registered root projects.
