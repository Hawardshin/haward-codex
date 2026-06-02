# 요구사항 검토: 다중 CLI 데스크톱 오케스트레이션

## 검토 대상

- `REQ-WS-085`
- `PDA-REQ-013` - `PDA-REQ-017`
- `PDA-UX-009` - `PDA-UX-012`

## 사용자 의도 적합성

- 설치형 앱을 특정 CLI wrapper로 만들지 않는다는 요구와 맞다.
- Claude Code, Gemini CLI, Codex CLI, OpenCode를 명시적으로 설정 후보로 둔다.
- 사용자가 없는 동안 CLI 질문이 전체 작업을 멈추지 않도록 decision inbox와 lane-level pause를 요구한다.
- “데이터가 점점 좋아지는 구조”를 terminal output 구조화, provenance, validation, reusable knowledge candidate로 표현한다.
- 코드 편집을 처음부터 직접 만들지 않고 Monaco 같은 성숙한 오픈소스 후보를 검토하게 한다.

## 검토 결과

- 상태: 승인
- 이유: 기존 CLI-neutral adapter, human decision inbox, CLI pipeline, installable desktop productization 원칙을 충돌 없이 확장한다.

## 검증 기준

- CLI adapter registry가 four concrete adapters와 interactive contract를 포함해야 한다.
- user-flow registry가 `ai_cli_orchestration_flow`를 포함해야 한다.
- readiness/test가 새 아키텍처 문서와 registry fields를 확인해야 한다.
- 실제 CLI 실행이나 dependency 설치가 이번 변경에 포함되지 않았음을 명확히 해야 한다.
