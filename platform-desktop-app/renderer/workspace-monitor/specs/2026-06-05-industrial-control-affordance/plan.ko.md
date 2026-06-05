# Industrial Control Affordance 계획

1. 버튼/컨트롤 공식 레퍼런스와 Fitts's Law 관련 자료를 확인한다.
2. REQ-WM-059를 요구사항에 추가한다.
3. Overview 작업 dock 버튼 JSX를 번호, 아이콘, 본문, badge, action cue로 분리한다.
4. CSS에서 조작 패널 표면, hit target, hover/focus/active 상태, 모바일 재배치를 정의한다.
5. 정적 테스트와 desktop/mobile smoke로 구조, 크기, overflow를 검증한다.

## 설계 선택

- 기존 lucide icon과 CSS만 사용한다.
- 작업 목표 버튼의 기본 높이는 dock 안에서 88px 이상으로 유지한다.
- 모바일에서는 기능 아이콘을 숨기고 action cue를 오른쪽 고정 affordance로 유지한다.
