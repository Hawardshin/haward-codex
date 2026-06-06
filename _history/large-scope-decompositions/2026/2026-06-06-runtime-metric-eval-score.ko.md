# 2026-06-06 runtime metric EVAL score 범위 분해

## 원 요청

미뤄둔 작업을 계속 진행.

## 이전 close-out에서 확인한 미뤄둔 항목

- 실제 runtime metric 기반 score source 연결.
- 외부 EVAL runner 설치/감사.
- Rust/Tauri resource lifecycle telemetry 상세화.

## 선택 slice

`actual runtime metric 기반 score source 연결`을 먼저 구현한다. 이미 있는 Rust/Tauri resource telemetry를 EVAL 탭의 종합 개선 점수에 연결하면, 사용자가 반복해서 요구한 "데스크톱 앱이 실제 CPU/RAM을 써야 한다"는 방향과 가장 직접적으로 맞다.

## 제외

- 외부 EVAL runner 설치는 dependency/security/license/audit 범위가 커서 이번 slice에서는 제외한다.
- persistent telemetry DB와 long task time-series는 후속 작업으로 남긴다.
- `_private/`는 검사하지 않는다.

## Touch paths

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-comprehensive-improvement-contract.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/src/generated/*`
- `platform-desktop-app/renderer/workspace-monitor/public/*snapshot*.json`

## Merge gate

- Rust check 통과.
- workspace monitor check/test 통과.
- desktop app check/test 통과.
- renderer build 통과.
- internal package 생성 통과.
- Browser smoke에서 EVAL cockpit과 runtime telemetry strip 확인.
