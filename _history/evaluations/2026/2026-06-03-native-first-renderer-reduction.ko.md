# 작업 평가: Native-first Renderer Reduction

## 판정

- 상태: `passed`
- 요청 ID: `UR-2026-06-03-049`
- 범위: native preference store, renderer localStorage removal, runtime contract/readiness, customer snapshot regeneration

## 수용 기준

| 기준 | 상태 | 근거 |
| --- | --- | --- |
| native runtime을 실제로 건드린다 | 통과 | `DesktopPreferences`, app config path, Tauri get/save command 추가 |
| 프론트 설정 저장 책임을 덜어낸다 | 통과 | `MonitorShell.tsx`의 `localStorage` preference persistence 제거 |
| 사용자가 저장 상태를 볼 수 있다 | 통과 | settings data tab의 `앱 설정 저장소` panel |
| runtime contract와 일치한다 | 통과 | `preferences_commands` 추가 및 contract check 통과 |
| 회귀를 막는다 | 통과 | readiness script/test가 `localStorage`를 실패 조건으로 둔다 |
| 사용자 관점 gate를 적용한다 | 통과 | 저장 상태와 path를 설정 데이터 탭에 노출하고 기본 화면에는 raw path를 노출하지 않음 |

## 검증

- `cargo fmt`: passed
- `cargo test`: passed
- `cargo build`: passed
- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- Browser smoke on `http://127.0.0.1:3240/`: settings dialog opened, `데이터/운영` tab showed `앱 설정 저장소`, console error count `0`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: passed
- `git diff --check`: passed

## 잔여 위험

- packaged app 재실행 persistence smoke는 다음 packaging/browser runtime 검증에서 확인해야 한다.
- Rust native code가 여전히 `lib.rs`에 많아 다음 slice에서 module split이 필요하다.
