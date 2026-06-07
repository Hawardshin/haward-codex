# 2026-06-07 소스 에디터 문서 helper 분리 모드 선택

## 선택

- `work_mode`: `standard`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

- 기존 데스크톱 앱 소스 구조를 개선하는 구현 작업이다.
- 사용자-facing 화면과 내부 개발자 readiness가 모두 관련되어 있지만, 공개 배포 설정이나 신규 설치 작업은 하지 않는다.

## 게이트

- 웹 검색 기록 남김.
- source structure 테스트와 TypeScript 검사 실행.
- 내부 패키징 검증까지 수행한다.
