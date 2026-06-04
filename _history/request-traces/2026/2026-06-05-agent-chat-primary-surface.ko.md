# 요청-결과 추적: Agent Chat Primary Surface

| 항목 | 내용 |
| --- | --- |
| 사용자 요청 | `_history/user-requests/2026/2026-06-05-agent-chat-primary-surface.ko.md` |
| 웹 검색 | `_history/web-searches/2026/2026-06-05-agent-chat-primary-surface.ko.md` |
| 요구사항 | `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md#REQ-WM-038` |
| 스펙 | `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-responsive-workflow-layout/` |
| 구현 | `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`, `platform-desktop-app/renderer/workspace-monitor/app/globals.css` |
| 검증 | `_history/evaluations/2026/2026-06-05-agent-chat-primary-surface-evaluation-input.json` |

## 결과 요약

Agents 탭의 기본 화면을 Agent Core 채팅 중심으로 재구성했다. 공통 운영 strip, 문서 필터, titlebar search, 지표, 계약 카드는 기본 채팅 first viewport에서 제거하거나 닫힌 disclosure/drawer 뒤로 이동했다.
