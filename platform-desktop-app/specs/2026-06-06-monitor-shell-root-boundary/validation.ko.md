# 검증: MonitorShell 근본 boundary 재검토

## 통과

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
  - 결과: 통과, 59개 테스트 pass
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
  - 결과: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run build`
  - 결과: 통과
- chunk inspection
  - `MonitorShell.tsx`: 14,191 lines
  - `ToolStudioPanel.tsx`: 1,607 lines
  - `Tool Studio` 관련 문자열 chunk: `0cbtc.g2b83vn.js`, `09yq_9dx5v2xh.js`, CSS chunk
  - largest chunk: `0.p_a393duhe_.js`, 734,386 bytes
  - dynamic Tool Studio chunk 후보: `0cbtc.g2b83vn.js`, 398,129 bytes
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:sections -- http://127.0.0.1:3351/#section-overview`
  - 결과: 통과
  - settle average: 458ms
  - settle p95: 667.7ms
  - max resident count: 5
  - max mounted panel count: 5
- `node platform-desktop-app/renderer/workspace-monitor/scripts/audit-tab-response.mjs http://127.0.0.1:3352/#section-overview`
  - 결과: 통과성 보조 측정
  - active/ready average: 257.9ms
  - active/ready p95: 367.5ms
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:budget`
  - 결과: 통과
  - largest chunk: 734,386 bytes
  - chunk count: 22
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
  - developer public snapshot 복구 완료
- 복구 후 `workspace-monitor run check`
  - 결과: 통과

## 성능 해석

- 직전 결과 대비 average는 482ms에서 458ms로 개선.
- 직전 결과 대비 p95는 652.7ms에서 667.7ms로 소폭 악화.
- resident/mounted panel count는 5로 유지.
- 판단: 이번 변경은 탭 전환 수치의 완전 해결이 아니라 Shell monolith를 잘라내기 시작한 구조 개선이다. 다음 실질 병목은 `DesktopRuntimePanel`과 Agents detail 영역의 큰 Shell 내부 component boundary다.
