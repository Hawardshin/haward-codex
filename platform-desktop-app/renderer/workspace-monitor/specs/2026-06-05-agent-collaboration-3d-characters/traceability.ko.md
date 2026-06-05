# 추적성

| 항목 | 연결 |
| --- | --- |
| 사용자 요청 | `_history/user-requests/2026/2026-06-05-agent-collaboration-3d-characters.ko.md` |
| 요구사항 | REQ-WM-038, REQ-WM-039, REQ-WM-060 |
| 구현 | `components/workbench/AgentCollaborationScene.tsx`, `components/MonitorShell.tsx`, `app/globals.css` |
| 테스트 | `tests/tool-studio.test.mjs` |
| 설치 감사 | `_history/installations/2026/2026-06-05-workspace-monitor-react-three-fiber-drei.ko.md` |
| 검증 | `validation.ko.md`, `_history/evaluations/2026/2026-06-05-agent-collaboration-3d-characters.ko.md` |
| 스크린샷 | `artifacts/screenshots/2026-06-05-agent-collaboration-3d-desktop.png`, `artifacts/screenshots/2026-06-05-agent-collaboration-3d-mobile.png` |

## 변경 의도

- Agents 첫 화면은 채팅 UI로 유지한다.
- Collaboration의 협업 이해는 세부 기능 안에서 더 큰 3D 작업면으로 제공한다.
- 새로운 3D 패키지는 exact version, 설치 감사, rollback 계획, pixel smoke로 추적한다.
