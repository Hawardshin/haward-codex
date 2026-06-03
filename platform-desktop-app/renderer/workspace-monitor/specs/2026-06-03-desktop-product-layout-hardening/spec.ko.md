# 데스크톱 제품 레이아웃 하드닝 스펙

## 목표

`workspace-monitor`가 `platform-desktop-app`의 제품 UI source로 쓰일 때 런타임 화면이 웹 카드 대시보드처럼 찌그러지지 않고 데스크톱 workbench처럼 보이게 한다.

## 요구사항

- `REQ-WM-026`: Runtime, Task Pipe, Runtime Data, Service Readiness, Task Run, Source Editor 패널은 full-width 운영 surface로 렌더링되어야 한다.
- `REQ-WM-016`: 대형 workspace snapshot은 client JavaScript bundle이나 fallback chunk로 포함되면 안 된다.
- 화면 검증에서 body와 desktop viewport의 가로 overflow가 0이어야 한다.
- Source editor는 Monaco 기반 scoped editor 구조를 유지한다.

## 비범위

- 새 editor dependency 설치
- public signing/notarization/updater 구현
- Tauri native window chrome 변경
