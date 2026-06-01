# Spec: Design Element Collection To PPT Production

## Goal

Create a loop that searches for design elements during presentation production, records provenance and license status, then generates both HTML and editable PPTX outputs from `deck-spec`.

## Requirements

- Run web search whenever a design element is needed.
- Store searched/collected sources in the catalog or source notes.
- Do not include raw assets in PPT/HTML unless license clearance is recorded.
- Use `deck-spec` as the shared input for HTML and PPTX generation.
- Prefer Presentations skill artifact-tool export for PPTX generation.
- Generate a real sample PPTX under `artifacts/pptx/`.

## Non-Scope

- This work does not install a new external package.
- This work does not copy unlicensed design templates or images.

