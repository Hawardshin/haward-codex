# Plan History: Self-Documenting Configs

## Initial Request

- "By settings files, I mean the file itself should let me see reference links or structural rules."

## Plan Purpose

- Make shared settings files operating contracts, not just value stores.
- Let a person open one settings file and understand why it exists, what references shaped it, and which rules maintain it.

## Search Questions

- How are JSON configs or schemas made self-documenting?
- How does Configuration as Code make settings changes testable?
- Why should references and structural rules live inside important settings files?

## Search Channels

- Web search
- Official documentation search
- Repository search
- Code search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| JSON Schema Annotations | https://json-schema.org/understanding-json-schema/reference/annotations | annotation keywords can make schemas self-documenting |
| Azure App Configuration best practices | https://learn.microsoft.com/en-us/azure/azure-app-configuration/howto-best-practices | configuration as code can be versioned and validated |
| The Twelve-Factor App Config | https://www.12factor.net/config | config/code separation and config scattering risks |
| Existing source registry | `agent-platform/configs/research/source-registry.json` | existing reference-source settings |
| Existing memory manifest | `agent-platform/configs/memory/bootstrap-manifest.json` | existing memory bootstrap settings |

## Insights

- `purpose` alone is not enough. Settings need reference links, structural rules, and field explanations.
- Separate docs can drift, so core settings should carry a minimum explanation contract inside the file.
- Repeated validation should be automated with a CLI such as `check-config-contract`.
- Apply the rule first to the core configs that affect future sessions and research quality.

## Plan Steps

- Add `config-contract-agent` and the `check-config-contract` CLI.
- Add `reader_guide`, `reference_links`, `structure_rules`, and `field_guide` to `agent-platform/configs/memory/bootstrap-manifest.json`.
- Add the same structure to `agent-platform/configs/research/source-registry.json` and `coding-research-profile.json`.
- Add Korean and English self-documenting config policy docs.
- Update research notes, ops docs, persistent instructions, and the memory manifest.
- Run tests, config contract check, memory bootstrap check, evaluation, then commit and push.

## Deferred Options

- Applying the same contract to every agent spec JSON is deferred. The first target is the three core shared settings files.
- A separate JSON Schema file is deferred. The current enforcement is a Python checker.

## Verification Method

- `agent-platform` unit tests
- `check-config-contract`
- `check-memory-bootstrap`
- `list-agents`
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- workspace index/task board check
- `git diff --check`
