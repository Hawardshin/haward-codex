# Traceability

| 요구사항 | 산출물 | 검증 |
| --- | --- | --- |
| REQ-WM-012 | `workspace-monitor/scripts/collect-workspace.mjs` | `npm test`, snapshot source count |
| REQ-WM-012 | `workspace-monitor/lib/snapshot.ts` | `npm run check` |
| REQ-WM-012 | `workspace-monitor/components/MonitorShell.tsx` | `npm run build` |
| REQ-WM-012 | `workspace-monitor/app/globals.css` | UI build |
| REQ-WM-012 | `agent-platform/configs/access/view-mode-registry.json` | `check-view-modes` |

## 근거

- Node.js `fs` 공식 문서
- Next.js Static Exports 공식 문서
- Shiki 설치 문서
- Monaco Editor 문서

## 비고

Source 탭은 코드 편집기가 아니라 읽기 전용 탐색기다. public 배포 전에는 snapshot의 `sourceFiles` 범위를 반드시 검토해야 한다.
