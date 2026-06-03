# Request Trace: Nested Pane Navigation Usability

- 요청 ID: `UR-2026-06-03-052`
- 날짜: 2026-06-03
- 소유 프로젝트: `platform-desktop-app/`

## 요청 요약

대분류 탭 하나 안의 scroll이 너무 길어지는 문제를 줄이고, 탭 내부에서도 클릭 가능한 하위 분할이나 view 전환을 제공해 사용자 사용성을 개선한다.

## 구현

- `MonitorShell.tsx`: settings subsection state와 `settings-subsection-rail` 추가
- `MonitorShell.tsx`: source workbench `파일`/`편집`/`저장 결과` view switcher 추가
- `RuntimeTerminalDrawer.tsx`: terminal drawer `시작`/`세션`/`출력`/`이벤트` view switcher 추가
- `globals.css`: 새 switcher와 view별 split/scroll layout 추가
- `check-readiness.mjs`, `readiness.test.mjs`: 회귀 방지 token 추가

## 결과

- settings, source workbench, terminal drawer 모두 탭 내부 하위 view 전환 구조를 갖게 했다.
- 자동 검증과 customer bundle token smoke는 통과했다.
- 실제 클릭 smoke는 현재 환경의 browser automation 부재로 수행하지 못했다.
