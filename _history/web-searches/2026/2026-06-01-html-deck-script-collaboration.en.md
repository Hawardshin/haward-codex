# Web Search Record: HTML Deck And Script Collaboration

## Search Date

- Date: 2026-06-01
- Work: implement an HTML presentation deck renderer that collaborates with presentation scripts

## Queries

- `reveal.js speaker notes markdown HTML presentation official`
- `Slidev speaker notes presenter mode official`
- `Marp speaker notes markdown presentation official`
- `HTML presentation accessibility keyboard navigation best practices`

## Key Sources Checked

- reveal.js speaker view: https://revealjs.com/speaker-view/
- reveal.js official: https://revealjs.com/
- reveal.js Markdown notes: https://revealjs.com/markdown/
- Slidev UI and notes editing: https://sli.dev/guide/ui
- Marp official: https://marp.app/
- Pandoc reveal.js speaker notes: https://pandoc.org/demo/example33/10.5-speaker-notes.html

## Plan Impact

- Added speaker notes and `script_beat` to `deck-spec` so scripting and slide rendering stay separate.
- Generated HTML includes both audience slides and presenter notes.
- HTML decks include keyboard navigation and progress by default.
- Kept future HTML/PDF/PPTX routes in mind, but did not install external tools in this change.

## Uncertainty

- Browser-specific visual layout and presenter-note usability need further visual QA in real presentation conditions.
- Advanced presenter mode can later be replaced by reveal.js, Slidev, or Marp after dependency review.

