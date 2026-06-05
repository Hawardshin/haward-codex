# Agents Detail Single Workspace 스펙

## 요구사항

- REQ-WM-037: 주요 섹션은 진단, 기록, 인벤토리, 생성기, 실행 보조 패널을 동시에 펼쳐 사용자를 압박하지 않는다.
- REQ-WM-038: Agents 기본 화면은 에이전트 코어 채팅을 주 작업면으로 유지한다.
- REQ-WM-039: 닫힌 보조 기능군과 선택되지 않은 heavy panel은 React tree에 붙지 않는다.
- REQ-WM-061: Agents 세부 기능 disclosure는 한 번에 하나의 active workspace만 렌더링한다.

## 사용자 결과

- 세부 기능을 열면 7개 기능 선택기가 먼저 보인다.
- 기본 선택은 `협업 / 3D 작업판`이다.
- `생성기`, `블루프린트`, `학습`, `흐름`, `인벤토리`, `런타임`을 선택하면 해당 작업면만 보인다.
- 선택되지 않은 3D canvas와 이전 기능 panel은 DOM에서 사라진다.
- 390px 모바일에서는 선택기가 한 열로 접혀 텍스트가 깨지지 않는다.

## 비목표

- Agents 기본 채팅 UI 재배치
- 각 세부 panel 내부의 세부 기능 재설계
- 새 UI 라이브러리 설치
- backend/runtime 동작 변경
