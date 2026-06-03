# Monaco 코드 편집 surface 스펙

## 목표

설치형 플랫폼의 desktop runtime 화면에 Monaco 기반 다중 파일 코드 편집기를 연결한다.

## 범위

- Monaco editor dynamic import
- language mapping
- current draft copy action
- source viewer copy action
- 기존 draft queue/diff/save/revert 흐름 유지
- CSS workbench 보강

## 결정

- VS Code 전체가 아니라 Monaco Editor를 사용한다.
- 신규 dependency 설치는 하지 않는다. 기존 `@monaco-editor/react`와 `monaco-editor`를 사용한다.
- 실제 파일 쓰기는 계속 Tauri command를 통한다.
- 저장 전 백업 생성 gate는 그대로 유지한다.

## 성공 기준

- desktop runtime source editor가 Monaco 기반 editor로 렌더링된다.
- copy current draft와 source viewer copy가 동작한다.
- TypeScript check, tests, build가 통과한다.
- Browser에서 Monaco editor가 빈 영역 없이 표시된다.
