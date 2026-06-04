# 사용자 요청 요약: Responsive workflow layout

- 날짜: 2026-06-05
- 요약: 버튼 위치와 화면 구성이 전체 화면에서만 맞고, 모든 기능을 한 화면에 담으려 해 사용자가 힘들다는 피드백.
- 추가 피드백: 전체화면이 아닐 때 깨지는 화면이 많으므로 주요 섹션이 작은 창에서도 깨지지 않아야 한다.
- 추가 피드백: 텍스트 크기가 화면마다 들쭉날쭉하므로 역할 기반 scale로 정리해야 한다.
- 추가 피드백: 더 가독성 높은 폰트를 쓰되, 작은 보조 텍스트는 억지로 키우지 말고 작게 유지해야 한다.
- 추가 피드백: 어두운 배경에는 흰색 텍스트를 써야 하며, 폰트는 더 좋은 제품 폰트로 교체해야 한다.
- 추가 피드백: 한 페이지에 너무 많은 정보가 있으면 괴로우므로, 초기 화면에서 동시에 펼치는 정보량을 더 줄여야 한다.
- 추가 피드백: 에이전트 코어 채팅 UI가 낯설고 별로이므로 ChatGPT/Claude/Gemini처럼 익숙한 중앙 대화 로그와 하단 입력창 구조로 바꿔야 한다.
- 소유 프로젝트: `platform-desktop-app/renderer/workspace-monitor/`
- 처리 방향: fixed-height shell을 풀고, 핵심 작업 중심의 세로 흐름과 progressive disclosure를 적용한다.
- 추가 처리: 900/720/540/390px 정적 export audit를 기준으로 주요 섹션 overflow와 작은 버튼을 제거한다.
- 추가 처리: typography token을 도입하고 임의 font-size 및 브라우저 기본 small text 축소를 제거한다.
- 추가 처리: `Pretendard`/`Noto Sans KR` 우선 fallback stack을 적용하고, 기본 `<small>`은 11px small token으로 낮춘다.
- 추가 처리: dark theme, rail, primary action, active tab, code/source/terminal dark surface의 foreground를 흰색 token으로 통일한다.
- 추가 처리: Agents/Desktop Runtime의 보조 생성기, 진단, 기록, 인벤토리, 결정함 패널을 기본 접힘인 section-level disclosure로 내린다.
- 추가 처리: 에이전트 코어 채팅을 중앙 대화 로그, 하단 composer, compact provider/model selector, 기본 닫힘 context drawer 구조로 재배치한다.
