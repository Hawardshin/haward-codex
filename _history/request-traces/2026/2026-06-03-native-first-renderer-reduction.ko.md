# 요청 추적: Native-first Renderer Reduction

## 요청

- 요청 ID: `UR-2026-06-03-049`
- 요약: 데스크톱 앱답게 native runtime을 더 많이 건드리고, 프론트 코드가 앱 책임을 들고 있는 부분을 덜어낸다.

## 구현

- `platform-desktop-app/src-tauri/src/lib.rs`에 native preference schema와 app config path를 추가했다.
- `get_desktop_preferences`, `save_desktop_preferences` Tauri command를 추가하고 `desktop-preferences.v1.json`에 저장하도록 했다.
- `MonitorShell.tsx`에서 `localStorage` 기반 UI 언어/theme/sidebar/terminal/runtime init/pinned section persistence를 제거했다.
- renderer는 native preference command를 load/save하고, 정적 browser preview에서는 기본값만 사용한다.
- 설정 데이터 탭에 `앱 설정 저장소`, 저장 상태, source, preferences path, 오류 상태를 표시했다.
- runtime contract와 readiness/test에 preference command surface와 no-localStorage guard를 추가했다.

## 검증

- `cargo fmt`: 통과
- `cargo test`: 통과
- `cargo build`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor test`: 17 tests 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 17 tests 통과
- `corepack pnpm --filter platform-desktop-app run check`: 통과

## 결과

- 첫 native-heavy slice가 완료됐다.
- 다음 native-heavy slice는 Rust native module split과 source editor/draft preference 이동이다.
