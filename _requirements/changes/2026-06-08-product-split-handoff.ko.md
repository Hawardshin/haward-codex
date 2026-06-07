# Requirements Change: product split handoff

- 날짜: 2026-06-08

## 요구사항

- REQ-SPLIT-HANDOFF-001: Workspace Tracker 앱은 기본 UI에서 agent factory, tool builder, Ollama/local model, provider direct run을 직접 운영 화면으로 노출하지 않는다.
- REQ-SPLIT-HANDOFF-002: Workspace Tracker 앱은 Codex, Claude Code, Cursor, Antigravity 등을 선택한 Git 작업공간 위에서 실행되는 게스트 도구로 설명하고, 작업 추적/보고/근거 확인 흐름을 기본으로 둔다.
- REQ-SPLIT-HANDOFF-003: Workspace Tracker 앱은 분리된 Agent Tool Desktop을 여는 명시적 handoff action을 제공한다.
- REQ-SPLIT-HANDOFF-004: Agent Tool Desktop은 agent/tool/model/provider/runtime gate 소유 영역을 독립 데스크톱 shell에서 명확히 보여준다.
- REQ-SPLIT-HANDOFF-005: 기존 테스트 계약은 in-app Tool Studio/Agent operation 노출이 아니라 separated handoff 계약을 검증하도록 갱신한다.

## 제외

- 공개 배포용 app signing, notarization, Windows installer, protocol registration은 이번 slice에서 완료 주장하지 않는다.
- provider credential을 실제로 읽거나 저장하지 않는다.
