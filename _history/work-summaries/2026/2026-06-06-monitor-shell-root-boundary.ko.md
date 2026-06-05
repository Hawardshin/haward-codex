# 작업 요약: MonitorShell 근본 boundary 재검토

## 완료 내용

- `MonitorShell.tsx`가 14,191줄이며 탭별 runtime/code boundary가 부족하다는 구조 병목을 확인했다.
- `ToolStudioPanel.tsx`의 props type을 export했다.
- `MonitorShell.tsx`에서 `ToolStudioPanel` runtime static import를 제거하고 `next/dynamic` top-level boundary로 전환했다.
- `preloadToolStudioPanel()`을 기존 idle work-surface prewarm에 연결했다.
- 테스트 계약을 dynamic boundary 중심으로 갱신했다.
- renderer build/perf, desktop test/check, internal package build를 완료했다.

## 결과

- Tool Studio 관련 문자열이 별도 JS chunk에 분리됐다.
- `perf:sections`: average 458ms, p95 667.7ms, resident/mounted max 5.
- `audit-tab-response`: active/ready p95 367.5ms.
- 내부 `.app`와 `.dmg` 생성 및 검증 통과.

## 해석

이번 변경은 Shell monolith를 전부 해결한 것이 아니라 첫 번째 실제 code boundary 분리다. 다음 병목은 `DesktopRuntimePanel`과 Agents detail panels다.
