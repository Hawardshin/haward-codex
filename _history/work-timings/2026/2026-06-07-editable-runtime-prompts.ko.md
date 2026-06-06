# Work Timing: Editable Runtime Prompts

날짜: 2026-06-07

## 단계별 기록

- 웹 우선 검색: 공식 문서 중심으로 prompt 재사용과 frontend-native boundary 확인.
- 코드 조사: `MonitorShell`, `RuntimeTerminalDrawer`, Rust preferences 정규화, renderer tests 확인.
- 구현: prompt customization 타입, UI 저장/초기화 액션, Rust whitelist 정규화 추가.
- 1차 검증: renderer check/test와 Rust 단위 테스트 통과.
- 후속 검증: collect/build/platform check, Browser smoke, guards 실행 예정.

## 병목 후보

- Browser smoke는 Next dev server 시작과 DOM 안정화 대기가 필요하다.
- snapshot collect/build는 history payload 크기에 영향을 받는다.
