# 질문 보류 성능 계획

## 선택한 최적화

- Backend: session report와 auto defer path에서 질문 scan 입력을 stdout/stderr 각각 최근 32KB tail로 제한한다.
- Frontend: active session poll overlap을 막고, inbox refresh를 4초 throttle하며, 동일 report는 기존 객체를 재사용한다.
- Frontend: idle elapsed time은 5초 bucket으로 render signature를 계산한다.

## 검증

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- close-out evaluator와 resource/grounding/cli-pipeline checks
