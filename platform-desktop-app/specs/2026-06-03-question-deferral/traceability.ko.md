# 질문 보류 추적성

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| PDA-UX-006 | decision inbox에 CLI 질문 저장 | readiness/test, inbox command checks |
| PDA-UX-011 | 보류 질문의 blocked/unblocked/resume metadata | `append_session_decisions_to_inbox` |
| PDA-UX-014 | session console의 stdin/defer/cancel 조작 | Desktop session card/actions |
| PDA-UX-016 | answer-only와 answer-and-resume | 기존 decision resume command 유지 |
| PDA-UX-020 | task pipe lane별 질문 보류 | `start_cli_task_pipeline(autoDeferQuestions)` |
| PDA-UX-021 | 자동/수동/bulk 질문 보류 | `auto_defer_session_questions_locked`, `defer_all_cli_adapter_questions`, Workspace Monitor UI |

## 근거

- Tauri shell docs: child process execution requires explicit permissions and scope.
- Node child process docs: stdin/stdout/stderr pipe handling is a standard child-process orchestration boundary.
- WAI-ARIA dialog/alertdialog patterns: 사용자 결정은 명시적 decision surface로 모으는 편이 접근성과 예측 가능성에 유리하다.
