# Self-Documenting Config Policy

## Purpose

A settings file should not only store values. The user should be able to open the file and understand which references shaped it and which structural rules govern it.

## Scope

- Shared settings under `agent-platform/configs/`
- Source registries, research profiles, and memory manifests reused by multiple agents
- JSON settings files that define project-wide rules or execution criteria

## Required Structure

Shared JSON settings should include these top-level fields.

- `schema_version`: config structure version
- `name`: stable config name
- `purpose`: why the config exists
- `reader_guide`: how humans or agents should read and update the file
- `reference_links`: internal documents and external links used by the config
- `structure_rules`: structural maintenance rules for this config
- `field_guide`: meaning and required status of important fields

## Reference Link Rules

- External URLs record `title`, `url`, `source_type`, `used_for`, and `last_checked`.
- Internal documents record `title`, `path`, `source_type`, `used_for`, and `last_checked`.
- Links are not bookmarks; each link must explain what it is used for.
- Social and community sources are discovery or adoption signals, not standalone factual proof.

## Structure Rules

- Important policies and decision rules also live in the config's `structure_rules`.
- Human-readable explanation lives in `reader_guide` and `field_guide`.
- Machine-checkable rules are validated by the Python CLI.
- Run the command below after creating or changing an important shared settings file.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract <config.json>
```

## Current Required Check

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract \
  configs/memory/bootstrap-manifest.json \
  configs/research/source-registry.json \
  configs/research/coding-research-profile.json
```

## Rationale

- JSON Schema annotations such as `title`, `description`, and `examples` show how explanatory metadata can make schemas and settings self-documenting.
- Configuration as Code makes configuration changes versioned, testable, and reviewable.
- In this repository, agent operating rules and research criteria matter more than deployment environment variables, so references and structural rules are recorded directly inside settings files.
