# 계획 근거

- 날짜: 2026-06-07

## 근거

- 기존 `DesktopActionFeedbackCard`는 액션 직후 피드백에는 유효하지만 사용자가 지나간 init 완료 상태를 계속 확인하기에는 약하다.
- `start_cli_adapter_session`와 `start_cli_task_pipeline`은 이미 성공 report를 반환하므로 별도 런타임 API 변경 없이 UI 상태로 표시할 수 있다.
- 별도 컴포넌트로 분리하면 `MonitorShell.tsx` 증가를 줄이고 테스트 토큰을 명확히 둘 수 있다.
