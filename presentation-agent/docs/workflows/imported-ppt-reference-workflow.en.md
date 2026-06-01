# User-Provided PPT Reference Workflow

## Purpose

When the user provides a PPT/PPTX file, the presentation agent should extract reusable design structure instead of directly copying the original deck.

## Inputs

- User-provided PPT/PPTX file
- Usage purpose: example, new deck template, style analysis, existing deck improvement, etc.
- Rights confirmation: whether the user can provide the file for analysis and whether raw storage/commit is allowed

## Default Storage

- Temporary raw location: `presentation-agent/data/assets/raw/user-provided/`
- Default git policy: raw PPT/PPTX files are ignored by `.gitignore`.
- Analysis artifacts: `presentation-agent/docs/source-notes/` or task-specific `specs/`/`docs/research/`

## Steps

1. Confirm rights
   - Confirm that the user can provide the file.
   - Separately confirm whether the raw file may be committed. The default is no.

2. Extract structure
   - Use `pptx_to_html.py` to extract text and slide order.
   - Treat this output as narrative structure and information-density evidence, not as faithful visual conversion.

3. Record design tokens
   - Color roles: primary, secondary, accent, neutral
   - Typography roles: display, title, body, caption, number
   - Record spacing scale, grid, safe area, image treatment, and chart frame.

4. Classify layout archetypes
   - Mark each slide as a family such as hero, section divider, problem-solution, comparison, process, evidence, quote, or closing.
   - Assign new slides to one of those families.

5. Create a template profile
   - Rewrite the source deck into reusable internal rules instead of copying slide-by-slide visual design.
   - Include tokens, layout archetypes, components, source notes, and prohibited copy elements.

6. Connect generation
   - Record template profile ID and layout archetype in `deck-spec`.
   - HTML/PPTX generators follow tokens and archetypes to keep the deck consistent.

## Genspark-Style Flow

- `strategy`: define purpose, audience, tone, and success criteria.
- `substance`: collect evidence, core messages, examples, and numbers.
- `structure`: create outline, sections, slide beats, and transitions.
- `design`: select template profile, design tokens, and layout archetypes.
- `build`: generate HTML/PPTX and check visual QA plus citation/source notes.

## Prohibited

- Do not commit raw PPT files with unclear usage rights.
- Do not copy the original visual design as a public template.
- Do not describe text extraction output as high-fidelity design conversion.

