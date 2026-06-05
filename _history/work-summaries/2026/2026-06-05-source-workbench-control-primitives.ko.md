# 작업 요약: 소스 워크벤치 컨트롤 프리미티브

- `MonitorShell.tsx`에서 소스 파일 목록 native `<select>`를 Radix DropdownMenu 기반 커스텀 파일 선택기로 교체했다.
- 소스 열기/저장/전체 저장/복사 액션, 편집기 툴바, 소스 워크벤치 탭을 공용 `Button`/`ActionGroup`으로 바꿨다.
- `WorkspaceExplorerPane.tsx`의 폴더 선택/새로고침 명령 버튼도 공용 버튼 프리미티브로 통일했다.
- 드롭다운 메뉴, 선택 항목, 액션 그룹 레이아웃 CSS와 `check-source-control-design` 계약을 갱신했다.
- 구현 후 내부 패키지 빌드까지 실행해 `.app`와 `.dmg`를 다시 만들었다.

## 검증

- `workspace-monitor test`, `workspace-monitor check` 통과.
- `platform-desktop-app test`, `platform-desktop-app check` 통과.
- `platform-desktop-app package:internal` 통과, codesign verify와 DMG verify 포함.
