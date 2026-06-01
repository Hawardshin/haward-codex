# Memory Bootstrap Policy

## Purpose

Manage the key documents and settings an AI agent must load or retrieve at startup so future sessions do not forget repository rules.

## Principles

- Do not rely on chat memory.
- After web search for every new instruction, check memory bootstrap.
- Treat `agent-platform/configs/memory/bootstrap-manifest.json` as the boot memory contract.
- Keep hot anchors compact and limited to always-needed context.
- Retrieve warm/cold anchors only when relevant.
- When persistent instructions, project boundaries, source configs, prompts, workflows, or evaluation loops change, update the manifest in the same change set.

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
```

## Tiers

- `hot`: files to read first in every new session, such as AGENTS, persistent instructions, ops index, prompt router, start workflow, web-first workflow, memory bootstrap workflow, and source configs
- `warm`: policies, workflows, and recent history needed depending on task type
- `cold`: maps, long history, and detailed docs retrieved through search

## Update Rules

- When a new durable rule appears, update `AGENTS.md`, `_docs/instructions/persistent-instructions.md`, the relevant policy docs, and the manifest together.
- When a shared config file becomes mandatory, add it as a hot or warm anchor.
- If hot anchors grow too large, demote lower-priority anchors to warm.
- If the manifest check fails, resolve gaps before continuing work.
