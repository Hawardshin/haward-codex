# 계획: 레퍼런스 UI 적용 구현

## 작업 모드

- 선택: `governance`
- 이유: 설치형 데스크톱 앱 요구사항, 스펙, readiness test, Workspace Monitor UI를 함께 변경한다.

## 적용 범위

- `Command Palette`: VS Code/Raycast식 빠른 실행 surface.
- `Capability Center`: Docker/Raycast식 capability card와 setup-later 상태.
- `Run Board`: Warp/Cursor/OpenCode식 lane 상태, timeline, process graph.
- `Terminal Event Rail`: VS Code/Warp식 output surface를 structured event 후보로 분리.
- `Decision Grouping/Replay`: decision inbox를 session/source별로 묶고 답변/재개 metadata를 표시.
- `Source Review`: GitHub Desktop/Cursor식 diff summary와 backup save gate.
- `Evidence / Promotion`: output event, decision, source diff, artifact를 재사용 후보로 보여준다.

## 비범위

- xterm.js 설치
- Monaco Editor 설치
- PTY 또는 shell plugin 추가
- provider credential 저장
- public installer readiness 주장

## 검증

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- Playwright desktop/mobile screenshot smoke
- naming/structure audit, JSON validation, `git diff --check`
