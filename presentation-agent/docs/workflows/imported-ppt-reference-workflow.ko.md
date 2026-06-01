# 사용자 제공 PPT 레퍼런스 workflow

## 목적

사용자가 PPT/PPTX 파일을 제공하면 그 파일을 그대로 복제하지 않고, 발표 에이전트가 일관성 있는 새 템플릿을 만들 수 있도록 디자인 구조를 추출한다.

## 입력

- 사용자 제공 PPT/PPTX 파일
- 사용 목적: 예시, 새 발표 템플릿, 스타일 분석, 기존 발표 개선 등
- 권한 확인: 사용자가 파일을 분석에 제공할 수 있는지, 원본 저장/커밋을 허용하는지

## 기본 저장 위치

- 원본 임시 위치: `presentation-agent/data/assets/raw/user-provided/`
- 기본 git 정책: 원본 PPT/PPTX는 `.gitignore`로 제외한다.
- 분석 산출물: `presentation-agent/docs/source-notes/` 또는 작업별 `specs/`/`docs/research/`

## 단계

1. 권한 확인
   - 사용자가 파일을 제공할 수 있는지 확인한다.
   - 원본 파일을 git에 넣어도 되는지 별도로 확인한다. 기본값은 넣지 않음이다.

2. 구조 추출
   - `pptx_to_html.py`로 텍스트와 슬라이드 순서를 추출한다.
   - 이 결과는 narrative 구조와 정보 밀도 확인용이며, faithful visual conversion으로 취급하지 않는다.

3. 디자인 토큰 기록
   - 색상 역할: primary, secondary, accent, neutral
   - typography 역할: display, title, body, caption, number
   - spacing scale, grid, safe area, image treatment, chart frame을 기록한다.

4. 레이아웃 archetype 분류
   - hero, section divider, problem-solution, comparison, process, evidence, quote, closing 중 어떤 family인지 표시한다.
   - 새 슬라이드는 이 family 중 하나에 배정한다.

5. Template profile 생성
   - 원본의 슬라이드별 디자인을 복제하지 않고 재사용 가능한 내부 규칙으로 재작성한다.
   - profile에는 token, layout archetype, component, source note, 금지된 복제 요소를 포함한다.

6. 생성 연결
   - `deck-spec`에는 template profile ID와 layout archetype을 기록한다.
   - HTML/PPTX 생성기는 token과 archetype을 따라 슬라이드 간 일관성을 유지한다.

## Genspark식 흐름 반영

- `strategy`: 발표 목적, 청중, 톤, 성공 기준을 정한다.
- `substance`: 근거 자료, 핵심 메시지, 사례, 수치를 정리한다.
- `structure`: 목차, 섹션, slide beat, 전환을 만든다.
- `design`: template profile, design token, layout archetype을 선택한다.
- `build`: HTML/PPTX를 생성하고 visual QA와 citation/source note를 확인한다.

## 금지

- 사용 권한이 불명확한 PPT 원본을 커밋하지 않는다.
- 원본 디자인을 공개 템플릿처럼 그대로 복제하지 않는다.
- 텍스트 추출 결과를 고품질 디자인 변환 결과로 설명하지 않는다.

