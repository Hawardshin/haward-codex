# 2026-06-07 모드 선택: 앱 업데이트 Rust 모듈 분리

## 선택

- work mode: `standard`
- view mode: `superadmin_developer`
- install mode: `developer`

## 이유

요청은 단순 답변이 아니라 installable desktop app의 런타임 구조를 변경하고 전체 패키징 검증이 필요한 구현 작업이다. 다만 새 기능 설계나 정책 변경이 아니라 기존 기능을 유지한 구조 분리라서 `ship_first`나 `governance`보다 `standard`가 충분하다.

## 적용 게이트

- 웹 우선 확인
- 대상 프로젝트 경계 확인
- 구조 옵션 비교
- 구현 후 Rust, TypeScript, readiness, package 검증
- 누락 점검과 resource 점검 기록
