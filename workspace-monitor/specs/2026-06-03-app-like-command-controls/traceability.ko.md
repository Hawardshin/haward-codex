# 추적성: 앱형 Command Controls

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-WM-025 | `app-control-bar`, `command-palette`, pinned/recent controls, keyboard/localStorage lifecycle | `npm test`, `npm run check`, `npm run build`, static export smoke, customer bundle |

## 출처

- 사용자 요청: 실제 앱과 동일하게 다양한 기능을 써서 만들라는 요청.
- 웹 근거: 복잡한 앱은 command palette, action controls, saved/persisted quick view 성격의 controls로 반복 이동과 설정 전환을 줄인다.
