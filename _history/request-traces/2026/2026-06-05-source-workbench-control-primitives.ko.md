# 요청 결과 추적: 소스 워크벤치 컨트롤 프리미티브

## 요청

- 기본 버튼/기본 선택 드롭다운처럼 보이는 소스 작업 UI를 수정.
- 구현 완료 후 자동 빌드.

## 결과

- 소스 파일 선택 드롭다운은 Radix DropdownMenu로 교체.
- 파일 작업/툴바/워크벤치 탭/탐색기 명령 버튼은 공용 `Button`/`ActionGroup` 사용.
- 기존 소스 편집 UX 요구사항과 스펙에 새 요구사항 `REQ-DESKTOP-UX-2026-06-05-004` 추가.
- 고객용 렌더러 빌드와 내부 Tauri `.app`/`.dmg` 패키지 생성 완료.

## 산출물

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-05-workspace-monitor-tab-editor-ux.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-05-workspace-monitor-tab-editor-ux/`
- 평가: `_history/evaluations/2026/2026-06-05-source-workbench-control-primitives.ko.md`

## 검증 명령

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor check`
- `corepack pnpm --dir platform-desktop-app test`
- `corepack pnpm --dir platform-desktop-app check`
- `corepack pnpm --dir platform-desktop-app run package:internal`
