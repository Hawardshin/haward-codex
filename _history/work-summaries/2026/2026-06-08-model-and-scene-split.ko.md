# Work Summary: model and scene split

- 날짜: 2026-06-08
- 프로젝트: `platform-desktop-app`

## 요약

`snapshot.ts`와 `desktop.ts`의 대형 타입 정의를 영역별 파일로 분리하고 public re-export shell을 유지했다. ToolStudio의 Three.js scene side-effect는 별도 hook으로 이동해 패널 파일의 장면 수명주기 책임을 분리했다.

## 검증

- `workspace-monitor` tests/check/build 통과.
- `platform-desktop-app` renderer customer build/audit 통과.

## 남은 작업

- `MonitorShell.tsx` 추가 componentization.
- `ToolStudioPanel.tsx` 추가 view/state 분리.
- 공개 배포용 signing/notarization/clean-machine gate.
