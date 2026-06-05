# 계획: MonitorShell 근본 boundary 재검토

## 작업 모드

- `standard`
- 이유: renderer architecture/performance 변경이며 internal package build까지 필요하다.

## 분해 판단

대형 범위로 보이지만 이번 slice의 touch path를 다음으로 제한한다.

- 구현: `MonitorShell.tsx`, `ToolStudioPanel.tsx`
- 테스트: `tests/tool-studio.test.mjs`
- 생성물: workspace snapshot files
- 기록: requirements/spec/history/evaluation

## 단계

1. web-first intake로 React/Next/web.dev performance 기준 확인.
2. `MonitorShell` line count, import boundary, chunk 문자열 위치 확인.
3. Tool Studio를 static runtime import에서 dynamic boundary로 분리.
4. idle prewarm에 Tool Studio module preload 연결.
5. 테스트 계약 갱신.
6. renderer build/perf와 desktop package 검증 실행.
7. 결과와 tradeoff 기록 후 커밋/푸시.

## 후속 후보

- `DesktopRuntimePanel`을 별도 file/dynamic boundary로 추출.
- Agents detail panels를 active detail별 chunk boundary로 분리.
- repeated-run perf report로 single-run 변동성 완화.
