# Request Trace: model and scene split

- 날짜: 2026-06-08
- 사용자 요청 요약: 미뤄둔 구조 개선을 계속 구현하고, 데스크톱 앱의 지연된 로컬 구조 압력을 줄인다.

## 입력 요구

- TypeScript/Rust 파일 크기 압력을 줄인다.
- 기능별 분리를 진행한다.
- 사용자가 첫 실행과 프로젝트 관리 흐름을 쉽게 쓸 수 있는 플랫폼 구조를 계속 정리한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/lib/snapshot*.ts`
- `platform-desktop-app/renderer/workspace-monitor/types/desktop*.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/workbench/tool-studio/useToolAgentScene.ts`
- `_specs/workspace-platform/2026-06-08-model-and-scene-split/`
- `_history/evaluations/2026/2026-06-08-model-and-scene-split.ko.md`

## 검증 연결

- `_specs/workspace-platform/2026-06-08-model-and-scene-split/validation.ko.md`
- `_history/omission-checks/2026/2026-06-08-model-and-scene-split.json`
- `_history/resource-checks/2026/2026-06-08-model-and-scene-split.json`

## 결과

- 이번 slice는 완료.
- 남은 oversized local files는 `MonitorShell.tsx`와 `ToolStudioPanel.tsx`.
