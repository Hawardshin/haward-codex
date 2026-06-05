# 작업 요약: Agent CLI Cockpit

2026-06-06에 `platform-desktop-app`의 Desktop Runtime에 Agent CLI Cockpit을 추가했다. Agentify Desktop, ClawX, CLI Agent Orchestrator, OpenLoaf를 직접 clone해 확인한 뒤, 기존 CLI adapter/session/provider/task-run/decision 상태를 한 화면에 묶는 control-plane UI를 구현했다.

검증은 workspace-monitor test/check/perf/build, platform-desktop-app test/check, Playwright smoke, `desktop:package:internal`까지 완료했다. 내부 `.app`와 `.dmg`가 생성됐고 codesign/DMG verify도 통과했다. 공개 배포 readiness는 signing/notarization/updater/clean-machine smoke가 남아 있어 아직 주장하지 않는다.
