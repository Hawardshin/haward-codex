# Capability Governance

## Purpose

스킬과 도구를 무분별하게 늘리지 않고, 반복 가치가 있는 작업만 재사용 가능한 자산으로 승격한다.

## When to Create a Skill

Create or update a skill when work repeatedly needs:

- domain-specific rules that are easy to forget
- a multi-step workflow with validation requirements
- a specialized tool integration pattern
- project-specific operating knowledge that should guide future agents

Skill source should be tracked under `_skills/<skill-name>/`.

If the skill must be active in Codex, install it into `$CODEX_HOME/skills` after checking permissions. The tracked source in this repository remains the source of truth.

## When to Create a Tool

Create a tool when work repeatedly needs deterministic execution:

- generating files from structured inputs
- validating repository rules
- converting Markdown to HTML or other formats
- rendering previews
- checking project health

Shared tools belong under `_tools/<tool-name>/`. Project-specific tools belong under `project-name/tools/`.

## When to Create a Template

Create a template when the repeated value is structure rather than execution:

- project skeletons
- HTML artifact shells
- work log entries
- spec documents

Templates belong under `_templates/`.

## Minimum Documentation

Every reusable capability must state:

- purpose
- when to use it
- inputs
- outputs
- main command or activation path

## Avoid

- creating a skill for one-off instructions
- creating a script before the workflow is understood
- hiding important project state inside a tool without documenting it
- installing global capabilities without tracking their source in this repository
