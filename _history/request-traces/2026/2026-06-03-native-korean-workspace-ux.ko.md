# 요청-결과 추적: 네이티브 한국어 작업공간 UX

- 날짜: 2026-06-03
- 요청 ID: `UR-2026-06-03-039`
- 소유 프로젝트: `platform-desktop-app/`
- 작업 모드: `standard`

## 요청 요약

사용자는 설치형 데스크톱 앱이 영어와 모호한 문구 때문에 사용법을 알기 어렵고, 파일시스템을 직접 보거나 활용하지 못해 여전히 웹처럼 느껴진다고 지적했다. 한국어 우선, 클릭 중심, 네이티브 앱다운 파일/작업공간 UX를 요구했다.

## 결과

- `파일/코드` 섹션을 정적 source snapshot viewer에서 native file workspace panel로 교체했다.
- UI label, sidebar, command palette, settings dialog를 한국어 우선으로 조정하고 UI language state를 추가했다.
- 설정 팝업에 `화면 언어` 선택을 추가하고 문서 언어 필터와 분리했다.
- `tauri-plugin-dialog`를 설치하고 `choose_desktop_workspace_folder` command를 추가했다.
- `dialog:default` capability와 installer shell runtime contract command surface를 갱신했다.
- readiness/test가 새 요구사항, Tauri dialog dependency/capability, 한국어 파일 작업공간 UI token을 검증하게 했다.

## 주요 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/src-tauri/Cargo.toml`
- `platform-desktop-app/src-tauri/Cargo.lock`
- `platform-desktop-app/src-tauri/capabilities/default.json`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/specs/2026-06-03-native-korean-workspace-ux/`
- `platform-desktop-app/artifacts/2026-06-03-native-korean-workspace-ux/browser-native-file-workspace.png`
- `_history/installations/2026/2026-06-03-tauri-dialog-plugin-native-folder-picker.ko.md`

## 검증

- `cargo check`: passed
- `cargo test`: passed
- `cargo build`: passed
- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- Browser static-build smoke: `파일` 클릭 후 `네이티브 파일 작업공간`, `폴더 선택`, `현재 작업공간` 확인

## 잔여 위험

- 실제 Tauri native dialog click은 headless/browser smoke로 직접 열 수 없어서 Rust compile/test와 static UI smoke로 검증했다.
- 공개 배포 readiness는 기존과 같이 signing, notarization, updater, clean-machine smoke가 남아 있다.
