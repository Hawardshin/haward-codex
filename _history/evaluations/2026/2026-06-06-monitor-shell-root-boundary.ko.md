# 최종 평가: MonitorShell 근본 boundary 재검토

## 결론

작업은 닫을 수 있다. 사용자의 “근본부터 다시 보라”는 요청에 대해 남은 구조 병목을 Shell monolith로 식별했고, 가장 위험이 낮은 첫 code boundary로 Tool Studio를 dynamic chunk로 분리했다.

## 결과

- `MonitorShell.tsx`: 14,191 lines.
- `ToolStudioPanel.tsx`: 1,607 lines.
- Tool Studio runtime static import 제거.
- Tool Studio dynamic chunk boundary 추가.
- idle module preload 연결.
- internal `.app`와 `.dmg` 패키징 검증 통과.

## 성능 해석

- `perf:sections` average: 482ms에서 458ms로 개선.
- `perf:sections` p95: 652.7ms에서 667.7ms로 소폭 악화.
- resident/mounted max: 5 유지.
- `audit-tab-response` p95: 367.5ms.

## 남은 구조 병목

- `DesktopRuntimePanel`이 아직 Shell 내부에 크고 복잡하게 남아 있다.
- Agents detail panels도 Shell 내부에서 active-detail UI만 바뀌는 구조다.
- 다음 root slice는 Shell-local panel 추출과 dynamic boundary 확대다.
