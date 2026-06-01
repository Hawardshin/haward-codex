# 웹 검색 기록: 디자인 요소 수집에서 PPT 생성까지

## 검색 일시

- 날짜: 2026-06-01
- 작업: 발표 제작 중 디자인 요소가 필요할 때 검색·수집 후 PPTX까지 생성하는 구조 추가

## 검색 쿼리

- `python-pptx official documentation create PowerPoint presentations`
- `Office Open XML PresentationML official documentation pptx structure`
- `PptxGenJS official documentation create PowerPoint JavaScript`
- `presentation design assets sourcing license best practices`

## 확인한 핵심 출처

- python-pptx documentation: https://python-pptx.readthedocs.io/en/latest/user/presentations.html
- Microsoft Learn PresentationML structure: https://learn.microsoft.com/pl-pl/office/open-xml/presentation/structure-of-a-presentationml-document
- Office Open XML PPTX anatomy: https://officeopenxml.com/anatomyofOOXML-pptx.php
- PptxGenJS npm: https://www.npmjs.com/package/pptxgenjs
- PptxGenJS GitHub: https://github.com/beautifulai/PptxGenJS
- Presentations skill local guidance: `/Users/shinjoungeun/.codex/plugins/cache/openai-primary-runtime/presentations/26.521.10419/skills/presentations/SKILL.md`

## 계획 반영

- Python 우선 정책은 유지하되, 최종 PPTX는 현재 사용 가능한 Presentations skill의 artifact-tool export를 우선 경로로 삼았다.
- `deck-spec`을 artifact-tool slide module workspace로 변환하는 Python 도구를 만들었다.
- `python-pptx`와 PptxGenJS는 강력한 후보지만 이번 작업에서는 설치하지 않았다.
- 디자인 요소가 필요할 때는 검색, 카탈로그/source notes 기록, 라이선스 게이트 후 PPTX에 반영하도록 문서화했다.

## 불확실성

- python-pptx, PptxGenJS, LibreOffice 같은 대체 경로는 설치/보안/라이선스/품질 검토 후에만 채택해야 한다.
- artifact-tool workspace는 현재 Codex Presentations skill 런타임이 있을 때 PPTX export까지 가능하다.

