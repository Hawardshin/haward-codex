# 2026-06-07 desktop monitor panel split continuation timing

## 단계

- 구조 탐색 및 panel split 설계: 약 5분
- `DesktopControlPanel`, `AccumulatedDataPanel`, `WorkspaceHostPanel` 구현: 약 15분
- TypeScript/check 반복 검증: 약 3분
- 테스트 묶음 검증: 약 3분
- 내부 패키징 및 앱 open 검증: 약 1분 이상

## 병목

- 가장 큰 시간 사용은 전체 내부 패키징과 Tauri release build였다.
- 다음 구조 개선은 `Task Pipe`와 run records 영역을 추가 분리하면 `MonitorShell.tsx` 줄 수를 더 줄일 수 있다.
