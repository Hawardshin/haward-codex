# 모드 선택: Manager Tool Orchestration Planner

## 선택

- `work_mode`: `governance`
- `project`: `agent-platform`
- `view_mode`: 해당 없음
- `install_mode`: 해당 없음

## 이유

사용자 요청은 multi-agent orchestration 구조를 쉽게 만드는 플랫폼 도구를 요구했다. 이번 변경은 새 CLI, source module, shared orchestration config, agent spec, requirements baseline, spec, history/evaluation 기록을 바꾸므로 `governance`가 맞다.

## 경계

- 포함: framework-neutral manager-as-tools planning CLI
- 제외: 외부 runtime framework 설치, 실제 LLM/subagent 실행, long-running process, UI graph editor

## 평가 target

- `mode_selection_record_targets`: 이 파일
- `requirements_targets`: `_requirements/changes/2026-06-04-manager-tool-orchestration-planner.ko.md`, `_requirements/reviews/2026-06-04-manager-tool-orchestration-planner.ko.md`
- `spec_targets`: `_specs/workspace-platform/2026-06-04-manager-tool-orchestration-planner/`
- `omission_check_targets`: `_history/evaluations/2026/2026-06-04-manager-tool-orchestration-omission-input.json`
