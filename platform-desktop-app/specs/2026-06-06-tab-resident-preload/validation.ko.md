# 검증: 탭 상주 선마운트 최적화

## 완료된 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`
  - 결과: 통과, 59개 테스트 pass
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
  - 결과: 통과
  - 포함: `tsc --noEmit`, scroll container check, source control design check, history payload check

## 추가 완료된 검증

- `corepack pnpm --dir platform-desktop-app test`
  - 결과: 통과, 22개 테스트 pass
- `corepack pnpm --dir platform-desktop-app run check`
  - 결과: 통과
  - 참고: 개발용 snapshot 복구 후 customer bundle check가 stale public snapshot warning을 보고했다. 내부 패키징 직전 customer renderer build/audit에서는 stale warning 없이 통과했다.
- `corepack pnpm --dir platform-desktop-app run package:internal`
  - 결과: 통과
  - 생성/검증된 산출물:
    - `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
    - `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
- 패키징 후 developer snapshot 복구 collect
  - 결과: 통과, developer public snapshot 재생성

## 브라우저 스모크

- dev 서버: `http://127.0.0.1:3210`
- 서버 snapshot 확인: `curl -I http://127.0.0.1:3210/workspace-snapshot.json` 결과 `200 OK`, 약 2.7MB JSON 제공 확인
- in-app Browser 결과: 페이지가 `Loading workspace snapshot` 상태에 머물러 resident DOM까지 도달하지 못했다.
- 판단: 이 브라우저 세션의 snapshot load 완료를 검증하지 못했으므로 UI resident count 시각 검증은 미완료로 남긴다. 타입체크, 문자열 계약 테스트, production build, 패키징 검증은 통과했다.

## UI 확인 관점

- 앱 시작 후 idle 시간에 `data-resident-section-count`가 증가해야 한다.
- 탭 클릭 후 새 tree mount 대신 hidden resident panel 표시 전환이 일어나야 한다.
- source editor와 desktop runtime은 숨겨진 동안 active side effect를 받지 않아야 한다.
