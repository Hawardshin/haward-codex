# 스펙: 런타임 리소스 누수 하드닝

## 상태

- 상태: `implemented`
- 날짜: 2026-06-03
- 소유 프로젝트: `platform-desktop-app/`
- 공유 UI: `workspace-monitor/`
- 요구사항: `PDA-REQ-028`
- 출처 요청: `UR-2026-06-03-019`

## 문제

설치형 플랫폼은 CLI child process, stdout/stderr reader thread, active polling interval, snapshot fetch를 장시간 다룬다. 완료된 session과 비동기 작업이 cleanup 없이 남으면 메모리, process, thread, timer, network resource가 누적될 수 있다.

## 동작

- Rust CLI session은 완료 시 `finished_at`을 기록한다.
- 완료 session은 30분 retention 또는 최대 40개 retained finished session 기준을 넘으면 session store에서 제거한다.
- session cleanup은 완료 reader thread handle을 join 가능한 경우 회수한다.
- child process kill 경로는 `kill()` 후 `wait()`까지 호출해 zombie process 가능성을 줄인다.
- `SnapshotLoader`는 unmount 시 fetch를 abort한다.
- Desktop runtime panel은 initial async refresh가 unmount 후 state를 업데이트하지 않도록 mounted ref를 확인한다.
- 기존 active session polling interval은 cleanup에서 `clearInterval`을 호출한다.

## 비범위

- 실제 public updater 구현
- OS별 long-running daemon 도입
- 외부 CLI 자동 설치
- 장시간 soak test 자동화
