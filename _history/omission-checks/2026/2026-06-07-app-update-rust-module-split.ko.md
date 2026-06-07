# 2026-06-07 누락 점검: 앱 업데이트 Rust 모듈 분리

## 사용자 요구 대응

- 큰 소스 분리: `lib.rs`의 앱 업데이트 구현을 `features/app_update.rs`로 이동했다.
- 기능적 이슈 방지: command 이름, Tauri state, report payload shape를 유지했다.
- Rust와 TypeScript 확인: Rust tests/build와 Workspace Monitor TypeScript check를 모두 실행했다.
- 패키징 확인: 사용자가 실패를 본 `desktop:package:run:internal` 경로를 다시 실행해 성공을 확인했다.

## 누락 위험 점검

- readiness source map이 새 모듈을 모르면 false negative나 false positive가 생길 수 있어 `source-structure.mjs`에 경로를 추가했다.
- 기존 readiness test가 `lib.rs`에 updater 구현이 있다고 가정하던 부분을 runtime source aggregate로 바꿨다.
- 서비스 준비도 스크립트가 `lib.rs`만 검사하던 updater runtime action check를 `lib.rs + app_update.rs + providers.rs` 집계로 바꿨다.

## 남은 사항

- 공개 배포용 업데이트 채널 구성은 아직 별도 작업이다. 실제 updater endpoint, signing key, public key, clean-machine update smoke가 필요하다.
