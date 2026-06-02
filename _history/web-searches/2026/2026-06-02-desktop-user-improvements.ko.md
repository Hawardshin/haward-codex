# 웹 검색 기록: Desktop User Improvements

- 날짜: 2026-06-02
- 작업: 설치형 다중 CLI 데스크톱 앱의 사용자 측면 개선 기능 탐색 및 구현
- 검색 목적: 다음 구현 slice를 사용자 가치 기준으로 고르기

## 검색어

- `Tauri v2 command read write JSON file permissions official docs`
- `human in the loop AI agent decision inbox UX official docs LangGraph LangChain`
- `Tauri v2 capabilities permissions filesystem plugin official docs`
- `AI coding assistant desktop app user experience CLI orchestration decision inbox terminal editor`
- `Claude Code CLI install official docs`
- `Gemini CLI install official GitHub npm`
- `OpenAI Codex CLI install official GitHub`
- `OpenCode CLI install official docs`
- `OpenCode CLI install official docs opencode npm install`

## 확인한 출처

- LangChain human-in-the-loop docs: https://docs.langchain.com/oss/python/langchain/human-in-the-loop
- Tauri scope/security docs: https://v2.tauri.app/security/scope/
- Tauri shell plugin docs: https://v2.tauri.app/plugin/shell/
- Claude Code setup docs: https://docs.claude.com/en/docs/claude-code/setup
- Gemini CLI repository/docs: https://github.com/google-gemini/gemini-cli
- OpenAI Codex CLI help: https://help.openai.com/en/articles/11096431
- OpenCode official CLI docs: https://opencode.ai/docs/cli/
- OpenCode CLI listing used as a secondary discovery signal: https://opencli.co/cli/opencode
- 경쟁/참고 제품 신호: CodeSplash AI, Omni Code, Crest, Kata, Hariari, Friendly Terminal

## 무시하거나 약하게 본 출처

- 비공식 설치 가이드와 블로그는 package name 발견 신호로만 취급했다.
- Reddit/마케팅 페이지는 기능 수요와 UX 패턴 신호로만 보았고 사실 검증 근거로 사용하지 않았다.
- 보안 뉴스/경고는 자동 설치를 피하고 공식 링크와 검증 명령을 표시해야 한다는 risk signal로만 사용했다.

## 계획 영향

- 자동 설치는 하지 않는다. CLI별 설치 힌트, 검증 명령, 공식 참조 링크를 UI에 노출한다.
- HITL 자료의 approve/edit/reject 패턴을 반영해 decision inbox 답변 type을 `instruction`, `approve`, `edit`, `reject`로 둔다.
- 사용자가 작업 목적을 쉽게 선택하도록 session mode preset을 추가한다.
- 사용자가 복귀했을 때 pending decision을 직접 확인하고 답변 상태로 저장할 수 있게 Tauri command와 UI를 추가한다.

## 불확실성

- 실제 CLI별 최신 설치 절차와 auth flow는 사용자의 환경과 공급자 변경에 따라 달라질 수 있다.
- 이번 구현은 설치 실행이 아니라 setup guidance와 verified PATH check를 돕는 UI다.
