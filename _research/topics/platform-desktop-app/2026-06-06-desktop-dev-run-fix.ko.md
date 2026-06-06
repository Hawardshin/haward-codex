# 연구 노트: desktop dev/run fix

## 발견한 문제

- `corepack pnpm run desktop:dev`는 `tauri.conf.json`의 `beforeDevCommand`가 `../renderer/workspace-monitor`를 가리켜 `/codex/renderer`를 찾다가 ENOENT로 실패했다.
- 경로를 고친 뒤에는 Tauri updater plugin이 `plugins.updater` 설정이 없는 internal/dev config에서 항상 초기화되어 panic이 발생했다.
- README에는 검증/패키징 명령은 있지만, 개발 실행과 빌드된 내부 `.app` 실행 명령이 없었다.

## 근거

- Tauri v2 dev flow는 `devUrl`과 `beforeDevCommand`로 frontend dev server를 연결한다.
- Tauri updater v2 docs는 `plugins.updater.pubkey`와 `plugins.updater.endpoints` 설정을 전제로 한다.
- Next static export docs는 `next build`가 `out/` static output을 만든다고 설명한다. 현재 `frontendDist`는 이 output을 사용한다.

## 적용

- `beforeDevCommand`를 `corepack pnpm --dir renderer/workspace-monitor run dev`로 수정했다.
- Tauri `run()`에서 `plugins.updater`가 object일 때만 updater plugin을 등록한다.
- root scripts에 `desktop:dev`, `desktop:run:internal`, `desktop:package:run:internal`을 추가했다.
- `scripts/open-internal-app.mjs`로 macOS 내부 `.app` 실행 경로를 명령화했다.
- README/runbook/doctor/readiness tests를 새 실행 경로에 맞췄다.
