# Plan Record: Runtime Setup Check

## 작업 모드

- `standard`
- 기존 실행 설정 기능에 새 검증 동작과 Tauri command를 추가하는 의미 있는 product behavior 변경이다.

## 작업 분해

1. web-first intake로 command lookup/PATH와 Tauri GUI PATH 주의점을 확인한다.
2. 기존 runtime customization 요구사항과 Desktop Runtime health command를 읽는다.
3. terminal setup check는 장기 PTY를 만들지 않는 Rust command로 구현한다.
4. settings adapter 화면에서 selected CLI health와 terminal check를 함께 실행한다.
5. 테스트, internal package build, 누락 점검, 리소스 점검을 기록한다.

## 병렬/리소스 고려

- Rust command와 renderer UI가 같은 계약을 공유하므로 순차 변경한다.
- terminal check는 새 PTY session을 만들지 않아 장기 프로세스/handle 누수 위험을 줄인다.
