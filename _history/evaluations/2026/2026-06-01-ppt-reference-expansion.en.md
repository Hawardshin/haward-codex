# 2026-06-01 PPT Reference Expansion Evaluation

## Evaluation Input

- Work mode: `standard`
- Initial instruction: Find more PPT references, include MiriCanvas, support user-provided PPT files as references, research design elements plus open-source/file candidates, and use Genspark-style generation ideas for consistent high-quality templates.
- Result summary: Expanded the `presentation-agent` PPT/template catalog and added a workflow/policy for turning user-provided PPT files into local-only analyzed design tokens, layout archetypes, and template profiles.

## References Checked

- MiriCanvas presentation templates: https://www.miricanvas.com/templates/presentation
- MiriCanvas AI presentation: https://www.miricanvas.com/ai-presentation
- Genspark AI Slides: https://www.genspark.ai/ai-slides
- Genspark slideshow guide: https://www.genspark.ai/help/how-to-create-a-slideshow-with-genspark-ai-slides
- Microsoft Create PowerPoint templates: https://create.microsoft.com/en-us/powerpoint-templates
- Microsoft PowerPoint personal template support: https://support.microsoft.com/en-us/office/use-a-personal-template-to-create-a-new-powerpoint-presentation-8c9b67c2-3317-4635-b3d7-3c8b68b6d881
- Canva presentation templates: https://www.canva.com/presentations/templates/
- Slidesgo: https://slidesgo.com/
- PresentationGO: https://www.presentationgo.com/
- Pitch templates: https://pitch.com/templates
- Pitch presentation gallery: https://pitch.com/presentations
- Figma Slides: https://www.figma.com/slides/
- Figma Community slide deck templates search: https://www.figma.com/community/search?resource_type=mixed&sort_by=popular&query=slide%20deck%20presentation
- Adobe Express presentation templates: https://www.adobe.com/express/templates/presentation
- PPTMON: https://pptmon.com/
- GitHub slideshow-template topic: https://github.com/topics/slideshow-template
- PPTAgent: https://arxiv.org/abs/2501.03936
- PreGenie: https://arxiv.org/abs/2501.03436
- OutlineSpark: https://arxiv.org/abs/2503.07610
- DeepSlides: https://arxiv.org/abs/2505.09859

## Verification

- `PYTHONPATH=src python3 -m presentation_agent.catalog data/reference-index/starter-reference-catalog.json`: pass, 82 records
- `PYTHONPATH=src python3 -m unittest discover -s tests` from `presentation-agent/`: 10 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../presentation-agent/configs/collection-policy.json ../presentation-agent/data/reference-index/starter-reference-catalog.json`: `self_documenting`
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated
- `python3 _tools/workspace-health/src/workspace_health.py --category governance`: 7 checks passed
- `npm run build` from `workspace-monitor/`: passed
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`

## Evaluation Result

- Status: `ready_to_close`
- Blocking gaps: none
- Commit/push: pending
- Improvement ideas:
  - Add a deterministic analyzer for extracting design tokens from PPTX theme/master/layout files when the user provides a real deck.
  - Add a template-profile JSON schema and renderer support after the first real PPT analysis.

## Main Artifacts

- `presentation-agent/data/reference-index/starter-reference-catalog.json`
- `presentation-agent/docs/workflows/imported-ppt-reference-workflow.en.md`
- `presentation-agent/configs/collection-policy.json`
- `presentation-agent/data/assets/raw/user-provided/README.en.md`
- `presentation-agent/docs/research/2026-06-01-ppt-reference-expansion.en.md`
- `presentation-agent/specs/2026-06-01-ppt-reference-expansion/`
- `_history/web-searches/2026/2026-06-01-ppt-reference-expansion.en.md`

## Evaluator Output Summary

```json
{
  "status": "ready_to_close",
  "requires_rework": false,
  "work_mode": "standard",
  "gaps": [],
  "improvements": [
    "Build a deterministic PPTX design-token analyzer for user-provided files.",
    "Add a template-profile JSON schema and renderer support after the first real user-provided PPT is analyzed."
  ]
}
```
