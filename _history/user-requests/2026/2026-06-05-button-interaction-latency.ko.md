# User Request: Button Interaction Latency

- 날짜: 2026-06-05
- 프로젝트: `platform-desktop-app/renderer/workspace-monitor`
- 요약: 특정 버튼을 눌렀을 때 느려지는 곳이 많으니 전반적이고 근본적인 개선을 하라는 요청.
- 해석: 개별 버튼 하나씩이 아니라 주요 섹션 버튼을 계측하고, 느린 공통 경로인 heavy workbench mount와 native refresh를 첫 paint 뒤로 분리한다.
- 연결 요구사항: `REQ-WM-041`
