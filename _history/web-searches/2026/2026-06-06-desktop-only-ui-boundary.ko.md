# Web Search: Desktop-only UI Boundary

- 날짜: 2026-06-06
- 요청: 설치형 데스크톱 앱에서 모바일 UI를 제거하고 최소 창 크기 기반으로 데스크톱 작업대를 유지한다.

## Queries

- `Tauri v2 window minWidth minHeight configuration official docs`
- `Tauri v2 window size constraints minWidth minHeight official documentation`
- `desktop app responsive design minimum window size desktop first UI official guidance`

## Checked Sources

- Tauri v2 Configuration Reference: https://v2.tauri.app/reference/config/
  - 신뢰도: official docs
  - 확인 내용: `app.windows` config는 window `width`, `height`, `minWidth`, `minHeight`를 제공하며 `minWidth`와 `minHeight`는 logical pixels 단위 최소 창 크기다.

## Plan Impact

- Tauri main window를 `width=1440`, `height=900`, `minWidth=1280`, `minHeight=800`으로 변경한다.
- renderer CSS도 `--desktop-app-min-width: 1280px`, `--desktop-app-min-height: 800px`로 같은 계약을 유지한다.
- 모바일 viewport QA는 이번 제품 acceptance에서 제거한다.

## Uncertainty

- OS별 실제 사용 가능 최소 창 크기 체감은 화면 해상도와 display scaling에 따라 다르므로, 이번 변경은 internal package smoke에서 실제 앱 실행을 확인해야 한다.
