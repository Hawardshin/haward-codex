# HTML Deck And Script Collaboration Research

## Goal

Use the collected presentation design/framework references to build an HTML deck that behaves like a presentation and define how the presentation script agent hands off slide structure and speaker notes.

## Evidence Checked

- reveal.js is an HTML presentation framework with speaker notes and speaker view.
- reveal.js Markdown support can keep slides and speaker notes together through notes separators.
- Slidev provides presenter mode and notes editing workflows.
- Marp converts Markdown into HTML, PDF, and PowerPoint presentation outputs.
- HTML presentation output should include keyboard navigation and accessibility-conscious controls.

## Design Impact

- `deck-spec` now includes `script_beat` and `speaker_notes` as the collaboration contract between the script agent and HTML renderer.
- Generated HTML includes 16:9 slides, keyboard navigation, presenter notes, progress, and print mode.
- The sample deck uses local CSS and local JavaScript without remote images or external script links.
- Design applies structural patterns from references without copying source templates.

## Limits

- The renderer is a local HTML presentation engine and does not install reveal.js, Slidev, or Marp.
- Topic-specific advanced design should evolve through repeated deck spec and theme improvements.

