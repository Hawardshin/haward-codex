# 네이티브 한국어 작업공간 UX 계획

## 작업 모드

- `standard`

## 선택

- 런타임은 기존 Tauri/Rust command bridge를 유지한다.
- 파일 선택은 Tauri 공식 dialog plugin을 project-local Rust dependency로 추가한다.
- frontend는 새 `uiLanguage` 상태를 두고, 새 주요 workspace/file copy를 한국어/영어 dictionary로 분리한다.
- `source` 섹션은 새 native workspace file panel을 보여주고, static snapshot source viewer는 Tauri runtime이 없을 때의 fallback으로만 사용한다.

## 검증 계획

- `cargo test` / `cargo build`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- Browser screenshot smoke
- omission/resource/evaluation close-out
