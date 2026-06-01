# PPT Reference Expansion Research Summary

## Key Conclusions

- Manage template sources as metadata first. MiriCanvas, Canva, Slidesgo, Pitch, Figma, and Adobe Express are valuable design references, but raw file storage requires item-level terms review.
- User-provided PPT files can become strong references. The goal is not to copy the deck, but to extract design tokens, layout archetypes, component rules, and section rhythm into a reusable internal template profile.
- The useful part of the Genspark-style model is the staged workflow. Presentation-agent should absorb a `strategy -> substance -> structure -> design -> build` loop.

## Source Groups

- Korean/general templates: MiriCanvas, Canva, Microsoft Create, Slidesgo, PresentationGO, PPTMON.
- Product/business templates: Pitch templates and Pitch presentation gallery.
- Design-tool sources: Figma Slides, Figma Community slide deck templates, Adobe Express.
- Open-source candidates: GitHub slideshow template topic and the existing reveal.js/Slidev/Marp catalog.
- AI generation research: PPTAgent, PreGenie, OutlineSpark, DeepSlides.

## Template Quality Criteria

- Every slide should look like it came from one design system.
- Colors should have fixed primary, secondary, accent, and neutral roles.
- Typography should have fixed title, body, caption, number, and display roles.
- Layouts should be constrained to archetypes such as hero, section divider, problem-solution, comparison, process, evidence, quote, and closing.
- New slides should assign content to existing archetypes instead of free-form placement.

## When The User Brings A PPT

1. Confirm usage rights and storage permission first.
2. Keep the raw file in a local-only raw folder by default.
3. Use `pptx_to_html.py` to extract text structure.
4. Record colors, fonts, spacing, layout families, and repeated components.
5. Create an internal template profile instead of copying the original.
6. Generate new deck-spec/HTML/PPTX outputs consistently from the template profile.

## Next Improvement Candidates

- Add a deterministic analyzer for PPTX theme XML, slide masters, placeholders, and color schemes.
- Generate thumbnails and classify layout archetypes from user-provided PPT files.
- Let Workspace Monitor search and filter the presentation reference catalog.

