# 미뤄진 작업 커버리지 감사 스펙

## 목표

최근 설치형 데스크톱 에이전트 플랫폼 요청 중 구현된 것, 부분 구현된 것, 아직 제품 기능으로 닫히지 않은 것을 재평가한다.

## 범위

- `UR-2026-06-03-024`부터 `UR-2026-06-03-036`까지의 데스크톱 앱, 코드 워크벤치, installer shell/runtime, 데이터 축적, workspace host, 제품 기능 아키텍처, Operator Center 분리 요청.
- `_history/request-traces/2026/`, `platform-desktop-app/specs/`, `platform-desktop-app/configs/`, readiness/test, 대표 runtime/UI source.
- `_private/`, `outputs/`, generated build/cache/dependency output은 제외한다.

## 요구사항

- 각 사용자 요청은 구현 증거와 남은 gap ID를 가진다.
- 남은 gap은 priority, source request, acceptance criteria, recommended next slice를 가진다.
- Agent Factory creation wizard와 Learning feedback automation loop가 아직 제품 기능으로 닫히지 않았으면 readiness/test가 이를 숨기지 않고 고정한다.
- 이미 완료된 작업을 미완료처럼 보이게 하는 stale trace/task 문구는 정정한다.

## 비범위

- 이번 감사에서 Agent Factory wizard 자체를 새로 구현하지 않는다.
- 공개 배포 서명, notarization, updater, clean-machine smoke는 외부 release gate로 기록하고 완료 처리하지 않는다.
