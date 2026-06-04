# 사용자 요청 요약: UI/UX/속도/Tool Studio 개선

- 날짜: 2026-06-05
- 요지: Workspace Monitor를 더 빠르고 직관적인 Agent Core 유사 제품 UI로 바꾸고, 툴 제작/배포/Python 환경/venv/툴 전용 관리/3D 에이전트 협업 UI를 추가한다.
- 이번 수용 기준:
  - Tool Studio가 독립 section으로 존재한다.
  - 툴 만들기, 배포, Python 실행환경, venv, registry가 한 화면에 과밀하게 섞이지 않고 단계/깊이로 분리된다.
  - 드롭다운과 우클릭 메뉴는 접근성 있는 오픈소스 라이브러리를 사용한다.
  - 3D 협업 UI는 section에서만 lazy mount되고 unmount cleanup을 갖는다.
  - 단축키와 버튼 target이 명확하다.
  - 텍스트 줄바꿈과 split scroll 범위가 안정적이다.
  - 탭/버튼 클릭 지연 회귀 검증을 수행한다.
