# Deck Spec

This folder stores the shared contract between the presentation script agent and the HTML deck renderer. A `deck-spec` contains slide content plus flow role, speaker notes, and evidence sources.

## Rules

- `reference_sources` and `slides[].evidence_sources` use IDs from `data/reference-index/starter-reference-catalog.json`.
- `script_beat` records the flow role created by the presentation script agent.
- `speaker_notes` are short spoken lines in delivery order.
- HTML decks render with local CSS, without remote images or copied design assets.

## Generation Command

```bash
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/presentation-agent-kickoff.ko.json presentation-agent/artifacts/html/presentation-agent-kickoff.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.artifact_pptx presentation-agent/data/deck-specs/presentation-agent-kickoff.ko.json outputs/manual-presentation-agent/presentations/presentation-agent-kickoff --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
```

## 2026-06-01 Platform Presentation Pack

Per the user request, this pack prepares one overall repository platform deck plus one separate deck for each registered root project.

| deck-spec | HTML artifact | Purpose |
| --- | --- | --- |
| `workspace-platform-overview.ko.json` | `artifacts/html/workspace-platform-overview.html` | Overall platform philosophy, operating loop, and project structure |
| `project-agent-platform.ko.json` | `artifacts/html/project-agent-platform.html` | `agent-platform` core engine briefing |
| `project-workspace-monitor.ko.json` | `artifacts/html/project-workspace-monitor.html` | `workspace-monitor` monitoring UI briefing |
| `project-presentation-agent.ko.json` | `artifacts/html/project-presentation-agent.html` | `presentation-agent` production workflow briefing |

```bash
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/workspace-platform-overview.ko.json presentation-agent/artifacts/html/workspace-platform-overview.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/project-agent-platform.ko.json presentation-agent/artifacts/html/project-agent-platform.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/project-workspace-monitor.ko.json presentation-agent/artifacts/html/project-workspace-monitor.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/project-presentation-agent.ko.json presentation-agent/artifacts/html/project-presentation-agent.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json
```
