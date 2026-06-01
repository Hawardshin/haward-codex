# 스펙: 도구 독립 AI assistant 운영 원칙

## 요구사항

- `REQ-WS-028`

## 문제

현재 저장소는 Codex에서 운영되고 있지만, 사용자는 Claude Code, Cursor, Antigravity, 또는 다른 assistant 도구에서도 같은 원칙을 재사용할 수 있기를 원한다. `AGENTS.md` 같은 단일 도구 진입점에 정책을 고정하면 다른 도구를 쓸 때 운영 규칙이 분기되거나 누락될 수 있다.

## 목표

- 공통 운영 원칙을 도구 독립 문서로 분리한다.
- Codex, Claude Code, Cursor, Antigravity용 thin runtime adapter를 둔다.
- runtime adapter root를 프로젝트가 아닌 별도 구조 class로 감사한다.
- 새 도구를 도입할 때 사용할 수 있는 generic assistant principle template을 제공한다.
- workspace monitor가 adapter와 template 문서를 탐색할 수 있게 한다.

## 비목표

- Codex 운영 규칙을 제거하지 않는다.
- 특정 도구의 플러그인이나 확장 프로그램을 설치하지 않는다.
- 실제 Claude Code, Cursor, Antigravity 실행 환경에서 E2E 테스트하지 않는다.

## 수용 기준

- `_docs/tool-agnostic-agent-operating-model.ko.md`와 `.en.md`가 존재한다.
- `CLAUDE.md`, `.claude/rules/`, `.cursor/rules/`, `.agents/rules/`가 공통 원칙을 가리킨다.
- `_ops/assistant-runtimes/adapter-registry.json`이 self-documenting config contract를 통과한다.
- `_ops/projects/root-structure-policy.json`과 `structure-audit`가 runtime adapter root를 인식한다.
- memory bootstrap manifest가 adapter registry와 tool-agnostic model을 anchor로 포함한다.
- `workspace-monitor` snapshot이 runtime adapter와 assistant principle template 문서를 포함한다.
