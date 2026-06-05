# 검증: startup resident prewarm 속도 최적화

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
  - settle average: 482ms
  - settle p95: 652.7ms
  - max observed resident count: 5
  - max observed mounted panel count: 5
  - sample: agents 613.8ms, desktop 447.5ms, source 264.3ms, tools 652.7ms, overview 431.5ms
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:budget`
  - 결과: 통과
  - largest chunk: 734,386 bytes
  - chunk count: 18
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
- 복구 후 `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
  - 결과: 통과

## 비교

- 이전 bounded resident baseline: average 430ms, p95 827.8ms, max resident/mounted 5.
- 이번 결과: average 482ms, p95 652.7ms, max resident/mounted 5.
- 판단: worst-case p95는 개선됐지만 평균은 악화됐다. 따라서 이번 변경은 “최악 탭 전환 지연 완화와 resident cap 유지”로 수용하고, 평균 지연 개선은 후속 structural section split/memoization 후보로 남긴다.

## 공개 release blocker

내부 패키징은 통과했다. public release는 기존과 같이 Developer ID signing, notarization, signed updater, clean-machine smoke가 별도 blocker다.
