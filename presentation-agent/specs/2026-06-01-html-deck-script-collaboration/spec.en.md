# Spec: HTML Deck And Script Collaboration

## Goal

Accept slide flow and speaker notes from the presentation script agent as a `deck-spec`, then render it as a presentation-style HTML deck.

## Requirements

- A `deck-spec` includes title, language, theme, reference sources, script collaboration contract, and slides.
- Each slide includes `id`, `layout`, `title`, `script_beat`, `speaker_notes`, and optional `evidence_sources`.
- The renderer provides 16:9 slides, keyboard navigation, progress, presenter notes, and print styles.
- The renderer validates catalog IDs so missing evidence sources are caught.
- The sample deck must be a real HTML artifact introducing the presentation agent itself.

## Non-Scope

- This work does not install an external HTML presentation framework.
- This work does not include remote images or unknown-license assets.

