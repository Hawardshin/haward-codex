# Workspace Monitor 리서치 기반 UX 개선

## 목적

`workspace-monitor`는 문서 뷰어가 아니라 에이전트 플랫폼의 운영 화면이다. 첫 화면은 프로젝트 수나 문서 수보다 현재 상태, 막힘, 다음 행동, 근거 trail, 보기/언어 모드를 먼저 보여줘야 한다.

## 반영한 원칙

- AI UX는 capability, limitation, explanation, global control을 명확히 해야 한다.
- Dashboard는 strong hierarchy와 제한된 핵심 metric을 우선하고, 세부 탐색은 drill-down에 둔다.
- 사용자는 system status를 즉시 이해해야 하며, 중요한 선택지는 기억이 아니라 recognition으로 찾을 수 있어야 한다.
- 근거 trail은 설득 장식이 아니라 검증 handle이다.

## 구현 요약

- overview 상단에 command center를 추가한다.
- blocked task, public readiness, active work를 하나의 attention state로 요약한다.
- next action, evidence, mode control을 operating spine으로 보여준다.
- 기존 projects/history/documents/source/requirements/agents tab은 drill-down 탐색으로 유지한다.

## 검증

- `pnpm run test`
- `pnpm run check`
- `pnpm run build`
- Playwright screenshot smoke
