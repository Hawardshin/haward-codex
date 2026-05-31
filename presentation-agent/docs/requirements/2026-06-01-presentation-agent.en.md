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

## Non-Scope

- This baseline does not bulk-download presentation files.
- This baseline does not install a pixel-faithful PPTX rendering engine.
