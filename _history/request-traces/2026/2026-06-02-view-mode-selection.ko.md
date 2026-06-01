# 요청-결과 추적: View Mode Selection

## 요청

- ID: `UR-2026-06-02-016`
- 요약: 사용자 보기와 개발자 보기를 분리하되, 현재는 슈퍼어드민 중심 개발 모드를 선택할 수 있게 한다.

## 요구사항

- `REQ-WS-061`
- `REQ-WM-011`

## 결과

- `view_mode` 공통 개념을 추가했다.
- 기본값은 `superadmin_developer`로 두었다.
- Workspace Monitor 상단에서 `User View`, `Developer View`, `Super Admin Dev`를 선택할 수 있게 했다.
- `view_mode`를 `install_mode`, `work_mode`와 분리했다.
- UI hiding이 보안 경계가 아니라는 점을 정책과 registry에 명시했다.

## 산출물

- `agent-platform/configs/access/view-mode-registry.json`
- `agent-platform/src/agent_platform/view_modes.py`
- `agent-platform/tests/test_view_modes.py`
- `agent-platform/configs/agents/view-mode-router-agent.json`
- `agent-platform/docs/view-mode-router-agent.ko.md`
- `_docs/policies/view-mode-policy.ko.md`
- `_ops/workflows/73-view-mode-selection.md`
- `_ops/prompts/103-view-mode-selection.md`
- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/app/globals.css`

## 검증

- `check-view-modes`: 예정/수행 기록은 평가 보고서에 연결
- `agent-platform` 단위 테스트: 예정/수행 기록은 평가 보고서에 연결
- `workspace-monitor` collect/test/check/build: 예정/수행 기록은 평가 보고서에 연결

## 평가

- `_history/evaluations/2026/2026-06-02-view-mode-selection.ko.md`

## 커밋

- close-out 후 기록
