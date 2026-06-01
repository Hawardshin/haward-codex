# PPT 레퍼런스 확장 조사

## 조사 목적

발표 에이전트가 더 좋은 PPT 템플릿과 디자인 요소를 찾고, 사용자가 가져온 PPT를 일관성 있는 내부 템플릿으로 바꿀 수 있도록 출처와 운영 기준을 보강했다.

## 추가한 출처 묶음

- 한국 사용자 중심: 미리캔버스 프레젠테이션 템플릿, 미리캔버스 AI 프레젠테이션.
- 대형 템플릿 갤러리: Canva, Microsoft Create, Slidesgo, PresentationGO, Adobe Express, PPTMON.
- 제품/비즈니스형 레퍼런스: Pitch templates, Pitch presentation gallery.
- 디자인 도구형 레퍼런스: Figma Slides, Figma Community slide deck templates.
- AI slide workflow: Genspark AI Slides와 help guide.
- 오픈소스/연구: GitHub slideshow template topic, PPTAgent, PreGenie, OutlineSpark, DeepSlides.

## Genspark식 방식에서 가져올 점

- `strategy`: 청중, 목적, 톤, 성공 기준을 먼저 정한다.
- `substance`: 조사 자료, 메시지, 근거, 사례를 모은다.
- `structure`: 목차와 slide beat를 만든다.
- `design`: 템플릿 profile, 토큰, 레이아웃 archetype을 고정한다.
- `build`: HTML/PPTX 산출 후 QA와 출처 노트를 확인한다.

## 사용자 제공 PPT를 쓰는 방식

- 원본 파일은 기본적으로 `presentation-agent/data/assets/raw/user-provided/`에 두고 git에 넣지 않는다.
- 텍스트 구조는 `pptx_to_html.py`로 추출한다.
- 색상, 타이포그래피, spacing, grid, 반복 컴포넌트, 레이아웃 family를 `template profile`로 정리한다.
- 새 산출물은 원본 슬라이드 복제가 아니라 내부 profile을 기반으로 만든다.

## 디자인 일관성 기준

- 모든 슬라이드는 같은 token set을 사용한다.
- 슬라이드는 정해진 layout archetype 중 하나에 매핑한다.
- 섹션 전환, 문제-해결, 비교, 프로세스, 근거, 인용, 클로징 같은 반복 family를 유지한다.
- 예쁜 한 장보다 전체 deck의 리듬과 재사용성이 우선이다.

