# 사용자 요청 요약: Tab transition performance

- 날짜: 2026-06-05
- 요약: Workspace Monitor에서 탭 간 이동할 때 느려지는 현상을 해결해 달라는 요청.
- 소유 프로젝트: `platform-desktop-app/renderer/workspace-monitor/`
- 처리 방향: 닫힌 보조 기능군이 탭 전환 때 함께 렌더링되는 병목을 제거하고, 섹션 전환 상태 갱신을 즉시 처리한다.
- 성능 기준: 정적 export, viewport 1280x820, CPU throttle 6에서 `overview`, `agents`, `desktop`, `source`, `intent` 탭 전환 시간을 측정한다.
- 완료 기준: 탭 전환 평균이 기존 측정보다 낮아지고, 닫힌 disclosure 내부 heavy panel DOM count가 0이며, disclosure를 열면 기존 기능이 정상 표시된다.
