# Validation: HTML Deck And Script Collaboration

## Planned Checks

- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck presentation-agent/data/deck-specs/presentation-agent-kickoff.ko.json presentation-agent/artifacts/html/presentation-agent-kickoff.html --catalog presentation-agent/data/reference-index/starter-reference-catalog.json`
- `rg -n "https?://|<img|<script src|<link " presentation-agent/artifacts/html/presentation-agent-kickoff.html`
- `git diff --check`

## Acceptance Criteria

- The sample deck spec references known catalog source IDs.
- The HTML artifact includes slides, presenter notes, keyboard navigation script, and progress.
- The HTML artifact does not include remote images, external scripts, or external stylesheet links.

