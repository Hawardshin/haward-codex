# 작업 요약: Activity Rail Intuitiveness

- 기본 activity rail 목적지 버튼에 짧은 라벨을 항상 보이게 했다.
- 기본 데스크톱 레일 폭을 76px로 조정하고 nav button을 아이콘+라벨 2행 구조로 바꿨다.
- 모바일 상단 레일과 420px 이하 가로 스크롤 레일에서도 라벨이 숨겨지지 않게 했다.
- 홈, 운영 센터, 설정 icon button에 `aria-label`을 추가했다.
- 데스크톱/모바일 브라우저 smoke에서 label span visible, active current state, overflow 0을 확인했다.
