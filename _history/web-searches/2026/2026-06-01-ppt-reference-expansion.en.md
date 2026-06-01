# Web Search Record: PPT Reference Expansion

## Overview

- Date: 2026-06-01
- User request summary: expand presentation-agent with better PPT references, template sources such as MiriCanvas, design assets, open-source/file candidates, a way to use user-provided PPT files as references, and Genspark-style generation ideas for consistent high-quality templates.
- Work mode: `standard`

## Queries

- `best presentation template sources PPT templates Canva Slidesgo Pitch Figma community Microsoft create Genspark AI slides references`
- `Genspark AI slides presentation generation templates design consistency references`
- `open source presentation templates pptx html reveal.js marp slidev pptxgenjs templates`
- `MiriCanvas presentation templates 미리캔버스 프레젠테이션 템플릿`
- `Canva presentation templates official site canva.com presentations`
- `Slidesgo presentation templates official free templates PowerPoint Google Slides`
- `Pitch presentation templates gallery official`
- `Microsoft Create PowerPoint presentation templates official`
- `Figma community presentation templates official presentation deck templates`
- `Adobe Express presentation templates official`

## Sources Checked

| Source | URL | Type | What Was Checked |
| --- | --- | --- | --- |
| MiriCanvas presentation templates | https://www.miricanvas.com/templates/presentation | template_gallery | Added as a Korea-friendly presentation template source to collect as metadata first. |
| MiriCanvas AI presentation | https://www.miricanvas.com/ai-presentation | ai_presentation_tool | Used as an AI presentation workflow reference; raw template storage remains blocked until item terms are checked. |
| Genspark AI Slides | https://www.genspark.ai/ai-slides | ai_presentation_tool | Checked AI slide generation, PPTX export/import, and template-related flow. |
| Genspark AI Slides help | https://www.genspark.ai/help/how-to-create-a-slideshow-with-genspark-ai-slides | ai_presentation_tool | Used the staged Strategy/Substance/Structure/Design/Build flow and user-template upload idea as workflow inspiration. |
| Microsoft Create PowerPoint templates | https://create.microsoft.com/en-us/powerpoint-templates | template_gallery | Official PowerPoint template gallery; use item-level terms before reuse. |
| Microsoft PowerPoint templates support | https://support.microsoft.com/en-us/office/use-a-personal-template-to-create-a-new-powerpoint-presentation-8c9b67c2-3317-4635-b3d7-3c8b68b6d881 | official_docs | Used as evidence for a personal template reuse workflow. |
| Canva presentations templates | https://www.canva.com/presentations/templates/ | template_gallery | Large presentation template gallery; use for style analysis and HTML reconstruction, not raw mirroring. |
| Slidesgo templates | https://slidesgo.com/ | template_gallery | PowerPoint/Google Slides template source; free/premium/attribution terms need item-level review. |
| PresentationGO | https://www.presentationgo.com/ | template_gallery | Template and diagram source for PowerPoint/Google Slides. |
| Pitch templates | https://pitch.com/templates | template_gallery | Modern business/SaaS presentation structure reference. |
| Pitch presentation gallery | https://pitch.com/presentations | design_gallery | Public presentation examples for flow and layout inspiration. |
| Figma Slides | https://www.figma.com/slides/ | template_gallery | Design-tool-based slide creation and collaboration workflow reference. |
| Figma Community slide deck templates | https://www.figma.com/community/search?resource_type=mixed&sort_by=popular&query=slide%20deck%20presentation | template_gallery | Community popularity/duplicate signals are discovery signals only; item-level license checks remain required. |
| Adobe Express presentation templates | https://www.adobe.com/express/templates/presentation | template_gallery | Official presentation template source. |
| PPTMON | https://pptmon.com/ | template_gallery | Free PowerPoint/Google Slides template candidate; item-level license and attribution checks required. |
| slideshow-templates GitHub topic | https://github.com/topics/slideshow-template | open_source | Discovery seed for open-source slide/template implementations. |
| PPTAgent | https://arxiv.org/abs/2501.03936 | ai_presentation_research | Used for reference-presentation style learning ideas in LLM-based presentation generation. |
| PreGenie | https://arxiv.org/abs/2501.03436 | ai_presentation_research | Used for outline, presenter notes, and layout generation flow ideas. |
| OutlineSpark | https://arxiv.org/abs/2503.07610 | ai_presentation_research | Used for turning scripts or long-form text into outlines and slide structures. |
| DeepSlides | https://arxiv.org/abs/2505.09859 | ai_presentation_research | Used for manuscript-grounded slide generation with knowledge retrieval. |

## Insights Used In The Plan

- Template galleries such as MiriCanvas, Canva, and Slidesgo have high design value, but raw storage is blocked until item-level terms are checked.
- The Genspark-style model is useful as a workflow: topic input, research/structure, design stage, template application, and PPTX export/import. Quality still depends on fixed design tokens and layout archetypes.
- User-provided PPT files can be safer reference material than random online decks when the user confirms usage rights. Default storage should be local-only until rights are clear.
- Good templates are consistent systems: color, type, grid, components, section rhythm, and layout families matter more than isolated beautiful slides.

## Weak Or Ignored Sources

- Reddit/community posts were used only for real-user pain, quality issue, and prompt-tip discovery.
- Unofficial template mirrors and untraceable PPT sharing sites were not used.

## Public Decision Summary

This change does not bulk-download raw PPT files. It expands the presentation-agent catalog with PPT/AI slide/source candidates and adds a safe workflow for turning user-provided PPT files into reusable design tokens and layout archetypes.

