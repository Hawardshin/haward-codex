# 2026-06-07 소스 에디터 문서 helper 분리 평가

## 평가 입력

- `installation_occurred`: `false`
- `resource_risk_occurred`: `false`
- `omission_check_targets`:
  - `_history/omission-checks/2026/2026-06-07-source-editor-document-helpers.ko.md`
- `resource_check_targets`:
  - `_history/resource-checks/2026/2026-06-07-source-editor-document-helpers.ko.md`

## 결과

- source workbench의 생성 문서 문자열 로직이 `sourceDocuments.ts`로 이동했다.
- `MonitorShell.tsx` 라인 수는 14,298라인이며, 이번 조각에서 inline document builder를 제거했다.
- readiness aggregate가 새 helper를 포함하므로 분리 후에도 기능 문자열 검사가 같은 런타임 표면을 본다.

## 검증

- `node --test tests/source-editor-templates.test.mjs`: 통과, 8개.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 103개.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 30개.
- `corepack pnpm run desktop:package:run:internal`: 통과.
- Rust `cargo test`: 8개 통과.
- macOS `.app` codesign 검증과 DMG `hdiutil verify`: 통과.

## 릴리스 경계

- 내부 실행과 패키징은 통과했다.
- 공개 배포 준비는 Developer ID signing, notarization, updater endpoint/key, clean-machine smoke가 남아 있어 아직 주장하지 않는다.

## 남은 후보

- source workbench 저장/로드 event handler를 hook 또는 reducer로 분리한다.
- helper 함수에 직접 입력/출력 단위 테스트를 추가해 문자열 포맷 회귀를 더 좁게 잡는다.
