# Deep Feature Issue Review 웹 우선 기록

- 날짜: 2026-06-07
- 요청 요약: 데스크톱 앱과 Workspace Monitor의 기능 이슈, 미구현 후보, 자동 업데이트/동기화/초기화 가시성 문제를 깊게 검토하고 구현한다.
- 범위: `platform-desktop-app/`, 특히 Tauri runtime commands, updater, Workspace Monitor React effects, snapshot/history loading, readiness/test gates.

## 검색

1. `site:v2.tauri.app/plugin/updater Tauri v2 updater restart install official`
2. `site:v2.tauri.app/security/capabilities Tauri v2 command permissions official`
3. `site:react.dev/reference/react/useEffect cleanup effects official`

## 확인한 공식 출처

- Tauri Updater: https://v2.tauri.app/plugin/updater/
  - 업데이트 플러그인, signed update, static/dynamic update server, check/install 흐름을 확인했다.
- Tauri Permissions: https://v2.tauri.app/security/permissions/
  - frontend에서 접근 가능한 command 권한과 capability 연결 기준을 확인했다.
- React `useEffect`: https://react.dev/reference/react/useEffect
  - effect cleanup은 dependency 변경과 unmount에서 실행되어야 하며, Strict Mode에서 setup/cleanup 반복이 cleanup 누락을 드러낸다는 기준을 확인했다.

## 적용 영향

- 자동 업데이트 설치 결과는 Tauri updater install/restart 흐름과 UI 보고가 일치해야 하므로 `restart` 요청 상태를 Rust report와 UI에 반영했다.
- React effect와 timer는 cleanup 계약이 핵심이므로 snapshot prewarm timeout, admin history fetch 실패 cache, instant button feedback cleanup을 검토하고 보강했다.
- public release readiness의 남은 signing/notarization/updater credential/clean-machine smoke는 로컬 코드 버그가 아니라 공개 배포 입력과 외부 검증 게이트로 분리했다.

## continuation: 2026-06-07 20:36 KST

- 추가 검색:
  - `React useEffect cleanup timers abort fetch official documentation`
  - `Tauri v2 updater install restart official documentation`
  - `Tauri v2 permissions capabilities invoke command official documentation`
- 추가 적용:
  - provider 모델 목록 로딩은 React async effect 기준상 stale 응답이 최신 UI를 덮지 않도록 request sequence guard를 추가했다.
  - settings sync queue는 실패를 UI에 이미 반영하므로 fire-and-forget 호출에서 rejected promise가 전역으로 새지 않도록 catch boundary를 추가했다.

## 제외한 약한 신호

- 블로그, Q&A, 커뮤니티 글은 이번 구현 판단의 근거로 쓰지 않았다.
- `_private/`는 repository rule에 따라 검색하거나 읽지 않았다.

## continuation: 2026-06-07 20:43 KST

- 추가 검색:
  - `React official useEffect cleanup race conditions async ignore stale result`
  - `Tauri v2 updater official install restart app restart permissions`
  - `Tauri v2 permissions official invoke command frontend`
- 추가 적용:
  - React async stale-result 방지 기준을 소스 편집기 파일 로딩에도 적용했다.
  - Tauri command/readiness 경계는 이번 변경에서 새 권한을 추가하지 않으므로 기존 command surface와 package gate를 유지했다.

## continuation: 2026-06-07 20:53 KST

- 추가 검색:
  - `React official stale async result race condition cleanup useEffect ignore variable`
  - `React official state as a snapshot async event handlers stale closure`
  - `Tauri v2 invoke commands official frontend rust command permissions`
- 추가 적용:
  - React state snapshot 기준상 저장 시작 시점의 content와 저장 완료 시점의 최신 draft가 다를 수 있으므로, source editor 저장 완료 반영을 saved base와 current draft로 분리했다.
  - Tauri invoke/readiness는 기존 `write_workspace_text_file` command를 사용하며 새 command 권한을 추가하지 않았다.
