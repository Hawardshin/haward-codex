# 요청-결과 추적: CLI 설정 안내

- 날짜: 2026-06-06
- 요청: CLI 사용법과 설정이 직관적이지 않다는 지적
- 소유 프로젝트: `platform-desktop-app`

## 입력 해석

사용자가 CLI 문법을 직접 학습하지 않아도 앱 안에서 설치, 로그인/키, 검증, 실행 순서를 선택형으로 따라갈 수 있어야 한다.

## 결과

- 설정 모달에 `cli-adapter-setup-guide`를 추가했다.
- Agent CLI Cockpit에 `agent-cli-setup-ladder`와 `agent-cli-command-stack`을 추가했다.
- 설치/검증/첫 실행 명령 복사를 실제 실행과 분리했다.
- Provider Accounts 연결 상태를 CLI 준비 단계에 반영했다.

## 연결 문서

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-cli-setup-guidance.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-cli-setup-guidance/`
- 웹 검색: `_history/web-searches/2026/2026-06-06-cli-setup-guidance.ko.md`
- 누락 체크: `_history/omission-checks/2026/2026-06-06-cli-setup-guidance.json`
- 리소스 체크: `_history/resource-checks/2026/2026-06-06-cli-setup-guidance.json`
- 평가: `_history/evaluations/2026/2026-06-06-cli-setup-guidance.ko.md`

## 검증

- renderer collect/check/test/build 통과
- Playwright smoke 통과
- internal package, codesign verify, DMG verify 통과
