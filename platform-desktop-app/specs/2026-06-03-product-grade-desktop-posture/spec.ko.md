# 제품급 데스크톱 구조 전환 Spec

## 목표

현재 설치형 플랫폼을 초기 UI 후보나 PoC가 아니라 제품 기준의 데스크톱 앱 구조로 다루도록 정책, 레지스트리, readiness 출력, 요구사항 문서를 정렬한다.

## 수용 기준

- 선택된 경로는 Tauri-first product runtime과 `workspace-monitor` product UI source로 표현한다.
- 현재 source-of-truth 문서와 검사 스크립트에서 `initial UI candidate`, `Tauri-first prototype`, `selected_for_first_scaffold`, `scaffolded_not_public_release_ready`, `ready_for_dependency_install_audit`, `service_public_ready_candidate`를 제거하거나 supersede한다.
- PoC/prototype 표현은 선택된 제품 경로 금지 규칙이나 새 대체 경로 실험 설명에만 남긴다.
- public-ready는 signing/notarization/updater/smoke/privacy/dependency gate가 끝나기 전까지 gated 또는 blocked로 남긴다.

## 비목표

- 새 UI 화면 구현
- 공개 배포 credential 구성
- historical history/spec 로그 전체 재작성
