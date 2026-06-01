# Web Search Record: Design Element Collection To PPT Production

## Search Date

- Date: 2026-06-01
- Work: add a structure that searches and collects design elements during presentation work and generates PPTX output

## Queries

- `python-pptx official documentation create PowerPoint presentations`
- `Office Open XML PresentationML official documentation pptx structure`
- `PptxGenJS official documentation create PowerPoint JavaScript`
- `presentation design assets sourcing license best practices`

## Key Sources Checked

- python-pptx documentation: https://python-pptx.readthedocs.io/en/latest/user/presentations.html
- Microsoft Learn PresentationML structure: https://learn.microsoft.com/pl-pl/office/open-xml/presentation/structure-of-a-presentationml-document
- Office Open XML PPTX anatomy: https://officeopenxml.com/anatomyofOOXML-pptx.php
- PptxGenJS npm: https://www.npmjs.com/package/pptxgenjs
- PptxGenJS GitHub: https://github.com/beautifulai/PptxGenJS
- Presentations skill local guidance: `/Users/shinjoungeun/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/SKILL.md`

## Plan Impact

- Kept the Python-first policy, but selected the currently available Presentations skill artifact-tool export as the preferred final PPTX path.
- Added a Python tool that turns `deck-spec` into an artifact-tool slide module workspace.
- Treated python-pptx and PptxGenJS as strong candidates, but did not install them in this change.
- Documented that design needs should trigger search, catalog/source-notes recording, license gate review, then PPTX production.

## Uncertainty

- Alternative routes such as python-pptx, PptxGenJS, and LibreOffice require installation, security, license, and quality review before adoption.
- The artifact-tool workspace can export PPTX when the Codex Presentations skill runtime is available.

