# 요구사항 변경: Workspace Health와 Source-of-Truth Navigation

## 변경 요약

- 추가 요구사항: `REQ-WS-032`
- 관련 요청: `UR-2026-06-01-016`
- 변경일: 2026-06-01

## 변경 내용

전체 저장소 개선 요청에 따라 repository navigation과 health check가 흩어진 수동 절차가 아니라 source-of-truth 설정을 직접 읽는 구조여야 한다는 요구사항을 추가했다.

## 근거

- `repository-map.md`가 일부 root folder를 generic purpose로 표시해, 이미 존재하는 root structure policy와 project registry를 충분히 활용하지 못했다.
- 전체 점검은 `docs-audit`, `structure-audit`, config contract, memory bootstrap, 각 프로젝트 테스트, 각 도구 테스트로 나뉘어 있어 한 번에 실행하기 어려웠다.

## 영향

- `_tools/workspace-index/`는 root folder class/purpose/source를 policy/registry에서 읽어 map에 표시한다.
- `_tools/workspace-health/`는 핵심 감사와 테스트를 한 명령으로 실행한다.
