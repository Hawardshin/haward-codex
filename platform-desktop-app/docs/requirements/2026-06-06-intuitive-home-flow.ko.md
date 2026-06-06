# 요구사항: Intuitive Home Flow

- 날짜: 2026-06-06
- 상태: baseline
- 소유 프로젝트: `platform-desktop-app`

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-IHF-001 | 홈 첫 화면은 사용자가 다음 행동을 바로 고를 수 있도록 준비, 선택, 실행, 평가의 짧은 흐름을 노출해야 한다. | must | `data-home-start-flow`, `data-home-flow-step` 테스트 |
| REQ-IHF-002 | 각 단계는 상태와 목적지를 함께 보여주고 클릭 시 해당 작업면 또는 설정 표면으로 이동해야 한다. | must | Browser click smoke, `activeDesktop`/handoff 확인 |
| REQ-IHF-003 | 새 흐름은 기존 홈 task intent, handoff strip, activity rail 흐름을 깨지 않아야 한다. | must | workspace-monitor check/test |
| REQ-IHF-004 | 첫 화면 레이아웃은 1280x720 데스크톱 viewport에서 가로 overflow와 단계 버튼 겹침이 없어야 한다. | must | Browser layout evaluate |
