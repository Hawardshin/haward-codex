# 2026-06-06 평가: Public Release Retry

## 결과

- public package를 실제로 재시도했다.
- 실패 지점은 구현 누락이 아니라 현재 로컬 환경의 Apple/Tauri public release credential 부재로 확인했다.
- 재시도에서 발견한 pipeline 비효율을 수정했다: public preflight가 expensive verification 전에 실행된다.

## 검증

- `corepack pnpm --filter platform-desktop-app test`: 통과, 22 tests.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. developer snapshot 복구 후 stale public snapshot warning은 허용된 내부 check 경고.
- `corepack pnpm run desktop:package:public`: public preflight에서 즉시 실패하는 것을 확인. Apple signing/notarization, Tauri updater signing key, updater endpoint, release asset URL이 모두 현재 로컬 env/keychain에 없으므로 의도된 blocker다.
- `corepack pnpm run desktop:package:internal`: 통과. Workspace Monitor check/test/build, customer bundle audit, desktop tests, Rust tests/build, Tauri internal package build, `codesign --verify`, `hdiutil verify`까지 완료했다.

## 평가

- 공개 릴리스 성공은 아직 외부 credential 준비 없이는 불가능하다.
- 이번 변경으로 credential이 없을 때 Workspace Monitor/Rust/Tauri expensive verification을 먼저 돌지 않는다.
- credential 없는 현재 환경에서도 내부 `.app`와 DMG 빌드는 성공했다.
- credential 값은 저장하거나 출력하지 않았다.
