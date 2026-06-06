# Plan History: Editable Runtime Prompts

날짜: 2026-06-07

## 실행 계획

1. 공식 문서 검색으로 prompt 재사용과 frontend-native 저장 경계를 확인한다.
2. `MonitorShell`과 `RuntimeTerminalDrawer`의 prompt 선택 흐름을 조사한다.
3. runtime preferences에 prompt override map을 추가한다.
4. 세션/작업 파이프라인 prompt choice에 저장/초기화 액션을 붙인다.
5. Rust preferences 정규화에 prompt whitelist를 추가한다.
6. 정적 테스트, Rust 단위 테스트, build, Browser smoke, guard를 통과시킨다.

## 중간 조정

- 저장 후 override 변경 effect가 초기 프리셋으로 되돌아갈 수 있는 흐름을 발견했다.
- 초기 설정 effect와 현재 prompt choice 값 동기화 effect를 분리해 현재 선택 key가 유지되도록 조정했다.
