# Design Element Collection To PPT Workflow

## Purpose

When a presentation needs design elements mid-work, use a repeatable loop from search, collection, provenance, license review, and HTML/PPT production.

## Default Sequence

1. Identify the design need.
   - Examples: cover image, icon, comparison diagram, mood reference, presentation rhythm.
2. Run web search first.
   - Separate official/primary sources, template galleries, design galleries, asset libraries, and research/guides.
3. Store sources in the catalog.
   - Record URL, access date, license status, `download_allowed`, `quality_signals`, and `html_conversion`.
   - Treat sources such as MiriCanvas, Canva, Slidesgo, and Genspark as metadata and structural references by default, not as raw file storage.
4. Store only license-cleared assets under `data/assets/`.
   - Unknown-license material stays inspiration and metadata only.
5. The presentation script agent updates `deck-spec`.
   - Record `script_beat`, `speaker_notes`, `evidence_sources`, and design intent.
6. Generate both HTML and PPT.
   - HTML: `presentation_agent.html_deck`
   - PPTX: create an artifact-tool workspace through `presentation_agent.artifact_pptx`, then export with the Presentations skill artifact-tool flow.
7. Validate.
   - Check tests, catalog source IDs, remote/unlicensed assets, PPTX export, previews, and contact sheet.

## PPTX Rules

- Final PPTX should be editable PowerPoint output.
- Prefer Presentations skill artifact-tool export when available.
- Adopt `python-pptx`, PptxGenJS, LibreOffice, or direct OOXML only after installation, security, license, and quality review.
- Do not clone external designs; reinterpret structural patterns from collected references.
- When the user directly provides a PPT, follow `imported-ppt-reference-workflow.en.md` and turn it into a template profile after local-only analysis.
