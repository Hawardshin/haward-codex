# 2026-06-07 리소스 확인: release marker 기능 이슈

## 리소스 위험

- 새 long-running process, server, watcher, network operation은 추가하지 않았다.
- 수정은 Node readiness script와 Node test에 한정된다.
- 최종 internal package/run은 기존 pipeline으로 실행하고 종료 상태를 확인한다.

## 결과

- targeted tests/checks는 종료 코드 0으로 완료됐다.
- 추가 리소스 누수 위험은 발견하지 못했다.
