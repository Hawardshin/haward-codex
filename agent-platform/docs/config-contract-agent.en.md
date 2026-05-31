# Config Contract Agent

`config-contract-agent` checks whether shared JSON settings files explain themselves inside the file.

## Checks

- `reader_guide`: how to read the file and when to update it
- `reference_links`: referenced URLs or internal docs, with what each is used for
- `structure_rules`: structural rules for maintaining the config
- `field_guide`: meaning and required status of important fields

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract \
  configs/memory/bootstrap-manifest.json \
  configs/research/source-registry.json \
  configs/research/coding-research-profile.json
```

## Principle

A settings file is an operating contract, not just a value store. The user should be able to open one file and understand its references, structural rules, and important fields.
