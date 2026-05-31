# 웹 검색 기록: 발표 레퍼런스 수집

## 검색 일시

- 날짜: 2026-06-01
- 작업: `presentation-agent` 레퍼런스/에셋/HTML 변환 기반 생성

## 검색 쿼리

- `beautiful presentation design gallery best PowerPoint templates free license`
- `presentation design inspiration gallery pitch deck examples`
- `HTML presentation templates reveal.js impress.js slide deck examples`
- `PowerPoint to HTML conversion tools open source pptx html`
- `reveal.js HTML presentation framework official`
- `Slidev markdown presentation slides official`
- `Marp markdown presentation ecosystem official`
- `open source pptx to html converter GitHub`
- `official PowerPoint presentation templates Microsoft`
- `Canva presentation templates official`
- `Slidesgo presentation templates official`
- `SlidesCarnival presentation templates official`
- `presentation design inspiration Behance presentation deck official`
- `Dribbble presentation deck design official tag`
- `Pitch presentation templates official`
- `Figma presentation templates official`
- `free presentation assets icons official lucide heroicons material symbols`
- `free stock photos presentation assets official Unsplash Pexels`
- `presentation storytelling Nancy Duarte sparkline official`
- `TED speaker guide official presentation`

## 확인한 핵심 출처

- reveal.js: https://revealjs.com/
- Slidev: https://sli.dev/
- Marp: https://marp.app/
- PPTX2HTML 후보: https://github.com/g21589/PPTX2HTML
- pptx-to-html5 후보: https://pypi.org/project/pptx-to-html5/
- Microsoft Create PowerPoint templates: https://create.microsoft.com/en-us/powerpoint-templates
- Canva presentation templates: https://www.canva.com/presentations/templates/
- Slidesgo: https://slidesgo.com/
- SlidesCarnival: https://www.slidescarnival.com/
- Pitch templates: https://pitch.com/templates
- Figma Slides: https://www.figma.com/slides/
- Figma templates: https://www.figma.com/templates/
- Dribbble presentation tag: https://dribbble.com/tags/presentation
- Behance presentation design search: https://www.behance.net/search/projects/presentation%20design
- Unsplash: https://unsplash.com/
- Pexels: https://www.pexels.com/
- Duarte resources: https://www.duarte.com/presentation-skills-resources/
- TEDx Speaker Guide: https://storage.ted.com/tedx/manuals/tedxspeakerguide.pdf

## 약한 출처 또는 주의한 출처

- Reddit의 Slidesgo 프리미엄 다운로드 요청류 글은 법적/윤리적 위험이 있어 레퍼런스 수집 근거로 사용하지 않았다.
- 디자인 갤러리의 좋아요/조회수는 시각 품질 발견 신호로만 보고, 사실 근거나 사용 허가로 보지 않았다.
- 계정 가입이나 유료 구독이 필요한 템플릿은 원본 저장 대상에서 제외했다.

## 계획 반영

- HTML 발표는 reveal.js, Slidev, Marp 같은 `native_html` 프레임워크를 우선 후보로 둔다.
- PPT/PPTX 템플릿은 출처와 라이선스를 먼저 저장하고, 원본 저장이나 변환은 개별 라이선스 확인 후 진행한다.
- 발표 에셋은 `asset_reference`로 먼저 관리하고, 개별 사용 조건을 확인한 경우에만 `data/assets/raw/`에 저장한다.
- PPTX 변환 도구는 우선 텍스트 구조 추출용 Python 도구로 시작하고, 고품질 변환기는 추후 별도 조사와 설치 감사 후 채택한다.

## 불확실성

- 일부 템플릿 갤러리의 실제 다운로드 조건은 개별 템플릿마다 다를 수 있다.
- 오픈소스 변환기의 유지보수 상태와 변환 품질은 설치 전 별도 검증이 필요하다.
- 사진/아이콘/폰트의 라이선스는 출처 전체 조건과 개별 에셋 조건이 다를 수 있다.

