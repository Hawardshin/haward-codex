# 작업 모드 선택: 섹션 딥링크 UX

- 날짜: 2026-06-08
- 선택 모드: `standard`
- 보기 모드: `superadmin_developer`
- 설치 모드: `developer`

## 선택 이유

UI 동작과 사용자 작업 복구성에 영향을 주는 의미 있는 구현이므로 `quick`이 아니라 `standard`로 처리한다. 외부 CLI 설치나 제품 패키징 변경은 없으므로 설치/배포 모드는 확장하지 않는다.

## 게이트

- 웹 우선 검토 기록
- 요구사항/스펙/검증/추적성
- omission/resource/evaluation 기록
- 대상 테스트, 전체 테스트, Playwright smoke, renderer build
