# UI 이론 기반 디자인 파운데이션 리팩토링 검증

## 완료한 검증

- `corepack pnpm --filter workspace-monitor test`
  - 결과: 통과, 62개 테스트
- `corepack pnpm --filter platform-desktop-app test`
  - 결과: 통과, 24개 테스트
- `corepack pnpm --filter workspace-monitor build`
  - 결과: 통과
- 브라우저 렌더 검증
  - `http://127.0.0.1:4173/`
  - 홈: `data-ui-foundation="gestalt-hierarchy-density"`, `--grid-unit: 4px`, `--focus-halo-size: 4px` 확인
  - 홈/설정 viewport 수평 overflow: 0
  - 주요 버튼 inline overflow: 0
  - settings dark/system `--surface-depth-1` 재검증: `#1b2029`
- `corepack pnpm --filter workspace-monitor check`
  - 결과: 통과
- `corepack pnpm --filter platform-desktop-app check`
  - 결과: 통과
  - 참고: 패키징 전 stale customer snapshot 경고는 최종 `desktop:package:internal`에서 다시 생성될 예정
- `corepack pnpm run desktop:package:internal`
  - 결과: 통과
  - 생성/검증:
    - `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
    - `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
    - `codesign --verify --deep --strict` 통과
    - `hdiutil verify` 통과

## 남은 검증

- 없음
