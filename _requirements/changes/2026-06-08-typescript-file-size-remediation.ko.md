# Requirements change: TypeScript file-size remediation

- 날짜: 2026-06-08
- 범위: `platform-desktop-app` workspace monitor

## 요구사항

- REQ-TS-SPLIT-001: 500줄 초과 TS/TSX 파일은 동작 변경 없이 순수 데이터, 순수 로직, 작은 UI component 단위로 분리한다.
- REQ-TS-SPLIT-002: 공유 상태는 기존 상위 component/hook에 유지하고, 하위 module은 props와 type-only imports로 연결한다.
- REQ-TS-SPLIT-003: 외부 OS, signing credential, clean-machine 계정이 필요한 항목은 구현 완료로 주장하지 않고 `blocked_external_gate`로 유지한다.
- REQ-TS-SPLIT-004: 각 slice는 `workspace-monitor test`, `check`, 필요한 build/smoke로 검증한다.

## 비목표

- 전체 UI 재설계나 새 runtime dependency 도입은 이번 slice의 목표가 아니다.
- `MonitorShell.tsx` 전체를 한 번에 500줄 이하로 내리는 risky rewrite는 하지 않는다.
