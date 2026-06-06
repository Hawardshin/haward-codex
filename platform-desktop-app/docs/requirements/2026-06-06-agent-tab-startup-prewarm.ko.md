# Agent 탭 시작 선로딩 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-ATP-001 | 앱 시작 시 Agent, Desktop, Eval, Source, Tools를 포함한 모든 주요 section을 resident set에 포함해야 한다. | must | `tool-studio.test.mjs`, browser smoke |
| REQ-ATP-002 | 사용자가 첫 Agent 탭을 누르기 전에 탭 panel mount 비용을 startup warmup으로 이동해야 한다. | must | Playwright smoke, section latency audit |
| REQ-ATP-003 | 초기 로딩은 더 길어질 수 있지만 loading shell에서 멈추지 않아야 한다. | must | dev/static browser smoke |
| REQ-ATP-004 | `desktop:dev`가 쓰는 Next dev hydration 경로는 static export 설정 때문에 멈추면 안 된다. | must | dev server smoke |
| REQ-ATP-005 | 변경 후 build와 내부 packaging을 자동 실행해야 한다. | must | validation/evaluation 기록 |
