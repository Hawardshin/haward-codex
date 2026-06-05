# Native Select 교체 요구사항

날짜: 2026-06-06
프로젝트: `platform-desktop-app`

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
|---|---|---:|---|
| REQ-PDA-122 | Workspace Monitor는 사용자가 직접 선택하는 주요 UI에서 OS native `<select>` 팝업을 노출하지 않아야 한다. | must | `tool-studio.test.mjs`의 `<select\b` 재발 방지 테스트 |
| REQ-PDA-123 | 짧은 선택지는 열린 상태를 요구하지 않는 앱 스타일 버튼 그룹으로 제공하고, 선택/호버/활성 상태가 색상과 음영으로 구분되어야 한다. | must | `.app-choice-button-group`, `learning-action-choice-grid`, `decision-answer-type-choices` |
| REQ-PDA-124 | 날짜/카테고리처럼 길어질 수 있는 선택지는 OS native 메뉴 대신 앱 스타일 커스텀 메뉴를 사용해야 한다. | must | `.app-choice-menu-trigger`, `document-filter-choice`, `history-date-choice` |
| REQ-PDA-125 | 선택 UI는 접근성 의미를 잃지 않도록 `role="listbox"`와 `role="option"` 또는 Radix menu primitive를 사용해야 한다. | should | renderer type check, static tests |

## 결정

- Provider 선택 UI와 같은 OS 기본 팝업 문제를 재발시키지 않기 위해 남아 있던 native `<select>`를 모두 제거했다.
- 긴 목록은 화면을 과하게 늘리지 않도록 Radix `DropdownMenu` 기반 앱 메뉴로 처리했다.
- 짧은 선택지는 클릭 즉시 고를 수 있는 버튼 그룹으로 바꿨다.
