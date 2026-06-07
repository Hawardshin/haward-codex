# 2026-06-07 리소스 점검

- 장기 실행 명령:
  - `corepack pnpm run desktop:package:run:internal`
- 결과:
  - 명령 프로세스는 exit code 0으로 종료됨.
  - 내부 앱은 명령의 의도대로 `open -n`으로 실행됨.
  - 별도 미종료 shell 세션은 남기지 않음.
- 산출물:
  - `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
  - `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

