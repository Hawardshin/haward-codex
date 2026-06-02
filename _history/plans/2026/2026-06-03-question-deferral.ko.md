# 계획: 질문 보류 기능

## 작업 모드

- `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## 범위

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- desktop readiness/test/check records
- requirements/spec/history/evaluation records

## 결정

- 자동 보류 기본값은 켜짐이다.
- 질문 감지는 stdout/stderr line 기반 휴리스틱으로 시작한다.
- 자동 보류는 활성 session을 UI에서 주기적으로 poll해 실행한다.
- defer된 질문은 `deferred` status로 decision inbox에 저장한다.
- 사용자가 직접 누르는 수동 defer는 감지 질문이 없어도 lane에 defer 메시지를 보낼 수 있다.

## 검증 계획

- Workspace Monitor collect/test/check/build/perf
- Platform desktop readiness test/check
- static built output token check
- omission/resource/grounding/cli-pipeline/work-timer/evaluate-work
- git diff check, commit, push
