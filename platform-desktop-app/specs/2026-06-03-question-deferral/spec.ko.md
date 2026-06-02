# 질문 보류 기능 스펙

## 목적

설치형 플랫폼이 외부 AI CLI를 guest lane으로 실행할 때, CLI가 사용자 결정이 필요한 질문을 출력해도 작업 전체가 멈추지 않도록 질문을 보류하고 decision inbox로 모은다.

## 범위

- `platform-desktop-app` Tauri backend의 pipe 기반 CLI session 명령
- `workspace-monitor` Desktop 탭의 session, task pipe, decision inbox UI
- readiness check와 regression test

## 요구사항

- 실행 중인 session은 stdout/stderr에서 질문 후보를 감지해야 한다.
- 자동 보류가 켜진 session은 질문 후보가 생기면 CLI stdin에 defer 메시지를 보내야 한다.
- 보류된 질문은 `_ops/coordination/human-decision-inbox.json`에 `deferred` 상태로 저장해야 한다.
- 같은 질문은 session별 prompt key로 중복 저장하지 않아야 한다.
- 사용자는 전체 감지 질문 보류와 개별 session 수동 보류를 실행할 수 있어야 한다.
- 보류된 decision은 기존 answer-only 및 answer-and-resume 흐름으로 이어져야 한다.
- 누락된 optional CLI는 여전히 `capability_missing`으로 degrade해야 하며 플랫폼 전체 실패가 되면 안 된다.

## 비범위

- 실제 CLI별 의미론적 질문 분류 모델
- public macOS signing/notarization
- 전역 CLI 자동 설치

## 수용 기준

- `defer_all_cli_adapter_questions` Tauri command가 등록되어 있다.
- `start_cli_adapter_session`과 `start_cli_task_pipeline`이 `autoDeferQuestions` 옵션을 받는다.
- Desktop UI에 `Auto-defer questions`와 `Defer detected questions`가 표시된다.
- 활성 session은 UI polling을 통해 자동 보류를 유발할 수 있다.
- tests/readiness/check/build/performance validation을 통과한다.
