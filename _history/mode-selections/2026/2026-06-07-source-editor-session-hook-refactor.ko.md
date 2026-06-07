# 2026-06-07 소스 에디터 세션 훅 분리 모드 선택

## 선택

- `work_mode`: `standard`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

- React hook, 구조 계약 테스트, readiness source map, 내부 패키징에 영향을 주는 의미 있는 구현 변경이다.
- 새 의존성 설치나 공개 배포 작업은 없다.
- 사용자 화면 자체보다 개발자용 구조와 source editor 기능 일관성을 개선하는 작업이다.

## 게이트

- 웹 우선 확인 기록 작성.
- 누락 체크와 리소스 체크 기록 작성.
- Workspace Monitor check/test, platform-desktop-app test, 내부 패키징 실행.
