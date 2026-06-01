# Presentation Agent Requirements Baseline

## Purpose

The presentation agent researches strong presentation design, PPT/HTML references, legally reusable assets, presentation theory, and research evidence before producing deck flow or scripts.

## Requirements

### REQ-PA-001 Reference-First Collection

- Before production, collect PPT, HTML slide, template gallery, design gallery, asset library, presentation theory, and research sources.
- Every source records URL, access date, source type, format, license status, download eligibility, HTML conversion path, and quality signals.

### REQ-PA-002 License Gate

- Store raw PPT/PPTX/image/icon/font files only when license or terms have been checked.
- Paid, account-gated, unknown-license, and portfolio sources are metadata-only by default.
- Treat community popularity as discovery signal, not reuse permission.

### REQ-PA-003 PPTX HTML Conversion

- PPT/PPTX references should be usable for final HTML presentation production.
- The initial converter extracts text structure and slide order into HTML.
- Pixel-faithful conversion requires separate tool research, license review, and render verification before adoption.

### REQ-PA-004 Grounded Design And Script Flow

- Deck flow and script generation must be grounded in the reference catalog, presentation theory, strong presentation examples, and research evidence.
- Record visual inspiration separately from factual evidence.

### REQ-PA-005 Project Boundary

- Keep presentation-agent specific materials under `presentation-agent/`.
- Keep reusable skills under `_skills/`, while project catalogs and conversion outputs stay inside the project.

### REQ-PA-006 Script-Collaborative HTML Decks

- The presentation script agent creates `deck-spec` files with slide-level `script_beat`, `speaker_notes`, and `evidence_sources`.
- The HTML deck renderer turns a `deck-spec` into a 16:9 presentation format.
- The resulting HTML includes presenter notes, keyboard navigation, progress, and print-friendly structure.

### REQ-PA-007 Reference-Based Design Application

- HTML decks may use structural patterns from the reference catalog and presentation theory, but must not copy source designs.
- Generated decks should run from local CSS and verified local data without remote images or unknown-license assets.

### REQ-PA-008 Design Search-Collect-PPT Loop

- When a design element is needed during presentation production, run web search first.
- Record collected design/asset sources in the catalog or task source notes with URL, access date, license status, and usage purpose.
- Include only license-cleared assets in actual PPT/HTML outputs.

### REQ-PA-009 PPTX Output

- The presentation agent must be able to create editable PPTX output, not only HTML output.
- PPTX output is generated from `deck-spec` and preserves `script_beat`, `speaker_notes`, and `evidence_sources`.
- Prefer Presentations skill artifact-tool export when available.

### REQ-PA-010 Platform And Project Presentation Pack

- The presentation agent shall be able to create an overall presentation deck for the current workspace platform plus separate decks for each registered root project.
- Each deck shall include a `deck-spec` JSON file, an HTML output, speaker notes, and source/evidence notes.
- The overall deck shall cover the platform philosophy, operating loop, project boundaries, research, requirements, specs, evaluation, history, and capability-promotion structure without omitting major parts.
- Each project deck shall separately explain the project purpose, scope, key files, current artifacts, verification method, and next usage flow.

### REQ-PA-011 PPT Template Reference Expansion

- The presentation agent can repeatedly reference high-quality PPT/slide template sources such as MiriCanvas, Canva, Microsoft Create, Slidesgo, PresentationGO, Pitch, Figma Slides, and Adobe Express.
- New template sources are recorded in `starter-reference-catalog.json` with URL, access date, source type, license status, download permission, HTML conversion path, and quality signals.
- Sources useful for Korean users are tagged or noted so they can be selected easily during real deck production.

### REQ-PA-012 User-Provided PPT References

- When the user provides a PPT/PPTX file, the agent rebuilds it into an internal template profile by extracting design tokens, layout archetypes, repeated components, and section rhythm instead of copying the original deck.
- Raw PPT/PPTX files stay in a local-only raw area and are not committed to git until usage rights and storage permission are confirmed.
- `pptx_to_html.py` is used for narrative/text structure extraction and must not be treated as a pixel-faithful converter.

### REQ-PA-013 Consistent Template Generation

- PPT/HTML generation follows a Genspark-inspired staged flow that separates `strategy`, `substance`, `structure`, `design`, and `build`.
- Final templates lock color, typography, spacing, grid, component style, and layout family to reduce slide-to-slide drift.
- New slides assign content to validated layout archetypes instead of using free-form placement.

## Non-Scope

- This baseline does not bulk-download presentation files.
- This baseline does not install a pixel-faithful PPTX rendering engine.
