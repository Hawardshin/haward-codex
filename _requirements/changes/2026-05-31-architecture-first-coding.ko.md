# 요구사항 변경: 아키텍처 우선 코딩

## 변경 요약

- `REQ-WS-015`를 추가한다.
- 소스 코드 작성 전 best-fit 아키텍처와 reference architecture를 조사하고 최소 두 개의 구조 후보와 선택 근거를 기록하도록 요구한다.

## 변경 이유

사용자가 소스코드는 당연히 best architecture를 찾아야 한다고 지시했다. 기존 `code_reference_sources`는 코드 예시 확인에는 충분하지만, 아키텍처 후보 비교와 선택 근거를 별도 필드로 강제하지 않았다.

## 영향

- `coding-research-agent` 입력과 readiness check에 architecture fields가 추가된다.
- 구현 전 코딩 조사 보고서에는 architecture reference, option, decision note가 필요하다.
- 문서와 설정 파일이 아키텍처 우선 코딩 정책을 반영한다.

## 검증

- `complete-coding-research` 테스트에서 architecture fields 누락 시 `more_research_required`가 되는지 확인한다.
- JSON 설정 파일과 config contract를 검증한다.

