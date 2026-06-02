# 질문 보류 구현 계획

## 선택한 방향

기존 Rust `std::process` pipe session 구조를 유지하고, session poll 시점에 질문 후보를 감지해 stdin으로 defer 메시지를 보내는 방식으로 확장한다. UI는 활성 session을 주기적으로 poll해 사용자가 직접 버튼을 누르지 않아도 자동 보류가 실행되도록 한다.

## 작업 단계

1. Tauri session state에 자동 보류 설정, 보류된 prompt key, capture error를 추가한다.
2. session report에 pending/deferred/auto-defer 상태를 노출한다.
3. 질문 감지 후보를 영어/한국어 운영 질문 패턴으로 확장한다.
4. 자동, 수동, bulk 보류 공통 helper를 추가하고 decision inbox에 deferred decision을 저장한다.
5. Workspace Monitor Desktop 탭에 자동 보류 토글, 감지 질문 전체 보류 액션, 자동 poll을 추가한다.
6. readiness/test/check 기록을 갱신하고 성능 예산을 검증한다.

## 리스크와 제어

- 오탐 질문: source-affecting 작업을 승인하지 않고 보류하는 쪽으로 실패한다.
- 중복 저장: session별 prompt key로 방지한다.
- resource leak: 새 CLI process를 만들지 않고 기존 poll lifecycle만 사용한다.
- optional CLI: 누락 시 lane capability만 missing으로 남긴다.
