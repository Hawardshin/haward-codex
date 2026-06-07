# 2026-06-07 모드 선택: 앱 셸 Rust 모듈 분리

## 선택

- work mode: `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## 이유

구현 변경, 구조 분리, 빌드/패키징 검증이 필요한 작업이다. 새 정책이나 공개 배포 설정 변경은 아니므로 `standard`가 적절하다.

## 적용한 게이트

- 웹 우선 확인
- large-scope decomposition
- Rust/Tauri command registration 확인
- readiness/test aggregate 검사 조정
- 내부 패키징과 앱 실행 검증
