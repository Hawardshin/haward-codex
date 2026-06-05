# 작업 요약: Python Source Tool Management

- Tool Studio `툴 만들기` 화면에 Python source manager 하위 작업대를 추가했다.
- 각 tool template가 package name, module name, `src/` edit target, `pyproject.toml`, console entry point, smoke test path, init/run/package command, checklist를 제공한다.
- source target 선택과 `소스 계획 복사` action을 추가해 Python source 관리 계획을 JSON으로 복사할 수 있게 했다.
- visual QA에서 한국어 checklist가 좁은 3열로 세로 깨지는 문제를 발견해 checklist 1열 구조로 수정했다.
- 검증: workspace-monitor test/check/build:customer/perf:budget, in-app Browser desktop smoke, Playwright 390px mobile smoke 통과.
