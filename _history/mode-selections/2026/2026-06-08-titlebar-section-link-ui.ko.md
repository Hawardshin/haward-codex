# 작업 모드 선택: 타이틀바 섹션 링크 UI

- 날짜: 2026-06-08
- 선택 모드: `standard`
- 보기 모드: `superadmin_developer`
- 설치 모드: `developer`

## 선택 이유

UI 동작과 공통 shell에 영향을 주는 구현이며 브라우저 smoke와 renderer build가 필요하므로 `standard`로 처리한다. 외부 설치, 패키징, 배포 정책 변경은 없다.

## 게이트

- 웹 우선 검토 기록
- large-scope decomposition 기록
- 요구사항/스펙/검증/추적성
- omission/resource/evaluation 기록
- 대상 테스트, 전체 테스트, Playwright smoke, renderer build
