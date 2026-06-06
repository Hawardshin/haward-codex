# Work Plan: Subagent Live Execution

날짜: 2026-06-06

## 작업 모드

`standard`

## 실행 계획

1. 웹 우선 조사와 이전 slice 기록 확인.
2. subagent explorer로 안전한 다음 slice 범위 확인.
3. Rust command를 추가하되 기존 CLI session runner를 재사용.
4. Renderer button/result UI를 추가.
5. Rust/frontend 계약 테스트와 build/check 수행.
6. Browser smoke와 resource/omission/evaluation 기록 수행.
7. commit/push.

## 결정

- 이번 작업은 plan의 첫 번째 tool만 실행하는 단일 lane으로 제한한다.
- plan에 없는 tool name은 실행하지 않는다.
- 병렬 fan-out, merge, 자동 patch 적용은 구현하지 않는다.
