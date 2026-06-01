# 계획 기록: View Mode Selection

## 선택 모드

- `work_mode`: `governance`
- 이유: 플랫폼 공통 규칙, 요구사항, 설정 레지스트리, 모니터 UI, 메모리 부트스트랩을 변경한다.
- `view_mode`: `superadmin_developer`
- 이유: 현재 저장소는 소유자가 플랫폼 자체를 만들고 있으며, 사용자 요청도 슈퍼어드민 중심 개발 모드 선택을 요구했다.

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-view-mode-selection.ko.md`
- 요구사항 변경: `_requirements/changes/2026-06-02-view-mode-selection.ko.md`
- 요구사항 검토: `_requirements/reviews/2026-06-02-view-mode-selection.ko.md`

## 실행 계획

1. `view_mode`를 `install_mode`, `work_mode`와 분리한 registry로 추가한다.
2. registry 검증 CLI와 단위 테스트를 만든다.
3. Workspace Monitor snapshot과 UI가 registry를 읽게 한다.
4. 정책, 워크플로, 프롬프트, persistent instructions, memory bootstrap, AGENTS를 갱신한다.
5. 스펙, 히스토리, 평가, 요청 추적을 남긴다.
6. Python/Next.js/운영 검증을 실행한다.

## 계획 변경

- 없음.
