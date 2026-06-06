# Plan: Sidebar Navigation Componentization

1. `DesktopActivityRail` 컴포넌트와 props 타입을 추가한다.
2. `MonitorShell`의 기존 `<aside className="activity-rail">`을 새 컴포넌트 호출로 교체한다.
3. renderer tests와 platform readiness 검사에서 새 shell component를 읽도록 갱신한다.
4. check/test/build/platform 검증을 실행한다.
5. 기록, 평가, 커밋, 푸시를 완료한다.
