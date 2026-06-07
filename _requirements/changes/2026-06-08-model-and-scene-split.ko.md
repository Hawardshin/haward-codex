# Requirements change: model and scene split

- 날짜: 2026-06-08
- 범위: `platform-desktop-app`

## 요구사항

- REQ-MODEL-SPLIT-001: 대형 type model 파일은 import 호환성을 유지하는 re-export shell과 실제 type definition module로 분리한다.
- REQ-MODEL-SPLIT-002: ToolStudio의 Three.js scene side-effect는 cleanup/dispose 동작을 유지하며 별도 hook으로 분리한다.
- REQ-MODEL-SPLIT-003: 분리 후 기존 import 경로 `@/lib/snapshot`, `@/types/desktop`, `ToolStudioPanel`은 계속 동작해야 한다.
- REQ-MODEL-SPLIT-004: 테스트, check, build, customer bundle audit가 통과해야 한다.

## 비목표

- `MonitorShell.tsx` 전체 rewrite는 이번 slice의 목표가 아니다.
- 외부 signing/Windows/clean-machine gate는 로컬 구현 완료로 주장하지 않는다.
