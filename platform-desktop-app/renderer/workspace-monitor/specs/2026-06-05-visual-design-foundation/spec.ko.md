# Visual Design Foundation 스펙

## 요구사항

- REQ-WM-058: 데스크톱 제품 UI는 앱 셸, 상단바, 레일, Overview 주 작업면에서 일관된 색상/타이포그래피/그림자/버튼 상태 토큰을 사용해야 하며, 실제 작업 목표와 다음 행동 중심으로 시각 위계를 만들어야 한다.
- REQ-WM-075: 데스크톱 제품 UI는 Apple Human Interface Guidelines의 hierarchy, harmony, consistency 방향을 참고해 앱 셸, rail, titlebar, 반복 panel, dark 3D/terminal surface, primary control에 절제된 neutral material, 선명한 foreground, 통일된 border/shadow/control token을 적용해야 하며 JS 초기 비용이나 모바일 overflow를 늘리면 안 된다.

## 사용자 결과

- 사용자는 첫 화면에서 디자인 설명 문구가 아니라 실제로 시작할 작업 목표를 본다.
- 앱 레일, 상단바, 홈 포커스 영역은 같은 색상/선/그림자/타이포그래피 토큰을 공유한다.
- 주 작업면은 보조 dock/status보다 명확하게 더 높은 시각 위계를 가진다.
- 반복 panel, Tool Studio, Agents 세부 3D 화면, terminal 계열 dark surface는 서로 다른 화면처럼 튀지 않고 같은 material 계층으로 읽힌다.
- primary action은 파란색/흰색 foreground의 명확한 실행 지점으로 유지되고, dark surface 텍스트는 회색 반투명 대신 읽기 쉬운 foreground를 유지한다.
- 720px 이하에서도 제목, 버튼, flow step이 줄바꿈 때문에 깨지지 않는다.

## 비목표

- 모든 섹션의 상세 화면을 한 번에 전면 재설계
- 새 UI 라이브러리 또는 디자인 시스템 패키지 설치
- runtime, agent, tool 실행 로직 변경
- 생성 snapshot 파일 정리
- Apple 브랜드 UI를 복제하거나 Apple 전용 SF Pro 라이선스 폰트를 번들에 추가
