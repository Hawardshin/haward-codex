# IDE Action Navigation 스펙

## 요구사항

- REQ-WM-068: Tool Studio depth와 상세 기능은 한 화면에 모두 펼치지 않고 IntelliJ식 action access로 접근해야 한다.

## 사용자 결과

- 사용자는 상세 기능을 얕은 탭 더미가 아니라 현재 위치에서 필요한 액션 메뉴로 연다.
- 좌클릭은 stage/mode 직접 선택, 우클릭은 해당 위치의 context action을 연다.
- `Alt+Enter`, `Alt+1/2`, `Alt+←/→`, 기존 mode shortcut으로 마우스 없이 주요 상세 기능에 접근한다.
- primary dropdown과 quick action menu는 같은 기능을 다른 entry point로 제공하되 화면을 과밀하게 만들지 않는다.

## 설계 결정

- 새 설치 없이 기존 Radix DropdownMenu/ContextMenu를 사용한다.
- Tool Studio에 `actionMenuOpen`, `selectAdjacentMode`, `copyActionMap`을 추가한다.
- stage rail과 mode rail 버튼을 Radix ContextMenu trigger로 감싸 우클릭 action을 제공한다.
- keyboard handler는 mode만 바꾸지 않고 `selectMode`를 통해 parent stage와 selected tool도 동기화한다.

## 비목표

- 전체 앱의 모든 컨텍스트 메뉴 완성
- 사용자 정의 keymap 편집 UI
- 실제 파일 편집/실행 command 수행
- generated snapshot 정리
