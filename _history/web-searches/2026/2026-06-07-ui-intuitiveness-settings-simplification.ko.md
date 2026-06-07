# UI 직관성 단순화 웹 검색 기록

- 날짜: 2026-06-07
- 검색 목적: 설정/버튼/상태 피드백 UI를 줄일 때 적용할 외부 기준 확인.
- 확인한 출처:
  - Nielsen Norman Group, 10 Usability Heuristics: https://www.nngroup.com/articles/ten-usability-heuristics/
  - Material Design Buttons: https://m2.material.io/components/buttons
  - WCAG 2.2 Contrast Minimum: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
  - Apple Human Interface Guidelines Buttons: https://developer.apple.com/design/human-interface-guidelines/buttons
- 반영 요약:
  - 사용자가 해야 할 다음 행동은 짧은 명령형 라벨로 보이게 하고, 긴 설명은 `title`/`aria-label`로 분리했다.
  - 설정 안내는 항상 펼쳐진 설명 카드가 아니라 접을 수 있는 구조로 바꿨다.
  - 상태 피드백은 화면 안에서 완료/실패/대기 차이가 바로 보이도록 유지했다.
  - 색상 변경은 기존 contrast test와 token 계약을 유지하는 범위로 제한했다.
