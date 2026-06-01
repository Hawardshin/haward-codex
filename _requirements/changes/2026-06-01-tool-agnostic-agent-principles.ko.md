# 요구사항 변경: 도구 독립 AI assistant 운영 원칙

## 변경 ID

- `REQ-WS-028`

## 출처 요청

- `UR-2026-06-01-011`

## 변경 내용

- 이 저장소의 AI assistant 운영 원칙은 Codex 전용 문법이나 파일에 종속되지 않아야 한다.
- 공통 원칙은 `_docs/`, `_ops/`, `_requirements/`, `_specs/`, `_history/`, `agent-platform/configs/`에 둔다.
- `AGENTS.md`, `CLAUDE.md`, `.claude/rules/`, `.cursor/rules/`, `.agents/rules/`는 공통 원칙을 가리키는 runtime adapter로 관리한다.
- runtime adapter 폴더는 root project로 등록하지 않고 `_ops/projects/root-structure-policy.json`에서 별도 class로 설명한다.
- 새 assistant 도구를 쓰게 되면 `_ops/assistant-runtimes/adapter-registry.json`과 `_templates/assistant-operating-principles/`를 먼저 확인한다.

## 근거

- Claude Code, Cursor, Antigravity는 각자 다른 project instruction/rule 파일을 사용한다.
- 공통 정책을 도구별 파일에 복제하면 빠르게 불일치가 생긴다.
- Instruction 파일은 강제 장치가 아니므로 중요한 운영 원칙은 audit, config contract, memory bootstrap, evaluation으로 보완해야 한다.

## 검증

- adapter registry가 self-documenting config contract를 통과해야 한다.
- root structure audit가 `.claude`, `.cursor`, `.agents`를 `runtime_adapter`로 분류해야 한다.
- memory bootstrap manifest가 tool-agnostic operating model과 adapter registry를 anchor로 읽어야 한다.
- workspace monitor snapshot에 runtime adapter와 template 문서가 포함되어야 한다.
