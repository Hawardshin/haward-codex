# 2026-06-02 큰 범위 작업 분해 평가

## 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 재작업 필요 여부: 없음
- 사용자 요청: 범위가 너무 크거나 소스 파일이 너무 많아 문제가 되는 경우, 작업을 현명하게 쪼개서 처리하는 구조를 플랫폼에 반영한다.

## 반영 내용

- `REQ-WS-073`을 추가해 넓은 범위, 파일 과다, 컨텍스트 과다 작업은 구현이나 병렬 실행 전에 분해하도록 명시했다.
- `large-scope-decomposer-agent`와 `large-scope-decomposition-profile.json`을 추가했다.
- 새 프로필은 소스 인벤토리, 제외 규칙, 대표 샘플, 작업 슬라이스, 터치 경로, 머지 게이트, 검증 계획, 컨텍스트 예산을 산출하도록 정의한다.
- `AGENTS.md`, 영속 지시, 시작 워크플로, 병렬 작업 워크플로, 프롬프트 라우터, 메모리 부트스트랩에 연결했다.
- 요구사항, 스펙, 계획, 검증, 추적성, 웹 검색 기록, 요청 추적, 작업 요약, 타이밍 기록을 남겼다.

## 검증

- `check-omissions`: `coverage_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`
- `check-config-contract`: 큰 범위 분해 프로필 및 핵심 공유 설정 통과
- `inspect-agent`, `list-agents`: 새 에이전트 확인
- `check-memory-bootstrap`: 통과
- `check-agent-orchestration`: 통과
- `docs-audit`, `naming-audit`: 통과
- `workspace-index`, `workspace-monitor collect/build`: 통과
- `work-timer check`: 부분 측정 기록 통과

## 참고 근거

- Sourcegraph Cody Context: 코드베이스 컨텍스트 선택과 검색 기반 이해
- Nx Affected: 변경 영향 범위 산정
- Bazel Query Guide: 의존성 그래프와 질의 기반 탐색
- Google Engineering Practices Small CLs: 큰 변경을 작은 변경 단위로 나누는 실무 지침

## 남은 개선 아이디어

- 실제 대규모 리팩터링이 반복되면 프로젝트 스택별 의존성 그래프 수집기를 추가한다.
- 첫 실제 대규모 작업에 적용한 뒤 작업 슬라이스를 시각화하는 보드를 생성한다.
