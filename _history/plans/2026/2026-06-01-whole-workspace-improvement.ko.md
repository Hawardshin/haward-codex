# 계획: 전체 Workspace 개선

## 관련 요청

- `UR-2026-06-01-016`

## 작업 모드

- `governance`

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-01-whole-workspace-improvement.ko.md`
- 로컬 감사:
  - `docs-audit`: `docs_ready`
  - `structure-audit`: `clean`
  - core config contract: `self_documenting`
  - memory bootstrap: `ready_to_bootstrap`

## 발견한 개선 지점

- `repository-map.md`가 일부 root folder를 generic purpose로 표시해, 이미 존재하는 root structure policy와 project registry를 충분히 활용하지 못했다.
- 전체 health check가 여러 명령으로 흩어져 있어 매번 기억하고 실행해야 했다.

## 실행 계획

1. `workspace-index`가 root structure policy와 project registry를 읽도록 개선한다.
2. repository map root folder table에 class/source를 추가한다.
3. `workspace-health` 도구를 추가해 핵심 감사와 테스트를 한 명령으로 묶는다.
4. 요구사항, spec, trace, summary, evaluation을 남긴다.
5. 전체 health check와 optional build까지 검증한다.

## 병렬화 판단

- 같은 navigation/history 파일과 git 상태를 건드리므로 병렬 실행하지 않는다.
