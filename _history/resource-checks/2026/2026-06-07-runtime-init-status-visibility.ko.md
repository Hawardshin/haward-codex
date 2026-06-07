# 리소스 점검

- 날짜: 2026-06-07
- 리스크 유형: CLI 세션 시작, task pipeline init, terminal drawer, task-run refresh.

## 점검

- 새 장기 실행 프로세스: 없음. 기존 `start_cli_adapter_session`와 `start_cli_task_pipeline` 호출 결과를 UI 상태로 표시만 한다.
- 새 타이머/폴링: 없음.
- 실패 처리: Tauri runtime 부재, prompt 누락, CLI init 실패를 상태 카드와 액션 피드백 실패로 남긴다.
- 리소스 누수 위험: 낮음. 상태 객체만 React state에 보관하고, 세션 프로세스 관리는 기존 런타임 경로를 그대로 사용한다.

## 검증

- TypeScript check 통과.
- workspace-monitor tests 통과.
- platform-desktop-app check/test 통과.
