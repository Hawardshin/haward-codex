# 2026-06-01 PPT 레퍼런스 확장 평가

## 평가 입력

- 작업 모드: `standard`
- 초기 지시: PPT 레퍼런스를 더 찾고, 미리캔버스도 포함하며, 사용자가 가져온 PPT를 레퍼런스로 활용하고, 디자인 요소와 오픈소스/파일 후보 및 Genspark식 생성 방식을 참고해 일관성 있는 좋은 템플릿을 만들라고 요청함.
- 결과 요약: `presentation-agent`의 PPT/template catalog를 확장하고, 사용자 제공 PPT를 local-only로 분석해 design token/layout archetype/template profile로 전환하는 workflow와 일관성 있는 템플릿 생성 정책을 추가했다.

## 확인한 레퍼런스

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

## 검증

- `PYTHONPATH=src python3 -m presentation_agent.catalog data/reference-index/starter-reference-catalog.json`: pass, 82 records
- `PYTHONPATH=src python3 -m unittest discover -s tests` from `presentation-agent/`: 10 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../presentation-agent/configs/collection-policy.json ../presentation-agent/data/reference-index/starter-reference-catalog.json`: `self_documenting`
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated
- `python3 _tools/workspace-health/src/workspace_health.py --category governance`: 7 checks passed
- `npm run build` from `workspace-monitor/`: passed
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`

## 평가 결과

- 상태: `ready_to_close`
- blocking gap: 없음
- 커밋/push: `d0ffdc1` pushed
- 개선 아이디어:
  - 사용자가 실제 PPT를 제공하면 PPTX theme/master/layout에서 design token을 추출하는 deterministic analyzer를 추가한다.
  - 첫 실제 PPT 분석 후 template-profile JSON schema와 renderer support를 추가한다.

## 주요 산출물

- `presentation-agent/data/reference-index/starter-reference-catalog.json`
- `presentation-agent/docs/workflows/imported-ppt-reference-workflow.ko.md`
- `presentation-agent/configs/collection-policy.json`
- `presentation-agent/data/assets/raw/user-provided/README.ko.md`
- `presentation-agent/docs/research/2026-06-01-ppt-reference-expansion.ko.md`
- `presentation-agent/specs/2026-06-01-ppt-reference-expansion/`
- `_history/web-searches/2026/2026-06-01-ppt-reference-expansion.ko.md`

## evaluator 출력 요약

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
