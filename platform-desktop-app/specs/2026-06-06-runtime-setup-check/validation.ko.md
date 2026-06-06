# Validation: Runtime Setup Check

## 예정 검증

- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `pnpm --dir platform-desktop-app package:internal`

## 결과

- `pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 88 tests.
- `cargo check --manifest-path platform-desktop-app/src-tauri/Cargo.toml`: 통과.
- `pnpm --dir platform-desktop-app/renderer/workspace-monitor collect && pnpm --dir platform-desktop-app/renderer/workspace-monitor check`: 통과.
- `pnpm --dir platform-desktop-app package:internal`: 통과.
- in-app Browser 확인:
  - `http://localhost:3100` dev server에서 설정 모달 로드.
  - 핵심 설정 > CLI 어댑터 섹션에서 `data-runtime-setup-check="settings"` 패널과 `설정 점검` 버튼 확인.
  - 브라우저 preview에서는 Tauri runtime이 없으므로 fallback error가 표시되는 것을 확인.

## 산출물

- 내부 `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- 내부 `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
- `codesign --verify --deep --strict`: package pipeline에서 통과.
- `hdiutil verify`: package pipeline에서 통과.

## 주의

- public release readiness 경고인 Developer ID signing, notarization, updater, clean-machine smoke test는 이번 범위가 아니다.
- generated snapshot 파일은 collect/package 검증 과정에서 갱신됐지만 이번 기능 커밋의 직접 소스 범위에서는 제외한다.
