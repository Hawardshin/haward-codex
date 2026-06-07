# 요청-결과 추적: 섹션 딥링크 UX

- 사용자 요청: UX 개선
- 결과: 워크스페이스 모니터 섹션 딥링크와 주소 정규화 구현
- 요구사항: `_requirements/changes/2026-06-08-section-deeplink-ux.ko.md`
- 프로젝트 요구사항: `platform-desktop-app/docs/requirements/2026-06-08-section-deeplink-ux.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-08-section-deeplink-ux/`
- 검증: `platform-desktop-app/specs/2026-06-08-section-deeplink-ux/validation.ko.md`
- 평가 입력: `_history/evaluations/2026/2026-06-08-section-deeplink-ux-evaluation-input.json`

## 구현 연결

- `section-location.mjs`: 섹션 URL builder 추가
- `MonitorShell.tsx`: 초기 섹션 활성화, view mode 전환, URL 정규화
- `section-location.test.mjs`: query/hash 동기화 테스트
