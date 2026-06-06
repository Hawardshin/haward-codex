# Plan: Core Feature Connections

1. 웹 우선 조사로 workbench navigation, Tauri frontend/native bridge, agent tool/subagent 연결 기준을 확인한다.
2. 기존 홈 주요 기능, task intent, Tool Studio mode 요청 흐름을 확인한다.
3. `CoreFeatureDrilldownItem`에 세부 connection contract를 추가한다.
4. `MonitorShell`에 intent step과 tool step 공유 helper를 추가한다.
5. 홈 주요 기능 6개에 핵심 연결 버튼을 붙인다.
6. CSS와 static tests로 DOM/CSS/route contract를 고정한다.
7. renderer test/check, snapshot collect, renderer build, platform check, Browser smoke, omission/resource/evaluation guard를 실행한다.
8. history/spec/evaluation 기록 후 commit/push한다.
