# Runtime Run Timeline 스펙

## 목표

Desktop Runtime의 실행 기록/결정함 영역에서 사용자가 raw stdout/stderr나 JSON을 보기 전에 현재 작업 흐름을 판단할 수 있도록 `Run Timeline` 패널을 추가한다.

## 범위

- `MonitorShell.tsx`에 `RuntimeRunTimelineItem` 타입과 `runtimeRunTimelineItems` 계산을 추가한다.
- `runRecordsOpen` disclosure 내부 최상단에 `runtime-run-timeline-panel`을 렌더링한다.
- `globals.css`에 타임라인 요약/항목 스타일을 추가한다.
- `product-feature-registry.json`의 Work Visibility surface와 validation gate를 갱신한다.
- readiness test가 새 feature token을 확인하게 한다.
- desktop package pipeline이 customer snapshot 잔여 상태에서도 developer snapshot을 먼저 준비하도록 보강한다.

## 비범위

- 새 task-run 저장소 schema 생성.
- Tauri command 추가.
- 새 npm/Rust dependency 설치.
- raw log, decision answer flow, terminal drawer 동작 변경.

## 수용 기준

- `runtimeRunTimelineItems`는 열린 결정, 활성 세션, task run, 최신 pipe, output event를 작은 배열로 정규화한다.
- pending/open/active/failure 신호가 일반 완료 기록보다 먼저 보인다.
- timeline item 클릭은 기존 선택/로그/터미널 동작으로 이어진다.
- TypeScript, readiness tests, renderer build, desktop internal package가 통과한다.
- `package:internal`은 직전 customer build 후에도 developer snapshot collect를 먼저 실행해 history payload check를 통과한다.
