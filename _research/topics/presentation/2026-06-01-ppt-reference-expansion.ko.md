# PPT 레퍼런스 확장 조사 요약

## 핵심 결론

- 템플릿 출처는 `metadata-first`로 관리한다. 미리캔버스, Canva, Slidesgo, Pitch, Figma, Adobe Express 같은 출처는 디자인 참고 가치가 높지만 원본 파일 저장은 item별 약관 확인 후에만 허용한다.
- 사용자가 직접 가져오는 PPT는 좋은 레퍼런스가 될 수 있다. 이 경우 원본을 복제하는 것이 아니라 `design tokens`, `layout archetypes`, `component rules`, `section rhythm`을 추출해 자체 템플릿으로 재구성한다.
- Genspark식 slide 생성은 자동 생성 그 자체보다 단계 구조가 중요하다. `strategy -> substance -> structure -> design -> build` 흐름을 presentation-agent의 workflow로 흡수한다.

## 수집 출처 묶음

- 한국/일반 템플릿: 미리캔버스, Canva, Microsoft Create, Slidesgo, PresentationGO, PPTMON.
- 제품형/비즈니스 템플릿: Pitch templates, Pitch presentation gallery.
- 디자인 도구형: Figma Slides, Figma Community slide deck templates, Adobe Express.
- 오픈소스 후보: GitHub slideshow template topic, 기존 reveal.js/Slidev/Marp catalog.
- AI 생성 연구: PPTAgent, PreGenie, OutlineSpark, DeepSlides.

## 템플릿 품질 기준

- 모든 슬라이드는 하나의 design system에서 나온 것처럼 보여야 한다.
- 색상은 primary/secondary/accent/neutral 역할을 고정한다.
- typography는 title/body/caption/number/display 역할을 고정한다.
- 레이아웃은 hero, section divider, problem-solution, comparison, process, evidence, quote, closing 등 archetype으로 제한한다.
- 새 슬라이드는 자유 배치가 아니라 기존 archetype에 content를 배정한다.

## 사용자가 PPT를 가져오는 경우

1. 사용 권한과 저장 가능 여부를 먼저 확인한다.
2. 원본 파일은 기본적으로 git에 넣지 않는 local-only raw folder에 둔다.
3. `pptx_to_html.py`로 텍스트 구조를 추출한다.
4. 수작업/도구로 색상, 폰트, spacing, layout family, 반복 컴포넌트를 기록한다.
5. 원본 복제가 아니라 자체 template profile을 만든다.
6. 새 deck-spec/HTML/PPTX는 template profile을 기준으로 일관되게 생성한다.

## 다음 개선 후보

- PPTX에서 theme XML, slide master, placeholder, color scheme을 추출하는 deterministic analyzer를 추가한다.
- 사용자가 가져온 PPT의 썸네일을 만들고 layout archetype을 자동 분류한다.
- Workspace Monitor에서 presentation reference catalog를 검색/필터링해 볼 수 있게 한다.

