# 2026-06-06 종합 개선 대범위 분해

## 입력 분류

- 트리거: 사용자가 `모든 것 종합개선`을 요청했다.
- 범위: 성능, UI, 기능, 사용성, 디자인, 네이티브 자원, EVAL, 오픈소스 참고, 기록 기반 개선.
- 제외: `_private/` 직접 탐색, 전 저장소 무차별 수정, 검증 없는 dependency 설치.

## 소스 인벤토리

- 대표 소유 프로젝트: `platform-desktop-app`
- 주요 관찰 경로:
  - `platform-desktop-app/renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - `platform-desktop-app/renderer/workspace-monitor/package.json`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/scripts/`

## Slice 후보

- Slice A: 실제 EVAL surface에 종합 개선 점수와 우선순위 모델 추가.
- Slice B: Rust/Tauri resource telemetry를 snapshot에 더 깊게 연결.
- Slice C: 외부 EVAL runner 설치와 실행 report 연결.
- Slice D: 전 UI control primitive 재감사와 대량 리팩터링.

## 선택

- 선택 slice: Slice A.
- 이유: 기존 EVAL 탭이 이미 히스토리, 토큰/툴, 오픈소스 후보를 모으고 있어 가장 낮은 위험으로 종합 개선 루프를 사용자 화면에 노출할 수 있다.
- touch paths:
  - `platform-desktop-app/renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - `platform-desktop-app/renderer/workspace-monitor/scripts/check-comprehensive-improvement-contract.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/package.json`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 병합 게이트

- TypeScript와 workspace-monitor `check` 통과.
- renderer/platform tests 통과.
- renderer build 통과.
- internal package 실행.
- Browser smoke에서 `data-eval-comprehensive-improvement` surface 확인.

## 소스 provenance

- 웹 기준: 공식 Tauri, Apple HIG, W3C WCAG 2.2, Google engineering practices.
- 로컬 기준: 기존 EVAL cockpit, lazy/resident section, monitor check scripts, snapshot collector.
