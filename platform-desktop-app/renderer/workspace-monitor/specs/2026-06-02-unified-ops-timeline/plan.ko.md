# 계획: Unified Ops Timeline

## 범위

- `workspace-monitor` snapshot 수집기
- `workspace-monitor` snapshot 타입
- Overview와 History UI
- collector/readiness 테스트
- 요구사항, 검증, 히스토리, 평가 기록

## 단계

1. web-first intake로 통합 observability 기준을 확인한다.
2. 현재 `documents`, `historyDays`, `tasks`, `collaborationBoard` 수집 구조를 확인한다.
3. 기존 구조를 유지하면서 상위 집계 `unifiedOps`를 추가한다.
4. Overview와 History에 `Unified Ops` 패널을 추가한다.
5. collector test와 desktop readiness 문자열 검사를 보강한다.
6. collect/check/test/build/perf/static smoke로 검증한다.
7. requirements/spec/history/evaluation을 기록하고 commit/push한다.

## 리스크와 완화

- 대용량 snapshot 증가: `unifiedOps.events`를 160개로 제한한다.
- 문서 언어 필터가 monitoring event를 숨기는 문제: `monitor` sourceType은 language mode에서 숨기지 않는다.
- 기존 drill-down 상실: History/Agents/Desktop 탭은 유지하고 상위 통합 panel만 추가한다.
- 실제 시각 검증 부재: Browser MCP 도구가 없으면 static response와 built output 문자열 검사로 대체하고 제한을 기록한다.
