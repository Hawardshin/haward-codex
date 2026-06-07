# 웹 검색 기록: workspace tracker product split

- 날짜: 2026-06-08
- 작업: 데스크톱 앱을 Git 작업공간/게스트 AI 도구/작업 추적 허브로 재정의하고, 에이전트/툴/Ollama/AgentCore류 기능을 `agent-platform/`으로 분리한다.
- 검색 목적: 제품 경계가 현재 AI 코딩 도구와 Git 작업공간 구조에 맞는지 확인한다.

## 확인한 공식/고신뢰 출처

- Git worktree 공식 문서: https://git-scm.com/docs/git-worktree.html
  - 영향: 여러 작업 트리를 한 저장소에서 다룰 수 있지만, 사용자 프로젝트의 기본 단위는 여전히 Git repository/worktree 경계로 보아야 한다.
- Git submodule 공식 문서: https://git-scm.com/docs/git-submodule.html
  - 영향: 여러 레포지토리를 한 상위 작업공간에 연결할 수 있으나, 각 하위 프로젝트의 Git 경계와 상태를 독립적으로 보여줘야 한다.
- OpenAI Codex 도움말: https://help.openai.com/en/articles/11369540-codex-in-chatgpt
  - 영향: Codex는 코딩 에이전트/CLI/IDE 확장 흐름을 갖는 게스트 도구로 취급한다. 데스크톱 앱은 Codex 하나에 종속되지 않는다.
- Anthropic Claude Code 설정/CLI 문서: https://docs.anthropic.com/en/docs/claude-code/getting-started, https://docs.anthropic.com/en/docs/claude-code/cli-usage
  - 영향: Claude Code는 터미널 기반 게스트 AI 도구로 실행/재개/진단 상태를 표시할 수 있어야 한다.
- Cursor 설치/CLI 문서: https://docs.cursor.com/get-started/installation, https://docs.cursor.com/en/cli/installation
  - 영향: Cursor는 IDE와 CLI 양쪽 경로가 있으므로 “AI 도구 import/launch” 범주에 넣는다.
- Google Antigravity 공식 문서: https://www.antigravity.google/docs/overview, https://www.antigravity.google/product/antigravity-cli
  - 영향: Antigravity는 IDE/agent manager/CLI가 갈라지는 사용 흐름을 가지므로 데스크톱 앱은 이를 단일 내장 기능이 아니라 guest adapter로 취급한다.
- Amazon Bedrock AgentCore 공식 문서: https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/, https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/runtime-how-it-works.html, https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/gateway.html, https://docs.aws.amazon.com/bedrock-agentcore/latest/devguide/identity.html
  - 영향: AgentCore류 기능은 runtime/gateway/identity/tool management 성격이 강하므로 기본 작업 추적 데스크톱 앱에서 분리해 `agent-platform/` 경계로 옮긴다.

## 약한 출처와 처리

- Reddit/뉴스의 Antigravity 불편 사례는 사용자 혼선과 터미널 문제 신호로만 참고했다. 제품 경계 결정의 사실 근거는 공식 문서와 로컬 코드/테스트에 둔다.

## 계획 영향

- 데스크톱 앱 기본 제품명/목적을 `workspace_tracker`로 전환한다.
- 기본 네비게이션은 `overview`, `source`, `desktop`, `eval`, `projects`, `history`, `documents`, `requirements`로 제한한다.
- `agents`, `tools`, provider direct run, Ollama, AgentCore류 runtime lifecycle은 advanced/separated로 이동한다.
- 새 프로젝트는 데스크톱 앱 내부 데이터가 아니라 별도 Git repository/imported workspace로 모델링한다.

## 불확실성

- 실제 원격 저장소 생성, clone UX, 각 guest AI 도구의 설치 자동화는 후속 구현 범위다. 이번 변경은 제품 경계, 기본 UI, 스냅샷 모델, 테스트 계약을 먼저 고정한다.
