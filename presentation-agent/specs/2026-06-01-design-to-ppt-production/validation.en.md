# Validation: Design Element Collection To PPT Production

## Planned Checks

- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.artifact_pptx ...`
- `node .../build_artifact_deck.mjs ...`
- `unzip -l presentation-agent/artifacts/pptx/presentation-agent-kickoff.pptx`
- Check expected text inside PPTX XML
- Visual contact-sheet review
- `git diff --check`

## Acceptance Criteria

- The PPTX file is generated and contains 6 slides.
- Key text and speaker notes exist in the PPTX XML.
- The contact sheet is nonblank and has no obvious overlap.
- The design/asset source collection and license gate principle is documented.

