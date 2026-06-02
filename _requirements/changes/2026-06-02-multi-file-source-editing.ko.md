# Multi-File Source Editing Requirement Change

- 날짜: 2026-06-02
- 요청: 모든 파일 편집에 가까운 구현을 진행해 달라는 요청.
- 변경 유형: installable desktop app capability expansion

## Added

- `PDA-REQ-025`: Desktop source editing MVP는 여러 workspace-scoped 파일을 동시에 열어 드래프트 큐로 관리하고, dirty 상태, diff preview, 현재 파일 저장, 전체 dirty 파일 저장, 현재 드래프트 되돌리기, 드래프트 닫기, backup 저장 결과를 같은 화면에서 제공해야 한다.
- `PDA-UX-018`: Desktop 탭 source editing 화면은 검색/직접 경로 열기, dirty 파일 큐, diff preview, 현재 저장, 전체 저장, 되돌리기, 닫기, backup 결과 확인을 제공해야 한다.

## Non-Goals

- Monaco Editor, xterm.js, PTY dependency 설치.
- workspace 밖 파일 편집 허용.
- `_private/` 또는 `outputs/` 직접 편집 허용.
