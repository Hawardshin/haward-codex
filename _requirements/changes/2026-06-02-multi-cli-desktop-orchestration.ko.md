# 요구사항 변경: 다중 CLI 데스크톱 오케스트레이션

## 변경 ID

- `REQ-CHANGE-2026-06-02-MULTI-CLI-DESKTOP-ORCHESTRATION`

## 배경

사용자는 설치형 데스크톱 앱이 Claude Code, Gemini CLI, Codex CLI, OpenCode를 설정할 수 있어야 하지만 특정 CLI에 종속되면 안 된다고 했다. 또한 여러 CLI를 동시에 실행하고, CLI output과 질문을 관리하며, 사용자가 부재 중인 질문은 보류해 decision inbox에 모으고, 데이터가 점점 좋아지는 구조를 원했다.

## 변경 내용

- `REQ-WS-085`를 추가한다.
- 네 AI CLI를 첫 optional adapter 후보로 둔다.
- 다중 CLI 실행은 platform supervisor, process graph, lane state, terminal I/O bound, stdin policy, merge gate, cleanup을 요구한다.
- interactive CLI 질문은 dependent lane만 멈추고 decision inbox로 route한다.
- 터미널 output은 structured record, artifact, decision, validation, reusable knowledge candidate로 승격 가능한 데이터 계약을 가진다.
- 코드 편집은 Monaco Editor 같은 성숙한 오픈소스 surface 우선으로 둔다.

## 영향 범위

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/docs/architecture/multi-cli-orchestration-runtime.ko.md`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`

## 상태

- 적용 완료
