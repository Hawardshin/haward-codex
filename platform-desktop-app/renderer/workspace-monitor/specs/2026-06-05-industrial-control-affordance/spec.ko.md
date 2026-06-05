# Industrial Control Affordance 스펙

## 요구사항

- REQ-WM-059: Overview 작업 dock의 목표 버튼은 번호, 기능 아이콘, 작업 설명, 상태 badge, 진행 화살표를 분리해 손이 갈 위치와 실행 결과가 즉시 보여야 한다.

## 사용자 결과

- 사용자는 작업 dock을 목록이 아니라 누를 수 있는 조작 패널로 인식한다.
- 각 목표 버튼은 번호, 아이콘, 설명, 상태, 진행 방향을 분리해서 보여준다.
- hover/focus/active 상태는 버튼이 실제 조작부처럼 반응한다.
- 모바일에서는 아이콘을 줄이고 번호, 텍스트, action cue 중심으로 재배치해 수평 overflow를 만들지 않는다.

## 비목표

- 전체 UI 라이브러리 교체
- 새 dependency 설치
- 실제 작업 실행 로직 변경
- generated snapshot 파일 정리
