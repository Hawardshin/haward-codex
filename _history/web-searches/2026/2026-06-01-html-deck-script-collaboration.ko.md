# 웹 검색 기록: HTML 발표 덱과 스크립트 협업

## 검색 일시

- 날짜: 2026-06-01
- 작업: 발표 스크립트와 협업하는 HTML 발표 덱 생성기 구현

## 검색 쿼리

- `reveal.js speaker notes markdown HTML presentation official`
- `Slidev speaker notes presenter mode official`
- `Marp speaker notes markdown presentation official`
- `HTML presentation accessibility keyboard navigation best practices`

## 확인한 핵심 출처

- reveal.js speaker view: https://revealjs.com/speaker-view/
- reveal.js official: https://revealjs.com/
- reveal.js Markdown notes: https://revealjs.com/markdown/
- Slidev UI and notes editing: https://sli.dev/guide/ui
- Marp official: https://marp.app/
- Pandoc reveal.js speaker notes: https://pandoc.org/demo/example33/10.5-speaker-notes.html

## 계획 반영

- `deck-spec`에 발표자 노트와 `script_beat`를 포함해 발표 스크립트와 슬라이드 렌더링을 분리했다.
- 생성 HTML은 발표 화면과 발표자 노트 패널을 모두 포함한다.
- HTML 덱은 키보드 이동과 진행률을 기본 기능으로 제공한다.
- Marp처럼 HTML/PDF/PPTX로 이어질 수 있는 구조를 염두에 두되, 이번 작업에서는 외부 도구를 설치하지 않았다.

## 불확실성

- 실제 발표 상황에서의 화면 비율, 폰트 렌더링, 발표자 노트 사용성은 브라우저별 시각 검증이 더 필요하다.
- 고급 presenter mode는 향후 reveal.js, Slidev, Marp 같은 기존 프레임워크를 설치 검토한 뒤 대체할 수 있다.

