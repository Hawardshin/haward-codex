# 사용자 요청 요약: Responsive workflow layout

- 날짜: 2026-06-05
- 요약: 버튼 위치와 화면 구성이 전체 화면에서만 맞고, 모든 기능을 한 화면에 담으려 해 사용자가 힘들다는 피드백.
- 추가 피드백: 전체화면이 아닐 때 깨지는 화면이 많으므로 주요 섹션이 작은 창에서도 깨지지 않아야 한다.
- 추가 피드백: 텍스트 크기가 화면마다 들쭉날쭉하므로 역할 기반 scale로 정리해야 한다.
- 추가 피드백: 더 가독성 높은 폰트를 쓰되, 작은 보조 텍스트는 억지로 키우지 말고 작게 유지해야 한다.
- 소유 프로젝트: `platform-desktop-app/renderer/workspace-monitor/`
- 처리 방향: fixed-height shell을 풀고, 핵심 작업 중심의 세로 흐름과 progressive disclosure를 적용한다.
- 추가 처리: 900/720/540/390px 정적 export audit를 기준으로 주요 섹션 overflow와 작은 버튼을 제거한다.
- 추가 처리: typography token을 도입하고 임의 font-size 및 브라우저 기본 small text 축소를 제거한다.
- 추가 처리: `Pretendard`/`Noto Sans KR` 우선 fallback stack을 적용하고, 기본 `<small>`은 11px small token으로 낮춘다.
