# 2026-06-07 사용자 요청 요약: 이어서 구현

## 요청 요약

Service Readiness panel split 이후 계속 구현을 이어 달라는 요청.

## 선택한 구현

- `MonitorShell.tsx`에 남아 있던 `Task Run Store` UI를 `TaskRunStorePanel.tsx`로 분리한다.
- 실행 기록 목록, prune 버튼, summary strip, 로그 preview/detail UI는 유지한다.
- readiness script/test와 workspace monitor test가 새 feature 파일을 함께 검사하도록 갱신한다.

## 제외

- CLI task run 저장소의 Rust command 동작 자체는 변경하지 않는다.
