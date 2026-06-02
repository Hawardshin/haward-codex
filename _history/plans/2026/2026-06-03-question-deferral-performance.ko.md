# 계획: 질문 보류 성능

## 모드

- work mode: `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## 구현 결정

- Rust/Tauri 질문 감지는 session output 전체가 아니라 stdout/stderr 최근 32KB tail만 scan한다.
- React active session polling은 in-flight ref로 overlap을 막는다.
- decision inbox refresh는 자동 보류 신호가 있어도 4초 단위로 throttle한다.
- session report는 render signature로 병합하고, idle elapsed는 5초 bucket으로 갱신한다.

## 검증

- 테스트, 타입체크, readiness, build, performance budget, static token check, resource/grounding/cli pipeline/evaluation checks.
