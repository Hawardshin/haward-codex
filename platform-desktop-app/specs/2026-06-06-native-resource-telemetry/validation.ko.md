# 검증: Native Resource Telemetry

## 완료된 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor exec tsc --noEmit`: 통과
- `cargo check` in `platform-desktop-app/src-tauri`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 통과, 60 tests
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과, 22 tests
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/service-readiness-registry.json`: 통과

## 최종 검증

- `corepack pnpm --filter platform-desktop-app check`: 통과
- `corepack pnpm --filter platform-desktop-app run package:internal`: 통과
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:budget`: 통과, largest chunk 734386 bytes / 1000000 budget
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:sections:repeat`: 통과, runs 3, settle average 343.3ms, p95 796.4ms, long-task max 587ms
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run perf:buttons`: 통과, real click feedback p95 51.4ms

## 패키징 산출물

- `/Users/shinjoungeun/Desktop/Obsidian/brain/codex/platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `/Users/shinjoungeun/Desktop/Obsidian/brain/codex/platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 리소스 확인

- 성능 감사용 static server는 종료했다.
- `lsof -tiTCP:3348 -sTCP:LISTEN` 결과 listener 없음.

## 현재 잔여 리스크

- public signing/notarization/updater/clean-machine smoke는 외부 자격증명과 release infrastructure가 필요하므로 계속 blocked다.
- CPU usage는 command 호출 시점의 short sample이다.
