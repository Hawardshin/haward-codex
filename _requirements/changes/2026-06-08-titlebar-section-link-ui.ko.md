# 요구사항 변경 기록: 타이틀바 섹션 링크 UI

- 날짜: 2026-06-08
- 소유 프로젝트: `platform-desktop-app`
- 변경 유형: 공통 UI 액션 개선

## 변경 요약

워크스페이스 모니터 공통 titlebar에 현재 섹션 링크 복사 액션과 짧은 상태 피드백을 추가한다. 사용자는 현재 작업 화면을 복구 가능한 링크로 바로 공유할 수 있다.

## 연결 요구사항

- 프로젝트 요구사항: `platform-desktop-app/docs/requirements/2026-06-08-titlebar-section-link-ui.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-08-titlebar-section-link-ui/`

## 범위 판단

이번 변경은 “UI개선” 전체 중 첫 실행 slice다. 공통 titlebar에 적용해 여러 섹션에서 즉시 체감되도록 하고, 화면별 header/보고서 action strip 개선은 별도 slice로 남긴다.
