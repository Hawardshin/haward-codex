# Multi-File Source Editing Plan

## 목표

설치형 앱의 Desktop 탭에서 여러 workspace-scoped 파일을 동시에 열고, 드래프트 큐와 diff review를 통해 저장 전 변경을 확인할 수 있게 한다.

## 선택

- 새 editor dependency 설치 없음.
- 기존 Tauri `read_workspace_text_file`, `write_workspace_text_file` command의 보안 경계를 유지.
- React 상태에 `SourceDraftEntry` 큐를 추가해 열린 파일, dirty 파일, backup 결과를 관리.

## 작업 순서

1. Source Review 상태 모델을 단일 파일에서 다중 드래프트 큐로 확장한다.
2. 직접 경로 열기, indexed file browser, dirty queue, save current, save all, revert, close UI를 추가한다.
3. requirements/spec/readiness test를 새 기능과 연결한다.
4. TypeScript, tests, build, performance budget, visual smoke를 실행한다.
5. omission/resource/grounding/evaluation 기록을 남긴다.

## Deferred

- Monaco Editor 통합은 dependency/license/security audit 이후 진행한다.
- PTY/xterm 기반 source-affecting autonomous task supervisor는 후속 스펙에서 진행한다.
