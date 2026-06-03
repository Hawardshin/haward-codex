# 웹 검색 기록: 데스크톱 제품 레이아웃과 코드 편집 surface

- 날짜: 2026-06-03
- 요청: 데스크톱 앱 UI를 제품 구조로 만들고 코드 복사/편집 surface를 오픈소스 editor 기반으로 유지한다.

## 검색

- `Monaco Editor official GitHub monaco-editor npm`
- `@monaco-editor/react official GitHub`

## 확인한 강한 출처

- Microsoft Monaco Editor GitHub: https://github.com/microsoft/monaco-editor
- Monaco Editor playground/docs: https://microsoft.github.io/monaco-editor/

## 계획 영향

- 새 dependency 설치 없이 기존 `monaco-editor`와 `@monaco-editor/react`를 유지한다.
- VS Code 전체 제품 복제보다 Monaco 기반 scoped editor가 현재 제품 범위에 맞다.
- 실제 blocker는 editor 선택이 아니라 데스크톱 레이아웃 overflow와 대형 snapshot fallback chunk였으므로 로컬 UI/CSS와 `SnapshotLoader`를 수정했다.

## 불확실성

- Monaco worker/language-server 고급 기능은 현재 범위가 아니다.
- public release readiness는 signing/notarization/updater/clean-machine smoke 완료 전에는 주장하지 않는다.
