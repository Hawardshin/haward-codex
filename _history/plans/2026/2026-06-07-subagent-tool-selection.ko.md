# Work Plan: Subagent Tool Selection

날짜: 2026-06-07

## 선택한 slice

`explicit tool selection controls before allowing more than the first two planned tools`

## 이유

이전 구현은 안전한 첫 slice로 첫 2개 tool만 fan-out했다. 다음 단계는 사용자 제어권과 작업공간적 흐름을 회복하는 선택 UI이며, Rust command가 이미 `toolNames`와 hard cap 3을 지원하므로 frontend 중심으로 닫을 수 있다.

## 실행 순서

1. 현재 plan/fan-out UI와 테스트 계약 확인
2. 선택 상태와 selector UI 추가
3. 단일 실행과 fan-out payload 연결
4. 테스트/빌드/브라우저 검증
5. guard/evaluator 후 commit/push
