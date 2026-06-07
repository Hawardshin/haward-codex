# 2026-06-07 리소스 점검: 설정 동기화 공통 훅

- 리소스 리스크:
  - debounce timer.
  - async refresh queue.
  - 여러 refresh task의 `Promise.allSettled` 실행.
- 적용한 제어:
  - hook unmount cleanup에서 timer를 해제한다.
  - in-flight 중 추가 요청은 queued options로 병합한다.
  - 수동/자동 동기화가 같은 queue와 busy 상태를 공유한다.
  - 실패 시 notice, error, action feedback이 같은 경로로 업데이트된다.
- 장기 실행 프로세스:
  - 새 서버나 watcher를 만들지 않았다.
  - 패키징 명령은 close-out 검증으로만 실행한다.

