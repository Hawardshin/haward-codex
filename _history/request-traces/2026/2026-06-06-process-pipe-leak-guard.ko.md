# 요청-결과 추적: 프로세스/파이프 누수 방지

## 요청

프로세스 관리, pipe 관리, 메모리 누수가 없도록 처리.

## 결과

- CLI/PTY session lifecycle cleanup 강화.
- Unix process group 기반 cleanup 추가.
- reader thread grace join과 PTY master/writer explicit drop 추가.
- readiness tests에 lifecycle contract 추가.

## 산출물

- `platform-desktop-app/docs/requirements/2026-06-06-process-pipe-leak-guard.ko.md`
- `platform-desktop-app/specs/2026-06-06-process-pipe-leak-guard/`
- `_history/resource-checks/2026/2026-06-06-process-pipe-leak-guard.json`
- `_history/evaluations/2026/2026-06-06-process-pipe-leak-guard.ko.md`

## 검증

- `platform-desktop-app test`: 통과.
- `cargo check`: 통과.
- `cargo test`: 통과.
- 내부 패키징 빌드: 통과.

## Commit

- 예정.
