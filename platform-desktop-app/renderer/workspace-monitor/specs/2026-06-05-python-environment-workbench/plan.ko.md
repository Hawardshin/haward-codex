# 구현 계획

## 범위

- `ToolStudioPanel`에 Python 실행환경 프로필 모델과 선택 상태를 추가한다.
- `environment` 모드에만 표시되는 전용 workbench를 추가한다.
- 실행환경 작업대 CSS를 `build`/`deploy`와 동일한 반응형 계약으로 맞춘다.
- static test, check, customer build, desktop/mobile Browser smoke로 검증한다.

## 결정

- 언어/런타임 선택은 기존 Next.js/React/TypeScript를 유지한다.
- 별도 runtime 구현 대신 UI 계약과 복사 가능한 실행 계획을 먼저 만든다.
- 실행환경 옵션은 `.venv`, 매 실행 임시 runner, AgentCore Code Interpreter식 sandbox 경계의 세 가지로 제한한다.

## 위험과 대응

- 긴 Python 명령어가 작은 창에서 깨질 수 있다: terminal code block에 `overflow-wrap: anywhere`를 적용한다.
- 한 화면 정보량이 다시 커질 수 있다: `environment` 모드에서만 작업대가 표시되게 하고 액션을 네 개로 제한한다.
- 실제 설치 버튼처럼 오해될 수 있다: 현재 버튼은 terminal/workflow 진입점이며 실제 설치 실행은 별도 runner 범위로 둔다.
