# Accumulated Data Surface 계획

## 작업 모드

- `ship_first`
- 이유: 사용자가 반복 지적한 제품 기능 gap이므로 먼저 작동하는 데이터 보기 surface를 구현하고, retention/export 고급 설정은 별도 slice로 남긴다.

## 구현 결정

- 언어 선택: Rust/Tauri backend + TypeScript/React UI.
- Rust를 선택한 이유: app data/log/resource directory와 file metadata를 OS 경계 안에서 직접 다루고 symlink를 따르지 않는 bounded scan을 구현하기 좋다.
- TypeScript를 선택한 이유: 이미 `workspace-monitor`가 데스크톱 제품 UI source이며, metric/command/panel 상태를 기존 Desktop Runtime에 통합할 수 있다.

## 아키텍처 옵션

- 옵션 A: 기존 `Runtime Data & Support`, `Task Run Store`, `Decision Inbox`에 흩어진 정보를 그대로 둔다. 기각. 사용자가 축적 데이터를 한눈에 볼 수 없다.
- 옵션 B: 새 `get_accumulated_data_overview` command와 `Accumulated Data` 패널을 추가한다. 선택. backend contract와 UI를 동시에 고정할 수 있다.
- 옵션 C: 모든 누적 기록을 즉시 SQLite로 migration한다. 보류. 동시 write/query가 본격화되면 맞지만, 지금은 task-run JSON/log, decision inbox, support/audit artifact가 이미 파일 provenance를 갖고 있으므로 작은 manifest layer가 더 안전하다.
- 옵션 D: 기존 file-record stores를 유지하되, UI와 shell이 읽을 versioned `accumulated-data-overview.v1.json` manifest를 저장한다. 선택. 현재 데이터 손상 없이 저장 포맷을 제품 조회 기준으로 승격할 수 있다.
- 옵션 C: 파일 탐색기형 raw directory browser를 만든다. 기각. platform source 노출과 민감 경계 위험이 커지고 제품 flow가 흐려진다.

## 폴더 구조 결정

- 기존 `runtime-data-features` spec을 수정하지 않고 새 spec folder를 만든다.
- 이유: 이전 spec은 runtime root/audit/support/customer snapshot 기능이고, 이번 slice는 사용자 가시성 surface와 contract command를 소유한다.

## 검증 계획

- `cargo fmt`
- `cargo check`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run runtime:contract`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- Browser smoke for Desktop Runtime accumulated data panel.
