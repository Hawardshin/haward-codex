# Validation: Open Impress Template Collection And HTML Referencing

## Required Validation

- `PYTHONPATH=presentation-agent/src python3 -m unittest presentation-agent/tests/test_open_template_collector.py`
- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `python3 -m json.tool presentation-agent/data/reference-index/open-impress-template-downloads.json`
- `cd presentation-agent && npm run test:browser`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-02-open-impress-template-collection.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-open-impress-template-collection-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-open-impress-template-collection-evaluation-input.json`

## Manual Checks

- Confirm 119 `.otp` files.
- Confirm 119 thumbnails.
- Confirm 119 HTML reference pages.
- Confirm `open-impress-template-gallery.html` shows the total count and collection summary.
