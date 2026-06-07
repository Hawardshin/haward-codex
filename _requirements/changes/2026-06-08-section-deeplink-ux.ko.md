# 요구사항 변경 기록: 섹션 딥링크 UX

- 날짜: 2026-06-08
- 소유 프로젝트: `platform-desktop-app`
- 변경 유형: UX 복구성/공유성 개선

## 변경 요약

워크스페이스 모니터의 섹션 주소를 사용자 작업 위치로 취급한다. 직접 주소로 열린 섹션은 클릭 없이 열려야 하며, 화면 이동 후 주소는 같은 섹션을 query와 hash로 동시에 가리켜야 한다.

## 연결 요구사항

- 프로젝트 요구사항: `platform-desktop-app/docs/requirements/2026-06-08-section-deeplink-ux.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-08-section-deeplink-ux/`

## 범위 판단

이 변경은 플랫폼 전체 IA 재설계가 아니라 사용자가 작업 히스토리와 보고 화면에 다시 접근하는 경로를 안정화하는 UX 기반 작업이다. 이후 모든 주요 작업 화면은 같은 링크 가능한 섹션 계약을 따르는 것이 바람직하다.
