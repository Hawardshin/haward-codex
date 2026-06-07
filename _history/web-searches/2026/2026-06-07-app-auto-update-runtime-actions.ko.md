# 앱 자동 업데이트 런타임 액션 웹 검색

- 날짜: 2026-06-07
- 요청 요약: 설치형 데스크톱 앱에서 자동 업데이트 관련 기능이 많이 동작하지 않는 문제를 해결.
- 검색 목적: Tauri v2 updater의 공식 런타임 구성, 서명, 업데이트 확인/설치 흐름을 확인하고 현재 구현과 비교.

## 확인한 출처

- Tauri v2 Updater Plugin: https://v2.tauri.app/plugin/updater/
  - 신뢰도: 공식 문서
  - 확인 내용: updater 플러그인은 정적 JSON 또는 업데이트 서버를 사용하며, 업데이트 서명이 필요하고, 빌드 시 updater artifact와 signature를 생성한다. 앱 런타임은 업데이트를 확인하고 다운로드/설치하는 흐름을 가져야 한다.

## 무시한 약한 출처

- 블로그/커뮤니티 글은 이번 수정의 근거로 사용하지 않음. 현재 문제는 공식 updater API와 로컬 코드의 런타임 표면 누락 여부가 핵심이므로 공식 문서와 로컬 검증을 우선했다.

## 계획 영향

- 기존 릴리스 스크립트는 updater artifact와 manifest 쪽을 준비하고 있었지만, 앱 런타임에 `check_app_update`/`install_app_update` 같은 실행 가능한 명령과 UI 액션이 없었다.
- 구현 방향은 새 의존성 추가가 아니라 이미 포함된 `tauri-plugin-updater`를 Rust 명령으로 연결하고, Service Readiness UI에서 확인/설치 액션을 제공하는 것으로 결정했다.

## 불확실성

- 현재 내부 빌드는 공용 updater endpoint와 signing key가 설정되지 않았으므로 실제 원격 업데이트 설치 smoke는 수행하지 않았다. 내부 빌드에서는 명령이 안전하게 `updater_unavailable` 또는 `no_pending_update`로 degrade해야 한다.
