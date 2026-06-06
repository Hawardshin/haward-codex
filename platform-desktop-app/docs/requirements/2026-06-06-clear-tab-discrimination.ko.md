# Requirements: Clear Tab Discrimination

## 목적

사용자가 현재 선택된 탭과 선택되지 않은 탭을 한눈에 구분할 수 있도록 데스크톱 UI의 탭 상태 표현을 강화한다.

## 요구사항

- 주요 탭류 UI는 선택 상태를 색상만으로 구분하지 않는다.
- 선택 탭은 굵은 indicator, 강한 border, selected shadow, 텍스트 weight 차이를 가져야 한다.
- 비선택 탭은 hover와 active 상태가 혼동되지 않도록 절제된 표면으로 유지한다.
- 실제 tablist에 가까운 설정 대분류와 소스 에디터 열린 파일 탭은 `role=tablist`, `role=tab`, `aria-selected` 상태를 가져야 한다.
- 기존 no-mobile shell, bounded scroll, Tauri drag region, build/package 흐름을 깨뜨리지 않는다.

## 범위

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
