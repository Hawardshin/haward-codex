# 2026-06-07 소스 에디터 draft 상태 helper 분리 리소스 점검

## 리스크

- 변경 자체는 React 상태 helper 분리이며 새 long-running process, timer, socket, worker를 추가하지 않았다.
- 기존 `sourceDraftSyncTimerRef` 정리 경로는 유지했다.

## 확인

- `clearSourceDraftSyncTimer()` 호출 경로를 유지했다.
- draft helper는 순수 객체 변환만 수행한다.
- 내부 패키징은 통과했으며 새 dev server 포트나 새 장기 실행 프로세스는 추가하지 않았다.

## 결론

- `resource_risk_occurred`: `false`
