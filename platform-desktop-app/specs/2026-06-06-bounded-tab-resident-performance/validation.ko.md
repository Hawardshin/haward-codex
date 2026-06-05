# 검증: bounded tab resident 성능 보정

## 통과

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
  - 결과: 통과, 59개 테스트 pass
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
  - 결과: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`
  - 결과: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:sections -- http://127.0.0.1:3348/#section-overview`
  - 결과: 통과
  - CPU throttle: 6
  - settle average: 430ms
  - settle p95: 827.8ms
  - max observed resident count: 5
  - max observed mounted panel count: 5
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:budget`
  - 결과: 통과
  - largest chunk: 734,386 bytes
- `corepack pnpm --dir platform-desktop-app test`
  - 결과: 통과, 22개 테스트 pass
- `corepack pnpm --dir platform-desktop-app run check`
  - 결과: 통과
- `corepack pnpm --dir platform-desktop-app run package:internal`
  - 결과: 통과
  - 생성/검증 산출물:
    - `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
    - `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
  - `codesign --verify --deep --strict`: 통과
  - `hdiutil verify`: 통과
- 패키징 후 `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`
  - 결과: developer public snapshot 복구 완료
- 복구 후 `workspace-monitor run check`
  - 결과: 통과

## 참고

- 기존 `perf:buttons`를 탐색성으로 실행했으나 synthetic sample에서 `failedFeedbackCount=7`로 실패했다. real click feedback p95는 57.4ms로 기존 60ms 기준 안이었다. 이 스크립트는 이번 탭 전환 acceptance가 아니며, selector/대상 범위 조정은 별도 버튼 감사 개선 후보로 남긴다.
