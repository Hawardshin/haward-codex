# 요구사항 검토: 도구 독립 AI assistant 운영 원칙

## 검토 대상

- `REQ-WS-028`

## 검토 결과

- 상태: 승인
- 작업 모드: `governance`
- 범위: workspace root, `_docs/`, `_ops/assistant-runtimes/`, `_templates/assistant-operating-principles/`, `_tools/structure-audit/`, `workspace-monitor/`

## 검토 메모

- 사용자는 이 환경이 Codex 기반으로 보이지만 Claude Code, Antigravity, Cursor, 또는 사용자가 편한 기술에서도 쓸 수 있는 원칙 템플릿을 원한다고 요청했다.
- 기존 `AGENTS.md`에는 이미 많은 운영 규칙이 들어 있으므로, 다른 도구 파일에 전체 규칙을 복사하면 유지보수가 어려워진다.
- 공식 문서 기준으로 도구마다 프로젝트 instruction/rule 파일의 위치와 포맷이 다르므로, 공통 정책 원본과 도구별 adapter를 분리하는 것이 적절하다.
- 다른 도구가 실제로 도입될 때 최신 공식 문서로 registry를 다시 확인해야 한다.

## 승인된 수용 기준

- tool-agnostic operating model 문서가 존재한다.
- Codex, Claude Code, Cursor, Antigravity adapter 파일이 공통 원칙을 가리킨다.
- runtime adapter registry가 self-documenting config로 존재한다.
- root structure audit와 memory bootstrap이 runtime adapter 구조를 인식한다.
- workspace monitor가 adapter/template 문서를 탐색할 수 있다.
