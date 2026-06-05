# 평가: Python Source Tool Management

## 결과

- Tool Studio `툴 만들기` 화면에 Python source manager 하위 작업대를 추가했다.
- template별 package name, module name, `pyproject.toml`, entry point, smoke test path, edit target queue, init command, checklist, source plan copy action을 제공한다.
- visual QA에서 checklist 3열로 인한 한국어 세로 깨짐을 발견했고, 2열 layout plus checklist 1열 구조로 수정했다.

## 검증

- `corepack pnpm --filter workspace-monitor test` 통과
- `corepack pnpm --filter workspace-monitor run check` 통과
- `corepack pnpm --filter workspace-monitor run build:customer` 통과
- `corepack pnpm --filter workspace-monitor run perf:budget` 통과
- in-app Browser desktop smoke 통과: source manager, target 4개, action 3개, pyproject/entry point/checklist/init command, overflowX 0
- Playwright mobile 390x844 smoke 통과: target 4개, action 3개, checklist 1열, action height 48px, body/viewport width 390px

## 판단

- 사용자가 요구한 “툴을 만드는 쉬운 방법”은 파일 생성 자동화가 아니라, 먼저 source/package/entrypoint/검증 경로를 한 하위 작업대에서 명확히 보는 방향으로 구현했다.
- 한 기능 한 화면 원칙을 지키기 위해 venv와 deployment는 기존 전용 모드에 유지했다.
- 버튼 클릭 시 무거운 설치/빌드를 즉시 수행하지 않고 terminal/copy/open으로 분리해 반응 지연 위험을 줄였다.

## 미완료/후속

- 실제 Python skeleton 생성기와 editable install/smoke runner는 후속 작업이다.
- source manager의 `선택 파일 열기`는 아직 선택 path를 source editor에 직접 전달하지 않고 기존 Source 화면 진입 callback을 사용한다.
