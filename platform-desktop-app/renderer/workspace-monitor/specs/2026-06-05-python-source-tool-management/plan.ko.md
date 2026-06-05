# 구현 계획

## 범위

- `ToolBuilderBlueprint`에 Python package/source 관리 메타데이터를 추가한다.
- `build` 모드에만 표시되는 Python source manager 하위 작업대를 추가한다.
- source manager CSS를 기존 Tool Studio control token과 반응형 계약에 맞춘다.
- static test, check, customer build, performance budget, Browser smoke로 검증한다.

## 결정

- 언어/런타임 선택은 기존 Next.js/React/TypeScript를 유지한다.
- Python source 구조는 PyPA의 `src/` layout과 `pyproject.toml` 중심 패키징 모델을 UI 기본값으로 둔다.
- 초기화 명령은 `uv init --package` 기반 preview로 제공하되, 실제 설치나 실행은 터미널/runner 후속 범위로 둔다.
- `툴 만들기`의 주 작업은 source/package 관리이고, 환경/배포는 별도 모드로 유지한다.

## 위험과 대응

- 긴 경로가 버튼 안에서 깨질 수 있다: file queue는 한 줄 ellipsis, code/path 값은 `overflow-wrap: anywhere`를 사용한다.
- 화면 정보량이 늘어날 수 있다: source manager를 build mode 내부의 단일 하위 작업대로 묶고 action은 3개로 제한한다.
- 사용자가 버튼을 실제 파일 생성으로 오해할 수 있다: 버튼 이름을 open/terminal/copy plan으로 제한하고 자동 설치를 넣지 않는다.
