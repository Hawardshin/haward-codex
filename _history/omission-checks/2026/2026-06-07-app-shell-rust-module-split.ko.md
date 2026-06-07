# 2026-06-07 누락 점검: 앱 셸 Rust 모듈 분리

## 사용자 요구 대응

- 큰 소스 분리: 앱 셸 read-only command 구현을 `lib.rs`에서 `features/app_shell.rs`로 이동했다.
- 기능 이슈 방지: command 이름, response schema, runtime contract surface를 유지했다.
- 공통 검사 구조: runtime source aggregate에 `tauriAppShell`을 추가해 이후 모듈 분리와 검사 기준이 일치하도록 했다.
- Rust/TypeScript 확인: Rust check/test, Workspace Monitor check/test를 실행했다.
- 패키징 확인: `corepack pnpm run desktop:package:run:internal` 최종 성공을 확인했다.
- 반복 패키징 확인: `tauri:build:prepared`를 다시 실행해 기존 DMG cleanup과 재생성을 확인했다.

## 누락 위험

- `lib.rs`에 구현 본문이 있다는 오래된 검사 가정을 `runtime source` 기준으로 바꿨다.
- Tauri command registration은 새 경로 `features::app_shell::*`로 유지했다.
- DMG recovery는 macOS에서 기존 `.app`와 generated `bundle_dmg.sh`가 있을 때만 작동하므로 일반 Tauri 실패를 성공으로 위장하지 않는다.
- public release warning은 공개 서명/notarization/updater 설정 미완료 상태로 남는다.
