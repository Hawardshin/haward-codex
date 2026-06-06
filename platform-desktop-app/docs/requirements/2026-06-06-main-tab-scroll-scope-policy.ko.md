# Main Tab Scroll Scope Policy 요구사항

날짜: 2026-06-06
프로젝트: `platform-desktop-app`

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
|---|---|---:|---|
| REQ-PDA-126 | Workspace Monitor의 main tab/page surface는 기본 scroll owner가 아니어야 한다. | must | `.desktop-viewport`, `.mounted-section-panel` scroll 금지 패턴 검사 |
| REQ-PDA-127 | scroll container는 code editor/viewer, terminal/log, 긴 기능/파일 목록, popup/dialog/flyout, inspector 같은 bounded child surface에만 둔다. | must | `check-scroll-containers.mjs` scoped scroll contract |
| REQ-PDA-128 | main tab overflow가 생기면 전체 tab scroll보다 deeper view 또는 bounded child pane으로 정보 구조를 나누는 것을 기본 설계로 삼는다. | should | UI policy, persistent instructions |
| REQ-PDA-129 | scroll ownership 정책은 future session startup memory에서 찾을 수 있어야 한다. | must | `bootstrap-manifest.json` config contract |

## 결정

- 기존 scoped scroll surface는 유지한다.
- `.desktop-viewport`와 `.mounted-section-panel`은 whole-tab vertical scroll owner가 되지 않도록 static regression contract를 둔다.
- 이 원칙은 데스크톱 앱 UI의 기본 설계 기준으로 문서화한다.
