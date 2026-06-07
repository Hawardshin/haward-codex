# Deep Feature Issue Review 계획

- 날짜: 2026-06-07
- work_mode: `standard`
- view_mode: `superadmin_developer`
- install_mode: `developer`
- ownership: `platform-desktop-app/`

## 대범위 분해

대상 요청은 "싹 다 검토" 성격이므로 모든 파일을 줄 단위로 무차별 읽는 방식 대신, large-scope 방식으로 다음 slice를 사용했다.

1. 실패한 package command의 직접 원인과 최신 type/runtime gate 확인.
2. `TODO`, `FIXME`, `stub`, `not implemented`, `panic`, `unwrap`, `dangerouslySetInnerHTML`, timer/listener/fetch/invoke 패턴 스캔.
3. 실제 사용자 기능 이슈로 재현 가능한 후보 선별.
4. Rust/TypeScript 양쪽 구현과 static regression test 보강.
5. workspace-monitor, Tauri, desktop package 검증.

## 구현 대상

- 앱 업데이트 설치 후 restart 요청 상태가 report/UI/test에 반영되도록 수정한다.
- lazy admin history index fetch가 abort/error 뒤 실패 promise에 갇히지 않도록 재시도 가능하게 한다.
- snapshot startup prewarm timer가 unmount/error에서 정리되도록 한다.
- instant button feedback의 활성 timeout/frame cleanup을 root cleanup에서 모두 실행하게 한다.
- provider 모델 목록 요청이 빠르게 반복될 때 stale 응답이 최신 provider 선택을 덮지 않도록 한다.
- queued settings sync 실패가 unhandled promise로 브라우저 전역 오류에 노출되지 않도록 한다.
- 소스 편집기 파일 로딩이 느린 이전 응답으로 최신 draft/선택 상태를 덮지 않도록 한다.
- 소스 편집기 busy 중 draft 탭 전환/닫기로 저장·로딩 상태가 교차하지 않도록 한다.
- 저장 중 Monaco 입력/편집 command가 draft를 변경해 저장 완료 반영과 교차하지 않도록 한다.
- 저장 완료 시 saved base와 최신 draft content를 분리해 저장 중 새 입력이 clean 상태로 소실되지 않도록 한다.

## 검증 게이트

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `cargo fmt --check && cargo check && cargo test`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm run desktop:package:run:internal`
- `git diff --check`

## 알려진 범위 밖 게이트

- public signing/notarization credentials.
- Tauri updater public/private signing keys and HTTPS endpoint.
- clean-machine install/open/update smoke.
