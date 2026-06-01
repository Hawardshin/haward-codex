# 계획 기록: 디자인 요소 수집에서 PPT 생성까지

## 작업 모드

- 선택 모드: `standard`
- 이유: 발표 에이전트에 지속 규칙, PPTX 산출 경로, 실제 PPTX artifact, 테스트, 히스토리, 평가를 추가하는 구현 작업이다.

## 근거

- 사용자가 발표 제작 중 디자인 요소가 필요하면 검색·수집해서 PPT를 만들어야 한다고 지시했다.
- 웹 검색으로 python-pptx, PresentationML, PptxGenJS를 확인했다.
- 현재 세션에서는 Presentations skill의 artifact-tool 런타임이 동작하므로 최종 PPTX export 경로로 우선 사용했다.

## 실행 계획

1. 디자인 검색-수집-PPT 생성 워크플로를 문서화한다.
2. `deck-spec`을 artifact-tool workspace로 바꾸는 도구를 만든다.
3. 샘플 deck spec으로 실제 PPTX를 생성한다.
4. contact sheet와 PPTX 구조를 검증한다.
5. 요구사항, 스펙, 히스토리, 평가를 갱신한다.
6. 커밋하고 푸시한다.

