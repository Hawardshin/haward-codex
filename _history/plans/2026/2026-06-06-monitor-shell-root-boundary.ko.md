# 작업 계획: MonitorShell 근본 boundary 재검토

## 분류

- 소유 프로젝트: `platform-desktop-app`
- 작업 모드: `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## 냉정한 평가

현재 Workspace Monitor는 탭이 여러 개지만 renderer code boundary는 거의 하나다. `MonitorShell.tsx`가 14k line을 넘고, 많은 탭의 JSX/state/effects가 같은 client module에서 평가된다. 이전 resident/prewarm 최적화는 mount 비용과 hidden tree 비용을 줄였지만, Shell 자체 평가와 section-level component boundary 부족은 남았다.

## 이번 slice

- 이미 별도 파일인 `ToolStudioPanel.tsx`부터 dynamic boundary로 분리한다.
- idle preload를 붙여 lazy split이 탭 진입 지연으로만 전가되지 않게 한다.
- `DesktopRuntimePanel`과 Agents detail 분리는 다음 큰 slice로 남긴다.

## 수용 기준

- Tool Studio가 static runtime import에서 빠진다.
- build 결과에서 Tool Studio 문자열이 별도 chunk에 나타난다.
- renderer/desktop/package 검증이 통과한다.
- 성능 수치의 개선/악화를 모두 기록한다.
