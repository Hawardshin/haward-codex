# 웹 검색 기록: 설정 중심 사이드바와 초기화 구성

## 메타

- 날짜: 2026-06-03
- 요청: `UR-2026-06-03-041`
- 소유 프로젝트: `platform-desktop-app/`
- 목적: 데스크톱 workbench의 sidebar 접기/펴기, 단일 settings 진입점, 설정 category navigation 기준 확인

## 쿼리

- `VS Code settings categories tabs sidebar collapse primary sidebar official UX`
- `Apple Human Interface Guidelines macOS settings toolbar sidebar preferences official`
- `Microsoft Fluent 2 settings navigation tabs categories app settings official`
- `VS Code official user interface Activity Bar Primary Side Bar settings gear`
- `Apple Human Interface Guidelines macOS settings official sidebar toolbar`
- `Microsoft Fluent 2 settings navigation official`

## 확인한 출처

| 출처 | 신뢰도 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| VS Code User Interface (`https://code.visualstudio.com/docs/getstarted/userinterface`) | 높음 | Activity Bar는 view 전환, Primary Side Bar는 project/context 보조 정보를 맡고 sidebar visibility를 toggle할 수 있다. | activity rail은 남기고 sidebar 접기/펴기를 설정으로 중앙화했다. |
| VS Code User and Workspace Settings (`https://code.visualstudio.com/docs/configure/settings`) | 높음 | UI/behavior 설정은 settings editor에서 수정하고 scope를 구분한다. | view/language/runtime init 값을 settings-only flow로 옮겼다. |
| VS Code Custom Layout (`https://code.visualstudio.com/docs/editor/custom-layout`) | 높음 | Primary Side Bar 위치/visibility는 command/menu/settings에서 조정 가능한 workbench 설정이다. | sidebar mode를 durable UI setting으로 저장했다. |
| Apple HIG Sidebars (`https://developer.apple.com/design/Human-Interface-Guidelines/sidebars`) | 높음 | macOS에서는 sidebar show/hide button 또는 View menu command를 제공할 수 있다. | sidebar 접기/펴기를 명시적 설정 controls로 제공했다. |
| Apple HIG Toolbars (`https://developer.apple.com/design/human-interface-guidelines/toolbars`) | 높음 | toolbar item은 중요한 action 중심이어야 하며 모든 명령을 toolbar에 다 넣지 않는다. | 설정과 초기화 세부 옵션을 titlebar/tool area에 흩어두지 않았다. |
| Windows Settings overview (`https://support.microsoft.com/en-us/windows/exploring-windows-settings-56bdfb5a-b809-4e65-9c90-4bab76745e19`) | 중간 | Settings는 clearly labeled categories와 search로 관리한다. | 설정 dialog를 `화면`, `좌측 영역`, `초기화`, `데이터/운영` 대분류 탭으로 구성했다. |

## 약한 출처 및 제외

- 일반 블로그, Reddit, 비공식 튜토리얼은 직접 근거로 쓰지 않았다.
- Microsoft Fluent 검색 결과 중 generic component guidance는 보조 신호로만 보고, 실제 결정은 VS Code/Apple/Windows 공식 문서와 기존 앱 구조를 우선했다.

## 공개 결정 요약

- 설정은 activity rail의 단일 settings button에서 연다.
- 화면 언어/view mode/document language/sidebar mode/runtime init defaults/data reset은 설정 dialog 안의 category tab에서만 변경한다.
- Runtime/Task Pipe 화면은 현재 초기화 기본값을 보여주고, 변경은 `초기화 설정 변경`으로 settings tab에 위임한다.
