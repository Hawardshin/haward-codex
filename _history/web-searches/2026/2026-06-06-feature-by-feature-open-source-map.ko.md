# 웹 검색 기록: 기능별 오픈소스 맵

- 날짜: 2026-06-06
- 요청: 각각 기능별로도 오픈소스 찾아보기
- 대상: `platform-desktop-app/`

## 검색 질의

- `open source agent platform feature categories CLI orchestration desktop AI workbench task run decision inbox provider settings 2026 GitHub`
- `open source desktop AI agent workbench terminal provider settings task management GitHub`
- `open source AI agent workflow builder evaluation observability memory MCP provider settings GitHub`
- `open source coding agent UI features terminal browser diff approval checkpoint task runs GitHub`
- `GitHub open source agent memory evaluation observability Langfuse Phoenix promptfoo OpenLIT 2026`
- `GitHub open source local first AI desktop app provider settings Ollama OpenAI Anthropic MCP terminal workspace`
- `GitHub open source workflow automation agent builder Dify Langflow Flowise n8n Activepieces Windmill agent features`
- `GitHub open source desktop app Tauri terminal PTY process management xterm Rust portable-pty`
- `GitHub open source AI agent human in the loop approval decision inbox task queue`
- `GitHub open source AI agent task run timeline artifacts logs decision approval UI`
- `GitHub open source MCP server manager desktop provider credentials AI app`
- `GitHub open source AI coding agent diff review tool calls terminal UI`

## 확인한 고신뢰 소스

- 공식 GitHub 페이지: OpenHands, Gemini CLI, opencode, CLI Agent Orchestrator, Agentify Desktop, OpenLoaf, Flowise, n8n, Open WebUI, Langfuse, Phoenix, Tauri 등.
- 로컬 제품 기능 기준: `platform-desktop-app/configs/product-feature-registry.json`
- repo 존재 확인: `git ls-remote --exit-code --heads https://github.com/<owner>/<repo>.git`

## 약한 소스/주의

- 제품형 랜딩 페이지와 Reddit/커뮤니티 글은 discovery/adoption 신호로만 사용했다.
- GitHub stars/license 대량 메타데이터는 GitHub API 403으로 이번 기록에 넣지 않았다.
- 실제 구현 근거는 다음 단계에서 clone 가능한 repo를 `/tmp`에 받아 README/source/test까지 확인한 뒤 확정해야 한다.

## 결과

기능별 오픈소스 매트릭스를 `_research/topics/platform-desktop-app/2026-06-06-feature-by-feature-open-source-map.ko.md`에 저장했다. 앞으로 구현 slice별 리서치 시작점으로 사용한다.
