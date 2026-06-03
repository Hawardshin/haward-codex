# 데스크톱 앱 셸 UI 구현 계획

1. 기존 `MonitorShell`의 navigation/state 구조를 유지하면서 settings dialog 상태와 단축키를 추가한다.
2. `main` 내부 렌더를 `desktop-app-shell` 구조로 감싼다.
3. topbar, view-mode bar, core rail, section tab groups를 activity rail/sidebar/titlebar로 재배치한다.
4. settings dialog에 view mode, language mode, pinned section 관리를 넣는다.
5. overview 콘텐츠를 desktop home 구조로 줄이고 긴 내부 패널은 각 섹션으로 이동시킨다.
6. CSS를 shell, dialog, overview home, 모바일 대응에 맞춰 수정한다.
7. typecheck/test/build와 시각 검증을 수행한다.
