# PPT Reference Expansion Research

## Research Purpose

This update strengthens presentation-agent with better PPT template and design sources plus rules for turning user-provided PPT files into consistent internal templates.

## Added Source Groups

- Korean-user sources: MiriCanvas presentation templates and MiriCanvas AI presentation.
- Large template galleries: Canva, Microsoft Create, Slidesgo, PresentationGO, Adobe Express, and PPTMON.
- Product/business references: Pitch templates and Pitch presentation gallery.
- Design-tool references: Figma Slides and Figma Community slide deck templates.
- AI slide workflow: Genspark AI Slides and help guide.
- Open-source/research: GitHub slideshow template topic, PPTAgent, PreGenie, OutlineSpark, and DeepSlides.

## Useful Genspark-Style Pattern

- `strategy`: define audience, purpose, tone, and success criteria first.
- `substance`: gather research material, messages, evidence, and examples.
- `structure`: build outline and slide beats.
- `design`: lock template profile, tokens, and layout archetypes.
- `build`: generate HTML/PPTX and check QA plus source notes.

## How To Use User-Provided PPT Files

- Keep raw files in `presentation-agent/data/assets/raw/user-provided/` by default and do not commit them.
- Extract text structure with `pptx_to_html.py`.
- Record colors, typography, spacing, grid, repeated components, and layout families as a `template profile`.
- Build new outputs from the internal profile instead of copying original slides.

## Design Consistency Criteria

- Every slide uses the same token set.
- Every slide maps to a known layout archetype.
- Keep repeated families such as section transitions, problem-solution, comparison, process, evidence, quote, and closing.
- Prefer whole-deck rhythm and reuse over a single beautiful slide.

