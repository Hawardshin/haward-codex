# 스펙: Dropdown Trigger Baseline

## 목표

- Tool Studio의 기본 드롭다운 버튼이 현재 선택값과 메뉴 affordance를 즉시 인지할 수 있게 한다.
- 버튼 하나 안에서 세부 기능, 상위 흐름, 메뉴 caret, 열림 상태를 안정적으로 보여준다.
- 모바일/좁은 창에서도 텍스트가 깨지거나 수평 overflow를 만들지 않게 한다.

## 요구사항

- 드롭다운 trigger는 `aria-haspopup="menu"`를 명시해야 한다.
- trigger는 현재 `activeMode` label과 `activeStage` label을 함께 표시해야 한다.
- trigger는 icon, primary label, secondary flow label, caret 영역을 분리해야 한다.
- Radix `data-state="open"` 상태에서는 caret이 회전해 열린 상태를 보여야 한다.
- trigger의 label은 한 줄 ellipsis로 처리하고 860px 이하에서는 전체 폭에 맞춰 줄어야 한다.
- 기본 클릭 타깃은 기존 `--control-target-size` 체계를 유지해야 한다.

## 제외

- Tool Studio 모드 모델 변경
- Dropdown menu item 목록 또는 shortcut 변경
- 실제 툴 제작/배포 실행 로직 변경
