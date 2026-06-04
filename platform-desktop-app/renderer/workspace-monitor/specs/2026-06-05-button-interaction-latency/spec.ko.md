# Spec: Button Interaction Latency

## 목표

특정 버튼을 눌렀을 때 느려지는 현상을 개별 버튼 패치가 아니라 공통 렌더링 계약으로 줄인다. 버튼 클릭의 첫 응답 paint는 가볍게 유지하고, heavy workbench mount와 native refresh는 뒤로 분리한다.

## 요구사항

- `REQ-WM-041`: CPU throttle 6 정적 export audit에서 대표 버튼 표본 p95 click-to-paint는 60ms 이하, long task는 0이어야 한다.
- Desktop Runtime과 Source 진입 버튼은 heavy panel 전체를 첫 클릭 task 안에서 마운트하지 않는다.
- source file filtering, evidence assembly, decision grouping은 해당 surface 또는 disclosure가 열릴 때만 계산한다.
- Tauri/native refresh는 화면 첫 paint 뒤에 실행한다.

## 구현 범위

- `MonitorShell.tsx`
  - `scheduleAfterFirstPaint` helper 추가.
  - Desktop Runtime/Source workbench staged shell 추가.
  - Source 전용 JSX를 runtime surface에서 만들지 않도록 조기 반환.
  - source/evidence/decision derived data 계산 게이트 추가.
  - mount 직후 native refresh를 첫 paint 뒤로 지연.
- `globals.css`
  - Desktop/Source staged shell skeleton layout.

## 제외 범위

- 모든 앱 버튼의 영구 CI Playwright test 추가.
- React component 대분할 리팩터링.
- Tauri native command 자체의 실행 시간 최적화.

## 수용 기준

- baseline worst case였던 Agents → CLI 버튼의 long task가 사라져야 한다.
- 최종 67개 버튼 표본 audit에서 평균, p95, max가 기록되고 p95가 60ms 이하이어야 한다.
- in-app Browser에서 Desktop 전환 후 최종 workbench가 보이고 root horizontal overflow가 없어야 한다.
