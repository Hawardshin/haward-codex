# 계획 기록: 도구 독립 AI assistant 운영 원칙

## 작업 모드

- `governance`

## 요청 요약

- Codex 기반으로 보이는 현재 저장소 운영 규칙을 Claude Code, Antigravity, Cursor, 또는 사용자가 편한 도구에서도 쓸 수 있는 원칙 템플릿으로 만들기.

## 근거

- 공식 문서 조사에서 각 assistant 도구는 서로 다른 project instruction/rule 파일을 사용한다.
- 정책 원본을 여러 도구 파일에 복사하면 divergence가 생기므로, 공통 원칙과 thin runtime adapter가 필요하다.
- 중요한 규칙은 instruction 파일만 믿지 않고 audit, config contract, memory bootstrap, evaluation으로 검증해야 한다.

## 실행 계획

1. 웹 검색 기록과 요구사항 변경을 남긴다.
2. tool-agnostic operating model과 adapter registry를 만든다.
3. Codex, Claude Code, Cursor, Antigravity adapter를 추가한다.
4. root structure policy, structure audit, memory bootstrap, workspace monitor를 갱신한다.
5. 검증과 평가 후 커밋하고 push한다.

## 산출물

- `_docs/operating-models/tool-agnostic-agent-operating-model.ko.md`
- `_ops/assistant-runtimes/adapter-registry.json`
- `CLAUDE.md`
- `.claude/rules/workspace-operating-principles.md`
- `.cursor/rules/workspace-operating-principles.mdc`
- `.agents/rules/workspace-operating-principles.md`
- `_templates/assistant-operating-principles/`
- `_specs/workspace-platform/2026-06-01-tool-agnostic-agent-principles/`
