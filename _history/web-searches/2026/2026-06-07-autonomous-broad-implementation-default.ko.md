# 웹 검색 기록: 자율 넓은 구현 기본값

- 날짜: 2026-06-07
- 목적: 후속 구현 명령을 지속 규칙으로 저장할 때 `AGENTS.md`와 저장소 지침 문서가 적절한 표면인지 확인한다.

## 검색어

- `OpenAI Codex cloud tasks AGENTS.md official documentation`
- `OpenAI Codex AGENTS.md official`
- `GitHub Copilot coding agent custom instructions AGENTS.md official documentation`

## 확인한 출처

- OpenAI Developers, `Custom instructions with AGENTS.md - Codex`: `https://developers.openai.com/codex/guides/agents-md`
- OpenAI, `Introducing Codex`: `https://openai.com/index/introducing-codex/`
- GitHub Docs, `About customizing GitHub Copilot responses`: `https://docs.github.com/en/copilot/concepts/prompting/response-customization`

## 제외한 약한 출처

- 뉴스 기사, Reddit 글, Wikipedia 문서는 현재 저장소 규칙 변경의 근거로 쓰지 않았다.

## 적용한 판단

- OpenAI 문서는 Codex가 저장소 안의 `AGENTS.md` 지침으로 코드베이스 탐색, 테스트 명령, 프로젝트 관행을 안내받는다고 설명한다.
- GitHub 문서는 저장소 custom instruction이 반복 입력을 줄이고 저장소 맥락의 응답을 조정하는 용도라고 설명한다.
- 따라서 이번 요청은 일회성 채팅 답변이 아니라 `AGENTS.md`와 `_docs/instructions/persistent-instructions*`에 저장하는 것이 맞다.

## 남은 불확실성

- AI 모델은 지침을 항상 완벽하게 따르지는 않을 수 있으므로, 루트 지침만이 아니라 작업 기록과 메모리 부트스트랩 anchor 설명에도 반영해 검색 가능성을 높였다.
