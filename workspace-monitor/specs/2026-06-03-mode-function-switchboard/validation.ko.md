# 검증: 모드와 기능 선택 위치 스위치보드

## 검증 결과

- `npm --prefix workspace-monitor run collect`: passed
- `npm --prefix workspace-monitor test`: passed
- `npm --prefix workspace-monitor run check`: passed
- `npm --prefix workspace-monitor run build`: passed
- `npm --prefix workspace-monitor run perf:budget`: passed
- `npm --prefix platform-desktop-app test`: passed
- `npm --prefix platform-desktop-app run check`: passed, Rust toolchain missing warning only
- 정적 서버 smoke: passed, `workspace-snapshot.json`에서 `modeFunctionCatalog`, `modeGroups`, `modeOptions`, `Desktop Session Mode`, `Task Pipe Preset` 확인
- build 산출물 smoke: passed, `Mode & Function Switchboard`, `모드와 기능 선택 위치`, `mode-switchboard-panel`, `modeFunctionCatalog` 확인

## 수동 확인 포인트

- Overview에 switchboard가 보인다.
- View/Language 옵션은 현재 UI 상태를 바꾼다.
- Desktop 관련 옵션은 Desktop 섹션으로 이동한다.
- Monitor Section 옵션은 해당 섹션으로 이동한다.
