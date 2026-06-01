# 디자인 요소 수집에서 PPT 생성까지

## 목적

발표 제작 중 디자인 요소가 필요해지면 검색, 수집, 출처 기록, 라이선스 확인, HTML/PPT 산출까지 이어지는 반복 루프를 사용한다.

## 기본 순서

1. 디자인 필요 지점을 특정한다.
   - 예: 표지 이미지, 아이콘, 비교 다이어그램, 분위기 레퍼런스, 발표 리듬.
2. 웹 검색을 먼저 실행한다.
   - 공식/원천 출처, 템플릿 갤러리, 디자인 갤러리, 에셋 라이브러리, 논문/가이드를 분리한다.
3. 카탈로그에 출처를 저장한다.
   - URL, 접근일, 라이선스 상태, `download_allowed`, `quality_signals`, `html_conversion`을 기록한다.
4. 라이선스 게이트를 통과한 에셋만 `data/assets/`에 저장한다.
   - 불명확한 자료는 영감과 메타데이터로만 사용한다.
5. 발표 스크립트 에이전트가 `deck-spec`을 갱신한다.
   - `script_beat`, `speaker_notes`, `evidence_sources`, 디자인 의도를 함께 기록한다.
6. HTML과 PPT를 모두 생성한다.
   - HTML: `presentation_agent.html_deck`
   - PPTX: `presentation_agent.artifact_pptx`로 artifact-tool workspace를 만들고 Presentations skill의 artifact-tool export를 사용한다.
7. 검증한다.
   - 테스트, 카탈로그 출처 ID, 원격/무허가 에셋 여부, PPTX export, preview/contact sheet를 확인한다.

## PPTX 원칙

- 최종 PPTX는 editable PowerPoint 산출물이어야 한다.
- 가능한 경우 Presentations skill의 artifact-tool export를 우선한다.
- `python-pptx`, PptxGenJS, LibreOffice, 직접 OOXML 편집은 설치/보안/라이선스/품질 검토 후 채택한다.
- 외부 디자인을 복제하지 않고, 수집한 레퍼런스의 구조적 패턴만 재해석한다.

