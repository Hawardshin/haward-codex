# 대범위 분해 기록: Text Wrapping Contract

## 분류

- 요청 유형: UI/UX 품질 개선 중 텍스트 줄바꿈 안정화 slice
- 큰 요청 묶음: UI 근본 변화, 텍스트 깨짐 방지, 비전체화면 대응, 버튼/탭 성능 개선
- 이번 slice: 텍스트가 줄바꿈으로 이상해지지 않게 하는 공통 CSS 계약

## Source Inventory

- 대상: `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- 테스트: `platform-desktop-app/renderer/workspace-monitor/tests/font-loading.test.mjs`
- 요구사항: `platform-desktop-app/renderer/workspace-monitor/docs/requirements/`
- 스펙/검증: `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-text-wrapping-contract/`

## Exclusions

- generated snapshot 내용 정리 제외
- 특정 화면의 레이아웃 구조 재설계 제외
- 새 dependency 설치 제외
- 모든 화면 문구 rewrite 제외

## Slice

- ID: `wm-text-wrapping-contract`
- Touch paths:
  - `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - `platform-desktop-app/renderer/workspace-monitor/tests/font-loading.test.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/docs/requirements/`
  - `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-text-wrapping-contract/`
  - `_history/`

## Merge Gate

- Static CSS contract test
- TypeScript/check/build/customer build/performance budget
- desktop/mobile Browser overflow smoke
- `git diff --check`
