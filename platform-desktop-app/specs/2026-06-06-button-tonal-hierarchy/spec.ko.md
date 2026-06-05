# 버튼 톤/크기 계층 스펙

## 목표

기본 선택, 검색, 결과 버튼의 표면 계층을 명확히 하고 짧은 선택 버튼의 과한 크기를 줄인다.

## 변경 대상

- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 구현 계약

- 공통 토큰:
  - `--choice-bg`
  - `--choice-bg-hover`
  - `--choice-selected-bg`
  - `--choice-shadow`
  - `--choice-active-shadow`
  - `--search-shadow`
- compact 대상:
  - 설정 세그먼트 버튼
  - 선택 카드 compact variant
  - 검색 에이전트 provider/model 선택 버튼
  - 소스 툴바/워크벤치 전환 버튼
  - 검색/커맨드 팔레트 보조 버튼
- 활성 상태:
  - selected/active 버튼은 선택 배경과 active shadow를 사용한다.
  - 활성 버튼 내부 작은 텍스트는 `currentColor`를 따라야 한다.
