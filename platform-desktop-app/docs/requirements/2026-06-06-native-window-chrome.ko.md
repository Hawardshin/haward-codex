# 네이티브 창 크롬 활용 요구사항

## 배경

사용자는 설치형 데스크톱 앱이 단순 웹 렌더러처럼 동작하지 말고 운영체제와 네이티브 앱 런타임의 장점을 적극 활용하라고 지시했다. 이번 범위는 창 자체의 네이티브 크롬, 드래그 영역, 앱 조작 영역의 충돌 방지를 우선 처리한다.

## 요구사항

- REQ-NATIVE-CHROME-001: Tauri main window는 데스크톱 전용 최소 크기를 유지하면서 macOS 네이티브 투명 타이틀바를 사용해야 한다.
- REQ-NATIVE-CHROME-002: 앱 시작 및 창 배경 플래시가 밝은 기본 배경으로 보이지 않도록 main window 배경색을 어두운 앱 크롬 색으로 지정해야 한다.
- REQ-NATIVE-CHROME-003: Workspace Monitor 상단 titlebar는 Tauri 네이티브 window drag region을 제공해야 한다.
- REQ-NATIVE-CHROME-004: 터미널 버튼, 검색 입력, 컨텍스트 액션처럼 실제 조작해야 하는 컨트롤은 window drag region에서 제외되어야 한다.
- REQ-NATIVE-CHROME-005: Tauri capability는 window dragging 권한을 명시적으로 허용해야 한다.
- REQ-NATIVE-CHROME-006: 구현 후 renderer test, desktop readiness test/check, browser DOM/CSS 검증, internal package build를 실행해야 한다.

## 비범위

- 전체 창을 frameless로 바꾸거나 OS window controls를 직접 재구현하지 않는다.
- macOS vibrancy/material effect, system tray, global shortcut, file association은 별도 네이티브 기능 slice로 남긴다.
- 성능 캐시/Rust workspace warmup 로직은 기존 구현을 유지하고 이번 slice에서는 창 크롬 계약만 강화한다.
