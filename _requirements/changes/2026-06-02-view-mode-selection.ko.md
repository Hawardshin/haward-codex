# 요구사항 변경: View Mode Selection

## 변경 요약

- 추가 요구사항: `REQ-WS-061`, `REQ-WM-011`
- 요청 요약: 사용자가 보는 것과 개발자가 보는 것은 다르지만, 현재는 슈퍼어드민 중심 개발 모드를 선택할 수 있게 해 달라는 요청.
- 변경 범위:
  - 공통 플랫폼 view mode 레지스트리 추가
  - Workspace Monitor view mode selector 추가
  - view mode를 `install_mode`, `work_mode`와 분리

## 변경 이유

기존 `install_mode`는 사용자용 설치와 개발자용 설치를 구분하지만, 화면에서 무엇을 보여줄지는 다루지 않는다. 또한 `work_mode`는 작업 수행 강도를 정하므로 UI audience와 섞으면 평가 게이트가 흐려진다.

## 결정

- `view_mode`를 새 공통 개념으로 추가한다.
- 현재 기본값은 `superadmin_developer`로 둔다.
- public/multi-user 배포 시 client-side hiding은 보안 경계가 아니며, snapshot 수집 또는 서버 인증/인가 계층에서 강제해야 한다.

## 관련 산출물

- `agent-platform/configs/access/view-mode-registry.json`
- `agent-platform/src/agent_platform/view_modes.py`
- `agent-platform/configs/agents/view-mode-router-agent.json`
- `_docs/policies/view-mode-policy.ko.md`
- `_ops/workflows/73-view-mode-selection.md`
- `_ops/prompts/103-view-mode-selection.md`
- `workspace-monitor/components/MonitorShell.tsx`
