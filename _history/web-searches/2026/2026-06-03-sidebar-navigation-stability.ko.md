# 웹 검색 기록: 좌측 내비게이션 안정화

## 메타

- 날짜: 2026-06-03
- 요청: `UR-2026-06-03-040`
- 소유 프로젝트: `platform-desktop-app/`
- 목적: desktop workbench형 activity rail/sidebar 분리와 중복 navigation 제거 기준 확인

## 쿼리

- `desktop app sidebar navigation duplicate activity bar sidebar UX guidelines official`
- `VS Code activity bar side bar navigation UX guidelines official`
- `Microsoft Fluent 2 navigation pane app sidebar official`
- `site:code.visualstudio.com/api/ux-guidelines activity bar side bar views`
- `site:code.visualstudio.com/docs/getstarted/userinterface Activity Bar Side Bar`

## 확인한 출처

| 출처 | 신뢰도 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| VS Code UX Guidelines, Activity Bar (`https://code.visualstudio.com/api/ux-guidelines/activity-bar`) | 높음 | Activity Bar는 핵심 navigation surface이며 중복 아이콘을 만들지 말라고 한다. | `activity-rail`을 단일 섹션 전환면으로 유지했다. |
| VS Code UX Guidelines, Sidebars (`https://code.visualstudio.com/api/ux-guidelines/sidebars`) | 높음 | Sidebar에는 관련 view/content를 묶고, 기존 기능 반복을 피하라고 한다. | sidebar의 섹션 버튼 반복을 제거하고 현재 화면 context panel로 바꿨다. |
| VS Code Get Started, User Interface (`https://code.visualstudio.com/docs/getstarted/userinterface`) | 높음 | Activity Bar는 view 전환, Primary Side Bar는 작업 context와 project/folder 보조 정보를 맡는다. | activity rail과 sidebar의 책임을 분리했다. |

## 약한 출처 및 제외

- 일반 블로그와 커뮤니티 UX 의견은 이번 버그 수정의 직접 근거로 쓰지 않았다.
- Microsoft Fluent 검색은 보조 확인용이었고, 실제 구현 결정은 프로젝트 구조와 VS Code 공식 workbench 문서가 더 직접적이었다.

## 공개 결정 요약

- 같은 섹션 이동 버튼을 activity rail과 sidebar에 동시에 두지 않는다.
- sidebar는 현재 화면의 목적, 기능군, 상태를 설명하는 context surface로 사용한다.
- 좌측 버튼 hover나 암묵 grid row 때문에 위치가 흔들려 보이지 않도록 navigation rail layout을 명시한다.
